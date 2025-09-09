import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, ExperimentOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const MockingDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Jest', 'mocking')

    const handleBack = () => {
        navigate('/technology/jest')
    }

    if (loading) {
        return <div className={styles.loading}>{t('detail_pages.common.loading')}</div>
    }

    if (error) {
        return (
            <div className={styles.error}>
                {t('detail_pages.common.load_failed')}: {error}
            </div>
        )
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
                    返回Jest技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ExperimentOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Jest Mock 与 Spy</h1>
                    <p>掌握Jest的Mock功能，实现依赖隔离和行为验证</p>
                    <div className={styles.topic_tags}>
                        <Tag color="purple">Mock</Tag>
                        <Tag color="blue">Spy</Tag>
                        <Tag color="orange">依赖隔离</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_section}>
                {/* 概述 */}
                <Card title="📋 Mock 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是 Mock</h3>
                        <p>
                            Mock 是测试中的一种技术，用于创建虚假的对象或函数来替代真实的依赖项。
                            通过 Mock，我们可以控制依赖项的行为，隔离被测试的代码，
                            并验证代码与依赖项之间的交互。
                        </p>

                        <h3>Mock 的类型</h3>
                        <div className={styles.mock_types}>
                            <Tag color="blue">函数 Mock</Tag>
                            <Tag color="green">模块 Mock</Tag>
                            <Tag color="orange">类 Mock</Tag>
                            <Tag color="red">部分 Mock</Tag>
                            <Tag color="purple">Spy</Tag>
                        </div>

                        <h3>Mock 的作用</h3>
                        <ul>
                            <li>
                                <strong>依赖隔离</strong>：隔离外部依赖，专注测试目标代码
                            </li>
                            <li>
                                <strong>行为控制</strong>：控制依赖项的返回值和行为
                            </li>
                            <li>
                                <strong>交互验证</strong>：验证函数调用次数和参数
                            </li>
                            <li>
                                <strong>性能提升</strong>：避免真实的网络请求或数据库操作
                            </li>
                            <li>
                                <strong>边界测试</strong>：模拟错误情况和边界条件
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 函数Mock */}
                <Card title="🔧 函数 Mock" className={styles.content_card}>
                    <div className={styles.function_mock}>
                        <h3>基础函数 Mock</h3>
                        {codeData.basicFunctionMock && (
                            <CodeHighlight
                                code={codeData.basicFunctionMock.code}
                                language={codeData.basicFunctionMock.language}
                                title={codeData.basicFunctionMock.title}
                            />
                        )}

                        <h3>Mock 返回值</h3>
                        {codeData.mockReturnValues && (
                            <CodeHighlight
                                code={codeData.mockReturnValues.code}
                                language={codeData.mockReturnValues.language}
                                title={codeData.mockReturnValues.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 模块Mock */}
                <Card title="📦 模块 Mock" className={styles.content_card}>
                    <div className={styles.module_mock}>
                        <h3>完整模块 Mock</h3>
                        {codeData.moduleMock && (
                            <CodeHighlight
                                code={codeData.moduleMock.code}
                                language={codeData.moduleMock.language}
                                title={codeData.moduleMock.title}
                            />
                        )}

                        <h3>部分模块 Mock</h3>
                        {codeData.partialModuleMock && (
                            <CodeHighlight
                                code={codeData.partialModuleMock.code}
                                language={codeData.partialModuleMock.language}
                                title={codeData.partialModuleMock.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Spy功能 */}
                <Card title="🕵️ Spy 功能" className={styles.content_card}>
                    <div className={styles.spy_section}>
                        <h3>对象方法 Spy</h3>
                        {codeData.objectSpy && (
                            <CodeHighlight
                                code={codeData.objectSpy.code}
                                language={codeData.objectSpy.language}
                                title={codeData.objectSpy.title}
                            />
                        )}

                        <h3>全局函数 Spy</h3>
                        {codeData.globalSpy && (
                            <CodeHighlight
                                code={codeData.globalSpy.code}
                                language={codeData.globalSpy.language}
                                title={codeData.globalSpy.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Mock实现 */}
                <Card title="⚙️ Mock 实现策略" className={styles.content_card}>
                    <div className={styles.mock_implementation}>
                        <h3>自定义 Mock 实现</h3>
                        {codeData.customMockImplementation && (
                            <CodeHighlight
                                code={codeData.customMockImplementation.code}
                                language={codeData.customMockImplementation.language}
                                title={codeData.customMockImplementation.title}
                            />
                        )}

                        <h3>异步 Mock</h3>
                        {codeData.asyncMock && (
                            <CodeHighlight
                                code={codeData.asyncMock.code}
                                language={codeData.asyncMock.language}
                                title={codeData.asyncMock.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Mock验证 */}
                <Card title="✅ Mock 验证" className={styles.content_card}>
                    <div className={styles.mock_verification}>
                        <h3>调用验证</h3>
                        {codeData.callVerification && (
                            <CodeHighlight
                                code={codeData.callVerification.code}
                                language={codeData.callVerification.language}
                                title={codeData.callVerification.title}
                            />
                        )}

                        <h3>高级验证</h3>
                        {codeData.advancedVerification && (
                            <CodeHighlight
                                code={codeData.advancedVerification.code}
                                language={codeData.advancedVerification.language}
                                title={codeData.advancedVerification.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 Mock 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="Mock 使用原则"
                            description={
                                <ul>
                                    <li>只 Mock 必要的依赖项，避免过度 Mock</li>
                                    <li>Mock 应该尽可能简单和明确</li>
                                    <li>验证重要的交互，忽略实现细节</li>
                                    <li>使用有意义的 Mock 数据</li>
                                    <li>在测试后清理 Mock 状态</li>
                                    <li>优先使用真实对象，必要时才使用 Mock</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="Mock 策略选择"
                            description={
                                <ul>
                                    <li>
                                        <strong>函数 Mock</strong>：测试单个函数的行为
                                    </li>
                                    <li>
                                        <strong>模块 Mock</strong>：隔离整个模块的依赖
                                    </li>
                                    <li>
                                        <strong>部分 Mock</strong>：只 Mock 模块的部分功能
                                    </li>
                                    <li>
                                        <strong>Spy</strong>：监视真实函数的调用情况
                                    </li>
                                    <li>
                                        <strong>手动 Mock</strong>：创建自定义的 Mock 实现
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="常见陷阱避免"
                            description={
                                <ul>
                                    <li>
                                        <strong>过度 Mock</strong>：避免 Mock 所有依赖项
                                    </li>
                                    <li>
                                        <strong>Mock 泄露</strong>：确保测试间 Mock 状态隔离
                                    </li>
                                    <li>
                                        <strong>实现耦合</strong>：避免 Mock 与实现细节耦合
                                    </li>
                                    <li>
                                        <strong>验证过度</strong>：只验证重要的交互行为
                                    </li>
                                    <li>
                                        <strong>Mock 复杂化</strong>：保持 Mock 简单易懂
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

export default MockingDetail
