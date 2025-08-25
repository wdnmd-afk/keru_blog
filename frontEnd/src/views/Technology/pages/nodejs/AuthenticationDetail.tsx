import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    SafetyOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined,
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'

const AuthenticationDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('NodeJS', 'authenticationBestPractices')

    const handleBack = () => {
        navigate('/technology/nodejs')
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
                    返回Node.js技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <SafetyOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Node.js 身份认证详解</h1>
                    <p>掌握Node.js应用的身份认证与授权机制</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">身份认证</Tag>
                        <Tag color="green">JWT</Tag>
                        <Tag color="orange">OAuth</Tag>
                        <Tag color="purple">Session</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 认证方式对比 */}
                <Card title="🔐 认证方式对比" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>主流认证方式</h3>
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h4>🍪 Session + Cookie</h4>
                                <p>
                                    <strong>传统方式</strong>：服务器端存储会话信息
                                </p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>服务器完全控制会话</li>
                                            <li>可以随时撤销会话</li>
                                            <li>相对安全</li>
                                            <li>实现简单</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>服务器存储压力</li>
                                            <li>扩展性差</li>
                                            <li>跨域问题</li>
                                            <li>移动端支持差</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.comparison_item}>
                                <h4>🎫 JWT Token</h4>
                                <p>
                                    <strong>无状态方式</strong>：客户端存储令牌信息
                                </p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>无状态，易扩展</li>
                                            <li>跨域友好</li>
                                            <li>移动端支持好</li>
                                            <li>减少服务器存储</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>难以撤销令牌</li>
                                            <li>令牌可能较大</li>
                                            <li>需要处理过期</li>
                                            <li>安全性依赖实现</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Alert
                            message="选择建议"
                            description="对于单体应用推荐Session，对于微服务和移动应用推荐JWT。也可以结合使用，短期用JWT，长期用Refresh Token。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>

                {/* Session认证 */}
                <Card title="🍪 Session 认证实现" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Express Session配置</h4>
                            {codeData.sessionAuth && (
                                <CodeHighlight
                                    code={codeData.sessionAuth.code}
                                    language={codeData.sessionAuth.language}
                                    title={codeData.sessionAuth.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 密码安全处理</h4>
                            {codeData.passwordSecurity && (
                                <CodeHighlight
                                    code={codeData.passwordSecurity.code}
                                    language={codeData.passwordSecurity.language}
                                    title={codeData.passwordSecurity.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 会话管理</h4>
                            {codeData.sessionManagement && (
                                <CodeHighlight
                                    code={codeData.sessionManagement.code}
                                    language={codeData.sessionManagement.language}
                                    title={codeData.sessionManagement.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* JWT认证 */}
                <Card title="🎫 JWT 认证实现" className={styles.content_card}>
                    <div className={styles.jwt_section}>
                        <h3>JWT基础实现</h3>
                        {codeData.jwtBasic && (
                            <CodeHighlight
                                code={codeData.jwtBasic.code}
                                language={codeData.jwtBasic.language}
                                title={codeData.jwtBasic.title}
                            />
                        )}

                        <h3>JWT安全增强</h3>
                        {codeData.jwtSecurity && (
                            <CodeHighlight
                                code={codeData.jwtSecurity.code}
                                language={codeData.jwtSecurity.language}
                                title={codeData.jwtSecurity.title}
                            />
                        )}
                    </div>
                </Card>

                {/* OAuth集成 */}
                <Card title="🔗 OAuth 第三方登录" className={styles.content_card}>
                    <div className={styles.oauth_section}>
                        <h3>OAuth第三方登录</h3>
                        {codeData.oauthIntegration && (
                            <CodeHighlight
                                code={codeData.oauthIntegration.code}
                                language={codeData.oauthIntegration.language}
                                title={codeData.oauthIntegration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 身份认证最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 安全存储</h4>
                                <p>安全地存储和传输认证信息</p>
                                <ul>
                                    <li>使用强加密算法存储密码</li>
                                    <li>使用HTTPS传输敏感信息</li>
                                    <li>设置安全的Cookie属性</li>
                                    <li>定期轮换密钥和令牌</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 会话管理</h4>
                                <p>合理管理用户会话</p>
                                <ul>
                                    <li>设置合适的会话过期时间</li>
                                    <li>实施会话固定攻击防护</li>
                                    <li>监控异常登录行为</li>
                                    <li>提供安全的登出机制</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 多因素认证</h4>
                                <p>增强账户安全性</p>
                                <ul>
                                    <li>支持短信验证码</li>
                                    <li>集成TOTP应用</li>
                                    <li>提供备用恢复码</li>
                                    <li>实施风险评估</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 错误处理</h4>
                                <p>安全的错误处理机制</p>
                                <ul>
                                    <li>避免泄露敏感信息</li>
                                    <li>实施登录尝试限制</li>
                                    <li>记录安全相关日志</li>
                                    <li>提供友好的错误提示</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AuthenticationDetail
