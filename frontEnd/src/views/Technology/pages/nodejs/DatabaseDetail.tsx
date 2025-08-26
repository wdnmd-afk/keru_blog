import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, DatabaseOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DatabaseDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('NodeJS', 'database')

    const handleBack = () => {
        navigate('/technology/nodejs')
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
                    返回NodeJS
                </Button>
                <h1>
                    <DatabaseOutlined /> Node.js 数据库操作
                </h1>
                <p>学习Node.js中各种数据库的连接和操作方法</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 数据库概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>支持的数据库类型</h3>
                        <div className={styles.database_types}>
                            <Tag color="blue">MySQL</Tag>
                            <Tag color="green">MongoDB</Tag>
                            <Tag color="orange">PostgreSQL</Tag>
                            <Tag color="red">Redis</Tag>
                            <Tag color="purple">SQLite</Tag>
                        </div>

                        <h3>选择数据库的考虑因素</h3>
                        <ul>
                            <li>
                                <strong>数据结构</strong>：关系型 vs 非关系型
                            </li>
                            <li>
                                <strong>扩展性</strong>：水平扩展 vs 垂直扩展
                            </li>
                            <li>
                                <strong>一致性</strong>：ACID vs BASE
                            </li>
                            <li>
                                <strong>性能要求</strong>：读写比例、并发量
                            </li>
                            <li>
                                <strong>开发复杂度</strong>：学习成本、维护成本
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* MySQL */}
                <Card title="🐬 MySQL 数据库" className={styles.content_card}>
                    <div className={styles.mysql_section}>
                        <h3>MySQL连接与操作</h3>

                        <div className={styles.usage_item}>
                            <h4>1. 原生驱动使用</h4>
                            {codeData.mysqlNative && (
                                <CodeHighlight
                                    code={codeData.mysqlNative.code}
                                    language={codeData.mysqlNative.language}
                                    title={codeData.mysqlNative.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. Sequelize ORM</h4>
                            {codeData.sequelizeORM && (
                                <CodeHighlight
                                    code={codeData.sequelizeORM.code}
                                    language={codeData.sequelizeORM.language}
                                    title={codeData.sequelizeORM.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. Prisma ORM</h4>
                            {codeData.prismaORM && (
                                <CodeHighlight
                                    code={codeData.prismaORM.code}
                                    language={codeData.prismaORM.language}
                                    title={codeData.prismaORM.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* MongoDB */}
                <Card title="🍃 MongoDB 数据库" className={styles.content_card}>
                    <div className={styles.mongodb_section}>
                        <h3>原生MongoDB驱动</h3>
                        {codeData.mongodbNative && (
                            <CodeHighlight
                                code={codeData.mongodbNative.code}
                                language={codeData.mongodbNative.language}
                                title={codeData.mongodbNative.title}
                            />
                        )}

                        <h3>Mongoose ODM</h3>
                        {codeData.mongooseODM && (
                            <CodeHighlight
                                code={codeData.mongooseODM.code}
                                language={codeData.mongooseODM.language}
                                title={codeData.mongooseODM.title}
                            />
                        )}
                    </div>
                </Card>

                {/* Redis */}
                <Card title="🔴 Redis 缓存" className={styles.content_card}>
                    <div className={styles.redis_section}>
                        <h3>Redis基本使用</h3>
                        {codeData.redisBasic && (
                            <CodeHighlight
                                code={codeData.redisBasic.code}
                                language={codeData.redisBasic.language}
                                title={codeData.redisBasic.title}
                            />
                        )}

                        <h3>Redis缓存策略</h3>
                        {codeData.redisCaching && (
                            <CodeHighlight
                                code={codeData.redisCaching.code}
                                language={codeData.redisCaching.language}
                                title={codeData.redisCaching.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="数据库最佳实践"
                            description={
                                <ul>
                                    <li>使用连接池管理数据库连接</li>
                                    <li>实现适当的错误处理和重试机制</li>
                                    <li>使用参数化查询防止SQL注入</li>
                                    <li>建立数据备份和恢复策略</li>
                                    <li>监控数据库性能和慢查询</li>
                                    <li>合理设计数据库索引</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化建议"
                            description={
                                <ul>
                                    <li>使用适当的数据类型和字段长度</li>
                                    <li>避免N+1查询问题</li>
                                    <li>实现查询结果缓存</li>
                                    <li>使用数据库分页而非应用层分页</li>
                                    <li>定期分析和优化查询性能</li>
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

export default DatabaseDetail
