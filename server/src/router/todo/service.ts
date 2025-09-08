import { PrismaDB } from '@/db'
import { generateUniqueBigIntId, Result } from '@/utils'
import { inject, injectable } from 'inversify'
import { CreateTodoDto, UpdateTodoDto } from './dto'

@injectable()
export class TodoService {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {}

  public async getTodos(userId: string) {
    const todos = await this.PrismaDB.prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return Result.success(todos)
  }

  public async createTodo(userId: string, data: CreateTodoDto) {
    const newTodo = await this.PrismaDB.prisma.todo.create({
      data: {
        id: generateUniqueBigIntId(true) as string,
        content: data.content,
        type: data.type,
        completed: false,
        user: { connect: { id: userId } },
      },
    })
    return Result.success(newTodo)
  }

  public async updateTodo(todoId: string, data: UpdateTodoDto) {
    const updatedTodo = await this.PrismaDB.prisma.todo.update({
      where: { id: todoId },
      data,
    })
    return Result.success(updatedTodo)
  }

  public async deleteTodo(todoId: string) {
    await this.PrismaDB.prisma.todo.delete({
      where: { id: todoId },
    })
    return Result.success(null, 'Todo deleted successfully')
  }
}
