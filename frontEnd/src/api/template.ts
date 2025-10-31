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
    // 是否固定显示页眉/页脚（默认 true）；HTML导入场景默认禁用以避免显示<title>（如“Report”）
    displayHeaderFooter?: boolean
    // 以下为可选扩展字段（目前不在 HTML 导入场景使用）
    headerHtml?: string | null
    footerHtml?: string | null
    headerHeightMm?: number | null
    footerHeightMm?: number | null
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
        displayHeaderFooter?: boolean
    }
}
export interface GeneratePdfResult {
    url: string
    fileName: string
    size: number
}

// 直接从原始 HTML 生成 PDF（不依赖模板）
export interface GeneratePdfFromHtmlRequest {
    html: string
    options?: {
        type?: TemplateType
        widthMm?: number
        heightMm?: number
        marginMm?: Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
        fileName?: string
        displayHeaderFooter?: boolean
    }
}

// 异步任务查询返回结构（与后端 PdfJobStatusResponse 对齐）
export interface PdfJobStatusResponse {
    jobId: string
    status: 'queued' | 'processing' | 'done' | 'error'
    url?: string
    fileName?: string
    size?: number
    error?: string
    createdAt: string
    updatedAt: string
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

    /**
     * 创建模板
     * 中文注释：用于临时创建 HTML 模板以复用服务端 PDF 生成逻辑
     */
    static async createTemplate(payload: UpsertTemplateRequest): Promise<HtmlTemplate> {
        const res = await Http.post('/template/create', payload)
        return res.data as HtmlTemplate
    }

    /**
     * 删除模板
     * 中文注释：用于清理临时模板，避免数据库残留
     */
    static async deleteTemplate(id: string): Promise<boolean> {
        const res = await Http.post('/template/delete', { id })
        return res.data as boolean
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

    // 从原始 HTML 直接生成 PDF（不创建模板）
    static async generatePdfFromHtml(params: GeneratePdfFromHtmlRequest): Promise<GeneratePdfResult> {
        const res = await Http.post('/htmlpdf/generate-raw', params)
        return res.data as GeneratePdfResult
    }

    // 入队一个“原始HTML→PDF”异步任务，立即返回 jobId
    static async enqueuePdfFromHtml(
        params: GeneratePdfFromHtmlRequest
    ): Promise<{ jobId: string }> {
        const res = await Http.post('/htmlpdf/enqueue-raw', params)
        return res.data as { jobId: string }
    }

    // 查询异步任务状态
    static async getPdfJob(jobId: string): Promise<PdfJobStatusResponse> {
        const res = await Http.get(`/htmlpdf/job/${jobId}`)
        return res.data as PdfJobStatusResponse
    }
}

export default TemplateApiFront
