# 前台意见反馈提交流程清理与统一实施文档

## 背景与目标
- 发现前台存在两套重复的意见反馈提交实现：
  1) 浮动操作面板的反馈表单组件 frontEnd/src/components/FloatingActions/FeedbackForm.tsx（正确方式）
  2) 单独页面 frontEnd/src/views/systemPages/FeedbackSubmit.tsx（多余实现）
- 目标：
  - 明确唯一的提交路径：通过 FloatingActions/FeedbackForm 组件完成反馈提交
  - 删除冗余页面与路由，避免维护成本与用户混淆
  - 校验与后端 /api/public/feedback/submit 接口的联通性

## 变更清单（全链路）
1. 删除多余页面文件
   - 移除：frontEnd/src/views/systemPages/FeedbackSubmit.tsx
2. 路由清理
   - frontEnd/src/routes/index.tsx：
     - 移除 LazyComponents.FeedbackSubmit 懒加载配置
     - 从 publicRoutes 中删除 path='/feedback' 的公共路由项
3. 统一提交逻辑至全局 Store
   - frontEnd/src/store/global/index.ts：
     - 新增引入：import { FeedbackApiFront } from '@/api/feedback'
     - 实现 submitFeedback：调用 FeedbackApiFront.submit，将组件层反馈数据映射为后端所需字段
       - 映射策略：
         - content：将 title 合并进 content，格式为：`【${title}】\n${content}`（无标题时仅 content）
         - category：SUGGESTION | BUG_REPORT | CONTENT_FEEDBACK | OTHER → 后端枚举 SUGGESTION | BUG | OTHER
         - userEmail：透传组件表单的 email 字段（可选）
4. 组件联通性确认
   - FloatingActions.tsx → FeedbackForm：onSubmit 继续走 useFloatingActions.handleSubmitFeedback → 全局 store.submitFeedback → API

## 受影响文件
- frontEnd/src/routes/index.tsx（删除 /feedback 公共路由与对应懒加载项）
- frontEnd/src/views/systemPages/FeedbackSubmit.tsx（已删除）
- frontEnd/src/store/global/index.ts（实现真实 API 调用）
- frontEnd/src/components/FloatingActions/FeedbackForm.tsx（无逻辑改动，仅复核）

## 实施步骤（Windows 环境）
1. 代码获取/切换到对应分支（略）
2. 确认已删路由：打开 frontEnd/src/routes/index.tsx，确保：
   - LazyComponents 不再包含 FeedbackSubmit
   - publicRoutes 不再包含 path '/feedback'
3. 确认 Store 已接入 API：
   - frontEnd/src/store/global/index.ts 中 `submitFeedback` 已调用 `FeedbackApiFront.submit`
4. 启动前端并验证（本地）
   - 打开任意页面 → 点击右下角浮动操作条“反馈”按钮 → 打开表单
   - 填写标题、内容、邮箱，选择类型后提交
   - 浏览器 Network 面板应出现：POST /dev-api/public/feedback/submit（代理到 /api/public/feedback/submit）
   - 成功后 toast 提示；管理端刷新可见新记录（需先完成数据库迁移）

## 与后端接口的对接说明
- 前端：frontEnd/src/api/feedback.ts
  - FeedbackApiFront.submit(payload) → Http.post('/public/feedback/submit', payload)
- 代理：/dev-api → /api（由 Vite 代理/环境变量统一配置）
- 后端：server/src/router/feedback/public.controller.ts
  - POST /api/public/feedback/submit
  - body: { content: string; userName?: string; userEmail?: string; category?: 'SUGGESTION'|'BUG'|'OTHER' }

## 风险与回滚
- 风险：
  - 其他地方如有硬编码跳转 '/feedback' 的链接会变成 404
  - 解决：搜索 '/feedback' 引用并替换为通过浮动操作打开 FeedbackForm；或移除该入口
- 回滚：
  - 如需临时恢复旧页面，仅需恢复删除的文件与路由两处变更；但不建议继续保留两套实现

## 优化建议（可选）
- 若后续希望在管理端区分前台“反馈类型”更细粒度（BUG_REPORT/CONTENT_FEEDBACK），可在后端 Feedback 模型增加字段（如 meta JSON）或新增细分类枚举，并在提交时额外透传；当前已按后端现有枚举做安全映射。

## 验证清单（自测）
- [ ] 无 /feedback 路由，直接访问 404
- [ ] 浮动面板反馈表单可正常打开与关闭
- [ ] 表单校验（类型必选、内容长度等）正常
- [ ] 提交命中 /dev-api/public/feedback/submit，状态 200，返回格式符合 Http 拦截器约定
- [ ] 管理端“意见反馈管理”能看到新提交记录

