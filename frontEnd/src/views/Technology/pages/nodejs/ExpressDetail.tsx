import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ApiOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ExpressDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('NodeJS', 'express')

    const handleBack = () => {
        navigate('/technology/nodejs')
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
                    返回Node.js技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ApiOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Express.js 框架详解</h1>
                    <p>掌握Node.js最流行的Web应用框架，构建高效的服务端应用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Express.js</Tag>
                        <Tag color="blue">Web框架</Tag>
                        <Tag color="orange">中间件</Tag>
                        <Tag color="purple">RESTful API</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Express基础 */}
                <Card title="🚀 Express.js 基础入门" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Express.js？</h3>
                        <p>
                            Express.js是一个基于Node.js平台的极简、灵活的Web应用开发框架，它提供了一系列强大的特性，用于开发Web和移动应用。Express提供了薄薄的一层基本的Web应用功能，而不会掩盖你熟悉和喜爱的Node.js特性。
                        </p>

                        <h3>快速开始</h3>
                        {codeData.basicSetup && (
                            <CodeHighlight
                                code={codeData.basicSetup.code}
                                language={codeData.basicSetup.language}
                                title={codeData.basicSetup.title}
                            />
                        )}

                        <h3>Express应用生成器</h3>
                        {codeData.expressGenerator && (
                            <CodeHighlight
                                code={codeData.expressGenerator.code}
                                language={codeData.expressGenerator.language}
                                title={codeData.expressGenerator.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 路由系统 */}
                <Card title="🛣️ 路由系统" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基本路由</h4>
                            {codeData.routingAdvanced && (
                                <CodeHighlight
                                    code={codeData.routingAdvanced.code}
                                    language={codeData.routingAdvanced.language}
                                    title={codeData.routingAdvanced.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 路由模块化</h4>
                            {codeData.routeModularization && (
                                <CodeHighlight
                                    code={codeData.routeModularization.code}
                                    language={codeData.routeModularization.language}
                                    title={codeData.routeModularization.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 路由模式匹配</h4>
                            {codeData.routePatterns && (
                                <CodeHighlight
                                    code={codeData.routePatterns.code}
                                    language={codeData.routePatterns.language}
                                    title={codeData.routePatterns.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 中间件 */}
                <Card title="🔧 中间件系统" className={styles.content_card}>
                    <div className={styles.middleware_section}>
                        <h3>内置中间件</h3>
                        {codeData.builtinMiddleware && (
                            <CodeHighlight
                                code={codeData.builtinMiddleware.code}
                                language={codeData.builtinMiddleware.language}
                                title={codeData.builtinMiddleware.title}
                            />
                        )}

                        <h3>第三方中间件</h3>
                        {codeData.thirdPartyMiddleware && (
                            <CodeHighlight
                                code={codeData.thirdPartyMiddleware.code}
                                language={codeData.thirdPartyMiddleware.language}
                                title={codeData.thirdPartyMiddleware.title}
                            />
                        )}

                        <h3>自定义中间件</h3>
                        {codeData.middleware && (
                            <CodeHighlight
                                code={codeData.middleware.code}
                                language={codeData.middleware.language}
                                title={codeData.middleware.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 错误处理 */}
                <Card title="🚨 错误处理" className={styles.content_card}>
                    <div className={styles.error_section}>
                        <h3>错误处理中间件</h3>
                        {codeData.errorHandling && (
                            <CodeHighlight
                                code={codeData.errorHandling.code}
                                language={codeData.errorHandling.language}
                                title={codeData.errorHandling.title}
                            />
                        )}

                        <h3>全局异常捕获</h3>
                        {codeData.globalErrorHandling && (
                            <CodeHighlight
                                code={codeData.globalErrorHandling.code}
                                language={codeData.globalErrorHandling.language}
                                title={codeData.globalErrorHandling.title}
                            />
                        )}
                    </div>
                </Card>

                {/* RESTful API */}
                <Card title="🌐 RESTful API 设计" className={styles.content_card}>
                    <div className={styles.api_section}>
                        <h3>RESTful API 示例</h3>
                        {codeData.restfulAPI && (
                            <CodeHighlight
                                code={codeData.restfulAPI.code}
                                language={codeData.restfulAPI.language}
                                title={codeData.restfulAPI.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Express.js 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 项目结构组织</h4>
                                <p>采用清晰的项目结构，便于维护和扩展</p>
                                {codeData.projectStructure && (
                                    <CodeHighlight
                                        code={codeData.projectStructure.code}
                                        language={codeData.projectStructure.language}
                                        title={codeData.projectStructure.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 安全性配置</h4>
                                <p>实施必要的安全措施保护应用</p>
                                {codeData.securityConfig && (
                                    <CodeHighlight
                                        code={codeData.securityConfig.code}
                                        language={codeData.securityConfig.language}
                                        title={codeData.securityConfig.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>优化应用性能，提升用户体验</p>
                                <ul>
                                    <li>使用压缩中间件减少响应大小</li>
                                    <li>启用HTTP缓存头</li>
                                    <li>使用连接池管理数据库连接</li>
                                    <li>实施适当的日志级别</li>
                                    <li>使用集群模式充分利用多核CPU</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ExpressDetail
