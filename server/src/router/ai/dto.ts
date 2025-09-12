import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

// AI 问答请求 DTO
export class ChatDto {
  @IsString({ message: 'message 必须为字符串' })
  @MinLength(1, { message: 'message 不能为空' })
  @MaxLength(4000, { message: 'message 长度不能超过 4000' })
  message!: string

  @IsOptional()
  @IsString({ message: 'conversationId 必须为字符串' })
  @MaxLength(100, { message: 'conversationId 长度过长' })
  conversationId?: string
}

