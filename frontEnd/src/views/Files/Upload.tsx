import FileUpload from '@/components/Files/FileUpload'
import type { UploadFileItem } from '@/types/files'
import { useUpload, type UploadEvents } from '@/hooks/useUpload.ts'
import { useFileStore } from '@/store/fileStore'
import { message } from 'antd'
import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react'

/**
 * 文件上传页面组件
 * 使用全局状态管理和优化后的useUpload Hook
 */
const UploadTab: React.FC = () => {
    // 移除强制渲染机制，避免状态更新循环

    // 使用ref跟踪最新的uploadFileList状态
    const uploadFileListRef = useRef<UploadFileItem[]>([])

    // 使用全局状态管理
    const {
        uploadFileList,
        uploading,
        setUploadFileList,
        addUploadFile,
        setUploading,
        updateUploadFileStatus,
        removeUploadFile,
        clearUploadList,
        refreshFileList // 关键：上传成功后刷新文件列表
    } = useFileStore()

    // 同步uploadFileList到ref
    useEffect(() => {
        uploadFileListRef.current = uploadFileList
    }, [uploadFileList])

    // 移除强制渲染机制，避免无限循环
    const enhancedUpdateUploadFileStatus = useCallback((uid: string, status: Partial<UploadFileItem>) => {
        updateUploadFileStatus(uid, status)
    }, [updateUploadFileStatus])

    // 定义上传事件回调 - 修复无限循环问题
    const uploadEvents: UploadEvents = useMemo(() => ({
        onStart: (fileName: string) => {
            console.log(`开始上传: ${fileName}`)
        },

        onProgress: (progress) => {
            // 使用ref获取最新的uploadFileList，避免依赖数组问题
            const currentFileList = uploadFileListRef.current
            const targetFile = currentFileList.find(file => file.name === progress.fileName)

            if (targetFile) {
                enhancedUpdateUploadFileStatus(targetFile.uid, {
                    percent: progress.percentage,
                    status: 'uploading' as const
                })
            }
        },

        onSuccess: (fileName: string, fileHash: string) => {
            // 查找对应的文件并更新状态为成功
            const currentFileList = uploadFileListRef.current
            const targetFile = currentFileList.find(file => file.name === fileName)

            if (targetFile) {
                enhancedUpdateUploadFileStatus(targetFile.uid, {
                    status: 'success' as const,
                    percent: 100
                })
                console.log('文件上传成功，状态已更新:', fileName)
            }

            message.success(`${fileName} 上传成功！`)
        },

        onError: (error: string, fileName: string) => {
            // 查找对应的文件并更新状态为失败
            const currentFileList = uploadFileListRef.current
            const targetFile = currentFileList.find(file => file.name === fileName)

            if (targetFile) {
                enhancedUpdateUploadFileStatus(targetFile.uid, {
                    status: 'error' as const,
                    error: error
                })
                console.log('文件上传失败，状态已更新:', fileName, error)
            }

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
    }), [refreshFileList, enhancedUpdateUploadFileStatus]) // 移除uploadFileList依赖

    const {
        upload,
        isUploading,
        errors,
        clearErrors,
        resetProgress,
        // 断点续传方法
        pauseFile,
        resumeFile,
        retryFile,
        cancelFile,
        pauseAll,
        resumeAll,
        cancelAll,
    } = useUpload({}, uploadEvents)

    /**
     * 处理文件列表变化
     * @param newFileListOrUpdater 新的文件列表或更新函数
     */
    const handleFileListChange = (newFileListOrUpdater: UploadFileItem[] | ((prev: UploadFileItem[]) => UploadFileItem[])) => {
        if (typeof newFileListOrUpdater === 'function') {
            // 关键修复：使用ref中的最新状态进行函数式更新
            const latestFileList = uploadFileListRef.current
            const updatedList = newFileListOrUpdater(latestFileList)
            setUploadFileList(updatedList)
            // 立即更新ref
            uploadFileListRef.current = updatedList
        } else {
            // 直接更新
            setUploadFileList(newFileListOrUpdater)
            // 立即更新ref
            uploadFileListRef.current = newFileListOrUpdater
        }
    }

    // ==================== 断点续传处理函数 ====================

    /**
     * 处理文件暂停
     * @param file 要暂停的文件
     */
    const handlePauseFile = useCallback((file: UploadFileItem) => {
        console.log('=== 暂停文件 ===', {
            fileName: file.name,
            uid: file.uid,
            status: file.status,
            hasResumeData: !!file.resumeData,
            fileHash: file.resumeData?.fileHash
        })

        // 使用文件名作为标识符调用pauseFile
        // pauseFile方法会先尝试fileHash，再尝试fileName
        const identifier = file.resumeData?.fileHash || file.name
        console.log('使用标识符暂停文件:', identifier)

        pauseFile(identifier)

        // 更新UI状态
        enhancedUpdateUploadFileStatus(file.uid, {
            status: 'paused' as const
        })

        console.log('文件暂停处理完成:', file.name)
    }, [pauseFile, enhancedUpdateUploadFileStatus])

    /**
     * 处理文件继续
     * @param file 要继续的文件
     */
    const handleResumeFile = useCallback((file: UploadFileItem) => {
        const identifier = file.resumeData?.fileHash || file.name
        resumeFile(identifier)
        // 更新UI状态
        enhancedUpdateUploadFileStatus(file.uid, {
            status: 'uploading' as const
        })
    }, [resumeFile, enhancedUpdateUploadFileStatus])

    /**
     * 处理文件重试
     * @param file 要重试的文件
     */
    const handleRetryFile = useCallback((file: UploadFileItem) => {
        const identifier = file.resumeData?.fileHash || file.name
        retryFile(identifier)
        // 更新UI状态
        enhancedUpdateUploadFileStatus(file.uid, {
            status: 'pending' as const,
            percent: 0,
            error: undefined
        })
    }, [retryFile, enhancedUpdateUploadFileStatus])

    /**
     * 处理文件取消
     * @param file 要取消的文件
     */
    const handleCancelFile = useCallback((file: UploadFileItem) => {
        const identifier = file.resumeData?.fileHash || file.name
        cancelFile(identifier)
        // 更新UI状态
        enhancedUpdateUploadFileStatus(file.uid, {
            status: 'cancelled' as const
        })
    }, [cancelFile, enhancedUpdateUploadFileStatus])

    /**
     * 处理文件上传 - 智能过滤需要上传的文件
     * @param uploadFiles 要上传的文件列表
     */
    const handleUpload = async (uploadFiles: UploadFileItem[]) => {
        try {
            setUploading(true)
            clearErrors() // 清除之前的错误

            // 智能过滤：只上传需要上传的文件
            const filesToUpload = uploadFiles.filter(file => {
                const status = file.status || 'pending'
                // 只上传：待上传、已暂停、上传失败的文件
                return ['pending', 'paused', 'error', 'failed'].includes(status)
            })

            console.log('文件上传过滤结果:', {
                totalFiles: uploadFiles.length,
                filesToUpload: filesToUpload.length,
                skippedFiles: uploadFiles.length - filesToUpload.length,
                filesToUploadNames: filesToUpload.map(f => f.name),
                skippedFileNames: uploadFiles.filter(f => !filesToUpload.includes(f)).map(f => f.name)
            })

            if (filesToUpload.length === 0) {
                message.info('没有需要上传的文件')
                setUploading(false)
                return
            }

            // 更新需要上传的文件状态为上传中
            filesToUpload.forEach(uploadFile => {
                enhancedUpdateUploadFileStatus(uploadFile.uid, {
                    status: 'uploading' as const,
                    percent: 0,
                    error: undefined
                })
            })

            // 转换为 UploadFile 格式
            const antdFileList = filesToUpload.map(file => ({
                uid: file.uid,
                name: file.name,
                size: file.size,
                type: file.type,
                originFileObj: file.originFileObj as any,
            }))

            // 使用优化后的upload方法，UI副作用由事件回调处理
            await upload(antdFileList)

            // 移除自动清空逻辑，保持文件列表完整性
            // 用户可以手动清空或删除特定文件记录

        } catch (error) {
            console.error('Upload failed:', error)

            // 更新文件状态为失败
            uploadFiles.forEach(uploadFile => {
                enhancedUpdateUploadFileStatus(uploadFile.uid, {
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
                onResumeActions={{
                    onPause: handlePauseFile,
                    onResume: handleResumeFile,
                    onRetry: handleRetryFile,
                    onCancel: handleCancelFile,
                }}
                onBatchActions={{
                    onPauseAll: pauseAll,
                    onResumeAll: resumeAll,
                    onCancelAll: cancelAll,
                }}
            />
        </div>
    )
}

export default UploadTab
