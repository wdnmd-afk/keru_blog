import { FileApi } from '@/api'
import { message } from 'antd'
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
    whileRequests: any[] // 正在请求中的请求个数,目前是要永远都保存请求个数为6
    finishNumber: number // 请求完成的个数
    errNumber: number // 报错的个数,默认是0个,超多3个就是直接上传中断
    percentage: number // 单个文件上传进度条
    cancel: null | (() => void) // 用于取消切片上传接口
    id: number | string
}

interface ChunkProp {
    fileHash: string // 总文件hash
    fileSize: number // 总文件size
    fileName: string // 总文件name
    index: number
    chunkFile: any // 切片文件本身
    chunkHash: string // 单个切片hash,以 - 连接
    chunkSize: number | undefined // 切片文件大小
    chunkNumber: number // 切片个数
    finish: boolean // 切片是否已经完成
    cancel?: null | (() => void)
}

interface UploadProgress {
    percentage: number
    status: 'pending' | 'uploading' | 'success' | 'error'
    fileName: string
}

// 默认配置
const DEFAULT_OPTIONS: UploadOptions = {
    chunkSize: 1024 * 1024, // 1M
    maxConcurrent: 3,
    baseUrl: '/api/upload',
}

export const useUpload = (options?: UploadOptions) => {
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        percentage: 0,
        status: 'pending',
        fileName: '',
    })
    const [messageApi] = message.useMessage()
    const [uploadFileList, setUploadFileList] = useState<FileChunkProp[]>([])
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
        const res = await FileApi.mergeChunk({
            chunkSize: DEFAULT_OPTIONS.chunkSize!,
            fileName,
            fileHash,
        }).catch(() => {
            // 否则暂停上传该文件
            pauseUpload(taskArrItem, true)
            console.log('文件合并失败！')
        })
        //  如果合并成功则标识该文件已经上传完成
        finishTask(taskArrItem)
        // 最后赋值文件切片上传完成个数为0
        taskArrItem.finishNumber = 0
        messageApi.success(fileName + '文件上传成功！')
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
    const uploadComplete = async (file: File) => {
        console.log(file, 'ffff')
        //单独把小于1m的文件上传
        const fd = new FormData()
        fd.append('file', file)
        // 直接使用原始文件名，让后端处理编码问题
        fd.append('fileName', file.name)
        console.log('小文件上传 - 文件名:', file.name)
        const res = await FileApi.uploadFileSingle(fd)
    }
    // 主上传函数
    const handleUpload = useCallback(
        async (files: UploadFile[]) => {
            for await (const [index, file] of files.entries()) {
                const chunkSize = options?.chunkSize || DEFAULT_OPTIONS.chunkSize
                const uploadTask: FileChunkProp = {
                    id: generateRandomId() + index, // 因为forEach是同步，所以需要用指定id作为唯一标识
                    state: 0, // 0是什么都不做,1文件处理中,2是上传中,3是暂停,4是上传完成,5上传中断，6是上传失败
                    fileHash: '',
                    fileName: file.name,
                    fileSize: file.size!,
                    allChunkList: [], // 所有请求的数据
                    whileRequests: [], // 正在请求中的请求个数,目前是要永远都保存请求个数为6
                    finishNumber: 0, //请求完成的个数
                    errNumber: 0, // 报错的个数,默认是0个,超多3个就是直接上传中断
                    percentage: 0, // 单个文件上传进度条
                    cancel: null, // 用于取消切片上传接口
                }
                setUploadFileList([...uploadFileList, uploadTask])

                // 切片上传
                try {
                    setUploadProgress({
                        percentage: 0,
                        status: 'uploading',
                        fileName: file.name,
                    })

                    if (file.size! <= chunkSize!) {
                        // 小文件直接上传
                        console.log(file, 'size <= chunkSize')
                        uploadTask.state = 2

                        await uploadComplete(file.originFileObj as File)
                    } else {
                        // 大文件切片上传
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const { fileHash, fileChunkList } = await useWorker(file.originFileObj as Blob)
                        // 解析完成开始上传文件
                        let baseName = ''
                        // 查找'.'在fileName中最后出现的位置
                        const lastIndex = file.name.lastIndexOf('.')
                        // 如果'.'不存在，则返回整个文件名
                        if (lastIndex === -1) {
                            baseName = file.name
                        }
                        // 否则，返回从fileName开始到'.'前一个字符的子串作为文件名（不包含'.'）
                        baseName = file.name.slice(0, lastIndex)
                        // 这里要注意！可能同一个文件，是复制出来的，出现文件名不同但是内容相同，导致获取到的hash值也是相同的
                        // 所以文件hash要特殊处理
                        uploadTask.fileHash = `${fileHash}${baseName}`
                        uploadTask.state = 2
                        // 检查文件是否已经存在
                        //fetch（check）
                        const { data, code } = await FileApi.checkFile({
                            fileHash: `${fileHash}${baseName}`,
                            fileName: file.name,
                        })
                        const { shouldUpload, uploadedList } = data
                        if (!shouldUpload) {
                            finishTask(uploadTask)
                            console.log('文件已存在，实现秒传')
                            return false
                        }
                        //分解chunk列表
                        uploadTask.allChunkList = fileChunkList.map((item, index) => {
                            return {
                                fileHash: `${fileHash}${baseName}`,
                                fileSize: file.size || 0, // 使用默认值 0
                                fileName: file.name,
                                index: index,
                                chunkFile: item.chunkFile,
                                chunkHash: `${fileHash}-${index}`,
                                chunkSize: chunkSize,
                                chunkNumber: fileChunkList.length,
                                finish: false,
                            }
                        })
                        // 如果已存在部分文件切片，则要过滤调已经上传的切片
                        if (uploadedList.length > 0) {
                            // 过滤掉已经上传过的切片
                            uploadTask.allChunkList = uploadTask.allChunkList.filter(
                                (item) => !uploadedList.includes(item.chunkHash)
                            )
                            console.log(uploadTask.allChunkList, '当前还需要上传的切片')
                            // 如果存在需要上传的，但是又为空，可能是因为还没合并，
                            if (!uploadTask.allChunkList.length) {
                                // 所以需要调用合并接口
                                await handleMerge(uploadTask)
                                return false
                            } else {
                                // 同时要注意处理切片数量
                                uploadTask.allChunkList = uploadTask.allChunkList.map((item) => {
                                    return {
                                        ...item,
                                        chunkNumber: uploadTask.allChunkList.length,
                                    }
                                })
                            }
                        }

                        // 逐步对单个文件进行切片上传
                        uploadSingleFile(uploadTask)
                    }
                } catch (error) {
                    setUploadProgress((prev) => ({ ...prev, status: 'error' }))
                    throw error
                }
            }
        },
        [options]
    )

    return {
        upload: handleUpload,
        uploadProgress,
        uploadFileList,
    }
}
