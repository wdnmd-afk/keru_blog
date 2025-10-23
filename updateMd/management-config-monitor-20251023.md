# 管理端配置与系统监控落地方案（2025-10-23）

本文档记录本次“管理端配置 + 系统监控”完整落地过程，包含接口契约、联调步骤、风险与回退说明，用于保证过程可追溯、结果可复现。

## 1. 背景与目标
- 通过管理端可视化界面，支持对前端与服务端配置进行读取与保存，并且让配置“真实生效”。
- 提供系统监控能力：健康检查、指标采集、日志分类查看、客户端日志上报（埋点能力）。
- 全链路一致性：接口契约统一，前后端协同，提供回归用例与回退策略。

## 2. 涉及范围
- 代码目录
  - 服务端：`server/src/router/config/*`、`server/src/router/monitor/*`、`server/src/config/container.config.ts`
  - 管理端：`management/src/api/*`、`management/src/views/*`、`management/src/App.tsx`、`management/src/routes/index.tsx`
  - 文档：`updateMd/management-config-monitor-20251023.md`

## 3. 接口契约
### 3.1 配置接口（受 `AuthMiddleware` 保护，前缀 `/api/config`）
- `GET /config/frontend`
  - Response: `{ theme: { mode: 'light'|'dark', primaryColor?: string }, features: {...}, api: {...} }`
- `POST /config/frontend`
  - Body: `Partial<FrontendConfig>`，部分字段可更新
- `GET /config/server`
  - Response: `{ jwt?: { expiresIn?: string }, redis?: {...}, database?: {...}, requiresRestart: true }`
- `POST /config/server`
  - Body: `Partial<ServerSideConfig>`，部分字段可更新

持久化：`process.cwd()/data/management-config.json`，缺省项与默认值合并。

### 3.2 监控接口（受 `AuthMiddleware` 保护，前缀 `/api/monitor`）
- `GET /monitor/health` → `{ status: 'ok', uptime: number, timestamp: number }`
- `GET /monitor/metrics` → `{ system: {...}, process: {...} }`
- `GET /monitor/log-types` → `['app','access','error','management','frontend']`
- `GET /monitor/logs?offset=0&limit=200` → 兼容保留，等价读取 `app` 类型
- `GET /monitor/logs-by-type?category&offset&limit` → `{ total, lines: string[] }`
  - `category` in `app/access/error/management/frontend`
- `POST /monitor/logs` → 客户端日志上报
  - Body: `{ source?: 'management'|'frontend', level?: string, message: string, context?: any }`
  - 落盘：`logs/<source>/<YYYYMMDD>.log`（白名单路由，默认 `management`）

## 4. 前端实现要点
### 4.1 主题与 API 配置即时生效
- 在 `management/src/App.tsx`：
  - 启动时 `ConfigApi.getFrontendConfig()` 读取 `theme.mode/primaryColor`、`api.managementApiBaseUrl`。
  - 使用 `ConfigProvider` 设置 `algorithm`（明/暗）与 `token.colorPrimary`。
  - 动态更新 `ManagementApi.service.defaults.baseURL` 以使 API 基础路径运行时可切换（开发代理仍受 Vite 配置影响）。
  - 监听自定义事件 `management:frontend-config-updated`，在保存后即时应用变更。
- 在配置保存页（`ThemeConfig.tsx`、`ApiConfig.tsx`、`FeatureConfig.tsx`）保存成功后广播事件。

### 4.2 服务端配置
- 三页表单：`DatabaseConfig.tsx`、`RedisConfig.tsx`、`JwtConfig.tsx`
- 通过 `ConfigApi.getServerConfig/saveServerConfig` 读写
- UI 提示：部分配置需重启服务生效

### 4.3 系统监控页面
- `SystemMonitor/index.tsx`：健康状态、一次性指标快照、入口按钮。若 `features.enableSystemMonitor=false`，给出警告。
- `SystemMonitor/PerformanceMonitor.tsx`：每 5 秒轮询 `metrics`，展示 CPU、内存使用率、loadavg、进程内存等。
- `SystemMonitor/LogManagement.tsx`：分类 Tabs、从文件尾部向前分页加载、搜索过滤、客户端日志上报按钮（写入 `management` 类别）。

## 5. 联调步骤
1. 启动服务端与管理端（确保 `/management-api` 代理到 `/api`）。
2. 登录管理端，进入“前端配置/主题设置”，切换颜色与明暗模式，保存后应立即生效（无需刷新）。
3. “API 配置”修改管理端前缀后，新的请求应使用新前缀（浏览器网络面板可见）。
4. “服务端配置”修改后保存，注意提示“需重启生效”的项。
5. “系统监控/日志管理”：
   - 切换到 `management` Tab，点击“发送测试日志”，应在列表中看到新日志（如未见可点刷新）。
   - 切换类别测试 `app/access/error/frontend`（如文件不存在返回空）。
6. “系统监控/性能监控”：观察 5 秒一次的指标刷新。
7. “系统监控”首页卡片展示健康与摘要，按钮可进入子页。

## 6. 风险与回退
- 运行时切换 API 前缀只影响 axios 的 baseURL，不会修改 Vite 代理；如跨域/代理不一致需调整 `vite.config.ts`。
- 服务端配置修改后重启风险：
  - DB/Redis 连接：建议在重启前验证字符串正确性（后续可加连通性测试接口）。
  - JWT 过期时间变更：旧 Token 仍按签发策略有效，建议在重大变更时主动让用户重新登录。
- 日志文件大小：日志按天分文件（management、frontend），可进一步引入滚动策略与清理任务。
- 安全：`/monitor/*` 与 `/config/*` 已挂 `AuthMiddleware`；上报接口限制 source 白名单。

## 7. 回归用例
- 主题立即生效（颜色/明暗）
- API 前缀运行时切换（新请求生效）
- 服务端配置表单读写
- 系统健康/指标可用
- 日志分类查看与上报

## 8. 后续优化
- 主题更多可配置项（圆角、字体、密度等）
- API 配置增加“一键校验连通性”
- 日志检索支持后端分页/关键词/时间范围
- 性能监控加入图表化趋势（可选 ECharts）

---
文档维护者：AI 助手（Cascade）
更新时间：2025-10-23
