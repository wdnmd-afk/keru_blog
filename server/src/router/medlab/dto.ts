import { Type } from 'class-transformer'
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator'

/**
 * 医学检验-患者信息 DTO（全部可选，以免暴露隐私）
 */
export class MedLabPatientDto {
  @IsOptional()
  @IsString({ message: 'patient.name 必须为字符串' })
  @MaxLength(64, { message: 'patient.name 长度过长' })
  name?: string

  @IsOptional()
  @IsString({ message: 'patient.gender 必须为字符串' })
  @MaxLength(16, { message: 'patient.gender 长度过长' })
  gender?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'patient.age 必须为数字' })
  @Min(0, { message: 'patient.age 不能为负数' })
  age?: number

  @IsOptional()
  @IsString({ message: 'patient.id 必须为字符串' })
  @MaxLength(64, { message: 'patient.id 长度过长' })
  id?: string
}

/**
 * 医学检验-单个检验项目 DTO
 */
export class MedLabItemDto {
  @IsString({ message: 'items[].name 必须为字符串' })
  @MaxLength(128, { message: 'items[].name 长度过长' })
  name!: string

  @IsOptional()
  @IsString({ message: 'items[].sampleType 必须为字符串' })
  @MaxLength(64, { message: 'items[].sampleType 长度过长' })
  sampleType?: string

  @IsOptional()
  @IsString({ message: 'items[].method 必须为字符串' })
  @MaxLength(128, { message: 'items[].method 长度过长' })
  method?: string

  @IsOptional()
  @IsString({ message: 'items[].instrument 必须为字符串' })
  @MaxLength(128, { message: 'items[].instrument 长度过长' })
  instrument?: string

  // 结果值：为提升兼容性，允许字符串（如带有“>”、“<”、“阴性/阳性”等）
  @IsString({ message: 'items[].result 必须为字符串（数值亦请以字符串形式提交）' })
  @MaxLength(64, { message: 'items[].result 长度过长' })
  result!: string

  @IsOptional()
  @IsString({ message: 'items[].unit 必须为字符串' })
  @MaxLength(32, { message: 'items[].unit 长度过长' })
  unit?: string

  @IsOptional()
  @IsString({ message: 'items[].refRange 必须为字符串' })
  @MaxLength(128, { message: 'items[].refRange 长度过长' })
  refRange?: string
}

/**
 * 运行时可覆盖的轻量配置 DTO
 */
export class MedLabRunConfigDto {
  @IsOptional()
  @IsString({ message: 'config.systemPromptHeader 必须为字符串' })
  @MaxLength(1000, { message: 'config.systemPromptHeader 长度过长' })
  systemPromptHeader?: string

  @IsOptional()
  @IsString({ message: 'config.language 必须为字符串' })
  @MaxLength(10, { message: 'config.language 长度过长' })
  language?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'config.maxAdviceChars 必须为数字' })
  maxAdviceChars?: number

  @IsOptional()
  @IsString({ message: 'config.disclaimer 必须为字符串' })
  @MaxLength(1000, { message: 'config.disclaimer 长度过长' })
  disclaimer?: string
}

/**
 * 医学检验建议请求 DTO
 */
export class MedLabAdviceDto {
  // 兼容 test.json 顶层字段（可选）
  @IsOptional()
  @IsString({ message: 'personGender 必须为字符串' })
  @MaxLength(16, { message: 'personGender 长度过长' })
  personGender?: string

  @IsOptional()
  @IsString({ message: 'personAge 必须为字符串' })
  @MaxLength(16, { message: 'personAge 长度过长' })
  personAge?: string

  @IsOptional()
  @IsString({ message: 'item 必须为字符串' })
  @MaxLength(64, { message: 'item 长度过长' })
  item?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => MedLabPatientDto)
  patient?: MedLabPatientDto

  @IsOptional()
  @IsArray({ message: 'items 必须为数组' })
  @ValidateNested({ each: true })
  @Type(() => MedLabItemDto)
  items?: MedLabItemDto[]

  @IsOptional()
  @IsObject({ message: 'context 必须为对象' })
  context?: Record<string, any>

  @IsOptional()
  @ValidateNested()
  @Type(() => MedLabRunConfigDto)
  config?: MedLabRunConfigDto

  // 兼容外部完整模板结构：如 test.json 的 data 数组
  @IsOptional()
  @IsArray({ message: 'data 必须为数组' })
  data?: any[]
}
