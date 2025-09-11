# KTable 分页器（ant-pagination）在 Management 项目内的可见性修复说明

## 问题
- KTable 在管理端页面中，分页器偶发/经常被卡在 Card 容器之外或底部被裁剪，显示不完整。

## 根因
- 共享样式中 `.ant-table-container` 设为 `height: 100%`，而分页器位于 `.ant-table` 的同级子节点，导致容器占满全部高度后，底部分页区域没有空间。
- 外层未完全采用 Flex 列布局，或未为表体区域设置 `min-height: 0`，导致挤压滚动区域。

## 方案
1) CSS 结构调整（shared/src/styles/antd.scss）
- 让 `.ant-table` 成为列布局容器，`display:flex; flex-direction:column;`
- `.ant-table-container` 使用 `flex:1; height:auto;` 代替原 `height:100%`
- `.ant-spin-container` 也启用列布局，保证子元素可拉伸
- 为 `.ant-table-pagination` 预留顶部/底部间距

2) 计算逻辑增强（shared/src/components/KTable/index.tsx）
- 使用 `ResizeObserver` 监听父容器高度，动态计算 `scroll.y`
- 分页器选择器兼容 `.ant-table-pagination` 与 `.ant-pagination`

## 影响范围
- Management 项目的用户/角色/权限/用户角色等配置页
- 不改变外部 API，仅影响内部布局与滚动高度

## 验证
- 打开上述页面，检查：
  - 分页器完整显示于 Card 内部，底部有 8~12px 间距
  - 表体可滚动，分页始终可见可点

## 回滚
- 将 `.ant-table-container` 恢复为 `height:100%`
- 移除 `.ant-table`/`.ant-spin-container` 的 Flex 设置
- 移除 `.ant-table-pagination` 定制间距

## 备注
- 如需更大底部间距，可在 `.ant-table-pagination` 上调节 `margin-top` / `padding-bottom`。
