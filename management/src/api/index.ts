// 管理系统 API 统一导出

// 导出通用类型
export * from "./types";

// 导出认证相关
export * from "./auth";
export { default as AuthApi } from "./auth";

// 导出RBAC相关（排除PaginatedResponse以避免冲突）
export type {
  PermissionType,
  RoleStatus,
  Permission,
  Role,
  PermissionTreeNode,
  QueryPermissionRequest,
  CreatePermissionRequest,
  UpdatePermissionRequest,
  QueryRoleRequest,
  CreateRoleRequest,
  UpdateRoleRequest,
  AssignRolePermissionsRequest,
  AssignUserRolesRequest,
} from "./rbac";
export { default as RbacApi } from "./rbac";

// 导出用户相关
export * from "./user";
export { UserApi } from "./user";

// 导出意见反馈相关
export * from "./feedback";
export { FeedbackApi } from "./feedback";
