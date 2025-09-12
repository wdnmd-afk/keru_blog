import { PrismaDB } from '@/db'
import { ApiResponse } from '@/common'
import { generateUniqueBigIntId, getJwt } from '@/utils'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost } from 'inversify-express-utils'
import { Request, Response } from 'express'

/**
 * 公共反馈提交控制器（无需登录）
 * 根路径：/api/public/feedback
 */
@controller('/public/feedback')
export class PublicFeedbackController extends BaseHttpController {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {
    super()
  }

  /**
   * 提交反馈（公开接口）
   * POST /api/public/feedback/submit
   * body: { content: string; userName?: string; userEmail?: string; category?: 'SUGGESTION'|'BUG'|'OTHER' }
   */
  @httpPost('/submit')
  public async submit(req: Request, res: Response) {
    try {
      // 兼容前端字段：补充 title，并生成必需的 id
      const { title, content, userName, userEmail, category } = req.body || {}
      if (!content || typeof content !== 'string') {
        const r = ApiResponse.error(400, 'content 为必填且需为字符串', req.requestId)
        return res.status(400).json(r.toJSON())
      }

      // 若请求头中携带 JWT，则尝试从中提取用户名/邮箱，优先级：入参 > JWT > null
      const decoded: any = getJwt(req)
      const tokenName = decoded?.name || decoded?.username || null
      const tokenEmail = decoded?.email || null

      const created = await this.PrismaDB.prisma.feedback.create({
        data: {
          id: generateUniqueBigIntId(true) as string, // 生成全局唯一字符串ID
          title: title || null, // Prisma 中为可空字段
          content,
          userName: userName || tokenName || null,
          userEmail: userEmail || tokenEmail || null,
          category: category || 'OTHER',
          status: 'PENDING',
        } as any,
      })

      const r = ApiResponse.success(created, '提交成功', req.requestId)
      res.json(r.toJSON())
    } catch (error: any) {
      const r = ApiResponse.error(500, error.message || '提交失败', req.requestId)
      res.status(500).json(r.toJSON())
    }
  }
}

