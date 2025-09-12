import { TodoApi } from '@/api'
import { changeLanguage, getCurrentLanguage, type SupportedLanguage } from '@/i18n'
import {
    FavoriteItem,
    FeedbackData,
    FloatingActionsState,
    FloatingActionType,
} from '@/types/floatingActions'
import { Todo, TodoType } from '@/types/todo.d'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

import { FeedbackApiFront } from '@/api/feedback'

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
    // 浮动操作状态
    floatingActions: FloatingActionsState
}

interface GlobalGetter {
    getUser: () => any
    getTodos: () => Promise<void>
    getPreferences: () => GlobalState['preferences']
    getFloatingActions: () => GlobalState['floatingActions']
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
    // 浮动操作相关方法
    setShowBackToTop: (show: boolean) => void
    setActivePanel: (panel: FloatingActionType | null) => void
    addFavorite: (item: Omit<FavoriteItem, 'id' | 'createdAt' | 'updatedAt'>) => void
    removeFavorite: (id: string) => void
    updateFloatingSettings: (settings: Partial<FloatingActionsState['settings']>) => void
    markHelpTipShown: (tipId: string) => void
    submitFeedback: (feedback: FeedbackData) => Promise<void>
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
    // 初始化浮动操作状态
    floatingActions: {
        showBackToTop: false,
        activePanel: null,
        favorites: [],
        settings: {
            theme: 'auto',
            language: getCurrentLanguage(),
            enableAnimations: true,
            enableSounds: false,
        },
        helpTipsShown: {},
    },
    getUser() {
        return get().user
    },
    getPreferences() {
        return get().preferences
    },
    getFloatingActions() {
        return get().floatingActions
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

    // ==================== 浮动操作相关方法 ====================

    // 设置返回顶部按钮显示状态
    setShowBackToTop: (show) => {
        set((state) => ({
            floatingActions: {
                ...state.floatingActions,
                showBackToTop: show,
            },
        }))
    },

    // 设置激活面板
    setActivePanel: (panel) => {
        set((state) => ({
            floatingActions: {
                ...state.floatingActions,
                activePanel: panel,
            },
        }))
    },

    // 添加收藏
    addFavorite: (item) => {
        const newFavorite: FavoriteItem = {
            ...item,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        set((state) => ({
            floatingActions: {
                ...state.floatingActions,
                favorites: [newFavorite, ...state.floatingActions.favorites],
            },
        }))
    },

    // 移除收藏
    removeFavorite: (id) => {
        set((state) => ({
            floatingActions: {
                ...state.floatingActions,
                favorites: state.floatingActions.favorites.filter((item) => item.id !== id),
            },
        }))
    },

    // 更新浮动操作设置
    updateFloatingSettings: (settings) => {
        set((state) => ({
            floatingActions: {
                ...state.floatingActions,
                settings: {
                    ...state.floatingActions.settings,
                    ...settings,
                },
            },
        }))
    },

    // 标记帮助提示已显示
    markHelpTipShown: (tipId) => {
        set((state) => ({
            floatingActions: {
                ...state.floatingActions,
                helpTipsShown: {
                    ...state.floatingActions.helpTipsShown,
                    [tipId]: true,
                },
            },
        }))
    },

    // 提交反馈（调用后端公开接口 /api/public/feedback/submit）
    submitFeedback: async (feedback) => {
        try {
            // 将组件内的反馈数据映射到后端所需的字段
            // 后端需要：content, userName?, userEmail?, category?
            // 其中 category 只接受 'SUGGESTION' | 'BUG' | 'OTHER'
            const category =
                feedback.type === 'SUGGESTION'
                    ? 'SUGGESTION'
                    : feedback.type === 'BUG_REPORT'
                    ? 'BUG'
                    : 'OTHER'

            // 将标题并入内容，方便后端统一字段存储
            const content = feedback.title
                ? `【${feedback.title}】\n${feedback.content}`
                : feedback.content

            await FeedbackApiFront.submit({
                title: feedback.title, // 新增：单独存储标题，后端/Prisma 已支持
                content,
                userEmail: feedback.email,
                category,
            })
        } catch (error) {
            // 这里保留抛出，由上层（useFloatingActions）统一做 message 提示
            console.error('提交反馈失败:', error)
            throw error
        }
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
            // 浮动操作相关方法
            setShowBackToTop: state.setShowBackToTop,
            setActivePanel: state.setActivePanel,
            addFavorite: state.addFavorite,
            removeFavorite: state.removeFavorite,
            updateFloatingSettings: state.updateFloatingSettings,
            markHelpTipShown: state.markHelpTipShown,
            submitFeedback: state.submitFeedback,
        }))
    )
}

export { useGlobalStore, useGlobalStoreAction }
