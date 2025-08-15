import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    ToolOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined,
    RocketOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const CustomHooksDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/technology/react')
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
                        <p>自定义Hook是一个JavaScript函数，其名称以"use"开头，可以调用其他Hook。它是React提供的一种机制，用于在组件之间共享状态逻辑，而不需要改变组件层次结构。</p>

                        <h3>基本规则</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 1. 函数名必须以"use"开头
// 2. 可以调用其他Hook
// 3. 遵循Hook的使用规则

const useCustomHook = (initialValue) => {
  const [state, setState] = useState(initialValue);
  
  const updateState = useCallback((newValue) => {
    setState(newValue);
  }, []);
  
  return { state, updateState };
};`}
                            </pre>
                        </div>

                        <h3>核心优势</h3>
                        <ul>
                            <li><strong>逻辑复用</strong>：在多个组件间共享状态逻辑</li>
                            <li><strong>关注点分离</strong>：将复杂逻辑从组件中抽离</li>
                            <li><strong>易于测试</strong>：可以独立测试Hook逻辑</li>
                            <li><strong>组合性</strong>：可以组合多个Hook创建更复杂的逻辑</li>
                        </ul>
                    </div>
                </Card>

                {/* 实用示例 */}
                <Card title="🎯 实用Custom Hooks示例" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. useLocalStorage - 本地存储Hook</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const useLocalStorage = (key, initialValue) => {
  // 获取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });
  
  // 设置值的函数
  const setValue = useCallback((value) => {
    try {
      // 允许传入函数来更新状态
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
};

// 使用示例
const UserSettings = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'zh-CN');
  
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题: {theme}
      </button>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="zh-CN">中文</option>
        <option value="en-US">English</option>
      </select>
    </div>
  );
};`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. useFetch - 数据获取Hook</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch };
};

// 使用示例
const UserList = () => {
  const { data: users, loading, error, refetch } = useFetch('/api/users');
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  
  return (
    <div>
      <button onClick={refetch}>刷新</button>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. useDebounce - 防抖Hook</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// 使用示例
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // 执行搜索
      console.log('搜索:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="输入搜索关键词..."
    />
  );
};`}
                                </pre>
                            </div>
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
                                <div className={styles.code_block}>
                                    <pre>
{`// ✅ 好的设计 - 单一职责
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  return { count, increment, decrement, reset };
};

// ❌ 不好的设计 - 职责过多
const useEverything = () => {
  // 计数器逻辑
  const [count, setCount] = useState(0);
  // 用户信息逻辑
  const [user, setUser] = useState(null);
  // 主题逻辑
  const [theme, setTheme] = useState('light');
  // ... 太多不相关的逻辑
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 返回对象而非数组</h4>
                                <p>对于复杂的返回值，使用对象可以提供更好的可读性和灵活性</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// ✅ 推荐 - 返回对象
const useApi = (url) => {
  return { data, loading, error, refetch };
};

// 使用时可以选择性解构
const { data, loading } = useApi('/api/users');

// ❌ 不推荐 - 返回数组（对于复杂情况）
const useApi = (url) => {
  return [data, loading, error, refetch];
};

// 使用时必须按顺序，不够灵活
const [data, loading, , refetch] = useApi('/api/users');`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 提供清理机制</h4>
                                <p>确保自定义Hook能够正确清理副作用，避免内存泄漏</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const useInterval = (callback, delay) => {
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
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 高级模式 */}
                <Card title="🚀 高级设计模式" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. Hook组合模式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 基础Hook
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
};

// 组合Hook
const useModal = () => {
  const [isOpen, toggleOpen] = useToggle(false);

  const openModal = useCallback(() => {
    if (!isOpen) toggleOpen();
  }, [isOpen, toggleOpen]);

  const closeModal = useCallback(() => {
    if (isOpen) toggleOpen();
  }, [isOpen, toggleOpen]);

  return { isOpen, openModal, closeModal };
};`}
                            </pre>
                        </div>

                        <h3>2. 状态机模式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const useAsyncState = () => {
  const [state, setState] = useState({
    status: 'idle', // idle | loading | success | error
    data: null,
    error: null
  });

  const execute = useCallback(async (asyncFunction) => {
    setState({ status: 'loading', data: null, error: null });

    try {
      const data = await asyncFunction();
      setState({ status: 'success', data, error: null });
    } catch (error) {
      setState({ status: 'error', data: null, error });
    }
  }, []);

  return { ...state, execute };
};`}
                            </pre>
                        </div>

                        <h3>3. 工厂模式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Hook工厂函数
const createUseStorage = (storage) => {
  return (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch {
        return initialValue;
      }
    });

    const setValue = useCallback((value) => {
      try {
        setStoredValue(value);
        storage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Storage error:', error);
      }
    }, [key]);

    return [storedValue, setValue];
  };
};

// 创建不同的存储Hook
const useLocalStorage = createUseStorage(localStorage);
const useSessionStorage = createUseStorage(sessionStorage);`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 测试策略 */}
                <Card title="🧪 测试策略" className={styles.content_card}>
                    <div className={styles.testing_section}>
                        <h3>使用@testing-library/react-hooks测试</h3>
                        <div className={styles.code_block}>
                            <pre>
{`import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('应该初始化为默认值', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('应该能够递增', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('应该能够重置', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });
});`}
                            </pre>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CustomHooksDetail
