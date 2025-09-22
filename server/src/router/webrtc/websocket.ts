/**
 * WebSocket服务器初始化
 *
 * 功能说明：
 * 1. 初始化Socket.IO服务器
 * 2. 配置CORS和连接选项
 * 3. 集成WebRTC网关
 * 4. 提供WebSocket服务器的统一接口
 */

import { Server as HTTPServer } from 'http'
import { Container } from 'inversify'
import { Server as SocketIOServer } from 'socket.io'
import { WebRTCGateway } from './gateway'

/**
 * WebSocket服务器配置选项
 */
interface WebSocketServerOptions {
  cors?: {
    origin: string | string[]
    methods: string[]
    credentials: boolean
  }
  transports?: ('websocket' | 'polling')[]
  pingTimeout?: number
  pingInterval?: number
}

/**
 * WebSocket服务器类
 */
export class WebSocketServer {
  private io: SocketIOServer
  private gateway: WebRTCGateway

  constructor(
    private httpServer: HTTPServer,
    private container: Container,
    private options: WebSocketServerOptions = {}
  ) {
    this.initializeSocketIO()
    this.initializeGateway()
  }

  /**
   * 初始化Socket.IO服务器
   */
  private initializeSocketIO(): void {
    const defaultOptions: WebSocketServerOptions = {
      cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000,
    }

    const mergedOptions = { ...defaultOptions, ...this.options }

    this.io = new SocketIOServer(this.httpServer, {
      cors: mergedOptions.cors,
      transports: mergedOptions.transports,
      pingTimeout: mergedOptions.pingTimeout,
      pingInterval: mergedOptions.pingInterval,
      allowEIO3: true,
    })

    // 设置中间件
    this.setupMiddleware()

    console.log('Socket.IO服务器初始化完成')
  }

  /**
   * 初始化WebRTC网关
   */
  private initializeGateway(): void {
    this.gateway = this.container.get(WebRTCGateway)
    this.gateway.initialize(this.io)
  }

  /**
   * 设置中间件
   */
  private setupMiddleware(): void {
    // 连接认证中间件
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization

      if (!token) {
        console.log(`连接被拒绝: 缺少认证令牌 (${socket.id})`)
        return next(new Error('Authentication error: No token provided'))
      }

      // 这里应该验证JWT token，简化处理
      try {
        // 实际项目中应该验证token的有效性
        socket.data.userId = socket.handshake.auth.userId
        socket.data.username = socket.handshake.auth.username
        next()
      } catch (error) {
        console.log(`连接被拒绝: 无效令牌 (${socket.id})`)
        next(new Error('Authentication error: Invalid token'))
      }
    })

    // 连接限制中间件
    this.io.use((_socket, next) => {
      const clientsCount = this.io.engine.clientsCount
      const maxConnections = parseInt(process.env.MAX_WEBSOCKET_CONNECTIONS || '1000')

      if (clientsCount >= maxConnections) {
        console.log(`连接被拒绝: 超过最大连接数限制 (${clientsCount}/${maxConnections})`)
        return next(new Error('Connection limit exceeded'))
      }

      next()
    })

    // 日志中间件
    this.io.use((socket, next) => {
      const startTime = Date.now()

      socket.on('disconnect', () => {
        const duration = Date.now() - startTime
        console.log(`连接断开: ${socket.id}, 持续时间: ${duration}ms`)
      })

      next()
    })
  }

  /**
   * 获取Socket.IO服务器实例
   */
  getIO(): SocketIOServer {
    return this.io
  }

  /**
   * 获取WebRTC网关实例
   */
  getGateway(): WebRTCGateway {
    return this.gateway
  }

  /**
   * 获取连接统计信息
   */
  getStats(): {
    totalConnections: number
    connectedClients: number
    rooms: string[]
    onlineStats: any
  } {
    const rooms = Array.from(this.io.sockets.adapter.rooms.keys()).filter(
      room => !this.io.sockets.sockets.has(room)
    ) // 过滤掉socket自己的房间

    return {
      totalConnections: this.io.engine.clientsCount,
      connectedClients: this.io.sockets.sockets.size,
      rooms,
      onlineStats: this.gateway.getOnlineStats(),
    }
  }

  /**
   * 向特定房间发送消息
   */
  sendToRoom(roomId: string, event: string, data: any): void {
    this.io.to(roomId).emit(event, data)
  }

  /**
   * 向所有连接的客户端发送消息
   */
  broadcast(event: string, data: any): void {
    this.io.emit(event, data)
  }

  /**
   * 关闭WebSocket服务器
   */
  async close(): Promise<void> {
    return new Promise(resolve => {
      this.io.close(() => {
        console.log('WebSocket服务器已关闭')
        resolve()
      })
    })
  }
}

/**
 * 创建WebSocket服务器实例
 */
export function createWebSocketServer(
  httpServer: HTTPServer,
  container: Container,
  options?: WebSocketServerOptions
): WebSocketServer {
  return new WebSocketServer(httpServer, container, options)
}

/**
 * WebSocket服务器配置工厂
 */
export function createWebSocketConfig(): WebSocketServerOptions {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return {
    cors: {
      origin: isDevelopment
        ? ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080']
        : process.env.CORS_ORIGIN?.split(',') || ['https://your-domain.com'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
  }
}

/**
 * 导出WebSocket相关类型
 */
export { WebRTCGateway }
export type { WebSocketServerOptions }
