/**
 * 国际化相关类型定义
 * 
 * 功能说明：
 * 1. 定义支持的语言类型
 * 2. 定义翻译资源的结构类型
 * 3. 提供类型安全的翻译键
 * 4. 扩展react-i18next的类型定义
 */

import 'react-i18next'

// 支持的语言类型
export type SupportedLanguage = 'zh' | 'en'

// 语言显示名称映射类型
export type LanguageNames = Record<SupportedLanguage, string>

// 翻译资源结构类型
export interface TranslationResources {
    common: {
        buttons: {
            confirm: string
            cancel: string
            save: string
            delete: string
            edit: string
            add: string
            search: string
            reset: string
            submit: string
            back: string
            next: string
            previous: string
            close: string
            copy: string
            download: string
            upload: string
            refresh: string
            loading: string
            more: string
        }
        messages: {
            success: string
            error: string
            warning: string
            info: string
            confirm_delete: string
            no_data: string
            loading: string
            network_error: string
            permission_denied: string
            operation_success: string
            operation_failed: string
            please_wait: string
            copied_to_clipboard: string
            copy_failed: string
        }
        validation: {
            required: string
            email_invalid: string
            password_too_short: string
            passwords_not_match: string
            phone_invalid: string
            url_invalid: string
        }
        time: {
            just_now: string
            minutes_ago: string
            hours_ago: string
            days_ago: string
            weeks_ago: string
            months_ago: string
            years_ago: string
            today: string
            yesterday: string
            tomorrow: string
        }
        file: {
            upload: string
            download: string
            delete: string
            preview: string
            size: string
            type: string
            name: string
            upload_success: string
            upload_failed: string
            file_too_large: string
            unsupported_format: string
        }
        pagination: {
            total: string
            page: string
            per_page: string
            go_to: string
            items_per_page: string
        }
    }
    layout: {
        header: {
            logo: string
            navigation: {
                home: string
                books: string
                files: string
                technology: string
            }
            user_menu: {
                profile: string
                settings: string
                logout: string
            }
            language_switcher: {
                title: string
                chinese: string
                english: string
            }
            external_links: {
                github: string
                github_tooltip: string
            }
        }
        footer: {
            copyright: string
            powered_by: string
            version: string
        }
        sidebar: {
            menu: string
            collapse: string
            expand: string
        }
        breadcrumb: {
            home: string
            current: string
        }
        theme: {
            light: string
            dark: string
            auto: string
        }
        search: {
            placeholder: string
            no_results: string
            results_count: string
        }
    }
}

// 扩展react-i18next的类型定义
declare module 'react-i18next' {
    interface CustomTypeOptions {
        // 定义默认命名空间
        defaultNS: 'common'
        // 定义资源类型
        resources: TranslationResources
        // 定义返回对象类型
        returnObjects: false
        // 定义返回null类型
        returnNull: false
        // 定义键分隔符
        keySeparator: '.'
        // 定义命名空间分隔符
        nsSeparator: ':'
        // 定义插值前缀
        interpolationPrefix: '{{'
        // 定义插值后缀
        interpolationSuffix: '}}'
    }
}

// 翻译键类型（用于类型安全的翻译键访问）
export type TranslationKey = 
    | keyof TranslationResources['common']
    | keyof TranslationResources['layout']
    | `common.${string}`
    | `layout.${string}`

// 语言切换器配置类型
export interface LanguageSwitcherConfig {
    showLabel?: boolean
    size?: 'small' | 'medium' | 'large'
    placement?: 'top' | 'bottom' | 'left' | 'right'
}

// 国际化配置类型
export interface I18nConfig {
    defaultLanguage: SupportedLanguage
    fallbackLanguage: SupportedLanguage
    supportedLanguages: SupportedLanguage[]
    debug?: boolean
    saveMissing?: boolean
    updateMissing?: boolean
}

// 语言检测配置类型
export interface LanguageDetectionConfig {
    order: string[]
    lookupLocalStorage: string
    caches: string[]
    excludeCacheFor: string[]
    checkWhitelist: boolean
}

// 导出所有类型
export type {
    SupportedLanguage,
    LanguageNames,
    TranslationResources,
    TranslationKey,
    LanguageSwitcherConfig,
    I18nConfig,
    LanguageDetectionConfig,
}
