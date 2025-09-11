// 管理系统 API 通用类型定义

/**
 * 分页响应接口
 * 统一的分页数据结构
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages?: number; // 可选字段，用于兼容不同的分页实现
}

/**
 * API 响应基础结构
 */
export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

/**
 * 查询参数基础接口
 */
export interface BaseQueryRequest {
  page?: number;
  pageSize?: number;
  keyword?: string;
}
