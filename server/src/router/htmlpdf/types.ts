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
  /** 预览时是否注入模板的页眉/页脚（仅影响 render-html 返回的 HTML，不影响 PDF 生成），默认 false */
  previewHeaderFooter?: boolean
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
    /** 是否显示并固定页眉/页脚（默认 true，开启后每页重复渲染） */
    displayHeaderFooter?: boolean
    /** 页眉 HTML 模板（支持 handlebars 变量），为空则使用默认模板 */
    headerHtml?: string
    /** 页脚 HTML 模板（支持 handlebars 变量），为空则使用默认模板（包含页码） */
    footerHtml?: string
    /** 页眉占用高度（mm），用于与 margin.top 联动，默认 15 */
    headerHeightMm?: number
    /** 页脚占用高度（mm），用于与 margin.bottom 联动，默认 15 */
    footerHeightMm?: number
  }
}

// 直接从原始 HTML 生成 PDF（不依赖模板），用于完整 HTML 转换场景
export interface GeneratePdfFromHtmlRequest {
  /** 原始 HTML 字符串（完整文档或片段均可） */
  html: string
  /** 是否异步处理：true 则立即返回200并后台生成（不返回 url） */
  async?: boolean
  /** 生成选项，与模板生成保持一致 */
  options?: {
    /** 强制指定类型：A4/A5/CUSTOM（不传默认为 A4） */
    type?: TemplateType
    /** 自定义宽/高（单位：mm，仅当 type=CUSTOM 生效） */
    widthMm?: number
    heightMm?: number
    /** 边距（mm），如 { top: 10, right: 10, bottom: 10, left: 10 } */
    marginMm?: Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
    /** 自定义文件名（不含扩展名），默认按时间与随机ID生成 */
    fileName?: string
    /** 是否显示并固定页眉/页脚（默认 false，在 raw 模式下默认关闭） */
    displayHeaderFooter?: boolean
    /** 是否进行 HTML 安全清洗（默认 true）；关闭后保留 script 等标签，注意安全 */
    sanitize?: boolean
    /** 允许脚本执行（默认 false，仅在 sanitize!==false 时仍可选择允许 script 标签） */
    allowScripts?: boolean
    /** 等待策略（默认 'networkidle0'），可根据动态脚本改为 'networkidle2' 或 'domcontentloaded' */
    waitUntil?: 'networkidle0' | 'networkidle2' | 'domcontentloaded'
  }
}

// 生成 PDF 返回结果
export interface GeneratePdfResult {
  /** 可直接访问的 URL，如 /static/PDF/20251021/xxx.pdf */
  url: string
  /** 生成的文件名，例如 xxx.pdf */
  fileName: string
  /** 文件大小（字节） */
  size: number
}
