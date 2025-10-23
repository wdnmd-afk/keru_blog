// errorHandlingMiddleware.ts
import { ApiResponse, BusinessException } from '@/common'
import { isWhiteListPath } from '@/config/whitelist'
import { NextFunction, Request, Response } from 'express'
import { getGlobalContainer } from '@/config/container.instance'
import { MonitorService } from '@/router/monitor/service'
import passport from 'passport'
import { v4 as uuidv4 } from 'uuid'

// 扩展Request类型添加requestId
declare global {
  namespace Express {
    interface Request {
      requestId?: string
    }
  }
}

/**
 * 请求ID中间件，为每个请求生成唯一ID
 */
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  req.requestId = (req.headers['x-request-id'] as string) || uuidv4()
  res.setHeader('X-Request-ID', req.requestId)
  next()
}

/**
 * 统一错误处理中间件
 */
function errorHandlingMiddleware() {
  return (err: any, req: Request, res: Response, _next: NextFunction) => {
    const requestId = req.requestId

    // 记录错误日志
    console.error(`[${requestId}] Error occurred:`, {
      error: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    })

    // 将严重错误写入数据库系统日志（防守：不影响主流程）
    ;(async () => {
      try {
        const container = getGlobalContainer()
        if (!container) return
        const monitor = container.get<MonitorService>(MonitorService)
        await monitor.writeDbLog({
          source: 'server',
          type: 'server_error',
          level: 'error',
          message: err?.message || '服务器内部错误',
          context: {
            requestId,
            url: req.url,
            method: req.method,
            ip: req.ip,
            userAgent: req.get('User-Agent') || '',
            stack: err?.stack || '',
          },
          route: req.path,
          userId: (req as any)?.user?.id || undefined,
          ip: req.ip,
          userAgent: req.get('User-Agent') || undefined,
        })
      } catch (e) {
        // 忽略入库失败，避免影响错误响应
      }
    })()

    let response: ApiResponse<null>

    // 处理不同类型的错误
    if (err instanceof BusinessException) {
      // 业务异常
      response = ApiResponse.fromException(err)
    } else if (err.name === 'ValidationError') {
      // 数据验证错误
      response = ApiResponse.validationError(err.message, err.details, requestId)
    } else if (err.status === 403) {
      // 禁止访问
      response = ApiResponse.error(403, '无权限访问，token缺失', requestId)
    } else if (err.status === 401) {
      // 未授权
      response = ApiResponse.error(401, '未授权访问', requestId)
    } else {
      // 其他未知错误
      const isDev = process.env.NODE_ENV === 'development'
      const message = isDev ? err.message : '服务器内部错误'
      response = ApiResponse.error(500, message, requestId)
    }

    // 返回错误响应
    res.status(response.getHttpStatusCode()).json(response.toJSON())
  }
}

// 中间件来处理状态码
function responseHandler(req: Request, res: Response, next: NextFunction): void {
  // 扩展Response对象，添加sendResponse方法
  res.sendResponse = (result: any) => {
    const requestId = req.requestId

    // 如果是ApiResponse实例，直接使用
    if (result instanceof ApiResponse) {
      return res.status(result.getHttpStatusCode()).json(result.toJSON())
    }

    // 兼容老的Result类格式
    if (result && typeof result.code === 'number') {
      const statusCode =
        result.code === 400 ? 400 : result.success === false ? 500 : result.code || 200
      return res.status(statusCode).json({
        ...result,
        requestId,
      })
    }

    // 默认处理
    return res.status(200).json({
      success: true,
      code: 200,
      message: '操作成功',
      data: result,
      requestId,
    })
  }
  next()
  return
}

// 自定义的认证失败处理器
const AuthenticationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.requestId

  // 调试：打印实际的路径信息
  console.log(
    `[${requestId}] Request URL: ${req.url}, Path: ${req.path}, Original URL: ${req.originalUrl}`
  )

  // 先检查白名单，如果在白名单中直接跳过认证
  if (isWhiteListPath(req.path)) {
    console.log(`[${requestId}] Path ${req.path} is in whitelist, skipping authentication`)
    return next()
  }

  // 不在白名单中，进行JWT认证
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      console.error(`[${requestId}] Authentication error:`, err.message)
      return next(err)
    }

    if (!user) {
      console.log(`[${requestId}] Authentication failed for path ${req.path}: no user found`)
      const response = ApiResponse.error(401, 'Unauthorized！缺少token或者token无效！', requestId)
      return res.status(401).json(response.toJSON())
    }

    // 将用户信息添加到请求中
    req.user = user
    console.log(`[${requestId}] Authentication successful for user:`, user.id)
    next()
  })(req, res, next)
}

export { AuthenticationErrorHandler, errorHandlingMiddleware, responseHandler }
