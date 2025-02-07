import React, { useState } from 'react'
import { List, message, Tabs, TabsProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import styles from '@/styles/files.module.scss'
import UploadTab from '@/components/Files/Upload.tsx'
import FilePreview from '@/components/Files/FilePreview.tsx'

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
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Upload',
            children: <UploadTab />,
        },
        {
            key: '2',
            label: 'File List',
            children: <FilePreview />,
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
        </div>
    )
}

export default Files
