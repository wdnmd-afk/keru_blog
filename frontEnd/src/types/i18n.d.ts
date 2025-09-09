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
    technology: {
        common: {
            loading: string
            load_error: string
            load_failed_with_error: string
            loading_code_data: string
            back_button: string
            tech_not_found: string
            tech_not_found_desc: string
            back_to_tech_stack: string
            tech_details: string
            proficiency: string
            tech_skills: string
            learning_journey: string
            projects: string
        }
        categories: {
            frontend: string
            backend: string
            database: string
            devops: string
            tools: string
            mobile: string
        }
        react: {
            title: string
            description: string
            topics: Record<string, string>
        }
        vue: {
            title: string
            description: string
            topics: Record<string, string>
        }
        typescript: {
            title: string
            description: string
            topics: Record<string, string>
        }
        nodejs: {
            title: string
            description: string
            topics: Record<string, string>
        }
        docker: {
            title: string
            description: string
            topics: Record<string, string>
        }
        git: {
            title: string
            description: string
            topics: Record<string, string>
        }
    }
    books: {
        header: {
            title: string
            subtitle: string
        }
        search: {
            placeholder: string
            no_results: string
            results_count: string
        }
        categories: Record<string, string>
        actions: {
            preview: string
            download: string
            favorite: string
            unfavorite: string
            share: string
            read_online: string
            buy: string
        }
        details: {
            author: string
            category: string
            rating: string
            pages: string
            publish_year: string
            publisher: string
            isbn: string
            language: string
            tags: string
            description: string
            table_of_contents: string
        }
        status: {
            available: string
            unavailable: string
            coming_soon: string
            out_of_stock: string
        }
        messages: Record<string, string>
    }
    files: {
        tabs: {
            upload: string
            list: string
            preview: string
        }
        upload: Record<string, string>
        list: Record<string, string>
        preview: Record<string, string>
        actions: Record<string, string>
        status: Record<string, string>
        messages: Record<string, string>
        errors: Record<string, string>
    }
    home: {
        header: {
            title: string
            subtitle: string
            stats: {
                articles: string
                visits: string
                likes: string
            }
        }
        content: {
            view_details: string
            cards: Record<string, { title: string; description: string }>
            tags: Record<string, string>
            author: string
            actions: {
                likes: string
                comments: string
                shares: string
            }
        }
        todo: {
            title: string
            add_button: string
            modal: Record<string, string>
            types: Record<string, string>
            actions: Record<string, string>
            empty_text: string
            completed: string
        }
        navigation: Record<string, string>
        messages: Record<string, string>
    }
    login: {
        brand: {
            title: string
            subtitle: string
        }
        tabs: {
            login: string
            register: string
        }
        form: {
            labels: Record<string, string>
            placeholders: Record<string, string>
            validation: Record<string, string>
        }
        buttons: Record<string, string>
        messages: Record<string, string>
        reset_password: Record<string, string>
        loading: Record<string, string>
        help: Record<string, string>
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
    | keyof TranslationResources['technology']
    | keyof TranslationResources['books']
    | keyof TranslationResources['files']
    | `common.${string}`
    | `layout.${string}`
    | `technology.${string}`
    | `books.${string}`
    | `files.${string}`

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
    I18nConfig,
    LanguageDetectionConfig,
    LanguageNames,
    LanguageSwitcherConfig,
    SupportedLanguage,
    TranslationKey,
    TranslationResources,
}
