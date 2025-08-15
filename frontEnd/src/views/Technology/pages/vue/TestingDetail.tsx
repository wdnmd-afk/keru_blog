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
        navigate('/technology/vue')
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
                    返回Vue.js技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ExperimentOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue.js 测试详解</h1>
                    <p>掌握Vue应用的单元测试、集成测试与E2E测试</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue Test Utils</Tag>
                        <Tag color="blue">Jest</Tag>
                        <Tag color="orange">Vitest</Tag>
                        <Tag color="purple">Cypress</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 测试环境搭建 */}
                <Card title="⚙️ 测试环境搭建" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>1. Vue Test Utils + Jest</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装测试依赖
npm install --save-dev @vue/test-utils jest vue-jest babel-jest @babel/preset-env

# jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!**/node_modules/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
}

# babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ]
}

# package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>2. Vitest (推荐用于Vite项目)</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装Vitest
npm install --save-dev vitest @vue/test-utils jsdom

# vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js']
  }
})

# package.json scripts
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}

# tests/setup.js
import { config } from '@vue/test-utils'

// 全局配置
config.global.mocks = {
  $t: (key) => key // 模拟i18n
}

// 全局组件
config.global.components = {
  RouterLink: {
    template: '<a><slot /></a>'
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 单元测试 */}
                <Card title="🧪 单元测试" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 组件基础测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Counter.vue
<template>
  <div>
    <span data-testid="count">{{ count }}</span>
    <button @click="increment" data-testid="increment">+</button>
    <button @click="decrement" data-testid="decrement">-</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => count.value++
const decrement = () => count.value--
</script>

// Counter.test.js
import { mount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter', () => {
  test('渲染初始计数', () => {
    const wrapper = mount(Counter)
    expect(wrapper.find('[data-testid="count"]').text()).toBe('0')
  })
  
  test('点击增加按钮', async () => {
    const wrapper = mount(Counter)
    const incrementButton = wrapper.find('[data-testid="increment"]')
    
    await incrementButton.trigger('click')
    
    expect(wrapper.find('[data-testid="count"]').text()).toBe('1')
  })
  
  test('点击减少按钮', async () => {
    const wrapper = mount(Counter)
    const decrementButton = wrapper.find('[data-testid="decrement"]')
    
    await decrementButton.trigger('click')
    
    expect(wrapper.find('[data-testid="count"]').text()).toBe('-1')
  })
  
  test('多次点击', async () => {
    const wrapper = mount(Counter)
    const incrementButton = wrapper.find('[data-testid="increment"]')
    
    await incrementButton.trigger('click')
    await incrementButton.trigger('click')
    await incrementButton.trigger('click')
    
    expect(wrapper.find('[data-testid="count"]').text()).toBe('3')
  })
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Props和Events测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// UserCard.vue
<template>
  <div class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button @click="handleEdit" :disabled="readonly">编辑</button>
    <button @click="handleDelete" v-if="!readonly">删除</button>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => emit('edit')
const handleDelete = () => emit('delete')
</script>

// UserCard.test.js
import { mount } from '@vue/test-utils'
import UserCard from '@/components/UserCard.vue'

describe('UserCard', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com'
  }
  
  test('渲染用户信息', () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser }
    })
    
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
  })
  
  test('只读模式隐藏删除按钮', () => {
    const wrapper = mount(UserCard, {
      props: { 
        user: mockUser,
        readonly: true 
      }
    })
    
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).not.toContain('删除')
  })
  
  test('触发编辑事件', async () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')).toHaveLength(1)
  })
  
  test('触发删除事件', async () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser }
    })
    
    const deleteButton = wrapper.findAll('button')[1]
    await deleteButton.trigger('click')
    
    expect(wrapper.emitted('delete')).toBeTruthy()
  })
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 组合式API测试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

// useCounter.test.js
import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  test('初始值设置', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })
  
  test('增加计数', () => {
    const { count, increment } = useCounter()
    
    increment()
    expect(count.value).toBe(1)
  })
  
  test('计算属性', () => {
    const { count, doubleCount, increment } = useCounter()
    
    increment()
    increment()
    
    expect(doubleCount.value).toBe(4)
  })
  
  test('重置功能', () => {
    const { count, increment, reset } = useCounter(10)
    
    increment()
    increment()
    expect(count.value).toBe(12)
    
    reset()
    expect(count.value).toBe(10)
  })
})

// 在组件中测试组合式函数
// CounterComponent.test.js
import { mount } from '@vue/test-utils'
import CounterComponent from '@/components/CounterComponent.vue'

test('组件中的组合式函数', async () => {
  const wrapper = mount(CounterComponent)
  
  // 测试组件使用组合式函数的行为
  await wrapper.find('[data-testid="increment"]').trigger('click')
  
  expect(wrapper.find('[data-testid="count"]').text()).toBe('1')
  expect(wrapper.find('[data-testid="double"]').text()).toBe('2')
})`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 模拟与存根 */}
                <Card title="🎭 模拟与存根" className={styles.content_card}>
                    <div className={styles.mock_section}>
                        <h3>1. API调用模拟</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// UserList.vue
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchUsers } from '@/api/users'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const loadUsers = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetchUsers()
    users.value = response.data
  } catch (err) {
    error.value = '加载用户失败'
  } finally {
    loading.value = false
  }
}

onMounted(loadUsers)
</script>

// UserList.test.js
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import UserList from '@/components/UserList.vue'
import * as usersApi from '@/api/users'

// 模拟API模块
jest.mock('@/api/users')

describe('UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  test('显示加载状态', () => {
    // 模拟pending状态的Promise
    usersApi.fetchUsers.mockReturnValue(new Promise(() => {}))
    
    const wrapper = mount(UserList)
    
    expect(wrapper.text()).toContain('加载中...')
  })
  
  test('成功加载用户', async () => {
    const mockUsers = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
    
    usersApi.fetchUsers.mockResolvedValue({ data: mockUsers })
    
    const wrapper = mount(UserList)
    
    // 等待异步操作完成
    await nextTick()
    await nextTick()
    
    expect(wrapper.text()).toContain('John')
    expect(wrapper.text()).toContain('Jane')
    expect(wrapper.text()).not.toContain('加载中...')
  })
  
  test('处理加载错误', async () => {
    usersApi.fetchUsers.mockRejectedValue(new Error('Network error'))
    
    const wrapper = mount(UserList)
    
    await nextTick()
    await nextTick()
    
    expect(wrapper.text()).toContain('加载用户失败')
  })
})`}
                            </pre>
                        </div>
                        
                        <h3>2. 路由和Store模拟</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 模拟Vue Router
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } }
  ]
})

test('路由导航', async () => {
  const wrapper = mount(Component, {
    global: {
      plugins: [router]
    }
  })
  
  await router.push('/about')
  await router.isReady()
  
  // 测试路由变化后的行为
})

// 模拟Pinia Store
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/stores/user'

describe('UserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  test('用户登录', async () => {
    const userStore = useUserStore()
    
    // 模拟API响应
    const mockUser = { id: 1, name: 'John' }
    jest.spyOn(api, 'login').mockResolvedValue({ data: mockUser })
    
    await userStore.login({ email: 'john@example.com', password: 'password' })
    
    expect(userStore.currentUser).toEqual(mockUser)
    expect(userStore.isLoggedIn).toBe(true)
  })
})

// 在组件测试中使用模拟Store
test('组件使用Store', () => {
  const pinia = createPinia()
  
  const wrapper = mount(Component, {
    global: {
      plugins: [pinia]
    }
  })
  
  const userStore = useUserStore()
  userStore.currentUser = { id: 1, name: 'John' }
  
  expect(wrapper.text()).toContain('John')
})`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* E2E测试 */}
                <Card title="🌐 端到端测试" className={styles.content_card}>
                    <div className={styles.e2e_section}>
                        <h3>1. Cypress配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装Cypress
npm install --save-dev cypress

# cypress.config.js
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true
  }
})

# package.json scripts
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test:e2e": "start-server-and-test dev http://localhost:3000 cypress:run"
  }
}

# cypress/support/commands.js
// 自定义命令
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-testid="email"]').type(email)
  cy.get('[data-testid="password"]').type(password)
  cy.get('[data-testid="login-button"]').click()
  cy.url().should('include', '/dashboard')
})

Cypress.Commands.add('createUser', (userData) => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: userData,
    headers: {
      'Authorization': \`Bearer \${Cypress.env('authToken')}\`
    }
  })
})`}
                            </pre>
                        </div>
                        
                        <h3>2. E2E测试示例</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// cypress/e2e/user-management.cy.js
describe('用户管理', () => {
  beforeEach(() => {
    // 设置测试数据
    cy.task('db:seed')
    cy.login('admin@example.com', 'password')
  })
  
  it('应该显示用户列表', () => {
    cy.visit('/users')
    
    cy.get('[data-testid="user-list"]').should('be.visible')
    cy.get('[data-testid="user-item"]').should('have.length.at.least', 1)
  })
  
  it('应该能够创建新用户', () => {
    cy.visit('/users')
    
    cy.get('[data-testid="add-user-button"]').click()
    
    // 填写表单
    cy.get('[data-testid="name-input"]').type('新用户')
    cy.get('[data-testid="email-input"]').type('newuser@example.com')
    cy.get('[data-testid="role-select"]').select('user')
    
    cy.get('[data-testid="submit-button"]').click()
    
    // 验证结果
    cy.get('[data-testid="success-message"]').should('contain', '用户创建成功')
    cy.get('[data-testid="user-list"]').should('contain', '新用户')
  })
  
  it('应该能够编辑用户', () => {
    cy.visit('/users')
    
    cy.get('[data-testid="user-item"]').first().within(() => {
      cy.get('[data-testid="edit-button"]').click()
    })
    
    cy.get('[data-testid="name-input"]').clear().type('更新的用户名')
    cy.get('[data-testid="submit-button"]').click()
    
    cy.get('[data-testid="success-message"]').should('contain', '用户更新成功')
  })
  
  it('应该能够删除用户', () => {
    cy.visit('/users')
    
    cy.get('[data-testid="user-item"]').first().within(() => {
      cy.get('[data-testid="delete-button"]').click()
    })
    
    // 确认删除
    cy.get('[data-testid="confirm-delete"]').click()
    
    cy.get('[data-testid="success-message"]').should('contain', '用户删除成功')
  })
  
  it('应该处理网络错误', () => {
    // 模拟网络错误
    cy.intercept('GET', '/api/users', { forceNetworkError: true })
    
    cy.visit('/users')
    
    cy.get('[data-testid="error-message"]').should('contain', '加载失败')
    cy.get('[data-testid="retry-button"]').should('be.visible')
  })
})

// cypress/e2e/responsive.cy.js
describe('响应式设计', () => {
  const viewports = [
    { device: 'iphone-6', width: 375, height: 667 },
    { device: 'ipad-2', width: 768, height: 1024 },
    { device: 'macbook-15', width: 1440, height: 900 }
  ]
  
  viewports.forEach(({ device, width, height }) => {
    it(\`应该在\${device}上正确显示\`, () => {
      cy.viewport(width, height)
      cy.visit('/')
      
      cy.get('[data-testid="header"]').should('be.visible')
      cy.get('[data-testid="navigation"]').should('be.visible')
      
      if (width < 768) {
        cy.get('[data-testid="mobile-menu"]').should('be.visible')
      } else {
        cy.get('[data-testid="desktop-menu"]').should('be.visible')
      }
    })
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
                                <h4>1. 测试策略</h4>
                                <p>采用测试金字塔策略</p>
                                <ul>
                                    <li><strong>单元测试</strong>：测试组件和函数的独立功能</li>
                                    <li><strong>集成测试</strong>：测试组件间的交互</li>
                                    <li><strong>E2E测试</strong>：测试完整的用户流程</li>
                                    <li>保持70%单元测试，20%集成测试，10%E2E测试</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 测试编写原则</h4>
                                <p>编写高质量的测试代码</p>
                                <ul>
                                    <li>测试行为而不是实现细节</li>
                                    <li>使用有意义的测试描述</li>
                                    <li>保持测试的独立性和可重复性</li>
                                    <li>遵循AAA模式：Arrange, Act, Assert</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 测试数据管理</h4>
                                <p>合理管理测试数据</p>
                                <ul>
                                    <li>使用工厂函数创建测试数据</li>
                                    <li>为每个测试准备独立的数据</li>
                                    <li>使用fixtures管理复杂的测试数据</li>
                                    <li>在测试后清理数据</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 持续集成</h4>
                                <p>将测试集成到开发流程中</p>
                                <ul>
                                    <li>在CI/CD管道中运行测试</li>
                                    <li>设置代码覆盖率阈值</li>
                                    <li>使用并行测试提高效率</li>
                                    <li>定期审查和维护测试代码</li>
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
