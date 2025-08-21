import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    CloudOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const DockerComposeDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'docker-compose')

    const handleBack = () => {
        navigate('/technology/docker')
    }

    if (loading) {
        return <div className={styles.loading}>加载中...</div>
    }

    if (error) {
        return <div className={styles.error}>加载失败: {error}</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button 
                    icon={<ArrowLeftOutlined />} 
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回Docker
                </Button>
                <h1><CloudOutlined /> Docker Compose</h1>
                <p>使用Docker Compose管理多容器应用程序</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 Docker Compose 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是 Docker Compose</h3>
                        <p>
                            Docker Compose 是一个用于定义和运行多容器Docker应用程序的工具。
                            通过YAML文件来配置应用程序的服务，然后使用一个命令就可以创建并启动所有服务。
                        </p>

                        <h3>核心概念</h3>
                        <div className={styles.concepts}>
                            <Tag color="blue">服务 (Services)</Tag>
                            <Tag color="green">网络 (Networks)</Tag>
                            <Tag color="orange">数据卷 (Volumes)</Tag>
                            <Tag color="red">配置 (Configs)</Tag>
                            <Tag color="purple">密钥 (Secrets)</Tag>
                        </div>

                        <h3>使用场景</h3>
                        <ul>
                            <li><strong>开发环境</strong>：快速搭建开发环境</li>
                            <li><strong>测试环境</strong>：自动化测试环境部署</li>
                            <li><strong>单机部署</strong>：简单的生产环境部署</li>
                            <li><strong>微服务</strong>：管理微服务架构</li>
                        </ul>
                    </div>
                </Card>

                {/* 基础配置 */}
                <Card title="📄 基础配置" className={styles.content_card}>
                    <div className={styles.basic_config}>
                        <h3>docker-compose.yml 基础结构</h3>
                        {codeData.basicConfiguration && (
                            <CodeHighlight
                                code={codeData.basicConfiguration.code}
                                language={codeData.basicConfiguration.language}
                                title={codeData.basicConfiguration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 常用命令 */}
                <Card title="⚡ 常用命令" className={styles.content_card}>
                    <div className={styles.commands_section}>
                        <h3>Docker Compose 命令</h3>
                        {codeData.commonCommands && (
                            <CodeHighlight
                                code={codeData.commonCommands.code}
                                language={codeData.commonCommands.language}
                                title={codeData.commonCommands.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 服务配置 */}
                <Card title="🛠️ 服务配置" className={styles.content_card}>
                    <div className={styles.services_section}>
                        <h3>服务定义详解</h3>
                        {codeData.serviceConfiguration && (
                            <CodeHighlight
                                code={codeData.serviceConfiguration.code}
                                language={codeData.serviceConfiguration.language}
                                title={codeData.serviceConfiguration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 网络配置 */}
                <Card title="🌐 网络配置" className={styles.content_card}>
                    <div className={styles.network_section}>
                        <h3>容器网络管理</h3>
                        {codeData.networkConfiguration && (
                            <CodeHighlight
                                code={codeData.networkConfiguration.code}
                                language={codeData.networkConfiguration.language}
                                title={codeData.networkConfiguration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 数据卷配置 */}
                <Card title="💾 数据卷配置" className={styles.content_card}>
                    <div className={styles.volume_section}>
                        <h3>数据持久化管理</h3>
                        {codeData.volumeConfiguration && (
                            <CodeHighlight
                                code={codeData.volumeConfiguration.code}
                                language={codeData.volumeConfiguration.language}
                                title={codeData.volumeConfiguration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 环境变量 */}
                <Card title="🔧 环境变量管理" className={styles.content_card}>
                    <div className={styles.env_section}>
                        <h3>环境配置</h3>
                        {codeData.environmentVariables && (
                            <CodeHighlight
                                code={codeData.environmentVariables.code}
                                language={codeData.environmentVariables.language}
                                title={codeData.environmentVariables.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 实际应用示例 */}
                <Card title="🚀 实际应用示例" className={styles.content_card}>
                    <div className={styles.examples_section}>
                        <h3>Web应用 + 数据库</h3>
                        {codeData.webAppExample && (
                            <CodeHighlight
                                code={codeData.webAppExample.code}
                                language={codeData.webAppExample.language}
                                title={codeData.webAppExample.title}
                            />
                        )}
                        
                        <h3>微服务架构示例</h3>
                        {codeData.microservicesExample && (
                            <CodeHighlight
                                code={codeData.microservicesExample.code}
                                language={codeData.microservicesExample.language}
                                title={codeData.microservicesExample.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 高级配置 */}
                <Card title="🎯 高级配置" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>健康检查与依赖管理</h3>
                        {codeData.healthChecks && (
                            <CodeHighlight
                                code={codeData.healthChecks.code}
                                language={codeData.healthChecks.language}
                                title={codeData.healthChecks.title}
                            />
                        )}
                        
                        <h3>资源限制与安全配置</h3>
                        {codeData.resourceLimits && (
                            <CodeHighlight
                                code={codeData.resourceLimits.code}
                                language={codeData.resourceLimits.language}
                                title={codeData.resourceLimits.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="Docker Compose 使用建议"
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

                        <Divider />

                        <Alert
                            message="生产环境注意事项"
                            description={
                                <ul>
                                    <li><strong>安全配置</strong>：使用secrets管理敏感信息</li>
                                    <li><strong>网络隔离</strong>：创建自定义网络隔离服务</li>
                                    <li><strong>日志管理</strong>：配置合适的日志驱动</li>
                                    <li><strong>监控告警</strong>：集成监控和告警系统</li>
                                    <li><strong>备份策略</strong>：制定数据备份和恢复策略</li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化建议"
                            description={
                                <ul>
                                    <li><strong>镜像优化</strong>：使用多阶段构建减小镜像大小</li>
                                    <li><strong>缓存利用</strong>：合理利用Docker层缓存</li>
                                    <li><strong>并行启动</strong>：优化服务启动顺序</li>
                                    <li><strong>资源分配</strong>：根据实际需求分配资源</li>
                                    <li><strong>网络优化</strong>：使用合适的网络驱动</li>
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
