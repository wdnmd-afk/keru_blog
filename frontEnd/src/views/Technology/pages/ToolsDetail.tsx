import styles from '@/styles/reactDetail.module.scss'
import {
    ApiOutlined,
    BugOutlined,
    CodeOutlined,
    ConsoleSqlOutlined,
    RocketOutlined,
    SafetyOutlined,
    ThunderboltOutlined,
    ToolOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// 开发工具技术卡片数据
const toolsTopics = [
    {
        id: 'vscode',
        title: 'VS Code',
        description: 'VS Code编辑器配置、插件与高效开发技巧',
        icon: <CodeOutlined />,
        color: '#007acc',
        difficulty: '简单',
        category: '代码编辑器',
    },
    {
        id: 'webpack',
        title: 'Webpack',
        description: '模块打包工具配置与性能优化',
        icon: <ToolOutlined />,
        color: '#8dd6f9',
        difficulty: '中等',
        category: '构建工具',
    },
    {
        id: 'vite',
        title: 'Vite',
        description: '下一代前端构建工具与开发服务器',
        icon: <ThunderboltOutlined />,
        color: '#646cff',
        difficulty: '中等',
        category: '构建工具',
    },
    {
        id: 'eslint-prettier',
        title: 'ESLint & Prettier',
        description: '代码质量检查与格式化工具配置',
        icon: <BugOutlined />,
        color: '#4b32c3',
        difficulty: '简单',
        category: '代码质量',
    },
    {
        id: 'chrome-devtools',
        title: 'Chrome DevTools',
        description: '浏览器开发者工具调试技巧',
        icon: <SafetyOutlined />,
        color: '#4285f4',
        difficulty: '中等',
        category: '调试工具',
    },
    {
        id: 'postman',
        title: 'Postman',
        description: 'API测试与接口文档管理',
        icon: <ApiOutlined />,
        color: '#ff6c37',
        difficulty: '简单',
        category: 'API工具',
    },
    {
        id: 'terminal',
        title: '终端工具',
        description: 'Shell、Zsh、终端效率提升技巧',
        icon: <ConsoleSqlOutlined />,
        color: '#000000',
        difficulty: '中等',
        category: '命令行',
    },
    {
        id: 'productivity',
        title: '效率工具',
        description: '开发效率提升的工具与方法论',
        icon: <RocketOutlined />,
        color: '#ff6b6b',
        difficulty: '简单',
        category: '效率提升',
    },
]

const ToolsDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleTopicClick = (topicId: string) => {
        navigate(`/technology/tools/${topicId}`)
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
                    <ToolOutlined />
                </div>
                <div className={styles.tech_info}>
                    <h1>开发工具 技术深度解析</h1>
                    <p>掌握现代开发工具链，提升开发效率与代码质量</p>
                    <div className={styles.tech_tags}>
                        <Tag color="blue">效率提升</Tag>
                        <Tag color="green">工具链</Tag>
                        <Tag color="orange">自动化</Tag>
                        <Tag color="purple">最佳实践</Tag>
                    </div>
                </div>
            </div>

            <div className={styles.topics_grid}>
                <Row gutter={[24, 24]}>
                    {toolsTopics.map((topic) => (
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

export default ToolsDetail
