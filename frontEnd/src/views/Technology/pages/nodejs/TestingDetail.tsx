import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    BugOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    ExperimentOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const TestingDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/nodejs')
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
                    返回Node.js技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ExperimentOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Node.js 测试策略详解</h1>
                    <p>掌握Node.js应用的全面测试策略与实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">单元测试</Tag>
                        <Tag color="green">集成测试</Tag>
                        <Tag color="orange">E2E测试</Tag>
                        <Tag color="purple">测试覆盖率</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 测试金字塔 */}
                <Card title="🔺 测试金字塔" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>测试层级结构</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🧪 单元测试 (70%)</h4>
                                <p>测试单个函数或模块的功能</p>
                                <ul>
                                    <li>快速执行</li>
                                    <li>易于维护</li>
                                    <li>精确定位问题</li>
                                    <li>成本最低</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔗 集成测试 (20%)</h4>
                                <p>测试模块间的交互和集成</p>
                                <ul>
                                    <li>验证接口契约</li>
                                    <li>测试数据流</li>
                                    <li>发现集成问题</li>
                                    <li>中等成本</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🎭 端到端测试 (10%)</h4>
                                <p>测试完整的用户场景</p>
                                <ul>
                                    <li>模拟真实用户</li>
                                    <li>验证业务流程</li>
                                    <li>发现系统问题</li>
                                    <li>成本最高</li>
                                </ul>
                            </div>
                        </div>
                        
                        <Alert
                            message="测试策略建议"
                            description="遵循测试金字塔原则：大量单元测试作为基础，适量集成测试验证交互，少量E2E测试覆盖关键路径。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>
                
                {/* Jest单元测试 */}
                <Card title="🧪 Jest 单元测试" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Jest基础配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装Jest
npm install --save-dev jest @types/jest

// package.json配置
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  },
  "jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "src/**/*.{js,ts}",
      "!src/**/*.test.{js,ts}",
      "!src/**/*.spec.{js,ts}",
      "!src/index.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    },
    "testMatch": [
      "**/__tests__/**/*.(js|ts)",
      "**/*.(test|spec).(js|ts)"
    ],
    "setupFilesAfterEnv": ["<rootDir>/src/test/setup.js"]
  }
}

// src/test/setup.js - 测试环境设置
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongoServer.getUri()
})

afterAll(async () => {
  if (mongoServer) {
    await mongoServer.stop()
  }
})

// 全局测试工具
global.testUtils = {
  createMockUser: () => ({
    id: '507f1f77bcf86cd799439011',
    name: '测试用户',
    email: 'test@example.com'
  }),
  
  createMockRequest: (overrides = {}) => ({
    body: {},
    params: {},
    query: {},
    headers: {},
    user: null,
    ...overrides
  }),
  
  createMockResponse: () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    res.cookie = jest.fn().mockReturnValue(res)
    res.clearCookie = jest.fn().mockReturnValue(res)
    return res
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 函数单元测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// src/utils/validation.js
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePassword(password) {
  if (password.length < 8) {
    return { isValid: false, error: '密码至少8位' }
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: '密码必须包含大写字母' }
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: '密码必须包含小写字母' }
  }
  if (!/\d/.test(password)) {
    return { isValid: false, error: '密码必须包含数字' }
  }
  return { isValid: true }
}

module.exports = { validateEmail, validatePassword }

// src/utils/__tests__/validation.test.js
const { validateEmail, validatePassword } = require('../validation')

describe('Email Validation', () => {
  test('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('user.name@domain.co.uk')).toBe(true)
  })
  
  test('should return false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false)
    expect(validateEmail('test@')).toBe(false)
    expect(validateEmail('@example.com')).toBe(false)
    expect(validateEmail('')).toBe(false)
  })
})

describe('Password Validation', () => {
  test('should return valid for strong password', () => {
    const result = validatePassword('StrongPass123')
    expect(result.isValid).toBe(true)
  })
  
  test('should return invalid for short password', () => {
    const result = validatePassword('Short1')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('密码至少8位')
  })
  
  test('should return invalid for password without uppercase', () => {
    const result = validatePassword('lowercase123')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('密码必须包含大写字母')
  })
  
  test('should return invalid for password without numbers', () => {
    const result = validatePassword('NoNumbers')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('密码必须包含数字')
  })
  
  // 参数化测试
  test.each([
    ['short', false, '密码至少8位'],
    ['nouppercase123', false, '密码必须包含大写字母'],
    ['NOLOWERCASE123', false, '密码必须包含小写字母'],
    ['NoNumbers', false, '密码必须包含数字'],
    ['ValidPass123', true, undefined]
  ])('password "%s" should be %s', (password, expectedValid, expectedError) => {
    const result = validatePassword(password)
    expect(result.isValid).toBe(expectedValid)
    if (!expectedValid) {
      expect(result.error).toBe(expectedError)
    }
  })
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 异步函数测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// src/services/userService.js
const User = require('../models/User')

class UserService {
  async createUser(userData) {
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      throw new Error('用户已存在')
    }
    
    const user = new User(userData)
    return await user.save()
  }
  
  async getUserById(id) {
    const user = await User.findById(id)
    if (!user) {
      throw new Error('用户不存在')
    }
    return user
  }
  
  async updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true })
    if (!user) {
      throw new Error('用户不存在')
    }
    return user
  }
}

module.exports = UserService

// src/services/__tests__/userService.test.js
const UserService = require('../userService')
const User = require('../../models/User')

// Mock User模型
jest.mock('../../models/User')

describe('UserService', () => {
  let userService
  
  beforeEach(() => {
    userService = new UserService()
    jest.clearAllMocks()
  })
  
  describe('createUser', () => {
    test('should create user successfully', async () => {
      const userData = {
        name: '张三',
        email: 'zhangsan@example.com'
      }
      
      const mockUser = { id: '1', ...userData }
      
      User.findOne.mockResolvedValue(null) // 用户不存在
      User.prototype.save = jest.fn().mockResolvedValue(mockUser)
      
      const result = await userService.createUser(userData)
      
      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email })
      expect(result).toEqual(mockUser)
    })
    
    test('should throw error if user already exists', async () => {
      const userData = {
        name: '张三',
        email: 'zhangsan@example.com'
      }
      
      User.findOne.mockResolvedValue({ id: '1' }) // 用户已存在
      
      await expect(userService.createUser(userData))
        .rejects.toThrow('用户已存在')
    })
  })
  
  describe('getUserById', () => {
    test('should return user if exists', async () => {
      const userId = '507f1f77bcf86cd799439011'
      const mockUser = { id: userId, name: '张三' }
      
      User.findById.mockResolvedValue(mockUser)
      
      const result = await userService.getUserById(userId)
      
      expect(User.findById).toHaveBeenCalledWith(userId)
      expect(result).toEqual(mockUser)
    })
    
    test('should throw error if user not found', async () => {
      const userId = '507f1f77bcf86cd799439011'
      
      User.findById.mockResolvedValue(null)
      
      await expect(userService.getUserById(userId))
        .rejects.toThrow('用户不存在')
    })
  })
  
  // 测试超时
  test('should handle timeout', async () => {
    User.findById.mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 6000))
    )
    
    await expect(userService.getUserById('123'))
      .rejects.toThrow('Timeout')
  }, 5000) // 5秒超时
})`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Express API测试 */}
                <Card title="🌐 Express API 测试" className={styles.content_card}>
                    <div className={styles.api_section}>
                        <h3>Supertest集成测试</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装依赖
npm install --save-dev supertest

// src/routes/__tests__/users.test.js
const request = require('supertest')
const app = require('../../app')
const User = require('../../models/User')

jest.mock('../../models/User')

describe('Users API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  describe('POST /api/users', () => {
    test('should create user successfully', async () => {
      const userData = {
        name: '张三',
        email: 'zhangsan@example.com',
        password: 'Password123'
      }
      
      const mockUser = { id: '1', ...userData }
      delete mockUser.password
      
      User.findOne.mockResolvedValue(null)
      User.prototype.save = jest.fn().mockResolvedValue(mockUser)
      
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201)
      
      expect(response.body).toMatchObject({
        message: '用户创建成功',
        user: mockUser
      })
    })
    
    test('should return 400 for invalid data', async () => {
      const invalidData = {
        name: '',
        email: 'invalid-email'
      }
      
      const response = await request(app)
        .post('/api/users')
        .send(invalidData)
        .expect(400)
      
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toContain('验证失败')
    })
    
    test('should return 409 if user already exists', async () => {
      const userData = {
        name: '张三',
        email: 'zhangsan@example.com',
        password: 'Password123'
      }
      
      User.findOne.mockResolvedValue({ id: '1' })
      
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(409)
      
      expect(response.body.error).toBe('用户已存在')
    })
  })
  
  describe('GET /api/users/:id', () => {
    test('should return user if exists', async () => {
      const userId = '507f1f77bcf86cd799439011'
      const mockUser = { id: userId, name: '张三', email: 'zhangsan@example.com' }
      
      User.findById.mockResolvedValue(mockUser)
      
      const response = await request(app)
        .get(\`/api/users/\${userId}\`)
        .expect(200)
      
      expect(response.body.user).toEqual(mockUser)
    })
    
    test('should return 404 if user not found', async () => {
      const userId = '507f1f77bcf86cd799439011'
      
      User.findById.mockResolvedValue(null)
      
      const response = await request(app)
        .get(\`/api/users/\${userId}\`)
        .expect(404)
      
      expect(response.body.error).toBe('用户不存在')
    })
  })
  
  describe('Authentication required endpoints', () => {
    test('should return 401 without token', async () => {
      await request(app)
        .get('/api/users/profile')
        .expect(401)
    })
    
    test('should return user profile with valid token', async () => {
      const mockUser = { id: '1', name: '张三', email: 'zhangsan@example.com' }
      const token = 'valid-jwt-token'
      
      // Mock JWT验证
      jest.doMock('jsonwebtoken', () => ({
        verify: jest.fn().mockReturnValue({ userId: '1' })
      }))
      
      User.findById.mockResolvedValue(mockUser)
      
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', \`Bearer \${token}\`)
        .expect(200)
      
      expect(response.body.user).toEqual(mockUser)
    })
  })
})`}
                            </pre>
                        </div>
                        
                        <h3>数据库集成测试</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// src/__tests__/integration/database.test.js
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../../models/User')

describe('Database Integration Tests', () => {
  let mongoServer
  
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
  })
  
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })
  
  beforeEach(async () => {
    await User.deleteMany({})
  })
  
  describe('User Model', () => {
    test('should save user to database', async () => {
      const userData = {
        name: '张三',
        email: 'zhangsan@example.com',
        password: 'hashedpassword'
      }
      
      const user = new User(userData)
      const savedUser = await user.save()
      
      expect(savedUser._id).toBeDefined()
      expect(savedUser.name).toBe(userData.name)
      expect(savedUser.email).toBe(userData.email)
      expect(savedUser.createdAt).toBeDefined()
    })
    
    test('should not save user with duplicate email', async () => {
      const userData = {
        name: '张三',
        email: 'zhangsan@example.com',
        password: 'hashedpassword'
      }
      
      const user1 = new User(userData)
      await user1.save()
      
      const user2 = new User(userData)
      
      await expect(user2.save()).rejects.toThrow()
    })
    
    test('should validate required fields', async () => {
      const user = new User({})
      
      await expect(user.save()).rejects.toThrow()
    })
    
    test('should validate email format', async () => {
      const user = new User({
        name: '张三',
        email: 'invalid-email',
        password: 'password'
      })
      
      await expect(user.save()).rejects.toThrow()
    })
  })
  
  describe('User Queries', () => {
    beforeEach(async () => {
      await User.create([
        { name: '张三', email: 'zhangsan@example.com', password: 'pass1' },
        { name: '李四', email: 'lisi@example.com', password: 'pass2' },
        { name: '王五', email: 'wangwu@example.com', password: 'pass3' }
      ])
    })
    
    test('should find user by email', async () => {
      const user = await User.findOne({ email: 'zhangsan@example.com' })
      
      expect(user).toBeTruthy()
      expect(user.name).toBe('张三')
    })
    
    test('should find users with pagination', async () => {
      const users = await User.find()
        .limit(2)
        .skip(1)
        .sort({ name: 1 })
      
      expect(users).toHaveLength(2)
      expect(users[0].name).toBe('王五')
      expect(users[1].name).toBe('张三')
    })
    
    test('should update user', async () => {
      const user = await User.findOne({ email: 'zhangsan@example.com' })
      user.name = '张三丰'
      await user.save()
      
      const updatedUser = await User.findById(user._id)
      expect(updatedUser.name).toBe('张三丰')
    })
    
    test('should delete user', async () => {
      const user = await User.findOne({ email: 'zhangsan@example.com' })
      await User.findByIdAndDelete(user._id)
      
      const deletedUser = await User.findById(user._id)
      expect(deletedUser).toBeNull()
    })
  })
})`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* E2E测试 */}
                <Card title="🎭 端到端测试" className={styles.content_card}>
                    <div className={styles.e2e_section}>
                        <h3>Playwright E2E测试</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Playwright
npm install --save-dev @playwright/test

// playwright.config.js
module.exports = {
  testDir: './e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
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
    }
  ],
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
}

// e2e/auth.spec.js
const { test, expect } = require('@playwright/test')

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  
  test('should register new user', async ({ page }) => {
    await page.click('text=注册')
    
    await page.fill('[data-testid=name-input]', '测试用户')
    await page.fill('[data-testid=email-input]', 'test@example.com')
    await page.fill('[data-testid=password-input]', 'Password123')
    await page.fill('[data-testid=confirm-password-input]', 'Password123')
    
    await page.click('[data-testid=register-button]')
    
    await expect(page.locator('text=注册成功')).toBeVisible()
    await expect(page).toHaveURL('/dashboard')
  })
  
  test('should login existing user', async ({ page }) => {
    await page.click('text=登录')
    
    await page.fill('[data-testid=email-input]', 'existing@example.com')
    await page.fill('[data-testid=password-input]', 'Password123')
    
    await page.click('[data-testid=login-button]')
    
    await expect(page.locator('text=欢迎回来')).toBeVisible()
    await expect(page).toHaveURL('/dashboard')
  })
  
  test('should show error for invalid credentials', async ({ page }) => {
    await page.click('text=登录')
    
    await page.fill('[data-testid=email-input]', 'wrong@example.com')
    await page.fill('[data-testid=password-input]', 'wrongpassword')
    
    await page.click('[data-testid=login-button]')
    
    await expect(page.locator('text=邮箱或密码错误')).toBeVisible()
  })
  
  test('should logout user', async ({ page }) => {
    // 先登录
    await page.goto('/login')
    await page.fill('[data-testid=email-input]', 'test@example.com')
    await page.fill('[data-testid=password-input]', 'Password123')
    await page.click('[data-testid=login-button]')
    
    await expect(page).toHaveURL('/dashboard')
    
    // 登出
    await page.click('[data-testid=user-menu]')
    await page.click('text=登出')
    
    await expect(page).toHaveURL('/')
    await expect(page.locator('text=登录')).toBeVisible()
  })
})`}
                            </pre>
                        </div>
                        
                        <h3>API端到端测试</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// e2e/api.spec.js
const { test, expect } = require('@playwright/test')

test.describe('API End-to-End Tests', () => {
  let authToken
  let userId
  
  test.beforeAll(async ({ request }) => {
    // 创建测试用户并获取认证令牌
    const response = await request.post('/api/auth/register', {
      data: {
        name: 'E2E测试用户',
        email: 'e2e@example.com',
        password: 'Password123'
      }
    })
    
    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    authToken = data.accessToken
    userId = data.user.id
  })
  
  test('should create, read, update, delete user', async ({ request }) => {
    // Create
    const createResponse = await request.post('/api/users', {
      headers: {
        'Authorization': \`Bearer \${authToken}\`
      },
      data: {
        name: '新用户',
        email: 'newuser@example.com',
        password: 'Password123'
      }
    })
    
    expect(createResponse.ok()).toBeTruthy()
    const createdUser = await createResponse.json()
    const newUserId = createdUser.user.id
    
    // Read
    const readResponse = await request.get(\`/api/users/\${newUserId}\`, {
      headers: {
        'Authorization': \`Bearer \${authToken}\`
      }
    })
    
    expect(readResponse.ok()).toBeTruthy()
    const userData = await readResponse.json()
    expect(userData.user.name).toBe('新用户')
    
    // Update
    const updateResponse = await request.put(\`/api/users/\${newUserId}\`, {
      headers: {
        'Authorization': \`Bearer \${authToken}\`
      },
      data: {
        name: '更新后的用户'
      }
    })
    
    expect(updateResponse.ok()).toBeTruthy()
    const updatedUser = await updateResponse.json()
    expect(updatedUser.user.name).toBe('更新后的用户')
    
    // Delete
    const deleteResponse = await request.delete(\`/api/users/\${newUserId}\`, {
      headers: {
        'Authorization': \`Bearer \${authToken}\`
      }
    })
    
    expect(deleteResponse.ok()).toBeTruthy()
    
    // Verify deletion
    const verifyResponse = await request.get(\`/api/users/\${newUserId}\`, {
      headers: {
        'Authorization': \`Bearer \${authToken}\`
      }
    })
    
    expect(verifyResponse.status()).toBe(404)
  })
  
  test('should handle authentication flow', async ({ request }) => {
    // Login
    const loginResponse = await request.post('/api/auth/login', {
      data: {
        email: 'e2e@example.com',
        password: 'Password123'
      }
    })
    
    expect(loginResponse.ok()).toBeTruthy()
    const loginData = await loginResponse.json()
    expect(loginData.accessToken).toBeTruthy()
    
    // Access protected resource
    const profileResponse = await request.get('/api/users/profile', {
      headers: {
        'Authorization': \`Bearer \${loginData.accessToken}\`
      }
    })
    
    expect(profileResponse.ok()).toBeTruthy()
    const profileData = await profileResponse.json()
    expect(profileData.user.email).toBe('e2e@example.com')
    
    // Logout
    const logoutResponse = await request.post('/api/auth/logout', {
      headers: {
        'Authorization': \`Bearer \${loginData.accessToken}\`
      }
    })
    
    expect(logoutResponse.ok()).toBeTruthy()
  })
})`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 测试最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 测试结构</h4>
                                <p>组织清晰的测试结构</p>
                                <ul>
                                    <li>遵循AAA模式（Arrange, Act, Assert）</li>
                                    <li>使用描述性的测试名称</li>
                                    <li>合理分组相关测试</li>
                                    <li>保持测试独立性</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. Mock策略</h4>
                                <p>合理使用Mock和Stub</p>
                                <ul>
                                    <li>Mock外部依赖</li>
                                    <li>保持Mock的简单性</li>
                                    <li>验证Mock的调用</li>
                                    <li>避免过度Mock</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 测试数据</h4>
                                <p>管理测试数据</p>
                                <ul>
                                    <li>使用工厂函数创建测试数据</li>
                                    <li>隔离测试环境</li>
                                    <li>清理测试数据</li>
                                    <li>使用内存数据库</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 持续集成</h4>
                                <p>集成到CI/CD流程</p>
                                <ul>
                                    <li>自动运行测试</li>
                                    <li>监控测试覆盖率</li>
                                    <li>快速反馈机制</li>
                                    <li>测试报告生成</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TestingDetail
