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

const ReactivityDetail: React.FC = () => {
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
                    <h1>Vue 响应式原理深度解析</h1>
                    <p>深入理解Vue响应式系统的实现原理与性能优化策略</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">响应式系统</Tag>
                        <Tag color="orange">Proxy</Tag>
                        <Tag color="purple">性能优化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Vue 2 vs Vue 3 响应式对比 */}
                <Card title="🔄 Vue 2 vs Vue 3 响应式对比" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>Vue 2 - Object.defineProperty</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vue 2 响应式实现原理
function defineReactive(obj, key, val) {
  const dep = new Dep()
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      // 派发更新
      dep.notify()
    }
  })
}

// 局限性：
// 1. 无法检测对象属性的添加或删除
// 2. 无法检测数组索引和长度的变化
// 3. 需要递归遍历所有属性`}
                            </pre>
                        </div>
                        
                        <h3>Vue 3 - Proxy</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vue 3 响应式实现原理
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, 'get', key)
      const result = Reflect.get(target, key, receiver)
      
      // 深度响应式
      if (isObject(result)) {
        return reactive(result)
      }
      
      return result
    },
    
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      
      // 派发更新
      if (value !== oldValue) {
        trigger(target, 'set', key, value, oldValue)
      }
      
      return result
    },
    
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      
      if (result && hadKey) {
        trigger(target, 'delete', key)
      }
      
      return result
    }
  })
}

// 优势：
// 1. 可以检测对象属性的添加和删除
// 2. 可以检测数组索引和长度的变化
// 3. 支持 Map、Set、WeakMap、WeakSet
// 4. 更好的性能表现`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 响应式API详解 */}
                <Card title="🎯 响应式API详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. reactive() - 深度响应式对象</h4>
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

// 所有嵌套属性都是响应式的
state.user.name = 'Jane'  // 触发更新
state.todos.push({ id: 1, text: 'Learn Vue 3' })  // 触发更新

// 注意：不能解构，会失去响应性
const { count } = state  // ❌ count 不再是响应式的

// 使用 toRefs 保持响应性
import { toRefs } from 'vue'
const { count, user } = toRefs(state)  // ✅ 保持响应性`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. ref() - 基本类型响应式</h4>
                            <div className={styles.code_block}>
                                <pre>
{`import { ref } from 'vue'

// 基本类型
const count = ref(0)
const message = ref('Hello')

// 对象类型（内部使用 reactive）
const user = ref({
  name: 'John',
  age: 25
})

// 访问和修改值
console.log(count.value)  // 0
count.value = 10

// 在模板中自动解包
// <template>{{ count }}</template>  // 不需要 .value

// ref 的实现原理
class RefImpl {
  constructor(value) {
    this._value = convert(value)
  }
  
  get value() {
    track(this, 'get', 'value')
    return this._value
  }
  
  set value(newValue) {
    if (newValue !== this._value) {
      this._value = convert(newValue)
      trigger(this, 'set', 'value', newValue)
    }
  }
}`}
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

// 计算属性的缓存机制
// 只有依赖发生变化时才会重新计算
console.log(fullName.value)  // 计算并缓存
console.log(fullName.value)  // 使用缓存，不重新计算`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 依赖收集与派发更新 */}
                <Card title="🔗 依赖收集与派发更新" className={styles.content_card}>
                    <div className={styles.dependency_section}>
                        <h3>依赖收集机制</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 全局变量存储当前活跃的副作用函数
let activeEffect = null
const targetMap = new WeakMap()

// 依赖收集
function track(target, type, key) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

// 派发更新
function trigger(target, type, key, newValue, oldValue) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const effects = new Set()
  const computedRunners = new Set()
  
  // 收集需要执行的副作用函数
  if (key !== void 0) {
    addRunners(effects, computedRunners, depsMap.get(key))
  }
  
  // 执行副作用函数
  effects.forEach(effect => effect())
  computedRunners.forEach(computed => computed())
}

// 副作用函数
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    return fn()
  }
  
  effectFn.deps = []
  effectFn.options = options
  
  if (!options.lazy) {
    effectFn()
  }
  
  return effectFn
}`}
                            </pre>
                        </div>
                        
                        <h3>响应式更新流程</h3>
                        <div className={styles.flow_diagram}>
                            <div className={styles.flow_step}>
                                <h4>1. 数据变化</h4>
                                <p>用户修改响应式数据</p>
                            </div>
                            <div className={styles.flow_arrow}>↓</div>
                            <div className={styles.flow_step}>
                                <h4>2. 触发 setter</h4>
                                <p>Proxy 拦截 set 操作</p>
                            </div>
                            <div className={styles.flow_arrow}>↓</div>
                            <div className={styles.flow_step}>
                                <h4>3. 派发更新</h4>
                                <p>trigger 函数收集依赖</p>
                            </div>
                            <div className={styles.flow_arrow}>↓</div>
                            <div className={styles.flow_step}>
                                <h4>4. 执行副作用</h4>
                                <p>重新执行相关的副作用函数</p>
                            </div>
                            <div className={styles.flow_arrow}>↓</div>
                            <div className={styles.flow_step}>
                                <h4>5. 更新视图</h4>
                                <p>组件重新渲染</p>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 性能优化 */}
                <Card title="⚡ 性能优化策略" className={styles.content_card}>
                    <div className={styles.optimization_section}>
                        <h3>1. shallowReactive - 浅层响应式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`import { shallowReactive } from 'vue'

// 只有根级别的属性是响应式的
const state = shallowReactive({
  count: 0,
  user: {
    name: 'John',  // 不是响应式的
    age: 25        // 不是响应式的
  }
})

state.count++        // 触发更新
state.user.name = 'Jane'  // 不会触发更新
state.user = { name: 'Jane', age: 26 }  // 触发更新`}
                            </pre>
                        </div>
                        
                        <h3>2. readonly - 只读响应式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`import { reactive, readonly } from 'vue'

const original = reactive({ count: 0 })
const copy = readonly(original)

original.count++  // 正常工作
copy.count++      // 警告：无法修改只读属性`}
                            </pre>
                        </div>
                        
                        <h3>3. markRaw - 标记非响应式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`import { reactive, markRaw } from 'vue'

const foo = markRaw({
  nested: {}
})

const bar = reactive({
  foo  // foo 不会被转换为响应式
})

// 适用场景：
// - 第三方库实例
// - 大型不可变数据结构
// - 跳过响应式转换以提升性能`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 响应式最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 合理选择响应式API</h4>
                                <p>根据数据特点选择合适的响应式API</p>
                                <ul>
                                    <li><strong>ref()</strong>：基本类型、单个值</li>
                                    <li><strong>reactive()</strong>：对象、数组</li>
                                    <li><strong>shallowReactive()</strong>：大型对象的浅层响应</li>
                                    <li><strong>readonly()</strong>：不需要修改的数据</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 避免不必要的响应式转换</h4>
                                <p>对于不需要响应式的数据，使用markRaw()标记</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 第三方库实例
const chart = markRaw(new Chart())

// 大型静态数据
const staticData = markRaw(largeDataSet)`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 正确解构响应式对象</h4>
                                <p>使用toRefs()保持解构后的响应性</p>
                                <div className={styles.code_block}>
                                    <pre>
{`import { reactive, toRefs } from 'vue'

const state = reactive({ count: 0, name: 'Vue' })

// ❌ 失去响应性
const { count, name } = state

// ✅ 保持响应性
const { count, name } = toRefs(state)`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ReactivityDetail
