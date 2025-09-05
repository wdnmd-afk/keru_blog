import Toolbar, { FunctionProps } from '@/components/Files/Toolbar.tsx'
import type { ViewerComponentProps } from '@/types/files'
import React, { useRef, useState } from 'react'
import { createIncludeComparator } from '@/utils/memoComparator'

/**
 * 图片预览组件Props
 */
interface ImageViewerProps extends ViewerComponentProps {}

/**
 * 图片预览组件
 * 提供图片的缩放、旋转、拖拽等功能
 * @param url 图片URL
 * @param fileInfo 文件信息
 */
function ImageViewer({ url, fileInfo }: ImageViewerProps) {
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [translate, setTranslate] = useState({ x: 0, y: 0 })
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

    const imageRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // 限制缩放范围
    const MIN_SCALE = 0.1
    const MAX_SCALE = 5

    // 图片加载完成后获取尺寸
    const handleImageLoad = () => {
        console.log('Image loaded')

        if (imageRef.current) {
            const { naturalWidth, naturalHeight } = imageRef.current
            console.log('Image natural size:', { naturalWidth, naturalHeight })
            setImageSize({ width: naturalWidth, height: naturalHeight })
        }

        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current
            console.log('Container size:', { clientWidth, clientHeight })
            setContainerSize({ width: clientWidth, height: clientHeight })
        }
    }

    // 检查图片是否需要拖拽（图片尺寸大于容器时才允许拖拽）
    const shouldAllowDrag = () => {
        if (!imageRef.current || !containerRef.current) {
            console.log('shouldAllowDrag: missing refs')
            return false
        }

        const scaledWidth = imageSize.width * scale
        const scaledHeight = imageSize.height * scale

        const result = scaledWidth > containerSize.width || scaledHeight > containerSize.height
        console.log('shouldAllowDrag check:', {
            imageSize,
            containerSize,
            scale,
            scaledWidth,
            scaledHeight,
            result
        })

        return result
    }

    // 限制拖拽边界
    const constrainTranslate = (newTranslate: { x: number; y: number }) => {
        if (!shouldAllowDrag()) {
            return { x: 0, y: 0 }
        }

        const scaledWidth = imageSize.width * scale
        const scaledHeight = imageSize.height * scale

        const maxX = Math.max(0, (scaledWidth - containerSize.width) / 2)
        const maxY = Math.max(0, (scaledHeight - containerSize.height) / 2)

        return {
            x: Math.max(-maxX, Math.min(maxX, newTranslate.x)),
            y: Math.max(-maxY, Math.min(maxY, newTranslate.y))
        }
    }

    // 鼠标滚轮缩放 - 简化版本
    const handleWheel = (e: React.WheelEvent) => {
        console.log('handleWheel triggered:', e.deltaY, 'current scale:', scale)
        e.preventDefault()

        const delta = Math.sign(e.deltaY) * -0.1
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta))

        console.log('Scale change:', { current: scale, delta, newScale })

        if (newScale === scale) {
            console.log('Scale unchanged, returning')
            return
        }

        console.log('Setting new scale:', newScale)
        setScale(newScale)
    }

    // 重置图片位置和缩放
    const resetImage = () => {
        setScale(1)
        setRotate(0)
        setTranslate({ x: 0, y: 0 })
    }

    // 开始拖拽 - 简化版本，先让基本功能工作
    const handleDrag = (e: React.MouseEvent) => {
        console.log('handleDrag triggered')

        e.preventDefault()
        console.log('Starting drag at:', { x: e.clientX, y: e.clientY, currentTranslate: translate })

        setDragStart({
            x: e.clientX - translate.x,
            y: e.clientY - translate.y,
        })
        setIsDragging(true)
    }

    // 结束拖拽
    const handleDragEnd = () => {
        console.log('handleDragEnd triggered')
        setDragStart(null)
        setIsDragging(false)
    }

    // 拖拽过程中 - 简化版本
    const onDrag = (event: React.MouseEvent) => {
        if (!dragStart || !isDragging) {
            return
        }

        const newTranslate = {
            x: event.clientX - dragStart.x,
            y: event.clientY - dragStart.y,
        }

        console.log('onDrag: new translate:', newTranslate)
        // 暂时不使用约束，先让基本拖拽工作
        setTranslate(newTranslate)
    }

    // 双击重置
    const handleDoubleClick = () => {
        resetImage()
    }

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev * 1.2, MAX_SCALE))
    }

    const handleZoomOut = () => {
        setScale((prev) => Math.max(prev / 1.2, MIN_SCALE))
    }

    const handleRotateRight = () => {
        setRotate((prev) => (prev + 90) % 360)
    }

    const handleRotateLeft = () => {
        setRotate((prev) => (prev - 90) % 360)
    }

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (containerRef.current) {
                if (containerRef.current.requestFullscreen) {
                    containerRef.current.requestFullscreen()
                }
                // 处理不同浏览器的全屏 API
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                else if (containerRef.current.webkitRequestFullscreen) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    containerRef.current.webkitRequestFullscreen()
                }
                setIsFullscreen(true)
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
            } else if (document.webkitExitFullscreen) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                document.webkitExitFullscreen()
            }
            setIsFullscreen(false)
        }
    }

    const toolList: FunctionProps[] = [
        {
            icon: 'zoomIn',
            title: '放大',
            onClick: handleZoomIn,
        },
        {
            icon: 'narrow',
            title: '缩小',
            onClick: handleZoomOut,
        },
        {
            icon: 'rightRotation',
            title: '右旋转',
            onClick: handleRotateRight,
        },
        {
            icon: 'leftRotation',
            title: '左旋转',
            onClick: handleRotateLeft,
        },
        {
            icon: 'reset',
            title: '重置',
            onClick: resetImage,
        },
        {
            icon: 'fullscreen',
            title: isFullscreen ? '退出全屏' : '全屏',
            onClick: toggleFullscreen,
        },
    ]

    // 监听容器尺寸变化
    React.useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current
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

    // 当缩放或容器尺寸变化时，重新约束位置
    React.useEffect(() => {
        setTranslate(prev => constrainTranslate(prev))
    }, [scale, containerSize, imageSize])

    return (
        <div flex-col h-full ref={containerRef}>
            <Toolbar
                isDownload
                toolList={toolList}
                fileUrl={url}
                fileName={fileInfo!.name}
            ></Toolbar>
            <div
                className="image-preview-container"
                flex-1
                h-0
                f-c-c
                overflow-hidden
                onWheel={handleWheel}
                onMouseDown={handleDrag}
                onMouseLeave={handleDragEnd}
                onMouseUp={handleDragEnd}
                onMouseMove={onDrag}
                onDoubleClick={handleDoubleClick}
                onClick={() => console.log('Container clicked')}
                style={{
                    background: '#121212',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
            >
                <img
                    ref={imageRef}
                    src={url}
                    alt="Preview"
                    onLoad={handleImageLoad}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        userSelect: 'none',
                        // 移除 pointerEvents: 'none' 以允许鼠标事件
                        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale}) rotate(${rotate}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                    }}
                />

                {/* 缩放比例显示 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        pointerEvents: 'none',
                        opacity: scale !== 1 ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    {Math.round(scale * 100)}%
                </div>
            </div>
        </div>
    )
}
}

// 使用React.memo优化ImageViewer组件
export default React.memo(ImageViewer, createIncludeComparator<ImageViewerProps>([
    'url',
    'fileInfo'
]))
