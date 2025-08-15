import React from 'react'
import { Card, Tag, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    CloudOutlined,
    RocketOutlined,
    BugOutlined,
    ThunderboltOutlined,
    ApiOutlined,
    ToolOutlined,
    DatabaseOutlined,
    SafetyOutlined
} from '@ant-design/icons'
import styles from '@/styles/reactDetail.module.scss'

// Docker技术卡片数据
const dockerTopics = [
    {
        id: 'fundamentals',
        title: 'Docker基础',
        description: '容器化概念、镜像与容器的基本操作',
        icon: <CloudOutlined />,
        color: '#2496ed',
        difficulty: '简单',
        category: '基础概念'
    },
    {
        id: 'dockerfile',
        title: 'Dockerfile',
        description: '镜像构建文件编写与最佳实践',
        icon: <ToolOutlined />,
        color: '#0db7ed',
        difficulty: '中等',
        category: '镜像构建'
    },
    {
        id: 'docker-compose',
        title: 'Docker Compose',
        description: '多容器应用编排与服务管理',
        icon: <ApiOutlined />,
        color: '#326ce5',
        difficulty: '中等',
        category: '容器编排'
    },
    {
        id: 'networking',
        title: '网络配置',
        description: 'Docker网络模式与容器间通信',
        icon: <DatabaseOutlined />,
        color: '#ff6b6b',
        difficulty: '中等',
        category: '网络'
    },
    {
        id: 'volumes',
        title: '数据管理',
        description: '数据卷、绑定挂载与数据持久化',
        icon: <SafetyOutlined />,
        color: '#27ae60',
        difficulty: '中等',
        category: '数据存储'
    },
    {
        id: 'security',
        title: '安全最佳实践',
        description: '容器安全、镜像扫描与权限管理',
        icon: <BugOutlined />,
        color: '#e74c3c',
        difficulty: '高级',
        category: '安全'
    },
    {
        id: 'optimization',
        title: '性能优化',
        description: '镜像优化、资源限制与监控',
        icon: <ThunderboltOutlined />,
        color: '#f39c12',
        difficulty: '高级',
        category: '性能优化'
    },
    {
        id: 'kubernetes',
        title: 'Kubernetes集成',
        description: 'K8s容器编排与微服务部署',
        icon: <RocketOutlined />,
        color: '#326ce5',
        difficulty: '高级',
        category: '容器编排'
    }
]

const DockerDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleTopicClick = (topicId: string) => {
        navigate(`/technology/docker/${topicId}`)
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
                    <CloudOutlined />
                </div>
                <div className={styles.tech_info}>
                    <h1>Docker 技术深度解析</h1>
                    <p>掌握Docker容器化技术，实现应用的快速部署与扩展</p>
                    <div className={styles.tech_tags}>
                        <Tag color="blue">容器化</Tag>
                        <Tag color="green">轻量级</Tag>
                        <Tag color="orange">可移植</Tag>
                        <Tag color="purple">微服务</Tag>
                    </div>
                </div>
            </div>

            <div className={styles.topics_grid}>
                <Row gutter={[24, 24]}>
                    {dockerTopics.map(topic => (
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

export default DockerDetail
