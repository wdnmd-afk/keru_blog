import { FileApi } from '@/api'
import EmptyContainer from '@/components/EmptyContainer.tsx'
import KTable from '@/components/KTable.tsx'
import { MessageBox } from '@/utils'
import { Button, Input } from 'antd'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import FileViewerContainer from './FileViewerContainer.tsx'
interface IProps {
    changeKey: number
}

const FilePreview: React.FC<IProps> = ({ changeKey }) => {
    const [fileList, setFileList] = useState<any[]>([])

    // 使用useMemo优化列定义，避免每次渲染都重新创建
    const column = useMemo(() => [
        {
            title: '文件名称',
            key: 'filename',
            dataIndex: 'filename',
        },
        {
            title: '文件大小',
            key: 'size',
            dataIndex: 'size',
        },
        {
            title: '文件类型',
            key: 'mimeType',
            dataIndex: 'mimeType',
        },
        {
            title: '文件路径',
            key: 'path',
            dataIndex: 'path',
        },
        {
            title: '上传时间',
            key: 'uploadedAt',
            dataIndex: 'uploadedAt',
        },
        {
            title: '更新时间',
            key: 'updatedAt',
            dataIndex: 'updatedAt',
        },
        {
            title: '上传者',
            key: 'uploader',
            dataIndex: 'uploader',
        },
        {
            title: '操作',
            key: 'action',
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
    ], []) // 空依赖数组，因为列定义是静态的

    const [queryDto, setQueryDto] = useState({ page: 1, pageSize: 50 })
    const [total, setTotal] = useState(0)
    const [currentFileInfo, setCurrentFileInfo] = useState<any>({})

    const init = useCallback(async () => {
        const { data } = await FileApi.queryFileList(queryDto)
        setFileList(data.fileList)
        setTotal(data.total)
    }, [queryDto])

    useEffect(() => {
        init()
    }, [changeKey, init])

    const handleRowClick = useCallback((row: any) => {
        console.log(row, 'rrr')
        const baseUrl = 'http://localhost:2130'
        // 只有当选中的文件发生变化时才更新
        setCurrentFileInfo(prevInfo => {
            if (prevInfo.id === row.id) {
                return prevInfo // 如果是同一个文件，不更新状态，避免重新渲染
            }
            return {
                ...row,
                url: baseUrl + row.path,
            }
        })
    }, [])
    return (
        <div flex h-full>
            <div flex-1 w-0 h-full flex-col>
                <div className={'boxTitle'}>文件列表</div>
                <div f-ic p-2>
                    <Input
                        onInput={(e) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            setQueryDto((prevState) => ({ ...prevState, fileName: e.target.value }))
                        }}
                        placeholder="请输入文件名称"
                        mr-2
                    />
                    <Input
                        onInput={(e) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
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
                <div flex-1 h-0 flex-col>
                    <FileViewerContainer fileInfo={currentFileInfo}></FileViewerContainer>
                </div>
            </div>
        </div>
    )
}

export default FilePreview
