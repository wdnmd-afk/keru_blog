import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost as PostMapping } from 'inversify-express-utils'

import { AuthMiddleware } from '@/middleware/auth'
import { rateLimitMiddleware, validationMiddleware } from '@/middleware/validation'
import { AIService } from '@/router/ai/service'
import { buildMedLabPrompt, createMedLabAdviceConfig } from '@/config/medlab.config'
import { normalizeMedLabInput } from './parser'
import { MedLabAdviceDto } from './dto'

/**
 * 医学检验建议控制器
 * 根路径：/api/ai/medlab （需要登录）
 */
@controller('/ai/medlab', AuthMiddleware)
export class MedLabController extends BaseHttpController {
  constructor(
    @inject(AIService) private readonly aiService: AIService
  ) {
    super()
  }

  /**
   * 根据检验项目与结果生成医学建议
   * POST /api/ai/medlab/advice
   */
  @PostMapping('/advice', rateLimitMiddleware(60, 5 * 60 * 1000), validationMiddleware(MedLabAdviceDto))
  public async advice(req: Request, res: Response) {
    try {
      // 请求体验证通过后的 DTO
      const body = req.body as MedLabAdviceDto

      // 将多源结构归一为内部通用结构（items[], patient, context）
      const normalized = normalizeMedLabInput(body)

      // 组装提示词（注：患者隐私字段仅用于上下文，不会保存）
      const cfg = createMedLabAdviceConfig()
      const prompt = buildMedLabPrompt(normalized as any, cfg)

      // 调用基础问答
      const { reply, conversationId } = await this.aiService.chat(prompt)

      // 返回统一结构
      ;(res as any).sendResponse({
        success: true,
        code: 200,
        message: 'OK',
        data: {
          advice: (reply || '').trim(),
          conversationId,
        },
      })
    } catch (error: any) {
      console.error('[MedLab] advice error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error?.message || '生成失败' })
    }
  }

}
