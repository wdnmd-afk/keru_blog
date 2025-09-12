# Management 意见反馈管理（FeedbackManagement）功能实施文档

## 背景
前台（frontend）已经支持用户提交意见反馈。为提升运营与支持效率，需要在管理后台（management）新增“意见反馈管理”页面，实现反馈记录的统一查看与筛选。

## 范围
- 新增页面：management/src/pages/FeedbackManagement/index.tsx
- 新增接口：management/src/api/feedback.ts
- 路由接入：management/src/routes/index.tsx
- 菜单/面包屑：management/src/components/Layout/index.tsx
- 统一遵循既有布局规范（Card + KTable，自适应高度；蓝色表头主题）

## 数据模型与接口
- 类型定义（feedback.ts）：
  - Feedback：{ id, content, userName?, userEmail?, createdAt, category, status }
  - FeedbackStatus：PENDING | VIEWED | RESOLVED
  - FeedbackCategory：SUGGESTION | BUG | OTHER
  - QueryFeedbackRequest：{ user?, status?, category?, startTime?, endTime?, page?, pageSize?, keyword? }
- 接口（ManagementApi）：
  - POST /feedback/query → 分页查询（推荐）
  - POST /feedback/index → 全量（仅需要时）

## 页面功能要点
- 查询条件：反馈人（姓名/邮箱）、状态、类型/分类、时间范围
- 列表展示：使用共享 KTable；列包含反馈内容（可“查看”详情）、反馈人、类型、状态、时间
- 交互：
  - 反馈内容超长时显示“查看”按钮，弹窗展示全文
  - 支持分页（KTable内置）；默认按时间降序
- 布局：
  - Card 作为顶级容器，body 区域 flex: 1 + minHeight: 0
  - KTable 外层容器 flex: 1，确保自适应高度且分页器完整可见

## 变更清单
- 新增 management/src/api/feedback.ts：定义类型与 FeedbackApi
- 新增 management/src/pages/FeedbackManagement/index.tsx：页面实现
- 修改 management/src/api/index.ts：导出 FeedbackApi 及类型
- 修改 management/src/routes/index.tsx：
  - LazyComponents 增加 FeedbackManagement
  - privateRoutes 新增 /feedback-management 路由
- 修改 management/src/components/Layout/index.tsx：
  - 菜单“系统监控”分组新增“意见反馈”入口
  - breadcrumbMap 增加 /feedback-management → 意见反馈管理

## 后端接口实现与集成（本次补充）
- 新增后端占位实现：server/src/router/feedback
  - controller.ts：/api/feedback/query 与 /api/feedback/index（POST）接口，挂载 AuthMiddleware 保障管理端访问安全
  - service.ts：提供内存 Mock 数据与筛选、分页逻辑，默认按时间倒序（最新优先）
- 依赖注入：server/src/config/container.config.ts 增绑 FeedbackController/FeedbackService
- 汇总导出：server/src/router/controller.ts、server/src/router/service.ts 补充反馈模块导出
- 目的：即刻打通管理端页面的数据链路，后续可平滑替换为真实数据库实现（保持入参/出参结构不变）



## 实施步骤（操作指引）
1. 确认管理端本地能正常启动（已有依赖环境）
2. 打开侧边栏“系统监控” → “意见反馈”，进入新页面
3. 使用不同条件进行筛选（反馈人/状态/类型/时间范围），检查列表与分页是否正确
4. 点击“查看”弹窗，核实长内容显示完整
5. 在不同分辨率下检查：表头为蓝色、表体区域可滚动、分页器完整显示

## 验证标准
- 样式一致：与其他管理页保持统一视觉（蓝色表头、无重复 padding）
- 交互正确：查询/重置生效，分页准确；默认按时间降序
- 可读性：列命名清晰，状态/类型有 Tag 色彩提示；长内容可查看详情

## 潜在风险与回滚
- 风险：后端接口路径或响应结构与约定不一致；解决：在 FeedbackApi 中适配/容错
- 风险：极端分辨率导致分页器拥挤；解决：可适当增加 .ant-table-pagination 上边距
- 回滚：如需回退，移除新增文件与相关路由/菜单改动即可（见“变更清单”）

## 后续优化建议
- 增加状态更新（标记已查看/已处理）与批量操作（按需）
- 增加内容关键字高亮
- 支持导出 CSV/Excel
- 引入服务端排序/筛选（若数据量大）

