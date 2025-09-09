import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, RocketOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Spin, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ProductivityDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'productivity')

    const handleBack = () => {
        navigate('/technology/tools')
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
                    返回工具技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>生产力工具</h1>
                    <p>提升开发效率的生产力工具和自动化解决方案，优化工作流程</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">代码片段</Tag>
                        <Tag color="green">文本扩展</Tag>
                        <Tag color="orange">窗口管理</Tag>
                        <Tag color="purple">自动化脚本</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 概述 */}
                <Card title="📋 生产力工具概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是生产力工具</h3>
                        <p>
                            生产力工具是帮助开发者提升工作效率、减少重复劳动、
                            自动化日常任务的软件和脚本。通过合理使用这些工具，
                            可以显著提升开发效率和工作质量。
                        </p>

                        <h3>工具分类</h3>
                        <div className={styles.network_types}>
                            <Tag color="blue">代码片段</Tag>
                            <Tag color="green">文本扩展</Tag>
                            <Tag color="orange">窗口管理</Tag>
                            <Tag color="red">自动化脚本</Tag>
                            <Tag color="purple">快捷启动</Tag>
                            <Tag color="cyan">任务调度</Tag>
                        </div>

                        <h3>效率提升原则</h3>
                        <ul>
                            <li>
                                <strong>自动化重复任务</strong>：减少手动操作
                            </li>
                            <li>
                                <strong>快速访问常用功能</strong>：减少查找时间
                            </li>
                            <li>
                                <strong>统一工作环境</strong>：保持一致的配置
                            </li>
                            <li>
                                <strong>减少上下文切换</strong>：优化工作流程
                            </li>
                            <li>
                                <strong>批量处理</strong>：提高处理效率
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 代码片段管理 */}
                <Card title="📝 代码片段管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. VS Code 代码片段</h4>
                            {codeData.codeSnippets && (
                                <CodeHighlight
                                    code={codeData.codeSnippets.code}
                                    language={codeData.codeSnippets.language}
                                    title={codeData.codeSnippets.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 文本扩展工具</h4>
                            {codeData.textExpansion && (
                                <CodeHighlight
                                    code={codeData.textExpansion.code}
                                    language={codeData.textExpansion.language}
                                    title={codeData.textExpansion.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. Raycast 脚本命令</h4>
                            {codeData.raycastScripts && (
                                <CodeHighlight
                                    code={codeData.raycastScripts.code}
                                    language={codeData.raycastScripts.language}
                                    title={codeData.raycastScripts.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 自动化工具 */}
                <Card title="🤖 自动化工具" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>4. 窗口管理配置</h4>
                            {codeData.windowManagement && (
                                <CodeHighlight
                                    code={codeData.windowManagement.code}
                                    language={codeData.windowManagement.language}
                                    title={codeData.windowManagement.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>5. 自动化工作流</h4>
                            {codeData.automationWorkflows && (
                                <CodeHighlight
                                    code={codeData.automationWorkflows.code}
                                    language={codeData.automationWorkflows.language}
                                    title={codeData.automationWorkflows.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>6. 自定义自动化脚本</h4>
                            {codeData.customAutomation && (
                                <CodeHighlight
                                    code={codeData.customAutomation.code}
                                    language={codeData.customAutomation.language}
                                    title={codeData.customAutomation.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className="f-ic">
                        <Alert
                            message="生产力工具使用建议"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>从小处着手，逐步建立自动化工作流</li>
                                    <li>定期评估和优化工具配置</li>
                                    <li>保持工具配置的版本控制</li>
                                    <li>团队共享有用的工具和配置</li>
                                    <li>避免过度依赖工具，保持基础技能</li>
                                    <li>定期备份重要的配置和脚本</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Alert
                            message="效率提升策略"
                            className={'h-50 flex-1 mx-5'}
                            description={
                                <ul>
                                    <li>
                                        <strong>快捷键优化</strong>：为常用操作设置快捷键
                                    </li>
                                    <li>
                                        <strong>模板化</strong>：创建项目和文件模板
                                    </li>
                                    <li>
                                        <strong>批处理</strong>：批量处理相似任务
                                    </li>
                                    <li>
                                        <strong>环境同步</strong>：在不同设备间同步配置
                                    </li>
                                    <li>
                                        <strong>监控自动化</strong>：设置任务执行监控
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Alert
                            message="工具选择建议"
                            className={'h-50 flex-1'}
                            description={
                                <ul>
                                    <li>
                                        <strong>跨平台兼容</strong>：选择支持多平台的工具
                                    </li>
                                    <li>
                                        <strong>学习成本</strong>：平衡功能强大与易用性
                                    </li>
                                    <li>
                                        <strong>社区支持</strong>：选择有活跃社区的工具
                                    </li>
                                    <li>
                                        <strong>数据安全</strong>：注意工具的数据隐私政策
                                    </li>
                                    <li>
                                        <strong>可扩展性</strong>：选择支持插件和自定义的工具
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

export default ProductivityDetail
