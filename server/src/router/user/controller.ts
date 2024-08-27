import { controller,  httpPost as PostMapping } from 'inversify-express-utils'
import { UserService } from './service'
import { inject } from 'inversify'
import type { Request, Response } from 'express'
// import { JWT } from '../../jwt'
// const {middleware}  = new JWT()
@controller('/user')
export class User {
    constructor(@inject(UserService) private readonly UserService: UserService) {

    }
   /* @GetMapping('/index',middleware()) //主要代码
    public async getIndex(req: Request, res: Response) {
        let result = await this.UserService.getList()
        res.send(result)
    }*/

    @PostMapping('/create')
    public async createUser(req: Request, res: Response) {
        const result = await this.UserService.createUser(req.body)
        res.sendResponse (result)
    }
    @PostMapping('/login')
    public async login(req: Request, res: Response) {
        const result = await this.UserService.login(req.body)
        res.sendResponse(result)
    }
}
