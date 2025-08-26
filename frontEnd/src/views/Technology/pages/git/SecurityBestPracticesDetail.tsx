import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, SafetyOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SecurityBestPracticesDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'securityBestPractices')

    if (loading) return <div>加载中...</div>
    if (error) return <div>加载失败: {error}</div>

    const handleBack = () => {
        navigate('/technology/git')
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
                    <SafetyOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git 安全最佳实践详解</h1>
                    <p>掌握Git和GitHub的安全防护与最佳实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Git安全</Tag>
                        <Tag color="green">最佳实践</Tag>
                        <Tag color="orange">安全防护</Tag>
                        <Tag color="purple">权限管理</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 安全威胁概述 */}
                <Card title="🛡️ Git 安全威胁概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>常见安全威胁</h3>
                        <p>
                            Git和GitHub作为代码管理的核心工具，面临着多种安全威胁。了解这些威胁是制定有效防护策略的第一步。
                        </p>

                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔐 凭据泄露</h4>
                                <p>敏感信息意外提交</p>
                                <ul>
                                    <li>API密钥和令牌</li>
                                    <li>数据库连接字符串</li>
                                    <li>私钥和证书</li>
                                    <li>密码和配置文件</li>
                                </ul>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>👤 身份伪造</h4>
                                <p>提交身份验证问题</p>
                                <ul>
                                    <li>伪造提交者信息</li>
                                    <li>未签名的提交</li>
                                    <li>账户劫持</li>
                                    <li>社会工程攻击</li>
                                </ul>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🔓 权限滥用</h4>
                                <p>访问控制不当</p>
                                <ul>
                                    <li>过度权限分配</li>
                                    <li>权限管理不当</li>
                                    <li>分支保护不足</li>
                                    <li>第三方应用风险</li>
                                </ul>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🦠 恶意代码</h4>
                                <p>代码安全威胁</p>
                                <ul>
                                    <li>恶意依赖包</li>
                                    <li>供应链攻击</li>
                                    <li>代码注入</li>
                                    <li>后门植入</li>
                                </ul>
                            </div>
                        </div>

                        <Alert
                            message="安全提醒"
                            description="一旦敏感信息被提交到Git历史中，即使后续删除，仍可能被恶意用户获取。预防胜于治疗。"
                            type="warning"
                            showIcon
                        />
                    </div>
                </Card>

                {/* 敏感信息防护 */}
                <Card title="🔒 敏感信息防护" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 环境变量管理</h4>
                            {codeData?.environmentVariables && (
                                <CodeHighlight
                                    code={codeData.environmentVariables.code}
                                    language={codeData.environmentVariables.language}
                                    title={codeData.environmentVariables.title || '环境变量管理'}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. Git Secrets工具</h4>
                            {codeData?.gitSecrets && (
                                <CodeHighlight
                                    code={codeData.gitSecrets.code}
                                    language={codeData.gitSecrets.language}
                                    title={codeData.gitSecrets.title || 'Git Secrets工具'}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 敏感信息清理</h4>
                            {codeData?.sensitiveDataCleanup && (
                                <CodeHighlight
                                    code={codeData.sensitiveDataCleanup.code}
                                    language={codeData.sensitiveDataCleanup.language}
                                    title={codeData.sensitiveDataCleanup.title || '敏感信息清理'}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 身份验证与签名 */}
                <Card title="✍️ 身份验证与签名" className={styles.content_card}>
                    <div className={styles.security_section}>
                        <h3>GPG签名配置</h3>
                        {codeData?.gpgSigning && (
                            <CodeHighlight
                                code={codeData.gpgSigning.code}
                                language={codeData.gpgSigning.language}
                                title={codeData.gpgSigning.title || 'GPG签名配置'}
                            />
                        )}

                        <h3>SSH密钥管理</h3>
                        {codeData?.sshKeyManagement && (
                            <CodeHighlight
                                code={codeData.sshKeyManagement.code}
                                language={codeData.sshKeyManagement.language}
                                title={codeData.sshKeyManagement.title || 'SSH密钥管理'}
                            />
                        )}
                    </div>
                </Card>

                {/* 权限管理 */}
                <Card title="👥 权限管理与访问控制" className={styles.content_card}>
                    <div className={styles.access_section}>
                        <h3>GitHub权限管理</h3>
                        {codeData?.githubPermissions && (
                            <CodeHighlight
                                code={codeData.githubPermissions.code}
                                language={codeData.githubPermissions.language}
                                title={codeData.githubPermissions.title || 'GitHub权限管理'}
                            />
                        )}

                        <h3>访问令牌管理</h3>
                        {codeData?.accessTokenManagement && (
                            <CodeHighlight
                                code={codeData.accessTokenManagement.code}
                                language={codeData.accessTokenManagement.language}
                                title={codeData.accessTokenManagement.title || '访问令牌管理'}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Git 安全最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 预防措施</h4>
                                <p>建立安全防护机制</p>
                                <ul>
                                    <li>配置.gitignore忽略敏感文件</li>
                                    <li>使用环境变量管理配置</li>
                                    <li>部署Git Hooks进行检查</li>
                                    <li>定期进行安全审计</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 身份验证</h4>
                                <p>确保提交身份可信</p>
                                <ul>
                                    <li>启用GPG签名验证</li>
                                    <li>使用强密码和2FA</li>
                                    <li>定期轮换访问令牌</li>
                                    <li>监控异常登录活动</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 权限控制</h4>
                                <p>实施最小权限原则</p>
                                <ul>
                                    <li>合理分配仓库权限</li>
                                    <li>配置分支保护规则</li>
                                    <li>使用CODEOWNERS文件</li>
                                    <li>定期审查权限分配</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 应急响应</h4>
                                <p>制定安全事件响应计划</p>
                                <ul>
                                    <li>建立事件响应流程</li>
                                    <li>准备历史清理工具</li>
                                    <li>制定通知机制</li>
                                    <li>定期演练应急预案</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SecurityBestPracticesDetail
