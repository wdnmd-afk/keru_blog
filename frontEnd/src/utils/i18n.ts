/**
 * 国际化工具函数
 * 
 * 功能说明：
 * 1. 提供便捷的翻译方法
 * 2. 语言检测和切换工具
 * 3. 格式化和插值工具
 * 4. 本地化相关的实用函数
 */

import i18n from '@/i18n'
import type { SupportedLanguage } from '@/types/i18n'

/**
 * 获取当前语言
 */
export const getCurrentLanguage = (): SupportedLanguage => {
    const currentLng = i18n.language
    return ['zh', 'en'].includes(currentLng) ? (currentLng as SupportedLanguage) : 'zh'
}

/**
 * 检查是否为支持的语言
 */
export const isSupportedLanguage = (language: string): language is SupportedLanguage => {
    return ['zh', 'en'].includes(language)
}

/**
 * 切换语言
 */
export const switchLanguage = async (language: SupportedLanguage): Promise<void> => {
    try {
        await i18n.changeLanguage(language)
        // 可以在这里添加额外的语言切换逻辑，比如更新页面标题等
        updatePageLanguage(language)
    } catch (error) {
        console.error('Language switch failed:', error)
        throw error
    }
}

/**
 * 更新页面语言相关属性
 */
export const updatePageLanguage = (language: SupportedLanguage): void => {
    // 更新HTML lang属性
    document.documentElement.lang = language
    
    // 更新页面方向（如果需要支持RTL语言）
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    
    // 可以在这里添加更多页面级别的语言更新逻辑
}

/**
 * 获取浏览器首选语言
 */
export const getBrowserLanguage = (): SupportedLanguage => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'zh'
    
    // 提取语言代码（忽略地区代码）
    const langCode = browserLang.split('-')[0].toLowerCase()
    
    return isSupportedLanguage(langCode) ? langCode : 'zh'
}

/**
 * 格式化带插值的翻译文本
 */
export const formatTranslation = (
    key: string,
    options?: Record<string, string | number>,
    namespace?: string
): string => {
    try {
        const fullKey = namespace ? `${namespace}:${key}` : key
        return i18n.t(fullKey, options)
    } catch (error) {
        console.warn(`Translation failed for key: ${key}`, error)
        return key
    }
}

/**
 * 获取复数形式的翻译
 */
export const getPluralTranslation = (
    key: string,
    count: number,
    options?: Record<string, string | number>
): string => {
    try {
        return i18n.t(key, { count, ...options })
    } catch (error) {
        console.warn(`Plural translation failed for key: ${key}`, error)
        return key
    }
}

/**
 * 检查翻译键是否存在
 */
export const hasTranslation = (key: string, namespace?: string): boolean => {
    try {
        const fullKey = namespace ? `${namespace}:${key}` : key
        return i18n.exists(fullKey)
    } catch (error) {
        return false
    }
}

/**
 * 获取所有支持的语言列表
 */
export const getSupportedLanguages = (): SupportedLanguage[] => {
    return ['zh', 'en']
}

/**
 * 获取语言的显示名称
 */
export const getLanguageDisplayName = (language: SupportedLanguage): string => {
    const displayNames: Record<SupportedLanguage, string> = {
        zh: '中文',
        en: 'English',
    }
    return displayNames[language] || language
}

/**
 * 获取语言的本地化显示名称
 */
export const getLanguageNativeName = (language: SupportedLanguage): string => {
    const nativeNames: Record<SupportedLanguage, string> = {
        zh: '中文',
        en: 'English',
    }
    return nativeNames[language] || language
}

/**
 * 格式化日期时间（根据当前语言）
 */
export const formatDateTime = (
    date: Date | string | number,
    options?: Intl.DateTimeFormatOptions
): string => {
    const currentLang = getCurrentLanguage()
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US'
    
    try {
        const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
        return new Intl.DateTimeFormat(locale, options).format(dateObj)
    } catch (error) {
        console.warn('Date formatting failed:', error)
        return String(date)
    }
}

/**
 * 格式化数字（根据当前语言）
 */
export const formatNumber = (
    number: number,
    options?: Intl.NumberFormatOptions
): string => {
    const currentLang = getCurrentLanguage()
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US'
    
    try {
        return new Intl.NumberFormat(locale, options).format(number)
    } catch (error) {
        console.warn('Number formatting failed:', error)
        return String(number)
    }
}

/**
 * 格式化货币（根据当前语言）
 */
export const formatCurrency = (
    amount: number,
    currency: string = 'CNY'
): string => {
    const currentLang = getCurrentLanguage()
    const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US'
    
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount)
    } catch (error) {
        console.warn('Currency formatting failed:', error)
        return `${currency} ${amount}`
    }
}

/**
 * 获取相对时间描述（如：2小时前）
 */
export const getRelativeTime = (date: Date | string | number): string => {
    const currentLang = getCurrentLanguage()
    const now = new Date()
    const targetDate = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)
    
    if (diffInSeconds < 60) {
        return formatTranslation('time.just_now', {}, 'common')
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return formatTranslation('time.minutes_ago', { count: minutes }, 'common')
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return formatTranslation('time.hours_ago', { count: hours }, 'common')
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400)
        return formatTranslation('time.days_ago', { count: days }, 'common')
    } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000)
        return formatTranslation('time.months_ago', { count: months }, 'common')
    } else {
        const years = Math.floor(diffInSeconds / 31536000)
        return formatTranslation('time.years_ago', { count: years }, 'common')
    }
}

/**
 * 验证翻译资源的完整性
 */
export const validateTranslationResources = (): boolean => {
    const supportedLanguages = getSupportedLanguages()
    const requiredNamespaces = ['common', 'layout']
    
    try {
        for (const lang of supportedLanguages) {
            for (const ns of requiredNamespaces) {
                const hasResource = i18n.hasResourceBundle(lang, ns)
                if (!hasResource) {
                    console.warn(`Missing translation resource: ${lang}/${ns}`)
                    return false
                }
            }
        }
        return true
    } catch (error) {
        console.error('Translation resource validation failed:', error)
        return false
    }
}
