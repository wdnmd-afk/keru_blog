import EmptyContainer from '@/components/EmptyContainer.tsx'
import { FileInfo } from '@/components/Files/dto.ts'
import { getFileType } from '@/enum'
import { useState } from 'react'
import ImageViewer from './ImageViewer'
import PDFViewer from './PDFViewer'
import UnsupportedViewer from './UnsupportedViewer.tsx'

interface FileViewerContainerProps {
    fileInfo: FileInfo
}

export default function FileViewerContainer({ fileInfo }: FileViewerContainerProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0) // 适用于音视频
    const type = getFileType(fileInfo.mimeType)
    const getViewerComponent = () => {
        switch (type) {
            case 'IMAGE':
                return ImageViewer
            case 'PDF':
                return PDFViewer
            /*case 'video':
                return VideoViewer
            case 'audio':
                return AudioViewer*/
            default:
                return UnsupportedViewer
        }
    }

    const ViewerComponent = getViewerComponent()

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
                    <ViewerComponent url={fileInfo.url} fileInfo={fileInfo} />
                </EmptyContainer>
            </div>
        </div>
    )
}
