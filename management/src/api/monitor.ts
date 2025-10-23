// 系统监控 API 封装（管理端）
// 提供健康检查、基础指标、日志读取能力

import { ManagementApi } from "@/utils";

export interface HealthInfo {
  status: string;
  uptime: number; // 进程运行时长（秒）
  timestamp: number; // 服务器时间戳
}

export interface MetricsInfo {
  system: {
    platform: string;
    release: string;
    arch: string;
    cpus: number;
    loadAvg: number[];
    totalMem: number;
    freeMem: number;
    usedMem: number;
  };
  process: {
    pid: number;
    uptime: number;
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external?: number;
  };
}

export interface LogsResult {
  total: number;
  lines: string[];
}

class MonitorApi {
  static async health(): Promise<HealthInfo> {
    const res = await ManagementApi.get<HealthInfo>("/monitor/health");
    return res.data as any;
  }

  static async metrics(): Promise<MetricsInfo> {
    const res = await ManagementApi.get<MetricsInfo>("/monitor/metrics");
    return res.data as any;
  }

  static async logs(offset = 0, limit = 200): Promise<LogsResult> {
    const res = await ManagementApi.get<LogsResult>("/monitor/logs", { offset, limit });
    return res.data as any;
  }

  static async logTypes(): Promise<string[]> {
    const res = await ManagementApi.get<string[]>("/monitor/log-types");
    return (res.data as any) || [];
  }

  static async logsByType(category: string, offset = 0, limit = 200): Promise<LogsResult> {
    const res = await ManagementApi.get<LogsResult>("/monitor/logs-by-type", { category, offset, limit });
    return res.data as any;
  }

  static async ingestLog(payload: { source?: string; level?: string; message: string; context?: any }): Promise<boolean> {
    const res = await ManagementApi.post<{ ok: boolean }>("/monitor/logs", payload);
    return !!res.data;
  }
}

export default MonitorApi;
export { MonitorApi };
