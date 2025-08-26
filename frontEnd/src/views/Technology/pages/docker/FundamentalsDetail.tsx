import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CloudOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Spin, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FundamentalsDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'fundamentals')

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
                    <h1>Docker 基础</h1>
                    <p>掌握Docker容器化技术的基础概念和核心操作</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">镜像 (Image)</Tag>
                        <Tag color="green">容器 (Container)</Tag>
                        <Tag color="orange">仓库 (Registry)</Tag>
                        <Tag color="red">Dockerfile</Tag>
                        <Tag color="purple">数据卷 (Volume)</Tag>
                        <Tag color="cyan">网络 (Network)</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 概述 */}
                <Card title="📋 Docker 概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是 Docker</h3>
                        <p>
                            Docker
                            是一个开源的容器化平台，它允许开发者将应用程序及其依赖项打包到轻量级、
                            可移植的容器中，然后可以在任何支持Docker的环境中运行。
                        </p>

                        <h3>核心概念</h3>
                        <div className={styles.network_types}>
                            <Tag color="blue">镜像 (Image)</Tag>
                            <Tag color="green">容器 (Container)</Tag>
                            <Tag color="orange">仓库 (Registry)</Tag>
                            <Tag color="red">Dockerfile</Tag>
                            <Tag color="purple">数据卷 (Volume)</Tag>
                            <Tag color="cyan">网络 (Network)</Tag>
                        </div>

                        <h3>Docker 优势</h3>
                        <ul>
                            <li>
                                <strong>环境一致性</strong>：开发、测试、生产环境完全一致
                            </li>
                            <li>
                                <strong>快速部署</strong>：秒级启动，快速扩缩容
                            </li>
                            <li>
                                <strong>资源高效</strong>：比虚拟机更轻量，资源利用率更高
                            </li>
                            <li>
                                <strong>易于管理</strong>：统一的容器管理方式
                            </li>
                            <li>
                                <strong>微服务支持</strong>：天然支持微服务架构
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 安装配置 */}
                <Card title="🚀 Docker 安装" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>各平台安装方法</h4>
                            {codeData.dockerInstallation && (
                                <CodeHighlight
                                    code={codeData.dockerInstallation.code}
                                    language={codeData.dockerInstallation.language}
                                    title={codeData.dockerInstallation.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 基础命令 */}
                <Card title="⚡ 基础命令" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>Docker 基础操作</h4>
                            {codeData.basicCommands && (
                                <CodeHighlight
                                    code={codeData.basicCommands.code}
                                    language={codeData.basicCommands.language}
                                    title={codeData.basicCommands.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* Dockerfile */}
                <Card title="📄 Dockerfile 基础" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>Dockerfile 编写</h4>
                            {codeData.dockerfileBasics && (
                                <CodeHighlight
                                    code={codeData.dockerfileBasics.code}
                                    language={codeData.dockerfileBasics.language}
                                    title={codeData.dockerfileBasics.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 容器生命周期 */}
                <Card title="🔄 容器生命周期" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>容器状态管理</h4>
                            {codeData.containerLifecycle && (
                                <CodeHighlight
                                    code={codeData.containerLifecycle.code}
                                    language={codeData.containerLifecycle.language}
                                    title={codeData.containerLifecycle.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 数据卷管理 */}
                <Card title="💾 数据卷管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>数据持久化</h4>
                            {codeData.volumeManagement && (
                                <CodeHighlight
                                    code={codeData.volumeManagement.code}
                                    language={codeData.volumeManagement.language}
                                    title={codeData.volumeManagement.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 网络基础 */}
                <Card title="🌐 网络基础" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>容器网络配置</h4>
                            {codeData.networkBasics && (
                                <CodeHighlight
                                    code={codeData.networkBasics.code}
                                    language={codeData.networkBasics.language}
                                    title={codeData.networkBasics.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 镜像优化 */}
                <Card title="🎯 镜像优化" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>构建高效镜像</h4>
                            {codeData.imageOptimization && (
                                <CodeHighlight
                                    code={codeData.imageOptimization.code}
                                    language={codeData.imageOptimization.language}
                                    title={codeData.imageOptimization.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 容器监控 */}
                <Card title="📊 容器监控" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>监控和调试</h4>
                            {codeData.containerMonitoring && (
                                <CodeHighlight
                                    code={codeData.containerMonitoring.code}
                                    language={codeData.containerMonitoring.language}
                                    title={codeData.containerMonitoring.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className="f-ic">
                        <Alert
                            message="Docker 使用建议"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>使用官方镜像作为基础镜像</li>
                                    <li>保持镜像尽可能小，使用Alpine版本</li>
                                    <li>利用多阶段构建优化镜像大小</li>
                                    <li>合理使用.dockerignore文件</li>
                                    <li>不要在容器中存储数据，使用数据卷</li>
                                    <li>为容器设置资源限制</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Alert
                            message="安全建议"
                            className={'h-50 flex-1 mx-5'}
                            description={
                                <ul>
                                    <li>
                                        <strong>用户权限</strong>：避免使用root用户运行容器
                                    </li>
                                    <li>
                                        <strong>镜像安全</strong>：定期更新基础镜像
                                    </li>
                                    <li>
                                        <strong>网络隔离</strong>：使用自定义网络隔离容器
                                    </li>
                                    <li>
                                        <strong>敏感数据</strong>：使用secrets管理敏感信息
                                    </li>
                                    <li>
                                        <strong>镜像扫描</strong>：定期扫描镜像漏洞
                                    </li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Alert
                            message="性能优化"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        <strong>层缓存</strong>：合理安排Dockerfile指令顺序
                                    </li>
                                    <li>
                                        <strong>并行构建</strong>：使用BuildKit加速构建
                                    </li>
                                    <li>
                                        <strong>资源限制</strong>：设置合适的CPU和内存限制
                                    </li>
                                    <li>
                                        <strong>健康检查</strong>：配置容器健康检查
                                    </li>
                                    <li>
                                        <strong>日志管理</strong>：配置合适的日志驱动
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

export default FundamentalsDetail
