import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ApiOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostmanDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'postman')

    const handleBack = () => {
        navigate('/technology/tools')
    }

    if (loading) {
        return <div className={styles.loading}>加载中...</div>
    }

    if (error) {
        return <div className={styles.error}>加载失败: {error}</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回工具
                </Button>
                <h1>
                    <ApiOutlined /> Postman API测试
                </h1>
                <p>掌握Postman API测试工具，提升接口开发和测试效率</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 Postman 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是 Postman</h3>
                        <p>
                            Postman 是一个功能强大的API开发和测试平台，
                            提供了完整的API生命周期管理工具， 从设计、测试到文档生成和监控。
                        </p>

                        <h3>主要功能</h3>
                        <div className={styles.features}>
                            <Tag color="blue">HTTP请求测试</Tag>
                            <Tag color="green">环境变量管理</Tag>
                            <Tag color="orange">自动化测试</Tag>
                            <Tag color="red">Mock服务器</Tag>
                            <Tag color="purple">API文档</Tag>
                            <Tag color="cyan">团队协作</Tag>
                        </div>

                        <h3>使用场景</h3>
                        <ul>
                            <li>
                                <strong>API开发</strong>：快速测试和调试API接口
                            </li>
                            <li>
                                <strong>自动化测试</strong>：编写和执行API测试套件
                            </li>
                            <li>
                                <strong>文档生成</strong>：自动生成API文档
                            </li>
                            <li>
                                <strong>团队协作</strong>：共享API集合和环境配置
                            </li>
                            <li>
                                <strong>监控</strong>：定期检查API可用性和性能
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 基础使用 */}
                <Card title="🚀 基础使用" className={styles.content_card}>
                    <div className={styles.basic_usage}>
                        <h3>HTTP请求测试</h3>
                        {codeData.basicRequests && (
                            <CodeHighlight
                                code={codeData.basicRequests.code}
                                language={codeData.basicRequests.language}
                                title={codeData.basicRequests.title}
                            />
                        )}

                        <h3>环境变量管理</h3>
                        {codeData.environmentVariables && (
                            <CodeHighlight
                                code={codeData.environmentVariables.code}
                                language={codeData.environmentVariables.language}
                                title={codeData.environmentVariables.title}
                            />
                        )}

                        <h3>测试脚本编写</h3>
                        {codeData.testScripts && (
                            <CodeHighlight
                                code={codeData.testScripts.code}
                                language={codeData.testScripts.language}
                                title={codeData.testScripts.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 高级功能 */}
                <Card title="⚡ 高级功能" className={styles.content_card}>
                    <div className={styles.advanced_features}>
                        <h3>Collection Runner 批量测试</h3>
                        {codeData.collectionRunner && (
                            <CodeHighlight
                                code={codeData.collectionRunner.code}
                                language={codeData.collectionRunner.language}
                                title={codeData.collectionRunner.title}
                            />
                        )}

                        <h3>Mock服务器</h3>
                        {codeData.mockServer && (
                            <CodeHighlight
                                code={codeData.mockServer.code}
                                language={codeData.mockServer.language}
                                title={codeData.mockServer.title}
                            />
                        )}

                        <h3>API文档生成</h3>
                        {codeData.apiDocumentation && (
                            <CodeHighlight
                                code={codeData.apiDocumentation.code}
                                language={codeData.apiDocumentation.language}
                                title={codeData.apiDocumentation.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Newman CLI */}
                <Card title="🖥️ Newman CLI 自动化" className={styles.content_card}>
                    <div className={styles.newman_section}>
                        <h3>Newman 命令行工具</h3>
                        {codeData.newmanCLI && (
                            <CodeHighlight
                                code={codeData.newmanCLI.code}
                                language={codeData.newmanCLI.language}
                                title={codeData.newmanCLI.title}
                            />
                        )}

                        <h3>自定义Newman脚本</h3>
                        {codeData.customNewmanScript && (
                            <CodeHighlight
                                code={codeData.customNewmanScript.code}
                                language={codeData.customNewmanScript.language}
                                title={codeData.customNewmanScript.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="Postman 使用建议"
                            description={
                                <ul>
                                    <li>合理组织Collection结构，按功能模块分类</li>
                                    <li>充分利用环境变量，避免硬编码</li>
                                    <li>编写完整的测试脚本，确保API质量</li>
                                    <li>使用Mock服务器进行前端开发</li>
                                    <li>定期更新和维护API文档</li>
                                    <li>集成CI/CD流程，实现自动化测试</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="测试策略建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>功能测试</strong>：验证API功能正确性
                                    </li>
                                    <li>
                                        <strong>边界测试</strong>：测试参数边界值
                                    </li>
                                    <li>
                                        <strong>异常测试</strong>：测试错误处理机制
                                    </li>
                                    <li>
                                        <strong>性能测试</strong>：检查响应时间
                                    </li>
                                    <li>
                                        <strong>安全测试</strong>：验证认证和授权
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="团队协作建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>统一规范</strong>：制定API命名和测试规范
                                    </li>
                                    <li>
                                        <strong>版本管理</strong>：使用Git管理Collection
                                    </li>
                                    <li>
                                        <strong>权限控制</strong>：合理分配团队权限
                                    </li>
                                    <li>
                                        <strong>文档维护</strong>：及时更新API文档
                                    </li>
                                    <li>
                                        <strong>监控告警</strong>：设置API监控和告警
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

export default PostmanDetail
