/**
 * 图片预览器组件
 * 支持jpg, png, gif, webp等格式的图片预览
 */

import React, { useState, useCallback } from 'react'
import { Image, Spin, Alert, Space, Button, Tooltip } from 'antd'
import { 
  ZoomInOutlined, 
  ZoomOutOutlined, 
  RotateLeftOutlined, 
  RotateRightOutlined,
  DownloadOutlined,
  FullscreenOutlined
} from '@ant-design/icons'

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

  /**
   * 处理图片加载成功
   */
  const handleLoad = useCallback((event: Event) => {
    setLoading(false)
    setError(null)
    onLoad?.(event)
  }, [onLoad])

  /**
   * 处理图片加载失败
   */
  const handleError = useCallback((event: Event) => {
    setLoading(false)
    setError('图片加载失败')
    onError?.(event)
  }, [onError])

  /**
   * 放大图片
   */
  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 3))
  }, [])

  /**
   * 缩小图片
   */
  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.2))
  }, [])

  /**
   * 重置缩放和旋转
   */
  const handleReset = useCallback(() => {
    setScale(1)
    setRotation(0)
  }, [])

  /**
   * 向左旋转
   */
  const handleRotateLeft = useCallback(() => {
    setRotation(prev => prev - 90)
  }, [])

  /**
   * 向右旋转
   */
  const handleRotateRight = useCallback(() => {
    setRotation(prev => prev + 90)
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
   * 全屏预览
   */
  const handleFullscreen = useCallback(() => {
    // 使用Antd的Image组件的预览功能
    const img = new window.Image()
    img.src = src
    
    // 创建预览
    Image.PreviewGroup.previewImage({
      src,
      alt: fileName
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
        <Button onClick={() => window.open(src, '_blank')}>
          在新窗口中打开
        </Button>
      </div>
    )
  }

  return (
    <div className="image-preview-container">
      {/* 工具栏 */}
      {showToolbar && (
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {fileName}
            </span>
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
                disabled={scale >= 3}
              />
            </Tooltip>
            
            <Tooltip title="缩小">
              <Button 
                type="text" 
                icon={<ZoomOutOutlined />} 
                onClick={handleZoomOut}
                disabled={scale <= 0.2}
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
        className="flex items-center justify-center p-4 bg-gray-100 min-h-96"
        style={{ maxHeight }}
      >
        {loading && (
          <div className="flex flex-col items-center space-y-4">
            <Spin size="large" />
            <span className="text-gray-500">加载中...</span>
          </div>
        )}
        
        <img
          src={src}
          alt={fileName}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            maxWidth,
            maxHeight: loading ? 0 : maxHeight,
            opacity: loading ? 0 : 1,
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      {/* 缩放信息 */}
      {showToolbar && (scale !== 1 || rotation !== 0) && (
        <div className="flex items-center justify-center p-2 bg-gray-50 border-t">
          <span className="text-xs text-gray-500">
            缩放: {Math.round(scale * 100)}%
            {rotation !== 0 && ` | 旋转: ${rotation}°`}
          </span>
        </div>
      )}
    </div>
  )
}

export default ImagePreview
