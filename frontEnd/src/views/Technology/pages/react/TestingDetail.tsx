import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    BugOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    RocketOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const TestingDetail: React.FC = () => {
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
                    <BugOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>React Testing 深度解析</h1>
                    <p>React组件测试最佳实践，构建可靠的测试体系</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Testing</Tag>
                        <Tag color="green">Jest</Tag>
                        <Tag color="orange">Testing Library</Tag>
                        <Tag color="purple">最佳实践</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 测试基础 */}
                <Card title="📚 React测试基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>测试金字塔</h3>
                        <p>React应用的测试应该遵循测试金字塔原则：</p>
                        <ul>
                            <li><strong>单元测试（Unit Tests）</strong> - 测试单个组件或函数</li>
                            <li><strong>集成测试（Integration Tests）</strong> - 测试组件间的交互</li>
                            <li><strong>端到端测试（E2E Tests）</strong> - 测试完整的用户流程</li>
                        </ul>
                        
                        <h3>核心测试工具</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装测试依赖
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event

// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/reportWebVitals.js'
  ]
};

// src/setupTests.js
import '@testing-library/jest-dom';`}
                            </pre>
                        </div>
                        
                        <h3>基本测试结构</h3>
                        <div className={styles.code_block}>
                            <pre>
{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  test('应该渲染正确的内容', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 组件测试示例 */}
                <Card title="🎯 组件测试实战示例" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基础组件测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Button.jsx
const Button = ({ children, onClick, disabled, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
      data-testid="custom-button"
    >
      {children}
    </button>
  );
};

// Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button组件', () => {
  test('应该渲染按钮文本', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument();
  });

  test('应该处理点击事件', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>点击我</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('禁用状态下不应该触发点击', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick} disabled>点击我</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('应该应用正确的CSS类', () => {
    render(<Button variant="secondary">按钮</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn', 'btn-secondary');
  });
});`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 表单组件测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// LoginForm.jsx
const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.username) newErrors.username = '用户名不能为空';
    if (!formData.password) newErrors.password = '密码不能为空';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
        />
        {errors.username && <span role="alert">{errors.username}</span>}
      </div>
      
      <div>
        <label htmlFor="password">密码</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        />
        {errors.password && <span role="alert">{errors.password}</span>}
      </div>
      
      <button type="submit">登录</button>
    </form>
  );
};

// LoginForm.test.jsx
describe('LoginForm组件', () => {
  test('应该显示验证错误', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // 直接提交空表单
    await user.click(screen.getByRole('button', { name: '登录' }));
    
    expect(screen.getByText('用户名不能为空')).toBeInTheDocument();
    expect(screen.getByText('密码不能为空')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('应该成功提交有效表单', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // 填写表单
    await user.type(screen.getByLabelText('用户名'), 'testuser');
    await user.type(screen.getByLabelText('密码'), 'password123');
    
    // 提交表单
    await user.click(screen.getByRole('button', { name: '登录' }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123'
    });
  });
});`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 异步组件测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// UserProfile.jsx
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('获取用户信息失败');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!user) return <div>用户不存在</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

// UserProfile.test.jsx
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// 模拟API服务器
const server = setupServer(
  rest.get('/api/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    
    if (userId === '1') {
      return res(ctx.json({
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com'
      }));
    }
    
    return res(ctx.status(404));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile组件', () => {
  test('应该显示加载状态然后显示用户信息', async () => {
    render(<UserProfile userId="1" />);
    
    // 检查加载状态
    expect(screen.getByText('加载中...')).toBeInTheDocument();
    
    // 等待用户信息加载完成
    await waitFor(() => {
      expect(screen.getByText('张三')).toBeInTheDocument();
    });
    
    expect(screen.getByText('zhangsan@example.com')).toBeInTheDocument();
    expect(screen.queryByText('加载中...')).not.toBeInTheDocument();
  });

  test('应该处理API错误', async () => {
    render(<UserProfile userId="999" />);
    
    await waitFor(() => {
      expect(screen.getByText(/错误:/)).toBeInTheDocument();
    });
  });
});`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Hook测试 */}
                <Card title="🪝 Custom Hook测试" className={styles.content_card}>
                    <div className={styles.hook_testing_section}>
                        <h3>测试自定义Hook</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// useCounter.js
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
};

// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter Hook', () => {
  test('应该初始化为默认值', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('应该初始化为指定值', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test('应该能够递增', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('应该能够递减', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  test('应该能够重置', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(12);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 测试最佳实践 */}
                <Card title="✅ 测试最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 测试用户行为而非实现细节</h4>
                                <p>关注用户如何与组件交互，而不是组件内部的实现</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// ❌ 测试实现细节
test('应该调用setState', () => {
  const component = shallow(<Counter />);
  component.find('button').simulate('click');
  expect(component.state('count')).toBe(1);
});

// ✅ 测试用户行为
test('点击按钮应该增加计数', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole('button', { name: /增加/i });
  await user.click(button);

  expect(screen.getByText('计数: 1')).toBeInTheDocument();
});`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 使用语义化查询</h4>
                                <p>优先使用更接近用户体验的查询方法</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 查询优先级（从高到低）
// 1. 可访问性查询
screen.getByRole('button', { name: /提交/i })
screen.getByLabelText(/用户名/i)

// 2. 语义化查询
screen.getByText(/欢迎/i)
screen.getByDisplayValue(/输入值/i)

// 3. 测试ID查询（最后选择）
screen.getByTestId('submit-button')

// ❌ 避免使用
screen.getByClassName('btn-primary')
container.querySelector('.submit-btn')`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 模拟外部依赖</h4>
                                <p>合理模拟API调用、第三方库等外部依赖</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 模拟API调用
jest.mock('../api/userApi', () => ({
  fetchUser: jest.fn(),
  updateUser: jest.fn()
}));

// 模拟React Router
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// 模拟localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 测试覆盖率</h4>
                                <p>追求有意义的测试覆盖率，而不是100%覆盖率</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// package.json
{
  "scripts": {
    "test": "react-scripts test",
    "test:coverage": "react-scripts test --coverage --watchAll=false",
    "test:ci": "CI=true react-scripts test --coverage --watchAll=false"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/index.js",
      "!src/reportWebVitals.js",
      "!src/**/*.stories.{js,jsx,ts,tsx}"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 高级测试技巧 */}
                <Card title="🚀 高级测试技巧" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. 测试Context Provider</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 创建测试工具函数
const renderWithProviders = (ui, options = {}) => {
  const {
    initialState = {},
    store = createStore(initialState),
    ...renderOptions
  } = options;

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          {children}
        </Router>
      </ThemeProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// 使用自定义渲染函数
test('应该显示用户信息', () => {
  const initialState = {
    user: { name: '张三', email: 'zhangsan@example.com' }
  };

  renderWithProviders(<UserProfile />, { initialState });

  expect(screen.getByText('张三')).toBeInTheDocument();
});`}
                            </pre>
                        </div>

                        <h3>2. 快照测试</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 组件快照测试
test('Button组件快照', () => {
  const { container } = render(
    <Button variant="primary" size="large">
      点击我
    </Button>
  );

  expect(container.firstChild).toMatchSnapshot();
});

// 更新快照: npm test -- --updateSnapshot`}
                            </pre>
                        </div>

                        <h3>3. 性能测试</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 测试组件渲染性能
test('大列表渲染性能', () => {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: \`Item \${i}\`
  }));

  const start = performance.now();
  render(<ItemList items={items} />);
  const end = performance.now();

  // 渲染时间应该小于100ms
  expect(end - start).toBeLessThan(100);
});`}
                            </pre>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TestingDetail
