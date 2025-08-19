import React from 'react'
import { Card, Tag, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, NodeIndexOutlined } from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const VueRouterDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Vue', 'router')

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
                    <NodeIndexOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue Router 路由管理</h1>
                    <p>掌握Vue Router的核心概念和高级特性，构建单页应用的路由系统</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue.js</Tag>
                        <Tag color="blue">Vue Router</Tag>
                        <Tag color="orange">路由</Tag>
                        <Tag color="purple">导航</Tag>
                        <Tag color="red">守卫</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础配置 */}
                <Card title="🚀 基础配置与使用" className={styles.content_card}>
                    <div className={styles.basic_setup}>
                        <h3>安装与基本设置</h3>
                        <CodeHighlight
                            code={`# 安装 Vue Router
npm install vue-router@4

# 基本路由配置
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')`}
                            language="javascript"
                            title="Vue Router基础配置"
                        />

                        <h3>基本模板使用</h3>
                        <CodeHighlight
                            code={`<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <!-- 声明式导航 -->
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
      
      <!-- 带参数的导航 -->
      <router-link :to="{ name: 'User', params: { id: 123 }}">
        用户详情
      </router-link>
      
      <!-- 查询参数导航 -->
      <router-link :to="{ path: '/search', query: { q: 'vue' }}">
        搜索
      </router-link>
    </nav>
    
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<style>
.router-link-active {
  color: #42b983;
  font-weight: bold;
}
</style>`}
                            language="vue"
                            title="基本模板使用"
                        />
                    </div>
                </Card>

                {/* 动态路由 */}
                <Card title="🔗 动态路由与参数" className={styles.content_card}>
                    <div className={styles.dynamic_routes}>
                        <h3>1. 路径参数</h3>
                        <CodeHighlight
                            code={`// 路由配置
const routes = [
  // 动态路径参数
  { path: '/user/:id', component: User },
  
  // 多个参数
  { path: '/user/:id/post/:postId', component: UserPost },
  
  // 可选参数
  { path: '/user/:id?', component: User },
  
  // 通配符
  { path: '/user-*', component: User },
  
  // 正则表达式
  { path: '/user/:id(\\\\d+)', component: User }, // 只匹配数字
]

// 组件中获取参数
<template>
  <div>
    <h1>用户ID: {{ $route.params.id }}</h1>
    <h2>文章ID: {{ $route.params.postId }}</h2>
  </div>
</template>

<script setup>
import { useRoute, watch } from 'vue'

const route = useRoute()

// 响应路由参数变化
watch(() => route.params.id, (newId, oldId) => {
  console.log('用户ID变化:', oldId, '->', newId)
  // 重新获取用户数据
  fetchUser(newId)
})

const fetchUser = (id) => {
  // 获取用户数据的逻辑
}
</script>`}
                            language="javascript"
                            title="动态路径参数"
                        />

                        <h3>2. 查询参数与Hash</h3>
                        <CodeHighlight
                            code={`// 查询参数示例: /search?q=vue&category=tutorial
<template>
  <div>
    <h1>搜索结果</h1>
    <p>关键词: {{ $route.query.q }}</p>
    <p>分类: {{ $route.query.category }}</p>
    <p>Hash: {{ $route.hash }}</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue'

const route = useRoute()
const router = useRouter()

// 编程式导航
const search = (keyword) => {
  router.push({
    path: '/search',
    query: { 
      q: keyword,
      category: 'tutorial',
      page: 1
    }
  })
}

// 更新查询参数
const updateQuery = (newParams) => {
  router.push({
    query: { ...route.query, ...newParams }
  })
}

// 监听查询参数变化
watch(() => route.query, (newQuery) => {
  console.log('查询参数变化:', newQuery)
  // 根据新参数重新搜索
})
</script>`}
                            language="vue"
                            title="查询参数处理"
                        />
                    </div>
                </Card>

                {/* 嵌套路由 */}
                <Card title="🏗️ 嵌套路由与命名视图" className={styles.content_card}>
                    <div className={styles.nested_routes}>
                        <h3>嵌套路由配置</h3>
                        <CodeHighlight
                            code={`// 路由配置
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 空路径表示默认子路由
      { path: '', component: UserHome },
      
      // 子路由
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts },
      { path: 'settings', component: UserSettings }
    ]
  }
]

// User.vue - 父组件
<template>
  <div class="user">
    <h2>用户 {{ $route.params.id }}</h2>
    
    <!-- 子路由导航 -->
    <nav>
      <router-link :to="\`/user/\${$route.params.id}\`">首页</router-link>
      <router-link :to="\`/user/\${$route.params.id}/profile\`">资料</router-link>
      <router-link :to="\`/user/\${$route.params.id}/posts\`">文章</router-link>
    </nav>
    
    <!-- 子路由出口 -->
    <router-view />
  </div>
</template>`}
                            language="vue"
                            title="嵌套路由配置"
                        />

                        <h3>命名视图</h3>
                        <CodeHighlight
                            code={`// 多个视图的路由配置
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

// App.vue - 多个命名视图
<template>
  <div>
    <router-view name="header" />
    <div class="main-content">
      <router-view name="sidebar" />
      <router-view /> <!-- 默认视图 -->
    </div>
  </div>
</template>`}
                            language="vue"
                            title="命名视图"
                        />
                    </div>
                </Card>

                {/* 路由守卫 */}
                <Card title="🛡️ 路由守卫与权限控制" className={styles.content_card}>
                    <div className={styles.route_guards}>
                        <h3>全局守卫</h3>
                        <CodeHighlight
                            code={`// 全局前置守卫
router.beforeEach((to, from) => {
  console.log('导航到:', to.path)
  
  // 权限检查
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'Login' }
  }
  
  // 角色检查
  if (to.meta.roles && !hasRole(to.meta.roles)) {
    return { name: 'Forbidden' }
  }
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 发送页面浏览统计
  analytics.track('page_view', { path: to.path })
  
  // 滚动到顶部
  window.scrollTo(0, 0)
})

// 全局解析守卫
router.beforeResolve((to, from) => {
  // 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后调用
  console.log('路由解析完成')
})`}
                            language="javascript"
                            title="全局路由守卫"
                        />

                        <h3>路由独享守卫</h3>
                        <CodeHighlight
                            code={`const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true, roles: ['admin'] },
    beforeEnter: (to, from) => {
      // 路由独享的守卫
      if (!isAdmin()) {
        return { name: 'Home' }
      }
    }
  },
  {
    path: '/user/:id',
    component: User,
    beforeEnter: [
      // 可以是数组
      checkUserExists,
      checkUserPermission
    ]
  }
]

// 守卫函数
function checkUserExists(to) {
  const userId = to.params.id
  if (!userExists(userId)) {
    return { name: 'NotFound' }
  }
}

function checkUserPermission(to) {
  const userId = to.params.id
  if (!canViewUser(userId)) {
    return { name: 'Forbidden' }
  }
}`}
                            language="javascript"
                            title="路由独享守卫"
                        />

                        <h3>组件内守卫</h3>
                        <CodeHighlight
                            code={`<script setup>
import { onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'

// 进入路由前
onBeforeRouteEnter((to, from) => {
  console.log('即将进入路由')
  // 可以访问组件实例
})

// 路由更新时
onBeforeRouteUpdate((to, from) => {
  console.log('路由参数更新')
  // 当前路由改变，但是该组件被复用时调用
  // 例如：从 /user/1 到 /user/2
})

// 离开路由前
onBeforeRouteLeave((to, from) => {
  console.log('即将离开路由')
  
  // 确认离开
  if (hasUnsavedChanges()) {
    const answer = window.confirm('有未保存的更改，确定要离开吗？')
    if (!answer) return false
  }
})
</script>`}
                            language="vue"
                            title="组件内守卫"
                        />
                    </div>
                </Card>

                {/* 编程式导航 */}
                <Card title="🧭 编程式导航" className={styles.content_card}>
                    <div className={styles.programmatic_navigation}>
                        <h3>基本导航方法</h3>
                        <CodeHighlight
                            code={`<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 基本导航
const goHome = () => {
  router.push('/')
}

// 带参数导航
const goToUser = (userId) => {
  router.push(\`/user/\${userId}\`)
  
  // 或者使用对象形式
  router.push({
    name: 'User',
    params: { id: userId }
  })
}

// 带查询参数
const search = (keyword) => {
  router.push({
    path: '/search',
    query: { q: keyword }
  })
}

// 替换当前历史记录
const replaceRoute = () => {
  router.replace('/new-path')
}

// 历史记录导航
const goBack = () => {
  router.go(-1) // 后退一步
}

const goForward = () => {
  router.go(1) // 前进一步
}
</script>`}
                            language="vue"
                            title="编程式导航方法"
                        />

                        <h3>路由信息获取</h3>
                        <CodeHighlight
                            code={`<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'

const route = useRoute()
const router = useRouter()

// 当前路由信息
const currentPath = computed(() => route.path)
const currentParams = computed(() => route.params)
const currentQuery = computed(() => route.query)

// 监听路由变化
watch(route, (newRoute, oldRoute) => {
  console.log('路由变化:', oldRoute.path, '->', newRoute.path)
})

// 获取路由元信息
const pageTitle = computed(() => route.meta.title || '默认标题')
const requiresAuth = computed(() => route.meta.requiresAuth)

// 检查当前路由
const isHomePage = computed(() => route.name === 'Home')
const isUserPage = computed(() => route.path.startsWith('/user'))

// 构建动态链接
const userProfileLink = computed(() => ({
  name: 'UserProfile',
  params: { id: route.params.id }
}))
</script>

<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <p>当前路径: {{ currentPath }}</p>
    <p>路由参数: {{ JSON.stringify(currentParams) }}</p>
    <p>查询参数: {{ JSON.stringify(currentQuery) }}</p>
    
    <router-link v-if="isUserPage" :to="userProfileLink">
      查看用户资料
    </router-link>
  </div>
</template>`}
                            language="vue"
                            title="路由信息获取"
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default VueRouterDetail
