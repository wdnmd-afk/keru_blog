import type { Container } from 'inversify'

// 全局容器实例（仅用于跨层调用，如中间件记录系统日志）
let __globalContainer: Container | null = null

export function setGlobalContainer(container: Container) {
  __globalContainer = container
}

export function getGlobalContainer(): Container | null {
  return __globalContainer
}
