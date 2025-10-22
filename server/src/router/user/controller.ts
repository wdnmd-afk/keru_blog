import { Request } from 'express'
import { inject } from 'inversify'
import { controller, httpPost as PostMapping } from 'inversify-express-utils'
import { UserService } from './service'

import { rateLimitMiddleware, validationMiddleware } from '@/middleware'
import { LoginDto, ResetPasswordDto, UserDto } from './user.dto'

@controller('/user')
export class User {
  constructor(@inject(UserService) private readonly UserService: UserService) {}

  @PostMapping('/index') // 获取用户列表
  public async getIndex(_req: Request, res: customResponse) {
    const result = await this.UserService.getList()
    res.sendResponse(result)
  }

  // 添加验证中间件和限流中间件
  @PostMapping(
    '/register',
    rateLimitMiddleware(10, 15 * 60 * 1000), // 15分钟内最多10次注册请求
    validationMiddleware(UserDto)
  )
  public async register(req: Request, res: customResponse) {
    const result = await this.UserService.register(req.body)
    res.sendResponse(result)
  }

  // 添加验证中间件和限流中间件
  @PostMapping(
    '/login',
    rateLimitMiddleware(20, 15 * 60 * 1000), // 15分钟内最多20次登录请求
    validationMiddleware(LoginDto)
  )
  public async login(req: Request, res: customResponse) {
    const result = await this.UserService.login(req.body)
    res.sendResponse(result)
  }

  // 重置密码接口
  @PostMapping(
    '/resetPassword',
    rateLimitMiddleware(5, 15 * 60 * 1000), // 15分钟内最多5次重置密码请求
    validationMiddleware(ResetPasswordDto)
  )
  public async resetPassword(req: Request, res: customResponse) {
    const result = await this.UserService.resetPassword(req.body)
    res.sendResponse(result)
  }

  // 登出接口（兼容管理端 AuthApi.logout 调用）
  @PostMapping('/logout')
  public async logout(_req: Request, res: customResponse) {
    const result = await this.UserService.logout()
    res.sendResponse(result)
  }
}
