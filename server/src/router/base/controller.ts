import { validationMiddleware } from '@/middleware'
import { AuthMiddleware } from '@/middleware/auth'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost as PostMapping } from 'inversify-express-utils'
import jsonwebtoken from 'jsonwebtoken'
import { UserDetailDto } from './base.dto'
import { BaseService } from './service'

@controller('/base', AuthMiddleware)
export class BaseController extends BaseHttpController {
  constructor(@inject(BaseService) private readonly baseService: BaseService) {
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

  @PostMapping('/createUserDetail', validationMiddleware(UserDetailDto))
  public async updateUserDetail(req: Request, res: Response) {
    try {
      const userId = this.getUserId(req)
      const result = await this.baseService.createUserDetail(req.body, userId)
      ;(res as any).sendResponse(result)
    } catch (error) {
      console.error('updateUserDetail error:', error)
      ;(res as any).sendResponse({
        code: error.message.includes('Unauthorized') ? 401 : 500,
        success: false,
        message: error.message,
      })
    }
  }
}
