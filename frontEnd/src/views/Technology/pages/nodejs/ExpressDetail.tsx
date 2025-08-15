import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ApiOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const ExpressDetail: React.FC = () => {
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
                    <ApiOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Express.js 框架详解</h1>
                    <p>掌握Node.js最流行的Web应用框架，构建高效的服务端应用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Express.js</Tag>
                        <Tag color="blue">Web框架</Tag>
                        <Tag color="orange">中间件</Tag>
                        <Tag color="purple">RESTful API</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Express基础 */}
                <Card title="🚀 Express.js 基础入门" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Express.js？</h3>
                        <p>Express.js是一个基于Node.js平台的极简、灵活的Web应用开发框架，它提供了一系列强大的特性，用于开发Web和移动应用。Express提供了薄薄的一层基本的Web应用功能，而不会掩盖你熟悉和喜爱的Node.js特性。</p>
                        
                        <h3>快速开始</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装Express
npm init -y
npm install express

# 创建基本应用 - app.js
const express = require('express')
const app = express()
const port = 3000

// 基本路由
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/users', (req, res) => {
  res.json({ message: '用户列表' })
})

app.post('/api/users', (req, res) => {
  res.json({ message: '创建用户成功' })
})

// 启动服务器
app.listen(port, () => {
  console.log(\`服务器运行在 http://localhost:\${port}\`)
})

# 运行应用
node app.js`}
                            </pre>
                        </div>
                        
                        <h3>Express应用生成器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装Express应用生成器
npm install -g express-generator

# 创建应用
express --view=ejs myapp
cd myapp
npm install

# 启动应用
npm start

# 项目结构
myapp/
├── bin/
│   └── www          # 启动脚本
├── public/          # 静态文件
├── routes/          # 路由文件
├── views/           # 视图模板
├── app.js           # 应用入口
└── package.json`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 路由系统 */}
                <Card title="🛣️ 路由系统" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基本路由</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const express = require('express')
const app = express()

// HTTP方法路由
app.get('/users', (req, res) => {
  res.json({ message: '获取用户列表' })
})

app.post('/users', (req, res) => {
  res.json({ message: '创建用户' })
})

app.put('/users/:id', (req, res) => {
  const userId = req.params.id
  res.json({ message: \`更新用户 \${userId}\` })
})

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  res.json({ message: \`删除用户 \${userId}\` })
})

// 路由参数
app.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.json({ userId: id })
})

// 多个参数
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params
  res.json({ userId, postId })
})

// 可选参数
app.get('/posts/:year/:month?', (req, res) => {
  const { year, month } = req.params
  res.json({ year, month: month || 'all' })
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 路由模块化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// routes/users.js
const express = require('express')
const router = express.Router()

// 中间件，对该路由下的所有请求生效
router.use((req, res, next) => {
  console.log('用户路由中间件')
  next()
})

// 定义路由
router.get('/', (req, res) => {
  res.json({ message: '用户列表' })
})

router.get('/:id', (req, res) => {
  res.json({ message: \`用户详情: \${req.params.id}\` })
})

router.post('/', (req, res) => {
  res.json({ message: '创建用户' })
})

module.exports = router

// app.js 中使用路由
const express = require('express')
const userRoutes = require('./routes/users')
const app = express()

// 使用路由模块
app.use('/api/users', userRoutes)

// 路由参数验证
app.param('id', (req, res, next, id) => {
  // 验证ID格式
  if (!/^\\d+$/.test(id)) {
    return res.status(400).json({ error: '无效的ID格式' })
  }
  req.userId = parseInt(id)
  next()
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 路由模式匹配</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 字符串模式
app.get('/ab*cd', handler)     // 匹配 abcd, abxcd, abRANDOMcd 等
app.get('/ab+cd', handler)     // 匹配 abcd, abbcd, abbbcd 等
app.get('/ab?cd', handler)     // 匹配 acd, abcd
app.get('/ab(cd)?e', handler)  // 匹配 abe, abcde

// 正则表达式
app.get(/.*fly$/, handler)     // 匹配以 fly 结尾的路径
app.get(/^\/users\\/([0-9]+)$/, (req, res) => {
  const userId = req.params[0]
  res.json({ userId })
})

// 路由处理器数组
const authenticate = (req, res, next) => {
  // 认证逻辑
  next()
}

const authorize = (req, res, next) => {
  // 授权逻辑
  next()
}

app.get('/admin/*', [authenticate, authorize], (req, res) => {
  res.json({ message: '管理员页面' })
})

// 错误处理路由
app.get('/error', (req, res) => {
  throw new Error('测试错误')
})

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ error: '页面未找到' })
})`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 中间件 */}
                <Card title="🔧 中间件系统" className={styles.content_card}>
                    <div className={styles.middleware_section}>
                        <h3>内置中间件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const express = require('express')
const path = require('path')
const app = express()

// 解析JSON请求体
app.use(express.json({ limit: '10mb' }))

// 解析URL编码的请求体
app.use(express.urlencoded({ extended: true }))

// 静态文件服务
app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

// 使用示例
app.post('/api/data', (req, res) => {
  console.log('请求体:', req.body)
  res.json({ received: req.body })
})`}
                            </pre>
                        </div>
                        
                        <h3>第三方中间件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装常用中间件
npm install cors helmet morgan compression cookie-parser

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const cookieParser = require('cookie-parser')

const app = express()

// 安全中间件
app.use(helmet())

// CORS跨域
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  credentials: true
}))

// 日志中间件
app.use(morgan('combined'))

// Gzip压缩
app.use(compression())

// Cookie解析
app.use(cookieParser())

// 请求体解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))`}
                            </pre>
                        </div>
                        
                        <h3>自定义中间件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 日志中间件
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(\`[\${timestamp}] \${req.method} \${req.url}\`)
  next()
}

// 认证中间件
const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  
  if (!token) {
    return res.status(401).json({ error: '缺少认证令牌' })
  }
  
  try {
    // 验证token逻辑
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: '无效的令牌' })
  }
}

// 限流中间件
const rateLimit = (windowMs, max) => {
  const requests = new Map()
  
  return (req, res, next) => {
    const ip = req.ip
    const now = Date.now()
    const windowStart = now - windowMs
    
    // 清理过期记录
    if (requests.has(ip)) {
      const userRequests = requests.get(ip).filter(time => time > windowStart)
      requests.set(ip, userRequests)
    }
    
    const userRequests = requests.get(ip) || []
    
    if (userRequests.length >= max) {
      return res.status(429).json({ error: '请求过于频繁' })
    }
    
    userRequests.push(now)
    requests.set(ip, userRequests)
    next()
  }
}

// 使用中间件
app.use(logger)
app.use('/api', rateLimit(60000, 100)) // 每分钟最多100个请求
app.use('/api/protected', authenticate)`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 错误处理 */}
                <Card title="🚨 错误处理" className={styles.content_card}>
                    <div className={styles.error_section}>
                        <h3>错误处理中间件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 错误处理中间件（必须有4个参数）
const errorHandler = (err, req, res, next) => {
  console.error('错误详情:', err)
  
  // 默认错误状态码
  let statusCode = err.statusCode || 500
  let message = err.message || '服务器内部错误'
  
  // 处理不同类型的错误
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = '数据验证失败'
  } else if (err.name === 'CastError') {
    statusCode = 400
    message = '无效的ID格式'
  } else if (err.code === 11000) {
    statusCode = 400
    message = '数据重复'
  }
  
  // 开发环境返回详细错误信息
  const response = {
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  }
  
  res.status(statusCode).json(response)
}

// 异步错误处理包装器
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// 使用示例
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    const error = new Error('用户未找到')
    error.statusCode = 404
    throw error
  }
  res.json(user)
}))

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    error: '请求的资源未找到',
    path: req.originalUrl
  })
})

// 错误处理中间件必须放在最后
app.use(errorHandler)`}
                            </pre>
                        </div>
                        
                        <h3>全局异常捕获</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 捕获未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason)
  // 优雅关闭服务器
  server.close(() => {
    process.exit(1)
  })
})

// 捕获未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error)
  process.exit(1)
})

// 优雅关闭
const gracefulShutdown = () => {
  console.log('正在关闭服务器...')
  server.close(() => {
    console.log('服务器已关闭')
    process.exit(0)
  })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* RESTful API */}
                <Card title="🌐 RESTful API 设计" className={styles.content_card}>
                    <div className={styles.api_section}>
                        <h3>RESTful API 示例</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const express = require('express')
const router = express.Router()

// 用户资源的RESTful API
class UserController {
  // GET /api/users - 获取用户列表
  static async getUsers(req, res) {
    try {
      const { page = 1, limit = 10, search } = req.query
      const skip = (page - 1) * limit
      
      let query = {}
      if (search) {
        query = {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      }
      
      const users = await User.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-password')
      
      const total = await User.countDocuments(query)
      
      res.json({
        data: users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  // GET /api/users/:id - 获取单个用户
  static async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id).select('-password')
      if (!user) {
        return res.status(404).json({ error: '用户未找到' })
      }
      res.json({ data: user })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  // POST /api/users - 创建用户
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body
      
      // 验证必填字段
      if (!name || !email || !password) {
        return res.status(400).json({ error: '缺少必填字段' })
      }
      
      // 检查邮箱是否已存在
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ error: '邮箱已存在' })
      }
      
      const user = new User({ name, email, password })
      await user.save()
      
      // 不返回密码
      const userResponse = user.toObject()
      delete userResponse.password
      
      res.status(201).json({ 
        message: '用户创建成功',
        data: userResponse 
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  // PUT /api/users/:id - 更新用户
  static async updateUser(req, res) {
    try {
      const { name, email } = req.body
      
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true, runValidators: true }
      ).select('-password')
      
      if (!user) {
        return res.status(404).json({ error: '用户未找到' })
      }
      
      res.json({ 
        message: '用户更新成功',
        data: user 
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  // DELETE /api/users/:id - 删除用户
  static async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
        return res.status(404).json({ error: '用户未找到' })
      }
      
      res.json({ message: '用户删除成功' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

// 路由定义
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUser)
router.post('/users', UserController.createUser)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

module.exports = router`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Express.js 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 项目结构组织</h4>
                                <p>采用清晰的项目结构，便于维护和扩展</p>
                                <div className={styles.code_block}>
                                    <pre>
{`project/
├── src/
│   ├── controllers/     # 控制器
│   ├── models/         # 数据模型
│   ├── routes/         # 路由定义
│   ├── middleware/     # 中间件
│   ├── services/       # 业务逻辑
│   ├── utils/          # 工具函数
│   └── config/         # 配置文件
├── tests/              # 测试文件
├── public/             # 静态文件
├── docs/               # 文档
├── .env                # 环境变量
├── app.js              # 应用入口
└── server.js           # 服务器启动`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 安全性配置</h4>
                                <p>实施必要的安全措施保护应用</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

// 安全头部
app.use(helmet())

// 限流
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP 100个请求
})
app.use('/api/', limiter)

// 输入验证
const { body, validationResult } = require('express-validator')

app.post('/api/users',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // 处理请求
  }
)`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>优化应用性能，提升用户体验</p>
                                <ul>
                                    <li>使用压缩中间件减少响应大小</li>
                                    <li>启用HTTP缓存头</li>
                                    <li>使用连接池管理数据库连接</li>
                                    <li>实施适当的日志级别</li>
                                    <li>使用集群模式充分利用多核CPU</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ExpressDetail
