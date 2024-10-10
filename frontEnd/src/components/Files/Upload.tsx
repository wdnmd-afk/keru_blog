import React, { useState } from 'react'
import { Button, GetProp, Upload, UploadFile, UploadProps } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { FileApi } from '@/api'

const { Dragger } = Upload
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

interface UploadTabProps {
    onUpload: (info: any) => void
}

const UploadTab: React.FC<UploadTabProps> = ({ onUpload }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [uploading, setUploading] = useState(false)

    const handleUpload = () => {
        const formData = new FormData()
        fileList.forEach((file) => {
            formData.append('files[]', file as FileType)
        })
        console.log(fileList, 'file')
        setUploading(true)
    }
    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            setFileList(newFileList)
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file])

            return false
        },
        fileList,
    }
    const test = async () => {
        const { data } = await FileApi.test({ user: 1 })
        console.log(data, 'dd')
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div flex items-center>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    mr-10
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
                <Button type="primary" onClick={test}>
                    测试
                </Button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </div>
        </div>
    )
}

export default UploadTab
