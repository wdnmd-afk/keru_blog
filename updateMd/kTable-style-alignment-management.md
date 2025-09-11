# Management 项目 KTable 样式对齐调整说明

## 背景
- Frontend 项目中的 KTable 表头为蓝色背景（来自 ConfigProvider 的 Table 主题 token）
- Management 项目中 KTable 表头为浅灰色，视觉不一致

## 根因分析
- KTable 自身样式（shared/src/styles/antd.scss）主要负责容器、滚动条、斑马纹等，不控制表头底色
- 表头背景色由 Ant Design v5 主题 token 控制：`theme.components.Table.headerBg/headerColor` 等
- Management 项目在 App 级 ConfigProvider 中将 Table 表头设置为浅灰

## 解决方案
- 在 `management/src/App.tsx` 的 `ConfigProvider` 中，将 Table 组件 token 调整为与 Frontend 一致：
  - `headerBg: #5E83BB`
  - `headerColor: #fff`
  - `borderColor: #566B99`
  - `headerBorderRadius: 0`
  - 同时保留/微调 `rowHoverBg`

## 变更点
- 文件：`management/src/App.tsx`
- 位置：`theme.components.Table`
- 修改后核心片段：

```ts
// Table 组件配色（与 frontEnd 保持一致的蓝色表头）
Table: {
  headerBg: "#5E83BB",
  headerColor: "#fff",
  headerBorderRadius: 0,
  borderColor: "#566B99",
  rowHoverBg: "#f5f7fb",
},
```

## 验证步骤
1. 启动或刷新 Management 开发服务（浏览器强制刷新 Ctrl+F5）
2. 访问以下使用 KTable 的页面：
   - UserManagement、RoleManagement、UserRoleManagement、PermissionManagement
3. 验证表格：
   - 表头背景为蓝色（#5E83BB），文字为白色
   - 分页/排序/筛选、斑马纹、滚动条等功能与样式正常

## 风险与回滚
- 风险：低；仅主题 token 调整，不影响逻辑
- 回滚：将 `Table` token 恢复为原值（浅灰）即可

## 后续建议
- 若需要进一步统一样式，可将通用主题 token 抽取至 shared 的主题配置并在两个应用统一采用
- 将 Frontend 与 Management 的主题差异文档化，避免后续不一致

