/**
 * 文件预览模态框组件
 * 提供全屏文件预览功能
 */

import { getFilePreviewType, getFileTypeDisplayName } from '@/utils/filePreview'
import { Modal } from 'antd'
import React from 'react'
import FilePreview from './FilePreview'

export interface FilePreviewModalProps {
    /** 是否显示模态框 */
    visible: boolean
    /** 关闭模态框回调 */
    onClose: () => void
    /** 文件信息 */
    fileInfo: {
        /** 文件URL */
        url: string
        /** 文件名 */
        name: string
        /** 文件MIME类型 */
        mimeType?: string
        /** 文件大小 */
        size?: number
    } | null
    /** 模态框标题 */
    title?: string
    /** 模态框宽度 */
    width?: number | string
    /** 模态框高度 */
    height?: number | string
    /** 是否可以通过点击遮罩关闭 */
    maskClosable?: boolean
    /** 是否显示关闭按钮 */
    closable?: boolean
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
    visible,
    onClose,
    fileInfo,
    title,
    width = '90vw',
    height = '85vh',
    maskClosable = true,
    closable = true,
}) => {
    /**
     * 获取模态框标题
     */
    const getModalTitle = (): string => {
        if (title) return title

        if (!fileInfo) return '文件预览'

        const previewType = getFilePreviewType(fileInfo.name, fileInfo.mimeType)
        const typeDisplayName = getFileTypeDisplayName(previewType)

        return `${typeDisplayName}预览 - ${fileInfo.name}`
    }

    /**
     * 处理预览加载成功
     */
    const handlePreviewLoad = () => {
        console.log('文件预览加载成功:', fileInfo?.name)
    }

    /**
     * 处理预览加载失败
     */
    const handlePreviewError = (error: string) => {
        console.error('文件预览失败:', fileInfo?.name, error)
    }

    /**
     * 处理模态框关闭
     */
    const handleModalClose = () => {
        onClose()
    }

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

    return (
        <Modal
            title={getModalTitle()}
            open={visible}
            onCancel={handleModalClose}
            footer={null}
            width={width}
            style={{
                top: '5vh',
                paddingBottom: 0,
            }}
            styles={{
                body: {
                    height: height,
                    padding: 0,
                    overflow: 'hidden',
                },
            }}
            maskClosable={maskClosable}
            closable={closable}
            destroyOnClose={true}
            centered={false}
        >
            {fileInfo ? (
                <div className="w-full h-full">
                    <FilePreview
                        src={fileInfo.url}
                        fileName={fileInfo.name}
                        mimeType={fileInfo.mimeType}
                        fileSize={fileInfo.size}
                        showToolbar={true}
                        maxWidth="100%"
                        maxHeight="100%"
                        onLoad={handlePreviewLoad}
                        onError={handlePreviewError}
                        previewConfig={{
                            image: {
                                showToolbar: true,
                            },
                            pdf: {
                                initialScale: 1,
                            },
                            video: {
                                autoPlay: false,
                                loop: false,
                                muted: false,
                            },
                            text: {
                                encoding: 'utf-8',
                                showLineNumbers: true,
                            },
                            markdown: {
                                showSourceToggle: true,
                            },
                        }}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="text-gray-400 text-lg mb-2">没有选择文件</div>
                        <div className="text-gray-500 text-sm">请选择要预览的文件</div>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default FilePreviewModal
