import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    CheckCircleOutlined, 
    WarningOutlined,
    BugOutlined,
    FormatPainterOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const ESLintPrettierDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'eslint-prettier')
    
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
                <h1><CheckCircleOutlined /> ESLint & Prettier</h1>
                <p>代码质量检查和格式化工具，提升代码规范性和一致性</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 工具概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>ESLint - 代码质量检查</h3>
                        <p>
                            ESLint 是一个开源的 JavaScript 代码检查工具，
                            可以帮助开发者发现代码中的问题，统一代码风格，提高代码质量。
                        </p>

                        <h3>Prettier - 代码格式化</h3>
                        <p>
                            Prettier 是一个代码格式化工具，支持多种语言，
                            能够解析代码并使用自己的规则重新打印代码，确保代码风格的一致性。
                        </p>

                        <h3>工具特性</h3>
                        <div className={styles.features}>
                            <Tag color="blue">代码质量检查</Tag>
                            <Tag color="green">自动格式化</Tag>
                            <Tag color="orange">规则可配置</Tag>
                            <Tag color="red">编辑器集成</Tag>
                            <Tag color="purple">团队协作</Tag>
                        </div>
                    </div>
                </Card>

                {/* ESLint 基础 */}
                <Card title="🔍 ESLint 基础配置" className={styles.content_card}>
                    <div className={styles.eslint_section}>
                        <h3>安装与配置</h3>
                        {codeData.eslintInstallation && (
                            <CodeHighlight
                                code={codeData.eslintInstallation.code}
                                language={codeData.eslintInstallation.language}
                                title={codeData.eslintInstallation.title}
                            />
                        )}
                        
                        <h3>基础配置</h3>
                        {codeData.eslintBasicConfig && (
                            <CodeHighlight
                                code={codeData.eslintBasicConfig.code}
                                language={codeData.eslintBasicConfig.language}
                                title={codeData.eslintBasicConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 框架配置 */}
                <Card title="⚙️ 框架特定配置" className={styles.content_card}>
                    <div className={styles.framework_config}>
                        <h3>React 项目配置</h3>
                        {codeData.eslintReactConfig && (
                            <CodeHighlight
                                code={codeData.eslintReactConfig.code}
                                language={codeData.eslintReactConfig.language}
                                title={codeData.eslintReactConfig.title}
                            />
                        )}
                        
                        <h3>Vue 项目配置</h3>
                        {codeData.eslintVueConfig && (
                            <CodeHighlight
                                code={codeData.eslintVueConfig.code}
                                language={codeData.eslintVueConfig.language}
                                title={codeData.eslintVueConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Prettier 配置 */}
                <Card title="🎨 Prettier 配置" className={styles.content_card}>
                    <div className={styles.prettier_section}>
                        <h3>安装与配置</h3>
                        {codeData.prettierInstallation && (
                            <CodeHighlight
                                code={codeData.prettierInstallation.code}
                                language={codeData.prettierInstallation.language}
                                title={codeData.prettierInstallation.title}
                            />
                        )}
                        
                        <h3>配置选项</h3>
                        {codeData.prettierConfig && (
                            <CodeHighlight
                                code={codeData.prettierConfig.code}
                                language={codeData.prettierConfig.language}
                                title={codeData.prettierConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 工具集成 */}
                <Card title="🔗 工具集成" className={styles.content_card}>
                    <div className={styles.integration_section}>
                        <h3>ESLint 与 Prettier 集成</h3>
                        {codeData.eslintPrettierIntegration && (
                            <CodeHighlight
                                code={codeData.eslintPrettierIntegration.code}
                                language={codeData.eslintPrettierIntegration.language}
                                title={codeData.eslintPrettierIntegration.title}
                            />
                        )}
                        
                        <h3>编辑器集成</h3>
                        {codeData.editorIntegration && (
                            <CodeHighlight
                                code={codeData.editorIntegration.code}
                                language={codeData.editorIntegration.language}
                                title={codeData.editorIntegration.title}
                            />
                        )}
                        
                        <h3>Git Hooks 集成</h3>
                        {codeData.gitHooksIntegration && (
                            <CodeHighlight
                                code={codeData.gitHooksIntegration.code}
                                language={codeData.gitHooksIntegration.language}
                                title={codeData.gitHooksIntegration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 高级配置 */}
                <Card title="🚀 高级配置" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>自定义规则</h3>
                        {codeData.customRules && (
                            <CodeHighlight
                                code={codeData.customRules.code}
                                language={codeData.customRules.language}
                                title={codeData.customRules.title}
                            />
                        )}
                        
                        <h3>项目特定配置</h3>
                        {codeData.projectSpecificConfig && (
                            <CodeHighlight
                                code={codeData.projectSpecificConfig.code}
                                language={codeData.projectSpecificConfig.language}
                                title={codeData.projectSpecificConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="ESLint 使用建议"
                            description={
                                <ul>
                                    <li>从推荐配置开始，逐步添加自定义规则</li>
                                    <li>团队统一配置文件，确保代码风格一致</li>
                                    <li>合理设置规则严重程度（error/warn/off）</li>
                                    <li>使用 overrides 为不同文件类型设置不同规则</li>
                                    <li>定期更新 ESLint 和相关插件</li>
                                    <li>结合 CI/CD 流程进行代码检查</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="Prettier 使用建议"
                            description={
                                <ul>
                                    <li>保持配置简单，使用默认设置</li>
                                    <li>团队统一格式化规则</li>
                                    <li>配置编辑器保存时自动格式化</li>
                                    <li>使用 .prettierignore 排除不需要格式化的文件</li>
                                    <li>结合 Git Hooks 确保提交代码已格式化</li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="常见问题解决"
                            description={
                                <ul>
                                    <li><strong>规则冲突</strong>：使用 eslint-config-prettier 解决</li>
                                    <li><strong>性能问题</strong>：配置 .eslintignore 排除大文件</li>
                                    <li><strong>编辑器不生效</strong>：检查插件安装和配置</li>
                                    <li><strong>Git Hooks 失败</strong>：检查 husky 和 lint-staged 配置</li>
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

export default ESLintPrettierDetail
