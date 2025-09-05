/**
 * 文本预览器组件
 * 支持txt, log, csv等格式的文本文件预览
 */

import React, { useState, useCallback, useEffect } from 'react'
import { Button, Space, Tooltip, Alert, Spin, Select, Switch } from 'antd'
import {
  DownloadOutlined,
  CopyOutlined,
  SearchOutlined,
  FullscreenOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { message } from 'antd'

const { Option } = Select

export interface TextPreviewProps {
  /** 文本文件URL */
  src: string
  /** 文件名称 */
  fileName?: string
  /** 文件大小（字节） */
  fileSize?: number
  /** 是否显示工具栏 */
  showToolbar?: boolean
  /** 最大高度 */
  maxHeight?: number | string
  /** 编码格式 */
  encoding?: string
  /** 是否显示行号 */
  showLineNumbers?: boolean
  /** 加载失败回调 */
  onError?: (error: string) => void
  /** 加载成功回调 */
  onLoad?: (content: string) => void
}

const TextPreview: React.FC<TextPreviewProps> = ({
  src,
  fileName,
  fileSize,
  showToolbar = true,
  maxHeight = '70vh',
  encoding = 'utf-8',
  showLineNumbers = true,
  onError,
  onLoad,
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [content, setContent] = useState<string>('')
  const [selectedEncoding, setSelectedEncoding] = useState(encoding)
  const [lineNumbers, setLineNumbers] = useState(showLineNumbers)
  const [wordWrap, setWordWrap] = useState(true)
  const [fontSize, setFontSize] = useState(14)

  /**
   * 加载文本内容
   */
  const loadTextContent = useCallback(async (textEncoding: string = selectedEncoding) => {
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

      const arrayBuffer = await response.arrayBuffer()
      
      // 根据编码格式解码文本
      let textContent: string
      if (textEncoding === 'utf-8') {
        textContent = new TextDecoder('utf-8').decode(arrayBuffer)
      } else if (textEncoding === 'gbk' || textEncoding === 'gb2312') {
        // 对于中文编码，尝试使用TextDecoder
        try {
          textContent = new TextDecoder('gbk').decode(arrayBuffer)
        } catch {
          // 如果不支持GBK，回退到UTF-8
          textContent = new TextDecoder('utf-8').decode(arrayBuffer)
        }
      } else {
        textContent = new TextDecoder(textEncoding).decode(arrayBuffer)
      }

      setContent(textContent)
      setLoading(false)
      onLoad?.(textContent)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '文本加载失败'
      setError(errorMessage)
      setLoading(false)
      onError?.(errorMessage)
    }
  }, [src, selectedEncoding, onError, onLoad])

  /**
   * 处理编码格式变化
   */
  const handleEncodingChange = useCallback((newEncoding: string) => {
    setSelectedEncoding(newEncoding)
    loadTextContent(newEncoding)
  }, [loadTextContent])

  /**
   * 复制文本内容
   */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content)
      message.success('内容已复制到剪贴板')
    } catch (err) {
      message.error('复制失败')
    }
  }, [content])

  /**
   * 下载文件
   */
  const handleDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = src
    link.download = fileName || 'text-file'
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
    loadTextContent()
  }, [loadTextContent])

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

  /**
   * 渲染带行号的文本
   */
  const renderTextWithLineNumbers = (text: string) => {
    const lines = text.split('\n')
    const maxLineNumberWidth = lines.length.toString().length

    return (
      <div className="flex">
        {lineNumbers && (
          <div 
            className="text-gray-400 text-right pr-4 border-r border-gray-200 bg-gray-50 select-none"
            style={{ 
              fontSize: `${fontSize}px`,
              lineHeight: '1.5',
              minWidth: `${maxLineNumberWidth * 0.6 + 1}em`
            }}
          >
            {lines.map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
        )}
        <div 
          className="flex-1 pl-4 font-mono whitespace-pre overflow-auto"
          style={{ 
            fontSize: `${fontSize}px`,
            lineHeight: '1.5',
            whiteSpace: wordWrap ? 'pre-wrap' : 'pre'
          }}
        >
          {text}
        </div>
      </div>
    )
  }

  // 初始加载
  useEffect(() => {
    loadTextContent()
  }, [loadTextContent])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Alert
          message="文本预览失败"
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
    <div className="text-preview-container">
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
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">编码:</span>
              <Select
                size="small"
                value={selectedEncoding}
                onChange={handleEncodingChange}
                style={{ width: 80 }}
              >
                <Option value="utf-8">UTF-8</Option>
                <Option value="gbk">GBK</Option>
                <Option value="gb2312">GB2312</Option>
                <Option value="ascii">ASCII</Option>
              </Select>
            </div>
          </div>
          
          <Space size="small">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">行号:</span>
              <Switch
                size="small"
                checked={lineNumbers}
                onChange={setLineNumbers}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">换行:</span>
              <Switch
                size="small"
                checked={wordWrap}
                onChange={setWordWrap}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">字号:</span>
              <Select
                size="small"
                value={fontSize}
                onChange={setFontSize}
                style={{ width: 60 }}
              >
                <Option value={12}>12</Option>
                <Option value={14}>14</Option>
                <Option value={16}>16</Option>
                <Option value={18}>18</Option>
              </Select>
            </div>
            
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

      {/* 文本预览区域 */}
      <div 
        className="bg-white border overflow-auto"
        style={{ height: maxHeight }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Spin size="large" />
            <span className="mt-4 text-gray-500">加载文本中...</span>
          </div>
        ) : (
          renderTextWithLineNumbers(content)
        )}
      </div>

      {/* 状态栏 */}
      {showToolbar && !loading && !error && (
        <div className="flex items-center justify-between p-2 bg-gray-50 border-t text-xs text-gray-500">
          <span>
            行数: {content.split('\n').length} | 字符数: {content.length}
          </span>
          <span>
            编码: {selectedEncoding.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  )
}

export default TextPreview
