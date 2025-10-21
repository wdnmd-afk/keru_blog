// template/service.ts
// 管理 HTML 模板的增删改查服务（Prisma）

import { PrismaDB } from '@/db'
import { inject, injectable } from 'inversify'

export type TemplateType = 'A4' | 'A5' | 'CUSTOM'

export interface HtmlTemplateInput {
  id?: string
  name: string
  type: TemplateType
  content: string
  widthMm?: number | null
  heightMm?: number | null
  fields?: any | null
  remark?: string | null
}

export interface QueryTemplateParams {
  page?: number
  pageSize?: number
  keyword?: string // name 模糊
  type?: TemplateType
}

@injectable()
export class TemplateService {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {}

  /** 分页查询模板 */
  public async query(params: QueryTemplateParams) {
    const { page = 1, pageSize = 10, keyword, type } = params || {}
    const where: any = {}
    if (keyword) where.name = { contains: keyword }
    if (type) where.type = type

    const [total, data] = await this.PrismaDB.prisma.$transaction([
      this.PrismaDB.prisma.htmlTemplate.count({ where }) as any,
      this.PrismaDB.prisma.htmlTemplate.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }) as any,
    ])

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  }

  /** 创建模板（name 唯一） */
  public async create(payload: HtmlTemplateInput) {
    // 名称唯一校验
    const existed = await (this.PrismaDB.prisma as any).htmlTemplate.findUnique({ where: { name: payload.name } })
    if (existed) throw new Error('模板名称已存在')

    const record = await (this.PrismaDB.prisma as any).htmlTemplate.create({
      data: {
        name: payload.name,
        type: payload.type,
        content: payload.content,
        widthMm: payload.widthMm ?? null,
        heightMm: payload.heightMm ?? null,
        fields: payload.fields ?? null,
        remark: payload.remark ?? null,
      },
    })
    return record
  }

  /** 更新模板（按 id） */
  public async update(payload: HtmlTemplateInput) {
    if (!payload.id) throw new Error('id 为必填')

    // 如果修改了 name，需要校验唯一
    if (payload.name) {
      const same = await (this.PrismaDB.prisma as any).htmlTemplate.findUnique({ where: { name: payload.name } })
      if (same && same.id !== payload.id) throw new Error('模板名称已存在')
    }

    const record = await (this.PrismaDB.prisma as any).htmlTemplate.update({
      where: { id: payload.id },
      data: {
        name: payload.name,
        type: payload.type,
        content: payload.content,
        widthMm: payload.widthMm ?? null,
        heightMm: payload.heightMm ?? null,
        fields: payload.fields ?? null,
        remark: payload.remark ?? null,
      },
    })
    return record
  }

  /** 删除模板 */
  public async delete(id: string) {
    if (!id) throw new Error('id 为必填')
    await (this.PrismaDB.prisma as any).htmlTemplate.delete({ where: { id } })
    return true
  }

  /** 模板详情 */
  public async detail(id: string) {
    if (!id) throw new Error('id 为必填')
    const record = await (this.PrismaDB.prisma as any).htmlTemplate.findUnique({ where: { id } })
    if (!record) throw new Error('模板不存在')
    return record
  }
}
