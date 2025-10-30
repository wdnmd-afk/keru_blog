# TODO 项目总览

> 协作规范：
> - 所有任务、讨论与提交说明统一使用中文。
> - 提交功能类 PR 时，需在 `updateMd/` 增补对应的执行文档（含目的/步骤/风控/验证）。
> - 每个子项目的任务清单请在对应文件下维护并勾选完成状态。

## 目录
- [实时协作白板（React + Yjs + WebSocket）](./whiteboard.md)
- [动态仪表盘生成（Vue + D3 + Web Workers）](./dynamic-dashboard.md)
- [PWA 离线视频编辑器（React + Workbox + WebAssembly）](./pwa-video-editor.md)
- [隐私保护的实时聊天（React + Signal Protocol + WebSocket）](./privacy-chat.md)
- [动态表单生成与验证（Vue + FormKit + Yup）](./dynamic-form.md)
- [交互式时间线编辑器（React + Konva.js + jsPDF）](./timeline-editor.md)

## 状态标记
- [ ] Planned（规划中）
- [ ] In Progress（进行中）
- [ ] Review（评审/验收）
- [ ] Done（完成）

## 里程碑模板
- M0 项目初始化
- M1 核心功能 v1
- M2 扩展功能 v2
- M3 性能与体验优化
- M4 测试/可观测性/文档
- M5 上线与回滚预案

## 贡献清单
- 创建任务：在对应文件添加条目，附带验收标准。
- 更新状态：使用勾选框同步任务进展。
- 重大架构/协议变更：务必在 `updateMd/` 新增专门文档并通知所有协作者。
