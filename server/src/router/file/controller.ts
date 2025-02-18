import { controller, httpPost as PostMapping } from 'inversify-express-utils'
import { FileService } from './service'
import { inject } from 'inversify'
import type { Request, Response } from 'express'
import multer from 'multer'


const upload = multer({ storage: multer.memoryStorage() })

@controller('/file')
export class File {
    constructor(@inject(FileService) private readonly FileService: FileService) {
    }

    @PostMapping('/merge')
    public async mergeFile(req: Request, res: Response) {
        const result = await this.FileService.mergeFile(req)
        res.sendResponse(result)
    }

    @PostMapping('/upload', upload.single('chunkFile'))
    public async uploadFile(req: Request, res: Response) {
        const fileName = req.file.originalname; // 获取原始文件名
        const result = await this.FileService.uploadFile({ chunkFile: req.file, ...req.body,fileName })
        res.sendResponse(result)
    }
    @PostMapping('/uploadSingle', upload.single('file'))
    public async uploadSingle(req: Request, res: Response) {

        const result = await this.FileService.uploadSingle(req)
        res.sendResponse(result)
    }

    @PostMapping('/query')
    public async queryFile(req: Request, res: Response) {
        const data = await this.FileService.queryFileList(req.body)
        res.sendResponse(data)
    }
    @PostMapping('/deleteFile')
    public async deleteFile(req: Request, res: Response) {
        const data = await this.FileService.deleteFile(req.body.id)
        res.sendResponse(data)
    }

    @PostMapping('/check')
    public async checkFile(req: Request, res: Response) {
        const result = await this.FileService.checkFile(req.body)
        res.sendResponse(result)
    }
}
