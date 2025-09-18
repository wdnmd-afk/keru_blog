import 'reflect-metadata'

import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { InversifyExpressServer } from 'inversify-express-utils'
import process from 'node:process'
import path from 'path'

// 导入配置模块
import { AppConfig, createAppConfig, printConfigSummary, validateConfig } from '@/config/app.config'
import { closeContainer, createContainer } from '@/config/container.config'

// 导入中间件
import {
  AuthenticationErrorHandler,
  errorHandlingMiddleware,
  requestIdMiddleware,
  responseHandler,
} from '@/middleware'

// 导入JWT
import { JWT } from '@/jwt'

// 导入权限中间件初始化函数
import { initPermissionMiddleware } from '@/middleware/permission'

// 导入WebSocket服务器
import { createWebSocketServer, createWebSocketConfig } from '@/router/webrtc/websocket'

/**
 * 应用启动函数
 */
async function bootstrap() {
  try {
    console.log('🚀 Starting Keru Blog Server...')

    // 1. 创建和验证配置
    const config = createAppConfig()
    validateConfig(config)
    printConfigSummary(config)

    // 2. 创建依赖注入容器
    const container = createContainer()

    // 2.1 初始化权限中间件
    const prismaClient = container.get<() => PrismaClient>('PrismaClient')()
    initPermissionMiddleware(prismaClient)

    // 3. 设置应用服务器 - 添加全局路由前缀 /api
    const server = new InversifyExpressServer(container, null, { rootPath: '/api' })

    // 4. 配置中间件
    server.setConfig(app => {
      setupMiddleware(app, config, container)
    })

    // 5. 构建应用
    const app = server.build()

    // 6. 创建HTTP服务器
    const httpServer = createServer(app)

    // 7. 初始化WebSocket服务器
    const wsConfig = createWebSocketConfig()
    const webSocketServer = createWebSocketServer(httpServer, container, wsConfig)
    console.log('🔌 WebSocket server initialized')

    // 8. 启动服务器
    const serverInstance = httpServer.listen(config.server.port, () => {
      console.log(`🌟 Server is listening on port ${config.server.port}`)
      console.log(`🌐 Environment: ${config.server.env}`)
      console.log(`📡 Server URL: http://${config.server.host}:${config.server.port}`)
      console.log(`🔌 WebSocket URL: ws://${config.server.host}:${config.server.port}`)
      console.log('✅ Server started successfully!')
    })

    // 9. 设置优雅关闭
    setupGracefulShutdown(serverInstance, container, webSocketServer)
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

/**
 * 设置中间件
 */
function setupMiddleware(app: express.Application, config: AppConfig, container: any) {
  // 请求ID中间件（必须在所有其他中间件之前）
  app.use(requestIdMiddleware)

  // 临时调试中间件：打印所有请求的路径信息
  app.use((req, res, next) => {
    console.log(
      `[DEBUG] ${req.method} ${req.originalUrl} | path: ${req.path} | baseUrl: ${req.baseUrl}`
    )
    next()
  })

  // 基础中间件 - 添加中文编码支持
  app.use(express.json({ limit: '50mb' }))
  app.use(
    express.urlencoded({
      extended: true,
      limit: '50mb',
      // 修复中文文件名编码问题
      parameterLimit: 50000,
      type: 'application/x-www-form-urlencoded',
    })
  )

  // CORS配置
  app.use(
    cors({
      origin: config.cors.origin,
      credentials: config.cors.credentials,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  // JWT初始化
  app.use(container.get(JWT).init())

  // 认证错误处理
  app.use(AuthenticationErrorHandler)

  // 通用错误处理
  app.use(errorHandlingMiddleware())

  // 响应处理中间件
  app.use(responseHandler)
  console.log(path.resolve(process.cwd(), config.upload.uploadDir))
  // 静态文件托管
  app.use('/static', express.static(path.resolve(process.cwd(), config.upload.uploadDir)))

  console.log('⚙️  Middleware setup completed')
}

/**
 * 设置优雅关闭
 */
function setupGracefulShutdown(server: any, container: any, webSocketServer?: any) {
  const shutdown = async (signal: string) => {
    console.log(`\n🔄 Received ${signal}, starting graceful shutdown...`)

    // 关闭WebSocket服务器
    if (webSocketServer) {
      await webSocketServer.close()
      console.log('🔌 WebSocket server closed')
    }

    // 关闭HTTP服务器
    server.close(async () => {
      console.log('🔒 HTTP server closed')

      // 关闭容器和数据库连接
      await closeContainer(container)

      console.log('✨ Graceful shutdown completed')
      process.exit(0)
    })

    // 强制退出超时
    setTimeout(() => {
      console.error('⏰ Shutdown timeout, forcing exit')
      process.exit(1)
    }, 10000) // 10秒超时
  }

  // 监听退出信号
  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))

  // 捕获未处理的异常
  process.on('uncaughtException', error => {
    console.error('💥 Uncaught Exception:', error)
    shutdown('UNCAUGHT_EXCEPTION')
  })

  process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason)
    shutdown('UNHANDLED_REJECTION')
  })
}

// 启动应用
bootstrap()
