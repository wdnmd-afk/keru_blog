/**
 * WebRTC技术介绍组件
 * 
 * 功能说明：
 * 1. 展示WebRTC技术相关的介绍内容
 * 2. 包含技术架构图、特性说明、应用场景等
 * 3. 提供技术文档的链接和参考资料
 */

import React from 'react'
import { Card, Row, Col, Timeline, Tag, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import {
    VideoCameraOutlined,
    AudioOutlined,
    GlobalOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    TeamOutlined
} from '@ant-design/icons'
import styles from '@/styles/webrtc.module.scss'

const TechIntroduction: React.FC = () => {
    const { t } = useTranslation('webrtc')

    const features = [
        {
            icon: <VideoCameraOutlined className={styles.feature_icon} />,
            title: t('tech.features.video.title'),
            description: t('tech.features.video.description'),
            tags: ['H.264', 'VP8', 'VP9', 'AV1']
        },
        {
            icon: <AudioOutlined className={styles.feature_icon} />,
            title: t('tech.features.audio.title'),
            description: t('tech.features.audio.description'),
            tags: ['Opus', 'G.711', 'G.722', 'AAC']
        },
        {
            icon: <GlobalOutlined className={styles.feature_icon} />,
            title: t('tech.features.p2p.title'),
            description: t('tech.features.p2p.description'),
            tags: ['NAT穿透', 'STUN', 'TURN', 'ICE']
        },
        {
            icon: <SafetyCertificateOutlined className={styles.feature_icon} />,
            title: t('tech.features.security.title'),
            description: t('tech.features.security.description'),
            tags: ['DTLS', 'SRTP', '端到端加密']
        },
        {
            icon: <ThunderboltOutlined className={styles.feature_icon} />,
            title: t('tech.features.realtime.title'),
            description: t('tech.features.realtime.description'),
            tags: ['低延迟', '<200ms', '自适应码率']
        },
        {
            icon: <TeamOutlined className={styles.feature_icon} />,
            title: t('tech.features.multiuser.title'),
            description: t('tech.features.multiuser.description'),
            tags: ['SFU', 'MCU', '多人会议']
        }
    ]

    const timeline = [
        {
            color: 'green',
            children: (
                <div>
                    <h4>{t('tech.timeline.step1.title')}</h4>
                    <p>{t('tech.timeline.step1.description')}</p>
                </div>
            )
        },
        {
            color: 'blue',
            children: (
                <div>
                    <h4>{t('tech.timeline.step2.title')}</h4>
                    <p>{t('tech.timeline.step2.description')}</p>
                </div>
            )
        },
        {
            color: 'orange',
            children: (
                <div>
                    <h4>{t('tech.timeline.step3.title')}</h4>
                    <p>{t('tech.timeline.step3.description')}</p>
                </div>
            )
        },
        {
            color: 'red',
            children: (
                <div>
                    <h4>{t('tech.timeline.step4.title')}</h4>
                    <p>{t('tech.timeline.step4.description')}</p>
                </div>
            )
        }
    ]

    return (
        <div className={styles.tech_introduction}>
            {/* 技术概述 */}
            <Card className={styles.overview_card}>
                <h2>{t('tech.overview.title')}</h2>
                <p className={styles.overview_text}>
                    {t('tech.overview.description')}
                </p>
                <div className={styles.tech_stack}>
                    <Tag color="blue">React Native</Tag>
                    <Tag color="green">WebRTC API</Tag>
                    <Tag color="orange">Nest.js</Tag>
                    <Tag color="purple">Socket.IO</Tag>
                    <Tag color="red">Redis</Tag>
                </div>
            </Card>

            <Divider />

            {/* 核心特性 */}
            <div className={styles.features_section}>
                <h2>{t('tech.features.title')}</h2>
                <Row gutter={[16, 16]}>
                    {features.map((feature, index) => (
                        <Col xs={24} sm={12} lg={8} key={index}>
                            <Card className={styles.feature_card} hoverable>
                                <div className={styles.feature_header}>
                                    {feature.icon}
                                    <h3>{feature.title}</h3>
                                </div>
                                <p className={styles.feature_description}>
                                    {feature.description}
                                </p>
                                <div className={styles.feature_tags}>
                                    {feature.tags.map((tag, tagIndex) => (
                                        <Tag key={tagIndex} color="geekblue">
                                            {tag}
                                        </Tag>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <Divider />

            {/* 实现流程 */}
            <div className={styles.timeline_section}>
                <h2>{t('tech.timeline.title')}</h2>
                <Timeline items={timeline} />
            </div>

            <Divider />

            {/* 架构图 */}
            <Card className={styles.architecture_card}>
                <h2>{t('tech.architecture.title')}</h2>
                <div className={styles.architecture_diagram}>
                    <div className={styles.architecture_text}>
                        <pre className={styles.architecture_ascii}>
{`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │    Nest.js      │    │   Express.js    │
│   (视频采集)    │◄──►│   (信令服务)    │◄──►│   (中转服务)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       │
         │              ┌─────────────────┐              │
         │              │      Redis      │              │
         │              │   (Pub/Sub)     │              │
         │              └─────────────────┘              │
         │                                                │
         ▼                                                ▼
┌─────────────────┐                            ┌─────────────────┐
│   WebRTC P2P    │◄──────────────────────────►│   React Web     │
│   (直接连接)    │                            │   (视频播放)    │
└─────────────────┘                            └─────────────────┘
`}
                        </pre>
                    </div>
                </div>
                <p className={styles.architecture_description}>
                    {t('tech.architecture.description')}
                </p>
            </Card>
        </div>
    )
}

export default TechIntroduction
