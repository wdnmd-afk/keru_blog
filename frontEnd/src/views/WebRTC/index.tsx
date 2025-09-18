/**
 * WebRTC主页面组件
 * 
 * 功能说明：
 * 1. 提供WebRTC功能的主入口页面
 * 2. 包含Tab栏组件，分为"技术介绍"和"实时直播"两个标签页
 * 3. 技术介绍页面展示WebRTC相关文档和介绍
 * 4. 实时直播页面提供视频直播功能
 */

import React, { useState } from 'react'
import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import TechIntroduction from './components/TechIntroduction'
import LiveStreaming from './components/LiveStreaming'
import styles from '@/styles/webrtc.module.scss'

const { TabPane } = Tabs

const WebRTC: React.FC = () => {
    const { t } = useTranslation('webrtc')
    const [activeTab, setActiveTab] = useState<string>('tech-intro')

    const handleTabChange = (key: string) => {
        setActiveTab(key)
    }

    return (
        <div className={styles.webrtc_container}>
            <div className={styles.webrtc_header}>
                <h1 className={styles.page_title}>{t('page.title')}</h1>
                <p className={styles.page_description}>{t('page.description')}</p>
            </div>

            <div className={styles.webrtc_content}>
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    size="large"
                    className={styles.webrtc_tabs}
                >
                    <TabPane
                        tab={
                            <span className={styles.tab_label}>
                                <i className="icon-book" />
                                {t('tabs.tech_introduction')}
                            </span>
                        }
                        key="tech-intro"
                    >
                        <TechIntroduction />
                    </TabPane>

                    <TabPane
                        tab={
                            <span className={styles.tab_label}>
                                <i className="icon-video" />
                                {t('tabs.live_streaming')}
                            </span>
                        }
                        key="live-streaming"
                    >
                        <LiveStreaming />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default WebRTC
