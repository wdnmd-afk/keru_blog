import { controller, httpPost, BaseHttpController } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TodoService } from './service';
import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { validationMiddleware } from '@/middleware';
import { AuthMiddleware } from '@/middleware/auth';

@controller('/todo', AuthMiddleware)
export class TodoController extends BaseHttpController {
    constructor(@inject(TodoService) private readonly todoService: TodoService) {
        super();
    }

    @httpPost('/getTodos')
    public async getTodos(req: Request, res: Response) {
        const user = this.httpContext.user.details;
        const result = await this.todoService.getTodos(user.id);
        (res as any).sendResponse(result);
    }

    @httpPost('/createTodo', validationMiddleware(CreateTodoDto))
    public async createTodo(req: Request, res: Response) {
        const user = this.httpContext.user.details;
        const result = await this.todoService.createTodo(user.id, req.body);
        (res as any).sendResponse(result);
    }

    @httpPost('/updateTodo', validationMiddleware(UpdateTodoDto))
    public async updateTodo(req: Request, res: Response) {
        const { id, ...updateData } = req.body;
        const result = await this.todoService.updateTodo(id, updateData);
        (res as any).sendResponse(result);
    }

    @httpPost('/deleteTodo')
    public async deleteTodo(req: Request, res: Response) {
        const { id } = req.body;
        const result = await this.todoService.deleteTodo(id);
        (res as any).sendResponse(result);
    }
}
