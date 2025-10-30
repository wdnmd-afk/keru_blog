# Chat 入口页 Tabs + 聊天室全链路改造方案与执行文档

## 概要
- 目标：在前台 `Chat` 入口页底部新增 Tabs（三个子页：聊天室/直播/我的），支持前台创建聊天室；列表以卡片展示（上图为封面、左上角浮房间号；下部展示标签、名称、拥有者、人数，白色字体，不带电流特效）。
- 后端：新增持久化 `ChatRoom` 表及 `ChatParticipant` 表，支持封面图 URL、名称、人员列表（动态）、创建/开始时间、房间号；限制“每人仅能开启一个聊天室”。
- 管理端：新增“聊天室管理”页面，可查看/关闭房间、查看参与者。
- 直播：复用现有 WebRTC 模块 `/api/webrtc/rooms` 作为“直播”Tab 数据源。

## 架构设计
- 前端 frontEnd（React18 + Vite + antd）
  - `Chat` 入口页（`frontEnd/src/views/Chat/index.tsx`）底部由原“最近房间”改为 `Tabs`：
    - Tab1「聊天室」：调用自建 `/api/chatrooms` 列表，卡片样式（封面、房间号、名称、拥有者、人数）。提供“创建聊天室”弹窗（名称、可选封面上传）。
    - Tab2「直播」：调用现有 `/api/webrtc/rooms`，列表同卡片样式（封面为占位图）。
    - Tab3「我的」：展示我创建的聊天室（或我参与过的房间），支持关闭房间。
  - 封面上传：复用 `FileApi.uploadFileSingle`，URL 直接使用 `/static/IMAGE/{fileName}`。
  - 动态人数：在进入 `ChatRoom` 路由时调用 `/api/chatrooms/:id/join`，离开时调用 `/api/chatrooms/:id/leave`。

- 后端 server（Express + Inversify + Prisma + Redis + JWT）
  - Prisma 新增模型：
    - `ChatRoom`：id、roomNo（唯一房间号）、name、coverUrl、ownerId、status（ACTIVE/ENDED）、createdAt、startTime、endTime。
    - `ChatParticipant`：roomId、userId、joinAt、leaveAt（null 表示在房间中）。
  - 控制器 `/api/chatrooms`：
    - POST `/` 创建（校验“每人仅能开启一个 ACTIVE 房间”）。
    - GET `/` 列表（支持 status/page/limit）。
    - GET `/:roomId` 详情（含当前在线人数）。
    - POST `/:roomId/close` 关闭（仅房主）。
    - POST `/:roomId/join` 加入，POST `/:roomId/leave` 离开（维护在线人数）。
    - GET `/mine` 我的（owner 或参与者，优先 owner）。
  - 与 WebRTC：本次“聊天室”与“直播”解耦；直播依旧走 `/api/webrtc/*`。

- 管理端 management
  - 新增页面 `ChatRoomManagement`：
    - 列表查询、关闭房间、查看当前在线人数/参与者。
  - 菜单与路由：`/chatroom-management`。

## 接口定义
- POST `/api/chatrooms`
  - 请求：{ name: string, coverUrl?: string }
  - 逻辑：若当前登录用户存在 `status=ACTIVE` 房间，返回 400；否则创建房间，生成唯一 `roomNo`（6~8 位），`startTime=now`，并写入 `ChatParticipant`（owner 加入）。
  - 响应：{ id, roomNo, name, coverUrl, ownerId, ownerName?, status, createdAt, startTime, currentParticipants }

- GET `/api/chatrooms`
  - 查询：{ page?: number, limit?: number, status?: 'ACTIVE' | 'ENDED' }
  - 响应：分页列表数据。

- GET `/api/chatrooms/:roomId`
  - 响应：房间详情（含参与者与人数）。

- POST `/api/chatrooms/:roomId/close`
  - 仅房主可调；设置 `status=ENDED`、`endTime=now`，将所有未离开的参与者 `leaveAt=now`。

- POST `/api/chatrooms/:roomId/join`
  - 写入/更新参与关系；若已在房间中则幂等。

- POST `/api/chatrooms/:roomId/leave`
  - 将当前用户的活动参与记录 `leaveAt=now`。

- GET `/api/chatrooms/mine?ownerOnly=true|false`
  - ownerOnly=true 时仅返回我创建的；否则也可返回我参与的。

## 前端交互与校验
- 创建聊天室：
  - 名称必填；封面可选（上传后取 `/static/IMAGE/{fileName}`）。
  - 若后端返回“已有开启的聊天室”，前端提示并引导到“我的”查看/关闭。
- 卡片样式：
  - 顶部左上角显示 `roomNo` 浮层；主体为封面（无图用默认图）；下部展示 `名称`、`拥有者`、`人数`、标签（如 ACTIVE）。
- 动态人数：
  - 进入 `ChatRoom.tsx` 页面：`join`；卸载：`leave`。

## 风险与回滚
- 风险：
  - Prisma 模型变更需要迁移；线上数据兼容性。
  - Web 前端样式修改与现有“电流特效”样式冲突。
  - 鉴权与 401 弹窗互相干扰（frontEnd/management 各自拦截器已实现）。
- 回滚：
  - 数据库迁移回滚 `prisma migrate reset`（谨慎！备份数据）。
  - 通过 Git revert 回退本次改动提交。

## 实施步骤
1) 后端
- [ ] 更新 `server/prisma/schema.prisma` 增加 ChatRoom/ChatParticipant/ChatRoomStatus
- [ ] 运行迁移（本地）
```bash
# 在 server 目录
pnpm prisma generate
pnpm prisma migrate dev -n add_chat_room
```
- [ ] 新增 `server/src/router/chatroom/{dto.ts, service.ts, controller.ts, index.ts}`
- [ ] 注册依赖：`server/src/router/controller.ts`、`server/src/config/container.config.ts`

2) 前端 frontEnd
- [ ] 新增 `src/api/chatroom.ts`
- [ ] 新增 `src/views/Chat/components/{ChatRoomList.tsx, LiveList.tsx, MyRooms.tsx}`
- [ ] 修改 `src/views/Chat/index.tsx`：底部替换为 Tabs
- [ ] 更新样式 `ChatEntry.module.scss`：增加卡片样式（无电流特效、白字）
- [ ] 在 `ChatRoom.tsx` 增加 join/leave 调用（挂载/卸载）

3) 管理端 management
- [ ] 新增 `src/views/ChatRoomManagement/index.tsx`
- [ ] 路由：`management/src/routes/index.tsx` 加入 `/chatroom-management`
- [ ] 菜单：`management/src/components/Layout/index.tsx` 菜单新增“聊天室管理”

4) 联调与验证清单
- [ ] 登录前端，创建聊天室成功、重复创建被阻止
- [ ] 列表显示：封面、房间号、名称、拥有者、人数
- [ ] 进入页面自动 join，离开自动 leave，人数变化正确
- [ ] 管理端可关闭房间，“我的”列表即时反映
- [ ] 直播 Tab 成功拉取 `/api/webrtc/rooms`

## 参考实现与约定
- 统一鉴权：前端 `Http`、管理端 `ManagementApi` 已注入 `Authorization`。
- 静态资源：前端 Vite 代理已转发 `/static` 到后端。
- 代码注释：新增代码统一添加中文注释，便于团队协作。

--
本文档需与提交一同维护更新，后续所有操作严格按本文档流程执行，保证可追溯与可复现。
