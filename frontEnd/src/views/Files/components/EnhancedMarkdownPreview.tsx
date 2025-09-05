/**
 * 增强版Markdown预览器组件
 * 支持GitHub风格的Markdown、数学公式、代码高亮、流程图等高级功能
 */

import { createIncludeComparator } from '@/utils/memoComparator'
import {
    CompressOutlined,
    CopyOutlined,
    DownloadOutlined,
    EditOutlined,
    ExpandOutlined,
    EyeOutlined,
    MenuOutlined,
    ReloadOutlined,
} from '@ant-design/icons'
import { Alert, Anchor, Button, Drawer, Space, Spin, Switch, Tooltip, message } from 'antd'
import mermaid from 'mermaid'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'

// 导入KaTeX样式
import 'katex/dist/katex.min.css'
// 导入自定义Markdown样式
import '@/styles/markdown-themes.css'

export interface EnhancedMarkdownPreviewProps {
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
    /** 默认主题 */
    defaultTheme?: 'light' | 'dark'
    /** 加载失败回调 */
    onError?: (error: string) => void
    /** 加载成功回调 */
    onLoad?: (content: string) => void
}

interface TocItem {
    id: string
    title: string
    level: number
}

const EnhancedMarkdownPreview: React.FC<EnhancedMarkdownPreviewProps> = React.memo(
    ({
        src,
        fileName,
        fileSize,
        showToolbar = true,
        maxHeight = '70vh',
        showSourceToggle = true,
        defaultTheme = 'light',
        onError,
        onLoad,
    }) => {
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState<string | null>(null)
        const [content, setContent] = useState<string>('')
        const [showSource, setShowSource] = useState(false)
        const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme)
        const [isFullscreen, setIsFullscreen] = useState(false)
        const [showToc, setShowToc] = useState(false)
        const [tocItems, setTocItems] = useState<TocItem[]>([])

        const containerRef = useRef<HTMLDivElement>(null)
        const contentRef = useRef<HTMLDivElement>(null)

        // 初始化Mermaid
        useEffect(() => {
            mermaid.initialize({
                startOnLoad: true,
                theme: theme === 'dark' ? 'dark' : 'default',
                securityLevel: 'loose',
                fontFamily: 'monospace',
            })
        }, [theme])

        /**
         * 提取目录结构
         */
        const extractToc = useCallback((markdown: string): TocItem[] => {
            const headingRegex = /^(#{1,6})\s+(.+)$/gm
            const toc: TocItem[] = []
            let match

            while ((match = headingRegex.exec(markdown)) !== null) {
                const level = match[1].length
                const title = match[2].trim()
                const id = title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()

                toc.push({ id, title, level })
            }

            return toc
        }, [])

        /**
         * 加载Markdown内容
         */
        const loadMarkdown = useCallback(async () => {
            if (!src) {
                setError('未提供文件URL')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)

                const response = await fetch(src)
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                }

                const markdownContent = await response.text()
                const toc = extractToc(markdownContent)

                setContent(markdownContent)
                setTocItems(toc)
                setLoading(false)
                onLoad?.(markdownContent)
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Markdown加载失败'
                setError(errorMessage)
                setLoading(false)
                onError?.(errorMessage)
            }
        }, [src, extractToc, onError, onLoad])

        // 组件挂载时加载内容
        useEffect(() => {
            loadMarkdown()
        }, [loadMarkdown])

        /**
         * 复制内容
         */
        const handleCopy = useCallback(async () => {
            try {
                const textToCopy = showSource ? content : content
                await navigator.clipboard.writeText(textToCopy)
                message.success('内容已复制到剪贴板')
            } catch (err) {
                message.error('复制失败')
            }
        }, [content, showSource])

        /**
         * 下载文件
         */
        const handleDownload = useCallback(() => {
            const link = document.createElement('a')
            link.href = src
            link.download = fileName || 'document.md'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }, [src, fileName])

        /**
         * 刷新内容
         */
        const handleRefresh = useCallback(() => {
            loadMarkdown()
        }, [loadMarkdown])

        /**
         * 切换全屏
         */
        const handleFullscreen = useCallback(() => {
            if (!isFullscreen && containerRef.current) {
                if (containerRef.current.requestFullscreen) {
                    containerRef.current.requestFullscreen()
                    setIsFullscreen(true)
                }
            } else if (document.exitFullscreen) {
                document.exitFullscreen()
                setIsFullscreen(false)
            }
        }, [isFullscreen])

        /**
         * 监听全屏状态变化
         */
        useEffect(() => {
            const handleFullscreenChange = () => {
                setIsFullscreen(!!document.fullscreenElement)
            }

            document.addEventListener('fullscreenchange', handleFullscreenChange)
            return () => {
                document.removeEventListener('fullscreenchange', handleFullscreenChange)
            }
        }, [])

        /**
         * Mermaid图表组件 - 独立组件避免Hooks规则违反
         */
        const MermaidDiagram: React.FC<{ children: string }> = ({ children }) => {
            const mermaidId = `mermaid-${Math.random().toString(36).substr(2, 9)}`

            useEffect(() => {
                if (typeof children === 'string') {
                    mermaid
                        .render(mermaidId, children)
                        .then(({ svg }) => {
                            const element = document.getElementById(mermaidId)
                            if (element) {
                                element.innerHTML = svg
                            }
                        })
                        .catch(console.error)
                }
            }, [children, mermaidId])

            return <div id={mermaidId} className="mermaid-diagram" />
        }

        /**
         * 自定义代码块渲染器
         */
        const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''

            // 处理Mermaid图表
            if (language === 'mermaid') {
                return <MermaidDiagram>{String(children)}</MermaidDiagram>
            }

            return !inline && match ? (
                <div className="relative">
                    <SyntaxHighlighter
                        style={theme === 'dark' ? oneDark : oneLight}
                        language={language}
                        PreTag="div"
                        customStyle={{
                            margin: 0,
                            borderRadius: '6px',
                            fontSize: '14px',
                        }}
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <Button
                        size="small"
                        type="text"
                        icon={<CopyOutlined />}
                        className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                        onClick={() => {
                            navigator.clipboard.writeText(String(children))
                            message.success('代码已复制')
                        }}
                    />
                </div>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            )
        }

        /**
         * 自定义图片渲染器
         */
        const ImageRenderer = ({ src, alt, ...props }: any) => {
            const [imageError, setImageError] = useState(false)

            return (
                <div className="text-center my-4">
                    {imageError ? (
                        <div className="p-4 border border-dashed border-gray-300 rounded">
                            <span className="text-gray-500">图片加载失败: {alt || src}</span>
                        </div>
                    ) : (
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full h-auto rounded cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => {
                                // 图片点击放大预览
                                const modal = document.createElement('div')
                                modal.className =
                                    'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
                                modal.innerHTML = `
                <div class="relative max-w-full max-h-full p-4">
                  <img src="${src}" alt="${alt}" class="max-w-full max-h-full object-contain" />
                  <button class="absolute top-2 right-2 text-white text-2xl">&times;</button>
                </div>
              `
                                modal.onclick = () => document.body.removeChild(modal)
                                document.body.appendChild(modal)
                            }}
                            onError={() => setImageError(true)}
                            {...props}
                        />
                    )}
                </div>
            )
        }

        if (error) {
            return (
                <Alert
                    message="Markdown加载失败"
                    description={error}
                    type="error"
                    showIcon
                    action={
                        <Button size="small" onClick={handleRefresh}>
                            重试
                        </Button>
                    }
                />
            )
        }

        return (
            <div
                ref={containerRef}
                className={`markdown-preview-container w-full h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}
            >
                {/* 工具栏 */}
                {showToolbar && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 font-medium">
                                {fileName || 'Markdown文档'}
                            </span>
                            {fileSize && (
                                <span className="text-xs text-gray-400">
                                    ({(fileSize / 1024).toFixed(1)} KB)
                                </span>
                            )}
                        </div>

                        <Space>
                            {tocItems.length > 0 && (
                                <Tooltip title="目录">
                                    <Button
                                        type="text"
                                        icon={<MenuOutlined />}
                                        onClick={() => setShowToc(true)}
                                    />
                                </Tooltip>
                            )}

                            <Tooltip title="主题">
                                <Switch
                                    checked={theme === 'dark'}
                                    onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                    checkedChildren="🌙"
                                    unCheckedChildren="☀️"
                                />
                            </Tooltip>

                            {showSourceToggle && (
                                <Tooltip title={showSource ? '预览模式' : '源码模式'}>
                                    <Button
                                        type={showSource ? 'primary' : 'text'}
                                        icon={showSource ? <EyeOutlined /> : <EditOutlined />}
                                        onClick={() => setShowSource(!showSource)}
                                    />
                                </Tooltip>
                            )}

                            <Tooltip title="复制">
                                <Button type="text" icon={<CopyOutlined />} onClick={handleCopy} />
                            </Tooltip>

                            <Tooltip title="下载">
                                <Button
                                    type="text"
                                    icon={<DownloadOutlined />}
                                    onClick={handleDownload}
                                />
                            </Tooltip>

                            <Tooltip title={isFullscreen ? '退出全屏' : '全屏'}>
                                <Button
                                    type="text"
                                    icon={isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
                                    onClick={handleFullscreen}
                                />
                            </Tooltip>

                            <Tooltip title="刷新">
                                <Button
                                    type="text"
                                    icon={<ReloadOutlined />}
                                    onClick={handleRefresh}
                                />
                            </Tooltip>
                        </Space>
                    </div>
                )}

                {/* 内容区域 */}
                <div
                    ref={contentRef}
                    className="flex-1 overflow-auto"
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
                            className={`markdown-preview-content p-6 prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath, remarkToc]}
                                rehypePlugins={[rehypeKatex, rehypeRaw]}
                                components={{
                                    code: CodeBlock,
                                    img: ImageRenderer,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* 目录抽屉 */}
                <Drawer
                    title="目录"
                    placement="right"
                    onClose={() => setShowToc(false)}
                    open={showToc}
                    width={300}
                >
                    <Anchor
                        items={tocItems.map((item) => ({
                            key: item.id,
                            href: `#${item.id}`,
                            title: item.title,
                            level: item.level,
                        }))}
                        onClick={(e, link) => {
                            e.preventDefault()
                            const element = document.getElementById(link.href.slice(1))
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' })
                            }
                        }}
                    />
                </Drawer>
            </div>
        )
    },
    createIncludeComparator<EnhancedMarkdownPreviewProps>([
        'src',
        'fileName',
        'fileSize',
        'maxHeight',
        'showToolbar',
        'showSourceToggle',
        'defaultTheme',
    ])
)

export default EnhancedMarkdownPreview
