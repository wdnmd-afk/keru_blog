import { Transform } from 'class-transformer'
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator'

export class UserDetailDto {
  id?: string

  @IsOptional()
  @IsString({ message: '地址必须是字符串' })
  @Transform(({ value }) => value?.trim())
  address?: string

  @IsOptional()
  @IsString({ message: '电话号码必须是字符串' })
  @Transform(({ value }) => value?.trim())
  phoneNumber?: string

  @IsOptional()
  @IsString({ message: '简介必须是字符串' })
  @Transform(({ value }) => value?.trim())
  bio?: string

  @IsOptional()
  @IsString({ message: '性别必须是字符串' })
  @IsIn(['male', 'female', 'other'], { message: '性别必须是 male, female 或 other' })
  sex?: string

  @IsOptional()
  @IsInt({ message: '年龄必须是整数' })
  @Min(0, { message: '年龄不能小于0' })
  @Max(120, { message: '年龄不能大于120' })
  age?: number

  @IsNotEmpty({ message: '头像URL必填' })
  @IsUrl({}, { message: '头像URL格式不正确' })
  avatar: string

  @IsNotEmpty({ message: '用户ID必填' })
  @IsString({ message: '用户ID必须是字符串' })
  userId: string // 确保与 Prisma 类型一致
}
