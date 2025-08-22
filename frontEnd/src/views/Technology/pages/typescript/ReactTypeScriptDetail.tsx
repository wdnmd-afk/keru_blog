import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    CodeOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const ReactTypeScriptDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'reactTypeScriptDetail')
    
    const handleBack = () => {
        navigate('/technology/typescript')
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
                    返回TypeScript技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <CodeOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>React + TypeScript 详解</h1>
                    <p>掌握React与TypeScript的完美结合</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React</Tag>
                        <Tag color="green">TypeScript</Tag>
                        <Tag color="orange">组件类型</Tag>
                        <Tag color="purple">Hooks类型</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* React TypeScript基础 */}
                <Card title="⚛️ React TypeScript 基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么使用React + TypeScript？</h3>
                        <p>TypeScript为React开发提供了强大的类型安全保障，能够在编译时发现错误，提供更好的开发体验和代码维护性。</p>
                        
                        <h3>核心优势</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🛡️ 类型安全</h4>
                                <p>编译时错误检查，减少运行时错误</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔍 智能提示</h4>
                                <p>IDE提供更好的自动完成和重构支持</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📚 自文档化</h4>
                                <p>类型定义即文档，提高代码可读性</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔧 重构友好</h4>
                                <p>安全的重构操作，减少破坏性变更</p>
                            </div>
                        </div>
                        
                        <h3>项目配置</h3>
                        {codeData.projectSetup && (
                            <CodeHighlight
                                code={codeData.projectSetup.code}
                                language={codeData.projectSetup.language}
                                title={codeData.projectSetup.title}
                            />
                        )}
                    </div>
                </Card>
                
                {/* 组件类型定义 */}
                <Card title="🧩 组件类型定义" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 函数组件类型</h4>
                            {codeData.functionComponents && (
                                <CodeHighlight
                                    code={codeData.functionComponents.code}
                                    language={codeData.functionComponents.language}
                                    title={codeData.functionComponents.title}
                                />
                            )}
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Props类型进阶</h4>
                            {codeData.advancedProps && (
                                <CodeHighlight
                                    code={codeData.advancedProps.code}
                                    language={codeData.advancedProps.language}
                                    title={codeData.advancedProps.title}
                                />
                            )}
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 类组件类型</h4>
                            {codeData.classComponents && (
                                <CodeHighlight
                                    code={codeData.classComponents.code}
                                    language={codeData.classComponents.language}
                                    title={codeData.classComponents.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>
                
                {/* Hooks类型 */}
                <Card title="🎣 Hooks 类型定义" className={styles.content_card}>
                    <div className={styles.hooks_section}>
                        <h3>基础Hooks类型</h3>
                        {codeData.basicHooks && (
                            <CodeHighlight
                                code={codeData.basicHooks.code}
                                language={codeData.basicHooks.language}
                                title={codeData.basicHooks.title}
                            />
                        )}
                        
                        <h3>自定义Hooks类型</h3>
                        {codeData.customHooks && (
                            <CodeHighlight
                                code={codeData.customHooks.code}
                                language={codeData.customHooks.language}
                                title={codeData.customHooks.title}
                            />
                        )}
                    </div>
                </Card>
                
                {/* 事件处理类型 */}
                <Card title="🎯 事件处理类型" className={styles.content_card}>
                    <div className={styles.events_section}>
                        <h3>常用事件类型</h3>
                        {codeData.eventTypes && (
                            <CodeHighlight
                                code={codeData.eventTypes.code}
                                language={codeData.eventTypes.language}
                                title={codeData.eventTypes.title}
                            />
                        )}
                        
                        <h3>自定义事件类型</h3>
                        {codeData.customEvents && (
                            <CodeHighlight
                                code={codeData.customEvents.code}
                                language={codeData.customEvents.language}
                                title={codeData.customEvents.title}
                            />
                        )}
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ React TypeScript 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 组件设计</h4>
                                <p>设计类型安全的React组件</p>
                                <ul>
                                    <li>优先使用函数组件和Hooks</li>
                                    <li>明确定义Props接口</li>
                                    <li>使用泛型提高组件复用性</li>
                                    <li>合理使用React.FC类型</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 类型定义</h4>
                                <p>建立清晰的类型体系</p>
                                <ul>
                                    <li>分离类型定义文件</li>
                                    <li>使用联合类型和字面量类型</li>
                                    <li>避免使用any类型</li>
                                    <li>合理使用类型断言</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. Hooks使用</h4>
                                <p>类型安全的Hooks使用</p>
                                <ul>
                                    <li>明确useState的初始值类型</li>
                                    <li>正确类型化useRef</li>
                                    <li>为自定义Hooks定义返回类型</li>
                                    <li>使用useCallback和useMemo优化性能</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 开发工具</h4>
                                <p>充分利用TypeScript工具链</p>
                                <ul>
                                    <li>配置严格的TypeScript规则</li>
                                    <li>使用ESLint TypeScript规则</li>
                                    <li>集成类型检查到CI/CD</li>
                                    <li>使用React DevTools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ReactTypeScriptDetail
