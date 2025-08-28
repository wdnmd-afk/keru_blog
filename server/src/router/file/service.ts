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
import { getFileType } from '@/enum'

const UPLOAD_DIR = path.resolve(process.cwd(), 'temp')


@injectable()
export class FileService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    ) {
    }

    // ... 其他现有方法 ...

    public async mergeFile(fileData: FileMergeDto, userId: string) {
        const { chunkSize, fileHash, fileName } = fileData
        // 提取文件后缀名
        const ext = extractExt(fileName)
        const pathType = getFileType(ext)
        const UPLOAD_DIR = path.resolve(process.cwd(), `static/${pathType}`)
        if (!fse.existsSync(UPLOAD_DIR)) {
            await fse.mkdirs(UPLOAD_DIR)
        }
        // 整个文件路径 /target/文件hash.文件后缀
        const filePath = path.resolve(UPLOAD_DIR, `${fileName}`)
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
            // 使用 Promise.all 等待所有 Promise 完成
            // (相当于等待所有的切片已写入完成且删除了所有的切片文件)
            await Promise.all(promiseList)
            
            // 递归删除缓存切片目录及其内容 (注意，如果删除不存在的内容会报错)
            if (fse.pathExistsSync(chunkCache)) {
                fse.remove(chunkCache)

                await this.PrismaDB.prisma.file.create({
                    data: {
                        filename: fileName,
                        path: `/static/${pathType}/${fileName}`,
                        id: generateUniqueBigIntId(true) as string,
                        mimeType: ext,
                        size: totalSize,
                        uploader: {
                            connect: { id: userId },
                        },
                    },
                })
            }
        } catch (err) {
            console.log(err, '合并切片函数失败')
            return Result.error(400, `合并切片函数失败:${err}`)
        }
        return Result.success({ fileName })
    }

    public async uploadSingle(file: Express.Multer.File, userId: string) {
        try {
            const fileName = file.originalname;

            // 提取文件后缀名并获取类型
            const ext = extractExt(fileName);
            const type = getFileType(ext);
            const UPLOAD_DIR = path.resolve(process.cwd(), `static/${type}`);

            // 确保文件目录存在
            if (!fse.existsSync(UPLOAD_DIR)) {
                await fse.mkdirs(UPLOAD_DIR);
            }

            // 生成完整的文件路径（直接使用文件名，无需编码）
            const filePath = path.resolve(UPLOAD_DIR, fileName);

            // 获取文件的 buffer
            const buffer = file.buffer;

            // 将文件内容写入指定路径
            await fse.writeFile(filePath, buffer);

            // 将文件元数据插入到数据库
            await this.PrismaDB.prisma.file.create({
                data: {
                    filename: fileName,
                    path: `/static/${type}/${fileName}`, // 使用原始文件名
                    id: generateUniqueBigIntId(true) as string,
                    mimeType: ext,
                    size: file.size,
                    uploader: {
                        connect: { id: userId },
                    },
                },
            });

            return Result.success({ fileName });
        } catch (error) {
            console.error("文件上传错误:", error);
            return Result.error(400,"文件上传失败，请重试！");
        }
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

    public async queryFileList(queryDto: FileQueryDto) {
        const { page, pageSize, fileName, userName } = queryDto
        const prisma = this.PrismaDB.prisma
        const where = {
            filename: fileName ? { contains: fileName } : undefined, // 模糊匹配文件名，忽略大小写
            uploader: userName ? { name: { contains: userName } } : undefined, // 模糊匹配用户名，忽略大小写
        }
        // 构建查询条件：如果传入了 fileName 则做模糊匹配；
        // 如果传入了 userName，则通过 uploader 关联做模糊匹配

        const [files, total] = await prisma.$transaction([
            prisma.file.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                include: {
                    uploader: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: {
                    uploadedAt: 'desc',
                },
            }),
            prisma.file.count({
                where,
            }),
        ])
        const result = files.map((file) => {

            return {
                ...file,
                total,
                uploader: file.uploader.name,
            }
        })

        return Result.success(
            {
                fileList: result,
                total,
            },
        )
    }
    public async deleteFile(id: string, userId: string) {
        const data = await this.PrismaDB.prisma.file.findUnique({
            where: { id }
        });

        if (!data) {
            return Result.error(404, '文件记录不存在');
        }

        // Authorization check
        if (data.uploaderId !== userId) {
            return Result.error(403, '无权限删除此文件');
        }

        const tempPath = data.path.substring(1);
        const UPLOAD_DIR = path.resolve(process.cwd(), `${tempPath}`);
        
        await this.PrismaDB.prisma.file.delete({ where: { id } });
        
        const exists = await fse.pathExists(UPLOAD_DIR);
        if (exists) {
            await fse.remove(UPLOAD_DIR);
        }
        
        return Result.success('删除成功');
    }
}
