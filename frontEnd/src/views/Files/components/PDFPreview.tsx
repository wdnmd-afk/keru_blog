/**
 * PDF预览器组件
 * 使用react-pdf库实现专业的PDF渲染和控制
 */

import {
    CompressOutlined,
    DownloadOutlined,
    ExpandOutlined,
    FullscreenOutlined,
    LeftOutlined,
    OneToOneOutlined,
    ReloadOutlined,
    RightOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons'
import { Alert, Button, InputNumber, Space, Spin, Tooltip, message } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createIncludeComparator } from '@/utils/memoComparator'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// 设置PDF.js worker - 使用正确的.mjs文件路径
const setupPDFWorker = () => {
    const currentVersion = pdfjs.version
    console.log('检测到的PDF.js版本:', currentVersion)

    // 使用正确的.mjs文件路径（pnpm安装的pdfjs-dist包使用.mjs格式）
    pdfjs.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs'

    console.log(`PDF.js worker配置成功 (v${currentVersion})`)
    console.log('Worker源:', pdfjs.GlobalWorkerOptions.workerSrc)
}

// 初始化worker配置
setupPDFWorker()

export interface PDFPreviewProps {
    /** PDF文件URL */
    src: string
    /** 文件名称 */
    fileName?: string
    /** 文件大小（字节） */
    fileSize?: number
    /** 是否显示工具栏 */
    showToolbar?: boolean
    /** 初始缩放比例 */
    initialScale?: number
    /** 最大高度 */
    maxHeight?: number | string
    /** 是否启用键盘快捷键 */
    enableKeyboard?: boolean
    /** 加载失败回调 */
    onError?: (error: string) => void
    /** 加载成功回调 */
    onLoad?: (numPages: number) => void
    /** 页面变化回调 */
    onPageChange?: (pageNumber: number) => void
}

/** 缩放模式枚举 */
enum ZoomMode {
    ACTUAL_SIZE = 'actual',
    FIT_WIDTH = 'width',
    FIT_HEIGHT = 'height',
    CUSTOM = 'custom',
}

const PDFPreview: React.FC<PDFPreviewProps> = ({
    src,
    fileName,
    fileSize,
    showToolbar = true,
    initialScale = 1,
    maxHeight = '70vh',
    enableKeyboard = true,
    onError,
    onLoad,
    onPageChange,
}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [scale, setScale] = useState(initialScale)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [zoomMode, setZoomMode] = useState<ZoomMode>(ZoomMode.CUSTOM)
    const [pageWidth, setPageWidth] = useState<number>(0)
    const [pageHeight, setPageHeight] = useState<number>(0)
    const [containerWidth, setContainerWidth] = useState<number>(0)
    const [containerHeight, setContainerHeight] = useState<number>(0)
    const [isResizing, setIsResizing] = useState(false) // 添加调整大小状态

    const containerRef = useRef<HTMLDivElement>(null)
    const pageInputRef = useRef<HTMLInputElement>(null)
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null) // 防抖定时器

    /**
     * 处理PDF文档加载成功
     */
    const handleDocumentLoadSuccess = useCallback(
        ({ numPages }: { numPages: number }) => {
            setTotalPages(numPages)
            setLoading(false)
            setError(null)
            onLoad?.(numPages)
        },
        [onLoad]
    )

    /**
     * 刷新PDF
     */
    const handleRefresh = useCallback(() => {
        setLoading(true)
        setError(null)
        setCurrentPage(1)
        setTotalPages(0)
    }, [])

    /**
     * 尝试使用备用worker源 - 简化版本
     */
    const tryFallbackWorker = useCallback(() => {
        console.log('尝试备用PDF worker配置')

        // 使用本地静态.mjs文件作为备用方案
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'
        console.log('使用本地静态.mjs文件作为备用worker源')

        // 延迟重试加载
        setTimeout(() => {
            handleRefresh()
        }, 1000)
    }, [handleRefresh])

    /**
     * 处理PDF文档加载失败
     */
    const handleDocumentLoadError = useCallback(
        (error: Error) => {
            console.error('PDF加载错误详情:', error)
            console.error('当前PDF.js版本:', pdfjs.version)
            console.error('当前Worker配置:', pdfjs.GlobalWorkerOptions.workerSrc)

            let errorMessage = 'PDF加载失败'

            // 检查是否是worker相关错误
            if (error.message?.includes('worker') || error.message?.includes('Worker')) {
                errorMessage = 'PDF渲染引擎加载失败，正在尝试修复...'

                console.warn('PDF worker加载失败，尝试备用配置方案')
                console.log('当前PDF.js版本:', pdfjs.version)
                console.log('当前Worker配置:', pdfjs.GlobalWorkerOptions.workerSrc)

                // 直接尝试备用worker配置方案
                tryFallbackWorker()

                return // 不设置错误状态，等待重试结果
            } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
                errorMessage = '网络连接失败，请检查网络连接后重试'
            } else if (error.message?.includes('Invalid PDF')) {
                errorMessage = 'PDF文件格式无效或已损坏'
            } else {
                errorMessage = error.message || 'PDF加载失败'
            }

            setLoading(false)
            setError(errorMessage)
            onError?.(errorMessage)
        },
        [onError, tryFallbackWorker]
    )

    /**
     * 处理页面渲染成功
     */
    const handlePageLoadSuccess = useCallback(
        (page: any) => {
            const { width, height } = page
            setPageWidth(width)
            setPageHeight(height)

            // 根据缩放模式调整缩放比例
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect()
                setContainerWidth(containerRect.width)
                setContainerHeight(containerRect.height)

                if (zoomMode === ZoomMode.FIT_WIDTH) {
                    const newScale = (containerRect.width - 40) / width // 减去padding
                    setScale(newScale)
                } else if (zoomMode === ZoomMode.FIT_HEIGHT) {
                    const newScale = (containerRect.height - 40) / height
                    setScale(newScale)
                }
            }
        },
        [zoomMode]
    )

    /**
     * 上一页
     */
    const handlePrevPage = useCallback(() => {
        if (currentPage > 1) {
            const newPage = currentPage - 1
            setCurrentPage(newPage)
            onPageChange?.(newPage)
        }
    }, [currentPage, onPageChange])

    /**
     * 下一页
     */
    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1
            setCurrentPage(newPage)
            onPageChange?.(newPage)
        }
    }, [currentPage, totalPages, onPageChange])

    /**
     * 跳转到指定页面
     */
    const handleGoToPage = useCallback(
        (pageNumber: number) => {
            if (pageNumber >= 1 && pageNumber <= totalPages) {
                setCurrentPage(pageNumber)
                onPageChange?.(pageNumber)
            }
        },
        [totalPages, onPageChange]
    )

    /**
     * 放大PDF
     */
    const handleZoomIn = useCallback(() => {
        const newScale = Math.min(scale + 0.25, 5)
        setScale(newScale)
        setZoomMode(ZoomMode.CUSTOM)
    }, [scale])

    /**
     * 缩小PDF
     */
    const handleZoomOut = useCallback(() => {
        const newScale = Math.max(scale - 0.25, 0.25)
        setScale(newScale)
        setZoomMode(ZoomMode.CUSTOM)
    }, [scale])

    /**
     * 实际大小（100%）
     */
    const handleActualSize = useCallback(() => {
        setScale(1)
        setZoomMode(ZoomMode.ACTUAL_SIZE)
    }, [])

    /**
     * 适合页面宽度
     */
    const handleFitWidth = useCallback(() => {
        // 防止频繁更新导致的抖动
        if (zoomMode === ZoomMode.FIT_WIDTH) return

        setZoomMode(ZoomMode.FIT_WIDTH)
        if (pageWidth && containerWidth) {
            const newScale = Math.max(0.1, Math.min(3, (containerWidth - 40) / pageWidth))
            setScale(newScale)
        }
    }, [pageWidth, containerWidth, zoomMode])

    /**
     * 适合页面高度
     */
    const handleFitHeight = useCallback(() => {
        // 防止频繁更新导致的抖动
        if (zoomMode === ZoomMode.FIT_HEIGHT) return

        setZoomMode(ZoomMode.FIT_HEIGHT)
        if (pageHeight && containerHeight) {
            const newScale = Math.max(0.1, Math.min(3, (containerHeight - 40) / pageHeight))
            setScale(newScale)
        }
    }, [pageHeight, containerHeight, zoomMode])

    /**
     * 下载PDF
     */
    const handleDownload = useCallback(() => {
        const link = document.createElement('a')
        link.href = src
        link.download = fileName || 'document.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }, [src, fileName])

    /**
     * 全屏预览 - 将容器全屏化
     */
    const handleFullscreen = useCallback(() => {
        if (containerRef.current) {
            try {
                if (containerRef.current.requestFullscreen) {
                    containerRef.current.requestFullscreen()
                } else if ((containerRef.current as any).webkitRequestFullscreen) {
                    // Safari支持
                    ;(containerRef.current as any).webkitRequestFullscreen()
                } else if ((containerRef.current as any).msRequestFullscreen) {
                    // IE/Edge支持
                    ;(containerRef.current as any).msRequestFullscreen()
                } else if ((containerRef.current as any).mozRequestFullScreen) {
                    // Firefox支持
                    ;(containerRef.current as any).mozRequestFullScreen()
                }
            } catch (error) {
                console.warn('全屏功能不支持:', error)
                message.warning('当前浏览器不支持全屏功能')
            }
        }
    }, [])

    /**
     * 处理页码输入
     */
    const handlePageInputChange = useCallback(
        (value: number | null) => {
            if (value && value >= 1 && value <= totalPages) {
                handleGoToPage(value)
            }
        },
        [totalPages, handleGoToPage]
    )

    /**
     * 处理页码输入框回车
     */
    const handlePageInputPressEnter = useCallback(() => {
        if (pageInputRef.current) {
            const value = parseInt(pageInputRef.current.value)
            if (!isNaN(value)) {
                handlePageInputChange(value)
            }
        }
    }, [handlePageInputChange])

    /**
     * 键盘事件处理
     */
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!enableKeyboard) return

            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    event.preventDefault()
                    handlePrevPage()
                    break
                case 'ArrowRight':
                case 'ArrowDown':
                    event.preventDefault()
                    handleNextPage()
                    break
                case '+':
                case '=':
                    event.preventDefault()
                    handleZoomIn()
                    break
                case '-':
                    event.preventDefault()
                    handleZoomOut()
                    break
                case '0':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault()
                        handleActualSize()
                    }
                    break
                case 'Home':
                    event.preventDefault()
                    handleGoToPage(1)
                    break
                case 'End':
                    event.preventDefault()
                    handleGoToPage(totalPages)
                    break
            }
        },
        [
            enableKeyboard,
            handlePrevPage,
            handleNextPage,
            handleZoomIn,
            handleZoomOut,
            handleActualSize,
            handleGoToPage,
            totalPages,
        ]
    )

    /**
     * 格式化文件大小
     */
    const formatFileSize = (bytes?: number): string => {
        if (!bytes) return ''

        const units = ['B', 'KB', 'MB', 'GB']
        let size = bytes
        let unitIndex = 0

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024
            unitIndex++
        }

        return `${size.toFixed(1)} ${units[unitIndex]}`
    }

    // 键盘事件监听
    useEffect(() => {
        if (enableKeyboard) {
            document.addEventListener('keydown', handleKeyDown)
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [enableKeyboard, handleKeyDown])

    // 容器大小变化监听 - 修复无限更新循环
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()

                // 只有当尺寸真正发生变化时才更新状态
                if (
                    Math.abs(rect.width - containerWidth) > 1 ||
                    Math.abs(rect.height - containerHeight) > 1
                ) {
                    setContainerWidth(rect.width)
                    setContainerHeight(rect.height)
                }
            }
        }

        const resizeObserver = new ResizeObserver(handleResize)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
            // 初始化时也调用一次
            handleResize()
        }

        return () => {
            resizeObserver.disconnect()
        }
    }, []) // 移除依赖，避免无限循环

    // 单独处理缩放模式变化时的重新计算
    useEffect(() => {
        if (zoomMode === ZoomMode.FIT_WIDTH && pageWidth && containerWidth) {
            const newScale = Math.max(0.1, Math.min(3, (containerWidth - 40) / pageWidth))
            setScale(newScale)
        } else if (zoomMode === ZoomMode.FIT_HEIGHT && pageHeight && containerHeight) {
            const newScale = Math.max(0.1, Math.min(3, (containerHeight - 40) / pageHeight))
            setScale(newScale)
        }
    }, [zoomMode, pageWidth, pageHeight, containerWidth, containerHeight])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <Alert
                    message="PDF预览失败"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-4"
                />
                <Space>
                    <Button onClick={handleRefresh}>重新加载</Button>
                    <Button onClick={handleDownload}>下载PDF文件</Button>
                    <Button onClick={handleFullscreen}>在新窗口中打开</Button>
                </Space>
            </div>
        )
    }

    return (
        <div className="pdf-preview-container flex-col h-full">
            {/* 工具栏 */}
            {showToolbar && (
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">{fileName}</span>
                            {fileSize && (
                                <span className="text-xs text-gray-500">
                                    ({formatFileSize(fileSize)})
                                </span>
                            )}
                        </div>

                        {/* 页面导航 */}
                        {totalPages > 0 && (
                            <div className="flex items-center space-x-2">
                                <Tooltip title="上一页 (←)">
                                    <Button
                                        type="text"
                                        icon={<LeftOutlined />}
                                        onClick={handlePrevPage}
                                        disabled={currentPage <= 1}
                                        size="small"
                                    />
                                </Tooltip>

                                <div className="flex items-center space-x-1">
                                    <InputNumber
                                        ref={pageInputRef}
                                        size="small"
                                        min={1}
                                        max={totalPages}
                                        value={currentPage}
                                        onChange={handlePageInputChange}
                                        onPressEnter={handlePageInputPressEnter}
                                        style={{ width: 60 }}
                                    />
                                    <span className="text-xs text-gray-500">/ {totalPages}</span>
                                </div>

                                <Tooltip title="下一页 (→)">
                                    <Button
                                        type="text"
                                        icon={<RightOutlined />}
                                        onClick={handleNextPage}
                                        disabled={currentPage >= totalPages}
                                        size="small"
                                    />
                                </Tooltip>
                            </div>
                        )}
                    </div>

                    <Space size="small">
                        {/* 缩放控制 */}
                        <Tooltip title="放大 (+)">
                            <Button
                                type="text"
                                icon={<ZoomInOutlined />}
                                onClick={handleZoomIn}
                                disabled={scale >= 5}
                                size="small"
                            />
                        </Tooltip>

                        <Tooltip title="缩小 (-)">
                            <Button
                                type="text"
                                icon={<ZoomOutOutlined />}
                                onClick={handleZoomOut}
                                disabled={scale <= 0.25}
                                size="small"
                            />
                        </Tooltip>

                        <Tooltip title="实际大小 (Ctrl+0)">
                            <Button
                                type="text"
                                icon={<OneToOneOutlined />}
                                onClick={handleActualSize}
                                size="small"
                            >
                                {Math.round(scale * 100)}%
                            </Button>
                        </Tooltip>

                        <Tooltip title="适合宽度">
                            <Button
                                type="text"
                                icon={<ExpandOutlined />}
                                onClick={handleFitWidth}
                                size="small"
                            />
                        </Tooltip>

                        <Tooltip title="适合高度">
                            <Button
                                type="text"
                                icon={<CompressOutlined />}
                                onClick={handleFitHeight}
                                size="small"
                            />
                        </Tooltip>

                        <Tooltip title="刷新">
                            <Button
                                type="text"
                                icon={<ReloadOutlined />}
                                onClick={handleRefresh}
                                size="small"
                            />
                        </Tooltip>

                        <Tooltip title="全屏预览">
                            <Button
                                type="text"
                                icon={<FullscreenOutlined />}
                                onClick={handleFullscreen}
                                size="small"
                            />
                        </Tooltip>

                        <Tooltip title="下载">
                            <Button
                                type="text"
                                icon={<DownloadOutlined />}
                                onClick={handleDownload}
                                size="small"
                            />
                        </Tooltip>
                    </Space>
                </div>
            )}

            {/* PDF预览区域 */}
            <div
                ref={containerRef}
                className="relative bg-gray-100 flex items-center justify-center overflow-auto min-h-0"
                style={{
                    height: maxHeight,
                    scrollBehavior: 'smooth',
                }}
            >
                <Document
                    file={src}
                    onLoadSuccess={handleDocumentLoadSuccess}
                    onLoadError={handleDocumentLoadError}
                    loading={
                        <div className="flex flex-col items-center justify-center">
                            <Spin size="large" />
                            <span className="mt-4 text-gray-500">加载PDF中...</span>
                        </div>
                    }
                    error={
                        <div className="flex flex-col items-center justify-center p-8">
                            <Alert
                                message="PDF加载失败"
                                description="无法加载PDF文件，请检查文件是否损坏"
                                type="error"
                                showIcon
                            />
                        </div>
                    }
                    noData={
                        <div className="flex flex-col items-center justify-center p-8">
                            <Alert
                                message="没有PDF数据"
                                description="PDF文件为空或无效"
                                type="warning"
                                showIcon
                            />
                        </div>
                    }
                >
                    <Page
                        pageNumber={currentPage}
                        scale={scale}
                        onLoadSuccess={handlePageLoadSuccess}
                        onLoadError={(error) => {
                            console.error('页面加载失败:', error)
                            message.error(`第${currentPage}页加载失败`)
                        }}
                        onRenderTextLayerError={(error) => {
                            // 处理TextLayer渲染错误，避免控制台警告
                            if (error.name !== 'AbortException') {
                                console.warn('TextLayer渲染错误:', error)
                            }
                        }}
                        loading={
                            <div className="flex items-center justify-center p-8">
                                <Spin />
                                <span className="ml-2 text-gray-500">加载页面中...</span>
                            </div>
                        }
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="mx-auto"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                    />
                </Document>
            </div>

            {/* 状态栏 */}
            {showToolbar && !loading && !error && totalPages > 0 && (
                <div className="flex items-center justify-between p-2 bg-gray-50 border-t text-xs text-gray-500">
                    <span>
                        第 {currentPage} 页 / 共 {totalPages} 页
                    </span>
                    <span>
                        缩放: {Math.round(scale * 100)}% | 模式:{' '}
                        {zoomMode === ZoomMode.ACTUAL_SIZE
                            ? '实际大小'
                            : zoomMode === ZoomMode.FIT_WIDTH
                              ? '适合宽度'
                              : zoomMode === ZoomMode.FIT_HEIGHT
                                ? '适合高度'
                                : '自定义'}
                    </span>
                </div>
            )}
        </div>
    )
}

// 使用React.memo优化PDFPreview组件
export default React.memo(PDFPreview, createIncludeComparator<PDFPreviewProps>([
    'src',
    'fileName',
    'fileSize',
    'maxHeight'
]))
