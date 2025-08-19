import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    SafetyOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const AuthenticationDetail: React.FC = () => {
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
                    <SafetyOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Node.js 身份认证详解</h1>
                    <p>掌握Node.js应用的身份认证与授权机制</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">身份认证</Tag>
                        <Tag color="green">JWT</Tag>
                        <Tag color="orange">OAuth</Tag>
                        <Tag color="purple">Session</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 认证方式对比 */}
                <Card title="🔐 认证方式对比" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>主流认证方式</h3>
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h4>🍪 Session + Cookie</h4>
                                <p><strong>传统方式</strong>：服务器端存储会话信息</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>服务器完全控制会话</li>
                                            <li>可以随时撤销会话</li>
                                            <li>相对安全</li>
                                            <li>实现简单</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>服务器存储压力</li>
                                            <li>扩展性差</li>
                                            <li>跨域问题</li>
                                            <li>移动端支持差</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.comparison_item}>
                                <h4>🎫 JWT Token</h4>
                                <p><strong>无状态方式</strong>：客户端存储令牌信息</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>无状态，易扩展</li>
                                            <li>跨域友好</li>
                                            <li>移动端支持好</li>
                                            <li>减少服务器存储</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>难以撤销令牌</li>
                                            <li>令牌可能较大</li>
                                            <li>需要处理过期</li>
                                            <li>安全性依赖实现</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <Alert
                            message="选择建议"
                            description="对于单体应用推荐Session，对于微服务和移动应用推荐JWT。也可以结合使用，短期用JWT，长期用Refresh Token。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>
                
                {/* Session认证 */}
                <Card title="🍪 Session 认证实现" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Express Session配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装依赖
npm install express-session connect-redis redis

// 配置Session
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')

const app = express()
const redisClient = redis.createClient()

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS环境设为true
        httpOnly: true, // 防止XSS攻击
        maxAge: 24 * 60 * 60 * 1000, // 24小时
        sameSite: 'strict' // CSRF保护
    },
    name: 'sessionId' // 自定义cookie名称
}))

// 登录路由
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    
    try {
        // 验证用户凭据
        const user = await User.findOne({ email })
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: '邮箱或密码错误' })
        }
        
        // 创建会话
        req.session.userId = user.id
        req.session.user = {
            id: user.id,
            email: user.email,
            name: user.name
        }
        
        res.json({ message: '登录成功', user: req.session.user })
    } catch (error) {
        res.status(500).json({ error: '服务器错误' })
    }
})

// 登出路由
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: '登出失败' })
        }
        res.clearCookie('sessionId')
        res.json({ message: '登出成功' })
    })
})

// 认证中间件
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next()
    } else {
        return res.status(401).json({ error: '请先登录' })
    }
}

// 受保护的路由
app.get('/profile', requireAuth, (req, res) => {
    res.json({ user: req.session.user })
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 密码安全处理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 安装bcrypt
npm install bcrypt

const bcrypt = require('bcrypt')

// 用户注册
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    
    try {
        // 验证输入
        if (!name || !email || !password) {
            return res.status(400).json({ error: '所有字段都是必需的' })
        }
        
        if (password.length < 8) {
            return res.status(400).json({ error: '密码至少8位' })
        }
        
        // 检查用户是否已存在
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: '用户已存在' })
        }
        
        // 加密密码
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        
        // 创建用户
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        
        await user.save()
        
        // 创建会话
        req.session.userId = user.id
        req.session.user = {
            id: user.id,
            email: user.email,
            name: user.name
        }
        
        res.status(201).json({ 
            message: '注册成功', 
            user: req.session.user 
        })
    } catch (error) {
        res.status(500).json({ error: '服务器错误' })
    }
})

// 密码强度验证
function validatePassword(password) {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    const errors = []
    
    if (password.length < minLength) {
        errors.push(\`密码至少\${minLength}位\`)
    }
    if (!hasUpperCase) {
        errors.push('密码必须包含大写字母')
    }
    if (!hasLowerCase) {
        errors.push('密码必须包含小写字母')
    }
    if (!hasNumbers) {
        errors.push('密码必须包含数字')
    }
    if (!hasSpecialChar) {
        errors.push('密码必须包含特殊字符')
    }
    
    return {
        isValid: errors.length === 0,
        errors
    }
}

// 修改密码
app.post('/change-password', requireAuth, async (req, res) => {
    const { currentPassword, newPassword } = req.body
    
    try {
        const user = await User.findById(req.session.userId)
        
        // 验证当前密码
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ error: '当前密码错误' })
        }
        
        // 验证新密码强度
        const passwordValidation = validatePassword(newPassword)
        if (!passwordValidation.isValid) {
            return res.status(400).json({ 
                error: '密码不符合要求',
                details: passwordValidation.errors
            })
        }
        
        // 更新密码
        const hashedNewPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedNewPassword
        await user.save()
        
        res.json({ message: '密码修改成功' })
    } catch (error) {
        res.status(500).json({ error: '服务器错误' })
    }
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 会话管理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 会话监控中间件
function sessionMonitor(req, res, next) {
    if (req.session) {
        // 更新最后活动时间
        req.session.lastActivity = new Date()
        
        // 记录用户活动
        if (req.session.userId) {
            console.log(\`用户 \${req.session.userId} 在 \${new Date()} 访问了 \${req.path}\`)
        }
    }
    next()
}

app.use(sessionMonitor)

// 获取活跃会话
app.get('/admin/active-sessions', requireAdmin, async (req, res) => {
    try {
        // 从Redis获取所有会话
        const keys = await redisClient.keys('sess:*')
        const sessions = []
        
        for (const key of keys) {
            const sessionData = await redisClient.get(key)
            if (sessionData) {
                const session = JSON.parse(sessionData)
                if (session.userId) {
                    sessions.push({
                        sessionId: key.replace('sess:', ''),
                        userId: session.userId,
                        user: session.user,
                        lastActivity: session.lastActivity,
                        createdAt: session.cookie.originalMaxAge
                    })
                }
            }
        }
        
        res.json({ sessions })
    } catch (error) {
        res.status(500).json({ error: '获取会话失败' })
    }
})

// 强制登出用户
app.post('/admin/force-logout/:userId', requireAdmin, async (req, res) => {
    const { userId } = req.params
    
    try {
        const keys = await redisClient.keys('sess:*')
        
        for (const key of keys) {
            const sessionData = await redisClient.get(key)
            if (sessionData) {
                const session = JSON.parse(sessionData)
                if (session.userId === userId) {
                    await redisClient.del(key)
                }
            }
        }
        
        res.json({ message: '用户已被强制登出' })
    } catch (error) {
        res.status(500).json({ error: '强制登出失败' })
    }
})

// 会话清理任务
function cleanupExpiredSessions() {
    setInterval(async () => {
        try {
            const keys = await redisClient.keys('sess:*')
            let cleanedCount = 0
            
            for (const key of keys) {
                const ttl = await redisClient.ttl(key)
                if (ttl === -1) { // 没有过期时间的会话
                    await redisClient.del(key)
                    cleanedCount++
                }
            }
            
            if (cleanedCount > 0) {
                console.log(\`清理了 \${cleanedCount} 个过期会话\`)
            }
        } catch (error) {
            console.error('会话清理失败:', error)
        }
    }, 60 * 60 * 1000) // 每小时执行一次
}

cleanupExpiredSessions()`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* JWT认证 */}
                <Card title="🎫 JWT 认证实现" className={styles.content_card}>
                    <div className={styles.jwt_section}>
                        <h3>JWT基础实现</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装依赖
npm install jsonwebtoken

const jwt = require('jsonwebtoken')

// JWT配置
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret'
const REFRESH_TOKEN_EXPIRES_IN = '7d'

// 生成JWT令牌
function generateTokens(user) {
    const payload = {
        userId: user.id,
        email: user.email,
        name: user.name
    }
    
    const accessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        issuer: 'your-app',
        audience: 'your-app-users'
    })
    
    const refreshToken = jwt.sign(
        { userId: user.id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    )
    
    return { accessToken, refreshToken }
}

// 登录路由
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body
    
    try {
        // 验证用户凭据
        const user = await User.findOne({ email })
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: '邮箱或密码错误' })
        }
        
        // 生成令牌
        const { accessToken, refreshToken } = generateTokens(user)
        
        // 存储refresh token（可选，用于撤销）
        user.refreshToken = refreshToken
        await user.save()
        
        // 设置HTTP-only cookie（推荐）
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7天
        })
        
        res.json({
            message: '登录成功',
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })
    } catch (error) {
        res.status(500).json({ error: '服务器错误' })
    }
})

// JWT验证中间件
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ error: '访问令牌缺失' })
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: '令牌已过期' })
            }
            return res.status(403).json({ error: '令牌无效' })
        }
        
        req.user = decoded
        next()
    })
}

// 刷新令牌
app.post('/auth/refresh', async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken
    
    if (!refreshToken) {
        return res.status(401).json({ error: '刷新令牌缺失' })
    }
    
    try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
        const user = await User.findById(decoded.userId)
        
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ error: '刷新令牌无效' })
        }
        
        // 生成新的令牌对
        const tokens = generateTokens(user)
        
        // 更新存储的refresh token
        user.refreshToken = tokens.refreshToken
        await user.save()
        
        // 更新cookie
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        res.json({
            accessToken: tokens.accessToken,
            message: '令牌刷新成功'
        })
    } catch (error) {
        res.status(403).json({ error: '刷新令牌无效' })
    }
})`}
                            </pre>
                        </div>
                        
                        <h3>JWT安全增强</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 令牌黑名单（Redis实现）
const blacklistedTokens = new Set()

// 登出时将令牌加入黑名单
app.post('/auth/logout', authenticateToken, async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    
    try {
        // 获取令牌过期时间
        const decoded = jwt.decode(token)
        const expiresAt = decoded.exp * 1000 // 转换为毫秒
        const now = Date.now()
        
        if (expiresAt > now) {
            // 将令牌加入黑名单，设置过期时间
            const ttl = Math.floor((expiresAt - now) / 1000)
            await redisClient.setex(\`blacklist:\${token}\`, ttl, 'true')
        }
        
        // 清除refresh token
        const user = await User.findById(req.user.userId)
        if (user) {
            user.refreshToken = null
            await user.save()
        }
        
        res.clearCookie('refreshToken')
        res.json({ message: '登出成功' })
    } catch (error) {
        res.status(500).json({ error: '登出失败' })
    }
})

// 增强的JWT验证中间件
function authenticateTokenWithBlacklist(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ error: '访问令牌缺失' })
    }
    
    // 检查令牌是否在黑名单中
    redisClient.get(\`blacklist:\${token}\`, (err, result) => {
        if (result) {
            return res.status(401).json({ error: '令牌已失效' })
        }
        
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: '令牌已过期' })
                }
                return res.status(403).json({ error: '令牌无效' })
            }
            
            req.user = decoded
            next()
        })
    })
}

// 令牌轮换策略
function rotateTokens(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token) {
        const decoded = jwt.decode(token)
        const now = Math.floor(Date.now() / 1000)
        const timeUntilExpiry = decoded.exp - now
        
        // 如果令牌在5分钟内过期，自动刷新
        if (timeUntilExpiry < 300) {
            const newToken = jwt.sign(
                { 
                    userId: decoded.userId,
                    email: decoded.email,
                    name: decoded.name
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            )
            
            res.setHeader('X-New-Token', newToken)
        }
    }
    
    next()
}

// 使用增强的中间件
app.use('/api', authenticateTokenWithBlacklist, rotateTokens)`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* OAuth集成 */}
                <Card title="🔗 OAuth 第三方登录" className={styles.content_card}>
                    <div className={styles.oauth_section}>
                        <h3>Google OAuth 2.0</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装依赖
npm install passport passport-google-oauth20

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

// 配置Google策略
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // 查找现有用户
        let user = await User.findOne({ googleId: profile.id })
        
        if (user) {
            return done(null, user)
        }
        
        // 检查是否有相同邮箱的用户
        user = await User.findOne({ email: profile.emails[0].value })
        
        if (user) {
            // 关联Google账号
            user.googleId = profile.id
            await user.save()
            return done(null, user)
        }
        
        // 创建新用户
        user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            provider: 'google'
        })
        
        await user.save()
        done(null, user)
    } catch (error) {
        done(error, null)
    }
}))

// 序列化用户
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})

// 初始化Passport
app.use(passport.initialize())
app.use(passport.session())

// Google登录路由
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Google回调路由
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // 成功登录，生成JWT令牌
        const { accessToken, refreshToken } = generateTokens(req.user)
        
        // 重定向到前端，携带令牌
        res.redirect(\`\${process.env.CLIENT_URL}/auth/success?token=\${accessToken}\`)
    }
)`}
                            </pre>
                        </div>
                        
                        <h3>GitHub OAuth</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装GitHub策略
npm install passport-github2

const GitHubStrategy = require('passport-github2').Strategy

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ githubId: profile.id })
        
        if (user) {
            return done(null, user)
        }
        
        // 检查邮箱是否已存在
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null
        if (email) {
            user = await User.findOne({ email })
            if (user) {
                user.githubId = profile.id
                await user.save()
                return done(null, user)
            }
        }
        
        // 创建新用户
        user = new User({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            email: email,
            avatar: profile.photos[0].value,
            provider: 'github',
            githubUsername: profile.username
        })
        
        await user.save()
        done(null, user)
    } catch (error) {
        done(error, null)
    }
}))

// GitHub登录路由
app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
)

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        const { accessToken, refreshToken } = generateTokens(req.user)
        res.redirect(\`\${process.env.CLIENT_URL}/auth/success?token=\${accessToken}\`)
    }
)

// 统一的OAuth成功处理
function handleOAuthSuccess(req, res) {
    const { accessToken, refreshToken } = generateTokens(req.user)
    
    // 设置安全cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    
    // 重定向到前端
    res.redirect(\`\${process.env.CLIENT_URL}/dashboard?welcome=true\`)
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 身份认证最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 安全存储</h4>
                                <p>安全地存储和传输认证信息</p>
                                <ul>
                                    <li>使用强加密算法存储密码</li>
                                    <li>使用HTTPS传输敏感信息</li>
                                    <li>设置安全的Cookie属性</li>
                                    <li>定期轮换密钥和令牌</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 会话管理</h4>
                                <p>合理管理用户会话</p>
                                <ul>
                                    <li>设置合适的会话过期时间</li>
                                    <li>实施会话固定攻击防护</li>
                                    <li>监控异常登录行为</li>
                                    <li>提供安全的登出机制</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 多因素认证</h4>
                                <p>增强账户安全性</p>
                                <ul>
                                    <li>支持短信验证码</li>
                                    <li>集成TOTP应用</li>
                                    <li>提供备用恢复码</li>
                                    <li>实施风险评估</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 错误处理</h4>
                                <p>安全的错误处理机制</p>
                                <ul>
                                    <li>避免泄露敏感信息</li>
                                    <li>实施登录尝试限制</li>
                                    <li>记录安全相关日志</li>
                                    <li>提供友好的错误提示</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AuthenticationDetail
