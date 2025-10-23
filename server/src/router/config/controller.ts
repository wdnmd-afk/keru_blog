// config/controller.ts
// 配置管理控制器：提供前端配置与服务端配置的查询与保存接口（/api/config/*）

import { AuthMiddleware } from '@/middleware/auth'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, httpPost } from 'inversify-express-utils'
import { ConfigService, type FrontendConfig, type ServerSideConfig } from './service'

@controller('/config', AuthMiddleware)
export class ConfigController extends BaseHttpController {
  constructor(@inject(ConfigService) private readonly service: ConfigService) {
    super()
  }

  /**
   * 获取前端配置
   * GET /api/config/frontend
   */
  @httpGet('/frontend')
  public async getFrontend(_req: Request, res: Response) {
    try {
      const result = await this.service.getFrontendConfig()
      ;(res as any).sendResponse(result)
    } catch (error: any) {
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * 保存前端配置
   * POST /api/config/frontend
   */
  @httpPost('/frontend')
  public async saveFrontend(req: Request, res: Response) {
    try {
      const body = (req.body || {}) as Partial<FrontendConfig>
      const result = await this.service.saveFrontendConfig(body)
      ;(res as any).sendResponse(result)
    } catch (error: any) {
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * 获取服务端配置
   * GET /api/config/server
   */
  @httpGet('/server')
  public async getServer(_req: Request, res: Response) {
    try {
      const result = await this.service.getServerConfig()
      ;(res as any).sendResponse(result)
    } catch (error: any) {
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * 保存服务端配置
   * POST /api/config/server
   */
  @httpPost('/server')
  public async saveServer(req: Request, res: Response) {
    try {
      const body = (req.body || {}) as Partial<ServerSideConfig>
      const result = await this.service.saveServerConfig(body)
      ;(res as any).sendResponse(result)
    } catch (error: any) {
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }
}
