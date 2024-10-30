import { inject, injectable } from 'inversify'
import { PrismaDB } from '@/db'
import { FileCheckDto, FileChunkDto, FileUploadDto } from './file.dto'
import { createUploadedList, extractExt, getChunkDir, Result } from '@/utils'
import * as path from 'path'
import * as process from 'node:process'
import fse from 'fs-extra'

const UPLOAD_DIR = path.resolve(process.cwd(), 'temp')

@injectable()
export class FileService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    ) {
    }

    // ... 其他现有方法 ...

    public async mergeFile(fileData: FileUploadDto) {

    }

    public async uploadFile(fileData: { chunkFile: Express.Multer.File } & FileChunkDto) {
        console.log(fileData)
        // 文件hash ，切片hash ，文件名
        const { fileHash, chunkHash, fileName, chunkFile } = fileData
        // 创建一个临时文件目录用于 临时存储所有文件切片
        const chunkCache = getChunkDir(fileHash)
        // 检查 chunkDir临时文件目录 是否存在，如果不存在则创建它。
        if (!fse.existsSync(chunkCache)) {
            await fse.mkdirs(chunkCache)
        }
        //   将上传的文件切片移动到指定的存储文件目录
        // 创建完整的文件路径，包括文件名
        const filePath = path.join(chunkCache, `chunkCache_${chunkHash}`)
        // 获取文件buffer
        const buffer = Buffer.from(chunkFile.buffer)
        // 将文件内容写入指定路径
        await fse.writeFile(filePath, buffer)
        return Result.success({ fileHash, chunkHash, fileName })
    }

    public async checkFile(fileData: FileCheckDto) {
        const { fileHash, fileName } = fileData
        // 文件名后缀
        const ext = extractExt(fileName)
        // 最终文件路径
        const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
        const isExist = fse.existsSync(filePath)
        if (isExist) {
            return Result.success({
                shouldUpload: false,
                uploadedList: [],
            })
        } else {
            const data = await createUploadedList(fileHash)
            return Result.success({
                shouldUpload: true,
                uploadedList: data,
            })
        }
    }
}
