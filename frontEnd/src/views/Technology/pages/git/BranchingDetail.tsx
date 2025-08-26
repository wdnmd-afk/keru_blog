import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, BranchesOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BranchingDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'branching')

    const handleBack = () => {
        navigate('/technology/git')
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
                    返回Git & GitHub技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <BranchesOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git 分支管理详解</h1>
                    <p>掌握Git分支策略与高效的分支管理技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Git Branch</Tag>
                        <Tag color="blue">分支策略</Tag>
                        <Tag color="orange">合并管理</Tag>
                        <Tag color="purple">工作流</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 分支基础概念 */}
                <Card title="🌳 Git 分支基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Git分支？</h3>
                        <p>
                            Git分支是指向特定提交的可移动指针。分支让你可以在不影响主代码的情况下开发新功能、修复bug或进行实验。
                        </p>

                        <h3>分支的优势</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🚀 并行开发</h4>
                                <p>多个功能可以同时开发，互不干扰</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🔒 代码隔离</h4>
                                <p>实验性代码不会影响稳定版本</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🔄 轻松切换</h4>
                                <p>可以快速在不同版本间切换</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>📝 历史追踪</h4>
                                <p>每个功能的开发历史清晰可见</p>
                            </div>
                        </div>

                        <h3>基本分支操作</h3>
                        {codeData.branchCreation && (
                            <CodeHighlight
                                code={codeData.branchCreation.code}
                                language={codeData.branchCreation.language}
                                title={codeData.branchCreation.title}
                            />
                        )}
                        {codeData.branchDeletion && (
                            <CodeHighlight
                                code={codeData.branchDeletion.code}
                                language={codeData.branchDeletion.language}
                                title={codeData.branchDeletion.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 分支策略 */}
                <Card title="🎯 常用分支策略" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Git Flow</h4>
                            {codeData.branchWorkflows && (
                                <CodeHighlight
                                    code={codeData.branchWorkflows.code}
                                    language={codeData.branchWorkflows.language}
                                    title={codeData.branchWorkflows.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. GitHub Flow</h4>
                            {codeData.branchStrategies && (
                                <CodeHighlight
                                    code={codeData.branchStrategies.code}
                                    language={codeData.branchStrategies.language}
                                    title={codeData.branchStrategies.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. GitLab Flow</h4>
                            {codeData.branchStrategies && (
                                <CodeHighlight
                                    code={codeData.branchStrategies.code}
                                    language={codeData.branchStrategies.language}
                                    title="GitLab Flow策略"
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 分支合并 */}
                <Card title="🔀 分支合并技巧" className={styles.content_card}>
                    <div className={styles.merge_section}>
                        <h3>合并方式对比</h3>
                        {codeData.branchMerging && (
                            <CodeHighlight
                                code={codeData.branchMerging.code}
                                language={codeData.branchMerging.language}
                                title={codeData.branchMerging.title}
                            />
                        )}

                        <h3>解决合并冲突</h3>
                        {codeData.conflictResolution && (
                            <CodeHighlight
                                code={codeData.conflictResolution.code}
                                language={codeData.conflictResolution.language}
                                title={codeData.conflictResolution.title}
                            />
                        )}

                        <h3>高级合并技巧</h3>
                        {codeData.advancedBranching && (
                            <CodeHighlight
                                code={codeData.advancedBranching.code}
                                language={codeData.advancedBranching.language}
                                title={codeData.advancedBranching.title}
                            />
                        )}
                        {codeData.rebaseOperations && (
                            <CodeHighlight
                                code={codeData.rebaseOperations.code}
                                language={codeData.rebaseOperations.language}
                                title={codeData.rebaseOperations.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 远程分支管理 */}
                <Card title="🌐 远程分支管理" className={styles.content_card}>
                    <div className={styles.remote_section}>
                        <h3>远程分支操作</h3>
                        {codeData.remoteBranches && (
                            <CodeHighlight
                                code={codeData.remoteBranches.code}
                                language={codeData.remoteBranches.language}
                                title={codeData.remoteBranches.title}
                            />
                        )}

                        <h3>多远程仓库管理</h3>
                        {codeData.remoteBranches && (
                            <CodeHighlight
                                code={codeData.remoteBranches.code}
                                language={codeData.remoteBranches.language}
                                title="多远程仓库管理"
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 分支管理最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 分支命名规范</h4>
                                <p>使用清晰的分支命名约定</p>
                                <ul>
                                    <li>
                                        <strong>功能分支</strong>：feature/user-login,
                                        feature/payment-system
                                    </li>
                                    <li>
                                        <strong>修复分支</strong>：bugfix/login-error,
                                        hotfix/critical-security
                                    </li>
                                    <li>
                                        <strong>发布分支</strong>：release/v1.2.0, release/2024-01
                                    </li>
                                    <li>
                                        <strong>实验分支</strong>：experiment/new-ui,
                                        poc/microservices
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 分支生命周期管理</h4>
                                <p>合理管理分支的创建和删除</p>
                                <ul>
                                    <li>及时删除已合并的功能分支</li>
                                    <li>定期清理过期的分支</li>
                                    <li>保持主分支的稳定性</li>
                                    <li>使用保护规则防止直接推送</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 合并策略选择</h4>
                                <p>根据项目需求选择合适的合并方式</p>
                                <ul>
                                    <li>
                                        <strong>功能分支</strong>：使用squash merge保持历史清洁
                                    </li>
                                    <li>
                                        <strong>发布分支</strong>：使用merge commit记录发布点
                                    </li>
                                    <li>
                                        <strong>热修复</strong>：使用fast-forward merge快速部署
                                    </li>
                                    <li>避免在公共分支上使用rebase</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队协作规范</h4>
                                <p>建立团队分支管理规范</p>
                                <ul>
                                    <li>制定清晰的分支策略文档</li>
                                    <li>使用Pull Request进行代码审查</li>
                                    <li>设置分支保护规则</li>
                                    <li>定期进行分支管理培训</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default BranchingDetail
