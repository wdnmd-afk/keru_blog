// exceptions.ts
/**
 * 错误码枚举
 */
export enum ErrorCode {
  // 成功
  SUCCESS = 200,

  // 客户端错误 4xx
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  VALIDATION_ERROR = 422,
  TOO_MANY_REQUESTS = 429,

  // 服务器错误 5xx
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,

  // 业务错误码 1xxx
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INVALID_PASSWORD = 1003,
  TOKEN_EXPIRED = 1004,
  TOKEN_INVALID = 1005,

  FILE_NOT_FOUND = 1101,
  FILE_TOO_LARGE = 1102,
  INVALID_FILE_TYPE = 1103,
  UPLOAD_FAILED = 1104,

  DATABASE_ERROR = 1201,
  REDIS_ERROR = 1202,
  EXTERNAL_API_ERROR = 1203,
}

/**
 * 错误消息映射
 */
export const ErrorMessage: Record<ErrorCode, string> = {
  [ErrorCode.SUCCESS]: '操作成功',

  // 客户端错误
  [ErrorCode.BAD_REQUEST]: '请求参数错误',
  [ErrorCode.UNAUTHORIZED]: '未授权访问',
  [ErrorCode.FORBIDDEN]: '禁止访问',
  [ErrorCode.NOT_FOUND]: '资源不存在',
  [ErrorCode.METHOD_NOT_ALLOWED]: '请求方法不允许',
  [ErrorCode.CONFLICT]: '资源冲突',
  [ErrorCode.VALIDATION_ERROR]: '数据验证失败',
  [ErrorCode.TOO_MANY_REQUESTS]: '请求过于频繁',

  // 服务器错误
  [ErrorCode.INTERNAL_SERVER_ERROR]: '服务器内部错误',
  [ErrorCode.NOT_IMPLEMENTED]: '功能未实现',
  [ErrorCode.BAD_GATEWAY]: '网关错误',
  [ErrorCode.SERVICE_UNAVAILABLE]: '服务不可用',
  [ErrorCode.GATEWAY_TIMEOUT]: '网关超时',

  // 业务错误
  [ErrorCode.USER_NOT_FOUND]: '用户不存在',
  [ErrorCode.USER_ALREADY_EXISTS]: '用户已存在',
  [ErrorCode.INVALID_PASSWORD]: '密码错误',
  [ErrorCode.TOKEN_EXPIRED]: 'Token已过期',
  [ErrorCode.TOKEN_INVALID]: 'Token无效',

  [ErrorCode.FILE_NOT_FOUND]: '文件不存在',
  [ErrorCode.FILE_TOO_LARGE]: '文件过大',
  [ErrorCode.INVALID_FILE_TYPE]: '文件类型不支持',
  [ErrorCode.UPLOAD_FAILED]: '文件上传失败',

  [ErrorCode.DATABASE_ERROR]: '数据库操作失败',
  [ErrorCode.REDIS_ERROR]: 'Redis操作失败',
  [ErrorCode.EXTERNAL_API_ERROR]: '外部API调用失败',
}

/**
 * 业务异常基类
 */
export class BusinessException extends Error {
  public readonly code: ErrorCode
  public readonly statusCode: number
  public readonly timestamp: string
  public readonly requestId?: string

  constructor(
    code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    message?: string,
    statusCode?: number,
    requestId?: string
  ) {
    super(message || ErrorMessage[code])
    this.name = this.constructor.name
    this.code = code
    this.statusCode = statusCode || this.getHttpStatusCode(code)
    this.timestamp = new Date().toISOString()
    this.requestId = requestId

    // 保持堆栈跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  private getHttpStatusCode(code: ErrorCode): number {
    if (code >= 200 && code < 300) return 200
    if (code >= 400 && code < 500) return code
    if (code >= 500 && code < 600) return code

    // 业务错误码映射到HTTP状态码
    if (code >= 1001 && code <= 1099) return 400 // 用户相关错误
    if (code >= 1100 && code <= 1199) return 400 // 文件相关错误
    if (code >= 1200 && code <= 1299) return 500 // 系统相关错误

    return 500 // 默认服务器错误
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      requestId: this.requestId,
    }
  }
}

/**
 * 验证异常
 */
export class ValidationException extends BusinessException {
  public readonly validationErrors: any[]

  constructor(message: string, validationErrors: any[] = [], requestId?: string) {
    super(ErrorCode.VALIDATION_ERROR, message, 400, requestId)
    this.validationErrors = validationErrors
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      validationErrors: this.validationErrors,
    }
  }
}

/**
 * 认证异常
 */
export class AuthenticationException extends BusinessException {
  constructor(message?: string, requestId?: string) {
    super(ErrorCode.UNAUTHORIZED, message, 401, requestId)
  }
}

/**
 * 授权异常
 */
export class AuthorizationException extends BusinessException {
  constructor(message?: string, requestId?: string) {
    super(ErrorCode.FORBIDDEN, message, 403, requestId)
  }
}

/**
 * 资源未找到异常
 */
export class NotFoundException extends BusinessException {
  constructor(resource: string = '资源', requestId?: string) {
    super(ErrorCode.NOT_FOUND, `${resource}不存在`, 404, requestId)
  }
}

/**
 * 文件相关异常
 */
export class FileException extends BusinessException {
  constructor(code: ErrorCode, message?: string, requestId?: string) {
    super(code, message, 400, requestId)
  }
}

/**
 * 数据库异常
 */
export class DatabaseException extends BusinessException {
  constructor(message?: string, requestId?: string) {
    super(ErrorCode.DATABASE_ERROR, message, 500, requestId)
  }
}

/**
 * Redis异常
 */
export class RedisException extends BusinessException {
  constructor(message?: string, requestId?: string) {
    super(ErrorCode.REDIS_ERROR, message, 500, requestId)
  }
}
