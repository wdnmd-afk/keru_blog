import EmptyContainer from '@/components/EmptyContainer.tsx'
import KTable from '@/components/KTable.tsx'
import type { FileUploadProps, UploadFileItem, UploadStatusType } from '@/types/files'
import { InboxOutlined } from '@ant-design/icons'
import { Button, Progress, Upload, UploadProps, message } from 'antd'
import { UploadFile } from 'antd/es/upload/interface'
import React from 'react'

const { Dragger } = Upload

/**
 * 文件上传组件
 * 提供拖拽上传、文件列表管理和批量上传功能
 */
const FileUpload: React.FC<FileUploadProps> = ({
    fileList,
    uploading = false,
    onFileListChange,
    onUpload,
    onRemove,
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
     * 获取状态标签颜色
     * @param status 上传状态
     * @returns 状态颜色
     */
    const getStatusColor = (status?: UploadStatusType): string => {
        switch (status) {
            case 'success':
                return '#52c41a'
            case 'error':
                return '#ff4d4f'
            case 'uploading':
                return '#1890ff'
            case 'paused':
                return '#faad14'
            default:
                return '#d9d9d9'
        }
    }

    /**
     * 获取状态文本
     * @param status 上传状态
     * @returns 状态文本
     */
    const getStatusText = (status?: UploadStatusType): string => {
        switch (status) {
            case 'success':
                return '上传成功'
            case 'error':
                return '上传失败'
            case 'uploading':
                return '上传中'
            case 'paused':
                return '已暂停'
            case 'pending':
                return '等待上传'
            default:
                return '等待上传'
        }
    }

    /**
     * 上传配置
     */
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        beforeUpload: (file: UploadFile) => {
            // 检查文件对象的完整性
            if (!file || !file.name) {
                console.error('Invalid file object:', file)
                message.error('文件对象无效')
                return false
            }

            // 检查文件大小（限制500MB）
            const maxSize = 500 * 1024 * 1024
            if (file.size && file.size > maxSize) {
                message.error(`文件 ${file.name} 超过500MB限制`)
                return false
            }

            // 检查文件是否为空
            if (file.size === 0) {
                message.error(`文件 ${file.name} 为空文件`)
                return false
            }

            // 检查是否重复
            const isDuplicate = fileList.some(
                (item) => item.name === file.name && item.size === file.size
            )

            if (isDuplicate) {
                message.warning(`文件 ${file.name} 已存在`)
                return false
            }

            // 添加到文件列表
            const newFile: UploadFileItem = {
                uid: `${Date.now()}-${Math.random()}`,
                name: file.name,
                size: file.size || 0,
                type: file.type || '',
                originFileObj: file as unknown as File,
                status: 'pending' as UploadStatusType,
                percent: 0, // 确保有默认值
                error: undefined, // 明确设置为 undefined
            }

            console.log('Adding new file:', newFile) // 添加调试日志
            onFileListChange([...fileList, newFile])
            return false // 阻止自动上传
        },
        onDrop: (e) => {
            console.log('Dropped files', e.dataTransfer.files)
        },
    }

    /**
     * 移除文件
     * @param file 要移除的文件
     */
    const handleRemove = (file: UploadFileItem) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid)
        onFileListChange(newFileList)
        onRemove?.(file)
    }

    /**
     * 开始上传
     */
    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.error('请选择文件')
            return
        }

        const pendingFiles = fileList.filter((file) => {
            const status = file.status || 'pending'
            return status === 'pending' || status === 'error'
        })

        if (pendingFiles.length === 0) {
            message.info('没有需要上传的文件')
            return
        }

        try {
            await onUpload(pendingFiles)
        } catch (error) {
            console.error('Upload failed:', error)
            message.error('上传失败，请重试')
        }
    }

    /**
     * 清空文件列表
     */
    const handleClear = () => {
        onFileListChange([])
    }

    const columns = [
        {
            title: '文件名称',
            key: 'name',
            dataIndex: 'name',
            width: '30%',
            ellipsis: true,
        },
        {
            title: '文件大小',
            key: 'size',
            dataIndex: 'size',
            width: '15%',
            render: (size: number, record: UploadFileItem, index: number) => {
                // 确保 size 是数字类型
                const fileSize = typeof size === 'number' ? size : record?.size || 0
                return formatFileSize(fileSize)
            },
        },
        {
            title: '文件类型',
            key: 'type',
            dataIndex: 'type',
            width: '15%',
            ellipsis: true,
        },
        {
            title: '上传进度',
            key: 'progress',
            width: '20%',
            render: (_: unknown, record: UploadFileItem, index: number) => {
                // 确保record存在并且percent有默认值，避免undefined错误
                if (!record) {
                    console.warn('Record is undefined in progress render function:', {
                        _,
                        record,
                        index,
                    })
                    return <span>-</span>
                }

                const percent = record.percent ?? 0
                const status = record.status || 'pending'

                return (
                    <div className="flex items-center gap-2">
                        <Progress
                            percent={percent}
                            size="small"
                            status={status === 'error' ? 'exception' : 'normal'}
                            showInfo={false}
                            strokeColor={getStatusColor(status)}
                        />
                        <span className="text-xs" style={{ color: getStatusColor(status) }}>
                            {getStatusText(status)}
                        </span>
                    </div>
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            width: '10%',
            render: (_: unknown, record: UploadFileItem, index: number) => {
                // 确保record存在，避免undefined错误
                if (!record) {
                    console.warn('Record is undefined in action render function:', {
                        _,
                        record,
                        index,
                    })
                    return <span>-</span>
                }

                const status = record.status || 'pending'
                return (
                    <Button
                        type="text"
                        size="small"
                        onClick={() => handleRemove(record)}
                        disabled={uploading && status === 'uploading'}
                    >
                        删除
                    </Button>
                )
            },
        },
    ]

    return (
        <div className="file-upload h-full flex">
            {/* 上传区域 */}
            <div className="flex-1 h-full flex flex-col">
                <div className="boxTitle">拖拽/点击上传区域</div>
                <div className="flex-1 h-0 mt-5">
                    <Dragger {...uploadProps} className="h-full">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text font-bold text-lg">
                            点击上传或者拖拽文件到此区域上传！
                        </p>
                        <p className="ant-upload-hint">支持单个或批量上传，文件大小限制500MB</p>
                    </Dragger>
                </div>
            </div>

            {/* 文件列表区域 */}
            <div className="flex-1 h-full ml-5 flex flex-col w-0">
                <div className="boxTitle flex justify-between items-center">
                    <span>待上传文件列表</span>
                    <div className="flex gap-2">
                        <Button
                            size="small"
                            onClick={handleClear}
                            disabled={fileList.length === 0 || uploading}
                        >
                            清空
                        </Button>
                        <span className="text-sm text-gray-500">共 {fileList.length} 个文件</span>
                    </div>
                </div>

                <div className="flex-1 h-0 mt-5 flex flex-col">
                    <EmptyContainer flag={fileList.length > 0}>
                        <KTable
                            columns={columns}
                            dataSource={fileList}
                            rowKey="uid"
                            total={0}
                            pageSize={0}
                            pagination={false}
                            className="w-full"
                        />
                    </EmptyContainer>
                </div>

                {/* 上传按钮 */}
                <div className="mt-4">
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        loading={uploading}
                        disabled={fileList.length === 0}
                        className="w-full"
                        size="large"
                    >
                        {uploading ? '上传中...' : '开始上传'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FileUpload
