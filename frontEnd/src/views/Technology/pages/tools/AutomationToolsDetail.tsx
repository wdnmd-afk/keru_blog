import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, RobotOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const AutomationToolsDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Tools', 'automation-tools')

    const handleBack = () => {
        navigate('/technology/tools')
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
        <div className={styles.container}>
            <div className={styles.header}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回工具
                </Button>
                <h1>
                    <RobotOutlined /> 自动化工具
                </h1>
                <p>提升开发效率的自动化工具和脚本</p>
            </div>

            <div className={styles.content}>
                {/* 概述 */}
                <Card title="📋 自动化工具概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是自动化工具</h3>
                        <p>
                            自动化工具是帮助开发者自动执行重复性任务的软件工具，
                            包括构建、测试、部署、代码生成等各个环节，
                            能够显著提升开发效率和代码质量。
                        </p>

                        <h3>自动化工具类型</h3>
                        <div className={styles.tool_types}>
                            <Tag color="blue">任务运行器</Tag>
                            <Tag color="green">构建工具</Tag>
                            <Tag color="orange">代码生成器</Tag>
                            <Tag color="red">部署工具</Tag>
                            <Tag color="purple">监控工具</Tag>
                        </div>

                        <h3>自动化的好处</h3>
                        <ul>
                            <li>
                                <strong>提升效率</strong>：减少手动操作，节省时间
                            </li>
                            <li>
                                <strong>减少错误</strong>：避免人为操作失误
                            </li>
                            <li>
                                <strong>标准化流程</strong>：确保操作的一致性
                            </li>
                            <li>
                                <strong>持续集成</strong>：支持CI/CD流程
                            </li>
                            <li>
                                <strong>团队协作</strong>：统一开发和部署流程
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 任务运行器 */}
                <Card title="⚙️ 任务运行器" className={styles.content_card}>
                    <div className={styles.task_runners}>
                        <h3>npm scripts 自动化</h3>
                        {codeData.npmScripts && (
                            <CodeHighlight
                                code={codeData.npmScripts.code}
                                language={codeData.npmScripts.language}
                                title={codeData.npmScripts.title}
                            />
                        )}

                        <h3>Gulp 任务自动化</h3>
                        {codeData.gulpAutomation && (
                            <CodeHighlight
                                code={codeData.gulpAutomation.code}
                                language={codeData.gulpAutomation.language}
                                title={codeData.gulpAutomation.title}
                            />
                        )}

                        <h3>自定义构建脚本</h3>
                        {codeData.customBuildScript && (
                            <CodeHighlight
                                code={codeData.customBuildScript.code}
                                language={codeData.customBuildScript.language}
                                title={codeData.customBuildScript.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 代码生成工具 */}
                <Card title="🎯 代码生成工具" className={styles.content_card}>
                    <div className={styles.code_generation}>
                        <h3>Plop.js 代码生成器</h3>
                        {codeData.plopCodeGenerator && (
                            <CodeHighlight
                                code={codeData.plopCodeGenerator.code}
                                language={codeData.plopCodeGenerator.language}
                                title={codeData.plopCodeGenerator.title}
                            />
                        )}

                        <h3>自定义代码生成脚本</h3>
                        {codeData.customCodeGenerator && (
                            <CodeHighlight
                                code={codeData.customCodeGenerator.code}
                                language={codeData.customCodeGenerator.language}
                                title={codeData.customCodeGenerator.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="自动化工具使用建议"
                            description={
                                <ul>
                                    <li>从简单的任务开始，逐步扩展自动化范围</li>
                                    <li>保持脚本的可读性和可维护性</li>
                                    <li>为自动化脚本编写文档和使用说明</li>
                                    <li>定期更新和优化自动化流程</li>
                                    <li>团队共享自动化工具和最佳实践</li>
                                    <li>监控自动化任务的执行状态</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="代码生成器建议"
                            description={
                                <ul>
                                    <li>设计灵活的模板系统</li>
                                    <li>支持交互式配置选项</li>
                                    <li>生成的代码要符合项目规范</li>
                                    <li>提供代码生成的撤销机制</li>
                                    <li>定期更新模板以适应新需求</li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="常见问题解决"
                            description={
                                <ul>
                                    <li>
                                        <strong>脚本执行失败</strong>：检查依赖和权限设置
                                    </li>
                                    <li>
                                        <strong>跨平台兼容性</strong>：使用跨平台的工具和命令
                                    </li>
                                    <li>
                                        <strong>性能问题</strong>：优化任务执行顺序和并行度
                                    </li>
                                    <li>
                                        <strong>错误处理</strong>：添加适当的错误处理和日志
                                    </li>
                                    <li>
                                        <strong>版本兼容</strong>：确保工具版本的兼容性
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

export default AutomationToolsDetail
