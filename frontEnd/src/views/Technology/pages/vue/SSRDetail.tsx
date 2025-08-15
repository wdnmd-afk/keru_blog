import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    CloudServerOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const SSRDetail: React.FC = () => {
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
                    <CloudServerOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vue.js 服务端渲染 (SSR)</h1>
                    <p>掌握Vue应用的服务端渲染技术，提升SEO和首屏性能</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Vue SSR</Tag>
                        <Tag color="blue">Nuxt.js</Tag>
                        <Tag color="orange">SEO优化</Tag>
                        <Tag color="purple">性能提升</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* SSR基础概念 */}
                <Card title="🌐 SSR 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是服务端渲染？</h3>
                        <p>服务端渲染(SSR)是指在服务器上将Vue组件渲染为HTML字符串，然后发送到浏览器，最后在客户端进行"激活"(hydration)的过程。这与传统的客户端渲染(CSR)形成对比。</p>
                        
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h4>🖥️ 客户端渲染 (CSR)</h4>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>服务器压力小</li>
                                            <li>用户交互流畅</li>
                                            <li>开发简单</li>
                                            <li>缓存效果好</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>首屏加载慢</li>
                                            <li>SEO不友好</li>
                                            <li>白屏时间长</li>
                                            <li>依赖JavaScript</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.comparison_item}>
                                <h4>🌐 服务端渲染 (SSR)</h4>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>首屏加载快</li>
                                            <li>SEO友好</li>
                                            <li>更好的用户体验</li>
                                            <li>支持无JavaScript环境</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>服务器压力大</li>
                                            <li>开发复杂度高</li>
                                            <li>缓存策略复杂</li>
                                            <li>部署要求高</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h3>SSR渲染流程</h3>
                        <div className={styles.code_block}>
                            <pre>
{`1. 用户请求页面
   ↓
2. 服务器接收请求
   ↓
3. 服务器运行Vue应用
   ↓
4. 渲染组件为HTML字符串
   ↓
5. 将HTML发送给浏览器
   ↓
6. 浏览器显示页面
   ↓
7. 客户端JavaScript激活页面
   ↓
8. 页面变为完全交互式`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Vue SSR实现 */}
                <Card title="⚙️ Vue SSR 手动实现" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基础SSR设置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 安装依赖
npm install vue @vue/server-renderer express

# server.js
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

const server = express()

// 创建Vue应用
function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: \`
      <div>
        <h1>服务端渲染应用</h1>
        <p>计数: {{ count }}</p>
        <button @click="count++">增加</button>
      </div>
    \`
  })
}

server.get('/', async (req, res) => {
  const app = createApp()
  
  try {
    const html = await renderToString(app)
    
    res.send(\`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vue SSR</title>
        </head>
        <body>
          <div id="app">\${html}</div>
          <script src="/client.js"></script>
        </body>
      </html>
    \`)
  } catch (error) {
    res.status(500).send('服务器错误')
  }
})

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000')
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 客户端激活</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// client.js
import { createSSRApp } from 'vue'

function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: \`
      <div>
        <h1>服务端渲染应用</h1>
        <p>计数: {{ count }}</p>
        <button @click="count++">增加</button>
      </div>
    \`
  })
}

// 客户端激活
const app = createApp()
app.mount('#app')

// 使用单文件组件
// App.vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <Counter :initial-count="initialCount" />
  </div>
</template>

<script setup>
const title = 'Vue SSR 应用'
const initialCount = 0
</script>

// main.js (通用入口)
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  
  return {
    app
  }
}

// entry-client.js
import { createApp } from './main.js'

const { app } = createApp()

// 等待路由准备就绪后再挂载
app.mount('#app')

// entry-server.js
import { createApp } from './main.js'

export async function render(url, manifest) {
  const { app } = createApp()
  
  // 设置服务器端路由的位置
  // await router.push(url)
  // await router.isReady()
  
  return app
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 构建配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        client: './src/entry-client.js',
        server: './src/entry-server.js'
      }
    }
  },
  ssr: {
    // SSR相关配置
    noExternal: ['vue-router']
  }
})

// package.json scripts
{
  "scripts": {
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --outDir dist/server --ssr src/entry-server.js",
    "build": "npm run build:client && npm run build:server",
    "serve": "node server.js"
  }
}

// 生产环境服务器
// server-prod.js
import express from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const server = express()

// 读取构建产物
const template = readFileSync(resolve(__dirname, 'dist/client/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

server.use('/assets', express.static(resolve(__dirname, 'dist/client/assets')))

server.get('*', async (req, res) => {
  try {
    const appHtml = await render(req.originalUrl)
    
    const html = template.replace(\`<!--ssr-outlet-->\`, appHtml)
    
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.error(e)
    res.status(500).end(e.message)
  }
})`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Nuxt.js框架 */}
                <Card title="🚀 Nuxt.js 框架" className={styles.content_card}>
                    <div className={styles.nuxt_section}>
                        <h3>Nuxt.js 简介</h3>
                        <p>Nuxt.js是基于Vue.js的全栈框架，提供了开箱即用的SSR、静态站点生成(SSG)、自动路由等功能，大大简化了Vue SSR应用的开发。</p>
                        
                        <h3>快速开始</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 创建Nuxt项目
npx nuxi@latest init my-nuxt-app
cd my-nuxt-app
npm install

# 项目结构
my-nuxt-app/
├── assets/          # 静态资源
├── components/      # Vue组件
├── layouts/         # 布局组件
├── middleware/      # 中间件
├── pages/           # 页面组件 (自动路由)
├── plugins/         # 插件
├── public/          # 公共静态文件
├── server/          # 服务端API
├── stores/          # Pinia状态管理
├── nuxt.config.ts   # Nuxt配置
└── app.vue          # 根组件

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run preview`}
                            </pre>
                        </div>
                        
                        <h3>页面和路由</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<!-- pages/index.vue -->
<template>
  <div>
    <h1>首页</h1>
    <NuxtLink to="/about">关于我们</NuxtLink>
  </div>
</template>

<script setup>
// 页面元数据
useSeoMeta({
  title: '首页',
  description: '这是首页描述'
})

// 服务端数据获取
const { data: posts } = await $fetch('/api/posts')
</script>

<!-- pages/about.vue -->
<template>
  <div>
    <h1>关于我们</h1>
    <p>这是关于页面</p>
  </div>
</template>

<!-- pages/blog/[slug].vue -->
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: post } = await $fetch(\`/api/posts/\${route.params.slug}\`)

// 如果文章不存在，返回404
if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到'
  })
}
</script>

<!-- layouts/default.vue -->
<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/about">关于</NuxtLink>
        <NuxtLink to="/blog">博客</NuxtLink>
      </nav>
    </header>
    
    <main>
      <slot />
    </main>
    
    <footer>
      <p>&copy; 2024 我的网站</p>
    </footer>
  </div>
</template>`}
                            </pre>
                        </div>
                        
                        <h3>数据获取</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<script setup>
// 服务端和客户端都会执行
const { data: users } = await $fetch('/api/users')

// 使用useFetch进行响应式数据获取
const { data: posts, pending, error, refresh } = await useFetch('/api/posts', {
  key: 'posts',
  default: () => [],
  transform: (data) => data.map(post => ({
    ...post,
    date: new Date(post.createdAt)
  }))
})

// 懒加载数据
const { data: comments } = await useLazyFetch('/api/comments', {
  server: false // 只在客户端执行
})

// 异步数据
const { data: profile } = await useAsyncData('profile', () => {
  return $fetch('/api/profile')
})

// 条件数据获取
const route = useRoute()
const { data: post } = await useFetch(() => \`/api/posts/\${route.params.id}\`, {
  key: \`post-\${route.params.id}\`
})

// 处理错误
const { data, error } = await useFetch('/api/data')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message
  })
}
</script>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* SSR优化策略 */}
                <Card title="⚡ SSR 优化策略" className={styles.content_card}>
                    <div className={styles.optimization_section}>
                        <h3>1. 缓存策略</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 页面级缓存
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    // 首页预渲染
    '/': { prerender: true },
    
    // 产品页面按需生成，缓存1小时
    '/products/**': { isr: 3600 },
    
    // 博客页面静态生成
    '/blog/**': { prerender: true },
    
    // API路由缓存
    '/api/**': { cors: true, headers: { 'cache-control': 's-maxage=60' } }
  }
})

// 组件级缓存
<template>
  <div>
    <!-- 缓存昂贵的组件 -->
    <LazyExpensiveComponent v-if="shouldRender" />
  </div>
</template>

<script setup>
// 使用缓存的数据获取
const { data: expensiveData } = await useFetch('/api/expensive', {
  key: 'expensive-data',
  server: true,
  default: () => null,
  getCachedData(key) {
    return nuxtApp.ssrContext?.cache?.[key] ?? nuxtApp.payload.data[key]
  }
})

// 条件渲染减少服务端负担
const shouldRender = computed(() => {
  return process.client && expensiveData.value
})
</script>

// 服务端缓存中间件
// server/middleware/cache.ts
export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'GET') return
  
  const url = event.node.req.url
  const cacheKey = \`page:\${url}\`
  
  // 检查缓存
  const cached = await redis.get(cacheKey)
  if (cached) {
    event.node.res.setHeader('Content-Type', 'text/html')
    event.node.res.end(cached)
    return
  }
  
  // 缓存响应
  event.node.res.on('finish', async () => {
    if (event.node.res.statusCode === 200) {
      await redis.setex(cacheKey, 3600, responseBody)
    }
  })
})`}
                            </pre>
                        </div>
                        
                        <h3>2. 性能优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 代码分割和懒加载
<template>
  <div>
    <!-- 懒加载组件 -->
    <LazyHeavyComponent v-if="showHeavy" />
    
    <!-- 客户端组件 -->
    <ClientOnly>
      <InteractiveWidget />
      <template #fallback>
        <div>加载中...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
// 动态导入
const showHeavy = ref(false)

const loadHeavyComponent = async () => {
  const { default: HeavyComponent } = await import('~/components/HeavyComponent.vue')
  return HeavyComponent
}

// 预加载关键资源
onMounted(() => {
  // 预加载下一页可能需要的资源
  preloadRouteComponents('/next-page')
})

// 图片优化
const { $img } = useNuxtApp()
</script>

<!-- 使用Nuxt Image优化图片 -->
<template>
  <NuxtImg
    src="/hero.jpg"
    alt="Hero Image"
    width="800"
    height="600"
    format="webp"
    loading="lazy"
    placeholder
  />
</template>

// 字体优化
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'preload',
          href: '/fonts/main.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})

// 关键CSS内联
export default defineNuxtConfig({
  css: ['~/assets/css/critical.css'],
  
  nitro: {
    compressPublicAssets: true
  }
})`}
                            </pre>
                        </div>
                        
                        <h3>3. SEO优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`<script setup>
// 动态SEO元数据
const route = useRoute()
const { data: post } = await useFetch(\`/api/posts/\${route.params.slug}\`)

useSeoMeta({
  title: post.value?.title,
  description: post.value?.excerpt,
  ogTitle: post.value?.title,
  ogDescription: post.value?.excerpt,
  ogImage: post.value?.featuredImage,
  ogUrl: \`https://mysite.com\${route.path}\`,
  twitterCard: 'summary_large_image'
})

// 结构化数据
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.value?.title,
  description: post.value?.excerpt,
  author: {
    '@type': 'Person',
    name: post.value?.author.name
  },
  datePublished: post.value?.publishedAt,
  image: post.value?.featuredImage
})

// 站点地图生成
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  
  sitemap: {
    hostname: 'https://mysite.com',
    gzip: true,
    routes: async () => {
      const { data: posts } = await $fetch('/api/posts')
      return posts.map(post => \`/blog/\${post.slug}\`)
    }
  }
})

// robots.txt
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/robots'],
  
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://mysite.com/sitemap.xml'
  }
})
</script>`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ SSR 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 选择合适的渲染模式</h4>
                                <p>根据应用特点选择渲染策略</p>
                                <ul>
                                    <li><strong>SSR</strong>：动态内容、需要SEO的应用</li>
                                    <li><strong>SSG</strong>：静态内容、博客、文档站点</li>
                                    <li><strong>ISR</strong>：半静态内容、电商产品页</li>
                                    <li><strong>SPA</strong>：管理后台、交互密集的应用</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 数据获取策略</h4>
                                <p>优化数据获取性能</p>
                                <ul>
                                    <li>在服务端获取关键数据</li>
                                    <li>使用适当的缓存策略</li>
                                    <li>避免在服务端进行重复请求</li>
                                    <li>合理使用懒加载</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能监控</h4>
                                <p>持续监控SSR应用性能</p>
                                <ul>
                                    <li>监控服务器响应时间</li>
                                    <li>跟踪首屏加载时间</li>
                                    <li>监控内存使用情况</li>
                                    <li>设置性能告警</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 开发体验优化</h4>
                                <p>提升SSR开发效率</p>
                                <ul>
                                    <li>使用热重载加速开发</li>
                                    <li>配置合适的开发工具</li>
                                    <li>建立完善的错误处理</li>
                                    <li>编写全面的测试</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SSRDetail
