import { injectable } from 'inversify'
import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import { Result } from '@/utils'

export interface FrontendThemeConfig {
  mode: 'light' | 'dark'
  primaryColor?: string
}
export interface FrontendFeatureConfig {
  enableFeedback?: boolean
  enablePdf?: boolean
  enableWebRTC?: boolean
  enableSystemMonitor?: boolean
}
export interface FrontendApiConfig {
  devApiBaseUrl?: string
  managementApiBaseUrl?: string
}
export interface FrontendConfig {
  theme: FrontendThemeConfig
  features: FrontendFeatureConfig
  api: FrontendApiConfig
}

export interface ServerJwtConfig { expiresIn?: string }
export interface ServerRedisConfig { host?: string; port?: number; password?: string }
export interface ServerDatabaseConfig { url?: string }
export interface ServerSideConfig {
  jwt?: ServerJwtConfig
  redis?: ServerRedisConfig
  database?: ServerDatabaseConfig
}

export interface ManagementConfigFile {
  frontend: FrontendConfig
  server: ServerSideConfig
}

const DEFAULT_CONFIG: ManagementConfigFile = {
  frontend: {
    theme: { mode: 'light', primaryColor: '#8785a2' },
    features: { enableFeedback: true, enablePdf: true, enableWebRTC: false, enableSystemMonitor: true },
    api: { devApiBaseUrl: '/dev-api', managementApiBaseUrl: '/management-api' },
  },
  server: {
    jwt: { expiresIn: '1d' },
    redis: { host: 'localhost', port: 6379 },
    database: { url: 'mysql://root:123456@localhost:3306/test' },
  },
}

@injectable()
export class ConfigService {
  // 配置文件保存目录与路径（运行根目录/data/management-config.json）
  private DATA_DIR = path.resolve(process.cwd(), 'data')
  private FILE_PATH = path.resolve(this.DATA_DIR, 'management-config.json')

  // 确保配置文件存在
  private async ensureFile() {
    if (!fs.existsSync(this.DATA_DIR)) await fsp.mkdir(this.DATA_DIR, { recursive: true })
    if (!fs.existsSync(this.FILE_PATH)) await fsp.writeFile(this.FILE_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8')
  }

  private async readFile(): Promise<ManagementConfigFile> {
    await this.ensureFile()
    try {
      const raw = await fsp.readFile(this.FILE_PATH, 'utf-8')
      const json = JSON.parse(raw)
      // 合并默认值，防止缺项
      return {
        frontend: { ...DEFAULT_CONFIG.frontend, ...(json.frontend || {}) },
        server: { ...DEFAULT_CONFIG.server, ...(json.server || {}) },
      }
    } catch (e) {
      return DEFAULT_CONFIG
    }
  }

  private async writeFile(data: ManagementConfigFile): Promise<void> {
    await this.ensureFile()
    const merged: ManagementConfigFile = {
      frontend: { ...DEFAULT_CONFIG.frontend, ...data.frontend },
      server: { ...DEFAULT_CONFIG.server, ...data.server },
    }
    await fsp.writeFile(this.FILE_PATH, JSON.stringify(merged, null, 2), 'utf-8')
  }

  // 前端配置
  public async getFrontendConfig() {
    const cfg = await this.readFile()
    return Result.success(cfg.frontend)
  }

  public async saveFrontendConfig(frontend: Partial<FrontendConfig>) {
    const cfg = await this.readFile()
    const merged: ManagementConfigFile = { ...cfg, frontend: { ...cfg.frontend, ...frontend } as FrontendConfig }
    await this.writeFile(merged)
    return Result.success(merged.frontend, '保存成功')
  }

  // 服务端配置（部分项需重启生效）
  public async getServerConfig() {
    const cfg = await this.readFile()
    return Result.success({ ...cfg.server, requiresRestart: true })
  }

  public async saveServerConfig(server: Partial<ServerSideConfig>) {
    const cfg = await this.readFile()
    const merged: ManagementConfigFile = { ...cfg, server: { ...cfg.server, ...server } }
    await this.writeFile(merged)
    return Result.success({ ...merged.server, requiresRestart: true }, '保存成功，部分配置需重启服务生效')
  }
}
