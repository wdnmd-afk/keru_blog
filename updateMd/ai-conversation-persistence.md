# AI 对话记录持久化与反馈用户信息修复（全链路执行文档）

创建时间：2025-09-12
执行人：AI（Augment Agent）

## 目标
1. 为 AI Chat 实现对话记录持久化（最近 10 条，按时间倒序）。
2. 修复反馈提交接口无法正确获取用户信息的问题（从 JWT 中提取并写入）。
3. 时间字段统一格式化为中国时区 `YYYY-MM-DD HH:mm:ss`（本次在 AI 对话历史接口侧完成）。
4. 所有新增/变更接口均使用 POST。

## 变更范围
- 数据库（Prisma Schema）：`server/prisma/schema.prisma`
- 服务端（AI）：
  - 控制器：`server/src/router/ai/controller.ts`
  - 服务：`server/src/router/ai/service.ts`
- 服务端（反馈公共提交）：`server/src/router/feedback/public.controller.ts`
- 前端 API：`frontEnd/src/api/aiApi.ts`
- 前端组件：`frontEnd/src/views/Learning/components/AiChat.tsx`

## 实施步骤
1. 数据库 Schema 新增表
   - 新增模型 `AiConversation` 并映射到表名 `ai_conversations`：
     - 字段：`id`(PK)、`userId`、`message`(Text)、`response`(Text)、`createdAt`(默认 now)
     - 索引：`@@index([userId, createdAt])`
   - 文件：`server/prisma/schema.prisma`
   - 迁移与生成（Windows 建议在 IDE 或脚本中执行）：
     - prisma migrate dev
     - prisma generate

2. 服务端 AI 模块
   - `AIService` 注入 PrismaDB，新增方法：
     - `saveConversation(userId, message, response)`：保存对话
     - `getRecentConversations(userId, limit=10)`：获取最近对话
   - `AIController`：
     - `/api/ai/chat`：完成 AI 回复后持久化（从 `req.user` 或 `httpContext.user.details` 提取 `userId`）
     - `/api/ai/chat/stream`：流式累计完整回复，流结束后持久化
     - `/api/ai/conversations/recent`（POST）：返回当前用户最近 10 条记录，并在响应中格式化 `createdAt` 为中国时区字符串

3. 服务端反馈公共提交增强
   - `PublicFeedbackController.submit`：
     - 如果请求带有 JWT，则自动补全 `userName` 与 `userEmail`（优先级：入参 > JWT > null），保持原有匿名提交能力不变

4. 前端集成
   - `frontEnd/src/api/aiApi.ts`：新增 `fetchRecentConversations()`（POST `/ai/conversations/recent`）
   - `AiChat.tsx`：组件挂载时调用历史接口，将结果转换为 `MsgItem[]`（按时间正序展示：先用户消息再 AI 回复），不影响现有流式收发

## 校验步骤（建议）
1. 数据表检查
   - 确认数据库中存在 `ai_conversations` 表且字段/索引正确。
2. 接口联调
   - 登录后访问 AI Chat 页面：
     - 首次加载应看到最近 10 条历史对话（若存在）。
     - 发送新问题：AI 回复结束后，刷新页面应能在历史中看到该条问答。
   - 流式模式：确保 SSE 正常输出并在结束后入库。
3. 反馈提交
   - 登录状态提交反馈：在 DB 中检查 `userName`、`userEmail` 是否按 JWT 自动补全。
   - 未登录提交：保持可提交，且不强制用户信息。

## 风险与回滚
- 风险
  - Prisma 模型变更需要执行迁移；若未迁移，服务端调用会失败。
  - AI 历史接口时间格式化为字符串，若未来其他消费者期望 `Date` 类型需注意兼容。
- 回滚
  - 撤销以下文件改动并回滚数据库迁移：
    - `server/prisma/schema.prisma`
    - `server/src/router/ai/controller.ts`
    - `server/src/router/ai/service.ts`
    - `server/src/router/feedback/public.controller.ts`
    - `frontEnd/src/api/aiApi.ts`
    - `frontEnd/src/views/Learning/components/AiChat.tsx`

## 最佳实践与优化建议
- 可为 AI 历史接口增加分页与筛选参数（limit、beforeId）。
- 可在前端为历史消息显示时间戳（已按中国时区格式返回）。
- 可增加“固定展开”与“清空本地消息但保留云端”的用户偏好项。
- 反馈系统如需严格绑定用户，可新增受保护的提交接口（与公共提交并存）。

## 执行记录
- 已完成以上代码改造。请按团队流程在本地执行 Prisma 迁移与生成，并进行一轮端到端联调验证。

