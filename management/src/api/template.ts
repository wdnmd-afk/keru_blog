// 模板管理 API 封装（管理端）
// 说明：通过 ManagementApi（/management-api 代理到 /api）访问服务端 /api/template/* 与 /api/htmlpdf/* 接口

import { ManagementApi } from "@/utils/http";
import type { PaginatedResponse } from "./types";

// 模板类型
export type TemplateType = "A4" | "A5" | "CUSTOM";

// 模板实体（与后端 Prisma 模型对应）
export interface HtmlTemplate {
  id: string;
  name: string;
  type: TemplateType;
  content: string; // HTML 源码
  widthMm?: number | null;
  heightMm?: number | null;
  fields?: any | null; // 字段 schema（可选）
  remark?: string | null;
  createdAt: string;
  updatedAt: string;
}

// 查询参数
export interface QueryTemplateRequest {
  page?: number;
  pageSize?: number;
  keyword?: string; // name 模糊搜索
  type?: TemplateType;
}

// 创建/更新入参
export interface UpsertTemplateRequest {
  id?: string; // 更新时必传
  name: string;
  type: TemplateType;
  content: string;
  widthMm?: number | null;
  heightMm?: number | null;
  fields?: any | null;
  remark?: string | null;
}

// HTML 预览与 PDF 生成入参
export interface RenderHtmlRequest {
  templateId: string;
  data?: Record<string, any>;
  sanitize?: boolean;
}
export interface GeneratePdfRequest extends RenderHtmlRequest {
  options?: {
    type?: TemplateType;
    widthMm?: number;
    heightMm?: number;
    marginMm?: Partial<Record<"top" | "right" | "bottom" | "left", number>>;
    fileName?: string;
  };
}
export interface GeneratePdfResult {
  url: string;
  fileName: string;
  size: number;
}

export class TemplateApi {
  // 分页查询
  static async query(
    params?: QueryTemplateRequest,
  ): Promise<PaginatedResponse<HtmlTemplate>> {
    const res = await ManagementApi.post<PaginatedResponse<HtmlTemplate>>(
      "/template/query",
      params || {},
    );
    return res.data;
    
  }

  // 创建
  static async create(params: UpsertTemplateRequest): Promise<HtmlTemplate> {
    const res = await ManagementApi.post<HtmlTemplate>("/template/create", params);
    return res.data;
  }

  // 更新
  static async update(params: UpsertTemplateRequest): Promise<HtmlTemplate> {
    const res = await ManagementApi.post<HtmlTemplate>("/template/update", params);
    return res.data;
  }

  // 删除
  static async remove(id: string): Promise<boolean> {
    const res = await ManagementApi.post<boolean>("/template/delete", { id });
    return res.data as any;
  }

  // 详情
  static async detail(id: string): Promise<HtmlTemplate> {
    const res = await ManagementApi.get<HtmlTemplate>(`/template/detail/${id}`);
    return res.data;
  }

  // 渲染 HTML（返回 HTML 字符串）
  static async renderHtml(params: RenderHtmlRequest): Promise<string> {
    const res = await ManagementApi.post<string>("/htmlpdf/render-html", params, {
      // 强制按文本处理
      headers: { "Accept": "text/html" },
      responseType: "text",
    } as any);
    // 管理端 http 封装会把 data 作为 res.data 返回
    return res as any;
  }

  // 生成 PDF
  static async generatePdf(params: GeneratePdfRequest): Promise<GeneratePdfResult> {
    const res = await ManagementApi.post<{ success: boolean; code: number; message: string; data: GeneratePdfResult }>(
      "/htmlpdf/generate",
      params,
    );
    // 统一响应结构下 data 为包裹后的对象
    return (res as any).data;
  }
}

export default TemplateApi;
