import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CloudOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Spin, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DockerComposeDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'docker-compose')

    const handleBack = () => {
        navigate('/technology/docker')
    }

    if (loading) {
        return (
            <div className={styles.topic_detail_container}>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                    <p style={{ marginTop: '16px', color: '#ffffff' }}>加载代码数据中...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.topic_detail_container}>
                <Alert message="加载失败" description={error} type="error" showIcon />
            </div>
        )
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
                    返回Docker技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <CloudOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker Compose</h1>
                    <p>使用Docker Compose管理多容器应用程序，实现服务编排和环境一致性</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">服务编排</Tag>
                        <Tag color="green">多容器管理</Tag>
                        <Tag color="orange">环境配置</Tag>
                        <Tag color="purple">微服务架构</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 概述 */}
                <Card title="📋 Docker Compose 概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是 Docker Compose</h3>
                        <p>
                            Docker Compose 是一个用于定义和运行多容器Docker应用程序的工具。
                            通过YAML文件来配置应用程序的服务，然后使用一个命令就可以创建并启动所有服务。
                        </p>

                        <h3>核心概念</h3>
                        <div className={styles.network_types}>
                            <Tag color="blue">服务 (Services)</Tag>
                            <Tag color="green">网络 (Networks)</Tag>
                            <Tag color="orange">数据卷 (Volumes)</Tag>
                            <Tag color="red">配置 (Configs)</Tag>
                            <Tag color="purple">密钥 (Secrets)</Tag>
                        </div>

                        <h3>使用场景</h3>
                        <ul>
                            <li>
                                <strong>开发环境</strong>：快速搭建开发环境
                            </li>
                            <li>
                                <strong>测试环境</strong>：自动化测试环境部署
                            </li>
                            <li>
                                <strong>单机部署</strong>：简单的生产环境部署
                            </li>
                            <li>
                                <strong>微服务</strong>：管理微服务架构
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 基础配置 */}
                <Card title="📄 基础配置" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. docker-compose.yml 基础结构</h4>
                            {codeData.basicCompose && (
                                <CodeHighlight
                                    code={codeData.basicCompose.code}
                                    language={codeData.basicCompose.language}
                                    title={codeData.basicCompose.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 多阶段构建配置</h4>
                            {codeData.multiStageCompose && (
                                <CodeHighlight
                                    code={codeData.multiStageCompose.code}
                                    language={codeData.multiStageCompose.language}
                                    title={codeData.multiStageCompose.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. Docker Compose 命令</h4>
                            {codeData.composeCommands && (
                                <CodeHighlight
                                    code={codeData.composeCommands.code}
                                    language={codeData.composeCommands.language}
                                    title={codeData.composeCommands.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 环境配置 */}
                <Card title="🔧 环境配置与管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>4. 开发环境配置</h4>
                            {codeData.developmentCompose && (
                                <CodeHighlight
                                    code={codeData.developmentCompose.code}
                                    language={codeData.developmentCompose.language}
                                    title={codeData.developmentCompose.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>5. 生产环境配置</h4>
                            {codeData.productionCompose && (
                                <CodeHighlight
                                    code={codeData.productionCompose.code}
                                    language={codeData.productionCompose.language}
                                    title={codeData.productionCompose.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>6. 环境变量管理</h4>
                            {codeData.environmentVariables && (
                                <CodeHighlight
                                    code={codeData.environmentVariables.code}
                                    language={codeData.environmentVariables.language}
                                    title={codeData.environmentVariables.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 高级配置 */}
                <Card title="🎯 高级配置与优化" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>7. 网络配置</h4>
                            {codeData.networking && (
                                <CodeHighlight
                                    code={codeData.networking.code}
                                    language={codeData.networking.language}
                                    title={codeData.networking.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>8. 数据卷管理</h4>
                            {codeData.volumes && (
                                <CodeHighlight
                                    code={codeData.volumes.code}
                                    language={codeData.volumes.language}
                                    title={codeData.volumes.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>9. 健康检查配置</h4>
                            {codeData.healthChecks && (
                                <CodeHighlight
                                    code={codeData.healthChecks.code}
                                    language={codeData.healthChecks.language}
                                    title={codeData.healthChecks.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 企业级应用 */}
                <Card title="🏢 企业级应用示例" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>10. 资源限制与安全配置</h4>
                            {codeData.resourceLimits && (
                                <CodeHighlight
                                    code={codeData.resourceLimits.code}
                                    language={codeData.resourceLimits.language}
                                    title={codeData.resourceLimits.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>11. 微服务架构示例</h4>
                            {codeData.microservicesExample && (
                                <CodeHighlight
                                    code={codeData.microservicesExample.code}
                                    language={codeData.microservicesExample.language}
                                    title={codeData.microservicesExample.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className="f-ic">
                        <Alert
                            message="Docker Compose 使用建议"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>使用版本控制管理compose文件</li>
                                    <li>合理组织项目文件结构</li>
                                    <li>明确指定镜像版本，避免使用latest</li>
                                    <li>使用环境变量管理配置</li>
                                    <li>为服务设置健康检查</li>
                                    <li>合理配置资源限制</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Alert
                            message="生产环境注意事项"
                            className={'h-50 flex-1 mx-5'}
                            description={
                                <ul>
                                    <li>
                                        <strong>安全配置</strong>：使用secrets管理敏感信息
                                    </li>
                                    <li>
                                        <strong>网络隔离</strong>：创建自定义网络隔离服务
                                    </li>
                                    <li>
                                        <strong>日志管理</strong>：配置合适的日志驱动
                                    </li>
                                    <li>
                                        <strong>监控告警</strong>：集成监控和告警系统
                                    </li>
                                    <li>
                                        <strong>备份策略</strong>：制定数据备份和恢复策略
                                    </li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Alert
                            message="性能优化建议"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        <strong>镜像优化</strong>：使用多阶段构建减小镜像大小
                                    </li>
                                    <li>
                                        <strong>缓存利用</strong>：合理利用Docker层缓存
                                    </li>
                                    <li>
                                        <strong>并行启动</strong>：优化服务启动顺序
                                    </li>
                                    <li>
                                        <strong>资源分配</strong>：根据实际需求分配资源
                                    </li>
                                    <li>
                                        <strong>网络优化</strong>：使用合适的网络驱动
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default DockerComposeDetail
