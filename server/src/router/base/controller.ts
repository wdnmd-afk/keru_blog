import { controller, httpPost as PostMapping, BaseHttpController } from 'inversify-express-utils';
import { BaseService } from './service';
import { inject } from 'inversify';
import type { Request, Response } from 'express';
import { AuthMiddleware } from '@/middleware/auth';
import { validationMiddleware } from '@/middleware';
import { UserDetailDto } from './base.dto';

@controller('/base', AuthMiddleware)
export class BaseController extends BaseHttpController {
    constructor(@inject(BaseService) private readonly baseService: BaseService) {
        super();
    }

    @PostMapping('/createUserDetail', validationMiddleware(UserDetailDto))
    public async updateUserDetail(req: Request, res: Response) {
        const user = this.httpContext.user.details;
        const result = await this.baseService.createUserDetail(req.body, user.id);
        (res as any).sendResponse(result);
    }
}
