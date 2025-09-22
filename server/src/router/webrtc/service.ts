/**
 * WebRTC服务层
 *
 * 功能说明：
 * 1. 处理WebRTC业务逻辑
 * 2. 管理房间和用户状态
 * 3. 提供统计信息收集和分析
 * 4. 处理Redis数据存储和缓存
 */

import { inject, injectable } from 'inversify'
import Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'
import {
  ConnectionState,
  CreateRoomDto,
  IceServerConfigResponseDto,
  JoinRoomDto,
  PaginatedResponseDto,
  RoomQueryDto,
  RoomResponseDto,
  RoomStatus,
  // 移除未使用的导入: ParticipantResponseDto, ConnectionStatsResponseDto
  ServiceStatusResponseDto,
  UserRole,
  WebRTCStatsDto,
} from './dto'

interface Room {
  id: string
  name: string
  description?: string
  status: RoomStatus
  creatorId: string
  createdAt: Date
  updatedAt: Date
  maxParticipants: number
  currentParticipants: number
  isPrivate: boolean
  password?: string
  tags: string[]
  participants: Map<string, Participant>
}

interface Participant {
  userId: string
  username: string
  role: UserRole
  connectionState: ConnectionState
  connectionId: string
  joinedAt: Date
  lastActiveAt: Date
  deviceInfo?: string
  userAgent?: string
}

interface ConnectionStats {
  connectionId: string
  userId: string
  roomId: string
  connectionState: ConnectionState
  duration: number
  latency: number
  bitrate: number
  frameRate: number
  resolution: string
  packetLoss: number
  jitter: number
  bandwidth: number
  codecName: string
  createdAt: Date
  lastUpdated: Date
}

@injectable()
export class WebRTCService {
  private rooms: Map<string, Room> = new Map()
  private connections: Map<string, ConnectionStats> = new Map()
  private userConnections: Map<string, Set<string>> = new Map()
  private serviceStartTime: Date = new Date()

  constructor(@inject('Redis') private redis: Redis) {
    this.initializeService()
  }

  /**
   * 初始化服务
   */
  private async initializeService() {
    try {
      // 从Redis恢复房间状态
      await this.loadRoomsFromRedis()

      // 设置定期清理任务
      setInterval(
        () => {
          this.cleanupInactiveRooms()
          this.cleanupExpiredStats()
        },
        5 * 60 * 1000
      ) // 每5分钟执行一次

      console.log('WebRTC服务初始化完成')
    } catch (error) {
      console.error('WebRTC服务初始化失败:', error)
    }
  }

  /**
   * 创建房间
   */
  async createRoom(data: CreateRoomDto & { creatorId: string }): Promise<RoomResponseDto> {
    const roomId = uuidv4()
    const now = new Date()

    const room: Room = {
      id: roomId,
      name: data.name,
      description: data.description,
      status: RoomStatus.WAITING,
      creatorId: data.creatorId,
      createdAt: now,
      updatedAt: now,
      maxParticipants: data.maxParticipants || 10,
      currentParticipants: 0,
      isPrivate: data.isPrivate || false,
      password: data.password,
      tags: data.tags || [],
      participants: new Map(),
    }

    this.rooms.set(roomId, room)
    await this.saveRoomToRedis(room)

    return this.mapRoomToResponse(room)
  }

  /**
   * 获取房间列表
   */
  async getRooms(query: RoomQueryDto): Promise<PaginatedResponseDto<RoomResponseDto>> {
    const rooms = Array.from(this.rooms.values())

    // 过滤房间
    let filteredRooms = rooms.filter(room => {
      if (query.status && room.status !== query.status) return false
      if (!query.includePrivate && room.isPrivate) return false
      if (query.search && !room.name.toLowerCase().includes(query.search.toLowerCase()))
        return false
      if (query.tags && query.tags.length > 0) {
        const hasMatchingTag = query.tags.some(tag => room.tags.includes(tag))
        if (!hasMatchingTag) return false
      }
      return true
    })

    // 排序（按创建时间倒序）
    filteredRooms.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    // 分页
    const page = query.page || 1
    const limit = query.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedRooms = filteredRooms.slice(startIndex, endIndex)

    return {
      data: paginatedRooms.map(room => this.mapRoomToResponse(room)),
      pagination: {
        page,
        limit,
        total: filteredRooms.length,
        totalPages: Math.ceil(filteredRooms.length / limit),
        hasNext: endIndex < filteredRooms.length,
        hasPrev: page > 1,
      },
    }
  }

  /**
   * 根据ID获取房间
   */
  async getRoomById(roomId: string): Promise<RoomResponseDto | null> {
    const room = this.rooms.get(roomId)
    return room ? this.mapRoomToResponse(room) : null
  }

  /**
   * 加入房间
   */
  async joinRoom(
    roomId: string,
    data: JoinRoomDto & { userId: string }
  ): Promise<{ connectionId: string }> {
    const room = this.rooms.get(roomId)
    if (!room) {
      throw new Error('房间不存在')
    }

    if (room.status === RoomStatus.ENDED) {
      throw new Error('房间已结束')
    }

    if (room.currentParticipants >= room.maxParticipants) {
      throw new Error('房间已满')
    }

    if (room.isPrivate && room.password !== data.password) {
      throw new Error('房间密码错误')
    }

    // 检查用户是否已在房间中
    if (room.participants.has(data.userId)) {
      throw new Error('用户已在房间中')
    }

    const connectionId = uuidv4()
    const now = new Date()

    const participant: Participant = {
      userId: data.userId,
      username: `User_${data.userId.slice(-6)}`, // 简化的用户名
      role: data.role,
      connectionState: ConnectionState.NEW,
      connectionId,
      joinedAt: now,
      lastActiveAt: now,
      deviceInfo: data.deviceInfo,
      userAgent: data.userAgent,
    }

    room.participants.set(data.userId, participant)
    room.currentParticipants++
    room.updatedAt = now

    // 如果是第一个参与者，将房间状态设为活跃
    if (room.currentParticipants === 1) {
      room.status = RoomStatus.ACTIVE
    }

    // 更新用户连接映射
    if (!this.userConnections.has(data.userId)) {
      this.userConnections.set(data.userId, new Set())
    }
    this.userConnections.get(data.userId)!.add(connectionId)

    await this.saveRoomToRedis(room)

    return { connectionId }
  }

  /**
   * 离开房间
   */
  async leaveRoom(roomId: string, userId: string): Promise<void> {
    const room = this.rooms.get(roomId)
    if (!room) {
      throw new Error('房间不存在')
    }

    const participant = room.participants.get(userId)
    if (!participant) {
      throw new Error('用户不在房间中')
    }

    // 移除参与者
    room.participants.delete(userId)
    room.currentParticipants--
    room.updatedAt = new Date()

    // 清理用户连接映射
    const userConnections = this.userConnections.get(userId)
    if (userConnections) {
      userConnections.delete(participant.connectionId)
      if (userConnections.size === 0) {
        this.userConnections.delete(userId)
      }
    }

    // 清理连接统计
    this.connections.delete(participant.connectionId)

    // 如果房间为空，设置为等待状态
    if (room.currentParticipants === 0) {
      room.status = RoomStatus.WAITING
    }

    await this.saveRoomToRedis(room)
  }

  /**
   * 删除房间
   */
  async deleteRoom(roomId: string, userId: string): Promise<void> {
    const room = this.rooms.get(roomId)
    if (!room) {
      throw new Error('房间不存在')
    }

    if (room.creatorId !== userId) {
      throw new Error('只有房间创建者可以删除房间')
    }

    // 清理所有参与者
    for (const [participantUserId] of room.participants) {
      await this.leaveRoom(roomId, participantUserId)
    }

    room.status = RoomStatus.ENDED
    this.rooms.delete(roomId)
    await this.redis.del(`webrtc:room:${roomId}`)
  }

  /**
   * 更新连接统计
   */
  async updateConnectionStats(data: WebRTCStatsDto & { userId: string }): Promise<void> {
    const now = new Date()

    let stats = this.connections.get(data.connectionId)
    if (!stats) {
      stats = {
        connectionId: data.connectionId,
        userId: data.userId,
        roomId: data.roomId,
        connectionState: data.connectionState,
        duration: 0,
        latency: data.latency || 0,
        bitrate: data.bitrate || 0,
        frameRate: data.frameRate || 0,
        resolution: data.resolution || '0x0',
        packetLoss: data.packetLoss || 0,
        jitter: data.jitter || 0,
        bandwidth: data.bandwidth || 0,
        codecName: data.codecName || 'unknown',
        createdAt: now,
        lastUpdated: now,
      }
    } else {
      // 更新统计信息
      stats.connectionState = data.connectionState
      stats.latency = data.latency || stats.latency
      stats.bitrate = data.bitrate || stats.bitrate
      stats.frameRate = data.frameRate || stats.frameRate
      stats.resolution = data.resolution || stats.resolution
      stats.packetLoss = data.packetLoss || stats.packetLoss
      stats.jitter = data.jitter || stats.jitter
      stats.bandwidth = data.bandwidth || stats.bandwidth
      stats.codecName = data.codecName || stats.codecName
      stats.duration = now.getTime() - stats.createdAt.getTime()
      stats.lastUpdated = now
    }

    this.connections.set(data.connectionId, stats)

    // 更新房间中参与者的连接状态
    const room = this.rooms.get(data.roomId)
    if (room) {
      const participant = room.participants.get(data.userId)
      if (participant) {
        participant.connectionState = data.connectionState
        participant.lastActiveAt = now
        await this.saveRoomToRedis(room)
      }
    }
  }

  /**
   * 获取房间统计
   */
  async getRoomStats(roomId: string): Promise<any> {
    const room = this.rooms.get(roomId)
    if (!room) {
      throw new Error('房间不存在')
    }

    const participants = Array.from(room.participants.values())
    const connections = participants.map(p => this.connections.get(p.connectionId)).filter(Boolean)

    return {
      roomId,
      participantCount: room.currentParticipants,
      averageLatency: this.calculateAverage(connections.map(c => c!.latency)),
      averageBitrate: this.calculateAverage(connections.map(c => c!.bitrate)),
      averageFrameRate: this.calculateAverage(connections.map(c => c!.frameRate)),
      totalDuration: Math.max(...connections.map(c => c!.duration), 0),
      connectionStates: this.groupBy(connections, c => c!.connectionState),
    }
  }

  /**
   * 获取用户统计
   */
  async getUserStats(userId: string): Promise<any> {
    const userConnections = this.userConnections.get(userId) || new Set()
    const connections = Array.from(userConnections)
      .map(id => this.connections.get(id))
      .filter(Boolean)

    return {
      userId,
      totalConnections: connections.length,
      activeConnections: connections.filter(c => c!.connectionState === ConnectionState.CONNECTED)
        .length,
      averageLatency: this.calculateAverage(connections.map(c => c!.latency)),
      totalDuration: connections.reduce((sum, c) => sum + c!.duration, 0),
      lastActivity: Math.max(...connections.map(c => c!.lastUpdated.getTime()), 0),
    }
  }

  /**
   * 获取服务状态
   */
  async getServiceStatus(): Promise<ServiceStatusResponseDto> {
    const now = new Date()
    const uptime = now.getTime() - this.serviceStartTime.getTime()

    const activeRooms = Array.from(this.rooms.values()).filter(
      r => r.status === RoomStatus.ACTIVE
    ).length
    const activeConnections = Array.from(this.connections.values()).filter(
      c => c.connectionState === ConnectionState.CONNECTED
    ).length

    return {
      status: 'healthy',
      version: '1.0.0',
      uptime,
      activeRooms,
      activeConnections,
      totalRoomsCreated: this.rooms.size,
      totalConnectionsEstablished: this.connections.size,
      serverLoad: {
        cpu: 0, // 实际项目中可以使用系统监控库获取
        memory: process.memoryUsage().heapUsed / 1024 / 1024, // MB
        connections: activeConnections,
      },
      lastHealthCheck: now,
    }
  }

  /**
   * 获取ICE服务器配置
   */
  async getIceServers(): Promise<IceServerConfigResponseDto[]> {
    // 实际项目中应该从配置文件或环境变量读取
    return [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      {
        urls: 'turn:your-turn-server.com:3478',
        username: 'turnuser',
        credential: 'turnpass',
      },
    ]
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<{ status: string; timestamp: Date }> {
    try {
      // 检查Redis连接
      await this.redis.ping()

      return {
        status: 'healthy',
        timestamp: new Date(),
      }
    } catch (error) {
      throw new Error('健康检查失败')
    }
  }

  // 私有辅助方法
  private mapRoomToResponse(room: Room): RoomResponseDto {
    return {
      id: room.id,
      name: room.name,
      description: room.description,
      status: room.status,
      creatorId: room.creatorId,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      maxParticipants: room.maxParticipants,
      currentParticipants: room.currentParticipants,
      isPrivate: room.isPrivate,
      tags: room.tags,
      participants: Array.from(room.participants.values()).map(p => ({
        userId: p.userId,
        username: p.username,
        role: p.role,
        connectionState: p.connectionState,
        joinedAt: p.joinedAt,
        lastActiveAt: p.lastActiveAt,
        deviceInfo: p.deviceInfo,
      })),
    }
  }

  private async saveRoomToRedis(room: Room): Promise<void> {
    const roomData = {
      ...room,
      participants: Array.from(room.participants.entries()),
    }
    await this.redis.setex(`webrtc:room:${room.id}`, 3600, JSON.stringify(roomData))
  }

  private async loadRoomsFromRedis(): Promise<void> {
    // 实现从Redis加载房间状态的逻辑
    // 这里简化处理，实际项目中需要完整实现
  }

  private cleanupInactiveRooms(): void {
    const now = new Date()
    const inactiveThreshold = 30 * 60 * 1000 // 30分钟

    for (const [roomId, room] of this.rooms) {
      if (
        now.getTime() - room.updatedAt.getTime() > inactiveThreshold &&
        room.currentParticipants === 0
      ) {
        this.rooms.delete(roomId)
        this.redis.del(`webrtc:room:${roomId}`)
      }
    }
  }

  private cleanupExpiredStats(): void {
    const now = new Date()
    const expireThreshold = 24 * 60 * 60 * 1000 // 24小时

    for (const [connectionId, stats] of this.connections) {
      if (now.getTime() - stats.lastUpdated.getTime() > expireThreshold) {
        this.connections.delete(connectionId)
      }
    }
  }

  private calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) return 0
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
  }

  private groupBy<T, K>(array: T[], keyFn: (item: T) => K): Record<string, number> {
    const result: Record<string, number> = {}
    for (const item of array) {
      const key = String(keyFn(item))
      result[key] = (result[key] || 0) + 1
    }
    return result
  }
}
