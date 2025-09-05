import { FileApi } from '@/api'
import type { FileInfo, FileItem, FileQuery, UploadFileItem } from '@/types/files'
import { message } from 'antd'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/**
 * 获取文件预览URL
 * @param path 文件名
 * @returns 文件预览URL
 */
const getFilePreviewUrl = (path: string): string => {
    // 优先使用环境变量
    const baseUrl = import.meta.env.VITE_FILE_BASE_URL
    console.log(path, 'base')

    // 移除路径开头的斜杠，避免双斜杠
    const cleanPath = path.startsWith('/') ? path.slice(1) : path

    if (baseUrl) {
        return `${baseUrl}/${cleanPath}`
    }

    // 生产环境使用当前域名
    if (import.meta.env.PROD) {
        return `/${cleanPath}`
    }

    // 开发环境默认配置 - 修复双斜杠问题
    return `http://localhost:5566/${cleanPath}`
}

/**
 * 文件状态管理接口
 */
export interface FileState {
    // === 文件列表相关状态 ===
    /** 文件列表 */
    fileList: FileItem[]
    /** 文件总数 */
    total: number
    /** 加载状态 */
    loading: boolean
    /** 错误信息 */
    error: string | null

    // === 查询相关状态 ===
    /** 查询参数 */
    query: FileQuery

    // === 上传相关状态 ===
    /** 上传文件列表 */
    uploadFileList: UploadFileItem[]
    /** 上传状态 */
    uploading: boolean

    // === 预览相关状态 ===
    /** 当前选中的文件 */
    selectedFile: FileItem | null
    /** 预览文件信息 */
    currentFileInfo: FileInfo | null
}

/**
 * 文件操作接口
 */
export interface FileActions {
    // === 文件列表操作 ===
    /** 获取文件列表 */
    fetchFileList: (queryParams?: Partial<FileQuery>) => Promise<void>
    /** 刷新文件列表 */
    refreshFileList: () => Promise<void>
    /** 删除文件 */
    deleteFile: (id: string) => Promise<void>

    // === 查询操作 ===
    /** 更新查询参数 */
    updateQuery: (query: Partial<FileQuery>) => void
    /** 重置查询参数 */
    resetQuery: () => void

    // === 上传操作 ===
    /** 设置上传文件列表 */
    setUploadFileList: (fileList: UploadFileItem[]) => void
    /** 添加上传文件 */
    addUploadFile: (file: UploadFileItem) => void
    /** 移除上传文件 */
    removeUploadFile: (uid: string) => void
    /** 更新上传文件状态 */
    updateUploadFileStatus: (uid: string, status: Partial<UploadFileItem>) => void
    /** 清空上传列表 */
    clearUploadList: () => void
    /** 设置上传状态 */
    setUploading: (uploading: boolean) => void

    // === 预览操作 ===
    /** 选择文件 */
    selectFile: (file: FileItem | null) => void
    /** 设置预览文件信息 */
    setCurrentFileInfo: (fileInfo: FileInfo | null) => void

    // === 通用操作 ===
    /** 设置加载状态 */
    setLoading: (loading: boolean) => void
    /** 设置错误信息 */
    setError: (error: string | null) => void
    /** 重置所有状态 */
    reset: () => void
}

/**
 * 完整的文件store类型
 */
export type FileStore = FileState & FileActions

// 默认查询参数
const defaultQuery: FileQuery = {
    page: 1,
    pageSize: 25,
    fileName: '',
    userName: '',
}

// 初始状态
const initialState: FileState = {
    fileList: [],
    total: 0,
    loading: false,
    error: null,
    query: { ...defaultQuery },
    uploadFileList: [],
    uploading: false,
    selectedFile: null,
    currentFileInfo: null,
}

/**
 * 文件状态管理 Store
 * 使用 Zustand + Immer 实现不可变状态管理
 */
export const useFileStore = create<FileStore>()(
    devtools(
        immer<FileStore>((set, get) => ({
            ...initialState,

            // === 文件列表操作 ===
            fetchFileList: async (queryParams?: Partial<FileQuery>) => {
                try {
                    set((state) => {
                        state.loading = true
                        state.error = null
                        if (queryParams) {
                            Object.assign(state.query, queryParams)
                        }
                    })

                    const { data } = await FileApi.queryFileList(get().query)

                    set((state) => {
                        state.fileList = data.fileList
                        state.total = data.total
                        state.loading = false
                    })
                } catch (error) {
                    console.error('Failed to fetch file list:', error)
                    set((state) => {
                        state.error = '获取文件列表失败'
                        state.loading = false
                        state.fileList = []
                        state.total = 0
                    })
                }
            },

            refreshFileList: async () => {
                return get().fetchFileList()
            },

            deleteFile: async (id: string) => {
                try {
                    await FileApi.deleteFile({ id })

                    // 删除成功后刷新列表
                    await get().refreshFileList()

                    // 如果删除的是当前选中的文件，清空选择
                    const { selectedFile, currentFileInfo } = get()
                    if (selectedFile?.id === id || currentFileInfo?.id === id) {
                        set((state) => {
                            state.selectedFile = null
                            state.currentFileInfo = null
                        })
                    }

                    message.success('文件删除成功')
                } catch (error) {
                    console.error('Failed to delete file:', error)
                    message.error('文件删除失败')
                    throw error
                }
            },

            // === 查询操作 ===
            updateQuery: (queryParams: Partial<FileQuery>) => {
                set((state) => {
                    Object.assign(state.query, queryParams)
                })

                // 自动触发查询（防抖在组件层面处理）
                get().fetchFileList()
            },

            resetQuery: () => {
                set((state) => {
                    state.query = { ...defaultQuery }
                })
                get().fetchFileList()
            },

            // === 上传操作 ===
            setUploadFileList: (fileList: UploadFileItem[]) => {
                set((state) => {
                    state.uploadFileList = fileList
                })
            },

            addUploadFile: (file: UploadFileItem) => {
                set((state) => {
                    state.uploadFileList.push(file)
                })
            },

            removeUploadFile: (uid: string) => {
                set((state) => {
                    state.uploadFileList = state.uploadFileList.filter((file) => file.uid !== uid)
                })
            },

            updateUploadFileStatus: (uid: string, status: Partial<UploadFileItem>) => {
                set((state) => {
                    const fileIndex = state.uploadFileList.findIndex((file) => file.uid === uid)
                    if (fileIndex !== -1) {
                        const oldStatus = state.uploadFileList[fileIndex].status
                        Object.assign(state.uploadFileList[fileIndex], status)
                        console.log('=== 文件状态更新 ===', {
                            uid,
                            fileName: state.uploadFileList[fileIndex].name,
                            oldStatus,
                            newStatus: status.status,
                            fileListLength: state.uploadFileList.length,
                        })
                    } else {
                        console.warn('未找到要更新的文件:', uid)
                    }
                })
            },

            clearUploadList: () => {
                set((state) => {
                    state.uploadFileList = []
                })
            },

            setUploading: (uploading: boolean) => {
                set((state) => {
                    state.uploading = uploading
                })
            },

            // === 预览操作 ===
            selectFile: (file: FileItem | null) => {
                set((state) => {
                    state.selectedFile = file
                    if (file) {
                        state.currentFileInfo = {
                            url: getFilePreviewUrl(file.path),
                            name: file.filename,
                            mimeType: file.mimeType,
                            size: file.size,
                            id: file.id,
                        }
                    } else {
                        state.currentFileInfo = null
                    }
                })
            },

            setCurrentFileInfo: (fileInfo: FileInfo | null) => {
                set((state) => {
                    state.currentFileInfo = fileInfo
                })
            },

            // === 通用操作 ===
            setLoading: (loading: boolean) => {
                set((state) => {
                    state.loading = loading
                })
            },

            setError: (error: string | null) => {
                set((state) => {
                    state.error = error
                })
            },

            reset: () => {
                set((state) => {
                    Object.assign(state, initialState)
                })
            },
        })),
        {
            name: 'file-store', // 用于 Redux DevTools
        }
    )
)

/**
 * 文件store的选择器函数
 * 用于组件中选择特定的状态片段
 */
export const fileSelectors = {
    // 文件列表相关
    fileList: (state: FileStore) => state.fileList,
    total: (state: FileStore) => state.total,
    loading: (state: FileStore) => state.loading,
    error: (state: FileStore) => state.error,

    // 查询相关
    query: (state: FileStore) => state.query,

    // 上传相关
    uploadFileList: (state: FileStore) => state.uploadFileList,
    uploading: (state: FileStore) => state.uploading,

    // 预览相关
    selectedFile: (state: FileStore) => state.selectedFile,
    currentFileInfo: (state: FileStore) => state.currentFileInfo,

    // 组合状态
    fileListData: (state: FileStore) => ({
        fileList: state.fileList,
        total: state.total,
        loading: state.loading,
        error: state.error,
        query: state.query,
    }),

    uploadData: (state: FileStore) => ({
        fileList: state.uploadFileList,
        uploading: state.uploading,
    }),

    previewData: (state: FileStore) => ({
        selectedFile: state.selectedFile,
        currentFileInfo: state.currentFileInfo,
    }),
}
