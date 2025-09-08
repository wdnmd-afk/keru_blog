import styles from '@/styles/technology.module.scss'
import {
    BugOutlined,
    BulbOutlined,
    CloudOutlined,
    CodeOutlined,
    DatabaseOutlined,
    GithubOutlined,
    LinkOutlined,
    RocketOutlined,
    ToolOutlined,
    TrophyOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Progress, Row, Tabs, Tag, Timeline } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// 技术栈数据
const techStack = [
    {
        name: 'React',
        level: 90,
        color: '#61dafb',
        icon: <CodeOutlined />,
        route: 'react',
        description: 'React生态系统与最佳实践',
    },
    {
        name: 'TypeScript',
        level: 85,
        color: '#3178c6',
        icon: <CodeOutlined />,
        route: 'typescript',
        description: 'TypeScript类型系统与进阶',
    },
    {
        name: 'Node.js',
        level: 80,
        color: '#339933',
        icon: <DatabaseOutlined />,
        route: 'nodejs',
        description: 'Node.js后端开发技术',
    },
    {
        name: 'Vue.js',
        level: 75,
        color: '#4fc08d',
        icon: <CodeOutlined />,
        route: 'vue',
        description: 'Vue.js框架深度解析',
    },

    {
        name: 'Docker',
        level: 65,
        color: '#2496ed',
        icon: <CloudOutlined />,
        route: 'docker',
        description: 'Docker容器化技术',
    },
    {
        name: '开发工具',
        level: 80,
        color: '#ff6b6b',
        icon: <ToolOutlined />,
        route: 'tools',
        description: '开发工具与效率提升',
    },
    {
        name: 'Git & GitHub',
        level: 85,
        color: '#f1502f',
        icon: <GithubOutlined />,
        route: 'git',
        description: '版本控制与团队协作',
    },
    {
        name: 'Jest',
        level: 75,
        color: '#c21325',
        icon: <BugOutlined />,
        route: 'jest',
        description: 'Jest测试框架与最佳实践',
    },
]

// 项目数据
const projects = [
    {
        id: 1,
        title: 'K爷的博客系统',
        description: '基于React + Node.js的全栈博客系统，支持文章发布、评论、用户管理等功能。',
        tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
        status: '进行中',
        progress: 75,
        github: 'https://github.com/example/blog',
        demo: 'https://blog.example.com',
    },
    {
        id: 2,
        title: '文件管理系统',
        description: '支持多种文件格式预览和管理的Web应用，包含上传、下载、预览等功能。',
        tech: ['Vue.js', 'Express', 'MySQL'],
        status: '已完成',
        progress: 100,
        github: 'https://github.com/example/file-manager',
        demo: 'https://files.example.com',
    },
    {
        id: 3,
        title: '实时聊天应用',
        description: '基于WebSocket的实时聊天应用，支持群聊、私聊、文件传输等功能。',
        tech: ['React', 'Socket.io', 'Redis'],
        status: '计划中',
        progress: 20,
        github: '',
        demo: '',
    },
]

// 学习时间线
const learningTimeline = [
    {
        time: '2024年',
        title: '深入学习微前端架构',
        description: '研究qiankun、single-spa等微前端解决方案',
        status: 'processing',
    },
    {
        time: '2023年',
        title: '掌握云原生技术',
        description: '学习Docker、Kubernetes、CI/CD等技术',
        status: 'finish',
    },
    {
        time: '2022年',
        title: '全栈开发能力提升',
        description: '深入学习Node.js、数据库设计、系统架构',
        status: 'finish',
    },
    {
        time: '2021年',
        title: '前端框架精通',
        description: '深入学习React、Vue.js生态系统',
        status: 'finish',
    },
]

const Technology: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()

    // 技术栈数据（使用国际化）
    const techStackData = [
        {
            name: 'React',
            level: 90,
            color: '#61dafb',
            icon: <CodeOutlined />,
            route: 'react',
            description: t('react.description'),
        },
        {
            name: 'TypeScript',
            level: 85,
            color: '#3178c6',
            icon: <CodeOutlined />,
            route: 'typescript',
            description: t('typescript.description'),
        },
        {
            name: 'Node.js',
            level: 80,
            color: '#339933',
            icon: <DatabaseOutlined />,
            route: 'nodejs',
            description: t('nodejs.description'),
        },
        {
            name: 'Vue.js',
            level: 75,
            color: '#4fc08d',
            icon: <CodeOutlined />,
            route: 'vue',
            description: t('vue.description'),
        },
        {
            name: 'Docker',
            level: 65,
            color: '#2496ed',
            icon: <CloudOutlined />,
            route: 'docker',
            description: t('docker.description'),
        },
        {
            name: t('categories.tools'),
            level: 80,
            color: '#ff6b6b',
            icon: <ToolOutlined />,
            route: 'tools',
            description: t('git.description'),
        },
    ]

    // 处理技术栈卡片点击
    const handleTechClick = (route: string) => {
        navigate(`/technology/${route}`)
    }

    // Tabs配置项
    const tabItems = [
        {
            key: '1',
            label: (
                <span>
                    <TrophyOutlined />
                    {t('categories.frontend')}
                </span>
            ),
            children: (
                <div className={styles.tech_stack_section}>
                    <h2>{t('common.tech_skills')}</h2>
                    <Row gutter={[24, 24]}>
                        {techStackData.map((tech) => (
                            <Col xs={24} sm={12} lg={8} key={tech.name}>
                                <Card
                                    className={styles.skill_card}
                                    hoverable
                                    onClick={() => handleTechClick(tech.route)}
                                >
                                    <div className={styles.skill_header}>
                                        <div
                                            className={styles.skill_icon}
                                            style={{ color: tech.color }}
                                        >
                                            {tech.icon}
                                        </div>
                                        <div className={styles.skill_info}>
                                            <h3>{tech.name}</h3>
                                            <p>{tech.description}</p>
                                        </div>
                                    </div>
                                    <Progress
                                        percent={tech.level}
                                        strokeColor={tech.color}
                                        showInfo={false}
                                    />
                                    <div className={styles.skill_level}>
                                        {t('common.proficiency')}: {tech.level}%
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    <RocketOutlined />
                    项目经验
                </span>
            ),
            children: (
                <div className={styles.projects_section}>
                    <h2>项目展示</h2>
                    <Row gutter={[24, 24]}>
                        {projects.map((project) => (
                            <Col xs={24} lg={12} key={project.id}>
                                <Card
                                    className={styles.project_card}
                                    actions={[
                                        project.github && (
                                            <Button
                                                type="text"
                                                icon={<GithubOutlined />}
                                                href={project.github}
                                                target="_blank"
                                            >
                                                源码
                                            </Button>
                                        ),
                                        project.demo && (
                                            <Button
                                                type="text"
                                                icon={<LinkOutlined />}
                                                href={project.demo}
                                                target="_blank"
                                            >
                                                演示
                                            </Button>
                                        ),
                                    ].filter(Boolean)}
                                >
                                    <Card.Meta
                                        title={
                                            <div className={styles.project_title}>
                                                {project.title}
                                                <Tag
                                                    color={
                                                        project.status === '已完成'
                                                            ? 'green'
                                                            : project.status === '进行中'
                                                              ? 'blue'
                                                              : 'orange'
                                                    }
                                                >
                                                    {project.status}
                                                </Tag>
                                            </div>
                                        }
                                        description={
                                            <div className={styles.project_info}>
                                                <p>{project.description}</p>
                                                <div className={styles.tech_tags}>
                                                    {project.tech.map((tech) => (
                                                        <Tag key={tech} color="blue">
                                                            {tech}
                                                        </Tag>
                                                    ))}
                                                </div>
                                                <div className={styles.project_progress}>
                                                    <span>进度: </span>
                                                    <Progress
                                                        percent={project.progress}
                                                        size="small"
                                                        style={{ flex: 1, marginLeft: 8 }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <span>
                    <BulbOutlined />
                    学习历程
                </span>
            ),
            children: (
                <div className={styles.learning_section}>
                    <h2>技术成长时间线</h2>
                    <Timeline mode="left" className={styles.learning_timeline}>
                        {learningTimeline.map((item, index) => (
                            <Timeline.Item
                                key={index}
                                color={item.status === 'processing' ? 'blue' : 'green'}
                                label={<span className={styles.timeline_time}>{item.time}</span>}
                            >
                                <div className={styles.timeline_content}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </div>
            ),
        },
    ]

    return (
        <div className={styles.technology_container}>
            <div className={styles.tech_header}>
                <div className={styles.header_content}>
                    <CodeOutlined className={styles.header_icon} />
                    <h1>{t('common.learning_journey')}</h1>
                    <p>{t('common.tech_details')}</p>
                </div>
            </div>

            <div className={styles.tech_content}>
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    className={styles.tech_tabs}
                    items={tabItems}
                />
            </div>
        </div>
    )
}

export default Technology
