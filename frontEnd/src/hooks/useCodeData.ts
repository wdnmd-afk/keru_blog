import { CodeBlock, CodeData, getCodeBlock, getCodeData } from '@/utils/codeParser'
import { useEffect, useState } from 'react'

/**
 * 获取代码数据的Hook
 * @param techStack 技术栈名称
 * @param fileName 文件名称
 * @returns 代码数据和加载状态
 */
export const useCodeData = (techStack: string, fileName: string) => {
    const [codeData, setCodeData] = useState<CodeData>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadCodeData = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getCodeData(techStack, fileName)
                setCodeData(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : '加载代码数据失败')
            } finally {
                setLoading(false)
            }
        }

        if (techStack && fileName) {
            loadCodeData()
        }
    }, [techStack, fileName])

    return { codeData, loading, error }
}

/**
 * 获取单个代码块的Hook
 * @param techStack 技术栈名称
 * @param fileName 文件名称
 * @param blockKey 代码块键名
 * @returns 代码块数据和加载状态
 */
export const useCodeBlock = (techStack: string, fileName: string, blockKey: string) => {
    const [codeBlock, setCodeBlock] = useState<CodeBlock | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadCodeBlock = async () => {
            try {
                setLoading(true)
                setError(null)
                const block = await getCodeBlock(techStack, fileName, blockKey)
                setCodeBlock(block)
            } catch (err) {
                setError(err instanceof Error ? err.message : '加载代码块失败')
            } finally {
                setLoading(false)
            }
        }

        if (techStack && fileName && blockKey) {
            loadCodeBlock()
        }
    }, [techStack, fileName, blockKey])

    return { codeBlock, loading, error }
}

/**
 * 代码块管理Hook
 * 提供代码块的增删改查功能
 */
export const useCodeBlockManager = (techStack: string, fileName: string) => {
    const { codeData, loading, error } = useCodeData(techStack, fileName)
    const [selectedBlock, setSelectedBlock] = useState<string | null>(null)

    // 获取所有代码块键名
    const getBlockKeys = () => Object.keys(codeData)

    // 获取指定代码块
    const getBlock = (key: string): CodeBlock | null => {
        return codeData[key] || null
    }

    // 选择代码块
    const selectBlock = (key: string) => {
        if (codeData[key]) {
            setSelectedBlock(key)
        }
    }

    // 获取当前选中的代码块
    const getCurrentBlock = (): CodeBlock | null => {
        return selectedBlock ? getBlock(selectedBlock) : null
    }

    // 获取下一个代码块
    const getNextBlock = (): string | null => {
        const keys = getBlockKeys()
        if (!selectedBlock || keys.length === 0) return null

        const currentIndex = keys.indexOf(selectedBlock)
        const nextIndex = (currentIndex + 1) % keys.length
        return keys[nextIndex]
    }

    // 获取上一个代码块
    const getPrevBlock = (): string | null => {
        const keys = getBlockKeys()
        if (!selectedBlock || keys.length === 0) return null

        const currentIndex = keys.indexOf(selectedBlock)
        const prevIndex = currentIndex === 0 ? keys.length - 1 : currentIndex - 1
        return keys[prevIndex]
    }

    // 导航到下一个代码块
    const goToNext = () => {
        const nextKey = getNextBlock()
        if (nextKey) {
            setSelectedBlock(nextKey)
        }
    }

    // 导航到上一个代码块
    const goToPrev = () => {
        const prevKey = getPrevBlock()
        if (prevKey) {
            setSelectedBlock(prevKey)
        }
    }

    return {
        codeData,
        loading,
        error,
        selectedBlock,
        getBlockKeys,
        getBlock,
        selectBlock,
        getCurrentBlock,
        getNextBlock,
        getPrevBlock,
        goToNext,
        goToPrev,
    }
}
