/**
 * 技术学习流程图时间线组件
 *
 * 功能说明：
 * 1. 使用流程图样式展示技术学习历程
 * 2. 支持技术栈之间的关联关系展示
 * 3. 可视化学习进度和里程碑
 * 4. 响应式设计，支持移动端适配
 *
 * 技术特性：
 * - 自定义SVG节点渲染
 * - 动态连接线和关系展示
 * - 交互式节点点击和悬停效果
 * - 与Ant Design设计语言保持一致
 */

import styles from '@/styles/learning.module.scss'
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    MinusOutlined,
    PlusOutlined,
    RocketOutlined,
    StarOutlined,
} from '@ant-design/icons'
import { Button, Progress, Tag } from 'antd'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TechNodeModal from './TechNodeModal'

/**
 * 技术节点数据接口
 */
interface TechNode {
    id: string
    name: string
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'ai'
    status: 'completed' | 'in_progress' | 'planned'
    progress: number
    startDate: string
    completedDate?: string
    description: string
    skills: string[]
    achievements: string[]
    connections: string[] // 关联的技术节点ID
    position: { x: number; y: number }
    level: number // 学习深度等级 1-5
}

/**
 * 技术学习流程图时间线组件
 */
const TechFlowTimeline: React.FC = () => {
    const { t } = useTranslation('learning')
    const [selectedNode, setSelectedNode] = useState<TechNode | null>(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1)

    // 技术学习节点数据 - 重新优化布局算法
    const techNodes: TechNode[] = useMemo(
        () => [
            // 第一行：基础技术链（从左到右的学习路径）
            {
                id: 'html-css',
                name: 'HTML & CSS',
                category: 'frontend',
                status: 'completed',
                progress: 100,
                startDate: '2020-01',
                completedDate: '2020-06',
                description: '前端基础技术栈，网页结构和样式设计',
                skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', '响应式设计'],
                achievements: ['完成个人网站搭建', '掌握现代CSS布局'],
                connections: ['javascript'],
                position: { x: 80, y: 60 },
                level: 4,
            },
            {
                id: 'javascript',
                name: 'JavaScript',
                category: 'frontend',
                status: 'completed',
                progress: 100,
                startDate: '2020-06',
                completedDate: '2021-03',
                description: 'JavaScript核心语言特性和ES6+新特性',
                skills: ['ES6+', 'Promise', 'Async/Await', 'DOM操作', '事件处理'],
                achievements: ['完成多个交互式项目', '掌握异步编程'],
                connections: ['react', 'nodejs'],
                position: { x: 420, y: 60 },
                level: 5,
            },
            {
                id: 'nodejs',
                name: 'Node.js',
                category: 'backend',
                status: 'completed',
                progress: 85,
                startDate: '2021-06',
                completedDate: '2022-03',
                description: 'Node.js后端开发和服务器端技术',
                skills: ['Express', 'Koa', 'MongoDB', 'RESTful API'],
                achievements: ['构建完整后端服务', '掌握数据库设计'],
                connections: ['database'],
                position: { x: 760, y: 60 },
                level: 4,
            },
            {
                id: 'database',
                name: 'Database',
                category: 'database',
                status: 'completed',
                progress: 75,
                startDate: '2021-09',
                completedDate: '2022-06',
                description: '数据库设计和管理',
                skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma'],
                achievements: ['设计复杂数据模型', '优化查询性能'],
                connections: ['docker'],
                position: { x: 1100, y: 60 },
                level: 3,
            },

            // 第二行：前端框架发展路径
            {
                id: 'react',
                name: 'React',
                category: 'frontend',
                status: 'completed',
                progress: 100,
                startDate: '2021-03',
                completedDate: '2022-01',
                description: 'React生态系统和现代前端开发',
                skills: ['React Hooks', 'Redux', 'React Router', 'Context API'],
                achievements: ['构建大型SPA应用', '掌握状态管理'],
                connections: ['typescript'],
                position: { x: 80, y: 260 },
                level: 5,
            },
            {
                id: 'typescript',
                name: 'TypeScript',
                category: 'frontend',
                status: 'completed',
                progress: 90,
                startDate: '2021-08',
                completedDate: '2022-06',
                description: 'TypeScript类型系统和高级特性',
                skills: ['类型定义', '泛型', '装饰器', '模块系统'],
                achievements: ['重构项目为TS', '提升代码质量'],
                connections: ['nextjs'],
                position: { x: 420, y: 260 },
                level: 4,
            },
            {
                id: 'nextjs',
                name: 'Next.js',
                category: 'frontend',
                status: 'completed',
                progress: 80,
                startDate: '2022-01',
                completedDate: '2022-08',
                description: 'Next.js全栈React框架',
                skills: ['SSR', 'SSG', 'API Routes', '性能优化'],
                achievements: ['构建生产级应用', '掌握全栈开发'],
                connections: [],
                position: { x: 760, y: 260 },
                level: 4,
            },

            // 第三行：DevOps和新兴技术
            {
                id: 'ai-ml',
                name: 'AI & ML',
                category: 'ai',
                status: 'planned',
                progress: 15,
                startDate: '2024-09',
                description: '人工智能和机器学习技术栈',
                skills: ['Python', 'TensorFlow', '深度学习'],
                achievements: [],
                connections: [],
                position: { x: 80, y: 460 },
                level: 1,
            },
            {
                id: 'web3',
                name: 'Web3 & Blockchain',
                category: 'frontend',
                status: 'planned',
                progress: 10,
                startDate: '2024-12',
                description: 'Web3技术和区块链开发',
                skills: ['Solidity', 'Web3.js', 'DeFi', 'NFT'],
                achievements: [],
                connections: [],
                position: { x: 420, y: 460 },
                level: 1,
            },
            {
                id: 'docker',
                name: 'Docker',
                category: 'devops',
                status: 'in_progress',
                progress: 70,
                startDate: '2023-01',
                description: 'Docker容器化技术和微服务架构',
                skills: ['Docker Compose', '容器编排', '镜像构建'],
                achievements: ['项目容器化部署'],
                connections: ['kubernetes'],
                position: { x: 760, y: 460 },
                level: 3,
            },
            {
                id: 'kubernetes',
                name: 'Kubernetes',
                category: 'devops',
                status: 'planned',
                progress: 20,
                startDate: '2024-06',
                description: 'Kubernetes容器编排和集群管理',
                skills: ['Pod管理', '服务发现', '负载均衡'],
                achievements: [],
                connections: [],
                position: { x: 1100, y: 460 },
                level: 2,
            },
        ],
        []
    )

    // 获取状态对应的颜色和图标
    const getStatusConfig = (status: TechNode['status']) => {
        switch (status) {
            case 'completed':
                return {
                    color: '#52c41a',
                    bgColor: 'rgba(82, 196, 26, 0.1)',
                    icon: <CheckCircleOutlined />,
                    borderColor: '#52c41a',
                }
            case 'in_progress':
                return {
                    color: '#1890ff',
                    bgColor: 'rgba(24, 144, 255, 0.1)',
                    icon: <ClockCircleOutlined />,
                    borderColor: '#1890ff',
                }
            case 'planned':
                return {
                    color: '#faad14',
                    bgColor: 'rgba(250, 173, 20, 0.1)',
                    icon: <RocketOutlined />,
                    borderColor: '#faad14',
                }
            default:
                return {
                    color: '#d9d9d9',
                    bgColor: 'rgba(217, 217, 217, 0.1)',
                    icon: <StarOutlined />,
                    borderColor: '#d9d9d9',
                }
        }
    }

    // 获取分类对应的颜色
    const getCategoryColor = (category: TechNode['category']) => {
        const colors = {
            frontend: '#61dafb',
            backend: '#339933',
            database: '#336791',
            devops: '#2496ed',
            mobile: '#a4c639',
            ai: '#ff6b6b',
        }
        return colors[category] || '#d9d9d9'
    }

    // 处理节点点击事件
    const handleNodeClick = (node: TechNode) => {
        setSelectedNode(node)
        setModalVisible(true)
    }

    // 关闭详情弹窗
    const handleModalClose = () => {
        setModalVisible(false)
        setSelectedNode(null)
    }

    // 缩放控制
    const handleZoomIn = () => {
        setZoomLevel((prev) => Math.min(prev + 0.2, 2))
    }

    const handleZoomOut = () => {
        setZoomLevel((prev) => Math.max(prev - 0.2, 0.6))
    }

    const handleResetZoom = () => {
        setZoomLevel(1)
    }

    // 渲染优化的连接线 - 精确计算连接点位置
    const renderConnections = () => {
        const connections: JSX.Element[] = []

        techNodes.forEach((node) => {
            node.connections.forEach((targetId) => {
                const targetNode = techNodes.find((n) => n.id === targetId)
                if (targetNode) {
                    const key = `${node.id}-${targetId}`

                    // 节点尺寸常量
                    const nodeWidth = 260
                    const nodeHeight = 140

                    // 计算连接点位置
                    const startX = node.position.x + nodeWidth + 10 // 起始节点右侧边缘 + 10px间距
                    const startY = node.position.y + nodeHeight / 2 // 起始节点垂直中心
                    const endX = targetNode.position.x - 10 // 目标节点左侧边缘 - 10px间距
                    const endY = targetNode.position.y + nodeHeight / 2 // 目标节点垂直中心

                    // 判断连接类型并优化路径
                    let pathData: string

                    if (Math.abs(startY - endY) < 50) {
                        // 水平连接：同一行或接近同一行的节点
                        pathData = `M ${startX} ${startY} L ${endX} ${endY}`
                    } else {
                        // 垂直或斜向连接：使用贝塞尔曲线
                        const midX = startX + (endX - startX) * 0.6
                        const controlX1 = midX
                        const controlY1 = startY
                        const controlX2 = midX
                        const controlY2 = endY

                        pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`
                    }

                    connections.push(
                        <g key={key}>
                            {/* 连接线 */}
                            <path
                                d={pathData}
                                stroke="rgba(255, 255, 255, 0.5)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="6,3"
                                className={styles.connection_line}
                                markerEnd="url(#arrowhead)"
                            />
                        </g>
                    )
                }
            })
        })

        return connections
    }

    return (
        <div className={styles.tech_flow_container}>
            <div className={styles.flow_header}>
                <div className={styles.header_content}>
                    <div>
                        <h2>{t('timeline.tech_flow_title', '技术学习流程图')}</h2>
                        <p>
                            {t('timeline.tech_flow_subtitle', '可视化展示技术栈学习历程和关联关系')}
                        </p>
                    </div>
                    <div className={styles.zoom_controls}>
                        <Button.Group>
                            <Button
                                icon={<MinusOutlined />}
                                onClick={handleZoomOut}
                                disabled={zoomLevel <= 0.6}
                                title="缩小"
                            />
                            <Button onClick={handleResetZoom} title="重置缩放">
                                {Math.round(zoomLevel * 100)}%
                            </Button>
                            <Button
                                icon={<PlusOutlined />}
                                onClick={handleZoomIn}
                                disabled={zoomLevel >= 2}
                                title="放大"
                            />
                        </Button.Group>
                    </div>
                </div>
            </div>

            <div className={styles.flow_canvas}>
                <div
                    className={styles.svg_container}
                    style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
                >
                    <svg
                        width="1800"
                        height="650"
                        viewBox="0 0 1800 650"
                        className={styles.flow_svg}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* 定义箭头标记 */}
                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="10"
                                markerHeight="7"
                                refX="9"
                                refY="3.5"
                                orient="auto"
                            >
                                <polygon
                                    points="0 0, 10 3.5, 0 7"
                                    fill="rgba(255, 255, 255, 0.5)"
                                />
                            </marker>
                        </defs>

                        {/* 渲染连接线 */}
                        {renderConnections()}

                        {/* 渲染技术节点 */}
                        {techNodes.map((node) => {
                            const statusConfig = getStatusConfig(node.status)
                            const categoryColor = getCategoryColor(node.category)

                            return (
                                <g
                                    key={node.id}
                                    className={styles.tech_node}
                                    onClick={() => handleNodeClick(node)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {/* 节点背景 */}
                                    <rect
                                        x={node.position.x}
                                        y={node.position.y}
                                        width="260"
                                        height="140"
                                        rx="16"
                                        fill={statusConfig.bgColor}
                                        stroke={statusConfig.borderColor}
                                        strokeWidth="2"
                                        className={styles.node_bg}
                                    />

                                    {/* 分类标识条 */}
                                    <rect
                                        x={node.position.x}
                                        y={node.position.y}
                                        width="260"
                                        height="6"
                                        rx="3"
                                        fill={categoryColor}
                                    />

                                    {/* 节点内容 */}
                                    <foreignObject
                                        x={node.position.x + 16}
                                        y={node.position.y + 16}
                                        width="228"
                                        height="108"
                                    >
                                        <div className={styles.node_content}>
                                            <div className={styles.node_header}>
                                                <span
                                                    className={styles.node_icon}
                                                    style={{ color: statusConfig.color }}
                                                >
                                                    {statusConfig.icon}
                                                </span>
                                                <span className={styles.node_title}>
                                                    {node.name}
                                                </span>
                                                <span className={styles.node_level}>
                                                    L{node.level}
                                                </span>
                                            </div>

                                            <div className={styles.node_progress}>
                                                <Progress
                                                    percent={node.progress}
                                                    size="small"
                                                    strokeColor={statusConfig.color}
                                                    showInfo={false}
                                                />
                                                <span className={styles.progress_text}>
                                                    {node.progress}%
                                                </span>
                                            </div>

                                            <div className={styles.node_meta}>
                                                <span className={styles.node_date}>
                                                    {node.startDate}
                                                    {node.completedDate &&
                                                        ` - ${node.completedDate}`}
                                                </span>
                                            </div>

                                            <div className={styles.node_skills}>
                                                {node.skills.slice(0, 2).map((skill) => (
                                                    <Tag key={skill} color={categoryColor}>
                                                        {skill}
                                                    </Tag>
                                                ))}
                                                {node.skills.length > 2 && (
                                                    <Tag>+{node.skills.length - 2}</Tag>
                                                )}
                                            </div>
                                        </div>
                                    </foreignObject>
                                </g>
                            )
                        })}
                    </svg>
                </div>
            </div>

            {/* 图例 */}
            <div className={styles.flow_legend}>
                <div className={styles.legend_section}>
                    <h4>状态说明</h4>
                    <div className={styles.legend_items}>
                        <div className={styles.legend_item}>
                            <CheckCircleOutlined style={{ color: '#52c41a' }} />
                            <span>已完成</span>
                        </div>
                        <div className={styles.legend_item}>
                            <ClockCircleOutlined style={{ color: '#1890ff' }} />
                            <span>进行中</span>
                        </div>
                        <div className={styles.legend_item}>
                            <RocketOutlined style={{ color: '#faad14' }} />
                            <span>计划中</span>
                        </div>
                    </div>
                </div>

                <div className={styles.legend_section}>
                    <h4>技术分类</h4>
                    <div className={styles.legend_items}>
                        <div className={styles.legend_item}>
                            <div
                                className={styles.category_dot}
                                style={{ backgroundColor: '#61dafb' }}
                            ></div>
                            <span>前端开发</span>
                        </div>
                        <div className={styles.legend_item}>
                            <div
                                className={styles.category_dot}
                                style={{ backgroundColor: '#339933' }}
                            ></div>
                            <span>后端开发</span>
                        </div>
                        <div className={styles.legend_item}>
                            <div
                                className={styles.category_dot}
                                style={{ backgroundColor: '#2496ed' }}
                            ></div>
                            <span>运维部署</span>
                        </div>
                        <div className={styles.legend_item}>
                            <div
                                className={styles.category_dot}
                                style={{ backgroundColor: '#ff6b6b' }}
                            ></div>
                            <span>人工智能</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 节点详情弹窗 */}
            <TechNodeModal visible={modalVisible} node={selectedNode} onClose={handleModalClose} />
        </div>
    )
}

export default TechFlowTimeline
