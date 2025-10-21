// template/controller.ts
// 模板管理控制器：提供模板的增删改查接口（/api/template/*）

import { AuthMiddleware } from '@/middleware/auth'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, httpPost } from 'inversify-express-utils'
import { TemplateService, type HtmlTemplateInput, type QueryTemplateParams } from './service'

@controller('/template', AuthMiddleware)
export class TemplateController extends BaseHttpController {
  constructor(@inject(TemplateService) private readonly service: TemplateService) {
    super()
  }

  /**
   * 分页查询模板
   * POST /api/template/query
   */
  @httpPost('/query')
  public async query(req: Request, res: Response) {
    try {
      const params = (req.body || {}) as QueryTemplateParams
      const result = await this.service.query(params)
      ;(res as any).sendResponse({ success: true, code: 200, message: 'OK', data: result })
    } catch (error: any) {
      console.error('[template] query error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * 创建模板
   * POST /api/template/create
   */
  @httpPost('/create')
  public async create(req: Request, res: Response) {
    try {
      const body = (req.body || {}) as HtmlTemplateInput
      if (!body.name || !body.type || !body.content) {
        return (res as any).sendResponse({ success: false, code: 400, message: 'name/type/content 为必填' })
      }
      const data = await this.service.create(body)
      ;(res as any).sendResponse({ success: true, code: 200, message: 'OK', data })
    } catch (error: any) {
      console.error('[template] create error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * 更新模板
   * POST /api/template/update
   */
  @httpPost('/update')
  public async update(req: Request, res: Response) {
    try {
      const body = (req.body || {}) as HtmlTemplateInput
      if (!body.id) {
        return (res as any).sendResponse({ success: false, code: 400, message: 'id 为必填' })
      }
      const data = await this.service.update(body)
      ;(res as any).sendResponse({ success: true, code: 200, message: 'OK', data })
    } catch (error: any) {
      console.error('[template] update error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * 删除模板
   * POST /api/template/delete
   * body: { id: string }
   */
  @httpPost('/delete')
  public async delete(req: Request, res: Response) {
    try {
      const { id } = (req.body || {}) as { id?: string }
      if (!id) {
        return (res as any).sendResponse({ success: false, code: 400, message: 'id 为必填' })
      }
      const ok = await this.service.delete(id)
      ;(res as any).sendResponse({ success: ok, code: 200, message: 'OK', data: ok })
    } catch (error: any) {
      console.error('[template] delete error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * 模板详情
   * GET /api/template/detail/:id
   */
  @httpGet('/detail/:id')
  public async detail(req: Request, res: Response) {
    try {
      const { id } = req.params as any
      if (!id) {
        return (res as any).sendResponse({ success: false, code: 400, message: 'id 为必填' })
      }
      const data = await this.service.detail(id)
      ;(res as any).sendResponse({ success: true, code: 200, message: 'OK', data })
    } catch (error: any) {
      console.error('[template] detail error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }
}
