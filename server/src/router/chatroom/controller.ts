import { ApiResponse } from '@/common/response'
import { AuthMiddleware } from '@/middleware/auth'
import { validationMiddleware } from '@/middleware/validation'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { ChatRoomListQueryDto, CreateChatRoomDto, MessageQueryDto, SendMessageDto } from './dto'
import { ChatRoomService } from './service'

// 成功响应
const ok = (res: Response, data: any, message: string) => {
  const r = ApiResponse.success(data, message)
  return res.status(r.getHttpStatusCode()).json(r.toJSON())
}

// 错误响应
const err = (res: Response, message: string, statusCode = 500) => {
  const r = ApiResponse.error(statusCode as any, message)
  return res.status(statusCode).json(r.toJSON())
}

@controller('/chatrooms', AuthMiddleware)
export class ChatRoomController {
  constructor(@inject(ChatRoomService) private service: ChatRoomService) {}

  // 创建聊天室
  @httpPost('/', validationMiddleware(CreateChatRoomDto))
  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      if (!userId) return err(res, '用户未登录', 401)
      const dto = req.body as CreateChatRoomDto
      const data = await this.service.create(dto, userId)
      return ok(res, data, '创建聊天室成功')
    } catch (e: any) {
      console.error('create chatroom error:', e)
      return err(res, e.message || '创建聊天室失败', 400)
    }
  }

  // 列表
  @httpGet('/')
  async list(req: Request, res: Response) {
    try {
      const q: ChatRoomListQueryDto = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        status: req.query.status as any,
      }
      const { items, total, page, limit } = await this.service.list(q)
      const r = ApiResponse.paginated(items, total, page, limit, '获取聊天室列表成功')
      return res.status(r.getHttpStatusCode()).json(r.toJSON())
    } catch (e) {
      console.error('list chatrooms error:', e)
      return err(res, '获取聊天室列表失败', 500)
    }
  }

  // 我的
  @httpGet('/mine')
  async mine(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      if (!userId) return err(res, '用户未登录', 401)
      const ownerOnly = (req.query.ownerOnly ?? 'true') === 'true'
      const data = await this.service.mine(userId, ownerOnly)
      return ok(res, data, '获取我的聊天室成功')
    } catch (e) {
      console.error('mine chatrooms error:', e)
      return err(res, '获取我的聊天室失败', 500)
    }
  }

  // 详情
  @httpGet('/:roomId')
  async detail(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const data = await this.service.detail(roomId)
      if (!data) return err(res, '房间不存在', 404)
      return ok(res, data, '获取聊天室详情成功')
    } catch (e) {
      console.error('detail chatroom error:', e)
      return err(res, '获取聊天室详情失败', 500)
    }
  }

  // 加入
  @httpPost('/:roomId/join')
  async join(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const userId = req.user?.id
      if (!userId) return err(res, '用户未登录', 401)
      await this.service.join(roomId, userId)
      return ok(res, null, '加入聊天室成功')
    } catch (e: any) {
      console.error('join chatroom error:', e)
      return err(res, e.message || '加入聊天室失败', 400)
    }
  }

  // 离开
  @httpPost('/:roomId/leave')
  async leave(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const userId = req.user?.id
      if (!userId) return err(res, '用户未登录', 401)
      await this.service.leave(roomId, userId)
      return ok(res, null, '离开聊天室成功')
    } catch (e) {
      console.error('leave chatroom error:', e)
      return err(res, '离开聊天室失败', 500)
    }
  }

  // 关闭
  @httpPost('/:roomId/close')
  async close(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const userId = req.user?.id
      if (!userId) return err(res, '用户未登录', 401)
      await this.service.close(roomId, userId)
      return ok(res, null, '关闭聊天室成功')
    } catch (e: any) {
      console.error('close chatroom error:', e)
      return err(res, e.message || '关闭聊天室失败', 400)
    }
  }

  // 获取最近消息（默认30条）
  @httpGet('/:roomId/messages')
  async getMessages(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const q: MessageQueryDto = {
        limit: req.query.limit ? Number(req.query.limit) : 30,
      }
      const data = await this.service.getMessages(roomId, q.limit)
      return ok(res, data, '获取消息成功')
    } catch (e: any) {
      console.error('get messages error:', e)
      return err(res, e.message || '获取消息失败', 400)
    }
  }

  // 发送消息
  @httpPost('/:roomId/messages', validationMiddleware(SendMessageDto))
  async sendMessage(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const userId = req.user?.id
      if (!userId) return err(res, '用户未登录', 401)
      const dto = req.body as SendMessageDto
      const data = await this.service.sendMessage(roomId, userId, dto.content)
      return ok(res, data, '发送成功')
    } catch (e: any) {
      console.error('send message error:', e)
      return err(res, e.message || '发送失败', 400)
    }
  }
}
