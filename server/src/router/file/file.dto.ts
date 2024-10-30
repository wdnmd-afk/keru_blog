// file.dto.ts
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class FileUploadDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsNotEmpty()
    @IsString()
    filename: string

    @IsNotEmpty()
    @IsString()
    originalName: string

    @IsNotEmpty()
    @IsString()
    mimeType: string

    @IsNotEmpty()
    @IsNumber()
    size: number

    @IsNotEmpty()
    @IsString()
    path: string

    @IsOptional()
    @IsDate()
    uploadedAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?: Date

    @IsNotEmpty()
    @IsString()
    uploaderId: string

    @IsOptional()
    buffer?: Buffer
}


export class FileFragment {
    @IsNotEmpty()
    fragmentId: string

    @IsNotEmpty()
    file: File

}

export class FileCheckDto {

    @IsNotEmpty()
    @IsString()
    fileHash: string

    @IsNotEmpty()
    @IsString()
    fileName: string
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