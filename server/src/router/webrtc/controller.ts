/**
 * WebRTC控制器
 *
 * 功能说明：
 * 1. 处理WebRTC相关的HTTP请求
 * 2. 管理房间和用户状态
 * 3. 提供WebRTC连接统计信息
 * 4. 处理信令服务器的配置和状态查询
 */

import { ApiResponse } from '@/common/response'
import { AuthMiddleware } from '@/middleware/auth'
import { validationMiddleware } from '@/middleware/validation'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils'
import { CreateRoomDto, JoinRoomDto, RoomStatus, WebRTCStatsDto } from './dto'
import { WebRTCService } from './service'

// 辅助函数：成功响应
const successResponse = (res: Response, data: any, message: string) => {
  const response = ApiResponse.success(data, message)
  return res.status(response.getHttpStatusCode()).json(response.toJSON())
}

// 辅助函数：错误响应
const errorResponse = (res: Response, message: string, statusCode: number = 500) => {
  const response = ApiResponse.error(statusCode as any, message)
  return res.status(statusCode).json(response.toJSON())
}

@controller('/api/webrtc')
export class WebRTCController {
  constructor(@inject('WebRTCService') private webrtcService: WebRTCService) {}

  /**
   * 获取WebRTC服务状态
   */
  @httpGet('/status')
  async getStatus(_req: Request, res: Response) {
    try {
      const status = await this.webrtcService.getServiceStatus()
      return successResponse(res, status, '获取服务状态成功')
    } catch (error) {
      console.error('获取WebRTC服务状态失败:', error)
      return errorResponse(res, '获取服务状态失败', 500)
    }
  }

  /**
   * 创建WebRTC房间
   */
  @httpPost('/rooms', AuthMiddleware, validationMiddleware(CreateRoomDto))
  async createRoom(req: Request, res: Response) {
    try {
      const createRoomData: CreateRoomDto = req.body
      const userId = req.user?.id

      if (!userId) {
        return errorResponse(res, '用户未登录', 401)
      }

      const room = await this.webrtcService.createRoom({
        ...createRoomData,
        creatorId: userId,
      })

      return successResponse(res, room, '房间创建成功')
    } catch (error) {
      console.error('创建WebRTC房间失败:', error)
      return errorResponse(res, '创建房间失败', 500)
    }
  }

  /**
   * 获取房间列表
   */
  @httpGet('/rooms', AuthMiddleware)
  async getRooms(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, status } = req.query

      const rooms = await this.webrtcService.getRooms({
        page: Number(page),
        limit: Number(limit),
        status: status as RoomStatus,
      })

      return successResponse(res, rooms, '获取房间列表成功')
    } catch (error) {
      console.error('获取房间列表失败:', error)
      return errorResponse(res, '获取房间列表失败', 500)
    }
  }

  /**
   * 获取房间详情
   */
  @httpGet('/rooms/:roomId', AuthMiddleware)
  async getRoomDetail(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const room = await this.webrtcService.getRoomById(roomId)

      if (!room) {
        return errorResponse(res, '房间不存在', 404)
      }

      return successResponse(res, room, '获取房间详情成功')
    } catch (error) {
      console.error('获取房间详情失败:', error)
      return errorResponse(res, '获取房间详情失败', 500)
    }
  }

  /**
   * 加入房间
   */
  @httpPost('/rooms/:roomId/join', AuthMiddleware, validationMiddleware(JoinRoomDto))
  async joinRoom(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const joinData: JoinRoomDto = req.body
      const userId = req.user?.id

      if (!userId) {
        return errorResponse(res, '用户未登录', 401)
      }

      const result = await this.webrtcService.joinRoom(roomId, {
        ...joinData,
        userId,
      })

      return successResponse(res, result, '加入房间成功')
    } catch (error) {
      console.error('加入房间失败:', error)
      return errorResponse(res, error.message || '加入房间失败', 400)
    }
  }

  /**
   * 离开房间
   */
  @httpPost('/rooms/:roomId/leave', AuthMiddleware)
  async leaveRoom(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const userId = req.user?.id

      if (!userId) {
        return errorResponse(res, '用户未登录', 401)
      }

      await this.webrtcService.leaveRoom(roomId, userId)
      return successResponse(res, null, '离开房间成功')
    } catch (error) {
      console.error('离开房间失败:', error)
      return errorResponse(res, '离开房间失败', 500)
    }
  }

  /**
   * 删除房间
   */
  @httpDelete('/rooms/:roomId', AuthMiddleware)
  async deleteRoom(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const userId = req.user?.id

      if (!userId) {
        return errorResponse(res, '用户未登录', 401)
      }

      await this.webrtcService.deleteRoom(roomId, userId)
      return successResponse(res, null, '删除房间成功')
    } catch (error) {
      console.error('删除房间失败:', error)
      return errorResponse(res, error.message || '删除房间失败', 400)
    }
  }

  /**
   * 获取房间统计信息
   */
  @httpGet('/rooms/:roomId/stats', AuthMiddleware)
  async getRoomStats(req: Request, res: Response) {
    try {
      const { roomId } = req.params
      const stats = await this.webrtcService.getRoomStats(roomId)

      return successResponse(res, stats, '获取房间统计成功')
    } catch (error) {
      console.error('获取房间统计失败:', error)
      return errorResponse(res, '获取房间统计失败', 500)
    }
  }

  /**
   * 获取用户连接统计
   */
  @httpGet('/users/:userId/stats', AuthMiddleware)
  async getUserStats(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const requestUserId = req.user?.id

      // 只允许用户查看自己的统计信息
      if (userId !== requestUserId) {
        return errorResponse(res, '无权限查看其他用户统计', 403)
      }

      const stats = await this.webrtcService.getUserStats(userId)
      return successResponse(res, stats, '获取用户统计成功')
    } catch (error) {
      console.error('获取用户统计失败:', error)
      return errorResponse(res, '获取用户统计失败', 500)
    }
  }

  /**
   * 更新连接统计信息
   */
  @httpPost('/stats', AuthMiddleware, validationMiddleware(WebRTCStatsDto))
  async updateStats(req: Request, res: Response) {
    try {
      const statsData: WebRTCStatsDto = req.body
      const userId = req.user?.id

      if (!userId) {
        return errorResponse(res, '用户未登录', 401)
      }

      await this.webrtcService.updateConnectionStats({
        ...statsData,
        userId,
      })

      return successResponse(res, null, '统计信息更新成功')
    } catch (error) {
      console.error('更新统计信息失败:', error)
      return errorResponse(res, '更新统计信息失败', 500)
    }
  }

  /**
   * 获取ICE服务器配置
   */
  @httpGet('/ice-servers', AuthMiddleware)
  async getIceServers(_req: Request, res: Response) {
    try {
      const iceServers = await this.webrtcService.getIceServers()
      return successResponse(res, iceServers, '获取ICE服务器配置成功')
    } catch (error) {
      console.error('获取ICE服务器配置失败:', error)
      return errorResponse(res, '获取ICE服务器配置失败', 500)
    }
  }

  /**
   * 健康检查
   */
  @httpGet('/health')
  async healthCheck(_req: Request, res: Response) {
    try {
      const health = await this.webrtcService.healthCheck()
      return successResponse(res, health, 'WebRTC服务健康')
    } catch (error) {
      console.error('WebRTC健康检查失败:', error)
      return errorResponse(res, 'WebRTC服务异常', 503)
    }
  }
}
