import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    TeamOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const CollaborationDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'collaboration')

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
                    <TeamOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git 团队协作详解</h1>
                    <p>掌握Git团队协作的最佳实践与工作流程</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">团队协作</Tag>
                        <Tag color="green">工作流</Tag>
                        <Tag color="orange">代码审查</Tag>
                        <Tag color="purple">分支策略</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 团队协作概述 */}
                <Card title="👥 团队协作概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么需要团队协作规范？</h3>
                        <p>在多人开发项目中，统一的协作规范能够避免代码冲突、提高开发效率、保证代码质量，并确保项目的可维护性。</p>

                        <h3>协作核心要素</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🌿 分支策略</h4>
                                <p>合理的分支管理模式</p>
                                <ul>
                                    <li>Git Flow</li>
                                    <li>GitHub Flow</li>
                                    <li>GitLab Flow</li>
                                </ul>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>📝 提交规范</h4>
                                <p>统一的提交信息格式</p>
                                <ul>
                                    <li>Conventional Commits</li>
                                    <li>提交信息模板</li>
                                    <li>自动化检查</li>
                                </ul>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🔍 代码审查</h4>
                                <p>保证代码质量的关键环节</p>
                                <ul>
                                    <li>Pull Request</li>
                                    <li>Code Review</li>
                                    <li>自动化测试</li>
                                </ul>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🚀 发布管理</h4>
                                <p>稳定的版本发布流程</p>
                                <ul>
                                    <li>版本标签</li>
                                    <li>发布分支</li>
                                    <li>回滚策略</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 分支策略 */}
                <Card title="🌿 分支策略详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Git Flow 工作流</h4>
                            {codeData.gitFlowWorkflow && (
                                <CodeHighlight
                                    code={codeData.gitFlowWorkflow.code}
                                    language={codeData.gitFlowWorkflow.language}
                                    title={codeData.gitFlowWorkflow.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. GitHub Flow 工作流</h4>
                            {codeData.githubFlow && (
                                <CodeHighlight
                                    code={codeData.githubFlow.code}
                                    language={codeData.githubFlow.language}
                                    title={codeData.githubFlow.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. GitLab Flow 工作流</h4>
                            {codeData.gitlabFlow && (
                                <CodeHighlight
                                    code={codeData.gitlabFlow.code}
                                    language={codeData.gitlabFlow.language}
                                    title={codeData.gitlabFlow.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 代码审查 */}
                <Card title="🔍 代码审查最佳实践" className={styles.content_card}>
                    <div className={styles.review_section}>
                        <h3>Pull Request 最佳实践</h3>
                        {codeData.pullRequestTemplate && (
                            <CodeHighlight
                                code={codeData.pullRequestTemplate.code}
                                language={codeData.pullRequestTemplate.language}
                                title={codeData.pullRequestTemplate.title}
                            />
                        )}

                        <h3>代码审查指南</h3>
                        {codeData.codeReviewGuidelines && (
                            <CodeHighlight
                                code={codeData.codeReviewGuidelines.code}
                                language={codeData.codeReviewGuidelines.language}
                                title={codeData.codeReviewGuidelines.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 冲突解决 */}
                <Card title="⚔️ 冲突解决策略" className={styles.content_card}>
                    <div className={styles.conflict_section}>
                        <h3>合并冲突处理</h3>
                        {codeData.conflictResolutionTeam && (
                            <CodeHighlight
                                code={codeData.conflictResolutionTeam.code}
                                language={codeData.conflictResolutionTeam.language}
                                title={codeData.conflictResolutionTeam.title}
                            />
                        )}

                        <h3>团队协作规范</h3>
                        {codeData.teamStandards && (
                            <CodeHighlight
                                code={codeData.teamStandards.code}
                                language={codeData.teamStandards.language}
                                title={codeData.teamStandards.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 团队协作最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 分支管理</h4>
                                <p>建立清晰的分支策略</p>
                                <ul>
                                    <li>选择适合团队的工作流</li>
                                    <li>统一分支命名规范</li>
                                    <li>定期清理无用分支</li>
                                    <li>保护重要分支</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 提交规范</h4>
                                <p>维护清晰的提交历史</p>
                                <ul>
                                    <li>使用统一的提交信息格式</li>
                                    <li>保持提交的原子性</li>
                                    <li>编写有意义的提交信息</li>
                                    <li>使用工具自动化检查</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 代码审查</h4>
                                <p>确保代码质量</p>
                                <ul>
                                    <li>建立代码审查流程</li>
                                    <li>培养审查文化</li>
                                    <li>使用自动化工具辅助</li>
                                    <li>及时响应审查意见</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队沟通</h4>
                                <p>加强团队协作</p>
                                <ul>
                                    <li>定期同步开发进度</li>
                                    <li>及时沟通技术决策</li>
                                    <li>分享最佳实践</li>
                                    <li>建立知识文档</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CollaborationDetail
