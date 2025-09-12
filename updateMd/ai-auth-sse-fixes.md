# AI 聊天鉴权与SSE重复修复执行文档

## 背景
- 目标：修复 AI 对话记录无法入库与前端回复重复渲染问题，并提供可追溯的调试步骤。
- 影响范围：server/src/config/whitelist.ts、server/src/router/ai/controller.ts、server/src/router/ai/service.ts、frontEnd/src/views/Learning/components/AiChat.tsx。

## 现象与结论
1) 持久化失败：服务端日志 `[AI] controller.chatStream -> skip save: empty userId`，表示鉴权中间件未写入用户信息，`userId` 为空，保存被跳过。
2) 文本重复：浏览器Network中SSE原始流无重复，但前端展示重复，说明问题在前端增量累计逻辑。

## 根因
- 鉴权白名单匹配错误：`server/src/config/whitelist.ts` 中 `isWhiteListPath` 误用变量，导致所有路径被当作白名单，`AuthMiddleware` 被跳过，`httpContext.user.details` 为空。
- 前端SSE累积：在流模式下对同一消息进行多次 setState 累加，存在竞争与重复拼接风险。

## 变更清单
- server/src/config/whitelist.ts
  - 修复白名单匹配逻辑，支持 `*` 后缀的前缀匹配，仅匹配成功时返回 true；新增 `/public/*`。
- server/src/router/ai/service.ts
  - 流解析仅使用 `delta.content`，避免尾包 `message.content` 再次累积；为 `saveConversation` 增加成功/失败日志。
- server/src/router/ai/controller.ts
  - 在 `/chat` 与 `/chat/stream` 中打印 `authUser`、`saveConversation` 调用日志，便于定位 `userId` 来源与长度。
- frontEnd/src/views/Learning/components/AiChat.tsx
  - 使用 `botIdRef` 与 `bufferRef` 做单一消息缓冲，`onChunk` 仅覆盖目标消息文本，避免重复拼接；在 `onDone/onError` 复位引用。

## 操作步骤
1) 重启服务端（确保新白名单逻辑生效）。
2) 以已登录用户在前端发起 `/ai/chat/stream`：
   - 浏览器 Network → Request Headers 应有 `Authorization: Bearer <token>`。
   - 服务器日志应输出：
     - `[AI] controller.chatStream authUser: {...}`（含 id/name/email）
     - `[AI] controller.chatStream -> saveConversation call: userId=...` 随后 `[AI] saveConversation success`
3) 验证数据库：`ai_conversations` 表新增记录，`userId/message/response/createdAt` 正常。
4) 验证前端重复问题：多次长文本对话，回复不应出现“词语重复/句段重复”。
5) 历史记录：刷新页面，`AiChat` 初始化应加载最近10条问答，顺序为旧→新。

## 潜在风险
- 白名单修复后，未带 `Authorization` 的请求将被 401 拒绝；请确保前端 `BrowserLocalStorage.userInfo.token` 含 `Bearer ` 前缀。
- 如本地 Redis 未启动，`JWT` 类的 `passport` 策略路径不影响本次 AI 接口（AI 控制器仅用 `AuthMiddleware`）。

## 回滚方案
- 如需回滚，恢复上述文件至变更前版本；或仅恢复 `whitelist.ts` 的旧逻辑（不推荐）。

## 优化建议
- 为 `isWhiteListPath` 增加单元测试，覆盖通配/精确匹配场景。
- 为 AI 流接口增加速率限制与审计日志，定位异常调用来源。
- 长文本入库可考虑截断或压缩策略，避免超大字段影响性能。

