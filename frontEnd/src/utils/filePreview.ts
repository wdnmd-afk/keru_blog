/**
 * 文件预览工具函数
 * 用于判断文件类型并返回对应的预览器类型
 */

/** 文件预览类型枚举 */
export enum FilePreviewType {
  IMAGE = 'image',
  PDF = 'pdf',
  VIDEO = 'video',
  AUDIO = 'audio',
  TEXT = 'text',
  MARKDOWN = 'markdown',
  CODE = 'code',
  OFFICE = 'office',
  ARCHIVE = 'archive',
  UNKNOWN = 'unknown'
}

/** 文件类型映射配置 */
const FILE_TYPE_MAP = {
  // 图片类型
  [FilePreviewType.IMAGE]: {
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico'],
    mimeTypes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      'image/svg+xml',
      'image/x-icon'
    ]
  },
  
  // PDF文档
  [FilePreviewType.PDF]: {
    extensions: ['.pdf'],
    mimeTypes: ['application/pdf']
  },
  
  // 视频类型
  [FilePreviewType.VIDEO]: {
    extensions: ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm', '.m4v'],
    mimeTypes: [
      'video/mp4',
      'video/avi',
      'video/quicktime',
      'video/x-ms-wmv',
      'video/x-flv',
      'video/x-matroska',
      'video/webm'
    ]
  },
  
  // 音频类型
  [FilePreviewType.AUDIO]: {
    extensions: ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.wma'],
    mimeTypes: [
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/mp4',
      'audio/aac',
      'audio/flac',
      'audio/x-ms-wma'
    ]
  },
  
  // 文本类型
  [FilePreviewType.TEXT]: {
    extensions: ['.txt', '.log', '.csv', '.xml', '.json', '.yaml', '.yml', '.ini', '.cfg'],
    mimeTypes: [
      'text/plain',
      'text/csv',
      'application/xml',
      'text/xml',
      'application/json',
      'text/yaml',
      'application/yaml'
    ]
  },
  
  // Markdown类型
  [FilePreviewType.MARKDOWN]: {
    extensions: ['.md', '.markdown'],
    mimeTypes: ['text/markdown', 'text/x-markdown']
  },
  
  // 代码类型
  [FilePreviewType.CODE]: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx', '.vue', '.html', '.htm', '.css', '.scss', '.sass', '.less',
      '.php', '.py', '.java', '.c', '.cpp', '.h', '.hpp', '.cs', '.go', '.rs', '.rb', '.swift',
      '.kt', '.scala', '.sh', '.bat', '.ps1', '.sql', '.r', '.m', '.pl', '.lua', '.dart'
    ],
    mimeTypes: [
      'text/javascript',
      'application/javascript',
      'text/typescript',
      'text/html',
      'text/css',
      'application/x-php',
      'text/x-python',
      'text/x-java-source',
      'text/x-c',
      'text/x-c++src'
    ]
  },
  
  // Office文档
  [FilePreviewType.OFFICE]: {
    extensions: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'],
    mimeTypes: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]
  },
  
  // 压缩文件
  [FilePreviewType.ARCHIVE]: {
    extensions: ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz'],
    mimeTypes: [
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/x-tar',
      'application/gzip',
      'application/x-bzip2'
    ]
  }
} as const

/**
 * 根据文件名获取文件扩展名
 * @param fileName 文件名
 * @returns 文件扩展名（小写，包含点号）
 */
export const getFileExtension = (fileName: string): string => {
  if (!fileName) return ''
  const lastDotIndex = fileName.lastIndexOf('.')
  return lastDotIndex === -1 ? '' : fileName.substring(lastDotIndex).toLowerCase()
}

/**
 * 根据文件名或MIME类型判断文件预览类型
 * @param fileName 文件名
 * @param mimeType MIME类型（可选）
 * @returns 文件预览类型
 */
export const getFilePreviewType = (fileName: string, mimeType?: string): FilePreviewType => {
  if (!fileName && !mimeType) {
    return FilePreviewType.UNKNOWN
  }
  
  const extension = getFileExtension(fileName)
  
  // 遍历所有文件类型映射，查找匹配的类型
  for (const [type, config] of Object.entries(FILE_TYPE_MAP)) {
    // 优先通过扩展名匹配
    if (extension && config.extensions.includes(extension)) {
      return type as FilePreviewType
    }
    
    // 通过MIME类型匹配
    if (mimeType && config.mimeTypes.includes(mimeType)) {
      return type as FilePreviewType
    }
  }
  
  return FilePreviewType.UNKNOWN
}

/**
 * 检查文件类型是否支持预览
 * @param fileName 文件名
 * @param mimeType MIME类型（可选）
 * @returns 是否支持预览
 */
export const isFilePreviewable = (fileName: string, mimeType?: string): boolean => {
  const previewType = getFilePreviewType(fileName, mimeType)
  return previewType !== FilePreviewType.UNKNOWN
}

/**
 * 获取文件类型的显示名称
 * @param previewType 文件预览类型
 * @returns 显示名称
 */
export const getFileTypeDisplayName = (previewType: FilePreviewType): string => {
  const displayNames = {
    [FilePreviewType.IMAGE]: '图片',
    [FilePreviewType.PDF]: 'PDF文档',
    [FilePreviewType.VIDEO]: '视频',
    [FilePreviewType.AUDIO]: '音频',
    [FilePreviewType.TEXT]: '文本',
    [FilePreviewType.MARKDOWN]: 'Markdown',
    [FilePreviewType.CODE]: '代码',
    [FilePreviewType.OFFICE]: 'Office文档',
    [FilePreviewType.ARCHIVE]: '压缩文件',
    [FilePreviewType.UNKNOWN]: '未知类型'
  }
  
  return displayNames[previewType] || '未知类型'
}

/**
 * 获取文件类型的图标名称（用于显示图标）
 * @param previewType 文件预览类型
 * @returns 图标名称
 */
export const getFileTypeIcon = (previewType: FilePreviewType): string => {
  const iconNames = {
    [FilePreviewType.IMAGE]: 'FileImageOutlined',
    [FilePreviewType.PDF]: 'FilePdfOutlined',
    [FilePreviewType.VIDEO]: 'VideoCameraOutlined',
    [FilePreviewType.AUDIO]: 'AudioOutlined',
    [FilePreviewType.TEXT]: 'FileTextOutlined',
    [FilePreviewType.MARKDOWN]: 'FileMarkdownOutlined',
    [FilePreviewType.CODE]: 'CodeOutlined',
    [FilePreviewType.OFFICE]: 'FileWordOutlined',
    [FilePreviewType.ARCHIVE]: 'FileZipOutlined',
    [FilePreviewType.UNKNOWN]: 'FileUnknownOutlined'
  }
  
  return iconNames[previewType] || 'FileUnknownOutlined'
}

/**
 * 检查文件是否可以在浏览器中直接预览（无需额外组件）
 * @param previewType 文件预览类型
 * @returns 是否可以直接预览
 */
export const canPreviewDirectly = (previewType: FilePreviewType): boolean => {
  // 图片、PDF、视频、音频可以直接在浏览器中预览
  return [
    FilePreviewType.IMAGE,
    FilePreviewType.PDF,
    FilePreviewType.VIDEO,
    FilePreviewType.AUDIO
  ].includes(previewType)
}

/**
 * 获取文件预览的建议最大尺寸（字节）
 * @param previewType 文件预览类型
 * @returns 建议最大尺寸
 */
export const getPreviewSizeLimit = (previewType: FilePreviewType): number => {
  const sizeLimits = {
    [FilePreviewType.IMAGE]: 10 * 1024 * 1024, // 10MB
    [FilePreviewType.PDF]: 50 * 1024 * 1024,   // 50MB
    [FilePreviewType.VIDEO]: 100 * 1024 * 1024, // 100MB
    [FilePreviewType.AUDIO]: 20 * 1024 * 1024,  // 20MB
    [FilePreviewType.TEXT]: 1 * 1024 * 1024,    // 1MB
    [FilePreviewType.MARKDOWN]: 1 * 1024 * 1024, // 1MB
    [FilePreviewType.CODE]: 1 * 1024 * 1024,    // 1MB
    [FilePreviewType.OFFICE]: 20 * 1024 * 1024, // 20MB
    [FilePreviewType.ARCHIVE]: 0,               // 不支持预览
    [FilePreviewType.UNKNOWN]: 0                // 不支持预览
  }
  
  return sizeLimits[previewType] || 0
}
