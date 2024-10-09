import React, { useState } from 'react'
import { List, message, Tabs, TabsProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import styles from '@/styles/files.module.scss'
import UploadTab from '@/components/Files/Upload.tsx'

interface FileListTabProps {
    files: UploadFile[]
    onFileSelect: (file: UploadFile) => void
}

const FileListTab: React.FC<FileListTabProps> = ({ files, onFileSelect }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={files}
            renderItem={(item) => (
                <List.Item onClick={() => onFileSelect(item)}>
                    <List.Item.Meta title={item.name} description={`Size: ${item.size} bytes`} />
                </List.Item>
            )}
        />
    )
}

const Files: React.FC = () => {
    const [files, setFiles] = useState<UploadFile[]>([])
    const [selectedFile, setSelectedFile] = useState<UploadFile | null>(null)

    const handleUpload = (info: any) => {
        const { status } = info.file
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
            setFiles([...files, info.file])
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    }

    const handleFileSelect = (file: UploadFile) => {
        setSelectedFile(file)
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Upload',
            children: <UploadTab onUpload={handleUpload} />,
        },
        {
            key: '2',
            label: 'File List',
            children: <FileListTab files={files} onFileSelect={handleFileSelect} />,
        },
    ]

    return (
        <div className={styles.file_container}>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                />
            </div>
            <div style={{ padding: '20px' }}>
                {selectedFile ? (
                    <div>
                        <h2>File Preview</h2>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Size: {selectedFile.size} bytes</p>
                        {/* Add more preview logic here based on file type */}
                    </div>
                ) : (
                    <div flex items-center justify-center h-full>
                        Select a file to preview
                    </div>
                )}
            </div>
        </div>
    )
}

export default Files
