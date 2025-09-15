import { IsOptional, IsString, MaxLength, MinLength, IsArray, ValidateNested, IsUrl } from 'class-validator'
import { Type } from 'class-transformer'

// 图片数据 DTO
export class ImageDto {
  @IsString({ message: 'url 必须为字符串' })
  @MaxLength(10000000, { message: 'url 长度过长' }) // 增加到10MB，支持base64图片
  url!: string

  @IsString({ message: 'type 必须为字符串' })
  @MaxLength(50, { message: 'type 长度过长' })
  type!: string
}

// AI 问答请求 DTO（扩展支持图片）
export class ChatDto {
  @IsString({ message: 'message 必须为字符串' })
  @MinLength(1, { message: 'message 不能为空' })
  @MaxLength(4000, { message: 'message 长度不能超过 4000' })
  message!: string

  @IsOptional()
  @IsString({ message: 'conversationId 必须为字符串' })
  @MaxLength(100, { message: 'conversationId 长度过长' })
  conversationId?: string

  @IsOptional()
  @IsArray({ message: 'images 必须为数组' })
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[]
}
