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

const ReactTypeScriptDetail: React.FC = () => {
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
                    <h1>React + TypeScript 详解</h1>
                    <p>掌握React与TypeScript的完美结合</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React</Tag>
                        <Tag color="green">TypeScript</Tag>
                        <Tag color="orange">组件类型</Tag>
                        <Tag color="purple">Hooks类型</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* React TypeScript基础 */}
                <Card title="⚛️ React TypeScript 基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么使用React + TypeScript？</h3>
                        <p>TypeScript为React开发提供了强大的类型安全保障，能够在编译时发现错误，提供更好的开发体验和代码维护性。</p>
                        
                        <h3>核心优势</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🛡️ 类型安全</h4>
                                <p>编译时错误检查，减少运行时错误</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔍 智能提示</h4>
                                <p>IDE提供更好的自动完成和重构支持</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📚 自文档化</h4>
                                <p>类型定义即文档，提高代码可读性</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔧 重构友好</h4>
                                <p>安全的重构操作，减少破坏性变更</p>
                            </div>
                        </div>
                        
                        <h3>项目配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 创建React + TypeScript项目
npx create-react-app my-app --template typescript

// 或使用Vite
npm create vite@latest my-app -- --template react-ts

// tsconfig.json 配置
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 组件类型定义 */}
                <Card title="🧩 组件类型定义" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 函数组件类型</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 基本函数组件
interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    variant = 'primary',
    disabled = false 
}) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={\`btn btn-\${variant}\`}
        >
            {children}
        </button>
    )
}

// 或者使用函数声明
function Button(props: ButtonProps): JSX.Element {
    // 实现...
}

// 泛型组件
interface ListProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => React.ReactNode
    keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={keyExtractor(item)}>
                    {renderItem(item, index)}
                </li>
            ))}
        </ul>
    )
}

// 使用泛型组件
const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

<List
    items={users}
    renderItem={(user) => <span>{user.name}</span>}
    keyExtractor={(user) => user.id}
/>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Props类型进阶</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 继承HTML属性
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

const Input: React.FC<InputProps> = ({ label, error, ...inputProps }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...inputProps} />
            {error && <span className="error">{error}</span>}
        </div>
    )
}

// 使用
<Input 
    label="用户名"
    placeholder="请输入用户名"
    onChange={(e) => console.log(e.target.value)}
    error="用户名不能为空"
/>

// 条件Props
type ConditionalProps = 
    | { variant: 'icon'; icon: string; text?: never }
    | { variant: 'text'; text: string; icon?: never }

const FlexibleButton: React.FC<ConditionalProps> = (props) => {
    if (props.variant === 'icon') {
        return <button><i className={props.icon} /></button>
    }
    return <button>{props.text}</button>
}

// 多态组件
interface PolymorphicProps<T extends React.ElementType> {
    as?: T
    children: React.ReactNode
}

type Props<T extends React.ElementType> = PolymorphicProps<T> & 
    Omit<React.ComponentPropsWithoutRef<T>, keyof PolymorphicProps<T>>

function Polymorphic<T extends React.ElementType = 'div'>({
    as,
    children,
    ...props
}: Props<T>) {
    const Component = as || 'div'
    return <Component {...props}>{children}</Component>
}

// 使用
<Polymorphic as="button" onClick={() => {}}>按钮</Polymorphic>
<Polymorphic as="a" href="/link">链接</Polymorphic>`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 类组件类型</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 类组件Props和State类型
interface CounterProps {
    initialValue?: number
    onCountChange?: (count: number) => void
}

interface CounterState {
    count: number
    isLoading: boolean
}

class Counter extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props)
        this.state = {
            count: props.initialValue || 0,
            isLoading: false
        }
    }
    
    handleIncrement = (): void => {
        this.setState(
            (prevState) => ({ count: prevState.count + 1 }),
            () => {
                this.props.onCountChange?.(this.state.count)
            }
        )
    }
    
    render(): React.ReactNode {
        const { count, isLoading } = this.state
        
        return (
            <div>
                <span>Count: {count}</span>
                <button 
                    onClick={this.handleIncrement}
                    disabled={isLoading}
                >
                    +1
                </button>
            </div>
        )
    }
}

// 高阶组件类型
interface WithLoadingProps {
    isLoading: boolean
}

function withLoading<P extends object>(
    Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> {
    return ({ isLoading, ...props }) => {
        if (isLoading) {
            return <div>Loading...</div>
        }
        return <Component {...(props as P)} />
    }
}

const ButtonWithLoading = withLoading(Button)`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Hooks类型 */}
                <Card title="🎣 Hooks 类型定义" className={styles.content_card}>
                    <div className={styles.hooks_section}>
                        <h3>基础Hooks类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// useState类型推断
const [count, setCount] = useState(0) // 推断为number
const [name, setName] = useState('') // 推断为string
const [user, setUser] = useState<User | null>(null) // 显式类型

// useEffect类型
useEffect(() => {
    // 副作用逻辑
    return () => {
        // 清理函数
    }
}, []) // 依赖数组

// useRef类型
const inputRef = useRef<HTMLInputElement>(null)
const countRef = useRef<number>(0)

// 使用ref
const focusInput = () => {
    inputRef.current?.focus()
}

// useCallback类型
const handleClick = useCallback(
    (id: number) => {
        console.log('Clicked:', id)
    },
    []
)

// useMemo类型
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data)
}, [data])

// useReducer类型
interface State {
    count: number
    error: string | null
}

type Action = 
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset'; payload: number }
    | { type: 'error'; payload: string }

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 }
        case 'decrement':
            return { ...state, count: state.count - 1 }
        case 'reset':
            return { ...state, count: action.payload }
        case 'error':
            return { ...state, error: action.payload }
        default:
            return state
    }
}

const [state, dispatch] = useReducer(reducer, { count: 0, error: null })`}
                            </pre>
                        </div>
                        
                        <h3>自定义Hooks类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 自定义Hook类型定义
interface UseApiResult<T> {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => void
}

function useApi<T>(url: string): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(url)
            const result = await response.json()
            setData(result)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }, [url])
    
    useEffect(() => {
        fetchData()
    }, [fetchData])
    
    return { data, loading, error, refetch: fetchData }
}

// 使用自定义Hook
interface User {
    id: number
    name: string
    email: string
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
    const { data: user, loading, error } = useApi<User>(\`/api/users/\${userId}\`)
    
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!user) return <div>User not found</div>
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    )
}

// 复杂自定义Hook
interface UseFormOptions<T> {
    initialValues: T
    validate?: (values: T) => Partial<Record<keyof T, string>>
    onSubmit: (values: T) => void | Promise<void>
}

interface UseFormReturn<T> {
    values: T
    errors: Partial<Record<keyof T, string>>
    isSubmitting: boolean
    handleChange: (field: keyof T) => (value: T[keyof T]) => void
    handleSubmit: (e: React.FormEvent) => void
    reset: () => void
}

function useForm<T extends Record<string, any>>(
    options: UseFormOptions<T>
): UseFormReturn<T> {
    // 实现...
    return {} as UseFormReturn<T>
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 事件处理类型 */}
                <Card title="🎯 事件处理类型" className={styles.content_card}>
                    <div className={styles.events_section}>
                        <h3>常用事件类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 鼠标事件
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('Button clicked')
}

const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Mouse entered')
}

// 键盘事件
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        console.log('Enter pressed')
    }
}

// 表单事件
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData)
}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
}

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
}

// 焦点事件
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input focused')
}

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Input blurred')
}

// 通用事件处理器类型
type EventHandler<T = HTMLElement> = (e: React.SyntheticEvent<T>) => void

// 组件中使用
interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Form: React.FC<FormProps> = ({ onSubmit, onChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <input onChange={onChange} />
            <button type="submit">Submit</button>
        </form>
    )
}`}
                            </pre>
                        </div>
                        
                        <h3>自定义事件类型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 自定义事件接口
interface CustomSelectEvent {
    value: string
    label: string
    index: number
}

interface SelectProps {
    options: Array<{ value: string; label: string }>
    onSelect: (event: CustomSelectEvent) => void
}

const Select: React.FC<SelectProps> = ({ options, onSelect }) => {
    const handleOptionClick = (option: typeof options[0], index: number) => {
        onSelect({
            value: option.value,
            label: option.label,
            index
        })
    }
    
    return (
        <div>
            {options.map((option, index) => (
                <div 
                    key={option.value}
                    onClick={() => handleOptionClick(option, index)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    )
}

// 事件处理器工厂
function createEventHandler<T>(
    handler: (data: T) => void
): (e: React.SyntheticEvent) => void {
    return (e) => {
        e.preventDefault()
        // 从事件中提取数据
        const data = extractDataFromEvent<T>(e)
        handler(data)
    }
}

function extractDataFromEvent<T>(e: React.SyntheticEvent): T {
    // 实现数据提取逻辑
    return {} as T
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ React TypeScript 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 组件设计</h4>
                                <p>设计类型安全的React组件</p>
                                <ul>
                                    <li>优先使用函数组件和Hooks</li>
                                    <li>明确定义Props接口</li>
                                    <li>使用泛型提高组件复用性</li>
                                    <li>合理使用React.FC类型</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 类型定义</h4>
                                <p>建立清晰的类型体系</p>
                                <ul>
                                    <li>分离类型定义文件</li>
                                    <li>使用联合类型和字面量类型</li>
                                    <li>避免使用any类型</li>
                                    <li>合理使用类型断言</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. Hooks使用</h4>
                                <p>类型安全的Hooks使用</p>
                                <ul>
                                    <li>明确useState的初始值类型</li>
                                    <li>正确类型化useRef</li>
                                    <li>为自定义Hooks定义返回类型</li>
                                    <li>使用useCallback和useMemo优化性能</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 开发工具</h4>
                                <p>充分利用TypeScript工具链</p>
                                <ul>
                                    <li>配置严格的TypeScript规则</li>
                                    <li>使用ESLint TypeScript规则</li>
                                    <li>集成类型检查到CI/CD</li>
                                    <li>使用React DevTools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ReactTypeScriptDetail
