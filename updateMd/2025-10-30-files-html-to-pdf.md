# 前台 Files 模块新增「HTML 转 PDF」功能实施文档

- 日期: 2025-10-30
- 模块: frontEnd/Files，server/htmlpdf + template
- 目标: 在 `/files` 页面下新增一个 Tab，实现上传 HTML 文件或粘贴 HTML 源码，调用后端现有 PDF 服务生成 PDF 文件（写入 `temp/pdf` 并通过 `/temp` 访问），前端可预览/下载；服务端强制安全清洗。

## 一、现状与依赖

- 后端 PDF 服务位于：`server/src/router/htmlpdf/`，开放接口（均走全局前缀 `/api` 且需登录鉴权）：
  - `POST /api/htmlpdf/render-html`（预览 HTML）
  - `POST /api/htmlpdf/generate`（生成 PDF，返回 `{ url, fileName, size }`）
- 文件落盘：PDF 由服务端生成至 `temp/pdf/YYYYMMDD/xxx.pdf`，通过 `/temp` 暴露（已在服务端入口 `main.ts` 静态映射）。
- 生成 PDF 依赖 `puppeteer-core` 可执行浏览器。容器/宿主需存在 Chrome/Chromium，或设置 `PUPPETEER_EXECUTABLE_PATH`。
- 生成逻辑要求 `templateId`，因此前端需先创建临时模板，再调用生成接口，然后清理模板；所有 HTML 内容在服务端端强制经过安全清洗（不可关闭）。

## 二、改动清单

- 新增文件：`frontEnd/src/views/Files/HtmlToPdf.tsx`
  - 功能：
    - 两种输入模式：上传 `.html/.htm` 文件（前端本地读取文本，不直接上传）或粘贴 HTML 源码。
    - PDF 选项：纸张（A4/A5/CUSTOM）、自定义宽高（mm）、上下左右边距（mm）、输出文件名。
    - 生成流程：创建临时模板 -> 调用 `/htmlpdf/generate` -> 展示 `url` 并内联预览。
    - 生成后自动尝试删除临时模板（失败忽略）。
- 修改文件：`frontEnd/src/api/template.ts`
  - 新增方法：
    - `createTemplate(payload)` -> `POST /template/create`
    - `deleteTemplate(id)` -> `POST /template/delete`
  - 已有方法复用：`generatePdf(params)` -> `POST /htmlpdf/generate`
- 修改文件：`frontEnd/src/views/Files/index.tsx`
  - 在 Tabs 新增第三个 Tab：`🧾 HTML转PDF`，引入并渲染 `HtmlToPdf` 组件。

## 三、前后端接口约定

- 创建模板：`POST /api/template/create`
  - Request body:
```json
{
  "name": "temp_html2pdf_20251030_123456_abc",
  "type": "A4", // A4 | A5 | CUSTOM
  "content": "<html>...</html>",
  "widthMm": 210,
  "heightMm": 297,
  "remark": "临时模板：HTML转PDF"
}
```
  - Response: 模板记录（含 `id`）。

- 生成 PDF：`POST /api/htmlpdf/generate`
  - Request body:
```json
{
  "templateId": "<模板ID>",
  "data": {},
  "options": {
    "type": "A4", // A4 | A5 | CUSTOM
    "widthMm": 210,
    "heightMm": 297,
    "marginMm": { "top": 15, "right": 11, "bottom": 15, "left": 11 },
    "fileName": "report"
  }
}
```
  - Response:
```json
{ "url": "/temp/pdf/20251030/report.pdf", "fileName": "report.pdf", "size": 123456 }
```

- 删除模板：`POST /api/template/delete`
  - Request body: `{ "id": "<模板ID>" }`
  - Response: `true|false`

- 注意：所有接口在后端受 `AuthMiddleware` 保护，前端需带上 `Authorization`。`frontEnd/src/utils/http/index.ts` 已自动附带 `Authorization`（从 `BrowserLocalStorage.get('userInfo')`），需先登录。所有 HTML 渲染与 PDF 生成流程在服务端强制执行安全清洗（`sanitize` 固定为 `true`，不可关闭）。

## 四、使用步骤（前端）

1. 登录后访问 `/files`。
2. 切换到 Tab「🧾 HTML转PDF」。
3. 选择“上传HTML文件”或“粘贴HTML源码”。
4. 配置纸张、边距与（可选）输出文件名，点击“生成 PDF”。
5. 生成成功后在页面看到可点击链接与内联预览，可直接下载。

## 五、风险与排错

- 【浏览器依赖】`puppeteer-core` 需要系统存在 Chrome/Chromium；否则 `launch` 可能失败。解决：
  - 安装浏览器（Linux/容器：安装 `chromium`）或设置 `PUPPETEER_EXECUTABLE_PATH` 为有效路径。
- 【安全清洗】服务端默认对 HTML 进行 sanitize（`sanitize !== false`），`<script>` 等危险标签会被剔除。如需保留需传 `sanitize: false`（前端当前未开放该开关，安全起见保持默认）。
- 【模板清理】生成后尝试删除临时模板，如失败不会影响 PDF 访问，但会造成模板残留；必要时进入管理端清理。
- 【CORS/代理】建议生产同域反代 `/api`，开发环境已通过 Vite 代理 `/dev-api` 与 `/static` 到后端。
- 【大文件】HTML 文本通过 JSON 提交，Express 请求体限制默认 50MB；如需更大可调整后端 `express.json` 限制。

## 六、优化建议

- 可在前端增加“安全清洗”开关（布尔）映射到 `sanitize` 参数。
- 支持上传外链 CSS/图片的打包与内嵌，提升可移植性。
- 引入模板库与表单字段映射（结合 `fields` schema），支持参数化填充。

## 七、回滚与变更影响

- 仅新增前端组件与 API 方法，未改动后端逻辑；回滚时删除以下文件/片段：
  - `frontEnd/src/views/Files/HtmlToPdf.tsx`
  - `frontEnd/src/views/Files/index.tsx` 第三个 Tab 相关引入与配置
  - `frontEnd/src/api/template.ts` 中的 `createTemplate` 与 `deleteTemplate`

---

本功能已按“全链路评估”完成前后端对接，具备可追溯性，若需生产部署，参见 `updateMd/2025-10-30-docker-wsl2-deploy.md` 的 Nginx 透传 `/static` 与 `/api` 配置以确保可访问 PDF 文件。
