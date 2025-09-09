import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, StarOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const DecoratorsDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'decoratorsDetail')

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

    const handleBack = () => {
        navigate('/technology/typescript')
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
                    返回TypeScript技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <StarOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 装饰器详解</h1>
                    <p>掌握TypeScript装饰器的使用与实现原理</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Decorators</Tag>
                        <Tag color="green">元编程</Tag>
                        <Tag color="orange">注解</Tag>
                        <Tag color="purple">反射</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 装饰器基础 */}
                <Card title="✨ 装饰器基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是装饰器？</h3>
                        <p>
                            装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、访问符、属性或参数上。装饰器使用@expression这种形式，expression必须求值为一个函数。
                        </p>

                        <Alert
                            message="实验性功能"
                            description="装饰器目前是TypeScript的实验性功能，需要在tsconfig.json中启用experimentalDecorators选项。"
                            type="warning"
                            showIcon
                        />

                        <h3>启用装饰器</h3>
                        {codeData?.enableDecorators && (
                            <CodeHighlight
                                language={codeData.enableDecorators.language}
                                code={codeData.enableDecorators.code}
                                title={codeData.enableDecorators.title}
                            />
                        )}

                        <h3>装饰器类型</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🏛️ 类装饰器</h4>
                                <p>应用于类构造函数，用于观察、修改或替换类定义</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>⚡ 方法装饰器</h4>
                                <p>应用于方法的属性描述符，用于观察、修改或替换方法定义</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🔍 访问器装饰器</h4>
                                <p>应用于访问器的属性描述符</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>📝 属性装饰器</h4>
                                <p>应用于属性声明</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>📋 参数装饰器</h4>
                                <p>应用于函数参数</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 类装饰器 */}
                <Card title="🏛️ 类装饰器" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基本类装饰器</h4>
                            {codeData?.basicClassDecorator && (
                                <CodeHighlight
                                    language={codeData.basicClassDecorator.language}
                                    code={codeData.basicClassDecorator.code}
                                    title={codeData.basicClassDecorator.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 装饰器工厂</h4>
                            {codeData?.decoratorFactory && (
                                <CodeHighlight
                                    language={codeData.decoratorFactory.language}
                                    code={codeData.decoratorFactory.code}
                                    title={codeData.decoratorFactory.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 实用类装饰器示例</h4>
                            {codeData?.practicalClassDecorator && (
                                <CodeHighlight
                                    language={codeData.practicalClassDecorator.language}
                                    code={codeData.practicalClassDecorator.code}
                                    title={codeData.practicalClassDecorator.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 方法装饰器 */}
                <Card title="⚡ 方法装饰器" className={styles.content_card}>
                    <div className={styles.method_section}>
                        <h3>方法装饰器基础</h3>
                        {codeData?.basicMethodDecorator && (
                            <CodeHighlight
                                language={codeData.basicMethodDecorator.language}
                                code={codeData.basicMethodDecorator.code}
                                title={codeData.basicMethodDecorator.title}
                            />
                        )}

                        <h3>高级方法装饰器</h3>
                        {codeData?.advancedMethodDecorator && (
                            <CodeHighlight
                                language={codeData.advancedMethodDecorator.language}
                                code={codeData.advancedMethodDecorator.code}
                                title={codeData.advancedMethodDecorator.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 属性和参数装饰器 */}
                <Card title="📝 属性与参数装饰器" className={styles.content_card}>
                    <div className={styles.property_section}>
                        <h3>属性装饰器</h3>
                        {codeData?.propertyDecorator && (
                            <CodeHighlight
                                language={codeData.propertyDecorator.language}
                                code={codeData.propertyDecorator.code}
                                title={codeData.propertyDecorator.title}
                            />
                        )}

                        <h3>参数装饰器</h3>
                        {codeData?.parameterDecorator && (
                            <CodeHighlight
                                language={codeData.parameterDecorator.language}
                                code={codeData.parameterDecorator.code}
                                title={codeData.parameterDecorator.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 实际应用 */}
                <Card title="🛠️ 装饰器实际应用" className={styles.content_card}>
                    <div className={styles.application_section}>
                        <h3>依赖注入系统</h3>
                        {codeData?.dependencyInjection && (
                            <CodeHighlight
                                language={codeData.dependencyInjection.language}
                                code={codeData.dependencyInjection.code}
                                title={codeData.dependencyInjection.title}
                            />
                        )}

                        <h3>API路由装饰器</h3>
                        {codeData?.apiRouting && (
                            <CodeHighlight
                                language={codeData.apiRouting.language}
                                code={codeData.apiRouting.code}
                                title={codeData.apiRouting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 装饰器最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 设计原则</h4>
                                <p>遵循装饰器设计的最佳实践</p>
                                <ul>
                                    <li>保持装饰器的单一职责</li>
                                    <li>避免在装饰器中修改原始类的结构</li>
                                    <li>使用装饰器工厂提供配置选项</li>
                                    <li>确保装饰器的可组合性</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能考虑</h4>
                                <p>注意装饰器对性能的影响</p>
                                <ul>
                                    <li>避免在装饰器中进行重复的计算</li>
                                    <li>合理使用缓存机制</li>
                                    <li>注意装饰器的执行顺序</li>
                                    <li>避免过度使用装饰器</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 类型安全</h4>
                                <p>确保装饰器的类型安全</p>
                                <ul>
                                    <li>为装饰器参数提供正确的类型</li>
                                    <li>使用泛型约束确保类型安全</li>
                                    <li>提供清晰的类型定义</li>
                                    <li>避免使用any类型</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 调试和测试</h4>
                                <p>确保装饰器的可调试性和可测试性</p>
                                <ul>
                                    <li>提供清晰的错误信息</li>
                                    <li>编写装饰器的单元测试</li>
                                    <li>使用适当的日志记录</li>
                                    <li>文档化装饰器的行为</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default DecoratorsDetail
