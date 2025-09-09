/**
 * JSON模块类型声明
 *
 * 功能说明：
 * 1. 为JSON文件导入提供TypeScript类型支持
 * 2. 特别支持国际化JSON文件的导入
 * 3. 提供类型安全的JSON模块访问
 */

// 通用JSON模块声明
declare module '*.json' {
    const value: any
    export default value
}

// 国际化JSON文件特定声明
declare module '*/locales/zh/*.json' {
    const value: Record<string, any>
    export default value
}

declare module '*/locales/en/*.json' {
    const value: Record<string, any>
    export default value
}

// 具体的国际化文件声明
declare module '*/locales/zh/common.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['common']
    export default value
}

declare module '*/locales/en/common.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['common']
    export default value
}

declare module '*/locales/zh/layout.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['layout']
    export default value
}

declare module '*/locales/en/layout.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['layout']
    export default value
}

declare module '*/locales/zh/technology.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['technology']
    export default value
}

declare module '*/locales/en/technology.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['technology']
    export default value
}

declare module '*/locales/zh/books.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['books']
    export default value
}

declare module '*/locales/en/books.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['books']
    export default value
}

declare module '*/locales/zh/files.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['files']
    export default value
}

declare module '*/locales/en/files.json' {
    import type { TranslationResources } from './i18n'
    const value: TranslationResources['files']
    export default value
}

// 配置文件JSON声明
declare module '*/config/*.json' {
    const value: Record<string, any>
    export default value
}

// 数据文件JSON声明
declare module '*/data/*.json' {
    const value: Record<string, any>
    export default value
}

// package.json特殊声明
declare module '*/package.json' {
    interface PackageJson {
        name: string
        version: string
        description?: string
        main?: string
        scripts?: Record<string, string>
        dependencies?: Record<string, string>
        devDependencies?: Record<string, string>
        [key: string]: any
    }
    const value: PackageJson
    export default value
}

// tsconfig.json特殊声明
declare module '*/tsconfig.json' {
    interface TsConfig {
        compilerOptions?: Record<string, any>
        include?: string[]
        exclude?: string[]
        extends?: string
        references?: Array<{ path: string }>
        [key: string]: any
    }
    const value: TsConfig
    export default value
}
