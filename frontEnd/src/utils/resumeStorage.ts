/**
 * 断点续传存储工具类
 * 用于管理文件上传的断点信息，支持本地存储和恢复
 */

/** 断点续传信息接口 */
export interface ResumeInfo {
    /** 文件哈希值 */
    fileHash: string
    /** 文件名 */
    fileName: string
    /** 文件大小 */
    fileSize: number
    /** 文件类型 */
    fileType: string
    /** 已上传的分片索引数组 */
    uploadedChunks: number[]
    /** 总分片数 */
    totalChunks: number
    /** 分片大小 */
    chunkSize: number
    /** 最后上传时间 */
    lastUploadTime: number
    /** 上传进度百分比 */
    percentage: number
    /** 上传状态 */
    status: 'pending' | 'uploading' | 'paused' | 'failed' | 'completed'
    /** 暂停原因 */
    pauseReason?: string
    /** 错误信息 */
    error?: string
}

/** 存储配置接口 */
export interface StorageConfig {
    /** 存储键前缀 */
    keyPrefix: string
    /** 数据过期时间（小时） */
    expireHours: number
    /** 最大存储条目数 */
    maxItems: number
}

/**
 * 断点续传存储管理类
 */
export class ResumeStorage {
    /** 默认存储键 */
    private static readonly STORAGE_KEY = 'file_upload_resume_data'

    /** 默认配置 */
    private static readonly DEFAULT_CONFIG: StorageConfig = {
        keyPrefix: 'resume_',
        expireHours: 24, // 24小时过期
        maxItems: 100, // 最多存储100个文件的断点信息
    }

    /**
     * 保存断点续传信息
     * @param fileHash 文件哈希值
     * @param info 断点信息
     */
    static saveResumeInfo(fileHash: string, info: ResumeInfo): void {
        try {
            const storageData = this.getStorageData()
            const key = this.getFileKey(fileHash)

            // 更新断点信息
            storageData[key] = {
                ...info,
                lastUploadTime: Date.now(),
            }

            // 清理过期数据
            this.cleanExpiredData(storageData)

            // 限制存储条目数量
            this.limitStorageItems(storageData)

            // 保存到本地存储
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData))

            console.log(`断点信息已保存: ${info.fileName} (${fileHash})`)
        } catch (error) {
            console.error('保存断点信息失败:', error)
        }
    }

    /**
     * 获取断点续传信息
     * @param fileHash 文件哈希值
     * @returns 断点信息或null
     */
    static getResumeInfo(fileHash: string): ResumeInfo | null {
        try {
            const storageData = this.getStorageData()
            const key = this.getFileKey(fileHash)
            const info = storageData[key]

            if (!info) {
                return null
            }

            // 检查是否过期
            if (this.isExpired(info)) {
                this.removeResumeInfo(fileHash)
                return null
            }

            return info
        } catch (error) {
            console.error('获取断点信息失败:', error)
            return null
        }
    }

    /**
     * 移除断点续传信息
     * @param fileHash 文件哈希值
     */
    static removeResumeInfo(fileHash: string): void {
        try {
            const storageData = this.getStorageData()
            const key = this.getFileKey(fileHash)

            if (storageData[key]) {
                delete storageData[key]
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData))
                console.log(`断点信息已删除: ${fileHash}`)
            }
        } catch (error) {
            console.error('删除断点信息失败:', error)
        }
    }

    /**
     * 更新上传进度
     * @param fileHash 文件哈希值
     * @param uploadedChunks 已上传分片索引
     * @param percentage 进度百分比
     */
    static updateProgress(fileHash: string, uploadedChunks: number[], percentage: number): void {
        const info = this.getResumeInfo(fileHash)
        if (info) {
            info.uploadedChunks = uploadedChunks
            info.percentage = percentage
            info.lastUploadTime = Date.now()
            this.saveResumeInfo(fileHash, info)
        }
    }

    /**
     * 更新文件状态
     * @param fileHash 文件哈希值
     * @param status 新状态
     * @param error 错误信息（可选）
     */
    static updateStatus(fileHash: string, status: ResumeInfo['status'], error?: string): void {
        const info = this.getResumeInfo(fileHash)
        if (info) {
            info.status = status
            if (error) {
                info.error = error
            }
            this.saveResumeInfo(fileHash, info)
        }
    }

    /**
     * 获取所有断点信息
     * @returns 所有有效的断点信息
     */
    static getAllResumeInfo(): ResumeInfo[] {
        try {
            const storageData = this.getStorageData()
            const validInfos: ResumeInfo[] = []

            Object.values(storageData).forEach((info) => {
                if (!this.isExpired(info)) {
                    validInfos.push(info)
                }
            })

            return validInfos.sort((a, b) => b.lastUploadTime - a.lastUploadTime)
        } catch (error) {
            console.error('获取所有断点信息失败:', error)
            return []
        }
    }

    /**
     * 清理过期数据
     * @param expireHours 过期时间（小时），默认24小时
     */
    static clearExpiredData(expireHours: number = 24): void {
        try {
            const storageData = this.getStorageData()
            let cleanedCount = 0

            Object.keys(storageData).forEach((key) => {
                if (this.isExpired(storageData[key], expireHours)) {
                    delete storageData[key]
                    cleanedCount++
                }
            })

            if (cleanedCount > 0) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData))
                console.log(`已清理 ${cleanedCount} 个过期的断点信息`)
            }
        } catch (error) {
            console.error('清理过期数据失败:', error)
        }
    }

    /**
     * 清空所有断点数据
     */
    static clearAllData(): void {
        try {
            localStorage.removeItem(this.STORAGE_KEY)
            console.log('所有断点信息已清空')
        } catch (error) {
            console.error('清空断点数据失败:', error)
        }
    }

    /**
     * 获取存储数据大小（KB）
     * @returns 存储大小
     */
    static getStorageSize(): number {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY)
            return data ? new Blob([data]).size / 1024 : 0
        } catch (error) {
            console.error('获取存储大小失败:', error)
            return 0
        }
    }

    // ==================== 私有方法 ====================

    /**
     * 获取存储数据
     * @returns 存储数据对象
     */
    private static getStorageData(): Record<string, ResumeInfo> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY)
            return data ? JSON.parse(data) : {}
        } catch (error) {
            console.error('解析存储数据失败:', error)
            return {}
        }
    }

    /**
     * 生成文件存储键
     * @param fileHash 文件哈希值
     * @returns 存储键
     */
    private static getFileKey(fileHash: string): string {
        return `${this.DEFAULT_CONFIG.keyPrefix}${fileHash}`
    }

    /**
     * 检查数据是否过期
     * @param info 断点信息
     * @param expireHours 过期时间（小时）
     * @returns 是否过期
     */
    private static isExpired(
        info: ResumeInfo,
        expireHours: number = this.DEFAULT_CONFIG.expireHours
    ): boolean {
        const expireTime = info.lastUploadTime + expireHours * 60 * 60 * 1000
        return Date.now() > expireTime
    }

    /**
     * 清理过期数据
     * @param storageData 存储数据
     */
    private static cleanExpiredData(storageData: Record<string, ResumeInfo>): void {
        Object.keys(storageData).forEach((key) => {
            if (this.isExpired(storageData[key])) {
                delete storageData[key]
            }
        })
    }

    /**
     * 限制存储条目数量
     * @param storageData 存储数据
     */
    private static limitStorageItems(storageData: Record<string, ResumeInfo>): void {
        const items = Object.entries(storageData)
        if (items.length > this.DEFAULT_CONFIG.maxItems) {
            // 按最后上传时间排序，删除最旧的条目
            items.sort((a, b) => a[1].lastUploadTime - b[1].lastUploadTime)
            const itemsToRemove = items.slice(0, items.length - this.DEFAULT_CONFIG.maxItems)

            itemsToRemove.forEach(([key]) => {
                delete storageData[key]
            })
        }
    }
}
