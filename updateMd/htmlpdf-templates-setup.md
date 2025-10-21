# HTML→PDF 模板系统接入与使用说明

## 概览
- **服务端**：新增 `/api/template/*`（模板 CRUD）与 `/api/htmlpdf/*`（HTML 预览/生成 PDF），在 `server/src/router/` 下实现并注册到 Inversify 容器；`/temp` 静态目录对外暴露，便于访问生成的 PDF。
- **管理端**：新增模板管理页面 `/template-management`（列表 + 编辑 + 预览），通过 `ManagementApi` 调用上述接口，菜单与面包屑已接入 Layout。
- **依赖**：`puppeteer-core`、`handlebars`、`sanitize-html`（服务端）。需确保本机有 Chrome/Edge 或设置 `PUPPETEER_EXECUTABLE_PATH`。

## 目录与关键文件
- 服务端
  - `server/prisma/schema.prisma`：追加 `HtmlTemplate` 模型与 `TemplateType` 枚举。
  - `server/src/router/template/{controller.ts,service.ts}`：模板 CRUD。
  - `server/src/router/htmlpdf/{controller.ts,service.ts,types.ts}`：HTML 渲染与 PDF 生成。
  - `server/src/config/container.config.ts`：注册控制器与服务。
  - `server/main.ts`：`app.use('/temp', express.static(path.resolve(process.cwd(), 'temp')))` 暴露临时目录。
- 管理端
  - `management/src/api/template.ts`：模板 API 封装。
  - `management/src/pages/TemplateManagement/index.tsx`：模板管理页面（列表/编辑/预览）。
  - `management/src/routes/index.tsx`：新增路由 `/template-management`。
  - `management/src/components/Layout/index.tsx`：侧边菜单与面包屑加入“模板管理”。

## 运行与联调
1. 生成 Prisma 客户端（如首次或模型有变更）：
   ```cmd
   pnpm --filter server run generate
   ```
2. 启动服务端（建议显式设置浏览器路径）：
   ```cmd
   set PUPPETEER_EXECUTABLE_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe && pnpm --filter server dev
   ```
   或 Edge：
   ```cmd
   set PUPPETEER_EXECUTABLE_PATH=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe && pnpm --filter server dev
   ```
3. 启动管理端：
   ```cmd
   pnpm --filter management_system dev
   ```
4. 浏览器访问 `http://localhost:9395/template-management`。

## 使用流程
1. 在“模板管理”中点击“新建模板”，选择 A4/A5 或 CUSTOM（自定义需填写 `widthMm`/`heightMm`）。
2. 在“模板HTML”粘贴 HTML（支持 `{{变量}}`）。建议使用内联样式或引用本地 `/static` 资源。
3. 保存后可“预览HTML”（调用 `/api/htmlpdf/render-html`）。
4. 点击“生成PDF”将调用 `/api/htmlpdf/generate`，返回 URL（例如 `/temp/pdf/yyyymmdd/xxx.pdf`）。

## 返回结构
- CRUD：`{ success, code, message, data }`，其中 `data` 为模板或分页数据。
- 渲染 HTML：直接返回 `text/html` 字符串（非 JSON）。
- 生成 PDF：`{ success, code, message, data: { url, fileName, size } }`。

## 常见问题排查
- 看不到“模板管理”菜单：
  - 确认 `management/src/components/Layout/index.tsx` 已包含菜单项与面包屑。
  - 刷新页面或重启管理端 dev。确保已登录（私有路由需登录）。
- 渲染/生成异常：
  - `puppeteer-core` 未找到浏览器：设置 `PUPPETEER_EXECUTABLE_PATH`。
  - 外链字体/资源失败：优先使用本地 `/static` 资源与中文字体回退（`Microsoft YaHei, SimSun`）。
- Prisma 报错：
  - 重新 `pnpm --filter server run generate`，检查数据库连接与迁移状态。

## 风险与优化
- 浏览器依赖：网络或权限导致无法启动 → 显式设置可执行路径；必要时切换 `puppeteer` 并配置下载镜像。
- 模板安全：默认进行 `sanitize-html` 清洗；如需脚本或更复杂内容，请评估安全风险后放开白名单。
- 临时文件清理：后续增加定时任务清理 `server/temp` 过期文件。

## 变更记录
- 2025-10-21：首次接入 HTML→PDF 模块与模板管理界面，完成端到端联调基础。
