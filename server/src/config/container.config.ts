// container.config.ts
import 'reflect-metadata'

import { PrismaClient } from '@prisma/client'
import { Container } from 'inversify'

// 导入控制器
import {
  BaseController,
  FileController,
  RbacController,
  TodoController,
  User,
  FeedbackController,
  PublicFeedbackController,
  AIController,
} from '@/router/controller'

// 导入服务
import { BaseService, FileService, RbacService, TodoService, UserService, FeedbackService } from '@/router/service'
import { AIService } from '@/router/ai/service'

// 导入中间件
import { AuthMiddleware } from '@/middleware/auth'

// 导入其他依赖
import { PrismaDB } from '@/db'
import { JWT } from '@/jwt'

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

  // 服务
  UserService: Symbol.for('UserService'),
  BaseService: Symbol.for('BaseService'),
  FileService: Symbol.for('FileService'),
  RbacService: Symbol.for('RbacService'),
  TodoService: Symbol.for('TodoService'),
  FeedbackService: Symbol.for('FeedbackService'),
  AIService: Symbol.for('AIService'),

  // 基础设施
  PrismaClient: Symbol.for('PrismaClient'),
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
 * 优雅关闭容器和数据库连接
 */
export async function closeContainer(container: Container): Promise<void> {
  try {
    const prisma = container.get<PrismaClient>(TYPES.PrismaClient)
    await prisma.$disconnect()
    console.log('Database disconnected successfully')
  } catch (error) {
    console.error('Error during container cleanup:', error)
  }
}
