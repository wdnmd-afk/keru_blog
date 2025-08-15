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

const GenericsDetail: React.FC = () => {
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
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 泛型编程</h1>
                    <p>掌握泛型的使用技巧与实际应用场景，编写更灵活的类型安全代码</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">TypeScript</Tag>
                        <Tag color="green">泛型</Tag>
                        <Tag color="orange">类型编程</Tag>
                        <Tag color="purple">代码复用</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 泛型基础 */}
                <Card title="📚 泛型基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是泛型？</h3>
                        <p>泛型允许我们在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。它提供了一种创建可重用组件的方法，这些组件可以支持多种类型的数据。</p>
                        
                        <h3>基本语法</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 泛型函数
function identity<T>(arg: T): T {
    return arg
}

// 使用泛型函数
let output1 = identity<string>("hello")    // 显式指定类型
let output2 = identity("hello")            // 类型推断
let output3 = identity<number>(42)
let output4 = identity(42)

// 泛型箭头函数
const identity2 = <T>(arg: T): T => arg

// 多个泛型参数
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second]
}

let result = pair<string, number>("hello", 42)  // [string, number]
let result2 = pair("world", true)               // [string, boolean]`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 泛型约束 */}
                <Card title="🔗 泛型约束" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. extends 约束</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 基本约束
interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)  // 现在我们知道arg有length属性
    return arg
}

loggingIdentity("hello")        // ✅ string有length属性
loggingIdentity([1, 2, 3])      // ✅ array有length属性
loggingIdentity({ length: 10 }) // ✅ 对象有length属性
// loggingIdentity(3)           // ❌ number没有length属性

// 约束泛型参数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}

let person = { name: "John", age: 30, city: "New York" }
let name = getProperty(person, "name")     // string
let age = getProperty(person, "age")       // number
// let invalid = getProperty(person, "salary") // ❌ 'salary'不存在于person中`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 条件约束</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 条件类型约束
type NonNullable<T> = T extends null | undefined ? never : T

type Example1 = NonNullable<string | null>      // string
type Example2 = NonNullable<number | undefined> // number

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type FuncReturn = ReturnType<() => string>              // string
type FuncReturn2 = ReturnType<(x: number) => boolean>   // boolean

// 提取数组元素类型
type ArrayElement<T> = T extends (infer U)[] ? U : never

type StringArray = ArrayElement<string[]>  // string
type NumberArray = ArrayElement<number[]>  // number

// 复杂条件约束
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 泛型接口与类 */}
                <Card title="🏗️ 泛型接口与类" className={styles.content_card}>
                    <div className={styles.interface_section}>
                        <h3>泛型接口</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 泛型接口定义
interface GenericIdentityFn<T> {
    (arg: T): T
}

function identity<T>(arg: T): T {
    return arg
}

let myIdentity: GenericIdentityFn<number> = identity

// 泛型接口的实际应用
interface Repository<T> {
    findById(id: string): Promise<T | null>
    findAll(): Promise<T[]>
    create(entity: Omit<T, 'id'>): Promise<T>
    update(id: string, entity: Partial<T>): Promise<T>
    delete(id: string): Promise<void>
}

interface User {
    id: string
    name: string
    email: string
}

class UserRepository implements Repository<User> {
    async findById(id: string): Promise<User | null> {
        // 实现查找逻辑
        return null
    }
    
    async findAll(): Promise<User[]> {
        // 实现查找所有逻辑
        return []
    }
    
    async create(userData: Omit<User, 'id'>): Promise<User> {
        // 实现创建逻辑
        return { id: '1', ...userData }
    }
    
    async update(id: string, userData: Partial<User>): Promise<User> {
        // 实现更新逻辑
        return { id, name: '', email: '', ...userData }
    }
    
    async delete(id: string): Promise<void> {
        // 实现删除逻辑
    }
}`}
                            </pre>
                        </div>
                        
                        <h3>泛型类</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 泛型类定义
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
    
    constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
        this.zeroValue = zeroValue
        this.add = addFn
    }
}

let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y)
let myGenericString = new GenericNumber<string>("", (x, y) => x + y)

// 实际应用：数据结构
class Stack<T> {
    private items: T[] = []
    
    push(item: T): void {
        this.items.push(item)
    }
    
    pop(): T | undefined {
        return this.items.pop()
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1]
    }
    
    isEmpty(): boolean {
        return this.items.length === 0
    }
    
    size(): number {
        return this.items.length
    }
}

const numberStack = new Stack<number>()
numberStack.push(1)
numberStack.push(2)
console.log(numberStack.pop()) // 2

const stringStack = new Stack<string>()
stringStack.push("hello")
stringStack.push("world")`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 高级泛型模式 */}
                <Card title="🚀 高级泛型模式" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. 泛型工厂模式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 泛型工厂函数
function createInstance<T>(constructor: new () => T): T {
    return new constructor()
}

class Dog {
    name = "Dog"
    bark() { console.log("Woof!") }
}

class Cat {
    name = "Cat"
    meow() { console.log("Meow!") }
}

const dog = createInstance(Dog)  // Dog类型
const cat = createInstance(Cat)  // Cat类型

// 带参数的泛型工厂
function createInstanceWithArgs<T, A extends any[]>(
    constructor: new (...args: A) => T,
    ...args: A
): T {
    return new constructor(...args)
}

class Person {
    constructor(public name: string, public age: number) {}
}

const person = createInstanceWithArgs(Person, "John", 30)  // Person类型`}
                            </pre>
                        </div>
                        
                        <h3>2. 泛型装饰器模式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 泛型装饰器
function Memoize<T extends (...args: any[]) => any>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value!
    const cache = new Map()
    
    descriptor.value = ((...args: Parameters<T>) => {
        const key = JSON.stringify(args)
        if (cache.has(key)) {
            return cache.get(key)
        }
        
        const result = originalMethod.apply(this, args)
        cache.set(key, result)
        return result
    }) as T
    
    return descriptor
}

class Calculator {
    @Memoize
    fibonacci(n: number): number {
        if (n <= 1) return n
        return this.fibonacci(n - 1) + this.fibonacci(n - 2)
    }
}`}
                            </pre>
                        </div>
                        
                        <h3>3. 泛型Builder模式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 泛型Builder
class QueryBuilder<T> {
    private conditions: string[] = []
    private orderBy: string[] = []
    private limitValue?: number
    
    where(condition: keyof T, operator: string, value: any): this {
        this.conditions.push(\`\${String(condition)} \${operator} '\${value}'\`)
        return this
    }
    
    orderByField(field: keyof T, direction: 'ASC' | 'DESC' = 'ASC'): this {
        this.orderBy.push(\`\${String(field)} \${direction}\`)
        return this
    }
    
    limit(count: number): this {
        this.limitValue = count
        return this
    }
    
    build(): string {
        let query = "SELECT * FROM table"
        
        if (this.conditions.length > 0) {
            query += \` WHERE \${this.conditions.join(' AND ')}\`
        }
        
        if (this.orderBy.length > 0) {
            query += \` ORDER BY \${this.orderBy.join(', ')}\`
        }
        
        if (this.limitValue) {
            query += \` LIMIT \${this.limitValue}\`
        }
        
        return query
    }
}

interface User {
    id: number
    name: string
    email: string
    age: number
}

const query = new QueryBuilder<User>()
    .where('age', '>', 18)
    .where('name', 'LIKE', 'John%')
    .orderByField('name', 'ASC')
    .limit(10)
    .build()

console.log(query)
// SELECT * FROM table WHERE age > '18' AND name LIKE 'John%' ORDER BY name ASC LIMIT 10`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 实际应用场景 */}
                <Card title="💡 实际应用场景" className={styles.content_card}>
                    <div className={styles.application_section}>
                        <h3>1. API响应类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 通用API响应类型
interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
    errors?: string[]
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

// 使用示例
async function fetchUsers(): Promise<PaginatedResponse<User>> {
    const response = await fetch('/api/users')
    return response.json()
}

async function fetchUser(id: string): Promise<ApiResponse<User>> {
    const response = await fetch(\`/api/users/\${id}\`)
    return response.json()
}`}
                            </pre>
                        </div>
                        
                        <h3>2. 状态管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 泛型状态管理
interface AsyncState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

function createAsyncState<T>(): AsyncState<T> {
    return {
        data: null,
        loading: false,
        error: null
    }
}

// 状态更新函数
type AsyncStateUpdater<T> = {
    setLoading: () => void
    setData: (data: T) => void
    setError: (error: string) => void
    reset: () => void
}

function useAsyncState<T>(): [AsyncState<T>, AsyncStateUpdater<T>] {
    const [state, setState] = useState<AsyncState<T>>(createAsyncState<T>())
    
    const updater: AsyncStateUpdater<T> = {
        setLoading: () => setState(prev => ({ ...prev, loading: true, error: null })),
        setData: (data: T) => setState({ data, loading: false, error: null }),
        setError: (error: string) => setState(prev => ({ ...prev, loading: false, error })),
        reset: () => setState(createAsyncState<T>())
    }
    
    return [state, updater]
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 泛型最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 合理命名泛型参数</h4>
                                <p>使用有意义的泛型参数名称</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// ❌ 不好的命名
function process<T, U, V>(a: T, b: U): V { ... }

// ✅ 好的命名
function mapArray<TInput, TOutput>(
    array: TInput[], 
    mapper: (item: TInput) => TOutput
): TOutput[] { ... }

// 常用约定
// T - Type（类型）
// K - Key（键）
// V - Value（值）
// E - Element（元素）
// R - Return（返回值）`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 避免过度泛型化</h4>
                                <p>只在需要类型复用时使用泛型</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// ❌ 过度泛型化
function addNumbers<T extends number>(a: T, b: T): T {
    return (a + b) as T
}

// ✅ 简单直接
function addNumbers(a: number, b: number): number {
    return a + b
}

// ✅ 合理使用泛型
function combineArrays<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2]
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 提供默认类型参数</h4>
                                <p>为泛型参数提供合理的默认值</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 提供默认类型
interface EventEmitter<T = any> {
    on(event: string, listener: (data: T) => void): void
    emit(event: string, data: T): void
}

// 使用时可以省略类型参数
const emitter = new EventEmitter()  // EventEmitter<any>
const typedEmitter = new EventEmitter<User>()  // EventEmitter<User>`}
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

export default GenericsDetail
