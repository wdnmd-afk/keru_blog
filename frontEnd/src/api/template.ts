// 前台模板与 PDF 相关 API 封装（使用 Http，代理到 /dev-api -> /api）
// 中文注释：与管理端接口保持一致，供用户侧选择模板、渲染与生成 PDF

import { Http } from '@/utils/http'

// 模板类型
export type TemplateType = 'A4' | 'A5' | 'CUSTOM'

// 模板实体（与后端 Prisma 模型对应）
export interface HtmlTemplate {
  id: string
  name: string
  type: TemplateType
  content: string // HTML 源码
  widthMm?: number | null
  heightMm?: number | null
  fields?: any | null // 字段 schema（可选）
  remark?: string | null
  createdAt: string | number
  updatedAt: string | number
}

// 分页结果（与服务端统一 ApiResponse.data 内部结构匹配）
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages?: number
}

// 查询参数
export interface QueryTemplateRequest {
  page?: number
  pageSize?: number
  keyword?: string // name 模糊搜索
  type?: TemplateType
}

// 创建/更新入参
export interface UpsertTemplateRequest {
  id?: string // 更新时必传
  name: string
  type: TemplateType
  content: string
  widthMm?: number | null
  heightMm?: number | null
  fields?: any | null
  remark?: string | null
}

// HTML 预览与 PDF 生成入参
export interface RenderHtmlRequest {
  templateId: string
  data?: Record<string, any>
  sanitize?: boolean
}
export interface GeneratePdfRequest extends RenderHtmlRequest {
  options?: {
    type?: TemplateType
    widthMm?: number
    heightMm?: number
    marginMm?: Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
    fileName?: string
  }
}
export interface GeneratePdfResult {
  url: string
  fileName: string
  size: number
}

export class TemplateApiFront {
  // 分页查询模板
  static async query(params?: QueryTemplateRequest): Promise<PaginatedResponse<HtmlTemplate>> {
    const res = await Http.post('/template/query', params || {})
    return res.data
  }

  // 详情
  static async detail(id: string): Promise<HtmlTemplate> {
    const res = await Http.get(`/template/detail/${id}`)
    return res.data
  }

  // 渲染 HTML（返回字符串）
  static async renderHtml(params: RenderHtmlRequest): Promise<string> {
    // 后端返回 text/html，需强制按文本处理
    const res = await Http.post('/htmlpdf/render-html', params, {
      headers: { Accept: 'text/html' },
      responseType: 'text',
    } as any)
    // Http 响应拦截器会返回 data，此处即为 HTML 字符串
    return res as unknown as string
  }

  // 生成 PDF
  static async generatePdf(params: GeneratePdfRequest): Promise<GeneratePdfResult> {
    const res = await Http.post('/htmlpdf/generate', params)
    return res.data as GeneratePdfResult
  }
}

export default TemplateApiFront
