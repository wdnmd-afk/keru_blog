import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'
import { ArrowLeftOutlined, BugOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const TestingDetail: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Vue', 'testing')

    const handleBack = () => {
        navigate('/technology/vue')
    }

    if (loading) {
        return <div className={styles.loading}>{t('detail_pages.common.loading')}</div>
    }

    if (error) {
        return (
            <div className={styles.error}>
                {t('detail_pages.common.load_failed')}: {error}
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
                    返回Vue.js技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <BugOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue.js 测试指南</h1>
                    <p>全面掌握Vue.js应用的单元测试、集成测试和E2E测试</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">测试</Tag>
                        <Tag color="orange">Jest</Tag>
                        <Tag color="purple">Vitest</Tag>
                        <Tag color="red">Cypress</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 测试环境搭建 */}
                <Card title="🛠️ 测试环境搭建" className={styles.content_card}>
                    <div className={styles.setup_section}>
                        <h3>1. Vue Test Utils + Jest</h3>
                        <CodeHighlight
                            code={`# 安装测试依赖
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
}`}
                            language="bash"
                            title="Jest 配置"
                        />

                        <h3>2. Vitest (推荐用于Vite项目)</h3>
                        <CodeHighlight
                            code={`# 安装Vitest
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
}`}
                            language="bash"
                            title="Vitest 配置"
                        />
                    </div>
                </Card>

                {/* 组件测试 */}
                <Card title="🧪 组件测试" className={styles.content_card}>
                    <div className={styles.component_testing}>
                        <h3>基础组件测试</h3>
                        <CodeHighlight
                            code={`// Counter.vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <button @click="increment" data-testid="increment">增加</button>
    <button @click="decrement" data-testid="decrement">减少</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Counter',
  setup() {
    const count = ref(0)
    
    const increment = () => count.value++
    const decrement = () => count.value--
    
    return { count, increment, decrement }
  }
}
</script>

// Counter.test.js
import { mount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter组件', () => {
  test('应该渲染初始计数', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('计数: 0')
  })

  test('点击增加按钮应该增加计数', async () => {
    const wrapper = mount(Counter)
    
    await wrapper.find('[data-testid="increment"]').trigger('click')
    
    expect(wrapper.text()).toContain('计数: 1')
  })

  test('点击减少按钮应该减少计数', async () => {
    const wrapper = mount(Counter)
    
    await wrapper.find('[data-testid="decrement"]').trigger('click')
    
    expect(wrapper.text()).toContain('计数: -1')
  })
})`}
                            language="vue"
                            title="Vue 组件测试示例"
                        />

                        <h3>Props 和 Events 测试</h3>
                        <CodeHighlight
                            code={`// UserCard.vue
<template>
  <div class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button @click="handleEdit" :disabled="readonly">编辑</button>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['edit'],
  setup(props, { emit }) {
    const handleEdit = () => {
      emit('edit', props.user.id)
    }
    
    return { handleEdit }
  }
}
</script>

// UserCard.test.js
import { mount } from '@vue/test-utils'
import UserCard from '@/components/UserCard.vue'

describe('UserCard组件', () => {
  const mockUser = {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com'
  }

  test('应该显示用户信息', () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser }
    })

    expect(wrapper.text()).toContain('张三')
    expect(wrapper.text()).toContain('zhangsan@example.com')
  })

  test('只读模式下按钮应该被禁用', () => {
    const wrapper = mount(UserCard, {
      props: { 
        user: mockUser,
        readonly: true 
      }
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  test('点击编辑按钮应该触发edit事件', async () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')[0]).toEqual([1])
  })
})`}
                            language="vue"
                            title="Props 和 Events 测试"
                        />
                    </div>
                </Card>

                {/* Composables 测试 */}
                <Card title="🔧 Composables 测试" className={styles.content_card}>
                    <div className={styles.composables_testing}>
                        <h3>测试组合式函数</h3>
                        <CodeHighlight
                            code={`// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const isEven = computed(() => count.value % 2 === 0)
  const isPositive = computed(() => count.value > 0)
  
  return {
    count,
    increment,
    decrement,
    reset,
    isEven,
    isPositive
  }
}

// useCounter.test.js
import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  test('应该初始化为默认值', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })

  test('应该初始化为指定值', () => {
    const { count } = useCounter(10)
    expect(count.value).toBe(10)
  })

  test('应该能够增加计数', () => {
    const { count, increment } = useCounter()
    
    increment()
    
    expect(count.value).toBe(1)
  })

  test('应该正确计算是否为偶数', () => {
    const { count, increment, isEven } = useCounter(0)
    
    expect(isEven.value).toBe(true)
    
    increment()
    expect(isEven.value).toBe(false)
  })

  test('应该能够重置计数', () => {
    const { count, increment, reset } = useCounter(5)
    
    increment()
    increment()
    expect(count.value).toBe(7)
    
    reset()
    expect(count.value).toBe(5)
  })
})`}
                            language="javascript"
                            title="Composables 测试"
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TestingDetail
