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

// TypeScript技术卡片数据
const typescriptTopics = [
    {
        id: 'basic-types',
        title: '基础类型系统',
        description: 'TypeScript基础类型与类型注解详解',
        icon: <CodeOutlined />,
        color: '#3178c6',
        difficulty: '简单',
        category: '基础语法'
    },
    {
        id: 'advanced-types',
        title: '高级类型',
        description: '联合类型、交叉类型、条件类型等高级特性',
        icon: <RocketOutlined />,
        color: '#2b7489',
        difficulty: '高级',
        category: '高级特性'
    },
    {
        id: 'generics',
        title: '泛型编程',
        description: '泛型的使用技巧与实际应用场景',
        icon: <ThunderboltOutlined />,
        color: '#f39c12',
        difficulty: '中等',
        category: '泛型'
    },
    {
        id: 'decorators',
        title: '装饰器',
        description: '装饰器模式在TypeScript中的应用',
        icon: <ApiOutlined />,
        color: '#e74c3c',
        difficulty: '高级',
        category: '装饰器'
    },
    {
        id: 'modules',
        title: '模块系统',
        description: 'TypeScript模块化开发与命名空间',
        icon: <DatabaseOutlined />,
        color: '#9b59b6',
        difficulty: '中等',
        category: '模块化'
    },
    {
        id: 'utility-types',
        title: '工具类型',
        description: '内置工具类型与自定义工具类型',
        icon: <ToolOutlined />,
        color: '#27ae60',
        difficulty: '中等',
        category: '工具类型'
    },
    {
        id: 'react-typescript',
        title: 'React + TypeScript',
        description: 'TypeScript在React项目中的最佳实践',
        icon: <SafetyOutlined />,
        color: '#61dafb',
        difficulty: '中等',
        category: 'React集成'
    },
    {
        id: 'configuration',
        title: '配置与工具链',
        description: 'tsconfig.json配置与开发工具集成',
        icon: <BugOutlined />,
        color: '#34495e',
        difficulty: '简单',
        category: '配置'
    }
]

const TypeScriptDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleTopicClick = (topicId: string) => {
        navigate(`/technology/typescript/${topicId}`)
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
                    <h1>TypeScript 技术深度解析</h1>
                    <p>掌握TypeScript类型系统，编写更安全、更可维护的JavaScript代码</p>
                    <div className={styles.tech_tags}>
                        <Tag color="blue">类型安全</Tag>
                        <Tag color="green">静态检查</Tag>
                        <Tag color="orange">JavaScript超集</Tag>
                        <Tag color="purple">开发体验</Tag>
                    </div>
                </div>
            </div>

            <div className={styles.topics_grid}>
                <Row gutter={[24, 24]}>
                    {typescriptTopics.map(topic => (
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

export default TypeScriptDetail
