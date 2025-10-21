# 固定 HTML 模板接入数据生成 PDF - 全链路设计与执行方案

> 版本：v1.0 (草案)
> 作者：Cascade
> 更新时间：2025-10-21

## 1. 目标与范围
- 支持在管理端维护 HTML 模板（A4、A5、自定义尺寸）。
- 支持在线编辑 HTML 与预览效果（所见即所得以代码编辑 + 右侧渲染为主）。
- 在前台（frontEnd）新建页面，填入对应字段数据，服务端合成 PDF，落盘至 `server/temp/` 并返回可访问 URL。
- 服务端新增独立 `HTMLServer`（模块）负责：模板渲染、PDF 生成、资源加载、并发与安全控制。

## 2. 现状调研结论
- Server：Node + Express + Inversify + Prisma；全局前缀 `/api`；已托管 `/static`（`config.upload.uploadDir` 默认指向 `static`）。`server/temp/` 目录已存在，但尚未通过 `express.static()` 对外暴露。
- Management：有统一表格组件 `shared/components/KTable` 与列表页风格（参考 `management/src/pages/FeedbackManagement/index.tsx`）。暂无代码编辑器。
- FrontEnd：具备 `PDFPreview` 组件与文件预览工具，可直接预览服务端返回的 PDF URL。

## 3. 关键选型与理由
### 3.1 HTML → PDF 引擎（Server 端）
- 推荐：`puppeteer`
  - 优点：渲染还原度高、支持 `format:"A4"` 或 `width/height(mm)`、支持页眉页脚、页面样式完整。
  - 风险：首次安装下载 Chromium 体积较大；Windows 环境 OK，但需注意网络。
- 备选：`playwright`（更重）、`wkhtmltopdf`（需系统依赖）、`html-pdf-node`（底层仍是 puppeteer）。

### 3.2 模板占位符解析
- 推荐：`handlebars`
  - 使用 `{{变量名}}` 进行数据填充；简单、稳定，生态成熟。
- 备选：`ejs`、`nunjucks`、`mustache`。

### 3.3 管理端在线编辑器
- 推荐：`@monaco-editor/react`
  - 理由：代码高亮、自动补全、差错提示，对 HTML/CSS/JS 友好，易于集成。
- 备选：`codemirror`；不建议富文本编辑器（如 quill）直接编辑 HTML 源码。

## 4. 数据模型（Prisma）
新增模板表：
```prisma
model HtmlTemplate {
  id         String   @id @unique
  name       String   @unique // 模板名称
  type       TemplateType // A4 / A5 / CUSTOM
  content    String   @db.Text // HTML 源码
  widthMm    Int?     // 自定义时的宽(mm)
  heightMm   Int?     // 自定义时的高(mm)
  fields     Json?    // 可选：字段定义(schema)，用于生成前端表单
  remark     String?  // 备注
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

enum TemplateType {
  A4
  A5
  CUSTOM
}
```
说明：
- A4/A5 走 `format` 预设；CUSTOM 使用 `widthMm`+`heightMm`。
- `fields` JSON 结构建议：`[{ key, label, type, required, placeholder, defaultValue }]`。

## 5. 接口设计（REST）
- 基础前缀：管理端（需鉴权）`/api/admin/template`；渲染服务 `/api/htmlpdf`。

1) 模板 CRUD（管理端）
- POST `/api/admin/template/create`
- PUT `/api/admin/template/update/:id`
- DELETE `/api/admin/template/delete/:id`
- GET `/api/admin/template/detail/:id`
- POST `/api/admin/template/list`  { page, pageSize, keyword? }

2) HTML 渲染与 PDF 生成
- POST `/api/htmlpdf/render-html`
  - 入参：{ templateId, data }
  - 出参：text/html（直接返回编译后的 HTML）
- POST `/api/htmlpdf/generate`
  - 入参：{ templateId, data, options? }
  - 出参：{ url: string, fileName: string, size: number }
- 资源暴露：在 `main.ts` 新增 `app.use('/temp', express.static(path.resolve(process.cwd(), 'temp')))`

返回结构沿用 `ApiResponse` 规范（已在现有服务中使用）。

## 6. 服务端模块结构
```
server/src/router/htmlpdf/
  controller.ts   // 控制器（路由层，含 render-html / generate）
  service.ts      // 业务：模板查找、handlebars 渲染、puppeteer PDF 生成、文件落盘
  types.ts        // DTO/类型定义
```
DI：在 `config/container.config.ts` 注册 `HtmlPdfController` 与 `HtmlPdfService`。

PDF 生成要点：
- 复用单例 Browser 实例，避免频繁启动；并发控制（最大并发数，队列化）。
- `await page.setContent(html, { waitUntil: 'networkidle0' })`；
- `page.pdf({ format: 'A4' })` 或 `page.pdf({ width: '148mm', height: '210mm' })`。
- 自定义边距、页眉页脚（可在 `options` 扩展）。
- 生成路径：`server/temp/pdf/${yyyyMMdd}/${uuid}.pdf`；URL：`/temp/pdf/yyyyMMdd/xxx.pdf`。
- 定时清理：删除超过 24 小时的临时 PDF（可后续补 `node-cron`）。

## 7. 管理端页面设计
目录：`management/src/pages/TemplateManagement/`
- `index.tsx`：列表页（复用 `KTable`）
- `Editor.tsx`：新建/编辑页（MonacoEditor + 右侧预览 iframe）

交互：
- 选择类型（A4/A5/CUSTOM），CUSTOM 时显示宽高(mm)。
- Monaco 编辑 HTML，右侧点击“预览”调用 `/render-html` 返回 HTML，用 `<iframe srcDoc=` 方式展示。
- 保存走 CRUD 接口；列表支持搜索、分页、删除。

## 8. 前台页面设计（frontEnd）
目录：`frontEnd/src/views/PDFGenerator/`
- `index.tsx`：
  - 选择模板（下拉/搜索）。
  - 根据模板 `fields` JSON 动态生成表单（兜底提供 JSON 文本输入模式）。
  - 点击“生成 PDF” -> 调用 `/api/htmlpdf/generate` -> 返回 URL -> 右侧使用 `PDFPreview` 预览 + 下载。

## 9. 字体与样式
- 中文字体：优先系统字体（`SimSun`, `SimHei`, `Microsoft YaHei`）。如需定制字体，可将 `woff2/ttf` 放入 `server/static/fonts/` 并在模板 CSS 中以 `@font-face` 引入。
- 资源建议走相对路径 `/static/...`，避免外网依赖导致渲染阻塞。

## 10. 安全与合规
- 管理端操作者可信；渲染时不执行外部 JS（`<script>` 可通过模板治理限制）。
- `/render-html` 为预览用途，仅返回 HTML 串；前端以 `iframe srcDoc` 呈现，避免注入到主 DOM。
- PDF 渲染使用无头浏览器沙箱环境；必要时禁用网络请求或限定域名白名单。

## 11. 性能与并发
- 维护单例 Browser + 受控 Page 池；限制最大并发（如 3-5）。
- HTML 体积与资源数量影响大，模板内尽量内联关键 CSS。
- 请求超时与队列超时需明确（默认 30-60s）。

## 12. 风险与应对
- Chromium 下载受限：提供 `puppeteer-core` + 本地 Chrome 路径配置作为兜底；或切换 `playwright`。
- 字体缺失导致排版异常：在模板内声明 fallback 字体；必要时内置开源中文字体（体积较大）。
- 外链资源不可达：建议统一上传到 `/static`，或将图片转为 base64 内联。

## 13. 实施步骤（可回滚）
1) 数据库：新增 `HtmlTemplate` 模型与迁移（可回滚）。
2) Server：
   - 新增 `router/htmlpdf` 模块（Controller/Service/Types）。
   - 在容器注册；`/api/htmlpdf` 路由生效。
   - 在 `main.ts` 暴露 `/temp` 静态目录。
   - 安装依赖：`puppeteer`、`handlebars`、（可选）`sanitize-html`。
3) Management：
   - 新增 `api/template.ts`、`pages/TemplateManagement/`。
   - 集成 Monaco；列表/编辑/预览功能完成。
4) FrontEnd：
   - 新增 `views/PDFGenerator/`，选择模板、填写数据、生成并预览 PDF。
5) 测试：
   - 单元：Service 渲染/宽高映射；
   - 集成：端到端从创建模板到生成 PDF；
   - 性能：并发 5、10 验证响应时间。

## 14. 验收标准（DoD）
- 管理端：模板 CRUD、在线编辑与预览可用；校验规则完整。
- 前端：可根据模板字段生成 PDF，URL 可访问，`PDFPreview` 可正常展示与下载。
- 服务端：`/api/htmlpdf/generate` 支持 A4/A5/CUSTOM；错误处理与超时策略明确；临时文件可访问与清理机制可配置。

## 15. 运行与指令（示例）
- 依赖安装（示例）：
  - server：`pnpm add puppeteer handlebars sanitize-html -w server`
  - management：`pnpm add @monaco-editor/react -w management`
- 数据库迁移：
  - `cd server && pnpm run generate`（按项目约定执行 Prisma 迁移）

## 16. 未来优化
- 模板版本化与回滚。
- 参数表单的可视化配置器。
- 多语言/多币种模板切换。
- 异步任务 + 生成结果回调。

---
本方案为“单点落地 + 可逐步增强”的设计，请在实施前确认第 3 节选型与第 5 节接口是否符合预期。
