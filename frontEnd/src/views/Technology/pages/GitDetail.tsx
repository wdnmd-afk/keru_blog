import styles from '@/styles/reactDetail.module.scss'
import {
    ApiOutlined,
    BugOutlined,
    DatabaseOutlined,
    GithubOutlined,
    RocketOutlined,
    SafetyOutlined,
    ThunderboltOutlined,
    ToolOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Git & GitHub技术卡片数据
const gitTopics = [
    {
        id: 'git-basics',
        title: 'Git基础',
        description: 'Git版本控制基本概念与常用命令',
        icon: <GithubOutlined />,
        color: '#f1502f',
        difficulty: '简单',
        category: '基础操作',
    },
    {
        id: 'branching',
        title: '分支管理',
        description: 'Git分支策略与合并冲突解决',
        icon: <ToolOutlined />,
        color: '#24292e',
        difficulty: '中等',
        category: '分支管理',
    },
    {
        id: 'github-workflow',
        title: 'GitHub工作流',
        description: 'Pull Request、Issue、Code Review流程',
        icon: <RocketOutlined />,
        color: '#0366d6',
        difficulty: '中等',
        category: '协作流程',
    },
    {
        id: 'github-actions',
        title: 'GitHub Actions',
        description: 'CI/CD自动化工作流配置与实践',
        icon: <ThunderboltOutlined />,
        color: '#2088ff',
        difficulty: '高级',
        category: 'CI/CD',
    },
    {
        id: 'advanced-git',
        title: 'Git高级技巧',
        description: 'Rebase、Cherry-pick、Stash等高级操作',
        icon: <ApiOutlined />,
        color: '#6f42c1',
        difficulty: '高级',
        category: '高级操作',
    },
    {
        id: 'git-hooks',
        title: 'Git Hooks',
        description: 'Git钩子脚本与代码质量自动化',
        icon: <BugOutlined />,
        color: '#28a745',
        difficulty: '中等',
        category: '自动化',
    },
    {
        id: 'collaboration',
        title: '团队协作',
        description: '多人协作开发的最佳实践与规范',
        icon: <DatabaseOutlined />,
        color: '#fd7e14',
        difficulty: '中等',
        category: '团队协作',
    },
    {
        id: 'security',
        title: '安全最佳实践',
        description: 'Git安全配置与敏感信息保护',
        icon: <SafetyOutlined />,
        color: '#dc3545',
        difficulty: '中等',
        category: '安全',
    },
]

const GitDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleTopicClick = (topicId: string) => {
        navigate(`/technology/git/${topicId}`)
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
                    <GithubOutlined />
                </div>
                <div className={styles.tech_info}>
                    <h1>Git & GitHub 技术深度解析</h1>
                    <p>掌握版本控制与团队协作，构建高效的开发工作流</p>
                    <div className={styles.tech_tags}>
                        <Tag color="red">版本控制</Tag>
                        <Tag color="blue">团队协作</Tag>
                        <Tag color="green">开源社区</Tag>
                        <Tag color="purple">DevOps</Tag>
                    </div>
                </div>
            </div>

            <div className={styles.topics_grid}>
                <Row gutter={[24, 24]}>
                    {gitTopics.map((topic) => (
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

export default GitDetail
