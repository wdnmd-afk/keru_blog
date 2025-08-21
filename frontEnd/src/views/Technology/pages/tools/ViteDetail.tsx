import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ThunderboltOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    RocketOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const ViteDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'vite')
    
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
                <h1><ThunderboltOutlined /> Vite 构建工具</h1>
                <p>下一代前端构建工具，极速的开发体验</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 Vite 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是 Vite</h3>
                        <p>
                            Vite 是一个现代化的前端构建工具，由 Vue.js 作者尤雨溪开发。
                            它利用浏览器原生 ES 模块支持和现代 JavaScript 工具，
                            提供极速的开发服务器启动和热更新体验。
                        </p>

                        <h3>核心特性</h3>
                        <div className={styles.features}>
                            <Tag color="blue">极速冷启动</Tag>
                            <Tag color="green">即时热更新</Tag>
                            <Tag color="orange">真正的按需编译</Tag>
                            <Tag color="red">丰富的插件生态</Tag>
                            <Tag color="purple">优化的构建</Tag>
                        </div>

                        <h3>主要优势</h3>
                        <ul>
                            <li><strong>开发速度</strong>：利用原生 ESM 实现极速启动</li>
                            <li><strong>热更新</strong>：基于 ESM 的 HMR，更新速度不受应用大小影响</li>
                            <li><strong>开箱即用</strong>：内置支持 TypeScript、JSX、CSS 等</li>
                            <li><strong>插件生态</strong>：兼容 Rollup 插件，生态丰富</li>
                            <li><strong>生产优化</strong>：基于 Rollup 的优化构建</li>
                        </ul>
                    </div>
                </Card>

                {/* 快速开始 */}
                <Card title="🚀 快速开始" className={styles.content_card}>
                    <div className={styles.quick_start}>
                        <h3>创建项目</h3>
                        {codeData.quickStart && (
                            <CodeHighlight
                                code={codeData.quickStart.code}
                                language={codeData.quickStart.language}
                                title={codeData.quickStart.title}
                            />
                        )}
                        
                        <h3>项目结构</h3>
                        {codeData.projectStructure && (
                            <CodeHighlight
                                code={codeData.projectStructure.code}
                                language={codeData.projectStructure.language}
                                title={codeData.projectStructure.title}
                            />
                        )}
                        
                        <h3>基本配置</h3>
                        {codeData.basicConfig && (
                            <CodeHighlight
                                code={codeData.basicConfig.code}
                                language={codeData.basicConfig.language}
                                title={codeData.basicConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 插件系统 */}
                <Card title="🔌 插件系统" className={styles.content_card}>
                    <div className={styles.plugins_section}>
                        <h3>官方插件</h3>
                        {codeData.officialPlugins && (
                            <CodeHighlight
                                code={codeData.officialPlugins.code}
                                language={codeData.officialPlugins.language}
                                title={codeData.officialPlugins.title}
                            />
                        )}
                        
                        <h3>社区插件</h3>
                        {codeData.communityPlugins && (
                            <CodeHighlight
                                code={codeData.communityPlugins.code}
                                language={codeData.communityPlugins.language}
                                title={codeData.communityPlugins.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 开发体验 */}
                <Card title="🛠️ 开发体验优化" className={styles.content_card}>
                    <div className={styles.dev_experience}>
                        <h3>热模块替换 (HMR)</h3>
                        {codeData.hmrApi && (
                            <CodeHighlight
                                code={codeData.hmrApi.code}
                                language={codeData.hmrApi.language}
                                title={codeData.hmrApi.title}
                            />
                        )}
                        
                        <h3>环境变量</h3>
                        {codeData.environmentVariables && (
                            <CodeHighlight
                                code={codeData.environmentVariables.code}
                                language={codeData.environmentVariables.language}
                                title={codeData.environmentVariables.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 构建优化 */}
                <Card title="📦 构建优化" className={styles.content_card}>
                    <div className={styles.build_optimization}>
                        <h3>构建配置</h3>
                        {codeData.buildOptimization && (
                            <CodeHighlight
                                code={codeData.buildOptimization.code}
                                language={codeData.buildOptimization.language}
                                title={codeData.buildOptimization.title}
                            />
                        )}
                        
                        <h3>代码分割</h3>
                        {codeData.codeSplitting && (
                            <CodeHighlight
                                code={codeData.codeSplitting.code}
                                language={codeData.codeSplitting.language}
                                title={codeData.codeSplitting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 性能优化 */}
                <Card title="⚡ 性能优化" className={styles.content_card}>
                    <div className={styles.performance_section}>
                        <h3>性能优化技巧</h3>
                        {codeData.performanceOptimization && (
                            <CodeHighlight
                                code={codeData.performanceOptimization.code}
                                language={codeData.performanceOptimization.language}
                                title={codeData.performanceOptimization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="Vite 使用建议"
                            description={
                                <ul>
                                    <li>充分利用 ESM 的优势，避免不必要的打包</li>
                                    <li>合理配置预构建，优化第三方依赖</li>
                                    <li>使用环境变量管理不同环境的配置</li>
                                    <li>利用代码分割优化加载性能</li>
                                    <li>选择合适的插件提升开发效率</li>
                                    <li>定期更新 Vite 版本获得最新优化</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="Vite vs Webpack"
                            description={
                                <ul>
                                    <li><strong>开发速度</strong>：Vite 开发环境启动更快</li>
                                    <li><strong>热更新</strong>：Vite HMR 速度不受项目大小影响</li>
                                    <li><strong>配置复杂度</strong>：Vite 配置更简单直观</li>
                                    <li><strong>生态成熟度</strong>：Webpack 生态更成熟</li>
                                    <li><strong>生产构建</strong>：两者都基于成熟的打包工具</li>
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

export default ViteDetail
