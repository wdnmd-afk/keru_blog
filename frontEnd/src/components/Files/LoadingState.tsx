import { Spin, SpinProps } from 'antd'
import React from 'react'

/**
 * 加载状态组件Props
 */
interface LoadingStateProps extends Omit<SpinProps, 'spinning'> {
  /** 是否正在加载 */
  loading: boolean
  /** 加载提示文本 */
  tip?: string
  /** 最小加载时间（毫秒），避免闪烁 */
  minDuration?: number
  /** 延迟显示加载状态（毫秒） */
  delay?: number
  /** 子组件 */
  children?: React.ReactNode
}

/**
 * 加载状态组件
 * 为文件操作提供统一的加载反馈
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  tip = '加载中...',
  minDuration = 300,
  delay = 0,
  children,
  size = 'default',
  ...spinProps
}) => {
  const [showLoading, setShowLoading] = React.useState(false)
  const [startTime, setStartTime] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowLoading(true)
        setStartTime(Date.now())
      }, delay)

      return () => clearTimeout(timer)
    } else {
      // 如果设置了最小加载时间，确保加载状态至少显示这么长时间
      if (startTime && minDuration > 0) {
        const elapsed = Date.now() - startTime
        if (elapsed < minDuration) {
          const remainingTime = minDuration - elapsed
          setTimeout(() => {
            setShowLoading(false)
            setStartTime(null)
          }, remainingTime)
          return
        }
      }

      setShowLoading(false)
      setStartTime(null)
    }
  }, [loading, delay, minDuration, startTime])

  if (children) {
    return (
      <Spin
        spinning={showLoading}
        tip={tip}
        size={size}
        {...spinProps}
      >
        {children}
      </Spin>
    )
  }

  if (!showLoading) {
    return null
  }

  return (
    <div className="flex items-center justify-center py-8">
      <Spin
        spinning={true}
        tip={tip}
        size={size}
        {...spinProps}
      />
    </div>
  )
}

/**
 * 文件上传加载组件
 */
export const FileUploadLoading: React.FC<{ uploading: boolean; progress?: number }> = ({
  uploading,
  progress
}) => {
  if (!uploading) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 min-w-80">
        <div className="text-center">
          <Spin size="large" />
          <div className="mt-4 text-lg font-medium">正在上传文件...</div>
          {progress !== undefined && (
            <div className="mt-2 text-sm text-gray-500">
              上传进度: {progress.toFixed(1)}%
            </div>
          )}
          <div className="mt-2 text-xs text-gray-400">
            请不要关闭页面
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 文件列表加载组件
 */
export const FileListLoading: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <Spin size="large" tip="加载文件列表..." />
  </div>
)

/**
 * 文件预览加载组件
 */
export const FilePreviewLoading: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <Spin size="large" tip="加载预览..." />
  </div>
)

export default LoadingState
export type { LoadingStateProps }