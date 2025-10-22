# 前台 PDF 生成器使用说明

## 概述
- 页面路径：`/pdf-generator`
- 功能流程：选择模板 → 填写数据（可视化表单或 JSON 文本）→ 预览 HTML → 生成 PDF 并在新窗口打开。
- 依赖接口：
  - `POST /api/template/query`（分页查询模板）
  - `GET /api/template/detail/:id`（获取模板详情，含 fields 配置）
  - `POST /api/htmlpdf/render-html`（返回 HTML 文本）
  - `POST /api/htmlpdf/generate`（生成 PDF，返回可访问 URL）
- 前台封装：`frontEnd/src/api/template.ts`；页面：`frontEnd/src/views/PDFGenerator/index.tsx`。

## 动态表单（fields）
- 如果模板在管理端配置了 `fields`（可在 `TemplateManagement` 的“字段定义(JSON)”填写），前台将显示“可视化表单”页签，可自动生成表单。
- 若没有配置 `fields`，默认显示“JSON 文本”页签，手动填写 JSON。

### fields JSON 结构约定
- 每个字段为一个对象，常用键：
  - `key`：字段路径（支持嵌套，如 `hospital.name`），会映射到模板变量 `{{hospital.name}}`。
  - `label`：表单显示名称。
  - `type`：控件类型，支持 `text`、`number`、`date`、`select`、`textarea`（其中 `number`/`date` 当前用 Input 简化，后续可替换为更合适的控件）。
  - `required`：是否必填。
  - `options`：当 `type=select` 时的下拉选项数组。
  - `placeholder`：占位提示。

示例：
```json
[
  { "key": "hospital.name", "label": "医院名称", "type": "text", "required": true },
  { "key": "patient.name", "label": "姓名", "type": "text", "required": true },
  { "key": "patient.gender", "label": "性别", "type": "select", "options": ["男", "女"] },
  { "key": "report.reportDate", "label": "报告日期", "type": "date" },
  { "key": "remarks", "label": "备注", "type": "textarea" }
]
```

## 使用步骤
1. 打开 `/pdf-generator`，点击“刷新模板”获取模板列表。
2. 在下拉中选择模板（支持显示模板类型标签 A4/A5/CUSTOM）。
3. 根据模板是否配置 `fields`：
   - 有 `fields`：切换到“可视化表单”页签，按需填写；表单变更会实时同步到“JSON 文本”。
   - 无 `fields`：在“JSON 文本”页签直接粘贴或编辑 JSON（与模板占位符对应）。
4. 点击“预览HTML”查看渲染结果；点击“生成PDF”在新窗口打开生成的 PDF。

## 注意事项
- 后端默认启用 HTML 安全清洗（`sanitize=true`），已允许 `style`、`img` 等标签与属性；若模板使用更多标签，请在 `server/src/router/htmlpdf/service.ts` 的 `sanitize()` 中扩展白名单。
- 字体建议通过 `/static/fonts` 引入，详见 `updateMd/fonts-and-env-setup.md`；模板中可使用 `@font-face` 控制字体以保证中英文渲染一致。
- 资源（图片等）建议放在 `/static/**` 下，模板中以绝对路径引用。
- 模板中的条件判断示例 `{{#if (eq this.flag 'H')}}...{{/if}}` 已支持（服务端已注册 Handlebars `eq` helper）。

## 常见问题
- 预览 HTML 返回空白：检查模板 HTML 是否完整；检查是否被 sanitize 移除了关键结构；或临时将 `sanitize=false` 测试。
- 生成 PDF 报错：检查服务端是否能找到浏览器可执行文件（`PUPPETEER_EXECUTABLE_PATH`）并查看日志。
- 字体不生效：确认 `/static/fonts/xxx.ttf` 能访问；模板已正确声明 `@font-face`；无头环境已具备相应字体。

## 验证清单
- 选择含 `fields` 的模板，表单渲染正常；切换 JSON 文本，数据互相同步。
- 预览 HTML 显示结构和样式正确；生成 PDF 可在新窗口打开。
- 资源与字体加载正常；无跨域和权限问题。

## 变更记录
- 2025-10-22：新增动态表单与 JSON 双模式；完善使用说明文档。
