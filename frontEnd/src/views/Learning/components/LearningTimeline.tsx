/**
 * 学习历程时间线组件
 *
 * 功能说明：
 * 1. 从 Technology 页面迁移的学习历程功能
 * 2. 展示技术成长的时间线
 * 3. 支持国际化和响应式设计
 * 4. 保持原有的交互体验和视觉效果
 * 5. 支持传统时间线和流程图两种视图模式
 *
 * 数据结构：
 * - 时间节点：年份标识
 * - 标题：学习阶段的主要内容
 * - 描述：详细的学习成果和技能获得
 * - 状态：进行中或已完成
 */

import styles from '@/styles/learning.module.scss'
import { AppstoreOutlined, BarsOutlined, PartitionOutlined } from '@ant-design/icons'
import { Button, Timeline } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TechFlowTimeline from './TechFlowTimeline'
import TechTreeDiagram from './TechTreeDiagram'

/**
 * 学习时间线数据接口
 */
interface TimelineItem {
    time: string
    title: string
    description: string
    status: 'processing' | 'finish'
}

/**
 * 学习历程时间线组件
 *
 * 展示个人技术成长的时间线，包含学习阶段、技能获得等信息
 * 支持传统时间线和流程图两种视图模式
 */
const LearningTimeline: React.FC = () => {
    const { t } = useTranslation('learning')
    const [viewMode, setViewMode] = useState<'timeline' | 'flowchart' | 'tree'>('timeline')

    // 获取学习时间线数据（使用国际化）
    const getLearningTimelineData = (): TimelineItem[] => [
        {
            time: '2024年',
            title: t('timeline.2024.title'),
            description: t('timeline.2024.description'),
            status: 'processing',
        },
        {
            time: '2023年',
            title: t('timeline.2023.title'),
            description: t('timeline.2023.description'),
            status: 'finish',
        },
        {
            time: '2022年',
            title: t('timeline.2022.title'),
            description: t('timeline.2022.description'),
            status: 'finish',
        },
        {
            time: '2021年',
            title: t('timeline.2021.title'),
            description: t('timeline.2021.description'),
            status: 'finish',
        },
    ]

    const timelineData = getLearningTimelineData()

    return (
        <div className={styles.timeline_container}>
            <div className={styles.timeline_header}>
                <div className={styles.header_content}>
                    <div>
                        <h2>{t('timeline.title')}</h2>
                        <p>{t('timeline.subtitle')}</p>
                    </div>
                    <div className={styles.view_switcher}>
                        <Button.Group>
                            <Button
                                type={viewMode === 'timeline' ? 'primary' : 'default'}
                                icon={<BarsOutlined />}
                                onClick={() => setViewMode('timeline')}
                            >
                                {t('timeline.view_timeline')}
                            </Button>
                            <Button
                                type={viewMode === 'flowchart' ? 'primary' : 'default'}
                                icon={<AppstoreOutlined />}
                                onClick={() => setViewMode('flowchart')}
                            >
                                {t('timeline.view_flowchart')}
                            </Button>
                            <Button
                                type={viewMode === 'tree' ? 'primary' : 'default'}
                                icon={<PartitionOutlined />}
                                onClick={() => setViewMode('tree')}
                            >
                                {t('timeline.view_tree', '树状图')}
                            </Button>
                        </Button.Group>
                    </div>
                </div>
            </div>

            <div className={styles.timeline_content}>
                {viewMode === 'timeline' ? (
                    <Timeline mode="left" className={styles.learning_timeline}>
                        {timelineData.map((item, index) => (
                            <Timeline.Item
                                key={index}
                                color={item.status === 'processing' ? 'blue' : 'green'}
                                label={<span className={styles.timeline_time}>{item.time}</span>}
                            >
                                <div className={styles.timeline_item_content}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                ) : viewMode === 'flowchart' ? (
                    <TechFlowTimeline />
                ) : (
                    <TechTreeDiagram />
                )}
            </div>
        </div>
    )
}

export default LearningTimeline

/**
 * 组件特性说明
 *
 * 📅 时间线展示：
 * - 清晰的时间节点标识
 * - 直观的进度状态显示
 * - 左侧时间标签布局
 *
 * 🎨 视觉设计：
 * - 与整体设计风格保持一致
 * - 响应式布局适配
 * - 优雅的动画效果
 *
 * 🌐 国际化支持：
 * - 完整的多语言内容
 * - 本地化的时间格式
 * - 动态语言切换
 *
 * 🔄 数据管理：
 * - 结构化的时间线数据
 * - 灵活的状态管理
 * - 易于扩展的数据格式
 */
