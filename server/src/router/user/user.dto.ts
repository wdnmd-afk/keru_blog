import { IsNotEmpty, IsEmail, ValidateIf, MinLength, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'
import { IsStrongPassword, IsValidUsername, IsSafeString } from '@/common/validation.decorators'

export class UserDto {
    @IsNotEmpty({ message: '用户名必填' })
    @IsValidUsername({ message: '用户名格式不正确' })
    @IsSafeString({ message: '用户名包含不安全字符' })
    @Transform(user => user.value.trim())
    name: string
    
    id: string

    @IsNotEmpty({ message: '邮箱必填' })
    @IsEmail({}, { message: '邮箱格式不正确' })
    @Transform(user => user.value.trim().toLowerCase()) // 邮箱转为小写
    email: string
    
    admin: boolean
    
    @IsNotEmpty({ message: '随机数不能为空' })
    random: number
    
    @IsNotEmpty({ message: '密码不能为空' })
    @IsStrongPassword({ message: '密码强度不够' })
    @Transform(params => params.value.trim())
    password: string
}

export class LoginDto {
    @IsNotEmpty({ message: '用户名或邮箱必填' })
    @ValidateIf((object) => !object.email && !object.name)
    @IsSafeString({ message: '用户名包含不安全字符' })
    @Transform(name => name.value.trim())
    name: string;

    @IsNotEmpty({ message: '用户名或邮箱必填' })
    @ValidateIf((object) => !object.email && !object.name)
    @Transform(email => email.value.trim().toLowerCase()) // 邮箱转为小写
    email: string;

    @IsNotEmpty({ message: '密码必填' })
    @MinLength(6, { message: '密码至少6位' })
    @MaxLength(50, { message: '密码不能超过50位' })
    @Transform(password => password.value.trim())
    password: string;
}