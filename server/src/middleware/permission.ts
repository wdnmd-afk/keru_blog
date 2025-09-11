import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

// 创建一个全局的 Prisma 客户端实例
// 注意：在生产环境中，这应该通过依赖注入来管理
let prisma: PrismaClient

// 初始化 Prisma 客户端的函数
export function initPermissionMiddleware(prismaClient: PrismaClient) {
  prisma = prismaClient
}

// 获取 Prisma 客户端实例
function getPrismaClient(): PrismaClient {
  if (!prisma) {
    // 如果没有通过依赖注入设置，则创建一个新实例
    prisma = new PrismaClient()
  }
  return prisma
}

/**
 * 权限验证中间件
 * @param requiredPermission 需要的权限代码
 * @returns Express 中间件函数
 */
export function requirePermission(requiredPermission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 获取用户ID（从认证中间件设置）
      const userId = (req as any).user?.id

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: '用户未认证',
          data: null,
        })
      }

      // 检查用户是否为管理员（管理员拥有所有权限）
      const prismaClient = getPrismaClient()
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      })

      if (user?.admin) {
        return next()
      }

      // 获取用户的所有权限
      const userWithRoles = await prismaClient.user.findUnique({
        where: { id: userId },
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!userWithRoles) {
        return res.status(403).json({
          success: false,
          message: '用户不存在',
          data: null,
        })
      }

      // 收集所有权限代码
      const userPermissions = new Set<string>()

      userWithRoles.userRoles.forEach(userRole => {
        // 确保角色存在且状态为激活
        if (userRole.role && userRole.role.status === 'ACTIVE') {
          userRole.role.rolePermissions.forEach(rolePermission => {
            userPermissions.add(rolePermission.permission.code)
          })
        }
      })

      // 检查是否拥有所需权限
      if (!userPermissions.has(requiredPermission)) {
        return res.status(403).json({
          success: false,
          message: `权限不足，需要权限: ${requiredPermission}`,
          data: null,
        })
      }

      // 权限验证通过，继续执行
      next()
    } catch (error) {
      console.error('权限验证中间件错误:', error)
      return res.status(500).json({
        success: false,
        message: '权限验证失败',
        data: null,
      })
    }
  }
}

/**
 * 多权限验证中间件（需要拥有其中任一权限）
 * @param requiredPermissions 需要的权限代码数组
 * @returns Express 中间件函数
 */
export function requireAnyPermission(requiredPermissions: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: '用户未认证',
          data: null,
        })
      }

      // 检查用户是否为管理员
      const prismaClient = getPrismaClient()
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      })

      if (user?.admin) {
        return next()
      }

      // 获取用户权限
      const userWithRoles = await prismaClient.user.findUnique({
        where: { id: userId },
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!userWithRoles) {
        return res.status(403).json({
          success: false,
          message: '用户不存在',
          data: null,
        })
      }

      // 收集用户权限
      const userPermissions = new Set<string>()

      userWithRoles.userRoles.forEach(userRole => {
        // 确保角色存在且状态为激活
        if (userRole.role && userRole.role.status === 'ACTIVE') {
          userRole.role.rolePermissions.forEach(rolePermission => {
            userPermissions.add(rolePermission.permission.code)
          })
        }
      })

      // 检查是否拥有任一所需权限
      const hasAnyPermission = requiredPermissions.some(permission =>
        userPermissions.has(permission)
      )

      if (!hasAnyPermission) {
        return res.status(403).json({
          success: false,
          message: `权限不足，需要以下权限之一: ${requiredPermissions.join(', ')}`,
          data: null,
        })
      }

      next()
    } catch (error) {
      console.error('多权限验证中间件错误:', error)
      return res.status(500).json({
        success: false,
        message: '权限验证失败',
        data: null,
      })
    }
  }
}

/**
 * 全权限验证中间件（需要拥有所有权限）
 * @param requiredPermissions 需要的权限代码数组
 * @returns Express 中间件函数
 */
export function requireAllPermissions(requiredPermissions: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: '用户未认证',
          data: null,
        })
      }

      // 检查用户是否为管理员
      const prismaClient = getPrismaClient()
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      })

      if (user?.admin) {
        return next()
      }

      // 获取用户权限
      const userWithRoles = await prismaClient.user.findUnique({
        where: { id: userId },
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!userWithRoles) {
        return res.status(403).json({
          success: false,
          message: '用户不存在',
          data: null,
        })
      }

      // 收集用户权限
      const userPermissions = new Set<string>()

      userWithRoles.userRoles.forEach(userRole => {
        // 确保角色存在且状态为激活
        if (userRole.role && userRole.role.status === 'ACTIVE') {
          userRole.role.rolePermissions.forEach(rolePermission => {
            userPermissions.add(rolePermission.permission.code)
          })
        }
      })

      // 检查是否拥有所有所需权限
      const hasAllPermissions = requiredPermissions.every(permission =>
        userPermissions.has(permission)
      )

      if (!hasAllPermissions) {
        const missingPermissions = requiredPermissions.filter(
          permission => !userPermissions.has(permission)
        )

        return res.status(403).json({
          success: false,
          message: `权限不足，缺少权限: ${missingPermissions.join(', ')}`,
          data: null,
        })
      }

      next()
    } catch (error) {
      console.error('全权限验证中间件错误:', error)
      return res.status(500).json({
        success: false,
        message: '权限验证失败',
        data: null,
      })
    }
  }
}

/**
 * 权限缓存管理
 */
class PermissionCache {
  private cache = new Map<string, { permissions: Set<string>; timestamp: number }>()
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5分钟缓存

  /**
   * 获取用户权限（带缓存）
   */
  async getUserPermissions(userId: string): Promise<Set<string>> {
    const cached = this.cache.get(userId)
    const now = Date.now()

    // 检查缓存是否有效
    if (cached && now - cached.timestamp < this.CACHE_TTL) {
      return cached.permissions
    }

    // 从数据库获取权限
    const prismaClient = getPrismaClient()
    const userWithRoles = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const permissions = new Set<string>()

    if (userWithRoles) {
      userWithRoles.userRoles.forEach(userRole => {
        // 确保角色存在且状态为激活
        if (userRole.role && userRole.role.status === 'ACTIVE') {
          userRole.role.rolePermissions.forEach(rolePermission => {
            permissions.add(rolePermission.permission.code)
          })
        }
      })
    }

    // 更新缓存
    this.cache.set(userId, { permissions, timestamp: now })

    return permissions
  }

  /**
   * 清除用户权限缓存
   */
  clearUserCache(userId: string): void {
    this.cache.delete(userId)
  }

  /**
   * 清除所有权限缓存
   */
  clearAllCache(): void {
    this.cache.clear()
  }
}

export const permissionCache = new PermissionCache()
