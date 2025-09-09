import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const BestPracticesDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Jest', 'best-practices')

    const handleBack = () => {
        navigate('/technology/jest')
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
                    返回Jest技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <CheckCircleOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Jest 最佳实践</h1>
                    <p>掌握Jest测试的最佳实践、性能优化与团队协作</p>
                    <div className={styles.topic_tags}>
                        <Tag color="red">最佳实践</Tag>
                        <Tag color="blue">性能优化</Tag>
                        <Tag color="green">团队协作</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_section}>
                {/* 概述 */}
                <Card title="📋 测试最佳实践概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>为什么需要最佳实践</h3>
                        <p>
                            良好的测试实践不仅能提高代码质量，还能提升开发效率，
                            减少维护成本，增强团队协作。遵循最佳实践能让测试代码
                            更加可读、可维护、可扩展。
                        </p>

                        <h3>实践领域</h3>
                        <div className={styles.practice_areas}>
                            <Tag color="blue">测试结构</Tag>
                            <Tag color="green">命名规范</Tag>
                            <Tag color="orange">测试策略</Tag>
                            <Tag color="red">性能优化</Tag>
                            <Tag color="purple">团队协作</Tag>
                            <Tag color="cyan">CI/CD集成</Tag>
                        </div>

                        <h3>实践价值</h3>
                        <ul>
                            <li>
                                <strong>代码质量</strong>：提升测试代码的质量和可读性
                            </li>
                            <li>
                                <strong>开发效率</strong>：减少调试时间，加快开发速度
                            </li>
                            <li>
                                <strong>维护成本</strong>：降低测试维护的复杂度
                            </li>
                            <li>
                                <strong>团队协作</strong>：统一的标准和规范
                            </li>
                            <li>
                                <strong>持续集成</strong>：稳定可靠的自动化测试
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 测试结构 */}
                <Card title="🏗️ 测试结构最佳实践" className={styles.content_card}>
                    <div className={styles.test_structure}>
                        <h3>AAA 模式</h3>
                        {codeData.aaaPattern && (
                            <CodeHighlight
                                code={codeData.aaaPattern.code}
                                language={codeData.aaaPattern.language}
                                title={codeData.aaaPattern.title}
                            />
                        )}

                        <h3>测试组织</h3>
                        {codeData.testOrganization && (
                            <CodeHighlight
                                code={codeData.testOrganization.code}
                                language={codeData.testOrganization.language}
                                title={codeData.testOrganization.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 命名规范 */}
                <Card title="📝 命名规范" className={styles.content_card}>
                    <div className={styles.naming_conventions}>
                        <h3>测试命名</h3>
                        {codeData.testNaming && (
                            <CodeHighlight
                                code={codeData.testNaming.code}
                                language={codeData.testNaming.language}
                                title={codeData.testNaming.title}
                            />
                        )}

                        <h3>变量命名</h3>
                        {codeData.variableNaming && (
                            <CodeHighlight
                                code={codeData.variableNaming.code}
                                language={codeData.variableNaming.language}
                                title={codeData.variableNaming.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 测试策略 */}
                <Card title="🎯 测试策略" className={styles.content_card}>
                    <div className={styles.test_strategy}>
                        <h3>测试金字塔</h3>
                        {codeData.testPyramid && (
                            <CodeHighlight
                                code={codeData.testPyramid.code}
                                language={codeData.testPyramid.language}
                                title={codeData.testPyramid.title}
                            />
                        )}

                        <h3>测试分类</h3>
                        {codeData.testCategories && (
                            <CodeHighlight
                                code={codeData.testCategories.code}
                                language={codeData.testCategories.language}
                                title={codeData.testCategories.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 性能优化 */}
                <Card title="⚡ 性能优化" className={styles.content_card}>
                    <div className={styles.performance_optimization}>
                        <h3>测试性能优化</h3>
                        {codeData.performanceOptimization && (
                            <CodeHighlight
                                code={codeData.performanceOptimization.code}
                                language={codeData.performanceOptimization.language}
                                title={codeData.performanceOptimization.title}
                            />
                        )}

                        <h3>并行测试</h3>
                        {codeData.parallelTesting && (
                            <CodeHighlight
                                code={codeData.parallelTesting.code}
                                language={codeData.parallelTesting.language}
                                title={codeData.parallelTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 团队协作 */}
                <Card title="👥 团队协作" className={styles.content_card}>
                    <div className={styles.team_collaboration}>
                        <h3>代码审查</h3>
                        {codeData.codeReview && (
                            <CodeHighlight
                                code={codeData.codeReview.code}
                                language={codeData.codeReview.language}
                                title={codeData.codeReview.title}
                            />
                        )}

                        <h3>测试文档</h3>
                        {codeData.testDocumentation && (
                            <CodeHighlight
                                code={codeData.testDocumentation.code}
                                language={codeData.testDocumentation.language}
                                title={codeData.testDocumentation.title}
                            />
                        )}
                    </div>
                </Card>

                {/* CI/CD集成 */}
                <Card title="🔄 CI/CD 集成" className={styles.content_card}>
                    <div className={styles.cicd_integration}>
                        <h3>持续集成配置</h3>
                        {codeData.cicdConfiguration && (
                            <CodeHighlight
                                code={codeData.cicdConfiguration.code}
                                language={codeData.cicdConfiguration.language}
                                title={codeData.cicdConfiguration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践总结 */}
                <Card title="💡 最佳实践总结" className={styles.content_card}>
                    <div className={styles.best_practices_summary}>
                        <Alert
                            message="核心原则"
                            description={
                                <ul>
                                    <li>测试应该简单、清晰、易于理解</li>
                                    <li>一个测试只验证一个行为</li>
                                    <li>测试应该独立且可重复执行</li>
                                    <li>优先测试核心业务逻辑</li>
                                    <li>保持测试代码的高质量</li>
                                    <li>定期重构和维护测试代码</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="团队协作建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>统一标准</strong>：制定团队统一的测试规范
                                    </li>
                                    <li>
                                        <strong>代码审查</strong>：将测试代码纳入代码审查
                                    </li>
                                    <li>
                                        <strong>知识分享</strong>：定期分享测试经验和技巧
                                    </li>
                                    <li>
                                        <strong>工具统一</strong>：使用统一的测试工具和配置
                                    </li>
                                    <li>
                                        <strong>持续改进</strong>：不断优化测试流程和质量
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="常见问题避免"
                            description={
                                <ul>
                                    <li>
                                        <strong>过度测试</strong>：避免测试实现细节
                                    </li>
                                    <li>
                                        <strong>脆弱测试</strong>：减少对外部依赖的耦合
                                    </li>
                                    <li>
                                        <strong>重复测试</strong>：避免重复测试相同的逻辑
                                    </li>
                                    <li>
                                        <strong>忽视维护</strong>：定期更新和重构测试代码
                                    </li>
                                    <li>
                                        <strong>缺乏文档</strong>：为复杂测试提供必要的文档
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

export default BestPracticesDetail
