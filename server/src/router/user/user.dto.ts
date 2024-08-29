import {IsNotEmpty, IsEmail, ValidateIf} from 'class-validator'
import { Transform } from 'class-transformer'
export class UserDto {
    @IsNotEmpty({ message: '用户名必填' })
    @Transform(user => user.value.trim())
    name: string
    id: string

    @IsNotEmpty({ message: '邮箱必填' })
    @IsEmail({},{message: '邮箱格式不正确'})
    @Transform(user => user.value.trim())
    email: string
    admin:boolean
    @IsNotEmpty({message:'随机数不能为空'})
    random:number
    @IsNotEmpty({message:'密码不能为空'})
    @Transform(params => params.value.trim())
    password:string
}

export class LoginDto {
    @IsNotEmpty({ message: '用户名或邮箱必填' })
    @ValidateIf((object) => !object.email && !object.name)
    @Transform(name => name.value.trim())
    name: string;

    @IsNotEmpty({ message: '用户名或邮箱必填' })
    @ValidateIf((object) => !object.email && !object.name)
    @Transform(email => email.value.trim())
    email: string;

    @IsNotEmpty({ message: '密码必填' })
    @Transform(password => password.value.trim())
    password: string;
}