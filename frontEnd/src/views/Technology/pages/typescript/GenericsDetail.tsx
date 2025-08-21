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
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const GenericsDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('TypeScript', 'generics')

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
                        {codeData.basicGenerics && (
                            <CodeHighlight
                                code={codeData.basicGenerics.code}
                                language={codeData.basicGenerics.language}
                                title={codeData.basicGenerics.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 泛型约束 */}
                <Card title="🔗 泛型约束" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. extends 约束</h4>
                            <div className={styles.code_block}>
                                {codeData.genericConstraints && (
                                    <CodeHighlight
                                        code={codeData.genericConstraints.code}
                                        language={codeData.genericConstraints.language}
                                        title={codeData.genericConstraints.title}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 条件约束</h4>
                            {codeData.conditionalTypes && (
                                <CodeHighlight
                                    code={codeData.conditionalTypes.code}
                                    language={codeData.conditionalTypes.language}
                                    title={codeData.conditionalTypes.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* 泛型接口与类 */}
                <Card title="🏗️ 泛型接口与类" className={styles.content_card}>
                    <div className={styles.interface_section}>
                        <h3>泛型接口</h3>
                        {codeData.genericInterfaces && (
                            <CodeHighlight
                                code={codeData.genericInterfaces.code}
                                language={codeData.genericInterfaces.language}
                                title={codeData.genericInterfaces.title}
                            />
                        )}

                        <h3>泛型类</h3>
                        {codeData.genericClasses && (
                            <CodeHighlight
                                code={codeData.genericClasses.code}
                                language={codeData.genericClasses.language}
                                title={codeData.genericClasses.title}
                            />
                        )}
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
                        {codeData.utilityTypes && (
                            <CodeHighlight
                                code={codeData.utilityTypes.code}
                                language={codeData.utilityTypes.language}
                                title={codeData.utilityTypes.title}
                            />
                        )}

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
