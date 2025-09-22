/**
 * WebRTC数据传输对象(DTO)
 *
 * 功能说明：
 * 1. 定义WebRTC相关的请求和响应数据结构
 * 2. 提供数据验证和类型安全
 * 3. 统一API接口的数据格式
 */

import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
// 移除未使用的导入: ValidateNested, Type

// 房间状态枚举
export enum RoomStatus {
  WAITING = 'waiting',
  ACTIVE = 'active',
  ENDED = 'ended',
}

// 连接状态枚举
export enum ConnectionState {
  NEW = 'new',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  FAILED = 'failed',
  CLOSED = 'closed',
}

// 用户角色枚举
export enum UserRole {
  BROADCASTER = 'broadcaster', // 推流者
  VIEWER = 'viewer', // 观看者
}

/**
 * 创建房间DTO
 */
export class CreateRoomDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  maxParticipants?: number = 10

  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean = false

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]
}

/**
 * 加入房间DTO
 */
export class JoinRoomDto {
  @IsEnum(UserRole)
  role: UserRole

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  deviceInfo?: string

  @IsOptional()
  @IsString()
  userAgent?: string
}

/**
 * WebRTC统计信息DTO
 */
export class WebRTCStatsDto {
  @IsString()
  roomId: string

  @IsString()
  connectionId: string

  @IsEnum(ConnectionState)
  connectionState: ConnectionState

  @IsOptional()
  @IsNumber()
  @Min(0)
  latency?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  bitrate?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  frameRate?: number

  @IsOptional()
  @IsString()
  resolution?: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  packetLoss?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  jitter?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  bandwidth?: number

  @IsOptional()
  @IsString()
  codecName?: string

  @IsOptional()
  @IsNumber()
  timestamp?: number = Date.now()
}

/**
 * 信令消息DTO
 */
export class SignalingMessageDto {
  @IsString()
  type: string

  @IsString()
  roomId: string

  @IsString()
  fromUserId: string

  @IsOptional()
  @IsString()
  toUserId?: string

  @IsOptional()
  data?: any

  @IsOptional()
  @IsNumber()
  timestamp?: number = Date.now()
}

/**
 * ICE候选DTO
 */
export class IceCandidateDto {
  @IsString()
  candidate: string

  @IsString()
  sdpMid: string

  @IsNumber()
  sdpMLineIndex: number

  @IsOptional()
  @IsString()
  usernameFragment?: string
}

/**
 * SDP描述DTO
 */
export class SessionDescriptionDto {
  @IsEnum(['offer', 'answer', 'pranswer', 'rollback'])
  type: RTCSdpType

  @IsString()
  sdp: string
}

/**
 * 房间查询DTO
 */
export class RoomQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10

  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @IsOptional()
  @IsBoolean()
  includePrivate?: boolean = false
}

/**
 * 房间响应DTO
 */
export class RoomResponseDto {
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
  tags: string[]
  participants?: ParticipantResponseDto[]
}

/**
 * 参与者响应DTO
 */
export class ParticipantResponseDto {
  userId: string
  username: string
  role: UserRole
  connectionState: ConnectionState
  joinedAt: Date
  lastActiveAt: Date
  deviceInfo?: string
  stats?: ConnectionStatsResponseDto
}

/**
 * 连接统计响应DTO
 */
export class ConnectionStatsResponseDto {
  connectionId: string
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
  lastUpdated: Date
}

/**
 * 服务状态响应DTO
 */
export class ServiceStatusResponseDto {
  status: 'healthy' | 'degraded' | 'unhealthy'
  version: string
  uptime: number
  activeRooms: number
  activeConnections: number
  totalRoomsCreated: number
  totalConnectionsEstablished: number
  serverLoad: {
    cpu: number
    memory: number
    connections: number
  }
  lastHealthCheck: Date
}

/**
 * ICE服务器配置响应DTO
 */
export class IceServerConfigResponseDto {
  urls: string | string[]
  username?: string
  credential?: string
  credentialType?: 'password' | 'oauth'
}

/**
 * 错误响应DTO
 */
export class WebRTCErrorResponseDto {
  code: string
  message: string
  details?: any
  timestamp: Date
  requestId?: string
}

/**
 * 分页响应DTO
 */
export class PaginatedResponseDto<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

/**
 * 房间事件DTO
 */
export class RoomEventDto {
  @IsString()
  eventType: string

  @IsString()
  roomId: string

  @IsString()
  userId: string

  @IsOptional()
  data?: any

  @IsOptional()
  @IsNumber()
  timestamp?: number = Date.now()
}

/**
 * 网络质量报告DTO
 */
export class NetworkQualityDto {
  @IsString()
  connectionId: string

  @IsEnum(['excellent', 'good', 'poor', 'bad'])
  quality: string

  @IsNumber()
  @Min(0)
  score: number

  @IsOptional()
  @IsNumber()
  rtt?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  packetLoss?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  bandwidth?: number

  @IsOptional()
  @IsString()
  recommendation?: string

  @IsOptional()
  @IsNumber()
  timestamp?: number = Date.now()
}
