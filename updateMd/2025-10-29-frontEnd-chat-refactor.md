# frontEnd Chat 模块重构与菜单调整执行文档

- 日期：2025-10-29
- 影响范围：`apps/frontEnd`
- 目标：
  - 抽离原 `Learning` 中的 AI Chat 为独立模块。
  - 新建 `Chat/` 目录与菜单入口，提供“AI 聊天 / 输入房间号进入聊天室”的入口页。
  - 删除 WebRTC 相关的顶部菜单（保留路由以便回退/测试）。
  - 封装通用聊天室组件，支持聊天室/后续私聊/AI 共用。
  - 保持原有 AI 流式渲染能力。

## 变更清单
- 新增目录与文件
  - `frontEnd/src/views/Chat/index.tsx`：聊天入口页（选择 AI 或房间号）。
  - `frontEnd/src/views/Chat/ChatRoom.tsx`：聊天室页面（BroadcastChannel 本地同步，预留 Socket.IO 接入）。
  - `frontEnd/src/views/Chat/components/ChatBox.tsx`：通用聊天 UI 组件（消息列表+输入框）。
- 文件迁移
  - `frontEnd/src/views/Learning/components/AiChat.tsx` → `frontEnd/src/views/Chat/AiChat.tsx`
  - `frontEnd/src/views/Learning/components/AiChat.module.scss` → `frontEnd/src/views/Chat/AiChat.module.scss`
- 路由调整（`frontEnd/src/routes/index.tsx`）
  - 新增：`/chat`（入口页）、`/chat/ai`（AI Chat）、`/chat/room/:roomId`（聊天室）。
  - 保留：`/webrtc` 路由（不在菜单展示，便于回退/联调；后续可按需移除）。
- 菜单调整（`frontEnd/src/views/systemPages/Layout.tsx`）
  - 新增：`Chat` 菜单项（指向 `/chat`）。
  - 移除：`WebRTC` 菜单项。
- i18n 文案（`src/i18n/locales/zh/layout.json`、`en/layout.json`）
  - 新增 `header.navigation.chat`（中/英）。
- 学习页清理（`frontEnd/src/views/Learning/index.tsx`）
  - 移除内嵌的 AI Chat Tab 与导入。

## 设计与实现说明
- 聊天室同步：
  - 默认使用 `BroadcastChannel` 实现同源多标签页低延迟同步；
  - 自动回退到 `localStorage` 的 storage 事件广播；
  - 预留 Socket.IO 接入点（按钮/状态占位注释），与后端 `server/src/router/webrtc/*` 不冲突，可单独命名空间实现文本聊天。
- 通用 ChatBox：
  - 仅负责 UI（消息列表/输入框/发送），外部负责状态与同步；
  - 可被聊天室、私聊、AI 对话等共用。
- AI Chat：
  - 保留原有 `SSE` 流式能力与图片粘贴/上传等体验，仅路径迁移。

## 验证步骤
1. 顶部菜单：
   - 菜单包含 Home/Learning/Files/Chat/Technology；不再显示 WebRTC。
   - 切换 Chat 菜单进入 `/chat`。
2. AI 聊天：
   - `/chat/ai` 能正常发起对话，SSE 流式渲染正常，图片功能可用。
3. 聊天室：
   - `/chat/room/test`，在两个标签页输入消息，能互相看到（BroadcastChannel）。
   - 关闭一个标签页不影响另一个继续发送。
4. 学习页：
   - `/learning` 不再包含 AI Chat 的标签页，其他功能正常。

## 回滚方案
- 将 `AiChat.tsx` 与样式文件移回 `Learning/components/` 并还原 `Learning/index.tsx` Tab；
- 在 `Layout.tsx` 恢复 WebRTC 菜单；移除新增路由 `/chat*`；
- 删除 `Chat/` 目录与对应路由懒加载项；
- 还原 i18n 文案（移除 chat）。

## 风险与应对
- AI Chat 迁移路径改动导致样式/资源引用路径错误：
  - 已同步迁移 `AiChat.module.scss` 并保持相对路径；公共组件与 API 仍使用 `@/` 别名，无需变更。
- 菜单文案缺失：
  - 已在中英文 `layout.json` 增加 `header.navigation.chat`。
- 路由守卫：
  - Chat 路由加入私有路由区，遵循现有登录校验逻辑；未登录会跳转 `/login`。

## 后续扩展建议
- 私聊：在 `ChatRoom` 基础上增加“会话列表 + 私聊”路由与视图；可在 URL 以 `/chat/dm/:userId` 表示；
- 后端文本聊天：为 Socket.IO 新增 `chat:*` 命名空间与事件，支持房间广播/私聊；
- 消息持久化：IndexedDB 本地缓存 + 可选后端存储；
- 文件消息：与现有文件上传 API 复用，分片与直传共存策略。
