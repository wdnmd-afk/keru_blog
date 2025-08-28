import { injectable, inject } from 'inversify'
import { PrismaDB } from '@/db'
import { UserDetailDto,  } from './base.dto'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import {generateUniqueBigIntId} from "@/utils";
@injectable()
export class BaseService {
    constructor(
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    ) {

    }
    public async getList() {
        return this.PrismaDB.prisma.user.findMany();
    }

    public async createUserDetail(userDetail: UserDetailDto, authUserId: string) {
        // 将传入的 userDetail 转换为 UserDetailDto 实例
        const userDto = plainToClass(UserDetailDto, userDetail);

        // 验证 DTO
        const errors = await validate(userDto);
        if (errors.length) {
            return {
                code: 400,
                message: '验证失败',
                errors: errors,
            };
        }

        // Security: Ensure the userId from the token is used, not from the body.
        userDto.userId = authUserId;

        try {
            // 生成唯一的 BigInt ID
            userDto.id = generateUniqueBigIntId() + '';

            // 创建 UserDetail 记录
            await this.PrismaDB.prisma.userDetail.create({
                data: userDto,
            });

            return {
                code: 200,
                message: '更新用户成功',
            };
        } catch (error) {
            console.error('创建用户详细信息失败:', error); // 记录错误信息
            return {
                code: 500,
                message: '更新用户失败',
                error: error.message, // 返回错误信息
            };
        }
    }

}
