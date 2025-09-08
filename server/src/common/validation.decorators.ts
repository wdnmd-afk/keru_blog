// validation.decorators.ts
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

/**
 * 密码强度验证装饰器
 * 要求密码至少8位，包含大小写字母、数字和特殊字符
 */
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false

          // 至少8位
          if (value.length < 8) return false

          // 包含大写字母
          if (!/[A-Z]/.test(value)) return false

          // 包含小写字母
          if (!/[a-z]/.test(value)) return false

          // 包含数字
          if (!/\d/.test(value)) return false

          // 包含特殊字符
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return false

          return true
        },
        defaultMessage(_args: ValidationArguments) {
          return '密码必须至少8位，包含大小写字母、数字和特殊字符'
        },
      },
    })
  }
}

/**
 * 文件类型验证装饰器
 */
export function IsFileType(allowedTypes: string[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFileType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [allowedTypes],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false

          const allowedTypes = args.constraints[0]
          const fileExt = value.toLowerCase().split('.').pop()

          return allowedTypes.includes(fileExt)
        },
        defaultMessage(args: ValidationArguments) {
          const allowedTypes = args.constraints[0]
          return `文件类型必须是以下类型之一: ${allowedTypes.join(', ')}`
        },
      },
    })
  }
}

/**
 * 文件大小验证装饰器
 */
export function IsFileSizeValid(maxSizeInMB: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFileSizeValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxSizeInMB],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'number') return false

          const maxSizeInBytes = args.constraints[0] * 1024 * 1024 // 转换为字节
          return value <= maxSizeInBytes
        },
        defaultMessage(args: ValidationArguments) {
          const maxSizeInMB = args.constraints[0]
          return `文件大小不能超过 ${maxSizeInMB}MB`
        },
      },
    })
  }
}

/**
 * 用户名格式验证装饰器
 */
export function IsValidUsername(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidUsername',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false

          // 用户名长度3-20位
          if (value.length < 3 || value.length > 20) return false

          // 只允许字母、数字、下划线和中文
          if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) return false

          return true
        },
        defaultMessage(_args: ValidationArguments) {
          return '用户名长度3-20位，只允许字母、数字、下划线和中文'
        },
      },
    })
  }
}

/**
 * 安全字符串验证装饰器
 * 防止SQL注入、XSS等安全问题
 */
export function IsSafeString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSafeString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false

          // 检查SQL注入关键词
          const sqlKeywords = [
            'select',
            'insert',
            'update',
            'delete',
            'drop',
            'create',
            'alter',
            'exec',
            'execute',
            'union',
            'script',
            'javascript',
            'vbscript',
          ]

          const lowerValue = value.toLowerCase()

          // 检查是否包含SQL关键词
          for (const keyword of sqlKeywords) {
            if (lowerValue.includes(keyword)) return false
          }

          // 检查危险字符
          const dangerousChars = ['<', '>', '"', "'", '&', ';', '(', ')', '--', '/*', '*/']
          for (const char of dangerousChars) {
            if (value.includes(char)) return false
          }

          return true
        },
        defaultMessage(_args: ValidationArguments) {
          return '字符串包含不安全字符或可疑内容'
        },
      },
    })
  }
}
