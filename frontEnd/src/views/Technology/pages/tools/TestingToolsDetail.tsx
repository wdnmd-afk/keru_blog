import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ExperimentOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const TestingToolsDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/tools')
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
                    返回开发工具技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ExperimentOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>测试工具详解</h1>
                    <p>掌握前端测试工具链的选择与使用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">测试工具</Tag>
                        <Tag color="green">自动化测试</Tag>
                        <Tag color="orange">测试框架</Tag>
                        <Tag color="purple">质量保证</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 测试工具概述 */}
                <Card title="🧪 测试工具生态" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>前端测试工具分类</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔬 单元测试</h4>
                                <p>Jest, Vitest, Mocha</p>
                                <ul>
                                    <li>测试独立函数和组件</li>
                                    <li>快速执行和反馈</li>
                                    <li>高覆盖率要求</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🎭 E2E测试</h4>
                                <p>Playwright, Cypress, Puppeteer</p>
                                <ul>
                                    <li>模拟真实用户操作</li>
                                    <li>端到端流程验证</li>
                                    <li>跨浏览器兼容性</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📊 测试工具</h4>
                                <p>Testing Library, Enzyme</p>
                                <ul>
                                    <li>组件渲染和交互</li>
                                    <li>DOM查询和断言</li>
                                    <li>用户行为模拟</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🎯 视觉测试</h4>
                                <p>Storybook, Chromatic</p>
                                <ul>
                                    <li>UI组件展示</li>
                                    <li>视觉回归测试</li>
                                    <li>设计系统验证</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Jest测试框架 */}
                <Card title="🃏 Jest 测试框架" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Jest配置与使用</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装Jest
npm install --save-dev jest @types/jest

// jest.config.js
module.exports = {
  // 测试环境
  testEnvironment: 'jsdom',
  
  // 测试文件匹配模式
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  
  // 模块路径映射
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // 设置文件
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // 覆盖率配置
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts'
  ],
  
  // 覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // 转换配置
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  
  // 模拟文件
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  
  // 清理模拟
  clearMocks: true,
  restoreMocks: true
}

// package.json脚本
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 基础测试示例</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// src/utils/math.js
export const add = (a, b) => a + b
export const multiply = (a, b) => a * b
export const divide = (a, b) => {
  if (b === 0) throw new Error('除数不能为零')
  return a / b
}

// src/utils/__tests__/math.test.js
import { add, multiply, divide } from '../math'

describe('数学工具函数', () => {
  describe('add函数', () => {
    test('应该正确计算两个正数的和', () => {
      expect(add(2, 3)).toBe(5)
    })
    
    test('应该正确处理负数', () => {
      expect(add(-1, 1)).toBe(0)
      expect(add(-2, -3)).toBe(-5)
    })
    
    test('应该正确处理小数', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3)
    })
  })
  
  describe('multiply函数', () => {
    test('应该正确计算乘法', () => {
      expect(multiply(3, 4)).toBe(12)
      expect(multiply(-2, 3)).toBe(-6)
      expect(multiply(0, 5)).toBe(0)
    })
  })
  
  describe('divide函数', () => {
    test('应该正确计算除法', () => {
      expect(divide(10, 2)).toBe(5)
      expect(divide(7, 2)).toBe(3.5)
    })
    
    test('应该在除数为零时抛出错误', () => {
      expect(() => divide(10, 0)).toThrow('除数不能为零')
    })
  })
})

// 异步函数测试
// src/api/user.js
export const fetchUser = async (id) => {
  const response = await fetch(\`/api/users/\${id}\`)
  if (!response.ok) {
    throw new Error('用户不存在')
  }
  return response.json()
}

// src/api/__tests__/user.test.js
import { fetchUser } from '../user'

// 模拟fetch
global.fetch = jest.fn()

describe('用户API', () => {
  beforeEach(() => {
    fetch.mockClear()
  })
  
  test('应该成功获取用户信息', async () => {
    const mockUser = { id: 1, name: '张三' }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    })
    
    const user = await fetchUser(1)
    
    expect(fetch).toHaveBeenCalledWith('/api/users/1')
    expect(user).toEqual(mockUser)
  })
  
  test('应该在用户不存在时抛出错误', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    })
    
    await expect(fetchUser(999)).rejects.toThrow('用户不存在')
  })
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. React组件测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装React测试工具
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

// src/setupTests.js
import '@testing-library/jest-dom'

// src/components/Button.jsx
import React from 'react'

const Button = ({ children, onClick, disabled = false, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
      data-testid="custom-button"
    >
      {children}
    </button>
  )
}

export default Button

// src/components/__tests__/Button.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button组件', () => {
  test('应该渲染按钮文本', () => {
    render(<Button>点击我</Button>)
    
    expect(screen.getByText('点击我')).toBeInTheDocument()
    expect(screen.getByTestId('custom-button')).toBeInTheDocument()
  })
  
  test('应该响应点击事件', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>点击我</Button>)
    
    await user.click(screen.getByText('点击我'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  test('应该在禁用状态下不响应点击', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick} disabled>点击我</Button>)
    
    const button = screen.getByText('点击我')
    expect(button).toBeDisabled()
    
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
  
  test('应该应用正确的CSS类', () => {
    const { rerender } = render(<Button variant="secondary">按钮</Button>)
    
    expect(screen.getByTestId('custom-button')).toHaveClass('btn', 'btn-secondary')
    
    rerender(<Button variant="danger">按钮</Button>)
    expect(screen.getByTestId('custom-button')).toHaveClass('btn', 'btn-danger')
  })
  
  // 快照测试
  test('应该匹配快照', () => {
    const { container } = render(<Button>快照测试</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })
})`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Playwright E2E测试 */}
                <Card title="🎭 Playwright E2E测试" className={styles.content_card}>
                    <div className={styles.playwright_section}>
                        <h3>Playwright配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Playwright
npm install --save-dev @playwright/test
npx playwright install

// playwright.config.js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
})

// package.json脚本
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>E2E测试示例</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// e2e/login.spec.js
import { test, expect } from '@playwright/test'

test.describe('用户登录流程', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  
  test('应该成功登录', async ({ page }) => {
    // 点击登录按钮
    await page.click('text=登录')
    
    // 填写登录表单
    await page.fill('[data-testid=email-input]', 'test@example.com')
    await page.fill('[data-testid=password-input]', 'password123')
    
    // 提交表单
    await page.click('[data-testid=login-submit]')
    
    // 验证登录成功
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('text=欢迎回来')).toBeVisible()
  })
  
  test('应该显示错误信息当凭据无效时', async ({ page }) => {
    await page.click('text=登录')
    
    await page.fill('[data-testid=email-input]', 'wrong@example.com')
    await page.fill('[data-testid=password-input]', 'wrongpassword')
    
    await page.click('[data-testid=login-submit]')
    
    await expect(page.locator('text=邮箱或密码错误')).toBeVisible()
    await expect(page).toHaveURL('/login')
  })
  
  test('应该验证表单字段', async ({ page }) => {
    await page.click('text=登录')
    
    // 尝试提交空表单
    await page.click('[data-testid=login-submit]')
    
    await expect(page.locator('text=请输入邮箱')).toBeVisible()
    await expect(page.locator('text=请输入密码')).toBeVisible()
  })
})

// e2e/shopping-cart.spec.js
test.describe('购物车功能', () => {
  test('应该能够添加商品到购物车', async ({ page }) => {
    await page.goto('/products')
    
    // 选择第一个商品
    await page.click('.product-card:first-child .add-to-cart')
    
    // 验证购物车图标显示数量
    await expect(page.locator('.cart-icon .badge')).toHaveText('1')
    
    // 打开购物车
    await page.click('.cart-icon')
    
    // 验证商品在购物车中
    await expect(page.locator('.cart-item')).toHaveCount(1)
  })
  
  test('应该能够修改商品数量', async ({ page }) => {
    // 先添加商品到购物车
    await page.goto('/products')
    await page.click('.product-card:first-child .add-to-cart')
    
    // 打开购物车
    await page.click('.cart-icon')
    
    // 增加数量
    await page.click('.quantity-increase')
    await expect(page.locator('.quantity-input')).toHaveValue('2')
    
    // 减少数量
    await page.click('.quantity-decrease')
    await expect(page.locator('.quantity-input')).toHaveValue('1')
  })
})

// 页面对象模式
// e2e/pages/LoginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page
    this.emailInput = page.locator('[data-testid=email-input]')
    this.passwordInput = page.locator('[data-testid=password-input]')
    this.submitButton = page.locator('[data-testid=login-submit]')
    this.errorMessage = page.locator('.error-message')
  }
  
  async goto() {
    await this.page.goto('/login')
  }
  
  async login(email, password) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
  
  async getErrorMessage() {
    return await this.errorMessage.textContent()
  }
}

// 使用页面对象
import { LoginPage } from './pages/LoginPage'

test('使用页面对象模式登录', async ({ page }) => {
  const loginPage = new LoginPage(page)
  
  await loginPage.goto()
  await loginPage.login('test@example.com', 'password123')
  
  await expect(page).toHaveURL('/dashboard')
})`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Storybook组件测试 */}
                <Card title="📚 Storybook 组件测试" className={styles.content_card}>
                    <div className={styles.storybook_section}>
                        <h3>Storybook配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Storybook
npx storybook@latest init

// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  features: {
    interactionsDebugger: true
  }
}

// .storybook/preview.js
import '../src/index.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: { width: '375px', height: '667px' }
      },
      tablet: {
        name: 'Tablet',
        styles: { width: '768px', height: '1024px' }
      },
      desktop: {
        name: 'Desktop',
        styles: { width: '1200px', height: '800px' }
      }
    }
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>Story编写</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// src/components/Button.stories.jsx
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    onClick: { action: 'clicked' }
  }
}

// 基础故事
export const Primary = {
  args: {
    variant: 'primary',
    children: '主要按钮'
  }
}

export const Secondary = {
  args: {
    variant: 'secondary',
    children: '次要按钮'
  }
}

export const Danger = {
  args: {
    variant: 'danger',
    children: '危险按钮'
  }
}

export const Disabled = {
  args: {
    disabled: true,
    children: '禁用按钮'
  }
}

// 交互测试
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export const WithInteraction = {
  args: {
    children: '点击测试'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    await userEvent.click(button)
    await expect(button).toHaveFocus()
  }
}

// 复杂组件故事
// src/components/UserCard.stories.jsx
export default {
  title: 'Components/UserCard',
  component: UserCard
}

const Template = (args) => <UserCard {...args} />

export const Default = Template.bind({})
Default.args = {
  user: {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://example.com/avatar.jpg'
  }
}

export const WithoutAvatar = Template.bind({})
WithoutAvatar.args = {
  user: {
    id: 2,
    name: '李四',
    email: 'lisi@example.com'
  }
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 测试工具最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 测试策略</h4>
                                <p>制定合理的测试策略</p>
                                <ul>
                                    <li>遵循测试金字塔原则</li>
                                    <li>优先测试核心业务逻辑</li>
                                    <li>平衡测试覆盖率和维护成本</li>
                                    <li>选择合适的测试工具</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 测试编写</h4>
                                <p>编写高质量的测试代码</p>
                                <ul>
                                    <li>使用描述性的测试名称</li>
                                    <li>保持测试的独立性</li>
                                    <li>遵循AAA模式</li>
                                    <li>合理使用Mock和Stub</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 自动化集成</h4>
                                <p>集成到开发工作流</p>
                                <ul>
                                    <li>配置CI/CD自动测试</li>
                                    <li>设置测试覆盖率门槛</li>
                                    <li>实施测试驱动开发</li>
                                    <li>定期维护测试套件</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 性能监控</h4>
                                <p>监控测试性能</p>
                                <ul>
                                    <li>优化测试执行速度</li>
                                    <li>并行执行测试</li>
                                    <li>监控测试稳定性</li>
                                    <li>分析测试报告</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TestingToolsDetail
