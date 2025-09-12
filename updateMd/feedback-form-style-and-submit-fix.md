# 前台 FeedbackForm 样式与提交链路修复文档

## 背景
- 现象：FeedbackForm 中文本域与带前缀图标的输入框（邮箱）在输入时出现白底，影响深色主题一致性。
- 目标：
  - 统一让“反馈标题、详细描述、联系邮箱”在任意状态（默认/悬停/聚焦）下保持透明背景；
  - 确认/打通表单提交 → 前端 API → 后端公开接口 → 数据库写入的完整链路；
  - 如需，评估并升级 Prisma schema。

## 变更清单（全链路）
1. CSS 修复（仅作用于本组件范围内）
   - 文件：frontEnd/src/components/FloatingActions/FeedbackForm.module.scss
   - 说明：为 `.form_input`（含 affix wrapper）与 `.form_textarea`（TextArea 内部 textarea）增加透明背景覆盖，确保输入时不变白；保留边框与阴影的交互反馈。
2. 提交流程核验（无需新增逻辑）
   - FeedbackForm → useFloatingActions.handleSubmitFeedback → store.submitFeedback → FeedbackApiFront.submit → Http.post('/public/feedback/submit')。
   - 映射策略：
     - content：将标题合并进内容，`【${title}】\n${content}`（无标题则仅 content）；
     - category：SUGGESTION | BUG_REPORT | CONTENT_FEEDBACK | OTHER → 后端枚举 SUGGESTION | BUG | OTHER；
     - userEmail：直接透传前端 email。
3. 后端与数据库核验
   - 后端：server/src/router/feedback/public.controller.ts 已实现 POST /api/public/feedback/submit，入参 content、userName?、userEmail?、category?；
   - Prisma schema：server/prisma/schema.prisma 中 Feedback 模型包含 content、userName?、userEmail?、category(enum: SUGGESTION|BUG|OTHER)、status、时间戳，满足当前需求；暂无 schema 变更需要。

## 操作步骤（Windows 环境）
1. 样式修复生效确认
   - 打开任意页面 → 右下角“反馈”按钮 → 打开反馈面板；
   - 在“反馈标题、详细描述、联系邮箱”分别输入文本，观察背景在默认/悬停/聚焦/输入过程中均为透明；
2. 提交流程验证
   - 填写必填项（类型、标题、详细描述≥10字），填写邮箱（可选），点击“提交反馈”；
   - 浏览器 Network 面板应出现 POST /dev-api/public/feedback/submit → 代理至 /api/public/feedback/submit；
   - 返回 200 后弹出成功提示；管理端“意见反馈管理”刷新可见新记录。
3. 数据库验证（首次使用需确保迁移已执行）
   - 若尚未迁移：在 server 环境中执行 Prisma migrate（根据项目规范执行）；
   - 确认 feedback 表新增记录字段：content（含标题）、userEmail、category、status=PENDING、createdAt。

## 风险与回滚
- 风险：样式覆盖不足导致某些状态仍出现非透明背景；
  - 对策：CSS 已针对 `.ant-input`、`.ant-input-affix-wrapper`、`.ant-input-textarea` 的常见结构做精确覆盖；如遇特殊主题，可在该模块继续追加后置覆盖。
- 回滚：如需恢复旧样式，移除本次在 FeedbackForm.module.scss 追加的“修复”段落即可。

## 验证清单（自测）
- [ ] 标题输入框在输入时背景保持透明
- [ ] 详细描述 TextArea 在输入时背景保持透明
- [ ] 联系邮箱（带前缀图标）在输入时背景保持透明
- [ ] 提交命中 /dev-api/public/feedback/submit 并成功返回
- [ ] 管理端反馈列表可见新增记录

