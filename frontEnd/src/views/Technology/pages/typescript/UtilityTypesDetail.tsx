import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ToolOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const UtilityTypesDetail: React.FC = () => {
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
                    <ToolOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 工具类型详解</h1>
                    <p>掌握TypeScript内置工具类型的使用与实现</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">工具类型</Tag>
                        <Tag color="green">类型操作</Tag>
                        <Tag color="orange">类型转换</Tag>
                        <Tag color="purple">高级类型</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 工具类型概述 */}
                <Card title="🛠️ 工具类型概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是工具类型？</h3>
                        <p>工具类型（Utility Types）是TypeScript内置的一组类型操作符，用于对现有类型进行转换和操作，帮助开发者更灵活地处理类型定义。</p>
                        
                        <h3>常用工具类型分类</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔧 属性操作</h4>
                                <p>Partial, Required, Readonly, Pick, Omit</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔄 类型转换</h4>
                                <p>Record, Extract, Exclude, NonNullable</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📝 函数相关</h4>
                                <p>Parameters, ReturnType, ConstructorParameters</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🎯 条件类型</h4>
                                <p>Awaited, ThisParameterType, OmitThisParameter</p>
                            </div>
                        </div>
                        
                        <Alert
                            message="工具类型的优势"
                            description="工具类型提供了类型安全的方式来操作和转换类型，避免重复定义，提高代码的可维护性和复用性。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>
                
                {/* 属性操作类型 */}
                <Card title="🔧 属性操作类型" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Partial & Required</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 基础接口
interface User {
    id: number
    name: string
    email: string
    age: number
}

// Partial<T> - 将所有属性变为可选
type PartialUser = Partial<User>
// 等价于:
// {
//     id?: number
//     name?: string
//     email?: string
//     age?: number
// }

// 使用场景：更新操作
function updateUser(id: number, updates: Partial<User>) {
    // 只需要传递需要更新的字段
}

updateUser(1, { name: '新名字' }) // ✅ 有效
updateUser(1, { email: 'new@email.com', age: 25 }) // ✅ 有效

// Required<T> - 将所有属性变为必需
interface OptionalConfig {
    host?: string
    port?: number
    ssl?: boolean
}

type RequiredConfig = Required<OptionalConfig>
// 等价于:
// {
//     host: string
//     port: number
//     ssl: boolean
// }

// 自定义实现
type MyPartial<T> = {
    [P in keyof T]?: T[P]
}

type MyRequired<T> = {
    [P in keyof T]-?: T[P]  // -? 移除可选修饰符
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Pick & Omit</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Pick<T, K> - 选择指定属性
type UserBasicInfo = Pick<User, 'id' | 'name'>
// 等价于:
// {
//     id: number
//     name: string
// }

// 使用场景：API响应类型
interface UserResponse extends Pick<User, 'id' | 'name' | 'email'> {
    createdAt: string
    updatedAt: string
}

// Omit<T, K> - 排除指定属性
type UserWithoutId = Omit<User, 'id'>
// 等价于:
// {
//     name: string
//     email: string
//     age: number
// }

// 使用场景：创建操作
function createUser(userData: Omit<User, 'id'>): User {
    return {
        id: Math.random(),
        ...userData
    }
}

// 组合使用
type UserPublicInfo = Pick<User, 'name' | 'email'>
type UserPrivateInfo = Omit<User, keyof UserPublicInfo>

// 自定义实现
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. Readonly</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Readonly<T> - 将所有属性变为只读
type ReadonlyUser = Readonly<User>
// 等价于:
// {
//     readonly id: number
//     readonly name: string
//     readonly email: string
//     readonly age: number
// }

// 使用场景：不可变数据
function processUser(user: Readonly<User>) {
    // user.name = '新名字' // ❌ 错误：无法分配到只读属性
    return { ...user, name: '新名字' } // ✅ 正确：创建新对象
}

// 深度只读
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

interface NestedData {
    user: User
    settings: {
        theme: string
        notifications: boolean
    }
}

type DeepReadonlyData = DeepReadonly<NestedData>
// 所有嵌套属性都变为只读

// 条件只读
type ConditionalReadonly<T, K extends keyof T> = {
    readonly [P in K]: T[P]
} & {
    [P in Exclude<keyof T, K>]: T[P]
}

type UserWithReadonlyId = ConditionalReadonly<User, 'id'>
// id是只读的，其他属性可修改`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 类型转换工具 */}
                <Card title="🔄 类型转换工具" className={styles.content_card}>
                    <div className={styles.transform_section}>
                        <h3>Record & Extract & Exclude</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Record<K, T> - 创建键值对类型
type UserRoles = 'admin' | 'user' | 'guest'
type RolePermissions = Record<UserRoles, string[]>
// 等价于:
// {
//     admin: string[]
//     user: string[]
//     guest: string[]
// }

const permissions: RolePermissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
}

// 动态键类型
type DynamicRecord<T extends string> = Record<T, any>
type ApiEndpoints = DynamicRecord<'users' | 'posts' | 'comments'>

// Extract<T, U> - 提取可分配给U的类型
type StringOrNumber = string | number | boolean
type OnlyStringOrNumber = Extract<StringOrNumber, string | number>
// 结果: string | number

// 使用场景：过滤联合类型
type EventType = 'click' | 'scroll' | 'resize' | 'load'
type MouseEvents = Extract<EventType, 'click' | 'scroll'>
// 结果: 'click' | 'scroll'

// Exclude<T, U> - 排除可分配给U的类型
type WithoutBoolean = Exclude<StringOrNumber, boolean>
// 结果: string | number

// 使用场景：移除特定类型
type NonMouseEvents = Exclude<EventType, MouseEvents>
// 结果: 'resize' | 'load'`}
                            </pre>
                        </div>
                        
                        <h3>NonNullable & 条件类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// NonNullable<T> - 排除null和undefined
type MaybeString = string | null | undefined
type DefinitelyString = NonNullable<MaybeString>
// 结果: string

// 使用场景：过滤空值
function processValue<T>(value: T): NonNullable<T> {
    if (value == null) {
        throw new Error('Value cannot be null or undefined')
    }
    return value
}

// 自定义NonNullable
type MyNonNullable<T> = T extends null | undefined ? never : T

// 复杂条件类型示例
type IsArray<T> = T extends any[] ? true : false
type Test1 = IsArray<string[]> // true
type Test2 = IsArray<string>   // false

// 递归条件类型
type Flatten<T> = T extends (infer U)[] ? Flatten<U> : T
type Test3 = Flatten<string[][]> // string
type Test4 = Flatten<number[][][]> // number

// 分布式条件类型
type ToArray<T> = T extends any ? T[] : never
type Test5 = ToArray<string | number> // string[] | number[]`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 函数相关工具类型 */}
                <Card title="📝 函数相关工具类型" className={styles.content_card}>
                    <div className={styles.function_section}>
                        <h3>Parameters & ReturnType</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 示例函数
function createUser(name: string, age: number, email?: string): User {
    return { id: 1, name, age, email: email || '' }
}

// Parameters<T> - 获取函数参数类型
type CreateUserParams = Parameters<typeof createUser>
// 结果: [name: string, age: number, email?: string]

// 使用场景：函数包装器
function loggedCreateUser(...args: Parameters<typeof createUser>) {
    console.log('Creating user with:', args)
    return createUser(...args)
}

// ReturnType<T> - 获取函数返回类型
type CreateUserReturn = ReturnType<typeof createUser>
// 结果: User

// 使用场景：API响应类型
async function fetchUser(id: number): Promise<User> {
    // 实现...
    return {} as User
}

type FetchUserResponse = ReturnType<typeof fetchUser>
// 结果: Promise<User>

// 获取Promise的解析类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type UserData = UnwrapPromise<FetchUserResponse>
// 结果: User`}
                            </pre>
                        </div>
                        
                        <h3>ConstructorParameters & 高级函数类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 类构造函数
class DatabaseConnection {
    constructor(
        private host: string,
        private port: number,
        private options?: { ssl: boolean }
    ) {}
}

// ConstructorParameters<T> - 获取构造函数参数类型
type DbConnectionParams = ConstructorParameters<typeof DatabaseConnection>
// 结果: [host: string, port: number, options?: { ssl: boolean }]

// 使用场景：工厂函数
function createConnection(...args: ConstructorParameters<typeof DatabaseConnection>) {
    return new DatabaseConnection(...args)
}

// InstanceType<T> - 获取构造函数的实例类型
type DbInstance = InstanceType<typeof DatabaseConnection>
// 结果: DatabaseConnection

// ThisParameterType<T> - 获取函数的this参数类型
function greet(this: User, message: string) {
    return \`\${this.name}: \${message}\`
}

type GreetThis = ThisParameterType<typeof greet>
// 结果: User

// OmitThisParameter<T> - 移除this参数
type GreetWithoutThis = OmitThisParameter<typeof greet>
// 结果: (message: string) => string

// 高级函数类型操作
type AsyncReturnType<T extends (...args: any) => Promise<any>> = 
    T extends (...args: any) => Promise<infer R> ? R : never

async function fetchData(): Promise<{ users: User[] }> {
    return { users: [] }
}

type FetchDataResult = AsyncReturnType<typeof fetchData>
// 结果: { users: User[] }`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 自定义工具类型 */}
                <Card title="🎨 自定义工具类型" className={styles.content_card}>
                    <div className={styles.custom_section}>
                        <h3>实用自定义工具类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 1. 深度部分类型
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// 2. 键值互换
type Reverse<T extends Record<string, string>> = {
    [K in T[keyof T]]: {
        [P in keyof T]: T[P] extends K ? P : never
    }[keyof T]
}

type Colors = { red: '#ff0000'; green: '#00ff00'; blue: '#0000ff' }
type ColorValues = Reverse<Colors>
// 结果: { '#ff0000': 'red'; '#00ff00': 'green'; '#0000ff': 'blue' }

// 3. 可空类型
type Nullable<T> = T | null
type Optional<T> = T | undefined
type Maybe<T> = T | null | undefined

// 4. 数组元素类型
type ArrayElement<T> = T extends (infer U)[] ? U : never
type StringArrayElement = ArrayElement<string[]> // string

// 5. 对象值类型
type ValueOf<T> = T[keyof T]
type UserValues = ValueOf<User> // string | number

// 6. 函数重载类型
type Overload<T> = T extends {
    (...args: infer A1): infer R1
    (...args: infer A2): infer R2
} ? ((...args: A1) => R1) | ((...args: A2) => R2) : never

// 7. 条件属性类型
type ConditionalKeys<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

type StringKeys = ConditionalKeys<User, string>
// 结果: 'name' | 'email'

// 8. 品牌类型
type Brand<T, B> = T & { __brand: B }
type UserId = Brand<number, 'UserId'>
type ProductId = Brand<number, 'ProductId'>

function getUser(id: UserId): User {
    // 实现...
    return {} as User
}

// getUser(123) // ❌ 错误
// getUser(123 as UserId) // ✅ 正确`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 工具类型最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 合理选择工具类型</h4>
                                <p>根据使用场景选择合适的工具类型</p>
                                <ul>
                                    <li>更新操作使用Partial</li>
                                    <li>API响应使用Pick/Omit</li>
                                    <li>不可变数据使用Readonly</li>
                                    <li>键值映射使用Record</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 组合使用</h4>
                                <p>灵活组合多个工具类型</p>
                                <ul>
                                    <li>链式组合：Partial&lt;Pick&lt;T, K&gt;&gt;</li>
                                    <li>条件组合：根据条件选择类型</li>
                                    <li>递归组合：处理嵌套结构</li>
                                    <li>泛型组合：提高复用性</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能考虑</h4>
                                <p>注意类型计算的性能影响</p>
                                <ul>
                                    <li>避免过度复杂的递归类型</li>
                                    <li>合理使用条件类型</li>
                                    <li>缓存复杂类型计算结果</li>
                                    <li>监控编译时间</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 可读性维护</h4>
                                <p>保持类型定义的可读性</p>
                                <ul>
                                    <li>使用有意义的类型别名</li>
                                    <li>添加类型注释说明</li>
                                    <li>分解复杂的类型定义</li>
                                    <li>建立类型文档</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UtilityTypesDetail
