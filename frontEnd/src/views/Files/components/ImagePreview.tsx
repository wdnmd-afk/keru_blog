/**
 * 图片预览器组件
 * 支持jpg, png, gif, webp等格式的图片预览
 */

import {
    DownloadOutlined,
    FullscreenOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons'
import { Alert, Button, Image, Space, Spin, Tooltip } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface ImagePreviewProps {
    /** 图片URL */
    src: string
    /** 图片名称 */
    fileName?: string
    /** 图片大小（字节） */
    fileSize?: number
    /** 是否显示工具栏 */
    showToolbar?: boolean
    /** 最大宽度 */
    maxWidth?: number | string
    /** 最大高度 */
    maxHeight?: number | string
    /** 加载失败回调 */
    onError?: (error: Event) => void
    /** 加载成功回调 */
    onLoad?: (event: Event) => void
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
    src,
    fileName,
    fileSize,
    showToolbar = true,
    maxWidth = '100%',
    maxHeight = '70vh',
    onError,
    onLoad,
}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [scale, setScale] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [translate, setTranslate] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

    const imageRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // 缩放范围限制
    const MIN_SCALE = 0.1
    const MAX_SCALE = 5

    /**
     * 处理图片加载成功
     */
    const handleLoad = useCallback(
        (event: Event) => {
            console.log('Image loaded')
            setLoading(false)
            setError(null)

            // 获取图片自然尺寸
            if (imageRef.current) {
                const { naturalWidth, naturalHeight } = imageRef.current
                console.log('Image natural size:', { naturalWidth, naturalHeight })
                setImageSize({ width: naturalWidth, height: naturalHeight })
            }

            onLoad?.(event)
        },
        [onLoad]
    )

    /**
     * 处理图片加载失败
     */
    const handleError = useCallback(
        (event: Event) => {
            setLoading(false)
            setError('图片加载失败')
            onError?.(event)
        },
        [onError]
    )

    /**
     * 放大图片
     */
    const handleZoomIn = useCallback(() => {
        setScale((prev) => Math.min(prev + 0.2, MAX_SCALE))
    }, [])

    /**
     * 缩小图片
     */
    const handleZoomOut = useCallback(() => {
        setScale((prev) => Math.max(prev - 0.2, MIN_SCALE))
    }, [])



    /**
     * 向左旋转
     */
    const handleRotateLeft = useCallback(() => {
        setRotation((prev) => prev - 90)
    }, [])

    /**
     * 向右旋转
     */
    const handleRotateRight = useCallback(() => {
        setRotation((prev) => prev + 90)
    }, [])

    /**
     * 下载图片
     */
    const handleDownload = useCallback(() => {
        const link = document.createElement('a')
        link.href = src
        link.download = fileName || 'image'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }, [src, fileName])

    /**
     * 重置图片
     */
    const handleReset = useCallback(() => {
        setScale(1)
        setRotation(0)
        setTranslate({ x: 0, y: 0 })
    }, [])

    /**
     * 开始拖拽
     */
    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            console.log('handleMouseDown triggered')
            e.preventDefault()

            setDragStart({
                x: e.clientX - translate.x,
                y: e.clientY - translate.y,
            })
            setIsDragging(true)
        },
        [translate]
    )

    /**
     * 拖拽过程中
     */
    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!dragStart || !isDragging) return

            const newTranslate = {
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            }

            console.log('handleMouseMove: new translate:', newTranslate)
            setTranslate(newTranslate)
        },
        [dragStart, isDragging]
    )

    /**
     * 结束拖拽
     */
    const handleMouseUp = useCallback(() => {
        console.log('handleMouseUp triggered')
        setDragStart(null)
        setIsDragging(false)
    }, [])

    /**
     * 双击重置
     */
    const handleDoubleClick = useCallback(() => {
        handleReset()
    }, [handleReset])

    // 监听容器尺寸变化
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current
                console.log('Container size:', { clientWidth, clientHeight })
                setContainerSize({ width: clientWidth, height: clientHeight })
            }
        }

        const resizeObserver = new ResizeObserver(handleResize)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
            handleResize()
        }

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    // 使用原生事件监听器处理wheel事件，避免passive listener问题
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleNativeWheel = (e: WheelEvent) => {
            console.log('Native wheel event triggered:', e.deltaY, 'current scale:', scale)

            const delta = Math.sign(e.deltaY) * -0.1
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta))

            console.log('Scale change:', { current: scale, delta, newScale })

            if (newScale !== scale) {
                e.preventDefault() // 阻止默认滚动行为
                setScale(newScale)
            }
        }

        // 添加非passive的wheel事件监听器
        container.addEventListener('wheel', handleNativeWheel, { passive: false })

        return () => {
            container.removeEventListener('wheel', handleNativeWheel)
        }
    }, [scale]) // 依赖scale以获取最新值

    /**
     * 全屏预览
     */
    const handleFullscreen = useCallback(() => {
        // 使用Antd的Image组件的预览功能
        const img = new window.Image()
        img.src = src

        // 创建预览
        Image.PreviewGroup.previewImage({
            src,
            alt: fileName,
        })
    }, [src, fileName])

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

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <Alert
                    message="图片预览失败"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-4"
                />
                <Button onClick={() => window.open(src, '_blank')}>在新窗口中打开</Button>
            </div>
        )
    }

    return (
        <div className="image-preview-container h-full flex-col">
            {/* 工具栏 */}
            {showToolbar && (
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">{fileName}</span>
                        {fileSize && (
                            <span className="text-xs text-gray-500">
                                ({formatFileSize(fileSize)})
                            </span>
                        )}
                    </div>

                    <Space size="small">
                        <Tooltip title="放大">
                            <Button
                                type="text"
                                icon={<ZoomInOutlined />}
                                onClick={handleZoomIn}
                                disabled={scale >= MAX_SCALE}
                            />
                        </Tooltip>

                        <Tooltip title="缩小">
                            <Button
                                type="text"
                                icon={<ZoomOutOutlined />}
                                onClick={handleZoomOut}
                                disabled={scale <= MIN_SCALE}
                            />
                        </Tooltip>

                        <Tooltip title="向左旋转">
                            <Button
                                type="text"
                                icon={<RotateLeftOutlined />}
                                onClick={handleRotateLeft}
                            />
                        </Tooltip>

                        <Tooltip title="向右旋转">
                            <Button
                                type="text"
                                icon={<RotateRightOutlined />}
                                onClick={handleRotateRight}
                            />
                        </Tooltip>

                        <Tooltip title="重置">
                            <Button
                                type="text"
                                onClick={handleReset}
                                disabled={scale === 1 && rotation === 0}
                            >
                                重置
                            </Button>
                        </Tooltip>

                        <Tooltip title="全屏预览">
                            <Button
                                type="text"
                                icon={<FullscreenOutlined />}
                                onClick={handleFullscreen}
                            />
                        </Tooltip>

                        <Tooltip title="下载">
                            <Button
                                type="text"
                                icon={<DownloadOutlined />}
                                onClick={handleDownload}
                            />
                        </Tooltip>
                    </Space>
                </div>
            )}

            {/* 图片预览区域 */}
            <div
                ref={containerRef}
                className="flex items-center justify-center p-4 bg-gray-100 flex-1 min-h-96 overflow-hidden"
                style={{
                    maxHeight,
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}

                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                onClick={() => console.log('Container clicked')}
            >
                {loading && (
                    <div className="flex flex-col items-center space-y-4">
                        <Spin size="large" />
                        <span className="text-gray-500">加载中...</span>
                    </div>
                )}

                <img
                    ref={imageRef}
                    src={src}
                    alt={fileName}
                    className="max-w-full max-h-full object-contain"
                    style={{
                        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale}) rotate(${rotation}deg)`,
                        maxWidth,
                        maxHeight: loading ? 0 : maxHeight,
                        opacity: loading ? 0 : 1,
                        userSelect: 'none',
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                    }}
                    onLoad={handleLoad}
                    onError={handleError}
                />

                {/* 缩放比例显示 */}
                {scale !== 1 && (
                    <div
                        className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm pointer-events-none"
                        style={{
                            opacity: scale !== 1 ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        {Math.round(scale * 100)}%
                    </div>
                )}
            </div>

            {/* 缩放信息 */}
            {showToolbar && (scale !== 1 || rotation !== 0) && (
                <div className="flex items-center justify-center p-2 bg-gray-50 border-t">
                    <span className="text-xs text-gray-500">
                        缩放: {Math.round(scale * 100)}%{rotation !== 0 && ` | 旋转: ${rotation}°`}
                    </span>
                </div>
            )}
        </div>
    )
}

export default ImagePreview
