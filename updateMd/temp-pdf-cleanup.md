# 临时 PDF 清理策略

## 背景
- 生成的 PDF 文件保存在 `server/temp/pdf/YYYYMMDD/*.pdf` 下，长期积累会占用磁盘。
- 需要定期清理过期文件，保留最近 N 天的 PDF，默认 3 天。

## 实现
- 任务文件：`server/src/jobs/cleanupTemp.ts`
  - 启动函数：`setupTempPdfCleanup({ retentionDays, intervalMs })`
  - 仅清理 `server/temp/pdf/` 子树：
    - 优先识别日期目录 `YYYYMMDD`，超过保留天数则整目录移除。
    - 其他目录/文件按修改时间 (mtime) 判定，逐个删除。
    - 删除空目录（递归清理后）。
  - 关键日志：`[cleanup]` 前缀，便于定位。
- 注册位置：`server/main.ts`
  - 服务器启动成功后调用：
    ```ts
    const retentionDaysRaw = Number(process.env.TEMP_PDF_RETENTION_DAYS ?? 3)
    const intervalMsRaw = Number(process.env.TEMP_PDF_CLEAN_INTERVAL_MS ?? 24 * 60 * 60 * 1000)
    const retentionDays = Number.isFinite(retentionDaysRaw) ? retentionDaysRaw : 3
    const intervalMs = Number.isFinite(intervalMsRaw) ? intervalMsRaw : 24 * 60 * 60 * 1000
    setupTempPdfCleanup({ retentionDays, intervalMs })
    ```

## 配置项
- 环境变量（可选）：
  - `TEMP_PDF_RETENTION_DAYS`：保留天数（默认 3）。
  - `TEMP_PDF_CLEAN_INTERVAL_MS`：清理间隔毫秒（默认 24h）。
- 建议把以上变量写入 `server/.env`：
  ```env
  TEMP_PDF_RETENTION_DAYS=3
  TEMP_PDF_CLEAN_INTERVAL_MS=86400000
  ```

## 运维与风险
- 目录范围严格限制为 `server/temp/pdf/`，避免误删其他目录。
- 清理按“修改时间”与“日期目录名”判断，若系统时间异常可能影响判断。
- 若需要更精细调度（如每日 03:00），可改用 `node-cron`（需新增依赖），或在容器/宿主机层使用系统级计划任务。

## 验证步骤
1. 启动服务端（或重启）后观察控制台日志应出现：`[cleanup] 临时PDF清理任务已启动...`。
2. 在 `server/temp/pdf/` 下创建一个早于保留天数的日期目录，并放置测试文件。
3. 等待到清理周期或临时缩短 `TEMP_PDF_CLEAN_INTERVAL_MS` 后查看目录是否被清理。

## 变更记录
- 2025-10-21：新增清理任务与环境变量配置，默认保留 3 天，每日清理一次。
