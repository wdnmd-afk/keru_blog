import FileUpload from '@/components/Files/FileUpload'
import type { UploadFileItem } from '@/types/files'
import { useUpload } from '@/hooks/useUpload.ts'
import { message } from 'antd'
import React, { useState } from 'react'

/**
 * 文件上传页面组件
 * 提供文件上传功能
 */
const UploadTab: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFileItem[]>([])
    const [uploading, setUploading] = useState(false)
    const { upload } = useUpload()
    /**
     * 处理文件列表变化
     * @param newFileList 新的文件列表
     */
    const handleFileListChange = (newFileList: UploadFileItem[]) => {
        setFileList(newFileList)
    }

    /**
     * 处理文件上传
     * @param uploadFiles 要上传的文件列表
     */
    const handleUpload = async (uploadFiles: UploadFileItem[]) => {
        try {
            setUploading(true)
            
            // 更新文件状态为上传中
            setFileList(prevFileList => {
                return prevFileList.map(file => {
                    if (uploadFiles.some(uf => uf.uid === file.uid)) {
                        return { 
                            ...file, 
                            status: 'uploading' as const, 
                            percent: 0,
                            error: undefined // 清除之前的错误信息
                        }
                    }
                    return file
                })
            })
            
            // 转换为 UploadFile 格式
            const antdFileList = uploadFiles.map(file => ({
                uid: file.uid,
                name: file.name,
                size: file.size,
                type: file.type,
                originFileObj: file.originFileObj as any, // 临时转换类型
            }))
            
            await upload(antdFileList)
            
            // 更新文件状态为成功
            setFileList(prevFileList => {
                return prevFileList.map(file => {
                    if (uploadFiles.some(uf => uf.uid === file.uid)) {
                        return { 
                            ...file, 
                            status: 'success' as const, 
                            percent: 100,
                            error: undefined
                        }
                    }
                    return file
                })
            })
            
            message.success('上传成功')
            
            // 延迟清空文件列表，让用户看到成功状态
            setTimeout(() => {
                setFileList([])
            }, 2000)
            
        } catch (error) {
            console.error('Upload failed:', error)
            
            // 更新文件状态为失败
            setFileList(prevFileList => {
                return prevFileList.map(file => {
                    if (uploadFiles.some(uf => uf.uid === file.uid)) {
                        return { 
                            ...file, 
                            status: 'error' as const, 
                            error: '上传失败',
                            percent: 0 // 重置进度
                        }
                    }
                    return file
                })
            })
            
            message.error('上传失败，请重试')
        } finally {
            setUploading(false)
        }
    }

    /**
     * 处理文件移除
     * @param file 要移除的文件
     */
    const handleRemove = (file: UploadFileItem) => {
        console.log('File removed:', file.name)
    }

    return (
        <div className="h-full">
            <FileUpload
                fileList={fileList}
                uploading={uploading}
                onFileListChange={handleFileListChange}
                onUpload={handleUpload}
                onRemove={handleRemove}
            />
        </div>
    )
}

export default UploadTab
