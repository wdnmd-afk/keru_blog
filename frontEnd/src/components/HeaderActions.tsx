/**
 * 右上角功能区容器组件
 * 
 * 功能说明：
 * 1. 整合语言切换、外部链接和用户信息功能
 * 2. 提供统一的布局和样式管理
 * 3. 支持响应式设计和移动端适配
 * 4. 可配置的功能模块显示
 */

import ExternalLinks from '@/components/ExternalLinks'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import SvgIcon from '@/components/SvgIcon'
import { useGlobalStore } from '@/store'
import { BrowserLocalStorage } from '@/utils'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from '@/styles/headerActions.module.scss'

interface HeaderActionsProps {
    /** 是否显示语言切换器 */
    showLanguageSwitcher?: boolean
    /** 是否显示外部链接 */
    showExternalLinks?: boolean
    /** 是否显示用户信息 */
    showUserInfo?: boolean
    /** 语言切换器是否显示标签 */
    languageSwitcherShowLabel?: boolean
    /** 组件大小 */
    size?: 'small' | 'medium' | 'large'
    /** 自定义样式类名 */
    className?: string
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
    showLanguageSwitcher = true,
    showExternalLinks = true,
    showUserInfo = true,
    languageSwitcherShowLabel = false,
    size = 'medium',
    className = '',
}) => {
    const { t } = useTranslation('layout')
    const navigate = useNavigate()
    const user = useGlobalStore((state) => state.user)
    
    // 获取用户信息
    const name = BrowserLocalStorage.get('userInfo')?.name || user.name

    // 用户下拉菜单配置
    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: t('header.user_menu.profile'),
            disabled: true, // 暂时禁用，可以后续实现
        },
        {
            key: 'settings',
            label: t('header.user_menu.settings'),
            disabled: true, // 暂时禁用，可以后续实现
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: t('header.user_menu.logout'),
            danger: true,
        },
    ]

    // 处理用户菜单点击
    const handleUserMenuClick = ({ key }: { key: string }) => {
        switch (key) {
            case 'logout':
                handleLogout()
                break
            case 'profile':
                // TODO: 实现个人资料页面
                console.log('Navigate to profile')
                break
            case 'settings':
                // TODO: 实现设置页面
                console.log('Navigate to settings')
                break
            default:
                break
        }
    }

    // 处理退出登录
    const handleLogout = () => {
        BrowserLocalStorage.remove('userInfo')
        navigate('/login')
    }

    return (
        <div className={`${styles.headerActions} ${styles[size]} ${className}`}>
            {/* 语言切换器 */}
            {showLanguageSwitcher && (
                <div className={styles.actionItem}>
                    <LanguageSwitcher
                        showLabel={languageSwitcherShowLabel}
                        size={size}
                    />
                </div>
            )}

            {/* 外部链接 */}
            {showExternalLinks && (
                <div className={styles.actionItem}>
                    <ExternalLinks
                        size={size}
                        iconSize={size === 'small' ? 16 : size === 'large' ? 24 : 20}
                    />
                </div>
            )}

            {/* 用户信息 */}
            {showUserInfo && (
                <div className={styles.actionItem}>
                    <Dropdown
                        menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
                        arrow={{ pointAtCenter: true }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <div className={styles.userInfo}>
                            <SvgIcon name="react" size={size === 'small' ? 28 : size === 'large' ? 42 : 35} />
                            <div className={styles.userName}>{name}</div>
                        </div>
                    </Dropdown>
                </div>
            )}
        </div>
    )
}

export default HeaderActions
