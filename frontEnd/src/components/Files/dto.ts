interface FileInfo {
    url: string
    name: string
    mimeType: string
}
interface ViewerComponentProps {
    url: string
    fileInfo?: FileInfo
}

export type { FileInfo, ViewerComponentProps }
