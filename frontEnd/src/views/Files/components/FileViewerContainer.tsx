import { Empty } from 'antd'
import React from 'react'
import FilePreview from './FilePreview'
import { getFilePreviewType, FilePreviewType } from '@/utils/filePreview'

interface FileInfo {
    url?: string
    name?: string
    mimeType?: string
    size?: number
}

interface IProps {
    fileInfo: FileInfo | null  // 允许null值
}

const FileViewerContainer: React.FC<IProps> = ({ fileInfo }) => {
    // 处理null值的情况
    if (!fileInfo) {
        return (
            <div className="flex items-center justify-center h-full">
                <Empty description="请选择文件进行预览" />
            </div>
        )
    }

    const { url, name, mimeType, size } = fileInfo

    if (!url || !name) {
        return (
            <div className="flex items-center justify-center h-full">
                <Empty description="请选择文件进行预览" />
            </div>
        )
    }

    // 获取文件预览类型
    const previewType = getFilePreviewType(name, mimeType)

    // 处理加载和错误回调
    const handleLoad = () => {
        console.log(`文件预览加载完成: ${name}`)
    }

    const handleError = (error: string) => {
        console.error(`文件预览失败: ${name}`, error)
    }

    // 根据文件类型显示不同的预览提示
    const getPreviewTypeText = (type: FilePreviewType): string => {
        const typeMap = {
            [FilePreviewType.IMAGE]: '图片',
            [FilePreviewType.PDF]: 'PDF文档',
            [FilePreviewType.VIDEO]: '视频',
            [FilePreviewType.AUDIO]: '音频',
            [FilePreviewType.TEXT]: '文本',
            [FilePreviewType.MARKDOWN]: 'Markdown',
            [FilePreviewType.CODE]: '代码',
            [FilePreviewType.OFFICE]: 'Office文档',
            [FilePreviewType.ARCHIVE]: '压缩文件',
            [FilePreviewType.UNKNOWN]: '未知类型'
        }
        return typeMap[type] || '未知类型'
    }

    return (
        <div className="w-full h-full bg-white">
            <FilePreview
                src={url}
                fileName={name}
                mimeType={mimeType}
                fileSize={size}
                showToolbar={true}
                maxWidth="100%"
                maxHeight="100%"
                onLoad={handleLoad}
                onError={handleError}
                previewConfig={{
                    image: {
                        showToolbar: true
                    },
                    pdf: {
                        initialScale: 1
                    },
                    video: {
                        autoPlay: false,
                        loop: false,
                        muted: false
                    },
                    text: {
                        encoding: 'utf-8',
                        showLineNumbers: true
                    },
                    markdown: {
                        showSourceToggle: true
                    }
                }}
            />
        </div>
    )
}

export default FileViewerContainer
