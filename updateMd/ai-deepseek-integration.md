# AI 服务（DeepSeek via OpenAI SDK）集成与使用说明

## 背景与目标
- 通过 OpenAI SDK 兼容接入 DeepSeek API，提供基础 AI 问答接口 `/api/ai/chat`。
- 采用独立配置文件与环境变量管理敏感信息，符合现有 Inversify 架构与中间件体系。

## 变更清单（后端）
- 新增：`server/src/config/ai.config.ts`（AI 配置，读取环境变量）
- 新增：`server/src/services/ai.service.ts`（AI 服务，封装 Chat Completions 调用）
- 新增：`server/src/router/ai/dto.ts`（请求 DTO 校验）
- 新增：`server/src/router/ai/controller.ts`（控制器，POST `/api/ai/chat`）
- 修改：`server/src/router/controller.ts`（导出 AI 控制器）
- 修改：`server/src/config/container.config.ts`（注册 AIController/AIService 依赖）
- 修改：`server/.env.example`（新增 DeepSeek 环境变量示例）

## 环境变量配置
在 `server/.env`（本地自行创建）中新增/设置：
- `DEEPSEEK_API_KEY`：你的 DeepSeek API Key（请勿提交到仓库）
- `DEEPSEEK_BASE_URL`：`https://api.deepseek.com`
- `DEEPSEEK_MODEL`：`deepseek-chat`
- `AI_TIMEOUT_MS`：`60000`（可调）

示例（请复制 `.env.example` 并填写）：
```
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxx
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
AI_TIMEOUT_MS=60000
```

## 依赖安装
本功能依赖 OpenAI 官方 SDK。
- 安装命令（Windows/在 `server` 目录）：
  - npm: `npm install openai`

注意：此命令会修改 lockfile，请在得到批准后执行。

## 接口设计
- 路径：`POST /api/ai/chat`
- 认证：默认启用 `AuthMiddleware`（需要管理员登录态）。如需对外开放，可将路径加入白名单或移除认证中间件。

## 流式（SSE）扩展
- 新增接口：POST `/api/ai/chat/stream`（使用 text/event-stream 返回）
- 认证：沿用 AuthMiddleware，前端通过 fetch 携带 Authorization 头
- 后端实现：`server/src/router/ai/controller.ts` 新增 `chatStream`，`server/src/router/ai/service.ts` 新增 `streamChat`
- 前端集成：新增 `frontEnd/src/api/aiApi.ts` 的 `streamChat` 方法，并在 `Learning` 页面新增 `AI Chat` 标签与组件 `AiChat.tsx`

### 前端使用示例（片段）
```ts
await streamChat(
  { message: '你好' },
  {
    onChunk: (t) => {/* 逐段渲染 */},
    onDone: () => {/* 完成 */},
    onError: (e) => {/* 错误处理 */},
  }
)
```

- 限流：`rateLimitMiddleware(60, 5 * 60 * 1000)`（5 分钟内最多 60 次/每 IP）
- 入参：`{ message: string, conversationId?: string }`
- 出参：`{ success: boolean, data: { reply: string, conversationId: string }, message: string }`

## 安全与校验
- 使用 `class-validator` 对 `message`、`conversationId` 做基本长度与类型校验。
- 统一使用项目内的响应封装与错误处理。
- 通过限流中间件降低滥用风险。

## 使用步骤（本地）
1. 在 `server/.env` 填写真实 `DEEPSEEK_API_KEY`。
2. 在 `E:/github/keru_blog/server` 执行依赖安装（需授权）：
   - `npm install openai`
3. 启动服务：
   - `npm run dev`（或你的既有启动命令）
4. 发送请求示例：
   ```http
   POST http://localhost:5566/api/ai/chat
   Authorization: Bearer <管理端登录获取的JWT>
   Content-Type: application/json

   {
     "message": "你好，帮我总结一下这段话",
     "conversationId": "可选-自定义ID"
   }
   ```

## 潜在风险与回滚
- 风险：
  - 未安装 `openai` 依赖将导致运行时报错。
  - 未配置 `DEEPSEEK_API_KEY` 将在加载配置时抛出错误。
  - 公共开放接口可能引发滥用，建议保留 `AuthMiddleware` 或加白名单细控。
- 回滚：
  - 删除新增文件与容器注册项；
  - 恢复 `server/src/router/controller.ts` 与 `server/src/config/container.config.ts` 对应改动；
  - 从 `package.json` 移除 `openai` 依赖（如已安装）。

## 优化建议（可选）
- 增加多模型支持（通过环境变量或请求参数切换）。
- 增加会话历史管理（可接入数据库/缓存）。
- 支持流式响应（Server-Sent Events）。
- 接入权限/配额管理，控制不同角色的调用上限。

