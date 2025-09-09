import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CloudOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Spin, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const DockerComposeDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'docker-compose')

    const handleBack = () => {
        navigate('/technology/docker')
    }

    if (loading) {
        return (
            <div className={styles.topic_detail_container}>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                    <p style={{ marginTop: '16px', color: '#ffffff' }}>
                        {t('detail_pages.common.loading')}
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.topic_detail_container}>
                <Alert
                    message={t('detail_pages.common.load_failed')}
                    description={error}
                    type="error"
                    showIcon
                />
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
                    {t('detail_pages.common.back_button', { tech: 'Docker' })}
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <CloudOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>{t('detail_pages.docker_compose.title')}</h1>
                    <p>{t('detail_pages.docker_compose.description')}</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">
                            {t('detail_pages.docker_compose.tags.service_orchestration')}
                        </Tag>
                        <Tag color="green">
                            {t('detail_pages.docker_compose.tags.multi_container')}
                        </Tag>
                        <Tag color="orange">
                            {t('detail_pages.docker_compose.tags.environment_config')}
                        </Tag>
                        <Tag color="purple">
                            {t('detail_pages.docker_compose.tags.microservices')}
                        </Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 概述 */}
                <Card
                    title={`📋 ${t('detail_pages.docker_compose.title')} ${t('detail_pages.common.overview')}`}
                    className={styles.content_card}
                >
                    <div className={styles.concept_content}>
                        <h3>{t('detail_pages.docker_compose.sections.what_is')}</h3>
                        <p>
                            Docker Compose 是一个用于定义和运行多容器Docker应用程序的工具。
                            通过YAML文件来配置应用程序的服务，然后使用一个命令就可以创建并启动所有服务。
                        </p>

                        <h3>{t('detail_pages.docker_compose.sections.core_concepts')}</h3>
                        <div className={styles.network_types}>
                            <Tag color="blue">
                                {t('detail_pages.docker_compose.concepts.services')}
                            </Tag>
                            <Tag color="green">
                                {t('detail_pages.docker_compose.concepts.networks')}
                            </Tag>
                            <Tag color="orange">
                                {t('detail_pages.docker_compose.concepts.volumes')}
                            </Tag>
                            <Tag color="red">
                                {t('detail_pages.docker_compose.concepts.configs')}
                            </Tag>
                            <Tag color="purple">
                                {t('detail_pages.docker_compose.concepts.secrets')}
                            </Tag>
                        </div>

                        <h3>{t('detail_pages.docker_compose.sections.use_cases')}</h3>
                        <ul>
                            <li>{t('detail_pages.docker_compose.use_cases_list.development')}</li>
                            <li>{t('detail_pages.docker_compose.use_cases_list.testing')}</li>
                            <li>
                                {t('detail_pages.docker_compose.use_cases_list.single_machine')}
                            </li>
                            <li>{t('detail_pages.docker_compose.use_cases_list.microservices')}</li>
                        </ul>
                    </div>
                </Card>

                {/* 基础配置 */}
                <Card
                    title={`📄 ${t('detail_pages.common.basic_config')}`}
                    className={styles.content_card}
                >
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. {t('detail_pages.docker_compose.sections.basic_structure')}</h4>
                            {codeData.basicCompose && (
                                <CodeHighlight
                                    code={codeData.basicCompose.code}
                                    language={codeData.basicCompose.language}
                                    title={codeData.basicCompose.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 多阶段构建配置</h4>
                            {codeData.multiStageCompose && (
                                <CodeHighlight
                                    code={codeData.multiStageCompose.code}
                                    language={codeData.multiStageCompose.language}
                                    title={codeData.multiStageCompose.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. Docker Compose 命令</h4>
                            {codeData.composeCommands && (
                                <CodeHighlight
                                    code={codeData.composeCommands.code}
                                    language={codeData.composeCommands.language}
                                    title={codeData.composeCommands.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 环境配置 */}
                <Card title="🔧 环境配置与管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>4. 开发环境配置</h4>
                            {codeData.developmentCompose && (
                                <CodeHighlight
                                    code={codeData.developmentCompose.code}
                                    language={codeData.developmentCompose.language}
                                    title={codeData.developmentCompose.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>5. 生产环境配置</h4>
                            {codeData.productionCompose && (
                                <CodeHighlight
                                    code={codeData.productionCompose.code}
                                    language={codeData.productionCompose.language}
                                    title={codeData.productionCompose.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>6. 环境变量管理</h4>
                            {codeData.environmentVariables && (
                                <CodeHighlight
                                    code={codeData.environmentVariables.code}
                                    language={codeData.environmentVariables.language}
                                    title={codeData.environmentVariables.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 高级配置 */}
                <Card title="🎯 高级配置与优化" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>7. 网络配置</h4>
                            {codeData.networking && (
                                <CodeHighlight
                                    code={codeData.networking.code}
                                    language={codeData.networking.language}
                                    title={codeData.networking.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>8. 数据卷管理</h4>
                            {codeData.volumes && (
                                <CodeHighlight
                                    code={codeData.volumes.code}
                                    language={codeData.volumes.language}
                                    title={codeData.volumes.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>9. 健康检查配置</h4>
                            {codeData.healthChecks && (
                                <CodeHighlight
                                    code={codeData.healthChecks.code}
                                    language={codeData.healthChecks.language}
                                    title={codeData.healthChecks.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 企业级应用 */}
                <Card title="🏢 企业级应用示例" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>10. 资源限制与安全配置</h4>
                            {codeData.resourceLimits && (
                                <CodeHighlight
                                    code={codeData.resourceLimits.code}
                                    language={codeData.resourceLimits.language}
                                    title={codeData.resourceLimits.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>11. 微服务架构示例</h4>
                            {codeData.microservicesExample && (
                                <CodeHighlight
                                    code={codeData.microservicesExample.code}
                                    language={codeData.microservicesExample.language}
                                    title={codeData.microservicesExample.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card
                    title={`💡 ${t('detail_pages.common.best_practices')}`}
                    className={styles.content_card}
                >
                    <div className="f-ic">
                        <Alert
                            message={t('detail_pages.docker_compose.best_practices.title')}
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.best_practices.version_control'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.best_practices.file_structure'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.best_practices.image_versions'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.best_practices.env_variables'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.best_practices.health_checks'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.best_practices.resource_limits'
                                        )}
                                    </li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Alert
                            message={t('detail_pages.docker_compose.production_notes.title')}
                            className={'h-50 flex-1 mx-5'}
                            description={
                                <ul>
                                    <li>
                                        {t('detail_pages.docker_compose.production_notes.security')}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.production_notes.network_isolation'
                                        )}
                                    </li>
                                    <li>
                                        {t('detail_pages.docker_compose.production_notes.logging')}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.production_notes.monitoring'
                                        )}
                                    </li>
                                    <li>
                                        {t('detail_pages.docker_compose.production_notes.backup')}
                                    </li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Alert
                            message={t('detail_pages.docker_compose.performance_tips.title')}
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.performance_tips.image_optimization'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.performance_tips.cache_utilization'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.performance_tips.parallel_startup'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.performance_tips.resource_allocation'
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            'detail_pages.docker_compose.performance_tips.network_optimization'
                                        )}
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default DockerComposeDetail
