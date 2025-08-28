import { inject, injectable } from 'inversify'
import { handleError, hashString, Result } from '@/utils'
import { PrismaDB } from '@/db'
import * as crypto from 'crypto'
import { LoginDto, UserDto } from './user.dto'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { JWT } from '@/jwt'

@injectable()
export class UserService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt: JWT //依赖注入
    ) {

    }

    public async getList() {
        return this.PrismaDB.prisma.user.findMany();
    }
    //用户注册逻辑
    public async register(user: UserDto) {
        // 验证已在中间件中处理，这里直接进行业务逻辑
        try {
            // 检查用户是否已存在
            const existingUser = await this.PrismaDB.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: user.email },
                        { name: user.name }
                    ]
                }
            })
            
            if (existingUser) {
                if (existingUser.email === user.email) {
                    return Result.error(400, '邮箱已被注册')
                }
                if (existingUser.name === user.name) {
                    return Result.error(400, '用户名已被占用')
                }
            }
            
            //创建用户
            const { password, random } = user
            user.password = hashString(password, random)
            // 生成随机长整型ID
            user.id = this.generateRandomLongId()
            
            await this.PrismaDB.prisma.user.create({
                data: user
            })
            
            return Result.success('创建用户成功')
        } catch (error) {
            console.error('用户注册错误:', error)
            return Result.error(500, '创建用户失败，请重试')
        }
    }

    //用户登录接口
    public async login(info: LoginDto) {
        // 验证已在中间件中处理，这里直接进行业务逻辑
        try {
            const { name, password, email } = info
            
            //根据用户名或邮箱查找用户
            const user = await this.PrismaDB.prisma.user.findFirst({
                where: {
                    OR: [
                        { name },
                        { email }
                    ]
                }
            })
            
            if (!user) {
                return Result.error(400, '用户不存在')
            }
            
            //校验密码
            if (user.password !== hashString(password, user.random)) {
                return Result.error(400, '密码不正确')
            }
            
            // 生成JWT token
            const token = await this.jwt.createToken({
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin
            })
            
            const result = { 
                email: user.email, 
                name: user.name, 
                token, 
                userId: user.id,
                admin: user.admin
            }
            
            return Result.success(result)
        } catch (error) {
            console.error('用户登录错误:', error)
            return Result.error(500, '登录失败，请重试')
        }
    }
    private generateRandomLongId(): string {
        return crypto.randomInt(1, 92233775807) + ''; // 生成一个随机的long类型ID
    }
}
