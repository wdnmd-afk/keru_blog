import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, ClusterOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const KubernetesDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'kubernetes')

    const handleBack = () => {
        navigate('/technology/docker')
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
                    返回Docker
                </Button>
                <h1>
                    <ClusterOutlined /> Kubernetes 容器编排
                </h1>
                <p>掌握Kubernetes容器编排和集群管理</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 Kubernetes 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是 Kubernetes</h3>
                        <p>
                            Kubernetes（K8s）是一个开源的容器编排平台，用于自动化部署、扩缩和管理容器化应用程序。
                            它提供了强大的容器编排能力，是现代云原生应用的基础设施。
                        </p>

                        <h3>核心概念</h3>
                        <div className={styles.concepts}>
                            <Tag color="blue">Pod (容器组)</Tag>
                            <Tag color="green">Service (服务)</Tag>
                            <Tag color="orange">Deployment (部署)</Tag>
                            <Tag color="red">Namespace (命名空间)</Tag>
                            <Tag color="purple">ConfigMap (配置)</Tag>
                            <Tag color="cyan">Secret (密钥)</Tag>
                        </div>

                        <h3>Kubernetes 优势</h3>
                        <ul>
                            <li>
                                <strong>自动化部署</strong>：自动化容器的部署和管理
                            </li>
                            <li>
                                <strong>弹性扩缩</strong>：根据负载自动扩缩容器数量
                            </li>
                            <li>
                                <strong>服务发现</strong>：内置服务发现和负载均衡
                            </li>
                            <li>
                                <strong>自我修复</strong>：自动重启失败的容器
                            </li>
                            <li>
                                <strong>滚动更新</strong>：零停机时间的应用更新
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 基础操作 */}
                <Card title="⚡ 基础操作" className={styles.content_card}>
                    <div className={styles.basic_operations}>
                        <h3>kubectl 基本命令</h3>
                        {codeData.basicCommands && (
                            <CodeHighlight
                                code={codeData.basicCommands.code}
                                language={codeData.basicCommands.language}
                                title={codeData.basicCommands.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Pod 管理 */}
                <Card title="📦 Pod 管理" className={styles.content_card}>
                    <div className={styles.pod_section}>
                        <h3>Pod 定义与创建</h3>
                        {codeData.podBasics && (
                            <CodeHighlight
                                code={codeData.podBasics.code}
                                language={codeData.podBasics.language}
                                title={codeData.podBasics.title}
                            />
                        )}

                        <h3>多容器 Pod</h3>
                        {codeData.multiContainerPod && (
                            <CodeHighlight
                                code={codeData.multiContainerPod.code}
                                language={codeData.multiContainerPod.language}
                                title={codeData.multiContainerPod.title}
                            />
                        )}

                        <h3>Pod 生命周期</h3>
                        {codeData.podLifecycle && (
                            <CodeHighlight
                                code={codeData.podLifecycle.code}
                                language={codeData.podLifecycle.language}
                                title={codeData.podLifecycle.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Deployment 管理 */}
                <Card title="📋 Deployment 部署管理" className={styles.content_card}>
                    <div className={styles.deployment_section}>
                        <h3>Deployment 基础</h3>
                        {codeData.deploymentBasics && (
                            <CodeHighlight
                                code={codeData.deploymentBasics.code}
                                language={codeData.deploymentBasics.language}
                                title={codeData.deploymentBasics.title}
                            />
                        )}

                        <h3>滚动更新</h3>
                        {codeData.rollingUpdate && (
                            <CodeHighlight
                                code={codeData.rollingUpdate.code}
                                language={codeData.rollingUpdate.language}
                                title={codeData.rollingUpdate.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Service 网络 */}
                <Card title="🔄 Service 网络服务" className={styles.content_card}>
                    <div className={styles.service_section}>
                        <h3>Service 类型</h3>
                        {codeData.serviceTypes && (
                            <CodeHighlight
                                code={codeData.serviceTypes.code}
                                language={codeData.serviceTypes.language}
                                title={codeData.serviceTypes.title}
                            />
                        )}

                        <h3>Ingress 控制器</h3>
                        {codeData.ingressController && (
                            <CodeHighlight
                                code={codeData.ingressController.code}
                                language={codeData.ingressController.language}
                                title={codeData.ingressController.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 配置管理 */}
                <Card title="🗂️ 配置与密钥管理" className={styles.content_card}>
                    <div className={styles.config_section}>
                        <h3>ConfigMap 配置</h3>
                        {codeData.configMapManagement && (
                            <CodeHighlight
                                code={codeData.configMapManagement.code}
                                language={codeData.configMapManagement.language}
                                title={codeData.configMapManagement.title}
                            />
                        )}

                        <h3>Secret 密钥管理</h3>
                        {codeData.secretManagement && (
                            <CodeHighlight
                                code={codeData.secretManagement.code}
                                language={codeData.secretManagement.language}
                                title={codeData.secretManagement.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 存储管理 */}
                <Card title="💾 存储管理" className={styles.content_card}>
                    <div className={styles.storage_section}>
                        <h3>持久化存储</h3>
                        {codeData.persistentStorage && (
                            <CodeHighlight
                                code={codeData.persistentStorage.code}
                                language={codeData.persistentStorage.language}
                                title={codeData.persistentStorage.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 监控与日志 */}
                <Card title="📊 监控与日志" className={styles.content_card}>
                    <div className={styles.monitoring_section}>
                        <h3>集群监控</h3>
                        {codeData.clusterMonitoring && (
                            <CodeHighlight
                                code={codeData.clusterMonitoring.code}
                                language={codeData.clusterMonitoring.language}
                                title={codeData.clusterMonitoring.title}
                            />
                        )}

                        <h3>日志管理</h3>
                        {codeData.logManagement && (
                            <CodeHighlight
                                code={codeData.logManagement.code}
                                language={codeData.logManagement.language}
                                title={codeData.logManagement.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="Kubernetes 部署建议"
                            description={
                                <ul>
                                    <li>使用Namespace隔离不同环境和应用</li>
                                    <li>为Pod设置资源限制和请求</li>
                                    <li>使用健康检查确保应用可用性</li>
                                    <li>合理配置副本数量和扩缩策略</li>
                                    <li>使用标签和选择器组织资源</li>
                                    <li>定期备份etcd数据</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="安全建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>RBAC权限</strong>：配置基于角色的访问控制
                                    </li>
                                    <li>
                                        <strong>网络策略</strong>：限制Pod间的网络通信
                                    </li>
                                    <li>
                                        <strong>镜像安全</strong>：使用可信的镜像仓库
                                    </li>
                                    <li>
                                        <strong>密钥管理</strong>：使用Secret管理敏感信息
                                    </li>
                                    <li>
                                        <strong>安全上下文</strong>：配置Pod安全策略
                                    </li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="运维建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>监控告警</strong>：部署完整的监控体系
                                    </li>
                                    <li>
                                        <strong>日志收集</strong>：集中化日志管理
                                    </li>
                                    <li>
                                        <strong>备份策略</strong>：定期备份关键数据
                                    </li>
                                    <li>
                                        <strong>版本管理</strong>：使用GitOps管理配置
                                    </li>
                                    <li>
                                        <strong>灾难恢复</strong>：制定灾难恢复计划
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

export default KubernetesDetail
