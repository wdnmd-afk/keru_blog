/**
 * 学习模块类型定义文件
 *
 * 定义说明：
 * 1. 学习计划相关的数据结构
 * 2. 学习历程时间线的数据类型
 * 3. 学习进度和状态的枚举类型
 * 4. 技能标签和分类的类型定义
 *
 * 类型分类：
 * - 基础数据类型：学习计划、时间线项目
 * - 枚举类型：状态、优先级、分类
 * - 接口类型：组件属性、API响应
 */

/**
 * 学习计划状态枚举
 */
export type LearningPlanStatus = 'planned' | 'in_progress' | 'completed' | 'paused' | 'cancelled'

/**
 * 学习计划优先级枚举
 */
export type LearningPlanPriority = 'low' | 'medium' | 'high' | 'urgent'

/**
 * 技能分类枚举
 */
export type SkillCategory =
    | 'frontend'
    | 'backend'
    | 'database'
    | 'devops'
    | 'mobile'
    | 'ai_ml'
    | 'design'
    | 'testing'

/**
 * 学习计划数据结构
 */
export interface LearningPlan {
    /** 计划唯一标识符 */
    id: string

    /** 计划标题 */
    title: string

    /** 计划详细描述 */
    description: string

    /** 当前状态 */
    status: LearningPlanStatus

    /** 完成进度 (0-100) */
    progress: number

    /** 开始日期 */
    startDate: Date

    /** 目标完成日期 */
    targetDate: Date

    /** 实际完成日期（可选） */
    completedDate?: Date

    /** 相关技能标签 */
    skills: string[]

    /** 技能分类 */
    category?: SkillCategory

    /** 优先级 */
    priority?: LearningPlanPriority

    /** 预估学习时长（小时） */
    estimatedHours?: number

    /** 实际学习时长（小时） */
    actualHours?: number

    /** 学习资源链接 */
    resources?: LearningResource[]

    /** 学习笔记 */
    notes?: string

    /** 创建时间 */
    createdAt?: Date

    /** 更新时间 */
    updatedAt?: Date
}

/**
 * 学习资源数据结构
 */
export interface LearningResource {
    /** 资源唯一标识符 */
    id: string

    /** 资源标题 */
    title: string

    /** 资源链接 */
    url: string

    /** 资源类型 */
    type: 'book' | 'video' | 'article' | 'course' | 'documentation' | 'tutorial'

    /** 资源描述 */
    description?: string

    /** 是否已完成 */
    completed?: boolean

    /** 完成进度 (0-100) */
    progress?: number
}

/**
 * 学习历程时间线项目数据结构
 */
export interface LearningTimelineItem {
    /** 时间线项目唯一标识符 */
    id: string

    /** 时间标识（如：2024年、2024年3月） */
    time: string

    /** 阶段标题 */
    title: string

    /** 详细描述 */
    description: string

    /** 状态：进行中或已完成 */
    status: 'processing' | 'finish'

    /** 相关技能 */
    skills?: string[]

    /** 重要成就或里程碑 */
    achievements?: string[]

    /** 学习成果展示链接 */
    showcaseUrl?: string

    /** 开始日期 */
    startDate?: Date

    /** 结束日期 */
    endDate?: Date
}

/**
 * 学习统计数据结构
 */
export interface LearningStats {
    /** 总计划数 */
    totalPlans: number

    /** 已完成计划数 */
    completedPlans: number

    /** 进行中计划数 */
    inProgressPlans: number

    /** 计划中计划数 */
    plannedPlans: number

    /** 总学习时长（小时） */
    totalHours: number

    /** 本月学习时长（小时） */
    monthlyHours: number

    /** 掌握的技能数量 */
    skillsCount: number

    /** 完成率 */
    completionRate: number
}

/**
 * 学习计划创建/更新表单数据结构
 */
export interface LearningPlanFormData {
    title: string
    description: string
    status: LearningPlanStatus
    startDate: Date
    targetDate: Date
    skills: string[]
    category?: SkillCategory
    priority?: LearningPlanPriority
    estimatedHours?: number
    resources?: Omit<LearningResource, 'id'>[]
    notes?: string
}

/**
 * 学习计划筛选条件
 */
export interface LearningPlanFilter {
    /** 状态筛选 */
    status?: LearningPlanStatus[]

    /** 分类筛选 */
    category?: SkillCategory[]

    /** 优先级筛选 */
    priority?: LearningPlanPriority[]

    /** 技能筛选 */
    skills?: string[]

    /** 日期范围筛选 */
    dateRange?: {
        start: Date
        end: Date
    }

    /** 搜索关键词 */
    keyword?: string
}

/**
 * 组件属性类型定义
 */
export interface LearningTimelineProps {
    /** 时间线数据 */
    data?: LearningTimelineItem[]

    /** 是否显示加载状态 */
    loading?: boolean

    /** 自定义样式类名 */
    className?: string
}

export interface LearningPlanProps {
    /** 学习计划数据 */
    plans?: LearningPlan[]

    /** 是否显示加载状态 */
    loading?: boolean

    /** 筛选条件 */
    filter?: LearningPlanFilter

    /** 计划变更回调 */
    onPlanChange?: (plan: LearningPlan) => void

    /** 新建计划回调 */
    onCreatePlan?: (formData: LearningPlanFormData) => void

    /** 自定义样式类名 */
    className?: string
}
