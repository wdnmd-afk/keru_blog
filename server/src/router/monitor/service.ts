import { injectable } from 'inversify'
import os from 'os'
import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import { Result } from '@/utils'

@injectable()
export class MonitorService {
  // 读取服务器健康状态（后续可扩展 DB/Redis 自检）
  public async health() {
    try {
      const uptime = process.uptime()
      const now = Date.now()
      return Result.success({ status: 'ok', uptime, timestamp: now })
    } catch (e: any) {
      return Result.error(500, e?.message || 'health check failed')
    }
  }

  // 基础指标（CPU/内存/负载/进程）
  public async metrics() {
    try {
      const totalMem = os.totalmem()
      const freeMem = os.freemem()
      const usedMem = totalMem - freeMem
      const load = os.loadavg?.() || []
      const cpus = os.cpus()?.length || 0
      const proc = process.memoryUsage()
      const pid = process.pid
      const uptime = process.uptime()
      return Result.success({
        system: {
          platform: os.platform(),
          release: os.release(),
          arch: os.arch(),
          cpus,
          loadAvg: load,
          totalMem,
          freeMem,
          usedMem,
        },
        process: {
          pid,
          uptime,
          rss: proc.rss,
          heapTotal: proc.heapTotal,
          heapUsed: proc.heapUsed,
          external: (proc as any).external,
        },
      })
    } catch (e: any) {
      return Result.error(500, e?.message || 'metrics failed')
    }
  }

  /**
   * 返回可用日志类别
   */
  public async logTypes() {
    return Result.success(['app', 'access', 'error', 'management', 'frontend'])
  }

  /**
   * 读取分类日志（按行切片返回）
   * @param category 日志类别：app/access/error/management
   * @param offset 从文件尾部偏移的行数
   * @param limit 返回的最大行数
   */
  public async logsByType(category: string = 'app', offset = 0, limit = 200) {
    try {
      const dir = path.resolve(process.cwd(), 'logs')
      const filename = this.resolveLogFile(category)
      const logPath = path.resolve(dir, filename)
      if (!fs.existsSync(logPath)) return Result.success({ total: 0, lines: [] })
      const text = await fsp.readFile(logPath, 'utf-8')
      const lines = text.split(/\r?\n/)
      const total = lines.length
      const start = Math.max(0, total - limit - offset)
      const end = Math.max(0, total - offset)
      const slice = lines.slice(start, end)
      return Result.success({ total, lines: slice })
    } catch (e: any) {
      return Result.error(500, e?.message || 'read logs failed')
    }
  }

  /**
   * 客户端日志上报（管理端/前台均可复用），写入到 logs/management/YYYYMMDD.log
   */
  public async writeClientLog(data: { source?: string; level?: string; message: string; context?: any }) {
    try {
      const dateKey = this.getDateKey()
      // 根据 source 路由到 logs/<category>/YYYYMMDD.log（仅允许白名单内类别）
      const allow = new Set(['management', 'frontend'])
      const category = (data.source || 'management').toLowerCase()
      const safeCategory = allow.has(category) ? category : 'management'
      const dir = path.resolve(process.cwd(), 'logs', safeCategory)
      await fsp.mkdir(dir, { recursive: true })
      const file = path.resolve(dir, `${dateKey}.log`)
      const entry = {
        ts: new Date().toISOString(),
        source: safeCategory,
        level: data.level || 'info',
        message: data.message,
        context: data.context || null,
      }
      await fsp.appendFile(file, JSON.stringify(entry) + '\n', 'utf-8')
      return Result.success(true)
    } catch (e: any) {
      return Result.error(500, e?.message || 'write client log failed')
    }
  }

  /** 解析日志文件名 */
  private resolveLogFile(category: string): string {
    switch ((category || '').toLowerCase()) {
      case 'access':
        return 'access.log'
      case 'error':
        return 'error.log'
      case 'management':
        // 返回最近一天的管理端上报日志（按天文件），此处读取当天文件
        return path.join('management', `${this.getDateKey()}.log`)
      case 'frontend':
        return path.join('frontend', `${this.getDateKey()}.log`)
      case 'app':
      default:
        return 'app.log'
    }
  }

  /** 日期 key：YYYYMMDD */
  private getDateKey() {
    const d = new Date()
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}${mm}${dd}`
  }
}
