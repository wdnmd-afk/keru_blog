import { AuthMiddleware } from '@/middleware/auth'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost as PostMapping } from 'inversify-express-utils'
import jsonwebtoken from 'jsonwebtoken'
import multer from 'multer'
import { FileService } from './service'

// 配置multer，处理中文文件名编码问题
const upload = multer({
  storage: multer.memoryStorage(),
  // 修复中文文件名乱码问题
  preservePath: false,
  // 通过fileFilter来处理文件名编码
  fileFilter: (_req, file, cb) => {
    // 尝试修复文件名编码
    if (file.originalname) {
      try {
        // 如果文件名已经是乱码，尝试从buffer重新解码
        const decoded = Buffer.from(file.originalname, 'latin1').toString('utf8')
        // 检查解码后是否包含有效的中文字符
        if (decoded !== file.originalname && /[\u4e00-\u9fa5]/.test(decoded)) {
          file.originalname = decoded
        }
      } catch (error) {
        console.warn('Failed to decode filename:', error)
      }
    }
    cb(null, true)
  },
})

@controller('/file', AuthMiddleware)
export class FileController extends BaseHttpController {
  constructor(@inject(FileService) private readonly fileService: FileService) {
    super()
  }

  /**
   * 获取当前用户ID的通用方法
   */
  private getUserId(req: any): string {
    // 尝试从 httpContext 获取用户信息
    if (this.httpContext && this.httpContext.user && this.httpContext.user.details) {
      return this.httpContext.user.details.id
    }

    // 备用方法：从 JWT token 中直接解析
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new Error('Unauthorized: No token provided')
    }

    const secret = process.env.JWT_SECRET || 'fallback-secret-key'
    const decoded = jsonwebtoken.verify(token, secret) as any
    return decoded.id
  }

  @PostMapping('/merge')
  public async mergeFile(req: any, res: any) {
    try {
      const userId = this.getUserId(req)
      const result = await this.fileService.mergeFile(req.body, userId)
      res.sendResponse(result)
    } catch (error) {
      console.error('mergeFile error:', error)
      res.sendResponse({
        code: error.message.includes('Unauthorized') ? 401 : 500,
        success: false,
        message: error.message,
      })
    }
  }

  @PostMapping('/upload', upload.single('chunkFile'))
  public async uploadFile(req: any, res: any) {
    // 获取原始文件名并修复编码
    let fileName = req.file.originalname

    // 从请求体中获取文件名（如果有的话）
    if (req.body.fileName) {
      fileName = req.body.fileName
    }

    console.log('文件上传 - 原始文件名:', req.file.originalname)
    console.log('文件上传 - 使用文件名:', fileName)

    const result = await this.fileService.uploadFile({
      chunkFile: req.file,
      ...req.body,
      fileName,
    })
    res.sendResponse(result)
  }

  @PostMapping('/uploadSingle', upload.single('file'))
  public async uploadSingle(req: any, res: any) {
    try {
      const userId = this.getUserId(req)

      // 优先使用请求体中的fileName，如果没有则使用originalname
      let fileName = req.body.fileName || req.file.originalname

      // 记录原始文件名用于调试
      console.log('单文件上传 - 原始文件名:', req.file.originalname)
      console.log('单文件上传 - 使用文件名:', fileName)

      // 尝试URL解码（如果是编码过的）
      try {
        if (fileName.includes('%')) {
          const decoded = decodeURIComponent(fileName)
          console.log('单文件上传 - URL解码后:', decoded)
          fileName = decoded
        }
      } catch (error) {
        console.warn('URL decode failed:', error)
      }

      // 传递修正后的文件名到service
      const result = await this.fileService.uploadSingle(
        {
          ...req.file,
          originalname: fileName,
        },
        userId
      )
      res.sendResponse(result)
    } catch (error) {
      console.error('uploadSingle error:', error)
      res.sendResponse({
        code: error.message.includes('Unauthorized') ? 401 : 500,
        success: false,
        message: error.message,
      })
    }
  }

  @PostMapping('/query')
  public async queryFile(req: any, res: any) {
    const data = await this.fileService.queryFileList(req.body)
    res.sendResponse(data)
  }

  @PostMapping('/deleteFile')
  public async deleteFile(req: any, res: any) {
    try {
      const userId = this.getUserId(req)
      const data = await this.fileService.deleteFile(req.body.id, userId)
      res.sendResponse(data)
    } catch (error) {
      console.error('deleteFile error:', error)
      res.sendResponse({
        code: error.message.includes('Unauthorized') ? 401 : 500,
        success: false,
        message: error.message,
      })
    }
  }

  @PostMapping('/check')
  public async checkFile(req: any, res: any) {
    const result = await this.fileService.checkFile(req.body)
    res.sendResponse(result)
  }
}
