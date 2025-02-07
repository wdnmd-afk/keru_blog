// file.dto.ts
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { PageDto } from '@/common/dto'







export class FileCheckDto {

    @IsNotEmpty()
    @IsString()
    fileHash: string

    @IsNotEmpty()
    @IsString()
    fileName: string
}

export class FileMergeDto extends FileCheckDto {
    @IsNotEmpty()
    @IsNumber()
    chunkSize: number
}

export class FileChunkDto {
    @IsNotEmpty()
    @IsString()
    fileHash: string // 总文件hash

    @IsNotEmpty()
    @IsNumber()
    fileSize: number // 总文件size

    @IsNotEmpty()
    @IsString()
    fileName: string // 总文件name

    @IsNotEmpty()
    @IsNumber()
    index: number

    @IsNotEmpty()
    chunkFile: Blob // 切片文件本身

    @IsNotEmpty()
    @IsString()
    chunkHash: string // 单个切片hash,以 - 连接

    @IsOptional()
    @IsNumber()
    chunkSize: number | undefined // 切片文件大小

    @IsNotEmpty()
    @IsNumber()
    chunkNumber: number // 切片个数
}

export class FileQueryDto extends PageDto{
    @IsString()
    userName?:string
    @IsString()
    fileName?:string
}