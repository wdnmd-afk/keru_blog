/**
 * 外部链接组件
 * 
 * 功能说明：
 * 1. 提供GitHub等外部链接访问
 * 2. 支持多种社交媒体平台扩展
 * 3. 统一的图标和样式管理
 * 4. 可配置的链接列表
 */

import SvgIcon from '@/components/SvgIcon'
import { Tooltip } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '@/styles/externalLinks.module.scss'

// 外部链接配置接口
interface ExternalLink {
    /** 链接唯一标识 */
    key: string
    /** 链接地址 */
    url: string
    /** 图标名称（对应SVG文件名） */
    icon: string
    /** 提示文本的翻译键 */
    tooltipKey: string
    /** 链接标题的翻译键 */
    titleKey: string
    /** 是否在新窗口打开 */
    openInNewTab?: boolean
}

// 默认外部链接配置
const defaultLinks: ExternalLink[] = [
    {
        key: 'github',
        url: 'https://github.com/your-username/keru_blog', // 需要替换为实际的GitHub仓库地址
        icon: 'github',
        tooltipKey: 'header.external_links.github_tooltip',
        titleKey: 'header.external_links.github',
        openInNewTab: true,
    },
    // 可以在这里添加更多外部链接
    // {
    //     key: 'twitter',
    //     url: 'https://twitter.com/your-username',
    //     icon: 'twitter',
    //     tooltipKey: 'header.external_links.twitter_tooltip',
    //     titleKey: 'header.external_links.twitter',
    //     openInNewTab: true,
    // },
]

interface ExternalLinksProps {
    /** 自定义链接列表 */
    links?: ExternalLink[]
    /** 图标大小 */
    iconSize?: number
    /** 组件大小 */
    size?: 'small' | 'medium' | 'large'
    /** 自定义样式类名 */
    className?: string
    /** 是否显示分隔符 */
    showDivider?: boolean
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({
    links = defaultLinks,
    iconSize = 20,
    size = 'medium',
    className = '',
    showDivider = false,
}) => {
    const { t } = useTranslation('layout')

    // 处理链接点击
    const handleLinkClick = (link: ExternalLink) => {
        if (link.openInNewTab) {
            window.open(link.url, '_blank', 'noopener,noreferrer')
        } else {
            window.location.href = link.url
        }
    }

    // 获取图标大小
    const getIconSize = () => {
        switch (size) {
            case 'small':
                return iconSize * 0.8
            case 'large':
                return iconSize * 1.2
            default:
                return iconSize
        }
    }

    if (!links || links.length === 0) {
        return null
    }

    return (
        <div className={`${styles.externalLinks} ${styles[size]} ${className}`}>
            {links.map((link, index) => (
                <React.Fragment key={link.key}>
                    <Tooltip
                        title={t(link.tooltipKey)}
                        placement="bottom"
                    >
                        <div
                            className={styles.linkItem}
                            onClick={() => handleLinkClick(link)}
                            role="button"
                            tabIndex={0}
                            aria-label={t(link.titleKey)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handleLinkClick(link)
                                }
                            }}
                        >
                            <SvgIcon
                                name={link.icon}
                                size={getIconSize()}
                                color="currentColor"
                            />
                        </div>
                    </Tooltip>
                    {showDivider && index < links.length - 1 && (
                        <div className={styles.divider} />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default ExternalLinks

// 导出类型供其他组件使用
export type { ExternalLink }
