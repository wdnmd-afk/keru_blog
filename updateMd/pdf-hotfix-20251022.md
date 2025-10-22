# PDF Hotfix 2025-10-22

本文件记录“Q&A 字体过小、左右缺少边距、去除边框线、预览容器滚动条、分页内容侵入页眉页脚”等问题的修复内容与验证步骤。

## 修复项
- 调整字体与边距（服务端注入）：
  - `server/src/router/htmlpdf/service.ts` 在 `injectResetCss()` 中新增 UI 覆盖：
    - `html, body, p, li` 字号提升为 15px，行高 1.7。
    - `.card/.table` 去边框与阴影，`hr` 隐藏。
    - `body` 左右内边距 15mm（仅预览，打印时由 Puppeteer 边距控制）。
  - 预览模式 `renderHtml()` 的临时样式块将 `padding-left/right` 设为 15mm。
- 分页与重叠：
  - 打印覆盖 `@media print` 中将 `body` margin/padding 归零，避免与 Puppeteer `page.pdf({margin})` 叠加。
  - `.card { page-break-inside: auto }` 允许大块内容分页拆分，减少整页空白。
  - `.table thead { display: table-header-group }` 与 `.table tr { break-inside: avoid-page }` 维持表头重复与行不拆分。
  - PDF 生成时：
    - 页眉/页脚最小高度抬升：`>= 20mm`。
    - 安全缓冲提高为 6mm：`top >= headerHeight + 6mm`，`bottom >= footerHeight + 6mm`。
    - 默认页边距由 10mm 调整为 15mm。
- 预览容器滚动与留白：
  - `management/src/components/PDFPreviewDrawer.tsx`：Drawer body 溢出隐藏，iframe 高度 `calc(100vh - 64px)`。
  - `management/src/pages/PDFContentFill/index.tsx`：HTML 预览 iframe 高度 `80vh` 且去边框与滚动。
- 数据填充不再清空：
  - `PDFContentFill` 的模板详情回填副作用仅依赖 `templateId`。
  - `handleFormChange()` 将表单值合并进现有 JSON，避免覆盖数组键（如 `cbc.items`、`qa`）。

## 验证步骤
1. 管理端“PDF 内容填充”：
   - 填充 30 条 CBC 示例，手动修改上方表单字段；表格应保持不被清空。
2. HTML 预览与 PDF 预览：
   - Q&A 字体变大（≈15px），左右有明显内边距，卡片/表格无边框。
   - 预览容器铺满，无底部滚动条或留白。
3. 生成 PDF：
   - 首页不出现大空白。
   - 内容不会侵入页眉页脚，分页处不遮挡。

## 风险与回退
- 此次变更通过服务端注入样式实现，对全部模板即时生效；如需回退，只需在 `service.ts` 移除或缩减对应覆盖样式与缓冲逻辑。
- 若个别模板仍有分页细节问题，可单独增大 `headerHeightMm/footerHeightMm` 或在正文外层容器增加 `padding-top/bottom`。

## 后续优化建议
- 将字号、左右内边距等做成可配模板级变量，以便不同报告类型按需微调。
- 为 PDF 文件库添加批量删除/下载与元数据编辑能力。
