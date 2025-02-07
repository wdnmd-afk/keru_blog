//公共分页Dto
import { IsNotEmpty, IsNumber } from 'class-validator'

export class PageDto  {
    @IsNumber()
    @IsNotEmpty()
    page: number = 1;
    @IsNotEmpty()
    @IsNumber()
    pageSize: number = 10;
}