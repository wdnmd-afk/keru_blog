import EmptyContainer from '@/components/EmptyContainer.tsx'
import { getFileType } from '@/enum'
import type { FileInfo, ViewerComponentProps } from '@/types/files'
import { Spin } from 'antd'
import React, { Suspense, useState } from 'react'
import { createIncludeComparator } from '@/utils/memoComparator'
import ImageViewer from './ImageViewer'
import UnsupportedViewer from './UnsupportedViewer.tsx'

// 使用 React.lazy 实现 PDFViewer 的代码分割
const PDFViewer = React.lazy(() => import('./PDFViewer'))

/**
 * 文件预览容器组件Props
 */
interface FileViewerContainerProps {
    /** 文件信息 */
    fileInfo: FileInfo
}

/**
 * 文件预览容器组件
 * 根据文件类型动态加载相应的预览组件
 * @param fileInfo 文件信息
 */
function FileViewerContainer({ fileInfo }: FileViewerContainerProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0) // 适用于音视频
    const type = getFileType(fileInfo.mimeType)
    const getViewerComponent = () => {
        switch (type) {
            case 'IMAGE':
                return ImageViewer
            case 'PDF':
                // 返回一个包装组件，内部使用 Suspense 加载 PDFViewer
                return (props: ViewerComponentProps) => (
                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center h-full">
                                <Spin size="large" tip="加载 PDF 预览组件中..." />
                            </div>
                        }
                    >
                        <PDFViewer {...props} />
                    </Suspense>
                )
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

// 使用React.memo优化组件，只有当fileInfo发生变化时才重新渲染
export default React.memo(FileViewerContainer, createIncludeComparator<FileViewerContainerProps>([
    'fileInfo'
], false, {
    // 自定义比较fileInfo对象
    fileInfo: (prev, next) => {
        return prev?.id === next?.id && prev?.url === next?.url
    }
}))
