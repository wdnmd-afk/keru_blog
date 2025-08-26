import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ApiOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UseContextDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('React', 'useContext')

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
                    <ApiOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>useContext 深度解析</h1>
                    <p>跨组件状态共享的最佳实践，避免props drilling问题</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Hooks</Tag>
                        <Tag color="green">状态管理</Tag>
                        <Tag color="orange">Context API</Tag>
                        <Tag color="purple">跨组件通信</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是useContext？</h3>
                        <p>
                            useContext是React提供的一个Hook，用于在函数组件中消费Context。它可以让你在组件树中跨层级传递数据，避免通过props逐层传递的问题（props
                            drilling）。
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
                            useContext会查找组件树中最近的Provider，并返回其value。当Provider的value发生变化时，所有使用该Context的组件都会重新渲染。
                        </p>
                    </div>
                </Card>

                {/* 使用场景 */}
                <Card title="🎯 核心使用场景" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 多个Context的使用</h4>
                            {codeData.multipleContexts && (
                                <CodeHighlight
                                    code={codeData.multipleContexts.code}
                                    language={codeData.multipleContexts.language}
                                    title={codeData.multipleContexts.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 性能优化技巧</h4>
                            {codeData.performanceOptimization && (
                                <CodeHighlight
                                    code={codeData.performanceOptimization.code}
                                    language={codeData.performanceOptimization.language}
                                    title={codeData.performanceOptimization.title}
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
            </div>
        </div>
    )
}

export default UseContextDetail
