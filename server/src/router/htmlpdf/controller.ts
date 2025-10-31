// htmlpdf/controller.ts
// 提供 HTML 预览与 PDF 生成接口（/api/htmlpdf/*）

import { AuthMiddleware } from '@/middleware/auth'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, httpPost } from 'inversify-express-utils'
import { HtmlPdfService } from './service'
import type { GeneratePdfRequest, RenderHtmlRequest, GeneratePdfFromHtmlRequest } from './types'
import { PdfJobService } from './job.service'

@controller('/htmlpdf', AuthMiddleware)
export class HtmlPdfController extends BaseHttpController {
  constructor(
    @inject(HtmlPdfService) private readonly service: HtmlPdfService,
    @inject(PdfJobService) private readonly jobService: PdfJobService
  ) {
    super()
  }

  /**
   * 入队一个“原始 HTML → PDF”任务（异步）
   * POST /api/htmlpdf/enqueue-raw
   * body: { html: string, options?: {...} }
   * 返回：{ jobId }
   */
  @httpPost('/enqueue-raw')
  public async enqueueRaw(req: Request, res: Response) {
    try {
      const body = (req.body || {}) as GeneratePdfFromHtmlRequest
      if (!body.html) {
        return (res as any).sendResponse({ success: false, code: 400, message: 'html 为必填' })
      }
      const { jobId } = await this.jobService.enqueueRaw(body)
      return (res as any).sendResponse({ success: true, code: 200, message: 'ENQUEUED', data: { jobId } })
    } catch (error: any) {
      console.error('[htmlpdf] enqueue-raw error:', error)
      return (res as any).sendResponse({ success: false, code: 500, message: error.message || '入队失败' })
    }
  }

  /**
   * 查询任务状态
   * GET /api/htmlpdf/job/:id
   * 返回：{ jobId, status, url?, fileName?, size?, error?, createdAt, updatedAt }
   */
  @httpGet('/job/:id')
  public async getJob(req: Request, res: Response) {
    try {
      const id = String(req.params.id || '')
      if (!id) return (res as any).sendResponse({ success: false, code: 400, message: 'id 为必填' })
      const data = await this.jobService.getStatus(id)
      if (!data) return (res as any).sendResponse({ success: false, code: 404, message: '任务不存在或已过期' })
      return (res as any).sendResponse({ success: true, code: 200, message: 'OK', data })
    } catch (error: any) {
      console.error('[htmlpdf] get job error:', error)
      return (res as any).sendResponse({ success: false, code: 500, message: error.message || '查询失败' })
    }
  }

  /**
   * 直接从原始 HTML 生成 PDF（不依赖模板）
   * POST /api/htmlpdf/generate-raw
   * body: { html: string, options?: {...} }
   * 返回：{ url, fileName, size }
   */
  @httpPost('/generate-raw')
  public async generateRaw(req: Request, res: Response) {
    try {
      const timeoutMsRaw = Number(process.env.PDF_HTTP_TIMEOUT_MS)
      const timeoutMs = Number.isFinite(timeoutMsRaw) && timeoutMsRaw > 0 ? timeoutMsRaw : 180000
      res.setTimeout(timeoutMs)
      const body = (req.body || {}) as GeneratePdfFromHtmlRequest
      if (!body.html) {
        return (res as any).sendResponse({ success: false, code: 400, message: 'html 为必填' })
      }
      // 异步模式：直接入队返回 200，不等待生成
      const asyncFlag = (() => {
        const q = (req.query?.async as any) ?? undefined
        if (q !== undefined) return String(q).toLowerCase() === '1' || String(q).toLowerCase() === 'true'
        if (typeof (body as any).async === 'boolean') return (body as any).async
        return false
      })()
      if (asyncFlag) {
        const { jobId } = await this.jobService.enqueueRaw(body)
        return (res as any).sendResponse({ success: true, code: 200, message: 'ENQUEUED', data: { jobId } })
      }
      const result = await this.service.generatePdfFromRaw(body)
      return (res as any).sendResponse({ success: true, code: 200, message: 'OK', data: result })
    } catch (error: any) {
      console.error('[htmlpdf] generate-raw error:', error)
      return (res as any).sendResponse({ success: false, code: 500, message: error.message || '生成失败' })
    }
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
      const timeoutMsRaw = Number(process.env.PDF_HTTP_TIMEOUT_MS)
      const timeoutMs = Number.isFinite(timeoutMsRaw) && timeoutMsRaw > 0 ? timeoutMsRaw : 180000
      res.setTimeout(timeoutMs)
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
      const timeoutMsRaw = Number(process.env.PDF_HTTP_TIMEOUT_MS)
      const timeoutMs = Number.isFinite(timeoutMsRaw) && timeoutMsRaw > 0 ? timeoutMsRaw : 180000
      res.setTimeout(timeoutMs)
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
