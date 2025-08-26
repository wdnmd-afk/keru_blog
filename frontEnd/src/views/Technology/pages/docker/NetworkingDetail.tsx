import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, GlobalOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Spin, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NetworkingDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'networking')

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
                    <GlobalOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker 网络深度解析</h1>
                    <p>掌握Docker容器网络配置、管理和优化，构建高效安全的容器网络架构</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">容器网络</Tag>
                        <Tag color="green">网络配置</Tag>
                        <Tag color="orange">安全隔离</Tag>
                        <Tag color="purple">性能优化</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 Docker 网络基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Docker网络？</h3>
                        <p>
                            Docker网络是容器化应用程序通信的基础设施。它提供了多种网络模式和驱动程序，
                            使容器能够安全、高效地相互通信，同时保持适当的隔离性和可扩展性。
                        </p>

                        <h3>网络驱动类型</h3>
                        <div className={styles.network_types}>
                            <Tag color="blue">bridge (桥接)</Tag>
                            <Tag color="green">host (主机)</Tag>
                            <Tag color="orange">none (无网络)</Tag>
                            <Tag color="red">overlay (覆盖)</Tag>
                            <Tag color="purple">macvlan (MAC虚拟)</Tag>
                        </div>

                        <h3>核心优势</h3>
                        <ul>
                            <li>
                                <strong>网络隔离</strong>：不同网络间的容器默认隔离，提供安全边界
                            </li>
                            <li>
                                <strong>服务发现</strong>：同网络容器可通过名称自动发现和通信
                            </li>
                            <li>
                                <strong>动态配置</strong>：支持运行时动态添加和移除网络连接
                            </li>
                            <li>
                                <strong>多主机支持</strong>：overlay网络支持跨主机容器通信
                            </li>
                        </ul>

                        <h3>网络模式详解</h3>
                        {codeData.networkModes && (
                            <CodeHighlight
                                code={codeData.networkModes.code}
                                language={codeData.networkModes.language}
                                title={codeData.networkModes.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 自定义网络配置 */}
                <Card title="🛠️ 自定义网络配置" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 自定义网络创建</h4>
                            {codeData.customNetworks && (
                                <CodeHighlight
                                    code={codeData.customNetworks.code}
                                    language={codeData.customNetworks.language}
                                    title={codeData.customNetworks.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 容器间通信配置</h4>
                            {codeData.containerCommunication && (
                                <CodeHighlight
                                    code={codeData.containerCommunication.code}
                                    language={codeData.containerCommunication.language}
                                    title={codeData.containerCommunication.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 端口映射与暴露</h4>
                            {codeData.portMapping && (
                                <CodeHighlight
                                    code={codeData.portMapping.code}
                                    language={codeData.portMapping.language}
                                    title={codeData.portMapping.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 网络安全与优化 */}
                <Card title="🔒 网络安全与性能优化" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>4. 网络安全配置</h4>
                            {codeData.networkSecurity && (
                                <CodeHighlight
                                    code={codeData.networkSecurity.code}
                                    language={codeData.networkSecurity.language}
                                    title={codeData.networkSecurity.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>5. 网络故障排查</h4>
                            {codeData.troubleshooting && (
                                <CodeHighlight
                                    code={codeData.troubleshooting.code}
                                    language={codeData.troubleshooting.language}
                                    title={codeData.troubleshooting.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>6. 性能优化策略</h4>
                            {codeData.performanceOptimization && (
                                <CodeHighlight
                                    code={codeData.performanceOptimization.code}
                                    language={codeData.performanceOptimization.language}
                                    title={codeData.performanceOptimization.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 设计原则与最佳实践 */}
                <Card title="🎨 设计原则与最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 网络隔离原则</h4>
                                <p>为不同的应用层级创建独立的网络，实现安全隔离和访问控制</p>
                                <CodeHighlight
                                    code={`# ✅ 好的设计 - 分层网络隔离
# 前端网络
docker network create frontend-network

# 后端网络
docker network create backend-network

# 数据库网络（内部）
docker network create --internal database-network

# 前端服务只连接前端网络
docker run -d --name nginx --network frontend-network nginx

# 应用服务连接前端和后端网络
docker run -d --name app --network backend-network myapp
docker network connect frontend-network app

# 数据库只连接内部网络
docker run -d --name db --network database-network postgres
docker network connect backend-network db

# ❌ 不好的设计 - 所有服务在同一网络
docker run -d --name nginx nginx
docker run -d --name app myapp
docker run -d --name db postgres
# 所有服务都在默认bridge网络，缺乏隔离`}
                                    language="bash"
                                    title="网络隔离设计示例"
                                />
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 服务发现与命名</h4>
                                <p>使用有意义的容器名称和网络别名，便于服务发现和维护</p>
                                <CodeHighlight
                                    code={`# ✅ 推荐 - 清晰的命名和别名
docker run -d \\
  --name user-service \\
  --network app-network \\
  --network-alias users \\
  user-service:latest

docker run -d \\
  --name order-service \\
  --network app-network \\
  --network-alias orders \\
  -e USER_SERVICE_URL=http://users:3000 \\
  order-service:latest

# ❌ 不推荐 - 模糊的命名
docker run -d --name app1 service:latest
docker run -d --name app2 service:latest
# 难以识别服务功能和依赖关系`}
                                    language="bash"
                                    title="服务命名最佳实践"
                                />
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 端口管理策略</h4>
                                <p>合理规划端口映射，避免端口冲突，提供清晰的服务访问方式</p>
                                <CodeHighlight
                                    code={`# ✅ 好的端口管理
# 使用标准端口映射
docker run -d -p 80:80 --name web nginx
docker run -d -p 443:443 --name web-ssl nginx

# 为不同环境使用不同端口段
# 开发环境: 8000-8099
docker run -d -p 8080:80 --name dev-web nginx

# 测试环境: 8100-8199
docker run -d -p 8180:80 --name test-web nginx

# 生产环境: 80, 443
docker run -d -p 80:80 -p 443:443 --name prod-web nginx

# 内部服务不暴露端口
docker run -d --name internal-service \\
  --network backend-network \\
  internal-service:latest

# ❌ 避免的做法
# 随意的端口映射
docker run -d -p 12345:80 nginx
docker run -d -p 54321:3000 myapp`}
                                    language="bash"
                                    title="端口管理策略"
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 生产环境建议 */}
                <Card title="🚀 生产环境部署建议" className={styles.content_card}>
                    <div className="f-ic">
                        <Alert
                            message="网络架构设计"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        <strong>分层网络</strong>：前端、应用、数据库分层隔离
                                    </li>
                                    <li>
                                        <strong>负载均衡</strong>：使用Nginx或HAProxy进行流量分发
                                    </li>
                                    <li>
                                        <strong>服务网格</strong>：考虑使用Istio等服务网格解决方案
                                    </li>
                                    <li>
                                        <strong>监控告警</strong>：部署网络监控和性能告警系统
                                    </li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Alert
                            message="安全加固措施"
                            className={'h-50 flex-1 mx-5'}
                            description={
                                <ul>
                                    <li>
                                        <strong>网络隔离</strong>：使用内部网络隔离敏感服务
                                    </li>
                                    <li>
                                        <strong>TLS加密</strong>：所有外部通信使用HTTPS/TLS
                                    </li>
                                    <li>
                                        <strong>访问控制</strong>：实施严格的防火墙规则
                                    </li>
                                    <li>
                                        <strong>安全扫描</strong>：定期进行网络安全漏洞扫描
                                    </li>
                                    <li>
                                        <strong>日志审计</strong>：记录和分析网络访问日志
                                    </li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Alert
                            message="性能优化策略"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        <strong>网络驱动</strong>：根据场景选择最优网络驱动
                                    </li>
                                    <li>
                                        <strong>连接池</strong>：配置合适的数据库连接池大小
                                    </li>
                                    <li>
                                        <strong>缓存策略</strong>：使用Redis等缓存减少网络请求
                                    </li>
                                    <li>
                                        <strong>CDN加速</strong>：静态资源使用CDN分发
                                    </li>
                                    <li>
                                        <strong>压缩传输</strong>：启用gzip等压缩算法
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

export default NetworkingDetail
