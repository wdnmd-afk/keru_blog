import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator'

// 权限类型枚举
export enum PermissionType {
  PAGE = 'PAGE',
  BUTTON = 'BUTTON',
}

// 角色状态枚举
export enum RoleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

// 权限相关 DTO

// 创建权限 DTO
export class CreatePermissionDto {
  @IsString()
  name: string

  @IsString()
  code: string

  @IsEnum(PermissionType)
  type: PermissionType

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  parentId?: string
}

// 更新权限 DTO
export class UpdatePermissionDto {
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  code?: string

  @IsOptional()
  @IsEnum(PermissionType)
  type?: PermissionType

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  parentId?: string
}

// 删除权限 DTO
export class DeletePermissionDto {
  @IsString()
  id: string
}

// 查询权限 DTO
export class QueryPermissionDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(PermissionType)
  type?: PermissionType

  @IsOptional()
  @IsString()
  parentId?: string
}

// 角色相关 DTO

// 创建角色 DTO
export class CreateRoleDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsEnum(RoleStatus)
  status?: RoleStatus
}

// 更新角色 DTO
export class UpdateRoleDto {
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsEnum(RoleStatus)
  status?: RoleStatus
}

// 删除角色 DTO
export class DeleteRoleDto {
  @IsString()
  id: string
}

// 查询角色 DTO
export class QueryRoleDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(RoleStatus)
  status?: RoleStatus
}

// 角色权限分配 DTO

// 为角色分配权限 DTO
export class AssignPermissionsToRoleDto {
  @IsString()
  roleId: string

  @IsArray()
  @IsString({ each: true })
  permissionIds: string[]
}

// 从角色移除权限 DTO
export class RemovePermissionsFromRoleDto {
  @IsString()
  roleId: string

  @IsArray()
  @IsString({ each: true })
  permissionIds: string[]
}

// 用户角色分配 DTO

// 为用户分配角色 DTO
export class AssignRolesToUserDto {
  @IsString()
  userId: string

  @IsArray()
  @IsString({ each: true })
  roleIds: string[]
}

// 从用户移除角色 DTO
export class RemoveRolesFromUserDto {
  @IsString()
  userId: string

  @IsArray()
  @IsString({ each: true })
  roleIds: string[]
}

// 权限验证 DTO

// 验证用户权限 DTO
export class CheckUserPermissionDto {
  @IsString()
  userId: string

  @IsString()
  permissionCode: string
}

// 获取用户权限 DTO
export class GetUserPermissionsDto {
  @IsString()
  userId: string
}

// 获取角色权限 DTO
export class GetRolePermissionsDto {
  @IsString()
  roleId: string
}

// 批量操作 DTO

// 批量删除权限 DTO
export class BatchDeletePermissionsDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[]
}

// 批量删除角色 DTO
export class BatchDeleteRolesDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[]
}

// 批量更新角色状态 DTO
export class BatchUpdateRoleStatusDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[]

  @IsEnum(RoleStatus)
  status: RoleStatus
}

// 响应类型定义

// 权限响应类型
export interface PermissionResponse {
  id: string
  name: string
  code: string
  type: PermissionType
  description?: string
  parentId?: string
  children?: PermissionResponse[]
  createdAt: Date
  updatedAt: Date
}

// 角色响应类型
export interface RoleResponse {
  id: string
  name: string
  description?: string
  status: RoleStatus
  createdAt: Date
  updatedAt: Date
  permissions?: PermissionResponse[]
}

// 用户角色响应类型
export interface UserRoleResponse {
  id: string
  userId: string
  roleId: string
  role: RoleResponse
  createdAt: Date
}

// 权限树节点类型
export interface PermissionTreeNode {
  id: string
  name: string
  code: string
  type: PermissionType
  description?: string
  children?: PermissionTreeNode[]
}

// 分页查询基础 DTO
export class PaginationDto {
  @IsOptional()
  @IsString()
  page?: string = '1'

  @IsOptional()
  @IsString()
  pageSize?: string = '10'

  @IsOptional()
  @IsString()
  sortBy?: string

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc'
}

// 权限分页查询 DTO
export class QueryPermissionsWithPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(PermissionType)
  type?: PermissionType

  @IsOptional()
  @IsString()
  parentId?: string
}

// 角色分页查询 DTO
export class QueryRolesWithPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(RoleStatus)
  status?: RoleStatus
}
