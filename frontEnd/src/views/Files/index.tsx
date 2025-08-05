import React from 'react'
import { Tabs, TabsProps } from 'antd'
import styles from '@/styles/files.module.scss'
import Upload from './Upload'
import FilePreview from './FilePreview'

const Files: React.FC = () => {
    const [changeKey, setChangeKey] = React.useState(1)
    const handleChange = (key: string) => {
        if (key === '2') {
            setChangeKey(changeKey + 1)
        }
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '文件上传',
            children: <Upload />,
        },
        {
            key: '2',
            label: '文件列表',
            children: <FilePreview changeKey={changeKey} />,
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
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Files
