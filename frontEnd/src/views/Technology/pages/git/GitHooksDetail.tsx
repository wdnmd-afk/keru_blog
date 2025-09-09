import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ApiOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const GitHooksDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'hooks')

    const handleBack = () => {
        navigate('/technology/git')
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
        <div className={styles.topic_detail_container}>
            {/* 返回按钮 */}
            <div className={styles.back_section}>
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回Git & GitHub技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ApiOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git Hooks 详解</h1>
                    <p>掌握Git钩子的使用与自动化工作流</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Git Hooks</Tag>
                        <Tag color="green">自动化</Tag>
                        <Tag color="orange">工作流</Tag>
                        <Tag color="purple">质量控制</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Git Hooks概述 */}
                <Card title="🎣 Git Hooks 概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Git Hooks？</h3>
                        <p>
                            Git
                            Hooks是Git在特定事件发生时自动执行的脚本。它们允许你在Git工作流的关键点插入自定义逻辑，实现代码质量检查、自动化部署等功能。
                        </p>

                        <h3>Hook类型分类</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>📥 客户端Hooks</h4>
                                <p>在本地仓库执行</p>
                                <ul>
                                    <li>pre-commit: 提交前检查</li>
                                    <li>commit-msg: 提交信息验证</li>
                                    <li>post-commit: 提交后操作</li>
                                    <li>pre-push: 推送前检查</li>
                                </ul>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🖥️ 服务端Hooks</h4>
                                <p>在远程仓库执行</p>
                                <ul>
                                    <li>pre-receive: 接收前检查</li>
                                    <li>update: 分支更新检查</li>
                                    <li>post-receive: 接收后操作</li>
                                    <li>post-update: 更新后操作</li>
                                </ul>
                            </div>
                        </div>

                        <Alert
                            message="Hook位置"
                            description="Git Hooks位于.git/hooks/目录下。客户端hooks可以被绕过，服务端hooks无法绕过。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>

                {/* 客户端Hooks */}
                <Card title="💻 客户端 Hooks" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. pre-commit Hook</h4>
                            {codeData.preCommitHook && (
                                <CodeHighlight
                                    code={codeData.preCommitHook.code}
                                    language={codeData.preCommitHook.language}
                                    title={codeData.preCommitHook.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. commit-msg Hook</h4>
                            {codeData.commitMsgHook && (
                                <CodeHighlight
                                    code={codeData.commitMsgHook.code}
                                    language={codeData.commitMsgHook.language}
                                    title={codeData.commitMsgHook.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. pre-push Hook</h4>
                            {codeData.prePushHook && (
                                <CodeHighlight
                                    code={codeData.prePushHook.code}
                                    language={codeData.prePushHook.language}
                                    title={codeData.prePushHook.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 服务端Hooks */}
                <Card title="🖥️ 服务端 Hooks" className={styles.content_card}>
                    <div className={styles.server_section}>
                        <h3>pre-receive Hook</h3>
                        {codeData.preReceiveHook && (
                            <CodeHighlight
                                code={codeData.preReceiveHook.code}
                                language={codeData.preReceiveHook.language}
                                title={codeData.preReceiveHook.title}
                            />
                        )}

                        <h3>post-receive Hook</h3>
                        {codeData.postReceiveHook && (
                            <CodeHighlight
                                code={codeData.postReceiveHook.code}
                                language={codeData.postReceiveHook.language}
                                title={codeData.postReceiveHook.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Husky工具 */}
                <Card title="🐕 Husky 工具" className={styles.content_card}>
                    <div className={styles.husky_section}>
                        <h3>Husky安装与配置</h3>
                        {codeData.huskySetup && (
                            <CodeHighlight
                                code={codeData.huskySetup.code}
                                language={codeData.huskySetup.language}
                                title={codeData.huskySetup.title}
                            />
                        )}

                        <h3>lint-staged集成</h3>
                        {codeData.lintStagedIntegration && (
                            <CodeHighlight
                                code={codeData.lintStagedIntegration.code}
                                language={codeData.lintStagedIntegration.language}
                                title={codeData.lintStagedIntegration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Git Hooks 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. Hook设计原则</h4>
                                <p>设计高效的Git Hooks</p>
                                <ul>
                                    <li>保持Hook脚本简洁高效</li>
                                    <li>提供清晰的错误信息</li>
                                    <li>支持跳过机制（--no-verify）</li>
                                    <li>记录Hook执行日志</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能优化</h4>
                                <p>优化Hook执行性能</p>
                                <ul>
                                    <li>只检查变更的文件</li>
                                    <li>并行执行检查任务</li>
                                    <li>使用缓存机制</li>
                                    <li>避免重复检查</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 团队协作</h4>
                                <p>确保团队一致性</p>
                                <ul>
                                    <li>使用Husky管理Hooks</li>
                                    <li>版本控制Hook配置</li>
                                    <li>文档化Hook规则</li>
                                    <li>定期更新Hook脚本</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 安全考虑</h4>
                                <p>确保Hook安全性</p>
                                <ul>
                                    <li>验证Hook脚本来源</li>
                                    <li>限制Hook执行权限</li>
                                    <li>审计Hook执行日志</li>
                                    <li>防止恶意代码注入</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GitHooksDetail
