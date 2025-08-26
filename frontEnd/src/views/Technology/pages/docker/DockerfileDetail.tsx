import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/dockerfileDetail.module.scss'
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    RocketOutlined,
    SafetyOutlined,
    ThunderboltOutlined,
    ToolOutlined,
} from '@ant-design/icons'
import { Alert, Button, Card, Divider, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Dockerfile 详解页面组件
 * 提供 Dockerfile 编写指南、最佳实践和优化技巧
 */
const DockerfileDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'dockerfile')

    // 返回 Docker 主页
    const handleBack = () => {
        navigate('/technology/docker')
    }

    // 加载状态
    if (loading) {
        return <div className={styles.loading}>加载中...</div>
    }

    // 错误状态
    if (error) {
        return <div className={styles.error}>加载失败: {error}</div>
    }

    return (
        <div className={styles.container}>
            {/* 页面头部 */}
            <div className={styles.header}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回Docker
                </Button>
                <div className={styles.topic_header}>
                    <div className={styles.topic_icon}>
                        <FileTextOutlined />
                    </div>
                    <div className={styles.topic_info}>
                        <h1>Dockerfile 镜像构建详解</h1>
                        <p>掌握 Dockerfile 编写技巧，构建高效、安全的容器镜像</p>
                        <div className={styles.topic_tags}>
                            <Tag color="blue">镜像构建</Tag>
                            <Tag color="green">最佳实践</Tag>
                            <Tag color="orange">性能优化</Tag>
                            <Tag color="purple">安全配置</Tag>
                        </div>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 Dockerfile 基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是 Dockerfile？</h3>
                        <p>
                            Dockerfile 是一个文本文件，包含了构建 Docker 镜像所需的所有指令。
                            通过 Dockerfile，我们可以自动化地创建包含应用程序及其依赖项的镜像，
                            确保应用在任何环境中都能一致地运行。
                        </p>

                        <h3>核心指令</h3>
                        <div className={styles.instruction_types}>
                            <Tag color="blue">FROM (基础镜像)</Tag>
                            <Tag color="green">RUN (执行命令)</Tag>
                            <Tag color="orange">COPY/ADD (复制文件)</Tag>
                            <Tag color="red">WORKDIR (工作目录)</Tag>
                            <Tag color="purple">EXPOSE (暴露端口)</Tag>
                            <Tag color="cyan">CMD/ENTRYPOINT (启动命令)</Tag>
                        </div>

                        <h3>基础示例</h3>
                        {codeData.dockerfileBasics && (
                            <CodeHighlight
                                code={codeData.dockerfileBasics.code}
                                language={codeData.dockerfileBasics.language}
                                title={codeData.dockerfileBasics.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 多阶段构建 */}
                <Card title="🚀 多阶段构建优化" className={styles.content_card}>
                    <div className={styles.multistage_content}>
                        <h3>为什么使用多阶段构建？</h3>
                        <p>
                            多阶段构建允许我们在一个 Dockerfile 中使用多个 FROM 指令，
                            每个阶段可以使用不同的基础镜像。这样可以显著减小最终镜像的大小，
                            提高安全性，并优化构建过程。
                        </p>

                        <div className={styles.benefits_list}>
                            <div className={styles.benefit_item}>
                                <CheckCircleOutlined className={styles.benefit_icon} />
                                <span><strong>镜像体积小</strong>：只包含运行时必需的文件</span>
                            </div>
                            <div className={styles.benefit_item}>
                                <CheckCircleOutlined className={styles.benefit_icon} />
                                <span><strong>安全性高</strong>：不包含构建工具和源代码</span>
                            </div>
                            <div className={styles.benefit_item}>
                                <CheckCircleOutlined className={styles.benefit_icon} />
                                <span><strong>构建效率</strong>：利用缓存层提高构建速度</span>
                            </div>
                        </div>

                        {codeData.multistageBuilds && (
                            <CodeHighlight
                                code={codeData.multistageBuilds.code}
                                language={codeData.multistageBuilds.language}
                                title={codeData.multistageBuilds.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 安全最佳实践 */}
                <Card title="🔒 安全最佳实践" className={styles.content_card}>
                    <div className={styles.security_content}>
                        <h3>容器安全原则</h3>
                        <p>
                            构建安全的容器镜像需要遵循最小权限原则、使用非 root 用户、
                            定期更新基础镜像等安全实践。
                        </p>

                        <div className={styles.security_practices}>
                            <div className={styles.practice_item}>
                                <SafetyOutlined className={styles.practice_icon} />
                                <div>
                                    <h4>1. 使用非 root 用户</h4>
                                    <p>创建专用用户运行应用，避免使用 root 权限</p>
                                </div>
                            </div>
                            <div className={styles.practice_item}>
                                <SafetyOutlined className={styles.practice_icon} />
                                <div>
                                    <h4>2. 最小化镜像内容</h4>
                                    <p>只安装必需的软件包，移除不必要的文件</p>
                                </div>
                            </div>
                            <div className={styles.practice_item}>
                                <SafetyOutlined className={styles.practice_icon} />
                                <div>
                                    <h4>3. 使用官方基础镜像</h4>
                                    <p>选择官方维护的、定期更新的基础镜像</p>
                                </div>
                            </div>
                        </div>

                        {codeData.securityBestPractices && (
                            <CodeHighlight
                                code={codeData.securityBestPractices.code}
                                language={codeData.securityBestPractices.language}
                                title={codeData.securityBestPractices.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 性能优化技巧 */}
                <Card title="⚡ 性能优化技巧" className={styles.content_card}>
                    <div className={styles.optimization_content}>
                        <h3>镜像层优化</h3>
                        <p>
                            Docker 使用分层文件系统，每个指令都会创建一个新的层。
                            合理安排指令顺序和合并操作可以显著提高构建效率和镜像性能。
                        </p>

                        <div className={styles.optimization_tips}>
                            <div className={styles.tip_item}>
                                <ThunderboltOutlined className={styles.tip_icon} />
                                <div>
                                    <h4>1. 合并 RUN 指令</h4>
                                    <p>将多个 RUN 命令合并为一个，减少镜像层数</p>
                                </div>
                            </div>
                            <div className={styles.tip_item}>
                                <ThunderboltOutlined className={styles.tip_icon} />
                                <div>
                                    <h4>2. 利用构建缓存</h4>
                                    <p>将变化频率低的指令放在前面，提高缓存命中率</p>
                                </div>
                            </div>
                            <div className={styles.tip_item}>
                                <ThunderboltOutlined className={styles.tip_icon} />
                                <div>
                                    <h4>3. 使用 .dockerignore</h4>
                                    <p>排除不必要的文件，减小构建上下文</p>
                                </div>
                            </div>
                        </div>

                        {codeData.layerOptimization && (
                            <CodeHighlight
                                code={codeData.layerOptimization.code}
                                language={codeData.layerOptimization.language}
                                title={codeData.layerOptimization.title}
                            />
                        )}

                        <h3>.dockerignore 文件配置</h3>
                        {codeData.dockerignoreExample && (
                            <CodeHighlight
                                code={codeData.dockerignoreExample.code}
                                language={codeData.dockerignoreExample.language}
                                title={codeData.dockerignoreExample.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 环境变量与配置 */}
                <Card title="⚙️ 环境变量与配置" className={styles.content_card}>
                    <div className={styles.config_content}>
                        <h3>灵活的配置管理</h3>
                        <p>
                            合理使用 ENV 和 ARG 指令可以让镜像更加灵活，
                            支持不同环境的配置需求。
                        </p>

                        <div className={styles.config_comparison}>
                            <div className={styles.config_item}>
                                <h4>ARG vs ENV</h4>
                                <ul>
                                    <li><strong>ARG</strong>：构建时变量，仅在构建过程中可用</li>
                                    <li><strong>ENV</strong>：运行时变量，在容器运行时可用</li>
                                </ul>
                            </div>
                        </div>

                        {codeData.environmentVariables && (
                            <CodeHighlight
                                code={codeData.environmentVariables.code}
                                language={codeData.environmentVariables.language}
                                title={codeData.environmentVariables.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 健康检查 */}
                <Card title="🏥 健康检查配置" className={styles.content_card}>
                    <div className={styles.health_content}>
                        <h3>容器健康监控</h3>
                        <p>
                            健康检查可以帮助 Docker 和编排工具了解容器的运行状态，
                            及时发现和处理异常情况。
                        </p>

                        <div className={styles.health_benefits}>
                            <div className={styles.health_item}>
                                <CheckCircleOutlined className={styles.health_icon} />
                                <span><strong>自动重启</strong>：检测到异常时自动重启容器</span>
                            </div>
                            <div className={styles.health_item}>
                                <CheckCircleOutlined className={styles.health_icon} />
                                <span><strong>负载均衡</strong>：从负载均衡器中移除不健康的实例</span>
                            </div>
                            <div className={styles.health_item}>
                                <CheckCircleOutlined className={styles.health_icon} />
                                <span><strong>监控告警</strong>：集成监控系统进行告警</span>
                            </div>
                        </div>

                        {codeData.healthchecks && (
                            <CodeHighlight
                                code={codeData.healthchecks.code}
                                language={codeData.healthchecks.language}
                                title={codeData.healthchecks.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 不同语言示例 */}
                <Card title="🌐 不同语言的最佳实践" className={styles.content_card}>
                    <div className={styles.language_examples}>
                        <h3>针对不同技术栈的优化</h3>
                        <p>
                            不同的编程语言和框架有各自的特点，
                            需要采用相应的 Dockerfile 编写策略。
                        </p>

                        {codeData.languageSpecificExamples && (
                            <CodeHighlight
                                code={codeData.languageSpecificExamples.code}
                                language={codeData.languageSpecificExamples.language}
                                title={codeData.languageSpecificExamples.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 设计原则与最佳实践 */}
                <Card title="💡 设计原则与最佳实践" className={styles.content_card}>
                    <div className={styles.principles_content}>
                        <h3>Dockerfile 设计原则</h3>
                        
                        <div className={styles.principles_grid}>
                            <div className={styles.principle_item}>
                                <ToolOutlined className={styles.principle_icon} />
                                <div>
                                    <h4>单一职责</h4>
                                    <p>每个容器应该只运行一个主要进程，遵循微服务架构原则</p>
                                </div>
                            </div>
                            
                            <div className={styles.principle_item}>
                                <RocketOutlined className={styles.principle_icon} />
                                <div>
                                    <h4>最小化原则</h4>
                                    <p>只安装必需的软件包，使用轻量级基础镜像</p>
                                </div>
                            </div>
                            
                            <div className={styles.principle_item}>
                                <SafetyOutlined className={styles.principle_icon} />
                                <div>
                                    <h4>安全优先</h4>
                                    <p>使用非 root 用户，定期更新依赖，扫描安全漏洞</p>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <Alert
                            message="构建优化建议"
                            description={
                                <ul>
                                    <li>
                                        <strong>缓存策略</strong>：将变化频率低的指令放在前面
                                    </li>
                                    <li>
                                        <strong>层数控制</strong>：合并相关的 RUN 指令减少层数
                                    </li>
                                    <li>
                                        <strong>文件排除</strong>：使用 .dockerignore 排除不必要文件
                                    </li>
                                    <li>
                                        <strong>多阶段构建</strong>：分离构建和运行环境
                                    </li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="生产环境注意事项"
                            description={
                                <ul>
                                    <li>
                                        <strong>镜像扫描</strong>：定期扫描镜像安全漏洞
                                    </li>
                                    <li>
                                        <strong>版本管理</strong>：使用具体的版本标签，避免使用 latest
                                    </li>
                                    <li>
                                        <strong>资源限制</strong>：设置合适的 CPU 和内存限制
                                    </li>
                                    <li>
                                        <strong>日志配置</strong>：配置合适的日志驱动和轮转策略
                                    </li>
                                    <li>
                                        <strong>健康检查</strong>：配置应用健康检查端点
                                    </li>
                                </ul>
                            }
                            type="warning"
                            showIcon
                        />

                        <Divider />

                        <Alert
                            message="性能优化技巧"
                            description={
                                <ul>
                                    <li>
                                        <strong>基础镜像选择</strong>：优先选择 Alpine 等轻量级镜像
                                    </li>
                                    <li>
                                        <strong>并行构建</strong>：使用 BuildKit 启用并行构建
                                    </li>
                                    <li>
                                        <strong>依赖缓存</strong>：先复制依赖文件，再复制源代码
                                    </li>
                                    <li>
                                        <strong>清理缓存</strong>：及时清理包管理器缓存
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

export default DockerfileDetail