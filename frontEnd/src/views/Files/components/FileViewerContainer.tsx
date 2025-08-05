import React from 'react'
import { Empty } from 'antd'

interface FileInfo {
    url?: string
    name?: string
    mimeType?: string
}

interface IProps {
    fileInfo: FileInfo
}

const FileViewerContainer: React.FC<IProps> = ({ fileInfo }) => {
    const { url, name, mimeType } = fileInfo

    if (!url || !name) {
        return (
            <div className="flex items-center justify-center h-full">
                <Empty description="请选择文件进行预览" />
            </div>
        )
    }

    const renderFilePreview = () => {
        if (!mimeType) return null

        // 图片预览
        if (mimeType.startsWith('image/')) {
            return (
                <img
                    src={url}
                    alt={name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                    }}
                />
            )
        }

        // PDF预览
        if (mimeType === 'application/pdf') {
            return (
                <iframe
                    src={url}
                    title={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                />
            )
        }

        // 视频预览
        if (mimeType.startsWith('video/')) {
            return (
                <video
                    src={url}
                    controls
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                >
                    您的浏览器不支持视频播放
                </video>
            )
        }

        // 音频预览
        if (mimeType.startsWith('audio/')) {
            return (
                <audio
                    src={url}
                    controls
                    style={{
                        width: '100%',
                    }}
                >
                    您的浏览器不支持音频播放
                </audio>
            )
        }

        // 文本文件预览
        if (mimeType.startsWith('text/') || mimeType === 'application/json') {
            return (
                <iframe
                    src={url}
                    title={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid #d9d9d9',
                        borderRadius: '6px',
                    }}
                />
            )
        }

        // 其他文件类型显示下载链接
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p>无法预览此文件类型</p>
                <a
                    href={url}
                    download={name}
                    className="text-blue-500 hover:text-blue-700"
                >
                    点击下载文件
                </a>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="p-4 border-b">
                <h3 className="text-lg font-medium truncate" title={name}>
                    {name}
                </h3>
                <p className="text-sm text-gray-500">{mimeType}</p>
            </div>
            <div className="flex-1 p-4 overflow-auto">
                <div className="w-full h-full flex items-center justify-center">
                    {renderFilePreview()}
                </div>
            </div>
        </div>
    )
}

export default FileViewerContainer
