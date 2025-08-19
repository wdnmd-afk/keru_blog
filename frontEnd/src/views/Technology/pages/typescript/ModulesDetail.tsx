import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    AppstoreOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const ModulesDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/typescript')
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
                    返回TypeScript技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <AppstoreOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 模块系统详解</h1>
                    <p>掌握TypeScript模块化开发与代码组织</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">模块系统</Tag>
                        <Tag color="green">ES Modules</Tag>
                        <Tag color="orange">CommonJS</Tag>
                        <Tag color="purple">命名空间</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 模块基础 */}
                <Card title="📦 TypeScript 模块基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是模块？</h3>
                        <p>模块是包含代码的文件，可以导出变量、函数、类、接口等，供其他模块使用。TypeScript支持ES6模块语法，同时兼容CommonJS和AMD等模块系统。</p>
                        
                        <h3>模块系统对比</h3>
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h4>📄 ES Modules (ESM)</h4>
                                <p><strong>现代标准</strong>：ES6+的官方模块系统</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>静态分析，支持Tree Shaking</li>
                                            <li>异步加载支持</li>
                                            <li>现代浏览器原生支持</li>
                                            <li>更好的TypeScript集成</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.comparison_item}>
                                <h4>📋 CommonJS</h4>
                                <p><strong>Node.js标准</strong>：服务端JavaScript模块系统</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>Node.js原生支持</li>
                                            <li>同步加载，简单直接</li>
                                            <li>广泛的生态支持</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>不支持静态分析</li>
                                            <li>浏览器需要打包工具</li>
                                            <li>同步加载影响性能</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <Alert
                            message="推荐使用ES Modules"
                            description="在新项目中推荐使用ES Modules，它是JavaScript的官方标准，具有更好的性能和工具支持。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>
                
                {/* ES Modules */}
                <Card title="🎯 ES Modules 详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基本导出与导入</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// math.ts - 导出模块
export const PI = 3.14159

export function add(a: number, b: number): number {
    return a + b
}

export class Calculator {
    multiply(a: number, b: number): number {
        return a * b
    }
}

// 默认导出
export default function subtract(a: number, b: number): number {
    return a - b
}

// main.ts - 导入模块
import subtract, { PI, add, Calculator } from './math'
import * as MathUtils from './math'

console.log(PI) // 3.14159
console.log(add(2, 3)) // 5
console.log(subtract(5, 2)) // 3

const calc = new Calculator()
console.log(calc.multiply(4, 5)) // 20

// 使用命名空间导入
console.log(MathUtils.PI)
console.log(MathUtils.add(1, 2))`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 高级导出模式</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// utils.ts
const API_URL = 'https://api.example.com'
const VERSION = '1.0.0'

function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
}

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// 批量导出
export {
    API_URL,
    VERSION,
    formatDate,
    validateEmail
}

// 重新导出
export { default as Logger } from './logger'
export * from './constants'

// 条件导出
export const config = process.env.NODE_ENV === 'production' 
    ? require('./config.prod') 
    : require('./config.dev')

// 类型导出
export type User = {
    id: number
    name: string
    email: string
}

export interface ApiResponse<T> {
    data: T
    status: number
    message: string
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 动态导入</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 动态导入模块
async function loadMathModule() {
    const mathModule = await import('./math')
    return mathModule
}

// 条件导入
async function loadChart(type: 'bar' | 'line' | 'pie') {
    switch (type) {
        case 'bar':
            const { BarChart } = await import('./charts/BarChart')
            return BarChart
        case 'line':
            const { LineChart } = await import('./charts/LineChart')
            return LineChart
        case 'pie':
            const { PieChart } = await import('./charts/PieChart')
            return PieChart
    }
}

// 懒加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'))

// 使用动态导入
loadMathModule().then(math => {
    console.log(math.add(1, 2))
})

// 错误处理
try {
    const module = await import('./optional-module')
    module.doSomething()
} catch (error) {
    console.log('模块加载失败:', error)
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 模块解析 */}
                <Card title="🔍 模块解析策略" className={styles.content_card}>
                    <div className={styles.resolution_section}>
                        <h3>TypeScript模块解析</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// tsconfig.json 模块解析配置
{
  "compilerOptions": {
    "moduleResolution": "node",  // 或 "classic"
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"]
    },
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "types": ["node", "jest", "react"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true
  }
}

// 路径映射示例
import Button from '@components/Button'  // -> src/components/Button
import { formatDate } from '@utils/date'  // -> src/utils/date
import type { User } from '@types/user'   // -> src/types/user

// 模块解析顺序
// 1. 相对路径: ./module, ../module
// 2. 绝对路径: /root/module
// 3. 模块名称: lodash, react
// 4. 路径映射: @/module`}
                            </pre>
                        </div>
                        
                        <h3>声明文件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// types/global.d.ts - 全局类型声明
declare global {
    interface Window {
        gtag: (command: string, ...args: any[]) => void
    }
    
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test'
            API_URL: string
            DATABASE_URL: string
        }
    }
}

// types/modules.d.ts - 模块声明
declare module '*.svg' {
    const content: string
    export default content
}

declare module '*.css' {
    const classes: { [key: string]: string }
    export default classes
}

declare module 'custom-library' {
    export function customFunction(param: string): number
    export interface CustomInterface {
        prop: string
    }
}

// 扩展现有模块
declare module 'express' {
    interface Request {
        user?: {
            id: string
            email: string
        }
    }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 命名空间 */}
                <Card title="🏷️ 命名空间与模块" className={styles.content_card}>
                    <div className={styles.namespace_section}>
                        <h3>命名空间基础</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 命名空间定义
namespace Geometry {
    export interface Point {
        x: number
        y: number
    }
    
    export class Circle {
        constructor(
            public center: Point,
            public radius: number
        ) {}
        
        area(): number {
            return Math.PI * this.radius ** 2
        }
    }
    
    export namespace Utils {
        export function distance(p1: Point, p2: Point): number {
            return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
        }
    }
}

// 使用命名空间
const center: Geometry.Point = { x: 0, y: 0 }
const circle = new Geometry.Circle(center, 5)
console.log(circle.area())

const p1: Geometry.Point = { x: 0, y: 0 }
const p2: Geometry.Point = { x: 3, y: 4 }
console.log(Geometry.Utils.distance(p1, p2)) // 5`}
                            </pre>
                        </div>
                        
                        <h3>模块 vs 命名空间</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// ❌ 不推荐：使用命名空间
namespace MyLibrary {
    export class Helper {
        static format(value: string): string {
            return value.toUpperCase()
        }
    }
}

// ✅ 推荐：使用模块
// helper.ts
export class Helper {
    static format(value: string): string {
        return value.toUpperCase()
    }
}

// main.ts
import { Helper } from './helper'

// 何时使用命名空间：
// 1. 全局库的类型定义
// 2. 扩展现有的全局对象
// 3. 内部API组织（不对外暴露）

// 全局库类型定义示例
declare namespace jQuery {
    interface JQuery {
        customPlugin(options?: any): JQuery
    }
}

// 扩展全局对象
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 模块系统最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 模块组织</h4>
                                <p>合理组织模块结构</p>
                                <ul>
                                    <li>使用ES Modules作为首选</li>
                                    <li>保持模块职责单一</li>
                                    <li>避免循环依赖</li>
                                    <li>使用路径映射简化导入</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 导出策略</h4>
                                <p>选择合适的导出方式</p>
                                <ul>
                                    <li>优先使用命名导出</li>
                                    <li>默认导出用于主要功能</li>
                                    <li>避免混合导出模式</li>
                                    <li>保持导出接口稳定</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 类型管理</h4>
                                <p>有效管理类型定义</p>
                                <ul>
                                    <li>分离类型定义文件</li>
                                    <li>使用类型导出</li>
                                    <li>避免类型污染</li>
                                    <li>合理使用声明合并</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 性能优化</h4>
                                <p>优化模块加载性能</p>
                                <ul>
                                    <li>使用动态导入实现懒加载</li>
                                    <li>避免不必要的依赖</li>
                                    <li>利用Tree Shaking</li>
                                    <li>合理配置模块解析</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ModulesDetail
