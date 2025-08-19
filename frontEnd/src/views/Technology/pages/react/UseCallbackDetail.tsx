import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    ThunderboltOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined,
    RocketOutlined,
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const UseCallbackDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('React', 'useCallback')

    const handleBack = () => {
        navigate('/technology/react')
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
                    返回React技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>useCallback 深度解析</h1>
                    <p>性能优化利器，避免不必要的重新渲染，提升React应用性能</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Hooks</Tag>
                        <Tag color="green">性能优化</Tag>
                        <Tag color="orange">缓存</Tag>
                        <Tag color="purple">记忆化</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是useCallback？</h3>
                        <p>
                            useCallback是React提供的一个Hook，用于缓存函数引用。它返回一个记忆化的回调函数，只有当依赖项发生变化时，才会重新创建函数。这对于优化子组件的性能非常有用。
                        </p>

                        <h3>基本语法</h3>
                        {codeData.basicUsage && (
                            <CodeHighlight
                                code={codeData.basicUsage.code}
                                language={codeData.basicUsage.language}
                                title={codeData.basicUsage.title}
                            />
                        )}

                        <h3>工作原理</h3>
                        <p>
                            useCallback会在依赖项不变的情况下返回相同的函数引用，避免子组件因为接收到新的函数引用而进行不必要的重新渲染。
                        </p>
                    </div>
                </Card>

                {/* 使用场景 */}
                <Card title="🎯 核心使用场景" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 优化子组件渲染</h4>
                            {codeData.basicUsage && (
                                <CodeHighlight
                                    code={codeData.basicUsage.code}
                                    language={codeData.basicUsage.language}
                                    title={codeData.basicUsage.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 依赖数组的使用</h4>
                            {codeData.dependencyArray && (
                                <CodeHighlight
                                    code={codeData.dependencyArray.code}
                                    language={codeData.dependencyArray.language}
                                    title={codeData.dependencyArray.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 常见错误和最佳实践</h4>
                            {codeData.commonMistakes && (
                                <CodeHighlight
                                    code={codeData.commonMistakes.code}
                                    language={codeData.commonMistakes.language}
                                    title={codeData.commonMistakes.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 常见陷阱 */}
                <Card title="⚠️ 常见陷阱与解决方案" className={styles.content_card}>
                    <Alert
                        message="重要提醒"
                        description="useCallback的使用需要谨慎，错误使用可能适得其反"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.traps_section}>
                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>不使用 useCallback 的问题</h4>
                            </div>
                            <div className={styles.trap_content}>
                                {codeData.withoutCallback && (
                                    <CodeHighlight
                                        code={codeData.withoutCallback.code}
                                        language={codeData.withoutCallback.language}
                                        title={codeData.withoutCallback.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>性能优化实战</h4>
                            </div>
                            <div className={styles.trap_content}>
                                {codeData.performanceOptimization && (
                                    <CodeHighlight
                                        code={codeData.performanceOptimization.code}
                                        language={codeData.performanceOptimization.language}
                                        title={codeData.performanceOptimization.title}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 配合React.memo使用</h4>
                                <p>useCallback最大的价值在于配合React.memo使用，避免子组件不必要的重新渲染</p>
                                {codeData.withReactMemo && (
                                    <CodeHighlight
                                        code={codeData.withReactMemo.code}
                                        language={codeData.withReactMemo.language}
                                        title={codeData.withReactMemo.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 使用ESLint规则</h4>
                                <p>启用exhaustive-deps规则，确保依赖项的完整性</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 避免在循环中使用</h4>
                                <p>不要在map等循环中直接使用useCallback，考虑将逻辑提取到子组件中</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 性能测量</h4>
                                <p>使用React DevTools Profiler测量实际的性能提升效果</p>
                            </div>
                        </div>
                    </div>
                </Card>


            </div>
        </div>
    )
}

export default UseCallbackDetail
