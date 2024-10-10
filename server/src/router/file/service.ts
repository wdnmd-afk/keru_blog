import { inject, injectable } from 'inversify'
import { PrismaDB } from '@/db'
import { FileUploadDto } from './file.dto'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { generateUniqueBigIntId } from '@/utils'
import * as fs from 'fs'
import * as path from 'path'

@injectable()
export class FileService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    ) {
    }

    // ... 其他现有方法 ...

    public async uploadFile(fileData: FileUploadDto) {
        // 将传入的 fileData 转换为 FileUploadDto 实例
        const fileDto = plainToClass(FileUploadDto, fileData)

        // 验证 DTO
        const errors = await validate(fileDto)
        if (errors.length) {
            return {
                code: 400,
                message: '验证失败',
                errors: errors,
            }
        }

        try {
            // 生成唯一的 BigInt ID
            const fileId = generateUniqueBigIntId() + ''

            // 确保上传目录存在
            const uploadDir = path.join(__dirname, '../uploads')
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true })
            }

            // 生成文件名和路径
            const fileName = `${fileId}_${fileDto.originalName}`
            const filePath = path.join(uploadDir, fileName)

            // 将文件写入磁盘
            await fs.promises.writeFile(filePath, fileDto.buffer)

            // 在数据库中创建文件记录
            await this.PrismaDB.prisma.file.create({
                data: {
                    id: fileId,
                    originalName: fileDto.originalName,
                    mimeType: fileDto.mimeType,
                    size: fileDto.size,
                    path: filePath,
                    uploadedAt: new Date(),
                },
            })

            return {
                code: 200,
                message: '文件上传成功',
                data: {
                    fileId: fileId,
                    fileName: fileName,
                },
            }
        } catch (error) {
            console.error('文件上传失败:', error)
            return {
                code: 500,
                message: '文件上传失败',
                error: error.message,
            }
        }
    }
}
