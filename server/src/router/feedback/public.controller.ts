import { ApiResponse } from '@/common'
import { PrismaDB } from '@/db'
import { AIService } from '@/router/ai/service'
import { generateUniqueBigIntId, getJwt } from '@/utils'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost } from 'inversify-express-utils'

/**
 * 公共反馈提交控制器（无需登录）
 * 根路径：/api/public/feedback
 */
@controller('/public/feedback')
export class PublicFeedbackController extends BaseHttpController {
  constructor(
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    @inject(AIService) private readonly injectedAIService: AIService
  ) {
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
      const decoded = getJwt(req)
      const tokenName = decoded?.name || decoded?.username || null
      const tokenEmail = decoded?.email || null

      // 先写入反馈主记录
      const created = await this.PrismaDB.prisma.feedback.create({
        data: {
          id: generateUniqueBigIntId(true) as string, // 生成全局唯一字符串ID
          title: title || null, // Prisma 中为可空字段
          content,
          userName: userName || tokenName || null,
          userEmail: userEmail || tokenEmail || null,
          category: category || 'OTHER',
          status: 'PENDING',
        },
      })

      // 异步调用 AI 生成建议，并更新到 advice 字段（失败不影响主流程）
      ;(async () => {
        try {
          // 优先使用构造函数注入的 AIService；必要时回退为手动实例化
          console.log('[Feedback] env key present:', !!process.env.DEEPSEEK_API_KEY || !!process.env.AI_API_KEY)
          let aiService: AIService | undefined = this.injectedAIService
          console.log('[Feedback] using injected AIService:', !!aiService)
          if (!aiService) {
            try {
              aiService = new AIService(this.PrismaDB)
              console.log('[Feedback] resolved AIService by manual new')
            } catch (e: any) {
              console.warn('[Feedback] instantiate AIService failed:', e?.message)
              console.warn('[Feedback] 未能解析 AIService，跳过建议生成')
              return
            }
          }

          // 面向任务的提示词：请基于用户反馈内容输出精炼可执行建议
          const prompt = `你是一个产品运营与技术支持协作助手。请基于以下用户反馈内容，输出一段不超过120字的中文建议，要求可执行、具体、避免空话：\n\n【用户反馈】\n${content}`
          const { reply } = await aiService.chat(prompt)
          console.log(reply, 'reply')

          const advice = (reply || '').trim().slice(0, 4000) // 限长保护
          if (advice) {
            await this.PrismaDB.prisma.feedback.update({
              where: { id: created.id },
              data: { advice },
            })
          }
        } catch (e: any) {
          console.warn('[Feedback] 生成AI建议失败:', e?.message)
        }
      })()

      const r = ApiResponse.success(created, '提交成功', req.requestId)
      return res.json(r.toJSON())
    } catch (error: any) {
      const r = ApiResponse.error(500, error.message || '提交失败', req.requestId)
      return res.status(500).json(r.toJSON())
    }
  }
}
