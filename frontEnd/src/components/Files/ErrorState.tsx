import { Alert, Button, Result } from 'antd'
import { ExclamationCircleOutlined, ReloadOutlined, WarningOutlined } from '@ant-design/icons'
import React from 'react'

/**
 * 错误类型枚举
 */
export enum ErrorType {
  /** 网络错误 */
  NETWORK = 'network',
  /** 权限错误 */
  PERMISSION = 'permission',
  /** 文件错误 */
  FILE = 'file',
  /** 服务器错误 */
  SERVER = 'server',
  /** 未知错误 */
  UNKNOWN = 'unknown'
}

/**
 * 文件错误信息接口
 */
export interface FileErrorInfo {
  /** 错误类型 */
  type: ErrorType
  /** 错误消息 */
  message: string
  /** 错误代码 */
  code?: string | number
  /** 详细信息 */
  details?: string
  /** 是否可重试 */
  retryable?: boolean
}

/**
 * 错误提示组件Props
 */
interface ErrorStateProps {
  /** 错误信息 */
  error: FileErrorInfo | string
  /** 重试回调 */
  onRetry?: () => void
  /** 关闭回调 */
  onClose?: () => void
  /** 是否显示详细信息 */
  showDetails?: boolean
  /** 组件大小 */
  size?: 'small' | 'default' | 'large'
  /** 是否显示为内联模式 */
  inline?: boolean
}

/**
 * 获取错误图标
 */
const getErrorIcon = (type: ErrorType) => {
  switch (type) {
    case ErrorType.NETWORK:
      return <ExclamationCircleOutlined />
    case ErrorType.PERMISSION:
      return <WarningOutlined />
    case ErrorType.FILE:
      return <ExclamationCircleOutlined />
    case ErrorType.SERVER:
      return <ExclamationCircleOutlined />
    default:
      return <ExclamationCircleOutlined />
  }
}

/**
 * 获取错误标题
 */
const getErrorTitle = (type: ErrorType) => {
  switch (type) {
    case ErrorType.NETWORK:
      return '网络连接失败'
    case ErrorType.PERMISSION:
      return '权限不足'
    case ErrorType.FILE:
      return '文件操作失败'
    case ErrorType.SERVER:
      return '服务器错误'
    default:
      return '操作失败'
  }
}

/**
 * 获取错误建议
 */
const getErrorSuggestion = (type: ErrorType) => {
  switch (type) {
    case ErrorType.NETWORK:
      return '请检查网络连接后重试'
    case ErrorType.PERMISSION:
      return '请联系管理员获取相应权限'
    case ErrorType.FILE:
      return '请检查文件格式和大小是否符合要求'
    case ErrorType.SERVER:
      return '服务器暂时无法响应，请稍后重试'
    default:
      return '请稍后重试或联系技术支持'
  }
}

/**
 * 解析错误信息
 */
const parseError = (error: FileErrorInfo | string): FileErrorInfo => {
  if (typeof error === 'string') {
    return {
      type: ErrorType.UNKNOWN,
      message: error,
      retryable: true,
    }
  }
  return error
}

/**
 * 错误提示组件
 * 为文件操作提供统一的错误反馈
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  onClose,
  showDetails = false,
  size = 'default',
  inline = false
}) => {
  const errorInfo = parseError(error)
  const {
    type,
    message,
    code,
    details,
    retryable = true
  } = errorInfo

  const title = getErrorTitle(type)
  const suggestion = getErrorSuggestion(type)
  const icon = getErrorIcon(type)

  // 内联模式显示为警告框
  if (inline) {
    return (
      <Alert
        message={title}
        description={
          <div>
            <div className="mb-2">{message}</div>
            {code && (
              <div className="text-xs text-gray-500 mb-2">
                错误代码: {code}
              </div>
            )}
            {showDetails && details && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-blue-500">
                  查看详细信息
                </summary>
                <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto">
                  {details}
                </pre>
              </details>
            )}
            {(retryable && onRetry) && (
              <div className="mt-3">
                <Button size="small" onClick={onRetry} icon={<ReloadOutlined />}>
                  重试
                </Button>
              </div>
            )}
          </div>
        }
        type="error"
        showIcon
        closable={!!onClose}
        onClose={onClose}
        className="mb-4"
      />
    )
  }

  // 默认模式显示为结果页
  const actions = []
  
  if (retryable && onRetry) {
    actions.push(
      <Button type="primary" key="retry" onClick={onRetry} icon={<ReloadOutlined />}>
        重试
      </Button>
    )
  }

  if (onClose) {
    actions.push(
      <Button key="close" onClick={onClose}>
        关闭
      </Button>
    )
  }

  return (
    <div className={`error-state ${size === 'small' ? 'py-4' : size === 'large' ? 'py-12' : 'py-8'}`}>
      <Result
        status="error"
        icon={icon}
        title={title}
        subTitle={
          <div className="space-y-2">
            <div>{message}</div>
            <div className="text-sm text-gray-500">{suggestion}</div>
            {code && (
              <div className="text-xs text-gray-400">
                错误代码: {code}
              </div>
            )}
          </div>
        }
        extra={actions}
      />

      {showDetails && details && (
        <div className="mt-6 max-w-2xl mx-auto">
          <Alert
            message="错误详情"
            description={
              <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto max-h-40">
                {details}
              </pre>
            }
            type="warning"
            showIcon
            closable
          />
        </div>
      )}
    </div>
  )
}

/**
 * 文件上传错误组件
 */
export const FileUploadError: React.FC<{
  error: string
  onRetry?: () => void
  onClose?: () => void
}> = ({ error, onRetry, onClose }) => (
  <ErrorState
    error={{
      type: ErrorType.FILE,
      message: error,
      retryable: !!onRetry
    }}
    onRetry={onRetry}
    onClose={onClose}
    inline
  />
)

/**
 * 文件列表错误组件
 */
export const FileListError: React.FC<{
  onRetry?: () => void
}> = ({ onRetry }) => (
  <ErrorState
    error={{
      type: ErrorType.NETWORK,
      message: '文件列表加载失败',
      retryable: !!onRetry
    }}
    onRetry={onRetry}
    size="small"
  />
)

/**
 * 文件预览错误组件
 */
export const FilePreviewError: React.FC<{
  fileName?: string
  onRetry?: () => void
}> = ({ fileName, onRetry }) => (
  <ErrorState
    error={{
      type: ErrorType.FILE,
      message: fileName ? `文件 "${fileName}" 预览失败` : '文件预览失败',
      retryable: !!onRetry
    }}
    onRetry={onRetry}
    size="default"
  />
)

export default ErrorState
export type { ErrorStateProps, FileErrorInfo }