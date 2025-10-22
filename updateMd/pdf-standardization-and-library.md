# PDF 统一样式与文件库实现（标准化方案）

本说明记录本次“PDF 输出标准化 + 文件库 + 批量生成”的实现方案与操作步骤，确保可追溯、可复现。

## 一、目标
- **统一样式**：引入单独的 `pdf-reset.css`（医疗风格），所有模板在预览/生成时自动注入，不再需要在模板里反复调整。
- **全局间距 +10%**：通过 CSS 变量 `--scale: 1.1` 实现模块留白统一放大。
- **分页安全**：加入分页友好规则，减少跨页拆分与遮挡（结合后端 mm 缓冲）。
- **PDF 文件库**：新增管理端页面，列出 `static/PDF` 下所有文件，支持按模板筛选与预览。
- **模板管理双击跳转**：模板管理页双击某模板行，跳转到 PDF 文件库并过滤该模板的文件。
- **内容填充批量生成**：在 PDF 内容填充页，支持设置数量批量生成 PDF。

## 二、改动清单
- **服务端**
  - 新增统一样式：`server/static/CSS/pdf-reset.css`
  - `server/src/router/htmlpdf/service.ts`
    - 预览/生成流程自动注入 reset.css（读取内容以内联 `<style>` 注入 `<head>`）。
    - 预览与生成时加入 2mm 安全缓冲（联动 `headerHeightMm/footerHeightMm`），防止内容与粗线重叠。
    - 生成 PDF 后记录索引 `static/PDF/_index.json`，包含 `{templateId,url,fileName,size,dateKey,createdAt}`。
    - 新增 `listPdfs(filter?)` 汇总索引与磁盘文件。
  - `server/src/router/htmlpdf/controller.ts`
    - 新增接口 `POST /api/htmlpdf/list` 返回 PDF 列表（可选 `templateId` 过滤）。
- **管理端**
  - 新增页面：`management/src/pages/PDFLibrary/index.tsx`（PDF 文件库）
    - 支持模板筛选、文件名关键字、分页、抽屉预览。
  - 路由注册：`/pdf-library`
  - `模板管理`：`management/src/pages/TemplateManagement/index.tsx`
    - 表格支持双击跳转到 PDF 文件库（带上 `templateId`）。
  - `内容填充`：`management/src/pages/PDFContentFill/index.tsx`
    - 新增“批量生成 PDF”入口，可设置数量并生成多个文件（文件名加时间戳与序号）。
  - API：`management/src/api/template.ts`
    - 新增 `listPdfs()` 调 /htmlpdf/list。
  - 共享组件：`shared/src/components/KTable/index.tsx`
    - 新增 `rowDoubleClick` 支持双击行事件。

## 三、样式规范（pdf-reset.css）
- 统一变量：字体、颜色、基准字号与留白；通过 `--scale: 1.1` 实现全局 +10%。
- 组件类：`.card`、`.section-title`、`.table`、`.badge`、`.muted` 等；推荐模板使用这些类名，减少模板内样式。
- 分页友好：
  - `.table thead { display: table-header-group; }`
  - `.table tr { page-break-inside: avoid; break-inside: avoid-page; }`
  - `.card, h1, h2, h3, p { page-break-inside: avoid; }`

## 四、分页与遮挡控制
- 服务端在预览与 PDF 生成时均加入 2mm 安全缓冲，避免与页眉/页脚粗线重叠。
- 如仍略近，可将模板的 `headerHeightMm/footerHeightMm` 上调 2-4mm，或在正文容器增加 `padding-top/bottom: 2mm`。

## 五、接口与页面
- `POST /api/htmlpdf/list`：返回 PDF 文件列表，可传 `templateId` 进行过滤。
- 管理端页面：
  - `PDFLibrary`：路径 `/pdf-library`。
  - `模板管理` 双击行跳转到 `/pdf-library?templateId=xxx`。
  - `内容填充` 有“批量生成”按钮，生成后可点击“打开PDF文件库”。

## 六、验证步骤
1. 重启服务端与管理端。
2. 在模板管理页任意模板点击“生成PDF”，在 PDF 文件库能看到文件并可预览。
3. 在内容填充页使用示例 JSON，点击“批量生成”，观察多文件生成并可在 PDF 库查看。
4. 预览与 PDF 分页处不再遮挡，表格/卡片不被拆分。

## 七、风险与回退
- 首次读取 `pdf-reset.css` 失败时将不注入（返回空字符串），可检查 `server/static/CSS/pdf-reset.css` 是否存在。
- PDF 索引 `_index.json` 不会阻塞生成，写入失败仅影响文件库列表完整性。
- 如需回退：在 `service.ts` 中移除 `injectResetCss()` 与 `_index.json` 写入逻辑即可。

## 八、后续优化
- 提供“下载/删除”PDF 的接口与UI。
- reset.css 拆分为主题化变量，支持配色切换（如医院品牌色）。
- 批量生成支持并发队列与进度条展示。
