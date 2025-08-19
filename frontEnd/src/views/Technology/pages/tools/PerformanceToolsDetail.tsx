import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    DashboardOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const PerformanceToolsDetail: React.FC = () => {
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
                    <DashboardOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>性能工具详解</h1>
                    <p>掌握前端性能分析与优化工具</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">性能分析</Tag>
                        <Tag color="green">性能监控</Tag>
                        <Tag color="orange">优化工具</Tag>
                        <Tag color="purple">性能指标</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 性能工具概述 */}
                <Card title="📊 性能工具生态" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么需要性能工具？</h3>
                        <p>现代Web应用的复杂性不断增加，性能问题直接影响用户体验和业务指标。性能工具帮助我们识别瓶颈、监控指标、优化代码，确保应用在各种环境下都能提供良好的用户体验。</p>
                        
                        <h3>性能工具分类</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔍 分析工具</h4>
                                <p>识别性能瓶颈</p>
                                <ul>
                                    <li>Chrome DevTools</li>
                                    <li>Lighthouse</li>
                                    <li>WebPageTest</li>
                                    <li>Bundle Analyzer</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📈 监控工具</h4>
                                <p>实时性能监控</p>
                                <ul>
                                    <li>Google Analytics</li>
                                    <li>New Relic</li>
                                    <li>Sentry</li>
                                    <li>DataDog</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>⚡ 优化工具</h4>
                                <p>自动化性能优化</p>
                                <ul>
                                    <li>Webpack Bundle Analyzer</li>
                                    <li>ImageOptim</li>
                                    <li>Terser</li>
                                    <li>PurgeCSS</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🧪 测试工具</h4>
                                <p>性能测试与基准</p>
                                <ul>
                                    <li>Jest Performance</li>
                                    <li>Benchmark.js</li>
                                    <li>Artillery</li>
                                    <li>K6</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Chrome DevTools性能分析 */}
                <Card title="🔍 Chrome DevTools 性能分析" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Performance面板使用</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 性能分析步骤
1. 打开Chrome DevTools (F12)
2. 切换到Performance面板
3. 点击录制按钮开始分析
4. 执行需要分析的操作
5. 停止录制查看结果

// 关键性能指标
- FCP (First Contentful Paint): 首次内容绘制
- LCP (Largest Contentful Paint): 最大内容绘制  
- FID (First Input Delay): 首次输入延迟
- CLS (Cumulative Layout Shift): 累积布局偏移
- TTFB (Time to First Byte): 首字节时间

// 性能分析重点
1. Main线程活动
   - JavaScript执行时间
   - 样式计算时间
   - 布局和绘制时间

2. 网络活动
   - 资源加载时间
   - 请求优先级
   - 缓存命中率

3. 内存使用
   - 堆内存变化
   - 垃圾回收频率
   - 内存泄漏检测

// 常见性能问题识别
- 长任务 (Long Tasks): 超过50ms的任务
- 强制同步布局 (Forced Reflow)
- 不必要的重绘 (Unnecessary Repaints)
- JavaScript执行时间过长`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Memory面板内存分析</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 内存分析类型
1. Heap Snapshot (堆快照)
   - 查看内存使用情况
   - 识别内存泄漏
   - 分析对象引用关系

2. Allocation Timeline (分配时间线)
   - 实时监控内存分配
   - 识别内存增长模式
   - 定位内存泄漏源头

3. Allocation Sampling (分配采样)
   - 轻量级内存分析
   - 长时间运行监控
   - 性能影响最小

// 内存泄漏检测步骤
1. 记录初始堆快照
2. 执行可能泄漏的操作
3. 强制垃圾回收 (Collect garbage)
4. 记录第二个堆快照
5. 比较两个快照差异

// 常见内存泄漏模式
- 未清理的事件监听器
- 闭包引用未释放
- DOM节点引用未清理
- 定时器未清除
- 全局变量累积

// 内存优化建议
function optimizeMemory() {
    // 1. 及时清理事件监听器
    const element = document.getElementById('button')
    const handler = () => console.log('clicked')
    
    element.addEventListener('click', handler)
    // 组件销毁时清理
    element.removeEventListener('click', handler)
    
    // 2. 使用WeakMap避免内存泄漏
    const weakMap = new WeakMap()
    weakMap.set(element, { data: 'some data' })
    
    // 3. 清理定时器
    const timer = setTimeout(() => {}, 1000)
    clearTimeout(timer)
    
    // 4. 避免全局变量
    // 不好的做法
    window.globalData = []
    
    // 好的做法
    const moduleData = []
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. Network面板网络优化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 网络性能分析
1. 资源加载瀑布图
   - 查看资源加载顺序
   - 识别阻塞资源
   - 分析并行加载情况

2. 资源优先级
   - High: 关键CSS、同步脚本
   - Medium: 图片、字体
   - Low: 预加载资源

3. 缓存分析
   - 200: 服务器响应
   - 304: 协商缓存命中
   - (memory cache): 内存缓存
   - (disk cache): 磁盘缓存

// 网络优化策略
// 1. 资源压缩
const compression = require('compression')
app.use(compression())

// 2. HTTP/2服务器推送
app.get('/', (req, res) => {
    res.push('/styles.css')
    res.push('/script.js')
    res.render('index')
})

// 3. 资源预加载
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/hero-image.jpg" as="image">
<link rel="prefetch" href="/next-page.js">

// 4. 代码分割
import { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    )
}

// 5. 图片优化
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.avif" type="image/avif">
    <img src="image.jpg" alt="description" loading="lazy">
</picture>`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Lighthouse性能审计 */}
                <Card title="🏮 Lighthouse 性能审计" className={styles.content_card}>
                    <div className={styles.lighthouse_section}>
                        <h3>Lighthouse使用指南</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Lighthouse安装和使用
# 1. Chrome扩展使用
# 在Chrome DevTools的Lighthouse面板中直接使用

# 2. CLI工具安装
npm install -g lighthouse

# 3. 基本使用
lighthouse https://example.com
lighthouse https://example.com --output html --output-path ./report.html

# 4. 移动端测试
lighthouse https://example.com --emulated-form-factor=mobile

# 5. 自定义配置
lighthouse https://example.com --config-path=./lighthouse-config.js

// lighthouse-config.js 自定义配置
module.exports = {
    extends: 'lighthouse:default',
    settings: {
        onlyAudits: [
            'first-contentful-paint',
            'largest-contentful-paint',
            'cumulative-layout-shift',
            'total-blocking-time'
        ],
        emulatedFormFactor: 'mobile',
        throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1
        }
    }
}

// CI/CD集成
// GitHub Actions示例
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: \${{ secrets.LHCI_GITHUB_APP_TOKEN }}

// lighthouserc.js 配置
module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:3000'],
            startServerCommand: 'npm start',
            numberOfRuns: 3
        },
        assert: {
            assertions: {
                'categories:performance': ['warn', { minScore: 0.8 }],
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'categories:best-practices': ['warn', { minScore: 0.8 }],
                'categories:seo': ['warn', { minScore: 0.8 }]
            }
        },
        upload: {
            target: 'temporary-public-storage'
        }
    }
}`}
                            </pre>
                        </div>
                        
                        <h3>性能指标优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Core Web Vitals优化
// 1. LCP (Largest Contentful Paint) 优化
// 目标: < 2.5秒

// 优化策略:
- 优化服务器响应时间
- 使用CDN加速资源加载
- 预加载关键资源
- 优化图片格式和大小
- 移除阻塞渲染的资源

// 实现示例:
// 预加载关键资源
<link rel="preload" href="/hero-image.jpg" as="image">
<link rel="preload" href="/critical.css" as="style">

// 2. FID (First Input Delay) 优化  
// 目标: < 100毫秒

// 优化策略:
- 减少JavaScript执行时间
- 代码分割和懒加载
- 使用Web Workers处理复杂计算
- 优化第三方脚本加载

// Web Worker示例:
// main.js
const worker = new Worker('worker.js')
worker.postMessage({ data: largeDataSet })
worker.onmessage = (e) => {
    console.log('处理结果:', e.data)
}

// worker.js
self.onmessage = (e) => {
    const result = processLargeData(e.data)
    self.postMessage(result)
}

// 3. CLS (Cumulative Layout Shift) 优化
// 目标: < 0.1

// 优化策略:
- 为图片和视频设置尺寸属性
- 避免在现有内容上方插入内容
- 使用transform动画而非改变布局的属性
- 预留广告和嵌入内容的空间

// 示例:
// 设置图片尺寸避免布局偏移
<img src="image.jpg" width="400" height="300" alt="description">

// 使用aspect-ratio CSS属性
.image-container {
    aspect-ratio: 16 / 9;
}

// 使用transform进行动画
.element {
    transform: translateX(100px);
    transition: transform 0.3s ease;
}

// 4. TTFB (Time to First Byte) 优化
// 目标: < 200毫秒

// 优化策略:
- 使用CDN
- 启用服务器缓存
- 优化数据库查询
- 使用服务端渲染(SSR)

// Express.js缓存示例:
const cache = require('memory-cache')

app.get('/api/data', (req, res) => {
    const key = 'api-data'
    const cachedData = cache.get(key)
    
    if (cachedData) {
        return res.json(cachedData)
    }
    
    const data = fetchDataFromDatabase()
    cache.put(key, data, 300000) // 缓存5分钟
    res.json(data)
})`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Bundle分析工具 */}
                <Card title="📦 Bundle 分析工具" className={styles.content_card}>
                    <div className={styles.bundle_section}>
                        <h3>Webpack Bundle Analyzer</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer

// webpack.config.js配置
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-report.html'
        })
    ]
}

// package.json脚本
{
    "scripts": {
        "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
    }
}

// 使用环境变量控制
if (process.env.ANALYZE) {
    config.plugins.push(new BundleAnalyzerPlugin())
}

// 运行分析
ANALYZE=true npm run build

// Bundle优化策略
// 1. 代码分割
const LazyComponent = React.lazy(() => import('./LazyComponent'))

// 2. 动态导入
async function loadModule() {
    const module = await import('./heavyModule')
    return module.default
}

// 3. Tree Shaking
// 确保package.json中设置
{
    "sideEffects": false
}

// 4. 外部依赖
// webpack.config.js
module.exports = {
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'lodash': '_'
    }
}

// 5. 压缩优化
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            })
        ]
    }
}`}
                            </pre>
                        </div>
                        
                        <h3>其他Bundle分析工具</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 1. source-map-explorer
npm install --save-dev source-map-explorer

// package.json
{
    "scripts": {
        "analyze": "npm run build && npx source-map-explorer 'build/static/js/*.js'"
    }
}

// 2. Vite Bundle Analyzer
npm install --save-dev rollup-plugin-visualizer

// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default {
    plugins: [
        visualizer({
            filename: 'dist/stats.html',
            open: true
        })
    ]
}

// 3. Next.js Bundle Analyzer
npm install --save-dev @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
    // Next.js配置
})

// 运行分析
ANALYZE=true npm run build

// 4. 自定义分析脚本
const fs = require('fs')
const path = require('path')

function analyzeBundle(buildDir) {
    const files = fs.readdirSync(buildDir)
    const jsFiles = files.filter(file => file.endsWith('.js'))
    
    const analysis = jsFiles.map(file => {
        const filePath = path.join(buildDir, file)
        const stats = fs.statSync(filePath)
        return {
            name: file,
            size: stats.size,
            sizeKB: Math.round(stats.size / 1024)
        }
    })
    
    analysis.sort((a, b) => b.size - a.size)
    
    console.log('Bundle Analysis:')
    analysis.forEach(file => {
        console.log(\`\${file.name}: \${file.sizeKB}KB\`)
    })
    
    const totalSize = analysis.reduce((sum, file) => sum + file.size, 0)
    console.log(\`Total: \${Math.round(totalSize / 1024)}KB\`)
}

// 使用
analyzeBundle('./build/static/js')`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 性能工具最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 性能监控</h4>
                                <p>建立完善的性能监控体系</p>
                                <ul>
                                    <li>设置性能基准和目标</li>
                                    <li>持续监控关键指标</li>
                                    <li>建立性能预警机制</li>
                                    <li>定期进行性能审计</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 工具集成</h4>
                                <p>将性能工具集成到开发流程</p>
                                <ul>
                                    <li>CI/CD中集成性能测试</li>
                                    <li>自动化性能报告生成</li>
                                    <li>性能回归检测</li>
                                    <li>团队性能意识培养</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 优化策略</h4>
                                <p>制定系统的优化策略</p>
                                <ul>
                                    <li>优先优化关键路径</li>
                                    <li>平衡性能和功能需求</li>
                                    <li>考虑不同设备和网络环境</li>
                                    <li>持续优化和改进</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 数据驱动</h4>
                                <p>基于数据进行性能决策</p>
                                <ul>
                                    <li>收集真实用户数据</li>
                                    <li>分析性能影响因素</li>
                                    <li>A/B测试性能优化</li>
                                    <li>量化优化效果</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PerformanceToolsDetail
