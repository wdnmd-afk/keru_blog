# HTML→PDF 原始转换接口与 3 分钟超时策略落地说明

- 日期：2025-10-31
- 模块：server/htmlpdf、frontEnd/files
- 变更类型：功能新增 + 行为修正（不影响原有模板生成接口）

## 背景
- 需求：
  - 修复 ActiveReports 导出 HTML 生成 PDF 时左上角出现 `Report`、单页变两页、边距不生效问题。
  - 生成 PDF 超时默认 30s，需提高到 3 分钟内不超时。
- 根因：
  - `<title>Report</title>` 被页眉模板引用，导致左上角出现文字；
  - `.arjs-reportPage { page-break-after: always; }` 和 `@page { ... }` 强制分页且覆盖 Puppeteer 传入的边距；
  - Puppeteer 默认导航/渲染超时 30s（`page.setContent`），HTTP 层也可能 2 分钟超时。

## 方案概览
- 新增“原始 HTML 转 PDF”接口，绕过模板模型：
  - `POST /api/htmlpdf/generate-raw`，Body: `{ html: string, options?: { type?, widthMm?, heightMm?, marginMm?, fileName?, displayHeaderFooter? } }`
  - 服务端预处理：移除 `<title>...</title>` 与所有 `@page {...}` 规则；
  - 注入打印修复样式：覆盖 ActiveReports 的 `.arjs-reportPage { page-break-after: auto !important; }`，避免多出空白页；
  - `preferCSSPageSize: false`，以保证外部传入的尺寸/边距生效；
  - 默认 `displayHeaderFooter: false`，避免页眉引用 title；
  - 强制安全清洗（`sanitize-html`）。
- 保留原有模板接口 `/api/htmlpdf/generate`，不改变其现有行为与参数。
- 超时策略：
  - Puppeteer 端：`page.setDefaultNavigationTimeout/ setDefaultTimeout(180000)`，且 `page.setContent(..., { timeout: 180000 })`；
  - HTTP 层：`res.setTimeout(180000)`；
  - 通过环境变量覆盖：
    - `PDF_RENDER_TIMEOUT_MS`（默认 180000）
    - `PDF_HTTP_TIMEOUT_MS`（默认 180000）

## 代码改动清单（关键片段）
- `server/src/router/htmlpdf/types.ts`
  - 新增 `GeneratePdfFromHtmlRequest` 类型。
- `server/src/router/htmlpdf/service.ts`
  - 新增 `preprocessRawHtml()`：移除 `<title>` 与 `@page`，注入打印修复并 sanitize。
  - 新增 `injectPrintFixesRaw()`：添加打印媒体覆盖，修复 `.arjs-reportPage` 的强制分页。
  - 新增 `generatePdfFromRaw()`：从原始 HTML 直接生成 PDF，`preferCSSPageSize: false`，尊重传入边距。
  - 注入超时：`setPageTimeout(page)` 与 `page.setContent(..., { timeout: 180000 })`。
  - 保持原有模板路径 `generatePdf()` 不变（仍用 `preferCSSPageSize: true`）。
- `server/src/router/htmlpdf/controller.ts`
  - 新增 `POST /api/htmlpdf/generate-raw`；
  - 在 `generate-raw`/`generate`/`render-html` 中增加 `res.setTimeout(180000)`。
- `frontEnd/src/api/template.ts`
  - 新增 `GeneratePdfFromHtmlRequest` 与 `TemplateApiFront.generatePdfFromHtml()`（指向 `/htmlpdf/generate-raw`）。
- `frontEnd/src/views/Files/HtmlToPdf.tsx`
  - 切换为调用 `generatePdfFromHtml()`，不再创建临时模板；
  - `displayHeaderFooter: false`；保留 UI 中的边距/纸张/文件名设置。

## 验证步骤
1. 后端重启（Windows）
```cmd
set PDF_RENDER_TIMEOUT_MS=180000
set PDF_HTTP_TIMEOUT_MS=180000
pnpm run dev:server
```
> 也可不设环境变量，默认即 180000ms。

2. 前端刷新 `/files` -> “HTML转PDF”，上传 ActiveReports 导出的 HTML：
   - 设置边距（如 上0 右5 下5 左5），点“生成 PDF”。
   - 预期：
     - 不再显示左上角 “Report”（title 已移除且默认禁用页眉）；
     - PDF 单页（`arjs-reportPage` 覆盖为 `auto`，`@page` 已移除）；
     - 边距按 UI 值生效（`preferCSSPageSize:false`）。

3. 断网/慢网情况下的建议：
   - 若外链字体/图片加载很慢，仍可能逼近 180s；
   - 可改为 `waitUntil: 'networkidle2'` 或 `domcontentloaded`（当前保留 `networkidle0` 更稳）。

## 潜在风险与回滚
- 风险：移除 `@page` 可能影响少数依赖页面 CSS 页边距的模板；本接口仅针对“原始 HTML 导入”场景，模板生成路径未改动，互不影响。
- 回滚：前端恢复为旧流程（创建临时模板 + `/generate`），或服务端关闭 `/generate-raw` 路由。

## 进一步优化建议
- 增加 `scale`（0.1~2）选项，以解决内容略超页导致分页的问题。
- 增加资源加载超时的软降级（如 30s 后强制 `domcontentloaded` 再 pdf），进一步减少卡死概率。

## 变更影响面
- 新增接口，对外兼容：旧接口与参数完全不受影响。
- 存储路径、静态暴露与安全清洗策略与既有实现一致（`temp/pdf/YYYYMMDD`，对外 `/temp`）。

## 追踪与日志
- 生成日志：`server/logs/server.log`（按项目日志策略）；
- 产物索引：`temp/pdf/_index.json`；
- 失败栈：`[htmlpdf] generate-raw error: ...`。

