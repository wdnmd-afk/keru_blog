import FileUpload from '@/components/Files/FileUpload'
import type { UploadFileItem } from '@/types/files'
import { useUpload, type UploadEvents } from '@/hooks/useUpload.ts'
import { useFileStore } from '@/store/fileStore'
import { message } from 'antd'
import React, { useEffect, useMemo } from 'react'

/**
 * 文件上传页面组件
 * 使用全局状态管理和优化后的useUpload Hook
 */
const UploadTab: React.FC = () => {
    // 使用全局状态管理
    const { 
        uploadFileList, 
        uploading,
        setUploadFileList,
        setUploading,
        updateUploadFileStatus,
        removeUploadFile,
        clearUploadList,
        refreshFileList // 关键：上传成功后刷新文件列表
    } = useFileStore()
    
    // 定义上传事件回调
    const uploadEvents: UploadEvents = useMemo(() => ({
        onStart: (fileName: string) => {
            console.log(`开始上传: ${fileName}`)
        },
        
        onProgress: (progress) => {
            console.log(`上传进度: ${progress.fileName} - ${progress.percentage}%`)
            
            // 根据文件名找到对应的文件项并更新进度
            const targetFile = uploadFileList.find(file => file.name === progress.fileName)
            if (targetFile) {
                updateUploadFileStatus(targetFile.uid, {
                    percent: progress.percentage,
                    status: 'uploading' as const
                })
            }
        },
        
        onSuccess: (fileName: string, fileHash: string) => {
            message.success(`${fileName} 上传成功！`)
        },
        
        onError: (error: string, fileName: string) => {
            message.error(`${fileName} 上传失败: ${error}`)
        },
        
        onComplete: async (fileName: string, success: boolean) => {
            if (success) {
                // 上传成功后立即刷新文件列表
                await refreshFileList()
            }
        },
        
        onMergeStart: (fileName: string) => {
            console.log(`开始合并文件: ${fileName}`)
        },
        
        onMergeComplete: (fileName: string) => {
            console.log(`文件合并完成: ${fileName}`)
        }
    }), [refreshFileList, uploadFileList, updateUploadFileStatus])
    
    const { 
        upload, 
        isUploading, 
        errors,
        clearErrors,
        resetProgress
    } = useUpload({}, uploadEvents)
    
    /**
     * 处理文件列表变化
     * @param newFileList 新的文件列表
     */
    const handleFileListChange = (newFileList: UploadFileItem[]) => {
        setUploadFileList(newFileList)
    }

    /**
     * 处理文件上传
     * @param uploadFiles 要上传的文件列表
     */
    const handleUpload = async (uploadFiles: UploadFileItem[]) => {
        try {
            setUploading(true)
            clearErrors() // 清除之前的错误
            
            // 更新文件状态为上传中
            uploadFiles.forEach(uploadFile => {
                updateUploadFileStatus(uploadFile.uid, {
                    status: 'uploading' as const,
                    percent: 0,
                    error: undefined
                })
            })
            
            // 转换为 UploadFile 格式
            const antdFileList = uploadFiles.map(file => ({
                uid: file.uid,
                name: file.name,
                size: file.size,
                type: file.type,
                originFileObj: file.originFileObj as any,
            }))
            
            // 使用优化后的upload方法，UI副作用由事件回调处理
            await upload(antdFileList)
            
            // 延迟清空文件列表，让用户看到成功状态
            setTimeout(() => {
                clearUploadList()
                resetProgress()
            }, 2000)
            
        } catch (error) {
            console.error('Upload failed:', error)
            
            // 更新文件状态为失败
            uploadFiles.forEach(uploadFile => {
                updateUploadFileStatus(uploadFile.uid, {
                    status: 'error' as const,
                    error: '上传失败',
                    percent: 0
                })
            })
            
        } finally {
            setUploading(false)
        }
    }

    /**
     * 处理文件移除
     * @param file 要移除的文件
     */
    const handleRemove = (file: UploadFileItem) => {
        removeUploadFile(file.uid)
        console.log('File removed:', file.name)
    }

    return (
        <div className="h-full">
            <FileUpload
                fileList={uploadFileList}
                uploading={uploading}
                onFileListChange={handleFileListChange}
                onUpload={handleUpload}
                onRemove={handleRemove}
            />
        </div>
    )
}

export default UploadTab
