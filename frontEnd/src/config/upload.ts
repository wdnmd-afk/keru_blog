/**
 * 文件上传配置
 * 统一管理文件上传相关的配置项
 */

/** 文件大小单位常量 */
export const FILE_SIZE_UNITS = {
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
} as const

/** 文件上传配置 */
export const UPLOAD_CONFIG = {
    /** 文件大小限制 */
    FILE_SIZE: {
        /** 最大文件大小（字节） - 1GB */
        MAX_SIZE: 1 * FILE_SIZE_UNITS.GB,
        /** 最大文件大小（可读格式） */
        MAX_SIZE_TEXT: '1GB',
        /** 分片大小（字节） - 1MB */
        CHUNK_SIZE: 1 * FILE_SIZE_UNITS.MB,
        /** 分片大小（可读格式） */
        CHUNK_SIZE_TEXT: '1MB',
    },

    /** 并发控制 */
    CONCURRENCY: {
        /** 最大并发请求数 */
        MAX_CONCURRENT: 3,
        /** 最大重试次数 */
        MAX_RETRIES: 3,
        /** 重试延迟基数（毫秒） */
        RETRY_DELAY_BASE: 1000,
    },

    /** 超时配置 */
    TIMEOUT: {
        /** 分片上传超时（毫秒） - 30秒 */
        CHUNK_UPLOAD: 30 * 1000,
        /** 小文件上传超时（毫秒） - 60秒 */
        SMALL_FILE_UPLOAD: 60 * 1000,
    },

    /** 支持的文件类型 */
    ALLOWED_TYPES: [
        // 图片类型
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/svg+xml',

        // 文档类型
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'text/csv',

        // 压缩文件
        'application/zip',
        'application/x-rar-compressed',
        'application/x-7z-compressed',
        'application/x-tar',
        'application/gzip',

        // 音频类型
        'audio/mpeg',
        'audio/wav',
        'audio/ogg',
        'audio/mp4',
        'audio/aac',

        // 视频类型
        'video/mp4',
        'video/avi',
        'video/mov',
        'video/wmv',
        'video/flv',
        'video/webm',

        // 可执行文件
        'application/x-msdownload',
        'application/octet-stream',
    ],

    /** 文件扩展名映射 */
    EXTENSION_MAP: {
        // 图片
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.bmp': 'image/bmp',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',

        // 文档
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.txt': 'text/plain',
        '.csv': 'text/csv',

        // 压缩文件
        '.zip': 'application/zip',
        '.rar': 'application/x-rar-compressed',
        '.7z': 'application/x-7z-compressed',
        '.tar': 'application/x-tar',
        '.gz': 'application/gzip',

        // 音频
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.ogg': 'audio/ogg',
        '.m4a': 'audio/mp4',
        '.aac': 'audio/aac',

        // 视频
        '.mp4': 'video/mp4',
        '.avi': 'video/avi',
        '.mov': 'video/mov',
        '.wmv': 'video/wmv',
        '.flv': 'video/flv',
        '.webm': 'video/webm',

        // 可执行文件
        '.exe': 'application/x-msdownload',
        '.msi': 'application/x-msdownload',
    },
} as const

/** 工具函数 */
export const UploadUtils = {
    /**
     * 格式化文件大小
     * @param bytes 字节数
     * @returns 格式化后的文件大小字符串
     */
    formatFileSize: (bytes: number): string => {
        if (bytes === 0) return '0 B'

        const units = ['B', 'KB', 'MB', 'GB', 'TB']
        const k = 1024
        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`
    },

    /**
     * 检查文件大小是否超限
     * @param fileSize 文件大小（字节）
     * @returns 是否超限
     */
    isFileSizeExceeded: (fileSize: number): boolean => {
        return fileSize > UPLOAD_CONFIG.FILE_SIZE.MAX_SIZE
    },

    /**
     * 检查文件类型是否支持
     * @param fileType 文件MIME类型
     * @returns 是否支持
     */
    isFileTypeSupported: (fileType: string): boolean => {
        return (UPLOAD_CONFIG.ALLOWED_TYPES as readonly string[]).includes(fileType)
    },

    /**
     * 根据文件扩展名获取MIME类型
     * @param fileName 文件名
     * @returns MIME类型
     */
    getMimeTypeByExtension: (fileName: string): string => {
        const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
        return (
            UPLOAD_CONFIG.EXTENSION_MAP[ext as keyof typeof UPLOAD_CONFIG.EXTENSION_MAP] ||
            'application/octet-stream'
        )
    },

    /**
     * 获取文件大小限制错误消息
     * @returns 错误消息
     */
    getFileSizeErrorMessage: (): string => {
        return `文件大小不能超过${UPLOAD_CONFIG.FILE_SIZE.MAX_SIZE_TEXT}`
    },

    /**
     * 获取文件类型错误消息
     * @returns 错误消息
     */
    getFileTypeErrorMessage: (): string => {
        return '不支持的文件类型'
    },
}

export default UPLOAD_CONFIG
