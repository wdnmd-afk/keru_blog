import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    CloudOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    GlobalOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const NetworkingDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'networking')

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
                <h1><GlobalOutlined /> Docker 网络</h1>
                <p>掌握Docker容器网络配置和管理</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 Docker 网络概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>Docker 网络模式</h3>
                        <p>
                            Docker提供了多种网络模式来满足不同的应用场景，
                            从简单的单机部署到复杂的多主机集群环境。
                        </p>

                        <h3>网络驱动类型</h3>
                        <div className={styles.network_types}>
                            <Tag color="blue">bridge (桥接)</Tag>
                            <Tag color="green">host (主机)</Tag>
                            <Tag color="orange">none (无网络)</Tag>
                            <Tag color="red">overlay (覆盖)</Tag>
                            <Tag color="purple">macvlan (MAC虚拟)</Tag>
                        </div>

                        <h3>网络特性</h3>
                        <ul>
                            <li><strong>隔离性</strong>：不同网络间的容器默认隔离</li>
                            <li><strong>可发现性</strong>：同网络容器可通过名称通信</li>
                            <li><strong>可扩展性</strong>：支持自定义网络驱动</li>
                            <li><strong>安全性</strong>：内置网络安全机制</li>
                        </ul>
                    </div>
                </Card>

                {/* 基础网络操作 */}
                <Card title="🌐 基础网络操作" className={styles.content_card}>
                    <div className={styles.basic_operations}>
                        <h3>网络管理命令</h3>
                        {codeData.networkCommands && (
                            <CodeHighlight
                                code={codeData.networkCommands.code}
                                language={codeData.networkCommands.language}
                                title={codeData.networkCommands.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 网络驱动详解 */}
                <Card title="🚗 网络驱动详解" className={styles.content_card}>
                    <div className={styles.network_drivers}>
                        <h3>Bridge 网络</h3>
                        {codeData.bridgeNetwork && (
                            <CodeHighlight
                                code={codeData.bridgeNetwork.code}
                                language={codeData.bridgeNetwork.language}
                                title={codeData.bridgeNetwork.title}
                            />
                        )}
                        
                        <h3>Host 网络</h3>
                        {codeData.hostNetwork && (
                            <CodeHighlight
                                code={codeData.hostNetwork.code}
                                language={codeData.hostNetwork.language}
                                title={codeData.hostNetwork.title}
                            />
                        )}
                        
                        <h3>Overlay 网络</h3>
                        {codeData.overlayNetwork && (
                            <CodeHighlight
                                code={codeData.overlayNetwork.code}
                                language={codeData.overlayNetwork.language}
                                title={codeData.overlayNetwork.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 端口映射 */}
                <Card title="🔌 端口映射与暴露" className={styles.content_card}>
                    <div className={styles.port_mapping}>
                        <h3>端口映射配置</h3>
                        {codeData.portMapping && (
                            <CodeHighlight
                                code={codeData.portMapping.code}
                                language={codeData.portMapping.language}
                                title={codeData.portMapping.title}
                            />
                        )}
                        
                        <h3>动态端口管理</h3>
                        {codeData.dynamicPorts && (
                            <CodeHighlight
                                code={codeData.dynamicPorts.code}
                                language={codeData.dynamicPorts.language}
                                title={codeData.dynamicPorts.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 容器间通信 */}
                <Card title="💬 容器间通信" className={styles.content_card}>
                    <div className={styles.container_communication}>
                        <h3>同网络通信</h3>
                        {codeData.containerCommunication && (
                            <CodeHighlight
                                code={codeData.containerCommunication.code}
                                language={codeData.containerCommunication.language}
                                title={codeData.containerCommunication.title}
                            />
                        )}
                        
                        <h3>跨网络通信</h3>
                        {codeData.crossNetworkCommunication && (
                            <CodeHighlight
                                code={codeData.crossNetworkCommunication.code}
                                language={codeData.crossNetworkCommunication.language}
                                title={codeData.crossNetworkCommunication.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 网络安全 */}
                <Card title="🔒 网络安全" className={styles.content_card}>
                    <div className={styles.network_security}>
                        <h3>网络隔离</h3>
                        {codeData.networkIsolation && (
                            <CodeHighlight
                                code={codeData.networkIsolation.code}
                                language={codeData.networkIsolation.language}
                                title={codeData.networkIsolation.title}
                            />
                        )}
                        
                        <h3>防火墙配置</h3>
                        {codeData.firewallConfiguration && (
                            <CodeHighlight
                                code={codeData.firewallConfiguration.code}
                                language={codeData.firewallConfiguration.language}
                                title={codeData.firewallConfiguration.title}
                            />
                        )}
                        
                        <h3>TLS加密</h3>
                        {codeData.tlsEncryption && (
                            <CodeHighlight
                                code={codeData.tlsEncryption.code}
                                language={codeData.tlsEncryption.language}
                                title={codeData.tlsEncryption.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 网络故障排查 */}
                <Card title="🔧 网络故障排查" className={styles.content_card}>
                    <div className={styles.troubleshooting}>
                        <h3>常用诊断命令</h3>
                        {codeData.networkTroubleshooting && (
                            <CodeHighlight
                                code={codeData.networkTroubleshooting.code}
                                language={codeData.networkTroubleshooting.language}
                                title={codeData.networkTroubleshooting.title}
                            />
                        )}
                        
                        <h3>性能监控</h3>
                        {codeData.networkMonitoring && (
                            <CodeHighlight
                                code={codeData.networkMonitoring.code}
                                language={codeData.networkMonitoring.language}
                                title={codeData.networkMonitoring.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="网络配置建议"
                            description={
                                <ul>
                                    <li>为不同的应用创建独立的网络</li>
                                    <li>使用自定义网络而非默认bridge网络</li>
                                    <li>合理规划IP地址段，避免冲突</li>
                                    <li>为容器设置有意义的网络别名</li>
                                    <li>定期清理不使用的网络</li>
                                    <li>监控网络性能和连接状态</li>
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
                                    <li><strong>网络隔离</strong>：将前端和后端服务分离到不同网络</li>
                                    <li><strong>最小权限</strong>：只暴露必要的端口</li>
                                    <li><strong>加密通信</strong>：在生产环境使用TLS加密</li>
                                    <li><strong>访问控制</strong>：使用防火墙规则限制访问</li>
                                    <li><strong>监控审计</strong>：记录网络访问日志</li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化"
                            description={
                                <ul>
                                    <li><strong>网络驱动选择</strong>：根据场景选择合适的网络驱动</li>
                                    <li><strong>DNS优化</strong>：配置合适的DNS解析</li>
                                    <li><strong>连接池</strong>：使用连接池减少连接开销</li>
                                    <li><strong>负载均衡</strong>：合理分配网络流量</li>
                                    <li><strong>缓存策略</strong>：减少不必要的网络请求</li>
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

export default NetworkingDetail
