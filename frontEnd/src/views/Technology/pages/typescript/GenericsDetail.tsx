import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const GenericsDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'genericsDetail')

    const handleBack = () => {
        navigate('/technology/typescript')
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
                    {t('detail_pages.common.back_button', { tech: 'TypeScript' })}
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 泛型编程</h1>
                    <p>掌握泛型的使用技巧与实际应用场景，编写更灵活的类型安全代码</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">TypeScript</Tag>
                        <Tag color="green">泛型</Tag>
                        <Tag color="orange">类型编程</Tag>
                        <Tag color="purple">代码复用</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 泛型基础 */}
                <Card title="📚 泛型基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是泛型？</h3>
                        <p>
                            泛型允许我们在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。它提供了一种创建可重用组件的方法，这些组件可以支持多种类型的数据。
                        </p>

                        <h3>基本语法</h3>
                        {codeData.basicGenerics && (
                            <CodeHighlight
                                code={codeData.basicGenerics.code}
                                language={codeData.basicGenerics.language}
                                title={codeData.basicGenerics.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 泛型约束 */}
                <Card title="🔗 泛型约束" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. extends 约束</h4>
                            <div className={styles.code_block}>
                                {codeData.genericConstraints && (
                                    <CodeHighlight
                                        code={codeData.genericConstraints.code}
                                        language={codeData.genericConstraints.language}
                                        title={codeData.genericConstraints.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 条件约束</h4>
                            {codeData.conditionalTypes && (
                                <CodeHighlight
                                    code={codeData.conditionalTypes.code}
                                    language={codeData.conditionalTypes.language}
                                    title={codeData.conditionalTypes.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 泛型接口与类 */}
                <Card title="🏗️ 泛型接口与类" className={styles.content_card}>
                    <div className={styles.interface_section}>
                        <h3>泛型接口</h3>
                        {codeData.genericInterfaces && (
                            <CodeHighlight
                                code={codeData.genericInterfaces.code}
                                language={codeData.genericInterfaces.language}
                                title={codeData.genericInterfaces.title}
                            />
                        )}

                        <h3>泛型类</h3>
                        {codeData.genericClasses && (
                            <CodeHighlight
                                code={codeData.genericClasses.code}
                                language={codeData.genericClasses.language}
                                title={codeData.genericClasses.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 高级泛型模式 */}
                <Card title="🚀 高级泛型模式" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. 泛型工厂模式</h3>
                        {codeData.genericFactory && (
                            <CodeHighlight
                                code={codeData.genericFactory.code}
                                language={codeData.genericFactory.language}
                                title={codeData.genericFactory.title}
                            />
                        )}

                        <h3>2. 泛型装饰器模式</h3>
                        {codeData.genericDecorator && (
                            <CodeHighlight
                                code={codeData.genericDecorator.code}
                                language={codeData.genericDecorator.language}
                                title={codeData.genericDecorator.title}
                            />
                        )}

                        <h3>3. 泛型Builder模式</h3>
                        {codeData.genericBuilder && (
                            <CodeHighlight
                                code={codeData.genericBuilder.code}
                                language={codeData.genericBuilder.language}
                                title={codeData.genericBuilder.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 实际应用场景 */}
                <Card title="💡 实际应用场景" className={styles.content_card}>
                    <div className={styles.application_section}>
                        <h3>1. API响应类型</h3>
                        {codeData.utilityTypes && (
                            <CodeHighlight
                                code={codeData.utilityTypes.code}
                                language={codeData.utilityTypes.language}
                                title={codeData.utilityTypes.title}
                            />
                        )}

                        <h3>2. 状态管理</h3>
                        {codeData.stateManagement && (
                            <CodeHighlight
                                code={codeData.stateManagement.code}
                                language={codeData.stateManagement.language}
                                title={codeData.stateManagement.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 泛型最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 合理命名泛型参数</h4>
                                <p>使用有意义的泛型参数名称</p>
                                {codeData.namingConventions && (
                                    <CodeHighlight
                                        code={codeData.namingConventions.code}
                                        language={codeData.namingConventions.language}
                                        title={codeData.namingConventions.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 避免过度泛型化</h4>
                                <p>只在需要类型复用时使用泛型</p>
                                {codeData.avoidOverGenerics && (
                                    <CodeHighlight
                                        code={codeData.avoidOverGenerics.code}
                                        language={codeData.avoidOverGenerics.language}
                                        title={codeData.avoidOverGenerics.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 提供默认类型参数</h4>
                                <p>为泛型参数提供合理的默认值</p>
                                {codeData.defaultTypeParameters && (
                                    <CodeHighlight
                                        code={codeData.defaultTypeParameters.code}
                                        language={codeData.defaultTypeParameters.language}
                                        title={codeData.defaultTypeParameters.title}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GenericsDetail
