/**
 * 技术节点详情弹窗组件
 *
 * 功能说明：
 * 1. 展示技术节点的详细信息
 * 2. 显示学习成果和技能列表
 * 3. 展示学习时间线和里程碑
 * 4. 支持技能标签和分类展示
 *
 * 交互特性：
 * - 点击流程图节点触发弹窗
 * - 响应式设计适配移动端
 * - 丰富的视觉效果和动画
 */

import {
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    RocketOutlined,
    StarOutlined,
    TrophyOutlined,
} from '@ant-design/icons'
import { Badge, Card, Modal, Progress, Tag, Timeline } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * 技术节点数据接口（与TechFlowTimeline保持一致）
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
    connections: string[]
    position: { x: number; y: number }
    level: number
}

/**
 * 组件属性接口
 */
interface TechNodeModalProps {
    /** 是否显示弹窗 */
    visible: boolean
    /** 技术节点数据 */
    node: TechNode | null
    /** 关闭弹窗回调 */
    onClose: () => void
}

/**
 * 技术节点详情弹窗组件
 */
const TechNodeModal: React.FC<TechNodeModalProps> = ({ visible, node, onClose }) => {
    const { t } = useTranslation('learning')

    if (!node) return null

    // 获取状态配置
    const getStatusConfig = (status: TechNode['status']) => {
        switch (status) {
            case 'completed':
                return {
                    color: '#52c41a',
                    icon: <CheckCircleOutlined />,
                    text: '已完成',
                    badge: 'success' as const,
                }
            case 'in_progress':
                return {
                    color: '#1890ff',
                    icon: <ClockCircleOutlined />,
                    text: '进行中',
                    badge: 'processing' as const,
                }
            case 'planned':
                return {
                    color: '#faad14',
                    icon: <RocketOutlined />,
                    text: '计划中',
                    badge: 'warning' as const,
                }
            default:
                return {
                    color: '#d9d9d9',
                    icon: <StarOutlined />,
                    text: '未知',
                    badge: 'default' as const,
                }
        }
    }

    // 获取分类配置
    const getCategoryConfig = (category: TechNode['category']) => {
        const configs = {
            frontend: { name: '前端开发', color: '#61dafb' },
            backend: { name: '后端开发', color: '#339933' },
            database: { name: '数据库', color: '#336791' },
            devops: { name: '运维部署', color: '#2496ed' },
            mobile: { name: '移动开发', color: '#a4c639' },
            ai: { name: '人工智能', color: '#ff6b6b' },
        }
        return configs[category] || { name: '其他', color: '#d9d9d9' }
    }

    const statusConfig = getStatusConfig(node.status)
    const categoryConfig = getCategoryConfig(node.category)

    return (
        <Modal
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: statusConfig.color, fontSize: '1.2rem' }}>
                        {statusConfig.icon}
                    </span>
                    <span>{node.name}</span>
                    <Badge status={statusConfig.badge} text={statusConfig.text} />
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            width={600}
            centered
        >
            <div style={{ padding: '16px 0' }}>
                {/* 基本信息卡片 */}
                <Card size="small" style={{ marginBottom: 16 }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 16,
                        }}
                    >
                        <div>
                            <Tag color={categoryConfig.color} style={{ marginBottom: 8 }}>
                                {categoryConfig.name}
                            </Tag>
                            <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                学习深度等级: L{node.level}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: statusConfig.color,
                                }}
                            >
                                {node.progress}%
                            </div>
                            <Progress
                                percent={node.progress}
                                strokeColor={statusConfig.color}
                                showInfo={false}
                                size="small"
                                style={{ width: 120 }}
                            />
                        </div>
                    </div>

                    <p style={{ color: '#666', lineHeight: 1.6, margin: 0 }}>{node.description}</p>
                </Card>

                {/* 时间信息 */}
                <Card
                    size="small"
                    title={
                        <>
                            <CalendarOutlined /> 学习时间
                        </>
                    }
                    style={{ marginBottom: 16 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <strong>开始时间:</strong> {node.startDate}
                        </div>
                        {node.completedDate && (
                            <div>
                                <strong>完成时间:</strong> {node.completedDate}
                            </div>
                        )}
                    </div>
                </Card>

                {/* 技能标签 */}
                <Card size="small" title="掌握技能" style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {node.skills.map((skill) => (
                            <Tag key={skill} color="blue">
                                {skill}
                            </Tag>
                        ))}
                    </div>
                </Card>

                {/* 学习成果 */}
                {node.achievements.length > 0 && (
                    <Card
                        size="small"
                        title={
                            <>
                                <TrophyOutlined /> 学习成果
                            </>
                        }
                    >
                        <Timeline>
                            {node.achievements.map((achievement, index) => (
                                <Timeline.Item
                                    key={index}
                                    color="green"
                                    dot={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                                >
                                    {achievement}
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </Card>
                )}
            </div>
        </Modal>
    )
}

export default TechNodeModal

/**
 * 组件特性说明
 *
 * 📋 信息展示：
 * - 技术节点的完整详细信息
 * - 学习进度和状态可视化
 * - 技能标签和分类展示
 * - 学习成果时间线
 *
 * 🎨 视觉设计：
 * - 与主题保持一致的配色方案
 * - 清晰的信息层次结构
 * - 丰富的图标和状态指示
 * - 响应式布局适配
 *
 * 🔧 交互功能：
 * - 模态弹窗展示详情
 * - 支持键盘ESC关闭
 * - 点击遮罩层关闭
 * - 流畅的动画效果
 *
 * 📱 移动端适配：
 * - 响应式宽度调整
 * - 触摸友好的交互
 * - 优化的内容布局
 */
