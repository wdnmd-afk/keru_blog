import { ManagementApi } from "@/utils/http";

// 医学检验建议 - 请求与响应类型
export interface MedLabPatientReq {
  name?: string;
  gender?: string;
  age?: number;
  id?: string;
}

export interface MedLabItemReq {
  name: string; // 项目名称
  sampleType?: string; // 样本类型
  method?: string; // 方法学
  instrument?: string; // 仪器
  result: string; // 结果值（统一使用字符串，兼容 "<",">","阴性" 等）
  unit?: string; // 单位
  refRange?: string; // 参考范围
}

export interface MedLabRunConfigReq {
  systemPromptHeader?: string;
  language?: string; // zh-CN/en
  maxAdviceChars?: number;
  disclaimer?: string;
}

export interface MedLabAdviceRequest {
  patient?: MedLabPatientReq;
  items?: MedLabItemReq[]; // 可选：若未提供则可通过 data 由后端归一化
  data?: any[]; // 可选：兼容 test.json 模板的 data 数组
  context?: Record<string, any>;
  config?: MedLabRunConfigReq;
}

export interface MedLabAdviceResponse {
  advice: string;
  conversationId: string;
}

export class MedLabApi {
  // 生成医学检验建议
  static async generateAdvice(payload: MedLabAdviceRequest): Promise<MedLabAdviceResponse> {
    const res = await ManagementApi.post<{ code: number; data: MedLabAdviceResponse }>(
      "/ai/medlab/advice",
      payload,
    );
    return (res as any).data as MedLabAdviceResponse;
  }
}

export default MedLabApi;
