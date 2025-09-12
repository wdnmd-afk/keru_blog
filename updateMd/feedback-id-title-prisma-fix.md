# 反馈提交后端插入错误修复与 Title 字段补充（Prisma）

## 背景
- 错误：`server/src/router/feedback/public.controller.ts:31` 在 `feedback.create()` 时缺少必需参数 `id`，导致插入失败。
- 需求：补充前端原有字段 `title` 的持久化存储，与数据库模型保持一致。

## 变更摘要（全链路）
1. 服务器端
   - 在 `public.controller.ts` 的 `submit` 方法中：
     - 生成并填充 `id`（使用 `generateUniqueBigIntId(true)` 生成字符串ID）。
     - 接收并写入 `title` 字段。
     - 为避免 Prisma Client 类型未及时生成导致的编译报错，对 `data` 做 `as any` 兼容（待迁移后可移除）。
2. Prisma Schema
   - 在 `server/prisma/schema.prisma` 的 `Feedback` 模型中新增 `title String?` 字段。
3. 前端
   - `frontEnd/src/api/feedback.ts` 的 `SubmitFeedbackPayload` 新增 `title?: string`。
   - `frontEnd/src/store/global/index.ts` 的 `submitFeedback` 调用中补充 `title: feedback.title`，同时保留把 `title` 合并入 `content` 的兼容策略，保证管理端现有列表仍可读。

## 受影响文件
- server
  - `src/router/feedback/public.controller.ts`
  - `prisma/schema.prisma`
- frontEnd
  - `src/api/feedback.ts`
  - `src/store/global/index.ts`

## 操作步骤（Windows 环境）
1. 数据库迁移与类型生成（在 `server` 目录执行）
   - 方式A（推荐，已在 `server/package.json` 提供）：
     - 打开命令行到 `E:/github/keru_blog/server`
     - 执行：`npm run generate`
       - 该脚本等效于：`npx prisma generate && npx prisma migrate dev --name keru`
   - 方式B（手动）
     - 先执行：`npx prisma generate`
     - 再执行：`npx prisma migrate dev --name add_feedback_title`
   - 注意：若使用图形化客户端或远程数据库，请确认连接串 `DATABASE_URL` 正确无误。
2. 本地启动 / 重启服务，确保 Prisma Client 类型已更新。

## 验证步骤
- 前台：打开任意页面 → 右下角“反馈” → 填写“类型/标题/详细描述/邮箱” → 提交
  - Network 中应看到：POST `/dev-api/public/feedback/submit`（代理至 `/api/public/feedback/submit`）
  - 返回成功，前端有成功提示。
- 后端：数据库 `Feedback` 表新增记录
  - 字段应包含：`id`（非空字符串）、`title`（为本次新增，可能非空）、`content`（前缀含标题）、`userEmail`、`category`、`status=PENDING`、时间戳。
- 管理端：刷新“意见反馈管理”列表，可看到新记录（标题目前主要体现在 `content` 前缀中，后续如需单独列展示可扩展管理端列表列）。

## 风险与回滚
- 风险：
  - 如未执行 Prisma 迁移，`title` 字段在服务器端写入时可能触发类型/结构不一致。
  - 已通过 `as any` 暂时规避编译期的 Prisma 类型不一致，但运行期仍需要数据库实际存在该列。
- 回滚：
  - 如需回退，可撤销 schema 中的 `title` 字段，并在 `public.controller.ts` 移除 `title` 写入逻辑；前端 `SubmitFeedbackPayload` 的 `title` 可保留（后端忽略即可）。

## 后续优化建议（可选）
- 管理端列表单独新增“标题”列，便于筛选/排序。
- 若希望 ID 统一风格，可切换为 `uuid`（项目已依赖 `uuid`），目前为与既有 `generateUniqueBigIntId` 一致性保留大整数字符串方案。

