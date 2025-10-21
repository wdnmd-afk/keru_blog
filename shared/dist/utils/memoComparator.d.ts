/**
 * React.memo比较函数工具
 * 提供通用的props比较策略，优化组件重新渲染控制
 */
export type CompareMode = 'include' | 'exclude';
export interface MemoComparatorOptions {
    /** 比较模式 */
    mode: CompareMode;
    /** 是否启用深度比较 */
    deepCompare?: boolean;
    /** 自定义比较函数 */
    customCompare?: Record<string, (prev: any, next: any) => boolean>;
}
/**
 * 创建React.memo比较函数
 * @param keys 要比较或忽略的属性键列表
 * @param options 比较选项
 * @returns React.memo比较函数
 */
export declare function createMemoComparator<T extends Record<string, any>>(keys: (keyof T)[], options: MemoComparatorOptions): (prevProps: T, nextProps: T) => boolean;
/**
 * 便捷函数：创建include模式的比较器
 */
export declare function createIncludeComparator<T extends Record<string, any>>(keys: (keyof T)[], deepCompare?: boolean, customCompare?: Record<string, (prev: any, next: any) => boolean>): (prevProps: T, nextProps: T) => boolean;
/**
 * 便捷函数：创建exclude模式的比较器
 */
export declare function createExcludeComparator<T extends Record<string, any>>(keys: (keyof T)[], deepCompare?: boolean, customCompare?: Record<string, (prev: any, next: any) => boolean>): (prevProps: T, nextProps: T) => boolean;
/**
 * 预定义的常用比较器
 */
export declare const commonComparators: {
    /**
     * 忽略函数类型的props（如回调函数）
     */
    ignoreFunctions: <T extends Record<string, any>>(prevProps: T, nextProps: T) => boolean;
    /**
     * 只比较基础类型的props
     */
    primitiveOnly: <T extends Record<string, any>>(prevProps: T, nextProps: T) => boolean;
};
/**
 * 调试工具：记录props变化
 */
export declare function createDebugComparator<T extends Record<string, any>>(comparator: (prevProps: T, nextProps: T) => boolean, componentName?: string): (prevProps: T, nextProps: T) => boolean;
/**
 * 性能监控装饰器
 */
export declare function withPerformanceMonitoring<T extends Record<string, any>>(comparator: (prevProps: T, nextProps: T) => boolean, componentName?: string): (prevProps: T, nextProps: T) => boolean;
//# sourceMappingURL=memoComparator.d.ts.map