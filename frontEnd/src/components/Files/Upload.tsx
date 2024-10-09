import React from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

interface UploadTabProps {
    onUpload: (info: any) => void;
}


const UploadTab: React.FC<UploadTabProps> = ({ onUpload }) => {
    return (
        <Dragger
            multiple
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={onUpload}
            style={{ height: '100%' }}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
    )
}

export default UploadTab