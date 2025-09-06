import { TodoApi } from '@/api'
import { Todo, TodoType } from '@/types/todo.d'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

interface GlobalState {
    user: {
        id: string
        name: string
        admin: boolean
        token: string
    }
    todos: Todo[]
}

interface GlobalGetter {
    getUser: () => any
    getTodos: () => Promise<void>
}

interface GlobalSetter {
    setUserInfo: (data: any) => void
    addTodo: (data: { content: string; type: TodoType }) => Promise<void>
    updateTodo: (
        id: string,
        data: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>
    ) => Promise<void>
    deleteTodo: (id: string) => Promise<void>
}

type GlobalStore = GlobalGetter & GlobalSetter & GlobalState

const useGlobalStore = create<GlobalStore>((set, get) => ({
    user: { id: '', name: '', admin: false, token: '' },
    todos: [],
    getUser() {
        return get().user
    },
    setUserInfo: (data) => {
        const user = { ...get().user, ...data }
        set(() => ({ user }))
    },
    getTodos: async () => {
        const todos = await TodoApi.getTodos()
        set({ todos: todos.data })
    },
    addTodo: async (data) => {
        const newTodo = await TodoApi.createTodo(data)
        set((state) => ({ todos: [newTodo.data, ...state.todos] }))
    },
    updateTodo: async (id, data) => {
        const updatedTodo = await TodoApi.updateTodo({ id, ...data })
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, ...updatedTodo.data } : todo
            ),
        }))
    },
    deleteTodo: async (id) => {
        await TodoApi.deleteTodo(id)
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }))
    },
}))

//将Action抛出
const useGlobalStoreAction = () => {
    return useGlobalStore(
        useShallow((state) => ({
            setUserInfo: state.setUserInfo,
            getTodos: state.getTodos,
            addTodo: state.addTodo,
            updateTodo: state.updateTodo,
            deleteTodo: state.deleteTodo,
        }))
    )
}

export { useGlobalStore, useGlobalStoreAction }
