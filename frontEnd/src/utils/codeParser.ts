/**
 * 代码解析工具
 * 用于从JSON文件中获取代码块数据
 */

export interface CodeBlock {
    title: string
    language: string
    code: string
}

export interface CodeData {
    [key: string]: CodeBlock
}

/**
 * 获取指定技术栈的代码数据
 * @param techStack 技术栈名称 (如: 'React', 'Vue', 'TypeScript')
 * @param fileName 文件名称 (如: 'customHooks', 'components')
 * @returns Promise<CodeData>
 */
export const getCodeData = async (techStack: string, fileName: string): Promise<CodeData> => {
    try {
        // 首先尝试从Technology目录下的codeJson加载
        const response = await import(`../views/Technology/codeJson/${techStack}/${fileName}.json`)
        return response.default || response
    } catch (error) {
        console.error('Error loading code data:', error)
        return {}
    }
}

/**
 * 获取特定代码块
 * @param techStack 技术栈名称
 * @param fileName 文件名称
 * @param blockKey 代码块键名
 * @returns Promise<CodeBlock | null>
 */
export const getCodeBlock = async (
    techStack: string,
    fileName: string,
    blockKey: string
): Promise<CodeBlock | null> => {
    try {
        const codeData = await getCodeData(techStack, fileName)
        return codeData[blockKey] || null
    } catch (error) {
        console.error('Error getting code block:', error)
        return null
    }
}

/**
 * 获取所有可用的代码块键名
 * @param techStack 技术栈名称
 * @param fileName 文件名称
 * @returns Promise<string[]>
 */
export const getCodeBlockKeys = async (techStack: string, fileName: string): Promise<string[]> => {
    try {
        const codeData = await getCodeData(techStack, fileName)
        return Object.keys(codeData)
    } catch (error) {
        console.error('Error getting code block keys:', error)
        return []
    }
}

/**
 * 复制代码到剪贴板
 * @param code 要复制的代码
 * @returns Promise<boolean> 是否复制成功
 */
export const copyCodeToClipboard = async (code: string): Promise<boolean> => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            // 使用现代 Clipboard API
            await navigator.clipboard.writeText(code)
            return true
        } else {
            // 降级方案：使用传统方法
            const textArea = document.createElement('textarea')
            textArea.value = code
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            textArea.style.top = '-999999px'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()

            const successful = document.execCommand('copy')
            document.body.removeChild(textArea)
            return successful
        }
    } catch (error) {
        console.error('Failed to copy code:', error)
        return false
    }
}

/**
 * 格式化代码（移除多余的空行和缩进）
 * @param code 原始代码
 * @returns 格式化后的代码
 */
export const formatCode = (code: string): string => {
    return code
        .split('\n')
        .map((line) => line.trimEnd()) // 移除行尾空格
        .join('\n')
        .replace(/\n{3,}/g, '\n\n') // 将多个连续空行替换为两个空行
}

/**
 * 检测代码语言
 * @param code 代码内容
 * @returns 检测到的语言
 */
export const detectLanguage = (code: string): string => {
    // 简单的语言检测逻辑
    if (code.includes('import React') || code.includes('useState') || code.includes('useEffect')) {
        return 'javascript'
    }
    if (code.includes('interface ') || code.includes('type ') || code.includes(': string')) {
        return 'typescript'
    }
    if (code.includes('<template>') || code.includes('export default {')) {
        return 'vue'
    }
    if (code.includes('FROM ') || code.includes('SELECT ')) {
        return 'sql'
    }
    if (code.includes('#!/bin/bash') || code.includes('echo ')) {
        return 'bash'
    }
    if (code.includes('{') && code.includes('}')) {
        return 'json'
    }

    return 'text'
}

/**
 * 代码统计信息
 * @param code 代码内容
 * @returns 统计信息
 */
export const getCodeStats = (code: string) => {
    const lines = code.split('\n')
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0)
    const commentLines = lines.filter((line) => {
        const trimmed = line.trim()
        return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')
    })

    return {
        totalLines: lines.length,
        codeLines: nonEmptyLines.length,
        commentLines: commentLines.length,
        characters: code.length,
        words: code.split(/\s+/).filter((word) => word.length > 0).length,
    }
}
