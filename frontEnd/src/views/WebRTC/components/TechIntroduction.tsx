/**
 * WebRTC技术介绍组件
 *
 * 功能说明：
 * 1. 展示WebRTC技术相关的介绍内容
 * 2. 包含技术架构图、特性说明、应用场景等
 * 3. 提供技术文档的链接和参考资料
 */

import { useTheme } from '@/hooks/useTheme'
import styles from '@/styles/webrtc.module.scss'
import {
    ApiOutlined,
    AudioOutlined,
    CloudOutlined,
    CodeOutlined,
    GlobalOutlined,
    LockOutlined,
    MonitorOutlined,
    NetworkOutlined,
    RocketOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'
import { Card, Col, Divider, Progress, Row, Statistic, Tag, Timeline } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TechIntroduction: React.FC = () => {
    const { t } = useTranslation('webrtc')
    const { resolvedTheme } = useTheme()

    const features = [
        {
            icon: <VideoCameraOutlined className={styles.feature_icon} />,
            title: t('tech.features.video.title'),
            description: t('tech.features.video.description'),
            tags: ['H.264', 'VP8', 'VP9', 'AV1'],
            performance: 95,
            color: '#FF6B6B',
        },
        {
            icon: <AudioOutlined className={styles.feature_icon} />,
            title: t('tech.features.audio.title'),
            description: t('tech.features.audio.description'),
            tags: ['Opus', 'G.711', 'G.722', 'AAC'],
            performance: 98,
            color: '#4ECDC4',
        },
        {
            icon: <GlobalOutlined className={styles.feature_icon} />,
            title: t('tech.features.p2p.title'),
            description: t('tech.features.p2p.description'),
            tags: ['NAT穿透', 'STUN', 'TURN', 'ICE'],
            performance: 88,
            color: '#45B7D1',
        },
        {
            icon: <SafetyCertificateOutlined className={styles.feature_icon} />,
            title: t('tech.features.security.title'),
            description: t('tech.features.security.description'),
            tags: ['DTLS', 'SRTP', '端到端加密'],
            performance: 99,
            color: '#96CEB4',
        },
        {
            icon: <ThunderboltOutlined className={styles.feature_icon} />,
            title: t('tech.features.realtime.title'),
            description: t('tech.features.realtime.description'),
            tags: ['低延迟', '<200ms', '自适应码率'],
            performance: 92,
            color: '#FFEAA7',
        },
        {
            icon: <TeamOutlined className={styles.feature_icon} />,
            title: t('tech.features.multiuser.title'),
            description: t('tech.features.multiuser.description'),
            tags: ['SFU', 'MCU', '多人会议'],
            performance: 85,
            color: '#DDA0DD',
        },
    ]

    // 技术栈数据
    const techStack = [
        {
            category: '前端技术',
            icon: <MonitorOutlined />,
            technologies: [
                { name: 'React 18', level: 95, color: '#61DAFB' },
                { name: 'TypeScript', level: 90, color: '#3178C6' },
                { name: 'WebRTC API', level: 88, color: '#FF6B6B' },
                { name: 'Socket.IO', level: 85, color: '#010101' },
            ]
        },
        {
            category: '后端技术',
            icon: <CloudOutlined />,
            technologies: [
                { name: 'Node.js', level: 92, color: '#339933' },
                { name: 'Express.js', level: 88, color: '#000000' },
                { name: 'WebSocket', level: 90, color: '#4F4F4F' },
                { name: 'Redis', level: 85, color: '#DC382D' },
            ]
        },
        {
            category: '网络协议',
            icon: <NetworkOutlined />,
            technologies: [
                { name: 'RTP/RTCP', level: 95, color: '#FF9500' },
                { name: 'STUN/TURN', level: 88, color: '#007AFF' },
                { name: 'ICE', level: 90, color: '#34C759' },
                { name: 'SDP', level: 85, color: '#AF52DE' },
            ]
        },
        {
            category: '安全加密',
            icon: <LockOutlined />,
            technologies: [
                { name: 'DTLS', level: 92, color: '#FF3B30' },
                { name: 'SRTP', level: 90, color: '#FF9500' },
                { name: 'TLS 1.3', level: 88, color: '#30D158' },
                { name: 'OAuth 2.0', level: 85, color: '#007AFF' },
            ]
        }
    ]

    // 性能指标
    const performanceMetrics = [
        {
            title: '视频质量',
            value: 95,
            suffix: '%',
            description: '4K@60fps 支持',
            icon: <VideoCameraOutlined />,
            color: '#FF6B6B'
        },
        {
            title: '音频质量',
            value: 98,
            suffix: '%',
            description: '48kHz 立体声',
            icon: <AudioOutlined />,
            color: '#4ECDC4'
        },
        {
            title: '连接成功率',
            value: 99.2,
            suffix: '%',
            description: 'NAT 穿透率',
            icon: <GlobalOutlined />,
            color: '#45B7D1'
        },
        {
            title: '平均延迟',
            value: 85,
            suffix: 'ms',
            description: '端到端延迟',
            icon: <ThunderboltOutlined />,
            color: '#FFEAA7'
        }
    ]

    // WebRTC 架构图组件
    const WebRTCArchitecture = () => {
        const isDark = resolvedTheme === 'dark'
        const primaryColor = isDark ? '#0A84FF' : '#007AFF'
        const textColor = isDark ? '#FFFFFF' : '#000000'
        const bgColor = isDark ? '#1C1C1E' : '#FFFFFF'
        const lineColor = isDark ? '#48484A' : '#C7C7CC'

        return (
            <div className={styles.architecture_svg_container}>
                <svg viewBox="0 0 800 400" className={styles.architecture_svg}>
                    {/* 背景 */}
                    <rect width="800" height="400" fill={bgColor} rx="12" />

                    {/* 客户端 A */}
                    <g transform="translate(50, 50)">
                        <rect width="120" height="80" fill={primaryColor} rx="8" opacity="0.1" />
                        <rect width="120" height="80" fill="none" stroke={primaryColor} strokeWidth="2" rx="8" />
                        <text x="60" y="30" textAnchor="middle" fill={textColor} fontSize="12" fontWeight="600">
                            客户端 A
                        </text>
                        <text x="60" y="45" textAnchor="middle" fill={textColor} fontSize="10">
                            React Native
                        </text>
                        <text x="60" y="60" textAnchor="middle" fill={textColor} fontSize="10">
                            WebRTC API
                        </text>
                    </g>

                    {/* 信令服务器 */}
                    <g transform="translate(340, 30)">
                        <rect width="120" height="120" fill="#34C759" rx="8" opacity="0.1" />
                        <rect width="120" height="120" fill="none" stroke="#34C759" strokeWidth="2" rx="8" />
                        <text x="60" y="35" textAnchor="middle" fill={textColor} fontSize="12" fontWeight="600">
                            信令服务器
                        </text>
                        <text x="60" y="50" textAnchor="middle" fill={textColor} fontSize="10">
                            Node.js
                        </text>
                        <text x="60" y="65" textAnchor="middle" fill={textColor} fontSize="10">
                            Socket.IO
                        </text>
                        <text x="60" y="80" textAnchor="middle" fill={textColor} fontSize="10">
                            Express.js
                        </text>
                        <text x="60" y="95" textAnchor="middle" fill={textColor} fontSize="10">
                            Redis
                        </text>
                    </g>

                    {/* 客户端 B */}
                    <g transform="translate(630, 50)">
                        <rect width="120" height="80" fill={primaryColor} rx="8" opacity="0.1" />
                        <rect width="120" height="80" fill="none" stroke={primaryColor} strokeWidth="2" rx="8" />
                        <text x="60" y="30" textAnchor="middle" fill={textColor} fontSize="12" fontWeight="600">
                            客户端 B
                        </text>
                        <text x="60" y="45" textAnchor="middle" fill={textColor} fontSize="10">
                            React Web
                        </text>
                        <text x="60" y="60" textAnchor="middle" fill={textColor} fontSize="10">
                            WebRTC API
                        </text>
                    </g>

                    {/* STUN/TURN 服务器 */}
                    <g transform="translate(340, 200)">
                        <rect width="120" height="80" fill="#FF9500" rx="8" opacity="0.1" />
                        <rect width="120" height="80" fill="none" stroke="#FF9500" strokeWidth="2" rx="8" />
                        <text x="60" y="30" textAnchor="middle" fill={textColor} fontSize="12" fontWeight="600">
                            STUN/TURN
                        </text>
                        <text x="60" y="45" textAnchor="middle" fill={textColor} fontSize="10">
                            NAT 穿透
                        </text>
                        <text x="60" y="60" textAnchor="middle" fill={textColor} fontSize="10">
                            中继服务
                        </text>
                    </g>

                    {/* 连接线和动画 */}
                    <line x1="170" y1="90" x2="340" y2="90" stroke={lineColor} strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
                    </line>
                    <text x="255" y="85" textAnchor="middle" fill={textColor} fontSize="10">信令交换</text>

                    <line x1="460" y1="90" x2="630" y2="90" stroke={lineColor} strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
                    </line>

                    <path d="M 170 110 Q 400 180 630 110" stroke="#FF3B30" strokeWidth="3" fill="none" strokeDasharray="8,4">
                        <animate attributeName="stroke-dashoffset" values="0;12" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <text x="400" y="160" textAnchor="middle" fill="#FF3B30" fontSize="12" fontWeight="600">
                        P2P 媒体流
                    </text>
                </svg>
            </div>
        )
    }

    const timeline = [
        {
            color: 'green',
            children: (
                <div>
                    <h4>{t('tech.timeline.step1.title')}</h4>
                    <p>{t('tech.timeline.step1.description')}</p>
                </div>
            ),
        },
        {
            color: 'blue',
            children: (
                <div>
                    <h4>{t('tech.timeline.step2.title')}</h4>
                    <p>{t('tech.timeline.step2.description')}</p>
                </div>
            ),
        },
        {
            color: 'orange',
            children: (
                <div>
                    <h4>{t('tech.timeline.step3.title')}</h4>
                    <p>{t('tech.timeline.step3.description')}</p>
                </div>
            ),
        },
        {
            color: 'red',
            children: (
                <div>
                    <h4>{t('tech.timeline.step4.title')}</h4>
                    <p>{t('tech.timeline.step4.description')}</p>
                </div>
            ),
        },
    ]

    return (
        <div className={styles.tech_introduction}>
            {/* 技术概述 */}
            <Card className={styles.overview_card}>
                <h2>{t('tech.overview.title')}</h2>
                <p className={styles.overview_text}>{t('tech.overview.description')}</p>
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
                                <p className={styles.feature_description}>{feature.description}</p>
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
