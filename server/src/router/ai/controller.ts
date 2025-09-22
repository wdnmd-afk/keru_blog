import { Request, Response } from 'express'
import fse from 'fs-extra'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpPost as PostMapping } from 'inversify-express-utils'
import multer from 'multer'
import path from 'path'

import { PrismaDB } from '@/db'
import { AuthMiddleware } from '@/middleware/auth'
import { rateLimitMiddleware, validationMiddleware } from '@/middleware/validation'
import { AIService } from '@/router/ai/service'
import { generateUniqueBigIntId } from '@/utils'
import { ChatDto } from './dto'

// 配置 multer 用于AI图片上传
const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const uploadDir = path.resolve(process.cwd(), 'static/IMAGE')
    // 确保目录存在
    if (!fse.existsSync(uploadDir)) {
      await fse.mkdirs(uploadDir)
    }
    cb(null, uploadDir)
  },
  filename: (_req, file, cb) => {
    // 生成唯一文件名：时间戳 + 随机数 + 原扩展名
    const ext = path.extname(file.originalname)
    const uniqueName = `ai-image-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB限制
  },
  fileFilter: (_req, file, cb) => {
    // 只允许图片类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('仅支持 JPG、PNG、GIF、WebP 格式的图片'))
    }
  },
})

/**
 * AI 控制器
 * 根路径：/api/ai
 * 说明：默认启用 AuthMiddleware（如需开放给公众，可移除或改为白名单）
 */
@controller('/ai', AuthMiddleware)
export class AIController extends BaseHttpController {
  constructor(
    @inject(AIService) private readonly aiService: AIService,
    @inject(PrismaDB) private readonly prismaDB: PrismaDB
  ) {
    super()
  }

  /**
   * AI问答接口（支持多模态：文本+图片）
   * POST /api/ai/chat
   */
  @PostMapping('/chat', rateLimitMiddleware(60, 5 * 60 * 1000), validationMiddleware(ChatDto))
  public async chat(req: Request, res: Response) {
    try {
      const { message, conversationId, images } = req.body as ChatDto
      // 从鉴权上下文获取用户ID（req.user 或 this.httpContext.user.details）
      const authUser: any = (req as any).user || (this.httpContext as any)?.user?.details || {}
      console.log('[AI] controller.chat authUser:', JSON.stringify(authUser))
      const userId: string | undefined = authUser?.id || authUser?.userId

      // 使用智能聊天方法，自动判断是否为多模态请求
      const { reply, conversationId: convId } = await this.aiService.smartChat(
        message,
        images || [],
        conversationId
      )

      // 持久化保存（忽略失败不影响问答返回）
      try {
        if (userId) {
          // 构建保存的消息内容（包含图片信息）
          const messageToSave =
            images && images.length > 0 ? `${message} [包含${images.length}张图片]` : message

          console.log(
            `[AI] controller.chat -> saveConversation call: userId=${userId}, qLen=${messageToSave?.length || 0}, aLen=${reply?.length || 0}, images=${images?.length || 0}`
          )
          await this.aiService.saveConversation(userId, messageToSave, reply)
        } else {
          console.warn('[AI] controller.chat -> skip save: empty userId')
        }
      } catch (e) {
        console.warn('[AI] saveConversation failed:', (e as any)?.message)
      }

      ;(res as any).sendResponse({
        success: true,
        code: 200,
        message: 'OK',
        data: { reply, conversationId: convId },
      })
    } catch (error: any) {
      console.error('[AI] chat error:', error)
      ;(res as any).sendResponse({ success: false, code: 500, message: error.message })
    }
  }

  /**
   * SSE 流式问答接口（支持多模态：文本+图片）
   * POST /api/ai/chat/stream
   */
  @PostMapping(
    '/chat/stream',
    rateLimitMiddleware(60, 5 * 60 * 1000),
    validationMiddleware(ChatDto)
  )
  public async chatStream(req: Request, res: Response) {
    const { message, images } = req.body as ChatDto

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

      // 使用智能流式聊天方法，自动判断是否为多模态请求
      await this.aiService.smartStreamChat(
        message,
        images || [],
        delta => {
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
          // 构建保存的消息内容（包含图片信息）
          const messageToSave =
            images && images.length > 0 ? `${message} [包含${images.length}张图片]` : message

          console.log(
            `[AI] controller.chatStream -> saveConversation call: userId=${userId}, qLen=${messageToSave?.length || 0}, aLen=${fullText?.length || 0}, images=${images?.length || 0}`
          )
          await this.aiService.saveConversation(userId, messageToSave, fullText)
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
      const errPayload = JSON.stringify({
        type: 'error',
        message: error?.message || 'stream error',
      })
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

  /**
   * AI图片上传接口
   * POST /api/ai/upload-image
   */
  @PostMapping('/upload-image', upload.single('file'))
  public async uploadImage(req: Request, res: Response) {
    try {
      const file = req.file
      if (!file) {
        return (res as any).sendResponse({
          success: false,
          code: 400,
          message: '未找到上传文件',
        })
      }

      // 获取用户信息
      const authUser: any = (req as any).user || (this.httpContext as any)?.user?.details || {}
      const userId = authUser?.id || authUser?.userId

      console.log('[AI] 图片上传 - 用户ID:', userId)
      console.log('[AI] 图片上传 - 文件信息:', {
        originalname: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      })

      // 保存文件记录到数据库
      const fileRecord = await this.prismaDB.prisma.file.create({
        data: {
          id: generateUniqueBigIntId(true) as string,
          filename: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: `/static/IMAGE/${file.filename}`,
          uploaderId: userId || 'anonymous',
        },
      })

      // 构建文件访问URL
      const fileUrl = `/static/IMAGE/${file.filename}`

      console.log('[AI] 图片上传成功 - 文件ID:', fileRecord.id)
      console.log('[AI] 图片上传成功 - 文件URL:', fileUrl)
      console.log(
        '[AI] 图片上传成功 - 文件路径:',
        path.resolve(process.cwd(), 'static/IMAGE', file.filename)
      )
      ;(res as any).sendResponse({
        success: true,
        code: 200,
        message: '图片上传成功',
        data: {
          id: fileRecord.id,
          url: fileUrl,
          name: file.originalname,
          size: file.size,
          type: file.mimetype,
        },
      })
    } catch (error: any) {
      console.error('[AI] 图片上传失败:', error)
      ;(res as any).sendResponse({
        success: false,
        code: 500,
        message: error.message || '图片上传失败',
      })
    }
  }
}
