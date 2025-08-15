import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ThunderboltOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const PerformanceDetail: React.FC = () => {
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
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue.js 性能优化详解</h1>
                    <p>掌握Vue应用的性能优化技巧，提升用户体验</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">性能优化</Tag>
                        <Tag color="orange">最佳实践</Tag>
                        <Tag color="purple">用户体验</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 渲染性能优化 */}
                <Card title="🚀 渲染性能优化" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>1. 虚拟DOM优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<!-- ❌ 避免在模板中使用复杂表达式 -->
<template>
  <div>
    {{ items.filter(item => item.active).map(item => item.name.toUpperCase()).join(', ') }}
  </div>
</template>

<!-- ✅ 使用计算属性 -->
<template>
  <div>{{ activeItemNames }}</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['items'])

const activeItemNames = computed(() => {
  return props.items
    .filter(item => item.active)
    .map(item => item.name.toUpperCase())
    .join(', ')
})
</script>

<!-- ✅ 使用key优化列表渲染 -->
<template>
  <div>
    <!-- ❌ 没有key -->
    <div v-for="item in items">{{ item.name }}</div>
    
    <!-- ✅ 使用唯一key -->
    <div v-for="item in items" :key="item.id">{{ item.name }}</div>
    
    <!-- ✅ 对于静态列表，使用索引作为key -->
    <div v-for="(item, index) in staticItems" :key="index">{{ item }}</div>
  </div>
</template>`}
                            </pre>
                        </div>
                        
                        <h3>2. 组件更新优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<!-- 使用v-memo缓存子树 (Vue 3.2+) -->
<template>
  <div v-for="item in list" :key="item.id" v-memo="[item.id, item.selected]">
    <p>{{ item.name }}</p>
    <p>{{ item.description }}</p>
    <button @click="select(item)">选择</button>
  </div>
</template>

<!-- 使用v-once渲染一次性内容 -->
<template>
  <div>
    <!-- 只渲染一次的静态内容 -->
    <h1 v-once>{{ title }}</h1>
    
    <!-- 昂贵的操作只执行一次 -->
    <div v-once>
      {{ expensiveCalculation() }}
    </div>
  </div>
</template>

<script setup>
// 使用shallowRef减少深度响应式开销
import { shallowRef, triggerRef } from 'vue'

const largeList = shallowRef([])

// 更新整个数组时手动触发更新
function updateList(newList) {
  largeList.value = newList
  triggerRef(largeList)
}

// 使用markRaw标记非响应式对象
import { markRaw } from 'vue'

const nonReactiveData = markRaw({
  heavyObject: new HeavyClass(),
  staticConfig: { /* 大量配置 */ }
})
</script>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 组件优化 */}
                <Card title="🧩 组件优化策略" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 异步组件与代码分割</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 异步组件定义
import { defineAsyncComponent } from 'vue'

// 基本异步组件
const AsyncComponent = defineAsyncComponent(() => 
  import('./components/HeavyComponent.vue')
)

// 带加载状态的异步组件
const AsyncComponentWithOptions = defineAsyncComponent({
  loader: () => import('./components/HeavyComponent.vue'),
  
  // 加载中显示的组件
  loadingComponent: LoadingComponent,
  
  // 加载失败显示的组件
  errorComponent: ErrorComponent,
  
  // 显示加载组件前的延迟时间
  delay: 200,
  
  // 超时时间
  timeout: 3000
})

// 在路由中使用异步组件
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue')
  },
  {
    path: '/reports',
    component: () => import(
      /* webpackChunkName: "reports" */ 
      './views/Reports.vue'
    )
  }
]

// 条件性加载组件
<template>
  <div>
    <button @click="showHeavyComponent = true">加载重型组件</button>
    <Suspense v-if="showHeavyComponent">
      <template #default>
        <HeavyAsyncComponent />
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>
  </div>
</template>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. KeepAlive缓存优化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`<!-- 基本KeepAlive使用 -->
<template>
  <KeepAlive>
    <component :is="currentComponent" />
  </KeepAlive>
</template>

<!-- 条件性缓存 -->
<template>
  <KeepAlive :include="['ComponentA', 'ComponentB']">
    <component :is="currentComponent" />
  </KeepAlive>
</template>

<!-- 排除特定组件 -->
<template>
  <KeepAlive :exclude="['NoCache']">
    <component :is="currentComponent" />
  </KeepAlive>
</template>

<!-- 限制缓存数量 -->
<template>
  <KeepAlive :max="10">
    <component :is="currentComponent" />
  </KeepAlive>
</template>

<!-- 在组件中处理缓存生命周期 -->
<script setup>
import { onActivated, onDeactivated } from 'vue'

// 组件被激活时调用
onActivated(() => {
  console.log('组件被激活')
  // 刷新数据、重新订阅事件等
})

// 组件被缓存时调用
onDeactivated(() => {
  console.log('组件被缓存')
  // 清理定时器、取消订阅等
})
</script>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 函数式组件优化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 函数式组件 - 无状态、无实例
const FunctionalComponent = (props, { slots, emit, attrs }) => {
  return h('div', {
    class: 'functional-component',
    onClick: () => emit('click')
  }, [
    h('span', props.title),
    slots.default?.()
  ])
}

// 设置为函数式组件
FunctionalComponent.props = ['title']

// 使用渲染函数优化简单组件
import { h } from 'vue'

export default {
  name: 'SimpleList',
  props: ['items'],
  render() {
    return h('ul', 
      this.items.map(item => 
        h('li', { key: item.id }, item.name)
      )
    )
  }
}

// 使用JSX (需要配置)
export default {
  name: 'JSXComponent',
  props: ['items'],
  render() {
    return (
      <ul>
        {this.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 响应式优化 */}
                <Card title="⚡ 响应式系统优化" className={styles.content_card}>
                    <div className={styles.reactive_section}>
                        <h3>1. 合理选择响应式API</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<script setup>
import { ref, reactive, shallowRef, shallowReactive, readonly, markRaw } from 'vue'

// ✅ 基本类型使用ref
const count = ref(0)
const message = ref('Hello')

// ✅ 对象使用reactive
const user = reactive({
  name: 'John',
  age: 30
})

// ✅ 大型对象使用shallowReactive (只有根级别响应式)
const largeObject = shallowReactive({
  data: {
    // 这个嵌套对象不是响应式的
    items: new Array(10000).fill(0).map((_, i) => ({ id: i, value: i }))
  },
  meta: {
    total: 10000
  }
})

// ✅ 大型数组使用shallowRef
const largeArray = shallowRef([])

// 更新时需要替换整个数组
function updateArray(newItems) {
  largeArray.value = [...largeArray.value, ...newItems]
}

// ✅ 只读数据使用readonly
const config = readonly({
  apiUrl: 'https://api.example.com',
  timeout: 5000
})

// ✅ 第三方库实例使用markRaw
const chart = markRaw(new Chart())
const map = markRaw(new GoogleMap())
</script>`}
                            </pre>
                        </div>
                        
                        <h3>2. 计算属性优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<script setup>
import { computed, ref } from 'vue'

const items = ref([])
const filter = ref('')
const sortBy = ref('name')

// ✅ 缓存昂贵的计算
const expensiveComputed = computed(() => {
  console.log('执行昂贵的计算') // 只在依赖变化时执行
  return items.value
    .filter(item => item.name.includes(filter.value))
    .sort((a, b) => a[sortBy.value].localeCompare(b[sortBy.value]))
    .map(item => ({
      ...item,
      displayName: item.name.toUpperCase()
    }))
})

// ✅ 分层计算属性
const filteredItems = computed(() => {
  return items.value.filter(item => item.name.includes(filter.value))
})

const sortedItems = computed(() => {
  return filteredItems.value.sort((a, b) => 
    a[sortBy.value].localeCompare(b[sortBy.value])
  )
})

// ❌ 避免在计算属性中进行副作用操作
const badComputed = computed(() => {
  // ❌ 不要在计算属性中修改其他状态
  // someOtherRef.value = 'changed'
  
  // ❌ 不要在计算属性中发起网络请求
  // fetch('/api/data')
  
  return items.value.length
})

// ✅ 使用getter和setter的计算属性
const fullName = computed({
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  set(value) {
    const names = value.split(' ')
    firstName.value = names[0]
    lastName.value = names[1]
  }
})
</script>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 内存优化 */}
                <Card title="🧠 内存优化与资源管理" className={styles.content_card}>
                    <div className={styles.memory_section}>
                        <h3>1. 事件监听器清理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<script setup>
import { onMounted, onUnmounted } from 'vue'

// ✅ 正确清理事件监听器
onMounted(() => {
  const handleResize = () => {
    // 处理窗口大小变化
  }
  
  const handleScroll = () => {
    // 处理滚动事件
  }
  
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
  
  // 组件卸载时清理
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll)
  })
})

// ✅ 清理定时器
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    // 定时任务
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// ✅ 清理观察者
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    // 处理交叉观察
  })
  
  const target = document.querySelector('.target')
  if (target) {
    observer.observe(target)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>`}
                            </pre>
                        </div>
                        
                        <h3>2. 大列表虚拟滚动</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<!-- 虚拟滚动组件示例 -->
<template>
  <div class="virtual-list" @scroll="handleScroll" ref="containerRef">
    <div class="virtual-list-phantom" :style="{ height: totalHeight + 'px' }"></div>
    <div class="virtual-list-content" :style="{ transform: \`translateY(\${offsetY}px)\` }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="virtual-list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        <slot :item="item" :index="item.index"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  items: Array,
  itemHeight: { type: Number, default: 50 },
  containerHeight: { type: Number, default: 300 }
})

const containerRef = ref()
const scrollTop = ref(0)

// 计算总高度
const totalHeight = computed(() => props.items.length * props.itemHeight)

// 计算可见区域的起始索引
const startIndex = computed(() => 
  Math.floor(scrollTop.value / props.itemHeight)
)

// 计算可见区域的结束索引
const endIndex = computed(() => 
  Math.min(
    startIndex.value + Math.ceil(props.containerHeight / props.itemHeight) + 1,
    props.items.length
  )
)

// 计算可见的项目
const visibleItems = computed(() => 
  props.items.slice(startIndex.value, endIndex.value).map((item, index) => ({
    ...item,
    index: startIndex.value + index
  }))
)

// 计算偏移量
const offsetY = computed(() => startIndex.value * props.itemHeight)

// 处理滚动事件
const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}
</script>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 构建优化 */}
                <Card title="📦 构建与加载优化" className={styles.content_card}>
                    <div className={styles.build_section}>
                        <h3>1. 代码分割策略</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// vite.config.js / webpack.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将Vue相关库打包到一个chunk
          vue: ['vue', 'vue-router', 'pinia'],
          
          // 将UI库单独打包
          ui: ['element-plus', 'ant-design-vue'],
          
          // 将工具库单独打包
          utils: ['lodash', 'dayjs', 'axios']
        }
      }
    }
  }
}

// 路由级别的代码分割
const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    component: () => import(
      /* webpackChunkName: "about" */
      './views/About.vue'
    )
  }
]

// 组件级别的代码分割
<script setup>
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
)
</script>`}
                            </pre>
                        </div>
                        
                        <h3>2. 资源优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<!-- 图片懒加载 -->
<template>
  <img 
    v-lazy="imageSrc" 
    :alt="imageAlt"
    loading="lazy"
  />
</template>

<!-- 预加载关键资源 -->
<template>
  <div>
    <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="prefetch" href="/api/user-data">
  </div>
</template>

<script setup>
// 动态导入优化
const loadFeature = async () => {
  const { default: Feature } = await import('./Feature.vue')
  return Feature
}

// 资源预加载
const preloadImages = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  })
}

// 使用Web Workers处理重任务
const processDataInWorker = (data) => {
  return new Promise((resolve) => {
    const worker = new Worker('/workers/data-processor.js')
    worker.postMessage(data)
    worker.onmessage = (e) => {
      resolve(e.data)
      worker.terminate()
    }
  })
}
</script>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 性能优化最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 性能监控</h4>
                                <p>建立完善的性能监控体系</p>
                                <ul>
                                    <li>使用Vue DevTools分析组件性能</li>
                                    <li>监控首屏加载时间和交互响应时间</li>
                                    <li>使用Performance API测量关键指标</li>
                                    <li>设置性能预算和告警机制</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 渐进式优化</h4>
                                <p>采用渐进式的优化策略</p>
                                <ul>
                                    <li>先优化影响最大的性能瓶颈</li>
                                    <li>使用性能分析工具定位问题</li>
                                    <li>在优化前后进行性能对比</li>
                                    <li>避免过度优化影响代码可读性</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 用户体验优先</h4>
                                <p>以用户体验为中心进行优化</p>
                                <ul>
                                    <li>优化首屏加载体验</li>
                                    <li>提供适当的加载状态反馈</li>
                                    <li>实现骨架屏和占位符</li>
                                    <li>优化交互响应速度</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 持续优化</h4>
                                <p>建立持续的性能优化流程</p>
                                <ul>
                                    <li>定期进行性能审计</li>
                                    <li>在CI/CD中集成性能检查</li>
                                    <li>关注Vue.js版本更新带来的性能改进</li>
                                    <li>收集用户反馈优化体验</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PerformanceDetail
