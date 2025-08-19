import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ClusterOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const MicroservicesDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/nodejs')
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
                    返回Node.js技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ClusterOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Node.js 微服务架构详解</h1>
                    <p>掌握Node.js微服务架构设计与实现</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">微服务</Tag>
                        <Tag color="green">服务发现</Tag>
                        <Tag color="orange">API网关</Tag>
                        <Tag color="purple">消息队列</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 微服务架构概述 */}
                <Card title="🏗️ 微服务架构概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>单体架构 vs 微服务架构</h3>
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h4>🏢 单体架构</h4>
                                <p><strong>传统方式</strong>：所有功能在一个应用中</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>开发简单，易于测试</li>
                                            <li>部署简单</li>
                                            <li>性能较好（无网络开销）</li>
                                            <li>事务处理简单</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>技术栈固定</li>
                                            <li>扩展性差</li>
                                            <li>团队协作困难</li>
                                            <li>单点故障风险</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.comparison_item}>
                                <h4>🔗 微服务架构</h4>
                                <p><strong>现代方式</strong>：功能拆分为独立服务</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>技术栈多样化</li>
                                            <li>独立部署和扩展</li>
                                            <li>团队独立开发</li>
                                            <li>故障隔离</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>复杂性增加</li>
                                            <li>网络延迟</li>
                                            <li>分布式事务复杂</li>
                                            <li>运维成本高</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h3>微服务核心原则</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🎯 单一职责</h4>
                                <p>每个服务专注于一个业务领域</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔒 服务自治</h4>
                                <p>服务独立开发、部署和运行</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📡 去中心化</h4>
                                <p>避免单点故障和瓶颈</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🛡️ 故障隔离</h4>
                                <p>服务故障不影响其他服务</p>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 服务拆分策略 */}
                <Card title="✂️ 服务拆分策略" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 按业务领域拆分</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 电商系统服务拆分示例

// 用户服务 (User Service)
// 职责：用户注册、登录、个人信息管理
// 端口：3001
// 数据库：users_db

// 商品服务 (Product Service)  
// 职责：商品管理、库存管理、分类管理
// 端口：3002
// 数据库：products_db

// 订单服务 (Order Service)
// 职责：订单创建、状态管理、订单历史
// 端口：3003
// 数据库：orders_db

// 支付服务 (Payment Service)
// 职责：支付处理、退款、账单管理
// 端口：3004
// 数据库：payments_db

// 通知服务 (Notification Service)
// 职责：邮件、短信、推送通知
// 端口：3005
// 数据库：notifications_db

// 项目结构
microservices/
├── user-service/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── docker-compose.yml
├── product-service/
├── order-service/
├── payment-service/
├── notification-service/
├── api-gateway/
└── shared/
    ├── middleware/
    ├── utils/
    └── types/`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 数据库拆分</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 每个服务独立的数据库

// user-service/config/database.js
const mongoose = require('mongoose')

const connectUserDB = async () => {
    try {
        await mongoose.connect(process.env.USER_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'user_service'
        })
        console.log('用户服务数据库连接成功')
    } catch (error) {
        console.error('用户服务数据库连接失败:', error)
        process.exit(1)
    }
}

module.exports = { connectUserDB }

// user-service/models/User.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: String,
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)

// product-service/models/Product.js
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categoryId: String,
    sellerId: String, // 引用用户服务的用户ID
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Product', productSchema)

// 跨服务数据一致性
// 使用事件驱动架构保持数据同步
const EventEmitter = require('events')
const eventBus = new EventEmitter()

// 用户服务发布事件
function publishUserCreated(user) {
    eventBus.emit('user.created', {
        userId: user.id,
        email: user.email,
        name: user.name,
        timestamp: new Date()
    })
}

// 其他服务监听事件
eventBus.on('user.created', (userData) => {
    // 在商品服务中创建卖家记录
    console.log('新用户创建，同步到商品服务:', userData)
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 服务间通信</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 同步通信 - HTTP/REST API
// shared/utils/serviceClient.js
const axios = require('axios')

class ServiceClient {
    constructor(baseURL, timeout = 5000) {
        this.client = axios.create({
            baseURL,
            timeout,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        // 请求拦截器
        this.client.interceptors.request.use(
            (config) => {
                config.headers['X-Request-ID'] = generateRequestId()
                config.headers['X-Service-Name'] = process.env.SERVICE_NAME
                return config
            },
            (error) => Promise.reject(error)
        )
        
        // 响应拦截器
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('服务调用失败:', error.message)
                return Promise.reject(error)
            }
        )
    }
    
    async get(url, config = {}) {
        const response = await this.client.get(url, config)
        return response.data
    }
    
    async post(url, data, config = {}) {
        const response = await this.client.post(url, data, config)
        return response.data
    }
}

// order-service/services/userService.js
const ServiceClient = require('../../shared/utils/serviceClient')

class UserServiceClient {
    constructor() {
        this.client = new ServiceClient(process.env.USER_SERVICE_URL)
    }
    
    async getUserById(userId) {
        try {
            return await this.client.get(\`/users/\${userId}\`)
        } catch (error) {
            if (error.response?.status === 404) {
                throw new Error('用户不存在')
            }
            throw new Error('用户服务不可用')
        }
    }
    
    async validateUser(userId) {
        const user = await this.getUserById(userId)
        return user && user.isActive
    }
}

module.exports = UserServiceClient

// 异步通信 - 消息队列
// shared/utils/messageQueue.js
const amqp = require('amqplib')

class MessageQueue {
    constructor() {
        this.connection = null
        this.channel = null
    }
    
    async connect() {
        try {
            this.connection = await amqp.connect(process.env.RABBITMQ_URL)
            this.channel = await this.connection.createChannel()
            console.log('消息队列连接成功')
        } catch (error) {
            console.error('消息队列连接失败:', error)
            throw error
        }
    }
    
    async publishEvent(exchange, routingKey, data) {
        const message = JSON.stringify({
            ...data,
            timestamp: new Date(),
            serviceId: process.env.SERVICE_NAME
        })
        
        await this.channel.assertExchange(exchange, 'topic', { durable: true })
        this.channel.publish(exchange, routingKey, Buffer.from(message))
        
        console.log(\`事件已发布: \${exchange}.\${routingKey}\`)
    }
    
    async subscribeEvent(exchange, queue, routingKey, handler) {
        await this.channel.assertExchange(exchange, 'topic', { durable: true })
        await this.channel.assertQueue(queue, { durable: true })
        await this.channel.bindQueue(queue, exchange, routingKey)
        
        this.channel.consume(queue, async (msg) => {
            if (msg) {
                try {
                    const data = JSON.parse(msg.content.toString())
                    await handler(data)
                    this.channel.ack(msg)
                } catch (error) {
                    console.error('消息处理失败:', error)
                    this.channel.nack(msg, false, false)
                }
            }
        })
    }
}

module.exports = MessageQueue`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* API网关 */}
                <Card title="🚪 API 网关实现" className={styles.content_card}>
                    <div className={styles.gateway_section}>
                        <h3>Express API网关</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// api-gateway/src/app.js
const express = require('express')
const httpProxy = require('http-proxy-middleware')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

// 安全中间件
app.use(helmet())
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}))

// 限流中间件
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100, // 限制每个IP 15分钟内最多100个请求
    message: '请求过于频繁，请稍后再试'
})
app.use(limiter)

// 认证中间件
const authenticateToken = require('./middleware/auth')

// 服务配置
const services = {
    user: {
        url: process.env.USER_SERVICE_URL || 'http://localhost:3001',
        prefix: '/api/users'
    },
    product: {
        url: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002',
        prefix: '/api/products'
    },
    order: {
        url: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
        prefix: '/api/orders'
    },
    payment: {
        url: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
        prefix: '/api/payments'
    }
}

// 路由配置
Object.entries(services).forEach(([serviceName, config]) => {
    const proxyOptions = {
        target: config.url,
        changeOrigin: true,
        pathRewrite: {
            [\`^\${config.prefix}\`]: ''
        },
        onError: (err, req, res) => {
            console.error(\`\${serviceName}服务代理错误:\`, err.message)
            res.status(503).json({
                error: '服务暂时不可用',
                service: serviceName
            })
        },
        onProxyReq: (proxyReq, req, res) => {
            // 添加请求头
            proxyReq.setHeader('X-Gateway-Request-ID', req.headers['x-request-id'])
            proxyReq.setHeader('X-User-ID', req.user?.id)
        }
    }
    
    // 需要认证的路由
    if (['order', 'payment'].includes(serviceName)) {
        app.use(config.prefix, authenticateToken, httpProxy(proxyOptions))
    } else {
        app.use(config.prefix, httpProxy(proxyOptions))
    }
})

// 健康检查
app.get('/health', async (req, res) => {
    const healthChecks = await Promise.allSettled(
        Object.entries(services).map(async ([name, config]) => {
            try {
                const response = await fetch(\`\${config.url}/health\`, {
                    timeout: 3000
                })
                return { service: name, status: response.ok ? 'healthy' : 'unhealthy' }
            } catch (error) {
                return { service: name, status: 'unhealthy', error: error.message }
            }
        })
    )
    
    const results = healthChecks.map(result => 
        result.status === 'fulfilled' ? result.value : result.reason
    )
    
    const allHealthy = results.every(result => result.status === 'healthy')
    
    res.status(allHealthy ? 200 : 503).json({
        gateway: 'healthy',
        services: results,
        timestamp: new Date()
    })
})

module.exports = app`}
                            </pre>
                        </div>
                        
                        <h3>服务发现与负载均衡</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// api-gateway/src/serviceDiscovery.js
const consul = require('consul')

class ServiceDiscovery {
    constructor() {
        this.consul = consul({
            host: process.env.CONSUL_HOST || 'localhost',
            port: process.env.CONSUL_PORT || 8500
        })
        this.services = new Map()
    }
    
    async registerService(serviceName, serviceConfig) {
        const registration = {
            id: \`\${serviceName}-\${serviceConfig.port}\`,
            name: serviceName,
            address: serviceConfig.host,
            port: serviceConfig.port,
            check: {
                http: \`http://\${serviceConfig.host}:\${serviceConfig.port}/health\`,
                interval: '10s',
                timeout: '3s'
            },
            tags: serviceConfig.tags || []
        }
        
        try {
            await this.consul.agent.service.register(registration)
            console.log(\`服务注册成功: \${serviceName}\`)
        } catch (error) {
            console.error(\`服务注册失败: \${serviceName}\`, error)
        }
    }
    
    async discoverService(serviceName) {
        try {
            const services = await this.consul.health.service({
                service: serviceName,
                passing: true
            })
            
            return services[0].map(service => ({
                host: service.Service.Address,
                port: service.Service.Port,
                id: service.Service.ID
            }))
        } catch (error) {
            console.error(\`服务发现失败: \${serviceName}\`, error)
            return []
        }
    }
    
    async getServiceUrl(serviceName) {
        let instances = this.services.get(serviceName)
        
        if (!instances || instances.length === 0) {
            instances = await this.discoverService(serviceName)
            this.services.set(serviceName, instances)
        }
        
        if (instances.length === 0) {
            throw new Error(\`服务不可用: \${serviceName}\`)
        }
        
        // 简单的轮询负载均衡
        const instance = instances[Math.floor(Math.random() * instances.length)]
        return \`http://\${instance.host}:\${instance.port}\`
    }
}

// 使用服务发现的代理中间件
const serviceDiscovery = new ServiceDiscovery()

const createDynamicProxy = (serviceName) => {
    return async (req, res, next) => {
        try {
            const serviceUrl = await serviceDiscovery.getServiceUrl(serviceName)
            
            const proxyOptions = {
                target: serviceUrl,
                changeOrigin: true,
                pathRewrite: {
                    [\`^/api/\${serviceName}\`]: ''
                }
            }
            
            httpProxy(proxyOptions)(req, res, next)
        } catch (error) {
            res.status(503).json({
                error: '服务不可用',
                service: serviceName
            })
        }
    }
}

// 动态路由
app.use('/api/users', createDynamicProxy('user-service'))
app.use('/api/products', createDynamicProxy('product-service'))
app.use('/api/orders', authenticateToken, createDynamicProxy('order-service'))

module.exports = { ServiceDiscovery, createDynamicProxy }`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 监控与日志 */}
                <Card title="📊 监控与日志" className={styles.content_card}>
                    <div className={styles.monitoring_section}>
                        <h3>分布式链路追踪</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// shared/middleware/tracing.js
const { v4: uuidv4 } = require('uuid')

// 请求追踪中间件
function tracingMiddleware(req, res, next) {
    // 生成或传递追踪ID
    req.traceId = req.headers['x-trace-id'] || uuidv4()
    req.spanId = uuidv4()
    
    // 设置响应头
    res.setHeader('X-Trace-ID', req.traceId)
    res.setHeader('X-Span-ID', req.spanId)
    
    // 记录请求开始
    const startTime = Date.now()
    
    // 重写res.json以记录响应
    const originalJson = res.json
    res.json = function(data) {
        const duration = Date.now() - startTime
        
        // 记录请求日志
        console.log(JSON.stringify({
            traceId: req.traceId,
            spanId: req.spanId,
            service: process.env.SERVICE_NAME,
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            timestamp: new Date().toISOString()
        }))
        
        return originalJson.call(this, data)
    }
    
    next()
}

// 服务间调用追踪
class TracedServiceClient {
    constructor(baseURL, serviceName) {
        this.baseURL = baseURL
        this.serviceName = serviceName
    }
    
    async request(method, url, data, headers = {}) {
        const traceId = headers['x-trace-id'] || uuidv4()
        const spanId = uuidv4()
        
        const requestHeaders = {
            ...headers,
            'X-Trace-ID': traceId,
            'X-Parent-Span-ID': headers['x-span-id'],
            'X-Span-ID': spanId,
            'X-Service-Name': process.env.SERVICE_NAME
        }
        
        const startTime = Date.now()
        
        try {
            const response = await axios({
                method,
                url: \`\${this.baseURL}\${url}\`,
                data,
                headers: requestHeaders,
                timeout: 5000
            })
            
            const duration = Date.now() - startTime
            
            // 记录成功调用
            console.log(JSON.stringify({
                type: 'service_call',
                traceId,
                spanId,
                parentSpanId: headers['x-span-id'],
                sourceService: process.env.SERVICE_NAME,
                targetService: this.serviceName,
                method,
                url,
                statusCode: response.status,
                duration,
                success: true,
                timestamp: new Date().toISOString()
            }))
            
            return response.data
        } catch (error) {
            const duration = Date.now() - startTime
            
            // 记录失败调用
            console.error(JSON.stringify({
                type: 'service_call',
                traceId,
                spanId,
                parentSpanId: headers['x-span-id'],
                sourceService: process.env.SERVICE_NAME,
                targetService: this.serviceName,
                method,
                url,
                statusCode: error.response?.status,
                duration,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            }))
            
            throw error
        }
    }
}

module.exports = { tracingMiddleware, TracedServiceClient }`}
                            </pre>
                        </div>
                        
                        <h3>健康检查与指标收集</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// shared/middleware/metrics.js
const promClient = require('prom-client')

// 创建指标收集器
const register = new promClient.Registry()

// HTTP请求计数器
const httpRequestsTotal = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register]
})

// HTTP请求持续时间
const httpRequestDuration = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2, 5],
    registers: [register]
})

// 数据库连接池指标
const dbConnectionsActive = new promClient.Gauge({
    name: 'db_connections_active',
    help: 'Number of active database connections',
    registers: [register]
})

// 指标收集中间件
function metricsMiddleware(req, res, next) {
    const startTime = Date.now()
    
    res.on('finish', () => {
        const duration = (Date.now() - startTime) / 1000
        const route = req.route?.path || req.path
        
        httpRequestsTotal
            .labels(req.method, route, res.statusCode.toString())
            .inc()
        
        httpRequestDuration
            .labels(req.method, route, res.statusCode.toString())
            .observe(duration)
    })
    
    next()
}

// 健康检查端点
function createHealthCheck(dependencies = {}) {
    return async (req, res) => {
        const health = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: process.env.SERVICE_NAME,
            version: process.env.SERVICE_VERSION,
            uptime: process.uptime(),
            dependencies: {}
        }
        
        // 检查依赖服务
        for (const [name, checkFn] of Object.entries(dependencies)) {
            try {
                const result = await checkFn()
                health.dependencies[name] = {
                    status: 'healthy',
                    ...result
                }
            } catch (error) {
                health.dependencies[name] = {
                    status: 'unhealthy',
                    error: error.message
                }
                health.status = 'unhealthy'
            }
        }
        
        const statusCode = health.status === 'healthy' ? 200 : 503
        res.status(statusCode).json(health)
    }
}

// 指标端点
function metricsEndpoint(req, res) {
    res.set('Content-Type', register.contentType)
    res.end(register.metrics())
}

// 数据库健康检查
async function checkDatabase() {
    const mongoose = require('mongoose')
    
    if (mongoose.connection.readyState !== 1) {
        throw new Error('数据库连接断开')
    }
    
    // 更新连接池指标
    dbConnectionsActive.set(mongoose.connection.db?.serverConfig?.connections?.length || 0)
    
    return {
        readyState: mongoose.connection.readyState,
        host: mongoose.connection.host,
        port: mongoose.connection.port
    }
}

// Redis健康检查
async function checkRedis() {
    const redis = require('redis')
    const client = redis.createClient()
    
    try {
        await client.ping()
        return { status: 'connected' }
    } catch (error) {
        throw new Error(\`Redis连接失败: \${error.message}\`)
    } finally {
        await client.quit()
    }
}

module.exports = {
    metricsMiddleware,
    createHealthCheck,
    metricsEndpoint,
    checkDatabase,
    checkRedis,
    register
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 微服务最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 服务设计</h4>
                                <p>合理设计微服务边界</p>
                                <ul>
                                    <li>遵循单一职责原则</li>
                                    <li>按业务领域拆分</li>
                                    <li>避免过度拆分</li>
                                    <li>保持服务自治性</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 通信策略</h4>
                                <p>选择合适的通信方式</p>
                                <ul>
                                    <li>同步调用用于实时查询</li>
                                    <li>异步消息用于事件通知</li>
                                    <li>实施断路器模式</li>
                                    <li>设置合理的超时时间</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 数据管理</h4>
                                <p>处理分布式数据一致性</p>
                                <ul>
                                    <li>每个服务独立数据库</li>
                                    <li>使用事件溯源模式</li>
                                    <li>实施最终一致性</li>
                                    <li>避免分布式事务</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 运维监控</h4>
                                <p>建立完善的监控体系</p>
                                <ul>
                                    <li>实施分布式链路追踪</li>
                                    <li>集中化日志管理</li>
                                    <li>监控关键业务指标</li>
                                    <li>自动化部署和扩容</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default MicroservicesDetail
