import React from 'react'

/**
 * 面包屑导航项接口
 */
export interface BreadcrumbItem {
    /** 显示标题 */
    title: string
    /** 路由路径（可选，为空则不可点击） */
    path?: string
    /** 图标（可选） */
    icon?: React.ReactNode
}

/**
 * 面包屑导航配置接口
 */
export interface BreadcrumbConfig {
    /** 面包屑项列表 */
    items: BreadcrumbItem[]
    /** 分隔符（可选，默认使用 Ant Design 的默认分隔符） */
    separator?: React.ReactNode
}

/**
 * 技术栈菜单项接口
 */
export interface TechMenuItem {
    /** 技术栈唯一标识 */
    key: string
    /** 显示标签 */
    label: string
    /** 菜单图标 */
    icon: React.ReactNode
    /** 描述信息 */
    description: string
    /** 子路由列表 */
    subRoutes?: string[]
}

/**
 * 子路由配置接口
 */
export interface SubRouteConfig {
    /** 路由路径 */
    path: string
    /** 路由标题 */
    title: string
    /** 路由组件 */
    component: React.ComponentType
}

/**
 * 技术栈路由配置接口
 */
export interface TechRouteConfig {
    /** 主组件 */
    main: React.ComponentType
    /** 子路由配置映射 */
    subRoutes: Record<string, SubRouteConfig>
}

/**
 * 完整的技术栈路由映射接口
 */
export interface TechnologyRouteMap {
    [techKey: string]: TechRouteConfig
}

/**
 * 路由解析结果接口
 */
export interface RouteParseResult {
    /** 技术栈标识 */
    tech: string | null
    /** 子主题标识 */
    subTopic: string | null
    /** 解析到的组件 */
    component: React.ComponentType | null
}