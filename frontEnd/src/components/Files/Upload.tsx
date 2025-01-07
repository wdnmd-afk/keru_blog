import React, { useEffect, useState } from 'react'
import { Button, Upload, UploadProps } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useUpload } from '@/hooks/useUpload.ts'
import { UploadFile } from 'antd/es/upload/interface'
import EmptyContainer from '@/components/EmptyContainer.tsx'

const { Dragger } = Upload

const UploadTab: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [uploading, setUploading] = useState(false)
    const { upload } = useUpload()
    const handleUpload = async () => {
        await upload(fileList)
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
    useEffect(() => {
        console.log(fileList, 'file')
    }, [fileList])

    return (
        <div flex h-full>
            <div flex-1 h-full flex-col>
                {/* <div flex items-center>
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        mr-10
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </div>*/}
                <div className={'boxTitle'}>拖拽/点击上传区域</div>
                <div flex-1 h-0 mt-5>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>
                </div>
            </div>
            <div flex-1 ml-5 flex-col>
                <div className={'boxTitle'}>待上传文件列表</div>
                <div flex-1 h-0 mt-5>
                    <EmptyContainer flag={fileList.length}>
                        <table w-full text-align-center className={'text-[16px]'}>
                            <thead>
                                <tr>
                                    <th className={'text-[18px] font-bold'}>File Name</th>
                                    <th className={'text-[18px] font-bold'}>File Size(bytes)</th>
                                    <th className={'text-[18px] font-bold'}>Operate</th>
                                </tr>
                            </thead>
                            {fileList.map((file) => (
                                <tr>
                                    <td>{file.name}</td>
                                    <td>{file.size} </td>
                                    <td>
                                        <Button
                                            onClick={() => {
                                                setFileList((prevState) => {
                                                    console.log(prevState, 'r')
                                                    return prevState.filter(
                                                        (item) => item.uid !== file.uid
                                                    )
                                                })
                                            }}
                                            type={'text'}
                                            danger
                                        >
                                            删除
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </EmptyContainer>
                </div>
            </div>
        </div>
    )
}

export default UploadTab
