// HTTP 相关枚举和类型定义

// 请求结果枚举
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NORMAL_ERROR = 400,
  TIMEOUT = 10000,
}

// 请求方法枚举
export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

// 内容类型枚举
export enum ContentTypeEnum {
  JSON = "application/json;charset=UTF-8",
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  FORM_DATA = "multipart/form-data",
}

// 请求结果数据类型
export interface ResultData<T = any> {
  code: number;
  message: string;
  data: T;
}

// 自定义错误类型
export interface CustomError extends Error {
  response?: {
    data: ResultData;
    status: number;
    statusText: string;
  };
}
