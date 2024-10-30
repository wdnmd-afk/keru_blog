import { controller, httpPost as PostMapping } from 'inversify-express-utils'
import { FileService } from './service'
import { inject } from 'inversify'
import type { Request, Response } from 'express'
import { JWT } from '@/jwt'
import multer from 'multer'
import { FileUploadDto } from './file.dto'

const { middleware } = new JWT()

const upload = multer({ storage: multer.memoryStorage() })

@controller('/file')
export class File {
    constructor(@inject(FileService) private readonly FileService: FileService) {
    }

    @PostMapping('/merge', middleware(), upload.single('file'))
    public async mergeFile(req: Request, res: Response) {
        if (!req.file) {
            return res.status(400).send({ message: '没有文件被上传' })
        }

        // 假设 uploaderId 来自认证中间件或请求体
        const uploaderId = req.user?.id || req.body.uploaderId

        if (!uploaderId) {
            return res.status(400).send({ message: '上传者ID不能为空' })
        }

        const fileData: FileUploadDto = {
            filename: req.file.filename, // 假设 multer 提供了这个
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            path: req.file.path, // 假设 multer 提供了这个
            uploaderId: uploaderId,
            buffer: req.file.buffer,
        }

        const result = await this.FileService.mergeFile(fileData)
        res.send(result)
    }

    @PostMapping('/upload', upload.single('chunkFile'))
    public async uploadFile(req: Request, res: Response) {

        const result = await this.FileService.uploadFile({ chunkFile: req.file, ...req.body })

        res.sendResponse(result)

    }

    @PostMapping('/test', middleware())
    public async deleteFile(req: Request, res: Response) {

        res.json({ ...req.user })
    }

    @PostMapping('/check')
    public async checkFile(req: Request, res: Response) {
        const result = await this.FileService.checkFile(req.body)
        res.sendResponse(result)
    }
}
