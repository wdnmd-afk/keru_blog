// 注意：为避免 @prisma/client 未生成或未导出 TodoType 导致的运行时报错，这里定义本地枚举与 Prisma 枚举保持一致
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

// 与 prisma/schema.prisma 中的 enum TodoType 保持一致
export enum TodoTypeEnum {
  RECENT = 'RECENT',
  LONG_TERM = 'LONG_TERM',
  STUDY_PLAN = 'STUDY_PLAN',
}
// 供类型使用的字符串联合，便于与 Prisma 的字符串联合类型兼容
export type TodoTypeString = keyof typeof TodoTypeEnum

export class CreateTodoDto {
  @IsString()
  content: string

  // 使用本地枚举进行校验，避免依赖 Prisma 客户端导出
  @IsEnum(TodoTypeEnum)
  type: TodoTypeString
}

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsBoolean()
  @IsOptional()
  completed?: boolean

  @IsEnum(TodoTypeEnum)
  @IsOptional()
  type?: TodoTypeString
}
