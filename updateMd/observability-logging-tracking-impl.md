# 埋点监控与系统日志统一方案（实施文档）

> 目标：前台行为监测、接口错误监控；服务端重要错误摘要入库；管理端统一查询（文件日志 + 数据库日志）。

## 一、改造范围与目标
- 前台 `frontEnd/`：
  - 页面浏览埋点（路由切换）
  - 全局 JS 错误与 Promise 未处理拒绝埋点
  - HTTP 接口错误埋点（拦截器）
  - 通过匿名公开端点上报到后端
- 服务端 `server/`：
  - Prisma 新增 `SystemLog` 表，结构化存储日志
  - 新增公开埋点路由 `/api/public/monitor/logs`
  - 现有监控模块新增 `db-logs` 查询
  - 错误处理中间件将严重错误摘要写入 `SystemLog`
  - 保留现有文件日志（app/access/error/management/frontend）
- 管理端 `management/`：
  - 监控页新增“数据库日志（SystemLog）”筛选与分页查询
  - 保留原“文件日志”查看

## 二、变更清单（含路径）
- 数据模型
  - `server/prisma/schema.prisma`
    - 新增模型 `SystemLog`（映射表名 `system_logs`）
- 服务端 API 与中间件
  - `server/src/router/monitor/public.controller.ts` 新增公开上报控制器
  - `server/src/router/monitor/service.ts` 注入 Prisma，新增 `writeDbLog`、`dbLogs`，`writeClientLog` 同步入库
  - `server/src/router/monitor/controller.ts` 新增 `GET /monitor/db-logs`，`POST /monitor/logs` 支持 type
  - `server/src/config/whitelist.ts` 新增 `/public/monitor/*` 白名单
  - `server/src/config/container.instance.ts` 新增全局容器存取
  - `server/main.ts` 初始化时 `setGlobalContainer(container)`
  - `server/src/middleware/error.ts` 统一错误处理中，严重错误摘要入库（source=server,type=server_error）
  - `server/src/config/container.config.ts` 注册 `PublicMonitorController`（通过聚合导入）
  - `server/src/router/controller.ts` 聚合导出 `PublicMonitorController`
- 前台接入
  - `frontEnd/src/utils/monitor.ts` 新增埋点工具（fetch 上报，避免 axios 递归）
  - `frontEnd/src/main.tsx` 启动绑定 `bindGlobalMonitors()`
  - `frontEnd/src/routes/index.tsx` 注入 `RouteTracker` 上报页面浏览
  - `frontEnd/src/utils/http/index.ts` 在响应错误拦截器调用 `reportApiError`
- 管理端
  - `management/src/api/monitor.ts` 新增 `dbLogs()` 方法
  - `management/src/views/SystemMonitor/LogManagement.tsx` 新增“数据库日志（SystemLog）”区块（来源/类型/级别/关键字/时间范围筛选 + 分页）

## 三、数据结构设计（Prisma）
```prisma
model SystemLog {
  id        String   @id @unique @default(cuid())
  source    String    // 日志来源：frontend/management/server
  type      String    // 行为/类型：page_view/api_error/js_error/unhandled_rejection/server_error 等
  level     String    // 级别：info/warn/error
  message   String    @db.Text // 中文说明/解释
  context   Json?
  route     String?
  userId    String?
  ip        String?
  userAgent String?
  createdAt DateTime  @default(now())

  @@index([source, type, level, createdAt])
  @@map("system_logs")
}
```

## 四、接口设计
- 公开上报
  - `POST /api/public/monitor/logs`
    - body: `{ source?: 'frontend'|'management', type?: string, level?: 'info'|'warn'|'error', message: string, context?: any }`
    - 说明：匿名上报，写入 `logs/<source>/YYYYMMDD.log` 与 `system_logs`
- 管理端（需鉴权）
  - `POST /api/monitor/logs`（原有，现支持 `type`）
  - `GET /api/monitor/db-logs`
    - query: `source,type,level,keyword,start,end,page,pageSize`
    - 返回：`{ total, items, page, pageSize }`

## 五、前端接入点
- 页面浏览：`frontEnd/src/routes/index.tsx` 内 `RouteTracker` 监听 `useLocation()`
- 全局错误：`frontEnd/src/main.tsx` 调用 `bindGlobalMonitors()`
- 接口错误：`frontEnd/src/utils/http/index.ts` 响应错误拦截器调用 `reportApiError`
- 上报工具：`frontEnd/src/utils/monitor.ts` 使用 `fetch` 调 `base/public/monitor/logs`

## 六、管理端页面改造
- `LogManagement.tsx` 新增“数据库日志（SystemLog）”卡片
  - 筛选：来源/类型/级别/关键字/时间范围
  - 分页：上一页/下一页 + 统计信息
  - 展示：时间、source、type、level、route、message、context（美化 JSON）

## 七、环境与部署
- 需要执行 Prisma 迁移以创建 `system_logs` 表：
  - 进入 `server/` 目录执行：`pnpm run generate`
  - 脚本等价：`npx prisma generate && npx prisma migrate dev --name keru`
- 重启服务端进程，使控制器与中间件生效

## 八、验证步骤（建议顺序）
1) 迁移数据库、重启服务端
2) 前台打开任意页面 -> 查看管理端“数据库日志”是否出现 `page_view`
3) 人为触发接口 4xx/5xx 或断网 -> 管理端“数据库日志”应出现 `api_error`
4) 手动抛出 JS 错误（控制台执行 `throw new Error('test')`）-> 出现 `js_error`
5) 服务端制造业务异常 -> “数据库日志”应出现 `server_error`（错误处理中间件入库）
6) “文件日志”页签仍可读取（app/access/error/management/frontend）

## 九、潜在风险与缓解
- 日志量增长：增加索引字段，分页默认 20；后续可引入归档/TTL
- 递归上报风险：上报使用 fetch，不走 axios 拦截器；错误拦截器仅在业务错误时上报
- 隐私与合规：`context` 中避免收集敏感个人信息；如需则做脱敏
- 性能影响：上报为异步，失败忽略；服务端入库与写文件较轻量

## 十、优化建议（后续）
- 增加采样与限流（例如同一路由相同错误 5 分钟内只记 1 次）
- 引入搜索/排序 UI 与导出 CSV
- 引入告警阈值（高错误率通知）
- 增加 TraceID 贯穿前后端（利用现有 `requestId`）

## 十一、回滚方案
- 前端：移除 `monitor.ts`、`RouteTracker` 与拦截器调用；
- 服务端：删除 `PublicMonitorController` 注册与白名单、还原 `monitor/service.ts` 与错误中间件改动；
- 数据库：仅不再写入 `system_logs`，表可保留；如需清理可手动删除表（慎重）。

## 十二、目录与责任
- 负责人：平台研发
- 生效范围：全站前台、服务端、管理端监控页
- 最后更新时间：以 Git 提交为准
