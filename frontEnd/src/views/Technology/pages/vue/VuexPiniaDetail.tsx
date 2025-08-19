import React from 'react'
import { Card, Tag, Button, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, DatabaseOutlined, InfoCircleOutlined } from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const VuexPiniaDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Vue', 'stateManagement')

    const handleBack = () => {
        navigate('/technology/vue')
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
                    返回Vue.js技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <DatabaseOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue 状态管理：Vuex & Pinia</h1>
                    <p>掌握Vue生态的状态管理方案，从Vuex到Pinia的演进与最佳实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">Vuex</Tag>
                        <Tag color="orange">Pinia</Tag>
                        <Tag color="purple">状态管理</Tag>
                        <Tag color="red">TypeScript</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 状态管理概述 */}
                <Card title="📊 状态管理概述" className={styles.content_card}>
                    <Alert
                        message="为什么需要状态管理？"
                        description="当应用变得复杂时，组件间的状态共享和通信变得困难。状态管理库提供了集中式的状态存储和管理方案。"
                        type="info"
                        showIcon
                        icon={<InfoCircleOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.state_management_overview}>
                        <h3>Vuex vs Pinia 对比</h3>
                        <CodeHighlight
                            code={`// Vuex 4 特点
✅ 成熟稳定，生态丰富
✅ 时间旅行调试
✅ 插件系统完善
❌ TypeScript支持复杂
❌ 模块化配置繁琐
❌ 组合式API支持有限

// Pinia 特点 (Vue官方推荐)
✅ 完美的TypeScript支持
✅ 组合式API原生支持
✅ 模块化更简单
✅ 更好的代码分割
✅ 更小的包体积
✅ 支持Vue 2和Vue 3

// 迁移建议
- 新项目：直接使用Pinia
- 现有Vuex项目：可以渐进式迁移
- Vue 3项目：强烈推荐Pinia`}
                            language="javascript"
                            title="Vuex vs Pinia 对比"
                        />
                    </div>
                </Card>

                {/* Vuex基础 */}
                <Card title="🏪 Vuex 状态管理" className={styles.content_card}>
                    <div className={styles.vuex_basics}>
                        <h3>1. Vuex 基础配置</h3>
                        <CodeHighlight
                            code={`// store/index.js
import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0,
    user: null,
    todos: []
  },
  
  getters: {
    doubleCount: (state) => state.count * 2,
    completedTodos: (state) => state.todos.filter(todo => todo.completed),
    todoCount: (state, getters) => getters.completedTodos.length
  },
  
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    SET_USER(state, user) {
      state.user = user
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo)
    }
  },
  
  actions: {
    async fetchUser({ commit }, userId) {
      try {
        const user = await api.getUser(userId)
        commit('SET_USER', user)
      } catch (error) {
        console.error('获取用户失败:', error)
      }
    },
    
    async addTodo({ commit }, todoText) {
      const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
      }
      commit('ADD_TODO', todo)
    }
  }
})

export default store`}
                            language="javascript"
                            title="Vuex基础配置"
                        />

                        <h3>2. 组件中使用Vuex</h3>
                        <CodeHighlight
                            code={`<template>
  <div>
    <h1>计数器: {{ count }}</h1>
    <p>双倍计数: {{ doubleCount }}</p>
    <button @click="increment">增加</button>
    
    <div v-if="user">
      <h2>用户: {{ user.name }}</h2>
    </div>
    
    <ul>
      <li v-for="todo in completedTodos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // 映射state
    ...mapState(['count', 'user']),
    
    // 映射getters
    ...mapGetters(['doubleCount', 'completedTodos']),
    
    // 重命名映射
    ...mapState({
      userInfo: 'user'
    })
  },
  
  methods: {
    // 映射mutations
    ...mapMutations(['INCREMENT']),
    
    // 映射actions
    ...mapActions(['fetchUser', 'addTodo']),
    
    // 重命名映射
    ...mapMutations({
      increment: 'INCREMENT'
    })
  },
  
  created() {
    this.fetchUser(1)
  }
}
</script>

<!-- 组合式API使用 -->
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const count = computed(() => store.state.count)
const doubleCount = computed(() => store.getters.doubleCount)

const increment = () => store.commit('INCREMENT')
const fetchUser = (id) => store.dispatch('fetchUser', id)
</script>`}
                            language="vue"
                            title="组件中使用Vuex"
                        />
                    </div>
                </Card>

                {/* Pinia基础 */}
                <Card title="🍍 Pinia 状态管理 (推荐)" className={styles.content_card}>
                    <div className={styles.pinia_basics}>
                        <h3>1. Pinia 基础配置</h3>
                        <CodeHighlight
                            code={`// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

// stores/counter.js - 选项式API风格
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Eduardo'
  }),
  
  getters: {
    doubleCount: (state) => state.count * 2,
    
    // 使用其他getter
    doubleCountPlusOne() {
      return this.doubleCount + 1
    },
    
    // 传递参数的getter
    getUserById: (state) => {
      return (userId) => state.users.find(user => user.id === userId)
    }
  },
  
  actions: {
    increment() {
      this.count++
    },
    
    async fetchData() {
      try {
        const data = await api.getData()
        this.data = data
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    },
    
    // 可以调用其他actions
    async incrementAndFetch() {
      this.increment()
      await this.fetchData()
    }
  }
})`}
                            language="javascript"
                            title="Pinia基础配置"
                        />

                        <h3>2. 组合式API风格的Store</h3>
                        <CodeHighlight
                            code={`// stores/user.js - 组合式API风格
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // state
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  
  // getters
  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '游客')
  
  // actions
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await api.login(credentials)
      user.value = response.user
      localStorage.setItem('token', response.token)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
  }
  
  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await api.updateProfile(profileData)
      user.value = { ...user.value, ...updatedUser }
    } catch (err) {
      error.value = err.message
      throw err
    }
  }
  
  return {
    // state
    user,
    isLoading,
    error,
    
    // getters
    isLoggedIn,
    userName,
    
    // actions
    login,
    logout,
    updateProfile
  }
})`}
                            language="javascript"
                            title="组合式API风格Store"
                        />

                        <h3>3. 在组件中使用Pinia</h3>
                        <CodeHighlight
                            code={`<template>
  <div>
    <!-- 直接使用store -->
    <h1>{{ counter.count }}</h1>
    <p>双倍: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">增加</button>
    
    <!-- 用户信息 -->
    <div v-if="user.isLoggedIn">
      <h2>欢迎, {{ user.userName }}!</h2>
      <button @click="user.logout">退出</button>
    </div>
    <div v-else>
      <button @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

// 使用store
const counter = useCounterStore()
const user = useUserStore()

// 解构响应式状态 (需要使用storeToRefs)
const { count, doubleCount } = storeToRefs(counter)
const { isLoggedIn, userName } = storeToRefs(user)

// 解构actions (不需要storeToRefs)
const { increment } = counter
const { login, logout } = user

// 登录处理
const handleLogin = async () => {
  try {
    await login({
      username: 'admin',
      password: '123456'
    })
  } catch (error) {
    console.error('登录失败:', error)
  }
}

// 监听store变化
watch(() => counter.count, (newCount) => {
  console.log('计数变化:', newCount)
})
</script>`}
                            language="vue"
                            title="组件中使用Pinia"
                        />
                    </div>
                </Card>

                {/* 高级特性 */}
                <Card title="🚀 Pinia 高级特性" className={styles.content_card}>
                    <div className={styles.pinia_advanced}>
                        <h3>1. Store组合与复用</h3>
                        <CodeHighlight
                            code={`// stores/useAuth.js - 可复用的认证逻辑
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(null)
  
  const isAuthenticated = computed(() => !!token.value)
  
  const setAuth = (authData) => {
    token.value = authData.token
    user.value = authData.user
    localStorage.setItem('token', authData.token)
  }
  
  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }
  
  return { token, user, isAuthenticated, setAuth, clearAuth }
})

// stores/useApi.js - API调用逻辑
import { useAuthStore } from './useAuth'

export const useApiStore = defineStore('api', () => {
  const auth = useAuthStore()
  
  const apiCall = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }
    
    if (auth.isAuthenticated) {
      headers.Authorization = \`Bearer \${auth.token}\`
    }
    
    const response = await fetch(url, {
      ...options,
      headers
    })
    
    if (response.status === 401) {
      auth.clearAuth()
      throw new Error('未授权')
    }
    
    return response.json()
  }
  
  return { apiCall }
})`}
                            language="javascript"
                            title="Store组合与复用"
                        />

                        <h3>2. 插件系统</h3>
                        <CodeHighlight
                            code={`// plugins/persistence.js - 持久化插件
export function persistencePlugin({ store }) {
  // 从localStorage恢复状态
  const saved = localStorage.getItem(store.$id)
  if (saved) {
    store.$patch(JSON.parse(saved))
  }
  
  // 监听状态变化并保存
  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
}

// main.js - 使用插件
import { createPinia } from 'pinia'
import { persistencePlugin } from './plugins/persistence'

const pinia = createPinia()
pinia.use(persistencePlugin)

// 或者只对特定store使用
// stores/settings.js
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: 'light',
    language: 'zh-CN'
  }),
  
  // 使用插件
  persist: true
})`}
                            language="javascript"
                            title="Pinia插件系统"
                        />

                        <h3>3. TypeScript支持</h3>
                        <CodeHighlight
                            code={`// types/user.ts
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface LoginCredentials {
  username: string
  password: string
}

// stores/user.ts - TypeScript Store
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, LoginCredentials } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  // 类型化的state
  const user = ref<User | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  
  // 类型化的getters
  const isLoggedIn = computed((): boolean => !!user.value)
  const isAdmin = computed((): boolean => user.value?.role === 'admin')
  
  // 类型化的actions
  const login = async (credentials: LoginCredentials): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await api.login(credentials)
      user.value = response.user
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登录失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  const updateUser = (userData: Partial<User>): void => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
    }
  }
  
  return {
    user: readonly(user),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isLoggedIn,
    isAdmin,
    login,
    updateUser
  }
})`}
                            language="typescript"
                            title="TypeScript支持"
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default VuexPiniaDetail
