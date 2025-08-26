import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const JestBasicsDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Jest', 'jest-basics')

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
                    <SettingOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Jest 基础配置</h1>
                    <p>掌握Jest测试框架的安装、配置和基本概念</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">基础配置</Tag>
                        <Tag color="green">安装</Tag>
                        <Tag color="orange">项目结构</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_section}>
                {/* 概述 */}
                <Card title="📋 Jest 概述" className={styles.content_card}>
                    <div className={styles.overview_section}>
                        <h3>什么是 Jest</h3>
                        <p>
                            Jest 是由 Facebook 开发的一个功能强大的 JavaScript 测试框架。
                            它专注于简单性，支持大多数 JavaScript 项目，包括使用 Babel、TypeScript、
                            Node.js、React、Angular、Vue.js 等技术的项目。
                        </p>

                        <h3>核心特性</h3>
                        <div className={styles.features}>
                            <Tag color="blue">零配置</Tag>
                            <Tag color="green">快照测试</Tag>
                            <Tag color="orange">并行测试</Tag>
                            <Tag color="red">代码覆盖率</Tag>
                            <Tag color="purple">Mock 功能</Tag>
                            <Tag color="cyan">监视模式</Tag>
                        </div>

                        <h3>Jest 优势</h3>
                        <ul>
                            <li>
                                <strong>开箱即用</strong>：无需复杂配置即可开始测试
                            </li>
                            <li>
                                <strong>功能全面</strong>：内置断言、Mock、覆盖率等功能
                            </li>
                            <li>
                                <strong>性能优秀</strong>：并行执行测试，速度快
                            </li>
                            <li>
                                <strong>生态丰富</strong>：与主流框架深度集成
                            </li>
                            <li>
                                <strong>开发体验</strong>：友好的错误信息和调试支持
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 安装配置 */}
                <Card title="🚀 安装与配置" className={styles.content_card}>
                    <div className={styles.installation_section}>
                        <h3>安装 Jest</h3>
                        {codeData.installation && (
                            <CodeHighlight
                                code={codeData.installation.code}
                                language={codeData.installation.language}
                                title={codeData.installation.title}
                            />
                        )}

                        <h3>基础配置文件</h3>
                        {codeData.basicConfiguration && (
                            <CodeHighlight
                                code={codeData.basicConfiguration.code}
                                language={codeData.basicConfiguration.language}
                                title={codeData.basicConfiguration.title}
                            />
                        )}

                        <h3>TypeScript 配置</h3>
                        {codeData.typescriptConfiguration && (
                            <CodeHighlight
                                code={codeData.typescriptConfiguration.code}
                                language={codeData.typescriptConfiguration.language}
                                title={codeData.typescriptConfiguration.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 基本概念 */}
                <Card title="📚 基本概念" className={styles.content_card}>
                    <div className={styles.concepts_section}>
                        <h3>测试结构</h3>
                        {codeData.testStructure && (
                            <CodeHighlight
                                code={codeData.testStructure.code}
                                language={codeData.testStructure.language}
                                title={codeData.testStructure.title}
                            />
                        )}

                        <h3>常用匹配器</h3>
                        {codeData.commonMatchers && (
                            <CodeHighlight
                                code={codeData.commonMatchers.code}
                                language={codeData.commonMatchers.language}
                                title={codeData.commonMatchers.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 测试命令 */}
                <Card title="⚡ 测试命令" className={styles.content_card}>
                    <div className={styles.commands_section}>
                        <h3>常用命令</h3>
                        {codeData.testCommands && (
                            <CodeHighlight
                                code={codeData.testCommands.code}
                                language={codeData.testCommands.language}
                                title={codeData.testCommands.title}
                            />
                        )}

                        <h3>监视模式</h3>
                        {codeData.watchMode && (
                            <CodeHighlight
                                code={codeData.watchMode.code}
                                language={codeData.watchMode.language}
                                title={codeData.watchMode.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 项目结构 */}
                <Card title="📁 项目结构" className={styles.content_card}>
                    <div className={styles.structure_section}>
                        <h3>推荐的目录结构</h3>
                        {codeData.projectStructure && (
                            <CodeHighlight
                                code={codeData.projectStructure.code}
                                language={codeData.projectStructure.language}
                                title={codeData.projectStructure.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="💡 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <Alert
                            message="Jest 配置建议"
                            description={
                                <ul>
                                    <li>使用 jest.config.js 文件进行配置管理</li>
                                    <li>合理设置测试环境（node、jsdom等）</li>
                                    <li>配置适当的测试文件匹配模式</li>
                                    <li>启用代码覆盖率收集</li>
                                    <li>设置合理的覆盖率阈值</li>
                                    <li>使用 setupFilesAfterEnv 进行全局设置</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="测试文件组织"
                            description={
                                <ul>
                                    <li>
                                        <strong>命名规范</strong>：使用 .test.js 或 .spec.js 后缀
                                    </li>
                                    <li>
                                        <strong>目录结构</strong>：测试文件与源文件保持对应关系
                                    </li>
                                    <li>
                                        <strong>分组测试</strong>：使用 describe 对相关测试进行分组
                                    </li>
                                    <li>
                                        <strong>测试描述</strong>：使用清晰的测试描述
                                    </li>
                                    <li>
                                        <strong>测试隔离</strong>：确保测试之间相互独立
                                    </li>
                                </ul>
                            }
                            type="success"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>并行执行</strong>：利用 Jest 的并行测试能力
                                    </li>
                                    <li>
                                        <strong>测试缓存</strong>：启用测试结果缓存
                                    </li>
                                    <li>
                                        <strong>选择性运行</strong>：使用模式匹配运行特定测试
                                    </li>
                                    <li>
                                        <strong>资源清理</strong>：及时清理测试资源
                                    </li>
                                    <li>
                                        <strong>Mock 优化</strong>：合理使用 Mock 减少依赖
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

export default JestBasicsDetail
