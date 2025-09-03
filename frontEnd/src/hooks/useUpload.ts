import { FileApi } from '@/api'
import { ResumeStorage, type ResumeInfo } from '@/utils/resumeStorage'
import { UPLOAD_CONFIG, UploadUtils } from '@/config/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { useCallback, useState, useRef, useEffect } from 'react'

interface UploadOptions {
    chunkSize?: number // 切片大小，默认 1M
    maxConcurrent?: number // 最大并发数
    baseUrl?: string // 上传接口基础路径
}

/** 上传状态枚举 - 扩展支持断点续传 */
export enum UploadState {
    /** 待上传 - 文件已选择但未开始上传 */
    Pending = 0,
    /** 文件处理中 - 正在计算文件哈希等预处理操作 */
    Processing = 1,
    /** 上传中 - 文件正在上传过程中 */
    Uploading = 2,
    /** 已暂停 - 用户主动暂停或因网络问题暂停 */
    Paused = 3,
    /** 上传完成 - 文件上传成功并完成合并 */
    Finished = 4,
    /** 上传中断 - 网络中断或其他原因导致的中断 */
    Interrupted = 5,
    /** 上传失败 - 因网络错误、服务器错误等原因导致上传失败 */
    Failed = 6,
    /** 已取消 - 用户取消上传或系统取消 */
    Cancelled = 7,
}

/** 文件分片上传任务接口 - 扩展支持断点续传 */
export interface FileChunkProp {
    state: UploadState // 上传状态
    fileHash: string // 文件hash
    fileName: string // 文件名
    fileSize: number // 文件大小
    allChunkList: ChunkProp[] // 所有请求的数据
    whileRequests: ChunkProp[] // 正在请求中的请求个数
    finishNumber: number // 请求完成的个数
    errNumber: number // 报错的个数,默认是0个,超多3个就是直接上传中断
    percentage: number // 单个文件上传进度条
    controller?: AbortController // 用于取消整个文件上传任务
    id: number | string
    // 状态信息
    error?: string // 错误信息
    startTime?: number // 开始时间
    endTime?: number // 结束时间
    // 断点续传相关信息
    resumeData?: {
        uploadedChunks: number[] // 已上传的分片索引
        totalChunks: number // 总分片数
        lastUploadTime: number // 最后上传时间
        chunkSize: number // 分片大小
        isPaused: boolean // 是否被暂停
        pauseReason?: string // 暂停原因
    }
}

interface ChunkProp {
    fileHash: string // 总文件hash
    fileSize: number // 总文件size
    fileName: string // 总文件name
    index: number
    chunkFile: File // 切片文件本身
    chunkHash: string // 单个切片hash,以 - 连接
    chunkSize: number | undefined // 切片文件大小
    chunkNumber: number // 切片个数
    finish: boolean // 切片是否已经完成
    loaded?: number // 当前分片已上传字节数
    controller?: AbortController // 用于取消单个分片上传接口
}

interface UploadProgress {
    percentage: number
    status: 'pending' | 'uploading' | 'success' | 'error' | 'merging'
    fileName: string
    uploadedSize: number // 已上传字节数
    totalSize: number // 总字节数
    speed: number // 上传速度 (bytes/s)
    remainingTime: number // 预计剩余时间 (seconds)
    error?: string // 错误信息
}

// 新增：上传事件类型
export interface UploadEvents {
    onProgress?: (progress: UploadProgress) => void
    onSuccess?: (fileName: string, fileHash: string) => void
    onError?: (error: string, fileName: string) => void
    onStart?: (fileName: string) => void
    onComplete?: (fileName: string, success: boolean) => void
    onMergeStart?: (fileName: string) => void
    onMergeComplete?: (fileName: string) => void
}

// 默认配置 - 使用配置文件中的值
const DEFAULT_OPTIONS: UploadOptions = {
    chunkSize: UPLOAD_CONFIG.FILE_SIZE.CHUNK_SIZE,
    maxConcurrent: UPLOAD_CONFIG.CONCURRENCY.MAX_CONCURRENT,
    baseUrl: '/api/upload',
}

export const useUpload = (options?: UploadOptions, events?: UploadEvents) => {
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        percentage: 0,
        status: 'pending',
        fileName: '',
        uploadedSize: 0,
        totalSize: 0,
        speed: 0,
        remainingTime: 0,
    })
    const [uploadFileList, setUploadFileList] = useState<FileChunkProp[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [isMerging, setIsMerging] = useState(false)
    const [errors, setErrors] = useState<string[]>([])

    //设置单次请求最大并发数
    const [maxRequest, setMaxRequest] = useState<number>(6)

    // 定时器相关状态管理
    const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
    const currentTaskRef = useRef<FileChunkProp | null>(null)

    // 生成文件 hash（web-worker）
    const useWorker = (file: Blob): Promise<{ fileHash: string; fileChunkList: ChunkProp[] }> => {
        return new Promise((resolve) => {
            const worker = new Worker(new URL('@/utils/upload/hash-worker.js', import.meta.url))
            worker.postMessage({ file, chunkSize: DEFAULT_OPTIONS.chunkSize })
            worker.onmessage = (e) => {
                const { fileHash, fileChunkList } = e.data
                if (fileHash) {
                    resolve({
                        fileHash,
                        fileChunkList,
                    })
                }
            }
        })
    }

    function generateRandomId(): number {
        return Math.floor(Math.random() * 1000000000000)
    }

    // 启动进度定时器 - 每1秒更新一次进度
    const startProgressTimer = (taskArrItem: FileChunkProp) => {
        // 强制清理现有定时器
        if (progressTimerRef.current) {
            clearInterval(progressTimerRef.current)
            progressTimerRef.current = null
        }

        // 状态检查
        if (taskArrItem.state !== UploadState.Uploading) {
            return
        }

        currentTaskRef.current = taskArrItem

        progressTimerRef.current = setInterval(() => {
            if (currentTaskRef.current &&
                currentTaskRef.current.state === UploadState.Uploading &&
                currentTaskRef.current.percentage < 100) {
                updateProgress(currentTaskRef.current)
            } else {
                // 自动清理无效定时器
                stopProgressTimer()
            }
        }, 1000)
    }

    // 停止进度定时器
    const stopProgressTimer = () => {
        if (progressTimerRef.current) {
            clearInterval(progressTimerRef.current)
            progressTimerRef.current = null
        }
        currentTaskRef.current = null
    }

    // 组件卸载时清理定时器
    useEffect(() => {
        return () => {
            stopProgressTimer()
        }
    }, [])

    // 暂停上传（是暂停剩下未上传的） - 增强支持断点续传
    const pauseUpload = (taskArrItem: FileChunkProp, elsePause = true) => {
        // elsePause为true就是主动暂停，为false就是请求中断
        if (![UploadState.Finished, UploadState.Failed].includes(taskArrItem.state)) {
            if (elsePause) {
                taskArrItem.state = UploadState.Paused

                // 初始化或更新断点续传数据
                if (!taskArrItem.resumeData) {
                    taskArrItem.resumeData = {
                        uploadedChunks: [],
                        totalChunks: taskArrItem.allChunkList.length,
                        lastUploadTime: Date.now(),
                        chunkSize: taskArrItem.allChunkList[0]?.chunkSize || 1024 * 1024,
                        isPaused: true,
                        pauseReason: '用户主动暂停'
                    }
                } else {
                    taskArrItem.resumeData.isPaused = true
                    taskArrItem.resumeData.pauseReason = '用户主动暂停'
                    taskArrItem.resumeData.lastUploadTime = Date.now()
                }

                // 更新已上传分片列表
                taskArrItem.resumeData.uploadedChunks = taskArrItem.allChunkList
                    .filter(chunk => chunk.finish)
                    .map(chunk => chunk.index)

                console.log('=== 暂停状态保存 ===', {
                    fileName: taskArrItem.fileName,
                    state: taskArrItem.state,
                    isPaused: taskArrItem.resumeData.isPaused,
                    uploadedChunks: taskArrItem.resumeData.uploadedChunks.length,
                    totalChunks: taskArrItem.resumeData.totalChunks
                })

            } else {
                taskArrItem.state = UploadState.Interrupted
            }
        }
        taskArrItem.errNumber = 0

        // 停止进度定时器
        stopProgressTimer()

        // 增强请求取消逻辑
        console.log(`=== 取消请求 ===`, {
            fileName: taskArrItem.fileName,
            whileRequestsCount: taskArrItem.whileRequests.length,
            allChunkListCount: taskArrItem.allChunkList.length
        })

        // 取消还在请求中的所有接口
        if (taskArrItem.whileRequests.length > 0) {
            for (const itemB of taskArrItem.whileRequests) {
                if (itemB.controller) {
                    console.log(`取消分片${itemB.index}的请求`)
                    itemB.controller.abort()
                }
            }
        }

        // 同时取消所有分片的controller（防止遗漏）
        taskArrItem.allChunkList.forEach(chunk => {
            if (chunk.controller && !chunk.finish) {
                console.log(`强制取消分片${chunk.index}的请求`)
                chunk.controller.abort()

                // 重置被取消分片的状态，确保下次能重新上传
                chunk.loaded = 0
                chunk.controller = undefined
            }
        })

        // 清空正在请求的列表，并重置这些分片的状态
        taskArrItem.whileRequests.forEach(chunk => {
            if (!chunk.finish) {
                console.log(`重置正在上传分片${chunk.index}的状态`)
                chunk.loaded = 0
                chunk.controller = undefined
            }
        })
        taskArrItem.whileRequests = []
    }

    const updateProgress = (taskArrItem: FileChunkProp) => {
        // 添加状态检查，避免在非上传状态下更新进度
        if (taskArrItem.state !== UploadState.Uploading) {
            return
        }

        const totalSize = taskArrItem.fileSize
        if (totalSize <= 0) {
            taskArrItem.percentage = 0
            return
        }

        // 修复进度计算逻辑 - 基于实际完成的分片
        const completedChunks = taskArrItem.allChunkList.filter(chunk => chunk.finish)
        const completedChunksSize = completedChunks.reduce((acc, chunk) => acc + chunk.chunkSize, 0)

        // 正在上传的分片大小
        const uploadingSize = taskArrItem.whileRequests.reduce((acc, chunk) => acc + (chunk.loaded || 0), 0)

        // 总已上传大小
        const totalUploadedSize = completedChunksSize + uploadingSize

        console.log('=== 进度计算详情 ===', {
            fileName: taskArrItem.fileName,
            totalChunks: taskArrItem.allChunkList.length,
            completedChunks: completedChunks.length,
            finishNumber: taskArrItem.finishNumber,
            completedChunksSize,
            uploadingSize,
            totalUploadedSize,
            totalSize,
            calculatedPercentage: (totalUploadedSize / totalSize) * 100
        })

        // 添加进度值合理性检查
        const calculatedPercentage = (totalUploadedSize / totalSize) * 100
        const newPercentage = Number(Math.min(Math.max(calculatedPercentage, 0), 100).toFixed(2))

        // 如果进度达到100%，立即停止定时器
        if (newPercentage >= 100) {
            taskArrItem.percentage = 100
            stopProgressTimer()

            const finalProgress: UploadProgress = {
                percentage: 100,
                status: 'success',
                fileName: taskArrItem.fileName,
                uploadedSize: totalSize,
                totalSize,
                speed: 0,
                remainingTime: 0,
            }
            events?.onProgress?.(finalProgress)
            return
        }

        // 只有进度真正变化时才更新
        if (newPercentage !== taskArrItem.percentage) {
            taskArrItem.percentage = newPercentage

            const progress: UploadProgress = {
                percentage: newPercentage,
                status: 'uploading',
                fileName: taskArrItem.fileName,
                uploadedSize: totalUploadedSize,
                totalSize,
                speed: 0,
                remainingTime: 0,
            }
            events?.onProgress?.(progress)
        }
    }

    // 调取合并接口处理所有切片
    const handleMerge = async (taskArrItem: FileChunkProp) => {
        const { fileName, fileHash } = taskArrItem

        try {
            setIsMerging(true)
            events?.onMergeStart?.(fileName)

            // 更新进度状态
            setUploadProgress(prev => ({
                ...prev,
                status: 'merging'
            }))

            const res = await FileApi.mergeChunk({
                chunkSize: DEFAULT_OPTIONS.chunkSize!,
                fileName,
                fileHash,
            })

            // 如果合并成功则标识该文件已经上传完成
            finishTask(taskArrItem)

            // 重置分片计数和设置结束时间
            taskArrItem.finishNumber = 0
            taskArrItem.endTime = Date.now()

            events?.onMergeComplete?.(fileName)
            events?.onSuccess?.(fileName, fileHash)
            events?.onComplete?.(fileName, true)

        } catch (error) {
            // 合并失败时确保停止定时器
            console.error(`文件合并失败: ${fileName}`, error)
            stopProgressTimer()

            // 暂停上传该文件
            pauseUpload(taskArrItem, true)
            const errorMessage = '文件合并失败！'
            taskArrItem.error = errorMessage

            setErrors(prev => [...prev, errorMessage])
            events?.onError?.(errorMessage, fileName)
            events?.onComplete?.(fileName, false)

        } finally {
            setIsMerging(false)
        }
    }
    // 单个文件上传 - 增强状态检查
    const uploadSingleFile = (taskArrItem: FileChunkProp) => {
        // 关键修复：检查任务状态，如果不是上传中状态则停止
        if (taskArrItem.state !== UploadState.Uploading) {
            console.log(`任务状态不是上传中，停止处理: ${taskArrItem.fileName}, 状态: ${taskArrItem.state}`)
            return false
        }

        // 检查错误次数，如果错误过多则暂停
        if (taskArrItem.errNumber > 3) {
            console.log(`任务错误次数过多，暂停上传: ${taskArrItem.fileName}, 错误次数: ${taskArrItem.errNumber}`)
            pauseUpload(taskArrItem, false)
            return false
        }

        // 如果没有需要上传的切片 / 正在上传的切片还没传完，就不做处理
        if (taskArrItem.allChunkList.length === 0 || taskArrItem.whileRequests.length > 0) {
            return false
        }
        // 找到文件处于处理中/上传中的 文件列表（是文件而不是切片）
        const isTaskArrIng = uploadFileList.filter(
            (itemB) => itemB.state === 1 || itemB.state === 2
        )

        // 修复并发控制：降低并发数，避免服务器连接超时
        // 将最大并发数从6降低到3，提高连接稳定性
        const maxConcurrentRequests = 3
        const concurrentPerFile = Math.max(1, Math.ceil(maxConcurrentRequests / isTaskArrIng.length))
        setMaxRequest(concurrentPerFile)

        // 关键修复：从未完成的分片中选择要上传的分片，而不是清空allChunkList
        const unfinishedChunks = taskArrItem.allChunkList.filter(chunk => !chunk.finish && !taskArrItem.whileRequests.some(w => w.index === chunk.index))

        console.log('=== 选择上传分片 ===', {
            fileName: taskArrItem.fileName,
            totalChunks: taskArrItem.allChunkList.length,
            finishedChunks: taskArrItem.allChunkList.filter(c => c.finish).length,
            unfinishedChunks: unfinishedChunks.length,
            currentWhileRequests: taskArrItem.whileRequests.length,
            maxRequest
        })

        // 从未完成的分片中选择最多maxRequest个进行上传
        const chunksToUpload = unfinishedChunks.slice(0, maxRequest)

        // 设置正在请求中的分片
        taskArrItem.whileRequests.push(...chunksToUpload)

        console.log(`开始上传${chunksToUpload.length}个分片:`, chunksToUpload.map(c => c.index))

        // 单个分片请求（带重试机制）
        const uploadChunk = async (chunk: ChunkProp, retryCount = 0) => {
            const maxRetries = UPLOAD_CONFIG.CONCURRENCY.MAX_RETRIES
            const retryDelay = UPLOAD_CONFIG.CONCURRENCY.RETRY_DELAY_BASE * (retryCount + 1)
            const fd = new FormData()
            const {
                fileHash,
                fileSize,
                fileName,
                index,
                chunkFile,
                chunkHash,
                chunkSize,
                chunkNumber,
            } = chunk

            fd.append('fileHash', fileHash)
            fd.append('fileSize', String(fileSize))
            fd.append('fileName', fileName)
            fd.append('index', String(index))
            fd.append('chunkFile', chunkFile)
            fd.append('chunkHash', chunkHash)
            fd.append('chunkSize', String(chunkSize))
            fd.append('chunkNumber', String(chunkNumber))

            const controller = new AbortController()
            chunk.controller = controller

            try {
                // 在发起请求前再次检查状态
                if (taskArrItem.state !== UploadState.Uploading) {
                    console.log(`分片上传前状态检查失败: ${taskArrItem.fileName}, 状态: ${taskArrItem.state}`)
                    return
                }

                await FileApi.uploadFile(fd, {
                    signal: controller.signal,
                    timeout: UPLOAD_CONFIG.TIMEOUT.CHUNK_UPLOAD,
                    onUploadProgress: (e: any) => {
                        chunk.loaded = e.loaded
                        updateProgress(taskArrItem)
                    },
                })

                // 修复状态检查：使用枚举而不是数字
                if (taskArrItem.state === UploadState.Paused || taskArrItem.state === UploadState.Interrupted) {
                    console.log(`分片上传完成后检测到暂停/中断状态: ${taskArrItem.fileName}`)
                    return
                }

                // 更新分片完成状态
                taskArrItem.errNumber > 0 ? taskArrItem.errNumber-- : 0
                chunk.finish = true
                chunk.loaded = chunk.chunkSize // 确保loaded值正确

                // 重新计算finishNumber，确保准确性
                taskArrItem.finishNumber = taskArrItem.allChunkList.filter(c => c.finish).length

                console.log(`分片${chunk.index}上传完成，当前完成数: ${taskArrItem.finishNumber}/${taskArrItem.allChunkList.length}`)

                // 立即更新进度
                updateProgress(taskArrItem)

                // 从正在上传列表中移除已完成的分片
                taskArrItem.whileRequests = taskArrItem.whileRequests.filter(
                    (item) => item.chunkFile !== chunk.chunkFile
                )

                if (taskArrItem.finishNumber === chunkNumber) {
                    await handleMerge(taskArrItem)
                } else {
                    // 关键修复：检查任务状态，只有在上传中状态才继续上传下一个分片
                    if (taskArrItem.state === UploadState.Uploading) {
                        uploadSingleFile(taskArrItem)
                    } else {
                        console.log(`分片${chunk.index}完成，但任务状态不是上传中(${taskArrItem.state})，停止继续上传`)
                    }
                }
            } catch (e: any) {
                // 检查是否是请求被取消
                if (e.name === 'AbortError' || controller.signal.aborted) {
                    console.log(`分片${chunk.index}请求被取消`)
                    return
                }

                // 检查任务状态，如果已经不是上传中状态，则不处理错误
                if (taskArrItem.state !== UploadState.Uploading) {
                    console.log(`分片${chunk.index}上传失败，但任务已不是上传状态:`, taskArrItem.state)
                    return
                }

                // 检查是否是网络错误
                const isNetworkError = e.message?.includes('Network Error') ||
                                     e.message?.includes('ERR_NETWORK') ||
                                     e.code === 'ERR_NETWORK'

                // 检查是否是连接超时错误
                const isTimeoutError = e.code === 'ETIMEDOUT' ||
                                     e.message?.includes('timeout') ||
                                     e.message?.includes('ETIMEDOUT') ||
                                     e.message?.includes('ERR_CONNECTION_TIMED_OUT')

                // 网络错误或超时错误，进行重试
                if ((isNetworkError || isTimeoutError) && retryCount < maxRetries) {
                    console.warn(`分片${chunk.index}网络错误，${retryDelay}ms后进行第${retryCount + 1}次重试`, e.message)

                    // 延迟后重试
                    setTimeout(async () => {
                        // 再次检查任务状态
                        if (taskArrItem.state === UploadState.Uploading) {
                            try {
                                await uploadChunk(chunk, retryCount + 1)
                            } catch (retryError) {
                                console.error(`分片${chunk.index}重试失败:`, retryError)
                            }
                        } else {
                            console.log(`分片${chunk.index}重试时发现任务已不是上传状态，取消重试`)
                        }
                    }, retryDelay)
                    return
                }

                // 其他错误或重试次数超限
                taskArrItem.errNumber++
                console.error(`分片${chunk.index}上传失败:`, e.message || e)

                if (taskArrItem.errNumber > 3) {
                    console.error(`文件${taskArrItem.fileName}上传失败次数过多，暂停上传`)
                    pauseUpload(taskArrItem, false)

                    // 通知用户连接问题
                    if (isTimeoutError || isNetworkError) {
                        events?.onError?.(`网络连接异常，请检查网络连接后重试`, taskArrItem.fileName)
                    } else {
                        events?.onError?.(`上传失败: ${e.message || '未知错误'}`, taskArrItem.fileName)
                    }
                } else {
                    // 非网络错误，直接重试
                    setTimeout(() => {
                        if (taskArrItem.state === UploadState.Uploading) {
                            uploadChunk(chunk, 0)
                        }
                    }, 1000)
                }
            }
        }

        // 开始单个上传
        for (const item of chunksToUpload) {
            uploadChunk(item)
        }
    }

    // 设置单个文件上传已完成
    const finishTask = (item: FileChunkProp) => {
        // 立即停止定时器（必须在状态更改前停止，避免继续触发进度更新）
        stopProgressTimer()

        // 设置完成状态
        item.percentage = 100
        item.state = UploadState.Finished

        // 立即触发100%进度回调，确保UI显示完成状态
        const finalProgress: UploadProgress = {
            percentage: 100,
            status: 'success',
            fileName: item.fileName,
            uploadedSize: item.fileSize,
            totalSize: item.fileSize,
            speed: 0,
            remainingTime: 0,
        }
        events?.onProgress?.(finalProgress)
    }
    // 小文件上传函数（优化后）
    const _uploadSmallFile = async (file: File, uploadTask: FileChunkProp) => {
        console.log(file, '小文件上传')

        const fd = new FormData()
        fd.append('file', file)
        // 直接使用原始文件名，让后端处理编码问题
        fd.append('fileName', file.name)
        console.log('小文件上传 - 文件名:', file.name)

        uploadTask.state = UploadState.Uploading

        // 小文件不需要启动进度定时器，因为没有分片
        // 进度通过onUploadProgress直接更新

        // 触发进度事件
        const progressInfo: UploadProgress = {
            percentage: 0,
            status: 'uploading',
            fileName: file.name,
            uploadedSize: 0,
            totalSize: file.size,
            speed: 0,
            remainingTime: 0,
        }
        events?.onProgress?.(progressInfo)

        try {
            // 添加上传进度监听和超时配置
            const res = await FileApi.uploadFileSingle(fd, {
                timeout: UPLOAD_CONFIG.TIMEOUT.SMALL_FILE_UPLOAD,
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total && uploadTask.state === UploadState.Uploading) {
                        const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)

                        // 更新任务进度
                        uploadTask.percentage = percentage

                        const progressInfo: UploadProgress = {
                            percentage,
                            status: 'uploading',
                            fileName: file.name,
                            uploadedSize: progressEvent.loaded,
                            totalSize: progressEvent.total,
                            speed: 0,
                            remainingTime: 0,
                        }
                        events?.onProgress?.(progressInfo)
                    }
                }
            })

            // 上传成功
            uploadTask.endTime = Date.now()
            finishTask(uploadTask) // finishTask内部已经处理了进度回调和定时器停止

            // 触发成功事件
            events?.onSuccess?.(file.name, uploadTask.fileHash || 'unknown')
            events?.onComplete?.(file.name, true)

            return res
        } catch (error) {
            uploadTask.state = UploadState.Failed
            uploadTask.error = error instanceof Error ? error.message : '小文件上传失败'
            stopProgressTimer() // 停止进度定时器

            const errorProgress: UploadProgress = {
                percentage: 0,
                status: 'error',
                fileName: file.name,
                uploadedSize: 0,
                totalSize: file.size,
                speed: 0,
                remainingTime: 0,
                error: uploadTask.error,
            }
            events?.onProgress?.(errorProgress)
            events?.onError?.(uploadTask.error, file.name)
            events?.onComplete?.(file.name, false)

            throw error
        }
    }

    // 大文件切片上传函数（优化后）
    const _uploadChunkedFile = async (file: File, uploadTask: FileChunkProp) => {
        const chunkSize = options?.chunkSize || DEFAULT_OPTIONS.chunkSize!

        try {
            // 生成文件hash
            const { fileHash, fileChunkList } = await useWorker(file)

            // 解析完成开始上传文件
            let baseName = ''
            const lastIndex = file.name.lastIndexOf('.')
            if (lastIndex === -1) {
                baseName = file.name
            } else {
                baseName = file.name.slice(0, lastIndex)
            }

            uploadTask.fileHash = `${fileHash}${baseName}`
            uploadTask.state = UploadState.Uploading

            // 启动进度定时器
            startProgressTimer(uploadTask)

            // 检查文件是否已经存在
            const { data } = await FileApi.checkFile({
                fileHash: `${fileHash}${baseName}`,
                fileName: file.name,
            })

            const { shouldUpload, uploadedList } = data
            if (!shouldUpload) {
                // 文件已存在，实现秒传
                uploadTask.endTime = Date.now()
                finishTask(uploadTask) // finishTask内部已经处理了进度回调和定时器停止
                console.log('文件已存在，实现秒传')

                events?.onSuccess?.(file.name, uploadTask.fileHash)
                events?.onComplete?.(file.name, true)
                return
            }

            // 分解chunk列表
            uploadTask.allChunkList = fileChunkList.map((item, index) => ({
                fileHash: `${fileHash}${baseName}`,
                fileSize: file.size || 0,
                fileName: file.name,
                index: index,
                chunkFile: item.chunkFile,
                chunkHash: `${fileHash}-${index}`,
                chunkSize: chunkSize,
                chunkNumber: fileChunkList.length,
                finish: false,
                loaded: 0, // Initialize loaded
            }))

            // 如果已存在部分文件切片，则要过滤掉已经上传的切片
            if (uploadedList.length > 0) {
                uploadTask.allChunkList = uploadTask.allChunkList.filter(
                    (item) => !uploadedList.includes(item.chunkHash)
                )

                if (!uploadTask.allChunkList.length) {
                    // 所有切片都已上传，直接合并
                    await handleMerge(uploadTask)
                    return
                } else {
                    // 更新切片数量
                    uploadTask.allChunkList = uploadTask.allChunkList.map((item) => ({
                        ...item,
                        chunkNumber: uploadTask.allChunkList.length,
                    }))
                }
            }

            // 逐步对单个文件进行切片上传
            uploadSingleFile(uploadTask)

        } catch (error) {
            uploadTask.state = UploadState.Failed
            uploadTask.error = error instanceof Error ? error.message : '大文件上传失败'

            events?.onError?.(uploadTask.error, file.name)
            events?.onComplete?.(file.name, false)

            throw error
        }
    }
    // 主上传函数（重构后简化）
    const handleUpload = useCallback(
        async (files: UploadFile[]) => {
            setIsUploading(true)
            setErrors([]) // 清空之前的错误

            try {
                for await (const [index, file] of files.entries()) {
                    const chunkSize = options?.chunkSize || DEFAULT_OPTIONS.chunkSize!

                    // 创建上传任务
                    const uploadTask: FileChunkProp = {
                        id: generateRandomId() + index,
                        state: UploadState.Processing,
                        fileHash: '',
                        fileName: file.name,
                        fileSize: file.size!,
                        allChunkList: [],
                        whileRequests: [],
                        finishNumber: 0,
                        errNumber: 0,
                        percentage: 0,
                        startTime: Date.now(),
                    }

                    setUploadFileList(prev => [...prev, uploadTask])

                    // 触发开始事件
                    events?.onStart?.(file.name)

                    // 更新进度状态
                    setUploadProgress({
                        percentage: 0,
                        status: 'uploading',
                        fileName: file.name,
                        uploadedSize: 0,
                        totalSize: file.size!,
                        speed: 0,
                        remainingTime: 0,
                    })

                    try {
                        // 根据文件大小选择上传策略
                        console.log('=== 文件上传策略选择 ===', {
                            fileName: file.name,
                            fileSize: file.size,
                            chunkSize,
                            isSmallFile: file.size! <= chunkSize,
                            strategy: file.size! <= chunkSize ? '小文件直接上传' : '大文件分片上传'
                        })

                        if (file.size! <= chunkSize) {
                            // 小文件直接上传
                            await _uploadSmallFile(file.originFileObj as File, uploadTask)
                        } else {
                            // 大文件切片上传
                            await _uploadChunkedFile(file.originFileObj as File, uploadTask)
                        }
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : '上传失败'
                        uploadTask.state = UploadState.Failed
                        uploadTask.error = errorMessage
                        stopProgressTimer() // 停止进度定时器

                        setErrors(prev => [...prev, errorMessage])
                        events?.onError?.(errorMessage, file.name)
                        events?.onComplete?.(file.name, false)

                        console.error(`文件 ${file.name} 上传失败:`, error)
                    }
                }
            } finally {
                setIsUploading(false)
            }
        },
        [options, events, uploadFileList]
    )

    // ==================== 断点续传方法 ====================

    /**
     * 暂停指定文件的上传
     * @param identifier 文件标识符（fileHash或fileName）
     */
    const pauseFile = useCallback((identifier: string) => {
        console.log('=== pauseFile被调用 ===', {
            identifier,
            uploadFileListLength: uploadFileList.length,
            uploadTasks: uploadFileList.map(t => ({
                fileName: t.fileName,
                fileHash: t.fileHash,
                state: t.state
            }))
        })

        // 尝试通过fileHash查找
        let task = uploadFileList.find(t => t.fileHash === identifier)

        // 如果通过fileHash找不到，尝试通过fileName查找
        if (!task) {
            task = uploadFileList.find(t => t.fileName === identifier)
            console.log('通过fileName查找任务:', task ? '找到' : '未找到')
        }

        if (task && task.state === UploadState.Uploading) {
            console.log('找到上传中的任务，开始暂停:', task.fileName)

            // 停止当前上传
            pauseUpload(task, true)

            console.log('暂停后任务状态:', {
                fileName: task.fileName,
                state: task.state,
                stateEnum: UploadState.Paused,
                isEqual: task.state === UploadState.Paused
            })

            // 保存断点信息
            const resumeInfo: ResumeInfo = {
                fileHash: task.fileHash,
                fileName: task.fileName,
                fileSize: task.fileSize,
                fileType: '', // 需要从原始文件获取
                uploadedChunks: task.allChunkList.filter(chunk => chunk.finish).map(chunk => chunk.index),
                totalChunks: task.allChunkList.length,
                chunkSize: task.allChunkList[0]?.chunkSize || 1024 * 1024,
                lastUploadTime: Date.now(),
                percentage: task.percentage,
                status: 'paused',
                pauseReason: '用户主动暂停'
            }

            ResumeStorage.saveResumeInfo(task.fileHash, resumeInfo)
            console.log(`文件已暂停: ${task.fileName}`)
        } else {
            console.warn('未找到可暂停的任务:', {
                identifier,
                taskFound: !!task,
                taskState: task?.state,
                expectedState: UploadState.Uploading
            })
        }
    }, [uploadFileList, pauseUpload])

    /**
     * 继续指定文件的上传
     * @param identifier 文件标识符（fileHash或fileName）
     */
    const resumeFile = useCallback((identifier: string) => {
        // 尝试通过fileHash查找
        let task = uploadFileList.find(t => t.fileHash === identifier)

        // 如果通过fileHash找不到，尝试通过fileName查找
        if (!task) {
            task = uploadFileList.find(t => t.fileName === identifier)
        }

        if (task && task.state === UploadState.Paused && task.resumeData) {
            console.log('=== 开始继续上传 ===', {
                fileName: task.fileName,
                currentState: task.state,
                hasResumeData: !!task.resumeData,
                errNumber: task.errNumber
            })

            // 重置错误计数，给继续上传一个新的开始
            task.errNumber = 0

            // 更新任务状态
            task.state = UploadState.Uploading
            task.resumeData.isPaused = false
            task.resumeData.pauseReason = undefined

            // 更新本地存储状态
            ResumeStorage.updateStatus(task.fileHash, 'uploading')

            // 重新开始上传未完成的分片
            const unfinishedChunks = task.allChunkList.filter(chunk => !chunk.finish)
            const finishedChunks = task.allChunkList.filter(chunk => chunk.finish)

            // 检查并修复分片状态不一致的问题
            let fixedChunks = 0
            task.allChunkList.forEach(chunk => {
                if (!chunk.finish && chunk.loaded > 0 && !chunk.controller) {
                    // 这个分片可能在暂停时被中断，重置其状态
                    console.log(`修复分片${chunk.index}状态: loaded=${chunk.loaded} -> 0`)
                    chunk.loaded = 0
                    fixedChunks++
                }
            })

            console.log('=== 继续上传分片状态 ===', {
                fileName: task.fileName,
                totalChunks: task.allChunkList.length,
                finishedChunks: finishedChunks.length,
                unfinishedChunks: unfinishedChunks.length,
                fixedChunks: fixedChunks,
                currentPercentage: task.percentage,
                finishedChunkIndexes: finishedChunks.map(c => c.index),
                unfinishedChunkIndexes: unfinishedChunks.map(c => c.index),
                chunkDetails: task.allChunkList.map(c => ({
                    index: c.index,
                    finish: c.finish,
                    loaded: c.loaded,
                    hasController: !!c.controller
                }))
            })

            if (unfinishedChunks.length > 0) {
                // 启动进度定时器
                startProgressTimer(task)

                // 继续上传
                uploadSingleFile(task)

                console.log(`文件继续上传: ${task.fileName}, 剩余分片: ${unfinishedChunks.length}`)
            } else {
                // 所有分片已完成，直接合并
                console.log('所有分片已完成，开始合并文件:', task.fileName)
                handleMerge(task)
            }
        }
    }, [uploadFileList])

    /**
     * 重试指定文件的上传
     * @param identifier 文件标识符（fileHash或fileName）
     */
    const retryFile = useCallback((identifier: string) => {
        // 尝试通过fileHash查找
        let task = uploadFileList.find(t => t.fileHash === identifier)

        // 如果通过fileHash找不到，尝试通过fileName查找
        if (!task) {
            task = uploadFileList.find(t => t.fileName === identifier)
        }

        if (task && task.state === UploadState.Failed) {
            // 重置任务状态
            task.state = UploadState.Pending
            task.errNumber = 0
            task.percentage = 0
            task.error = undefined

            // 清除断点信息，重新开始
            ResumeStorage.removeResumeInfo(task.fileHash)

            console.log(`文件重试上传: ${task.fileName}`)
        }
    }, [uploadFileList])

    /**
     * 取消指定文件的上传
     * @param identifier 文件标识符（fileHash或fileName）
     */
    const cancelFile = useCallback((identifier: string) => {
        // 尝试通过fileHash查找
        let task = uploadFileList.find(t => t.fileHash === identifier)

        // 如果通过fileHash找不到，尝试通过fileName查找
        if (!task) {
            task = uploadFileList.find(t => t.fileName === identifier)
        }

        if (task) {
            console.log(`=== 取消文件上传 ===`, {
                fileName: task.fileName,
                state: task.state,
                hasController: !!task.controller
            })

            // 停止进度定时器
            stopProgressTimer()

            // 取消上传
            if (task.controller) {
                task.controller.abort()
            }

            // 取消所有分片请求
            task.allChunkList.forEach(chunk => {
                if (chunk.controller) {
                    chunk.controller.abort()
                }
            })

            // 清空正在请求的列表
            task.whileRequests = []

            // 更新状态
            task.state = UploadState.Cancelled

            // 清除断点信息
            ResumeStorage.removeResumeInfo(task.fileHash)

            console.log(`文件已取消: ${task.fileName}`)
        }
    }, [uploadFileList])

    /**
     * 暂停所有正在上传的文件
     */
    const pauseAll = useCallback(() => {
        console.log('=== pauseAll被调用 ===', {
            totalTasks: uploadFileList.length,
            uploadingTasks: uploadFileList.filter(t => t.state === UploadState.Uploading).length,
            uploadingTaskNames: uploadFileList.filter(t => t.state === UploadState.Uploading).map(t => t.fileName)
        })

        uploadFileList.forEach(task => {
            if (task.state === UploadState.Uploading) {
                // 使用fileName作为标识符，与pauseFile函数保持一致
                const identifier = task.fileHash || task.fileName
                console.log(`暂停任务: ${task.fileName}, 使用标识符: ${identifier}`)
                pauseFile(identifier)
            }
        })
    }, [uploadFileList, pauseFile])

    /**
     * 继续所有已暂停的文件
     */
    const resumeAll = useCallback(() => {
        uploadFileList.forEach(task => {
            if (task.state === UploadState.Paused) {
                const identifier = task.fileHash || task.fileName
                resumeFile(identifier)
            }
        })
    }, [uploadFileList, resumeFile])

    /**
     * 取消所有未完成的文件
     */
    const cancelAll = useCallback(() => {
        uploadFileList.forEach(task => {
            if (task.state !== UploadState.Finished) {
                const identifier = task.fileHash || task.fileName
                cancelFile(identifier)
            }
        })
    }, [uploadFileList, cancelFile])

    return {
        // 主要方法
        upload: handleUpload,

        // 状态信息
        uploadProgress,
        uploadFileList,
        isUploading,
        isMerging,
        errors,

        // 统计信息
        totalFiles: uploadFileList.length,
        completedFiles: uploadFileList.filter(f => f.state === UploadState.Finished).length,
        failedFiles: uploadFileList.filter(f => f.state === UploadState.Failed).length,
        pausedFiles: uploadFileList.filter(f => f.state === UploadState.Paused).length,
        cancelledFiles: uploadFileList.filter(f => f.state === UploadState.Cancelled).length,

        // 工具方法
        pauseUpload,
        finishTask,

        // 断点续传方法
        pauseFile,
        resumeFile,
        retryFile,
        cancelFile,
        pauseAll,
        resumeAll,
        cancelAll,

        // 清理方法
        clearErrors: () => setErrors([]),
        clearUploadList: () => setUploadFileList([]),
        resetProgress: () => setUploadProgress({
            percentage: 0,
            status: 'pending',
            fileName: '',
            uploadedSize: 0,
            totalSize: 0,
            speed: 0,
            remainingTime: 0,
        })
    }
}
