import { useState } from 'react'
import ImageViewer from './ImageViewer'
import UnsupportedViewer from './UnsupportedViewer.tsx'
import EmptyContainer from '@/components/EmptyContainer.tsx'
import { getFileType } from '@/enum'
export type FileType = 'image' | 'pdf' | 'video' | 'audio' | 'unsupported'

interface FileViewerContainerProps {
    fileInfo: {
        url: string
        type: FileType
        name: string
        mimeType: string
    }
}

export default function FileViewerContainer({ fileInfo }: FileViewerContainerProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0) // 适用于音视频
    const type = getFileType(fileInfo.mimeType)
    const getViewerComponent = () => {
        switch (type) {
            case 'IMAGE':
                return ImageViewer
            /*case 'pdf':
                return PDFViewer
            case 'video':
                return VideoViewer
            case 'audio':
                return AudioViewer*/
            default:
                return UnsupportedViewer
        }
    }

    const ViewerComponent = getViewerComponent()

    const handleDownload = () => {
        // 通用下载逻辑
        const link = document.createElement('a')
        link.href = fileInfo.url
        link.download = fileInfo.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className={`viewer-container ${isFullscreen ? 'fullscreen' : ''} h-full bg-white`}>
            {/* <Toolbar
                title={fileInfo.name}
                onClose={onClose}
                onDownload={handleDownload}
                onFullscreen={() => setIsFullscreen(!isFullscreen)}
                extraControls={
                    fileInfo.type === 'video' || fileInfo.type === 'audio' ? (
                        <TimeControls currentTime={currentTime} />
                    ) : null
                }
            />*/}
            <div className="h-full">
                <EmptyContainer flag={fileInfo.url}>
                    <ViewerComponent url={fileInfo.url} />
                </EmptyContainer>
            </div>
        </div>
    )
}
