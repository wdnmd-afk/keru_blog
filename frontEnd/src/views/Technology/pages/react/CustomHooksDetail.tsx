import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, CheckCircleOutlined, ToolOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Spin, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomHooksDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('React', 'customHooks')

    const handleBack = () => {
        navigate('/technology/react')
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
                    返回React技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ToolOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Custom Hooks 深度解析</h1>
                    <p>自定义Hook的设计模式与实现，提升代码复用性和可维护性</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Hooks</Tag>
                        <Tag color="green">代码复用</Tag>
                        <Tag color="orange">设计模式</Tag>
                        <Tag color="purple">最佳实践</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Custom Hooks？</h3>
                        <p>
                            自定义Hook是一个JavaScript函数，其名称以"use"开头，可以调用其他Hook。它是React提供的一种机制，用于在组件之间共享状态逻辑，而不需要改变组件层次结构。
                        </p>

                        <h3>基本规则</h3>
                        {codeData.basicRules && (
                            <CodeHighlight
                                code={codeData.basicRules.code}
                                language={codeData.basicRules.language}
                                title={codeData.basicRules.title}
                            />
                        )}

                        <h3>核心优势</h3>
                        <ul>
                            <li>
                                <strong>逻辑复用</strong>：在多个组件间共享状态逻辑
                            </li>
                            <li>
                                <strong>关注点分离</strong>：将复杂逻辑从组件中抽离
                            </li>
                            <li>
                                <strong>易于测试</strong>：可以独立测试Hook逻辑
                            </li>
                            <li>
                                <strong>组合性</strong>：可以组合多个Hook创建更复杂的逻辑
                            </li>
                        </ul>
                    </div>
                </Card>

                {/* 实用示例 */}
                <Card title="🎯 实用Custom Hooks示例" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. useLocalStorage - 本地存储Hook</h4>
                            {codeData.useLocalStorage && (
                                <CodeHighlight
                                    code={codeData.useLocalStorage.code}
                                    language={codeData.useLocalStorage.language}
                                    title={codeData.useLocalStorage.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. useFetch - 数据获取Hook</h4>
                            {codeData.useFetch && (
                                <CodeHighlight
                                    code={codeData.useFetch.code}
                                    language={codeData.useFetch.language}
                                    title={codeData.useFetch.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. useDebounce - 防抖Hook</h4>
                            {codeData.useDebounce && (
                                <CodeHighlight
                                    code={codeData.useDebounce.code}
                                    language={codeData.useDebounce.language}
                                    title={codeData.useDebounce.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>4. useToggle - 切换状态Hook</h4>
                            {codeData.useToggle && (
                                <CodeHighlight
                                    code={codeData.useToggle.code}
                                    language={codeData.useToggle.language}
                                    title={codeData.useToggle.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>5. useCounter - 计数器Hook</h4>
                            {codeData.useCounter && (
                                <CodeHighlight
                                    code={codeData.useCounter.code}
                                    language={codeData.useCounter.language}
                                    title={codeData.useCounter.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>6. useArray - 数组操作Hook</h4>
                            {codeData.useArray && (
                                <CodeHighlight
                                    code={codeData.useArray.code}
                                    language={codeData.useArray.language}
                                    title={codeData.useArray.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 设计原则 */}
                <Card title="🎨 设计原则与最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 单一职责原则</h4>
                                <p>每个自定义Hook应该只负责一个特定的功能，保持简单和专注</p>
                                <CodeHighlight
                                    code={`// ✅ 好的设计 - 单一职责
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  return { count, increment, decrement, reset };
};

// ❌ 不好的设计 - 职责过多
const useBadHook = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // 混合了计数器、用户管理、主题管理等多个职责
  return { count, setCount, user, setUser, theme, setTheme };
};`}
                                    language="javascript"
                                    title="单一职责原则示例"
                                />
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 返回对象而非数组</h4>
                                <p>对于复杂的返回值，使用对象可以提供更好的可读性和灵活性</p>
                                <CodeHighlight
                                    code={`// ✅ 推荐 - 返回对象
const useApi = (url) => {
  return { data, loading, error, refetch };
};

// 使用时可以选择性解构
const { data, loading } = useApi('/api/users');

// ❌ 不推荐 - 返回数组（对于复杂情况）
const useBadApi = (url) => {
  return [data, loading, error, refetch];
};

// 使用时必须按顺序解构，不够灵活
const [data, , , refetch] = useBadApi('/api/users');`}
                                    language="javascript"
                                    title="返回对象 vs 返回数组"
                                />
                            </div>
                        </div>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 提供清理机制</h4>
                                <p>确保自定义Hook能够正确清理副作用，避免内存泄漏</p>
                                <CodeHighlight
                                    code={`const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id); // 清理定时器
    }
  }, [delay]);
};`}
                                    language="javascript"
                                    title="提供清理机制示例"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CustomHooksDetail
