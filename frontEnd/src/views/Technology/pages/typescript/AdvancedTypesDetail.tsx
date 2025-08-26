import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, RocketOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdvancedTypesDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'advancedTypesDetail')

    const handleBack = () => {
        navigate('/technology/typescript')
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

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
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 高级类型</h1>
                    <p>掌握TypeScript的高级类型系统，提升类型编程能力</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">TypeScript</Tag>
                        <Tag color="green">高级类型</Tag>
                        <Tag color="orange">类型编程</Tag>
                        <Tag color="purple">类型安全</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 联合类型与交叉类型 */}
                <Card title="🔗 联合类型与交叉类型" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>联合类型 (Union Types)</h3>
                        <p>联合类型表示一个值可以是几种类型之一，使用 | 分隔每个类型。</p>

                        {codeData?.unionTypes && (
                            <CodeHighlight
                                language={codeData.unionTypes.language}
                                code={codeData.unionTypes.code}
                                title={codeData.unionTypes.title}
                            />
                        )}

                        <h3>交叉类型 (Intersection Types)</h3>
                        <p>交叉类型将多个类型合并为一个类型，使用 & 连接。</p>

                        {codeData?.intersectionTypes && (
                            <CodeHighlight
                                language={codeData.intersectionTypes.language}
                                code={codeData.intersectionTypes.code}
                                title={codeData.intersectionTypes.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 条件类型 */}
                <Card title="🎯 条件类型" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>基本条件类型</h4>
                            {codeData?.conditionalTypes && (
                                <CodeHighlight
                                    language={codeData.conditionalTypes.language}
                                    code={codeData.conditionalTypes.code}
                                    title={codeData.conditionalTypes.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>分布式条件类型</h4>
                            {codeData?.distributiveTypes && (
                                <CodeHighlight
                                    language={codeData.distributiveTypes.language}
                                    code={codeData.distributiveTypes.code}
                                    title={codeData.distributiveTypes.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 映射类型 */}
                <Card title="🗺️ 映射类型" className={styles.content_card}>
                    <div className={styles.mapping_section}>
                        <h3>基本映射类型</h3>
                        {codeData?.mappedTypes && (
                            <CodeHighlight
                                language={codeData.mappedTypes.language}
                                code={codeData.mappedTypes.code}
                                title={codeData.mappedTypes.title}
                            />
                        )}

                        <h3>高级映射类型</h3>
                        {codeData?.advancedMappedTypes && (
                            <CodeHighlight
                                language={codeData.advancedMappedTypes.language}
                                code={codeData.advancedMappedTypes.code}
                                title={codeData.advancedMappedTypes.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 模板字面量类型 */}
                <Card title="📝 模板字面量类型" className={styles.content_card}>
                    <div className={styles.template_section}>
                        <h3>模板字面量类型 (Template Literal Types)</h3>
                        {codeData?.templateLiteralTypes && (
                            <CodeHighlight
                                language={codeData.templateLiteralTypes.language}
                                code={codeData.templateLiteralTypes.code}
                                title={codeData.templateLiteralTypes.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 高级类型最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 类型守卫 (Type Guards)</h4>
                                <p>使用类型守卫来缩小联合类型的范围</p>
                                {codeData?.typeGuards && (
                                    <CodeHighlight
                                        language={codeData.typeGuards.language}
                                        code={codeData.typeGuards.code}
                                        title={codeData.typeGuards.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 工具类型的组合使用</h4>
                                <p>组合多个工具类型来创建复杂的类型转换</p>
                                {codeData?.utilityTypeCombinations && (
                                    <CodeHighlight
                                        language={codeData.utilityTypeCombinations.language}
                                        code={codeData.utilityTypeCombinations.code}
                                        title={codeData.utilityTypeCombinations.title}
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

export default AdvancedTypesDetail
