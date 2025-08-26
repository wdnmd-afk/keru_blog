import styles from '@/styles/reactDetail.module.scss'
import {
    ApiOutlined,
    BugOutlined,
    CodeOutlined,
    DatabaseOutlined,
    RocketOutlined,
    SafetyOutlined,
    ThunderboltOutlined,
    ToolOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Vue.js技术卡片数据
const vueTopics = [
    {
        id: 'composition-api',
        title: 'Composition API',
        description: 'Vue 3组合式API的深度解析与最佳实践',
        icon: <RocketOutlined />,
        color: '#4fc08d',
        difficulty: '中等',
        category: 'Vue 3',
    },
    {
        id: 'reactivity',
        title: '响应式原理',
        description: 'Vue响应式系统的实现原理与性能优化',
        icon: <ThunderboltOutlined />,
        color: '#42b883',
        difficulty: '高级',
        category: '核心原理',
    },
    {
        id: 'vue-router',
        title: 'Vue Router',
        description: 'Vue路由系统的配置与高级用法',
        icon: <ApiOutlined />,
        color: '#35495e',
        difficulty: '中等',
        category: '生态系统',
    },
    {
        id: 'vuex-pinia',
        title: 'Vuex & Pinia',
        description: 'Vue状态管理解决方案对比与实践',
        icon: <DatabaseOutlined />,
        color: '#ff6b6b',
        difficulty: '中等',
        category: '状态管理',
    },
    {
        id: 'performance',
        title: 'Performance',
        description: 'Vue应用性能优化策略与实践',
        icon: <ThunderboltOutlined />,
        color: '#f39c12',
        difficulty: '高级',
        category: '性能优化',
    },
    {
        id: 'testing',
        title: 'Testing',
        description: 'Vue组件测试最佳实践',
        icon: <BugOutlined />,
        color: '#9b59b6',
        difficulty: '中等',
        category: '测试',
    },
    {
        id: 'ssr',
        title: 'SSR & Nuxt',
        description: '服务端渲染与Nuxt.js框架',
        icon: <SafetyOutlined />,
        color: '#e74c3c',
        difficulty: '高级',
        category: '服务端渲染',
    },
    {
        id: 'migration',
        title: 'Vue 2 to 3',
        description: 'Vue 2到Vue 3的迁移指南',
        icon: <ToolOutlined />,
        color: '#3498db',
        difficulty: '中等',
        category: '迁移升级',
    },
]

const VueDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleTopicClick = (topicId: string) => {
        navigate(`/technology/vue/${topicId}`)
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case '简单':
                return 'green'
            case '中等':
                return 'orange'
            case '高级':
                return 'red'
            default:
                return 'blue'
        }
    }

    return (
        <div className={styles.react_detail_container}>
            <div className={styles.detail_header}>
                <div className={styles.tech_icon}>
                    <CodeOutlined />
                </div>
                <div className={styles.tech_info}>
                    <h1>Vue.js 技术深度解析</h1>
                    <p>深入理解Vue.js的核心概念、生态系统和最佳实践</p>
                    <div className={styles.tech_tags}>
                        <Tag color="green">前端框架</Tag>
                        <Tag color="blue">渐进式</Tag>
                        <Tag color="orange">响应式</Tag>
                        <Tag color="purple">组合式API</Tag>
                    </div>
                </div>
            </div>

            <div className={styles.topics_grid}>
                <Row gutter={[24, 24]}>
                    {vueTopics.map((topic) => (
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

export default VueDetail
