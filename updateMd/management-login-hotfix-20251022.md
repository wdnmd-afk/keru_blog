# Management Login Hotfix (2025-10-22)

## 背景
- 现象：清空浏览器缓存后首次访问，登录页可能白屏或停留不跳转；控制台打印“已登录跳转 dashboard”，但仍在登录页。
- 另有“登出 404”问题：`POST /management-api/user/logout` 无对应服务端路由。

## 根因分析
- React 18 开发模式 StrictMode 使 `useEffect` 在开发环境下二次执行，和“检测到本地 token 即跳转”的逻辑叠加，容易出现多次跳转时序问题。
- 401 统一处理采用弹窗确认，可能造成多次/并发跳转引发闪烁。
- 登录页仅依据“本地是否存在 token”判断，token 失效（过期/签名变化）时会跳到受限页后又被 401 拉回登录，循环造成体验不佳。
- 服务端缺失 `/api/user/logout` 导致管理端登出 404。

## 改动清单
- 服务端（Node.js + Express + Inversify）
  - `server/src/router/user/controller.ts`
    - 新增 `@PostMapping('/logout')` 路由，返回统一成功结构。
  - `server/src/router/user/service.ts`
    - 新增 `logout()` 方法：无状态 JWT，直接返回 `Result.success("退出登录成功")`。
- 管理端（React18 + Vite + AntD）
  - `management/src/utils/http/index.ts`
    - 401 处理改为“一次性清理并 replace 跳转 /login”，加入静态标记 `redirectingUnauthorized` 防重复跳转，移除弹窗确认，减少闪烁。
  - `management/src/views/Login/index.tsx`
    - 新增 `isJwtValid(bearerToken)`：解析 Bearer JWT 的 payload，验证 `exp`；无 `exp` 视为有效。
    - 增加 `checkedRef`，保证首屏登录校验仅执行一次，避免 StrictMode 二次执行导致重复跳转。
    - token 有效时使用 `window.location.replace('/dashboard')` 硬跳转，避免路由上下文差异导致停留在登录页。
    - 新增首屏 `checking` 与登录中的 `loading` 覆盖层，提供可视的加载反馈。
  - `management/src/routes/index.tsx`
    - 在 `/login` 路由处：若已认证（从本地存储读取）则直接 `<Navigate to="/dashboard" replace />`，避免停留在登录页。

## 验证步骤
1. 清空浏览器缓存与本地存储，访问管理端：
   - 登录页应正常显示（无白屏）。
2. 输入正确账号密码登录：
   - 弹“登录成功”，并直接进入 `/dashboard`。
3. 保持登录状态刷新页面：
   - 直接进入 `/dashboard`，不会停留在 `/login`。
4. 令 token 失效（或过期）：
   - 访问任意受限页应被一次性重定向到 `/login`，无反复闪烁。
5. 点击登出：
   - `POST /management-api/user/logout` 返回 200，清理本地凭据并回到登录页。

## 风险与回退
- 401 处理从确认弹窗改为直接 replace 登录，会改变原交互；如需回退，可恢复弹窗并移除静态防抖标记。
- 强制 `window.location.replace` 为硬跳转，若部署在子路径（非根 `/`）需调整为绝对路径（示例：`/admin/dashboard`）。

## 建议与后续
- 可增加 `/user/whoami` 接口用于首屏轻量校验 token，提升稳态；也可在渲染私有路由前做一次 whoami 检查。
- 生产环境关闭 StrictMode，以免开发期双执行行为影响判断。
- 若有多环境（测试、公网）部署，建议将基路径与登录跳转地址放入配置。
