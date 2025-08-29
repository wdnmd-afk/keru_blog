import { FileApi } from '@/api'
import FileList from '@/components/Files/FileList'
import FileSearch from '@/components/Files/FileSearch'
import type { FileItem, FileQuery } from '@/types/files'
import { MessageBox } from '@/utils'
import React, { useEffect, useState } from 'react'
import FileViewerContainer from './components/FileViewerContainer'

/**
 * 文件预览页面组件Props
 */
interface IProps {
    /** 变化键值，用于触发刷新 */
    changeKey: number
}

/**
 * 文件预览页面组件
 * 提供文件搜索、列表展示和预览功能
 */
const FilePreview: React.FC<IProps> = ({ changeKey }) => {
    // 状态管理
    const [fileList, setFileList] = useState<FileItem[]>([])
    const [currentFileInfo, setCurrentFileInfo] = useState<any>({})
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState<FileQuery>({
        page: 1,
        pageSize: 10,
        fileName: '',
        userName: '',
    })

    /**
     * 初始化文件列表
     */
    const init = async () => {
        try {
            setLoading(true)
            const { data } = await FileApi.queryFileList(query)
            setFileList(data.fileList)
            setTotal(data.total)
        } catch (error) {
            console.error('Failed to fetch file list:', error)
            setFileList([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }

    /**
     * 处理行点击事件
     * @param file 点击的文件项
     */
    const handleRowClick = (file: FileItem) => {
        setCurrentFileInfo({
            url: `http://localhost:3000/static/files/${file.filename}`,
            name: file.filename,
            mimeType: file.mimeType,
            size: file.size,
            id: file.id,
        })
    }

    /**
     * 处理文件删除
     * @param file 要删除的文件
     */
    const handleDelete = (file: FileItem) => {
        MessageBox.confirm({
            confirm: async () => {
                try {
                    await FileApi.deleteFile({ id: file.id })
                    await init() // 刷新列表
                    // 如果删除的是当前预览的文件，清空预览
                    if (currentFileInfo.id === file.id) {
                        setCurrentFileInfo({})
                    }
                } catch (error) {
                    console.error('Failed to delete file:', error)
                }
            },
            content: `确定要删除文件 "${file.filename}" 吗？`,
        })
    }

    /**
     * 处理搜索
     * @param searchQuery 搜索条件
     */
    const handleSearch = (searchQuery: FileQuery) => {
        setQuery(searchQuery)
    }

    /**
     * 处理分页变化
     * @param page 页码
     * @param pageSize 每页大小
     */
    const handlePageChange = (page: number, pageSize: number) => {
        setQuery(prev => ({ ...prev, page, pageSize }))
    }

    // 副作用钩子
    useEffect(() => {
        init()
    }, [changeKey, query.page, query.pageSize, query.fileName, query.userName])

    return (
        <div className="flex h-full gap-5">
            {/* 左侧：文件搜索和列表 */}
            <div className="flex-1 h-full flex flex-col w-0">
                <div className="boxTitle">文件列表</div>
                
                {/* 搜索区域 */}
                <FileSearch
                    value={query}
                    onSearch={handleSearch}
                    loading={loading}
                />
                
                {/* 文件列表 */}
                <div className="flex-1 h-0">
                    <FileList
                        fileList={fileList}
                        total={total}
                        current={query.page}
                        pageSize={query.pageSize}
                        loading={loading}
                        selectedFile={currentFileInfo.id ? fileList.find(f => f.id === currentFileInfo.id) : undefined}
                        onRowClick={handleRowClick}
                        onDelete={handleDelete}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            
            {/* 右侧：文件预览 */}
            <div className="flex-1 h-full flex flex-col">
                <div className="boxTitle">文件预览</div>
                <div className="flex-1 h-0">
                    <FileViewerContainer fileInfo={currentFileInfo} />
                </div>
            </div>
        </div>
    )
}

export default FilePreview
