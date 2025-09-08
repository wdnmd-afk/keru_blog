// result.ts
// 为了向后兼容，这个文件保留原有的Result类
// 新项目建议使用 @/common/response.ts 中的 ApiResponse 类

export class Result<T> {
  public code: number
  public message: string
  public data?: T
  public success?: boolean

  private constructor(code: number, message: string, data?: T) {
    this.code = code
    this.message = message
    this.data = data
    this.success = code === 200
  }

  public static success<T>(data: T, message?: string): Result<T> {
    return new Result<T>(200, message || '操作成功', data)
  }

  public static error(code: number, message: string): Result<null> {
    return new Result<null>(code, message)
  }

  // 预定义的错误
  public static tokenMissing(): Result<null> {
    return Result.error(403, '无权限访问，token缺失')
  }

  public static validationError(message: string): Result<null> {
    return Result.error(400, message || '参数校验错误')
  }

  public static serverError(): Result<null> {
    return Result.error(500, '服务器内部错误')
  }

  // 更多错误类型可以根据需要新增
}
