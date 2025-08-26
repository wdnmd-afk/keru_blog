import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ReactivityDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Vue', 'reactivity')

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
                    <h1>Vue.js 响应式系统深度解析</h1>
                    <p>深入理解Vue.js响应式原理，掌握reactive、ref、computed等核心API</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">响应式</Tag>
                        <Tag color="orange">Proxy</Tag>
                        <Tag color="purple">Reactive</Tag>
                        <Tag color="red">Ref</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 响应式原理 */}
                <Card title="⚡ 响应式原理对比" className={styles.content_card}>
                    <div className={styles.principle_section}>
                        <h3>Vue 2 vs Vue 3 响应式实现</h3>
                        {codeData.principleComparison && (
                            <CodeHighlight
                                code={codeData.principleComparison.code}
                                language={codeData.principleComparison.language}
                                title={codeData.principleComparison.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 核心API */}
                <Card title="🔧 核心响应式API" className={styles.content_card}>
                    <div className={styles.api_section}>
                        <div className={styles.api_item}>
                            <h4>1. reactive() - 深度响应式对象</h4>
                            {codeData.reactiveUsage && (
                                <CodeHighlight
                                    code={codeData.reactiveUsage.code}
                                    language={codeData.reactiveUsage.language}
                                    title={codeData.reactiveUsage.title}
                                />
                            )}
                        </div>

                        <div className={styles.api_item}>
                            <h4>2. ref() - 基本类型响应式</h4>
                            {codeData.refUsage && (
                                <CodeHighlight
                                    code={codeData.refUsage.code}
                                    language={codeData.refUsage.language}
                                    title={codeData.refUsage.title}
                                />
                            )}
                        </div>

                        <div className={styles.api_item}>
                            <h4>3. computed() - 计算属性</h4>
                            {codeData.computedUsage && (
                                <CodeHighlight
                                    code={codeData.computedUsage.code}
                                    language={codeData.computedUsage.language}
                                    title={codeData.computedUsage.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 高级API */}
                <Card title="🚀 高级响应式API" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. shallowReactive - 浅层响应式</h3>
                        {codeData.shallowReactiveUsage && (
                            <CodeHighlight
                                code={codeData.shallowReactiveUsage.code}
                                language={codeData.shallowReactiveUsage.language}
                                title={codeData.shallowReactiveUsage.title}
                            />
                        )}

                        <h3>2. readonly - 只读响应式</h3>
                        {codeData.readonlyUsage && (
                            <CodeHighlight
                                code={codeData.readonlyUsage.code}
                                language={codeData.readonlyUsage.language}
                                title={codeData.readonlyUsage.title}
                            />
                        )}

                        <h3>3. toRefs - 保持响应性解构</h3>
                        {codeData.toRefsUsage && (
                            <CodeHighlight
                                code={codeData.toRefsUsage.code}
                                language={codeData.toRefsUsage.language}
                                title={codeData.toRefsUsage.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 响应式最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <h3>性能优化建议</h3>
                        <ul>
                            <li>
                                <strong>合理选择API</strong> - 基本类型用ref，对象用reactive
                            </li>
                            <li>
                                <strong>避免不必要的响应式</strong> - 使用markRaw标记静态数据
                            </li>
                            <li>
                                <strong>浅层响应式</strong> - 对于大型对象考虑使用shallowReactive
                            </li>
                            <li>
                                <strong>计算属性缓存</strong> - 利用computed的缓存特性优化性能
                            </li>
                            <li>
                                <strong>正确解构</strong> - 使用toRefs保持解构后的响应性
                            </li>
                        </ul>

                        {codeData.bestPractices && (
                            <CodeHighlight
                                code={codeData.bestPractices.code}
                                language={codeData.bestPractices.language}
                                title={codeData.bestPractices.title}
                            />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ReactivityDetail
