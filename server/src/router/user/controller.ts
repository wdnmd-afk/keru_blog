import { controller, httpPost as PostMapping } from 'inversify-express-utils'
import { UserService } from './service'
import { inject } from 'inversify'
import { Request, Response } from 'express'
import { JWT } from '@/jwt'
import { validationMiddleware, rateLimitMiddleware } from '@/middleware'
import { UserDto, LoginDto } from './user.dto'

const { middleware } = new JWT()

@controller('/user')
export class User {
    constructor(@inject(UserService) private readonly UserService: UserService) {}

    @PostMapping('/index', middleware()) // 主要代码
    public async getIndex(_req: Request, res: Response) {
        let result = await this.UserService.getList()
        res.send(result)
    }

    // 添加验证中间件和限流中间件
    @PostMapping('/register', 
        rateLimitMiddleware(10, 15 * 60 * 1000), // 15分钟内最多10次注册请求
        validationMiddleware(UserDto)
    )
    public async register(req: Request, res: customResponse) {
        const result = await this.UserService.register(req.body)
        res.sendResponse(result)
    }

    // 添加验证中间件和限流中间件
    @PostMapping('/login',
        rateLimitMiddleware(20, 15 * 60 * 1000), // 15分钟内最多20次登录请求
        validationMiddleware(LoginDto)
    )
    public async login(req: Request, res: customResponse) {
        const result = await this.UserService.login(req.body)
        res.sendResponse(result)
    }
}
