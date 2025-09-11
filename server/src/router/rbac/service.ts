import { Result } from '@/utils/result'
import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { v4 as uuidv4 } from 'uuid'
import {
  AssignPermissionsToRoleDto,
  AssignRolesToUserDto,
  BatchDeletePermissionsDto,
  BatchDeleteRolesDto,
  BatchUpdateRoleStatusDto,
  CheckUserPermissionDto,
  CreatePermissionDto,
  CreateRoleDto,
  DeletePermissionDto,
  DeleteRoleDto,
  GetRolePermissionsDto,
  GetUserPermissionsDto,
  PermissionResponse,
  PermissionTreeNode,
  QueryPermissionDto,
  QueryPermissionsWithPaginationDto,
  QueryRoleDto,
  QueryRolesWithPaginationDto,
  RoleResponse,
  UpdatePermissionDto,
  UpdateRoleDto,
} from './rbac.dto'

@injectable()
export class RbacService {
  private prisma: PrismaClient

  constructor(@inject('PrismaClient') prismaFactory: () => PrismaClient) {
    this.prisma = prismaFactory()
  }

  // 权限管理方法

  /**
   * 创建权限
   */
  async createPermission(dto: CreatePermissionDto): Promise<Result<PermissionResponse>> {
    try {
      // 检查权限代码是否已存在
      const existingPermission = await this.prisma.permission.findUnique({
        where: { code: dto.code },
      })

      if (existingPermission) {
        return Result.error(400, '权限代码已存在')
      }

      // 如果有父权限，检查父权限是否存在
      if (dto.parentId) {
        const parentPermission = await this.prisma.permission.findUnique({
          where: { id: dto.parentId },
        })

        if (!parentPermission) {
          return Result.error(400, '父权限不存在')
        }
      }

      const permission = await this.prisma.permission.create({
        data: {
          id: uuidv4(),
          name: dto.name,
          code: dto.code,
          type: dto.type,
          description: dto.description,
          parentId: dto.parentId,
        },
      })

      return Result.success(permission as PermissionResponse)
    } catch (error) {
      return Result.error(500, '创建权限失败')
    }
  }

  /**
   * 更新权限
   */
  async updatePermission(dto: UpdatePermissionDto): Promise<Result<PermissionResponse>> {
    try {
      // 检查权限是否存在
      const existingPermission = await this.prisma.permission.findUnique({
        where: { id: dto.id },
      })

      if (!existingPermission) {
        return Result.error(404, '权限不存在')
      }

      // 如果更新权限代码，检查是否与其他权限冲突
      if (dto.code && dto.code !== existingPermission.code) {
        const codeConflict = await this.prisma.permission.findUnique({
          where: { code: dto.code },
        })

        if (codeConflict) {
          return Result.error(400, '权限代码已存在')
        }
      }

      // 如果更新父权限，检查父权限是否存在且不会形成循环引用
      if (dto.parentId && dto.parentId !== existingPermission.parentId) {
        if (dto.parentId === dto.id) {
          return Result.error(400, '不能将自己设为父权限')
        }

        const parentPermission = await this.prisma.permission.findUnique({
          where: { id: dto.parentId },
        })

        if (!parentPermission) {
          return Result.error(400, '父权限不存在')
        }

        // 检查是否会形成循环引用
        const isCircular = await this.checkCircularReference(dto.id, dto.parentId)
        if (isCircular) {
          return Result.error(400, '不能形成循环引用')
        }
      }

      const permission = await this.prisma.permission.update({
        where: { id: dto.id },
        data: {
          name: dto.name,
          code: dto.code,
          type: dto.type,
          description: dto.description,
          parentId: dto.parentId,
        },
      })

      return Result.success(permission as PermissionResponse)
    } catch (error) {
      return Result.error(500, '更新权限失败')
    }
  }

  /**
   * 删除权限
   */
  async deletePermission(dto: DeletePermissionDto): Promise<Result<boolean>> {
    try {
      // 检查权限是否存在
      const existingPermission = await this.prisma.permission.findUnique({
        where: { id: dto.id },
        include: { children: true },
      })

      if (!existingPermission) {
        return Result.error(404, '权限不存在')
      }

      // 检查是否有子权限
      if (existingPermission.children.length > 0) {
        return Result.error(400, '存在子权限，无法删除')
      }

      // 删除权限（级联删除相关的角色权限关联）
      await this.prisma.permission.delete({
        where: { id: dto.id },
      })

      return Result.success(true)
    } catch (error) {
      return Result.error(500, '删除权限失败')
    }
  }

  /**
   * 查询权限列表
   */
  async queryPermissions(dto: QueryPermissionDto): Promise<Result<PermissionResponse[]>> {
    try {
      const where: any = {}

      if (dto.name) {
        where.name = { contains: dto.name }
      }

      if (dto.type) {
        where.type = dto.type
      }

      if (dto.parentId !== undefined) {
        where.parentId = dto.parentId
      }

      const permissions = await this.prisma.permission.findMany({
        where,
        include: {
          children: true,
          parent: true,
        },
        orderBy: { createdAt: 'desc' },
      })

      return Result.success(permissions as PermissionResponse[])
    } catch (error) {
      return Result.error(500, '查询权限失败')
    }
  }

  /**
   * 分页查询权限
   */
  async queryPermissionsWithPagination(dto: QueryPermissionsWithPaginationDto): Promise<
    Result<{
      data: PermissionResponse[]
      total: number
      page: number
      pageSize: number
    }>
  > {
    try {
      const page = parseInt(dto.page || '1')
      const pageSize = parseInt(dto.pageSize || '10')
      const skip = (page - 1) * pageSize

      const where: any = {}

      if (dto.name) {
        where.name = { contains: dto.name }
      }

      if (dto.type) {
        where.type = dto.type
      }

      if (dto.parentId !== undefined) {
        where.parentId = dto.parentId
      }

      const [permissions, total] = await Promise.all([
        this.prisma.permission.findMany({
          where,
          include: {
            children: true,
            parent: true,
          },
          orderBy: dto.sortBy ? { [dto.sortBy]: dto.sortOrder } : { createdAt: 'desc' },
          skip,
          take: pageSize,
        }),
        this.prisma.permission.count({ where }),
      ])

      return Result.success({
        data: permissions as PermissionResponse[],
        total,
        page,
        pageSize,
      })
    } catch (error) {
      return Result.error(500, '分页查询权限失败')
    }
  }

  /**
   * 获取权限树
   */
  async getPermissionTree(): Promise<Result<PermissionTreeNode[]>> {
    try {
      const permissions = await this.prisma.permission.findMany({
        orderBy: { createdAt: 'asc' },
      })

      const tree = this.buildPermissionTree(permissions)
      return Result.success(tree)
    } catch (error) {
      return Result.error(500, '获取权限树失败')
    }
  }

  /**
   * 角色管理方法
   */

  /**
   * 创建角色
   */
  async createRole(dto: CreateRoleDto): Promise<Result<RoleResponse>> {
    try {
      // 检查角色名称是否已存在
      const existingRole = await this.prisma.role.findUnique({
        where: { name: dto.name },
      })

      if (existingRole) {
        return Result.error(400, '角色名称已存在')
      }

      const role = await this.prisma.role.create({
        data: {
          id: uuidv4(),
          name: dto.name,
          description: dto.description,
          status: dto.status || 'ACTIVE',
        },
      })

      return Result.success(role as RoleResponse)
    } catch (error) {
      return Result.error(500, '创建角色失败')
    }
  }

  /**
   * 更新角色
   */
  async updateRole(dto: UpdateRoleDto): Promise<Result<RoleResponse>> {
    try {
      // 检查角色是否存在
      const existingRole = await this.prisma.role.findUnique({
        where: { id: dto.id },
      })

      if (!existingRole) {
        return Result.error(404, '角色不存在')
      }

      // 如果更新角色名称，检查是否与其他角色冲突
      if (dto.name && dto.name !== existingRole.name) {
        const nameConflict = await this.prisma.role.findUnique({
          where: { name: dto.name },
        })

        if (nameConflict) {
          return Result.error(400, '角色名称已存在')
        }
      }

      const role = await this.prisma.role.update({
        where: { id: dto.id },
        data: {
          name: dto.name,
          description: dto.description,
          status: dto.status,
        },
      })

      return Result.success(role as RoleResponse)
    } catch (error) {
      return Result.error(500, '更新角色失败')
    }
  }

  // 私有辅助方法

  /**
   * 检查循环引用
   */
  private async checkCircularReference(permissionId: string, parentId: string): Promise<boolean> {
    let currentId = parentId
    const visited = new Set<string>()

    while (currentId) {
      if (visited.has(currentId) || currentId === permissionId) {
        return true
      }

      visited.add(currentId)

      const parent = await this.prisma.permission.findUnique({
        where: { id: currentId },
        select: { parentId: true },
      })

      currentId = parent?.parentId || null
    }

    return false
  }

  /**
   * 删除角色
   */
  async deleteRole(dto: DeleteRoleDto): Promise<Result<boolean>> {
    try {
      // 检查角色是否存在
      const existingRole = await this.prisma.role.findUnique({
        where: { id: dto.id },
        include: { userRoles: true },
      })

      if (!existingRole) {
        return Result.error(404, '角色不存在')
      }

      // 检查是否有用户使用该角色
      if (existingRole.userRoles.length > 0) {
        return Result.error(400, '该角色正在被用户使用，无法删除')
      }

      // 删除角色（级联删除相关的角色权限关联）
      await this.prisma.role.delete({
        where: { id: dto.id },
      })

      return Result.success(true)
    } catch (error) {
      return Result.error(500, '删除角色失败')
    }
  }

  /**
   * 查询角色列表
   */
  async queryRoles(dto: QueryRoleDto): Promise<Result<RoleResponse[]>> {
    try {
      const where: any = {}

      if (dto.name) {
        where.name = { contains: dto.name }
      }

      if (dto.status) {
        where.status = dto.status
      }

      const roles = await this.prisma.role.findMany({
        where,
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      const rolesWithPermissions = roles.map(role => ({
        ...role,
        permissions: role.rolePermissions.map(rp => rp.permission),
      }))

      return Result.success(rolesWithPermissions as RoleResponse[])
    } catch (error) {
      return Result.error(500, '查询角色失败')
    }
  }

  /**
   * 分页查询角色
   */
  async queryRolesWithPagination(dto: QueryRolesWithPaginationDto): Promise<
    Result<{
      data: RoleResponse[]
      total: number
      page: number
      pageSize: number
    }>
  > {
    try {
      const page = parseInt(dto.page || '1')
      const pageSize = parseInt(dto.pageSize || '10')
      const skip = (page - 1) * pageSize

      const where: any = {}

      if (dto.name) {
        where.name = { contains: dto.name }
      }

      if (dto.status) {
        where.status = dto.status
      }

      const [roles, total] = await Promise.all([
        this.prisma.role.findMany({
          where,
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
          orderBy: dto.sortBy ? { [dto.sortBy]: dto.sortOrder } : { createdAt: 'desc' },
          skip,
          take: pageSize,
        }),
        this.prisma.role.count({ where }),
      ])

      const rolesWithPermissions = roles.map(role => ({
        ...role,
        permissions: role.rolePermissions.map(rp => rp.permission),
      }))

      return Result.success({
        data: rolesWithPermissions as RoleResponse[],
        total,
        page,
        pageSize,
      })
    } catch (error) {
      return Result.error(500, '分页查询角色失败')
    }
  }

  /**
   * 为角色分配权限
   */
  async assignPermissionsToRole(dto: AssignPermissionsToRoleDto): Promise<Result<boolean>> {
    try {
      // 检查角色是否存在
      const role = await this.prisma.role.findUnique({
        where: { id: dto.roleId },
      })

      if (!role) {
        return Result.error(404, '角色不存在')
      }

      // 检查权限是否都存在
      const permissions = await this.prisma.permission.findMany({
        where: { id: { in: dto.permissionIds } },
      })

      if (permissions.length !== dto.permissionIds.length) {
        return Result.error(400, '部分权限不存在')
      }

      // 删除现有的角色权限关联
      await this.prisma.rolePermission.deleteMany({
        where: { roleId: dto.roleId },
      })

      // 创建新的角色权限关联
      const rolePermissions = dto.permissionIds.map(permissionId => ({
        id: uuidv4(),
        roleId: dto.roleId,
        permissionId,
      }))

      await this.prisma.rolePermission.createMany({
        data: rolePermissions,
      })

      return Result.success(true)
    } catch (error) {
      return Result.error(500, '分配权限失败')
    }
  }

  /**
   * 为用户分配角色
   */
  async assignRolesToUser(dto: AssignRolesToUserDto): Promise<Result<boolean>> {
    try {
      // 检查用户是否存在
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      })

      if (!user) {
        return Result.error(404, '用户不存在')
      }

      // 检查角色是否都存在
      const roles = await this.prisma.role.findMany({
        where: { id: { in: dto.roleIds } },
      })

      if (roles.length !== dto.roleIds.length) {
        return Result.error(400, '部分角色不存在')
      }

      // 删除现有的用户角色关联
      await this.prisma.userRole.deleteMany({
        where: { userId: dto.userId },
      })

      // 创建新的用户角色关联
      const userRoles = dto.roleIds.map(roleId => ({
        id: uuidv4(),
        userId: dto.userId,
        roleId,
      }))

      await this.prisma.userRole.createMany({
        data: userRoles,
      })

      return Result.success(true)
    } catch (error) {
      return Result.error(500, '分配角色失败')
    }
  }

  /**
   * 验证用户权限
   */
  async checkUserPermission(dto: CheckUserPermissionDto): Promise<Result<boolean>> {
    try {
      // 获取用户的所有权限
      const userPermissions = await this.getUserPermissions({ userId: dto.userId })

      if (!userPermissions.success || !userPermissions.data) {
        return Result.success(false)
      }

      // 检查是否包含指定权限
      const hasPermission = userPermissions.data.some(
        permission => permission.code === dto.permissionCode
      )

      return Result.success(hasPermission)
    } catch (error) {
      return Result.error(500, '验证权限失败')
    }
  }

  /**
   * 获取用户权限
   */
  async getUserPermissions(dto: GetUserPermissionsDto): Promise<Result<PermissionResponse[]>> {
    try {
      const userWithRoles = await this.prisma.user.findUnique({
        where: { id: dto.userId },
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
        return Result.error(404, '用户不存在')
      }

      // 收集所有权限，去重
      const permissionMap = new Map<string, PermissionResponse>()

      userWithRoles.userRoles.forEach(userRole => {
        userRole.role.rolePermissions.forEach(rolePermission => {
          const permission = rolePermission.permission
          permissionMap.set(permission.id, permission as PermissionResponse)
        })
      })

      const permissions = Array.from(permissionMap.values())
      return Result.success(permissions)
    } catch (error) {
      return Result.error(500, '获取用户权限失败')
    }
  }

  /**
   * 获取角色权限
   */
  async getRolePermissions(dto: GetRolePermissionsDto): Promise<Result<PermissionResponse[]>> {
    try {
      const roleWithPermissions = await this.prisma.role.findUnique({
        where: { id: dto.roleId },
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      })

      if (!roleWithPermissions) {
        return Result.error(404, '角色不存在')
      }

      const permissions = roleWithPermissions.rolePermissions.map(
        rp => rp.permission as PermissionResponse
      )

      return Result.success(permissions)
    } catch (error) {
      return Result.error(500, '获取角色权限失败')
    }
  }

  /**
   * 批量删除权限
   */
  async batchDeletePermissions(dto: BatchDeletePermissionsDto): Promise<Result<boolean>> {
    try {
      // 检查是否有子权限
      const permissionsWithChildren = await this.prisma.permission.findMany({
        where: {
          id: { in: dto.ids },
        },
        include: { children: true },
      })

      const hasChildren = permissionsWithChildren.some(p => p.children.length > 0)
      if (hasChildren) {
        return Result.error(400, '部分权限存在子权限，无法删除')
      }

      // 批量删除
      await this.prisma.permission.deleteMany({
        where: { id: { in: dto.ids } },
      })

      return Result.success(true)
    } catch (error) {
      return Result.error(500, '批量删除权限失败')
    }
  }

  /**
   * 批量删除角色
   */
  async batchDeleteRoles(dto: BatchDeleteRolesDto): Promise<Result<boolean>> {
    try {
      // 检查是否有用户使用这些角色
      const rolesWithUsers = await this.prisma.role.findMany({
        where: {
          id: { in: dto.ids },
        },
        include: { userRoles: true },
      })

      const hasUsers = rolesWithUsers.some(r => r.userRoles.length > 0)
      if (hasUsers) {
        return Result.error(400, '部分角色正在被用户使用，无法删除')
      }

      // 批量删除
      await this.prisma.role.deleteMany({
        where: { id: { in: dto.ids } },
      })

      return Result.success(true)
    } catch (error) {
      return Result.error(500, '批量删除角色失败')
    }
  }

  /**
   * 批量更新角色状态
   */
  async batchUpdateRoleStatus(dto: BatchUpdateRoleStatusDto): Promise<Result<boolean>> {
    try {
      await this.prisma.role.updateMany({
        where: { id: { in: dto.ids } },
        data: { status: dto.status },
      })

      return Result.success(true)
    } catch (error) {
      return Result.error(500, '批量更新角色状态失败')
    }
  }

  /**
   * 构建权限树
   */
  private buildPermissionTree(permissions: any[]): PermissionTreeNode[] {
    const permissionMap = new Map<string, PermissionTreeNode>()
    const rootPermissions: PermissionTreeNode[] = []

    // 创建权限节点映射
    permissions.forEach(permission => {
      permissionMap.set(permission.id, {
        id: permission.id,
        name: permission.name,
        code: permission.code,
        type: permission.type,
        description: permission.description,
        children: [],
      })
    })

    // 构建树结构
    permissions.forEach(permission => {
      const node = permissionMap.get(permission.id)!

      if (permission.parentId) {
        const parent = permissionMap.get(permission.parentId)
        if (parent) {
          parent.children!.push(node)
        }
      } else {
        rootPermissions.push(node)
      }
    })

    return rootPermissions
  }
}
