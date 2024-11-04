import { controller, httpPost as PostMapping } from 'inversify-express-utils'
import { FileService } from './service'
import { inject } from 'inversify'
import type { Request, Response } from 'express'
import { JWT } from '@/jwt'
import multer from 'multer'

const { middleware } = new JWT()

const upload = multer({ storage: multer.memoryStorage() })

@controller('/file')
export class File {
    constructor(@inject(FileService) private readonly FileService: FileService) {
    }

    @PostMapping('/merge')
    public async mergeFile(req: Request, res: Response) {
        const result = await this.FileService.mergeFile(req.body)
        res.sendResponse(result)
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
