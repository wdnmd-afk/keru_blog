import dotenv from 'dotenv'

dotenv.config()

// AI 配置接口
export interface AIConfig {
  provider: 'deepseek'
  apiKey: string
  baseURL: string
  model: string
  timeoutMs: number
}

// 创建 AI 配置（从环境变量读取，避免硬编码）
export function createAIConfig(): AIConfig {
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.AI_API_KEY || ''
  const baseURL = process.env.DEEPSEEK_BASE_URL || process.env.AI_BASE_URL || 'https://api.deepseek.com'
  const model = process.env.DEEPSEEK_MODEL || process.env.AI_MODEL || 'deepseek-chat'
  const timeoutMs = parseInt(process.env.AI_TIMEOUT_MS || '60000', 10)

  if (!apiKey) {
    throw new Error('[AI Config] Missing DEEPSEEK_API_KEY. Please set it in environment variables.')
  }

  return {
    provider: 'deepseek',
    apiKey,
    baseURL,
    model,
    timeoutMs,
  }
}

