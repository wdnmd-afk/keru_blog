/**
 * 统一的文件预览器入口组件
 * 根据文件类型动态加载对应的预览器
 */

import {
    FilePreviewType,
    getFilePreviewType,
    getFileTypeDisplayName,
    getPreviewSizeLimit,
    isFilePreviewable,
} from '@/utils/filePreview'
import { FileOutlined } from '@ant-design/icons'
import { Alert, Empty } from 'antd'
import React, { useMemo } from 'react'

// 动态导入预览器组件
import ImagePreview from './ImagePreview'
import MarkdownPreview from './MarkdownPreview'
import EnhancedMarkdownPreview from './EnhancedMarkdownPreview'
import PDFPreview from './PDFPreview'
import TextPreview from './TextPreview'
import VideoPreview from './VideoPreview'

export interface FilePreviewProps {
    /** 文件URL */
    src: string
    /** 文件名称 */
    fileName: string
    /** 文件MIME类型 */
    mimeType?: string
    /** 文件大小（字节） */
    fileSize?: number
    /** 是否显示工具栏 */
    showToolbar?: boolean
    /** 最大宽度 */
    maxWidth?: number | string
    /** 最大高度 */
    maxHeight?: number | string
    /** 预览器配置 */
    previewConfig?: {
        /** 图片预览配置 */
        image?: {
            showToolbar?: boolean
        }
        /** PDF预览配置 */
        pdf?: {
            initialScale?: number
        }
        /** 视频预览配置 */
        video?: {
            autoPlay?: boolean
            loop?: boolean
            muted?: boolean
        }
        /** 文本预览配置 */
        text?: {
            encoding?: string
            showLineNumbers?: boolean
        }
        /** Markdown预览配置 */
        markdown?: {
            showSourceToggle?: boolean
        }
    }
    /** 加载失败回调 */
    onError?: (error: string) => void
    /** 加载成功回调 */
    onLoad?: () => void
}

const FilePreview: React.FC<FilePreviewProps> = ({
    src,
    fileName,
    mimeType,
    fileSize,
    showToolbar = true,
    maxWidth = '100%',
    maxHeight = '70vh',
    previewConfig = {},
    onError,
    onLoad,
}) => {
    /**
     * 获取文件预览类型
     */
    const previewType = useMemo(() => {
        return getFilePreviewType(fileName, mimeType)
    }, [fileName, mimeType])

    /**
     * 检查文件是否可以预览
     */
    const canPreview = useMemo(() => {
        if (!isFilePreviewable(fileName, mimeType)) {
            return false
        }

        // 检查文件大小限制
        if (fileSize) {
            const sizeLimit = getPreviewSizeLimit(previewType)
            if (sizeLimit > 0 && fileSize > sizeLimit) {
                return false
            }
        }

        return true
    }, [fileName, mimeType, fileSize, previewType])

    /**
     * 渲染对应的预览器组件
     */
    const renderPreviewComponent = () => {
        const commonProps = {
            src,
            fileName,
            fileSize,
            showToolbar,
            maxWidth,
            maxHeight,
            onError,
            onLoad,
        }

        switch (previewType) {
            case FilePreviewType.IMAGE:
                return <ImagePreview {...commonProps} {...previewConfig.image} />

            case FilePreviewType.PDF:
                return <PDFPreview {...commonProps} {...previewConfig.pdf} />

            case FilePreviewType.VIDEO:
                return <VideoPreview {...commonProps} {...previewConfig.video} />

            case FilePreviewType.TEXT:
                return <TextPreview {...commonProps} {...previewConfig.text} />

            case FilePreviewType.MARKDOWN:
                return (
                    <EnhancedMarkdownPreview
                        src={src}
                        fileName={fileName}
                        fileSize={fileSize}
                        maxHeight={maxHeight}
                        showToolbar={true}
                        showSourceToggle={true}
                        defaultTheme="light"
                        onError={(error) => console.error('Markdown加载失败:', error)}
                        onLoad={(content) => console.log('Markdown加载成功，长度:', content.length)}
                    />
                )

            case FilePreviewType.AUDIO:
                return (
                    <div className="flex flex-col items-center justify-center p-8">
                        <audio controls className="w-full max-w-md" style={{ maxHeight: '60px' }}>
                            <source src={src} />
                            您的浏览器不支持音频播放
                        </audio>
                        <div className="mt-4 text-center">
                            <div className="text-sm font-medium text-gray-700">{fileName}</div>
                            {fileSize && (
                                <div className="text-xs text-gray-500 mt-1">
                                    {formatFileSize(fileSize)}
                                </div>
                            )}
                        </div>
                    </div>
                )

            case FilePreviewType.CODE:
                return (
                    <TextPreview {...commonProps} showLineNumbers={true} {...previewConfig.text} />
                )

            case FilePreviewType.OFFICE:
                return (
                    <div className="flex flex-col items-center justify-center p-8">
                        <Alert
                            message="Office文档预览"
                            description="此文件类型需要下载后使用相应软件打开"
                            type="info"
                            showIcon
                            className="mb-4"
                        />
                        <a
                            href={src}
                            download={fileName}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            点击下载文件
                        </a>
                    </div>
                )

            case FilePreviewType.ARCHIVE:
                return (
                    <div className="flex flex-col items-center justify-center p-8">
                        <Alert
                            message="压缩文件"
                            description="压缩文件无法在线预览，请下载后解压查看"
                            type="info"
                            showIcon
                            className="mb-4"
                        />
                        <a
                            href={src}
                            download={fileName}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            点击下载文件
                        </a>
                    </div>
                )

            default:
                return (
                    <Empty
                        image={<FileOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
                        description={
                            <div>
                                <div>不支持预览此文件类型</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {getFileTypeDisplayName(previewType)}
                                </div>
                            </div>
                        }
                    >
                        <a
                            href={src}
                            download={fileName}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            下载文件
                        </a>
                    </Empty>
                )
        }
    }

    /**
     * 格式化文件大小
     */
    const formatFileSize = (bytes: number): string => {
        const units = ['B', 'KB', 'MB', 'GB']
        let size = bytes
        let unitIndex = 0

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024
            unitIndex++
        }

        return `${size.toFixed(1)} ${units[unitIndex]}`
    }

    // 如果文件无法预览，显示提示信息
    if (!canPreview) {
        let errorMessage = '无法预览此文件'

        if (fileSize) {
            const sizeLimit = getPreviewSizeLimit(previewType)
            if (sizeLimit > 0 && fileSize > sizeLimit) {
                errorMessage = `文件过大，无法预览（限制${formatFileSize(sizeLimit)}）`
            }
        }

        return (
            <div className="flex flex-col items-center justify-center p-8">
                <Alert
                    message="文件预览限制"
                    description={errorMessage}
                    type="warning"
                    showIcon
                    className="mb-4"
                />
                <a href={src} download={fileName} className="text-blue-500 hover:text-blue-700">
                    点击下载文件
                </a>
            </div>
        )
    }

    return <div className="file-preview-wrapper h-full">{renderPreviewComponent()}</div>
}

export default FilePreview
