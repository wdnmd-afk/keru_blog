import { ApiResponse } from '@/common'
import { isWhiteListPath } from '@/config/whitelist'
import { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { BaseMiddleware } from 'inversify-express-utils'
import jsonwebtoken from 'jsonwebtoken'

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction): void {
    // 检查当前路由是否在白名单中
    if (isWhiteListPath(req.path)) {
      return next()
    }

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      const response = ApiResponse.error(401, 'Unauthorized: No token provided', req.requestId)
      res.status(401).json(response.toJSON())
      return
    }

    try {
      const secret = process.env.JWT_SECRET || 'fallback-secret-key'
      const decoded = jsonwebtoken.verify(token, secret)

      if (typeof decoded === 'string') {
        throw new Error('Invalid token payload')
      }

      // 将用户信息附加到请求上下文中，以便后续控制器使用
      this.httpContext.user = {
        ...this.httpContext.user,
        details: decoded,
        isAuthenticated: () => Promise.resolve(true),
        isResourceOwner: () => Promise.resolve(true),
        isInRole: () => Promise.resolve(true),
      }

      next()
    } catch (err) {
      const response = ApiResponse.error(401, `Unauthorized: ${err.message}`, req.requestId)
      res.status(401).json(response.toJSON())
    }
  }
}
