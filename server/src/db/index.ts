import { inject, injectable } from 'inversify'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

// @ts-ignore
@injectable()
export class PrismaDB {
    prisma: PrismaClient
    constructor(@inject('PrismaClient') PrismaClient: () => PrismaClient) {
        this.prisma = PrismaClient()
        // 自定义中间件：格式化所有 Date 字段
        this.prisma.$use(async (params, next) => {
            const result = await next(params);

            // 递归函数：将 Date 类型的字段格式化
            const formatDates = (obj) => {
                if (!obj || typeof obj !== 'object') return obj;

                if (obj instanceof Date) {
                    return dayjs(obj).format('YYYY-MM-DD HH:mm:ss'); // 统一格式
                }

                if (Array.isArray(obj)) {
                    return obj.map(formatDates); // 处理数组中的对象
                }

                return Object.fromEntries(
                    Object.entries(obj).map(([key, value]) => [key, formatDates(value)])
                );
            };

            return formatDates(result);
        });
    }
}
