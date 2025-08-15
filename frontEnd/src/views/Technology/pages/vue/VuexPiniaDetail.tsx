import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    DatabaseOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const VuexPiniaDetail: React.FC = () => {
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
                    <DatabaseOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vuex & Pinia 状态管理</h1>
                    <p>掌握Vue.js应用的状态管理方案，从Vuex到Pinia的演进</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vuex</Tag>
                        <Tag color="blue">Pinia</Tag>
                        <Tag color="orange">状态管理</Tag>
                        <Tag color="purple">Vue 3</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Vuex vs Pinia 对比 */}
                <Card title="⚖️ Vuex vs Pinia 对比" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h3>🗄️ Vuex - 传统状态管理</h3>
                                <p><strong>特点：</strong>集中式状态管理、单一状态树、严格的数据流</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h4>✅ 优势</h4>
                                        <ul>
                                            <li>成熟稳定，生态完善</li>
                                            <li>严格的状态管理模式</li>
                                            <li>强大的开发工具支持</li>
                                            <li>时间旅行调试</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h4>❌ 劣势</h4>
                                        <ul>
                                            <li>样板代码较多</li>
                                            <li>TypeScript支持不够完善</li>
                                            <li>模块化相对复杂</li>
                                            <li>学习曲线陡峭</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.comparison_item}>
                                <h3>🍍 Pinia - 现代状态管理</h3>
                                <p><strong>特点：</strong>轻量级、TypeScript友好、组合式API优先</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h4>✅ 优势</h4>
                                        <ul>
                                            <li>更少的样板代码</li>
                                            <li>完美的TypeScript支持</li>
                                            <li>组合式API设计</li>
                                            <li>更好的代码分割</li>
                                            <li>支持多个store</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h4>❌ 劣势</h4>
                                        <ul>
                                            <li>相对较新，生态还在发展</li>
                                            <li>学习资源相对较少</li>
                                            <li>某些高级功能还在完善</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Vuex 详解 */}
                <Card title="🗄️ Vuex 状态管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Vuex 基础配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// store/index.js
import { createStore } from 'vuex'
import user from './modules/user'
import products from './modules/products'

const store = createStore({
  state: {
    count: 0,
    message: 'Hello Vuex'
  },
  
  getters: {
    doubleCount: state => state.count * 2,
    countPlusOne: (state, getters) => getters.doubleCount + 1
  },
  
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    SET_MESSAGE(state, message) {
      state.message = message
    }
  },
  
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('INCREMENT')
      }, 1000)
    },
    
    async fetchUserData({ commit }, userId) {
      try {
        const response = await api.getUser(userId)
        commit('SET_USER', response.data)
      } catch (error) {
        console.error('获取用户数据失败:', error)
      }
    }
  },
  
  modules: {
    user,
    products
  }
})

export default store

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 组件中使用Vuex</h4>
                            <div className={styles.code_block}>
                                <pre>
{`<template>
  <div>
    <p>计数: {{ count }}</p>
    <p>双倍计数: {{ doubleCount }}</p>
    <p>消息: {{ message }}</p>
    
    <button @click="increment">增加</button>
    <button @click="incrementAsync">异步增加</button>
    <button @click="updateMessage">更新消息</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // 映射state
    ...mapState(['count', 'message']),
    
    // 映射getters
    ...mapGetters(['doubleCount']),
    
    // 自定义计算属性
    localComputed() {
      return this.count + 10
    }
  },
  
  methods: {
    // 映射mutations
    ...mapMutations(['INCREMENT', 'SET_MESSAGE']),
    
    // 映射actions
    ...mapActions(['incrementAsync']),
    
    // 自定义方法
    increment() {
      this.INCREMENT()
    },
    
    updateMessage() {
      this.SET_MESSAGE('新消息')
    }
  }
}
</script>

// 组合式API写法
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const count = computed(() => store.state.count)
const doubleCount = computed(() => store.getters.doubleCount)

const increment = () => store.commit('INCREMENT')
const incrementAsync = () => store.dispatch('incrementAsync')
</script>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. Vuex 模块化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// store/modules/user.js
const state = {
  currentUser: null,
  isLoggedIn: false,
  permissions: []
}

const getters = {
  userName: state => state.currentUser?.name || '游客',
  hasPermission: state => permission => {
    return state.permissions.includes(permission)
  }
}

const mutations = {
  SET_USER(state, user) {
    state.currentUser = user
    state.isLoggedIn = true
  },
  
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  },
  
  LOGOUT(state) {
    state.currentUser = null
    state.isLoggedIn = false
    state.permissions = []
  }
}

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await api.login(credentials)
      const { user, permissions } = response.data
      
      commit('SET_USER', user)
      commit('SET_PERMISSIONS', permissions)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
  
  logout({ commit }) {
    commit('LOGOUT')
    // 清除本地存储
    localStorage.removeItem('token')
  }
}

export default {
  namespaced: true, // 启用命名空间
  state,
  getters,
  mutations,
  actions
}

// 在组件中使用命名空间模块
export default {
  computed: {
    ...mapState('user', ['currentUser', 'isLoggedIn']),
    ...mapGetters('user', ['userName'])
  },
  
  methods: {
    ...mapActions('user', ['login', 'logout'])
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Pinia 详解 */}
                <Card title="🍍 Pinia 现代状态管理" className={styles.content_card}>
                    <div className={styles.pinia_section}>
                        <h3>Pinia 基础配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // 状态
  state: () => ({
    count: 0,
    message: 'Hello Pinia'
  }),
  
  // 计算属性
  getters: {
    doubleCount: (state) => state.count * 2,
    
    // 使用其他getter
    countPlusOne() {
      return this.doubleCount + 1
    },
    
    // 带参数的getter
    getCountMultiplied: (state) => {
      return (multiplier) => state.count * multiplier
    }
  },
  
  // 方法
  actions: {
    increment() {
      this.count++
    },
    
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.count++
    },
    
    setMessage(message) {
      this.message = message
    },
    
    // 异步action
    async fetchData() {
      try {
        const response = await api.getData()
        this.message = response.data.message
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    }
  }
})

// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')`}
                            </pre>
                        </div>
                        
                        <h3>组合式API风格的Store</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// stores/user.js - 组合式API风格
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 状态 (相当于state)
  const currentUser = ref(null)
  const isLoggedIn = ref(false)
  const permissions = ref([])
  
  // 计算属性 (相当于getters)
  const userName = computed(() => currentUser.value?.name || '游客')
  const hasPermission = computed(() => {
    return (permission) => permissions.value.includes(permission)
  })
  
  // 方法 (相当于actions)
  async function login(credentials) {
    try {
      const response = await api.login(credentials)
      const { user, permissions: userPermissions } = response.data
      
      currentUser.value = user
      isLoggedIn.value = true
      permissions.value = userPermissions
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  function logout() {
    currentUser.value = null
    isLoggedIn.value = false
    permissions.value = []
    localStorage.removeItem('token')
  }
  
  // 返回要暴露的内容
  return {
    currentUser,
    isLoggedIn,
    permissions,
    userName,
    hasPermission,
    login,
    logout
  }
})`}
                            </pre>
                        </div>
                        
                        <h3>在组件中使用Pinia</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<template>
  <div>
    <p>计数: {{ counter.count }}</p>
    <p>双倍计数: {{ counter.doubleCount }}</p>
    <p>消息: {{ counter.message }}</p>
    
    <button @click="counter.increment()">增加</button>
    <button @click="counter.incrementAsync()">异步增加</button>
    <button @click="updateMessage">更新消息</button>
    
    <!-- 用户信息 -->
    <div v-if="user.isLoggedIn">
      <p>欢迎, {{ user.userName }}!</p>
      <button @click="user.logout()">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

// 使用store
const counter = useCounterStore()
const user = useUserStore()

// 自定义方法
const updateMessage = () => {
  counter.setMessage('新消息来自Pinia')
}

// 解构赋值 (需要使用storeToRefs保持响应性)
import { storeToRefs } from 'pinia'

const { count, message } = storeToRefs(counter)
const { increment, setMessage } = counter // 方法不需要storeToRefs
</script>

// 选项式API写法
<script>
import { mapStores, mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default {
  computed: {
    // 映射整个store
    ...mapStores(useCounterStore),
    
    // 映射state和getters
    ...mapState(useCounterStore, ['count', 'message', 'doubleCount'])
  },
  
  methods: {
    // 映射actions
    ...mapActions(useCounterStore, ['increment', 'setMessage'])
  }
}
</script>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 高级特性 */}
                <Card title="🚀 高级特性与最佳实践" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. Pinia 插件系统</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// plugins/persistence.js - 持久化插件
export function persistencePlugin({ store }) {
  // 从localStorage恢复状态
  const stored = localStorage.getItem(store.$id)
  if (stored) {
    store.$patch(JSON.parse(stored))
  }
  
  // 监听状态变化并保存
  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
}

// main.js
import { createPinia } from 'pinia'
import { persistencePlugin } from './plugins/persistence'

const pinia = createPinia()
pinia.use(persistencePlugin)

// 使用第三方插件
import { createPersistedState } from 'pinia-plugin-persistedstate'

pinia.use(createPersistedState({
  storage: sessionStorage,
  key: id => \`pinia-\${id}\`
}))`}
                            </pre>
                        </div>
                        
                        <h3>2. Store组合与复用</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// stores/useAuth.js - 可复用的认证逻辑
import { ref } from 'vue'

export function useAuth() {
  const token = ref(localStorage.getItem('token'))
  const isAuthenticated = computed(() => !!token.value)
  
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }
  
  const clearToken = () => {
    token.value = null
    localStorage.removeItem('token')
  }
  
  return {
    token,
    isAuthenticated,
    setToken,
    clearToken
  }
}

// stores/user.js - 使用组合函数
import { defineStore } from 'pinia'
import { useAuth } from './useAuth'

export const useUserStore = defineStore('user', () => {
  const { token, isAuthenticated, setToken, clearToken } = useAuth()
  
  const currentUser = ref(null)
  
  async function login(credentials) {
    const response = await api.login(credentials)
    setToken(response.data.token)
    currentUser.value = response.data.user
  }
  
  function logout() {
    clearToken()
    currentUser.value = null
  }
  
  return {
    token,
    isAuthenticated,
    currentUser,
    login,
    logout
  }
})`}
                            </pre>
                        </div>
                        
                        <h3>3. TypeScript支持</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// types/user.ts
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface UserState {
  currentUser: User | null
  isLoggedIn: boolean
  permissions: string[]
}

// stores/user.ts
import { defineStore } from 'pinia'
import type { User, UserState } from '@/types/user'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    isLoggedIn: false,
    permissions: []
  }),
  
  getters: {
    userName: (state): string => state.currentUser?.name || '游客',
    
    hasPermission: (state) => {
      return (permission: string): boolean => {
        return state.permissions.includes(permission)
      }
    }
  },
  
  actions: {
    async login(credentials: LoginCredentials): Promise<LoginResult> {
      try {
        const response = await api.login(credentials)
        this.currentUser = response.data.user
        this.isLoggedIn = true
        this.permissions = response.data.permissions
        
        return { success: true }
      } catch (error) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : '登录失败' 
        }
      }
    }
  }
})`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 状态管理最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 选择合适的状态管理方案</h4>
                                <p>根据项目需求选择状态管理工具</p>
                                <ul>
                                    <li><strong>小型项目</strong>：使用provide/inject或组合式API</li>
                                    <li><strong>中型项目</strong>：推荐使用Pinia</li>
                                    <li><strong>大型项目</strong>：Pinia或Vuex都可以，Pinia更现代</li>
                                    <li><strong>Vue 2项目</strong>：使用Vuex 3.x</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 状态设计原则</h4>
                                <p>合理设计状态结构</p>
                                <ul>
                                    <li>保持状态扁平化，避免深层嵌套</li>
                                    <li>按功能模块划分store</li>
                                    <li>只存储真正需要共享的状态</li>
                                    <li>避免在状态中存储可计算的值</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>优化状态管理性能</p>
                                <ul>
                                    <li>使用storeToRefs保持响应性</li>
                                    <li>避免在getter中进行复杂计算</li>
                                    <li>合理使用状态持久化</li>
                                    <li>按需导入store模块</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 调试与测试</h4>
                                <p>确保状态管理的可维护性</p>
                                <ul>
                                    <li>使用Vue DevTools进行状态调试</li>
                                    <li>为actions编写单元测试</li>
                                    <li>使用TypeScript增强类型安全</li>
                                    <li>记录状态变更日志</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default VuexPiniaDetail
