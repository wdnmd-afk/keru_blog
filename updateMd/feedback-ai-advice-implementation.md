# 意见反馈 AI 建议功能实施文档

## 一、目标与范围
- 目标：在前台提交意见反馈后，服务端自动调用 AI 服务分析反馈，生成精炼的中文建议（advice）并存入数据库；管理端接口 `/management-api/feedback/query` 返回新增字段 `advice`。
- 影响范围：
  - 数据库模型：`Feedback` 新增字段 `advice`（可空，Text）。
  - 服务端：`/api/public/feedback/submit` 提交后异步生成 AI 建议并写回；`/api/feedback/query` 返回包含 `advice`。
  - 管理端类型：`management/src/api/feedback.ts` 中 `Feedback` 接口新增 `advice` 字段。

## 二、改动清单（路径与说明）
- 数据库模型：`server/prisma/schema.prisma`
  - `model Feedback` 新增 `advice String? @db.Text`。
- 服务端控制器：`server/src/router/feedback/public.controller.ts`
  - 注入 `AIService`；在创建反馈记录后，异步调用 `aiService.chat()` 生成建议，更新 `feedback.advice`；失败不影响主流程。
  - 补充 `getJwt` 导入，兼容从请求头中提取用户名/邮箱。
- 服务端类型：`server/src/router/feedback/service.ts`
  - `export interface Feedback` 新增 `advice?: string | null`。
- 管理端类型：`management/src/api/feedback.ts`
  - `export interface Feedback` 新增 `advice?: string | null`。
- 依赖注入：`server/src/config/container.config.ts`
  - 已存在 `AIService` 绑定，无需改动。

## 三、环境变量与配置
- AI 配置：`server/src/config/ai.config.ts`
  - 读取 `DEEPSEEK_API_KEY`（或 `AI_API_KEY`）、`DEEPSEEK_BASE_URL`（可选）、`DEEPSEEK_MODEL`（默认 `deepseek-chat`）。
  - 无密钥将抛错，当前控制器对 AI 失败已做 try/catch 保护，不影响反馈提交，但无法生成建议。

## 四、执行步骤（建议在开发环境）
1. 安装依赖（如需）：
   - 使用 pnpm/yarn/npm 安装，不涉及新增依赖，可跳过。
2. 生成/迁移 Prisma：
   - 在 `server/` 目录执行：
     - `npx prisma generate`
     - `npx prisma migrate dev --name add_feedback_advice`
   - 或执行项目脚本（若已配置统配脚本）：`pnpm run generate`（注意该脚本名可能执行不同的迁移名）。
3. 确认环境变量：
   - 设置 `DEEPSEEK_API_KEY`（或 `AI_API_KEY`）。
4. 启动服务验证：
   - `pnpm dev:server`（或直接在 `server/` 执行 `pnpm run dev`）。

## 五、验证场景（建议用 Postman/Devtools）
- 提交反馈（公开接口）：`POST /api/public/feedback/submit`
  - body 示例：`{ "content": "页面加载缓慢，尤其在移动端" }`
  - 预期：立即返回成功；稍后数据库该记录 `advice` 字段被填充（异步写入）。
- 管理端查询：`POST /api/feedback/query`
  - 预期：返回分页数据中每条记录包含 `advice` 字段（可能为空或有值）。

## 六、潜在风险与回滚方案
- 风险
  - 迁移风险：生产数据库执行迁移需审慎，建议先备份；若多环境（开发/预发/生产），需按序推进。
  - AI 服务可用性：无 Key 或限流/超时将导致建议生成失败，但不影响主流程提交；日志会记录警告。
  - 一致性：提交接口为异步生成建议，管理端查询时可能存在短暂的 `advice=null` 现象（最终一致）。
- 回滚
  - 代码层面：撤回本次改动（Git revert）。
  - 数据层面：Prisma 迁移可编写回滚 migration（或手动 `ALTER TABLE DROP COLUMN advice`），需与 DBA 确认。

## 七、优化与后续建议
- 在管理端 UI 中高亮显示 `advice` 并提供筛选（如“仅显示有建议”）。
- 对历史无 `advice` 的数据提供批量回填任务（定时或管理端触发）。
- 增加 AI 超时与重试策略，以及更细粒度的日志（埋点统计命中率/耗时）。

## 八、变更追踪（Commit/文件）
- `server/prisma/schema.prisma`：新增 `advice`。
- `server/src/router/feedback/public.controller.ts`：新增调用 `AIService` 与 `advice` 更新逻辑；补充 `getJwt` 导入。
- `server/src/router/feedback/service.ts`：类型新增 `advice`。
- `management/src/api/feedback.ts`：类型新增 `advice`。

---

本文档对应“意见反馈 AI 建议功能”，用于指导实施、验证与回滚，确保过程可追溯、结果可复现。
