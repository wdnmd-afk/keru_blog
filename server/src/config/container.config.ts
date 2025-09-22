// container.config.ts
import 'reflect-metadata'

import { PrismaClient } from '@prisma/client'
import { Container } from 'inversify'

// 导入控制器
import {
  AIController,
  BaseController,
  FeedbackController,
  FileController,
  PublicFeedbackController,
  RbacController,
  TodoController,
  User,
} from '@/router/controller'

// 导入WebRTC模块
import { WebRTCController, WebRTCGateway, WebRTCService } from '@/router/webrtc'

// 导入服务
import { AIService } from '@/router/ai/service'
import {
  BaseService,
  FeedbackService,
  FileService,
  RbacService,
  TodoService,
  UserService,
} from '@/router/service'

// 导入中间件
import { AuthMiddleware } from '@/middleware/auth'

// 导入其他依赖
import { PrismaDB } from '@/db'
import { JWT } from '@/jwt'
import Redis from 'ioredis'

// 定义服务标识符常量，避免魔法字符串
export const TYPES = {
  // 控制器
  UserController: Symbol.for('UserController'),
  BaseController: Symbol.for('BaseController'),
  FileController: Symbol.for('FileController'),
  RbacController: Symbol.for('RbacController'),
  TodoController: Symbol.for('TodoController'),
  FeedbackController: Symbol.for('FeedbackController'),
  PublicFeedbackController: Symbol.for('PublicFeedbackController'),
  AIController: Symbol.for('AIController'),
  WebRTCController: Symbol.for('WebRTCController'),

  // 服务
  UserService: Symbol.for('UserService'),
  BaseService: Symbol.for('BaseService'),
  FileService: Symbol.for('FileService'),
  RbacService: Symbol.for('RbacService'),
  TodoService: Symbol.for('TodoService'),
  FeedbackService: Symbol.for('FeedbackService'),
  AIService: Symbol.for('AIService'),
  WebRTCService: Symbol.for('WebRTCService'),
  WebRTCGateway: Symbol.for('WebRTCGateway'),

  // 基础设施
  PrismaClient: Symbol.for('PrismaClient'),
  Redis: Symbol.for('Redis'),
  PrismaDB: Symbol.for('PrismaDB'),
  JWT: Symbol.for('JWT'),
} as const

/**
 * 创建并配置依赖注入容器
 */
export function createContainer(): Container {
  const container = new Container({
    defaultScope: 'Singleton', // 默认使用单例模式
    skipBaseClassChecks: true,
  })

  // 注册中间件
  registerMiddleware(container)

  // 注册控制器
  registerControllers(container)

  // 注册服务
  registerServices(container)

  // 注册基础设施
  registerInfrastructure(container)

  // 注册 WebRTC 组件
  registerWebRTCComponents(container)

  return container
}

/**
 * 注册所有中间件
 */
function registerMiddleware(container: Container): void {
  container.bind<AuthMiddleware>(AuthMiddleware).toSelf()
}

/**
 * 注册所有控制器
 */
function registerControllers(container: Container): void {
  container.bind(TYPES.UserController).to(User)
  container.bind(TYPES.BaseController).to(BaseController)
  container.bind(TYPES.FileController).to(FileController)
  container.bind(TYPES.RbacController).to(RbacController)
  container.bind(TYPES.TodoController).to(TodoController)
  container.bind(TYPES.FeedbackController).to(FeedbackController)
  container.bind(TYPES.PublicFeedbackController).to(PublicFeedbackController)
  // AI 控制器
  container.bind(TYPES.AIController).to(AIController)
  // WebRTC 控制器
  container.bind(TYPES.WebRTCController).to(WebRTCController)

  // 为了兼容现有代码，保留原有的绑定方式
  container.bind(User).to(User)
  container.bind(BaseController).to(BaseController)
  container.bind(FileController).to(FileController)
  container.bind(RbacController).to(RbacController)
  container.bind(TodoController).to(TodoController)
  container.bind(FeedbackController).to(FeedbackController)
  container.bind(PublicFeedbackController).to(PublicFeedbackController)
}

/**
 * 注册所有服务
 */
function registerServices(container: Container): void {
  container.bind(TYPES.UserService).to(UserService)
  container.bind(TYPES.BaseService).to(BaseService)
  container.bind(TYPES.FileService).to(FileService)
  container.bind(TYPES.RbacService).to(RbacService)
  container.bind(TYPES.TodoService).to(TodoService)
  container.bind(TYPES.FeedbackService).to(FeedbackService)

  // 为了兼容现有代码，保留原有的绑定方式
  container.bind(UserService).to(UserService)
  container.bind(BaseService).to(BaseService)
  container.bind(FileService).to(FileService)
  container.bind(RbacService).to(RbacService)
  container.bind(TodoService).to(TodoService)
  container.bind(FeedbackService).to(FeedbackService)
  // 绑定 AI 服务
  container.bind(TYPES.AIService).to(AIService)
  container.bind(AIService).to(AIService)
  // 绑定 WebRTC 服务
  container.bind(TYPES.WebRTCService).to(WebRTCService)
  container.bind(WebRTCService).to(WebRTCService)
  container.bind('WebRTCService').to(WebRTCService)
}

/**
 * 注册基础设施组件
 */
function registerInfrastructure(container: Container): void {
  // 数据库相关
  container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(createPrismaClient())
  container.bind(TYPES.PrismaDB).to(PrismaDB)
  container.bind(PrismaDB).to(PrismaDB)

  // 为了兼容现有代码中的PrismaClient工厂模式
  container.bind<() => PrismaClient>('PrismaClient').toFactory(() => {
    return () => container.get<PrismaClient>(TYPES.PrismaClient)
  })

  // JWT服务
  container.bind(TYPES.JWT).to(JWT)
  container.bind(JWT).to(JWT)

  // Redis服务
  container.bind<Redis>(TYPES.Redis).toConstantValue(createRedisClient())
  container.bind<Redis>('Redis').toConstantValue(createRedisClient())
}

/**
 * 创建PrismaClient实例
 */
function createPrismaClient(): PrismaClient {
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    errorFormat: 'pretty',
  })

  return prisma
}

/**
 * 创建Redis客户端实例
 */
function createRedisClient(): Redis {
  const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0'),
    // 使用标准的 ioredis 配置选项
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    // keepAlive 属性在 ioredis 中应该是数字类型或者不设置
    keepAlive: 30000, // 30秒保持连接
  })

  redis.on('connect', () => {
    console.log('Redis connected successfully')
  })

  redis.on('error', error => {
    console.error('Redis connection error:', error)
  })

  return redis
}

/**
 * 注册 WebRTC 组件
 */
function registerWebRTCComponents(container: Container): void {
  // 绑定 WebRTC Gateway
  container.bind(TYPES.WebRTCGateway).to(WebRTCGateway)
  container.bind(WebRTCGateway).to(WebRTCGateway) // 兼容性绑定
}

/**
 * 优雅关闭容器和数据库连接
 */
export async function closeContainer(container: Container): Promise<void> {
  try {
    // 关闭数据库连接
    const prisma = container.get<PrismaClient>(TYPES.PrismaClient)
    await prisma.$disconnect()
    console.log('Database disconnected successfully')

    // 关闭Redis连接
    const redis = container.get<Redis>(TYPES.Redis)
    await redis.quit()
    console.log('Redis disconnected successfully')
  } catch (error) {
    console.error('Error during container cleanup:', error)
  }
}
