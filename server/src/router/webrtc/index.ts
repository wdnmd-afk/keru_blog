/**
 * WebRTC模块入口文件
 *
 * 功能说明：
 * 1. 导出WebRTC模块的所有组件
 * 2. 提供模块的统一接口
 * 3. 配置依赖注入绑定
 */

export { WebRTCController } from './controller'
export * from './dto'
export { WebRTCGateway } from './gateway'
export { WebRTCService } from './service'

// 导出模块配置
export const webrtcModuleConfig = {
  name: 'WebRTC',
  version: '1.0.0',
  description: 'WebRTC实时通信模块',
  dependencies: ['Redis'],
  routes: [
    'GET /api/webrtc/status',
    'POST /api/webrtc/rooms',
    'GET /api/webrtc/rooms',
    'GET /api/webrtc/rooms/:roomId',
    'POST /api/webrtc/rooms/:roomId/join',
    'POST /api/webrtc/rooms/:roomId/leave',
    'DELETE /api/webrtc/rooms/:roomId',
    'GET /api/webrtc/rooms/:roomId/stats',
    'GET /api/webrtc/users/:userId/stats',
    'POST /api/webrtc/stats',
    'GET /api/webrtc/ice-servers',
    'GET /api/webrtc/health',
  ],
  websocketEvents: [
    'authenticate',
    'join-room',
    'leave-room',
    'offer',
    'answer',
    'ice-candidate',
    'connection-state-change',
    'stats-update',
  ],
}
