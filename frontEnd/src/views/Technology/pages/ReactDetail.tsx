import React from 'react'
import { Card, Tag, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    CodeOutlined,
    RocketOutlined,
    BugOutlined,
    ThunderboltOutlined,
    ApiOutlined,
    ToolOutlined,
    DatabaseOutlined,
    SafetyOutlined
} from '@ant-design/icons'
import styles from '@/styles/reactDetail.module.scss'

// React技术卡片数据
const reactTopics = [
    {
        id: 'useeffect',
        title: 'useEffect',
        description: 'Effect Hook的使用技巧与常见陷阱',
        icon: <RocketOutlined />,
        color: '#1890ff',
        difficulty: '中等',
        category: 'Hooks'
    },
    {
        id: 'usecallback',
        title: 'useCallback',
        description: '性能优化利器，避免不必要的重新渲染',
        icon: <ThunderboltOutlined />,
        color: '#52c41a',
        difficulty: '中等',
        category: 'Hooks'
    },
    {
        id: 'usememo',
        title: 'useMemo',
        description: '缓存计算结果，优化组件性能',
        icon: <DatabaseOutlined />,
        color: '#fa8c16',
        difficulty: '中等',
        category: 'Hooks'
    },
    {
        id: 'usecontext',
        title: 'useContext',
        description: '跨组件状态共享的最佳实践',
        icon: <ApiOutlined />,
        color: '#722ed1',
        difficulty: '简单',
        category: 'Hooks'
    },
    {
        id: 'custom-hooks',
        title: 'Custom Hooks',
        description: '自定义Hook的设计模式与实现',
        icon: <ToolOutlined />,
        color: '#eb2f96',
        difficulty: '高级',
        category: 'Hooks'
    },
    {
        id: 'performance',
        title: 'Performance',
        description: 'React性能优化策略与实践',
        icon: <ThunderboltOutlined />,
        color: '#f5222d',
        difficulty: '高级',
        category: '性能优化'
    },
    {
        id: 'error-boundary',
        title: 'Error Boundary',
        description: '错误边界处理与异常捕获',
        icon: <SafetyOutlined />,
        color: '#fa541c',
        difficulty: '中等',
        category: '错误处理'
    },
    {
        id: 'testing',
        title: 'Testing',
        description: 'React组件测试最佳实践',
        icon: <BugOutlined />,
        color: '#13c2c2',
        difficulty: '中等',
        category: '测试'
    }
]

const ReactDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleTopicClick = (topicId: string) => {
        navigate(`/technology/react/${topicId}`)
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
                    <CodeOutlined />
                </div>
                <div className={styles.tech_info}>
                    <h1>React 技术深度解析</h1>
                    <p>深入理解React的核心概念、最佳实践和常见难点</p>
                    <div className={styles.tech_tags}>
                        <Tag color="blue">前端框架</Tag>
                        <Tag color="green">组件化</Tag>
                        <Tag color="orange">虚拟DOM</Tag>
                        <Tag color="purple">Hooks</Tag>
                    </div>
                </div>
            </div>

            <div className={styles.topics_grid}>
                <Row gutter={[24, 24]}>
                    {reactTopics.map(topic => (
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

export default ReactDetail
