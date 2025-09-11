import { ManagementApi } from "@/utils/http";
import { PaginatedResponse } from "./types";

/**
 * 用户信息接口
 * 注意：与Prisma User模型字段保持一致，不包含createdAt和updatedAt字段
 */
export interface User {
  id: string;
  name: string;
  email: string;
  admin: boolean;
}

/**
 * 用户查询请求参数
 */
export interface QueryUserRequest {
  name?: string;
  email?: string;
  admin?: boolean;
  page?: number;
  pageSize?: number;
}

/**
 * 用户管理 API 服务类
 * 提供用户相关的所有 API 调用方法
 */
export class UserApi {
  /**
   * 获取用户列表
   */
  static async getUserList(): Promise<User[]> {
    try {
      const response = await ManagementApi.post<User[]>("/user/index", {});
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "获取用户列表失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 分页查询用户列表
   */
  static async queryUsers(
    params?: QueryUserRequest,
  ): Promise<PaginatedResponse<User>> {
    try {
      const response = await ManagementApi.post<PaginatedResponse<User>>(
        "/user/query",
        params || {},
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "查询用户失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 创建用户
   */
  static async createUser(userData: Omit<User, "id">): Promise<User> {
    try {
      const response = await ManagementApi.post<User>("/user/create", userData);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "创建用户失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 更新用户信息
   */
  static async updateUser(
    id: string,
    userData: Partial<Omit<User, "id">>,
  ): Promise<User> {
    try {
      const response = await ManagementApi.post<User>("/user/update", {
        id,
        ...userData,
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "更新用户失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 删除用户
   */
  static async deleteUser(id: string): Promise<void> {
    try {
      await ManagementApi.post("/user/delete", { id });
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "删除用户失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 批量删除用户
   */
  static async batchDeleteUsers(ids: string[]): Promise<void> {
    try {
      await ManagementApi.post("/user/batchDelete", { ids });
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "批量删除用户失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 重置用户密码
   */
  static async resetUserPassword(
    id: string,
    newPassword: string,
  ): Promise<void> {
    try {
      await ManagementApi.post("/user/resetPassword", {
        id,
        password: newPassword,
      });
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "重置密码失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 切换用户管理员状态
   */
  static async toggleUserAdmin(id: string, admin: boolean): Promise<User> {
    try {
      const response = await ManagementApi.post<User>("/user/toggleAdmin", {
        id,
        admin,
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "切换管理员状态失败";
      throw new Error(errorMessage);
    }
  }
}
