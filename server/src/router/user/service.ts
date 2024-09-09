import {injectable, inject} from 'inversify'
import {hashString, Result,handleError} from "@/utils";
import {PrismaDB} from '@/db'
import * as crypto from 'crypto';
import {UserDto, LoginDto} from './user.dto'
import {plainToClass} from 'class-transformer'
import {validate} from 'class-validator'
import {JWT} from '@/jwt'

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
//用户注册列国
    public async register(user: UserDto) {
        const userDto = plainToClass(UserDto, user)
        const errors = await validate(userDto)
        return  handleError(errors, async () => {
            //创建用户
            const {password, random} = user
            user.password = hashString(password, random)
            // 生成随机长整型ID
            user.id = this.generateRandomLongId();
            try {
                await this.PrismaDB.prisma.user.create({
                    data: user
                })
                return Result.success('创建用户成功')
            } catch (error) {
                console.log(error, 'err')
                return {
                    code: 500,
                    message: '创建用户失败',
                }
            }
        })


    }

    //用户登录接口
    public async login(info: LoginDto) {
        const userDto = plainToClass(LoginDto, info)
        const errors = await validate(userDto)
        if (errors.length) {
            return errors
        } else {
            const {name, password, email} = info
            //根据用户名查找用户
            const res = await this.PrismaDB.prisma.user.findMany({
                where: {
                    OR: [
                        {
                            name
                        },
                        {
                            email
                        }
                    ]
                }
            })
            if (!res.length) {
                return  Result.error(400, '用户不存在')
            }
            const data = res[0]
            //校验密码
            if (data.password !== hashString(password, data.random)) {
                return  Result.error(400, '密码不正确')
            }
            const token = await this.jwt.createToken(data)
            const result = {email: data.email, name: data.name, token,userId:data.id}
            return Result.success(result)
        }
    }
    private generateRandomLongId(): string {
        return crypto.randomInt(1, 92233775807) + ''; // 生成一个随机的long类型ID
    }
}
