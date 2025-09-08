import { TodoType } from '@prisma/client'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  content: string

  @IsEnum(TodoType)
  type: TodoType
}

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsBoolean()
  @IsOptional()
  completed?: boolean

  @IsEnum(TodoType)
  @IsOptional()
  type?: TodoType
}
