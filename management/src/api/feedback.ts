import { ManagementApi } from "@/utils/http";
import { PaginatedResponse } from "./types";

// 意见反馈状态
export type FeedbackStatus = "PENDING" | "VIEWED" | "RESOLVED";

// 意见反馈类型/分类
export type FeedbackCategory = "SUGGESTION" | "BUG" | "OTHER";

// 意见反馈数据模型
export interface Feedback {
  id: string;
  title?: string | null; // 标题（可为空）
  content: string; // 反馈内容（前缀可能含【title】\n，前端显示时可去除）
  userName?: string | null; // 反馈人姓名
  userEmail?: string | null; // 反馈人邮箱
  category: FeedbackCategory; // 类型/分类
  status: FeedbackStatus; // 处理状态
  createdAt: string | number; // 创建时间
  updatedAt: string | number; // 更新时间
}

// 查询参数
export interface QueryFeedbackRequest {
  user?: string; // 反馈人（姓名或邮箱模糊匹配）
  status?: FeedbackStatus;
  category?: FeedbackCategory;
  startTime?: string; // ISO 时间字符串
  endTime?: string;   // ISO 时间字符串
  page?: number;
  pageSize?: number;
  keyword?: string; // 内容关键词
}

/**
 * 意见反馈管理 API
 * 说明：接口路径基于管理端网关前缀 /management-api
 * - /feedback/index   获取全部（如有必要）
 * - /feedback/query   分页查询（推荐）
 */
export class FeedbackApi {
  // 分页查询
  static async queryFeedbacks(
    params?: QueryFeedbackRequest
  ): Promise<PaginatedResponse<Feedback>> {
    const res = await ManagementApi.post<PaginatedResponse<Feedback>>(
      "/feedback/query",
      params || {}
    );
    return res.data;
  }

  // 获取全部（仅在有需要时使用）
  static async getAll(): Promise<Feedback[]> {
    const res = await ManagementApi.post<Feedback[]>("/feedback/index", {});
    return res.data;
  }
}

export default FeedbackApi;

