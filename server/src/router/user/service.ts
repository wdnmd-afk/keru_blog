import { PrismaDB } from '@/db'
import { hashString, Result } from '@/utils'
import * as crypto from 'crypto'
import { inject, injectable } from 'inversify'
import { LoginDto, ResetPasswordDto, UserDto } from './user.dto'

import { JWT } from '@/jwt'

@injectable()
export class UserService {
  constructor(
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    @inject(JWT) private readonly jwt: JWT //依赖注入
  ) {}

  public async getList() {
    return this.PrismaDB.prisma.user.findMany()
  }
  //用户注册逻辑
  public async register(user: UserDto) {
    // 验证已在中间件中处理，这里直接进行业务逻辑
    try {
      // 检查用户是否已存在
      const existingUser = await this.PrismaDB.prisma.user.findFirst({
        where: {
          OR: [{ email: user.email }, { name: user.name }],
        },
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
        data: user,
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
          OR: [{ name }, { email }],
        },
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
        admin: user.admin,
      })

      const result = {
        email: user.email,
        name: user.name,
        token,
        userId: user.id,
        admin: user.admin,
      }

      return Result.success(result)
    } catch (error) {
      console.error('用户登录错误:', error)
      return Result.error(500, '登录失败，请重试')
    }
  }

  //重置密码接口
  public async resetPassword(resetData: ResetPasswordDto) {
    try {
      const { name, email, newPassword } = resetData

      // 根据用户名和邮箱查找用户（必须两者都匹配）
      const user = await this.PrismaDB.prisma.user.findFirst({
        where: {
          AND: [{ name }, { email }],
        },
      })

      if (!user) {
        return Result.error(400, '用户名或邮箱不匹配，请检查后重试')
      }

      // 生成新的随机数和加密新密码
      const newRandom = crypto.randomInt(100000, 999999)
      const hashedNewPassword = hashString(newPassword, newRandom)

      // 更新用户密码和随机数
      await this.PrismaDB.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedNewPassword,
          random: newRandom,
        },
      })

      return Result.success('密码重置成功')
    } catch (error) {
      console.error('重置密码错误:', error)
      return Result.error(500, '重置密码失败，请重试')
    }
  }

  private generateRandomLongId(): string {
    return crypto.randomInt(1, 92233775807) + '' // 生成一个随机的long类型ID
  }
}
