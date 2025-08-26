import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, RocketOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CompositionAPIDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Vue', 'compositionAPI')

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
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Composition API 深度解析</h1>
                    <p>Vue 3组合式API的核心概念与实践应用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue 3</Tag>
                        <Tag color="blue">Composition API</Tag>
                        <Tag color="orange">响应式</Tag>
                        <Tag color="purple">组合式</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 Composition API 基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Composition API？</h3>
                        <p>
                            Composition API是Vue
                            3引入的一套新的API，它提供了一种更灵活的方式来组织组件逻辑。通过组合函数的方式，可以更好地复用逻辑，提高代码的可维护性。
                        </p>

                        <h3>基本语法</h3>
                        {codeData.basicUsage && (
                            <CodeHighlight
                                code={codeData.basicUsage.code}
                                language={codeData.basicUsage.language}
                                title={codeData.basicUsage.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 核心API */}
                <Card title="🎯 核心API详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. ref vs reactive 对比</h4>
                            {codeData.refVsReactive && (
                                <CodeHighlight
                                    code={codeData.refVsReactive.code}
                                    language={codeData.refVsReactive.language}
                                    title={codeData.refVsReactive.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 可组合函数 (Composables)</h4>
                            {codeData.composables && (
                                <CodeHighlight
                                    code={codeData.composables.code}
                                    language={codeData.composables.language}
                                    title={codeData.composables.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 生命周期钩子</h4>
                            {codeData.lifecycle && (
                                <CodeHighlight
                                    code={codeData.lifecycle.code}
                                    language={codeData.lifecycle.language}
                                    title={codeData.lifecycle.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CompositionAPIDetail
