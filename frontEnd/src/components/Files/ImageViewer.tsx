import Toolbar, { FunctionProps } from '@/components/Files/Toolbar.tsx'
import type { ViewerComponentProps } from '@/types/files'
import React, { useRef, useState } from 'react'

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
    const imageRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const handleWheel = (e: React.WheelEvent) => {
        const delta = Math.sign(e.deltaY) * -0.1
        const newScale = scale + delta
        if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
            setScale(newScale)
        }
    }
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const resetImage = () => {
        setScale(1)
        setRotate(0)
        setTranslate({ x: 0, y: 0 })
    }
    const handleDrag = (e: React.MouseEvent) => {
        e.preventDefault() // 防止默认行为
        setDragStart({
            x: e.clientX - translate.x,
            y: e.clientY - translate.y,
        })
        setIsDragging(true)
    }
    const handleDragEnd = (e: React.MouseEvent) => {
        setDragStart(null)
        setIsDragging(false)
    }
    const onDrag = (event: React.MouseEvent) => {
        if (!dragStart) return
        setTranslate({
            x: event.clientX - dragStart.x,
            y: event.clientY - dragStart.y,
        })
    }
    // 限制缩放范围
    const MIN_SCALE = 0.5
    const MAX_SCALE = 3

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

    return (
        <div flex-col h-full ref={containerRef}>
            <Toolbar
                isDownload
                toolList={toolList}
                fileUrl={url}
                fileName={fileInfo!.name}
            ></Toolbar>
            <div
                flex-1
                h-0
                f-c-c
                overflow-hidden
                onWheel={handleWheel}
                onMouseDown={handleDrag}
                onMouseLeave={handleDragEnd}
                onMouseUp={handleDragEnd}
                onMouseMove={onDrag}
                style={{ background: '#121212' }}
            >
                <img
                    ref={imageRef}
                    src={url}
                    alt="Preview"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        cursor: isDragging ? 'grabbing' : 'grab',
                        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale}) rotate(${rotate}deg)`,
                        transition: 'transform 0.3s ease',
                    }}
                />
            </div>
        </div>
    )
}

export default ImageViewer
