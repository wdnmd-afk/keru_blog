import React from 'react'
import { Card, Tag, Button, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, ThunderboltOutlined, WarningOutlined } from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const PerformanceDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Vue', 'performance')

    const handleBack = () => {
        navigate('/technology/vue')
    }

    if (loading) {
        return <div className={styles.loading}>加载中...</div>
    }

    if (error) {
        return <div className={styles.error}>加载失败: {error}</div>
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
                    返回Vue.js技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue.js 性能优化指南</h1>
                    <p>深入掌握Vue.js性能优化技巧，构建高性能的Vue应用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">性能优化</Tag>
                        <Tag color="orange">虚拟DOM</Tag>
                        <Tag color="purple">响应式</Tag>
                        <Tag color="red">代码分割</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 渲染优化 */}
                <Card title="🚀 渲染性能优化" className={styles.content_card}>
                    <div className={styles.render_optimization}>
                        <h3>1. 虚拟DOM优化</h3>
                        {codeData.virtualDomOptimization && (
                            <CodeHighlight
                                code={codeData.virtualDomOptimization.code}
                                language={codeData.virtualDomOptimization.language}
                                title={codeData.virtualDomOptimization.title}
                            />
                        )}

                        <h3>2. v-memo指令优化 (Vue 3.2+)</h3>
                        {codeData.vMemoOptimization && (
                            <CodeHighlight
                                code={codeData.vMemoOptimization.code}
                                language={codeData.vMemoOptimization.language}
                                title={codeData.vMemoOptimization.title}
                            />
                        )}

                        <h3>3. 条件渲染优化</h3>
                        {codeData.conditionalRendering && (
                            <CodeHighlight
                                code={codeData.conditionalRendering.code}
                                language={codeData.conditionalRendering.language}
                                title={codeData.conditionalRendering.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 组件优化 */}
                <Card title="🔧 组件性能优化" className={styles.content_card}>
                    <div className={styles.component_optimization}>
                        <h3>1. 异步组件与代码分割</h3>
                        {codeData.asyncComponents && (
                            <CodeHighlight
                                code={codeData.asyncComponents.code}
                                language={codeData.asyncComponents.language}
                                title={codeData.asyncComponents.title}
                            />
                        )}

                        <h3>2. KeepAlive缓存优化</h3>
                        {codeData.keepAliveOptimization && (
                            <CodeHighlight
                                code={codeData.keepAliveOptimization.code}
                                language={codeData.keepAliveOptimization.language}
                                title={codeData.keepAliveOptimization.title}
                            />
                        )}

                        <h3>3. 函数式组件优化</h3>
                        {codeData.functionalComponents && (
                            <CodeHighlight
                                code={codeData.functionalComponents.code}
                                language={codeData.functionalComponents.language}
                                title={codeData.functionalComponents.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 响应式优化 */}
                <Card title="⚡ 响应式系统优化" className={styles.content_card}>
                    <div className={styles.reactivity_optimization}>
                        <h3>1. 合理选择响应式API</h3>
                        {codeData.reactivityApiSelection && (
                            <CodeHighlight
                                code={codeData.reactivityApiSelection.code}
                                language={codeData.reactivityApiSelection.language}
                                title={codeData.reactivityApiSelection.title}
                            />
                        )}

                        <h3>2. 计算属性优化</h3>
                        {codeData.computedOptimization && (
                            <CodeHighlight
                                code={codeData.computedOptimization.code}
                                language={codeData.computedOptimization.language}
                                title={codeData.computedOptimization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 内存优化 */}
                <Card title="🧹 内存泄漏防护" className={styles.content_card}>
                    <Alert
                        message="内存泄漏警告"
                        description="及时清理事件监听器、定时器和订阅，避免内存泄漏"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.memory_optimization}>
                        <h3>1. 事件监听器清理</h3>
                        {codeData.eventListenerCleanup && (
                            <CodeHighlight
                                code={codeData.eventListenerCleanup.code}
                                language={codeData.eventListenerCleanup.language}
                                title={codeData.eventListenerCleanup.title}
                            />
                        )}

                        <h3>2. 大列表虚拟滚动</h3>
                        {codeData.virtualScrolling && (
                            <CodeHighlight
                                code={codeData.virtualScrolling.code}
                                language={codeData.virtualScrolling.language}
                                title={codeData.virtualScrolling.title}
                            />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PerformanceDetail
