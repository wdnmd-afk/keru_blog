import FileList from '@/components/Files/FileList'
import FileSearch from '@/components/Files/FileSearch'
import { useFileStore } from '@/store/fileStore'
import type { FileItem, FileQuery } from '@/types/files'
import React, { useEffect, useState } from 'react'
import FilePreviewModal from './components/FilePreviewModal'
import FileViewerContainer from './components/FileViewerContainer'

/**
 * 文件预览页面组件Props
 */
interface IProps {
    /** 变化键值，用于触发刷新（即将被移除） */
    changeKey?: number
}

/**
 * 文件预览页面组件
 * 使用全局状态管理，提供文件搜索、列表展示和预览功能
 */
const FilePreview: React.FC<IProps> = ({ changeKey }) => {
    // 使用全局状态管理
    const {
        fileList,
        total,
        loading,
        error,
        query,
        selectedFile,
        currentFileInfo,
        fetchFileList,
        updateQuery,
        selectFile,
        deleteFile,
    } = useFileStore()

    // 预览模态框状态
    const [previewModalVisible, setPreviewModalVisible] = useState(false)
    const [previewFileInfo, setPreviewFileInfo] = useState<{
        url: string
        name: string
        mimeType?: string
        size?: number
    } | null>(null)

    /**
     * 处理行点击事件
     * @param file 点击的文件项
     */
    const handleRowClick = (file: FileItem) => {
        selectFile(file)
    }

    /**
     * 处理文件预览（模态框方式）
     * @param file 要预览的文件
     */
    const handleFilePreview = (file: FileItem) => {
        // 构建文件预览信息
        const fileInfo = {
            url: file.path || '',
            name: file.filename || '',
            mimeType: file.mimeType,
            size: file.size,
        }

        setPreviewFileInfo(fileInfo)
        setPreviewModalVisible(true)
    }

    /**
     * 关闭预览模态框
     */
    const handleClosePreviewModal = () => {
        setPreviewModalVisible(false)
        setPreviewFileInfo(null)
    }

    /**
     * 处理文件删除
     * @param file 要删除的文件
     */
    const handleDelete = async (file: FileItem) => {
        // 参数验证
        if (!file) {
            console.error('Delete file failed: file is undefined')
            return
        }

        if (!file.id) {
            console.error('Delete file failed: file.id is undefined', file)
            return
        }

        try {
            await deleteFile(file.id)
        } catch (error) {
            console.error('Failed to delete file:', error)
        }
    }

    /**
     * 处理搜索
     * @param searchQuery 搜索条件
     */
    const handleSearch = (searchQuery: FileQuery) => {
        // 更新查询参数会自动触发数据获取
        updateQuery(searchQuery)
    }

    /**
     * 处理分页变化
     * @param page 页码
     * @param pageSize 每页大小
     */
    const handlePageChange = (page: number, pageSize: number) => {
        updateQuery({ page, pageSize })
    }

    // 组件初始化时获取文件列表
    useEffect(() => {
        fetchFileList()
    }, [])

    // 兼容旧的changeKey机制（在后续优化中会被移除）
    useEffect(() => {
        if (changeKey && changeKey > 1) {
            fetchFileList()
        }
    }, [changeKey])

    return (
        <div className="flex h-full gap-5">
            {/* 左侧：文件搜索和列表 */}
            <div className="flex-1 h-full flex flex-col w-0">
                <div className="boxTitle">文件列表</div>

                {/* 搜索区域 */}
                <FileSearch value={query} onSearch={handleSearch} loading={loading} />

                {/* 文件列表 */}
                <div className="flex-1 h-0">
                    <FileList
                        fileList={fileList}
                        total={total}
                        current={query.page}
                        pageSize={query.pageSize}
                        loading={loading}
                        error={error || undefined}
                        selectedFile={selectedFile || undefined}
                        onRowClick={handleRowClick}
                        onFileSelect={handleFilePreview}
                        onDelete={handleDelete}
                        onPageChange={handlePageChange}
                        onRetry={() => fetchFileList()}
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

            {/* 文件预览模态框 */}
            <FilePreviewModal
                visible={previewModalVisible}
                onClose={handleClosePreviewModal}
                fileInfo={previewFileInfo}
            />
        </div>
    )
}

export default FilePreview
