import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { AppstoreOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ModulesDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'modulesDetail')

    const handleBack = () => {
        navigate('/technology/typescript')
    }

    if (loading) {
        return <div className={styles.loading}>加载中...</div>
    }

    if (error) {
        return <div className={styles.error}>加载失败: {error}</div>
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
                    返回TypeScript技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <AppstoreOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 模块系统详解</h1>
                    <p>掌握TypeScript模块化开发与代码组织</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">模块系统</Tag>
                        <Tag color="green">ES Modules</Tag>
                        <Tag color="orange">CommonJS</Tag>
                        <Tag color="purple">命名空间</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 模块基础 */}
                <Card title="📦 TypeScript 模块基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是模块？</h3>
                        <p>
                            模块是包含代码的文件，可以导出变量、函数、类、接口等，供其他模块使用。TypeScript支持ES6模块语法，同时兼容CommonJS和AMD等模块系统。
                        </p>

                        <h3>模块系统对比</h3>
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h4>📄 ES Modules (ESM)</h4>
                                <p>
                                    <strong>现代标准</strong>：ES6+的官方模块系统
                                </p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>静态分析，支持Tree Shaking</li>
                                            <li>异步加载支持</li>
                                            <li>现代浏览器原生支持</li>
                                            <li>更好的TypeScript集成</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.comparison_item}>
                                <h4>📋 CommonJS</h4>
                                <p>
                                    <strong>Node.js标准</strong>：服务端JavaScript模块系统
                                </p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>Node.js原生支持</li>
                                            <li>同步加载，简单直接</li>
                                            <li>广泛的生态支持</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>不支持静态分析</li>
                                            <li>浏览器需要打包工具</li>
                                            <li>同步加载影响性能</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Alert
                            message="推荐使用ES Modules"
                            description="在新项目中推荐使用ES Modules，它是JavaScript的官方标准，具有更好的性能和工具支持。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>

                {/* ES Modules */}
                <Card title="🎯 ES Modules 详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基本导出与导入</h4>
                            {codeData.basicExportImport && (
                                <CodeHighlight
                                    code={codeData.basicExportImport.code}
                                    language={codeData.basicExportImport.language}
                                    title={codeData.basicExportImport.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 高级导出模式</h4>
                            {codeData.advancedExportPatterns && (
                                <CodeHighlight
                                    code={codeData.advancedExportPatterns.code}
                                    language={codeData.advancedExportPatterns.language}
                                    title={codeData.advancedExportPatterns.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 动态导入</h4>
                            {codeData.dynamicImports && (
                                <CodeHighlight
                                    code={codeData.dynamicImports.code}
                                    language={codeData.dynamicImports.language}
                                    title={codeData.dynamicImports.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 模块解析 */}
                <Card title="🔍 模块解析策略" className={styles.content_card}>
                    <div className={styles.resolution_section}>
                        <h3>TypeScript模块解析</h3>
                        {codeData.moduleResolution && (
                            <CodeHighlight
                                code={codeData.moduleResolution.code}
                                language={codeData.moduleResolution.language}
                                title={codeData.moduleResolution.title}
                            />
                        )}

                        <h3>声明文件</h3>
                        {codeData.declarationFiles && (
                            <CodeHighlight
                                code={codeData.declarationFiles.code}
                                language={codeData.declarationFiles.language}
                                title={codeData.declarationFiles.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 命名空间 */}
                <Card title="🏷️ 命名空间与模块" className={styles.content_card}>
                    <div className={styles.namespace_section}>
                        <h3>命名空间基础</h3>
                        {codeData.namespaceBasics && (
                            <CodeHighlight
                                code={codeData.namespaceBasics.code}
                                language={codeData.namespaceBasics.language}
                                title={codeData.namespaceBasics.title}
                            />
                        )}

                        <h3>模块 vs 命名空间</h3>
                        {codeData.moduleVsNamespace && (
                            <CodeHighlight
                                code={codeData.moduleVsNamespace.code}
                                language={codeData.moduleVsNamespace.language}
                                title={codeData.moduleVsNamespace.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 模块系统最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 模块组织</h4>
                                <p>合理组织模块结构</p>
                                <ul>
                                    <li>使用ES Modules作为首选</li>
                                    <li>保持模块职责单一</li>
                                    <li>避免循环依赖</li>
                                    <li>使用路径映射简化导入</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 导出策略</h4>
                                <p>选择合适的导出方式</p>
                                <ul>
                                    <li>优先使用命名导出</li>
                                    <li>默认导出用于主要功能</li>
                                    <li>避免混合导出模式</li>
                                    <li>保持导出接口稳定</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 类型管理</h4>
                                <p>有效管理类型定义</p>
                                <ul>
                                    <li>分离类型定义文件</li>
                                    <li>使用类型导出</li>
                                    <li>避免类型污染</li>
                                    <li>合理使用声明合并</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 性能优化</h4>
                                <p>优化模块加载性能</p>
                                <ul>
                                    <li>使用动态导入实现懒加载</li>
                                    <li>避免不必要的依赖</li>
                                    <li>利用Tree Shaking</li>
                                    <li>合理配置模块解析</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ModulesDetail
