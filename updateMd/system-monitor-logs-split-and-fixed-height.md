# 系统监控日志页面拆分与固定表格高度改造

## 背景
- 原 `LogManagement` 页面上下两个区块（文件日志/数据库日志）同页展示，进入页面会出现多次请求和可读性问题。
- 现按需将两个区块拆分为两个独立页面，并实现“表格高度占满剩余空间 + 固定高度滚动”。

## 变更范围
- 路由：`management/src/routes/index.tsx`
  - 新增路由：`/system-monitor/file-logs`、`/system-monitor/db-logs`
  - 兼容旧路由：`/system-monitor/logs` 重定向至 `/system-monitor/file-logs`
- 新页面：
  - 文件日志：`management/src/views/SystemMonitor/FileLogs.tsx`
  - 数据库日志：`management/src/views/SystemMonitor/DbLogs.tsx`
- 保留旧页面：`LogManagement.tsx`（可后续清理）

## 主要实现
- 按需请求：
  - 新增门控 `autoFetch`，仅在点击“刷新/查询”后才开始请求；避免进入页面即拉取。
  - 使用去重锁（`fetchLock`）+ 参数签名（`lastKeyRef`）避免重复并发和同参重复请求。
- 稳定引用：
  - `columns` 使用 `useMemo`，`fetchData` 使用 `useCallback`，避免因引用变化触发表格重复请求。
  - `rowKey` 固定为 `'id'`，减少子组件内部状态重置。
- 固定表格高度：
  - 页面容器：`<div style={{display:'flex',flexDirection:'column',height:'100%'}}>`
  - `Card`：`style={{height:'100%'}}` + `bodyStyle={{display:'flex',flexDirection:'column',flex:1,minHeight:0}}`
  - 表格外层容器：`<div style={{flex:1,minHeight:0}} ref={bodyRef}>`
  - `ResizeObserver` 监听容器高度，传递给 `KTable` 的 `scroll={{ y: ... }}` 固定表格滚动区域；`tableLayout="auto"` 优化列宽分配。
- 查看方式：统一使用 `Modal` 弹窗，避免页面出现整体滚动条。

## 使用方式
- 文件日志：访问 `/system-monitor/file-logs`，选择 Tab 后点击“刷新”开始请求。
- 数据库日志：访问 `/system-monitor/db-logs`，设置筛选后点击“查询”开始请求；“重置”清空并停止自动请求。

## 风险与回滚
- 风险：如后端返回的数据项无 `id`，表格 `rowKey='id'` 会导致行为异常。
  - 应对：确认 `system_logs` 表含 `id` 主键并返回；如特殊环境无 `id`，将 `rowKey` 调整为函数（但注意避免引用不稳定）。
- 回滚：
  - 路由：将 `/system-monitor/logs` 恢复为旧的 `LogManagement` 组件。
  - 页面：删除新建的 `FileLogs.tsx` 与 `DbLogs.tsx` 文件。

## 建议后续
- 菜单项指向新页面路由：`文件日志`、`数据库日志`（若菜单配置存在）。
- 统一行级高亮（可选）：根据 `level` 使用 `rowClassName` 添加背景色，进一步提升可视化效果。

## 验证清单
- 进入两个页面时 Network 面板无自动请求；点击“刷新/查询”时仅发起一次请求；分页切换时 1 次。
- 表格高度固定在卡片剩余高度内，页面整体无额外滚动条；“查看”在弹窗中展示。

