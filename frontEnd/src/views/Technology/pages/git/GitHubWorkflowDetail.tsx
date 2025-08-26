import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, GithubOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const GitHubWorkflowDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'githubWorkflow')

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
                    <GithubOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>GitHub 工作流详解</h1>
                    <p>掌握GitHub协作开发的完整工作流程</p>
                    <div className={styles.topic_tags}>
                        <Tag color="black">GitHub</Tag>
                        <Tag color="green">Pull Request</Tag>
                        <Tag color="blue">Code Review</Tag>
                        <Tag color="orange">协作开发</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* GitHub工作流概述 */}
                <Card title="🔄 GitHub 工作流概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>GitHub Flow 核心理念</h3>
                        <p>
                            GitHub
                            Flow是一个轻量级的、基于分支的工作流，特别适合持续部署的项目。它简单易懂，专注于快速迭代和持续集成。
                        </p>

                        <h3>工作流步骤</h3>
                        <div className={styles.workflow_steps}>
                            <div className={styles.step_item}>
                                <div className={styles.step_number}>1</div>
                                <div className={styles.step_content}>
                                    <h4>创建分支</h4>
                                    <p>从main分支创建功能分支</p>
                                </div>
                            </div>

                            <div className={styles.step_item}>
                                <div className={styles.step_number}>2</div>
                                <div className={styles.step_content}>
                                    <h4>添加提交</h4>
                                    <p>在分支上进行开发并提交代码</p>
                                </div>
                            </div>

                            <div className={styles.step_item}>
                                <div className={styles.step_number}>3</div>
                                <div className={styles.step_content}>
                                    <h4>创建PR</h4>
                                    <p>开启Pull Request进行讨论</p>
                                </div>
                            </div>

                            <div className={styles.step_item}>
                                <div className={styles.step_number}>4</div>
                                <div className={styles.step_content}>
                                    <h4>代码审查</h4>
                                    <p>团队成员审查和讨论代码</p>
                                </div>
                            </div>

                            <div className={styles.step_item}>
                                <div className={styles.step_number}>5</div>
                                <div className={styles.step_content}>
                                    <h4>部署测试</h4>
                                    <p>在测试环境验证功能</p>
                                </div>
                            </div>

                            <div className={styles.step_item}>
                                <div className={styles.step_number}>6</div>
                                <div className={styles.step_content}>
                                    <h4>合并部署</h4>
                                    <p>合并到main并部署到生产</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Pull Request详解 */}
                <Card title="🔀 Pull Request 详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 创建Pull Request</h4>
                            {codeData?.createPullRequest && (
                                <CodeHighlight
                                    code={codeData.createPullRequest.code}
                                    language={codeData.createPullRequest.language}
                                    title={codeData.createPullRequest.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. PR模板和规范</h4>
                            {codeData?.prTemplate && (
                                <CodeHighlight
                                    code={codeData.prTemplate.code}
                                    language={codeData.prTemplate.language}
                                    title={codeData.prTemplate.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. PR状态管理</h4>
                            {codeData?.prStatusManagement && (
                                <CodeHighlight
                                    code={codeData.prStatusManagement.code}
                                    language={codeData.prStatusManagement.language}
                                    title={codeData.prStatusManagement.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 代码审查 */}
                <Card title="👀 代码审查最佳实践" className={styles.content_card}>
                    <div className={styles.review_section}>
                        <h3>审查者指南</h3>
                        {codeData?.codeReviewChecklist && (
                            <CodeHighlight
                                code={codeData.codeReviewChecklist.code}
                                language={codeData.codeReviewChecklist.language}
                                title={codeData.codeReviewChecklist.title}
                            />
                        )}

                        <h3>审查评论技巧</h3>
                        {codeData?.reviewCommentTips && (
                            <CodeHighlight
                                code={codeData.reviewCommentTips.code}
                                language={codeData.reviewCommentTips.language}
                                title={codeData.reviewCommentTips.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 分支保护规则 */}
                <Card title="🛡️ 分支保护与自动化" className={styles.content_card}>
                    <div className={styles.protection_section}>
                        <h3>分支保护规则</h3>
                        {codeData?.branchProtectionRules && (
                            <CodeHighlight
                                code={codeData.branchProtectionRules.code}
                                language={codeData.branchProtectionRules.language}
                                title={codeData.branchProtectionRules.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ GitHub 工作流最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. PR管理</h4>
                                <p>高效的Pull Request管理</p>
                                <ul>
                                    <li>保持PR小而专注，易于审查</li>
                                    <li>写清晰的PR描述和提交信息</li>
                                    <li>及时响应审查意见</li>
                                    <li>使用Draft PR进行早期反馈</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 代码审查</h4>
                                <p>建设性的代码审查文化</p>
                                <ul>
                                    <li>及时进行代码审查</li>
                                    <li>提供建设性的反馈</li>
                                    <li>关注代码质量和安全性</li>
                                    <li>学习和分享最佳实践</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 自动化</h4>
                                <p>充分利用GitHub的自动化功能</p>
                                <ul>
                                    <li>设置CI/CD流水线</li>
                                    <li>使用分支保护规则</li>
                                    <li>自动化测试和部署</li>
                                    <li>集成第三方工具</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队协作</h4>
                                <p>促进团队高效协作</p>
                                <ul>
                                    <li>建立清晰的工作流程</li>
                                    <li>使用Issue跟踪任务</li>
                                    <li>定期进行项目回顾</li>
                                    <li>文档化团队规范</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GitHubWorkflowDetail
