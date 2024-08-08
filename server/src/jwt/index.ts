import { injectable } from 'inversify';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@injectable()
export class JWT {
    private secret: string = 'keru$%^&*()asdsd';
    private jwtOptions: Strategy.StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secret
    };

    constructor() {
        this.strategy();
    }

    /**
     * Initializes the JWT strategy.
     */
    private strategy() {
        const strategy = new Strategy(this.jwtOptions, (payload, done) => {
            done(null, payload);
        });
        passport.use(strategy);
    }

    /**
     * Returns the authentication middleware.
     */
    public middleware() {
        return passport.authenticate('jwt', { session: false });
    }

    /**
     * Creates a token.
     * @param data - The data to be encoded in the token.
     * @returns The generated JWT.
     */
    public createToken(data: object): string {
        const options: SignOptions = { expiresIn: '7d' };
        return jsonwebtoken.sign(data, this.secret, options);
    }

    /**
     * Initializes the passport middleware.
     */
    public init() {
        return passport.initialize();
    }
}