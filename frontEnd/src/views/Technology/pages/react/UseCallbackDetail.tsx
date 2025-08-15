import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ThunderboltOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined,
    RocketOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const UseCallbackDetail: React.FC = () => {
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
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>useCallback 深度解析</h1>
                    <p>性能优化利器，避免不必要的重新渲染，提升React应用性能</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Hooks</Tag>
                        <Tag color="green">性能优化</Tag>
                        <Tag color="orange">缓存</Tag>
                        <Tag color="purple">记忆化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是useCallback？</h3>
                        <p>useCallback是React提供的一个Hook，用于缓存函数引用。它返回一个记忆化的回调函数，只有当依赖项发生变化时，才会重新创建函数。这对于优化子组件的性能非常有用。</p>
                        
                        <h3>基本语法</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const memoizedCallback = useCallback(
  () => {
    // 回调函数逻辑
    doSomething(a, b);
  },
  [a, b] // 依赖数组
);`}
                            </pre>
                        </div>
                        
                        <h3>工作原理</h3>
                        <p>useCallback会在依赖项不变的情况下返回相同的函数引用，避免子组件因为接收到新的函数引用而进行不必要的重新渲染。</p>
                    </div>
                </Card>
                
                {/* 使用场景 */}
                <Card title="🎯 核心使用场景" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 优化子组件渲染</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 父组件
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // 使用useCallback缓存函数
  const handleClick = useCallback(() => {
    console.log('按钮被点击');
  }, []); // 空依赖，函数永远不变
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <ChildComponent onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
};

// 子组件使用React.memo优化
const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent 重新渲染');
  return <button onClick={onClick}>子组件按钮</button>;
});`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 依赖于props的回调</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const SearchComponent = ({ searchTerm, onSearch }) => {
  // 当searchTerm变化时，重新创建搜索函数
  const handleSearch = useCallback(() => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  }, [searchTerm, onSearch]);
  
  return (
    <button onClick={handleSearch}>
      搜索 "{searchTerm}"
    </button>
  );
};`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 事件处理器优化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={useCallback(() => onToggle(todo.id), [todo.id, onToggle])}
          onDelete={useCallback(() => onDelete(todo.id), [todo.id, onDelete])}
        />
      ))}
    </div>
  );
};`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 常见陷阱 */}
                <Card title="⚠️ 常见陷阱与解决方案" className={styles.content_card}>
                    <Alert
                        message="重要提醒"
                        description="useCallback的使用需要谨慎，错误使用可能适得其反"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.traps_section}>
                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>陷阱1: 过度使用useCallback</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 错误示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 不必要的useCallback使用
const Component = () => {
  const [count, setCount] = useState(0);

  // 这里使用useCallback是多余的
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  // 直接传递给DOM元素，不需要缓存
  return <button onClick={handleClick}>Click</button>;
};`}
                                    </pre>
                                </div>

                                <p className={styles.solution}>✅ 正确做法：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 只在传递给子组件时才使用useCallback
const Component = () => {
  const [count, setCount] = useState(0);

  // 直接定义函数，传递给DOM元素
  const handleClick = () => {
    console.log('clicked');
  };

  return <button onClick={handleClick}>Click</button>;
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>陷阱2: 依赖项不完整</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 错误示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const Component = ({ userId, onUpdate }) => {
  const [data, setData] = useState(null);

  // 缺少onUpdate依赖
  const handleUpdate = useCallback(() => {
    onUpdate(userId, data);
  }, [userId, data]); // 缺少onUpdate

  return <button onClick={handleUpdate}>更新</button>;
};`}
                                    </pre>
                                </div>

                                <p className={styles.solution}>✅ 正确示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const Component = ({ userId, onUpdate }) => {
  const [data, setData] = useState(null);

  // 包含所有依赖项
  const handleUpdate = useCallback(() => {
    onUpdate(userId, data);
  }, [userId, data, onUpdate]);

  return <button onClick={handleUpdate}>更新</button>;
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 配合React.memo使用</h4>
                                <p>useCallback最大的价值在于配合React.memo使用，避免子组件不必要的重新渲染</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 使用ESLint规则</h4>
                                <p>启用exhaustive-deps规则，确保依赖项的完整性</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 避免在循环中使用</h4>
                                <p>不要在map等循环中直接使用useCallback，考虑将逻辑提取到子组件中</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 性能测量</h4>
                                <p>使用React DevTools Profiler测量实际的性能提升效果</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 进阶技巧 */}
                <Card title="🚀 进阶技巧" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. 与useRef结合使用</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const Component = ({ onSave }) => {
  const [data, setData] = useState('');
  const onSaveRef = useRef(onSave);

  // 使用ref避免onSave变化导致的重新创建
  useEffect(() => {
    onSaveRef.current = onSave;
  });

  const handleSave = useCallback(() => {
    onSaveRef.current(data);
  }, [data]);

  return <ChildComponent onSave={handleSave} />;
};`}
                            </pre>
                        </div>

                        <h3>2. 自定义Hook中的应用</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const useDebounce = (callback, delay) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args) => {
    const timer = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);
};`}
                            </pre>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UseCallbackDetail
