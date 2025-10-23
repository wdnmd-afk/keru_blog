// monitor/controller.ts
// 系统监控控制器：健康检查、基础指标、日志读取（/api/monitor/*）

import { AuthMiddleware } from '@/middleware/auth'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, httpPost } from 'inversify-express-utils'
import { MonitorService } from './service'

@controller('/monitor', AuthMiddleware)
export class MonitorController extends BaseHttpController {
  constructor(@inject(MonitorService) private readonly service: MonitorService) {
    super()
  }

  /** GET /api/monitor/health */
  @httpGet('/health')
  public async health(_req: Request, res: Response) {
    const result = await this.service.health()
    ;(res as any).sendResponse(result)
  }

  /** GET /api/monitor/metrics */
  @httpGet('/metrics')
  public async metrics(_req: Request, res: Response) {
    const result = await this.service.metrics()
    ;(res as any).sendResponse(result)
  }

  /** GET /api/monitor/logs?offset=0&limit=200 */
  @httpGet('/logs')
  public async logs(req: Request, res: Response) {
    const offset = Number((req.query.offset as string) || 0)
    const limit = Number((req.query.limit as string) || 200)
    const result = await this.service.logsByType('app', offset, limit)
    ;(res as any).sendResponse(result)
  }

  /** GET /api/monitor/log-types */
  @httpGet('/log-types')
  public async logTypes(_req: Request, res: Response) {
    const result = await this.service.logTypes()
    ;(res as any).sendResponse(result)
  }

  /** GET /api/monitor/logs-by-type?category=app&offset=0&limit=200 */
  @httpGet('/logs-by-type')
  public async logsByType(req: Request, res: Response) {
    const category = String((req.query.category as string) || 'app')
    const offset = Number((req.query.offset as string) || 0)
    const limit = Number((req.query.limit as string) || 200)
    const result = await this.service.logsByType(category, offset, limit)
    ;(res as any).sendResponse(result)
  }

  /** POST /api/monitor/logs  客户端日志上报 */
  @httpPost('/logs')
  public async ingestClientLog(req: Request, res: Response) {
    const { source, type, level, message, context } = (req.body || {}) as any
    if (!message) {
      return (res as any).sendResponse({ success: false, code: 400, message: 'message 为必填' })
    }
    const result = await this.service.writeClientLog({ source, type, level, message, context })
    ;(res as any).sendResponse(result)
  }

  /** GET /api/monitor/db-logs?source=&type=&level=&keyword=&start=&end=&page=&pageSize=  数据库日志查询 */
  @httpGet('/db-logs')
  public async dbLogs(req: Request, res: Response) {
    const params = {
      source: (req.query.source as string) || undefined,
      type: (req.query.type as string) || undefined,
      level: (req.query.level as string) || undefined,
      keyword: (req.query.keyword as string) || undefined,
      start: (req.query.start as string) || undefined,
      end: (req.query.end as string) || undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
    }
    const result = await this.service.dbLogs(params)
    ;(res as any).sendResponse(result)
  }
}
