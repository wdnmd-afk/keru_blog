# 意见反馈管理与前台提交功能 UI/交互优化执行文档

## 背景
根据产品与使用反馈，管理端反馈列表与前台提交表单存在以下问题：
1) 管理端“反馈内容”列表列宽度 `minWidth` 不生效，且无法填充剩余空间；
2) 管理端“反馈时间”列在鼠标悬停时文字变为白色，观感不佳；
3) 前台“意见反馈”提交表单上下留白偏多，“详细描述”区域间距需要优化，邮箱前存在 icon 的风格不统一问题（本次已确保无 icon）。

本次修复围绕上述问题进行前后端协同改造，确保体验一致、逻辑稳定。

## 改动范围
- management
  - src/pages/FeedbackManagement/index.tsx
  - src/styles/ktable.scss
- frontEnd
  - src/views/systemPages/FeedbackSubmit.tsx
- 共享组件
  - shared/src/components/KTable/index.tsx（仅行为说明，无代码变动）

## 具体改动
### 1. 表格列宽度与自适应
- 问题：Ant Design Table 列配置不支持 `minWidth` 属性，导致写在列配置里的 `minWidth: 420` 不生效。
- 方案：
  - 将“反馈内容”列的最小宽度通过 `onHeaderCell/onCell` 内联样式设置；
  - 该列不设置固定 `width`，其余列设置明确的 `width`，从而让该列在容器有剩余空间时自然填充剩余空间；
  - 同时增加 `className: 'col-content'`，在样式中兜底 `min-width: 420px`。
- 变更代码：management/src/pages/FeedbackManagement/index.tsx 中 columns 配置；并在外层表格容器增加 `className="management-table"`，引入 `@/styles/ktable.scss`。

### 2. 行悬停文字颜色优化
- 问题：个别场景下行悬停时文字会变白色，影响可读性；
- 方案：在管理端样式中增加覆盖规则，强制行悬停时文本颜色与主题正文色一致（#2c2c2c），保证与 App 主题 token 对齐；
- 变更代码：management/src/styles/ktable.scss 新增：
  - `.KT_Box .ant-table-tbody > tr:hover > td { color: #2c2c2c; }`
  - `.KT_Box td.col-content, .KT_Box th.col-content { min-width: 420px; }`

### 3. 前台提交表单布局精简
- 问题：上下留白偏多，“详细描述”区域间距较大，邮箱前的 icon 与整体风格不统一；
- 方案：
  - 外层容器 padding 自 24 调整为 12；
  - Card 通过 `headStyle`/`bodyStyle` 压缩内边距；
  - “详细描述”区域（即 content 字段）`Form.Item` 添加 `marginBottom: 12`，TextArea 使用 `autoSize={{ minRows: 6, maxRows: 12 }}`；
  - 其他表单项统一使用 `marginBottom: 12`，提交按钮 `marginBottom: 0`；
  - 邮箱与称呼字段均使用 `allowClear`，且未添加前缀 icon，保证风格统一；
- 变更代码：frontEnd/src/views/systemPages/FeedbackSubmit.tsx。

## 验证步骤（Windows）
1) 管理端
   - 打开 /feedback-management，观察“反馈内容”列：最小宽度不小于 420px；在更宽的屏幕下，该列应自然占据剩余空间；
   - 鼠标在任意行悬停，检查“反馈时间”列文字颜色保持深色（#2c2c2c），背景为浅色 hover 背景（与主题一致）。
2) 前台
   - 打开 /feedback，检查表单上下间距更紧凑，详细描述区高度合适；
   - 填写内容并提交，Network 面板应看到 POST /dev-api/public/feedback/submit（代理至 /api/public/feedback/submit）；
   - 数据库应新增记录；管理端刷新可见新记录（若首次使用，请先确保 Prisma 迁移与 generate 已执行）。

## 风险与回滚
- 风险：
  - 若宿主环境自定义了更高优先级的样式，可能覆盖本次 hover 文本色规则；
  - 如某些列未设置固定宽度，可能导致内容列扩展不如预期。可在列配置中为非内容列补充明确 `width`。
- 回滚：
  - 可将 `onCell/onHeaderCell` 移除并恢复此前实现；
  - 移除新增的样式覆盖片段即回滚 hover 文本色。

## 后续优化建议
- 若需更强的“剩余空间分配”控制，可考虑：
  - 在 KTable 内部支持 `tableLayout="fixed"` 并提供“可伸缩列”的显式开关；
  - 使用虚拟列表或列拖拽增强用户可用性。

## 变更清单
- management/src/pages/FeedbackManagement/index.tsx
- management/src/styles/ktable.scss
- frontEnd/src/views/systemPages/FeedbackSubmit.tsx




## 修订说明（与 Ant Design 官方一致的实现）
- 依据最新确认：Ant Design Table 支持在 `tableLayout="auto"` 下使用列级 `minWidth`。为此我们做了如下修订：
  1) shared/src/components/KTable/index.tsx
     - 移除列映射时的 `width=100` 默认值，避免无意限制列自适应与 `minWidth` 生效；
     - 显式下传 `tableLayout={props.tableLayout ?? 'auto'}`，确保默认使用 `auto`，调用方可覆盖；
  2) management/src/pages/FeedbackManagement/index.tsx
     - “反馈内容”列采用 `minWidth: 420` 原生配置；
     - 移除此前通过 `onHeaderCell/onCell` 与类名兜底的样式做法；
     - 不再为容器添加 `management-table` 类，避免覆盖表头主题配色；
     - 显式传入 `tableLayout="auto"`（可选，KTable 默认即为 auto）；
  3) management/src/styles/ktable.scss
     - 删除为本页新增的 hover 文字色与列最小宽度覆盖片段，避免不必要样式干预。

- 变更清单修正：
  - shared/src/components/KTable/index.tsx（本次确认已发生代码变动）
