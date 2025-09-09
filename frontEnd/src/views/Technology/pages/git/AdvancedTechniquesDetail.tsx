import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, RocketOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const AdvancedTechniquesDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'advancedSearch')

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
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git 高级技巧详解</h1>
                    <p>掌握Git的高级功能与实用技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="purple">高级技巧</Tag>
                        <Tag color="blue">Git命令</Tag>
                        <Tag color="green">工作流优化</Tag>
                        <Tag color="orange">问题解决</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 高级提交技巧 */}
                <Card title="📝 高级提交技巧" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>交互式提交</h3>
                        {codeData.advancedCommands && (
                            <CodeHighlight
                                code={codeData.advancedCommands.code}
                                language={codeData.advancedCommands.language}
                                title={codeData.advancedCommands.title}
                            />
                        )}

                        <h3>提交信息规范</h3>
                        {codeData.advancedCommands && (
                            <CodeHighlight
                                code={codeData.advancedCommands.code}
                                language={codeData.advancedCommands.language}
                                title="提交规范和高级命令"
                            />
                        )}
                    </div>
                </Card>

                {/* 高级分支操作 */}
                <Card title="🌿 高级分支操作" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 交互式变基</h4>
                            {codeData.interactiveRebase && (
                                <CodeHighlight
                                    code={codeData.interactiveRebase.code}
                                    language={codeData.interactiveRebase.language}
                                    title={codeData.interactiveRebase.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 高级合并策略</h4>
                            {codeData.advancedBranching && (
                                <CodeHighlight
                                    code={codeData.advancedBranching.code}
                                    language={codeData.advancedBranching.language}
                                    title="高级合并策略"
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 分支管理技巧</h4>
                            {codeData.advancedBranching && (
                                <CodeHighlight
                                    code={codeData.advancedBranching.code}
                                    language={codeData.advancedBranching.language}
                                    title="分支管理技巧"
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 高级查询与搜索 */}
                <Card title="🔍 高级查询与搜索" className={styles.content_card}>
                    <div className={styles.search_section}>
                        <h3>日志查询</h3>
                        {codeData.advancedCommands && (
                            <CodeHighlight
                                code={codeData.advancedCommands.code}
                                language={codeData.advancedCommands.language}
                                title="高级日志查询"
                            />
                        )}

                        <h3>内容搜索</h3>
                        {codeData.contentSearch && (
                            <CodeHighlight
                                code={codeData.contentSearch.code}
                                language={codeData.contentSearch.language}
                                title={codeData.contentSearch.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 数据恢复与修复 */}
                <Card title="🔧 数据恢复与修复" className={styles.content_card}>
                    <div className={styles.recovery_section}>
                        <h3>提交恢复</h3>
                        {codeData.commitRecovery && (
                            <CodeHighlight
                                code={codeData.commitRecovery.code}
                                language={codeData.commitRecovery.language}
                                title={codeData.commitRecovery.title}
                            />
                        )}

                        <h3>历史修改</h3>
                        {codeData.historyModification && (
                            <CodeHighlight
                                code={codeData.historyModification.code}
                                language={codeData.historyModification.language}
                                title={codeData.historyModification.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 性能优化 */}
                <Card title="⚡ Git 性能优化" className={styles.content_card}>
                    <div className={styles.performance_section}>
                        <h3>仓库优化</h3>
                        {codeData.repositoryOptimization && (
                            <CodeHighlight
                                code={codeData.repositoryOptimization.code}
                                language={codeData.repositoryOptimization.language}
                                title={codeData.repositoryOptimization.title}
                            />
                        )}

                        <h3>大文件处理</h3>
                        {codeData.largeFileHandling && (
                            <CodeHighlight
                                code={codeData.largeFileHandling.code}
                                language={codeData.largeFileHandling.language}
                                title={codeData.largeFileHandling.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Git 高级技巧最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 提交管理</h4>
                                <p>保持清晰的提交历史</p>
                                <ul>
                                    <li>使用语义化的提交信息</li>
                                    <li>保持提交的原子性</li>
                                    <li>定期整理提交历史</li>
                                    <li>避免在公共分支上使用rebase</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 分支策略</h4>
                                <p>合理使用分支功能</p>
                                <ul>
                                    <li>选择适合团队的分支模型</li>
                                    <li>及时清理无用分支</li>
                                    <li>使用描述性的分支名称</li>
                                    <li>保护重要分支</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>保持仓库高效运行</p>
                                <ul>
                                    <li>定期进行垃圾回收</li>
                                    <li>使用LFS管理大文件</li>
                                    <li>合理配置Git选项</li>
                                    <li>监控仓库大小</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 安全考虑</h4>
                                <p>确保代码和历史安全</p>
                                <ul>
                                    <li>使用GPG签名重要提交</li>
                                    <li>及时清理敏感信息</li>
                                    <li>定期备份重要仓库</li>
                                    <li>控制仓库访问权限</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AdvancedTechniquesDetail
