# MySQL 模式下 `mode: "insensitive"` 导致的 Prisma 查询错误修复说明

## 背景
- 错误位置：`server/src/router/feedback/service.ts:66`
- 错误类型：`PrismaClientValidationError`，提示 Unknown argument `mode`
- 数据库：MySQL（根据 `schema.prisma`）
- Prisma 版本：5.17.0

在 Prisma 中，`mode: "insensitive"` 仅在 PostgreSQL 上支持。MySQL 的大小写敏感受列的排序规则（collation）控制，常见 `*_ci` 结尾（case-insensitive）为不区分大小写。

## 变更摘要
- 移除 feedback 模块查询中 `mode: 'insensitive'` 参数：
  - user 条件（userName/userEmail 的 contains）
  - keyword 条件（content 的 contains）
- 依赖 MySQL 默认的列排序规则（通常为不区分大小写）完成模糊匹配。

## 代码改动
- 文件：`server/src/router/feedback/service.ts`
- 主要片段：
```ts
if (user) {
  where.OR = [
    { userName: { contains: user } },
    { userEmail: { contains: user } },
  ]
}
if (keyword) {
  where.content = { contains: keyword }
}
```

## 验证步骤（管理端）
1. 打开“意见反馈管理”页面，应正常加载列表，无 Prisma 验证错误。
2. 使用“用户/关键词”搜索，接口成功返回，分页仍可用（skip/take 未变）。
3. 翻页、切换筛选（状态/分类/时间范围）均正常。

## 如需保持大小写不敏感的保证方案
- 优先方案：确保相关列使用 `*_ci`（case-insensitive）排序规则（如 `utf8mb4_0900_ai_ci`）。
- 备选方案（不推荐）：使用 `queryRaw` + `LOWER()` 包装进行手动大小写处理（损失类型安全与可移植性）。

## 风险与回滚
- 风险：若当前列使用大小写敏感排序规则（`*_cs`），移除 `mode` 可能变为区分大小写；请确认数据库列的排序规则。
- 回滚：如需回滚，可恢复旧代码（带 `mode`），但在 MySQL 上依旧会报错，不建议。

## 建议
- 在生产库确认反馈表相关列（如 userName、userEmail、content）的排序规则为 `*_ci`，以保证模糊匹配不区分大小写。
