import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ConfigurationDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'configurationDetail')

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    const handleBack = () => {
        navigate('/technology/typescript')
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
                    <SettingOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 配置与工具链详解</h1>
                    <p>掌握TypeScript项目配置与开发工具链</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">tsconfig.json</Tag>
                        <Tag color="green">编译配置</Tag>
                        <Tag color="orange">开发工具</Tag>
                        <Tag color="purple">构建优化</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* tsconfig.json详解 */}
                <Card title="⚙️ tsconfig.json 配置详解" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>配置文件结构</h3>
                        <p>
                            tsconfig.json是TypeScript项目的配置文件，定义了编译选项、文件包含规则和项目设置。
                        </p>

                        <h3>基础配置</h3>
                        {codeData?.basicConfig && (
                            <CodeHighlight
                                language={codeData.basicConfig.language}
                                code={codeData.basicConfig.code}
                                title={codeData.basicConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 编译选项详解 */}
                <Card title="🔧 编译选项详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 目标与模块配置</h4>
                            {codeData?.targetModule && (
                                <CodeHighlight
                                    language={codeData.targetModule.language}
                                    code={codeData.targetModule.code}
                                    title={codeData.targetModule.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 严格模式配置</h4>
                            {codeData?.strictMode && (
                                <CodeHighlight
                                    language={codeData.strictMode.language}
                                    code={codeData.strictMode.code}
                                    title={codeData.strictMode.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 模块解析配置</h4>
                            {codeData?.moduleResolution && (
                                <CodeHighlight
                                    language={codeData.moduleResolution.language}
                                    code={codeData.moduleResolution.code}
                                    title={codeData.moduleResolution.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>4. 输出配置</h4>
                            {codeData?.outputConfig && (
                                <CodeHighlight
                                    language={codeData.outputConfig.language}
                                    code={codeData.outputConfig.code}
                                    title={codeData.outputConfig.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>5. 高级选项</h4>
                            {codeData?.advancedOptions && (
                                <CodeHighlight
                                    language={codeData.advancedOptions.language}
                                    code={codeData.advancedOptions.code}
                                    title={codeData.advancedOptions.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 项目配置策略 */}
                <Card title="📁 项目配置策略" className={styles.content_card}>
                    <div className={styles.project_section}>
                        <h3>多项目配置</h3>
                        {codeData?.multiProject && (
                            <CodeHighlight
                                language={codeData.multiProject.language}
                                code={codeData.multiProject.code}
                                title={codeData.multiProject.title}
                            />
                        )}

                        <h3>环境特定配置</h3>
                        {codeData?.environmentConfig && (
                            <CodeHighlight
                                language={codeData.environmentConfig.language}
                                code={codeData.environmentConfig.code}
                                title={codeData.environmentConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 开发工具集成 */}
                <Card title="🛠️ 开发工具集成" className={styles.content_card}>
                    <div className={styles.tools_section}>
                        <h3>VS Code配置</h3>
                        {codeData?.vscodeConfig && (
                            <CodeHighlight
                                language={codeData.vscodeConfig.language}
                                code={codeData.vscodeConfig.code}
                                title={codeData.vscodeConfig.title}
                            />
                        )}

                        <h3>ESLint集成</h3>
                        {codeData?.eslintConfig && (
                            <CodeHighlight
                                language={codeData.eslintConfig.language}
                                code={codeData.eslintConfig.code}
                                title={codeData.eslintConfig.title}
                            />
                        )}

                        <h3>构建工具集成</h3>
                        {codeData?.buildTools && (
                            <CodeHighlight
                                language={codeData.buildTools.language}
                                code={codeData.buildTools.code}
                                title={codeData.buildTools.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 配置最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 配置管理</h4>
                                <p>合理组织TypeScript配置</p>
                                <ul>
                                    <li>使用extends继承基础配置</li>
                                    <li>为不同环境创建专门配置</li>
                                    <li>启用严格模式提高代码质量</li>
                                    <li>合理配置路径映射</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 编译优化</h4>
                                <p>优化TypeScript编译性能</p>
                                <ul>
                                    <li>启用增量编译</li>
                                    <li>使用项目引用管理大型项目</li>
                                    <li>合理配置include和exclude</li>
                                    <li>跳过不必要的库文件检查</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 工具集成</h4>
                                <p>充分利用开发工具</p>
                                <ul>
                                    <li>配置IDE获得最佳开发体验</li>
                                    <li>集成ESLint进行代码检查</li>
                                    <li>使用Prettier统一代码格式</li>
                                    <li>配置自动化构建流程</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队协作</h4>
                                <p>建立团队开发规范</p>
                                <ul>
                                    <li>统一团队TypeScript配置</li>
                                    <li>建立代码审查流程</li>
                                    <li>文档化配置选择原因</li>
                                    <li>定期更新工具链版本</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ConfigurationDetail
