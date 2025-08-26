import styles from '@/styles/reactDetail.module.scss'
import {
    BugOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExperimentOutlined,
    FunctionOutlined,
    PieChartOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Jest 技术卡片数据
const jestTopics = [
    {
        id: 'jest-basics',
        title: 'Jest 基础',
        description: 'Jest 安装配置、基本概念与测试环境搭建',
        icon: <SettingOutlined />,
        color: '#1890ff',
        difficulty: '简单',
        category: '基础配置',
    },
    {
        id: 'unit-testing',
        title: '单元测试',
        description: '编写单元测试、断言方法与测试用例设计',
        icon: <FunctionOutlined />,
        color: '#52c41a',
        difficulty: '简单',
        category: '测试编写',
    },
    {
        id: 'mocking',
        title: 'Mock 与 Spy',
        description: 'Jest Mock 功能、函数模拟与依赖注入测试',
        icon: <ExperimentOutlined />,
        color: '#722ed1',
        difficulty: '中等',
        category: '高级功能',
    },
    {
        id: 'async-testing',
        title: '异步测试',
        description: 'Promise、async/await 与异步代码的测试方法',
        icon: <ClockCircleOutlined />,
        color: '#fa8c16',
        difficulty: '中等',
        category: '异步处理',
    },
    {
        id: 'coverage',
        title: '测试覆盖率',
        description: '代码覆盖率分析、报告生成与质量评估',
        icon: <PieChartOutlined />,
        color: '#13c2c2',
        difficulty: '中等',
        category: '质量保证',
    },
    {
        id: 'best-practices',
        title: '最佳实践',
        description: 'Jest 测试最佳实践、性能优化与团队协作',
        icon: <CheckCircleOutlined />,
        color: '#f5222d',
        difficulty: '高级',
        category: '实践指南',
    },
]

const JestDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleTopicClick = (topicId: string) => {
        navigate(`/technology/jest/${topicId}`)
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
                    <BugOutlined />
                </div>
                <div className={styles.tech_info}>
                    <h1>Jest 测试框架深度解析</h1>
                    <p>掌握Jest测试框架的核心概念、最佳实践和高级特性</p>
                    <div className={styles.tech_tags}>
                        <Tag color="blue">测试框架</Tag>
                        <Tag color="green">单元测试</Tag>
                        <Tag color="orange">Mock</Tag>
                        <Tag color="purple">覆盖率</Tag>
                    </div>
                </div>
            </div>

            <div className={styles.topics_grid}>
                <Row gutter={[24, 24]}>
                    {jestTopics.map((topic) => (
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

export default JestDetail
