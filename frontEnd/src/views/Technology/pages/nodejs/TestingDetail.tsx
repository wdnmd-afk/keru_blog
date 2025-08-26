import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, ExperimentOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TestingDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('NodeJS', 'testing')

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
        <div className={styles.container}>
            <div className={styles.header}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回NodeJS
                </Button>
                <h1>
                    <ExperimentOutlined /> Node.js 测试
                </h1>
                <p>学习Node.js应用的单元测试、集成测试和测试驱动开发</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 测试概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>为什么需要测试</h3>
                        <p>
                            测试是软件开发中确保代码质量和功能正确性的重要手段。
                            通过编写测试，我们可以及早发现bug，提高代码的可维护性和可靠性。
                        </p>

                        <h3>测试类型</h3>
                        <div className={styles.test_types}>
                            <Tag color="blue">单元测试</Tag>
                            <Tag color="green">集成测试</Tag>
                            <Tag color="orange">端到端测试</Tag>
                            <Tag color="red">性能测试</Tag>
                            <Tag color="purple">安全测试</Tag>
                        </div>

                        <h3>测试的好处</h3>
                        <ul>
                            <li>
                                <strong>提高代码质量</strong>：及早发现和修复bug
                            </li>
                            <li>
                                <strong>增强信心</strong>：确保代码按预期工作
                            </li>
                            <li>
                                <strong>便于重构</strong>：安全地修改和优化代码
                            </li>
                            <li>
                                <strong>文档作用</strong>：测试用例说明代码的预期行为
                            </li>
                            <li>
                                <strong>团队协作</strong>：确保团队成员对功能的理解一致
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* Jest 基础 */}
                <Card title="🧪 Jest 基础测试" className={styles.content_card}>
                    <div className={styles.jest_section}>
                        <h3>基本测试语法</h3>
                        {codeData.jestBasic && (
                            <CodeHighlight
                                code={codeData.jestBasic.code}
                                language={codeData.jestBasic.language}
                                title={codeData.jestBasic.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 异步测试 */}
                <Card title="⏰ 异步测试" className={styles.content_card}>
                    <div className={styles.async_section}>
                        <h3>Promise 和 async/await 测试</h3>
                        {codeData.asyncTesting && (
                            <CodeHighlight
                                code={codeData.asyncTesting.code}
                                language={codeData.asyncTesting.language}
                                title={codeData.asyncTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Mock 和 Spy */}
                <Card title="🎭 Mock 和 Spy" className={styles.content_card}>
                    <div className={styles.mock_section}>
                        <h3>模拟和监听</h3>
                        {codeData.mockingSpying && (
                            <CodeHighlight
                                code={codeData.mockingSpying.code}
                                language={codeData.mockingSpying.language}
                                title={codeData.mockingSpying.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 集成测试 */}
                <Card title="🔗 集成测试" className={styles.content_card}>
                    <div className={styles.integration_section}>
                        <h3>API 集成测试</h3>
                        {codeData.integrationTesting && (
                            <CodeHighlight
                                code={codeData.integrationTesting.code}
                                language={codeData.integrationTesting.language}
                                title={codeData.integrationTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 测试配置 */}
                <Card title="⚙️ 测试配置" className={styles.content_card}>
                    <div className={styles.config_section}>
                        <h3>Jest 配置和工具</h3>
                        {codeData.testConfiguration && (
                            <CodeHighlight
                                code={codeData.testConfiguration.code}
                                language={codeData.testConfiguration.language}
                                title={codeData.testConfiguration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 测试最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="测试编写原则"
                            description={
                                <ul>
                                    <li>
                                        遵循AAA模式：Arrange（准备）、Act（执行）、Assert（断言）
                                    </li>
                                    <li>测试应该独立且可重复</li>
                                    <li>使用描述性的测试名称</li>
                                    <li>一个测试只验证一个功能点</li>
                                    <li>保持测试简单和快速</li>
                                    <li>使用适当的断言方法</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="测试覆盖率建议"
                            description={
                                <ul>
                                    <li>追求有意义的覆盖率，而非100%覆盖率</li>
                                    <li>重点测试核心业务逻辑</li>
                                    <li>测试边界条件和异常情况</li>
                                    <li>定期审查和更新测试用例</li>
                                    <li>使用测试驱动开发（TDD）方法</li>
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

export default TestingDetail
