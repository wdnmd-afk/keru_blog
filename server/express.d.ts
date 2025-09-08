// Express类型扩展文件
// 扩展Express的Request和Response接口，添加自定义属性

import { File } from 'multer'

// 使用全局命名空间扩展Express类型
declare global {
    namespace Express {
        interface Request {
            // Multer文件上传扩展
            file?: File
            files?: File[] | { [fieldname: string]: File[] }

            // 自定义请求属性
            requestId?: string
            userId?: string
            userInfo?: {
                id: string
                username: string
                email?: string
            }

            // JWT相关
            token?: string
            tokenPayload?: {
                userId: string
                username: string
                iat?: number
                exp?: number
            }

            // 验证相关
            validatedData?: any

            // 分页参数
            pagination?: {
                page: number
                limit: number
                offset: number
            }
        }

        interface Response {
            // 自定义响应方法
            sendResponse?(result: any): void
            sendSuccess?<T>(data?: T, message?: string): void
            sendError?(code: number, message: string): void
            sendValidationError?(message: string): void
        }
    }
}

// 确保这个文件被识别为模块
export {}
