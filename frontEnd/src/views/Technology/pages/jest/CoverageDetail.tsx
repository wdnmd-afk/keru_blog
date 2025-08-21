import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    PieChartOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const CoverageDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Jest', 'coverage')

    const handleBack = () => {
        navigate('/technology/jest')
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
                    返回Jest技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <PieChartOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Jest 测试覆盖率</h1>
                    <p>掌握代码覆盖率分析、报告生成与质量评估</p>
                    <div className={styles.topic_tags}>
                        <Tag color="cyan">覆盖率</Tag>
                        <Tag color="blue">报告</Tag>
                        <Tag color="green">质量评估</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_section}>
                {/* 概述 */}
                <Card title="📋 测试覆盖率概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是测试覆盖率</h3>
                        <p>
                            测试覆盖率是衡量测试质量的重要指标，它表示测试用例执行时覆盖了多少源代码。
                            高覆盖率通常意味着更好的测试质量，但100%的覆盖率并不等同于完美的测试。
                        </p>

                        <h3>覆盖率类型</h3>
                        <div className={styles.coverage_types}>
                            <Tag color="blue">语句覆盖率</Tag>
                            <Tag color="green">分支覆盖率</Tag>
                            <Tag color="orange">函数覆盖率</Tag>
                            <Tag color="red">行覆盖率</Tag>
                        </div>

                        <h3>覆盖率的价值</h3>
                        <ul>
                            <li><strong>质量评估</strong>：评估测试的完整性和质量</li>
                            <li><strong>风险识别</strong>：发现未测试的代码路径</li>
                            <li><strong>重构保障</strong>：为代码重构提供信心</li>
                            <li><strong>团队协作</strong>：统一的质量标准</li>
                            <li><strong>持续改进</strong>：指导测试策略优化</li>
                        </ul>
                    </div>
                </Card>

                {/* 配置覆盖率 */}
                <Card title="⚙️ 覆盖率配置" className={styles.content_card}>
                    <div className={styles.coverage_config}>
                        <h3>基础配置</h3>
                        {codeData.basicCoverageConfig && (
                            <CodeHighlight
                                code={codeData.basicCoverageConfig.code}
                                language={codeData.basicCoverageConfig.language}
                                title={codeData.basicCoverageConfig.title}
                            />
                        )}
                        
                        <h3>高级配置</h3>
                        {codeData.advancedCoverageConfig && (
                            <CodeHighlight
                                code={codeData.advancedCoverageConfig.code}
                                language={codeData.advancedCoverageConfig.language}
                                title={codeData.advancedCoverageConfig.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 覆盖率阈值 */}
                <Card title="🎯 覆盖率阈值" className={styles.content_card}>
                    <div className={styles.coverage_thresholds}>
                        <h3>阈值设置</h3>
                        {codeData.coverageThresholds && (
                            <CodeHighlight
                                code={codeData.coverageThresholds.code}
                                language={codeData.coverageThresholds.language}
                                title={codeData.coverageThresholds.title}
                            />
                        )}
                        
                        <h3>分目录阈值</h3>
                        {codeData.directoryThresholds && (
                            <CodeHighlight
                                code={codeData.directoryThresholds.code}
                                language={codeData.directoryThresholds.language}
                                title={codeData.directoryThresholds.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 覆盖率报告 */}
                <Card title="📊 覆盖率报告" className={styles.content_card}>
                    <div className={styles.coverage_reports}>
                        <h3>报告格式配置</h3>
                        {codeData.reportFormats && (
                            <CodeHighlight
                                code={codeData.reportFormats.code}
                                language={codeData.reportFormats.language}
                                title={codeData.reportFormats.title}
                            />
                        )}
                        
                        <h3>自定义报告</h3>
                        {codeData.customReports && (
                            <CodeHighlight
                                code={codeData.customReports.code}
                                language={codeData.customReports.language}
                                title={codeData.customReports.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 覆盖率优化 */}
                <Card title="🚀 覆盖率优化" className={styles.content_card}>
                    <div className={styles.coverage_optimization}>
                        <h3>提高覆盖率策略</h3>
                        {codeData.improveCoverage && (
                            <CodeHighlight
                                code={codeData.improveCoverage.code}
                                language={codeData.improveCoverage.language}
                                title={codeData.improveCoverage.title}
                            />
                        )}
                        
                        <h3>覆盖率分析</h3>
                        {codeData.coverageAnalysis && (
                            <CodeHighlight
                                code={codeData.coverageAnalysis.code}
                                language={codeData.coverageAnalysis.language}
                                title={codeData.coverageAnalysis.title}
                            />
                        )}
                    </div>
                </Card>

                {/* CI/CD集成 */}
                <Card title="🔄 CI/CD 集成" className={styles.content_card}>
                    <div className={styles.cicd_integration}>
                        <h3>GitHub Actions 集成</h3>
                        {codeData.githubActions && (
                            <CodeHighlight
                                code={codeData.githubActions.code}
                                language={codeData.githubActions.language}
                                title={codeData.githubActions.title}
                            />
                        )}
                        
                        <h3>覆盖率徽章</h3>
                        {codeData.coverageBadges && (
                            <CodeHighlight
                                code={codeData.coverageBadges.code}
                                language={codeData.coverageBadges.language}
                                title={codeData.coverageBadges.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 覆盖率最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="覆盖率目标设定"
                            description={
                                <ul>
                                    <li>核心业务逻辑：90-95% 覆盖率</li>
                                    <li>工具函数和库：85-90% 覆盖率</li>
                                    <li>UI组件：70-80% 覆盖率</li>
                                    <li>配置文件：可以较低或排除</li>
                                    <li>第三方库：通常排除在外</li>
                                    <li>渐进式提升，避免一步到位</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="覆盖率质量保证"
                            description={
                                <ul>
                                    <li><strong>质量优于数量</strong>：关注测试质量而非覆盖率数字</li>
                                    <li><strong>边界测试</strong>：重点测试边界条件和异常情况</li>
                                    <li><strong>业务逻辑</strong>：优先覆盖核心业务逻辑</li>
                                    <li><strong>代码审查</strong>：结合代码审查评估测试质量</li>
                                    <li><strong>定期评估</strong>：定期评估和调整覆盖率目标</li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="常见误区避免"
                            description={
                                <ul>
                                    <li><strong>盲目追求100%</strong>：不是所有代码都需要测试</li>
                                    <li><strong>忽视测试质量</strong>：高覆盖率不等于高质量测试</li>
                                    <li><strong>测试实现细节</strong>：应该测试行为而非实现</li>
                                    <li><strong>覆盖率造假</strong>：避免为了覆盖率而写无意义测试</li>
                                    <li><strong>忽视维护成本</strong>：考虑测试的维护成本</li>
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

export default CoverageDetail
