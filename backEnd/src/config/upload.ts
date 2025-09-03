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
  
  /** 存储配置 */
  STORAGE: {
    /** 上传临时目录 */
    TEMP_DIR: 'uploads/temp',
    /** 分片存储目录 */
    CHUNK_DIR: 'uploads/chunks',
    /** 最终文件存储目录 */
    FINAL_DIR: 'uploads/files',
    /** 临时文件清理时间（小时） */
    TEMP_FILE_EXPIRE_HOURS: 24,
  },
  
  /** 并发控制 */
  CONCURRENCY: {
    /** 最大并发上传数 */
    MAX_CONCURRENT_UPLOADS: 10,
    /** 单个用户最大并发数 */
    MAX_USER_CONCURRENT: 3,
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
  
  /** 安全配置 */
  SECURITY: {
    /** 是否启用文件类型检查 */
    ENABLE_TYPE_CHECK: true,
    /** 是否启用文件大小检查 */
    ENABLE_SIZE_CHECK: true,
    /** 是否启用病毒扫描 */
    ENABLE_VIRUS_SCAN: false,
    /** 危险文件扩展名黑名单 */
    DANGEROUS_EXTENSIONS: [
      '.bat', '.cmd', '.com', '.cpl', '.dll', '.exe', '.gadget', '.inf1', 
      '.ins', '.inx', '.isu', '.job', '.jse', '.lnk', '.msc', '.msi', '.msp', 
      '.mst', '.paf', '.pif', '.ps1', '.reg', '.rgs', '.scr', '.sct', '.shb', 
      '.shs', '.u3p', '.vb', '.vbe', '.vbs', '.vbscript', '.ws', '.wsf', '.wsh'
    ],
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
    return UPLOAD_CONFIG.ALLOWED_TYPES.includes(fileType)
  },
  
  /**
   * 检查文件扩展名是否危险
   * @param fileName 文件名
   * @returns 是否危险
   */
  isDangerousFile: (fileName: string): boolean => {
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
    return UPLOAD_CONFIG.SECURITY.DANGEROUS_EXTENSIONS.includes(ext)
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
  
  /**
   * 获取危险文件错误消息
   * @returns 错误消息
   */
  getDangerousFileErrorMessage: (): string => {
    return '检测到危险文件类型，上传被拒绝'
  },
}

export default UPLOAD_CONFIG
