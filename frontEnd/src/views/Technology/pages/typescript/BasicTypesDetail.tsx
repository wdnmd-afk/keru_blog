import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CodeOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BasicTypesDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'basicTypes')

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
                    <CodeOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 基础类型系统</h1>
                    <p>掌握TypeScript的基础类型，构建类型安全的JavaScript应用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">TypeScript</Tag>
                        <Tag color="green">类型系统</Tag>
                        <Tag color="orange">基础类型</Tag>
                        <Tag color="purple">类型注解</Tag>
                        <Tag color="red">类型推断</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础类型 */}
                <Card title="🔤 基础类型" className={styles.content_card}>
                    <div className={styles.basic_types_section}>
                        <h3>原始类型</h3>
                        {codeData.primitiveTypes && (
                            <CodeHighlight
                                code={codeData.primitiveTypes.code}
                                language={codeData.primitiveTypes.language}
                                title={codeData.primitiveTypes.title}
                            />
                        )}

                        <h3>特殊类型</h3>
                        {codeData.specialTypes && (
                            <CodeHighlight
                                code={codeData.specialTypes.code}
                                language={codeData.specialTypes.language}
                                title={codeData.specialTypes.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 复合类型 */}
                <Card title="📦 复合类型" className={styles.content_card}>
                    <div className={styles.compound_types}>
                        <div className={styles.type_item}>
                            <h4>数组类型</h4>
                            {codeData.arrayTypes && (
                                <CodeHighlight
                                    code={codeData.arrayTypes.code}
                                    language={codeData.arrayTypes.language}
                                    title={codeData.arrayTypes.title}
                                />
                            )}
                        </div>

                        <div className={styles.type_item}>
                            <h4>元组类型</h4>
                            {codeData.tupleTypes && (
                                <CodeHighlight
                                    code={codeData.tupleTypes.code}
                                    language={codeData.tupleTypes.language}
                                    title={codeData.tupleTypes.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 对象类型 */}
                <Card title="🏗️ 对象类型" className={styles.content_card}>
                    <div className={styles.object_types}>
                        <h3>对象类型注解</h3>
                        {codeData.objectTypes && (
                            <CodeHighlight
                                code={codeData.objectTypes.code}
                                language={codeData.objectTypes.language}
                                title={codeData.objectTypes.title}
                            />
                        )}

                        <h3>接口定义</h3>
                        {codeData.interfaceDefinition && (
                            <CodeHighlight
                                code={codeData.interfaceDefinition.code}
                                language={codeData.interfaceDefinition.language}
                                title={codeData.interfaceDefinition.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 函数类型 */}
                <Card title="⚡ 函数类型" className={styles.content_card}>
                    <div className={styles.function_types}>
                        <h3>函数类型注解</h3>
                        {codeData.functionTypes && (
                            <CodeHighlight
                                code={codeData.functionTypes.code}
                                language={codeData.functionTypes.language}
                                title={codeData.functionTypes.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 类型操作 */}
                <Card title="🔧 类型操作" className={styles.content_card}>
                    <div className={styles.type_operations}>
                        <h3>类型断言</h3>
                        {codeData.typeAssertion && (
                            <CodeHighlight
                                code={codeData.typeAssertion.code}
                                language={codeData.typeAssertion.language}
                                title={codeData.typeAssertion.title}
                            />
                        )}

                        <h3>联合类型和交叉类型</h3>
                        {codeData.unionAndIntersection && (
                            <CodeHighlight
                                code={codeData.unionAndIntersection.code}
                                language={codeData.unionAndIntersection.language}
                                title={codeData.unionAndIntersection.title}
                            />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default BasicTypesDetail
