// validation.decorators.ts
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

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
                validate(value: any, args: ValidationArguments) {
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
                defaultMessage(args: ValidationArguments) {
                    return '密码必须至少8位，包含大小写字母、数字和特殊字符'
                }
            }
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
                }
            }
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
                }
            }
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
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') return false
                    
                    // 用户名长度3-20位
                    if (value.length < 3 || value.length > 20) return false
                    
                    // 只允许字母、数字、下划线和中文
                    if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) return false
                    
                    return true
                },
                defaultMessage(args: ValidationArguments) {
                    return '用户名长度3-20位，只允许字母、数字、下划线和中文'
                }
            }
        })
    }
}

/**
 * SQL注入防护装饰器
 */
export function IsSafeString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isSafeString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') return false
                    
                    // 检查常见的SQL注入模式
                    const sqlInjectionPatterns = [
                        /('|(\\')|(;)|(\\;))/i,
                        /((\s*(union|select|insert|update|delete|drop|create|alter|exec|execute)\s+))/i,
                        /((\s*(or|and)\s+[\w\s]*\s*=\s*[\w\s]*)|(\s*(or|and)\s+\d+\s*=\s*\d+))/i,
                        /(\/\*[\s\S]*?\*\/|--[\s\S]*?$)/gm
                    ]
                    
                    return !sqlInjectionPatterns.some(pattern => pattern.test(value))
                },
                defaultMessage(args: ValidationArguments) {
                    return '输入包含不安全的字符，请检查输入内容'
                }
            }
        })
    }
}