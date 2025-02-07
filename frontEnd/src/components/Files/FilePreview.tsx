import React, { useEffect, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import EmptyContainer from '@/components/EmptyContainer.tsx'
import KTable from '@/components/KTable.tsx'
import { Button } from 'antd'
import { FileApi } from '@/api'

const FilePreview: React.FC = () => {
    const [fileList, setFileList] = useState<any[]>([])
    const column = [
        {
            title: 'File Name',
            key: 'name',
        },
        {
            title: 'File Size（Bytes）',
            key: 'size',
        },
    ]
    const init = async () => {
        const res = await FileApi.queryFileList({ page: 1, pageSize: 100 })
        console.log(res, 'resss')
    }
    useEffect(() => {
        init()
    }, [])
    return (
        <div flex h-full>
            <div flex-1 w-0 h-full flex-col>
                <div className={'boxTitle'}>拖拽/点击上传区域</div>
                <div flex-1 h-0 mt-5>
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
            </div>
            <div flex-1 w-0 ml-5 flex-col>
                <div className={'boxTitle'}>待上传文件列表</div>
                <div flex-1 h-0 mt-5 flex-col></div>
            </div>
        </div>
    )
}

export default FilePreview
