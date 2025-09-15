// 白名单路由配置 - 支持多种匹配模式
// 1. 精确路径匹配：完整路径匹配
// 2. 路径段匹配：按路径段进行安全匹配
// 3. 通配符匹配：支持 * 后缀的前缀匹配
const whitelistConfig = {
  // 精确路径匹配（推荐用于关键接口）
  exactPaths: ['/user/login', '/user/register', '/user/resetPassword', '/health'],

  // 路径段匹配（安全的模糊匹配）
  // 格式：['segment1', 'segment2'] 表示路径必须包含这些连续的段
  pathSegments: [
    ['user', 'login'],
    ['user', 'register'],
    ['user', 'resetPassword'],
    ['public', 'feedback'],
  ],

  // 通配符匹配（用于静态资源等）
  wildcardPaths: ['/static/*', '/public/*'],
}

/**
 * 安全的白名单路径匹配函数
 * 支持多种匹配模式，避免简单字符串包含匹配的安全风险
 */
const isWhiteListPath = (reqPath: string) => {
  // 标准化路径：移除开头的 /api 前缀并清理路径
  const normalizedPath = reqPath.startsWith('/api') ? reqPath.substring(4) : reqPath
  const cleanPath = normalizedPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/'

  console.log(
    `[Whitelist] Checking path: original="${reqPath}", normalized="${normalizedPath}", clean="${cleanPath}"`
  )

  // 1. 精确路径匹配
  const exactMatch = whitelistConfig.exactPaths.some(pattern => {
    const matches = cleanPath === pattern
    if (matches) console.log(`[Whitelist] Exact match found: "${pattern}"`)
    return matches
  })

  if (exactMatch) {
    console.log(`[Whitelist] Result: ALLOWED (exact match)`)
    return true
  }

  // 2. 路径段匹配（安全的模糊匹配）
  const pathParts = cleanPath.split('/').filter(part => part.length > 0)
  const segmentMatch = whitelistConfig.pathSegments.some(segments => {
    const matches = containsConsecutiveSegments(pathParts, segments)
    if (matches) console.log(`[Whitelist] Segment match found: [${segments.join(', ')}]`)
    return matches
  })

  if (segmentMatch) {
    console.log(`[Whitelist] Result: ALLOWED (segment match)`)
    return true
  }

  // 3. 通配符匹配
  const wildcardMatch = whitelistConfig.wildcardPaths.some(pattern => {
    if (pattern.endsWith('*')) {
      const prefix = pattern.slice(0, -1)
      const matches = cleanPath.startsWith(prefix)
      if (matches) console.log(`[Whitelist] Wildcard match found: "${pattern}"`)
      return matches
    }
    return false
  })

  if (wildcardMatch) {
    console.log(`[Whitelist] Result: ALLOWED (wildcard match)`)
    return true
  }

  console.log(`[Whitelist] Result: BLOCKED (no match found)`)
  return false
}

/**
 * 检查路径段数组是否包含连续的目标段
 * 这比简单的 includes() 更安全，避免误匹配
 */
function containsConsecutiveSegments(pathParts: string[], targetSegments: string[]): boolean {
  if (targetSegments.length === 0) return false
  if (pathParts.length < targetSegments.length) return false

  for (let i = 0; i <= pathParts.length - targetSegments.length; i++) {
    let match = true
    for (let j = 0; j < targetSegments.length; j++) {
      if (pathParts[i + j] !== targetSegments[j]) {
        match = false
        break
      }
    }
    if (match) return true
  }

  return false
}

export { isWhiteListPath, whitelistConfig }
