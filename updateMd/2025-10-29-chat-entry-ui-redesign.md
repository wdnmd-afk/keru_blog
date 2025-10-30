# frontEnd 聊天入口 UI 重构执行文档

- 日期：2025-10-29
- 影响范围：`frontEnd`
- 关联路径：
  - `frontEnd/src/views/Chat/index.tsx`
  - `frontEnd/src/views/Chat/ChatEntry.module.scss`

## 目标

- 将原“横向 Card + 表单”入口改为“功能模块卡片 + 聊天室列表”的两段式布局。
- 模块卡片为正方形，带圆角、悬浮动效；上方展示功能入口（AI Chat、加入聊天室）。
- 下方展示最近加入的聊天室列表；无数据时显示缺省占位。
- 全面适配暗/亮主题，避免文字不可读，色调与站点主题一致。

## 技术栈

- React 18 + Ant Design 5
- SCSS Modules（样式文件 `.module.scss`）
- 本地存储 `localStorage`（最近房间列表）
- 主题：`useTheme()` + `getThemeColors()` 提供的色值

## 变更清单

- 新增：`frontEnd/src/views/Chat/ChatEntry.module.scss`
- 重构：`frontEnd/src/views/Chat/index.tsx`
  - 上方模块区：AI Chat 卡片、加入聊天室卡片
  - 下方列表区：最近房间卡片网格 + 清空/删除
  - 加入房间弹窗（房间号 + 昵称）
- 样式修正：`composes` → `@extend`（SCSS 原生写法），消除 lint 报错

## 交互与数据

- 最近房间存储键：`chat_recent_rooms`
- 结构：`{ id: string; nickname: string; time: number }[]`，最多保留 20 条，采用“去重置顶”。
- 加入房间：写入最近记录 → 关闭弹窗 → 路由跳转到 `/chat/room/:roomId?name=nickname`

## 主题与可读性

- 通过 `useTheme()` 获取 `resolvedTheme`，并用 `getThemeColors()` 读取 `primary`/`text`/`textSecondary` 等色值。
- SCSS 中根据 `data-theme` 设置渐变背景与边框透明度：
  - light：`linear-gradient(#fff → #f6f7fb)`
  - dark：`linear-gradient(#1f2937 → #0f172a)`
- 卡片图标容器背景采用透明蓝色，在深/浅模式下透明度不同，保证对比度。

## 实施步骤

1. 创建 `ChatEntry.module.scss`，封装 `.cardBase`（方形、圆角、投影、渐变）。
2. 在 `index.tsx` 引入新样式与主题 Hook，替换原两张横向 Card 为网格卡片布局。
3. 实现加入房间弹窗与输入状态；校验房间号并写入最近记录。
4. 实现最近房间列表的读取、去重、删除、清空与快速进入。
5. 自测暗/亮主题下的文字对比度（标题/描述/时间/按钮）。

## 验证清单

- [ ] `/chat` 顶部为两个正方形功能卡片；悬浮时有轻微上移和投影增强。
- [ ] 点击 AI Chat 卡片跳转 `/chat/ai`。
- [ ] 点击加入聊天室卡片弹出弹窗，输入后可跳转到 `/chat/room/:roomId`。
- [ ] 下方“聊天室列表”显示最近加入的房间卡片；可删除单项，右上角可“清空”。
- [ ] 暗色主题下文字与背景对比度清晰、颜色不发灰不刺眼。

## 风险与应对

- 风险：主题色变量缺失导致颜色不统一。
  - 应对：全部使用 `getThemeColors()` 产出的色值进行文字与强调色设置。
- 风险：本地存储异常（Safari 隐私模式）。
  - 应对：读写 `localStorage` 均包裹 `try/catch` 并提供空数组回退。
- 风险：CSS Modules 的 `composes` 报错。
  - 应对：改用 SCSS 的 `@extend` 写法。

## 回滚方案

1. 还原 `frontEnd/src/views/Chat/index.tsx` 至重构前版本（git 历史）。
2. 删除 `frontEnd/src/views/Chat/ChatEntry.module.scss` 引入与文件。
3. 刷新页面验证原始两张 Card + 表单布局恢复正常。

## 后续优化建议

- 引入“创建聊天室”按钮与房间封面，列表展示封面缩略图。
- 最近列表接入后端或 IndexedDB 做跨设备同步。
- 支持置顶/重命名本地房间别名。

---

## Electric Border（雷电特效边框）

### 实施概览

- 受 Figma/CodePen 参考启发，在功能模块卡片上加入“电流描边”视觉。
- 位置：
  - 样式：`frontEnd/src/views/Chat/ChatEntry.module.scss` 新增 `.electricCard/.electricStroke/.electricGlow1/.electricGlow2/.electricOverlay/.electricContent`。
  - 组件：`frontEnd/src/views/Chat/index.tsx` 注入 `<svg><filter id="turbulent-displace">...</filter></svg>`，并将两张功能卡片替换为 `.electricCard` 结构。
  - 颜色：使用主题主色 `colors.primary` 作为描边色；高光色通过 `lightenHex(colors.primary, 0.45)` 计算。

### 参数调优（在 `index.tsx` SVG 过滤器内）

- `feDisplacementMap@scale`: 形变强度，默认 `30`。范围建议 `10 ~ 45`。
- `feTurbulence@baseFrequency`: 噪声频率，默认 `0.02`。越大越“狂野”。建议 `0.015 ~ 0.035`。
- 动画：`<animate dur="6s" values="700;0" ...>` 控制上下/左右扰动速度，可改 `dur` 或 `values`。

### 颜色与主题

- 通过行内 CSS 变量注入：
  - `--electric-color`: 主描边色（默认主题主色）。
  - `--electric-light-color`: 发光高光色（默认由 `lightenHex` 计算）。
- 深色/浅色主题均可用，卡片内文字与图标颜色沿用现有 `colors.primary`、白色标题策略，保证对比度。

### 性能与兼容

- `feTurbulence + feDisplacementMap` 在低端设备上可能略有开销。
- 如需降级：可在媒体查询 `@media (prefers-reduced-motion: reduce)` 下隐藏发光层/动画（后续可按需添加）。
- 兼容性：现代浏览器支持良好；若个别环境不支持 SVG 滤镜，仅显示普通圆角卡片（无异常）。

### 回滚

- 移除 `index.tsx` 中 SVG `<filter>` 定义及 `.electricCard` 结构，改回 `.moduleCard`。
- 删除 `ChatEntry.module.scss` 中相关 `.electric*` 样式。

## 变更补充（2025-10-29 16:12）

- 颜色：两张功能卡片电流描边改为固定橙色 `#dd8448`，高光使用 `lightenHex('#dd8448', 0.45)` 计算，图标与图标容器同步橙色系，字体保持白色以保证对比度。
- 尺寸：增大功能卡片最小宽度，由 `minmax(160px, 1fr)` 调整为 `minmax(240px, 1fr)`；图标容器由 `48x48` 调整为 `56x56`，标题字号由 `16px` → `18px`，描述由 `12px` → `13px`。
- 背景：聊天入口页 `.page` 背景色统一为浅黑 `oklch(0.145 0 0)`，与示例保持一致。

## 变更补充（2025-10-30 09:00）

- 闪电动画：在 `index.tsx` 的 `<defs>` 中为 `#electric-sides` 增加 `feTurbulence/feDisplacementMap` 的动画；新增 `#electric-sides-strong` 作为 Hover/Active 强化版。
- 面板交互：`ChatEntry.module.scss` 新增面板交互态，Hover 上移与加亮，Active 轻微压缩并加亮柔光。
- 去除圆角贴合：将 `.sideBase` 改为 `border-radius: 0`，并将 `top/bottom` 外扩至 `-16px`，保证两侧竖向电流不受卡片圆角影响。

## 变更补充（2025-10-30 09:14）

- 将 `.electricPanel` 改为“示例同款层级结构”：
  - 外层边框 `panelBorderOuter` + 主卡片 `panelMainCard(filter: url(#turbulent-displace))`；
  - 两层边缘发光 `panelEdgeGlow1/2`；两层叠加 `panelOverlay1/2`；背景光 `panelBackgroundGlow`；
  - 背景渐变与颜色变量使用 `--gradient-color/--color-neutral-900`，可行内覆盖。
- 移除左右独立竖线渲染方案（`sideStroke/sideGlow*` 不再挂载），以保证成像效果与示例一致。
