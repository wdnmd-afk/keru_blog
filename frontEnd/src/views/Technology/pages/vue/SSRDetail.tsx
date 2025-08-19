import React from 'react'
import { Card, Tag, Button, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, CloudServerOutlined, InfoCircleOutlined } from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const SSRDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Vue', 'ssr')

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
                    <CloudServerOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue.js 服务端渲染 (SSR)</h1>
                    <p>掌握Vue.js服务端渲染技术，提升应用性能和SEO效果</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">SSR</Tag>
                        <Tag color="orange">Nuxt.js</Tag>
                        <Tag color="purple">SEO</Tag>
                        <Tag color="red">性能优化</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* SSR概述 */}
                <Card title="🌐 SSR概述与优势" className={styles.content_card}>
                    <Alert
                        message="什么是SSR？"
                        description="服务端渲染(SSR)是指在服务器上生成完整的HTML页面，然后发送给客户端，而不是发送空白页面让JavaScript在客户端渲染"
                        type="info"
                        showIcon
                        icon={<InfoCircleOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.ssr_overview}>
                        <h3>SSR vs SPA对比</h3>
                        {codeData.ssrComparison && (
                            <CodeHighlight
                                code={codeData.ssrComparison.code}
                                language={codeData.ssrComparison.language}
                                title={codeData.ssrComparison.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Vue SSR实现 */}
                <Card title="⚙️ Vue SSR手动实现" className={styles.content_card}>
                    <div className={styles.manual_ssr}>
                        <h3>1. 基础SSR设置</h3>
                        {codeData.basicSSRSetup && (
                            <CodeHighlight
                                code={codeData.basicSSRSetup.code}
                                language={codeData.basicSSRSetup.language}
                                title={codeData.basicSSRSetup.title}
                            />
                        )}

                        <h3>2. 客户端激活</h3>
                        {codeData.clientActivation && (
                            <CodeHighlight
                                code={codeData.clientActivation.code}
                                language={codeData.clientActivation.language}
                                title={codeData.clientActivation.title}
                            />
                        )}

                        <h3>3. 构建配置</h3>
                        {codeData.buildConfiguration && (
                            <CodeHighlight
                                code={codeData.buildConfiguration.code}
                                language={codeData.buildConfiguration.language}
                                title={codeData.buildConfiguration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Nuxt.js框架 */}
                <Card title="🚀 Nuxt.js - Vue SSR框架" className={styles.content_card}>
                    <div className={styles.nuxt_framework}>
                        <h3>快速开始</h3>
                        {codeData.nuxtQuickStart && (
                            <CodeHighlight
                                code={codeData.nuxtQuickStart.code}
                                language={codeData.nuxtQuickStart.language}
                                title={codeData.nuxtQuickStart.title}
                            />
                        )}

                        <h3>页面和路由</h3>
                        {codeData.nuxtPagesRouting && (
                            <CodeHighlight
                                code={codeData.nuxtPagesRouting.code}
                                language={codeData.nuxtPagesRouting.language}
                                title={codeData.nuxtPagesRouting.title}
                            />
                        )}

                        <h3>数据获取</h3>
                        {codeData.nuxtDataFetching && (
                            <CodeHighlight
                                code={codeData.nuxtDataFetching.code}
                                language={codeData.nuxtDataFetching.language}
                                title={codeData.nuxtDataFetching.title}
                            />
                        )}
                    </div>
                </Card>

                {/* SSR优化 */}
                <Card title="⚡ SSR性能优化" className={styles.content_card}>
                    <div className={styles.ssr_optimization}>
                        <h3>1. 缓存策略</h3>
                        {codeData.ssrCaching && (
                            <CodeHighlight
                                code={codeData.ssrCaching.code}
                                language={codeData.ssrCaching.language}
                                title={codeData.ssrCaching.title}
                            />
                        )}

                        <h3>2. 代码分割优化</h3>
                        {codeData.codeSplittingOptimization && (
                            <CodeHighlight
                                code={codeData.codeSplittingOptimization.code}
                                language={codeData.codeSplittingOptimization.language}
                                title={codeData.codeSplittingOptimization.title}
                            />
                        )}

                        <h3>3. SEO优化</h3>
                        {codeData.seoOptimization && (
                            <CodeHighlight
                                code={codeData.seoOptimization.code}
                                language={codeData.seoOptimization.language}
                                title={codeData.seoOptimization.title}
                            />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SSRDetail
