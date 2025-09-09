/**
 * 学习计划详情组件
 *
 * 功能说明：
 * 1. 展示学习计划的详细信息
 * 2. 集成 TodoList 功能管理学习任务
 * 3. 根据 TodoList 完成情况自动计算进度
 * 4. 支持任务的增删改查操作
 *
 * 核心特性：
 * - 学习计划基本信息展示
 * - 任务列表管理和进度跟踪
 * - 自动进度计算和状态更新
 * - 响应式设计和良好的用户体验
 */

import {
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    PlusOutlined,
    RocketOutlined,
    TagOutlined,
} from '@ant-design/icons'
import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    List,
    Modal,
    Popconfirm,
    Progress,
    Space,
    Tag,
    message,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LearningPlan } from '../types/learning'

/**
 * 学习任务数据接口
 */
interface LearningTask {
    id: string
    title: string
    description?: string
    completed: boolean
    createdAt: Date
    completedAt?: Date
}

/**
 * 组件属性接口
 */
interface LearningPlanDetailProps {
    /** 是否显示弹窗 */
    visible: boolean
    /** 学习计划数据 */
    plan: LearningPlan | null
    /** 关闭弹窗回调 */
    onClose: () => void
}

/**
 * 学习计划详情组件
 */
const LearningPlanDetail: React.FC<LearningPlanDetailProps> = ({ visible, plan, onClose }) => {
    const { t } = useTranslation('learning')
    const [tasks, setTasks] = useState<LearningTask[]>([])
    const [newTaskVisible, setNewTaskVisible] = useState(false)
    const [editingTask, setEditingTask] = useState<LearningTask | null>(null)
    const [form] = Form.useForm()

    // 模拟任务数据
    useEffect(() => {
        if (plan) {
            // 根据不同计划生成不同的任务列表
            const mockTasks: LearningTask[] = []

            if (plan.id === '1') {
                // 微服务架构
                mockTasks.push(
                    {
                        id: '1',
                        title: '学习Docker基础概念',
                        description: '了解容器化技术的基本原理',
                        completed: true,
                        createdAt: new Date('2024-01-15'),
                        completedAt: new Date('2024-01-20'),
                    },
                    {
                        id: '2',
                        title: '掌握Docker Compose',
                        description: '学习多容器应用的编排',
                        completed: true,
                        createdAt: new Date('2024-01-21'),
                        completedAt: new Date('2024-02-01'),
                    },
                    {
                        id: '3',
                        title: '学习Kubernetes基础',
                        description: '了解容器编排平台的核心概念',
                        completed: false,
                        createdAt: new Date('2024-02-02'),
                    },
                    {
                        id: '4',
                        title: '实践微服务架构设计',
                        description: '设计和实现一个微服务系统',
                        completed: false,
                        createdAt: new Date('2024-02-15'),
                    }
                )
            } else if (plan.id === '2') {
                // AI开发
                mockTasks.push(
                    {
                        id: '5',
                        title: 'Python基础语法学习',
                        description: '掌握Python编程基础',
                        completed: false,
                        createdAt: new Date('2024-03-01'),
                    },
                    {
                        id: '6',
                        title: '机器学习理论学习',
                        description: '学习机器学习的基本概念和算法',
                        completed: false,
                        createdAt: new Date('2024-03-15'),
                    }
                )
            } else if (plan.id === '3') {
                // 全栈精通
                mockTasks.push(
                    {
                        id: '7',
                        title: 'React Hooks深入学习',
                        description: '掌握React Hooks的高级用法',
                        completed: true,
                        createdAt: new Date('2023-06-01'),
                        completedAt: new Date('2023-07-01'),
                    },
                    {
                        id: '8',
                        title: 'Node.js后端开发',
                        description: '构建RESTful API和数据库集成',
                        completed: true,
                        createdAt: new Date('2023-07-02'),
                        completedAt: new Date('2023-09-01'),
                    },
                    {
                        id: '9',
                        title: 'TypeScript项目重构',
                        description: '将现有项目迁移到TypeScript',
                        completed: true,
                        createdAt: new Date('2023-09-02'),
                        completedAt: new Date('2023-12-01'),
                    },
                    {
                        id: '10',
                        title: '部署和运维优化',
                        description: '学习CI/CD和生产环境部署',
                        completed: true,
                        createdAt: new Date('2023-12-02'),
                        completedAt: new Date('2024-01-31'),
                    }
                )
            }

            setTasks(mockTasks)
        }
    }, [plan])

    if (!plan) return null

    // 计算进度
    const completedTasks = tasks.filter((task) => task.completed).length
    const totalTasks = tasks.length
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // 获取状态配置
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'completed':
                return { color: '#52c41a', icon: <CheckCircleOutlined />, text: '已完成' }
            case 'in_progress':
                return { color: '#1890ff', icon: <ClockCircleOutlined />, text: '进行中' }
            case 'planned':
                return { color: '#faad14', icon: <RocketOutlined />, text: '计划中' }
            default:
                return { color: '#d9d9d9', icon: <RocketOutlined />, text: '未知' }
        }
    }

    // 切换任务完成状态
    const toggleTaskComplete = (taskId: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          completed: !task.completed,
                          completedAt: !task.completed ? new Date() : undefined,
                      }
                    : task
            )
        )
    }

    // 添加新任务
    const handleAddTask = (values: { title: string; description?: string }) => {
        const newTask: LearningTask = {
            id: Date.now().toString(),
            title: values.title,
            description: values.description,
            completed: false,
            createdAt: new Date(),
        }
        setTasks((prev) => [...prev, newTask])
        setNewTaskVisible(false)
        form.resetFields()
        message.success('任务添加成功')
    }

    // 删除任务
    const handleDeleteTask = (taskId: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
        message.success('任务删除成功')
    }

    const statusConfig = getStatusConfig(plan.status)

    return (
        <Modal
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: statusConfig.color, fontSize: '1.2rem' }}>
                        {statusConfig.icon}
                    </span>
                    <span>{plan.title}</span>
                    <Tag color={statusConfig.color}>{statusConfig.text}</Tag>
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
        >
            <div style={{ padding: '16px 0' }}>
                {/* 计划基本信息 */}
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
                            <p style={{ color: '#666', lineHeight: 1.6, margin: 0 }}>
                                {plan.description}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: statusConfig.color,
                                }}
                            >
                                {progress}%
                            </div>
                            <Progress
                                percent={progress}
                                strokeColor={statusConfig.color}
                                showInfo={false}
                                size="small"
                                style={{ width: 120 }}
                            />
                        </div>
                    </div>

                    {/* 时间和技能信息 */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 16,
                        }}
                    >
                        <div>
                            <CalendarOutlined /> {plan.startDate.toLocaleDateString()} -{' '}
                            {plan.targetDate.toLocaleDateString()}
                        </div>
                        <div>
                            <span>
                                任务进度: {completedTasks}/{totalTasks}
                            </span>
                        </div>
                    </div>

                    {/* 技能标签 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <TagOutlined />
                        {plan.skills.map((skill) => (
                            <Tag key={skill} color="blue">
                                {skill}
                            </Tag>
                        ))}
                    </div>
                </Card>

                {/* 任务列表 */}
                <Card
                    size="small"
                    title="学习任务"
                    extra={
                        <Button
                            type="primary"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={() => setNewTaskVisible(true)}
                        >
                            添加任务
                        </Button>
                    }
                >
                    <List
                        dataSource={tasks}
                        renderItem={(task) => (
                            <List.Item
                                actions={[
                                    <Popconfirm
                                        key="delete"
                                        title="确定要删除这个任务吗？"
                                        onConfirm={() => handleDeleteTask(task.id)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button type="text" danger icon={<DeleteOutlined />} />
                                    </Popconfirm>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Checkbox
                                            checked={task.completed}
                                            onChange={() => toggleTaskComplete(task.id)}
                                        />
                                    }
                                    title={
                                        <span
                                            style={{
                                                textDecoration: task.completed
                                                    ? 'line-through'
                                                    : 'none',
                                                color: task.completed ? '#999' : 'inherit',
                                            }}
                                        >
                                            {task.title}
                                        </span>
                                    }
                                    description={task.description}
                                />
                                {task.completedAt && (
                                    <div style={{ color: '#52c41a', fontSize: '12px' }}>
                                        完成于: {task.completedAt.toLocaleDateString()}
                                    </div>
                                )}
                            </List.Item>
                        )}
                    />
                </Card>
            </div>

            {/* 添加任务弹窗 */}
            <Modal
                title="添加学习任务"
                open={newTaskVisible}
                onCancel={() => {
                    setNewTaskVisible(false)
                    form.resetFields()
                }}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddTask}>
                    <Form.Item
                        name="title"
                        label="任务标题"
                        rules={[{ required: true, message: '请输入任务标题' }]}
                    >
                        <Input placeholder="请输入任务标题" />
                    </Form.Item>
                    <Form.Item name="description" label="任务描述">
                        <Input.TextArea placeholder="请输入任务描述（可选）" rows={3} />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                添加任务
                            </Button>
                            <Button
                                onClick={() => {
                                    setNewTaskVisible(false)
                                    form.resetFields()
                                }}
                            >
                                取消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </Modal>
    )
}

export default LearningPlanDetail
