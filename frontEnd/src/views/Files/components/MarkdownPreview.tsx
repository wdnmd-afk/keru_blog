/**
 * Markdown预览器组件
 * 支持md文件的预览和渲染
 */

import React, { useState, useCallback, useEffect } from 'react'
import { Button, Space, Tooltip, Alert, Spin, Switch } from 'antd'
import {
  DownloadOutlined,
  CopyOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined
} from '@ant-design/icons'
import { message } from 'antd'

export interface MarkdownPreviewProps {
  /** Markdown文件URL */
  src: string
  /** 文件名称 */
  fileName?: string
  /** 文件大小（字节） */
  fileSize?: number
  /** 是否显示工具栏 */
  showToolbar?: boolean
  /** 最大高度 */
  maxHeight?: number | string
  /** 是否显示源码模式切换 */
  showSourceToggle?: boolean
  /** 加载失败回调 */
  onError?: (error: string) => void
  /** 加载成功回调 */
  onLoad?: (content: string) => void
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  src,
  fileName,
  fileSize,
  showToolbar = true,
  maxHeight = '70vh',
  showSourceToggle = true,
  onError,
  onLoad,
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [content, setContent] = useState<string>('')
  const [renderedHtml, setRenderedHtml] = useState<string>('')
  const [showSource, setShowSource] = useState(false)

  /**
   * 简单的Markdown渲染器
   * 注意：这是一个基础实现，生产环境建议使用marked或react-markdown
   */
  const renderMarkdown = useCallback((markdown: string): string => {
    let html = markdown
    
    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
    
    // 粗体
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>')
    
    // 斜体
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>')
    html = html.replace(/_(.*?)_/gim, '<em>$1</em>')
    
    // 代码块
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    html = html.replace(/`(.*?)`/gim, '<code>$1</code>')
    
    // 链接
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // 图片
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" style="max-width: 100%; height: auto;" />')
    
    // 列表
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>')
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
    html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
    
    // 包装列表项
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
    
    // 引用
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    
    // 水平线
    html = html.replace(/^---$/gim, '<hr>')
    html = html.replace(/^\*\*\*$/gim, '<hr>')
    
    // 段落
    html = html.replace(/\n\n/gim, '</p><p>')
    html = '<p>' + html + '</p>'
    
    // 清理空段落
    html = html.replace(/<p><\/p>/gim, '')
    html = html.replace(/<p>(<h[1-6]>)/gim, '$1')
    html = html.replace(/(<\/h[1-6]>)<\/p>/gim, '$1')
    html = html.replace(/<p>(<ul>)/gim, '$1')
    html = html.replace(/(<\/ul>)<\/p>/gim, '$1')
    html = html.replace(/<p>(<blockquote>)/gim, '$1')
    html = html.replace(/(<\/blockquote>)<\/p>/gim, '$1')
    html = html.replace(/<p>(<hr>)<\/p>/gim, '$1')
    html = html.replace(/<p>(<pre>)/gim, '$1')
    html = html.replace(/(<\/pre>)<\/p>/gim, '$1')
    
    return html
  }, [])

  /**
   * 加载Markdown内容
   */
  const loadMarkdownContent = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(src)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // 检查文件大小
      const contentLength = response.headers.get('content-length')
      if (contentLength && parseInt(contentLength) > 1024 * 1024) { // 1MB限制
        throw new Error('文件过大，无法预览（限制1MB）')
      }

      const markdownContent = await response.text()
      const htmlContent = renderMarkdown(markdownContent)
      
      setContent(markdownContent)
      setRenderedHtml(htmlContent)
      setLoading(false)
      onLoad?.(markdownContent)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Markdown加载失败'
      setError(errorMessage)
      setLoading(false)
      onError?.(errorMessage)
    }
  }, [src, renderMarkdown, onError, onLoad])

  /**
   * 复制内容
   */
  const handleCopy = useCallback(async () => {
    try {
      const textToCopy = showSource ? content : renderedHtml
      await navigator.clipboard.writeText(textToCopy)
      message.success('内容已复制到剪贴板')
    } catch (err) {
      message.error('复制失败')
    }
  }, [content, renderedHtml, showSource])

  /**
   * 下载文件
   */
  const handleDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = src
    link.download = fileName || 'markdown-file.md'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [src, fileName])

  /**
   * 全屏预览
   */
  const handleFullscreen = useCallback(() => {
    window.open(src, '_blank')
  }, [src])

  /**
   * 重新加载
   */
  const handleReload = useCallback(() => {
    loadMarkdownContent()
  }, [loadMarkdownContent])

  /**
   * 格式化文件大小
   */
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return ''
    
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  // 初始加载
  useEffect(() => {
    loadMarkdownContent()
  }, [loadMarkdownContent])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Alert
          message="Markdown预览失败"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
        <Space>
          <Button onClick={handleReload}>
            重新加载
          </Button>
          <Button onClick={handleDownload}>
            下载文件
          </Button>
        </Space>
      </div>
    )
  }

  return (
    <div className="markdown-preview-container">
      {/* 工具栏 */}
      {showToolbar && (
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {fileName}
              </span>
              {fileSize && (
                <span className="text-xs text-gray-500">
                  ({formatFileSize(fileSize)})
                </span>
              )}
            </div>
            
            {showSourceToggle && (
              <div className="flex items-center space-x-2">
                <EyeOutlined className={!showSource ? 'text-blue-500' : 'text-gray-400'} />
                <Switch
                  size="small"
                  checked={showSource}
                  onChange={setShowSource}
                />
                <EditOutlined className={showSource ? 'text-blue-500' : 'text-gray-400'} />
                <span className="text-xs text-gray-500">
                  {showSource ? '源码' : '预览'}
                </span>
              </div>
            )}
          </div>
          
          <Space size="small">
            <Tooltip title="复制内容">
              <Button 
                type="text" 
                icon={<CopyOutlined />} 
                onClick={handleCopy}
                disabled={!content}
              />
            </Tooltip>
            
            <Tooltip title="重新加载">
              <Button 
                type="text" 
                icon={<ReloadOutlined />} 
                onClick={handleReload}
              />
            </Tooltip>
            
            <Tooltip title="全屏预览">
              <Button 
                type="text" 
                icon={<FullscreenOutlined />} 
                onClick={handleFullscreen}
              />
            </Tooltip>
            
            <Tooltip title="下载">
              <Button 
                type="text" 
                icon={<DownloadOutlined />} 
                onClick={handleDownload}
              />
            </Tooltip>
          </Space>
        </div>
      )}

      {/* Markdown预览区域 */}
      <div 
        className="bg-white overflow-auto"
        style={{ height: maxHeight }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Spin size="large" />
            <span className="mt-4 text-gray-500">加载Markdown中...</span>
          </div>
        ) : showSource ? (
          // 源码模式
          <pre className="p-4 font-mono text-sm whitespace-pre-wrap overflow-auto h-full">
            {content}
          </pre>
        ) : (
          // 渲染模式
          <div 
            className="p-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
            style={{
              lineHeight: '1.6',
            }}
          />
        )}
      </div>

      {/* 状态栏 */}
      {showToolbar && !loading && !error && (
        <div className="flex items-center justify-between p-2 bg-gray-50 border-t text-xs text-gray-500">
          <span>
            行数: {content.split('\n').length} | 字符数: {content.length}
          </span>
          <span>
            模式: {showSource ? '源码' : '预览'}
          </span>
        </div>
      )}
    </div>
  )
}

export default MarkdownPreview
