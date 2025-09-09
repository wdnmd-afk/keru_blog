import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, RocketOutlined, WarningOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const MigrationDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Vue', 'migration')

    const handleBack = () => {
        navigate('/technology/vue')
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
                    返回Vue.js技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue 2 到 Vue 3 迁移指南</h1>
                    <p>完整的Vue 2到Vue 3升级路径，包含破坏性变更和最佳实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">迁移</Tag>
                        <Tag color="orange">Vue 3</Tag>
                        <Tag color="purple">升级</Tag>
                        <Tag color="red">破坏性变更</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 迁移准备 */}
                <Card title="🚀 迁移准备工作" className={styles.content_card}>
                    <Alert
                        message="迁移建议"
                        description="建议在迁移前充分测试，并考虑使用Vue 3的兼容模式进行渐进式升级"
                        type="info"
                        showIcon
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.preparation_section}>
                        <div className={styles.step_item}>
                            <h4>1. 环境检查</h4>
                            {codeData.environmentCheck && (
                                <CodeHighlight
                                    code={codeData.environmentCheck.code}
                                    language={codeData.environmentCheck.language}
                                    title={codeData.environmentCheck.title}
                                />
                            )}
                        </div>

                        <div className={styles.step_item}>
                            <h4>2. 依赖升级</h4>
                            {codeData.dependencyUpgrade && (
                                <CodeHighlight
                                    code={codeData.dependencyUpgrade.code}
                                    language={codeData.dependencyUpgrade.language}
                                    title={codeData.dependencyUpgrade.title}
                                />
                            )}
                        </div>

                        <div className={styles.step_item}>
                            <h4>3. 构建配置更新</h4>
                            {codeData.buildConfig && (
                                <CodeHighlight
                                    code={codeData.buildConfig.code}
                                    language={codeData.buildConfig.language}
                                    title={codeData.buildConfig.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 核心API变更 */}
                <Card title="⚡ 核心API变更" className={styles.content_card}>
                    <div className={styles.api_changes}>
                        <h3>1. 全局API变更</h3>
                        {codeData.globalApiChanges && (
                            <CodeHighlight
                                code={codeData.globalApiChanges.code}
                                language={codeData.globalApiChanges.language}
                                title={codeData.globalApiChanges.title}
                            />
                        )}

                        <h3>2. 组件API迁移</h3>
                        {codeData.componentApiMigration && (
                            <CodeHighlight
                                code={codeData.componentApiMigration.code}
                                language={codeData.componentApiMigration.language}
                                title={codeData.componentApiMigration.title}
                            />
                        )}

                        <h3>3. 生命周期变更</h3>
                        {codeData.lifecycleChanges && (
                            <CodeHighlight
                                code={codeData.lifecycleChanges.code}
                                language={codeData.lifecycleChanges.language}
                                title={codeData.lifecycleChanges.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 生态系统迁移 */}
                <Card title="🔧 生态系统迁移" className={styles.content_card}>
                    <div className={styles.ecosystem_migration}>
                        <h3>1. Vue Router 4迁移</h3>
                        {codeData.routerMigration && (
                            <CodeHighlight
                                code={codeData.routerMigration.code}
                                language={codeData.routerMigration.language}
                                title={codeData.routerMigration.title}
                            />
                        )}

                        <h3>2. 状态管理迁移 (Vuex to Pinia)</h3>
                        {codeData.stateManagementMigration && (
                            <CodeHighlight
                                code={codeData.stateManagementMigration.code}
                                language={codeData.stateManagementMigration.language}
                                title={codeData.stateManagementMigration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 破坏性变更 */}
                <Card title="⚠️ 重要破坏性变更" className={styles.content_card}>
                    <Alert
                        message="注意"
                        description="以下变更可能导致现有代码无法正常工作，需要特别注意"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.breaking_changes}>
                        <h3>1. 事件总线移除</h3>
                        {codeData.eventBusReplacement && (
                            <CodeHighlight
                                code={codeData.eventBusReplacement.code}
                                language={codeData.eventBusReplacement.language}
                                title={codeData.eventBusReplacement.title}
                            />
                        )}

                        <h3>2. 过滤器移除</h3>
                        {codeData.filtersReplacement && (
                            <CodeHighlight
                                code={codeData.filtersReplacement.code}
                                language={codeData.filtersReplacement.language}
                                title={codeData.filtersReplacement.title}
                            />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default MigrationDetail
