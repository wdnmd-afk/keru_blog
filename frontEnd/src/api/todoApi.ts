import { Todo, TodoType } from '@/types/todo.d'
import { Http } from '@/utils'
import { ResultData } from '@/utils/http/httpEnum'

interface CreateTodo {
    content: string
    type: TodoType
}

interface UpdateTodo {
    id: string
    content?: string
    completed?: boolean
    type?: TodoType
}

class TodoApi {
    public static async getTodos(): Promise<ResultData<Todo[]>> {
        return await Http.post('/todo/getTodos')
    }

    public static async createTodo(params: CreateTodo): Promise<ResultData<Todo>> {
        return await Http.post('/todo/createTodo', params)
    }

    public static async updateTodo(params: UpdateTodo): Promise<ResultData<Todo>> {
        return await Http.post('/todo/updateTodo', params)
    }

    public static async deleteTodo(id: string): Promise<ResultData> {
        return await Http.post('/todo/deleteTodo', { id })
    }
}

export { TodoApi }
