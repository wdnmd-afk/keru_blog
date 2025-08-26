import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, DatabaseOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Spin, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DataManagementDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'data-management')

    const handleBack = () => {
        navigate('/technology/docker')
    }

    if (loading) {
        return (
            <div className={styles.topic_detail_container}>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                    <p style={{ marginTop: '16px', color: '#ffffff' }}>加载代码数据中...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.topic_detail_container}>
                <Alert message="加载失败" description={error} type="error" showIcon />
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
                    返回Docker技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <DatabaseOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker 数据管理</h1>
                    <p>掌握Docker容器数据持久化和管理策略，实现数据安全与高效存储</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">数据卷 (Volumes)</Tag>
                        <Tag color="green">绑定挂载 (Bind Mounts)</Tag>
                        <Tag color="orange">数据备份</Tag>
                        <Tag color="purple">数据安全</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 概述 */}
                <Card title="📋 数据管理概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么需要数据管理</h3>
                        <p>
                            容器是无状态的，当容器删除时，容器内的数据也会丢失。
                            为了实现数据持久化，Docker提供了多种数据管理方案。
                        </p>

                        <h3>数据存储类型</h3>
                        <div className={styles.network_types}>
                            <Tag color="blue">Volumes (数据卷)</Tag>
                            <Tag color="green">Bind Mounts (绑定挂载)</Tag>
                            <Tag color="orange">tmpfs Mounts (临时文件系统)</Tag>
                        </div>

                        <h3>选择原则</h3>
                        <ul>
                            <li>
                                <strong>Volumes</strong>：生产环境推荐，Docker完全管理
                            </li>
                            <li>
                                <strong>Bind Mounts</strong>：开发环境常用，直接映射主机目录
                            </li>
                            <li>
                                <strong>tmpfs</strong>：临时数据，存储在内存中
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 基础数据管理 */}
                <Card title="📦 基础数据管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Volumes 数据卷基础</h4>
                            {codeData.volumeBasics && (
                                <CodeHighlight
                                    code={codeData.volumeBasics.code}
                                    language={codeData.volumeBasics.language}
                                    title={codeData.volumeBasics.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. Bind Mounts 绑定挂载</h4>
                            {codeData.bindMountsBasics && (
                                <CodeHighlight
                                    code={codeData.bindMountsBasics.code}
                                    language={codeData.bindMountsBasics.language}
                                    title={codeData.bindMountsBasics.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. Volume 高级配置</h4>
                            {codeData.volumeAdvanced && (
                                <CodeHighlight
                                    code={codeData.volumeAdvanced.code}
                                    language={codeData.volumeAdvanced.language}
                                    title={codeData.volumeAdvanced.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 数据备份与恢复 */}
                <Card title="💾 数据备份与恢复" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>4. 数据备份策略</h4>
                            {codeData.backupStrategies && (
                                <CodeHighlight
                                    code={codeData.backupStrategies.code}
                                    language={codeData.backupStrategies.language}
                                    title={codeData.backupStrategies.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>5. 数据迁移</h4>
                            {codeData.dataMigration && (
                                <CodeHighlight
                                    code={codeData.dataMigration.code}
                                    language={codeData.dataMigration.language}
                                    title={codeData.dataMigration.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>6. 开发环境配置</h4>
                            {codeData.developmentSetup && (
                                <CodeHighlight
                                    code={codeData.developmentSetup.code}
                                    language={codeData.developmentSetup.language}
                                    title={codeData.developmentSetup.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 数据库容器化 */}
                <Card title="🗄️ 数据库容器化" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>7. MySQL 容器化</h4>
                            {codeData.mysqlContainerization && (
                                <CodeHighlight
                                    code={codeData.mysqlContainerization.code}
                                    language={codeData.mysqlContainerization.language}
                                    title={codeData.mysqlContainerization.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>8. PostgreSQL 容器化</h4>
                            {codeData.postgresqlContainerization && (
                                <CodeHighlight
                                    code={codeData.postgresqlContainerization.code}
                                    language={codeData.postgresqlContainerization.language}
                                    title={codeData.postgresqlContainerization.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>9. Redis 容器化</h4>
                            {codeData.redisContainerization && (
                                <CodeHighlight
                                    code={codeData.redisContainerization.code}
                                    language={codeData.redisContainerization.language}
                                    title={codeData.redisContainerization.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 数据安全与监控 */}
                <Card title="🔒 数据安全与监控" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>10. 访问控制</h4>
                            {codeData.accessControl && (
                                <CodeHighlight
                                    code={codeData.accessControl.code}
                                    language={codeData.accessControl.language}
                                    title={codeData.accessControl.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>11. 数据加密</h4>
                            {codeData.dataEncryption && (
                                <CodeHighlight
                                    code={codeData.dataEncryption.code}
                                    language={codeData.dataEncryption.language}
                                    title={codeData.dataEncryption.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className="f-ic">
                        <Alert
                            message="数据管理建议"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>生产环境优先使用Volumes而非Bind Mounts</li>
                                    <li>为重要数据设置定期备份策略</li>
                                    <li>使用命名卷而非匿名卷，便于管理</li>
                                    <li>合理设置卷的标签，便于分类管理</li>
                                    <li>定期清理不使用的卷，释放存储空间</li>
                                    <li>监控卷的使用情况和性能</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Alert
                            message="数据库容器化建议"
                            className={'h-50 flex-1 mx-5'}
                            description={
                                <ul>
                                    <li>
                                        <strong>数据持久化</strong>：确保数据库数据存储在卷中
                                    </li>
                                    <li>
                                        <strong>配置管理</strong>：使用配置文件管理数据库设置
                                    </li>
                                    <li>
                                        <strong>初始化脚本</strong>：使用初始化脚本设置数据库
                                    </li>
                                    <li>
                                        <strong>健康检查</strong>：配置数据库健康检查
                                    </li>
                                    <li>
                                        <strong>资源限制</strong>：设置合适的内存和CPU限制
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Alert
                            message="安全注意事项"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        <strong>权限控制</strong>：设置合适的文件和目录权限
                                    </li>
                                    <li>
                                        <strong>网络隔离</strong>：使用自定义网络隔离数据库
                                    </li>
                                    <li>
                                        <strong>密码管理</strong>：使用secrets管理数据库密码
                                    </li>
                                    <li>
                                        <strong>备份加密</strong>：对备份数据进行加密
                                    </li>
                                    <li>
                                        <strong>访问日志</strong>：启用数据库访问日志
                                    </li>
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

export default DataManagementDetail
