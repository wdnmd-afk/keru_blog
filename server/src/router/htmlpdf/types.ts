// htmlpdf/types.ts
// HTML 模板渲染与 PDF 生成的 DTO 与类型定义（含中文注释）

export type TemplateType = 'A4' | 'A5' | 'CUSTOM'

// 渲染 HTML 入参
export interface RenderHtmlRequest {
  /** 模板ID（Prisma: HtmlTemplate.id） */
  templateId: string
  /** 模板数据：用于替换 handlebars 变量 {{key}} */
  data?: Record<string, any>
  /** 是否启用 HTML 安全清洗（默认 true） */
  sanitize?: boolean
}

// 生成 PDF 入参
export interface GeneratePdfRequest extends RenderHtmlRequest {
  /** 生成选项，可覆盖模板内尺寸/边距等 */
  options?: {
    /** 强制指定类型：A4/A5/CUSTOM（不传走模板类型） */
    type?: TemplateType
    /** 自定义宽/高（单位：mm，仅当 type=CUSTOM 生效） */
    widthMm?: number
    heightMm?: number
    /** 边距（mm），如 { top: 10, right: 10, bottom: 10, left: 10 } */
    marginMm?: Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
    /** 自定义文件名（不含扩展名），默认按时间与随机ID生成 */
    fileName?: string
  }
}

// 生成 PDF 返回结果
export interface GeneratePdfResult {
  /** 可直接访问的 URL，如 /temp/pdf/20251021/xxx.pdf */
  url: string
  /** 生成的文件名，例如 xxx.pdf */
  fileName: string
  /** 文件大小（字节） */
  size: number
}
