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

    @PostMapping('/upload', middleware(), upload.single('file'))
    public async uploadFile(req: Request, res: Response) {
        if (!req.file) {
            return res.status(400).send({ message: '没有文件被上传' })
        }

        const fileData: FileUploadDto = {
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            buffer: req.file.buffer,
        }

        const result = await this.FileService.uploadFile(fileData)
        res.send(result)
    }

    @PostMapping('/test', middleware())
    public async deleteFile(req: Request, res: Response) {

        res.json({ ...req.user })
    }
}
