# Management 配置页面布局规范化改造说明

## 背景与目标
- 现状：页面存在重复 padding、表格展示区域高度不充分的问题。
- 目标：
  1. 移除 Card 外层容器冗余 padding（main 已全局处理）。
  2. Card 占满剩余高度，正文区采用 Flex 布局。
  3. KTable 跟随父容器（Card 正文）高度自适应。
  4. 统一应用到管理端所有配置页面（用户/角色/权限/用户角色等）。

## 关键变更摘要
1) 共享组件 KTable（shared）
- 为外层容器添加 `height:100%`、`display:flex`、`flex-direction:column`。
- 新增自适应高度逻辑：使用 `ResizeObserver` 监听容器高度，动态计算 `scroll.y`（扣除表头与分页高度）。

2) 各配置页面（management）
- 移除外层 `div` 的 `padding:24px`。
- Card 设置为 `flex:1` 并在 `bodyStyle` 中开启列方向 Flex，正文 `flex:1; min-height:0`。
- 用一个 `flex:1; min-height:0` 的 div 包裹 KTable 以承接自适应高度。

## 受影响文件
- shared/src/components/KTable/index.tsx
- management/src/pages/UserManagement/RoleManagement/index.tsx
- management/src/pages/UserManagement/UserRoleManagement/index.tsx
- management/src/pages/UserManagement/PermissionManagement/index.tsx
- management/src/views/UserManagement/index.tsx

## 验证步骤
1. 打开上述四个页面，确认：
   - 页面无双重 padding；
   - Card 占满剩余高度；
   - KTable 高度随窗口/容器变化自适应，分页可见且可滚动；
   - 不同分辨率下无额外空白。
2. 功能回归：分页、排序、筛选、选择、行点击等行为正常。

## 风险与回滚
- 风险：低。主要是样式布局调整；KTable 高度计算已设最小值保护。
- 回滚：
  - KTable 恢复为固定 `scroll.y: calc(100vh - 300px)`；
  - 页面恢复原始容器与 Card 样式（不建议）。

## 后续优化建议
- 将页面级布局（如标题区）抽为通用模板，进一步统一间距与密度。
- 如需 SSR 或低端浏览器兼容，可在 `ResizeObserver` 外增设 `window.onresize` 兜底。

