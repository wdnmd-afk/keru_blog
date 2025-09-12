/**
 * 学习模块主页面
 *
 * 功能说明：
 * 1. 整合学习历程和学习计划两个核心功能
 * 2. 使用 Tab 切换提供清晰的功能分区
 * 3. 支持国际化和响应式设计
 * 4. 保持与整体设计风格的一致性
 *
 * 组件结构：
 * - LearningTimeline: 学习历程时间线组件
 * - LearningPlan: 学习计划管理组件
 */

import styles from '@/styles/learning.module.scss'
import { BulbOutlined, CalendarOutlined, RobotOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AiChat from './components/AiChat'
import LearningPlan from './components/LearningPlan'
import LearningTimeline from './components/LearningTimeline'

/**
 * 学习模块主组件
 *
 * 提供学习历程和学习计划的统一入口
 * 使用 Tab 组件实现功能切换
 */
const Learning: React.FC = () => {
    const { t } = useTranslation('learning')

    // Tab 配置项
    const tabItems = [
        {
            key: '1',
            label: (
                <span className={'text-[#fff]'}>
                    <BulbOutlined />
                    {t('tabs.learning_journey')}
                </span>
            ),
            children: (
                <div className={styles.timeline_section}>
                    <LearningTimeline />
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span className={'text-[#fff]'}>
                    <CalendarOutlined />
                    {t('tabs.learning_plan')}
                </span>
            ),
            children: (
                <div className={styles.plan_section}>
                    <LearningPlan />
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <span className={'text-[#fff]'}>
                    <RobotOutlined />
                    AI Chat
                </span>
            ),
            children: (
                <div style={{ paddingTop: 12, height: '100%' }}>
                    <AiChat />
                </div>
            ),
        },
    ]

    return (
        <div className={styles.learning_container}>
            {/* 主要内容区域 */}
            <div className={styles.learning_content}>
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    className={styles.learning_tabs}
                    items={tabItems}
                />
            </div>
        </div>
    )
}

export default Learning

/**
 * 组件设计说明
 *
 * 🎯 设计目标：
 * - 提供统一的学习管理入口
 * - 清晰的功能分区和导航
 * - 良好的用户体验和视觉效果
 *
 * 📱 响应式支持：
 * - 移动端优化的 Tab 布局
 * - 自适应的内容区域
 * - 触摸友好的交互设计
 *
 * 🌐 国际化支持：
 * - 完整的多语言支持
 * - 动态语言切换
 * - 本地化的日期和时间格式
 *
 * 🔧 扩展性：
 * - 模块化的组件结构
 * - 易于添加新的学习功能
 * - 灵活的样式系统
 */
