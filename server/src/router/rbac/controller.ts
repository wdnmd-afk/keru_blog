import { validationMiddleware } from '@/middleware'
import { AuthMiddleware } from '@/middleware/auth'
import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpPost as PostMapping } from 'inversify-express-utils'
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
  QueryPermissionDto,
  QueryPermissionsWithPaginationDto,
  QueryRoleDto,
  QueryRolesWithPaginationDto,
  UpdatePermissionDto,
  UpdateRoleDto,
} from './rbac.dto'
import { RbacService } from './service'

// 使用全局类型定义中的 customResponse
declare global {
  interface customResponse extends Response {
    sendResponse(result: any): void
  }
}

@controller('/rbac', AuthMiddleware)
export class RbacController {
  constructor(@inject(RbacService) private readonly rbacService: RbacService) {}

  // 权限管理接口

  /**
   * 创建权限
   */
  @PostMapping('/permission/create', validationMiddleware(CreatePermissionDto))
  public async createPermission(req: Request, res: customResponse) {
    const result = await this.rbacService.createPermission(req.body)
    res.sendResponse(result)
  }

  /**
   * 更新权限
   */
  @PostMapping('/permission/update', validationMiddleware(UpdatePermissionDto))
  public async updatePermission(req: Request, res: customResponse) {
    const result = await this.rbacService.updatePermission(req.body)
    res.sendResponse(result)
  }

  /**
   * 删除权限
   */
  @PostMapping('/permission/delete', validationMiddleware(DeletePermissionDto))
  public async deletePermission(req: Request, res: customResponse) {
    const result = await this.rbacService.deletePermission(req.body)
    res.sendResponse(result)
  }

  /**
   * 查询权限列表
   */
  @PostMapping('/permission/query', validationMiddleware(QueryPermissionDto))
  public async queryPermissions(req: Request, res: customResponse) {
    const result = await this.rbacService.queryPermissions(req.body)
    res.sendResponse(result)
  }

  /**
   * 分页查询权限
   */
  @PostMapping(
    '/permission/queryWithPagination',
    validationMiddleware(QueryPermissionsWithPaginationDto)
  )
  public async queryPermissionsWithPagination(req: Request, res: customResponse) {
    const result = await this.rbacService.queryPermissionsWithPagination(req.body)
    res.sendResponse(result)
  }

  /**
   * 获取权限树
   */
  @PostMapping('/permission/tree')
  public async getPermissionTree(_req: Request, res: customResponse) {
    const result = await this.rbacService.getPermissionTree()
    res.sendResponse(result)
  }

  /**
   * 批量删除权限
   */
  @PostMapping('/permission/batchDelete', validationMiddleware(BatchDeletePermissionsDto))
  public async batchDeletePermissions(req: Request, res: customResponse) {
    const result = await this.rbacService.batchDeletePermissions(req.body)
    res.sendResponse(result)
  }

  // 角色管理接口

  /**
   * 创建角色
   */
  @PostMapping('/role/create', validationMiddleware(CreateRoleDto))
  public async createRole(req: Request, res: customResponse) {
    const result = await this.rbacService.createRole(req.body)
    res.sendResponse(result)
  }

  /**
   * 更新角色
   */
  @PostMapping('/role/update', validationMiddleware(UpdateRoleDto))
  public async updateRole(req: Request, res: customResponse) {
    const result = await this.rbacService.updateRole(req.body)
    res.sendResponse(result)
  }

  /**
   * 删除角色
   */
  @PostMapping('/role/delete', validationMiddleware(DeleteRoleDto))
  public async deleteRole(req: Request, res: customResponse) {
    const result = await this.rbacService.deleteRole(req.body)
    res.sendResponse(result)
  }

  /**
   * 查询角色列表
   */
  @PostMapping('/role/query', validationMiddleware(QueryRoleDto))
  public async queryRoles(req: Request, res: customResponse) {
    const result = await this.rbacService.queryRoles(req.body)
    res.sendResponse(result)
  }

  /**
   * 分页查询角色
   */
  @PostMapping('/role/queryWithPagination', validationMiddleware(QueryRolesWithPaginationDto))
  public async queryRolesWithPagination(req: Request, res: customResponse) {
    const result = await this.rbacService.queryRolesWithPagination(req.body)
    res.sendResponse(result)
  }

  /**
   * 批量删除角色
   */
  @PostMapping('/role/batchDelete', validationMiddleware(BatchDeleteRolesDto))
  public async batchDeleteRoles(req: Request, res: customResponse) {
    const result = await this.rbacService.batchDeleteRoles(req.body)
    res.sendResponse(result)
  }

  /**
   * 批量更新角色状态
   */
  @PostMapping('/role/batchUpdateStatus', validationMiddleware(BatchUpdateRoleStatusDto))
  public async batchUpdateRoleStatus(req: Request, res: customResponse) {
    const result = await this.rbacService.batchUpdateRoleStatus(req.body)
    res.sendResponse(result)
  }

  // 角色权限分配接口

  /**
   * 为角色分配权限
   */
  @PostMapping('/role/assignPermissions', validationMiddleware(AssignPermissionsToRoleDto))
  public async assignPermissionsToRole(req: Request, res: customResponse) {
    const result = await this.rbacService.assignPermissionsToRole(req.body)
    res.sendResponse(result)
  }

  /**
   * 获取角色权限
   */
  @PostMapping('/role/permissions', validationMiddleware(GetRolePermissionsDto))
  public async getRolePermissions(req: Request, res: customResponse) {
    const result = await this.rbacService.getRolePermissions(req.body)
    res.sendResponse(result)
  }

  // 用户角色分配接口

  /**
   * 为用户分配角色
   */
  @PostMapping('/user/assignRoles', validationMiddleware(AssignRolesToUserDto))
  public async assignRolesToUser(req: Request, res: customResponse) {
    const result = await this.rbacService.assignRolesToUser(req.body)
    res.sendResponse(result)
  }

  /**
   * 获取用户权限
   */
  @PostMapping('/user/permissions', validationMiddleware(GetUserPermissionsDto))
  public async getUserPermissions(req: Request, res: customResponse) {
    const result = await this.rbacService.getUserPermissions(req.body)
    res.sendResponse(result)
  }

  /**
   * 验证用户权限
   */
  @PostMapping('/user/checkPermission', validationMiddleware(CheckUserPermissionDto))
  public async checkUserPermission(req: Request, res: customResponse) {
    const result = await this.rbacService.checkUserPermission(req.body)
    res.sendResponse(result)
  }

  // 获取当前用户权限（基于 JWT token）
  @PostMapping('/user/myPermissions')
  public async getMyPermissions(req: Request, res: customResponse) {
    // 从认证中间件获取用户ID
    const userId = (req as any).user?.id

    if (!userId) {
      res.sendResponse({
        success: false,
        message: '用户未认证',
        data: null,
      })
      return
    }

    const result = await this.rbacService.getUserPermissions({ userId })
    res.sendResponse(result)
  }

  // 验证当前用户权限（基于 JWT token）
  @PostMapping('/user/checkMyPermission')
  public async checkMyPermission(req: Request, res: customResponse) {
    const userId = (req as any).user?.id
    const { permissionCode } = req.body

    if (!userId) {
      res.sendResponse({
        success: false,
        message: '用户未认证',
        data: null,
      })
      return
    }

    if (!permissionCode) {
      res.sendResponse({
        success: false,
        message: '权限代码不能为空',
        data: null,
      })
      return
    }

    const result = await this.rbacService.checkUserPermission({ userId, permissionCode })
    res.sendResponse(result)
  }
}
