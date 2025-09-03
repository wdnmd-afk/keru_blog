/**
 * Files 模块类型定义
 * 提供文件管理相关的TypeScript类型定义
 */

// ==================== 基础类型 ====================

/**
 * 文件基本信息接口
 */
export interface FileItem {
  /** 文件唯一标识 */
  id: string
  /** 文件名 */
  filename: string
  /** 文件大小（字节） */
  size: number
  /** MIME类型 */
  mimeType: string
  /** 文件路径 */
  path: string
  /** 上传时间 */
  uploadedAt: string
  /** 更新时间 */
  updatedAt: string
  /** 上传者 */
  uploader: string
}

/**
 * 文件信息接口（用于预览）
 */
export interface FileInfo {
  /** 文件URL */
  url: string
  /** 文件名 */
  name: string
  /** MIME类型 */
  mimeType: string
  /** 文件大小（可选） */
  size?: number
  /** 文件ID（可选） */
  id?: string
}

// ==================== 查询相关类型 ====================

/**
 * 文件查询参数接口
 */
export interface FileQuery {
  /** 页码 */
  page: number
  /** 每页大小 */
  pageSize: number
  /** 文件名搜索（可选） */
  fileName?: string
  /** 用户名搜索（可选） */
  userName?: string
}

/**
 * 文件列表响应接口
 */
export interface FileListResponse {
  /** 文件列表 */
  fileList: FileItem[]
  /** 总数 */
  total: number
}

// ==================== 上传相关类型 ====================

/**
 * 上传状态枚举
 */
export enum UploadStatus {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  ERROR = 'error',
  PAUSED = 'paused'
}

/**
 * 上传状态类型联合
 */
export type UploadStatusType = 'pending' | 'uploading' | 'success' | 'error' | 'paused'

/**
 * 上传进度信息
 */
export interface UploadProgress {
  /** 上传百分比 */
  percentage: number
  /** 上传状态 */
  status: UploadStatusType
  /** 文件名 */
  fileName: string
  /** 错误信息（可选） */
  error?: string
}

/**
 * 文件上传项接口
 */
export interface UploadFileItem {
  /** 文件唯一标识 */
  uid: string
  /** 文件名 */
  name: string
  /** 文件大小 */
  size: number
  /** 文件类型 */
  type: string
  /** 文件对象 */
  originFileObj?: File
  /** 上传状态 */
  status?: UploadStatusType
  /** 上传进度 */
  percent?: number
  /** 错误信息 */
  error?: string
}

// ==================== 预览相关类型 ====================

/**
 * 文件类型枚举
 */
export enum FileType {
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  OTHER = 'OTHER'
}

/**
 * 预览组件通用Props
 */
export interface ViewerComponentProps {
  /** 文件URL */
  url: string
  /** 文件信息 */
  fileInfo?: FileInfo
  /** 加载状态 */
  loading?: boolean
  /** 错误信息 */
  error?: string
}

/**
 * 工具栏功能项接口
 */
export interface ToolbarAction {
  /** 图标名称 */
  icon: string
  /** 标题 */
  title: string
  /** 点击回调 */
  onClick: () => void
  /** 是否禁用 */
  disabled?: boolean
}

// ==================== API相关类型 ====================

/**
 * API响应基础接口
 */
export interface ApiResponse<T = any> {
  /** 响应码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
  /** 是否成功 */
  success: boolean
}

/**
 * 文件上传参数
 */
export interface UploadParams {
  /** 文件哈希 */
  fileHash: string
  /** 文件名 */
  fileName: string
  /** 文件大小 */
  fileSize?: number
}

/**
 * 文件合并参数
 */
export interface MergeParams extends UploadParams {
  /** 切片大小 */
  chunkSize: number
}

/**
 * 文件删除参数
 */
export interface DeleteFileParams {
  /** 文件ID */
  id: string
}

// ==================== 组件Props类型 ====================

/**
 * 文件列表组件Props
 */
export interface FileListProps {
  /** 文件列表 */
  fileList: FileItem[]
  /** 总数 */
  total: number
  /** 当前页 */
  current: number
  /** 每页大小 */
  pageSize: number
  /** 加载状态 */
  loading?: boolean
  /** 错误状态 */
  error?: string | Error
  /** 选中的文件 */
  selectedFile?: FileItem
  /** 行点击回调 */
  onRowClick?: (file: FileItem) => void
  /** 删除回调 */
  onDelete?: (file: FileItem) => void
  /** 分页回调 */
  onPageChange?: (page: number, pageSize: number) => void
  /** 重试回调 */
  onRetry?: () => void
}

/**
 * 文件搜索组件Props
 */
export interface FileSearchProps {
  /** 搜索值 */
  value: FileQuery
  /** 搜索回调 */
  onSearch: (query: FileQuery) => void
  /** 重置回调 */
  onReset?: () => void
  /** 加载状态 */
  loading?: boolean
}

/**
 * 文件上传组件Props
 */
export interface FileUploadProps {
  /** 上传的文件列表 */
  fileList: UploadFileItem[]
  /** 上传状态 */
  uploading?: boolean
  /** 文件列表变化回调 */
  onFileListChange: (fileListOrUpdater: UploadFileItem[] | ((prev: UploadFileItem[]) => UploadFileItem[])) => void
  /** 上传回调 */
  onUpload: (fileList: UploadFileItem[]) => Promise<void>
  /** 移除文件回调 */
  onRemove?: (file: UploadFileItem) => void
}

/**
 * 文件预览组件Props
 */
export interface FilePreviewProps {
  /** 文件信息 */
  fileInfo?: FileInfo
  /** 加载状态 */
  loading?: boolean
  /** 错误信息 */
  error?: string
  /** 关闭回调 */
  onClose?: () => void
}

// ==================== 状态管理类型 ====================

/**
 * Files模块状态接口
 */
export interface FilesState {
  /** 文件列表 */
  fileList: FileItem[]
  /** 总数 */
  total: number
  /** 加载状态 */
  loading: boolean
  /** 选中的文件 */
  selectedFile: FileItem | null
  /** 查询参数 */
  query: FileQuery
  /** 上传文件列表 */
  uploadFileList: UploadFileItem[]
  /** 上传状态 */
  uploading: boolean
  /** 刷新触发器 */
  refreshTrigger: number
}

/**
 * Files模块操作接口
 */
export interface FilesActions {
  /** 获取文件列表 */
  fetchFileList: (query?: Partial<FileQuery>) => Promise<void>
  /** 选择文件 */
  selectFile: (file: FileItem | null) => void
  /** 删除文件 */
  deleteFile: (id: string) => Promise<void>
  /** 更新查询参数 */
  updateQuery: (query: Partial<FileQuery>) => void
  /** 刷新列表 */
  refresh: () => void
  /** 设置上传文件列表 */
  setUploadFileList: (fileList: UploadFileItem[]) => void
  /** 上传文件 */
  uploadFiles: (fileList: UploadFileItem[]) => Promise<void>
  /** 重置状态 */
  reset: () => void
}

// ==================== 工具类型 ====================

/**
 * 分页信息
 */
export interface PaginationInfo {
  current: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => string
}

/**
 * 表格列配置
 */
export interface TableColumn<T = any> {
  title: string
  key: string
  dataIndex?: string
  width?: number | string
  render?: (value: any, record: T, index: number) => React.ReactNode
  sorter?: boolean | ((a: T, b: T) => number)
  filters?: Array<{ text: string; value: any }>
  onFilter?: (value: any, record: T) => boolean
}

/**
 * 尺寸大小枚举
 */
export enum Size {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large'
}

/**
 * 主题类型
 */
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
