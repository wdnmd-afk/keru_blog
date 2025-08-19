import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    DatabaseOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const DatabaseDetail: React.FC = () => {
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
                    <DatabaseOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Node.js 数据库集成详解</h1>
                    <p>掌握Node.js与各种数据库的集成方案</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">数据库集成</Tag>
                        <Tag color="green">ORM/ODM</Tag>
                        <Tag color="orange">连接池</Tag>
                        <Tag color="purple">数据迁移</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 数据库选择 */}
                <Card title="🗄️ 数据库选择与对比" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>关系型数据库 vs 非关系型数据库</h3>
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h4>📊 关系型数据库 (SQL)</h4>
                                <p><strong>代表</strong>：MySQL, PostgreSQL, SQLite</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>ACID事务支持</li>
                                            <li>强一致性保证</li>
                                            <li>成熟的生态系统</li>
                                            <li>标准SQL语法</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>扩展性相对较差</li>
                                            <li>固定的表结构</li>
                                            <li>复杂查询性能问题</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.comparison_item}>
                                <h4>📈 非关系型数据库 (NoSQL)</h4>
                                <p><strong>代表</strong>：MongoDB, Redis, Cassandra</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>高扩展性</li>
                                            <li>灵活的数据结构</li>
                                            <li>高性能读写</li>
                                            <li>适合大数据场景</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>最终一致性</li>
                                            <li>学习成本较高</li>
                                            <li>缺乏标准化</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <Alert
                            message="选择建议"
                            description="对于大多数Web应用，PostgreSQL是优秀的选择。需要高性能缓存时使用Redis，处理大量非结构化数据时考虑MongoDB。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>
                
                {/* MySQL集成 */}
                <Card title="🐬 MySQL 集成" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 原生驱动使用</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装MySQL驱动
npm install mysql2

// 基本连接
const mysql = require('mysql2/promise')

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp'
})

// 执行查询
const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
)

// 连接池配置
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000
})

// 使用连接池
async function getUser(id) {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        )
        return rows[0]
    } catch (error) {
        console.error('数据库查询错误:', error)
        throw error
    }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Sequelize ORM</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装Sequelize
npm install sequelize mysql2

// 配置连接
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('myapp', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log // 开发环境启用日志
})

// 定义模型
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: true
})

// 关联关系
const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
})

User.hasMany(Post, { foreignKey: 'userId' })
Post.belongsTo(User, { foreignKey: 'userId' })

// 使用模型
async function createUser(userData) {
    try {
        const user = await User.create(userData)
        return user
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            throw new Error('数据验证失败')
        }
        throw error
    }
}

// 复杂查询
async function getUsersWithPosts() {
    return await User.findAll({
        include: [{
            model: Post,
            attributes: ['title', 'createdAt']
        }],
        order: [['createdAt', 'DESC']],
        limit: 10
    })
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. Prisma ORM</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装Prisma
npm install prisma @prisma/client
npx prisma init

// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?  @db.Text
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}

// 生成客户端
npx prisma generate

// 使用Prisma Client
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CRUD操作
async function createUser(data) {
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            posts: {
                create: data.posts || []
            }
        },
        include: {
            posts: true
        }
    })
}

async function getUserWithPosts(id) {
    return await prisma.user.findUnique({
        where: { id },
        include: {
            posts: {
                where: { published: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    })
}

// 事务处理
async function transferPost(postId, newAuthorId) {
    return await prisma.$transaction(async (prisma) => {
        const post = await prisma.post.update({
            where: { id: postId },
            data: { authorId: newAuthorId }
        })
        
        await prisma.user.update({
            where: { id: newAuthorId },
            data: { updatedAt: new Date() }
        })
        
        return post
    })
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* MongoDB集成 */}
                <Card title="🍃 MongoDB 集成" className={styles.content_card}>
                    <div className={styles.mongodb_section}>
                        <h3>原生MongoDB驱动</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装MongoDB驱动
npm install mongodb

// 连接MongoDB
const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
})

async function connectDB() {
    try {
        await client.connect()
        console.log('MongoDB连接成功')
        return client.db('myapp')
    } catch (error) {
        console.error('MongoDB连接失败:', error)
        throw error
    }
}

// 基本操作
async function userOperations() {
    const db = await connectDB()
    const users = db.collection('users')
    
    // 插入文档
    const result = await users.insertOne({
        name: '张三',
        email: 'zhangsan@example.com',
        age: 25,
        createdAt: new Date()
    })
    
    // 查询文档
    const user = await users.findOne({ _id: result.insertedId })
    
    // 更新文档
    await users.updateOne(
        { _id: result.insertedId },
        { $set: { age: 26 }, $currentDate: { updatedAt: true } }
    )
    
    // 删除文档
    await users.deleteOne({ _id: result.insertedId })
    
    // 聚合查询
    const pipeline = [
        { $match: { age: { $gte: 18 } } },
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]
    const aggregationResult = await users.aggregate(pipeline).toArray()
    
    return aggregationResult
}`}
                            </pre>
                        </div>
                        
                        <h3>Mongoose ODM</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Mongoose
npm install mongoose

// 连接配置
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
})

// 定义Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '姓名是必需的'],
        trim: true,
        minlength: [2, '姓名至少2个字符'],
        maxlength: [50, '姓名不能超过50个字符']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message: '请输入有效的邮箱地址'
        }
    },
    age: {
        type: Number,
        min: [0, '年龄不能为负数'],
        max: [120, '年龄不能超过120岁']
    },
    avatar: String,
    isActive: {
        type: Boolean,
        default: true
    },
    tags: [String],
    profile: {
        bio: String,
        website: String,
        location: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// 虚拟属性
userSchema.virtual('fullProfile').get(function() {
    return \`\${this.name} - \${this.profile?.bio || '暂无简介'}\`
})

// 中间件
userSchema.pre('save', function(next) {
    if (this.isModified('email')) {
        this.email = this.email.toLowerCase()
    }
    next()
})

userSchema.post('save', function(doc) {
    console.log(\`用户 \${doc.name} 已保存\`)
})

// 静态方法
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() })
}

// 实例方法
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        name: this.name,
        avatar: this.avatar,
        isActive: this.isActive
    }
}

const User = mongoose.model('User', userSchema)

// 使用模型
async function createUser(userData) {
    try {
        const user = new User(userData)
        await user.save()
        return user.getPublicProfile()
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message)
            throw new Error(\`验证失败: \${errors.join(', ')}\`)
        }
        throw error
    }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Redis集成 */}
                <Card title="🔴 Redis 集成" className={styles.content_card}>
                    <div className={styles.redis_section}>
                        <h3>Redis基本使用</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Redis客户端
npm install redis

// 连接Redis
const redis = require('redis')

const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: 'your-password', // 如果有密码
    db: 0,
    retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('Redis服务器拒绝连接')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('重试时间已用尽')
        }
        if (options.attempt > 10) {
            return undefined
        }
        return Math.min(options.attempt * 100, 3000)
    }
})

client.on('connect', () => {
    console.log('Redis连接成功')
})

client.on('error', (err) => {
    console.error('Redis连接错误:', err)
})

// 基本操作
async function redisOperations() {
    // 字符串操作
    await client.set('user:1:name', '张三', 'EX', 3600) // 设置过期时间1小时
    const name = await client.get('user:1:name')
    
    // 哈希操作
    await client.hset('user:1', {
        name: '张三',
        email: 'zhangsan@example.com',
        age: 25
    })
    const user = await client.hgetall('user:1')
    
    // 列表操作
    await client.lpush('notifications', JSON.stringify({
        type: 'message',
        content: '您有新消息',
        timestamp: Date.now()
    }))
    const notifications = await client.lrange('notifications', 0, 9)
    
    // 集合操作
    await client.sadd('user:1:tags', 'developer', 'nodejs', 'javascript')
    const tags = await client.smembers('user:1:tags')
    
    // 有序集合操作
    await client.zadd('leaderboard', 100, 'user:1', 200, 'user:2', 150, 'user:3')
    const topUsers = await client.zrevrange('leaderboard', 0, 2, 'WITHSCORES')
    
    return { name, user, notifications, tags, topUsers }
}`}
                            </pre>
                        </div>
                        
                        <h3>Redis缓存策略</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 缓存装饰器
function cache(ttl = 3600) {
    return function(target, propertyName, descriptor) {
        const originalMethod = descriptor.value
        
        descriptor.value = async function(...args) {
            const cacheKey = \`\${target.constructor.name}:\${propertyName}:\${JSON.stringify(args)}\`
            
            // 尝试从缓存获取
            const cached = await client.get(cacheKey)
            if (cached) {
                return JSON.parse(cached)
            }
            
            // 执行原方法
            const result = await originalMethod.apply(this, args)
            
            // 存储到缓存
            await client.setex(cacheKey, ttl, JSON.stringify(result))
            
            return result
        }
        
        return descriptor
    }
}

// 使用缓存装饰器
class UserService {
    @cache(1800) // 缓存30分钟
    async getUserById(id) {
        // 从数据库查询用户
        const user = await User.findById(id)
        return user
    }
    
    async updateUser(id, data) {
        // 更新用户
        const user = await User.findByIdAndUpdate(id, data, { new: true })
        
        // 清除相关缓存
        const cacheKey = \`UserService:getUserById:[\${id}]\`
        await client.del(cacheKey)
        
        return user
    }
}

// 分布式锁
async function acquireLock(lockKey, timeout = 10000) {
    const lockValue = Date.now() + timeout
    const result = await client.set(lockKey, lockValue, 'PX', timeout, 'NX')
    return result === 'OK'
}

async function releaseLock(lockKey) {
    await client.del(lockKey)
}

// 使用分布式锁
async function processOrder(orderId) {
    const lockKey = \`lock:order:\${orderId}\`
    
    if (await acquireLock(lockKey)) {
        try {
            // 处理订单逻辑
            console.log(\`处理订单 \${orderId}\`)
            await new Promise(resolve => setTimeout(resolve, 1000))
        } finally {
            await releaseLock(lockKey)
        }
    } else {
        throw new Error('订单正在处理中，请稍后重试')
    }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 数据库集成最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 连接管理</h4>
                                <p>合理管理数据库连接</p>
                                <ul>
                                    <li>使用连接池避免频繁连接</li>
                                    <li>设置合适的超时时间</li>
                                    <li>监控连接状态和性能</li>
                                    <li>优雅关闭数据库连接</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 数据安全</h4>
                                <p>确保数据安全性</p>
                                <ul>
                                    <li>使用参数化查询防止SQL注入</li>
                                    <li>加密敏感数据</li>
                                    <li>实施访问控制</li>
                                    <li>定期备份数据</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>优化数据库性能</p>
                                <ul>
                                    <li>合理设计数据库索引</li>
                                    <li>使用缓存减少数据库压力</li>
                                    <li>优化查询语句</li>
                                    <li>实施读写分离</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 错误处理</h4>
                                <p>完善的错误处理机制</p>
                                <ul>
                                    <li>捕获和处理数据库异常</li>
                                    <li>实施重试机制</li>
                                    <li>记录详细的错误日志</li>
                                    <li>提供友好的错误信息</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default DatabaseDetail
