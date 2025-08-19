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
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const AdvancedTypesDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'advancedTypes')

    const handleBack = () => {
        navigate('/technology/typescript')
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
                    返回TypeScript技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 高级类型</h1>
                    <p>掌握TypeScript的高级类型系统，提升类型编程能力</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">TypeScript</Tag>
                        <Tag color="green">高级类型</Tag>
                        <Tag color="orange">类型编程</Tag>
                        <Tag color="purple">类型安全</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 联合类型与交叉类型 */}
                <Card title="🔗 联合类型与交叉类型" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>联合类型 (Union Types)</h3>
                        <p>联合类型表示一个值可以是几种类型之一，使用 | 分隔每个类型。</p>

                        <div className={styles.code_block}>
                            <pre>
{`// 基本联合类型
type StringOrNumber = string | number

function formatValue(value: StringOrNumber): string {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toString()
}

// 字面量联合类型
type Theme = 'light' | 'dark' | 'auto'
type Status = 'loading' | 'success' | 'error'

interface Button {
  theme: Theme
  status: Status
  size: 'small' | 'medium' | 'large'
}

// 对象联合类型
type ApiResponse = 
  | { status: 'success'; data: any }
  | { status: 'error'; message: string }

function handleResponse(response: ApiResponse) {
  if (response.status === 'success') {
    console.log(response.data) // TypeScript知道这里有data属性
  } else {
    console.log(response.message) // TypeScript知道这里有message属性
  }
}`}
                            </pre>
                        </div>

                        <h3>交叉类型 (Intersection Types)</h3>
                        <p>交叉类型将多个类型合并为一个类型，使用 & 连接。</p>

                        <div className={styles.code_block}>
                            <pre>
{`// 基本交叉类型
interface Person {
  name: string
  age: number
}

interface Employee {
  employeeId: string
  department: string
}

type PersonEmployee = Person & Employee

const worker: PersonEmployee = {
  name: 'John',
  age: 30,
  employeeId: 'E001',
  department: 'Engineering'
}

// Mixin模式
interface Timestamped {
  timestamp: Date
}

interface Tagged {
  tags: string[]
}

type TimestampedTagged<T> = T & Timestamped & Tagged

interface Article {
  title: string
  content: string
}

const blogPost: TimestampedTagged<Article> = {
  title: 'TypeScript高级类型',
  content: '...',
  timestamp: new Date(),
  tags: ['typescript', 'programming']
}`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 条件类型 */}
                <Card title="🎯 条件类型" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>基本条件类型</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 条件类型语法: T extends U ? X : Y
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string>  // true
type Test2 = IsString<number>  // false

// 实用的条件类型
type NonNullable<T> = T extends null | undefined ? never : T

type Example1 = NonNullable<string | null>      // string
type Example2 = NonNullable<number | undefined> // number

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type FuncReturn = ReturnType<() => string>  // string
type FuncReturn2 = ReturnType<(x: number) => boolean>  // boolean`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>分布式条件类型</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 当条件类型作用于联合类型时，会分布式地应用
type ToArray<T> = T extends any ? T[] : never

type StringArray = ToArray<string>           // string[]
type NumberArray = ToArray<number>           // number[]
type UnionArray = ToArray<string | number>   // string[] | number[]

// 排除类型
type Exclude<T, U> = T extends U ? never : T

type WithoutString = Exclude<string | number | boolean, string>  // number | boolean

// 提取类型
type Extract<T, U> = T extends U ? T : never

type OnlyString = Extract<string | number | boolean, string>  // string`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 映射类型 */}
                <Card title="🗺️ 映射类型" className={styles.content_card}>
                    <div className={styles.mapping_section}>
                        <h3>基本映射类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 基本映射类型语法
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

// 使用示例
interface User {
  id: number
  name: string
  email?: string
}

type ReadonlyUser = Readonly<User>
// {
//   readonly id: number
//   readonly name: string
//   readonly email?: string
// }

type PartialUser = Partial<User>
// {
//   id?: number
//   name?: string
//   email?: string
// }

type RequiredUser = Required<User>
// {
//   id: number
//   name: string
//   email: string  // 注意：不再是可选的
// }`}
                            </pre>
                        </div>

                        <h3>高级映射类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 键名重映射
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}

interface Person {
  name: string
  age: number
}

type PersonGetters = Getters<Person>
// {
//   getName: () => string
//   getAge: () => number
// }

// 条件映射
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

interface Example {
  name: string
  age: number
  getName(): string
}

type ExampleData = NonFunctionProperties<Example>
// {
//   name: string
//   age: number
// }`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 模板字面量类型 */}
                <Card title="📝 模板字面量类型" className={styles.content_card}>
                    <div className={styles.template_section}>
                        <h3>模板字面量类型 (Template Literal Types)</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 基本模板字面量类型
type World = "world"
type Greeting = \`hello \${World}\`  // "hello world"

// 联合类型的组合
type EmailLocaleIDs = "welcome_email" | "email_heading"
type FooterLocaleIDs = "footer_title" | "footer_sendoff"

type AllLocaleIDs = \`\${EmailLocaleIDs | FooterLocaleIDs}_id\`
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

// 实用示例：CSS属性
type CSSProperties = {
  [K in \`margin\${'Top' | 'Right' | 'Bottom' | 'Left'}\`]?: string
} & {
  [K in \`padding\${'Top' | 'Right' | 'Bottom' | 'Left'}\`]?: string
}

const styles: CSSProperties = {
  marginTop: '10px',
  paddingLeft: '20px'
}

// 事件处理器类型
type EventHandlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]?: (value: T[K]) => void
}

interface FormData {
  name: string
  email: string
  age: number
}

type FormHandlers = EventHandlers<FormData>
// {
//   onName?: (value: string) => void
//   onEmail?: (value: string) => void
//   onAge?: (value: number) => void
// }`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 高级类型最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 类型守卫 (Type Guards)</h4>
                                <p>使用类型守卫来缩小联合类型的范围</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 自定义类型守卫
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

// 使用类型守卫
function processValue(value: string | number | boolean) {
  if (isString(value)) {
    // TypeScript知道这里value是string类型
    console.log(value.toUpperCase())
  } else if (isNumber(value)) {
    // TypeScript知道这里value是number类型
    console.log(value.toFixed(2))
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 工具类型的组合使用</h4>
                                <p>组合多个工具类型来创建复杂的类型转换</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 创建一个只包含特定类型属性的新类型
type PickByType<T, U> = Pick<T, {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]>

interface Example {
  id: number
  name: string
  age: number
  isActive: boolean
  tags: string[]
}

type StringProperties = PickByType<Example, string>
// { name: string }

type NumberProperties = PickByType<Example, number>
// { id: number; age: number }`}
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

export default AdvancedTypesDetail
