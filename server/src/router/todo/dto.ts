import { IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { TodoType } from '@prisma/client';

export class CreateTodoDto {
  @IsString()
  content: string;

  @IsEnum(TodoType)
  type: TodoType;
}

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsEnum(TodoType)
  @IsOptional()
  type?: TodoType;
}
