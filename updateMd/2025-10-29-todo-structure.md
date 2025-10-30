# todo/ 协作任务清单结构与使用说明

- 日期：2025-10-29
- 影响范围：仓库根目录 `todo/` 文件夹（纯文档，无代码改动）
- 目的：在多项目并行开发场景下，提供统一、可追溯、可复现的任务管理清单格式，方便多人协作。

## 目录结构
- `todo/README.md`：索引与协作规范
- `todo/whiteboard.md`：实时协作白板（React + Yjs + WebSocket）
- `todo/dynamic-dashboard.md`：动态仪表盘（Vue + D3.js + Web Workers）
- `todo/pwa-video-editor.md`：PWA 离线视频编辑器（React + Workbox + WebAssembly）
- `todo/privacy-chat.md`：隐私保护聊天（React + Signal Protocol + WebSocket）
- `todo/dynamic-form.md`：动态表单生成与验证（Vue + FormKit + Yup）
- `todo/timeline-editor.md`：交互式时间线编辑器（React + Konva.js + jsPDF）

## 文件模板要点
每个子文件采用一致的章节：
- 目标（明确业务/技术目标）
- 技术栈（框定主要依赖与运行环境）
- 难点（聚焦工程挑战以便优先分配资源）
- 里程碑（M0~M5）
- 任务清单（可勾选）
- 指标/验收标准（可量化）
- 风险与应对（预案）

## 协作规范
- 所有任务描述与讨论采用中文。
- 功能类 PR 需在 `updateMd/` 同步新增或更新执行文档（目的/步骤/风控/验证），并在 todo 清单勾选对应项。
- 重大架构/协议变更需单独文档并在 README 索引中标注。

## 命名与状态
- 任务采用“模块-动作-结果”式描述，避免模糊（例如：`白板-离线快照-增量回放`）。
- 使用勾选框 `[ ]/[x]` 标注状态；必要时在条目尾部附简短备注。

## 风险与注意
- 文档与实现可能出现偏差：强制在合并时同步更新 todo 与 updateMd。
- 多项目协同时，注意避免跨项目依赖失配（在文件开头标注关键外部约束）。

## 回滚策略
- 文档类改动可直接回滚 PR；不影响运行代码。

## 结论
- 已建立统一的 todo 清单结构，覆盖 6 个子项目与总览索引；可直接用于 Sprint 计划与跨团队协作。
