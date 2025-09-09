/**
 * 国际化配置文件
 *
 * 功能说明：
 * 1. 初始化react-i18next实例
 * 2. 配置语言检测和资源加载
 * 3. 支持中文和英文两种语言
 * 4. 集成浏览器语言检测功能
 */

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// 导入语言资源文件
import enBooks from './locales/en/books.json'
import enCommon from './locales/en/common.json'
import enFiles from './locales/en/files.json'
import enHome from './locales/en/home.json'
import enLayout from './locales/en/layout.json'
import enLogin from './locales/en/login.json'
import enTechnology from './locales/en/technology.json'
import zhBooks from './locales/zh/books.json'
import zhCommon from './locales/zh/common.json'
import zhFiles from './locales/zh/files.json'
import zhHome from './locales/zh/home.json'
import zhLayout from './locales/zh/layout.json'
import zhLogin from './locales/zh/login.json'
import zhTechnology from './locales/zh/technology.json'

// 语言资源配置
const resources = {
    zh: {
        common: zhCommon,
        layout: zhLayout,
        technology: zhTechnology,
        books: zhBooks,
        files: zhFiles,
        home: zhHome,
        login: zhLogin,
    },
    en: {
        common: enCommon,
        layout: enLayout,
        technology: enTechnology,
        books: enBooks,
        files: enFiles,
        home: enHome,
        login: enLogin,
    },
}

// 支持的语言列表
export const supportedLanguages = ['zh', 'en'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

// 语言显示名称映射
export const languageNames: Record<SupportedLanguage, string> = {
    zh: '中文',
    en: 'English',
}

// 语言检测配置
const detectionOptions = {
    // 检测顺序：localStorage -> navigator -> htmlTag -> path -> subdomain
    order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

    // 在localStorage中存储的键名
    lookupLocalStorage: 'i18nextLng',

    // 缓存用户语言选择
    caches: ['localStorage'],

    // 排除某些路径的语言检测
    excludeCacheFor: ['cimode'],

    // 检查所有支持的语言
    checkWhitelist: true,
}

// 初始化i18next
i18n
    // 使用语言检测插件
    .use(LanguageDetector)
    // 使用react-i18next
    .use(initReactI18next)
    // 初始化配置
    .init({
        // 语言资源
        resources,

        // 默认语言
        fallbackLng: 'zh',

        // 支持的语言白名单
        supportedLngs: supportedLanguages,

        // 语言检测配置
        detection: detectionOptions,

        // 默认命名空间
        defaultNS: 'common',

        // 命名空间配置
        ns: ['common', 'layout', 'technology', 'books', 'files', 'home', 'login'],

        // 调试模式（开发环境启用）
        debug: import.meta.env.DEV,

        // 插值配置
        interpolation: {
            // React已经默认转义，无需额外转义
            escapeValue: false,
        },

        // 资源加载配置
        load: 'languageOnly', // 只加载语言代码，不加载地区代码

        // 清理代码配置
        cleanCode: true,

        // 非存在键的处理
        saveMissing: import.meta.env.DEV, // 开发环境保存缺失的键

        // 更新缺失键的处理
        updateMissing: import.meta.env.DEV,

        // 键分隔符
        keySeparator: '.',

        // 命名空间分隔符
        nsSeparator: ':',

        // 返回对象配置
        returnObjects: false,

        // 返回空字符串配置
        returnEmptyString: false,

        // 返回null配置
        returnNull: false,

        // 后备处理
        parseMissingKeyHandler: (key: string) => {
            if (import.meta.env.DEV) {
                console.warn(`Missing translation key: ${key}`)
            }
            return key
        },
    })

export default i18n

/**
 * 获取当前语言
 */
export const getCurrentLanguage = (): SupportedLanguage => {
    const currentLng = i18n.language
    return supportedLanguages.includes(currentLng as SupportedLanguage)
        ? (currentLng as SupportedLanguage)
        : 'zh'
}

/**
 * 切换语言
 */
export const changeLanguage = async (lng: SupportedLanguage): Promise<void> => {
    await i18n.changeLanguage(lng)
}

/**
 * 获取翻译文本的便捷函数
 */
export const t = i18n.t.bind(i18n)
