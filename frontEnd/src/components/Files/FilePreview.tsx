import React, { useEffect, useState } from 'react'
import EmptyContainer from '@/components/EmptyContainer.tsx'
import KTable from '@/components/KTable.tsx'
import { FileApi } from '@/api'
import { Button, Input } from 'antd'
import { UploadFile } from 'antd/es/upload/interface'
import { MessageBox } from '@/utils'

interface IProps {
    changeKey: number
}

const FilePreview: React.FC<IProps> = ({ changeKey }) => {
    const [fileList, setFileList] = useState<any[]>([])
    const column = [
        {
            title: '文件名称',
            key: 'filename',
        },
        {
            title: '文件大小',
            key: 'size',
        },
        {
            title: '文件类型',
            key: 'mimeType',
        },
        {
            title: '文件路径',
            key: 'path',
        },
        {
            title: '上传时间',
            key: 'uploadedAt',
        },
        {
            title: '更新时间',
            key: 'updatedAt',
        },

        {
            title: '上传者',
            key: 'uploader',
        },
        {
            title: '操作',
            render: (file: any) => (
                <Button
                    onClick={() => {
                        MessageBox.confirm({
                            confirm: () => {
                                FileApi.deleteFile({ id: file.id }).then(() => {
                                    init()
                                })
                            },
                            content: '确定要删除该文件吗',
                        })
                    }}
                    type={'text'}
                >
                    删除
                </Button>
            ),
        },
    ]

    const init = async () => {
        const { data } = await FileApi.queryFileList(queryDto)
        setFileList(data.fileList)
        setTotal(data.total)
    }
    const [queryDto, setQueryDto] = useState({ page: 1, pageSize: 100 })
    const [total, setTotal] = useState(0)
    useEffect(() => {
        init()
    }, [changeKey])
    const handleRowClick = (row) => {
        console.log(row, 'rrr')
        // fetch(`http://localhost:3000${row.path}`)
    }
    return (
        <div flex h-full>
            <div flex-1 w-0 h-full flex-col>
                <div className={'boxTitle'}>文件列表</div>
                <div f-ic p-2>
                    <Input
                        onInput={(e) => {
                            setQueryDto((prevState) => ({ ...prevState, fileName: e.target.value }))
                        }}
                        placeholder="请输入文件名称"
                        mr-2
                    />
                    <Input
                        onInput={(e) => {
                            setQueryDto((prevState) => ({ ...prevState, userName: e.target.value }))
                        }}
                        placeholder="请输入上传者名称"
                        mr-2
                    />
                    <Button onClick={init}>搜索</Button>
                </div>
                <div flex-1 h-0 mt-2>
                    <EmptyContainer flex-1 flag={fileList.length}>
                        <KTable
                            w-0
                            columns={column}
                            dataSource={fileList}
                            total={total}
                            pageSize={queryDto.pageSize}
                            rowClick={(row) => handleRowClick(row)}
                        ></KTable>
                    </EmptyContainer>
                </div>
            </div>
            <div flex-1 w-0 ml-5 flex-col>
                <div className={'boxTitle'}>文件预览</div>
                <div flex-1 h-0 mt-5 flex-col></div>
            </div>
        </div>
    )
}

export default FilePreview
