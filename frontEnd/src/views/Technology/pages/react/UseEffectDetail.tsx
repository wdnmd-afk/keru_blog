import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, RocketOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const UseEffectDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('React', 'useEffect')

    const handleBack = () => {
        navigate('/technology/react')
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
                    {t('detail_pages.common.back_button', { tech: 'React' })}
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>{t('detail_pages.react_hooks.use_effect.title')}</h1>
                    <p>{t('detail_pages.react_hooks.use_effect.description')}</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Hooks</Tag>
                        <Tag color="orange">
                            {t('detail_pages.react_hooks.use_effect.tags.side_effects')}
                        </Tag>
                        <Tag color="green">
                            {t('detail_pages.react_hooks.use_effect.tags.lifecycle')}
                        </Tag>
                        <Tag color="purple">
                            {t('detail_pages.react_hooks.use_effect.tags.dependencies')}
                        </Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card
                    title={`📚 ${t('detail_pages.common.overview')}`}
                    className={styles.content_card}
                >
                    <div className={styles.concept_content}>
                        <h3>什么是useEffect？</h3>
                        <p>
                            useEffect是React
                            Hooks中用于处理副作用的Hook，它可以让你在函数组件中执行副作用操作，相当于类组件中的componentDidMount、componentDidUpdate和componentWillUnmount的组合。
                        </p>

                        <h3>基本语法</h3>
                        {codeData.basicUsage && (
                            <CodeHighlight
                                code={codeData.basicUsage.code}
                                language={codeData.basicUsage.language}
                                title={codeData.basicUsage.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 常见用法 */}
                <Card title="🔧 常见用法" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 清理函数</h4>
                            {codeData.cleanup && (
                                <CodeHighlight
                                    code={codeData.cleanup.code}
                                    language={codeData.cleanup.language}
                                    title={codeData.cleanup.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 数据获取</h4>
                            {codeData.dataFetching && (
                                <CodeHighlight
                                    code={codeData.dataFetching.code}
                                    language={codeData.dataFetching.language}
                                    title={codeData.dataFetching.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 常见错误和最佳实践</h4>
                            {codeData.commonMistakes && (
                                <CodeHighlight
                                    code={codeData.commonMistakes.code}
                                    language={codeData.commonMistakes.language}
                                    title={codeData.commonMistakes.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UseEffectDetail
