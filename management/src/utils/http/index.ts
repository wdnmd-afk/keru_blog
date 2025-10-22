// Management 系统 HTTP 请求工具
import { BrowserLocalStorage } from "@/utils";
import { message } from "antd";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { CustomError, ResultData, ResultEnum } from "./httpEnum";

// HTTP 配置
const config = {
  // 管理系统 API 基础地址 - 使用管理端专用的 management-api 前缀
  baseURL: import.meta.env.VITE_MANAGEMENT_API_URL || "/management-api",
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

// 自定义请求配置接口
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean; // 是否显示加载状态
  noMessage?: boolean; // 是否显示错误消息
}

class ManagementHttp {
  service: AxiosInstance;
  public controller = new AbortController();
  public signal = this.controller.signal;
  // 避免 401 重复跳转登录导致闪烁
  private static redirectingUnauthorized = false;

  public constructor(config: AxiosRequestConfig) {
    // 创建 axios 实例
    this.service = axios.create({ ...config, signal: this.signal });

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * 主要用于添加 token 和其他请求头
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        // 添加认证 token - 与 frontEnd 保持一致
        if (config.headers && typeof config.headers.set === "function") {
          // 设置与 frontEnd 一致的请求头
          config.headers.set("x-access-token", "token");

          // 从本地存储获取用户信息 - 使用与 frontEnd 一致的存储键
          const userInfo = BrowserLocalStorage.get("userInfo");
          if (userInfo?.token) {
            config.headers.set("Authorization", userInfo.token);
          }

          // 设置内容类型
          if (!config.headers.get("Content-Type")) {
            config.headers.set(
              "Content-Type",
              "application/json;charset=UTF-8",
            );
          }
        }

        console.log(
          "Management API 请求:",
          config.url,
          config.method?.toUpperCase(),
        );
        return config;
      },
      (error: AxiosError) => {
        console.error("请求拦截器错误:", error);
        return Promise.reject(error);
      },
    );

    /**
     * @description 响应拦截器
     * 服务器返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;

        console.log("Management API 响应:", response.config.url, data);

        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.message || "请求失败");
          return Promise.reject(data);
        }

        // 成功请求
        return data;
      },
      async (error: CustomError) => {
        const { response } = error;

        console.error("Management API 错误:", error);

        // 检查 response 是否存在
        if (!response) {
          console.log("请求被取消或网络错误:", error.message);
          message.error("网络连接失败，请检查网络设置");
          return Promise.reject(error);
        }

        const { data } = response;

        // 检查 data 是否存在
        if (!data) {
          console.log("响应数据为空");
          message.error("服务器响应异常");
          return Promise.reject(error);
        }

        // 根据错误状态码处理
        switch (data.code) {
          case ResultEnum.UNAUTHORIZED:
            if (!ManagementHttp.redirectingUnauthorized) {
              ManagementHttp.redirectingUnauthorized = true;
              // 直接清理并跳转，避免与登录页自动跳转形成循环闪烁
              BrowserLocalStorage.remove("userInfo");
              BrowserLocalStorage.remove("savedLoginInfo");
              // 使用 replace 避免历史回退再次进入受限页
              window.location.replace("/login");
            }
            return Promise.reject(data);
          case ResultEnum.FORBIDDEN:
            message.error("权限不足，无法访问该资源");
            break;
          case ResultEnum.NOT_FOUND:
            message.error("请求的资源不存在");
            break;
          case ResultEnum.ERROR:
            message.error(data.message || "服务器内部错误");
            break;
          case ResultEnum.NORMAL_ERROR:
            message.error(data.message || "请求失败");
            break;
          default:
            message.error(data.message || "未知错误");
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T = any>(
    url: string,
    params?: object,
    _object = {},
  ): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }

  post<T = any>(
    url: string,
    params?: object | string,
    _object = {},
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }

  postFile<T = any>(
    url: string,
    params?: FormData,
    _object = {},
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ..._object,
    });
  }

  put<T = any>(
    url: string,
    params?: object,
    _object = {},
  ): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }

  delete<T = any>(
    url: string,
    params?: any,
    _object = {},
  ): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }

  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }

  /**
   * 取消所有请求
   */
  cancelAllRequests() {
    this.controller.abort();
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
}

// 创建管理系统专用的 HTTP 实例
const ManagementApi = new ManagementHttp(config);

export { ManagementApi };
export default ManagementApi;
