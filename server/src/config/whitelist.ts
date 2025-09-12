// 白名单路由（支持 * 通配后缀表示前缀匹配）
const openPaths = ['/login', '/register', '/static/*', '/health', '/user/resetPassword', '/public/*']

// 修复匹配逻辑：仅在模式匹配时返回 true；避免误把所有路径当成白名单
const isWhiteListPath = (reqPath: string) => {
  const isOpenPath = openPaths.some((pattern) => {
    if (pattern.endsWith('*')) {
      const prefix = pattern.slice(0, -1)
      return reqPath.startsWith(prefix)
    }
    return reqPath === pattern
  })
  return isOpenPath
}

export { isWhiteListPath, openPaths }
