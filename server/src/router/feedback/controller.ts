import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost } from 'inversify-express-utils'
import { AuthMiddleware } from '@/middleware/auth'
import { FeedbackService, QueryParams } from './service'

/**
 * 反馈管理控制器
 * 根路径：/api/feedback （受全局 rootPath: '/api' 影响）
 * 安全：管理端接口默认启用 AuthMiddleware，需要管理员登录态
 */
@controller('/feedback', AuthMiddleware)
export class FeedbackController extends BaseHttpController {
  constructor(@inject(FeedbackService) private readonly feedbackService: FeedbackService) {
    super()
  }

  /**
   * 分页查询反馈
   * POST /api/feedback/query
   * 请求体：QueryParams
   * 响应：{ data, total, page, pageSize, totalPages? }
   */
  @httpPost('/query')
  public async query(req: Request, res: Response) {
    try {
      const params = (req.body || {}) as QueryParams
      const result = await this.feedbackService.query(params)
      ;(res as any).sendResponse({ success: true, code: 200, message: 'OK', data: result })
    } catch (error: any) {
      console.error('[Feedback] query error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * 全量数据（如有导出需要）
   * POST /api/feedback/index
   */
  @httpPost('/index')
  public async index(_req: Request, res: Response) {
    try {
      const data = await this.feedbackService.index()
      ;(res as any).sendResponse({ success: true, code: 200, message: 'OK', data })
    } catch (error: any) {
      console.error('[Feedback] index error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }
}

