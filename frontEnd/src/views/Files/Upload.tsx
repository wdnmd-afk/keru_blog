import EmptyContainer from '@/components/EmptyContainer.tsx'
import KTable from '@/components/KTable.tsx'
import { useUpload } from '@/hooks/useUpload.ts'
import { InboxOutlined } from '@ant-design/icons'
import { Button, message, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload/interface'
import React, { useState } from 'react'

const { Dragger } = Upload

const UploadTab: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [uploading, setUploading] = useState(false)
    const { upload } = useUpload()
    const handleUpload = async () => {
        if (fileList.length === 0) return message.error('请选择文件')
        await upload(fileList)
        message.success('上传成功')
        setFileList([])
    }

    const props: UploadProps = {
        onRemove: (file: UploadFile) => {
            setFileList(fileList.filter((item: any) => item.uid !== file.uid))
        },
        beforeUpload: (file) => {
            if (file.size === 0) return false
            setFileList([file, ...fileList])
            return false
        },
        multiple: true,
        showUploadList: false,
        style: { height: '100%' },
    }

    const column = [
        {
            title: '文件名称',
            key: 'name',
        },
        {
            title: '文件大小',
            key: 'size',
            render: (file: any) => {
                const size = file.size
                if (size < 1024) return `${size} B`
                if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
                return `${(size / (1024 * 1024)).toFixed(2)} MB`
            },
        },
        {
            title: '文件类型',
            key: 'type',
        },
        {
            title: '操作',
            render: (file: any) => (
                <Button
                    onClick={() => {
                        setFileList(fileList.filter((item: any) => item.uid !== file.uid))
                    }}
                    type={'text'}
                >
                    删除
                </Button>
            ),
        },
    ]

    return (
        <div flex h-full>
            <div flex-1 w-0 h-full flex-col>
                <div className={'boxTitle'}>拖拽/点击上传区域</div>
                <div flex-1 h-0 mt-5>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text font-bold text-[18px]">
                            点击上传或者拖拽文件到此区域上传！！！
                        </p>
                    </Dragger>
                </div>
            </div>
            <div flex-1 w-0 ml-5 flex-col>
                <div className={'boxTitle flex '}>
                    <div>待上传文件列表</div>
                </div>
                <div flex-1 h-0 mt-5 flex-col>
                    <EmptyContainer flex-1 flag={fileList.length}>
                        <KTable
                            w-0
                            columns={column}
                            dataSource={fileList}
                            rowKey={'uid'}
                            total={0}
                            pageSize={0}
                        ></KTable>
                    </EmptyContainer>
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        loading={uploading}
                        variant={'outlined'}
                        w-full
                    >
                        {uploading ? '上传中' : '开始上传'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UploadTab
