/**
 * 语言切换组件
 *
 * 功能说明：
 * 1. 提供中英文语言切换功能
 * 2. 显示当前选中的语言
 * 3. 集成到全局状态管理
 * 4. 支持下拉菜单和图标显示
 */

import { languageNames, supportedLanguages, type SupportedLanguage } from '@/i18n'
import { useGlobalStore, useGlobalStoreAction } from '@/store'
import styles from '@/styles/languageSwitcher.module.scss'
import { GlobalOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Tooltip } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface LanguageSwitcherProps {
    /** 是否显示文本标签 */
    showLabel?: boolean
    /** 组件大小 */
    size?: 'small' | 'medium' | 'large'
    /** 自定义样式类名 */
    className?: string
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    showLabel = false,
    size = 'medium',
    className = '',
}) => {
    const { t } = useTranslation('layout')
    const { setLanguage } = useGlobalStoreAction()
    const currentLanguage = useGlobalStore((state) => state.preferences.language)

    // 构建下拉菜单项
    const menuItems: MenuProps['items'] = supportedLanguages.map((lang) => ({
        key: lang,
        label: (
            <div className={styles.menuItem}>
                <span className={styles.languageName}>{languageNames[lang]}</span>
                {currentLanguage === lang && <span className={styles.checkIcon}>✓</span>}
            </div>
        ),
        onClick: () => handleLanguageChange(lang),
    }))

    // 处理语言切换
    const handleLanguageChange = async (language: SupportedLanguage) => {
        if (language !== currentLanguage) {
            try {
                await setLanguage(language)
            } catch (error) {
                console.error('语言切换失败:', error)
            }
        }
    }

    // 获取当前语言的显示名称
    const getCurrentLanguageLabel = () => {
        return languageNames[currentLanguage] || languageNames.zh
    }

    return (
        <div className={`${styles.languageSwitcher} ${styles[size]} ${className}`}>
            <Dropdown
                menu={{ items: menuItems }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                trigger={['click']}
            >
                <Tooltip title={t('header.language_switcher.title')} placement="bottom">
                    <div className={styles.switcherButton}>
                        <GlobalOutlined className={styles.icon} />
                        {showLabel && (
                            <span className={styles.label}>{getCurrentLanguageLabel()}</span>
                        )}
                    </div>
                </Tooltip>
            </Dropdown>
        </div>
    )
}

export default LanguageSwitcher
