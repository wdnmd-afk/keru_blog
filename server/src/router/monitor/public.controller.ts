import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost } from 'inversify-express-utils'
import { MonitorService } from './service'

/**
 * 公共监控控制器（无需登录）
 * 根路径：/api/public/monitor
 */
@controller('/public/monitor')
export class PublicMonitorController extends BaseHttpController {
  constructor(@inject(MonitorService) private readonly service: MonitorService) {
    super()
  }

  /**
   * 客户端日志上报（公开接口）
   * POST /api/public/monitor/logs
   * body: { source?: 'frontend'|'management', type?: string, level?: 'info'|'warn'|'error', message: string, context?: any }
   */
  @httpPost('/logs')
  public async ingestClientLog(req: Request, res: Response) {
    const { source = 'frontend', type = 'client_log', level = 'info', message, context } = (req.body || {}) as any
    if (!message || typeof message !== 'string') {
      return (res as any).sendResponse({ success: false, code: 400, message: 'message 为必填且需为字符串' })
    }

    // 写入文件与数据库
    const result = await this.service.writeClientLog({ source, type, level, message, context })
    ;(res as any).sendResponse(result)
  }
}
