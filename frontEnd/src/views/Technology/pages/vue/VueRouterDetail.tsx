import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    LinkOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const VueRouterDetail: React.FC = () => {
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
                    <LinkOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue Router 路由管理</h1>
                    <p>掌握Vue.js官方路由管理器的使用与高级特性</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue Router</Tag>
                        <Tag color="blue">单页应用</Tag>
                        <Tag color="orange">路由管理</Tag>
                        <Tag color="purple">导航守卫</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础配置 */}
                <Card title="⚙️ Vue Router 基础配置" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>安装与基本设置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装 Vue Router
npm install vue-router@4

# main.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 导入组件
import Home from './views/Home.vue'
import About from './views/About.vue'
import User from './views/User.vue'

// 定义路由
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:id', component: User }
]

// 创建路由器实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 创建应用实例
const app = createApp(App)

// 使用路由器
app.use(router)

app.mount('#app')`}
                            </pre>
                        </div>
                        
                        <h3>基本模板使用</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <!-- 使用 router-link 组件进行导航 -->
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/user/123">用户</router-link>
    </nav>
    
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view />
  </div>
</template>

<style>
/* 激活的链接样式 */
.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}
</style>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 动态路由 */}
                <Card title="🔄 动态路由与参数" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 路径参数</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 路由配置
const routes = [
  // 动态路径参数 以冒号开头
  { path: '/user/:id', component: User },
  { path: '/user/:id/post/:postId', component: Post },
  
  // 可选参数
  { path: '/user/:id?', component: User },
  
  // 通配符
  { path: '/user-*', component: User },
  
  // 正则表达式
  { path: '/user/:id(\\\\d+)', component: User }, // 只匹配数字
]

// User.vue 组件中获取参数
<template>
  <div>
    <h1>用户 ID: {{ $route.params.id }}</h1>
    <p>文章 ID: {{ $route.params.postId }}</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    
    // 响应式地获取参数
    const userId = computed(() => route.params.id)
    const postId = computed(() => route.params.postId)
    
    return {
      userId,
      postId
    }
  }
}
</script>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 查询参数与Hash</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 查询参数示例: /search?q=vue&category=tutorial
<template>
  <div>
    <p>搜索关键词: {{ $route.query.q }}</p>
    <p>分类: {{ $route.query.category }}</p>
    <p>Hash: {{ $route.hash }}</p>
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute()
    
    // 监听路由变化
    watch(
      () => route.query,
      (newQuery, oldQuery) => {
        console.log('查询参数变化:', newQuery)
        // 根据查询参数更新数据
        fetchData(newQuery)
      }
    )
    
    const fetchData = (query) => {
      // 根据查询参数获取数据
      console.log('获取数据:', query)
    }
    
    return {}
  }
}
</script>

// 编程式导航传递参数
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    const goToUser = (userId) => {
      // 使用路径
      router.push(\`/user/\${userId}\`)
      
      // 使用对象
      router.push({
        path: '/user',
        query: { id: userId, tab: 'profile' }
      })
      
      // 使用命名路由
      router.push({
        name: 'user',
        params: { id: userId },
        query: { tab: 'profile' }
      })
    }
    
    return { goToUser }
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 嵌套路由 */}
                <Card title="🏗️ 嵌套路由" className={styles.content_card}>
                    <div className={styles.nested_section}>
                        <h3>嵌套路由配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 路由配置
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 空路径表示默认子路由
      { path: '', component: UserHome },
      
      // /user/:id/profile
      { path: 'profile', component: UserProfile },
      
      // /user/:id/posts
      { path: 'posts', component: UserPosts },
      
      // 嵌套的动态路由
      { path: 'posts/:postId', component: UserPost }
    ]
  }
]

// User.vue 父组件
<template>
  <div class="user">
    <h2>用户 {{ $route.params.id }}</h2>
    
    <nav>
      <router-link :to="\`/user/\${$route.params.id}\`">首页</router-link>
      <router-link :to="\`/user/\${$route.params.id}/profile\`">个人资料</router-link>
      <router-link :to="\`/user/\${$route.params.id}/posts\`">文章列表</router-link>
    </nav>
    
    <!-- 子路由出口 -->
    <router-view />
  </div>
</template>

// UserProfile.vue 子组件
<template>
  <div class="user-profile">
    <h3>用户资料</h3>
    <p>用户ID: {{ $route.params.id }}</p>
    <!-- 用户资料内容 -->
  </div>
</template>`}
                            </pre>
                        </div>
                        
                        <h3>命名视图</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 多个视图的路由配置
const routes = [
  {
    path: '/dashboard',
    components: {
      default: Dashboard,
      sidebar: Sidebar,
      header: Header
    }
  }
]

// 模板中使用命名视图
<template>
  <div>
    <router-view name="header" />
    <div class="main-content">
      <router-view name="sidebar" />
      <router-view /> <!-- 默认视图 -->
    </div>
  </div>
</template>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 导航守卫 */}
                <Card title="🛡️ 导航守卫" className={styles.content_card}>
                    <div className={styles.guards_section}>
                        <h3>全局守卫</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('导航到:', to.path)
  
  // 检查用户是否已登录
  if (to.meta.requiresAuth && !isLoggedIn()) {
    // 重定向到登录页
    next('/login')
  } else {
    next() // 继续导航
  }
})

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  // 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后调用
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 导航完成后调用
  // 更新页面标题
  document.title = to.meta.title || 'My App'
  
  // 发送页面浏览统计
  analytics.track('page_view', { path: to.path })
})

// 路由配置中的元信息
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: { 
      requiresAuth: true,
      title: '管理后台',
      roles: ['admin']
    }
  }
]`}
                            </pre>
                        </div>
                        
                        <h3>路由独享守卫</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      // 只对这个路由生效
      if (hasAdminPermission()) {
        next()
      } else {
        next('/unauthorized')
      }
    }
  }
]

// 组件内守卫
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被确认前调用
    // 不能获取组件实例 \`this\`，因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // 通过 \`vm\` 访问组件实例
      vm.fetchData()
    })
  },
  
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 例如，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候
    this.fetchData(to.params.id)
    next()
  },
  
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    if (this.hasUnsavedChanges) {
      const answer = window.confirm('你有未保存的更改，确定要离开吗？')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 编程式导航 */}
                <Card title="🎯 编程式导航" className={styles.content_card}>
                    <div className={styles.navigation_section}>
                        <h3>基本导航方法</h3>
                        <div className={styles.code_block}>
                            <pre>
{`import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    // 导航到不同路由
    const navigate = () => {
      // 字符串路径
      router.push('/home')
      
      // 对象
      router.push({ path: '/home' })
      
      // 命名的路由
      router.push({ name: 'user', params: { userId: '123' } })
      
      // 带查询参数
      router.push({ path: '/register', query: { plan: 'private' } })
      
      // 带 hash
      router.push({ path: '/about', hash: '#team' })
    }
    
    // 替换当前路由（不会向 history 添加新记录）
    const replace = () => {
      router.replace('/home')
    }
    
    // 前进/后退
    const goBack = () => {
      router.go(-1) // 后退一步
    }
    
    const goForward = () => {
      router.go(1) // 前进一步
    }
    
    return {
      navigate,
      replace,
      goBack,
      goForward
    }
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>路由信息获取</h3>
                        <div className={styles.code_block}>
                            <pre>
{`import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    // 当前路由信息
    console.log('当前路径:', route.path)
    console.log('路由参数:', route.params)
    console.log('查询参数:', route.query)
    console.log('Hash:', route.hash)
    console.log('完整路径:', route.fullPath)
    console.log('匹配的路由记录:', route.matched)
    console.log('路由名称:', route.name)
    console.log('路由元信息:', route.meta)
    
    // 监听路由变化
    watch(
      () => route.params.id,
      (newId, oldId) => {
        console.log(\`用户ID从 \${oldId} 变为 \${newId}\`)
        fetchUserData(newId)
      }
    )
    
    // 获取路由历史
    const canGoBack = computed(() => {
      return window.history.length > 1
    })
    
    return {
      route,
      canGoBack
    }
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Vue Router 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 路由懒加载</h4>
                                <p>使用动态导入实现路由组件的懒加载</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 路由懒加载
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('./views/About.vue')
  },
  // 路由分组
  {
    path: '/admin',
    component: () => import(
      /* webpackChunkName: "admin" */ './views/Admin.vue'
    )
  }
]`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 路由元信息管理</h4>
                                <p>合理使用meta字段管理路由信息</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: '仪表板',
      requiresAuth: true,
      roles: ['admin', 'user'],
      breadcrumb: '首页 > 仪表板',
      keepAlive: true
    }
  }
]

// 在组件中使用
export default {
  created() {
    document.title = this.$route.meta.title
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 错误处理</h4>
                                <p>处理路由错误和404页面</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const routes = [
  // 其他路由...
  
  // 404 页面必须放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue')
  }
]

// 全局错误处理
router.onError((error) => {
  console.error('路由错误:', error)
  // 发送错误报告
  errorReporting.captureException(error)
})`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 性能优化</h4>
                                <p>优化路由性能和用户体验</p>
                                <ul>
                                    <li>使用路由懒加载减少初始包大小</li>
                                    <li>合理使用keep-alive缓存组件</li>
                                    <li>预加载关键路由组件</li>
                                    <li>使用过渡动画提升用户体验</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default VueRouterDetail
