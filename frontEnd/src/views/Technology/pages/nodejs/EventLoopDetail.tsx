import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    RocketOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const EventLoopDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('NodeJS', 'eventloop')

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
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Node.js 事件循环机制</h1>
                    <p>深入理解Node.js的事件循环原理与异步编程模式</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Node.js</Tag>
                        <Tag color="blue">事件循环</Tag>
                        <Tag color="orange">异步编程</Tag>
                        <Tag color="purple">性能优化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 事件循环基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是事件循环？</h3>
                        <p>事件循环是Node.js处理非阻塞I/O操作的核心机制。它允许Node.js执行非阻塞操作，尽管JavaScript是单线程的。事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。</p>
                        
                        <h3>事件循环的阶段</h3>
                        {codeData.eventLoopPhases && (
                            <CodeHighlight
                                code={codeData.eventLoopPhases.code}
                                language={codeData.eventLoopPhases.language}
                                title={codeData.eventLoopPhases.title}
                            />
                        )}
                        
                        <h3>执行顺序示例</h3>
                        {codeData.basicConcept && (
                            <CodeHighlight
                                code={codeData.basicConcept.code}
                                language={codeData.basicConcept.language}
                                title={codeData.basicConcept.title}
                            />
                        )}
                    </div>
                </Card>
                
                {/* 微任务与宏任务 */}
                <Card title="🎯 微任务与宏任务" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>微任务 (Microtasks)</h4>
                            {codeData.microtaskQueue && (
                                <CodeHighlight
                                    code={codeData.microtaskQueue.code}
                                    language={codeData.microtaskQueue.language}
                                    title={codeData.microtaskQueue.title}
                                />
                            )}
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>宏任务 (Macrotasks)</h4>
                            {codeData.timerComparison && (
                                <CodeHighlight
                                    code={codeData.timerComparison.code}
                                    language={codeData.timerComparison.language}
                                    title={codeData.timerComparison.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>
                
                {/* 实际应用 */}
                <Card title="💡 实际应用场景" className={styles.content_card}>
                    <div className={styles.application_section}>
                        <h3>1. 避免阻塞事件循环</h3>
                        {codeData.performanceOptimization && (
                            <CodeHighlight
                                code={codeData.performanceOptimization.code}
                                language={codeData.performanceOptimization.language}
                                title={codeData.performanceOptimization.title}
                            />
                        )}


                        <h3>2. 理解异步操作的执行顺序</h3>
                        {codeData.asyncAwait && (
                            <CodeHighlight
                                code={codeData.asyncAwait.code}
                                language={codeData.asyncAwait.language}
                                title={codeData.asyncAwait.title}
                            />
                        )}
                    </div>
                </Card>
                
                {/* 性能优化 */}
                <Card title="⚡ 性能优化技巧" className={styles.content_card}>
                    <div className={styles.optimization_section}>
                        <h3>1. 监控事件循环延迟</h3>
                        {codeData.eventLoopMonitoring && (
                            <CodeHighlight
                                code={codeData.eventLoopMonitoring.code}
                                language={codeData.eventLoopMonitoring.language}
                                title={codeData.eventLoopMonitoring.title}
                            />
                        )}

                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 避免长时间运行的同步操作</h4>
                                <p>将CPU密集型任务分解为小块，使用setImmediate()让出控制权</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 合理使用process.nextTick()</h4>
                                <p>避免过度使用process.nextTick()，可能导致I/O饥饿</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 监控应用性能</h4>
                                <p>使用工具监控事件循环延迟和内存使用情况</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 理解异步操作的执行顺序</h4>
                                <p>掌握微任务和宏任务的执行优先级，编写可预测的异步代码</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default EventLoopDetail
