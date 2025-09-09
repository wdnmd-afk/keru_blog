/**
 * 学习计划管理组件
 *
 * 功能说明：
 * 1. 全新的学习计划功能实现
 * 2. 支持计划的创建、编辑、进度跟踪
 * 3. 提供目标设定和完成状态管理
 * 4. 集成进度可视化和统计功能
 *
 * 核心功能：
 * - 学习计划列表展示
 * - 计划进度跟踪
 * - 技能标签管理
 * - 时间目标设定
 */

import styles from '@/styles/learning.module.scss'
import {
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    EyeOutlined,
    PlusOutlined,
    RocketOutlined,
    TagOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Progress, Row, Tag } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LearningPlan as LearningPlanType } from '../types/learning'
import LearningPlanDetail from './LearningPlanDetail'

/**
 * 学习计划管理组件
 *
 * 提供完整的学习计划管理功能，包括计划创建、进度跟踪、目标管理等
 */
const LearningPlan: React.FC = () => {
    const { t } = useTranslation('learning')
    const [selectedPlan, setSelectedPlan] = useState<LearningPlanType | null>(null)
    const [detailVisible, setDetailVisible] = useState(false)

    // 模拟学习计划数据
    const [learningPlans] = useState<LearningPlanType[]>([
        {
            id: '1',
            title: t('plans.microservices.title'),
            description: t('plans.microservices.description'),
            status: 'in_progress',
            progress: 65,
            startDate: new Date('2024-01-15'),
            targetDate: new Date('2024-06-30'),
            skills: ['Docker', 'Kubernetes', '微服务架构', 'API网关'],
        },
        {
            id: '2',
            title: t('plans.ai_development.title'),
            description: t('plans.ai_development.description'),
            status: 'planned',
            progress: 15,
            startDate: new Date('2024-03-01'),
            targetDate: new Date('2024-12-31'),
            skills: ['Python', 'TensorFlow', '机器学习', '深度学习'],
        },
        {
            id: '3',
            title: t('plans.fullstack_mastery.title'),
            description: t('plans.fullstack_mastery.description'),
            status: 'completed',
            progress: 100,
            startDate: new Date('2023-06-01'),
            targetDate: new Date('2024-01-31'),
            skills: ['React', 'Node.js', 'TypeScript', '数据库设计'],
        },
    ])

    // 获取状态对应的颜色
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'green'
            case 'in_progress':
                return 'blue'
            case 'planned':
                return 'orange'
            default:
                return 'default'
        }
    }

    // 获取状态对应的图标
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircleOutlined />
            case 'in_progress':
                return <ClockCircleOutlined />
            case 'planned':
                return <CalendarOutlined />
            default:
                return <RocketOutlined />
        }
    }

    // 格式化日期
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
    }

    // 处理卡片点击事件
    const handleCardClick = (plan: LearningPlanType) => {
        setSelectedPlan(plan)
        setDetailVisible(true)
    }

    // 关闭详情弹窗
    const handleDetailClose = () => {
        setDetailVisible(false)
        setSelectedPlan(null)
    }

    return (
        <div className={styles.plan_container}>
            {/* 计划概览头部 */}
            <div className={styles.plan_header}>
                <div className={styles.header_info}>
                    <h2>{t('plan.title')}</h2>
                    <p>{t('plan.subtitle')}</p>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                    {t('plan.add_new')}
                </Button>
            </div>

            {/* 学习计划网格 */}
            <div className={styles.plan_grid}>
                <Row gutter={[24, 24]}>
                    {learningPlans.map((plan) => (
                        <Col xs={24} sm={12} lg={8} key={plan.id}>
                            <Card
                                className={styles.plan_card}
                                hoverable
                                onClick={() => handleCardClick(plan)}
                                title={
                                    <div className={styles.plan_card_title}>
                                        {getStatusIcon(plan.status)}
                                        <span>{plan.title}</span>
                                        <Tag color={getStatusColor(plan.status)}>
                                            {t(`plan.status.${plan.status}`)}
                                        </Tag>
                                    </div>
                                }
                                extra={
                                    <div className={styles.plan_progress_text}>
                                        {plan.progress}%
                                    </div>
                                }
                                actions={[
                                    <Button
                                        key="view"
                                        type="text"
                                        icon={<EyeOutlined />}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleCardClick(plan)
                                        }}
                                    >
                                        查看详情
                                    </Button>,
                                ]}
                            >
                                <div className={styles.plan_content}>
                                    <p className={styles.plan_description}>{plan.description}</p>

                                    {/* 进度条 */}
                                    <div className={styles.progress_section}>
                                        <Progress
                                            percent={plan.progress}
                                            strokeColor={
                                                plan.status === 'completed'
                                                    ? '#52c41a'
                                                    : plan.status === 'in_progress'
                                                      ? '#1890ff'
                                                      : '#faad14'
                                            }
                                            showInfo={false}
                                        />
                                    </div>

                                    {/* 时间信息 */}
                                    <div className={styles.plan_dates}>
                                        <span>
                                            <CalendarOutlined />
                                            {t('plan.start_date')}: {formatDate(plan.startDate)}
                                        </span>
                                        <span>
                                            <CalendarOutlined />
                                            {t('plan.target_date')}: {formatDate(plan.targetDate)}
                                        </span>
                                    </div>

                                    {/* 技能标签 */}
                                    <div className={styles.plan_skills}>
                                        <TagOutlined className={styles.skills_icon} />
                                        <div className={styles.skills_tags}>
                                            {plan.skills.map((skill) => (
                                                <Tag key={skill} color="blue">
                                                    {skill}
                                                </Tag>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* 学习计划详情弹窗 */}
            <LearningPlanDetail
                visible={detailVisible}
                plan={selectedPlan}
                onClose={handleDetailClose}
            />
        </div>
    )
}

export default LearningPlan
