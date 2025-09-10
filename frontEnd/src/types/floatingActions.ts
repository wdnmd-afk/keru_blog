/**
 * 浮动操作组件相关类型定义
 * 
 * 功能说明：
 * 1. 定义浮动操作的基础类型和接口
 * 2. 支持分享、收藏、设置、反馈、帮助等功能
 * 3. 提供完整的类型安全保障
 */

// ==================== 基础枚举类型 ====================

/**
 * 浮动操作类型枚举
 */
export enum FloatingActionType {
    /** 返回顶部 */
    BACK_TO_TOP = 'BACK_TO_TOP',
    /** 分享 */
    SHARE = 'SHARE',
    /** 收藏 */
    FAVORITE = 'FAVORITE',
    /** 设置 */
    SETTINGS = 'SETTINGS',
    /** 反馈 */
    FEEDBACK = 'FEEDBACK',
    /** 帮助 */
    HELP = 'HELP',
}

/**
 * 分享类型枚举
 */
export enum ShareType {
    /** 原生分享 */
    NATIVE = 'NATIVE',
    /** 复制链接 */
    COPY_LINK = 'COPY_LINK',
    /** 微信 */
    WECHAT = 'WECHAT',
    /** 微博 */
    WEIBO = 'WEIBO',
    /** QQ */
    QQ = 'QQ',
    /** Twitter */
    TWITTER = 'TWITTER',
    /** Facebook */
    FACEBOOK = 'FACEBOOK',
}

/**
 * 反馈类型枚举
 */
export enum FeedbackType {
    /** 功能建议 */
    SUGGESTION = 'SUGGESTION',
    /** Bug报告 */
    BUG_REPORT = 'BUG_REPORT',
    /** 内容反馈 */
    CONTENT_FEEDBACK = 'CONTENT_FEEDBACK',
    /** 其他 */
    OTHER = 'OTHER',
}

/**
 * 设置面板类型枚举
 */
export enum SettingsPanelType {
    /** 主题设置 */
    THEME = 'THEME',
    /** 语言设置 */
    LANGUAGE = 'LANGUAGE',
    /** 显示设置 */
    DISPLAY = 'DISPLAY',
    /** 通知设置 */
    NOTIFICATION = 'NOTIFICATION',
}

// ==================== 基础接口定义 ====================

/**
 * 浮动操作按钮配置接口
 */
export interface FloatingActionConfig {
    /** 操作类型 */
    type: FloatingActionType
    /** 图标名称 */
    icon: string
    /** 标题 */
    title: string
    /** 是否显示 */
    visible: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 是否有红点提示 */
    badge?: boolean
    /** 点击回调 */
    onClick?: () => void
    /** 自定义样式类名 */
    className?: string
}

/**
 * 分享选项接口
 */
export interface ShareOption {
    /** 分享类型 */
    type: ShareType
    /** 显示名称 */
    label: string
    /** 图标 */
    icon: string
    /** 分享URL */
    url?: string
    /** 分享标题 */
    title?: string
    /** 分享描述 */
    description?: string
    /** 分享图片 */
    image?: string
    /** 点击回调 */
    onClick: () => void
}

/**
 * 收藏项接口
 */
export interface FavoriteItem {
    /** 唯一标识 */
    id: string
    /** 标题 */
    title: string
    /** URL */
    url: string
    /** 描述 */
    description?: string
    /** 缩略图 */
    thumbnail?: string
    /** 标签 */
    tags: string[]
    /** 创建时间 */
    createdAt: Date
    /** 更新时间 */
    updatedAt: Date
}

/**
 * 反馈数据接口
 */
export interface FeedbackData {
    /** 反馈类型 */
    type: FeedbackType
    /** 反馈标题 */
    title: string
    /** 反馈内容 */
    content: string
    /** 联系邮箱 */
    email?: string
    /** 当前页面URL */
    pageUrl: string
    /** 浏览器信息 */
    userAgent: string
    /** 屏幕分辨率 */
    screenResolution: string
    /** 时间戳 */
    timestamp: Date
}

/**
 * 帮助提示项接口
 */
export interface HelpTipItem {
    /** 唯一标识 */
    id: string
    /** 标题 */
    title: string
    /** 内容 */
    content: string
    /** 快捷键 */
    shortcut?: string
    /** 图标 */
    icon?: string
    /** 分类 */
    category: string
}

// ==================== 状态管理接口 ====================

/**
 * 浮动操作状态接口
 */
export interface FloatingActionsState {
    /** 是否显示返回顶部按钮 */
    showBackToTop: boolean
    /** 当前激活的面板 */
    activePanel: FloatingActionType | null
    /** 收藏列表 */
    favorites: FavoriteItem[]
    /** 用户设置 */
    settings: {
        /** 主题 */
        theme: 'light' | 'dark' | 'auto'
        /** 语言 */
        language: string
        /** 是否显示动画 */
        enableAnimations: boolean
        /** 是否启用声音 */
        enableSounds: boolean
    }
    /** 帮助提示是否已显示 */
    helpTipsShown: Record<string, boolean>
}

/**
 * 浮动操作方法接口
 */
export interface FloatingActionsActions {
    /** 设置返回顶部按钮显示状态 */
    setShowBackToTop: (show: boolean) => void
    /** 设置激活面板 */
    setActivePanel: (panel: FloatingActionType | null) => void
    /** 添加收藏 */
    addFavorite: (item: Omit<FavoriteItem, 'id' | 'createdAt' | 'updatedAt'>) => void
    /** 移除收藏 */
    removeFavorite: (id: string) => void
    /** 更新设置 */
    updateSettings: (settings: Partial<FloatingActionsState['settings']>) => void
    /** 标记帮助提示已显示 */
    markHelpTipShown: (tipId: string) => void
    /** 提交反馈 */
    submitFeedback: (feedback: FeedbackData) => Promise<void>
}

// ==================== 组件Props接口 ====================

/**
 * 分享面板Props
 */
export interface SharePanelProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 分享选项 */
    shareOptions?: ShareOption[]
    /** 自定义分享数据 */
    shareData?: {
        title?: string
        url?: string
        description?: string
        image?: string
    }
}

/**
 * 收藏管理器Props
 */
export interface FavoriteManagerProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 收藏列表 */
    favorites: FavoriteItem[]
    /** 添加收藏回调 */
    onAddFavorite: (item: Omit<FavoriteItem, 'id' | 'createdAt' | 'updatedAt'>) => void
    /** 移除收藏回调 */
    onRemoveFavorite: (id: string) => void
}

/**
 * 设置面板Props
 */
export interface SettingsPanelProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 当前设置 */
    settings: FloatingActionsState['settings']
    /** 设置更新回调 */
    onSettingsChange: (settings: Partial<FloatingActionsState['settings']>) => void
}

/**
 * 反馈表单Props
 */
export interface FeedbackFormProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 提交回调 */
    onSubmit: (feedback: FeedbackData) => Promise<void>
}

/**
 * 帮助提示Props
 */
export interface HelpTooltipProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 帮助提示列表 */
    helpTips: HelpTipItem[]
}

// ==================== 工具类型 ====================

/**
 * 浮动操作Store类型
 */
export type FloatingActionsStore = FloatingActionsState & FloatingActionsActions

/**
 * 分享回调函数类型
 */
export type ShareCallback = (type: ShareType, data?: any) => void

/**
 * 反馈提交回调函数类型
 */
export type FeedbackSubmitCallback = (feedback: FeedbackData) => Promise<boolean>
