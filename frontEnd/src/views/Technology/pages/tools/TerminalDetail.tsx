import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Spin, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const TerminalDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'terminal')

    const handleBack = () => {
        navigate('/technology/tools')
    }

    if (loading) {
        return (
            <div className={styles.topic_detail_container}>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                    <p style={{ marginTop: '16px', color: '#ffffff' }}>加载代码数据中...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.topic_detail_container}>
                <Alert message="加载失败" description={error} type="error" showIcon />
            </div>
        )
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
                    返回工具技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ConsoleSqlOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>终端工具</h1>
                    <p>掌握现代终端工具和Shell配置，提升命令行使用效率和开发体验</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Shell配置</Tag>
                        <Tag color="green">现代CLI工具</Tag>
                        <Tag color="orange">终端主题</Tag>
                        <Tag color="purple">自动化脚本</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 概述 */}
                <Card title="📋 终端工具概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么要优化终端</h3>
                        <p>
                            终端是开发者最重要的工具之一。一个配置良好的终端环境
                            可以显著提升开发效率，减少重复操作，提供更好的用户体验。
                        </p>

                        <h3>终端工具分类</h3>
                        <div className={styles.network_types}>
                            <Tag color="blue">Shell配置</Tag>
                            <Tag color="green">现代CLI工具</Tag>
                            <Tag color="orange">终端主题</Tag>
                            <Tag color="red">自动化脚本</Tag>
                            <Tag color="purple">开发工具</Tag>
                        </div>

                        <h3>优化目标</h3>
                        <ul>
                            <li>
                                <strong>提升效率</strong>：快速执行常用命令
                            </li>
                            <li>
                                <strong>美化界面</strong>：更好的视觉体验
                            </li>
                            <li>
                                <strong>智能提示</strong>：自动补全和建议
                            </li>
                            <li>
                                <strong>历史管理</strong>：快速查找历史命令
                            </li>
                            <li>
                                <strong>多任务处理</strong>：会话管理和分屏
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* Shell配置 */}
                <Card title="🐚 Shell 配置优化" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Zsh + Oh My Zsh 配置</h4>
                            {codeData.zshConfiguration && (
                                <CodeHighlight
                                    code={codeData.zshConfiguration.code}
                                    language={codeData.zshConfiguration.language}
                                    title={codeData.zshConfiguration.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. PowerShell 配置</h4>
                            {codeData.powershellConfiguration && (
                                <CodeHighlight
                                    code={codeData.powershellConfiguration.code}
                                    language={codeData.powershellConfiguration.language}
                                    title={codeData.powershellConfiguration.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 终端主题配置</h4>
                            {codeData.terminalThemes && (
                                <CodeHighlight
                                    code={codeData.terminalThemes.code}
                                    language={codeData.terminalThemes.language}
                                    title={codeData.terminalThemes.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 现代CLI工具 */}
                <Card title="🛠️ 现代化CLI工具" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>4. 文件和系统工具</h4>
                            {codeData.modernCliTools && (
                                <CodeHighlight
                                    code={codeData.modernCliTools.code}
                                    language={codeData.modernCliTools.language}
                                    title={codeData.modernCliTools.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>5. 开发专用工具</h4>
                            {codeData.developmentTools && (
                                <CodeHighlight
                                    code={codeData.developmentTools.code}
                                    language={codeData.developmentTools.language}
                                    title={codeData.developmentTools.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>6. Shell 脚本实战</h4>
                            {codeData.shellScripts && (
                                <CodeHighlight
                                    code={codeData.shellScripts.code}
                                    language={codeData.shellScripts.language}
                                    title={codeData.shellScripts.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className="f-ic">
                        <Alert
                            message="终端配置建议"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>选择合适的Shell（Zsh、Fish、PowerShell）</li>
                                    <li>配置智能补全和语法高亮</li>
                                    <li>使用现代化的CLI工具替代传统命令</li>
                                    <li>设置有意义的别名和函数</li>
                                    <li>定期备份和同步配置文件</li>
                                    <li>学习快捷键和高效操作技巧</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Alert
                            message="效率提升技巧"
                            className={'h-50 flex-1 mx-5'}
                            description={
                                <ul>
                                    <li>
                                        <strong>历史搜索</strong>：使用Ctrl+R快速搜索历史命令
                                    </li>
                                    <li>
                                        <strong>目录跳转</strong>：使用z、autojump等工具快速跳转
                                    </li>
                                    <li>
                                        <strong>批量操作</strong>：使用通配符和管道处理多个文件
                                    </li>
                                    <li>
                                        <strong>会话管理</strong>：使用tmux或screen管理多个会话
                                    </li>
                                    <li>
                                        <strong>自动化脚本</strong>：将重复任务写成脚本
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Alert
                            message="安全注意事项"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        <strong>权限管理</strong>：避免不必要的sudo操作
                                    </li>
                                    <li>
                                        <strong>脚本安全</strong>：检查脚本来源和内容
                                    </li>
                                    <li>
                                        <strong>敏感信息</strong>：不要在历史记录中保存密码
                                    </li>
                                    <li>
                                        <strong>网络安全</strong>：使用SSH密钥而非密码
                                    </li>
                                    <li>
                                        <strong>定期更新</strong>：保持工具和系统更新
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

export default TerminalDetail
