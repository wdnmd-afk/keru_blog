type ProxyType = 'dev' | 'prod'

interface ProxyConfig {
    /** 匹配代理的前缀，接口地址匹配到此前缀将代理的target地址 */
    prefix: string
    /** 代理目标地址，后端真实接口地址 */
    target: string
}

interface ViteProxyConfig {
    target: string
    changeOrigin: boolean
    rewrite: (path: string) => string
}

const proxyConfigMappings: Record<ProxyType, ProxyConfig> = {
    // 开发环境调用的接口
    dev: {
        prefix: '/dev-api',
        target: 'http://127.0.0.1:5566',
    },

    // 生产环境调用的接口
    prod: {
        prefix: '/prod-api',
        target: 'http://127.0.0.1:2130',
    },
}

function getProxyConfig(envType: ProxyType = 'dev'): ProxyConfig {
    return proxyConfigMappings[envType]
}

function createViteProxy(
    isUseProxy = true,
    proxyType: ProxyType,
    basePath: string
): Record<string, ViteProxyConfig> | undefined {
    if (!isUseProxy) return undefined

    const proxyConfig = getProxyConfig(proxyType)
    const proxy: Record<string, ViteProxyConfig> = {
        // API 代理
        [proxyConfig.prefix]: {
            target: proxyConfig.target,
            changeOrigin: true,
            // 将前端代理前缀替换为服务端全局前缀 /api，确保匹配后端 Inversify 的 rootPath
            rewrite: (path: string) => path.replace(new RegExp('^' + basePath), '/api'),
        },
        // 静态文件代理 - 用于图片等静态资源
        '/static': {
            target: proxyConfig.target,
            changeOrigin: true,
            // 静态文件路径不需要重写，直接转发
            rewrite: (path: string) => path,
        },
        // 临时文件代理 - 用于访问临时PDF：/temp/pdf/**
        '/temp': {
            target: proxyConfig.target,
            changeOrigin: true,
            rewrite: (path: string) => path,
        },
    }
    return proxy
}

export { createViteProxy }
