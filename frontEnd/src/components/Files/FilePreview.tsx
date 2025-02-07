import React, { useEffect, useState } from 'react'
import EmptyContainer from '@/components/EmptyContainer.tsx'
import KTable from '@/components/KTable.tsx'
import { FileApi } from '@/api'

const FilePreview: React.FC = () => {
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
    }, [])
    return (
        <div flex h-full>
            <div flex-1 w-0 h-full flex-col>
                <div className={'boxTitle'}>文件列表</div>
                <div flex-1 h-0 mt-5>
                    <EmptyContainer flex-1 flag={fileList.length}>
                        <KTable
                            w-0
                            columns={column}
                            dataSource={fileList}
                            total={total}
                            pageSize={queryDto.pageSize}
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
