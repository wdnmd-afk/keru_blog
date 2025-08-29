import { FileApi } from '@/api'
import { UploadFile } from 'antd/es/upload/interface'
import { useCallback, useState } from 'react'

interface UploadOptions {
    chunkSize?: number // 切片大小，默认 1M
    maxConcurrent?: number // 最大并发数
    baseUrl?: string // 上传接口基础路径
}

export enum UploadState {
    None = 0, // 什么都不做
    Processing = 1, // 文件处理中
    Uploading = 2, // 上传中
    Paused = 3, // 暂停
    Finished = 4, // 上传完成
    Interrupted = 5, // 上传中断
    Failed = 6, // 上传失败
}

export interface FileChunkProp {
    state: UploadState // 什么都不做,1文件处理中,2是上传中,3是暂停,4是上传完成,5上传中断，6是上传失败
    fileHash: string // 文件hash
    fileName: string // 文件名
    fileSize: number // 文件大小
    allChunkList: ChunkProp[] // 所有请求的数据
    whileRequests: ChunkProp[] // 正在请求中的请求个数,目前是要永远都保存请求个数为6
    finishNumber: number // 请求完成的个数
    errNumber: number // 报错的个数,默认是0个,超多3个就是直接上传中断
    percentage: number // 单个文件上传进度条
    cancel: null | (() => void) // 用于取消切片上传接口
    id: number | string
    // 新增状态信息
    error?: string // 错误信息
    startTime?: number // 开始时间
    endTime?: number // 结束时间
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
    cancel?: null | (() => void)
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

// 默认配置
const DEFAULT_OPTIONS: UploadOptions = {
    chunkSize: 1024 * 1024, // 1M
    maxConcurrent: 3,
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

    // 暂停上传（是暂停剩下未上传的）
    const pauseUpload = (taskArrItem: FileChunkProp, elsePause = true) => {
        // elsePause为true就是主动暂停，为false就是请求中断
        // 4是成功 6是失败  如果不是成功或者失败状态，
        if (![4, 6].includes(taskArrItem.state)) {
            // 3是暂停，5是中断
            if (elsePause) {
                taskArrItem.state = 3
            } else {
                taskArrItem.state = 5
            }
        }
        taskArrItem.errNumber = 0

        // 取消还在请求中的所有接口
        if (taskArrItem.whileRequests.length > 0) {
            for (const itemB of taskArrItem.whileRequests) {
                itemB.cancel ? itemB.cancel() : ''
            }
        }
        // // 所有剩下的请求都触发取消请求
        // for (const itemB of item.allChunkList) {
        //   //  如果cancel是函数则触发取消函数
        //   itemB.cancel ? itemB.cancel() : ''
        // }
    }
    const updateProgress = (chunk: ChunkProp, taskArrItem: FileChunkProp) => {
        // 即使是超时请求也是会频繁的返回上传进度的,所以只能写成完成一片就添加它所占百分之多少,否则会造成误会
        taskArrItem.percentage = Number(
            ((taskArrItem.finishNumber / chunk.chunkNumber) * 100).toFixed(2)
        )
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
            // 最后赋值文件切片上传完成个数为0
            taskArrItem.finishNumber = 0
            taskArrItem.endTime = Date.now()
            
            events?.onMergeComplete?.(fileName)
            events?.onSuccess?.(fileName, fileHash)
            events?.onComplete?.(fileName, true)
            
        } catch (error) {
            // 否则暂停上传该文件
            pauseUpload(taskArrItem, true)
            const errorMessage = '文件合并失败！'
            taskArrItem.error = errorMessage
            
            console.error(errorMessage, error)
            setErrors(prev => [...prev, errorMessage])
            events?.onError?.(errorMessage, fileName)
            events?.onComplete?.(fileName, false)
            
        } finally {
            setIsMerging(false)
        }
    }
    // 单个文件上传
    const uploadSingleFile = (taskArrItem: FileChunkProp) => {
        // 如果没有需要上传的切片 / 正在上传的切片还没传完，就不做处理
        if (taskArrItem.allChunkList.length === 0 || taskArrItem.whileRequests.length > 0) {
            return false
        }
        // 找到文件处于处理中/上传中的 文件列表（是文件而不是切片）
        const isTaskArrIng = uploadFileList.filter(
            (itemB) => itemB.state === 1 || itemB.state === 2
        )

        // 实时动态获取并发请求数,每次调请求前都获取一次最大并发数
        // 浏览器同域名同一时间请求的最大并发数限制为6
        // 例如如果有3个文件同时上传/处理中，则每个文件切片接口最多调 6 / 3 == 2个相同的接口
        setMaxRequest(Math.ceil(6 / isTaskArrIng.length))

        // 从数组的末尾开始提取 maxRequest 个元素。
        const whileRequest = taskArrItem.allChunkList.slice(-maxRequest)

        // 设置正在请求中的个数
        taskArrItem.whileRequests.push(...whileRequest)
        //  如果总请求数大于并发数
        if (taskArrItem.allChunkList.length > maxRequest) {
            // 则减去并发数
            taskArrItem.allChunkList.splice(-maxRequest)
        } else {
            // 否则总请求数置空,说明已经把没请求的全部放进请求列表了，不需要做过多请求
            taskArrItem.allChunkList = []
        }

        // 单个分片请求
        const uploadChunk = async (chunk: ChunkProp) => {
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
            try {
                const res = await FileApi.uploadFile(fd, (onCancelFunc) => {
                    // 在调用接口的同时，相当于同时调用了传入的这个函数，又能同时拿到返回的取消方法去赋值
                    chunk.cancel = onCancelFunc
                })
                // 先判断是不是处于暂停还是取消状态
                // 你的状态都已经变成暂停或者中断了,就什么都不要再做了,及时停止
                if (taskArrItem.state === 3 || taskArrItem.state === 5) {
                    return false
                }
                // 单个文件上传失败次数大于0则要减少一个
                taskArrItem.errNumber > 0 ? taskArrItem.errNumber-- : 0
                // 单个文件切片上传成功数+1
                taskArrItem.finishNumber++
                // 单个切片上传完成
                chunk.finish = true
                // 更新进度条(还没做)
                updateProgress(chunk, taskArrItem)
                // 上传成功了就删掉请求中数组中的那一片请求
                taskArrItem.whileRequests = taskArrItem.whileRequests.filter(
                    (item) => item.chunkFile !== chunk.chunkFile
                )

                // 如果单个文件最终成功数等于切片个数
                if (taskArrItem.finishNumber === chunkNumber) {
                    // 全部上传完切片后就开始合并切片
                    await handleMerge(taskArrItem)
                } else {
                    // 如果还没完全上传完，则继续上传
                    uploadSingleFile(taskArrItem)
                }
            } catch (e) {
                taskArrItem.errNumber++
                // 超过3次之后直接上传中断
                if (taskArrItem.errNumber > 3) {
                    console.log('切片上传失败超过三次了')
                    pauseUpload(taskArrItem, false) // 上传中断
                } else {
                    console.log('切片上传失败还没超过3次')
                    await uploadChunk(chunk) // 失败了一片,继续当前分片请求
                }
            }
        }

        // 开始单个上传
        for (const item of whileRequest) {
            uploadChunk(item)
        }
    }

    // 设置单个文件上传已完成
    const finishTask = (item: FileChunkProp) => {
        item.percentage = 100
        // 4是上传完成
        item.state = 4
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
            const res = await FileApi.uploadFileSingle(fd)
            
            // 上传成功
            uploadTask.endTime = Date.now()
            finishTask(uploadTask)
            
            // 触发成功事件
            events?.onSuccess?.(file.name, uploadTask.fileHash || 'unknown')
            events?.onComplete?.(file.name, true)
            
            // 更新最终进度
            const finalProgress: UploadProgress = {
                percentage: 100,
                status: 'success',
                fileName: file.name,
                uploadedSize: file.size,
                totalSize: file.size,
                speed: 0,
                remainingTime: 0,
            }
            events?.onProgress?.(finalProgress)
            
            return res
        } catch (error) {
            uploadTask.state = UploadState.Failed
            uploadTask.error = error instanceof Error ? error.message : '小文件上传失败'
            
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
            
            // 检查文件是否已经存在
            const { data } = await FileApi.checkFile({
                fileHash: `${fileHash}${baseName}`,
                fileName: file.name,
            })
            
            const { shouldUpload, uploadedList } = data
            if (!shouldUpload) {
                // 文件已存在，实现秒传
                uploadTask.endTime = Date.now()
                finishTask(uploadTask)
                console.log('文件已存在，实现秒传')
                
                events?.onSuccess?.(file.name, uploadTask.fileHash)
                events?.onComplete?.(file.name, true)
                
                const successProgress: UploadProgress = {
                    percentage: 100,
                    status: 'success',
                    fileName: file.name,
                    uploadedSize: file.size,
                    totalSize: file.size,
                    speed: 0,
                    remainingTime: 0,
                }
                events?.onProgress?.(successProgress)
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
                        cancel: null,
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
        
        // 工具方法
        pauseUpload,
        finishTask,
        
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
