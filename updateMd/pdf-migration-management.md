# PDF 生成功能迁移至管理端 - 实施文档

更新时间：2025-10-22

## 目标
- 从前台 `frontEnd` 移除 PDF 生成器相关页面与路由。
- 在管理端 `management` 新增“PDF 内容填充”页面，提供模板选择、数据填写（可视化表单/JSON）、预览 HTML、生成 PDF。
- 支持“固定页眉/页脚（默认开启）+ 自动分页”。
- **页眉/页脚配置迁移到模板级（TemplateManagement 中维护）**；“PDF 内容填充”页面仅填写一个大 JSON 结构。

## 变更范围与清单
- 前台（移除）
  - 移除路由：`frontEnd/src/routes/index.tsx` 删除 `/pdf-generator` 路由与懒加载组件。
  - 下线页面：`frontEnd/src/views/PDFGenerator/index.tsx` 已重命名为 `index.removed`（避免 TS 编译）。
  - API 封装：`frontEnd/src/api/template.ts` 仍保留（当前无引用，如确认不再使用可后续删除）。
- 管理端（新增）
  - 新页面：`management/src/pages/PDFContentFill/index.tsx`
  - 新路由：`management/src/routes/index.tsx` 新增 `/pdf-fill`
  - API 类型：`management/src/api/template.ts` 扩展 `HtmlTemplate/UpsertTemplateRequest`，新增模板级头尾字段；`GeneratePdfRequest.options` 仍兼容可覆盖。
- 服务端（扩展）
  - 类型：`server/src/router/htmlpdf/types.ts` 新增：
    - `displayHeaderFooter?: boolean`（默认 true）
    - `headerHtml?: string`、`footerHtml?: string`
    - `headerHeightMm?: number`、`footerHeightMm?: number`
  - 生成逻辑：`server/src/router/htmlpdf/service.ts`
    - 解析并联动边距，预留页眉/页脚空间，避免正文覆盖。
    - 默认从模板字段读取头尾配置（options 可覆盖）；编译 `headerTemplate` / `footerTemplate` 并传给 `page.pdf`。
    - 默认模板包含日期与页码（可被自定义模板覆盖）。
  - 数据模型：`server/prisma/schema.prisma` 的 `HtmlTemplate` 新增模板级头尾字段；需执行 Prisma 迁移。

## 操作步骤
1. 拉取代码并安装依赖（如必要）。
2. 启动服务端与管理端：
   - 服务端：`pnpm --filter server dev`（如需：设置 `PUPPETEER_EXECUTABLE_PATH` 指向 Chrome/Edge）
   - 管理端：`pnpm --filter management dev`
3. 进行数据库迁移（新增模板级头尾字段）：
   ```cmd
   pnpm --filter server prisma generate
   pnpm --filter server prisma migrate dev -n "htmltemplate-header-footer"
   ```
4. 管理端访问 `http://localhost:9395/pdf-fill`：
   - 选择模板（如无模板，请先在 `模板管理` 新建模板并可选配置 fields 与模板级头尾）。
   - 在“可视化表单”或“JSON 文本”填写数据（一个大 JSON 结构）。
   - 点击“预览HTML”或“生成PDF”。
   - PDF 预览会在抽屉中打开（管理端内置 `PDFPreviewDrawer`），无需离开当前页。

## 参数说明（服务端）
- `GeneratePdfRequest.options.displayHeaderFooter`: 是否显示并固定页眉/页脚（默认 true）。
- `headerHtml` / `footerHtml`: 自定义模板（支持 handlebars 变量与 Puppeteer 固有占位，如 `.pageNumber`/`.totalPages`）。
- `headerHeightMm` / `footerHeightMm`: 页眉/页脚占用高度（mm），默认 15。
- `marginMm`: 边距（mm）。当 `displayHeaderFooter=true` 时，系统会自动将 `top/bottom` 与 `headerHeightMm/footerHeightMm` 取较大值，避免正文被覆盖。
  - 以上参数在未传 `options` 时，默认从模板 `HtmlTemplate` 对应字段读取。

### 预览注入（render-html）
- 新增 `RenderHtmlRequest.previewHeaderFooter?: boolean`（默认 false）。
- 当为 `true` 时，服务端会在返回的 HTML 中注入“固定定位的页眉/页脚容器”与对应样式，并根据模板设置自动增加 `body` 的上/下边距，便于管理端在浏览器中直接预览近似效果。
- 注意：该注入仅用于预览，不影响 PDF 生成时 Puppeteer 的 `headerTemplate/footerTemplate` 行为。

## 使用建议
- 页眉/页脚模板仅支持内联样式，尽量简洁：推荐 `font-size: 9px`、`padding: 0 10mm`。
- 页码示例（页脚）：
  ```html
  <div style="text-align:center;font-size:9px;">
    第<span class="pageNumber"></span>/<span class="totalPages"></span>页
  </div>
  ```
- 若模板样式依赖字体，请通过 `/static/fonts` 引用并在模板中 `@font-face` 声明，详见 `updateMd/fonts-and-env-setup.md`。

## 预览与输出路径策略
- **PDF 输出路径**：服务端将 PDF 固定输出至 `static/PDF/YYYYMMDD/xxx.pdf`。
  - 对外访问 URL：`/static/PDF/YYYYMMDD/xxx.pdf`
  - 管理端开发代理：`vite.config.ts` 已将 `/static` 代理到后端端口。
- **管理端预览**：
  - HTML 预览：通过 `/api/htmlpdf/render-html`，请求体传 `previewHeaderFooter: true` 以注入头尾预览。
  - PDF 预览：抽屉组件 `PDFPreviewDrawer`（基于 iframe）加载 `/static/PDF/...` 直接预览。

## 潜在风险与排查
- 生成 PDF 空白/样式缺失：检查 `sanitize` 是否移除了关键标签；可临时设置 `sanitize=false` 验证。
- 页眉/页脚覆盖正文：调整 `headerHeightMm`/`footerHeightMm` 或增大 `marginMm.top/bottom`。
- 生成失败：确认无头浏览器路径（`PUPPETEER_EXECUTABLE_PATH`）可用，并查看日志。
- 性能：高并发生成建议复用浏览器（已实现单例），必要时可引入队列与并发限制。

## 优化方向
- 可在模板层支持 `@page` 与 CSS 样式更精细的分页控制（例如分页符、禁止元素拆分）。
- 管理端可引入富文本/HTML 编辑器（Monaco/CodeMirror）辅助编辑页眉/页脚模板。
- 表单 schema 可扩展为更丰富的类型（date、number、upload），并加入校验规则。

## 回滚方案
- 如需临时回滚到前台：
  - 还原 `frontEnd/src/routes/index.tsx` 中的 `/pdf-generator` 路由。
  - 将 `frontEnd/src/views/PDFGenerator/index.removed` 恢复为 `index.tsx`。
  - 管理端 `/pdf-fill` 可保留作为备用。

## 验证清单（E2E）
- 模板含 fields：展示可视化表单，JSON 与表单双向同步。
- 固定页眉/页脚配置在模板管理页设置：多页重复渲染相同头尾；正文不被覆盖。
- 自定义 header/footer 生效；默认模板正确显示（日期/页码）。
- 生成 PDF 可正常打开与下载；临时文件定期清理（参考 `updateMd/temp-pdf-cleanup.md`）。

