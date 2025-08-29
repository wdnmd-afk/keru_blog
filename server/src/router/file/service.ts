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

    /**
     * 修复中文文件名编码问题
     * @param fileName 原始文件名
     * @returns 修复后的文件名
     */
    private fixFileName(fileName: string): string {
        if (!fileName) return fileName;
        
        try {
            // 方法1：尝试从Latin-1解码为UTF-8
            const utf8Decoded = Buffer.from(fileName, 'latin1').toString('utf8');
            if (utf8Decoded !== fileName && /[\u4e00-\u9fa5]/.test(utf8Decoded)) {
                console.log(`文件名编码修复: ${fileName} -> ${utf8Decoded}`);
                return utf8Decoded;
            }
            
            // 方法2：尝试URL解码
            if (fileName.includes('%')) {
                const urlDecoded = decodeURIComponent(fileName);
                if (urlDecoded !== fileName && /[\u4e00-\u9fa5]/.test(urlDecoded)) {
                    console.log(`文件名URL解码修复: ${fileName} -> ${urlDecoded}`);
                    return urlDecoded;
                }
            }
            
            // 方法3：尝试从ISO-8859-1解码
            if (fileName.includes('\ufffd') || /[\x80-\xff]/.test(fileName)) {
                const isoDecoded = Buffer.from(fileName, 'binary').toString('utf8');
                if (isoDecoded !== fileName && /[\u4e00-\u9fa5]/.test(isoDecoded)) {
                    console.log(`文件名ISO解码修复: ${fileName} -> ${isoDecoded}`);
                    return isoDecoded;
                }
            }
            
        } catch (error) {
            console.warn(`文件名编码修复失败: ${fileName}`, error);
        }
        
        return fileName;
    }

    // ... 其他现有方法 ...

    public async mergeFile(fileData: FileMergeDto, userId: string) {
        const { chunkSize, fileHash } = fileData
        // 修复中文文件名编码问题
        const fileName = this.fixFileName(fileData.fileName)
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
            
            // 检查切片目录是否存在
            if (!fse.existsSync(chunkCache)) {
                throw new Error(`切片目录不存在: ${chunkCache}`)
            }
            
            // 读取 临时所有切片目录 chunkCache 下的所有文件和子目录，并返回这些文件和子目录的名称。
            const chunkPaths = await fse.readdir(chunkCache)
            
            if (chunkPaths.length === 0) {
                throw new Error('没有找到任何切片文件')
            }
            
            // 根据切片下标进行排序
            // 切片名称格式: chunkCache_fileHash-index
            chunkPaths.sort((a, b) => {
                // 提取文件名中的索引部分
                // 格式: chunkCache_fileHash-index
                const getIndexFromChunkName = (chunkName: string): number => {
                    // 移除 'chunkCache_' 前缀
                    const withoutPrefix = chunkName.replace('chunkCache_', '')
                    // 找到最后一个 '-' 的位置
                    const lastDashIndex = withoutPrefix.lastIndexOf('-')
                    if (lastDashIndex === -1) {
                        console.warn(`无法解析切片索引: ${chunkName}`)
                        return 0
                    }
                    // 提取索引部分
                    const indexStr = withoutPrefix.substring(lastDashIndex + 1)
                    const index = parseInt(indexStr, 10)
                    return isNaN(index) ? 0 : index
                }
                
                const indexA = getIndexFromChunkName(a)
                const indexB = getIndexFromChunkName(b)
                return indexA - indexB
            })
            
            console.log(`开始合并文件 ${fileName}, 切片数量: ${chunkPaths.length}`)
            
            let totalSize = 0
            
            // 先删除目标文件（如果存在）
            if (fse.existsSync(filePath)) {
                await fse.remove(filePath)
            }
            
            // 使用顺序合并而不是并行合并，确保文件顺序正确
            for (let index = 0; index < chunkPaths.length; index++) {
                const chunkPath = path.resolve(chunkCache, chunkPaths[index])
                
                // 检查切片文件是否存在
                if (!fse.existsSync(chunkPath)) {
                    throw new Error(`切片文件不存在: ${chunkPath}`)
                }
                
                const stats = await fse.stat(chunkPath)
                totalSize += stats.size
                
                // 读取切片内容并追加到目标文件
                const chunkData = await fse.readFile(chunkPath)
                await fse.appendFile(filePath, chunkData)
                
                console.log(`合并切片 ${index + 1}/${chunkPaths.length}: ${chunkPaths[index]}`)
            }
            
            // 验证合并后的文件大小
            const finalStats = await fse.stat(filePath)
            if (finalStats.size !== totalSize) {
                throw new Error(`文件合并失败，大小不匹配。期望: ${totalSize}, 实际: ${finalStats.size}`)
            }
            
            console.log(`文件合并成功: ${fileName}, 最终大小: ${finalStats.size} 字节`)
            
            // 删除所有切片文件
            for (const chunkName of chunkPaths) {
                const chunkPath = path.resolve(chunkCache, chunkName)
                if (fse.existsSync(chunkPath)) {
                    await fse.remove(chunkPath)
                }
            }
            
            // 递归删除缓存切片目录及其内容
            if (fse.pathExistsSync(chunkCache)) {
                await fse.remove(chunkCache)
            }
            
            // 保存文件元数据到数据库
            await this.PrismaDB.prisma.file.create({
                data: {
                    filename: fileName,
                    path: `/static/${pathType}/${fileName}`,
                    id: generateUniqueBigIntId(true) as string,
                    mimeType: ext,
                    size: finalStats.size,
                    uploader: {
                        connect: { id: userId },
                    },
                },
            })
        } catch (err) {
            console.error('合并切片函数失败:', err)
            return Result.error(400, `合并切片函数失败:${err.message || err}`)
        }
        return Result.success({ fileName })
    }

    public async uploadSingle(file: Express.Multer.File, userId: string) {
        try {
            // 修复中文文件名编码问题
            const fileName = this.fixFileName(file.originalname);

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
        const { fileHash, chunkHash, chunkFile } = fileData
        // 修复中文文件名编码问题
        const fileName = this.fixFileName(fileData.fileName)
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
