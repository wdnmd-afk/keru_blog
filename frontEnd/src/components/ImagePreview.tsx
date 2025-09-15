import { Image, Button, Space, Tooltip, Spin, Popconfirm } from 'antd'
import { DeleteOutlined, EyeOutlined, LoadingOutlined, ExclamationCircleOutlined, ClearOutlined } from '@ant-design/icons'
import React from 'react'
import { ImageItem } from './ImageUpload'

interface ImagePreviewProps {
    images: ImageItem[]                          // 图片列表
    onImageRemove: (imageId: string) => void    // 删除图片回调
    onClearAll?: () => void                     // 清空所有图片回调
    readonly?: boolean                          // 是否只读模式
    maxDisplay?: number                         // 最大显示数量
    size?: number                              // 预览图尺寸
    showBatchActions?: boolean                  // 是否显示批量操作按钮
}

/**
 * 图片预览组件
 * 支持图片展示、删除、状态显示、点击放大预览
 */
const ImagePreview: React.FC<ImagePreviewProps> = ({
    images,
    onImageRemove,
    onClearAll,
    readonly = false,
    maxDisplay = 6,
    size = 60,
    showBatchActions = true
}) => {
    // 如果没有图片，不渲染组件
    if (!images || images.length === 0) return null

    const displayImages = images.slice(0, maxDisplay)
    const hasMore = images.length > maxDisplay

    /**
     * 渲染单个图片项
     */
    const renderImageItem = (image: ImageItem) => (
        <div
            key={image.id}
            className="image-preview-item"
            style={{
                position: 'relative',
                display: 'inline-block',
                flexShrink: 0, // 防止在flex布局中被压缩
                width: 80, // 固定宽度80px
                height: 80, // 固定高度80px
                borderRadius: 6,
                overflow: 'hidden',
                border: '1px solid #d9d9d9',
                backgroundColor: '#fafafa'
            }}
        >
            {/* 主图片 */}
            <Image
                src={image.url}
                alt={image.name}
                width={80} // 固定宽度80px
                height={80} // 固定高度80px
                style={{
                    objectFit: 'cover',
                    display: 'block'
                }}
                preview={{
                    mask: <EyeOutlined style={{ color: 'white' }} />,
                    maskClassName: 'image-preview-mask'
                }}
                placeholder={
                    <div style={{
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5'
                    }}>
                        <LoadingOutlined />
                    </div>
                }
                onLoad={() => {
                    console.log('[ImagePreview] 图片加载成功:', image.url)
                }}
                onError={(e) => {
                    console.error('[ImagePreview] 图片加载失败:', image.url, e)
                }}
            />

            {/* 上传中状态遮罩 */}
            {image.status === 'uploading' && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 12
                }}>
                    <Spin size="small" />
                    <div style={{ marginTop: 4 }}>上传中...</div>
                </div>
            )}

            {/* 上传失败状态遮罩 */}
            {image.status === 'error' && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255,77,79,0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 12
                }}>
                    <ExclamationCircleOutlined />
                    <div style={{ marginTop: 4 }}>上传失败</div>
                </div>
            )}

            {/* 删除按钮 */}
            {!readonly && (
                <Tooltip title={`删除 ${image.name}`} placement="top">
                    <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => onImageRemove(image.id)}
                        style={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: '#ff4d4f',
                            border: '1px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 10,
                            color: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    />
                </Tooltip>
            )}

            {/* 文件信息提示 */}
            {!readonly && (
                <Tooltip
                    title={
                        <div>
                            <div>文件名: {image.name}</div>
                            <div>大小: {(image.size / 1024).toFixed(1)} KB</div>
                            <div>类型: {image.type}</div>
                        </div>
                    }
                    placement="bottom"
                >
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        fontSize: 10,
                        padding: '2px 4px',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {image.name}
                    </div>
                </Tooltip>
            )}
        </div>
    )

    /**
     * 渲染"更多"指示器
     */
    const renderMoreIndicator = () => (
        <div style={{
            width: 80, // 固定宽度80px
            height: 80, // 固定高度80px
            flexShrink: 0, // 防止在flex布局中被压缩
            border: '1px dashed #d9d9d9',
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: 12,
            backgroundColor: '#fafafa'
        }}>
            <div>+{images.length - maxDisplay}</div>
            <div style={{ fontSize: 10 }}>更多</div>
        </div>
    )

    return (
        <div className="image-preview-container" style={{ marginBottom: 8 }}>
            {/* 批量操作按钮 */}
            {!readonly && showBatchActions && images.length > 1 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                    padding: '4px 8px',
                    background: 'rgba(0,0,0,0.02)',
                    borderRadius: 4,
                    border: '1px solid #f0f0f0'
                }}>
                    <span style={{ fontSize: 12, color: '#666' }}>
                        已选择 {images.length} 张图片
                    </span>

                    {onClearAll && (
                        <Popconfirm
                            title="确认清空所有图片？"
                            description="此操作不可撤销"
                            okText="清空"
                            cancelText="取消"
                            onConfirm={onClearAll}
                            placement="topRight"
                        >
                            <Button
                                type="text"
                                size="small"
                                danger
                                icon={<ClearOutlined />}
                            >
                                清空全部
                            </Button>
                        </Popconfirm>
                    )}
                </div>
            )}

            {/* 图片横向布局 */}
            <div style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: 8,
                overflowX: 'auto',
                overflowY: 'hidden',
                padding: '4px 0',
                maxWidth: '100%',
                // 自定义滚动条样式
                scrollbarWidth: 'thin',
                scrollbarColor: '#d9d9d9 transparent'
            }}>
                {displayImages.map(renderImageItem)}
                {hasMore && renderMoreIndicator()}
            </div>
        </div>
    )
}

export default ImagePreview
