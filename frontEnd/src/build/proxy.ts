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
        [proxyConfig.prefix]: {
            target: proxyConfig.target,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(new RegExp('^' + basePath), ''),
        },
    }
    return proxy
}

export { createViteProxy }
