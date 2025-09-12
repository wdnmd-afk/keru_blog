import { PrismaDB } from '@/db'
import { inject, injectable } from 'inversify'

// 与前端管理端保持一致的类型
export type FeedbackStatus = 'PENDING' | 'VIEWED' | 'RESOLVED'
export type FeedbackCategory = 'SUGGESTION' | 'BUG' | 'OTHER'

export interface Feedback {
  id: string
  title?: string | null
  content: string
  userName?: string | null
  userEmail?: string | null
  category: FeedbackCategory
  status: FeedbackStatus
  createdAt: string | number
  updatedAt: string | number
}

export interface QueryParams {
  user?: string
  status?: FeedbackStatus
  category?: FeedbackCategory
  startTime?: string
  endTime?: string
  page?: number
  pageSize?: number
  keyword?: string
}

@injectable()
export class FeedbackService {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {}

  // 使用 Prisma 进行分页与筛选查询
  public async query(params: QueryParams) {
    const {
      user,
      status,
      category,
      startTime,
      endTime,
      page = 1,
      pageSize = 10,
      keyword,
    } = params || {}

    const where: any = {}

    if (user) {
      // MySQL 默认按列排序规则进行匹配，常见 ci（不区分大小写）排序规则下可直接使用 contains
      where.OR = [
        { userName: { contains: user } },
        { userEmail: { contains: user } },
      ]
    }
    if (status) where.status = status
    if (category) where.category = category
    if (keyword) {
      // 关键词搜索同理，移除 PostgreSQL 专用的 mode: 'insensitive'
      where.content = { contains: keyword }
    }
    if (startTime || endTime) {
      where.createdAt = {}
      if (startTime) where.createdAt.gte = new Date(startTime)
      if (endTime) where.createdAt.lte = new Date(endTime)
    }

    const [total, data] = await this.PrismaDB.prisma.$transaction([
      this.PrismaDB.prisma.feedback.count({ where }),
      this.PrismaDB.prisma.feedback.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ])

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  }

  // 全量导出（如有需要）
  public async index() {
    const data = await this.PrismaDB.prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return data
  }
}

