// htmlpdf/service.ts
// 负责：读取模板、渲染 HTML、生成 PDF 并写入临时目录
// 说明：为避免 Prisma Client 未生成导致的类型报错，这里通过 any 访问 htmlTemplate 模型，
// 待执行 prisma generate 后可改回强类型。

import { createAppConfig } from '@/config/app.config'
import { PrismaDB } from '@/db'
import fs from 'fs-extra'
import Handlebars from 'handlebars'
import { inject, injectable } from 'inversify'
import os from 'os'
import path from 'path'
import sanitizeHtml from 'sanitize-html'

// 使用 puppeteer-core，要求本机存在可执行浏览器（或设置 PUPPETEER_EXECUTABLE_PATH）
import puppeteer, { Browser } from 'puppeteer-core'
import type {
  GeneratePdfRequest,
  GeneratePdfResult,
  RenderHtmlRequest,
  TemplateType,
} from './types'

@injectable()
export class HtmlPdfService {
  // 单例浏览器实例，避免频繁启动
  private static browser: Browser | null = null
  // 辅助函数注册标记，确保只注册一次
  private static helpersRegistered = false
  // reset.css 缓存，避免每次读盘
  private static resetCssCache: string | null = null

  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {
    // 注册 handlebars 辅助函数（仅注册一次）
    if (!HtmlPdfService.helpersRegistered) {
      // 等值判断：{{#if (eq a b)}} ... {{/if}}
      Handlebars.registerHelper('eq', function (a: any, b: any) {
        return a === b
      })
      HtmlPdfService.helpersRegistered = true
    }
  }
  // ======== reset.css 注入与 PDF 索引 ========
  /** 读取并缓存 reset.css 内容 */
  private getResetCss(): string {
    if (HtmlPdfService.resetCssCache !== null) return HtmlPdfService.resetCssCache
    try {
      const config = createAppConfig()
      const staticRoot = config.upload.uploadDir || 'static'
      const cssPath = path.resolve(process.cwd(), staticRoot, 'CSS', 'pdf-reset.css')
      const css = fs.readFileSync(cssPath, 'utf-8')
      HtmlPdfService.resetCssCache = css
      return css
    } catch {
      HtmlPdfService.resetCssCache = ''
      return ''
    }
  }

  /** 将 <style>reset</style> 注入到 </head> 前，若无 head 则前置 */
  private injectResetCss(html: string): string {
    const css = this.getResetCss()
    if (!css) return html
    // 打印覆盖样式：
    // 1) 关闭 body 的默认 margin/padding，避免与 Puppeteer 的 margin 叠加导致大空白（保留 Puppeteer 页边距）
    // 2) 允许 .card 在页面内拆分，避免整块大卡片被整体推到下一页造成留白
    // 3) 表格表头保持重复；行内避免跨页断开
    const printOverrides = `\n<style id="pdf-print-overrides">\n@media print {\n  body { margin: 0 !important; padding: 0 !important; }\n  .card { page-break-inside: auto !important; break-inside: auto !important; }\n  .table thead { display: table-header-group; }\n  .table tr { page-break-inside: avoid; break-inside: avoid-page; }\n}\n</style>\n`

    // 预览与通用显示的 UI 覆盖：
    // - 提升基础字号与行高，优化 Q&A 可读性
    // - 去除卡片边框线（按需求）
    // - 为预览场景提供左右 10mm 内边距（打印时会被上面的 @media print 强制为 0）
    const uiOverrides = `\n<style id="pdf-ui-overrides">\n  :root { --brand-green: #16a34a; }\n  html, body { font-size: 15px; line-height: 1.7; }\n  p, li { font-size: 15px; line-height: 1.7; }\n  .muted { color: #6b7280; font-size: 15px; }\n  .card { border: none !important; box-shadow: none !important; }\n  .section-title { font-size: 16px; font-weight: 600; color: var(--brand-green); }\n  .section-title::before, .section-title::after { border: 0 !important; box-shadow: none !important; background: transparent !important; }\n  h1, .page-title { font-size: 24px; font-weight: 700; color: var(--brand-green); }\n  .table, .table th, .table td { border: none !important; }\n  hr { display: none !important; }\n  body { padding-left: 11mm; padding-right: 11mm; }\n</style>\n`

    const tag = `\n<style id="pdf-reset">\n${css}\n</style>\n${uiOverrides}${printOverrides}`
    if (html.includes('</head>')) return html.replace('</head>', tag + '</head>')
    return tag + html
  }

  /** 记录生成的 PDF 到索引文件 */
  private async appendPdfIndex(record: {
    templateId: string
    url: string
    fileName: string
    size: number
    dateKey: string
    createdAt: string
  }) {
    const config = createAppConfig()
    const staticRoot = config.upload.uploadDir || 'static'
    const indexPath = path.resolve(process.cwd(), staticRoot, 'PDF', '_index.json')
    let list: any[] = []
    try {
      if (await fs.pathExists(indexPath)) {
        const txt = await fs.readFile(indexPath, 'utf-8')
        list = JSON.parse(txt || '[]')
      }
    } catch {
      list = []
    }
    list.push(record)
    await fs.outputFile(indexPath, JSON.stringify(list, null, 2), 'utf-8')
  }

  /** 列出 PDF（合并索引与磁盘文件，尽量完整） */
  public async listPdfs(filter?: { templateId?: string }) {
    const config = createAppConfig()
    const staticRoot = config.upload.uploadDir || 'static'
    const pdfRoot = path.resolve(process.cwd(), staticRoot, 'PDF')
    const indexPath = path.join(pdfRoot, '_index.json')

    // 1) 读索引
    let index: any[] = []
    try {
      if (await fs.pathExists(indexPath)) {
        index = JSON.parse((await fs.readFile(indexPath, 'utf-8')) || '[]')
      }
    } catch {
      index = []
    }

    const map = new Map<string, any>()
    for (const it of index) map.set(it.url, it)

    // 2) 扫描磁盘，补全缺失项
    if (await fs.pathExists(pdfRoot)) {
      const dates = await fs.readdir(pdfRoot)
      for (const d of dates) {
        const dir = path.join(pdfRoot, d)
        const stat = await fs.stat(dir).catch(() => null)
        if (!stat || !stat.isDirectory()) continue
        const files = await fs.readdir(dir)
        for (const f of files) {
          if (!f.toLowerCase().endsWith('.pdf')) continue
          const url = `/static/PDF/${d}/${f}`
          if (map.has(url)) continue
          const fstat = await fs.stat(path.join(dir, f)).catch(() => null)
          if (!fstat) continue
          map.set(url, {
            url,
            fileName: f,
            size: fstat.size,
            dateKey: d,
            createdAt: new Date(fstat.mtimeMs).toISOString(),
          })
        }
      }
    }

    let arr = Array.from(map.values()) as any[]
    if (filter?.templateId) arr = arr.filter(x => x.templateId === filter.templateId)
    arr.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
    return arr
  }

  /**
   * 渲染 HTML（带占位符替换与安全清洗）
   */
  public async renderHtml(params: RenderHtmlRequest): Promise<string> {
    const tpl = await this.getTemplate(params.templateId)
    let html = this.compileTemplate(tpl.content, params.data || {})

    // 统一注入 reset.css（医疗风格 + 10% 间距），保证所有模板基线一致
    html = this.injectResetCss(html)

    // 预览模式：根据模板配置注入页眉/页脚（仅用于 HTML 预览，非 Puppeteer 头尾）
    let withHeaderFooter = html
    if (params.previewHeaderFooter) {
      const displayHeaderFooter = (tpl as any).displayHeaderFooter ?? true
      if (displayHeaderFooter) {
        const headerHeightMm = (tpl as any).headerHeightMm ?? 15
        const footerHeightMm = (tpl as any).footerHeightMm ?? 15
        // 预览安全缓冲（mm）：为粗线/阴影等预留额外空间，避免正文在视觉上贴线或被遮挡
        const previewBufferMm = 4
        const headerMt = headerHeightMm + previewBufferMm
        const footerMb = footerHeightMm + previewBufferMm
        const defaultHeader = this.defaultHeaderHtml()
        const defaultFooter = this.defaultFooterHtml()
        const headerSrc = (tpl as any).headerHtml ?? defaultHeader
        const footerSrc = (tpl as any).footerHtml ?? defaultFooter
        const headerHtml = this.compileTemplate(headerSrc, params.data || {})
        const footerHtml = this.compileTemplate(footerSrc, params.data || {})

        const styleBlock = `\n<style>\n  /* 预览模式下给 body 上/下边距加缓冲，避免与粗线重叠；并提供左右内边距以贴合 PDF 页边距视觉 */\n  body { margin-top: ${headerMt}mm; margin-bottom: ${footerMb}mm; padding-left: 11mm; padding-right: 11mm; }\n  .__tpl-header { position: fixed; top: 0; left: 0; right: 0; height: ${headerHeightMm}mm; z-index: 9999; }\n  .__tpl-footer { position: fixed; bottom: 0; left: 0; right: 0; height: ${footerHeightMm}mm; z-index: 9999; }\n</style>\n`
        const headerWrap = `\n<div class="__tpl-header">${headerHtml}</div>\n`
        const footerWrap = `\n<div class="__tpl-footer">${footerHtml}</div>\n`

        // 将样式注入 <head>，头尾容器注入 <body>
        let tmp = withHeaderFooter
        if (tmp.includes('</head>')) {
          tmp = tmp.replace('</head>', styleBlock + '</head>')
        } else {
          tmp = styleBlock + tmp
        }

        // 尝试在 <body ...> 后插入 header，</body> 前插入 footer
        const bodyOpenIdx = tmp.toLowerCase().indexOf('<body')
        if (bodyOpenIdx >= 0) {
          const gtIdx = tmp.indexOf('>', bodyOpenIdx)
          if (gtIdx > bodyOpenIdx) {
            tmp = tmp.slice(0, gtIdx + 1) + headerWrap + tmp.slice(gtIdx + 1)
          } else {
            // 回退：直接在文首插入（极少数异常结构）
            tmp = headerWrap + tmp
          }
        } else {
          // 无 <body> 标签时，直接在文首插入
          tmp = headerWrap + tmp
        }
        if (tmp.includes('</body>')) {
          tmp = tmp.replace('</body>', footerWrap + '</body>')
        } else {
          tmp = tmp + footerWrap
        }
        withHeaderFooter = tmp
      }
    }

    // 默认开启清洗，避免 script 等危险标签
    const needSanitize = params.sanitize !== false
    const safeHtml = needSanitize ? this.sanitize(withHeaderFooter) : withHeaderFooter
    return safeHtml
  }

  /**
   * 生成 PDF 并返回可访问 URL
   */
  public async generatePdf(params: GeneratePdfRequest): Promise<GeneratePdfResult> {
    const tpl = await this.getTemplate(params.templateId)

    const compiledHtml = await this.renderHtml({
      templateId: params.templateId,
      data: params.data,
      sanitize: params.sanitize,
    })

    const { width, height, format } = this.resolveSize(
      params.options?.type || (tpl.type as TemplateType),
      params.options?.widthMm ?? tpl.widthMm ?? undefined,
      params.options?.heightMm ?? tpl.heightMm ?? undefined
    )

    // 处理页眉/页脚与边距（默认从模板读取，options 可覆盖）
    const opts = params.options || {}
    const tDisplay = (tpl as any).displayHeaderFooter ?? true
    const tHeaderHeight = Math.max((tpl as any).headerHeightMm ?? 15, 20)
    const tFooterHeight = Math.max((tpl as any).footerHeightMm ?? 15, 20)
    const displayHeaderFooter = opts.displayHeaderFooter ?? tDisplay
    const headerHeightMm = opts.headerHeightMm ?? tHeaderHeight
    const footerHeightMm = opts.footerHeightMm ?? tFooterHeight

    // 初始边距
    const margins = this.resolveMargins(opts.marginMm)
    // 将 mm 字符串解析为数值以便比较与联动
    const parseMm = (v?: string) => {
      if (!v) return 0
      const n = Number(String(v).replace('mm', '').trim())
      return Number.isFinite(n) ? n : 0
    }
    let topMm = parseMm((margins as any).top)
    let bottomMm = parseMm((margins as any).bottom)
    const left = (margins as any).left
    const right = (margins as any).right
    if (displayHeaderFooter) {
      // 生成 PDF 时同样加“安全缓冲”（mm），避免内容与页眉/页脚粗线在分页交界处互相覆盖
      const bufferMm = 6
      topMm = Math.max(topMm, headerHeightMm + bufferMm)
      bottomMm = Math.max(bottomMm, footerHeightMm + bufferMm)
    }
    const finalMargins = { top: `${topMm}mm`, bottom: `${bottomMm}mm`, left, right }

    // 生成页眉/页脚模板（支持 handlebars 变量）
    const defaultHeader = this.defaultHeaderHtml()
    const defaultFooter = this.defaultFooterHtml()
    const headerSrc = opts.headerHtml ?? (tpl as any).headerHtml ?? defaultHeader
    const footerSrc = opts.footerHtml ?? (tpl as any).footerHtml ?? defaultFooter
    const headerTemplate = this.compileTemplate(headerSrc, params.data || {})
    const footerTemplate = this.compileTemplate(footerSrc, params.data || {})

    // 目标输出目录：static/PDF/YYYYMMDD（对外通过 /static 暴露）
    const dateKey = this.getDateKey()
    const config = createAppConfig()
    const staticRoot = config.upload.uploadDir || 'static'
    const outDir = path.resolve(process.cwd(), staticRoot, 'PDF', dateKey)
    await fs.ensureDir(outDir)

    const baseName = (params.options?.fileName || `pdf_${Date.now()}`) + '.pdf'
    const outPath = path.join(outDir, baseName)

    const browser = await HtmlPdfService.getBrowser()
    const page = await browser.newPage()

    try {
      // 设置页面内容并等待静态资源加载
      await page.setContent(compiledHtml, { waitUntil: 'networkidle0' })

      await page.pdf({
        path: outPath, // 直接落盘
        format, // 与 width/height 互斥，传了 format 就不需要 width/height
        width, // 仅在自定义时生效，如 '148mm'
        height, // 仅在自定义时生效
        margin: finalMargins,
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter,
        headerTemplate: displayHeaderFooter ? headerTemplate : undefined,
        footerTemplate: displayHeaderFooter ? footerTemplate : undefined,
      })

      const stat = await fs.stat(outPath)
      const url = `/static/PDF/${dateKey}/${baseName}`

      // 记录索引（用于 PDF 文件库查询）
      await this.appendPdfIndex({
        templateId: params.templateId,
        url,
        fileName: baseName,
        size: stat.size,
        dateKey,
        createdAt: new Date().toISOString(),
      })

      return { url, fileName: baseName, size: stat.size }
    } finally {
      await page.close().catch(() => void 0)
    }
  }

  // ================= 私有方法 =================

  /**
   * 默认页眉 HTML（每页固定显示）
   * Puppeteer 会替换 .date/.title/.pageNumber/.totalPages 等占位符
   */
  private defaultHeaderHtml(): string {
    return `
    <div style="font-size:9px; color:#666; width:100%; padding:0 10mm; display:flex; justify-content:space-between; align-items:center;">
      <span class="title"></span>
      <span class="date"></span>
    </div>`
  }

  /**
   * 默认页脚 HTML（包含页码）
   */
  private defaultFooterHtml(): string {
    return `
    <div style="font-size:9px; color:#666; width:100%; padding:0 10mm; display:flex; justify-content:space-between; align-items:center;">
      <span>Powered by Keru</span>
      <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`
  }

  /**
   * 读取模板（Prisma）
   */
  private async getTemplate(id: string): Promise<{
    id: string
    type: string
    content: string
    widthMm?: number | null
    heightMm?: number | null
    displayHeaderFooter?: boolean | null
    headerHtml?: string | null
    footerHtml?: string | null
    headerHeightMm?: number | null
    footerHeightMm?: number | null
  }> {
    const prisma: any = this.PrismaDB.prisma as any
    const tpl = await prisma.htmlTemplate.findUnique({ where: { id } })
    if (!tpl) throw new Error('模板不存在')
    return tpl
  }

  /**
   * 编译模板（handlebars）
   */
  private compileTemplate(content: string, data: Record<string, any>): string {
    const template = Handlebars.compile(content, { noEscape: true })
    return template(data || {})
  }

  /**
   * 安全清洗（可根据需要扩展白名单）
   */
  private sanitize(html: string): string {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'img',
        'style',
        'section',
        'article',
        'header',
        'footer',
        'main',
        'figure',
        'figcaption',
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'width', 'height', 'style'],
        '*': ['style', 'class', 'id'],
      },
      // 允许内联样式（根据业务需要可进一步限制）
      allowVulnerableTags: true,
      allowedSchemesByTag: { img: ['http', 'https', 'data'] },
    })
  }

  /**
   * 尺寸解析：A4/A5 或自定义毫米宽高
   */
  private resolveSize(
    type: TemplateType,
    widthMm?: number,
    heightMm?: number
  ): { format?: 'A4' | 'A5'; width?: string; height?: string } {
    if (type === 'A4') return { format: 'A4' }
    if (type === 'A5') return { format: 'A5' }

    // 自定义尺寸（单位：mm）
    if (!widthMm || !heightMm) {
      // 缺失时回退到 A4，避免报错
      return { format: 'A4' }
    }
    return { width: `${widthMm}mm`, height: `${heightMm}mm` }
  }

  /**
   * 边距解析（默认 10mm）
   */
  private resolveMargins(m?: Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>) {
    const top = m?.top ?? 15
    const right = m?.right ?? 11
    const bottom = m?.bottom ?? 15
    const left = m?.left ?? 11
    return { top: `${top}mm`, right: `${right}mm`, bottom: `${bottom}mm`, left: `${left}mm` }
  }

  /**
   * 日期 key：YYYYMMDD
   */
  private getDateKey() {
    const d = new Date()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}${mm}${dd}`
  }

  /**
   * 获取（或创建）浏览器实例
   */
  private static async getBrowser(): Promise<Browser> {
    if (this.browser && this.browser.isConnected()) return this.browser

    const executablePath = HtmlPdfService.resolveExecutablePath()

    this.browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })
    return this.browser
  }

  /**
   * 解析可执行浏览器路径（优先环境变量）
   */
  private static resolveExecutablePath(): string | undefined {
    // 1) 显式传入
    if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH

    // 2) 常见系统路径（Windows 优先）
    if (process.platform === 'win32') {
      const candidates = [
        'C:/Program Files/Google/Chrome/Application/chrome.exe',
        'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        path.join(os.homedir(), 'AppData/Local/Google/Chrome/Application/chrome.exe'),
        'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
        'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      ]
      for (const p of candidates) {
        if (fs.existsSync(p)) return p
      }
    }

    // 3) Linux / macOS 常见路径
    const others = [
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    ]
    for (const p of others) {
      if (fs.existsSync(p)) return p
    }

    // 4) 未找到则交给 puppeteer-core 自行处理（可能报错，提示用户设置路径）
    return undefined
  }
}
