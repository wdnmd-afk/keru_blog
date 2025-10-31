- **[输出规范]**
  - 后端提示词已约束输出为“单段落纯文本”，不使用 Markdown/标题/编号/列表，不换行；默认目标约 120 字，可通过 `config.maxAdviceChars` 或环境变量覆盖。
# AI 医学检验建议（MedLab Advice）全链路实施与联调文档

更新时间：2025-10-31

## 目标

- 在服务端新增“AI 医学检验建议”接口，基于检验项目结果生成一段面向患者的建议文本。
- 将提示词、输出语言、最大字数、免责声明等可灵活调整内容抽离为配置，支持环境变量覆盖与运行时覆盖。
- 在管理端（Management）新增“医学检验建议（调试）”页面，位于 PDF 菜单下，支持导入 JSON 并调用后端接口生成建议，便于联调与验收。

## 技术栈

- Server：Node.js + Express + Inversify + Prisma（复用现有 AIService/DeepSeek 接入）
- Management：React18 + Vite + Ant Design + Axios（ManagementApi，基于 /management-api 前缀）
- AI 提供方：DeepSeek（OpenAI 兼容 SDK），通过 `DEEPSEEK_API_KEY`/`AI_API_KEY` 等环境变量配置

## 变更清单（代码路径）

- 服务端配置
  - `server/src/config/medlab.config.ts` 新增
    - `createMedLabAdviceConfig()`：读取环境变量生成配置
    - `buildMedLabPrompt()`：将患者信息、检验项目、上下文与配置拼接为提示词
- 服务端 DTO/Controller
  - `server/src/router/medlab/dto.ts` 新增
    - `MedLabAdviceDto`：校验输入结构（`patient` 可选；`items[]` 可选；`data[]` 可选用于模板兼容；`result` 统一为 string 以兼容 `>10`/`阴性` 等）
  - `server/src/router/medlab/controller.ts` 新增
    - `POST /api/ai/medlab/advice`（需登录）调用 `AIService.chat()` 生成建议
  - `server/src/router/medlab/parser.ts` 新增
    - `normalizeMedLabInput()`：将多源结构（含 test.json 模板）归一化为内部通用结构
    - `MedLabFieldMapping`：字段映射常量，文档化映射关系
  - 控制器注册
    - `server/src/router/controller.ts` 新增导出：`export * from './medlab/controller'`
    - `server/src/config/container.config.ts` 注册 `MedLabController`
- 管理端 API 与页面
  - `management/src/api/medlab.ts` 新增：`MedLabApi.generateAdvice()`
  - `management/src/api/index.ts` 导出 `MedLabApi`
  - `management/src/pages/PDFMedicalAdvice/index.tsx` 新增页面（导入/编辑 JSON，配置覆盖，生成建议）
  - 菜单与路由接入
    - `management/src/components/Layout/index.tsx` PDF 菜单下新增 `AI 检验建议`，并更新面包屑
    - `management/src/routes/index.tsx` 新增懒加载与私有路由 `/pdf-medical-advice`

## 环境变量与配置项

- AI 基础配置（已存在）
  - `DEEPSEEK_API_KEY` 或 `AI_API_KEY`（必填）
  - `DEEPSEEK_BASE_URL`/`AI_BASE_URL`（可选，默认 `https://api.deepseek.com`）
  - `DEEPSEEK_MODEL`/`AI_MODEL`（默认 `deepseek-chat`）
  - `DEEPSEEK_VISION_MODEL`（默认 `deepseek-reasoner`）
  - `AI_TIMEOUT_MS`（默认 60000）
- MedLab 建议配置（新增，均可选）
  - `MEDLAB_PROMPT_HEADER`：系统提示词开头（默认“你是一名严谨的临床检验医师助理...”）
  - `MEDLAB_LANGUAGE`：输出语言（默认 `zh-CN`）
  - `MEDLAB_MAX_ADVICE_CHARS`：建议正文目标字数（默认 `120`）
  - `MEDLAB_DISCLAIMER`：免责声明（默认“以上建议仅供健康科普...”）

## 接口说明

- 路径：`POST /api/ai/medlab/advice`（服务端），管理端通过 `/management-api/ai/medlab/advice`
- 鉴权：需要登录（沿用 `AuthMiddleware`），管理端自动携带 `Authorization`
- 请求体（与 `MedLabAdviceDto` 对应）：
```json
{
  "patient": { "gender": "男", "age": 32 },
  "items": [
    { "name": "白细胞计数(WBC)", "result": "10.8", "unit": "10^9/L", "refRange": "3.50-9.50", "sampleType": "全血", "method": "电阻抗法" },
    { "name": "C 反应蛋白(CRP)", "result": ">10", "unit": "mg/L", "refRange": "0-8", "sampleType": "血清" }
  ],
  "context": { "department": "体检中心" },
  "config": { "language": "zh-CN", "maxAdviceChars": 120 }
}
```
- 响应体：
```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": {
    "advice": "……（建议文本）",
    "conversationId": "..."
  }
}
```

## 管理端调试页面使用方法

- 入口：`管理后台 -> PDF -> AI 检验建议`
- 功能：
  - 导入 `JSON` 文件或在左侧文本框粘贴数据（不含个人隐私）
  - 可设置运行时覆盖：语言、最大字数、系统提示开头、免责声明
  - 点击“生成建议”后，右侧展示生成结果
  - 内置了一个示例 `SAMPLE_JSON` 可快速测试

## 全链路验证步骤（建议）

1. 准备环境变量：确保后端存在 `DEEPSEEK_API_KEY` 且可联网访问 DeepSeek/OpenAI 兼容接口。
2. 启动服务：
   - 后端 `pnpm --filter server dev`（或项目根并行脚本 `pnpm dev`）
   - 管理端 `pnpm --filter management dev`（默认通过 `/management-api` 代理到后端 `/api`）
3. 登录管理端，进入 `PDF -> AI 检验建议` 页面。
4. 粘贴/导入 `test.json`（或页面示例 JSON），点击“生成建议”。
5. 观察结果文本长度是否受 `maxAdviceChars` 约束、风格是否符合预期、是否包含免责声明。
6. 根据需要在 `.env` 中调整 `MEDLAB_*` 配置，或在页面覆盖配置，重复验证。

## 边界与风险分析

- **模型幻觉与医学合规**：
  - 已在提示词中要求“避免诊断结论、仅给建议与方向”，并附带免责声明。
  - 建议在生产环境增加关键字审查与人工复核流程。
- **结果值多样性**：
  - `result` 统一为 string，兼容数值、`>`/`<`、`阴性/阳性` 等表达。
  - 参考范围 `refRange` 不做数值解析，只作为上下文给模型。
- **安全与隐私**：
  - `patient` 字段仅用于上下文提示；页面与接口文档强调不应包含个人敏感信息（实名、证件号等）。
  - 目前不落库保存建议结果，避免敏感数据持久化（如需留痕，请新增明确脱敏策略与合规审查）。
- **可用性与稳定性**：
  - 接口已加 `rateLimitMiddleware`，降低滥用风险。
  - 依赖外部 AI 服务，需考虑网络/限流/超时（`AI_TIMEOUT_MS` 可调整）。

## 优化方向（可选）

- 根据各项目 `refRange` 与 `result` 解析出偏高/偏低标签，增强结构化输入，提升模型稳定性。
- 将常见检验项目的教育性解释固化在模板中，采用 RAG 或规则引擎先生成草稿，再由 LLM 润色。
- 增加多语言支持（`MEDLAB_LANGUAGE=en`），并在前端提供语言切换。
- 可将建议结果附回 PDF 模板中生成“检验建议报告”PDF。

## 验收标准（建议）

- 管理端页面可成功导入/编辑 JSON，点击生成后返回建议并受字数限制。
- 允许通过 `.env` 与运行时覆盖调整语言、提示词开头与免责声明。
- 接口校验严谨：支持 `items[]` 或 `data[]` 输入，后端统一归一化；`result` 为 string、禁止多余字段（由 `validationMiddleware` 白名单控制）。
- 无破坏既有功能：现有 AI、PDF、管理端菜单与路由均正常。

## 关联文件清单（便于回溯）

- Server
  - `server/src/config/medlab.config.ts`
  - `server/src/router/medlab/dto.ts`
  - `server/src/router/medlab/controller.ts`
  - `server/src/router/controller.ts`（新增导出）
  - `server/src/config/container.config.ts`（新增注册）
- Management
  - `management/src/api/medlab.ts`
  - `management/src/api/index.ts`（新增导出）
  - `management/src/pages/PDFMedicalAdvice/index.tsx`
  - `management/src/components/Layout/index.tsx`（菜单）
  - `management/src/routes/index.tsx`（路由）

---

如需进一步扩展为“PDF 报告生成”，可在 `Template` 模块中新增模板与变量，复用现有 `PDFContentFill` 与 `HtmlPdfService`。
