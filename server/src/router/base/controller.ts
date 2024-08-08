import { controller,  httpPost as PostMapping } from 'inversify-express-utils'
import { BaseService } from './service'
import { inject } from 'inversify'
import type { Request, Response } from 'express'
import { JWT } from '@/jwt'
const {middleware}  = new JWT()
@controller('/base')
export class Base {
    constructor(@inject(BaseService) private readonly BaseService: BaseService) {
    }
   /* @GetMapping('/index',middleware()) //主要代码
    public async getIndex(req: Request, res: Response) {
        let result = await this.UserService.getList()
        res.send(result)
    }*/

    @PostMapping('/createUserDetail',middleware())
    public async updateUserDetail(req: Request, res: Response) {
        const result = await this.BaseService.createUserDetail(req.body)
        res.send(result)
    }

}
