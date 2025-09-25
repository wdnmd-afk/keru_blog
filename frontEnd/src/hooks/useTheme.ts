/**
 * 主题切换自定义 Hook
 * 
 * 功能说明：
 * 1. 自动检测系统主题偏好
 * 2. 支持手动切换主题
 * 3. 记住用户的主题选择
 * 4. 提供主题状态和切换方法
 */

import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'auto'
export type ResolvedTheme = 'light' | 'dark'

interface UseThemeReturn {
    theme: Theme
    resolvedTheme: ResolvedTheme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
    isDark: boolean
    isLight: boolean
}

const THEME_STORAGE_KEY = 'keru-blog-theme'

export const useTheme = (): UseThemeReturn => {
    // 从 localStorage 读取用户偏好，默认为 auto
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(THEME_STORAGE_KEY)
            return (stored as Theme) || 'auto'
        }
        return 'auto'
    })

    // 解析后的实际主题（light 或 dark）
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

    // 检测系统主题偏好
    const getSystemTheme = (): ResolvedTheme => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return 'light'
    }

    // 解析主题：auto 时使用系统主题，否则使用用户选择
    const resolveTheme = (currentTheme: Theme): ResolvedTheme => {
        if (currentTheme === 'auto') {
            return getSystemTheme()
        }
        return currentTheme
    }

    // 应用主题到 DOM
    const applyTheme = (resolvedTheme: ResolvedTheme) => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement

            // 移除之前的主题类
            root.classList.remove('theme-light', 'theme-dark')

            // 添加新的主题类
            root.classList.add(`theme-${resolvedTheme}`)

            // 设置 data 属性供 CSS 使用
            root.setAttribute('data-theme', resolvedTheme)

            // 更新 meta theme-color（移动端状态栏颜色）
            const metaThemeColor = document.querySelector('meta[name="theme-color"]')
            if (metaThemeColor) {
                metaThemeColor.setAttribute(
                    'content',
                    resolvedTheme === 'dark' ? '#000000' : '#F2F2F7'
                )
            }
        }
    }

    // 设置主题
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)

        // 保存到 localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem(THEME_STORAGE_KEY, newTheme)
        }

        // 解析并应用主题
        const resolved = resolveTheme(newTheme)
        setResolvedTheme(resolved)
        applyTheme(resolved)
    }

    // 切换主题（在 light 和 dark 之间切换）
    const toggleTheme = () => {
        const currentResolved = resolveTheme(theme)
        const newTheme: Theme = currentResolved === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    // 监听系统主题变化
    useEffect(() => {
        if (typeof window === 'undefined') return

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            // 只有在 auto 模式下才响应系统主题变化
            if (theme === 'auto') {
                const newResolvedTheme = e.matches ? 'dark' : 'light'
                setResolvedTheme(newResolvedTheme)
                applyTheme(newResolvedTheme)
            }
        }

        // 添加监听器
        mediaQuery.addEventListener('change', handleSystemThemeChange)

        // 初始化主题
        const initialResolved = resolveTheme(theme)
        setResolvedTheme(initialResolved)
        applyTheme(initialResolved)

        // 清理监听器
        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [theme])

    // 页面加载时应用主题
    useEffect(() => {
        const resolved = resolveTheme(theme)
        setResolvedTheme(resolved)
        applyTheme(resolved)
    }, [])

    return {
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        isDark: resolvedTheme === 'dark',
        isLight: resolvedTheme === 'light',
    }
}

// 主题上下文（可选，用于全局主题管理）
// 注意：如果需要使用 ThemeProvider，请将此文件重命名为 .tsx
/*
import React, { createContext, useContext } from 'react'

interface ThemeContextType extends UseThemeReturn {}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const themeValue = useTheme()

    return React.createElement(ThemeContext.Provider, { value: themeValue }, children)
}

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider')
    }
    return context
}
*/

// 主题工具函数
export const getThemeColors = (theme: ResolvedTheme) => {
    const colors = {
        light: {
            primary: '#007AFF',
            background: '#F2F2F7',
            surface: '#FFFFFF',
            text: '#000000',
            textSecondary: '#3C3C43',
            border: 'rgba(255, 255, 255, 0.2)',
            glass: 'rgba(255, 255, 255, 0.7)',
            shadow: 'rgba(0, 0, 0, 0.1)',
        },
        dark: {
            primary: '#0A84FF',
            background: '#000000',
            surface: '#1C1C1E',
            text: '#FFFFFF',
            textSecondary: '#EBEBF5',
            border: 'rgba(84, 84, 88, 0.3)',
            glass: 'rgba(28, 28, 30, 0.85)',
            shadow: 'rgba(0, 0, 0, 0.3)',
        },
    }

    return colors[theme]
}

export default useTheme
