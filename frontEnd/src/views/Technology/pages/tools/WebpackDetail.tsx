import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    BuildOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    SettingOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const WebpackDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'webpack')
    
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
                <h1><BuildOutlined /> Webpack 构建工具</h1>
                <p>学习现代前端构建工具Webpack的配置和优化技巧</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 Webpack 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是 Webpack</h3>
                        <p>
                            Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。
                            它将项目中的所有资源（JavaScript、CSS、图片等）视为模块，
                            并根据依赖关系将它们打包成一个或多个 bundle。
                        </p>

                        <h3>核心概念</h3>
                        <div className={styles.concepts}>
                            <Tag color="blue">Entry（入口）</Tag>
                            <Tag color="green">Output（输出）</Tag>
                            <Tag color="orange">Loaders（加载器）</Tag>
                            <Tag color="red">Plugins（插件）</Tag>
                            <Tag color="purple">Mode（模式）</Tag>
                        </div>

                        <h3>主要优势</h3>
                        <ul>
                            <li><strong>模块化</strong>：支持 ES6、CommonJS、AMD 等模块系统</li>
                            <li><strong>代码分割</strong>：按需加载，优化性能</li>
                            <li><strong>资源处理</strong>：统一处理各种类型的资源</li>
                            <li><strong>开发体验</strong>：热模块替换、开发服务器</li>
                            <li><strong>生产优化</strong>：压缩、Tree Shaking、缓存</li>
                        </ul>
                    </div>
                </Card>

                {/* 基础配置 */}
                <Card title="⚙️ 基础配置" className={styles.content_card}>
                    <div className={styles.basic_config}>
                        <h3>基本配置文件</h3>
                        {codeData.basicConfig && (
                            <CodeHighlight
                                code={codeData.basicConfig.code}
                                language={codeData.basicConfig.language}
                                title={codeData.basicConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 加载器 */}
                <Card title="🔄 加载器 (Loaders)" className={styles.content_card}>
                    <div className={styles.loaders_section}>
                        <h3>常用加载器配置</h3>
                        {codeData.loaders && (
                            <CodeHighlight
                                code={codeData.loaders.code}
                                language={codeData.loaders.language}
                                title={codeData.loaders.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 插件 */}
                <Card title="🔌 插件 (Plugins)" className={styles.content_card}>
                    <div className={styles.plugins_section}>
                        <h3>常用插件配置</h3>
                        {codeData.plugins && (
                            <CodeHighlight
                                code={codeData.plugins.code}
                                language={codeData.plugins.language}
                                title={codeData.plugins.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 优化配置 */}
                <Card title="🚀 优化配置" className={styles.content_card}>
                    <div className={styles.optimization_section}>
                        <h3>代码分割与压缩</h3>
                        {codeData.optimization && (
                            <CodeHighlight
                                code={codeData.optimization.code}
                                language={codeData.optimization.language}
                                title={codeData.optimization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 开发服务器 */}
                <Card title="🛠️ 开发服务器" className={styles.content_card}>
                    <div className={styles.dev_server_section}>
                        <h3>DevServer 配置</h3>
                        {codeData.devServer && (
                            <CodeHighlight
                                code={codeData.devServer.code}
                                language={codeData.devServer.language}
                                title={codeData.devServer.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 多入口配置 */}
                <Card title="🎯 多入口配置" className={styles.content_card}>
                    <div className={styles.multiple_entries_section}>
                        <h3>多页面应用配置</h3>
                        {codeData.multipleEntries && (
                            <CodeHighlight
                                code={codeData.multipleEntries.code}
                                language={codeData.multipleEntries.language}
                                title={codeData.multipleEntries.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 生产环境 */}
                <Card title="🏭 生产环境配置" className={styles.content_card}>
                    <div className={styles.production_section}>
                        <h3>生产环境优化</h3>
                        {codeData.productionConfig && (
                            <CodeHighlight
                                code={codeData.productionConfig.code}
                                language={codeData.productionConfig.language}
                                title={codeData.productionConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 性能优化 */}
                <Card title="⚡ 性能优化" className={styles.content_card}>
                    <div className={styles.performance_section}>
                        <h3>性能优化技巧</h3>
                        {codeData.performance && (
                            <CodeHighlight
                                code={codeData.performance.code}
                                language={codeData.performance.language}
                                title={codeData.performance.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="Webpack 配置建议"
                            description={
                                <ul>
                                    <li>根据环境分离配置文件（开发/生产）</li>
                                    <li>合理使用代码分割减少包体积</li>
                                    <li>启用缓存提高构建速度</li>
                                    <li>使用 Tree Shaking 移除无用代码</li>
                                    <li>配置合适的 source map</li>
                                    <li>监控 bundle 大小和性能</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="常见问题解决"
                            description={
                                <ul>
                                    <li><strong>构建速度慢</strong>：使用缓存、减少文件监听范围</li>
                                    <li><strong>包体积大</strong>：代码分割、Tree Shaking、压缩</li>
                                    <li><strong>热更新失效</strong>：检查 HMR 配置和文件路径</li>
                                    <li><strong>内存溢出</strong>：增加 Node.js 内存限制</li>
                                    <li><strong>路径问题</strong>：配置正确的 publicPath</li>
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

export default WebpackDetail
