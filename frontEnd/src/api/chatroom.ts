import { Http } from '@/utils'

// 聊天室 API 封装（与 Http 工具保持一致，自动带上 Authorization）
export class ChatRoomApi {
  // 创建聊天室（名称必填，封面可选）
  static async create(params: { name: string; coverUrl?: string }) {
    return Http.post('/chatrooms', params)
  }

  // 列表
  static async list(params: { page?: number; limit?: number; status?: 'ACTIVE' | 'ENDED' } = {}) {
    return Http.get('/chatrooms', params)
  }

  // 我的房间（ownerOnly：仅我创建的）
  static async mine(params: { ownerOnly?: boolean } = { ownerOnly: true }) {
    return Http.get('/chatrooms/mine', params)
  }

  // 详情
  static async detail(roomId: string) {
    return Http.get(`/chatrooms/${roomId}`)
  }

  // 加入/离开/关闭
  static async join(roomId: string) {
    return Http.post(`/chatrooms/${roomId}/join`)
  }
  static async leave(roomId: string) {
    return Http.post(`/chatrooms/${roomId}/leave`)
  }
  static async close(roomId: string) {
    return Http.post(`/chatrooms/${roomId}/close`)
  }

  // 获取最近消息（默认30条）
  static async getMessages(roomId: string, params: { limit?: number } = { limit: 30 }) {
    return Http.get(`/chatrooms/${roomId}/messages`, params)
  }

  // 发送消息（持久化）
  static async sendMessage(roomId: string, content: string) {
    return Http.post(`/chatrooms/${roomId}/messages`, { content })
  }
}
