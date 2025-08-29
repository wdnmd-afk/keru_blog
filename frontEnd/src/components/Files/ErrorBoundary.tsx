import { Alert, Button, Result } from 'antd'
import React, { Component, ErrorInfo, ReactNode } from 'react'

/**
 * 错误边界组件Props
 */
interface ErrorBoundaryProps {
  /** 子组件 */
  children: ReactNode
  /** 自定义错误回退组件 */
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode
  /** 错误回调函数 */
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  /** 是否显示详细错误信息 */
  showDetails?: boolean
}

/**
 * 错误边界组件State
 */
interface ErrorBoundaryState {
  /** 是否有错误 */
  hasError: boolean
  /** 错误对象 */
  error: Error | null
  /** 错误信息 */
  errorInfo: ErrorInfo | null
}

/**
 * Files模块错误边界组件
 * 用于捕获和处理组件树中的JavaScript错误
 */
class FilesErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  /**
   * 当子组件抛出错误时调用
   * @param error 错误对象
   * @param errorInfo 错误信息
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  /**
   * 组件抛出错误后调用
   * @param error 错误对象
   * @param errorInfo 错误信息
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // 调用错误回调
    this.props.onError?.(error, errorInfo)

    // 记录错误到控制台
    console.error('FilesErrorBoundary caught an error:', error, errorInfo)

    // 可以在这里添加错误上报逻辑
    // this.reportError(error, errorInfo)
  }

  /**
   * 重置错误状态
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  /**
   * 刷新页面
   */
  handleRefresh = () => {
    window.location.reload()
  }

  /**
   * 渲染默认错误页面
   */
  renderDefaultError = () => {
    const { error, errorInfo } = this.state
    const { showDetails = false } = this.props

    return (
      <div className="error-boundary p-6">
        <Result
          status="error"
          title="文件管理模块出现错误"
          subTitle="抱歉，文件管理功能遇到了一些问题。请尝试刷新页面或联系管理员。"
          extra={[
            <Button type="primary" key="reset" onClick={this.handleReset}>
              重试
            </Button>,
            <Button key="refresh" onClick={this.handleRefresh}>
              刷新页面
            </Button>,
          ]}
        />

        {showDetails && error && (
          <div className="mt-6">
            <Alert
              message="错误详情"
              description={
                <div className="text-sm">
                  <div className="font-semibold mb-2">错误信息:</div>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                    {error.message}
                  </pre>
                  
                  {errorInfo && (
                    <>
                      <div className="font-semibold mt-4 mb-2">组件堆栈:</div>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                        {errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              }
              type="error"
              showIcon
              closable
            />
          </div>
        )}
      </div>
    )
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback } = this.props

    if (hasError && error) {
      // 如果提供了自定义回退组件，使用它
      if (fallback) {
        return fallback(error, errorInfo!)
      }

      // 否则使用默认错误页面
      return this.renderDefaultError()
    }

    return children
  }
}

export default FilesErrorBoundary
export type { ErrorBoundaryProps }