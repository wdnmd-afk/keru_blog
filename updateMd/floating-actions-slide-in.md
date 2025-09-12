# 浮动容器（右下角）滑入/滑出交互改造说明

## 目标与背景
- 组件：frontEnd/src/components/FloatingActions.tsx（样式：frontEnd/src/styles/floatingActions.module.scss）
- 目标：默认隐藏在屏幕右下角，仅留一条细线作触发区域；鼠标悬停滑入显示，离开后 3 秒自动隐藏；保持现有功能完整（帮助、设置、反馈、分享、返回顶部等）。

## 改造要点
1. 默认隐藏：
   - 使用 CSS `transform: translateX(110%)` 让主体浮层移出屏幕右侧，仅保留“细线触发区域”可见。
2. 悬停滑入：
   - 在外层容器 `floating_container` 上监听 `onMouseEnter`，清理倒计时并设置 `isOpen=true`，添加样式类 `.open`，触发 `translateX(0)` 的滑入动画（0.3s）。
3. 自动隐藏：
   - 在外层容器上监听 `onMouseLeave`，启动 `setTimeout(3000ms)` 倒计时；如果 3 秒内鼠标重新进入，`clearTimeout` 取消隐藏；倒计时完成后 `isOpen=false` 触发滑出。
4. 细线触发区域：
   - 在容器右侧添加 `.edge_trigger` 细线元素（宽约 3px，高约 60px），半透明主题蓝色，悬停可见度提升。
5. 响应式：
   - 小屏下调整边距与细线高度，以确保触控环境下不遮挡内容。

## 修改清单
- 样式：frontEnd/src/styles/floatingActions.module.scss
  - 新增 `.edge_trigger`（右侧细线触发）
  - 为 `.floating_actions` 增加过渡与默认隐藏的 transform；新增 `.open` 控制滑入
- 交互：frontEnd/src/components/FloatingActions.tsx
  - 新增 `isOpen` 状态与 `hideTimerRef` 定时器
  - 在外层容器增加 `onMouseEnter`/`onMouseLeave`
  - 新增右侧 `<div className={style.edge_trigger} />`

## 代码片段（节选）
```tsx:frontEnd/src/components/FloatingActions.tsx
// 打开/隐藏控制
const [isOpen, setIsOpen] = useState(false)
const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
const openContainer = () => { hideTimerRef.current && clearTimeout(hideTimerRef.current); setIsOpen(true) }
const scheduleHide = () => { hideTimerRef.current && clearTimeout(hideTimerRef.current); hideTimerRef.current = setTimeout(() => setIsOpen(false), 3000) }
...
<div className={style.floating_container} onMouseEnter={openContainer} onMouseLeave={scheduleHide}>
  <div className={style.edge_trigger} aria-hidden />
  <div className={`${style.floating_actions} ${isOpen ? style.open : ''}`}>...</div>
</div>
```

```scss:frontEnd/src/styles/floatingActions.module.scss
.floating_actions {
  transform: translateX(110%); // 默认隐藏
  transition: transform .3s ease;
  &.open { transform: translateX(0); } // 打开时滑入
}
.edge_trigger {
  position: absolute; right: 0; top: 50%; transform: translate(100%, -50%);
  width: 3px; height: 60px; background: rgba(94,131,187,.7); border-radius: 2px;
}
```

## 实施步骤
1. 更新样式文件与组件文件（已完成）。
2. 启动前端（或热更新）验证：
   - 默认仅见右侧细线；
   - 悬停细线 → 浮层 0.3s 滑入；
   - 鼠标离开发生 3s 倒计时，期间再次进入取消隐藏；
   - 3s 后自动滑出，仅保留细线；
   - 所有按钮点击功能正常。

## 风险与回滚
- 风险：
  - 极小屏设备上触发区域可能过小；已在样式中对高度做移动端适配。
  - 若存在外层容器遮挡，需检查 z-index（当前为 1000）。
- 回滚：
  - 撤销对 `floatingActions.module.scss` 与 `FloatingActions.tsx` 的本次改动即可恢复原样。

## 优化建议
- 针对触屏设备增加点击展开/收起按钮，避免误触。
- 增加“固定展开”开关由用户配置偏好（存 LocalStorage）。
- 为细线触发区域加入“浮层已折叠”提示的 Tooltip（移动端谨慎）。

