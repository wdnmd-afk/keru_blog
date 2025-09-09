import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, ClusterOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const MicroservicesDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('NodeJS', 'microservices')

    const handleBack = () => {
        navigate('/technology/nodejs')
    }

    if (loading) {
        return <div className={styles.loading}>{t('detail_pages.common.loading')}</div>
    }

    if (error) {
        return (
            <div className={styles.error}>
                {t('detail_pages.common.load_failed')}: {error}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回NodeJS
                </Button>
                <h1>
                    <ClusterOutlined /> Node.js 微服务架构
                </h1>
                <p>学习如何使用Node.js构建可扩展的微服务架构</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 微服务概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是微服务</h3>
                        <p>
                            微服务架构是一种将单一应用程序开发为一套小型服务的方法，每个服务运行在自己的进程中，
                            并使用轻量级机制（通常是HTTP资源API）进行通信。这些服务围绕业务功能构建，
                            并且可以由全自动部署机制独立部署。
                        </p>

                        <h3>微服务的优势</h3>
                        <ul>
                            <li>
                                <strong>技术多样性</strong>：每个服务可以使用不同的技术栈
                            </li>
                            <li>
                                <strong>独立部署</strong>：服务可以独立开发、测试和部署
                            </li>
                            <li>
                                <strong>故障隔离</strong>：单个服务的故障不会影响整个系统
                            </li>
                            <li>
                                <strong>团队自治</strong>：小团队可以独立负责特定服务
                            </li>
                            <li>
                                <strong>可扩展性</strong>：可以根据需要独立扩展特定服务
                            </li>
                        </ul>

                        <h3>微服务的挑战</h3>
                        <ul>
                            <li>
                                <strong>分布式复杂性</strong>：网络延迟、故障处理、数据一致性
                            </li>
                            <li>
                                <strong>运维复杂性</strong>：需要更复杂的部署和监控
                            </li>
                            <li>
                                <strong>数据管理</strong>：分布式事务和数据一致性
                            </li>
                            <li>
                                <strong>服务治理</strong>：服务发现、负载均衡、配置管理
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 架构设计 */}
                <Card title="🏗️ 架构设计" className={styles.content_card}>
                    <div className={styles.architecture_section}>
                        <h3>服务拆分策略</h3>

                        <div className={styles.usage_item}>
                            <h4>1. 按业务领域拆分</h4>
                            {codeData.basicArchitecture && (
                                <CodeHighlight
                                    code={codeData.basicArchitecture.code}
                                    language={codeData.basicArchitecture.language}
                                    title={codeData.basicArchitecture.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 数据库拆分</h4>
                            {codeData.serviceDiscovery && (
                                <CodeHighlight
                                    code={codeData.serviceDiscovery.code}
                                    language={codeData.serviceDiscovery.language}
                                    title={codeData.serviceDiscovery.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 服务间通信</h4>
                            {codeData.messageQueue && (
                                <CodeHighlight
                                    code={codeData.messageQueue.code}
                                    language={codeData.messageQueue.language}
                                    title={codeData.messageQueue.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* API网关 */}
                <Card title="🚪 API网关" className={styles.content_card}>
                    <div className={styles.gateway_section}>
                        <h3>Express API网关</h3>
                        {codeData.apiGateway && (
                            <CodeHighlight
                                code={codeData.apiGateway.code}
                                language={codeData.apiGateway.language}
                                title={codeData.apiGateway.title}
                            />
                        )}

                        <h3>服务发现与负载均衡</h3>
                        <div className={styles.code_block}>
                            <div>服务发现与负载均衡代码示例</div>
                        </div>
                    </div>
                </Card>

                {/* 监控与日志 */}
                <Card title="📊 监控与日志" className={styles.content_card}>
                    <div className={styles.monitoring_section}>
                        <h3>分布式链路追踪</h3>
                        <div className={styles.code_block}>
                            <div>分布式链路追踪代码示例</div>
                        </div>

                        <h3>健康检查与指标收集</h3>
                        <div className={styles.code_block}>
                            <div>健康检查与指标收集代码示例</div>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="微服务最佳实践"
                            description={
                                <ul>
                                    <li>保持服务的单一职责原则</li>
                                    <li>使用异步通信减少服务间耦合</li>
                                    <li>实现熔断器模式防止级联故障</li>
                                    <li>建立完善的监控和日志系统</li>
                                    <li>使用容器化技术简化部署</li>
                                    <li>实现自动化测试和CI/CD</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="注意事项"
                            description={
                                <ul>
                                    <li>避免过度拆分，增加不必要的复杂性</li>
                                    <li>确保数据一致性和事务处理</li>
                                    <li>处理网络分区和服务故障</li>
                                    <li>建立服务版本管理策略</li>
                                    <li>考虑安全性和认证授权</li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default MicroservicesDetail
