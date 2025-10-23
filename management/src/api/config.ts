// 配置管理 API 封装（管理端）
// 提供前端配置与服务端配置的查询与保存能力

import { ManagementApi } from "@/utils";

// 前端配置类型定义
export interface FrontendThemeConfig {
  mode: "light" | "dark";
  primaryColor?: string;
}
export interface FrontendFeatureConfig {
  enableFeedback?: boolean;
  enablePdf?: boolean;
  enableWebRTC?: boolean;
  enableSystemMonitor?: boolean;
}
export interface FrontendApiConfig {
  devApiBaseUrl?: string;
  managementApiBaseUrl?: string;
}
export interface FrontendConfig {
  theme: FrontendThemeConfig;
  features: FrontendFeatureConfig;
  api: FrontendApiConfig;
}

// 服务端配置类型定义
export interface ServerJwtConfig { expiresIn?: string }
export interface ServerRedisConfig { host?: string; port?: number; password?: string }
export interface ServerDatabaseConfig { url?: string }
export interface ServerSideConfig {
  jwt?: ServerJwtConfig;
  redis?: ServerRedisConfig;
  database?: ServerDatabaseConfig;
  // 后端会附带 requiresRestart 字段提示是否需要重启生效
  requiresRestart?: boolean;
}

class ConfigApi {
  // 获取前端配置
  static async getFrontendConfig(): Promise<FrontendConfig> {
    const res = await ManagementApi.get<FrontendConfig>("/config/frontend");
    return res.data as any;
  }

  // 保存前端配置（支持部分字段）
  static async saveFrontendConfig(payload: Partial<FrontendConfig>): Promise<FrontendConfig> {
    const res = await ManagementApi.post<FrontendConfig>("/config/frontend", payload);
    return res.data as any;
  }

  // 获取服务端配置
  static async getServerConfig(): Promise<ServerSideConfig> {
    const res = await ManagementApi.get<ServerSideConfig>("/config/server");
    return res.data as any;
  }

  // 保存服务端配置（支持部分字段）
  static async saveServerConfig(payload: Partial<ServerSideConfig>): Promise<ServerSideConfig> {
    const res = await ManagementApi.post<ServerSideConfig>("/config/server", payload);
    return res.data as any;
  }
}

export default ConfigApi;
export { ConfigApi };
