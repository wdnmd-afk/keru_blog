// errorHandlingMiddleware.ts
import { NextFunction, Request, Response } from 'express'
import { Result } from '@/utils'
import passport from 'passport'

function errorHandlingMiddleware() {
    return (err: any, _req: Request, res: Response, next: NextFunction) => {
        if (err.status === 403) {
            // 对于 403 错误，返回相应的 Result
            res.status(403).send(Result.tokenMissing())
        } else if (err.status === 500 || !err.status) {
            console.log('这里出现500',err)
            // 处理其他错误，比如 500
            res.status(500).send(Result.serverError())
        } else {
            // 调用 next 继续处理其他错误
            next(err)
        }
    }
}

// 中间件来处理状态码
function responseHandler(_req: Request, res: Response, next: NextFunction): void {
    res.sendResponse = (result: any) => {
        if (result.code === 400) {
            res.status(400).json(result)
        } else {
            res.status(result.code || (result.success ? 200 : 500)).json(result)
        }
    }
    next()

}

// 自定义的认证失败处理器
const AuthenticationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        // 定义不需要身份验证的路径
        const openPaths = ['/login', '/register']
        for (let i = 0; i < openPaths.length; i++) {
            if (req.path.includes(openPaths[i])) {
                return next()
            }
        }
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Unauthorized！缺少token或者token无效！' })
        }
        // console.log(user, 'uu')
        // req.user = user
        next()
    })(req, res, next)
}


export { errorHandlingMiddleware, responseHandler, AuthenticationErrorHandler }