import React from 'react'
import { Card, Tag, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    DatabaseOutlined,
    RocketOutlined,
    BugOutlined,
    ThunderboltOutlined,
    ApiOutlined,
    ToolOutlined,
    CloudOutlined,
    SafetyOutlined
} from '@ant-design/icons'
import styles from '@/styles/reactDetail.module.scss'

// Node.js技术卡片数据
const nodejsTopics = [
    {
        id: 'event-loop',
        title: '事件循环机制',
        description: 'Node.js事件循环原理与异步编程模式',
        icon: <RocketOutlined />,
        color: '#339933',
        difficulty: '高级',
        category: '核心原理'
    },
    {
        id: 'modules',
        title: '模块系统',
        description: 'CommonJS、ES Modules与包管理',
        icon: <DatabaseOutlined />,
        color: '#68217a',
        difficulty: '中等',
        category: '模块化'
    },
    {
        id: 'express',
        title: 'Express框架',
        description: 'Express.js Web应用开发与中间件',
        icon: <ApiOutlined />,
        color: '#000000',
        difficulty: '中等',
        category: 'Web框架'
    },
    {
        id: 'database',
        title: '数据库集成',
        description: 'MongoDB、MySQL等数据库操作与ORM',
        icon: <DatabaseOutlined />,
        color: '#4db33d',
        difficulty: '中等',
        category: '数据库'
    },
    {
        id: 'authentication',
        title: '身份认证',
        description: 'JWT、OAuth、Session等认证方案',
        icon: <SafetyOutlined />,
        color: '#ff6b6b',
        difficulty: '中等',
        category: '安全'
    },
    {
        id: 'testing',
        title: '测试策略',
        description: 'Jest、Mocha等测试框架与实践',
        icon: <BugOutlined />,
        color: '#9b59b6',
        difficulty: '中等',
        category: '测试'
    },
    {
        id: 'performance',
        title: '性能优化',
        description: '内存管理、集群部署与性能监控',
        icon: <ThunderboltOutlined />,
        color: '#f39c12',
        difficulty: '高级',
        category: '性能优化'
    },
    {
        id: 'microservices',
        title: '微服务架构',
        description: '微服务设计模式与服务间通信',
        icon: <CloudOutlined />,
        color: '#3498db',
        difficulty: '高级',
        category: '架构设计'
    }
]

const NodeJSDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleTopicClick = (topicId: string) => {
        navigate(`/technology/nodejs/${topicId}`)
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case '简单': return 'green'
            case '中等': return 'orange'
            case '高级': return 'red'
            default: return 'blue'
        }
    }

    return (
        <div className={styles.react_detail_container}>
            <div className={styles.detail_header}>
                <div className={styles.tech_icon}>
                    <DatabaseOutlined />
                </div>
                <div className={styles.tech_info}>
                    <h1>Node.js 技术深度解析</h1>
                    <p>掌握Node.js后端开发技术，构建高性能的服务端应用</p>
                    <div className={styles.tech_tags}>
                        <Tag color="green">JavaScript运行时</Tag>
                        <Tag color="blue">事件驱动</Tag>
                        <Tag color="orange">非阻塞I/O</Tag>
                        <Tag color="purple">高并发</Tag>
                    </div>
                </div>
            </div>

            <div className={styles.topics_grid}>
                <Row gutter={[24, 24]}>
                    {nodejsTopics.map(topic => (
                        <Col xs={24} sm={12} lg={8} xl={6} key={topic.id}>
                            <Card
                                hoverable
                                className={styles.topic_card}
                                onClick={() => handleTopicClick(topic.id)}
                            >
                                <div className={styles.card_header}>
                                    <div
                                        className={styles.topic_icon}
                                        style={{ color: topic.color }}
                                    >
                                        {topic.icon}
                                    </div>
                                    <div className={styles.card_tags}>
                                        <Tag color={getDifficultyColor(topic.difficulty)}>
                                            {topic.difficulty}
                                        </Tag>
                                        <Tag color="blue">{topic.category}</Tag>
                                    </div>
                                </div>

                                <div className={styles.card_content}>
                                    <h3>{topic.title}</h3>
                                    <p>{topic.description}</p>
                                </div>

                                <div className={styles.card_footer}>
                                    <span>点击查看详解</span>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>


        </div>
    )
}

export default NodeJSDetail
