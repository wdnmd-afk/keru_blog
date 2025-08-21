import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    FunctionOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const UnitTestingDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Jest', 'unit-testing')

    const handleBack = () => {
        navigate('/technology/jest')
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
                    返回Jest技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <FunctionOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Jest 单元测试</h1>
                    <p>掌握Jest单元测试的编写方法和最佳实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">单元测试</Tag>
                        <Tag color="blue">断言</Tag>
                        <Tag color="orange">边界测试</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_section}>
                {/* 概述 */}
                <Card title="📋 单元测试概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是单元测试</h3>
                        <p>
                            单元测试是对软件中最小可测试单元进行检查和验证的过程。
                            在JavaScript中，通常是对函数、类或模块进行测试，
                            确保它们在各种输入条件下都能产生预期的输出。
                        </p>

                        <h3>单元测试的特点</h3>
                        <div className={styles.features}>
                            <Tag color="blue">独立性</Tag>
                            <Tag color="green">快速执行</Tag>
                            <Tag color="orange">可重复</Tag>
                            <Tag color="red">自动化</Tag>
                            <Tag color="purple">明确结果</Tag>
                        </div>

                        <h3>单元测试的价值</h3>
                        <ul>
                            <li><strong>早期发现问题</strong>：在开发阶段就发现和修复bug</li>
                            <li><strong>重构保障</strong>：为代码重构提供安全网</li>
                            <li><strong>文档作用</strong>：测试用例是最好的代码文档</li>
                            <li><strong>设计改进</strong>：促进更好的代码设计</li>
                            <li><strong>回归测试</strong>：防止新功能破坏现有功能</li>
                        </ul>
                    </div>
                </Card>

                {/* 基础测试 */}
                <Card title="🚀 基础函数测试" className={styles.content_card}>
                    <div className={styles.basic_testing}>
                        <h3>简单函数测试</h3>
                        {codeData.basicFunctionTesting && (
                            <CodeHighlight
                                code={codeData.basicFunctionTesting.code}
                                language={codeData.basicFunctionTesting.language}
                                title={codeData.basicFunctionTesting.title}
                            />
                        )}
                        
                        <h3>边界条件测试</h3>
                        {codeData.boundaryTesting && (
                            <CodeHighlight
                                code={codeData.boundaryTesting.code}
                                language={codeData.boundaryTesting.language}
                                title={codeData.boundaryTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 类测试 */}
                <Card title="🏗️ 类和对象测试" className={styles.content_card}>
                    <div className={styles.class_testing}>
                        <h3>类方法测试</h3>
                        {codeData.classTesting && (
                            <CodeHighlight
                                code={codeData.classTesting.code}
                                language={codeData.classTesting.language}
                                title={codeData.classTesting.title}
                            />
                        )}
                        
                        <h3>状态测试</h3>
                        {codeData.stateTesting && (
                            <CodeHighlight
                                code={codeData.stateTesting.code}
                                language={codeData.stateTesting.language}
                                title={codeData.stateTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 异常测试 */}
                <Card title="⚠️ 异常和错误测试" className={styles.content_card}>
                    <div className={styles.error_testing}>
                        <h3>异常抛出测试</h3>
                        {codeData.exceptionTesting && (
                            <CodeHighlight
                                code={codeData.exceptionTesting.code}
                                language={codeData.exceptionTesting.language}
                                title={codeData.exceptionTesting.title}
                            />
                        )}
                        
                        <h3>错误处理测试</h3>
                        {codeData.errorHandling && (
                            <CodeHighlight
                                code={codeData.errorHandling.code}
                                language={codeData.errorHandling.language}
                                title={codeData.errorHandling.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 参数化测试 */}
                <Card title="🔄 参数化测试" className={styles.content_card}>
                    <div className={styles.parameterized_testing}>
                        <h3>测试数据驱动</h3>
                        {codeData.parameterizedTesting && (
                            <CodeHighlight
                                code={codeData.parameterizedTesting.code}
                                language={codeData.parameterizedTesting.language}
                                title={codeData.parameterizedTesting.title}
                            />
                        )}
                        
                        <h3>测试用例生成</h3>
                        {codeData.testCaseGeneration && (
                            <CodeHighlight
                                code={codeData.testCaseGeneration.code}
                                language={codeData.testCaseGeneration.language}
                                title={codeData.testCaseGeneration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 测试组织 */}
                <Card title="📚 测试组织与结构" className={styles.content_card}>
                    <div className={styles.test_organization}>
                        <h3>测试分组</h3>
                        {codeData.testGrouping && (
                            <CodeHighlight
                                code={codeData.testGrouping.code}
                                language={codeData.testGrouping.language}
                                title={codeData.testGrouping.title}
                            />
                        )}
                        
                        <h3>测试生命周期</h3>
                        {codeData.testLifecycle && (
                            <CodeHighlight
                                code={codeData.testLifecycle.code}
                                language={codeData.testLifecycle.language}
                                title={codeData.testLifecycle.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 单元测试最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="测试编写原则"
                            description={
                                <ul>
                                    <li>遵循 AAA 模式：Arrange（准备）、Act（执行）、Assert（断言）</li>
                                    <li>一个测试只验证一个行为</li>
                                    <li>测试名称要清晰描述测试场景</li>
                                    <li>测试应该独立且可重复执行</li>
                                    <li>优先测试核心业务逻辑</li>
                                    <li>测试边界条件和异常情况</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="测试质量保证"
                            description={
                                <ul>
                                    <li><strong>覆盖率目标</strong>：核心逻辑达到90%以上覆盖率</li>
                                    <li><strong>测试数据</strong>：使用有意义的测试数据</li>
                                    <li><strong>断言明确</strong>：使用最具体的断言方法</li>
                                    <li><strong>失败信息</strong>：提供清晰的失败信息</li>
                                    <li><strong>测试维护</strong>：定期更新和重构测试代码</li>
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
                                    <li><strong>避免测试实现细节</strong>：测试行为而非实现</li>
                                    <li><strong>避免脆弱测试</strong>：减少对外部依赖的耦合</li>
                                    <li><strong>避免重复测试</strong>：不要测试框架或库的功能</li>
                                    <li><strong>避免复杂测试</strong>：保持测试简单易懂</li>
                                    <li><strong>避免忽略失败</strong>：及时修复失败的测试</li>
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

export default UnitTestingDetail
