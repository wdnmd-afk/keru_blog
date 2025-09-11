// 管理系统认证相关 API - 与 frontEnd 保持一致
import { ManagementApi } from "@/utils";

// 登录请求参数类型 - 与 frontEnd 保持一致
export interface LoginRequest {
  name: string;
  password: string;
  remember?: boolean;
}

// 登录响应数据类型 - 与 frontEnd 保持一致
export interface LoginResponse {
  id: string;
  name: string;
  email?: string;
  admin: boolean;
  token: string;
  avatar?: string;
  lastLoginTime?: string;
}

// 注册请求参数类型
export interface RegisterRequest {
  name: string;
  password: string;
  email: string;
  admin?: boolean;
}

// 重置密码请求参数类型
export interface ResetPasswordRequest {
  name: string;
  email: string;
  newPassword: string;
}

/**
 * 管理系统认证 API 类
 */
class AuthApi {
  /**
   * 用户登录 - 与 frontEnd 保持一致
   * @param params 登录参数
   * @returns 登录响应数据
   */
  static async login(params: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await ManagementApi.post<LoginResponse>(
        "/user/login",
        params,
      );
      return response.data;
    } catch (error: any) {
      // 处理登录错误
      const errorMessage = error?.message || error?.data?.message || "登录失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 用户登出
   * @returns 登出结果
   */
  static async logout(): Promise<void> {
    try {
      await ManagementApi.post("/user/logout");
    } catch (error: any) {
      console.warn("登出请求失败:", error);
      // 即使登出请求失败，也要清除本地状态
    }
  }

  /**
   * 用户注册 - 与 frontEnd 保持一致
   * @param params 注册参数
   * @returns 注册结果
   */
  static async register(params: RegisterRequest): Promise<any> {
    try {
      const response = await ManagementApi.post("/user/register", params);
      return response.data;
    } catch (error: any) {
      const errorMessage = error?.message || error?.data?.message || "注册失败";
      throw new Error(errorMessage);
    }
  }

  /**
   * 重置密码 - 与 frontEnd 保持一致
   * @param params 重置密码参数
   * @returns 重置结果
   */
  static async resetPassword(params: ResetPasswordRequest): Promise<any> {
    try {
      const response = await ManagementApi.post("/user/resetPassword", params);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.data?.message || "重置密码失败";
      throw new Error(errorMessage);
    }
  }
}

export default AuthApi;
export { AuthApi };
