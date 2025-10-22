# 字体与运行环境策略（HTML→PDF）

## 目标
- 确保 HTML→PDF 渲染在不同操作系统/容器环境下中文显示稳定。
- 明确 `puppeteer-core` 的浏览器执行路径与网络策略。

## 浏览器执行路径
- 我们使用 `puppeteer-core`，不会自动下载浏览器；需系统内存在可执行浏览器，或设置环境变量：
  - Windows Chrome：`C:\Program Files\Google\Chrome\Application\chrome.exe`
  - Windows Edge：`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
  - Linux：`/usr/bin/google-chrome`、`/usr/bin/chromium-browser`、`/usr/bin/chromium`
  - macOS：`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- 服务启动前设置（示例）：
  ```cmd
  set PUPPETEER_EXECUTABLE_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe && pnpm --filter server dev
  ```
- 代码位置：`server/src/router/htmlpdf/service.ts` 的 `resolveExecutablePath()` 已内置常见路径 + 环境变量解析。

## 字体策略
- 模板缺省字体：`'Microsoft YaHei', SimSun, Arial`（已在模板示例中内联）。
- 建议提供专用中文字体，统一渲染结果：
  1. 将字体文件放入 `server/upload/fonts/`（或你配置的 `config.upload.uploadDir/fonts`）。
  2. 通过静态目录 `/static` 暴露（`main.ts` 已配置）。访问路径示例：`/static/fonts/NotoSansSC-Regular.ttf`。
  3. 在模板 HTML 中加入 `@font-face`（建议放在 `<style>` 中）：
     ```html
     <style>
       @font-face {
         font-family: 'NotoSansSC';
         src: url('/static/fonts/NotoSansSC-Regular.ttf') format('truetype');
         font-weight: normal;
         font-style: normal;
       }
       body { font-family: 'NotoSansSC', 'Microsoft YaHei', SimSun, Arial; }
     </style>
     ```
- 容器/服务器未安装系统中文字体时，务必通过上述方式引入字体。

## 资源加载
- 图片等资源建议放置于 `/static/**`，模板通过绝对路径引用：`<img src="/static/img/logo.png" />`。
- `sanitize-html` 已允许 `img/style` 与 `class/id` 属性，确保基本样式/图片可用；如需扩展白名单，修改 `server/src/router/htmlpdf/service.ts` 中的 `sanitize()`。

## 网络与镜像
- 如将来改回 `puppeteer`（非 core），可通过 `server/.npmrc` 配置镜像以加速浏览器下载：
  ```ini
  registry=https://registry.npmmirror.com
  puppeteer_download_host=https://registry.npmmirror.com/-/binary/chromium-browser-snapshots
  shamefully-hoist=true
  ```
- 生产环境建议固定浏览器版本与路径，避免自动升级导致渲染差异。

## 验证清单
- 设置 `PUPPETEER_EXECUTABLE_PATH` 后，调用 `/api/htmlpdf/render-html` 与 `/api/htmlpdf/generate` 正常。
- 模板在生产与开发环境渲染结果一致（尤其是中文/表格/分页）。
- 通过 `/static/fonts` 成功加载字体（可临时关闭网络校验本地字体加载）。

## 变更记录
- 2025-10-21：新增字体与运行环境策略文档。