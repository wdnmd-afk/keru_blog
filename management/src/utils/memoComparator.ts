/**
 * React.memo比较函数工具
 * 提供通用的props比较策略，优化组件重新渲染控制
 * 从frontend项目复制以支持KTable组件
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
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false
        }
        return true
    }
    
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    
    if (keysA.length !== keysB.length) return false
    
    for (const key of keysA) {
        if (!keysB.includes(key)) return false
        if (!deepEqual(a[key], b[key])) return false
    }
    
    return true
}

/**
 * 浅比较两个值是否相等
 */
function shallowEqual(a: any, b: any): boolean {
    if (a === b) return true
    
    if (a == null || b == null) return a === b
    
    if (typeof a !== 'object' || typeof b !== 'object') return a === b
    
    if (Array.isArray(a) !== Array.isArray(b)) return false
    
    if (Array.isArray(a)) {
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false
        }
        return true
    }
    
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    
    if (keysA.length !== keysB.length) return false
    
    for (const key of keysA) {
        if (!keysB.includes(key) || a[key] !== b[key]) return false
    }
    
    return true
}

/**
 * 创建包含指定字段的比较函数
 * 只比较指定的字段，其他字段变化不会触发重新渲染
 */
export function createIncludeComparator(
    fields: string[],
    options: Omit<MemoComparatorOptions, 'mode'> = {}
) {
    const { deepCompare = false, customCompare = {} } = options
    
    return (prevProps: any, nextProps: any): boolean => {
        for (const field of fields) {
            const prevValue = prevProps[field]
            const nextValue = nextProps[field]
            
            // 使用自定义比较函数
            if (customCompare[field]) {
                if (!customCompare[field](prevValue, nextValue)) {
                    return false
                }
                continue
            }
            
            // 使用深度或浅度比较
            const isEqual = deepCompare 
                ? deepEqual(prevValue, nextValue)
                : shallowEqual(prevValue, nextValue)
                
            if (!isEqual) {
                return false
            }
        }
        
        return true
    }
}

/**
 * 创建排除指定字段的比较函数
 * 排除指定字段，其他字段变化会触发重新渲染
 */
export function createExcludeComparator(
    fields: string[],
    options: Omit<MemoComparatorOptions, 'mode'> = {}
) {
    const { deepCompare = false, customCompare = {} } = options
    
    return (prevProps: any, nextProps: any): boolean => {
        const prevKeys = Object.keys(prevProps)
        const nextKeys = Object.keys(nextProps)
        
        // 检查键的数量是否相同
        const relevantPrevKeys = prevKeys.filter(key => !fields.includes(key))
        const relevantNextKeys = nextKeys.filter(key => !fields.includes(key))
        
        if (relevantPrevKeys.length !== relevantNextKeys.length) {
            return false
        }
        
        // 比较非排除字段
        for (const key of relevantPrevKeys) {
            if (!relevantNextKeys.includes(key)) {
                return false
            }
            
            const prevValue = prevProps[key]
            const nextValue = nextProps[key]
            
            // 使用自定义比较函数
            if (customCompare[key]) {
                if (!customCompare[key](prevValue, nextValue)) {
                    return false
                }
                continue
            }
            
            // 使用深度或浅度比较
            const isEqual = deepCompare 
                ? deepEqual(prevValue, nextValue)
                : shallowEqual(prevValue, nextValue)
                
            if (!isEqual) {
                return false
            }
        }
        
        return true
    }
}

/**
 * 通用的memo比较器创建函数
 */
export function createMemoComparator(
    fields: string[],
    options: MemoComparatorOptions
) {
    const { mode } = options
    
    if (mode === 'include') {
        return createIncludeComparator(fields, options)
    } else {
        return createExcludeComparator(fields, options)
    }
}

/**
 * 预设的常用比较器
 */
export const commonComparators = {
    /** 只比较数据相关字段，忽略UI状态 */
    dataOnly: createExcludeComparator(['loading', 'visible', 'open', 'active']),
    
    /** 只比较UI状态字段 */
    uiOnly: createIncludeComparator(['loading', 'visible', 'open', 'active']),
    
    /** 深度比较所有字段 */
    deepAll: (prevProps: any, nextProps: any) => deepEqual(prevProps, nextProps),
    
    /** 浅比较所有字段 */
    shallowAll: (prevProps: any, nextProps: any) => shallowEqual(prevProps, nextProps)
}
