import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PerformanceOptimizationDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'performance-optimization')

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
                    <ThunderboltOutlined /> Docker 性能优化
                </h1>
                <p>掌握Docker容器性能优化技术和最佳实践</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 性能优化概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>性能优化的重要性</h3>
                        <p>
                            Docker容器的性能优化对于生产环境至关重要。
                            通过合理的配置和优化策略，可以显著提升应用性能，
                            降低资源消耗，提高系统的整体效率。
                        </p>

                        <h3>优化维度</h3>
                        <div className={styles.optimization_areas}>
                            <Tag color="blue">镜像优化</Tag>
                            <Tag color="green">资源管理</Tag>
                            <Tag color="orange">网络优化</Tag>
                            <Tag color="red">存储优化</Tag>
                            <Tag color="purple">监控调优</Tag>
                        </div>

                        <h3>性能指标</h3>
                        <ul>
                            <li>
                                <strong>启动时间</strong>：容器启动到可用的时间
                            </li>
                            <li>
                                <strong>资源利用率</strong>：CPU、内存、磁盘使用效率
                            </li>
                            <li>
                                <strong>网络延迟</strong>：网络通信的响应时间
                            </li>
                            <li>
                                <strong>吞吐量</strong>：单位时间内处理的请求数
                            </li>
                            <li>
                                <strong>扩缩容速度</strong>：弹性伸缩的响应时间
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 镜像优化 */}
                <Card title="🖼️ 镜像性能优化" className={styles.content_card}>
                    <div className={styles.image_optimization}>
                        <h3>镜像大小优化</h3>
                        {codeData.imageSizeOptimization && (
                            <CodeHighlight
                                code={codeData.imageSizeOptimization.code}
                                language={codeData.imageSizeOptimization.language}
                                title={codeData.imageSizeOptimization.title}
                            />
                        )}

                        <h3>层缓存优化</h3>
                        {codeData.layerCacheOptimization && (
                            <CodeHighlight
                                code={codeData.layerCacheOptimization.code}
                                language={codeData.layerCacheOptimization.language}
                                title={codeData.layerCacheOptimization.title}
                            />
                        )}

                        <h3>多阶段构建</h3>
                        {codeData.multistageBuilds && (
                            <CodeHighlight
                                code={codeData.multistageBuilds.code}
                                language={codeData.multistageBuilds.language}
                                title={codeData.multistageBuilds.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 资源管理 */}
                <Card title="⚡ 容器资源优化" className={styles.content_card}>
                    <div className={styles.resource_optimization}>
                        <h3>CPU 优化</h3>
                        {codeData.cpuOptimization && (
                            <CodeHighlight
                                code={codeData.cpuOptimization.code}
                                language={codeData.cpuOptimization.language}
                                title={codeData.cpuOptimization.title}
                            />
                        )}

                        <h3>内存优化</h3>
                        {codeData.memoryOptimization && (
                            <CodeHighlight
                                code={codeData.memoryOptimization.code}
                                language={codeData.memoryOptimization.language}
                                title={codeData.memoryOptimization.title}
                            />
                        )}

                        <h3>磁盘I/O优化</h3>
                        {codeData.diskIOOptimization && (
                            <CodeHighlight
                                code={codeData.diskIOOptimization.code}
                                language={codeData.diskIOOptimization.language}
                                title={codeData.diskIOOptimization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 网络优化 */}
                <Card title="🌐 网络性能优化" className={styles.content_card}>
                    <div className={styles.network_optimization}>
                        <h3>网络模式选择</h3>
                        {codeData.networkModeOptimization && (
                            <CodeHighlight
                                code={codeData.networkModeOptimization.code}
                                language={codeData.networkModeOptimization.language}
                                title={codeData.networkModeOptimization.title}
                            />
                        )}

                        <h3>负载均衡优化</h3>
                        {codeData.loadBalancingOptimization && (
                            <CodeHighlight
                                code={codeData.loadBalancingOptimization.code}
                                language={codeData.loadBalancingOptimization.language}
                                title={codeData.loadBalancingOptimization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 存储优化 */}
                <Card title="💾 存储性能优化" className={styles.content_card}>
                    <div className={styles.storage_optimization}>
                        <h3>存储驱动选择</h3>
                        {codeData.storageDriverOptimization && (
                            <CodeHighlight
                                code={codeData.storageDriverOptimization.code}
                                language={codeData.storageDriverOptimization.language}
                                title={codeData.storageDriverOptimization.title}
                            />
                        )}

                        <h3>卷性能优化</h3>
                        {codeData.volumePerformanceOptimization && (
                            <CodeHighlight
                                code={codeData.volumePerformanceOptimization.code}
                                language={codeData.volumePerformanceOptimization.language}
                                title={codeData.volumePerformanceOptimization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 监控与调优 */}
                <Card title="📊 性能监控与调优" className={styles.content_card}>
                    <div className={styles.monitoring_section}>
                        <h3>性能监控工具</h3>
                        {codeData.performanceMonitoring && (
                            <CodeHighlight
                                code={codeData.performanceMonitoring.code}
                                language={codeData.performanceMonitoring.language}
                                title={codeData.performanceMonitoring.title}
                            />
                        )}

                        <h3>性能分析与调优</h3>
                        {codeData.performanceAnalysis && (
                            <CodeHighlight
                                code={codeData.performanceAnalysis.code}
                                language={codeData.performanceAnalysis.language}
                                title={codeData.performanceAnalysis.title}
                            />
                        )}

                        <h3>自动化调优</h3>
                        {codeData.automatedTuning && (
                            <CodeHighlight
                                code={codeData.automatedTuning.code}
                                language={codeData.automatedTuning.language}
                                title={codeData.automatedTuning.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 性能优化最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="镜像优化建议"
                            description={
                                <ul>
                                    <li>使用Alpine Linux等轻量级基础镜像</li>
                                    <li>利用多阶段构建减少镜像大小</li>
                                    <li>合理安排Dockerfile指令顺序</li>
                                    <li>使用.dockerignore排除不必要文件</li>
                                    <li>定期清理镜像层和缓存</li>
                                    <li>使用镜像压缩和优化工具</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="资源管理建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>CPU限制</strong>：设置合适的CPU限制和预留
                                    </li>
                                    <li>
                                        <strong>内存管理</strong>：避免内存泄漏和OOM
                                    </li>
                                    <li>
                                        <strong>磁盘I/O</strong>：使用SSD和优化存储驱动
                                    </li>
                                    <li>
                                        <strong>资源监控</strong>：实时监控资源使用情况
                                    </li>
                                    <li>
                                        <strong>弹性伸缩</strong>：根据负载自动调整资源
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="网络与存储优化"
                            description={
                                <ul>
                                    <li>
                                        <strong>网络模式</strong>：根据场景选择合适的网络模式
                                    </li>
                                    <li>
                                        <strong>负载均衡</strong>：使用高效的负载均衡策略
                                    </li>
                                    <li>
                                        <strong>存储驱动</strong>：选择性能最佳的存储驱动
                                    </li>
                                    <li>
                                        <strong>缓存策略</strong>：合理使用缓存减少I/O
                                    </li>
                                    <li>
                                        <strong>连接池</strong>：使用连接池减少连接开销
                                    </li>
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

export default PerformanceOptimizationDetail
