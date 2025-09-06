import { technologyRoutes } from '@/config/technologyRoutes'
import type { BreadcrumbConfig, BreadcrumbItem, RouteParseResult } from '@/config/technologyTypes'
import { CodeOutlined, HomeOutlined } from '@ant-design/icons'
import React from 'react'

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
            component: routeConfig.subRoutes[subTopic].component,
        }
    }

    // 返回主组件
    return {
        tech,
        subTopic,
        component: routeConfig.main,
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
        path: config.path,
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
        jest: 'Jest',
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

/**
 * 生成面包屑导航配置
 *
 * @param pathname 当前路径
 * @returns 面包屑导航配置
 */
export const generateBreadcrumb = (pathname: string): BreadcrumbConfig => {
    const routeResult = parseRoute(pathname)
    const items: BreadcrumbItem[] = []

    // 首页
    items.push({
        title: '首页',
        path: '/',
        icon: React.createElement(HomeOutlined),
    })

    // 技术栈主页
    items.push({
        title: '技术栈',
        path: '/technology',
        icon: React.createElement(CodeOutlined),
    })

    // 当前技术栈
    if (routeResult.tech) {
        const techDisplayName = getTechDisplayName(routeResult.tech)
        items.push({
            title: techDisplayName,
            path: `/technology/${routeResult.tech}`,
        })

        // 子主题
        if (routeResult.subTopic) {
            const subTopicDisplayName = getSubTopicDisplayName(
                routeResult.tech,
                routeResult.subTopic
            )
            items.push({
                title: subTopicDisplayName,
                // 当前页面不提供链接
            })
        }
    }

    return { items }
}

/**
 * 生成简化版面包屑导航（仅包含当前技术栈和子主题）
 *
 * @param pathname 当前路径
 * @returns 简化版面包屑导航配置
 */
export const generateSimpleBreadcrumb = (pathname: string): BreadcrumbConfig => {
    const routeResult = parseRoute(pathname)
    const items: BreadcrumbItem[] = []

    // 技术栈主页
    items.push({
        title: '技术栈',
        path: '/technology',
        icon: React.createElement(CodeOutlined),
    })

    // 当前技术栈
    if (routeResult.tech) {
        const techDisplayName = getTechDisplayName(routeResult.tech)

        if (routeResult.subTopic) {
            // 如果有子主题，技术栈页面可以点击
            items.push({
                title: techDisplayName,
                path: `/technology/${routeResult.tech}`,
            })

            // 子主题（当前页面）
            const subTopicDisplayName = getSubTopicDisplayName(
                routeResult.tech,
                routeResult.subTopic
            )
            items.push({
                title: subTopicDisplayName,
            })
        } else {
            // 如果没有子主题，技术栈页面为当前页面
            items.push({
                title: techDisplayName,
            })
        }
    }

    return { items }
}
