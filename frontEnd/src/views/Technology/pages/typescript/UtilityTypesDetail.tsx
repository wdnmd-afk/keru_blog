import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, ToolOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UtilityTypesDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'utilityTypesDetail')

    const handleBack = () => {
        navigate('/technology/typescript')
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
                    返回TypeScript技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ToolOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 工具类型详解</h1>
                    <p>掌握TypeScript内置工具类型的使用与实现</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">工具类型</Tag>
                        <Tag color="green">类型操作</Tag>
                        <Tag color="orange">类型转换</Tag>
                        <Tag color="purple">高级类型</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 工具类型概述 */}
                <Card title="🛠️ 工具类型概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是工具类型？</h3>
                        <p>
                            工具类型（Utility
                            Types）是TypeScript内置的一组类型操作符，用于对现有类型进行转换和操作，帮助开发者更灵活地处理类型定义。
                        </p>

                        <h3>常用工具类型分类</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔧 属性操作</h4>
                                <p>Partial, Required, Readonly, Pick, Omit</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🔄 类型转换</h4>
                                <p>Record, Extract, Exclude, NonNullable</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>📝 函数相关</h4>
                                <p>Parameters, ReturnType, ConstructorParameters</p>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🎯 条件类型</h4>
                                <p>Awaited, ThisParameterType, OmitThisParameter</p>
                            </div>
                        </div>

                        <Alert
                            message="工具类型的优势"
                            description="工具类型提供了类型安全的方式来操作和转换类型，避免重复定义，提高代码的可维护性和复用性。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>

                {/* 属性操作类型 */}
                <Card title="🔧 属性操作类型" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Partial & Required</h4>
                            {codeData.partialRequired && (
                                <CodeHighlight
                                    code={codeData.partialRequired.code}
                                    language={codeData.partialRequired.language}
                                    title={codeData.partialRequired.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. Pick & Omit</h4>
                            {codeData.pickOmit && (
                                <CodeHighlight
                                    code={codeData.pickOmit.code}
                                    language={codeData.pickOmit.language}
                                    title={codeData.pickOmit.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. Readonly</h4>
                            {codeData.readonly && (
                                <CodeHighlight
                                    code={codeData.readonly.code}
                                    language={codeData.readonly.language}
                                    title={codeData.readonly.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 类型转换工具 */}
                <Card title="🔄 类型转换工具" className={styles.content_card}>
                    <div className={styles.transform_section}>
                        <h3>Record & Extract & Exclude</h3>
                        {codeData.recordExtractExclude && (
                            <CodeHighlight
                                code={codeData.recordExtractExclude.code}
                                language={codeData.recordExtractExclude.language}
                                title={codeData.recordExtractExclude.title}
                            />
                        )}

                        <h3>NonNullable & 条件类型</h3>
                        {codeData.nonNullableConditional && (
                            <CodeHighlight
                                code={codeData.nonNullableConditional.code}
                                language={codeData.nonNullableConditional.language}
                                title={codeData.nonNullableConditional.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 函数相关工具类型 */}
                <Card title="📝 函数相关工具类型" className={styles.content_card}>
                    <div className={styles.function_section}>
                        <h3>Parameters & ReturnType</h3>
                        {codeData.parametersReturnType && (
                            <CodeHighlight
                                code={codeData.parametersReturnType.code}
                                language={codeData.parametersReturnType.language}
                                title={codeData.parametersReturnType.title}
                            />
                        )}

                        <h3>ConstructorParameters & 高级函数类型</h3>
                        {codeData.constructorParameters && (
                            <CodeHighlight
                                code={codeData.constructorParameters.code}
                                language={codeData.constructorParameters.language}
                                title={codeData.constructorParameters.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 自定义工具类型 */}
                <Card title="🎨 自定义工具类型" className={styles.content_card}>
                    <div className={styles.custom_section}>
                        <h3>实用自定义工具类型</h3>
                        {codeData.customUtilityTypes && (
                            <CodeHighlight
                                code={codeData.customUtilityTypes.code}
                                language={codeData.customUtilityTypes.language}
                                title={codeData.customUtilityTypes.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 工具类型最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 合理选择工具类型</h4>
                                <p>根据使用场景选择合适的工具类型</p>
                                <ul>
                                    <li>更新操作使用Partial</li>
                                    <li>API响应使用Pick/Omit</li>
                                    <li>不可变数据使用Readonly</li>
                                    <li>键值映射使用Record</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 组合使用</h4>
                                <p>灵活组合多个工具类型</p>
                                <ul>
                                    <li>链式组合：Partial&lt;Pick&lt;T, K&gt;&gt;</li>
                                    <li>条件组合：根据条件选择类型</li>
                                    <li>递归组合：处理嵌套结构</li>
                                    <li>泛型组合：提高复用性</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能考虑</h4>
                                <p>注意类型计算的性能影响</p>
                                <ul>
                                    <li>避免过度复杂的递归类型</li>
                                    <li>合理使用条件类型</li>
                                    <li>缓存复杂类型计算结果</li>
                                    <li>监控编译时间</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 可读性维护</h4>
                                <p>保持类型定义的可读性</p>
                                <ul>
                                    <li>使用有意义的类型别名</li>
                                    <li>添加类型注释说明</li>
                                    <li>分解复杂的类型定义</li>
                                    <li>建立类型文档</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UtilityTypesDetail
