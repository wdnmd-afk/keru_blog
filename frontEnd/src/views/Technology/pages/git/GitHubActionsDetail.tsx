import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, RocketOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const GitHubActionsDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'githubActionsDetail')

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
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>GitHub Actions 自动化详解</h1>
                    <p>掌握GitHub的CI/CD自动化工作流，提升开发效率</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">GitHub Actions</Tag>
                        <Tag color="blue">CI/CD</Tag>
                        <Tag color="orange">自动化</Tag>
                        <Tag color="purple">工作流</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* GitHub Actions基础 */}
                <Card title="🚀 GitHub Actions 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是GitHub Actions？</h3>
                        <p>
                            GitHub
                            Actions是GitHub提供的持续集成和持续部署(CI/CD)平台，允许你自动化构建、测试和部署管道。你可以创建工作流来构建和测试仓库的每个pull
                            request，或将合并的pull request部署到生产环境。
                        </p>

                        <h3>核心概念</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔄 工作流 (Workflow)</h4>
                                <p>可配置的自动化过程，由一个或多个作业组成</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>⚡ 事件 (Event)</h4>
                                <p>触发工作流运行的特定活动</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>💼 作业 (Job)</h4>
                                <p>在同一运行器上执行的一组步骤</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>📋 步骤 (Step)</h4>
                                <p>可以运行命令或动作的单个任务</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🎬 动作 (Action)</h4>
                                <p>可重用的代码单元</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🖥️ 运行器 (Runner)</h4>
                                <p>运行工作流的服务器</p>
                            </div>
                        </div>

                        <h3>基本工作流文件</h3>
                        {codeData.basicWorkflow && (
                            <CodeHighlight
                                code={codeData.basicWorkflow.code}
                                language={codeData.basicWorkflow.language}
                                title={codeData.basicWorkflow.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 触发事件 */}
                <Card title="⚡ 工作流触发事件" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 推送事件</h4>
                            {codeData.pushEvents && (
                                <CodeHighlight
                                    code={codeData.pushEvents.code}
                                    language={codeData.pushEvents.language}
                                    title={codeData.pushEvents.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. Pull Request事件</h4>
                            {codeData.pullRequestEvents && (
                                <CodeHighlight
                                    code={codeData.pullRequestEvents.code}
                                    language={codeData.pullRequestEvents.language}
                                    title={codeData.pullRequestEvents.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 定时和手动触发</h4>
                            {codeData.scheduleAndManualTriggers && (
                                <CodeHighlight
                                    code={codeData.scheduleAndManualTriggers.code}
                                    language={codeData.scheduleAndManualTriggers.language}
                                    title={codeData.scheduleAndManualTriggers.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 作业配置 */}
                <Card title="💼 作业配置与策略" className={styles.content_card}>
                    <div className={styles.jobs_section}>
                        <h3>基本作业配置</h3>
                        {codeData.basicJobConfiguration && (
                            <CodeHighlight
                                code={codeData.basicJobConfiguration.code}
                                language={codeData.basicJobConfiguration.language}
                                title={codeData.basicJobConfiguration.title}
                            />
                        )}

                        <h3>环境变量和密钥</h3>
                        {codeData.environmentVariablesAndSecrets && (
                            <CodeHighlight
                                code={codeData.environmentVariablesAndSecrets.code}
                                language={codeData.environmentVariablesAndSecrets.language}
                                title={codeData.environmentVariablesAndSecrets.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 常用Actions */}
                <Card title="🎬 常用Actions与实践" className={styles.content_card}>
                    <div className={styles.actions_section}>
                        <h3>官方Actions</h3>
                        {codeData.officialActions && (
                            <CodeHighlight
                                code={codeData.officialActions.code}
                                language={codeData.officialActions.language}
                                title={codeData.officialActions.title}
                            />
                        )}

                        <h3>第三方Actions</h3>
                        {codeData.thirdPartyActions && (
                            <CodeHighlight
                                code={codeData.thirdPartyActions.code}
                                language={codeData.thirdPartyActions.language}
                                title={codeData.thirdPartyActions.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 实际应用示例 */}
                <Card title="🛠️ 实际应用示例" className={styles.content_card}>
                    <div className={styles.example_section}>
                        <h3>1. 前端项目CI/CD</h3>
                        {codeData.frontendCICD && (
                            <CodeHighlight
                                code={codeData.frontendCICD.code}
                                language={codeData.frontendCICD.language}
                                title={codeData.frontendCICD.title}
                            />
                        )}

                        <h3>2. 自动化发布流程</h3>
                        {codeData.automaticRelease && (
                            <CodeHighlight
                                code={codeData.automaticRelease.code}
                                language={codeData.automaticRelease.language}
                                title={codeData.automaticRelease.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ GitHub Actions 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 安全性最佳实践</h4>
                                <p>保护敏感信息和工作流安全</p>
                                <ul>
                                    <li>使用Secrets存储敏感信息</li>
                                    <li>限制工作流权限</li>
                                    <li>使用OIDC进行云服务认证</li>
                                    <li>定期更新Actions版本</li>
                                    <li>审查第三方Actions的安全性</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能优化</h4>
                                <p>提高工作流执行效率</p>
                                {codeData.performanceOptimization && (
                                    <CodeHighlight
                                        code={codeData.performanceOptimization.code}
                                        language={codeData.performanceOptimization.language}
                                        title={codeData.performanceOptimization.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 可维护性</h4>
                                <p>编写可维护的工作流</p>
                                <ul>
                                    <li>使用有意义的作业和步骤名称</li>
                                    <li>添加适当的注释</li>
                                    <li>模块化复杂的工作流</li>
                                    <li>使用可重用的工作流</li>
                                    <li>定期清理不用的工作流</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 监控和调试</h4>
                                <p>有效监控和调试工作流</p>
                                <ul>
                                    <li>添加适当的日志输出</li>
                                    <li>使用工作流状态检查</li>
                                    <li>设置失败通知</li>
                                    <li>保存调试信息</li>
                                    <li>使用工作流可视化工具</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GitHubActionsDetail
