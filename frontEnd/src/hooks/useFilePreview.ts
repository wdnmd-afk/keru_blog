/**
 * 文件预览Hook
 * 提供文件预览相关的状态管理和工具函数
 */

import { useState, useCallback, useMemo } from 'react'
import { 
  getFilePreviewType, 
  FilePreviewType, 
  isFilePreviewable,
  getFileTypeDisplayName,
  getFileTypeIcon,
  canPreviewDirectly,
  getPreviewSizeLimit
} from '@/utils/filePreview'

export interface FileInfo {
  /** 文件名 */
  fileName: string
  /** 文件URL */
  src: string
  /** 文件MIME类型 */
  mimeType?: string
  /** 文件大小（字节） */
  fileSize?: number
}

export interface UseFilePreviewOptions {
  /** 是否自动检测文件类型 */
  autoDetect?: boolean
  /** 默认预览类型 */
  defaultPreviewType?: FilePreviewType
  /** 是否启用预览缓存 */
  enableCache?: boolean
}

export interface FilePreviewState {
  /** 当前预览的文件 */
  currentFile: FileInfo | null
  /** 预览类型 */
  previewType: FilePreviewType
  /** 是否正在加载 */
  loading: boolean
  /** 错误信息 */
  error: string | null
  /** 是否可以预览 */
  canPreview: boolean
  /** 预览器是否可见 */
  visible: boolean
}

export const useFilePreview = (options: UseFilePreviewOptions = {}) => {
  const {
    autoDetect = true,
    defaultPreviewType = FilePreviewType.UNKNOWN,
    enableCache = true
  } = options

  // 预览状态
  const [state, setState] = useState<FilePreviewState>({
    currentFile: null,
    previewType: defaultPreviewType,
    loading: false,
    error: null,
    canPreview: false,
    visible: false
  })

  // 预览缓存
  const [previewCache] = useState<Map<string, FilePreviewType>>(new Map())

  /**
   * 获取文件预览类型（带缓存）
   */
  const getPreviewTypeWithCache = useCallback((fileName: string, mimeType?: string): FilePreviewType => {
    const cacheKey = `${fileName}-${mimeType || ''}`
    
    if (enableCache && previewCache.has(cacheKey)) {
      return previewCache.get(cacheKey)!
    }
    
    const previewType = getFilePreviewType(fileName, mimeType)
    
    if (enableCache) {
      previewCache.set(cacheKey, previewType)
    }
    
    return previewType
  }, [enableCache, previewCache])

  /**
   * 设置当前预览文件
   */
  const setCurrentFile = useCallback((fileInfo: FileInfo | null) => {
    if (!fileInfo) {
      setState(prev => ({
        ...prev,
        currentFile: null,
        previewType: defaultPreviewType,
        canPreview: false,
        visible: false,
        error: null
      }))
      return
    }

    const previewType = autoDetect 
      ? getPreviewTypeWithCache(fileInfo.fileName, fileInfo.mimeType)
      : defaultPreviewType

    const canPreview = isFilePreviewable(fileInfo.fileName, fileInfo.mimeType)
    
    // 检查文件大小限制
    let sizeExceeded = false
    if (fileInfo.fileSize) {
      const sizeLimit = getPreviewSizeLimit(previewType)
      sizeExceeded = sizeLimit > 0 && fileInfo.fileSize > sizeLimit
    }

    setState(prev => ({
      ...prev,
      currentFile: fileInfo,
      previewType,
      canPreview: canPreview && !sizeExceeded,
      error: sizeExceeded ? '文件过大，无法预览' : null
    }))
  }, [autoDetect, defaultPreviewType, getPreviewTypeWithCache])

  /**
   * 显示预览器
   */
  const showPreview = useCallback((fileInfo?: FileInfo) => {
    if (fileInfo) {
      setCurrentFile(fileInfo)
    }
    
    setState(prev => ({
      ...prev,
      visible: true
    }))
  }, [setCurrentFile])

  /**
   * 隐藏预览器
   */
  const hidePreview = useCallback(() => {
    setState(prev => ({
      ...prev,
      visible: false
    }))
  }, [])

  /**
   * 设置加载状态
   */
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      loading
    }))
  }, [])

  /**
   * 设置错误信息
   */
  const setError = useCallback((error: string | null) => {
    setState(prev => ({
      ...prev,
      error,
      loading: false
    }))
  }, [])

  /**
   * 清除错误
   */
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }))
  }, [])

  /**
   * 重置预览状态
   */
  const reset = useCallback(() => {
    setState({
      currentFile: null,
      previewType: defaultPreviewType,
      loading: false,
      error: null,
      canPreview: false,
      visible: false
    })
  }, [defaultPreviewType])

  /**
   * 获取文件类型信息
   */
  const getFileTypeInfo = useCallback((fileName: string, mimeType?: string) => {
    const previewType = getPreviewTypeWithCache(fileName, mimeType)
    
    return {
      previewType,
      displayName: getFileTypeDisplayName(previewType),
      icon: getFileTypeIcon(previewType),
      canPreview: isFilePreviewable(fileName, mimeType),
      canPreviewDirectly: canPreviewDirectly(previewType),
      sizeLimit: getPreviewSizeLimit(previewType)
    }
  }, [getPreviewTypeWithCache])

  /**
   * 批量获取文件类型信息
   */
  const getMultipleFileTypeInfo = useCallback((files: Array<{ fileName: string; mimeType?: string }>) => {
    return files.map(file => ({
      ...file,
      ...getFileTypeInfo(file.fileName, file.mimeType)
    }))
  }, [getFileTypeInfo])

  /**
   * 检查文件是否可以预览
   */
  const checkFilePreviewable = useCallback((fileName: string, mimeType?: string, fileSize?: number) => {
    const basicCheck = isFilePreviewable(fileName, mimeType)
    
    if (!basicCheck) {
      return { canPreview: false, reason: '不支持的文件类型' }
    }
    
    if (fileSize) {
      const previewType = getPreviewTypeWithCache(fileName, mimeType)
      const sizeLimit = getPreviewSizeLimit(previewType)
      
      if (sizeLimit > 0 && fileSize > sizeLimit) {
        return { 
          canPreview: false, 
          reason: `文件过大（限制${formatFileSize(sizeLimit)}）` 
        }
      }
    }
    
    return { canPreview: true, reason: null }
  }, [getPreviewTypeWithCache])

  /**
   * 格式化文件大小
   */
  const formatFileSize = useCallback((bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }, [])

  /**
   * 计算的属性
   */
  const computed = useMemo(() => ({
    // 当前文件的类型信息
    currentFileTypeInfo: state.currentFile 
      ? getFileTypeInfo(state.currentFile.fileName, state.currentFile.mimeType)
      : null,
    
    // 是否有文件正在预览
    hasFile: !!state.currentFile,
    
    // 是否可以直接预览
    canPreviewDirectly: state.currentFile 
      ? canPreviewDirectly(state.previewType)
      : false,
    
    // 预览状态文本
    statusText: state.loading 
      ? '加载中...' 
      : state.error 
        ? state.error 
        : state.canPreview 
          ? '可以预览' 
          : '无法预览'
  }), [state, getFileTypeInfo])

  return {
    // 状态
    ...state,
    
    // 计算属性
    ...computed,
    
    // 方法
    setCurrentFile,
    showPreview,
    hidePreview,
    setLoading,
    setError,
    clearError,
    reset,
    getFileTypeInfo,
    getMultipleFileTypeInfo,
    checkFilePreviewable,
    formatFileSize,
    
    // 工具函数
    utils: {
      getFilePreviewType: getPreviewTypeWithCache,
      isFilePreviewable,
      getFileTypeDisplayName,
      getFileTypeIcon,
      canPreviewDirectly,
      getPreviewSizeLimit
    }
  }
}

export default useFilePreview
