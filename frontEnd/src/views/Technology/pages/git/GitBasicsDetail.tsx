import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    GithubOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const GitBasicsDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'basics')

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
                    <h1>Git 基础操作详解</h1>
                    <p>掌握Git版本控制的核心概念与基本命令</p>
                    <div className={styles.topic_tags}>
                        <Tag color="red">Git</Tag>
                        <Tag color="blue">版本控制</Tag>
                        <Tag color="green">基础命令</Tag>
                        <Tag color="orange">工作流</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Git 核心概念 */}
                <Card title="📚 Git 核心概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>Git 的三个区域</h3>
                        <div className={styles.git_areas}>
                            <div className={styles.area_item}>
                                <h4>📁 工作区 (Working Directory)</h4>
                                <p>当前正在编辑的文件所在的目录，包含项目的实际文件</p>
                            </div>
                            <div className={styles.area_arrow}>→</div>
                            <div className={styles.area_item}>
                                <h4>📋 暂存区 (Staging Area)</h4>
                                <p>准备提交的文件快照存储区域，也称为索引(Index)</p>
                            </div>
                            <div className={styles.area_arrow}>→</div>
                            <div className={styles.area_item}>
                                <h4>🗄️ 版本库 (Repository)</h4>
                                <p>存储项目历史版本的数据库，包含所有提交记录</p>
                            </div>
                        </div>

                        <h3>Git 对象模型</h3>
                        {codeData.gitObjectModel && (
                            <CodeHighlight
                                code={codeData.gitObjectModel.code}
                                language={codeData.gitObjectModel.language}
                                title={codeData.gitObjectModel.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 基础命令 */}
                <Card title="⚡ Git 基础命令" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 仓库初始化与配置</h4>
                            {codeData.gitInstallation && (
                                <CodeHighlight
                                    code={codeData.gitInstallation.code}
                                    language={codeData.gitInstallation.language}
                                    title={codeData.gitInstallation.title}
                                />
                            )}
                            {codeData.repositoryInit && (
                                <CodeHighlight
                                    code={codeData.repositoryInit.code}
                                    language={codeData.repositoryInit.language}
                                    title={codeData.repositoryInit.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 文件状态管理</h4>
                            {codeData.basicWorkflow && (
                                <CodeHighlight
                                    code={codeData.basicWorkflow.code}
                                    language={codeData.basicWorkflow.language}
                                    title={codeData.basicWorkflow.title}
                                />
                            )}
                            {codeData.fileOperations && (
                                <CodeHighlight
                                    code={codeData.fileOperations.code}
                                    language={codeData.fileOperations.language}
                                    title={codeData.fileOperations.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 提交管理</h4>
                            {codeData.commitBestPractices && (
                                <CodeHighlight
                                    code={codeData.commitBestPractices.code}
                                    language={codeData.commitBestPractices.language}
                                    title={codeData.commitBestPractices.title}
                                />
                            )}
                            {codeData.historyNavigation && (
                                <CodeHighlight
                                    code={codeData.historyNavigation.code}
                                    language={codeData.historyNavigation.language}
                                    title={codeData.historyNavigation.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 分支操作 */}
                <Card title="🌿 分支操作" className={styles.content_card}>
                    <div className={styles.branch_section}>
                        <h3>分支基础操作</h3>
                        {codeData.branchBasics && (
                            <CodeHighlight
                                code={codeData.branchBasics.code}
                                language={codeData.branchBasics.language}
                                title={codeData.branchBasics.title}
                            />
                        )}

                        <h3>分支合并策略</h3>
                        {codeData.mergeStrategies && (
                            <CodeHighlight
                                code={codeData.mergeStrategies.code}
                                language={codeData.mergeStrategies.language}
                                title={codeData.mergeStrategies.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 远程仓库 */}
                <Card title="🌐 远程仓库操作" className={styles.content_card}>
                    <div className={styles.remote_section}>
                        <h3>远程仓库管理</h3>
                        {codeData.remoteOperations && (
                            <CodeHighlight
                                code={codeData.remoteOperations.code}
                                language={codeData.remoteOperations.language}
                                title={codeData.remoteOperations.title}
                            />
                        )}

                        <h3>同步操作</h3>
                        {codeData.remoteOperations && (
                            <CodeHighlight
                                code={codeData.remoteOperations.code}
                                language={codeData.remoteOperations.language}
                                title="远程同步操作"
                            />
                        )}
                    </div>
                </Card>

                {/* 撤销操作 */}
                <Card title="↩️ 撤销与回退操作" className={styles.content_card}>
                    <div className={styles.undo_section}>
                        <h3>撤销操作</h3>
                        {codeData.undoOperations && (
                            <CodeHighlight
                                code={codeData.undoOperations.code}
                                language={codeData.undoOperations.language}
                                title={codeData.undoOperations.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Git 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 提交信息规范</h4>
                                <p>编写清晰、有意义的提交信息</p>
                                {codeData.commitMessageFormat && (
                                    <CodeHighlight
                                        code={codeData.commitMessageFormat.code}
                                        language={codeData.commitMessageFormat.language}
                                        title={codeData.commitMessageFormat.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. .gitignore 配置</h4>
                                <p>合理配置忽略文件，避免提交不必要的文件</p>
                                {codeData.gitignoreExample && (
                                    <CodeHighlight
                                        code={codeData.gitignoreExample.code}
                                        language={codeData.gitignoreExample.language}
                                        title={codeData.gitignoreExample.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 分支命名规范</h4>
                                <p>使用有意义的分支名称，便于团队协作</p>
                                <ul>
                                    <li><strong>feature/</strong>：新功能分支</li>
                                    <li><strong>bugfix/</strong>：bug修复分支</li>
                                    <li><strong>hotfix/</strong>：紧急修复分支</li>
                                    <li><strong>release/</strong>：发布分支</li>
                                    <li><strong>chore/</strong>：杂务分支</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 安全注意事项</h4>
                                <p>保护敏感信息，避免安全风险</p>
                                <ul>
                                    <li>不要提交密码、API密钥等敏感信息</li>
                                    <li>使用环境变量管理配置</li>
                                    <li>定期检查提交历史中的敏感信息</li>
                                    <li>使用GPG签名验证提交身份</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GitBasicsDetail
