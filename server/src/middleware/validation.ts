// validation.ts
import { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { Result } from '@/utils/result'

/**
 * 通用验证中间件工厂函数
 * @param dtoClass DTO类
 * @param skipMissingProperties 是否跳过缺失属性的验证
 */
export function validationMiddleware<T>(
    dtoClass: new () => T,
    skipMissingProperties = false
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 转换请求数据为DTO实例
            const dto = plainToClass(dtoClass, req.body)
            
            // 执行验证
            const errors = await validate(dto as any, {
                skipMissingProperties,
                whitelist: true, // 移除非装饰器属性
                forbidNonWhitelisted: true // 如果有非白名单属性则报错
            })
            
            if (errors.length > 0) {
                // 格式化错误消息
                const errorMessages = formatValidationErrors(errors)
                return res.status(400).json(Result.validationError(errorMessages.join('; ')))
            }
            
            // 验证通过，将处理后的数据重新赋值给req.body
            req.body = dto
            next()
        } catch (error) {
            console.error('验证中间件错误:', error)
            return res.status(500).json(Result.serverError())
        }
    }
}

/**
 * 格式化验证错误消息
 * @param errors 验证错误数组
 * @returns 格式化后的错误消息数组
 */
function formatValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = []
    
    errors.forEach(error => {
        if (error.constraints) {
            // 提取约束错误消息
            Object.values(error.constraints).forEach(message => {
                messages.push(message)
            })
        }
        
        // 处理嵌套对象的验证错误
        if (error.children && error.children.length > 0) {
            const childMessages = formatValidationErrors(error.children)
            messages.push(...childMessages)
        }
    })
    
    return messages
}

/**
 * 请求体必需检查中间件
 */
export function requireBody(req: Request, res: Response, next: NextFunction) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json(Result.validationError('请求体不能为空'))
    }
    next()
}

/**
 * 文件上传验证中间件
 */
export function validateFileUpload(req: Request, res: Response, next: NextFunction) {
    const file = req.file
    
    if (!file) {
        return res.status(400).json(Result.validationError('没有上传文件'))
    }
    
    // 文件大小限制（100MB）
    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
        return res.status(400).json(Result.validationError('文件大小不能超过100MB'))
    }
    
    // 文件类型白名单检查
    const allowedMimeTypes = [
        // 图片
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml',
        // 文档
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain', 'text/markdown',
        // 视频
        'video/mp4', 'video/avi', 'video/quicktime', 'video/x-ms-wmv', 'video/x-flv', 'video/x-matroska',
        // 音频
        'audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac',
        // 压缩文件
        'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed',
        'application/x-tar', 'application/gzip'
    ]
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json(Result.validationError('不支持的文件类型'))
    }
    
    next()
}

/**
 * IP限流中间件（简单实现）
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function rateLimitMiddleware(
    maxRequests = 100,
    windowMs = 15 * 60 * 1000 // 15分钟
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const clientIP = req.ip || req.connection.remoteAddress || 'unknown'
        const now = Date.now()
        
        const record = requestCounts.get(clientIP)
        
        if (!record || now > record.resetTime) {
            // 创建新记录或重置计数
            requestCounts.set(clientIP, {
                count: 1,
                resetTime: now + windowMs
            })
            return next()
        }
        
        if (record.count >= maxRequests) {
            return res.status(429).json(Result.error(429, '请求过于频繁，请稍后再试'))
        }
        
        record.count++
        next()
    }
}