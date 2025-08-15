import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    CodeOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const BasicTypesDetail: React.FC = () => {
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
                    <CodeOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 基础类型系统</h1>
                    <p>掌握TypeScript的基础类型与类型注解，构建类型安全的代码基础</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">TypeScript</Tag>
                        <Tag color="green">基础类型</Tag>
                        <Tag color="orange">类型注解</Tag>
                        <Tag color="purple">类型安全</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基本类型 */}
                <Card title="📚 基本数据类型" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>原始类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 布尔类型
let isDone: boolean = false
let isActive: boolean = true

// 数字类型
let decimal: number = 6
let hex: number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744
let big: bigint = 100n

// 字符串类型
let color: string = "blue"
let fullName: string = \`Bob Bobbington\`
let age: number = 37
let sentence: string = \`Hello, my name is \${fullName}.\`

// 空值类型
let unusable: void = undefined
function warnUser(): void {
    console.log("This is my warning message")
}

// Null 和 Undefined
let u: undefined = undefined
let n: null = null`}
                            </pre>
                        </div>
                        
                        <h3>特殊类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// any 类型 - 任意类型
let notSure: any = 4
notSure = "maybe a string instead"
notSure = false

// unknown 类型 - 类型安全的 any
let userInput: unknown
let userName: string

userInput = 5
userInput = "hello"

// 需要类型检查才能使用
if (typeof userInput === "string") {
    userName = userInput  // 现在 TypeScript 知道 userInput 是 string
}

// never 类型 - 永不存在的值的类型
function error(message: string): never {
    throw new Error(message)
}

function infiniteLoop(): never {
    while (true) {}
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 数组和元组 */}
                <Card title="📋 数组与元组" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>数组类型</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 数组类型的两种写法
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// 字符串数组
let fruits: string[] = ["apple", "banana", "orange"]

// 混合类型数组
let mixed: (string | number)[] = ["hello", 42, "world"]

// 只读数组
let readonlyList: ReadonlyArray<number> = [1, 2, 3]
// readonlyList[0] = 4  // 错误：只读数组不能修改

// 数组方法的类型推断
let numbers = [1, 2, 3]  // 推断为 number[]
let doubled = numbers.map(n => n * 2)  // 推断为 number[]
let strings = numbers.map(n => n.toString())  // 推断为 string[]`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>元组类型</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 元组类型 - 固定长度和类型的数组
let x: [string, number]
x = ["hello", 10]  // 正确
// x = [10, "hello"]  // 错误：类型不匹配

// 访问元组元素
console.log(x[0].substring(1))  // 正确：string 类型有 substring 方法
console.log(x[1].substring(1))  // 错误：number 类型没有 substring 方法

// 可选元组元素
let optionalTuple: [string, number?] = ["hello"]
optionalTuple = ["hello", 42]

// 剩余元素
let restTuple: [string, ...number[]] = ["hello", 1, 2, 3]

// 只读元组
let readonlyTuple: readonly [string, number] = ["hello", 42]
// readonlyTuple[0] = "hi"  // 错误：只读元组不能修改

// 命名元组
let namedTuple: [name: string, age: number] = ["John", 30]`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 对象类型 */}
                <Card title="🏗️ 对象类型" className={styles.content_card}>
                    <div className={styles.object_section}>
                        <h3>对象类型注解</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 对象类型注解
let person: { name: string; age: number } = {
    name: "John",
    age: 30
}

// 可选属性
let user: { name: string; age?: number } = {
    name: "Alice"
}

// 只读属性
let point: { readonly x: number; readonly y: number } = {
    x: 10,
    y: 20
}
// point.x = 5  // 错误：只读属性不能修改

// 索引签名
let scores: { [subject: string]: number } = {
    math: 95,
    english: 88,
    science: 92
}

// 混合类型对象
let config: {
    apiUrl: string
    timeout?: number
    [key: string]: any
} = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    debug: true,
    retries: 3
}`}
                            </pre>
                        </div>
                        
                        <h3>接口定义</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 接口定义对象类型
interface User {
    readonly id: number
    name: string
    email: string
    age?: number
    isActive: boolean
}

// 使用接口
let user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    isActive: true
}

// 接口继承
interface Employee extends User {
    employeeId: string
    department: string
    salary: number
}

let employee: Employee = {
    id: 1,
    name: "Jane Smith",
    email: "jane@company.com",
    isActive: true,
    employeeId: "EMP001",
    department: "Engineering",
    salary: 75000
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 函数类型 */}
                <Card title="🔧 函数类型" className={styles.content_card}>
                    <div className={styles.function_section}>
                        <h3>函数类型注解</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 函数声明
function add(x: number, y: number): number {
    return x + y
}

// 函数表达式
let multiply = function(x: number, y: number): number {
    return x * y
}

// 箭头函数
let divide = (x: number, y: number): number => x / y

// 可选参数
function greet(name: string, greeting?: string): string {
    return greeting ? \`\${greeting}, \${name}!\` : \`Hello, \${name}!\`
}

// 默认参数
function createUser(name: string, age: number = 18): User {
    return { name, age, isActive: true }
}

// 剩余参数
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0)
}

// 函数重载
function process(x: string): string
function process(x: number): number
function process(x: string | number): string | number {
    if (typeof x === "string") {
        return x.toUpperCase()
    }
    return x * 2
}`}
                            </pre>
                        </div>
                        
                        <h3>函数类型表达式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 函数类型
type MathOperation = (x: number, y: number) => number

let add: MathOperation = (x, y) => x + y
let subtract: MathOperation = (x, y) => x - y

// 回调函数类型
function processArray(
    arr: number[], 
    callback: (item: number, index: number) => number
): number[] {
    return arr.map(callback)
}

// 使用
let doubled = processArray([1, 2, 3], (item) => item * 2)

// 构造函数类型
type UserConstructor = new (name: string, age: number) => User

class UserClass implements User {
    constructor(public name: string, public age: number) {}
}

let UserCtor: UserConstructor = UserClass`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 类型断言与类型守卫 */}
                <Card title="🛡️ 类型断言与类型守卫" className={styles.content_card}>
                    <div className={styles.assertion_section}>
                        <h3>类型断言</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 类型断言的两种语法
let someValue: unknown = "this is a string"

// 尖括号语法
let strLength1: number = (<string>someValue).length

// as 语法（推荐，在 JSX 中必须使用）
let strLength2: number = (someValue as string).length

// 非空断言操作符
function processUser(user: User | null) {
    // 告诉 TypeScript user 不为 null
    console.log(user!.name)
}

// 常量断言
let colors = ["red", "green", "blue"] as const
// colors 的类型是 readonly ["red", "green", "blue"]
// 而不是 string[]`}
                            </pre>
                        </div>
                        
                        <h3>类型守卫</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// typeof 类型守卫
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value
    }
    if (typeof padding === "string") {
        return padding + value
    }
    throw new Error(\`Expected string or number, got '\${padding}'.\`)
}

// instanceof 类型守卫
class Bird {
    fly() { console.log("flying") }
}

class Fish {
    swim() { console.log("swimming") }
}

function move(animal: Bird | Fish) {
    if (animal instanceof Bird) {
        animal.fly()  // TypeScript 知道这是 Bird
    } else {
        animal.swim()  // TypeScript 知道这是 Fish
    }
}

// 自定义类型守卫
function isString(value: unknown): value is string {
    return typeof value === "string"
}

function processValue(value: unknown) {
    if (isString(value)) {
        // TypeScript 知道 value 是 string 类型
        console.log(value.toUpperCase())
    }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 基础类型最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 优先使用类型推断</h4>
                                <p>让TypeScript自动推断类型，只在必要时添加显式类型注解</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// ✅ 好的做法 - 利用类型推断
let name = "John"  // 推断为 string
let age = 25       // 推断为 number
let users = []     // 推断为 any[]，需要显式注解

// ✅ 需要显式注解的情况
let users: User[] = []  // 空数组需要类型注解
let result: string | null = null  // 联合类型需要注解`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 避免使用 any</h4>
                                <p>尽量避免使用any类型，使用更具体的类型或unknown</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// ❌ 避免
let data: any = fetchData()

// ✅ 更好的做法
let data: unknown = fetchData()
if (typeof data === 'object' && data !== null) {
    // 类型守卫后安全使用
}

// ✅ 或者定义具体类型
interface ApiResponse {
    status: number
    data: any
}
let response: ApiResponse = fetchData()`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 使用严格的类型检查</h4>
                                <p>在tsconfig.json中启用严格模式</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}`}
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

export default BasicTypesDetail
