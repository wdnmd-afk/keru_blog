import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    StarOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const DecoratorsDetail: React.FC = () => {
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
                    <StarOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>TypeScript 装饰器详解</h1>
                    <p>掌握TypeScript装饰器的使用与实现原理</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Decorators</Tag>
                        <Tag color="green">元编程</Tag>
                        <Tag color="orange">注解</Tag>
                        <Tag color="purple">反射</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 装饰器基础 */}
                <Card title="✨ 装饰器基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是装饰器？</h3>
                        <p>装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、访问符、属性或参数上。装饰器使用@expression这种形式，expression必须求值为一个函数。</p>
                        
                        <Alert
                            message="实验性功能"
                            description="装饰器目前是TypeScript的实验性功能，需要在tsconfig.json中启用experimentalDecorators选项。"
                            type="warning"
                            showIcon
                        />
                        
                        <h3>启用装饰器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}

// 或者使用命令行
tsc --target ES5 --experimentalDecorators`}
                            </pre>
                        </div>
                        
                        <h3>装饰器类型</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🏛️ 类装饰器</h4>
                                <p>应用于类构造函数，用于观察、修改或替换类定义</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>⚡ 方法装饰器</h4>
                                <p>应用于方法的属性描述符，用于观察、修改或替换方法定义</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔍 访问器装饰器</h4>
                                <p>应用于访问器的属性描述符</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📝 属性装饰器</h4>
                                <p>应用于属性声明</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📋 参数装饰器</h4>
                                <p>应用于函数参数</p>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 类装饰器 */}
                <Card title="🏛️ 类装饰器" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基本类装饰器</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 简单的类装饰器
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

// 带参数的类装饰器
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter2 {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 装饰器工厂</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 装饰器工厂
function Component(options: { selector: string; template: string }) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            selector = options.selector;
            template = options.template;
        };
    };
}

@Component({
    selector: 'app-user',
    template: '<div>User Component</div>'
})
class UserComponent {
    name: string = 'User';
}

// 日志装饰器
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

@Logger('LOGGING - USER')
class User {
    name = 'Max';
    
    constructor() {
        console.log('Creating user object...');
    }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 实用类装饰器示例</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 单例装饰器
function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
    let instance: T;
    return class {
        constructor(...args: any[]) {
            if (instance) {
                return instance;
            }
            instance = new constructor(...args) as T;
            return instance;
        }
    } as T;
}

@Singleton
class DatabaseConnection {
    connect() {
        console.log('Connecting to database...');
    }
}

// 自动绑定装饰器
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 方法装饰器 */}
                <Card title="⚡ 方法装饰器" className={styles.content_card}>
                    <div className={styles.method_section}>
                        <h3>方法装饰器基础</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 方法装饰器签名
function methodDecorator(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
) {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyName: 成员的名字
    // descriptor: 成员的属性描述符
}

// 日志方法装饰器
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        console.log(\`Calling \${propertyName} with arguments:\`, args);
        const result = originalMethod.apply(this, args);
        console.log(\`\${propertyName} returned:\`, result);
        return result;
    };
}

class Calculator {
    @Log
    add(a: number, b: number): number {
        return a + b;
    }
    
    @Log
    multiply(a: number, b: number): number {
        return a * b;
    }
}`}
                            </pre>
                        </div>
                        
                        <h3>高级方法装饰器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 性能监控装饰器
function Measure(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(\`\${propertyName} execution time: \${end - start}ms\`);
        return result;
    };
}

// 缓存装饰器
function Memoize(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache = new Map();
    
    descriptor.value = function (...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('Cache hit for', propertyName);
            return cache.get(key);
        }
        
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// 重试装饰器
function Retry(times: number = 3) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = async function (...args: any[]) {
            for (let i = 0; i < times; i++) {
                try {
                    return await originalMethod.apply(this, args);
                } catch (error) {
                    if (i === times - 1) {
                        throw error;
                    }
                    console.log(\`Retry \${i + 1}/\${times} for \${propertyName}\`);
                }
            }
        };
    };
}

class ApiService {
    @Measure
    @Memoize
    fetchData(id: string) {
        // 模拟API调用
        return \`Data for \${id}\`;
    }
    
    @Retry(3)
    async uploadFile(file: File) {
        // 模拟可能失败的上传操作
        if (Math.random() < 0.7) {
            throw new Error('Upload failed');
        }
        return 'Upload successful';
    }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 属性和参数装饰器 */}
                <Card title="📝 属性与参数装饰器" className={styles.content_card}>
                    <div className={styles.property_section}>
                        <h3>属性装饰器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 属性装饰器签名
function propertyDecorator(target: any, propertyName: string) {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyName: 成员的名字
}

// 格式化装饰器
function Format(formatString: string) {
    return function (target: any, propertyName: string) {
        let value: string;
        
        const getter = function () {
            return value;
        };
        
        const setter = function (newVal: string) {
            value = formatString.replace('%s', newVal);
        };
        
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

// 验证装饰器
function MinLength(length: number) {
    return function (target: any, propertyName: string) {
        let value: string;
        
        const getter = function () {
            return value;
        };
        
        const setter = function (newVal: string) {
            if (newVal.length < length) {
                throw new Error(\`\${propertyName} must be at least \${length} characters long\`);
            }
            value = newVal;
        };
        
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

class User {
    @Format('Hello, %s!')
    greeting: string;
    
    @MinLength(3)
    username: string;
    
    constructor(username: string) {
        this.username = username;
        this.greeting = username;
    }
}`}
                            </pre>
                        </div>
                        
                        <h3>参数装饰器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 参数装饰器签名
function parameterDecorator(target: any, propertyName: string, parameterIndex: number) {
    // target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    // propertyName: 成员的名字
    // parameterIndex: 参数在函数参数列表中的索引
}

// 必需参数装饰器
const requiredMetadataKey = Symbol('required');

function Required(target: Object, propertyName: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyName);
}

function Validate(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error('Missing required argument.');
                }
            }
        }
        return method.apply(this, arguments);
    };
}

class UserService {
    @Validate
    createUser(@Required name: string, @Required email: string, age?: number) {
        return { name, email, age };
    }
}

// 类型转换装饰器
function ToNumber(target: any, propertyName: string, parameterIndex: number) {
    const originalMethod = target[propertyName];
    target[propertyName] = function (...args: any[]) {
        args[parameterIndex] = Number(args[parameterIndex]);
        return originalMethod.apply(this, args);
    };
}

class MathService {
    add(@ToNumber a: any, @ToNumber b: any): number {
        return a + b;
    }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 实际应用 */}
                <Card title="🛠️ 装饰器实际应用" className={styles.content_card}>
                    <div className={styles.application_section}>
                        <h3>依赖注入系统</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 简单的依赖注入容器
class Container {
    private services = new Map();
    
    register<T>(token: string, factory: () => T): void {
        this.services.set(token, factory);
    }
    
    resolve<T>(token: string): T {
        const factory = this.services.get(token);
        if (!factory) {
            throw new Error(\`Service \${token} not found\`);
        }
        return factory();
    }
}

const container = new Container();

// 注入装饰器
function Injectable(token: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        container.register(token, () => new constructor());
        return constructor;
    };
}

function Inject(token: string) {
    return function (target: any, propertyName: string, parameterIndex: number) {
        // 存储注入信息的元数据
        const existingTokens = Reflect.getMetadata('inject-tokens', target) || [];
        existingTokens[parameterIndex] = token;
        Reflect.defineMetadata('inject-tokens', existingTokens, target);
    };
}

@Injectable('UserService')
class UserService {
    getUsers() {
        return ['Alice', 'Bob', 'Charlie'];
    }
}

@Injectable('UserController')
class UserController {
    constructor(@Inject('UserService') private userService: UserService) {}
    
    getAllUsers() {
        return this.userService.getUsers();
    }
}`}
                            </pre>
                        </div>
                        
                        <h3>API路由装饰器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 路由元数据
interface RouteMetadata {
    path: string;
    method: string;
}

// 路由装饰器
function Controller(basePath: string) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        Reflect.defineMetadata('basePath', basePath, constructor);
        return constructor;
    };
}

function Get(path: string) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('route', { path, method: 'GET' }, target, propertyName);
    };
}

function Post(path: string) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('route', { path, method: 'POST' }, target, propertyName);
    };
}

// 使用示例
@Controller('/api/users')
class UsersController {
    @Get('/')
    getAllUsers() {
        return { users: ['Alice', 'Bob'] };
    }
    
    @Get('/:id')
    getUserById() {
        return { user: 'Alice' };
    }
    
    @Post('/')
    createUser() {
        return { message: 'User created' };
    }
}

// 路由注册器
function registerRoutes(controller: any) {
    const basePath = Reflect.getMetadata('basePath', controller.constructor);
    const prototype = Object.getPrototypeOf(controller);
    
    Object.getOwnPropertyNames(prototype).forEach(methodName => {
        const routeMetadata: RouteMetadata = Reflect.getMetadata('route', prototype, methodName);
        if (routeMetadata) {
            const fullPath = basePath + routeMetadata.path;
            console.log(\`Registering \${routeMetadata.method} \${fullPath}\`);
            // 这里可以注册到实际的路由器
        }
    });
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 装饰器最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 设计原则</h4>
                                <p>遵循装饰器设计的最佳实践</p>
                                <ul>
                                    <li>保持装饰器的单一职责</li>
                                    <li>避免在装饰器中修改原始类的结构</li>
                                    <li>使用装饰器工厂提供配置选项</li>
                                    <li>确保装饰器的可组合性</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能考虑</h4>
                                <p>注意装饰器对性能的影响</p>
                                <ul>
                                    <li>避免在装饰器中进行重复的计算</li>
                                    <li>合理使用缓存机制</li>
                                    <li>注意装饰器的执行顺序</li>
                                    <li>避免过度使用装饰器</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 类型安全</h4>
                                <p>确保装饰器的类型安全</p>
                                <ul>
                                    <li>为装饰器参数提供正确的类型</li>
                                    <li>使用泛型约束确保类型安全</li>
                                    <li>提供清晰的类型定义</li>
                                    <li>避免使用any类型</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 调试和测试</h4>
                                <p>确保装饰器的可调试性和可测试性</p>
                                <ul>
                                    <li>提供清晰的错误信息</li>
                                    <li>编写装饰器的单元测试</li>
                                    <li>使用适当的日志记录</li>
                                    <li>文档化装饰器的行为</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default DecoratorsDetail
