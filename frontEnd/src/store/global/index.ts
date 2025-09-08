import { TodoApi } from '@/api'
import { changeLanguage, getCurrentLanguage, type SupportedLanguage } from '@/i18n'
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
    // 用户偏好设置
    preferences: {
        language: SupportedLanguage
        theme: 'light' | 'dark' | 'auto'
    }
}

interface GlobalGetter {
    getUser: () => any
    getTodos: () => Promise<void>
    getPreferences: () => GlobalState['preferences']
}

interface GlobalSetter {
    setUserInfo: (data: any) => void
    addTodo: (data: { content: string; type: TodoType }) => Promise<void>
    updateTodo: (
        id: string,
        data: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>
    ) => Promise<void>
    deleteTodo: (id: string) => Promise<void>
    // 偏好设置相关方法
    setLanguage: (language: SupportedLanguage) => Promise<void>
    setTheme: (theme: 'light' | 'dark' | 'auto') => void
    updatePreferences: (preferences: Partial<GlobalState['preferences']>) => void
}

type GlobalStore = GlobalGetter & GlobalSetter & GlobalState

const useGlobalStore = create<GlobalStore>((set, get) => ({
    user: { id: '', name: '', admin: false, token: '' },
    todos: [],
    // 初始化用户偏好设置
    preferences: {
        language: getCurrentLanguage(),
        theme: 'auto',
    },
    getUser() {
        return get().user
    },
    getPreferences() {
        return get().preferences
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
    // 语言切换方法
    setLanguage: async (language) => {
        try {
            await changeLanguage(language)
            set((state) => ({
                preferences: {
                    ...state.preferences,
                    language,
                },
            }))
        } catch (error) {
            console.error('Failed to change language:', error)
        }
    },
    // 主题切换方法
    setTheme: (theme) => {
        set((state) => ({
            preferences: {
                ...state.preferences,
                theme,
            },
        }))
    },
    // 更新偏好设置方法
    updatePreferences: (newPreferences) => {
        set((state) => ({
            preferences: {
                ...state.preferences,
                ...newPreferences,
            },
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
            setLanguage: state.setLanguage,
            setTheme: state.setTheme,
            updatePreferences: state.updatePreferences,
        }))
    )
}

export { useGlobalStore, useGlobalStoreAction }
