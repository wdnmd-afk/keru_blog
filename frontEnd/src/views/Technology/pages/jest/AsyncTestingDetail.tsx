import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    ClockCircleOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const AsyncTestingDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Jest', 'async-testing')

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
                    <ClockCircleOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Jest 异步测试</h1>
                    <p>掌握Promise、async/await和异步代码的测试方法</p>
                    <div className={styles.topic_tags}>
                        <Tag color="orange">异步测试</Tag>
                        <Tag color="blue">Promise</Tag>
                        <Tag color="green">async/await</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_section}>
                {/* 概述 */}
                <Card title="📋 异步测试概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>异步测试的重要性</h3>
                        <p>
                            现代JavaScript应用大量使用异步操作，如API调用、文件读写、定时器等。
                            正确测试异步代码对于确保应用的可靠性至关重要。
                            Jest提供了多种方法来处理异步测试场景。
                        </p>

                        <h3>异步测试类型</h3>
                        <div className={styles.async_types}>
                            <Tag color="blue">Promise 测试</Tag>
                            <Tag color="green">async/await 测试</Tag>
                            <Tag color="orange">回调函数测试</Tag>
                            <Tag color="red">定时器测试</Tag>
                            <Tag color="purple">事件测试</Tag>
                        </div>

                        <h3>常见异步场景</h3>
                        <ul>
                            <li><strong>API 请求</strong>：HTTP请求和响应处理</li>
                            <li><strong>数据库操作</strong>：数据查询和更新</li>
                            <li><strong>文件操作</strong>：文件读写和处理</li>
                            <li><strong>定时器</strong>：setTimeout和setInterval</li>
                            <li><strong>事件处理</strong>：DOM事件和自定义事件</li>
                        </ul>
                    </div>
                </Card>

                {/* Promise测试 */}
                <Card title="🤝 Promise 测试" className={styles.content_card}>
                    <div className={styles.promise_testing}>
                        <h3>基础 Promise 测试</h3>
                        {codeData.basicPromiseTesting && (
                            <CodeHighlight
                                code={codeData.basicPromiseTesting.code}
                                language={codeData.basicPromiseTesting.language}
                                title={codeData.basicPromiseTesting.title}
                            />
                        )}
                        
                        <h3>Promise 错误处理</h3>
                        {codeData.promiseErrorHandling && (
                            <CodeHighlight
                                code={codeData.promiseErrorHandling.code}
                                language={codeData.promiseErrorHandling.language}
                                title={codeData.promiseErrorHandling.title}
                            />
                        )}
                    </div>
                </Card>

                {/* async/await测试 */}
                <Card title="⚡ async/await 测试" className={styles.content_card}>
                    <div className={styles.async_await_testing}>
                        <h3>async/await 基础测试</h3>
                        {codeData.asyncAwaitBasics && (
                            <CodeHighlight
                                code={codeData.asyncAwaitBasics.code}
                                language={codeData.asyncAwaitBasics.language}
                                title={codeData.asyncAwaitBasics.title}
                            />
                        )}
                        
                        <h3>并发异步测试</h3>
                        {codeData.concurrentAsyncTesting && (
                            <CodeHighlight
                                code={codeData.concurrentAsyncTesting.code}
                                language={codeData.concurrentAsyncTesting.language}
                                title={codeData.concurrentAsyncTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 定时器测试 */}
                <Card title="⏰ 定时器测试" className={styles.content_card}>
                    <div className={styles.timer_testing}>
                        <h3>假定时器</h3>
                        {codeData.fakeTimers && (
                            <CodeHighlight
                                code={codeData.fakeTimers.code}
                                language={codeData.fakeTimers.language}
                                title={codeData.fakeTimers.title}
                            />
                        )}
                        
                        <h3>定时器高级用法</h3>
                        {codeData.advancedTimers && (
                            <CodeHighlight
                                code={codeData.advancedTimers.code}
                                language={codeData.advancedTimers.language}
                                title={codeData.advancedTimers.title}
                            />
                        )}
                    </div>
                </Card>

                {/* API测试 */}
                <Card title="🌐 API 测试" className={styles.content_card}>
                    <div className={styles.api_testing}>
                        <h3>HTTP 请求测试</h3>
                        {codeData.httpRequestTesting && (
                            <CodeHighlight
                                code={codeData.httpRequestTesting.code}
                                language={codeData.httpRequestTesting.language}
                                title={codeData.httpRequestTesting.title}
                            />
                        )}
                        
                        <h3>API 错误处理测试</h3>
                        {codeData.apiErrorTesting && (
                            <CodeHighlight
                                code={codeData.apiErrorTesting.code}
                                language={codeData.apiErrorTesting.language}
                                title={codeData.apiErrorTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 回调函数测试 */}
                <Card title="📞 回调函数测试" className={styles.content_card}>
                    <div className={styles.callback_testing}>
                        <h3>传统回调测试</h3>
                        {codeData.callbackTesting && (
                            <CodeHighlight
                                code={codeData.callbackTesting.code}
                                language={codeData.callbackTesting.language}
                                title={codeData.callbackTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 异步测试最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="异步测试原则"
                            description={
                                <ul>
                                    <li>优先使用 async/await 语法，代码更清晰</li>
                                    <li>正确处理 Promise 的 resolve 和 reject</li>
                                    <li>使用 expect.assertions() 确保异步断言被执行</li>
                                    <li>合理设置测试超时时间</li>
                                    <li>使用假定时器避免真实等待</li>
                                    <li>Mock 外部依赖，专注测试逻辑</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化建议"
                            description={
                                <ul>
                                    <li><strong>并行测试</strong>：使用 Promise.all 并行执行独立测试</li>
                                    <li><strong>假定时器</strong>：使用 jest.useFakeTimers() 加速测试</li>
                                    <li><strong>Mock 网络</strong>：避免真实的网络请求</li>
                                    <li><strong>超时控制</strong>：设置合理的测试超时时间</li>
                                    <li><strong>资源清理</strong>：及时清理异步资源</li>
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
                                    <li><strong>忘记等待</strong>：确保所有异步操作都被正确等待</li>
                                    <li><strong>竞态条件</strong>：避免测试间的异步操作相互影响</li>
                                    <li><strong>内存泄漏</strong>：清理未完成的异步操作</li>
                                    <li><strong>假阳性</strong>：确保异步断言真正被执行</li>
                                    <li><strong>超时设置</strong>：避免过长或过短的超时时间</li>
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

export default AsyncTestingDetail
