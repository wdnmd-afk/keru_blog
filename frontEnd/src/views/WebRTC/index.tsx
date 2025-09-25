/**
 * WebRTC主页面组件
 *
 * 功能说明：
 * 1. 提供WebRTC功能的主入口页面
 * 2. 包含Tab栏组件，分为"技术介绍"和"实时直播"两个标签页
 * 3. 技术介绍页面展示WebRTC相关文档和介绍
 * 4. 实时直播页面提供视频直播功能
 */

import { useTheme } from '@/hooks/useTheme'
import styles from '@/styles/webrtc.module.scss'
import '@/styles/ios-design-system.scss'
import { BookOutlined, BulbOutlined, MoonOutlined, SunOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LiveStreaming from './components/LiveStreaming'
import TechIntroduction from './components/TechIntroduction'

const WebRTC: React.FC = () => {
    const { t } = useTranslation('webrtc')
    const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
    const [activeTab, setActiveTab] = useState<string>('tech-intro')

    const handleTabChange = (key: string) => {
        setActiveTab(key)
    }

    // iOS 风格分段控制器配置
    const segmentItems = [
        {
            key: 'tech-intro',
            icon: <BookOutlined />,
            label: t('tabs.tech_introduction'),
            component: <TechIntroduction />
        },
        {
            key: 'live-streaming',
            icon: <VideoCameraOutlined />,
            label: t('tabs.live_streaming'),
            component: <LiveStreaming />
        }
    ]

    return (
        <div className={styles.webrtc_container}>
            <div className={styles.webrtc_header}>
                <div className={styles.header_controls}>
                    <Tooltip title={`切换到${resolvedTheme === 'light' ? '深色' : '浅色'}模式`}>
                        <Button
                            type="text"
                            icon={resolvedTheme === 'light' ? <MoonOutlined /> : <SunOutlined />}
                            onClick={toggleTheme}
                            className={styles.theme_toggle}
                            size="large"
                        />
                    </Tooltip>
                    <Tooltip title={`当前主题: ${theme === 'auto' ? '跟随系统' : theme === 'light' ? '浅色模式' : '深色模式'}`}>
                        <Button
                            type="text"
                            icon={<BulbOutlined />}
                            onClick={() => setTheme(theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto')}
                            className={styles.theme_mode}
                            size="large"
                        />
                    </Tooltip>
                </div>
                <h1 className={styles.page_title}>{t('page.title')}</h1>
                <p className={styles.page_description}>{t('page.description')}</p>
            </div>

            {/* iOS 风格分段控制器 */}
            <div className={styles.ios_segmented_wrapper}>
                <div className={styles.ios_segmented_control}>
                    {segmentItems.map((item, index) => (
                        <div
                            key={item.key}
                            className={`${styles.segment_item} ${activeTab === item.key ? styles.active : ''}`}
                            onClick={() => handleTabChange(item.key)}
                        >
                            <span className={styles.segment_icon}>{item.icon}</span>
                            <span className={styles.segment_label}>{item.label}</span>
                        </div>
                    ))}
                    <div
                        className={styles.segment_indicator}
                        style={{
                            left: `${segmentItems.findIndex(item => item.key === activeTab) * (100 / segmentItems.length)}%`,
                            width: `${100 / segmentItems.length}%`
                        }}
                    />
                </div>
            </div>

            {/* 主要内容区域 */}
            <div className={styles.webrtc_content}>
                {segmentItems.find(item => item.key === activeTab)?.component}
            </div>
        </div>
    )
}

export default WebRTC
