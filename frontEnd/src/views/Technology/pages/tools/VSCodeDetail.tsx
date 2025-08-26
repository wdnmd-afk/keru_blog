import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CodeOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const VSCodeDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'vscode')

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
                <h1>
                    <CodeOutlined /> Visual Studio Code
                </h1>
                <p>掌握VSCode的高级功能和配置，提升开发效率</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 VSCode 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>为什么选择 VSCode</h3>
                        <p>
                            Visual Studio Code 是微软开发的免费、开源的代码编辑器，
                            具有强大的扩展生态系统和丰富的功能，是现代Web开发的首选工具之一。
                        </p>

                        <h3>主要特性</h3>
                        <ul>
                            <li>
                                <strong>智能代码补全</strong>：IntelliSense 提供智能的代码建议
                            </li>
                            <li>
                                <strong>内置调试器</strong>：支持多种语言的调试功能
                            </li>
                            <li>
                                <strong>Git 集成</strong>：内置版本控制功能
                            </li>
                            <li>
                                <strong>丰富的扩展</strong>：庞大的扩展市场
                            </li>
                            <li>
                                <strong>多平台支持</strong>：Windows、macOS、Linux
                            </li>
                            <li>
                                <strong>高度可定制</strong>：主题、快捷键、设置等
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 基础配置 */}
                <Card title="⚙️ 基础配置" className={styles.content_card}>
                    <div className={styles.config_section}>
                        <h3>用户设置</h3>
                        {codeData.userSettings && (
                            <CodeHighlight
                                code={codeData.userSettings.code}
                                language={codeData.userSettings.language}
                                title={codeData.userSettings.title}
                            />
                        )}

                        <h3>工作区设置</h3>
                        {codeData.workspaceSettings && (
                            <CodeHighlight
                                code={codeData.workspaceSettings.code}
                                language={codeData.workspaceSettings.language}
                                title={codeData.workspaceSettings.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 快捷键 */}
                <Card title="⌨️ 快捷键" className={styles.content_card}>
                    <div className={styles.shortcuts_section}>
                        <h3>常用快捷键</h3>
                        {codeData.shortcuts && (
                            <CodeHighlight
                                code={codeData.shortcuts.code}
                                language={codeData.shortcuts.language}
                                title={codeData.shortcuts.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 代码片段 */}
                <Card title="📝 代码片段" className={styles.content_card}>
                    <div className={styles.snippets_section}>
                        <h3>自定义代码片段</h3>
                        {codeData.snippets && (
                            <CodeHighlight
                                code={codeData.snippets.code}
                                language={codeData.snippets.language}
                                title={codeData.snippets.title}
                            />
                        )}

                        <h3>代码片段变量</h3>
                        {codeData.snippetVariables && (
                            <CodeHighlight
                                code={codeData.snippetVariables.code}
                                language={codeData.snippetVariables.language}
                                title={codeData.snippetVariables.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 调试配置 */}
                <Card title="🐛 调试配置" className={styles.content_card}>
                    <div className={styles.debug_section}>
                        <h3>Launch.json 配置</h3>
                        {codeData.debugConfig && (
                            <CodeHighlight
                                code={codeData.debugConfig.code}
                                language={codeData.debugConfig.language}
                                title={codeData.debugConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 性能优化 */}
                <Card title="🚀 性能优化" className={styles.content_card}>
                    <div className={styles.performance_section}>
                        <h3>性能优化设置</h3>
                        {codeData.performanceSettings && (
                            <CodeHighlight
                                code={codeData.performanceSettings.code}
                                language={codeData.performanceSettings.language}
                                title={codeData.performanceSettings.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="VSCode 使用技巧"
                            description={
                                <ul>
                                    <li>合理配置工作区设置，提升团队协作效率</li>
                                    <li>使用代码片段提高编码速度</li>
                                    <li>掌握多光标编辑技巧</li>
                                    <li>善用命令面板和快捷键</li>
                                    <li>配置合适的主题和字体</li>
                                    <li>定期清理不必要的扩展</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="推荐扩展"
                            description={
                                <ul>
                                    <li>
                                        <strong>Prettier</strong>：代码格式化
                                    </li>
                                    <li>
                                        <strong>ESLint</strong>：代码质量检查
                                    </li>
                                    <li>
                                        <strong>GitLens</strong>：增强Git功能
                                    </li>
                                    <li>
                                        <strong>Auto Rename Tag</strong>：自动重命名标签
                                    </li>
                                    <li>
                                        <strong>Bracket Pair Colorizer</strong>：括号配对着色
                                    </li>
                                    <li>
                                        <strong>Live Server</strong>：本地开发服务器
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

export default VSCodeDetail
