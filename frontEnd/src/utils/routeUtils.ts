import type { RouteParseResult } from '@/config/technologyTypes'
import { technologyRoutes } from '@/config/technologyRoutes'

/**
 * 解析当前路径并返回对应的技术栈和组件信息
 * 
 * @param pathname 当前路径
 * @returns 解析结果对象
 */
export const parseRoute = (pathname: string): RouteParseResult => {
    const pathSegments = pathname.split('/').filter(Boolean)
    
    // 路径格式: /technology/{tech}/{subTopic}?
    if (pathSegments[0] !== 'technology') {
        return { tech: null, subTopic: null, component: null }
    }

    const tech = pathSegments[1] || null
    const subTopic = pathSegments[2] || null

    if (!tech || !technologyRoutes[tech]) {
        return { tech, subTopic, component: null }
    }

    const routeConfig = technologyRoutes[tech]

    // 如果有子主题，尝试获取子路由组件
    if (subTopic && routeConfig.subRoutes[subTopic]) {
        return {
            tech,
            subTopic,
            component: routeConfig.subRoutes[subTopic].component
        }
    }

    // 返回主组件
    return {
        tech,
        subTopic,
        component: routeConfig.main
    }
}

/**
 * 获取技术栈的子路由列表
 * 
 * @param tech 技术栈标识
 * @returns 子路由配置数组
 */
export const getSubRoutes = (tech: string) => {
    const routeConfig = technologyRoutes[tech]
    if (!routeConfig) return []

    return Object.entries(routeConfig.subRoutes).map(([key, config]) => ({
        key,
        title: config.title,
        path: config.path
    }))
}

/**
 * 获取技术栈显示名称
 * 
 * @param tech 技术栈标识
 * @returns 显示名称
 */
export const getTechDisplayName = (tech: string): string => {
    const techMap: Record<string, string> = {
        react: 'React',
        vue: 'Vue.js',
        typescript: 'TypeScript',
        nodejs: 'Node.js',
        docker: 'Docker',
        git: 'Git & GitHub',
        tools: '开发工具',
        jest: 'Jest'
    }
    return techMap[tech] || tech
}

/**
 * 获取子主题显示名称
 * 
 * @param tech 技术栈标识
 * @param subTopic 子主题标识
 * @returns 子主题显示名称
 */
export const getSubTopicDisplayName = (tech: string, subTopic: string): string => {
    const routeConfig = technologyRoutes[tech]
    if (!routeConfig || !routeConfig.subRoutes[subTopic]) {
        return subTopic
    }
    return routeConfig.subRoutes[subTopic].title
}

/**
 * 检查路由是否存在
 * 
 * @param tech 技术栈标识
 * @param subTopic 子主题标识（可选）
 * @returns 是否存在
 */
export const isValidRoute = (tech: string, subTopic?: string): boolean => {
    const routeConfig = technologyRoutes[tech]
    if (!routeConfig) return false

    if (!subTopic) return true
    
    return Boolean(routeConfig.subRoutes[subTopic])
}