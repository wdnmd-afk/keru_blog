// app.config.ts
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

/**
 * 应用配置接口
 */
export interface AppConfig {
    server: {
        port: number
        env: string
        host: string
    }
    jwt: {
        secret: string
        expiresIn: string
    }
    redis: {
        host: string
        port: number
        password?: string
    }
    database: {
        url: string
    }
    upload: {
        maxFileSize: number // bytes
        allowedTypes: string[]
        uploadDir: string
    }
    cors: {
        origin: string[]
        credentials: boolean
    }
    rateLimit: {
        windowMs: number
        maxRequests: number
    }
}

/**
 * 创建应用配置
 */
export function createAppConfig(): AppConfig {
    return {
        server: {
            port: parseInt(process.env.PORT || '5566', 10),
            env: process.env.NODE_ENV || 'development',
            host: process.env.HOST || 'localhost'
        },
        jwt: {
            secret: process.env.JWT_SECRET || 'fallback-secret-key',
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        },
        redis: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
            password: process.env.REDIS_PASSWORD || undefined
        },
        database: {
            url: process.env.DATABASE_URL || 'mysql://root:123456@localhost:3306/test'
        },
        upload: {
            maxFileSize: 100 * 1024 * 1024, // 100MB
            allowedTypes: [
                // 图片类型
                'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg',
                // 文档类型
                'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'md',
                // 视频类型
                'mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv',
                // 音频类型
                'mp3', 'wav', 'flac', 'aac',
                // 压缩文件
                'zip', 'rar', '7z', 'tar', 'gz'
            ],
            uploadDir: process.env.UPLOAD_DIR || 'static'
        },
        cors: {
            origin: process.env.CORS_ORIGIN?.split(',') || [
                'http://localhost:3000',
                'http://localhost:9394',  // 前端开发端口
                'http://127.0.0.1:9394'
            ],
            credentials: true
        },
        rateLimit: {
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15分钟
            maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
        }
    }
}

/**
 * 验证必需的环境变量
 */
export function validateConfig(config: AppConfig): void {
    const requiredEnvVars = [
        'DATABASE_URL'
    ]

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
    }

    // 验证JWT密钥
    if (!process.env.JWT_SECRET) {
        console.warn('⚠️  WARNING: JWT_SECRET environment variable is not set. Using fallback secret.')
        console.warn('⚠️  WARNING: This is insecure for production use!')
    }

    // 验证数据库连接URL格式
    if (!config.database.url.match(/^mysql:\/\/.+/)) {
        throw new Error('Invalid DATABASE_URL format. Expected MySQL connection string.')
    }

    console.log('✅ Configuration validation passed')
}

/**
 * 打印配置摘要（隐藏敏感信息）
 */
export function printConfigSummary(config: AppConfig): void {
    console.log('📋 Application Configuration:')
    console.log(`   Server: ${config.server.host}:${config.server.port} (${config.server.env})`)
    console.log(`   Database: ${config.database.url.replace(/\/\/.*@/, '//***:***@')}`)
    console.log(`   Redis: ${config.redis.host}:${config.redis.port}`)
    console.log(`   JWT Expires: ${config.jwt.expiresIn}`)
    console.log(`   Upload Max Size: ${config.upload.maxFileSize / (1024 * 1024)}MB`)
    console.log(`   CORS Origins: ${config.cors.origin.join(', ')}`)
    console.log('')
}