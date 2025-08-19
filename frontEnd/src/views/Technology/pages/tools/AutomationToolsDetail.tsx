import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    RobotOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const AutomationToolsDetail: React.FC = () => {
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
                    <RobotOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>自动化工具详解</h1>
                    <p>掌握前端开发自动化工具与工作流</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">自动化</Tag>
                        <Tag color="green">工作流</Tag>
                        <Tag color="orange">CI/CD</Tag>
                        <Tag color="purple">脚本工具</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 自动化工具概述 */}
                <Card title="🤖 自动化工具生态" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么需要自动化？</h3>
                        <p>自动化工具能够减少重复性工作、提高开发效率、降低人为错误、确保代码质量一致性。在现代前端开发中，自动化已经成为提升团队生产力的关键因素。</p>
                        
                        <h3>自动化工具分类</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔨 构建自动化</h4>
                                <p>自动化构建流程</p>
                                <ul>
                                    <li>Webpack</li>
                                    <li>Vite</li>
                                    <li>Rollup</li>
                                    <li>Parcel</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🧪 测试自动化</h4>
                                <p>自动化测试执行</p>
                                <ul>
                                    <li>Jest</li>
                                    <li>Cypress</li>
                                    <li>Playwright</li>
                                    <li>Puppeteer</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🚀 部署自动化</h4>
                                <p>自动化部署流程</p>
                                <ul>
                                    <li>GitHub Actions</li>
                                    <li>GitLab CI</li>
                                    <li>Jenkins</li>
                                    <li>Vercel</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📝 代码自动化</h4>
                                <p>代码生成与格式化</p>
                                <ul>
                                    <li>Prettier</li>
                                    <li>ESLint</li>
                                    <li>Husky</li>
                                    <li>Plop.js</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 任务运行器 */}
                <Card title="⚙️ 任务运行器" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. npm scripts 自动化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// package.json 脚本配置
{
  "scripts": {
    // 开发相关
    "dev": "vite",
    "start": "vite --host",
    "preview": "vite preview",
    
    // 构建相关
    "build": "tsc && vite build",
    "build:prod": "NODE_ENV=production npm run build",
    "build:analyze": "npm run build && npx vite-bundle-analyzer",
    
    // 测试相关
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    
    // 代码质量
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx,json,css,md}",
    "format:check": "prettier --check src/**/*.{ts,tsx,json,css,md}",
    "type-check": "tsc --noEmit",
    
    // 部署相关
    "deploy": "npm run build && npm run deploy:prod",
    "deploy:staging": "npm run build && vercel --target staging",
    "deploy:prod": "npm run build && vercel --prod",
    
    // 维护相关
    "clean": "rimraf dist node_modules/.cache",
    "deps:update": "npm-check-updates -u && npm install",
    "deps:audit": "npm audit && npm audit fix",
    
    // 复合脚本
    "ci": "npm run lint && npm run type-check && npm run test && npm run build",
    "pre-commit": "npm run lint:fix && npm run format && npm run test",
    "release": "npm run ci && npm version patch && npm publish"
  }
}

// 使用环境变量
{
  "scripts": {
    "build:dev": "NODE_ENV=development npm run build",
    "build:staging": "NODE_ENV=staging npm run build",
    "build:prod": "NODE_ENV=production npm run build"
  }
}

// 跨平台脚本
npm install --save-dev cross-env

{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack"
  }
}

// 并行执行脚本
npm install --save-dev npm-run-all

{
  "scripts": {
    "build:parallel": "npm-run-all --parallel build:css build:js",
    "build:series": "npm-run-all build:clean build:compile build:minify"
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Gulp 任务自动化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装Gulp
npm install --save-dev gulp

// gulpfile.js
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()

// 样式处理任务
function styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
}

// JavaScript处理任务
function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
}

// 图片优化任务
function images() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images'))
}

// 监听文件变化
function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
    
    gulp.watch('src/scss/**/*.scss', styles)
    gulp.watch('src/js/**/*.js', scripts)
    gulp.watch('src/images/**/*', images)
    gulp.watch('dist/*.html').on('change', browserSync.reload)
}

// 清理任务
function clean() {
    return del(['dist'])
}

// 复制文件任务
function copy() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
}

// 导出任务
exports.styles = styles
exports.scripts = scripts
exports.images = images
exports.watch = watch
exports.clean = clean

// 组合任务
exports.build = gulp.series(clean, gulp.parallel(styles, scripts, images, copy))
exports.dev = gulp.series(exports.build, watch)
exports.default = exports.dev`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 自定义自动化脚本</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// scripts/build.js - 自定义构建脚本
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class BuildAutomation {
    constructor(config) {
        this.config = config
        this.startTime = Date.now()
    }
    
    // 清理构建目录
    clean() {
        console.log('🧹 清理构建目录...')
        if (fs.existsSync(this.config.outputDir)) {
            fs.rmSync(this.config.outputDir, { recursive: true })
        }
        fs.mkdirSync(this.config.outputDir, { recursive: true })
    }
    
    // 构建项目
    build() {
        console.log('🔨 开始构建项目...')
        try {
            execSync('npm run build:vite', { stdio: 'inherit' })
            console.log('✅ 构建完成')
        } catch (error) {
            console.error('❌ 构建失败:', error.message)
            process.exit(1)
        }
    }
    
    // 优化资源
    optimize() {
        console.log('⚡ 优化构建资源...')
        
        // 压缩图片
        this.optimizeImages()
        
        // 生成资源清单
        this.generateManifest()
        
        // 计算文件哈希
        this.generateHashes()
    }
    
    optimizeImages() {
        const imageDir = path.join(this.config.outputDir, 'images')
        if (fs.existsSync(imageDir)) {
            execSync(\`imagemin \${imageDir}/**/* --out-dir=\${imageDir}\`)
        }
    }
    
    generateManifest() {
        const manifest = {
            buildTime: new Date().toISOString(),
            version: process.env.npm_package_version,
            files: this.getFileList()
        }
        
        fs.writeFileSync(
            path.join(this.config.outputDir, 'manifest.json'),
            JSON.stringify(manifest, null, 2)
        )
    }
    
    getFileList() {
        const files = []
        const walkDir = (dir) => {
            const items = fs.readdirSync(dir)
            items.forEach(item => {
                const fullPath = path.join(dir, item)
                const stat = fs.statSync(fullPath)
                if (stat.isDirectory()) {
                    walkDir(fullPath)
                } else {
                    files.push({
                        path: path.relative(this.config.outputDir, fullPath),
                        size: stat.size,
                        modified: stat.mtime
                    })
                }
            })
        }
        walkDir(this.config.outputDir)
        return files
    }
    
    // 部署准备
    prepareDeploy() {
        console.log('📦 准备部署...')
        
        // 生成部署配置
        const deployConfig = {
            timestamp: Date.now(),
            version: process.env.npm_package_version,
            environment: process.env.NODE_ENV || 'production'
        }
        
        fs.writeFileSync(
            path.join(this.config.outputDir, 'deploy.json'),
            JSON.stringify(deployConfig, null, 2)
        )
    }
    
    // 执行完整构建流程
    async run() {
        try {
            this.clean()
            this.build()
            this.optimize()
            this.prepareDeploy()
            
            const duration = Date.now() - this.startTime
            console.log(\`🎉 构建完成! 耗时: \${duration}ms\`)
        } catch (error) {
            console.error('❌ 构建失败:', error)
            process.exit(1)
        }
    }
}

// 使用构建自动化
const config = {
    outputDir: 'dist',
    sourceDir: 'src'
}

const builder = new BuildAutomation(config)
builder.run()

// package.json中使用
{
  "scripts": {
    "build:custom": "node scripts/build.js"
  }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 代码生成工具 */}
                <Card title="🎯 代码生成工具" className={styles.content_card}>
                    <div className={styles.codegen_section}>
                        <h3>Plop.js 代码生成器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Plop.js
npm install --save-dev plop

// plopfile.js
module.exports = function (plop) {
    // React组件生成器
    plop.setGenerator('component', {
        description: '创建React组件',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: '组件名称:'
            },
            {
                type: 'confirm',
                name: 'withStyles',
                message: '是否包含样式文件?',
                default: true
            },
            {
                type: 'confirm',
                name: 'withTest',
                message: '是否包含测试文件?',
                default: true
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/index.tsx',
                templateFile: 'plop-templates/component.hbs'
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss',
                templateFile: 'plop-templates/styles.hbs',
                skip: function(data) {
                    return !data.withStyles
                }
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
                templateFile: 'plop-templates/test.hbs',
                skip: function(data) {
                    return !data.withTest
                }
            }
        ]
    })
    
    // API路由生成器
    plop.setGenerator('api', {
        description: '创建API路由',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'API名称:'
            },
            {
                type: 'list',
                name: 'method',
                message: 'HTTP方法:',
                choices: ['GET', 'POST', 'PUT', 'DELETE']
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/api/{{camelCase name}}.ts',
                templateFile: 'plop-templates/api.hbs'
            }
        ]
    })
    
    // 页面生成器
    plop.setGenerator('page', {
        description: '创建页面组件',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: '页面名称:'
            },
            {
                type: 'confirm',
                name: 'withLayout',
                message: '是否使用布局?',
                default: true
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/index.tsx',
                templateFile: 'plop-templates/page.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.module.scss',
                templateFile: 'plop-templates/page-styles.hbs'
            }
        ]
    })
}

// plop-templates/component.hbs
import React from 'react'
{{#if withStyles}}
import styles from './{{pascalCase name}}.module.scss'
{{/if}}

interface {{pascalCase name}}Props {
    // 定义组件属性
}

const {{pascalCase name}}: React.FC<{{pascalCase name}}Props> = () => {
    return (
        <div{{#if withStyles}} className={styles.container}{{/if}}>
            <h1>{{pascalCase name}} Component</h1>
        </div>
    )
}

export default {{pascalCase name}}

// 使用Plop生成代码
npx plop component
npx plop api
npx plop page`}
                            </pre>
                        </div>
                        
                        <h3>自定义代码生成脚本</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// scripts/generate.js
const fs = require('fs')
const path = require('path')

class CodeGenerator {
    constructor() {
        this.templates = {
            component: this.getComponentTemplate(),
            hook: this.getHookTemplate(),
            service: this.getServiceTemplate()
        }
    }
    
    // React组件模板
    getComponentTemplate() {
        return \`import React from 'react'
import styles from './{{name}}.module.scss'

interface {{name}}Props {
    // 定义组件属性
}

const {{name}}: React.FC<{{name}}Props> = () => {
    return (
        <div className={styles.container}>
            <h1>{{name}} Component</h1>
        </div>
    )
}

export default {{name}}\`
    }
    
    // 自定义Hook模板
    getHookTemplate() {
        return \`import { useState, useEffect } from 'react'

interface Use{{name}}Return {
    // 定义返回类型
}

export const use{{name}} = (): Use{{name}}Return => {
    const [state, setState] = useState()
    
    useEffect(() => {
        // Hook逻辑
    }, [])
    
    return {
        // 返回值
    }
}\`
    }
    
    // 服务模板
    getServiceTemplate() {
        return \`class {{name}}Service {
    private baseURL = '/api/{{lowerCase name}}'
    
    async getAll() {
        const response = await fetch(this.baseURL)
        return response.json()
    }
    
    async getById(id: string) {
        const response = await fetch(\\\`\\\${this.baseURL}/\\\${id}\\\`)
        return response.json()
    }
    
    async create(data: any) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return response.json()
    }
    
    async update(id: string, data: any) {
        const response = await fetch(\\\`\\\${this.baseURL}/\\\${id}\\\`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return response.json()
    }
    
    async delete(id: string) {
        const response = await fetch(\\\`\\\${this.baseURL}/\\\${id}\\\`, {
            method: 'DELETE'
        })
        return response.ok
    }
}

export const {{lowerCase name}}Service = new {{name}}Service()\`
    }
    
    // 生成代码
    generate(type, name, options = {}) {
        const template = this.templates[type]
        if (!template) {
            throw new Error(\`Unknown template type: \${type}\`)
        }
        
        let code = template
            .replace(/{{name}}/g, name)
            .replace(/{{lowerCase name}}/g, name.toLowerCase())
        
        return code
    }
    
    // 创建文件
    createFile(type, name, outputDir) {
        const code = this.generate(type, name)
        const fileName = this.getFileName(type, name)
        const filePath = path.join(outputDir, fileName)
        
        // 确保目录存在
        fs.mkdirSync(path.dirname(filePath), { recursive: true })
        
        // 写入文件
        fs.writeFileSync(filePath, code)
        
        console.log(\`✅ Created \${type}: \${filePath}\`)
    }
    
    getFileName(type, name) {
        switch (type) {
            case 'component':
                return \`\${name}/index.tsx\`
            case 'hook':
                return \`hooks/use\${name}.ts\`
            case 'service':
                return \`services/\${name.toLowerCase()}Service.ts\`
            default:
                return \`\${name}.ts\`
        }
    }
}

// 命令行接口
const args = process.argv.slice(2)
const [type, name] = args

if (!type || !name) {
    console.log('Usage: node generate.js <type> <name>')
    console.log('Types: component, hook, service')
    process.exit(1)
}

const generator = new CodeGenerator()
const outputDir = 'src'

try {
    generator.createFile(type, name, outputDir)
} catch (error) {
    console.error('❌ Generation failed:', error.message)
    process.exit(1)
}

// package.json脚本
{
  "scripts": {
    "generate": "node scripts/generate.js",
    "g:component": "npm run generate component",
    "g:hook": "npm run generate hook",
    "g:service": "npm run generate service"
  }
}

// 使用示例
npm run g:component MyComponent
npm run g:hook MyHook
npm run g:service User`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 自动化工具最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 渐进式自动化</h4>
                                <p>逐步引入自动化工具</p>
                                <ul>
                                    <li>从简单重复任务开始</li>
                                    <li>逐步扩展自动化范围</li>
                                    <li>保持工具链的简洁性</li>
                                    <li>定期评估自动化效果</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 工具标准化</h4>
                                <p>建立团队工具标准</p>
                                <ul>
                                    <li>统一开发环境配置</li>
                                    <li>标准化构建流程</li>
                                    <li>共享自动化脚本</li>
                                    <li>文档化工具使用</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 错误处理</h4>
                                <p>完善的错误处理机制</p>
                                <ul>
                                    <li>提供清晰的错误信息</li>
                                    <li>实施失败重试机制</li>
                                    <li>建立错误通知系统</li>
                                    <li>记录详细的执行日志</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 持续改进</h4>
                                <p>不断优化自动化流程</p>
                                <ul>
                                    <li>收集使用反馈</li>
                                    <li>监控执行性能</li>
                                    <li>更新工具版本</li>
                                    <li>优化执行效率</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AutomationToolsDetail
