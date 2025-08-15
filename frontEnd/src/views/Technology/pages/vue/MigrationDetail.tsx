import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    SwapOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const MigrationDetail: React.FC = () => {
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
                    <SwapOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue 2 到 Vue 3 迁移指南</h1>
                    <p>掌握Vue 2到Vue 3的平滑迁移策略与最佳实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="red">Vue 2</Tag>
                        <Tag color="green">Vue 3</Tag>
                        <Tag color="blue">迁移指南</Tag>
                        <Tag color="orange">升级策略</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 迁移概览 */}
                <Card title="📋 迁移概览" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>Vue 3 主要变化</h3>
                        <div className={styles.changes_grid}>
                            <div className={styles.change_item}>
                                <h4>🚀 性能提升</h4>
                                <ul>
                                    <li>更小的包体积</li>
                                    <li>更快的渲染速度</li>
                                    <li>更好的Tree-shaking</li>
                                    <li>Proxy响应式系统</li>
                                </ul>
                            </div>
                            
                            <div className={styles.change_item}>
                                <h4>🎯 组合式API</h4>
                                <ul>
                                    <li>更好的逻辑复用</li>
                                    <li>更好的TypeScript支持</li>
                                    <li>更灵活的代码组织</li>
                                    <li>更好的类型推断</li>
                                </ul>
                            </div>
                            
                            <div className={styles.change_item}>
                                <h4>🔧 新特性</h4>
                                <ul>
                                    <li>Fragment支持</li>
                                    <li>Teleport组件</li>
                                    <li>Suspense组件</li>
                                    <li>多根节点组件</li>
                                </ul>
                            </div>
                            
                            <div className={styles.change_item}>
                                <h4>⚠️ 破坏性变更</h4>
                                <ul>
                                    <li>全局API变更</li>
                                    <li>生命周期变更</li>
                                    <li>指令变更</li>
                                    <li>事件API变更</li>
                                </ul>
                            </div>
                        </div>
                        
                        <Alert
                            message="迁移建议"
                            description="建议采用渐进式迁移策略，先升级构建工具和依赖，再逐步迁移组件和API。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>
                
                {/* 迁移准备 */}
                <Card title="🛠️ 迁移准备工作" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 环境检查</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 检查当前Vue版本
npm list vue

# 检查依赖兼容性
npm install @vue/compat-check
npx vue-compat-check

# 更新Node.js版本 (Vue 3需要Node.js 12+)
node --version

# 检查第三方库兼容性
# 查看库的Vue 3兼容版本
npm info vue-router versions --json
npm info vuex versions --json

# 创建迁移分支
git checkout -b vue3-migration
git push -u origin vue3-migration`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 依赖升级</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 升级Vue核心库
npm install vue@next

# 升级相关生态库
npm install vue-router@4
npm install pinia  # 替代Vuex
npm install @vue/test-utils@next

# 升级构建工具
npm install @vitejs/plugin-vue
# 或者
npm install vue-loader@next @vue/compiler-sfc

# 升级开发工具
npm install @vue/devtools@beta

# package.json示例
{
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.0",
    "@vue/test-utils": "^2.4.0"
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 构建配置更新</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// vite.config.js (推荐)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})

// webpack.config.js (如果使用webpack)
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [
      {
        test: /\\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

// 更新入口文件
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 核心API迁移 */}
                <Card title="🔄 核心API迁移" className={styles.content_card}>
                    <div className={styles.api_migration_section}>
                        <h3>1. 全局API变更</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vue 2
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(router)
Vue.use(store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Vue 3
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')

// 全局属性
// Vue 2
Vue.prototype.$http = axios
Vue.prototype.$eventBus = new Vue()

// Vue 3
const app = createApp(App)
app.config.globalProperties.$http = axios
app.provide('eventBus', mitt()) // 使用mitt替代事件总线

// 全局组件
// Vue 2
Vue.component('MyComponent', MyComponent)

// Vue 3
app.component('MyComponent', MyComponent)`}
                            </pre>
                        </div>
                        
                        <h3>2. 组件API迁移</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<!-- Vue 2 选项式API -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vue 2 Component',
      count: 0
    }
  },
  
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  
  methods: {
    increment() {
      this.count++
    }
  },
  
  mounted() {
    console.log('Component mounted')
  }
}
</script>

<!-- Vue 3 组合式API -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const title = ref('Vue 3 Component')
const count = ref(0)

const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

onMounted(() => {
  console.log('Component mounted')
})
</script>

<!-- Vue 3 兼容选项式API -->
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      title: 'Vue 3 Component',
      count: 0
    }
  },
  
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  
  methods: {
    increment() {
      this.count++
    }
  },
  
  mounted() {
    console.log('Component mounted')
  }
})
</script>`}
                            </pre>
                        </div>
                        
                        <h3>3. 生命周期变更</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vue 2 生命周期
export default {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},  // 已更名
  destroyed() {}       // 已更名
}

// Vue 3 选项式API
export default {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},  // 新名称
  unmounted() {}       // 新名称
}

// Vue 3 组合式API
import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default {
  setup() {
    // 注意：没有onBeforeCreate和onCreated
    // setup()相当于beforeCreate和created
    
    onBeforeMount(() => {
      console.log('Before mount')
    })
    
    onMounted(() => {
      console.log('Mounted')
    })
    
    onBeforeUpdate(() => {
      console.log('Before update')
    })
    
    onUpdated(() => {
      console.log('Updated')
    })
    
    onBeforeUnmount(() => {
      console.log('Before unmount')
    })
    
    onUnmounted(() => {
      console.log('Unmounted')
    })
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 路由和状态管理迁移 */}
                <Card title="🛣️ 路由和状态管理迁移" className={styles.content_card}>
                    <div className={styles.router_store_section}>
                        <h3>1. Vue Router 4迁移</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vue Router 3 (Vue 2)
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

// Vue Router 4 (Vue 3)
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// 在组件中使用
// Vue 2
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about')
    }
  },
  
  computed: {
    currentRoute() {
      return this.$route.path
    }
  }
}

// Vue 3 组合式API
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const goToAbout = () => {
      router.push('/about')
    }
    
    const currentRoute = computed(() => route.path)
    
    return {
      goToAbout,
      currentRoute
    }
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>2. 状态管理迁移 (Vuex to Pinia)</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vuex 4 (Vue 3兼容)
import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0
  },
  
  mutations: {
    increment(state) {
      state.count++
    }
  },
  
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})

// 在组件中使用Vuex
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    
    const count = computed(() => store.state.count)
    const increment = () => store.commit('increment')
    
    return { count, increment }
  }
}

// 迁移到Pinia
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  
  actions: {
    increment() {
      this.count++
    },
    
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.count++
    }
  }
})

// 在组件中使用Pinia
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counterStore = useCounterStore()
    
    return {
      count: computed(() => counterStore.count),
      increment: counterStore.increment
    }
  }
}

// 或者使用storeToRefs
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const counterStore = useCounterStore()
    const { count } = storeToRefs(counterStore)
    const { increment } = counterStore
    
    return {
      count,
      increment
    }
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 常见问题解决 */}
                <Card title="🔧 常见问题解决" className={styles.content_card}>
                    <div className={styles.issues_section}>
                        <h3>1. 事件总线替代</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vue 2 事件总线
// eventBus.js
import Vue from 'vue'
export default new Vue()

// 使用
import EventBus from '@/utils/eventBus'

// 发送事件
EventBus.$emit('user-updated', userData)

// 监听事件
EventBus.$on('user-updated', (userData) => {
  // 处理事件
})

// Vue 3 替代方案 - 使用mitt
npm install mitt

// eventBus.js
import mitt from 'mitt'
export default mitt()

// 使用
import eventBus from '@/utils/eventBus'

// 发送事件
eventBus.emit('user-updated', userData)

// 监听事件
eventBus.on('user-updated', (userData) => {
  // 处理事件
})

// 在组件中使用
import { onUnmounted } from 'vue'
import eventBus from '@/utils/eventBus'

export default {
  setup() {
    const handleUserUpdate = (userData) => {
      console.log('User updated:', userData)
    }
    
    eventBus.on('user-updated', handleUserUpdate)
    
    // 清理事件监听器
    onUnmounted(() => {
      eventBus.off('user-updated', handleUserUpdate)
    })
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>2. 过滤器替代</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<!-- Vue 2 过滤器 -->
<template>
  <div>
    {{ message | capitalize }}
    {{ price | currency }}
  </div>
</template>

<script>
export default {
  filters: {
    capitalize(value) {
      if (!value) return ''
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    
    currency(value) {
      return '$' + value.toFixed(2)
    }
  }
}
</script>

<!-- Vue 3 替代方案 - 使用计算属性或方法 -->
<template>
  <div>
    {{ capitalizedMessage }}
    {{ formatCurrency(price) }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['message', 'price'])

const capitalizedMessage = computed(() => {
  if (!props.message) return ''
  return props.message.toString().charAt(0).toUpperCase() + props.message.slice(1)
})

const formatCurrency = (value) => {
  return '$' + value.toFixed(2)
}
</script>

// 全局过滤器替代 - 使用全局属性
// main.js
const app = createApp(App)

app.config.globalProperties.$filters = {
  capitalize(value) {
    if (!value) return ''
    return value.toString().charAt(0).toUpperCase() + value.slice(1)
  },
  
  currency(value) {
    return '$' + value.toFixed(2)
  }
}

// 在组件中使用
<template>
  <div>
    {{ $filters.capitalize(message) }}
    {{ $filters.currency(price) }}
  </div>
</template>`}
                            </pre>
                        </div>
                        
                        <h3>3. 第三方库兼容性</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 检查库的Vue 3兼容性
// 常见库的Vue 3版本

// UI库
"element-plus": "^2.3.0",        // Element UI的Vue 3版本
"ant-design-vue": "^3.2.0",     // Ant Design Vue 3版本
"vuetify": "^3.3.0",            // Vuetify 3
"quasar": "^2.12.0",            // Quasar 2

// 工具库
"vue-i18n": "^9.2.0",           // 国际化
"vueuse": "^10.2.0",            // Vue组合式工具库
"vue-chartjs": "^5.2.0",        // 图表库

// 如果库不兼容Vue 3，寻找替代方案
// Vue 2: vue-awesome-swiper
// Vue 3: swiper/vue

// Vue 2: vue-lazyload
// Vue 3: vue3-lazyload

// 创建兼容性适配器
// 对于不兼容的库，可以创建适配器
const LegacyComponent = {
  mounted() {
    // 初始化第三方库
    this.initLegacyLibrary()
  },
  
  beforeUnmount() {
    // 清理第三方库
    this.destroyLegacyLibrary()
  },
  
  methods: {
    initLegacyLibrary() {
      // 初始化逻辑
    },
    
    destroyLegacyLibrary() {
      // 清理逻辑
    }
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 迁移最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 渐进式迁移策略</h4>
                                <p>采用分阶段的迁移方法</p>
                                <ul>
                                    <li>第一阶段：升级构建工具和核心依赖</li>
                                    <li>第二阶段：迁移路由和状态管理</li>
                                    <li>第三阶段：逐个迁移组件</li>
                                    <li>第四阶段：优化和清理</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 测试驱动迁移</h4>
                                <p>确保迁移过程的稳定性</p>
                                <ul>
                                    <li>在迁移前编写完整的测试用例</li>
                                    <li>每个迁移步骤后运行测试</li>
                                    <li>使用E2E测试验证用户流程</li>
                                    <li>建立回归测试机制</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能监控</h4>
                                <p>监控迁移前后的性能变化</p>
                                <ul>
                                    <li>建立性能基准测试</li>
                                    <li>监控包大小变化</li>
                                    <li>测试运行时性能</li>
                                    <li>收集用户反馈</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队协作</h4>
                                <p>确保团队顺利过渡</p>
                                <ul>
                                    <li>制定详细的迁移计划</li>
                                    <li>提供Vue 3培训</li>
                                    <li>建立代码审查流程</li>
                                    <li>更新开发文档</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default MigrationDetail
