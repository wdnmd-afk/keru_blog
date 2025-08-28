import { controller, httpPost as PostMapping, BaseHttpController } from 'inversify-express-utils';
import { FileService } from './service';
import { inject } from 'inversify';
import multer from 'multer';
import { AuthMiddleware } from '@/middleware/auth';
import jsonwebtoken from 'jsonwebtoken';

const upload = multer({ storage: multer.memoryStorage() });

@controller('/file', AuthMiddleware)
export class FileController extends BaseHttpController {
    constructor(@inject(FileService) private readonly fileService: FileService) {
        super();
    }

    /**
     * 获取当前用户ID的通用方法
     */
    private getUserId(req: any): string {
        // 尝试从 httpContext 获取用户信息
        if (this.httpContext && this.httpContext.user && this.httpContext.user.details) {
            return this.httpContext.user.details.id;
        }
        
        // 备用方法：从 JWT token 中直接解析
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Unauthorized: No token provided');
        }
        
        const secret = process.env.JWT_SECRET || 'fallback-secret-key';
        const decoded = jsonwebtoken.verify(token, secret) as any;
        return decoded.id;
    }

    @PostMapping('/merge')
    public async mergeFile(req: any, res: any) {
        try {
            const userId = this.getUserId(req);
            const result = await this.fileService.mergeFile(req.body, userId);
            res.sendResponse(result);
        } catch (error) {
            console.error('mergeFile error:', error);
            res.sendResponse({
                code: error.message.includes('Unauthorized') ? 401 : 500,
                success: false,
                message: error.message
            });
        }
    }

    @PostMapping('/upload', upload.single('chunkFile'))
    public async uploadFile(req: any, res: any) {
        const fileName = req.file.originalname; // 获取原始文件名
        const result = await this.fileService.uploadFile({ chunkFile: req.file, ...req.body, fileName });
        res.sendResponse(result);
    }

    @PostMapping('/uploadSingle', upload.single('file'))
    public async uploadSingle(req: any, res: any) {
        try {
            const userId = this.getUserId(req);
            const result = await this.fileService.uploadSingle(req.file, userId);
            res.sendResponse(result);
        } catch (error) {
            console.error('uploadSingle error:', error);
            res.sendResponse({
                code: error.message.includes('Unauthorized') ? 401 : 500,
                success: false,
                message: error.message
            });
        }
    }

    @PostMapping('/query')
    public async queryFile(req: any, res: any) {
        const data = await this.fileService.queryFileList(req.body);
        res.sendResponse(data);
    }

    @PostMapping('/deleteFile')
    public async deleteFile(req: any, res: any) {
        try {
            const userId = this.getUserId(req);
            const data = await this.fileService.deleteFile(req.body.id, userId);
            res.sendResponse(data);
        } catch (error) {
            console.error('deleteFile error:', error);
            res.sendResponse({
                code: error.message.includes('Unauthorized') ? 401 : 500,
                success: false,
                message: error.message
            });
        }
    }

    @PostMapping('/check')
    public async checkFile(req: any, res: any) {
        const result = await this.fileService.checkFile(req.body);
        res.sendResponse(result);
    }
}

