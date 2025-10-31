// htmlpdf/job.service.ts
// 使用 Redis 实现 PDF 生成的异步队列（简单可靠，无需新增外部依赖）

import { inject, injectable } from 'inversify'
import Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'
import { HtmlPdfService } from './service'
import type { GeneratePdfFromHtmlRequest, GeneratePdfResult } from './types'

/** 任务状态 */
export type PdfJobStatus = 'queued' | 'processing' | 'done' | 'error'

/** 队列与键名 */
const QUEUE_KEY = 'pdf:queue'
const JOB_KEY = (id: string) => `pdf:job:${id}`

/** 任务结构（队列内存放的轻量对象） */
interface QueueItem {
  id: string
  mode: 'raw'
}

/** 存储在 Redis Hash 的键 */
const enum JobFields {
  status = 'status',
  payload = 'payload',
  url = 'url',
  fileName = 'fileName',
  size = 'size',
  error = 'error',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

/** 任务结果响应 */
export interface PdfJobStatusResponse {
  jobId: string
  status: PdfJobStatus
  url?: string
  fileName?: string
  size?: number
  error?: string
  createdAt: string
  updatedAt: string
}

@injectable()
export class PdfJobService {
  private running = false
  private stopped = false
  private ttlSeconds: number

  constructor(
    // 使用字符串令牌注入，避免与 container.config.ts 的循环依赖导致“Cannot access 'TYPES' before initialization”
    @inject('Redis') private readonly redis: Redis,
    @inject(HtmlPdfService) private readonly htmlPdf: HtmlPdfService
  ) {
    // 任务保留时间（秒），默认 3 天
    const ttl = Number(process.env.PDF_JOB_TTL_SECONDS)
    this.ttlSeconds = Number.isFinite(ttl) && ttl > 0 ? ttl : 3 * 24 * 60 * 60
    // 启动消费者
    this.startConsumer().catch(err => {
      console.error('[PdfJobService] startConsumer error:', err)
    })
  }

  /** 入队：原始 HTML → PDF */
  public async enqueueRaw(req: GeneratePdfFromHtmlRequest): Promise<{ jobId: string }> {
    // 生成任务ID
    const jobId = uuidv4()
    const key = JOB_KEY(jobId)
    const now = new Date().toISOString()

    // 将请求参数序列化入 hash（便于消费者读取）
    const payload = JSON.stringify(req)

    await this.redis.hmset(key, {
      [JobFields.status]: 'queued',
      [JobFields.payload]: payload,
      [JobFields.createdAt]: now,
      [JobFields.updatedAt]: now,
    })
    await this.redis.expire(key, this.ttlSeconds)

    // 推入队列
    const item: QueueItem = { id: jobId, mode: 'raw' }
    await this.redis.rpush(QUEUE_KEY, JSON.stringify(item))

    return { jobId }
  }

  /** 查询任务状态 */
  public async getStatus(jobId: string): Promise<PdfJobStatusResponse | null> {
    const key = JOB_KEY(jobId)
    const data = await this.redis.hgetall(key)
    if (!data || Object.keys(data).length === 0) return null
    return {
      jobId,
      status: (data[JobFields.status] as PdfJobStatus) || 'queued',
      url: data[JobFields.url],
      fileName: data[JobFields.fileName],
      size: data[JobFields.size] ? Number(data[JobFields.size]) : undefined,
      error: data[JobFields.error],
      createdAt: data[JobFields.createdAt],
      updatedAt: data[JobFields.updatedAt],
    }
  }

  /** 后台消费者：阻塞弹出任务并处理 */
  private async startConsumer() {
    if (this.running) return
    this.running = true

    // 确保 Redis 已连接
    try {
      if (!(this.redis as any).status || (this.redis as any).status !== 'ready') {
        await this.redis.connect().catch(() => void 0)
      }
    } catch {}

    // 长循环消费者
    while (!this.stopped) {
      try {
        const res = (await this.redis.brpop(QUEUE_KEY, 5)) as [string, string] | null
        if (!res) continue
        const [, raw] = res
        const item = JSON.parse(raw) as QueueItem
        const key = JOB_KEY(item.id)

        // 标记 processing
        await this.redis.hmset(key, {
          [JobFields.status]: 'processing',
          [JobFields.updatedAt]: new Date().toISOString(),
        })

        // 读取 payload
        const payloadStr = await this.redis.hget(key, JobFields.payload)
        if (!payloadStr) throw new Error('payload missing')

        let result: GeneratePdfResult | null = null
        try {
          if (item.mode === 'raw') {
            const req = JSON.parse(payloadStr) as GeneratePdfFromHtmlRequest
            result = await this.htmlPdf.generatePdfFromRaw(req)
          } else {
            throw new Error(`unsupported mode: ${item.mode}`)
          }

          // 写入结果并完成
          await this.redis.hmset(key, {
            [JobFields.status]: 'done',
            [JobFields.url]: result.url,
            [JobFields.fileName]: result.fileName,
            [JobFields.size]: String(result.size ?? 0),
            [JobFields.updatedAt]: new Date().toISOString(),
          })
          await this.redis.expire(key, this.ttlSeconds)
        } catch (err: any) {
          await this.redis.hmset(key, {
            [JobFields.status]: 'error',
            [JobFields.error]: err?.message || String(err),
            [JobFields.updatedAt]: new Date().toISOString(),
          })
          await this.redis.expire(key, this.ttlSeconds)
        }
      } catch (e) {
        // 记录错误并短暂休眠，避免空转日志刷屏
        console.error('[PdfJobService] consumer error:', e)
        await new Promise(r => setTimeout(r, 1000))
      }
    }
  }
}
