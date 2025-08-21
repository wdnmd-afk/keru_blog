import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    DatabaseOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const ModulesDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('NodeJS', 'modules')
    
    const handleBack = () => {
        navigate('/technology/nodejs')
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
                    返回NodeJS
                </Button>
                <h1><DatabaseOutlined /> Node.js 模块系统</h1>
                <p>深入了解Node.js的模块系统，包括CommonJS、ES Modules和包管理</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 模块系统概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是模块</h3>
                        <p>
                            模块是可重用的代码块，其功能被封装起来，可以在其他模块中导入和使用。
                            Node.js支持多种模块系统，主要包括CommonJS和ES Modules。
                        </p>

                        <h3>模块系统的优势</h3>
                        <ul>
                            <li><strong>代码复用</strong>：避免重复编写相同的代码</li>
                            <li><strong>命名空间</strong>：避免全局变量污染</li>
                            <li><strong>依赖管理</strong>：明确模块间的依赖关系</li>
                            <li><strong>按需加载</strong>：只加载需要的功能</li>
                            <li><strong>团队协作</strong>：便于多人协作开发</li>
                        </ul>
                    </div>
                </Card>

                {/* 模块类型 */}
                <Card title="🔧 模块类型" className={styles.content_card}>
                    <div className={styles.module_types}>
                        <h3>CommonJS (CJS) - Node.js 默认模块系统</h3>
                        {codeData.commonjsBasic && (
                            <CodeHighlight
                                code={codeData.commonjsBasic.code}
                                language={codeData.commonjsBasic.language}
                                title={codeData.commonjsBasic.title}
                            />
                        )}
                        
                        <h3>ES Modules (ESM) - 现代模块系统</h3>
                        {codeData.esModules && (
                            <CodeHighlight
                                code={codeData.esModules.code}
                                language={codeData.esModules.language}
                                title={codeData.esModules.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 模块解析 */}
                <Card title="🔍 模块解析机制" className={styles.content_card}>
                    <div className={styles.resolution_section}>
                        <div className={styles.usage_item}>
                            <h4>模块解析算法</h4>
                            {codeData.moduleResolution && (
                                <CodeHighlight
                                    code={codeData.moduleResolution.code}
                                    language={codeData.moduleResolution.language}
                                    title={codeData.moduleResolution.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* Package.json */}
                <Card title="📄 Package.json 配置" className={styles.content_card}>
                    <div className={styles.package_section}>
                        <h3>基本配置</h3>
                        {codeData.packageJson && (
                            <CodeHighlight
                                code={codeData.packageJson.code}
                                language={codeData.packageJson.language}
                                title={codeData.packageJson.title}
                            />
                        )}
                    </div>
                </Card>

                {/* NPM 包管理 */}
                <Card title="📦 NPM 包管理" className={styles.content_card}>
                    <div className={styles.npm_section}>
                        <h3>依赖管理</h3>
                        {codeData.npmCommands && (
                            <CodeHighlight
                                code={codeData.npmCommands.code}
                                language={codeData.npmCommands.language}
                                title={codeData.npmCommands.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 自定义模块 */}
                <Card title="🛠️ 自定义模块开发" className={styles.content_card}>
                    <div className={styles.custom_modules}>
                        <h3>模块开发最佳实践</h3>
                        {codeData.customModules && (
                            <CodeHighlight
                                code={codeData.customModules.code}
                                language={codeData.customModules.language}
                                title={codeData.customModules.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="模块开发最佳实践"
                            description={
                                <ul>
                                    <li>保持模块的单一职责原则</li>
                                    <li>使用清晰的命名和文档</li>
                                    <li>合理组织模块结构</li>
                                    <li>遵循语义化版本控制</li>
                                    <li>避免循环依赖</li>
                                    <li>使用TypeScript增强类型安全</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化建议"
                            description={
                                <ul>
                                    <li>使用动态导入进行代码分割</li>
                                    <li>避免导入整个库，使用按需导入</li>
                                    <li>合理使用模块缓存</li>
                                    <li>定期清理未使用的依赖</li>
                                    <li>使用工具分析包大小</li>
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

export default ModulesDetail
