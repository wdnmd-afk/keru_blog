import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    DashboardOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    ThunderboltOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const PerformanceToolsDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'performance-tools')
    
    const handleBack = () => {
        navigate('/technology/tools')
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
                    返回工具
                </Button>
                <h1><DashboardOutlined /> 性能优化工具</h1>
                <p>掌握前端性能分析和优化工具，提升应用性能</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 性能工具概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>为什么需要性能优化</h3>
                        <p>
                            Web应用的性能直接影响用户体验和业务指标。
                            研究表明，页面加载时间每增加1秒，转化率就会下降7%。
                            性能优化工具帮助我们识别瓶颈，提升应用性能。
                        </p>

                        <h3>性能工具分类</h3>
                        <div className={styles.tool_categories}>
                            <Tag color="blue">浏览器工具</Tag>
                            <Tag color="green">性能审计</Tag>
                            <Tag color="orange">Bundle分析</Tag>
                            <Tag color="red">监控工具</Tag>
                            <Tag color="purple">压测工具</Tag>
                        </div>

                        <h3>关键性能指标</h3>
                        <ul>
                            <li><strong>FCP</strong>：首次内容绘制时间</li>
                            <li><strong>LCP</strong>：最大内容绘制时间</li>
                            <li><strong>FID</strong>：首次输入延迟</li>
                            <li><strong>CLS</strong>：累积布局偏移</li>
                            <li><strong>TTFB</strong>：首字节时间</li>
                        </ul>
                    </div>
                </Card>

                {/* Chrome DevTools */}
                <Card title="🔍 Chrome DevTools 性能分析" className={styles.content_card}>
                    <div className={styles.chrome_tools}>
                        <h3>Performance面板使用</h3>
                        {codeData.chromePerformance && (
                            <CodeHighlight
                                code={codeData.chromePerformance.code}
                                language={codeData.chromePerformance.language}
                                title={codeData.chromePerformance.title}
                            />
                        )}
                        
                        <h3>Memory面板内存分析</h3>
                        {codeData.memoryAnalysis && (
                            <CodeHighlight
                                code={codeData.memoryAnalysis.code}
                                language={codeData.memoryAnalysis.language}
                                title={codeData.memoryAnalysis.title}
                            />
                        )}
                        
                        <h3>Network面板网络优化</h3>
                        {codeData.networkOptimization && (
                            <CodeHighlight
                                code={codeData.networkOptimization.code}
                                language={codeData.networkOptimization.language}
                                title={codeData.networkOptimization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Lighthouse */}
                <Card title="🏮 Lighthouse 性能审计" className={styles.content_card}>
                    <div className={styles.lighthouse_section}>
                        <h3>Lighthouse使用指南</h3>
                        {codeData.lighthouseAudit && (
                            <CodeHighlight
                                code={codeData.lighthouseAudit.code}
                                language={codeData.lighthouseAudit.language}
                                title={codeData.lighthouseAudit.title}
                            />
                        )}
                        
                        <h3>Core Web Vitals优化</h3>
                        {codeData.coreWebVitals && (
                            <CodeHighlight
                                code={codeData.coreWebVitals.code}
                                language={codeData.coreWebVitals.language}
                                title={codeData.coreWebVitals.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Bundle分析 */}
                <Card title="📦 Bundle 分析工具" className={styles.content_card}>
                    <div className={styles.bundle_section}>
                        <h3>Bundle分析工具使用</h3>
                        {codeData.bundleAnalysis && (
                            <CodeHighlight
                                code={codeData.bundleAnalysis.code}
                                language={codeData.bundleAnalysis.language}
                                title={codeData.bundleAnalysis.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 性能优化最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="性能分析建议"
                            description={
                                <ul>
                                    <li>定期进行性能审计，建立性能基线</li>
                                    <li>关注Core Web Vitals指标</li>
                                    <li>使用真实用户数据进行性能监控</li>
                                    <li>在不同网络条件下测试性能</li>
                                    <li>分析Bundle大小，移除无用代码</li>
                                    <li>优化关键渲染路径</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化策略"
                            description={
                                <ul>
                                    <li><strong>资源优化</strong>：压缩、合并、懒加载</li>
                                    <li><strong>缓存策略</strong>：浏览器缓存、CDN缓存</li>
                                    <li><strong>代码分割</strong>：按需加载，减少初始包大小</li>
                                    <li><strong>图片优化</strong>：现代格式、响应式图片</li>
                                    <li><strong>服务端优化</strong>：SSR、预渲染、HTTP/2</li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="常见性能问题"
                            description={
                                <ul>
                                    <li><strong>JavaScript阻塞</strong>：长任务影响交互性</li>
                                    <li><strong>资源阻塞</strong>：CSS/JS阻塞渲染</li>
                                    <li><strong>内存泄漏</strong>：未清理的引用导致内存增长</li>
                                    <li><strong>布局抖动</strong>：频繁的重排重绘</li>
                                    <li><strong>网络延迟</strong>：资源加载时间过长</li>
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

export default PerformanceToolsDetail
