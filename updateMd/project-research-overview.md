# 项目研究总览（RESEARCH 阶段，仅观察）

> 说明：本报告仅记录客观“观察与事实”，不包含任何方案建议或改动计划，供后续 INNOVATE/PLAN/EXECUTE/REVIEW 阶段参考与追溯。

## 一、项目概览

- **Monorepo**：`pnpm` 工作区，目录包含 `frontEnd/`、`management/`、`server/`、`shared/`、`tools/`。
- **根配置与脚本**：
  - `package.json`：提供全局 dev/build/ts-check/format 脚本与并行执行配置。
  - `pnpm-workspace.yaml`：声明工作区包路径。
  - `tsconfig.json`：路径映射到 `shared/src` 多目录。
  - `README.md`：简要描述。
- **文档**：`updateMd/` 大量变更与排障文档，覆盖 API 统一、RBAC、流式接口、上传、i18n、webrtc、monorepo 重构等主题。

## 二、目录结构（关键）

- `frontEnd/`：博客前台（React18 + Vite + UnoCSS + antd）。
- `management/`：后台管理系统（React18 + Vite + UnoCSS + antd）。
- `server/`：Node.js + Express + Inversify + Prisma（MySQL）+ Redis + JWT，提供 REST API、WebSocket/WebRTC。
- `shared/`：共享 `components/`、`utils/`、`types/`、`styles/`，并有 `dist/` 成品输出和 `vite.config.ts`。
- `tools/`、`scripts/`：类型检查与格式化脚本等工具。

## 三、技术栈与运行脚本（根）

- `package.json`（根）定义：
  - 开发：`dev:server`、`dev:frontend`、`dev:management`、`dev`（排除 server）与 `dev:all`（并行）。
  - 构建：`build:*`、`build:all`；类型检查与格式化脚本对齐 Monorepo。
  - 依赖：在根同时存在 `react`、`antd`、`axios` 等，与子项目版本存在差异（见“潜在不一致”）。

## 四、前台应用 frontEnd/

- 端口与代理：
  - `vite.config.ts`：端口 `9394`；`server.proxy` 由 `src/build/proxy.ts` 动态生成。
  - `src/build/proxy.ts`：
    - 开发代理：`/dev-api` → 目标 `http://127.0.0.1:5566`，并在 rewrite 中统一替换为服务端全局前缀 `/api`。
    - 同时代理 `/static` 静态资源。
- 环境变量：
  - `.env.development`：`VITE_API_URL=/dev-api`、`VITE_API_BASE_URL=http://localhost:5566`、PDF worker 路径与上传大小等。
  - `.env.production`：存在；`VITE_API_BASE_URL` 留空待部署配置。
- 入口：`src/main.tsx` 初始化 i18n、UnoCSS、注册 SVG 图标等。
- HTTP 封装：`src/utils/http/index.ts`：
  - Axios 实例，拦截器统一注入 `Authorization`（取自 `BrowserLocalStorage.userInfo.token`）与 `x-access-token`。
  - 封装常规 `get/post/put/delete/postFile/download`。
  - 额外提供 `stream(url, params, handlers)`：内部使用原生 `fetch` 实现 ReadableStream/SSE 解析，保持认证与错误处理一致化。

## 五、管理端应用 management/

- 端口与代理：
  - `vite.config.ts`：端口 `9395`；`/management-api` → 目标 `http://127.0.0.1:5566`，rewrite 为 `/api`，与服务端全局前缀对齐。
- 环境变量：
  - `.env.development`：`VITE_MANAGEMENT_API_URL=/management-api`。
  - `.env.production`：未找到（读取报 ENOENT），可能尚未提交或不需要（观察）。
- 入口：`src/main.tsx` 加载 UnoCSS、挂载 `App`。
- HTTP 封装：`src/utils/http/index.ts`：
  - Axios 实例，`baseURL` 默认 `/management-api`，统一注入认证头与错误处理。
  - 暂未提供 `stream()`（观察到仅常规请求）。

## 六、共享库 shared/

- 结构：`src/components`、`src/utils`、`src/types`、`src/styles`，`dist/` 构建产物存在。
- 引用：
  - 根 `tsconfig.json` 通过 `paths` 与别名对齐。
  - `frontEnd` 与 `management` 的 `vite.config.ts` 中均配置了 `shared/*` 别名，支持跨项目组件/工具共享。

## 七、服务端 server/

- 入口：`main.ts`
  - 根路径前缀：`new InversifyExpressServer(container, null, { rootPath: '/api' })`。
  - 中间件：`requestIdMiddleware`、调试日志中间件、`express.json/urlencoded`、`cors`、`JWT().init()`、`AuthenticationErrorHandler`、`errorHandlingMiddleware`、`responseHandler`、`/static` 静态资源。
  - 依赖注入：`createContainer()`；初始化权限中间件 `initPermissionMiddleware(prismaClient)`。
  - WebSocket：`createWebSocketServer()`（Socket.IO + WebRTC Gateway），配置由 `createWebSocketConfig()` 提供。
  - 优雅关闭：关闭 WS、HTTP、Prisma、Redis。
- 配置：`src/config/app.config.ts`
  - `dotenv.config()`；`createAppConfig()` 提供 server/jwt/redis/database/upload/cors/rateLimit。
  - `validateConfig()`：
    - 必需 `DATABASE_URL`；
    - 校验 `config.database.url` 必须匹配 `^mysql://.+`（MySQL）。
  - `printConfigSummary()`：输出敏感信息脱敏摘要。
- 依赖注入：`src/config/container.config.ts`
  - 绑定 Controllers/Services/基础设施（`PrismaClient/Redis/PrismaDB/JWT`）。
  - `PrismaClient` 单例 + 工厂；`Redis` 使用 ioredis 并 lazyConnect、日志与错误回调。
- 中间件：`src/middleware/`
  - `error.ts`：`requestIdMiddleware`、`errorHandlingMiddleware()`、`responseHandler()`；认证失败处理与统一 API 响应。
  - `permission.ts`：`initPermissionMiddleware(prisma)`、`requirePermission/requireAnyPermission/requireAllPermissions`，并有权限缓存 `PermissionCache`（5 分钟）。
  - `whitelist.ts`：白名单路径匹配（精确/段匹配/通配符），标准化去除 `/api` 前缀后匹配。
  - `logger.ts`：log4js 控制台与文件双输出。
  - `validation.ts`：class-validator 通用校验、中间件工具（文件上传白名单、IP 限流等）。
- 鉴权：`src/jwt/index.ts`
  - `passport-jwt` 策略；`Authorization: Bearer <token>`；token 保存在 Redis `token:<uid>`，独立过期时间（默认 1 天）。
- 路由：`src/router/`
  - 控制器聚合导出：`router/controller.ts`；服务聚合导出：`router/service.ts`。
  - 模块：`user/`、`base/`、`file/`、`todo/`、`feedback/`、`rbac/`、`ai/`、`webrtc/`。
- 数据库：`prisma/schema.prisma`
  - `provider = "mysql"`；`datasource db { url = env("DATABASE_URL") }`。
  - 业务模型：`User/UserDetail/File/Todo/Feedback/AiConversation`；
  - RBAC：`Permission/Role/UserRole/RolePermission` + 枚举 `PermissionType/RoleStatus`。
- 静态与上传：`config/upload.ts`（1GB 上限，1MB 分片；危险扩展名黑名单）与 `/static` 托管目录。

## 八、前后端接口映射（观察）

- 服务端全局前缀：`/api`（`main.ts`）。
- 前台代理：`/dev-api` → rewrite `/api` → 对应服务端（示例：`/dev-api/user/index` → `/api/user/index`）。
- 管理端代理：`/management-api` → rewrite `/api` → 对应服务端（示例：`/management-api/rbac/...` → `/api/rbac/...`）。
- HTTP 认证：两端封装均自动注入 `Authorization` 与 `x-access-token`，认证失败（401）有统一 UI 处理。
- 流式接口：前台 `Http.stream()` 采用原生 `fetch` + SSE 解析，保持与 Axios 风格一致的错误处理与认证。

## 九、`updateMd/` 文档主题（抽样）

- API 请求统一与代理：`management-api-unification-analysis.md`、`stream-api-unification.md`。
- RBAC 实施：`keru-blog-rbac-implementation.md`（数据库/接口/前端权限控制与初始化脚本）。
- 服务端优化与修复：`server-optimization-record.md`、`project-startup-error-fix-report.md`。
- 架构重构：`monorepo-refactoring-plan.md`。
- 文件上传、PDF、i18n、webrtc 等专题均有专项记录与排障总结。

## 十、潜在不一致与风险（仅观察，不含处置）

- **数据库 URL 与 Provider 不一致**：
  - `prisma/schema.prisma` 使用 `provider = "mysql"`；
  - `server/.env.example` 中 `DATABASE_URL` 示例为 `postgresql://...`；
  - `app.config.ts/validateConfig()` 强校验 `^mysql://`；
  - 结论：示例 ENV 与代码校验存在冲突（需确认实际部署使用的 .env）。
- **端口与 CORS**：
  - `app.config.ts` 默认允许 `http://localhost:3000`、`http://localhost:9394`（及 127.0.0.1:9394）；
  - 管理端开发端口为 `9395`，不在默认 CORS 白名单内（若未通过 `CORS_ORIGIN` 环境变量覆盖，可能导致跨域问题）。
- **环境变量样例与默认端口**：
  - `.env.example` 指定 `PORT=3001`；`app.config.ts` 默认 `5566`；需以实际 .env 为准。
- **依赖版本差异**：
  - 根 `package.json` 与子项目 `frontEnd/management` 在 `react/antd/vite/typescript` 等存在版本差异（例如根 `react@18.2.0` vs 子项目 `18.3.1`）。
- **管理端生产环境变量缺失**：
  - 读取 `management/.env.production` 报 ENOENT，可能未提交或通过构建参数注入（需确认流程）。

## 十一、运行与脚本（仅事实）

- Root：
  - 开发：`pnpm dev:server`（server），`pnpm dev:frontend`（frontEnd），`pnpm dev:management`（management），`pnpm dev`（排除 server），`pnpm dev:all`（并行）。
  - 构建：`pnpm build:*` 与 `pnpm build:all`。
  - 类型检查：`node tools/typescript/check-*.js`；格式化：`tools/format/*`。
- Server：
  - `dev`：`nodemon --exec tsx main.ts`；
  - `generate`：Prisma generate + migrate；
  - 其余格式化/ts-check 脚本。
- Web：
  - `frontEnd`：`vite --host`（9394）；
  - `management`：`vite --host --port 9395`。

## 十二、未决问题（需确认项，非建议）

- 实际部署使用的 `DATABASE_URL` 是否为 MySQL 连接串（以满足校验）？
- 管理端开发/部署是否已通过 `CORS_ORIGIN` 覆盖 9395 端口？
- `management/.env.production` 是否存在于私有环境变量或 CI/CD 注入？
- 前后端关于 RBAC 的接口路径、返回结构与前端类型定义是否已 100% 对齐？（观察到统一封装已存在）
- WebRTC 鉴权是否需要与 JWT 进一步集成（目前示例中“简化处理”）？

## 十三、已阅文件（部分清单）

- 根：`package.json`、`pnpm-workspace.yaml`、`tsconfig.json`、`README.md`、`updateMd/*`（抽样）。
- frontEnd：`vite.config.ts`、`src/build/proxy.ts`、`src/main.tsx`、`src/utils/http/index.ts`、`.env.development`、`.env.production`。
- management：`vite.config.ts`、`src/main.tsx`、`src/utils/http/index.ts`、`.env.development`（`.env.production` 未找到）。
- server：`main.ts`、`src/config/*.ts`、`src/middleware/*.ts`、`src/jwt/index.ts`、`src/router/*`（聚合与 webrtc/websocket.ts）、`prisma/schema.prisma`、`.env.example`。

---

以上为 RESEARCH 阶段研究结果，仅做“事实陈列”。如需进入 INNOVATE/PLAN/EXECUTE 阶段，请基于本报告指定目标与范围。
