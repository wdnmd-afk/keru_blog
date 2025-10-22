// 临时 PDF 清理任务（server/src/jobs/cleanupTemp.ts）
// 功能：定期清理 `temp/pdf` 目录下超过保留天数的 PDF 文件与空目录，避免磁盘空间占用过大
// 说明：
// - 默认保留 3 天，可通过环境变量 TEMP_PDF_RETENTION_DAYS 配置
// - 默认每天执行一次，可通过 TEMP_PDF_CLEAN_INTERVAL_MS 配置（毫秒）
// - 仅清理 temp/pdf 子目录，且优先匹配 YYYYMMDD 目录名，非匹配目录按文件 mtime 判定
// - 所有删除操作都有简单日志，便于定位

import path from 'path'
import fs from 'fs-extra'

let _timer: NodeJS.Timeout | null = null

export interface CleanupOptions {
  retentionDays?: number // 保留天数
  intervalMs?: number // 执行间隔（毫秒）
}

/**
 * 启动临时 PDF 清理任务
 */
export function setupTempPdfCleanup(options: CleanupOptions = {}) {
  const retentionDays = Number.isFinite(options.retentionDays as number)
    ? (options.retentionDays as number)
    : 3
  const intervalMs = Number.isFinite(options.intervalMs as number) && (options.intervalMs as number) > 0
    ? (options.intervalMs as number)
    : 24 * 60 * 60 * 1000 // 默认 1 天

  // 避免重复注册
  if (_timer) clearInterval(_timer)

  const runOnce = async () => {
    try {
      const root = path.resolve(process.cwd(), 'temp', 'pdf')
      const now = new Date()
      const exists = await fs.pathExists(root)
      if (!exists) {
        // 目录不存在无需处理
        return
      }

      const items = await fs.readdir(root, { withFileTypes: true } as any)
      for (const it of items) {
        const full = path.join(root, it.name)
        try {
          if ((it as any).isDirectory?.()) {
            // 优先按 YYYYMMDD 目录名判断
            const m = it.name.match(/^(\d{4})(\d{2})(\d{2})$/)
            if (m) {
              const y = Number(m[1])
              const mo = Number(m[2]) - 1
              const d = Number(m[3])
              const dirDate = new Date(y, mo, d)
              const ageDays = Math.floor((now.getTime() - dirDate.getTime()) / 86400000)
              if (ageDays > retentionDays) {
                await fs.remove(full)
                console.log(`[cleanup] 删除过期目录: ${full} (${ageDays}d)`) 
                continue
              }
            }
            // 非日期目录或未过期：按文件 mtime 逐个清理
            await cleanFilesByMtime(full, retentionDays, now)
            // 尝试删除空目录
            const remain = await fs.readdir(full)
            if (remain.length === 0) {
              await fs.remove(full)
              console.log(`[cleanup] 删除空目录: ${full}`)
            }
          } else {
            // 根目录下的散落文件：按 mtime 判定
            const s = await fs.stat(full)
            const ageDays = Math.floor((now.getTime() - s.mtime.getTime()) / 86400000)
            if (ageDays > retentionDays) {
              await fs.remove(full)
              console.log(`[cleanup] 删除过期文件: ${full} (${ageDays}d)`) 
            }
          }
        } catch (e) {
          console.warn(`[cleanup] 处理失败: ${full}`, e)
        }
      }
    } catch (err) {
      console.error('[cleanup] 执行失败:', err)
    }
  }

  // 立即执行一次，然后定时执行
  runOnce().catch(err => console.error('[cleanup] 首次执行失败:', err))
  _timer = setInterval(() => {
    runOnce().catch(err => console.error('[cleanup] 定时执行失败:', err))
  }, intervalMs)

  console.log(`[cleanup] 临时PDF清理任务已启动，保留 ${retentionDays} 天，间隔 ${intervalMs} ms`)
}

/**
 * 按 mtime 清理目录中的过期文件
 */
async function cleanFilesByMtime(dir: string, retentionDays: number, now = new Date()) {
  const entries = await fs.readdir(dir, { withFileTypes: true } as any)
  for (const e of entries) {
    const full = path.join(dir, e.name)
    try {
      const stat = await fs.stat(full)
      const ageDays = Math.floor((now.getTime() - stat.mtime.getTime()) / 86400000)
      if ((e as any).isDirectory?.()) {
        await cleanFilesByMtime(full, retentionDays, now)
        const remain = await fs.readdir(full)
        if (remain.length === 0) {
          await fs.remove(full)
          console.log(`[cleanup] 删除空子目录: ${full}`)
        }
      } else {
        if (ageDays > retentionDays) {
          await fs.remove(full)
          console.log(`[cleanup] 删除过期文件: ${full} (${ageDays}d)`) 
        }
      }
    } catch (err) {
      console.warn(`[cleanup] 子路径处理失败: ${full}`, err)
    }
  }
}
