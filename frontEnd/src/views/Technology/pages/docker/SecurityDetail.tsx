import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CloudOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SecurityDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'security')

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
                <h1>
                    <CloudOutlined /> Docker 安全
                </h1>
                <p>掌握Docker容器安全最佳实践和防护策略</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 Docker 安全概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>容器安全的重要性</h3>
                        <p>
                            容器安全是现代应用部署的关键环节。Docker容器虽然提供了一定程度的隔离，
                            但仍需要采取多层防护策略来确保应用和数据的安全。
                        </p>

                        <h3>安全威胁类型</h3>
                        <div className={styles.threat_types}>
                            <Tag color="red">镜像漏洞</Tag>
                            <Tag color="orange">权限提升</Tag>
                            <Tag color="yellow">数据泄露</Tag>
                            <Tag color="blue">网络攻击</Tag>
                            <Tag color="purple">恶意代码</Tag>
                        </div>

                        <h3>安全防护层次</h3>
                        <ul>
                            <li>
                                <strong>镜像安全</strong>：安全的基础镜像和构建过程
                            </li>
                            <li>
                                <strong>运行时安全</strong>：容器运行时的权限控制
                            </li>
                            <li>
                                <strong>网络安全</strong>：网络隔离和访问控制
                            </li>
                            <li>
                                <strong>数据安全</strong>：敏感数据的保护和加密
                            </li>
                            <li>
                                <strong>监控审计</strong>：安全事件的监控和审计
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 镜像安全 */}
                <Card title="🖼️ 镜像安全管理" className={styles.content_card}>
                    <div className={styles.image_security}>
                        <h3>安全镜像构建</h3>
                        {codeData.secureImageBuilding && (
                            <CodeHighlight
                                code={codeData.secureImageBuilding.code}
                                language={codeData.secureImageBuilding.language}
                                title={codeData.secureImageBuilding.title}
                            />
                        )}

                        <h3>镜像漏洞扫描</h3>
                        {codeData.imageVulnerabilityScanning && (
                            <CodeHighlight
                                code={codeData.imageVulnerabilityScanning.code}
                                language={codeData.imageVulnerabilityScanning.language}
                                title={codeData.imageVulnerabilityScanning.title}
                            />
                        )}

                        <h3>镜像签名验证</h3>
                        {codeData.imageSignatureVerification && (
                            <CodeHighlight
                                code={codeData.imageSignatureVerification.code}
                                language={codeData.imageSignatureVerification.language}
                                title={codeData.imageSignatureVerification.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 运行时安全 */}
                <Card title="🏃 容器运行时安全" className={styles.content_card}>
                    <div className={styles.runtime_security}>
                        <h3>用户权限控制</h3>
                        {codeData.userPermissionControl && (
                            <CodeHighlight
                                code={codeData.userPermissionControl.code}
                                language={codeData.userPermissionControl.language}
                                title={codeData.userPermissionControl.title}
                            />
                        )}

                        <h3>资源限制与隔离</h3>
                        {codeData.resourceLimitsIsolation && (
                            <CodeHighlight
                                code={codeData.resourceLimitsIsolation.code}
                                language={codeData.resourceLimitsIsolation.language}
                                title={codeData.resourceLimitsIsolation.title}
                            />
                        )}

                        <h3>安全配置文件</h3>
                        {codeData.securityProfiles && (
                            <CodeHighlight
                                code={codeData.securityProfiles.code}
                                language={codeData.securityProfiles.language}
                                title={codeData.securityProfiles.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 网络安全 */}
                <Card title="🌐 网络安全配置" className={styles.content_card}>
                    <div className={styles.network_security}>
                        <h3>网络隔离</h3>
                        {codeData.networkIsolation && (
                            <CodeHighlight
                                code={codeData.networkIsolation.code}
                                language={codeData.networkIsolation.language}
                                title={codeData.networkIsolation.title}
                            />
                        )}

                        <h3>TLS加密通信</h3>
                        {codeData.tlsEncryption && (
                            <CodeHighlight
                                code={codeData.tlsEncryption.code}
                                language={codeData.tlsEncryption.language}
                                title={codeData.tlsEncryption.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 密钥管理 */}
                <Card title="🔐 密钥与配置管理" className={styles.content_card}>
                    <div className={styles.secrets_management}>
                        <h3>Docker Secrets</h3>
                        {codeData.dockerSecrets && (
                            <CodeHighlight
                                code={codeData.dockerSecrets.code}
                                language={codeData.dockerSecrets.language}
                                title={codeData.dockerSecrets.title}
                            />
                        )}

                        <h3>环境变量安全</h3>
                        {codeData.environmentVariableSecurity && (
                            <CodeHighlight
                                code={codeData.environmentVariableSecurity.code}
                                language={codeData.environmentVariableSecurity.language}
                                title={codeData.environmentVariableSecurity.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 安全监控 */}
                <Card title="📊 安全监控与审计" className={styles.content_card}>
                    <div className={styles.security_monitoring}>
                        <h3>运行时安全监控</h3>
                        {codeData.runtimeSecurityMonitoring && (
                            <CodeHighlight
                                code={codeData.runtimeSecurityMonitoring.code}
                                language={codeData.runtimeSecurityMonitoring.language}
                                title={codeData.runtimeSecurityMonitoring.title}
                            />
                        )}

                        <h3>日志审计</h3>
                        {codeData.logAuditing && (
                            <CodeHighlight
                                code={codeData.logAuditing.code}
                                language={codeData.logAuditing.language}
                                title={codeData.logAuditing.title}
                            />
                        )}

                        <h3>合规性检查</h3>
                        {codeData.complianceChecking && (
                            <CodeHighlight
                                code={codeData.complianceChecking.code}
                                language={codeData.complianceChecking.language}
                                title={codeData.complianceChecking.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 安全最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="镜像安全建议"
                            description={
                                <ul>
                                    <li>使用官方或可信的基础镜像</li>
                                    <li>定期更新基础镜像和依赖包</li>
                                    <li>使用多阶段构建减少攻击面</li>
                                    <li>定期扫描镜像漏洞</li>
                                    <li>使用镜像签名验证完整性</li>
                                    <li>避免在镜像中包含敏感信息</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="运行时安全建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>最小权限原则</strong>：以非root用户运行容器
                                    </li>
                                    <li>
                                        <strong>资源限制</strong>：设置CPU和内存限制
                                    </li>
                                    <li>
                                        <strong>网络隔离</strong>：使用自定义网络隔离容器
                                    </li>
                                    <li>
                                        <strong>只读文件系统</strong>：使用只读根文件系统
                                    </li>
                                    <li>
                                        <strong>禁用特权模式</strong>：避免使用--privileged
                                    </li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="监控与审计建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>实时监控</strong>：部署运行时安全监控工具
                                    </li>
                                    <li>
                                        <strong>日志收集</strong>：集中收集和分析安全日志
                                    </li>
                                    <li>
                                        <strong>异常检测</strong>：监控异常行为和访问模式
                                    </li>
                                    <li>
                                        <strong>合规检查</strong>：定期进行安全合规性检查
                                    </li>
                                    <li>
                                        <strong>事件响应</strong>：建立安全事件响应流程
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

export default SecurityDetail
