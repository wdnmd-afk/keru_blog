import { controller, httpPost, BaseHttpController } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TodoService } from './service';
import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { validationMiddleware } from '@/middleware';
import { AuthMiddleware } from '@/middleware/auth';
import jsonwebtoken from 'jsonwebtoken';

@controller('/todo', AuthMiddleware)
export class TodoController extends BaseHttpController {
    constructor(@inject(TodoService) private readonly todoService: TodoService) {
        super();
    }

    /**
     * 获取当前用户ID的通用方法
     */
    private getUserId(req: any): string {
        // 尝试从 httpContext 获取用户信息
        if (this.httpContext && this.httpContext.user && this.httpContext.user.details) {
            return this.httpContext.user.details.id;
        }
        
        // 备用方法：从 JWT token 中直接解析
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Unauthorized: No token provided');
        }
        
        const secret = process.env.JWT_SECRET || 'fallback-secret-key';
        const decoded = jsonwebtoken.verify(token, secret) as any;
        return decoded.id;
    }

    @httpPost('/getTodos')
    public async getTodos(req: Request, res: Response) {
        try {
            const userId = this.getUserId(req);
            const result = await this.todoService.getTodos(userId);
            (res as any).sendResponse(result);
        } catch (error) {
            console.error('getTodos error:', error);
            (res as any).sendResponse({
                code: error.message.includes('Unauthorized') ? 401 : 500,
                success: false,
                message: error.message
            });
        }
    }

    @httpPost('/createTodo', validationMiddleware(CreateTodoDto))
    public async createTodo(req: Request, res: Response) {
        try {
            const userId = this.getUserId(req);
            const result = await this.todoService.createTodo(userId, req.body);
            (res as any).sendResponse(result);
        } catch (error) {
            console.error('createTodo error:', error);
            (res as any).sendResponse({
                code: error.message.includes('Unauthorized') ? 401 : 500,
                success: false,
                message: error.message
            });
        }
    }

    @httpPost('/updateTodo', validationMiddleware(UpdateTodoDto))
    public async updateTodo(req: Request, res: Response) {
        try {
            const { id, ...updateData } = req.body;
            const result = await this.todoService.updateTodo(id, updateData);
            (res as any).sendResponse(result);
        } catch (error) {
            console.error('updateTodo error:', error);
            (res as any).sendResponse({
                code: 500,
                success: false,
                message: error.message
            });
        }
    }

    @httpPost('/deleteTodo')
    public async deleteTodo(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const result = await this.todoService.deleteTodo(id);
            (res as any).sendResponse(result);
        } catch (error) {
            console.error('deleteTodo error:', error);
            (res as any).sendResponse({
                code: 500,
                success: false,
                message: error.message
            });
        }
    }
}
