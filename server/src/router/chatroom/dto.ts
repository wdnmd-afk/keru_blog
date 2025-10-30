import { IsNumber, IsOptional, IsString, Max, Min, IsEnum } from 'class-validator'

// 聊天室状态枚举（与 Prisma 中的 ChatRoomStatus 保持一致）
export enum ChatRoomStatus {
  ACTIVE = 'ACTIVE',
  ENDED = 'ENDED',
}

// 创建聊天室 DTO
export class CreateChatRoomDto {
  @IsString()
  name!: string

  @IsOptional()
  @IsString()
  coverUrl?: string
}

// 列表查询 DTO
export class ChatRoomListQueryDto {
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
  @IsEnum(ChatRoomStatus)
  status?: ChatRoomStatus
}

// 房间响应 DTO（用于返回前端的基础结构）
export interface ChatRoomResponseDto {
  id: string
  roomNo: string
  name: string
  coverUrl?: string | null
  ownerId: string
  ownerName?: string | null
  status: ChatRoomStatus
  createdAt: Date
  startTime: Date
  endTime?: Date | null
  currentParticipants: number
}

// 发送消息 DTO
export class SendMessageDto {
  @IsString()
  content!: string
}

// 消息查询 DTO（limit 指定拉取数量）
export class MessageQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(200)
  limit?: number = 30
}

// 消息响应 DTO
export interface ChatMessageDto {
  id: string
  roomId: string
  userId: string
  userName?: string | null
  content: string
  createdAt: Date
}
