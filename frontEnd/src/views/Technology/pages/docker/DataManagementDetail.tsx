import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, DatabaseOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DataManagementDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'data-management')

    const handleBack = () => {
        navigate('/technology/docker')
    }

    if (loading) {
        return <div className={styles.loading}>加载中...</div>
    }

    if (error) {
        return <div className={styles.error}>加载失败: {error}</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回Docker
                </Button>
                <h1>
                    <DatabaseOutlined /> Docker 数据管理
                </h1>
                <p>掌握Docker容器数据持久化和管理策略</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 数据管理概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>为什么需要数据管理</h3>
                        <p>
                            容器是无状态的，当容器删除时，容器内的数据也会丢失。
                            为了实现数据持久化，Docker提供了多种数据管理方案。
                        </p>

                        <h3>数据存储类型</h3>
                        <div className={styles.storage_types}>
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

                {/* Volumes 数据卷 */}
                <Card title="📦 Volumes 数据卷" className={styles.content_card}>
                    <div className={styles.volumes_section}>
                        <h3>基本Volume操作</h3>
                        {codeData.volumeBasics && (
                            <CodeHighlight
                                code={codeData.volumeBasics.code}
                                language={codeData.volumeBasics.language}
                                title={codeData.volumeBasics.title}
                            />
                        )}

                        <h3>Volume高级配置</h3>
                        {codeData.volumeAdvanced && (
                            <CodeHighlight
                                code={codeData.volumeAdvanced.code}
                                language={codeData.volumeAdvanced.language}
                                title={codeData.volumeAdvanced.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Bind Mounts */}
                <Card title="🔗 Bind Mounts 绑定挂载" className={styles.content_card}>
                    <div className={styles.bind_mounts_section}>
                        <h3>基本绑定挂载</h3>
                        {codeData.bindMountsBasics && (
                            <CodeHighlight
                                code={codeData.bindMountsBasics.code}
                                language={codeData.bindMountsBasics.language}
                                title={codeData.bindMountsBasics.title}
                            />
                        )}

                        <h3>开发环境配置</h3>
                        {codeData.developmentSetup && (
                            <CodeHighlight
                                code={codeData.developmentSetup.code}
                                language={codeData.developmentSetup.language}
                                title={codeData.developmentSetup.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 数据备份与恢复 */}
                <Card title="💾 数据备份与恢复" className={styles.content_card}>
                    <div className={styles.backup_section}>
                        <h3>Volume备份策略</h3>
                        {codeData.backupStrategies && (
                            <CodeHighlight
                                code={codeData.backupStrategies.code}
                                language={codeData.backupStrategies.language}
                                title={codeData.backupStrategies.title}
                            />
                        )}

                        <h3>数据迁移</h3>
                        {codeData.dataMigration && (
                            <CodeHighlight
                                code={codeData.dataMigration.code}
                                language={codeData.dataMigration.language}
                                title={codeData.dataMigration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 数据库容器化 */}
                <Card title="🗄️ 数据库容器化" className={styles.content_card}>
                    <div className={styles.database_section}>
                        <h3>MySQL容器化</h3>
                        {codeData.mysqlContainerization && (
                            <CodeHighlight
                                code={codeData.mysqlContainerization.code}
                                language={codeData.mysqlContainerization.language}
                                title={codeData.mysqlContainerization.title}
                            />
                        )}

                        <h3>PostgreSQL容器化</h3>
                        {codeData.postgresqlContainerization && (
                            <CodeHighlight
                                code={codeData.postgresqlContainerization.code}
                                language={codeData.postgresqlContainerization.language}
                                title={codeData.postgresqlContainerization.title}
                            />
                        )}

                        <h3>Redis容器化</h3>
                        {codeData.redisContainerization && (
                            <CodeHighlight
                                code={codeData.redisContainerization.code}
                                language={codeData.redisContainerization.language}
                                title={codeData.redisContainerization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 数据安全 */}
                <Card title="🔒 数据安全" className={styles.content_card}>
                    <div className={styles.security_section}>
                        <h3>访问控制</h3>
                        {codeData.accessControl && (
                            <CodeHighlight
                                code={codeData.accessControl.code}
                                language={codeData.accessControl.language}
                                title={codeData.accessControl.title}
                            />
                        )}

                        <h3>数据加密</h3>
                        {codeData.dataEncryption && (
                            <CodeHighlight
                                code={codeData.dataEncryption.code}
                                language={codeData.dataEncryption.language}
                                title={codeData.dataEncryption.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="数据管理建议"
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

                        <Divider />

                        <Alert
                            message="数据库容器化建议"
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

                        <Divider />

                        <Alert
                            message="安全注意事项"
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
