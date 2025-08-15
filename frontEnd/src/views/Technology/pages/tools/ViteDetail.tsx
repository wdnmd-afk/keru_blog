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

const ViteDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/tools')
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
                    返回开发工具技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Vite 构建工具详解</h1>
                    <p>掌握下一代前端构建工具Vite的使用与配置</p>
                    <div className={styles.topic_tags}>
                        <Tag color="purple">Vite</Tag>
                        <Tag color="green">构建工具</Tag>
                        <Tag color="blue">开发服务器</Tag>
                        <Tag color="orange">热更新</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Vite基础 */}
                <Card title="⚡ Vite 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Vite？</h3>
                        <p>Vite是一个现代化的前端构建工具，由Vue.js作者尤雨溪开发。它利用ES模块的原生支持和现代浏览器的能力，提供极快的开发服务器启动速度和热更新体验。</p>
                        
                        <h3>核心特性</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🚀 极速启动</h4>
                                <p>开发服务器秒级启动，无需打包</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>⚡ 闪电热更新</h4>
                                <p>基于ESM的热更新，速度极快</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📦 优化构建</h4>
                                <p>基于Rollup的生产构建优化</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔌 丰富插件</h4>
                                <p>兼容Rollup插件生态系统</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📱 框架无关</h4>
                                <p>支持Vue、React、Svelte等框架</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🛠️ TypeScript</h4>
                                <p>内置TypeScript支持</p>
                            </div>
                        </div>
                        
                        <Alert
                            message="Vite vs Webpack"
                            description="Vite在开发环境使用ESM，避免了打包过程，启动速度比Webpack快10-100倍。生产环境使用Rollup确保最优的打包结果。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>
                
                {/* 快速开始 */}
                <Card title="🚀 快速开始" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 创建项目</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 使用npm创建项目
npm create vite@latest my-project
cd my-project
npm install
npm run dev

# 使用yarn创建项目
yarn create vite my-project
cd my-project
yarn
yarn dev

# 使用pnpm创建项目
pnpm create vite my-project
cd my-project
pnpm install
pnpm dev

# 指定模板创建项目
npm create vite@latest my-vue-app -- --template vue
npm create vite@latest my-react-app -- --template react
npm create vite@latest my-react-ts-app -- --template react-ts
npm create vite@latest my-svelte-app -- --template svelte`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 项目结构</h4>
                            <div className={styles.code_block}>
                                <pre>
{`my-project/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md

# index.html是入口文件
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 基本配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  // 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'components': resolve(__dirname, 'src/components')
    }
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser'
  }
})`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 插件系统 */}
                <Card title="🔌 插件系统" className={styles.content_card}>
                    <div className={styles.plugin_section}>
                        <h3>官方插件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vue支持
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// React支持
import react from '@vitejs/plugin-react'

// Svelte支持
import { svelte } from '@sveltejs/vite-plugin-svelte'

// 配置示例
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 或者
    react(),
    // 或者
    svelte()
  ]
})

// 插件选项配置
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    vueJsx({
      // JSX配置选项
    })
  ]
})`}
                            </pre>
                        </div>
                        
                        <h3>常用社区插件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装常用插件
npm install -D @vitejs/plugin-legacy
npm install -D vite-plugin-eslint
npm install -D vite-plugin-mock
npm install -D vite-plugin-windicss
npm install -D unplugin-auto-import

// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import eslint from 'vite-plugin-eslint'
import { viteMockServe } from 'vite-plugin-mock'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    
    // 兼容旧浏览器
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    
    // ESLint集成
    eslint(),
    
    // Mock数据
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true
    }),
    
    // WindiCSS支持
    WindiCSS(),
    
    // 自动导入
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true
    })
  ]
})`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 开发体验 */}
                <Card title="🛠️ 开发体验优化" className={styles.content_card}>
                    <div className={styles.dev_section}>
                        <h3>热模块替换(HMR)</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Vite内置HMR API
if (import.meta.hot) {
  // 接受自身更新
  import.meta.hot.accept()
  
  // 接受依赖更新
  import.meta.hot.accept('./dep.js', (newDep) => {
    // 处理更新逻辑
  })
  
  // 处理更新失败
  import.meta.hot.invalidate()
  
  // 自定义事件
  import.meta.hot.on('custom-event', (data) => {
    console.log('收到自定义事件:', data)
  })
  
  // 发送自定义事件
  import.meta.hot.send('custom-event', { message: 'Hello' })
}

// Vue组件HMR
// 自动支持，无需额外配置

// React组件HMR
// 使用@vitejs/plugin-react自动支持

// CSS HMR
// 自动支持，修改CSS文件会立即更新样式`}
                            </pre>
                        </div>
                        
                        <h3>环境变量</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// .env文件
VITE_APP_TITLE=My App
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=1.0.0

// .env.development
VITE_API_URL=http://localhost:8080

// .env.production
VITE_API_URL=https://prod-api.example.com

// 在代码中使用
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_API_URL)

// 类型定义 (env.d.ts)
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 运行时环境检查
if (import.meta.env.DEV) {
  console.log('开发环境')
}

if (import.meta.env.PROD) {
  console.log('生产环境')
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 构建优化 */}
                <Card title="📦 构建优化" className={styles.content_card}>
                    <div className={styles.build_section}>
                        <h3>构建配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// vite.config.js
export default defineConfig({
  build: {
    // 输出目录
    outDir: 'dist',
    
    // 静态资源目录
    assetsDir: 'assets',
    
    // 小于此阈值的导入或引用资源将内联为base64编码
    assetsInlineLimit: 4096,
    
    // 启用/禁用CSS代码拆分
    cssCodeSplit: true,
    
    // 生成源码映射
    sourcemap: false,
    
    // 压缩器
    minify: 'terser',
    
    // 传递给Terser的更多选项
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // Rollup配置
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html')
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    },
    
    // 构建后是否生成bundle分析报告
    reportCompressedSize: false,
    
    // chunk大小警告的限制
    chunkSizeWarningLimit: 500
  }
})`}
                            </pre>
                        </div>
                        
                        <h3>代码分割</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 动态导入实现代码分割
const LazyComponent = lazy(() => import('./LazyComponent.vue'))

// 路由级别的代码分割
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('./views/About.vue')
  }
]

// 手动分包
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['lodash', 'axios'],
          ui: ['element-plus']
        }
      }
    }
  }
})

// 或者使用函数形式
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vue-vendor'
            }
            if (id.includes('element-plus')) {
              return 'ui-vendor'
            }
            return 'vendor'
          }
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
                <Card title="✅ Vite 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 项目结构</h4>
                                <p>合理组织项目结构</p>
                                <ul>
                                    <li>使用路径别名简化导入</li>
                                    <li>按功能模块组织代码</li>
                                    <li>分离开发和生产配置</li>
                                    <li>合理使用环境变量</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能优化</h4>
                                <p>优化构建和运行性能</p>
                                <ul>
                                    <li>合理配置代码分割</li>
                                    <li>使用Tree Shaking减少包大小</li>
                                    <li>优化静态资源处理</li>
                                    <li>启用压缩和缓存</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 开发体验</h4>
                                <p>提升开发效率</p>
                                <ul>
                                    <li>配置代理解决跨域问题</li>
                                    <li>使用Mock数据进行开发</li>
                                    <li>集成ESLint和Prettier</li>
                                    <li>配置自动导入减少重复代码</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 部署优化</h4>
                                <p>优化生产部署</p>
                                <ul>
                                    <li>配置正确的base路径</li>
                                    <li>启用浏览器兼容性支持</li>
                                    <li>优化静态资源缓存策略</li>
                                    <li>配置CDN加速</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ViteDetail
