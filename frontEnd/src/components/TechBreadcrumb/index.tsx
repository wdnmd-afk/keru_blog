/**
 * 技术栈面包屑导航组件
 *
 * 功能说明：
 * 1. 根据当前路径自动生成面包屑导航
 * 2. 支持点击导航到上级页面
 * 3. 提供完整版和简化版两种模式
 * 4. 集成图标显示
 * 5. 响应式设计支持
 */

import type { BreadcrumbConfig } from '@/config/technologyTypes'
import { generateBreadcrumb, generateSimpleBreadcrumb } from '@/utils/routeUtils'
import { Breadcrumb } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './TechBreadcrumb.module.scss'

interface TechBreadcrumbProps {
    /** 是否使用简化模式（默认为 false） */
    simple?: boolean
    /** 自定义样式类名 */
    className?: string
    /** 自定义分隔符 */
    separator?: React.ReactNode
}

/**
 * 技术栈面包屑导航组件
 */
const TechBreadcrumb: React.FC<TechBreadcrumbProps> = ({
    simple = false,
    className = '',
    separator,
}) => {
    const location = useLocation()
    const navigate = useNavigate()

    // 生成面包屑配置
    const breadcrumbConfig: BreadcrumbConfig = simple
        ? generateSimpleBreadcrumb(location.pathname)
        : generateBreadcrumb(location.pathname)

    // 处理面包屑点击事件
    const handleBreadcrumbClick = (path?: string) => {
        if (path) {
            navigate(path)
        }
    }

    // 如果只有一项，则不显示面包屑
    if (breadcrumbConfig.items.length <= 1) {
        return null
    }

    return (
        <div className={`${styles.tech_breadcrumb_container} ${className}`}>
            <Breadcrumb
                separator={separator}
                className={styles.tech_breadcrumb}
                items={breadcrumbConfig.items.map((item, index) => ({
                    title: (
                        <span
                            className={`${styles.breadcrumb_item} ${
                                item.path ? styles.clickable : styles.current
                            }`}
                            onClick={() => handleBreadcrumbClick(item.path)}
                        >
                            {item.icon && (
                                <span className={styles.breadcrumb_icon}>{item.icon}</span>
                            )}
                            <span className={styles.breadcrumb_text}>{item.title}</span>
                        </span>
                    ),
                    key: item.path || `item-${index}`,
                }))}
            />
        </div>
    )
}

export default TechBreadcrumb
