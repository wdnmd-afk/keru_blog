// htmlpdf/controller.ts
// 提供 HTML 预览与 PDF 生成接口（/api/htmlpdf/*）

import { AuthMiddleware } from '@/middleware/auth'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost } from 'inversify-express-utils'
import { HtmlPdfService } from './service'
import type { GeneratePdfRequest, RenderHtmlRequest } from './types'

@controller('/htmlpdf', AuthMiddleware)
export class HtmlPdfController extends BaseHttpController {
  constructor(@inject(HtmlPdfService) private readonly service: HtmlPdfService) {
    super()
  }

  /**
   * 渲染 HTML 预览
   * POST /api/htmlpdf/render-html
   * body: { templateId: string, data?: object, sanitize?: boolean }
   * 返回：text/html
   */
  @httpPost('/render-html')
  public async renderHtml(req: Request, res: Response) {
    try {
      const body = (req.body || {}) as RenderHtmlRequest
      if (!body.templateId) {
        return (res as any).sendResponse({ success: false, code: 400, message: 'templateId 为必填' })
      }
      const html = await this.service.renderHtml(body)
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.status(200).send(html)
    } catch (error: any) {
      console.error('[htmlpdf] render-html error:', error)
      return (res as any).sendResponse({ success: false, code: 500, message: error.message || '渲染失败' })
    }
  }

  /**
   * 生成 PDF
   * POST /api/htmlpdf/generate
   * body: { templateId: string, data?: object, options?: {...} }
   * 返回：{ url, fileName, size }
   */
  @httpPost('/generate')
  public async generate(req: Request, res: Response) {
    try {
      const body = (req.body || {}) as GeneratePdfRequest
      if (!body.templateId) {
        return (res as any).sendResponse({ success: false, code: 400, message: 'templateId 为必填' })
      }
      const result = await this.service.generatePdf(body)
      return (res as any).sendResponse({ success: true, code: 200, message: 'OK', data: result })
    } catch (error: any) {
      console.error('[htmlpdf] generate error:', error)
      return (res as any).sendResponse({ success: false, code: 500, message: error.message || '生成失败' })
    }
  }

  /**
   * 列出已生成的 PDF 文件
   * POST /api/htmlpdf/list
   * body: { templateId?: string }
   * 返回：Array<{ url, fileName, size, dateKey, templateId?, createdAt? }>
   */
  @httpPost('/list')
  public async list(req: Request, res: Response) {
    try {
      const body = (req.body || {}) as { templateId?: string }
      const data = await this.service.listPdfs({ templateId: body.templateId })
      return (res as any).sendResponse({ success: true, code: 200, message: 'OK', data })
    } catch (error: any) {
      console.error('[htmlpdf] list error:', error)
      return (res as any).sendResponse({ success: false, code: 500, message: error.message || '查询失败' })
    }
  }
}
