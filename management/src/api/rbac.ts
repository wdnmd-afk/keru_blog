// 管理系统 RBAC 权限管理相关 API
import { ManagementApi } from "@/utils";
import { PaginatedResponse } from "./types";

// ==================== 权限管理相关类型定义 ====================

// 权限类型枚举
export type PermissionType = "PAGE" | "BUTTON";

// 角色状态枚举
export type RoleStatus = "ACTIVE" | "INACTIVE";

// 权限接口
export interface Permission {
  id: string;
  name: string;
  code: string;
  type: PermissionType;
  description?: string;
  parentId?: string;
  children?: Permission[];
  createdAt: string;
  updatedAt: string;
}

// 角色接口
export interface Role {
  id: string;
  name: string;
  description?: string;
  status: RoleStatus;
  permissions?: Permission[];
  createdAt: string;
  updatedAt: string;
}

// 用户角色接口
export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  user?: {
    id: string;
    name: string;
    email?: string;
  };
  role?: Role;
  createdAt: string;
}

// ==================== 请求参数类型定义 ====================

// 权限创建参数
export interface CreatePermissionRequest {
  name: string;
  code: string;
  type: PermissionType;
  description?: string;
  parentId?: string;
}

// 权限更新参数
export interface UpdatePermissionRequest {
  id: string;
  name?: string;
  code?: string;
  type?: PermissionType;
  description?: string;
  parentId?: string;
}

// 权限删除参数
export interface DeletePermissionRequest {
  id: string;
}

// 权限查询参数
export interface QueryPermissionRequest {
  name?: string;
  code?: string;
  type?: PermissionType;
  parentId?: string;
  page?: number;
  pageSize?: number;
}

// 角色创建参数
export interface CreateRoleRequest {
  name: string;
  description?: string;
  status?: RoleStatus;
}

// 角色更新参数
export interface UpdateRoleRequest {
  id: string;
  name?: string;
  description?: string;
  status?: RoleStatus;
}

// 角色删除参数
export interface DeleteRoleRequest {
  id: string;
}

// 角色查询参数
export interface QueryRoleRequest {
  name?: string;
  status?: RoleStatus;
  page?: number;
  pageSize?: number;
}

// 角色权限分配参数
export interface AssignRolePermissionsRequest {
  roleId: string;
  permissionIds: string[];
}

// 用户角色分配参数
export interface AssignUserRolesRequest {
  userId: string;
  roleIds: string[];
}

// 权限验证参数
export interface CheckPermissionRequest {
  userId: string;
  permissionCode: string;
}

// ==================== 响应数据类型定义 ====================

// 权限树节点
export interface PermissionTreeNode {
  id: string;
  name: string;
  code: string;
  type: PermissionType;
  children?: PermissionTreeNode[];
}

/**
 * RBAC 权限管理 API 类
 */
class RbacApi {
  // ==================== 权限管理接口 ====================

  /**
   * 创建权限
   * @param params 权限创建参数
   * @returns 创建的权限信息
   */
  static async createPermission(
    params: CreatePermissionRequest,
  ): Promise<Permission> {
    try {
      const response = await ManagementApi.post<Permission>(
        "/rbac/permission/create",
        params,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "创建权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 更新权限
   * @param params 权限更新参数
   * @returns 更新的权限信息
   */
  static async updatePermission(
    params: UpdatePermissionRequest,
  ): Promise<Permission> {
    try {
      const response = await ManagementApi.post<Permission>(
        "/rbac/permission/update",
        params,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "更新权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 删除权限
   * @param params 权限删除参数
   * @returns 删除结果
   */
  static async deletePermission(
    params: DeletePermissionRequest,
  ): Promise<void> {
    try {
      await ManagementApi.post("/rbac/permission/delete", params);
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "删除权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 查询权限列表
   * @param params 查询参数
   * @returns 权限列表
   */
  static async queryPermissions(
    params?: QueryPermissionRequest,
  ): Promise<Permission[]> {
    try {
      const response = await ManagementApi.post<Permission[]>(
        "/rbac/permission/query",
        params || {},
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "查询权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 分页查询权限列表
   * @param params 查询参数
   * @returns 分页权限数据
   */
  static async queryPermissionsWithPagination(
    params: QueryPermissionRequest,
  ): Promise<PaginatedResponse<Permission>> {
    try {
      const response = await ManagementApi.post<PaginatedResponse<Permission>>(
        "/rbac/permission/queryWithPagination",
        params,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "分页查询权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 获取权限树结构
   * @returns 权限树数据
   */
  static async getPermissionTree(): Promise<PermissionTreeNode[]> {
    try {
      const response = await ManagementApi.post<PermissionTreeNode[]>(
        "/rbac/permission/tree",
        {},
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "获取权限树失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 批量删除权限
   * @param ids 权限ID数组
   * @returns 删除结果
   */
  static async batchDeletePermissions(ids: string[]): Promise<void> {
    try {
      await ManagementApi.post("/rbac/permission/batchDelete", { ids });
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "批量删除权限失败";
      throw new Error(errorMessage);
    }
  }

  // ==================== 角色管理接口 ====================

  /**
   * 创建角色
   * @param params 角色创建参数
   * @returns 创建的角色信息
   */
  static async createRole(params: CreateRoleRequest): Promise<Role> {
    try {
      const response = await ManagementApi.post<Role>(
        "/rbac/role/create",
        params,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "创建角色失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 更新角色
   * @param params 角色更新参数
   * @returns 更新的角色信息
   */
  static async updateRole(params: UpdateRoleRequest): Promise<Role> {
    try {
      const response = await ManagementApi.post<Role>(
        "/rbac/role/update",
        params,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "更新角色失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 删除角色
   * @param params 角色删除参数
   * @returns 删除结果
   */
  static async deleteRole(params: DeleteRoleRequest): Promise<void> {
    try {
      await ManagementApi.post("/rbac/role/delete", params);
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "删除角色失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 查询角色列表
   * @param params 查询参数
   * @returns 角色列表
   */
  static async queryRoles(params?: QueryRoleRequest): Promise<Role[]> {
    try {
      const response = await ManagementApi.post<Role[]>(
        "/rbac/role/query",
        params || {},
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "查询角色失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 分页查询角色列表
   * @param params 查询参数
   * @returns 分页角色数据
   */
  static async queryRolesWithPagination(
    params: QueryRoleRequest,
  ): Promise<PaginatedResponse<Role>> {
    try {
      const response = await ManagementApi.post<PaginatedResponse<Role>>(
        "/rbac/role/queryWithPagination",
        params,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "分页查询角色失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 批量删除角色
   * @param ids 角色ID数组
   * @returns 删除结果
   */
  static async batchDeleteRoles(ids: string[]): Promise<void> {
    try {
      await ManagementApi.post("/rbac/role/batchDelete", { ids });
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "批量删除角色失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 批量更新角色状态
   * @param ids 角色ID数组
   * @param status 新状态
   * @returns 更新结果
   */
  static async batchUpdateRoleStatus(
    ids: string[],
    status: RoleStatus,
  ): Promise<void> {
    try {
      await ManagementApi.post("/rbac/role/batchUpdateStatus", { ids, status });
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "批量更新角色状态失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 为角色分配权限
   * @param params 角色权限分配参数
   * @returns 分配结果
   */
  static async assignRolePermissions(
    params: AssignRolePermissionsRequest,
  ): Promise<void> {
    try {
      await ManagementApi.post("/rbac/role/assignPermissions", params);
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "分配角色权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 获取角色的权限列表
   * @param roleId 角色ID
   * @returns 权限列表
   */
  static async getRolePermissions(roleId: string): Promise<Permission[]> {
    try {
      const response = await ManagementApi.post<Permission[]>(
        "/rbac/role/permissions",
        { roleId },
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "获取角色权限失败";
      throw new Error(errorMessage);
    }
  }

  // ==================== 用户角色管理接口 ====================

  /**
   * 为用户分配角色
   * @param params 用户角色分配参数
   * @returns 分配结果
   */
  static async assignUserRoles(params: AssignUserRolesRequest): Promise<void> {
    try {
      await ManagementApi.post("/rbac/user/assignRoles", params);
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "分配用户角色失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 获取用户的角色列表
   * @param userId 用户ID
   * @returns 角色列表
   */
  static async getUserRoles(userId: string): Promise<Role[]> {
    try {
      const response = await ManagementApi.post<Role[]>("/rbac/user/roles", {
        userId,
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "获取用户角色失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 获取用户的权限列表
   * @param userId 用户ID
   * @returns 权限列表
   */
  static async getUserPermissions(userId: string): Promise<Permission[]> {
    try {
      const response = await ManagementApi.post<Permission[]>(
        "/rbac/user/permissions",
        { userId },
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "获取用户权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 验证用户权限
   * @param params 权限验证参数
   * @returns 验证结果
   */
  static async checkUserPermission(
    params: CheckPermissionRequest,
  ): Promise<boolean> {
    try {
      const response = await ManagementApi.post<{ hasPermission: boolean }>(
        "/rbac/user/checkPermission",
        params,
      );
      return response.data.hasPermission;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "验证用户权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 获取当前用户的权限列表
   * @returns 权限列表
   */
  static async getMyPermissions(): Promise<Permission[]> {
    try {
      const response = await ManagementApi.post<Permission[]>(
        "/rbac/user/myPermissions",
        {},
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "获取当前用户权限失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 验证当前用户权限
   * @param permissionCode 权限代码
   * @returns 验证结果
   */
  static async checkMyPermission(permissionCode: string): Promise<boolean> {
    try {
      const response = await ManagementApi.post<{ hasPermission: boolean }>(
        "/rbac/user/checkMyPermission",
        { permissionCode },
      );
      return response.data.hasPermission;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "验证当前用户权限失败";
      throw new Error(errorMessage);
    }
  }
}

export default RbacApi;
export { RbacApi };
