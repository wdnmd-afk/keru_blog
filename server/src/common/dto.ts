//公共分页Dto
import { IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

/**
 * 分页查询DTO基类
 */
export class PageDto {
    @IsOptional()
    @IsNumber({}, { message: '页码必须是数字' })
    @Min(1, { message: '页码不能小于1' })
    @Transform(({ value }) => parseInt(value, 10))
    page: number = 1

    @IsOptional()
    @IsNumber({}, { message: '每页大小必须是数字' })
    @Min(1, { message: '每页大小不能小于1' })
    @Transform(({ value }) => Math.min(parseInt(value, 10), 100)) // 最大限制100条
    pageSize: number = 10

    /**
     * 获取跳过的记录数
     */
    get skip(): number {
        return (this.page - 1) * this.pageSize
    }

    /**
     * 获取获取的记录数
     */
    get take(): number {
        return this.pageSize
    }
}