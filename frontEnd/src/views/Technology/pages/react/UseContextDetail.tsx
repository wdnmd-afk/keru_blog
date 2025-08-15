import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ApiOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined,
    RocketOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const UseContextDetail: React.FC = () => {
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
                    <ApiOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>useContext 深度解析</h1>
                    <p>跨组件状态共享的最佳实践，避免props drilling问题</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Hooks</Tag>
                        <Tag color="green">状态管理</Tag>
                        <Tag color="orange">Context API</Tag>
                        <Tag color="purple">跨组件通信</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是useContext？</h3>
                        <p>useContext是React提供的一个Hook，用于在函数组件中消费Context。它可以让你在组件树中跨层级传递数据，避免通过props逐层传递的问题（props drilling）。</p>
                        
                        <h3>基本语法</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 1. 创建Context
const MyContext = React.createContext(defaultValue);

// 2. 提供Context值
<MyContext.Provider value={someValue}>
  <ChildComponent />
</MyContext.Provider>

// 3. 消费Context值
const value = useContext(MyContext);`}
                            </pre>
                        </div>
                        
                        <h3>工作原理</h3>
                        <p>useContext会查找组件树中最近的Provider，并返回其value。当Provider的value发生变化时，所有使用该Context的组件都会重新渲染。</p>
                    </div>
                </Card>
                
                {/* 使用场景 */}
                <Card title="🎯 核心使用场景" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 主题切换</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 创建主题Context
const ThemeContext = createContext('light');

// 主题Provider组件
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主题的组件
const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      className={\`btn btn-\${theme}\`}
      onClick={toggleTheme}
    >
      切换到{theme === 'light' ? '暗色' : '亮色'}主题
    </button>
  );
};`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 用户认证状态</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 认证Context
const AuthContext = createContext(null);

// 认证Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const login = async (credentials) => {
    setLoading(true);
    try {
      const userData = await authAPI.login(credentials);
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    authAPI.logout();
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 使用认证状态的组件
const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  
  if (!user) return <div>请先登录</div>;
  
  return (
    <div>
      <h2>欢迎, {user.name}</h2>
      <button onClick={logout}>退出登录</button>
    </div>
  );
};`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 多语言国际化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 国际化Context
const I18nContext = createContext('zh-CN');

// 国际化Provider
const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState('zh-CN');
  const [messages, setMessages] = useState({});
  
  useEffect(() => {
    // 加载对应语言的翻译文件
    import(\`../locales/\${locale}.json\`)
      .then(module => setMessages(module.default));
  }, [locale]);
  
  const t = (key) => messages[key] || key;
  
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// 使用国际化的组件
const WelcomeMessage = () => {
  const { t, locale, setLocale } = useContext(I18nContext);
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        <option value="zh-CN">中文</option>
        <option value="en-US">English</option>
      </select>
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
                        description="useContext使用不当可能导致性能问题和组件过度耦合"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.traps_section}>
                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>陷阱1: Context值频繁变化导致性能问题</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 错误示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 每次渲染都创建新对象，导致所有消费者重新渲染
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{
      user, setUser, theme, setTheme  // 每次都是新对象
    }}>
      {children}
    </AppContext.Provider>
  );
};`}
                                    </pre>
                                </div>

                                <p className={styles.solution}>✅ 正确示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 使用useMemo缓存Context值
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  const contextValue = useMemo(() => ({
    user, setUser, theme, setTheme
  }), [user, theme]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>陷阱2: 过度使用Context</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 错误示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 将所有状态都放在一个Context中
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  // ... 更多状态

  return (
    <AppContext.Provider value={{
      user, setUser, theme, setTheme,
      cart, setCart, notifications, setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};`}
                                    </pre>
                                </div>

                                <p className={styles.solution}>✅ 正确示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 按功能拆分Context
const UserContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();

// 组合多个Provider
const AppProviders = ({ children }) => (
  <UserProvider>
    <ThemeProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  </UserProvider>
);`}
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
                                <h4>1. 创建自定义Hook</h4>
                                <p>为每个Context创建专门的Hook，提供更好的开发体验和错误处理</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 拆分Context</h4>
                                <p>按功能拆分Context，避免不相关的组件因为无关状态变化而重新渲染</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 提供默认值</h4>
                                <p>为Context提供合理的默认值，并在自定义Hook中进行错误检查</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 优化性能</h4>
                                <p>使用useMemo缓存Context值，避免不必要的重新渲染</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 进阶技巧 */}
                <Card title="🚀 进阶技巧" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. 自定义Hook封装</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 创建自定义Hook
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }

  return context;
};

// 使用自定义Hook
const UserProfile = () => {
  const { user, logout } = useAuth(); // 更简洁，有错误检查

  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={logout}>退出</button>
    </div>
  );
};`}
                            </pre>
                        </div>

                        <h3>2. Context组合模式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 状态和操作分离
const StateContext = createContext();
const DispatchContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <StateContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

// 分别消费状态和操作
const useTodos = () => useContext(StateContext);
const useTodoDispatch = () => useContext(DispatchContext);`}
                            </pre>
                        </div>

                        <h3>3. 条件性Provider</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const ConditionalProvider = ({ condition, children }) => {
  if (condition) {
    return (
      <SpecialContext.Provider value={specialValue}>
        {children}
      </SpecialContext.Provider>
    );
  }

  return children;
};`}
                            </pre>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UseContextDetail
