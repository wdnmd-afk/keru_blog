import { injectable } from 'inversify'
import jsonwebtoken, { SignOptions, VerifyErrors } from 'jsonwebtoken'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import Redis from 'ioredis'
import { AuthenticationError } from './AuthenticationError'


@injectable()
export class JWT {
    private secret: string = 'keru$%^&*()asdsd'
    private jwtOptions: Strategy.StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secret,
    }
    private redisClient: Redis
    private tokenHashKey: string = 'user_tokens' // Redis中存储token的哈希键

    constructor() {
        this.redisClient = new Redis() // 默认连接到本地的Redis实例
        this.strategy()
        this.addUserToRequest = this.addUserToRequest.bind(this)
    }

    /**
     * Initializes the JWT strategy.
     */
    private strategy() {
        const strategy = new Strategy(this.jwtOptions, async (payload: {
            id: string | Buffer;
        }, done: (err: Error | null, user?: any) => any) => {
            try {
                const token = await this.redisClient.hget(this.tokenHashKey, payload.id)
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
        })
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
        const options: SignOptions = { expiresIn: '1d' } // 设置token过期时间为1天
        const token = jsonwebtoken.sign(data, this.secret, options)
        const uid = data.id
        // 使用哈希结构存储token，字段为uid，值为token
        await this.redisClient.hset(this.tokenHashKey, uid, token)
        // 设置过期时间为1天
        await this.redisClient.expire(this.tokenHashKey, 86400)

        return token
    }

    /**
     * Initializes the passport middleware.
     */
    public init() {
        return passport.initialize()
    }

}
