import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, ChromeOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ChromeDevToolsDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'chrome-devtools')

    const handleBack = () => {
        navigate('/technology/tools')
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
                    返回工具
                </Button>
                <h1>
                    <ChromeOutlined /> Chrome DevTools
                </h1>
                <p>掌握Chrome开发者工具，提升前端调试和性能优化能力</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 DevTools 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是 Chrome DevTools</h3>
                        <p>
                            Chrome DevTools 是一套内置在 Chrome 浏览器中的 Web 开发和调试工具。
                            它提供了丰富的功能来帮助开发者检查、调试和优化网页应用。
                        </p>

                        <h3>主要面板</h3>
                        <div className={styles.panels}>
                            <Tag color="blue">Elements</Tag>
                            <Tag color="green">Console</Tag>
                            <Tag color="orange">Sources</Tag>
                            <Tag color="red">Network</Tag>
                            <Tag color="purple">Performance</Tag>
                            <Tag color="cyan">Memory</Tag>
                            <Tag color="gold">Application</Tag>
                            <Tag color="lime">Security</Tag>
                        </div>

                        <h3>快捷键</h3>
                        {codeData.shortcuts && (
                            <CodeHighlight
                                code={codeData.shortcuts.code}
                                language={codeData.shortcuts.language}
                                title={codeData.shortcuts.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Elements面板 */}
                <Card title="🔍 Elements 面板详解" className={styles.content_card}>
                    <div className={styles.elements_section}>
                        <h3>DOM检查与修改</h3>
                        {codeData.elementsPanel && (
                            <CodeHighlight
                                code={codeData.elementsPanel.code}
                                language={codeData.elementsPanel.language}
                                title={codeData.elementsPanel.title}
                            />
                        )}

                        <h3>CSS样式调试</h3>
                        {codeData.stylesDebugging && (
                            <CodeHighlight
                                code={codeData.stylesDebugging.code}
                                language={codeData.stylesDebugging.language}
                                title={codeData.stylesDebugging.title}
                            />
                        )}

                        <h3>响应式设计调试</h3>
                        {codeData.responsiveDesign && (
                            <CodeHighlight
                                code={codeData.responsiveDesign.code}
                                language={codeData.responsiveDesign.language}
                                title={codeData.responsiveDesign.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Console面板 */}
                <Card title="📝 Console 面板详解" className={styles.content_card}>
                    <div className={styles.console_section}>
                        <h3>Console API详解</h3>
                        {codeData.consoleAPI && (
                            <CodeHighlight
                                code={codeData.consoleAPI.code}
                                language={codeData.consoleAPI.language}
                                title={codeData.consoleAPI.title}
                            />
                        )}

                        <h3>Console实用工具</h3>
                        {codeData.consoleUtilities && (
                            <CodeHighlight
                                code={codeData.consoleUtilities.code}
                                language={codeData.consoleUtilities.language}
                                title={codeData.consoleUtilities.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Sources调试 */}
                <Card title="📁 Sources 调试详解" className={styles.content_card}>
                    <div className={styles.sources_section}>
                        <h3>断点调试</h3>
                        {codeData.breakpointDebugging && (
                            <CodeHighlight
                                code={codeData.breakpointDebugging.code}
                                language={codeData.breakpointDebugging.language}
                                title={codeData.breakpointDebugging.title}
                            />
                        )}

                        <h3>变量监视与作用域</h3>
                        {codeData.variableWatching && (
                            <CodeHighlight
                                code={codeData.variableWatching.code}
                                language={codeData.variableWatching.language}
                                title={codeData.variableWatching.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Network面板 */}
                <Card title="🌐 Network 网络分析" className={styles.content_card}>
                    <div className={styles.network_section}>
                        <h3>网络请求分析</h3>
                        {codeData.networkAnalysis && (
                            <CodeHighlight
                                code={codeData.networkAnalysis.code}
                                language={codeData.networkAnalysis.language}
                                title={codeData.networkAnalysis.title}
                            />
                        )}

                        <h3>性能优化分析</h3>
                        {codeData.performanceOptimization && (
                            <CodeHighlight
                                code={codeData.performanceOptimization.code}
                                language={codeData.performanceOptimization.language}
                                title={codeData.performanceOptimization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Performance面板 */}
                <Card title="⚡ Performance 性能分析" className={styles.content_card}>
                    <div className={styles.performance_section}>
                        <h3>性能录制与分析</h3>
                        {codeData.performanceRecording && (
                            <CodeHighlight
                                code={codeData.performanceRecording.code}
                                language={codeData.performanceRecording.language}
                                title={codeData.performanceRecording.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="DevTools 使用技巧"
                            description={
                                <ul>
                                    <li>熟练掌握快捷键，提升调试效率</li>
                                    <li>善用Console面板的各种API和工具函数</li>
                                    <li>利用断点调试深入理解代码执行流程</li>
                                    <li>使用Network面板优化资源加载性能</li>
                                    <li>通过Performance面板识别性能瓶颈</li>
                                    <li>结合Elements面板调试CSS布局问题</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="调试最佳实践"
                            description={
                                <ul>
                                    <li>使用条件断点减少无效暂停</li>
                                    <li>善用Watch面板监视关键变量</li>
                                    <li>利用Console执行代码测试修复方案</li>
                                    <li>使用Performance面板分析运行时性能</li>
                                    <li>通过Network面板优化加载策略</li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>减少HTTP请求</strong>：合并资源文件
                                    </li>
                                    <li>
                                        <strong>启用压缩</strong>：Gzip/Brotli压缩
                                    </li>
                                    <li>
                                        <strong>优化图片</strong>：使用现代图片格式
                                    </li>
                                    <li>
                                        <strong>代码分割</strong>：按需加载资源
                                    </li>
                                    <li>
                                        <strong>缓存策略</strong>：合理设置缓存头
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

export default ChromeDevToolsDetail
