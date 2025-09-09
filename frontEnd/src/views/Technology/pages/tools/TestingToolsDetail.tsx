import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, BugOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const TestingToolsDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'testing-tools')

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
                    <BugOutlined /> 测试工具
                </h1>
                <p>掌握前端测试工具和框架，确保代码质量和可靠性</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 测试工具概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>为什么需要测试</h3>
                        <p>
                            测试是软件开发中确保代码质量的重要环节。
                            通过自动化测试，我们可以及早发现bug，
                            提高代码的可靠性和可维护性，增强重构的信心。
                        </p>

                        <h3>测试类型</h3>
                        <div className={styles.test_types}>
                            <Tag color="blue">单元测试</Tag>
                            <Tag color="green">集成测试</Tag>
                            <Tag color="orange">E2E测试</Tag>
                            <Tag color="red">组件测试</Tag>
                            <Tag color="purple">视觉测试</Tag>
                            <Tag color="cyan">性能测试</Tag>
                        </div>

                        <h3>测试金字塔</h3>
                        <ul>
                            <li>
                                <strong>单元测试</strong>：测试独立的函数和组件
                            </li>
                            <li>
                                <strong>集成测试</strong>：测试模块间的交互
                            </li>
                            <li>
                                <strong>E2E测试</strong>：测试完整的用户流程
                            </li>
                            <li>
                                <strong>手动测试</strong>：探索性测试和用户体验测试
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* Jest测试框架 */}
                <Card title="🃏 Jest 测试框架" className={styles.content_card}>
                    <div className={styles.jest_section}>
                        <h3>Jest 配置与基础使用</h3>
                        {codeData.jestConfiguration && (
                            <CodeHighlight
                                code={codeData.jestConfiguration.code}
                                language={codeData.jestConfiguration.language}
                                title={codeData.jestConfiguration.title}
                            />
                        )}

                        <h3>基础测试示例</h3>
                        {codeData.jestBasicTests && (
                            <CodeHighlight
                                code={codeData.jestBasicTests.code}
                                language={codeData.jestBasicTests.language}
                                title={codeData.jestBasicTests.title}
                            />
                        )}

                        <h3>React 组件测试</h3>
                        {codeData.reactTesting && (
                            <CodeHighlight
                                code={codeData.reactTesting.code}
                                language={codeData.reactTesting.language}
                                title={codeData.reactTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Playwright E2E测试 */}
                <Card title="🎭 Playwright E2E测试" className={styles.content_card}>
                    <div className={styles.playwright_section}>
                        <h3>Playwright 配置</h3>
                        {codeData.playwrightConfiguration && (
                            <CodeHighlight
                                code={codeData.playwrightConfiguration.code}
                                language={codeData.playwrightConfiguration.language}
                                title={codeData.playwrightConfiguration.title}
                            />
                        )}

                        <h3>E2E 测试示例</h3>
                        {codeData.playwrightTests && (
                            <CodeHighlight
                                code={codeData.playwrightTests.code}
                                language={codeData.playwrightTests.language}
                                title={codeData.playwrightTests.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Storybook组件测试 */}
                <Card title="📚 Storybook 组件测试" className={styles.content_card}>
                    <div className={styles.storybook_section}>
                        <h3>Storybook 配置</h3>
                        {codeData.storybookConfiguration && (
                            <CodeHighlight
                                code={codeData.storybookConfiguration.code}
                                language={codeData.storybookConfiguration.language}
                                title={codeData.storybookConfiguration.title}
                            />
                        )}

                        <h3>Story 编写</h3>
                        {codeData.storybookStories && (
                            <CodeHighlight
                                code={codeData.storybookStories.code}
                                language={codeData.storybookStories.language}
                                title={codeData.storybookStories.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 测试最佳实践 */}
                <Card title="💡 测试最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices_section}>
                        <h3>测试编写技巧</h3>
                        {codeData.testingBestPractices && (
                            <CodeHighlight
                                code={codeData.testingBestPractices.code}
                                language={codeData.testingBestPractices.language}
                                title={codeData.testingBestPractices.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践建议 */}
                <Card title="🎯 测试策略建议" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="测试编写原则"
                            description={
                                <ul>
                                    <li>
                                        遵循AAA模式：Arrange（准备）、Act（执行）、Assert（断言）
                                    </li>
                                    <li>测试应该独立、可重复、快速执行</li>
                                    <li>测试名称应该清晰描述测试场景</li>
                                    <li>优先测试核心业务逻辑和边界情况</li>
                                    <li>保持测试代码的简洁和可读性</li>
                                    <li>定期重构和维护测试代码</li>
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
                                    <li>
                                        <strong>单元测试</strong>：核心业务逻辑达到90%以上覆盖率
                                    </li>
                                    <li>
                                        <strong>集成测试</strong>：关键用户流程100%覆盖
                                    </li>
                                    <li>
                                        <strong>E2E测试</strong>：主要业务场景覆盖
                                    </li>
                                    <li>
                                        <strong>组件测试</strong>：UI组件的各种状态和交互
                                    </li>
                                    <li>
                                        <strong>API测试</strong>：接口的正常和异常情况
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="测试工具选择"
                            description={
                                <ul>
                                    <li>
                                        <strong>Jest</strong>：JavaScript单元测试的首选框架
                                    </li>
                                    <li>
                                        <strong>React Testing Library</strong>
                                        ：React组件测试最佳实践
                                    </li>
                                    <li>
                                        <strong>Playwright</strong>：现代化的E2E测试工具
                                    </li>
                                    <li>
                                        <strong>Storybook</strong>：组件开发和测试的利器
                                    </li>
                                    <li>
                                        <strong>MSW</strong>：API Mock的现代解决方案
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

export default TestingToolsDetail
