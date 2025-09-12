import { Request, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost as PostMapping } from 'inversify-express-utils'

import { AuthMiddleware } from '@/middleware/auth'
import { rateLimitMiddleware, validationMiddleware } from '@/middleware/validation'
import { AIService } from '@/router/ai/service'
import { ChatDto } from './dto'

/**
 * AI 控制器
 * 根路径：/api/ai
 * 说明：默认启用 AuthMiddleware（如需开放给公众，可移除或改为白名单）
 */
@controller('/ai', AuthMiddleware)
export class AIController extends BaseHttpController {
  constructor(@inject(AIService) private readonly aiService: AIService) {
    super()
  }

  /**
   * AI问答接口
   * POST /api/ai/chat
   */
  @PostMapping('/chat', rateLimitMiddleware(60, 5 * 60 * 1000), validationMiddleware(ChatDto))
  public async chat(req: Request, res: Response) {
    try {
      const { message, conversationId } = req.body as ChatDto
      // 从鉴权上下文获取用户ID（req.user 或 this.httpContext.user.details）
      const authUser: any = (req as any).user || (this.httpContext as any)?.user?.details || {}
      console.log('[AI] controller.chat authUser:', JSON.stringify(authUser))
      const userId: string | undefined = authUser?.id || authUser?.userId

      const { reply, conversationId: convId } = await this.aiService.chat(message, conversationId)

      // 持久化保存（忽略失败不影响问答返回）
      try {
        if (userId) {
          console.log(`[AI] controller.chat -> saveConversation call: userId=${userId}, qLen=${message?.length || 0}, aLen=${reply?.length || 0}`)
          await this.aiService.saveConversation(userId, message, reply)
        } else {
          console.warn('[AI] controller.chat -> skip save: empty userId')
        }
      } catch (e) {
        console.warn('[AI] saveConversation failed:', (e as any)?.message)
      }

      ;(res as any).sendResponse({ success: true, code: 200, message: 'OK', data: { reply, conversationId: convId } })
    } catch (error: any) {
      console.error('[AI] chat error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * SSE 流式问答接口（使用 POST + text/event-stream，便于携带 Authorization 头）
   * POST /api/ai/chat/stream
   */
  @PostMapping('/chat/stream', rateLimitMiddleware(60, 5 * 60 * 1000), validationMiddleware(ChatDto))
  public async chatStream(req: Request, res: Response) {
    const { message } = req.body as ChatDto

    // 设置 SSE 响应头
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    ;(res as any).flushHeaders?.()

    // 取消控制器（客户端断开时中止下游请求）
    const abortController = new AbortController()

    // 心跳保持，防止代理中断连接
    const heartbeat = setInterval(() => {
      res.write(': ping\n\n')
    }, 15000)

    req.on('close', () => {
      clearInterval(heartbeat)
      abortController.abort()
      res.end()
    })

    try {
      //  
      const authUser: any = (req as any).user || (this.httpContext as any)?.user?.details || {}
      console.log('[AI] controller.chatStream authUser:', JSON.stringify(authUser))
      const userId: string | undefined = authUser?.id || authUser?.userId
      let fullText = ''

      await this.aiService.streamChat(
        message,
        (delta) => {
          fullText += delta // 
          const payload = JSON.stringify({ type: 'chunk', data: delta })
          res.write(`data: ${payload}\n\n`)
        },
        { signal: abortController.signal }
      )

      // 
      // 流结束后持久化保存
      try {
        if (userId) {
          console.log(`[AI] controller.chatStream -> saveConversation call: userId=${userId}, qLen=${message?.length || 0}, aLen=${fullText?.length || 0}`)
          await this.aiService.saveConversation(userId, message, fullText)
        } else {
          console.warn('[AI] controller.chatStream -> skip save: empty userId')
        }
      } catch (e) {
        console.warn('[AI] saveConversation(stream) failed:', (e as any)?.message)
      }

      const endPayload = JSON.stringify({ type: 'done' })
      res.write(`data: ${endPayload}\n\n`)
      clearInterval(heartbeat)
      res.end()
    } catch (error: any) {
      console.error('[AI] chat stream error:', error)
      const errPayload = JSON.stringify({ type: 'error', message: error?.message || 'stream error' })
      res.write(`data: ${errPayload}\n\n`)
      clearInterval(heartbeat)
      res.end()
    }
  }


  /**
   * 获取当前用户最近10条对话记录（POST）
   * POST /api/ai/conversations/recent
   */
  @PostMapping('/conversations/recent')
  public async recent(req: Request, res: Response) {
    try {
      const authUser: any = (req as any).user || (this.httpContext as any)?.user?.details || {}
      const userId: string | undefined = authUser?.id || authUser?.userId
      if (!userId) {
        return (res as any).sendResponse({ success: true, code: 200, message: 'OK', data: [] })
      }
      const list = await this.aiService.getRecentConversations(userId, 10)
      // 格式化时间为中国时区 YYYY-MM-DD HH:mm:ss
      const toCN = (v: Date | string): string => {
        try {
          const d = new Date(v)
          const utc = d.getTime() + d.getTimezoneOffset() * 60000
          const cst = new Date(utc + 8 * 3600000)
          const y = cst.getFullYear()
          const m = String(cst.getMonth() + 1).padStart(2, '0')
          const dd = String(cst.getDate()).padStart(2, '0')
          const hh = String(cst.getHours()).padStart(2, '0')
          const mi = String(cst.getMinutes()).padStart(2, '0')
          const ss = String(cst.getSeconds()).padStart(2, '0')
          return `${y}-${m}-${dd} ${hh}:${mi}:${ss}`
        } catch {
          return String(v)
        }
      }
      const data = list.map((it: any) => ({
        id: it.id,
        message: it.message,
        response: it.response,
        createdAt: toCN(it.createdAt),
      }))
      ;(res as any).sendResponse({ success: true, code: 200, message: 'OK', data })
    } catch (error: any) {
      console.error('[AI] recent conversations error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

}

