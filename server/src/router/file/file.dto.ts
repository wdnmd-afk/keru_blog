// file.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class FileUploadDto {
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
    buffer: Buffer
}
