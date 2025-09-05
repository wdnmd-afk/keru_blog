import EmptyContainer from '@/components/EmptyContainer.tsx'
import ErrorState, { FileListError } from '@/components/Files/ErrorState'
import LoadingState, { FileListLoading } from '@/components/Files/LoadingState'
import KTable from '@/components/KTable.tsx'
import type { FileListProps, FileItem } from '@/types/files'
import { Button, Space, Tooltip } from 'antd'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import React from 'react'

/**
 * 文件列表组件
 * 展示文件列表、分页和操作功能
 */
const FileList: React.FC<FileListProps> = ({
    fileList,
    total,
    current,
    pageSize,
    loading = false,
    selectedFile,
    onRowClick,
    onFileSelect,
    onDelete,
    onPageChange,
    error, // 新增错误状态
    onRetry, // 新增重试回调
}) => {
    /**
     * 格式化文件大小
     * @param size 文件大小（字节）
     * @returns 格式化后的文件大小字符串
     */
    const formatFileSize = (size: number): string => {
        if (size < 1024) return `${size} B`
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
        return `${(size / (1024 * 1024)).toFixed(2)} MB`
    }

    /**
     * 格式化日期时间
     * @param dateTime 日期时间字符串
     * @returns 格式化后的日期时间
     */
    const formatDateTime = (dateTime: string): string => {
        return new Date(dateTime).toLocaleString('zh-CN')
    }

    const columns = [
        {
            title: '文件名称',
            key: 'filename',
            dataIndex: 'filename',
            width: '20%',
            ellipsis: true,
        },
        {
            title: '文件大小',
            key: 'size',
            dataIndex: 'size',
            width: '10%',
            render: (size: number) => formatFileSize(size),
        },
        {
            title: '文件类型',
            key: 'mimeType',
            dataIndex: 'mimeType',
            width: '15%',
            ellipsis: true,
        },
        {
            title: '上传时间',
            key: 'uploadedAt',
            dataIndex: 'uploadedAt',
            width: '15%',
            render: (dateTime: string) => formatDateTime(dateTime),
        },
        {
            title: '上传者',
            key: 'uploader',
            dataIndex: 'uploader',
            width: '12%',
            ellipsis: true,
        },
        {
            title: '操作',
            key: 'action',
            width: '15%',
            render: (_: unknown, record: FileItem) => (
                <Space size="small">
                    <Tooltip title="预览文件">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation()
                                // 触发文件选择，显示预览
                                onFileSelect?.(record)
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="删除文件">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(record)
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ]

    /**
     * 处理删除确认
     * @param record 文件记录
     */
    const handleDelete = (record: FileItem) => {
        try {
            onDelete?.(record)
        } catch (error) {
            console.error('Delete file failed:', error)
        }
    }

    /**
     * 处理行点击事件
     * @param record 文件记录
     */
    const handleRowClick = (record: FileItem) => {
        try {
            onRowClick?.(record)
        } catch (error) {
            console.error('Row click failed:', error)
        }
    }

    /**
     * 处理分页变化
     * @param page 页码
     * @param size 每页大小
     */
    const handlePageChange = (page: number, size: number) => {
        onPageChange?.(page, size)
    }

    return (
        <div className="file-list h-full flex flex-col">
            <div className="file-list-content flex-1 h-0">
                <EmptyContainer flag={fileList.length > 0}>
                    <KTable
                        columns={columns}
                        dataSource={fileList}
                        total={total}
                        pageSize={pageSize}
                        loading={loading}
                        rowKey="id"
                        rowClick={handleRowClick}
                        fetchData={handlePageChange}
                        className="w-full"
                        rowClassName={(record: FileItem) =>
                            selectedFile?.id === record.id ? 'selected-row' : ''
                        }
                    />
                </EmptyContainer>
            </div>
        </div>
    )
}

export default FileList
