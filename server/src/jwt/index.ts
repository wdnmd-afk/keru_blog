import { injectable } from 'inversify';
import jsonwebtoken, { SignOptions,VerifyErrors } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import Redis from 'ioredis';
import {AuthenticationError} from './AuthenticationError'

@injectable()
export class JWT {
    private secret: string = 'keru$%^&*()asdsd';
    private jwtOptions: Strategy.StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secret
    };
    private redisClient: Redis;
    private tokenHashKey: string = 'user_tokens'; // Redis中存储token的哈希键

    constructor() {
        this.redisClient = new Redis(); // 默认连接到本地的Redis实例
        this.strategy();
    }

    /**
     * Initializes the JWT strategy.
     */
    private strategy() {
        const strategy = new Strategy(this.jwtOptions, async (payload: { id: string | Buffer; }, done: (err: Error | null, user?: object | false) => any) => {
            try {
                const token = await this.redisClient.hget(this.tokenHashKey, payload.id);
                console.log(token,'ttttt')
                if (!token) {
                    return done(new AuthenticationError('Token not valid or expired'), false); // token无效或已过期
                }

                jsonwebtoken.verify(token, this.secret, (err: VerifyErrors | null, decoded: object | undefined) => {
                    console.log(err,'errrrrrr')
                    if (err) {
                        return done(new AuthenticationError('Token not valid or expired'), false); // token无效或已过期
                    }
                    return done(null, decoded);
                });
            } catch (error) {
                console.log(error,'myeeeee')
                return done(new AuthenticationError('Token not valid or expired'), false);
            }
        });
        passport.use(strategy);
    }

    /**
     * Returns the authentication middleware.
     */
    public middleware() {
        console.log('middlew')

        return passport.authenticate('jwt', { session: false });
    }

    /**
     * Creates a token.
     * @param data - The data to be encoded in the token.
     * @returns The generated JWT.
     */
    public async createToken(data: any): Promise<string> {
        const options: SignOptions = { expiresIn: '1d' }; // 设置token过期时间为1天
        const token = jsonwebtoken.sign(data, this.secret, options);
        console.log(data,'ddd')
        const uid = data.id
        // 使用哈希结构存储token，字段为uid，值为token
        await this.redisClient.hset(this.tokenHashKey, uid, token);
        // 设置过期时间为1天
        await this.redisClient.expire(this.tokenHashKey, 86400);

        return token;
    }

    /**
     * Initializes the passport middleware.
     */
    public init() {
        return passport.initialize();
    }
}
