import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TodoService } from './service';
import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { getJwt } from '@/utils';
import { handleError } from '@/utils/methods';
import { validate } from 'class-validator';

@controller('/todo')
export class TodoController {
    constructor(@inject(TodoService) private readonly todoService: TodoService) {}

    @httpPost('/getTodos')
    public async getTodos(req: Request, res: Response) {
        const user = await getJwt(req);
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const result = await this.todoService.getTodos(user.id);
        (res as any).sendResponse(result);
    }

    @httpPost('/createTodo')
    public async createTodo(req: Request, res: Response) {
        const user = await getJwt(req);
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const createTodoDto = new CreateTodoDto();
        createTodoDto.content = req.body.content;
        createTodoDto.type = req.body.type;

        const errors = await validate(createTodoDto);
        if (errors.length > 0) {
            return handleError(errors, () => {});
        }

        const result = await this.todoService.createTodo(user.id, createTodoDto);
        (res as any).sendResponse(result);
    }

    @httpPost('/updateTodo')
    public async updateTodo(req: Request, res: Response) {
        const user = await getJwt(req);
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        
        const { id, ...updateData } = req.body;

        const updateTodoDto = new UpdateTodoDto();
        updateTodoDto.content = updateData.content;
        updateTodoDto.completed = updateData.completed;
        updateTodoDto.type = updateData.type;

        const errors = await validate(updateTodoDto);
        if (errors.length > 0) {
            return handleError(errors, () => {});
        }

        const result = await this.todoService.updateTodo(id, updateTodoDto);
        (res as any).sendResponse(result);
    }

    @httpPost('/deleteTodo')
    public async deleteTodo(req: Request, res: Response) {
        const user = await getJwt(req);
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const { id } = req.body;
        const result = await this.todoService.deleteTodo(id);
        (res as any).sendResponse(result);
    }
}
