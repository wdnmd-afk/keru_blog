/**
 * React.memo比较函数工具
 * 提供通用的props比较策略，优化组件重新渲染控制
 */

export type CompareMode = 'include' | 'exclude'

export interface MemoComparatorOptions {
    /** 比较模式 */
    mode: CompareMode
    /** 是否启用深度比较 */
    deepCompare?: boolean
    /** 自定义比较函数 */
    customCompare?: Record<string, (prev: any, next: any) => boolean>
}

/**
 * 深度比较两个值是否相等
 */
function deepEqual(a: any, b: any): boolean {
    if (a === b) return true

    if (a == null || b == null) return a === b

    if (typeof a !== typeof b) return false

    if (typeof a !== 'object') return a === b

    if (Array.isArray(a) !== Array.isArray(b)) return false

    if (Array.isArray(a)) {
        if (a.length !== b.length) return false
        return a.every((item, index) => deepEqual(item, b[index]))
    }

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    return keysA.every((key) => deepEqual(a[key], b[key]))
}

/**
 * 浅比较两个值是否相等
 */
function shallowEqual(a: any, b: any): boolean {
    return a === b
}

/**
 * 创建React.memo比较函数
 * @param keys 要比较或忽略的属性键列表
 * @param options 比较选项
 * @returns React.memo比较函数
 */
export function createMemoComparator<T extends Record<string, any>>(
    keys: (keyof T)[],
    options: MemoComparatorOptions
): (prevProps: T, nextProps: T) => boolean {
    const { mode, deepCompare = false, customCompare = {} } = options

    return (prevProps: T, nextProps: T): boolean => {
        // 获取要比较的属性列表
        const propsToCompare =
            mode === 'include'
                ? keys
                : (Object.keys(prevProps).filter(
                      (key) => !keys.includes(key as keyof T)
                  ) as (keyof T)[])

        // 选择比较函数
        const compareFunc = deepCompare ? deepEqual : shallowEqual

        // 逐个比较属性
        for (const key of propsToCompare) {
            const prevValue = prevProps[key]
            const nextValue = nextProps[key]

            // 使用自定义比较函数（如果存在）
            if (customCompare[key as string]) {
                if (!customCompare[key as string](prevValue, nextValue)) {
                    return false // props不同，需要重新渲染
                }
                continue
            }

            // 使用默认比较函数
            if (!compareFunc(prevValue, nextValue)) {
                return false // props不同，需要重新渲染
            }
        }

        return true // 所有比较的props都相同，不需要重新渲染
    }
}

/**
 * 便捷函数：创建include模式的比较器
 */
export function createIncludeComparator<T extends Record<string, any>>(
    keys: (keyof T)[],
    deepCompare = false,
    customCompare?: Record<string, (prev: any, next: any) => boolean>
): (prevProps: T, nextProps: T) => boolean {
    return createMemoComparator(keys, {
        mode: 'include',
        deepCompare,
        customCompare,
    })
}

/**
 * 便捷函数：创建exclude模式的比较器
 */
export function createExcludeComparator<T extends Record<string, any>>(
    keys: (keyof T)[],
    deepCompare = false,
    customCompare?: Record<string, (prev: any, next: any) => boolean>
): (prevProps: T, nextProps: T) => boolean {
    return createMemoComparator(keys, {
        mode: 'exclude',
        deepCompare,
        customCompare,
    })
}

/**
 * 预定义的常用比较器
 */
export const commonComparators = {
    /**
     * 忽略函数类型的props（如回调函数）
     */
    ignoreFunctions: <T extends Record<string, any>>(prevProps: T, nextProps: T): boolean => {
        const keys = Object.keys(prevProps).filter(
            (key) => typeof prevProps[key] !== 'function'
        ) as (keyof T)[]
        return createIncludeComparator(keys)(prevProps, nextProps)
    },

    /**
     * 只比较基础类型的props
     */
    primitiveOnly: <T extends Record<string, any>>(prevProps: T, nextProps: T): boolean => {
        const keys = Object.keys(prevProps).filter((key) => {
            const value = prevProps[key]
            return (
                typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean' ||
                value == null
            )
        }) as (keyof T)[]
        return createIncludeComparator(keys)(prevProps, nextProps)
    },
}

/**
 * 调试工具：记录props变化
 */
export function createDebugComparator<T extends Record<string, any>>(
    comparator: (prevProps: T, nextProps: T) => boolean,
    componentName?: string
): (prevProps: T, nextProps: T) => boolean {
    return (prevProps: T, nextProps: T): boolean => {
        const result = comparator(prevProps, nextProps)

        if (process.env.NODE_ENV === 'development' && !result) {
            const changedKeys = Object.keys(prevProps).filter(
                (key) => prevProps[key] !== nextProps[key]
            )

            console.log(`[${componentName || 'Component'}] Props changed:`, changedKeys)
            console.log('Previous props:', prevProps)
            console.log('Next props:', nextProps)
        }

        return result
    }
}

/**
 * 性能监控装饰器
 */
export function withPerformanceMonitoring<T extends Record<string, any>>(
    comparator: (prevProps: T, nextProps: T) => boolean,
    componentName?: string
): (prevProps: T, nextProps: T) => boolean {
    return (prevProps: T, nextProps: T): boolean => {
        const startTime = performance.now()
        const result = comparator(prevProps, nextProps)
        const endTime = performance.now()

        if (process.env.NODE_ENV === 'development') {
            const duration = endTime - startTime
            if (duration > 1) {
                // 只记录超过1ms的比较
                console.warn(
                    `[${componentName || 'Component'}] Slow memo comparison: ${duration.toFixed(2)}ms`
                )
            }
        }

        return result
    }
}
