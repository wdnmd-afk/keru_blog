import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    ThunderboltOutlined,
    WarningOutlined,
} from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const PerformanceDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('React', 'performance')

    const handleBack = () => {
        navigate('/technology/react')
    }

    if (loading) {
        return <div className={styles.loading}>{t('common.loading')}</div>
    }

    if (error) {
        return <div className={styles.error}>{t('common.load_failed_with_error', { error })}</div>
    }

    return (
        <div className={styles.topic_detail_container}>
            {/* 返回按钮 */}
            <div className={styles.back_section}>
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回React技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>React 性能优化指南</h1>
                    <p>深入理解React性能优化技巧，构建高性能的React应用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React</Tag>
                        <Tag color="green">性能优化</Tag>
                        <Tag color="orange">React.memo</Tag>
                        <Tag color="purple">虚拟化</Tag>
                        <Tag color="red">代码分割</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 性能监控 */}
                <Card title="📊 性能监控" className={styles.content_card}>
                    <div className={styles.monitoring_section}>
                        <h3>React DevTools Profiler</h3>
                        {codeData.performanceMonitoring && (
                            <CodeHighlight
                                code={codeData.performanceMonitoring.code}
                                language={codeData.performanceMonitoring.language}
                                title={codeData.performanceMonitoring.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 优化技巧 */}
                <Card title="⚡ 核心优化技巧" className={styles.content_card}>
                    <div className={styles.optimization_techniques}>
                        <div className={styles.technique_item}>
                            <h4>1. React.memo - 组件记忆化</h4>
                            {codeData.reactMemoUsage && (
                                <CodeHighlight
                                    code={codeData.reactMemoUsage.code}
                                    language={codeData.reactMemoUsage.language}
                                    title={codeData.reactMemoUsage.title}
                                />
                            )}
                        </div>

                        <div className={styles.technique_item}>
                            <h4>2. 虚拟化长列表</h4>
                            {codeData.virtualizedList && (
                                <CodeHighlight
                                    code={codeData.virtualizedList.code}
                                    language={codeData.virtualizedList.language}
                                    title={codeData.virtualizedList.title}
                                />
                            )}
                        </div>

                        <div className={styles.technique_item}>
                            <h4>3. 代码分割与懒加载</h4>
                            {codeData.codeSplitting && (
                                <CodeHighlight
                                    code={codeData.codeSplitting.code}
                                    language={codeData.codeSplitting.language}
                                    title={codeData.codeSplitting.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 常见性能问题 */}
                <Card title="🐛 常见性能问题" className={styles.content_card}>
                    <div className={styles.performance_issues}>
                        <div className={styles.issue_item}>
                            <WarningOutlined className={styles.issue_icon} />
                            <div>
                                <h4>1. 避免在渲染中创建对象和函数</h4>
                                <p className={styles.problem}>❌ 问题代码：</p>
                                {codeData.avoidObjectCreation && (
                                    <CodeHighlight
                                        code={codeData.avoidObjectCreation.code}
                                        language={codeData.avoidObjectCreation.language}
                                        title={codeData.avoidObjectCreation.title}
                                    />
                                )}

                                <p className={styles.solution}>✅ 优化方案：</p>
                                {codeData.optimizedCode && (
                                    <CodeHighlight
                                        code={codeData.optimizedCode.code}
                                        language={codeData.optimizedCode.language}
                                        title={codeData.optimizedCode.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.issue_item}>
                            <CheckCircleOutlined className={styles.issue_icon} />
                            <div>
                                <h4>2. 使用正确的 key</h4>
                                {codeData.correctKeys && (
                                    <CodeHighlight
                                        code={codeData.correctKeys.code}
                                        language={codeData.correctKeys.language}
                                        title={codeData.correctKeys.title}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PerformanceDetail
