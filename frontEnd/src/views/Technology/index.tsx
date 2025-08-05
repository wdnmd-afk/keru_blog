import React from 'react'
import { Card, Row, Col, Tag, Button, Tabs, Timeline, Progress } from 'antd'
import { 
    CodeOutlined, 
    RocketOutlined, 
    BulbOutlined, 
    TrophyOutlined,
    GithubOutlined,
    LinkOutlined
} from '@ant-design/icons'
import styles from '@/styles/technology.module.scss'

const { TabPane } = Tabs

// 技术栈数据
const techStack = [
    { name: 'React', level: 90, color: '#61dafb' },
    { name: 'TypeScript', level: 85, color: '#3178c6' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'Vue.js', level: 75, color: '#4fc08d' },
    { name: 'Python', level: 70, color: '#3776ab' },
    { name: 'Docker', level: 65, color: '#2496ed' },
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
        demo: 'https://blog.example.com'
    },
    {
        id: 2,
        title: '文件管理系统',
        description: '支持多种文件格式预览和管理的Web应用，包含上传、下载、预览等功能。',
        tech: ['Vue.js', 'Express', 'MySQL'],
        status: '已完成',
        progress: 100,
        github: 'https://github.com/example/file-manager',
        demo: 'https://files.example.com'
    },
    {
        id: 3,
        title: '实时聊天应用',
        description: '基于WebSocket的实时聊天应用，支持群聊、私聊、文件传输等功能。',
        tech: ['React', 'Socket.io', 'Redis'],
        status: '计划中',
        progress: 20,
        github: '',
        demo: ''
    }
]

// 学习时间线
const learningTimeline = [
    {
        time: '2024年',
        title: '深入学习微前端架构',
        description: '研究qiankun、single-spa等微前端解决方案',
        status: 'processing'
    },
    {
        time: '2023年',
        title: '掌握云原生技术',
        description: '学习Docker、Kubernetes、CI/CD等技术',
        status: 'finish'
    },
    {
        time: '2022年',
        title: '全栈开发能力提升',
        description: '深入学习Node.js、数据库设计、系统架构',
        status: 'finish'
    },
    {
        time: '2021年',
        title: '前端框架精通',
        description: '深入学习React、Vue.js生态系统',
        status: 'finish'
    }
]

const Technology: React.FC = () => {
    return (
        <div className={styles.technology_container}>
            <div className={styles.tech_header}>
                <div className={styles.header_content}>
                    <CodeOutlined className={styles.header_icon} />
                    <h1>技术成长之路</h1>
                    <p>记录技术学习历程，分享开发经验与心得</p>
                </div>
            </div>

            <div className={styles.tech_content}>
                <Tabs defaultActiveKey="1" size="large" className={styles.tech_tabs}>
                    <TabPane 
                        tab={
                            <span>
                                <TrophyOutlined />
                                技术栈
                            </span>
                        } 
                        key="1"
                    >
                        <div className={styles.tech_stack_section}>
                            <h2>技术能力</h2>
                            <Row gutter={[24, 24]}>
                                {techStack.map(tech => (
                                    <Col xs={24} sm={12} lg={8} key={tech.name}>
                                        <Card className={styles.skill_card}>
                                            <div className={styles.skill_header}>
                                                <span 
                                                    className={styles.skill_dot}
                                                    style={{ backgroundColor: tech.color }}
                                                />
                                                <h3>{tech.name}</h3>
                                            </div>
                                            <Progress 
                                                percent={tech.level} 
                                                strokeColor={tech.color}
                                                showInfo={false}
                                            />
                                            <div className={styles.skill_level}>
                                                熟练度: {tech.level}%
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </TabPane>

                    <TabPane 
                        tab={
                            <span>
                                <RocketOutlined />
                                项目经验
                            </span>
                        } 
                        key="2"
                    >
                        <div className={styles.projects_section}>
                            <h2>项目展示</h2>
                            <Row gutter={[24, 24]}>
                                {projects.map(project => (
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
                                                )
                                            ].filter(Boolean)}
                                        >
                                            <Card.Meta
                                                title={
                                                    <div className={styles.project_title}>
                                                        {project.title}
                                                        <Tag 
                                                            color={
                                                                project.status === '已完成' ? 'green' :
                                                                project.status === '进行中' ? 'blue' : 'orange'
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
                                                            {project.tech.map(tech => (
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
                    </TabPane>

                    <TabPane 
                        tab={
                            <span>
                                <BulbOutlined />
                                学习历程
                            </span>
                        } 
                        key="3"
                    >
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
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Technology
