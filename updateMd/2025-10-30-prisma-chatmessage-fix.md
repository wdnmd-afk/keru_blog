# 修复 Prisma P1012: 缺失 ChatMessage 模型（2025-10-30）

## 背景
- 执行 `npx prisma generate && npx prisma migrate dev --name keru` 报错：
  - P1012: Type "ChatMessage" is neither a built-in type, nor refers to another model, composite type, or enum.
  - 报错位置：
    - `server/prisma/schema.prisma` 第 26 行 `User.chatMessages` 的类型引用
    - `server/prisma/schema.prisma` 第 273 行 `ChatRoom.messages` 的类型引用
- 根因：在 `User` 和 `ChatRoom` 中新增了对 `ChatMessage[]` 的反向关系，但未定义实际的 `ChatMessage` 模型。

## 修改点
- 在 `server/prisma/schema.prisma` 追加定义：`ChatMessage` 模型（含 roomId、userId、content、createdAt）
- 关系：
  - `ChatMessage.room -> ChatRoom`，`onDelete: Cascade`
  - `ChatMessage.user -> User`，`onDelete: Cascade`
- 索引：`@@index([roomId, createdAt])`，便于按房间+时间查询最近消息

## 受影响文件
- `server/prisma/schema.prisma`（新增模型定义）
- 关联业务（已存在）：
  - `server/src/router/chatroom/service.ts` 新增 `getMessages()`/`sendMessage()`
  - `server/src/router/chatroom/controller.ts` 新增 `GET /:roomId/messages`、`POST /:roomId/messages`
  - `frontEnd/src/api/chatroom.ts` 新增 `getMessages()`、`sendMessage()`
  - `frontEnd/src/views/Chat/ChatRoom.tsx` 进入房间加载最近 30 条、发送消息持久化

## 执行步骤
1. 生成与迁移（在 `server/` 目录）：
   - `npx prisma generate`
   - `npx prisma migrate dev --name keru`
2. 重启后端服务（若已启动）
3. 前端刷新页面，进入聊天室验证：应能加载最近 30 条消息，发送后刷新仍能看到新消息

## 验证方式
- 数据库：表 `ChatMessage` 是否创建成功；字段与索引是否符合预期
- API：
  - `GET /api/chatrooms/:roomId/messages?limit=30` 返回升序（旧->新）消息列表
  - `POST /api/chatrooms/:roomId/messages { content }` 返回写入后的消息对象
- 前端：`ChatRoom` 页面进入后自动加载 30 条；发送消息后刷新仍可见

## 潜在风险
- 迁移将修改数据库结构，若存在历史数据或生产环境需评估变更窗口
- 若 Prisma Client 未重新生成，`@prisma/client` 可能缺少模型类型，需重新执行 `generate`

## 回滚/应对
- 如需撤销最新迁移：`npx prisma migrate reset`（会清空数据，小心操作）或使用 `prisma migrate` 历史管理按需 revert
- 线上环境建议在备份后进行变更

## 后续优化建议
- 消息分页：上滑加载更多历史，增加“未读分割线”
- 推送实时化：接入 Socket.IO，使用服务器广播替代本地 BroadcastChannel
- 错误处理：发送失败的乐观更新回滚 + 友好提示
