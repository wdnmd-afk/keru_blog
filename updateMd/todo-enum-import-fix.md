# Server TodoType 导出缺失修复说明

## 背景
运行服务端时出现如下错误：
```
SyntaxError: The requested module '@prisma/client' does not provide an export named 'TodoType'
```
定位到 `server/src/router/todo/dto.ts` 直接从 `@prisma/client` 导入 `TodoType`，而本地 prisma 客户端尚未生成或其导出与代码不一致，导致运行时崩溃。

## 修复方案（已实施）
- 去除对 `@prisma/client` 的直接枚举导入，改为在 `dto.ts` 本地定义与 Prisma 枚举一致的字符串枚举，并提供字符串联合类型用于 DTO。
- 这样既能通过 `class-validator` 的 `IsEnum` 校验，又能与 Prisma 的枚举字符串值无缝兼容（服务层向 Prisma 传递的依然是 `'RECENT' | 'LONG_TERM' | 'STUDY_PLAN'`）。

## 变更文件
- server/src/router/todo/dto.ts
  - 新增本地枚举 `TodoTypeEnum` 与类型别名 `TodoTypeString`
  - `CreateTodoDto.type`、`UpdateTodoDto.type` 改为 `TodoTypeString`

## 验证指引（Windows）
1. 若需要切回使用 Prisma 官方类型，请先生成客户端：
   - 打开终端，进入 `server` 目录
   - 执行（需要已安装 prisma 且配置了 DATABASE_URL）：
     - `npx prisma generate`
2. 在未生成 Prisma 客户端的情况下，当前修复即可避免运行时报错，接口功能不受影响。

## 风险与回滚
- 风险：未来若需要强类型对齐 Prisma 的 `TodoType`，需在客户端生成后，将 DTO 的类型改回官方导出，并移除本地枚举。
- 回滚：将 `dto.ts` 的导入改回 `from '@prisma/client'` 并删除本地枚举定义（前提是已 `prisma generate`）。

## 后续建议
- 在 CI 中增加 prisma generate 步骤，确保 `@prisma/client` 导出与 schema 同步。
- 如需在 DTO 层保持与 Prisma 完全同构，可在生成后提供一个类型适配层，避免直接耦合到生成物。 

