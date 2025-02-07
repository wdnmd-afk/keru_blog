import { inject, injectable } from 'inversify'
import { PrismaDB } from '@/db'
import { FileCheckDto, FileChunkDto, FileMergeDto, FileQueryDto } from './file.dto'
import {
    createUploadedList,
    extractExt,
    generateUniqueBigIntId,
    getChunkDir,
    getJwt,
    pipeStream,
    Result,
} from '@/utils'
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

    public async mergeFile(req: { body: FileMergeDto }) {
        const fileData: FileMergeDto = req.body
        const { chunkSize, fileHash, fileName } = fileData
        // 提取文件后缀名
        const ext = extractExt(fileName)
        // 整个文件路径 /target/文件hash.文件后缀
        const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
        try {
            // target/chunkCache_fileHash值
            const chunkCache = getChunkDir(fileHash)
            // 读取 临时所有切片目录 chunkCache 下的所有文件和子目录，并返回这些文件和子目录的名称。
            const chunkPaths = await fse.readdir(chunkCache)
            // 根据切片下标进行排序
            // 否则直接读取目录的获得的顺序会错乱
            chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
            let totalSize = 0
            let promiseList = []
            for (let index = 0; index < chunkPaths.length; index++) {
                // target/chunkCache_hash值/文件切片位置
                let chunkPath = path.resolve(chunkCache, chunkPaths[index])
                const stats = await fse.stat(chunkPath)
                totalSize += stats.size
                // 根据 index * chunkSize 在指定位置创建可写流
                let writeStream = fse.createWriteStream(filePath, {
                    start: index * chunkSize,
                })
                promiseList.push(pipeStream(chunkPath, writeStream))
            }
            const usr = await getJwt(req)
            // 使用 Promise.all 等待所有 Promise 完成
            // (相当于等待所有的切片已写入完成且删除了所有的切片文件)
            Promise.all(promiseList)
                .then(async () => {
                    console.log('所有文件切片已成功处理并删除')
                    // 递归删除缓存切片目录及其内容 (注意，如果删除不存在的内容会报错)
                    if (fse.pathExistsSync(chunkCache)) {
                        fse.remove(chunkCache)
                        console.log(`chunkCache缓存目录删除成功`)
                        // 在这里执行所有切片处理完成后的操作，把文件地址写入数据库
                        const mimeType = fileName.split('.').pop()
                        await this.PrismaDB.prisma.file.create({
                            data: {
                                filename: fileName,
                                path: filePath,
                                id: generateUniqueBigIntId(true) as string,
                                mimeType,
                                size: totalSize,
                                uploader: {
                                    connect: { id: usr.id }
                                }
                            },
                        })

                        // 合并成功，返回 Promise.resolve
                        return Promise.resolve()
                    } else {

                        return Promise.reject(Result.error(400, `${chunkCache} 不存在，不能删除`))
                    }
                })
                .catch((err) => {
                    console.error('文件处理过程中发生错误：', err)
                    return Result.error(400, `文件处理过程中发生错误：${err}`)
                })
        } catch (err) {
            console.log(err, '合并切片函数失败')
            return Result.error(400, `合并切片函数失败:${err}`)
        }
        return Result.success({ fileName })
    }

    public async uploadFile(fileData: { chunkFile: Express.Multer.File } & FileChunkDto) {
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

    public async queryFileList(queryDto:FileQueryDto) {
        const { page, pageSize, fileName, userName } = queryDto;
        const prisma = this.PrismaDB.prisma

        // 构建查询条件：如果传入了 fileName 则做模糊匹配；
        // 如果传入了 userName，则通过 uploader 关联做模糊匹配

        const files = await prisma.file.findMany({
            where: {

            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            // 查询关联的 uploader，并只取出 name 字段
            include: {
                uploader: {
                    select: {
                        name: true,
                    },
                },
            },
            // 可以按上传时间降序排序（可根据实际需求调整）
            orderBy: {
                uploadedAt: 'desc',
            },
        });

        return files;
    }
}
