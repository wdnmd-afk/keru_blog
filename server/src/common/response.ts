// response.ts
import { ErrorCode, ErrorMessage, BusinessException } from './exceptions'

/**
 * 统一响应结果类
 */
export class ApiResponse<T = any> {
    public readonly success: boolean
    public readonly code: ErrorCode
    public readonly message: string
    public readonly data?: T
    public readonly timestamp: string
    public readonly requestId?: string

    private constructor(
        success: boolean,
        code: ErrorCode,
        message: string,
        data?: T,
        requestId?: string
    ) {
        this.success = success
        this.code = code
        this.message = message
        this.data = data
        this.timestamp = new Date().toISOString()
        this.requestId = requestId
    }

    /**
     * 创建成功响应
     */
    static success<T>(data?: T, message?: string, requestId?: string): ApiResponse<T> {
        return new ApiResponse(
            true,
            ErrorCode.SUCCESS,
            message || ErrorMessage[ErrorCode.SUCCESS],
            data,
            requestId
        )
    }

    /**
     * 创建失败响应
     */
    static error(
        code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
        message?: string,
        requestId?: string
    ): ApiResponse<null> {
        return new ApiResponse(
            false,
            code,
            message || ErrorMessage[code],
            null,
            requestId
        )
    }

    /**
     * 从业务异常创建响应
     */
    static fromException(exception: BusinessException): ApiResponse<null> {
        return new ApiResponse(
            false,
            exception.code,
            exception.message,
            null,
            exception.requestId
        )
    }

    /**
     * 创建验证错误响应
     */
    static validationError(message: string, errors?: any[], requestId?: string): ApiResponse<any> {
        return new ApiResponse(
            false,
            ErrorCode.VALIDATION_ERROR,
            message,
            { validationErrors: errors },
            requestId
        )
    }

    /**
     * 创建分页响应
     */
    static paginated<T>(
        data: T[],
        total: number,
        page: number,
        pageSize: number,
        message?: string,
        requestId?: string
    ): ApiResponse<{
        items: T[]
        pagination: {
            total: number
            page: number
            pageSize: number
            totalPages: number
            hasNext: boolean
            hasPrev: boolean
        }
    }> {
        const totalPages = Math.ceil(total / pageSize)
        
        return new ApiResponse(
            true,
            ErrorCode.SUCCESS,
            message || ErrorMessage[ErrorCode.SUCCESS],
            {
                items: data,
                pagination: {
                    total,
                    page,
                    pageSize,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            },
            requestId
        )
    }

    /**
     * 获取HTTP状态码
     */
    getHttpStatusCode(): number {
        if (this.success) return 200
        
        if (this.code >= 400 && this.code < 600) {
            return this.code
        }
        
        // 业务错误码映射
        if (this.code >= 1001 && this.code <= 1099) return 400 // 用户相关
        if (this.code >= 1100 && this.code <= 1199) return 400 // 文件相关
        if (this.code >= 1200 && this.code <= 1299) return 500 // 系统相关
        
        return 500 // 默认
    }

    /**
     * 转换为JSON对象
     */
    toJSON() {
        return {
            success: this.success,
            code: this.code,
            message: this.message,
            data: this.data,
            timestamp: this.timestamp,
            requestId: this.requestId
        }
    }
}

/**
 * 兼容旧的Result类（向后兼容）
 */
export class Result<T = any> extends ApiResponse<T> {
    // 保持与原有Result类的兼容性
    static success<T>(data?: T, message?: string): Result<T> {
        return super.success(data, message) as Result<T>
    }

    static error(code: number, message: string): Result<null> {
        const errorCode = code as ErrorCode
        return super.error(errorCode, message) as Result<null>
    }

    static tokenMissing(): Result<null> {
        return super.error(ErrorCode.FORBIDDEN, '无权限访问，token缺失') as Result<null>
    }

    static validationError(message: string): Result<null> {
        return super.error(ErrorCode.VALIDATION_ERROR, message) as Result<null>
    }

    static serverError(): Result<null> {
        return super.error(ErrorCode.INTERNAL_SERVER_ERROR, '服务器内部错误') as Result<null>
    }
}