/**
 * 设置面板组件
 * 
 * 功能说明：
 * 1. 提供主题、语言、显示等设置选项
 * 2. 集成全局状态管理
 * 3. 实时预览设置效果
 * 4. 响应式设计和无障碍访问支持
 */

import { useGlobalStore, useGlobalStoreAction } from '@/store'
import { FloatingActionsState } from '@/types/floatingActions'
import { 
    BulbOutlined, 
    CloseOutlined, 
    GlobalOutlined, 
    MoonOutlined, 
    NotificationOutlined, 
    SoundOutlined, 
    SunOutlined 
} from '@ant-design/icons'
import { 
    Button, 
    Card, 
    Divider, 
    Radio, 
    Space, 
    Switch, 
    Typography, 
    message 
} from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SettingsPanel.module.scss'

const { Text, Title } = Typography

/**
 * 设置面板Props接口
 */
interface SettingsPanelProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
}

/**
 * 设置面板组件
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
    visible,
    onClose,
}) => {
    const { t, i18n } = useTranslation('floatingActions')
    
    // 获取全局状态和方法
    const floatingActions = useGlobalStore((state) => state.floatingActions)
    const preferences = useGlobalStore((state) => state.preferences)
    const { 
        updateFloatingSettings, 
        updatePreferences,
        setLanguage,
        setTheme 
    } = useGlobalStoreAction()

    // 主题选项
    const themeOptions = [
        {
            value: 'light',
            label: t('settings.theme.light', '浅色'),
            icon: <SunOutlined />,
        },
        {
            value: 'dark',
            label: t('settings.theme.dark', '深色'),
            icon: <MoonOutlined />,
        },
        {
            value: 'auto',
            label: t('settings.theme.auto', '跟随系统'),
            icon: <BulbOutlined />,
        },
    ]

    // 语言选项
    const languageOptions = [
        {
            value: 'zh',
            label: '中文',
            flag: '🇨🇳',
        },
        {
            value: 'en',
            label: 'English',
            flag: '🇺🇸',
        },
    ]

    // 处理主题变更
    const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
        setTheme(theme)
        updateFloatingSettings({ theme })
        message.success(t('settings.theme_changed', '主题已更新'))
    }

    // 处理语言变更
    const handleLanguageChange = async (language: string) => {
        try {
            await setLanguage(language as any)
            updateFloatingSettings({ language })
            message.success(t('settings.language_changed', '语言已更新'))
        } catch (error) {
            message.error(t('settings.language_change_failed', '语言切换失败'))
        }
    }

    // 处理动画设置变更
    const handleAnimationChange = (enabled: boolean) => {
        updateFloatingSettings({ enableAnimations: enabled })
        message.success(
            enabled 
                ? t('settings.animations_enabled', '动画效果已启用')
                : t('settings.animations_disabled', '动画效果已禁用')
        )
    }

    // 处理声音设置变更
    const handleSoundChange = (enabled: boolean) => {
        updateFloatingSettings({ enableSounds: enabled })
        message.success(
            enabled 
                ? t('settings.sounds_enabled', '声音提示已启用')
                : t('settings.sounds_disabled', '声音提示已禁用')
        )
    }

    // 重置设置
    const handleResetSettings = () => {
        const defaultSettings: FloatingActionsState['settings'] = {
            theme: 'auto',
            language: 'zh',
            enableAnimations: true,
            enableSounds: false,
        }
        
        updateFloatingSettings(defaultSettings)
        setTheme('auto')
        setLanguage('zh' as any)
        message.success(t('settings.reset_success', '设置已重置为默认值'))
    }

    if (!visible) {
        return null
    }

    return (
        <div className={styles.settings_panel_overlay} onClick={onClose}>
            <Card 
                className={styles.settings_panel}
                onClick={(e) => e.stopPropagation()}
                title={
                    <div className={styles.panel_header}>
                        <Title level={4} className={styles.panel_title}>
                            {t('settings.title', '设置')}
                        </Title>
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={onClose}
                            className={styles.close_button}
                            aria-label={t('common.close', '关闭')}
                        />
                    </div>
                }
                bordered={false}
            >
                {/* 主题设置 */}
                <div className={styles.setting_section}>
                    <div className={styles.setting_header}>
                        <BulbOutlined className={styles.setting_icon} />
                        <Title level={5} className={styles.setting_title}>
                            {t('settings.theme.title', '主题设置')}
                        </Title>
                    </div>
                    <Text type="secondary" className={styles.setting_description}>
                        {t('settings.theme.description', '选择您喜欢的界面主题')}
                    </Text>
                    <Radio.Group
                        value={floatingActions.settings.theme}
                        onChange={(e) => handleThemeChange(e.target.value)}
                        className={styles.theme_options}
                    >
                        {themeOptions.map(option => (
                            <Radio.Button 
                                key={option.value} 
                                value={option.value}
                                className={styles.theme_option}
                            >
                                <Space>
                                    {option.icon}
                                    {option.label}
                                </Space>
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </div>

                <Divider />

                {/* 语言设置 */}
                <div className={styles.setting_section}>
                    <div className={styles.setting_header}>
                        <GlobalOutlined className={styles.setting_icon} />
                        <Title level={5} className={styles.setting_title}>
                            {t('settings.language.title', '语言设置')}
                        </Title>
                    </div>
                    <Text type="secondary" className={styles.setting_description}>
                        {t('settings.language.description', '选择界面显示语言')}
                    </Text>
                    <Radio.Group
                        value={floatingActions.settings.language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className={styles.language_options}
                    >
                        {languageOptions.map(option => (
                            <Radio.Button 
                                key={option.value} 
                                value={option.value}
                                className={styles.language_option}
                            >
                                <Space>
                                    <span className={styles.language_flag}>{option.flag}</span>
                                    {option.label}
                                </Space>
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </div>

                <Divider />

                {/* 显示设置 */}
                <div className={styles.setting_section}>
                    <div className={styles.setting_header}>
                        <NotificationOutlined className={styles.setting_icon} />
                        <Title level={5} className={styles.setting_title}>
                            {t('settings.display.title', '显示设置')}
                        </Title>
                    </div>
                    
                    <div className={styles.setting_item}>
                        <div className={styles.setting_item_content}>
                            <Text strong>{t('settings.display.animations', '动画效果')}</Text>
                            <Text type="secondary" className={styles.setting_item_description}>
                                {t('settings.display.animations_description', '启用界面动画和过渡效果')}
                            </Text>
                        </div>
                        <Switch
                            checked={floatingActions.settings.enableAnimations}
                            onChange={handleAnimationChange}
                            className={styles.setting_switch}
                        />
                    </div>

                    <div className={styles.setting_item}>
                        <div className={styles.setting_item_content}>
                            <Text strong>{t('settings.display.sounds', '声音提示')}</Text>
                            <Text type="secondary" className={styles.setting_item_description}>
                                {t('settings.display.sounds_description', '启用操作反馈声音')}
                            </Text>
                        </div>
                        <Switch
                            checked={floatingActions.settings.enableSounds}
                            onChange={handleSoundChange}
                            className={styles.setting_switch}
                            checkedChildren={<SoundOutlined />}
                        />
                    </div>
                </div>

                <Divider />

                {/* 操作按钮 */}
                <div className={styles.action_buttons}>
                    <Space>
                        <Button onClick={handleResetSettings}>
                            {t('settings.reset', '重置设置')}
                        </Button>
                        <Button type="primary" onClick={onClose}>
                            {t('settings.save', '保存设置')}
                        </Button>
                    </Space>
                </div>
            </Card>
        </div>
    )
}

export default SettingsPanel
