/**
 * WebRTC WebSocket网关
 * 
 * 功能说明：
 * 1. 处理WebSocket连接和断开
 * 2. 管理信令消息的转发
 * 3. 处理offer/answer/ice-candidate等WebRTC信令
 * 4. 实现房间管理和用户状态同步
 */

import { Server as SocketIOServer, Socket } from 'socket.io'
import { inject, injectable } from 'inversify'
import { WebRTCService } from './service'
import { SignalingMessageDto, IceCandidateDto, SessionDescriptionDto, ConnectionState } from './dto'
import Redis from 'ioredis'

interface SocketUser {
    userId: string
    username: string
    roomId?: string
    connectionId?: string
    role?: string
    joinedAt: Date
}

@injectable()
export class WebRTCGateway {
    private io: SocketIOServer
    private connectedUsers: Map<string, SocketUser> = new Map()
    private roomSockets: Map<string, Set<string>> = new Map()

    constructor(
        @inject('WebRTCService') private webrtcService: WebRTCService,
        @inject('Redis') private redis: Redis
    ) {}

    /**
     * 初始化WebSocket服务器
     */
    initialize(io: SocketIOServer): void {
        this.io = io

        // 设置CORS和连接配置
        io.engine.on('connection_error', (err) => {
            console.error('WebSocket连接错误:', err)
        })

        // 处理客户端连接
        io.on('connection', (socket: Socket) => {
            console.log(`WebSocket客户端连接: ${socket.id}`)
            this.handleConnection(socket)
        })

        // 订阅Redis消息用于跨服务器通信
        this.subscribeToRedisMessages()

        console.log('WebRTC WebSocket网关初始化完成')
    }

    /**
     * 处理客户端连接
     */
    private handleConnection(socket: Socket): void {
        // 用户认证
        socket.on('authenticate', async (data: { token: string; userId: string; username: string }) => {
            try {
                // 这里应该验证JWT token，简化处理
                const user: SocketUser = {
                    userId: data.userId,
                    username: data.username,
                    joinedAt: new Date()
                }

                this.connectedUsers.set(socket.id, user)
                socket.emit('authenticated', { success: true, userId: data.userId })
                
                console.log(`用户认证成功: ${data.username} (${socket.id})`)
            } catch (error) {
                console.error('用户认证失败:', error)
                socket.emit('authenticated', { success: false, error: '认证失败' })
                socket.disconnect()
            }
        })

        // 加入房间
        socket.on('join-room', async (data: { roomId: string; role: string; password?: string }) => {
            try {
                const user = this.connectedUsers.get(socket.id)
                if (!user) {
                    socket.emit('error', { message: '用户未认证' })
                    return
                }

                // 加入房间逻辑
                const result = await this.webrtcService.joinRoom(data.roomId, {
                    userId: user.userId,
                    role: data.role as any,
                    password: data.password
                })

                // 更新用户信息
                user.roomId = data.roomId
                user.connectionId = result.connectionId
                user.role = data.role

                // 加入Socket.IO房间
                await socket.join(data.roomId)

                // 更新房间Socket映射
                if (!this.roomSockets.has(data.roomId)) {
                    this.roomSockets.set(data.roomId, new Set())
                }
                this.roomSockets.get(data.roomId)!.add(socket.id)

                // 通知房间内其他用户
                socket.to(data.roomId).emit('user-joined', {
                    userId: user.userId,
                    username: user.username,
                    role: data.role,
                    connectionId: result.connectionId
                })

                socket.emit('room-joined', {
                    roomId: data.roomId,
                    connectionId: result.connectionId,
                    role: data.role
                })

                console.log(`用户 ${user.username} 加入房间 ${data.roomId}`)
            } catch (error) {
                console.error('加入房间失败:', error)
                socket.emit('error', { message: error.message || '加入房间失败' })
            }
        })

        // 离开房间
        socket.on('leave-room', async () => {
            await this.handleLeaveRoom(socket)
        })

        // 处理WebRTC信令消息
        this.setupSignalingHandlers(socket)

        // 处理连接统计更新
        socket.on('stats-update', async (data: any) => {
            try {
                const user = this.connectedUsers.get(socket.id)
                if (!user || !user.connectionId) return

                await this.webrtcService.updateConnectionStats({
                    ...data,
                    userId: user.userId,
                    connectionId: user.connectionId
                })
            } catch (error) {
                console.error('更新统计信息失败:', error)
            }
        })

        // 处理断开连接
        socket.on('disconnect', async (reason) => {
            console.log(`WebSocket客户端断开连接: ${socket.id}, 原因: ${reason}`)
            await this.handleDisconnection(socket)
        })

        // 错误处理
        socket.on('error', (error) => {
            console.error(`Socket错误 (${socket.id}):`, error)
        })
    }

    /**
     * 设置信令处理器
     */
    private setupSignalingHandlers(socket: Socket): void {
        // 处理Offer信令
        socket.on('offer', async (data: { offer: SessionDescriptionDto; targetUserId?: string }) => {
            try {
                const user = this.connectedUsers.get(socket.id)
                if (!user || !user.roomId) {
                    socket.emit('error', { message: '用户未在房间中' })
                    return
                }

                const signalingMessage: SignalingMessageDto = {
                    type: 'offer',
                    roomId: user.roomId,
                    fromUserId: user.userId,
                    toUserId: data.targetUserId,
                    data: data.offer,
                    timestamp: Date.now()
                }

                // 转发给目标用户或房间内所有用户
                if (data.targetUserId) {
                    this.sendToUser(data.targetUserId, 'offer', signalingMessage)
                } else {
                    socket.to(user.roomId).emit('offer', signalingMessage)
                }

                // 发布到Redis用于跨服务器通信
                await this.publishSignalingMessage(signalingMessage)

                console.log(`转发Offer信令: ${user.userId} -> ${data.targetUserId || '房间内所有用户'}`)
            } catch (error) {
                console.error('处理Offer信令失败:', error)
                socket.emit('error', { message: '处理Offer信令失败' })
            }
        })

        // 处理Answer信令
        socket.on('answer', async (data: { answer: SessionDescriptionDto; targetUserId: string }) => {
            try {
                const user = this.connectedUsers.get(socket.id)
                if (!user || !user.roomId) {
                    socket.emit('error', { message: '用户未在房间中' })
                    return
                }

                const signalingMessage: SignalingMessageDto = {
                    type: 'answer',
                    roomId: user.roomId,
                    fromUserId: user.userId,
                    toUserId: data.targetUserId,
                    data: data.answer,
                    timestamp: Date.now()
                }

                this.sendToUser(data.targetUserId, 'answer', signalingMessage)
                await this.publishSignalingMessage(signalingMessage)

                console.log(`转发Answer信令: ${user.userId} -> ${data.targetUserId}`)
            } catch (error) {
                console.error('处理Answer信令失败:', error)
                socket.emit('error', { message: '处理Answer信令失败' })
            }
        })

        // 处理ICE候选
        socket.on('ice-candidate', async (data: { candidate: IceCandidateDto; targetUserId?: string }) => {
            try {
                const user = this.connectedUsers.get(socket.id)
                if (!user || !user.roomId) {
                    socket.emit('error', { message: '用户未在房间中' })
                    return
                }

                const signalingMessage: SignalingMessageDto = {
                    type: 'ice-candidate',
                    roomId: user.roomId,
                    fromUserId: user.userId,
                    toUserId: data.targetUserId,
                    data: data.candidate,
                    timestamp: Date.now()
                }

                if (data.targetUserId) {
                    this.sendToUser(data.targetUserId, 'ice-candidate', signalingMessage)
                } else {
                    socket.to(user.roomId).emit('ice-candidate', signalingMessage)
                }

                await this.publishSignalingMessage(signalingMessage)
            } catch (error) {
                console.error('处理ICE候选失败:', error)
            }
        })

        // 处理连接状态变化
        socket.on('connection-state-change', async (data: { state: ConnectionState }) => {
            try {
                const user = this.connectedUsers.get(socket.id)
                if (!user || !user.roomId || !user.connectionId) return

                await this.webrtcService.updateConnectionStats({
                    roomId: user.roomId,
                    connectionId: user.connectionId,
                    connectionState: data.state,
                    userId: user.userId
                })

                // 通知房间内其他用户
                socket.to(user.roomId).emit('user-connection-state-change', {
                    userId: user.userId,
                    state: data.state
                })
            } catch (error) {
                console.error('处理连接状态变化失败:', error)
            }
        })
    }

    /**
     * 处理离开房间
     */
    private async handleLeaveRoom(socket: Socket): Promise<void> {
        try {
            const user = this.connectedUsers.get(socket.id)
            if (!user || !user.roomId) return

            // 从WebRTC服务中离开房间
            await this.webrtcService.leaveRoom(user.roomId, user.userId)

            // 从Socket.IO房间中离开
            await socket.leave(user.roomId)

            // 更新房间Socket映射
            const roomSockets = this.roomSockets.get(user.roomId)
            if (roomSockets) {
                roomSockets.delete(socket.id)
                if (roomSockets.size === 0) {
                    this.roomSockets.delete(user.roomId)
                }
            }

            // 通知房间内其他用户
            socket.to(user.roomId).emit('user-left', {
                userId: user.userId,
                username: user.username
            })

            // 清除用户房间信息
            user.roomId = undefined
            user.connectionId = undefined
            user.role = undefined

            socket.emit('room-left')
            console.log(`用户 ${user.username} 离开房间`)
        } catch (error) {
            console.error('离开房间失败:', error)
        }
    }

    /**
     * 处理连接断开
     */
    private async handleDisconnection(socket: Socket): Promise<void> {
        try {
            const user = this.connectedUsers.get(socket.id)
            if (!user) return

            // 如果用户在房间中，先离开房间
            if (user.roomId) {
                await this.handleLeaveRoom(socket)
            }

            // 清除用户连接记录
            this.connectedUsers.delete(socket.id)
        } catch (error) {
            console.error('处理连接断开失败:', error)
        }
    }

    /**
     * 发送消息给特定用户
     */
    private sendToUser(userId: string, event: string, data: any): void {
        for (const [socketId, user] of this.connectedUsers) {
            if (user.userId === userId) {
                this.io.to(socketId).emit(event, data)
                break
            }
        }
    }

    /**
     * 发布信令消息到Redis
     */
    private async publishSignalingMessage(message: SignalingMessageDto): Promise<void> {
        try {
            await this.redis.publish('webrtc:signaling', JSON.stringify(message))
        } catch (error) {
            console.error('发布信令消息到Redis失败:', error)
        }
    }

    /**
     * 订阅Redis消息
     */
    private subscribeToRedisMessages(): void {
        const subscriber = this.redis.duplicate()
        
        subscriber.subscribe('webrtc:signaling', (err, count) => {
            if (err) {
                console.error('订阅Redis消息失败:', err)
            } else {
                console.log(`订阅了 ${count} 个Redis频道`)
            }
        })

        subscriber.on('message', (channel, message) => {
            try {
                if (channel === 'webrtc:signaling') {
                    const signalingMessage: SignalingMessageDto = JSON.parse(message)
                    this.handleRedisSignalingMessage(signalingMessage)
                }
            } catch (error) {
                console.error('处理Redis消息失败:', error)
            }
        })
    }

    /**
     * 处理来自Redis的信令消息
     */
    private handleRedisSignalingMessage(message: SignalingMessageDto): void {
        // 转发给本服务器上的相关用户
        if (message.toUserId) {
            this.sendToUser(message.toUserId, message.type, message)
        } else {
            // 广播给房间内所有用户
            this.io.to(message.roomId).emit(message.type, message)
        }
    }

    /**
     * 获取在线用户统计
     */
    getOnlineStats(): { totalUsers: number; roomStats: Record<string, number> } {
        const roomStats: Record<string, number> = {}
        
        for (const [socketId, user] of this.connectedUsers) {
            if (user.roomId) {
                roomStats[user.roomId] = (roomStats[user.roomId] || 0) + 1
            }
        }

        return {
            totalUsers: this.connectedUsers.size,
            roomStats
        }
    }
}
