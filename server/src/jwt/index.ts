import { injectable } from 'inversify'
import Redis from 'ioredis'
import jsonwebtoken, { SignOptions, VerifyErrors } from 'jsonwebtoken'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthenticationError } from './AuthenticationError'

@injectable()
export class JWT {
  // 从环境变量获取JWT密钥，提高安全性
  private secret: string = process.env.JWT_SECRET || 'fallback-secret-key'
  private expiresIn: string = process.env.JWT_EXPIRES_IN || '1d'
  private jwtOptions: Strategy.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.secret,
  }
  private redisClient: Redis

  constructor() {
    // 检查必要的环境变量
    if (!process.env.JWT_SECRET) {
      console.warn('警告: JWT_SECRET 环境变量未设置，使用默认值！')
    }

    // 初始化Redis连接
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: 3,
    })

    this.strategy()
    this.addUserToRequest = this.addUserToRequest.bind(this)
  }

  /**
   * Initializes the JWT strategy.
   */
  private strategy() {
    const strategy = new Strategy(
      this.jwtOptions,
      async (
        payload: {
          id: string | Buffer
        },
        done: (err: Error | null, user?: any) => any
      ) => {
        try {
          // 使用新的Redis存储结构获取token
          const token = await this.redisClient.get(`token:${payload.id}`)
          if (!token) {
            return done(new AuthenticationError('Token not valid or expired'), false)
          }

          jsonwebtoken.verify(token, this.secret, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
              return done(new AuthenticationError('Token not valid or expired'), false)
            }
            return done(null, decoded) // 将解码后的用户信息传递给 done
          })
        } catch (error) {
          return done(new AuthenticationError('Token not valid or expired'), false)
        }
      }
    )
    passport.use(strategy)
  }

  public addUserToRequest(req: any, _res: any, next: any) {
    return (err: any, user: any) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return next(new AuthenticationError('User not authenticated'))
      }
      req.user = user // 将用户信息添加到 req 对象
      next()
    }
  }

  /**
   * Returns the authentication middleware.
   */
  public middleware() {
    return (req: any, res: any, next: any) => {
      passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
        if (err) {
          return next(err)
        }
        if (!user) {
          return next(new AuthenticationError('User not authenticated'))
        }
        //给req带上user的jwt参数
        req.user = user
        next()
      })(req, res, next)
    }
  }

  /**
   * Creates a token.
   * @param data - The data to be encoded in the token.
   * @returns The generated JWT.
   */
  public async createToken(data: any): Promise<string> {
    const options: SignOptions = { expiresIn: this.expiresIn } // 使用环境变量配置的过期时间
    const token = jsonwebtoken.sign(data, this.secret, options)
    const uid = data.id

    // 优化：为每个token设置独立过期时间，而不是整个哈希
    const expiresInSeconds = this.expiresIn === '1d' ? 86400 : 3600 // 1天 or 1小时
    await this.redisClient.setex(`token:${uid}`, expiresInSeconds, token)

    return token
  }

  /**
   * Initializes the passport middleware.
   */
  public init() {
    return passport.initialize()
  }
}
