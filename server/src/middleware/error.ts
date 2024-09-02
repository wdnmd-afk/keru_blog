// errorHandlingMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { Result } from '@/utils';
import {AuthenticationError} from '@/jwt/AuthenticationError'
 function errorHandlingMiddleware() {
    return (err: any, _req: Request, res: Response, next: NextFunction) => {
        if (err.status === 403) {
            // 对于 403 错误，返回相应的 Result
            res.status(403).send(Result.tokenMissing());
        } else if (err.status === 500 || !err.status) {
            // 处理其他错误，比如 500
            res.status(500).send(Result.serverError());
        } else {
            // 调用 next 继续处理其他错误
            next(err);
        }
    };
}

// 中间件来处理状态码
function responseHandler(_req: Request, res: Response, next: NextFunction):void {
    res.sendResponse = (result: any) => {
        if (result.code === 400) {
            res.status(400).json(result);
        } else {
            res.status(result.code || (result.success ? 200 : 500)).json(result);
        }
    };
    next();

}

// @ts-ignore
function authenticationErrorHandler(err:any,_req: Request, res: Response, next: NextFunction) {
    console.log(err,'errrr')
    if (err instanceof AuthenticationError) {
        return res.status(401).json({ message: err.message });
    }
    next(err);
}

export {errorHandlingMiddleware,responseHandler,authenticationErrorHandler}