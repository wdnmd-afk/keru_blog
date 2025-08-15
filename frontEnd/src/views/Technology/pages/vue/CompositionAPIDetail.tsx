import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    RocketOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const CompositionAPIDetail: React.FC = () => {
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
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Composition API 深度解析</h1>
                    <p>Vue 3组合式API的核心概念与实践应用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue 3</Tag>
                        <Tag color="blue">Composition API</Tag>
                        <Tag color="orange">响应式</Tag>
                        <Tag color="purple">组合式</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 Composition API 基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Composition API？</h3>
                        <p>Composition API是Vue 3引入的一套新的API，它提供了一种更灵活的方式来组织组件逻辑。通过组合函数的方式，可以更好地复用逻辑，提高代码的可维护性。</p>
                        
                        <h3>基本语法</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<template>
  <div>
    <p>计数: {{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 返回模板需要的数据和方法
    return {
      count,
      doubleCount,
      increment
    }
  }
}
</script>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 核心API */}
                <Card title="🎯 核心API详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. ref() - 基本响应式引用</h4>
                            <div className={styles.code_block}>
                                <pre>
{`import { ref } from 'vue'

// 基本类型
const count = ref(0)
const message = ref('Hello')

// 对象类型
const user = ref({
  name: 'John',
  age: 25
})

// 访问值需要使用 .value
console.log(count.value) // 0
count.value = 10

// 在模板中自动解包，不需要 .value
// <template>{{ count }}</template>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. reactive() - 响应式对象</h4>
                            <div className={styles.code_block}>
                                <pre>
{`import { reactive } from 'vue'

// 创建响应式对象
const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 25
  },
  todos: []
})

// 直接访问属性，无需 .value
state.count++
state.user.name = 'Jane'
state.todos.push({ id: 1, text: '学习Vue 3' })

// 注意：不能解构，会失去响应性
// const { count } = state // ❌ 失去响应性

// 使用 toRefs 解构
import { toRefs } from 'vue'
const { count, user } = toRefs(state) // ✅ 保持响应性`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. computed() - 计算属性</h4>
                            <div className={styles.code_block}>
                                <pre>
{`import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 只读计算属性
const fullName = computed(() => {
  return \`\${firstName.value} \${lastName.value}\`
})

// 可写计算属性
const fullNameWritable = computed({
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  set(value) {
    const names = value.split(' ')
    firstName.value = names[0]
    lastName.value = names[1]
  }
})

// 使用
console.log(fullName.value) // "John Doe"
fullNameWritable.value = "Jane Smith" // 会更新 firstName 和 lastName`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 生命周期钩子 */}
                <Card title="🔄 生命周期钩子" className={styles.content_card}>
                    <div className={styles.lifecycle_section}>
                        <h3>Composition API中的生命周期</h3>
                        <div className={styles.code_block}>
                            <pre>
{`import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件挂载前')
    })
    
    onMounted(() => {
      console.log('组件已挂载')
      // DOM操作
    })
    
    onBeforeUpdate(() => {
      console.log('组件更新前')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    onBeforeUnmount(() => {
      console.log('组件卸载前')
      // 清理工作
    })
    
    onUnmounted(() => {
      console.log('组件已卸载')
    })
    
    onErrorCaptured((err, instance, info) => {
      console.log('捕获错误:', err)
      return false // 阻止错误继续传播
    })
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 逻辑组合与复用</h4>
                                <p>将相关的逻辑组合在一起，创建可复用的组合函数</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// composables/useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    increment,
    decrement,
    reset
  }
}

// 在组件中使用
import { useCounter } from './composables/useCounter'

export default {
  setup() {
    const { count, increment, decrement, reset } = useCounter(10)
    
    return {
      count,
      increment,
      decrement,
      reset
    }
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 响应式数据的选择</h4>
                                <p>根据数据类型选择合适的响应式API</p>
                                <ul>
                                    <li><strong>ref()</strong>：基本类型、单个值</li>
                                    <li><strong>reactive()</strong>：对象、数组</li>
                                    <li><strong>computed()</strong>：派生状态</li>
                                    <li><strong>readonly()</strong>：只读数据</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CompositionAPIDetail
