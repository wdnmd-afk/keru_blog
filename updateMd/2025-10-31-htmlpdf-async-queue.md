# HTML→PDF 异步队列方案落地说明（Redis）

- 日期：2025-10-31
- 模块：server/htmlpdf、frontEnd/files
- 变更类型：新增异步接口 + 后台消费者（与同步接口兼容并存）

## 背景
- 前端使用 axios 调用同步生成接口在大体积 HTML 时容易超过浏览器/代理/axios 超时，出现 `canceled` 或 30s 导航超时。
- 需求：把生成流程做成异步，后端慢慢生成，前端仅拿 `jobId` 轮询状态（或后续用 WebSocket 推送）。

## 技术决策
- 现有仓库已集成 `ioredis`，因此优先使用 **Redis 简易队列** 实现（无需新增 RabbitMQ）。
- 队列模型：`rpush + brpop`，任务状态用 Hash 存储。
- TTL：任务信息默认保留 3 天（可配 `PDF_JOB_TTL_SECONDS`），避免 Redis 膨胀。

## 接口与数据结构
- 入队生成（异步）：
  - `POST /api/htmlpdf/enqueue-raw`
  - 入参：与同步 `/generate-raw` 一致：`{ html, options? }`
  - 返回：`{ jobId }`
- 查询任务：
  - `GET /api/htmlpdf/job/:id`
  - 返回：
    ```json
    {
      "jobId": "uuid",
      "status": "queued|processing|done|error",
      "url": "/temp/pdf/20251031/xxx.pdf",
      "fileName": "xxx.pdf",
      "size": 12345,
      "error": "(可选)",
      "createdAt": "ISO",
      "updatedAt": "ISO"
    }
    ```

## 服务端实现
- 新增文件：`server/src/router/htmlpdf/job.service.ts`
  - `PdfJobService`：
    - `enqueueRaw(req)`：写入 Hash，推入队列，返回 `jobId`。
    - `getStatus(jobId)`：读取 Hash 并格式化返回。
    - `startConsumer()`：`BRPOP` 消费队列，调用 `HtmlPdfService.generatePdfFromRaw()` 实际生成 PDF，写回结果状态。
    - TTL 默认 3 天（`PDF_JOB_TTL_SECONDS`），可配置。
- 依赖注入：`server/src/config/container.config.ts`
  - `TYPES.PdfJobService` 注册，单例启动消费者。
- 控制器：`server/src/router/htmlpdf/controller.ts`
  - 新增：`POST /enqueue-raw`、`GET /job/:id` 两个接口。
  - 仍保留：同步的 `POST /generate-raw`，与队列方案并存。

## 前端接入建议
- 1) 发送异步生成：调用 `/htmlpdf/enqueue-raw`，获得 `jobId`；
- 2) 轮询查询：每 1~2s 调用 `/htmlpdf/job/:id`，直到 `status = done|error`；
- 3) 展示结果：`done` 时展示 `data.url`（/temp/** 可直接访问 PDF）。
- 4) 退避策略：请求间隔指数退避上限 3~5s，避免对服务端造成压力。
- 5) 取消轮询：当用户切换页面/点击取消时，清除定时器；（可选）后端新增取消任务接口。

## 环境变量
- `PDF_JOB_TTL_SECONDS`：任务 Hash TTL（默认 259200 = 3 天）
- Redis 连接：`REDIS_HOST/REDIS_PORT/REDIS_PASSWORD/REDIS_DB`（已在项目中使用 ioredis 统一管理）。

## 流程图（简化）
```
FrontEnd --enqueue-raw--> Server --> Redis(Queue)
FrontEnd <--jobId--------
FrontEnd --poll job/:id--> Server --read hash--> Redis
FrontEnd <--done/url------
```

## 验证步骤
1. 确保 Redis 可用（本地默认 6379）。
2. 启动后端（确保 `PdfJobService` 启动成功日志无报错）。
3. 前端在“HTML转PDF”页面使用“异步模式”按钮（或手动调用 API）发起入队；
4. 观察网络请求：`enqueue-raw` 快速返回 jobId；`job/:id` 轮询直到 done，拿到 `url` 能正常打开。

## 风险与回滚
- 风险：Redis 连接异常导致队列不可用；消费者异常退出导致任务堆积。
  - 对策：ioredis 自动重连；消费者异常会记录日志并短暂停顿继续循环。
- 回滚：前端切回同步 `generate-raw` 流程；后端保留原接口不受影响。

## 后续优化（可选）
- WebSocket 推送任务状态，替代轮询；
- 增加取消任务接口；
- 队列指标监控（任务耗时、失败率、在队列长度等）。
