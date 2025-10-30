import {
    ChatReq,
    ConversationItem,
    fetchRecentConversations,
    ImageItem,
    MsgItem,
    streamChat,
} from '@/api/aiApi'
import ImagePreview from '@/components/ImagePreview'
import ImageUpload from '@/components/ImageUpload'
import { useClipboardImage } from '@/hooks/useClipboardImage'
import '@/styles/markdown-themes.css'
import { ArrowLeftOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import s from './AiChat.module.scss'

// 优化1：将 CodeBlock 组件提取到组件外部，避免每次渲染时重新创建
const CodeBlock = memo(({ inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''

    if (!inline && match) {
        return (
            <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                customStyle={{ margin: 0, borderRadius: 6, fontSize: 14 }}
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        )
    }

    return (
        <code className={className} {...props}>
            {children}
        </code>
    )
})

CodeBlock.displayName = 'CodeBlock'

// 优化2：将单个消息项提取为独立组件，使用 memo 避免不必要的重渲染
const MessageItem = memo(({ message }: { message: MsgItem }) => {
    const isUser = message.role === 'user'

    // 优化3：对于AI消息，使用 useMemo 缓存 ReactMarkdown 组件
    const markdownContent = useMemo(() => {
        if (isUser) return null

        return (
            <div
                className="markdown-preview prose prose-sm max-w-none"
                style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
                    {message.text}
                </ReactMarkdown>
            </div>
        )
    }, [isUser, message.text])

    return (
        <div className={`${s.message_row} ${isUser ? s.right : s.left}`}>
            <div className={`${s.bubble} ${isUser ? s.user_bubble : s.ai_bubble}`}>
                {/* 图片内容显示 */}
                {message.images && message.images.length > 0 && (
                    <div className={s.message_images}>
                        <ImagePreview
                            images={message.images}
                            onImageRemove={() => {}} // 消息中的图片不允许删除
                            readonly={true}
                            maxDisplay={6}
                            size={80}
                        />
                    </div>
                )}

                {/* 文本内容显示 */}
                {message.text && (
                    <div className={s.message_text}>
                        {isUser ? (
                            // 用户消息按纯文本显示
                            <>{message.text}</>
                        ) : (
                            // AI 消息使用缓存的 Markdown 渲染
                            markdownContent
                        )}
                    </div>
                )}
            </div>
        </div>
    )
})

MessageItem.displayName = 'MessageItem'

// 优化4：节流 Hook，用于滚动等高频操作
function useThrottle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
    const lastCall = useRef<number>(0)
    const timeoutRef = useRef<NodeJS.Timeout>()

    return useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now()

            if (now - lastCall.current >= delay) {
                lastCall.current = now
                return fn(...args)
            } else {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = setTimeout(
                    () => {
                        lastCall.current = Date.now()
                        fn(...args)
                    },
                    delay - (now - lastCall.current)
                )
            }
        },
        [fn, delay]
    ) as T
}

// AI Chat 组件：支持 SSE 流式接收，样式遵循 Learning 模块配色
const AiChat: React.FC = () => {
    const [messages, setMessages] = useState<MsgItem[]>([])
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    // 新增：当前输入的图片状态
    const [currentImages, setCurrentImages] = useState<ImageItem[]>([])

    // 新增：图片处理函数
    const handleImageAdd = useCallback((image: ImageItem) => {
        setCurrentImages((prev) => {
            const existingIndex = prev.findIndex((img) => img.id === image.id)
            if (existingIndex >= 0) {
                // 更新现有图片（用于上传状态变化）
                const newImages = [...prev]
                newImages[existingIndex] = image
                return newImages
            } else {
                // 添加新图片
                return [...prev, image]
            }
        })
    }, [])

    const handleImageRemove = useCallback((imageId: string) => {
        setCurrentImages((prev) => prev.filter((img) => img.id !== imageId))
    }, [])

    const handleClearAllImages = useCallback(() => {
        setCurrentImages([])
    }, [])

    // 新增：剪贴板图片处理
    const { isClipboardSupported } = useClipboardImage({
        maxSize: 15,
        maxCount: 6,
        currentCount: currentImages.length,
        enabled: true,
        onImagePaste: handleImageAdd,
    })

    const listRef = useRef<HTMLDivElement | null>(null)

    // 使用 ref 持有当前机器人消息的ID与累计文本，避免状态竞争导致的重复拼接
    const botIdRef = useRef<string | null>(null)
    const bufferRef = useRef<string>('')

    // 优化5：使用节流优化滚动性能
    const scrollToBottom = useThrottle(
        useCallback(() => {
            requestAnimationFrame(() => {
                const el = listRef.current
                if (el) el.scrollTop = el.scrollHeight
            })
        }, []),
        100
    )

    // 优化6：使用 useMemo 缓存历史消息加载逻辑
    const loadHistoryMessages = useMemo(() => {
        return async () => {
            try {
                const res = await fetchRecentConversations()
                const list: ConversationItem[] = Array.isArray(res?.data) ? res.data : []

                const ordered = [...list].reverse()
                const history: MsgItem[] = []
                for (const it of ordered) {
                    history.push({ id: `${it.id}-u`, role: 'user', text: it.message })
                    history.push({ id: `${it.id}-a`, role: 'assistant', text: it.response })
                }

                return history
            } catch (e) {
                console.warn('[AiChat] 加载历史消息失败:', e)
                return []
            }
        }
    }, [])

    useEffect(() => {
        let cancelled = false

        loadHistoryMessages().then((history) => {
            if (!cancelled && history.length) {
                setMessages(history)
            }
        })

        return () => {
            cancelled = true
        }
    }, [loadHistoryMessages])

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    // 优化7：使用 useCallback 缓存发送函数，避免不必要的重新创建（扩展支持图片）
    const send = useCallback(async () => {
        const content = input.trim()
        // 修改条件：允许纯图片消息（无文本但有图片）
        if ((!content && currentImages.length === 0) || loading) return

        setLoading(true)

        // 创建用户消息，包含图片
        const userMsg: MsgItem = {
            id: `${Date.now()}-u`,
            role: 'user',
            text: content,
            images: currentImages.length > 0 ? [...currentImages] : undefined,
        }
        const botMsg: MsgItem = { id: `${Date.now()}-b`, role: 'assistant', text: '' }

        botIdRef.current = botMsg.id
        bufferRef.current = ''
        setMessages((prev) => [...prev, userMsg, botMsg])
        setInput('')
        setCurrentImages([]) // 清空当前图片

        // 构建请求数据，包含图片信息
        const requestData: ChatReq = {
            message: content,
            images: currentImages.map((img) => ({
                url: img.url,
                type: img.type,
            })),
        }

        try {
            await streamChat(requestData, {
                onChunk: (t) => {
                    // 优化8：减少状态更新频率，使用 requestAnimationFrame 批量更新
                    bufferRef.current += t
                    const targetId = botIdRef.current
                    if (!targetId) return

                    requestAnimationFrame(() => {
                        setMessages((prev) =>
                            prev.map((m) =>
                                m.id === targetId ? { ...m, text: bufferRef.current } : m
                            )
                        )
                    })
                },
                onDone: () => {
                    setLoading(false)
                    botIdRef.current = null
                },
                onError: () => {
                    setLoading(false)
                    botIdRef.current = null
                },
            })
        } catch (e) {
            setLoading(false)
        }
    }, [input, loading, currentImages])

    const onEnter = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send()
            }
        },
        [send]
    )

    // 优化9：使用 useMemo 缓存消息列表渲染
    const messageList = useMemo(() => {
        return messages.map((message) => <MessageItem key={message.id} message={message} />)
    }, [messages])

    // 优化10：使用 useCallback 缓存清空函数
    const clearMessages = useCallback(() => {
        setMessages([])
    }, [])

    return (
        <div className={s.chat_container}>
            {/* 返回按钮 */}
            <div style={{ padding: '8px 0 12px 0' }}>
                <Button
                    onClick={() => navigate(-1)}
                    icon={<ArrowLeftOutlined />}
                    ghost
                    type="default"
                    size="middle"
                    style={{
                        color: '#ffffff',
                        borderColor: 'rgba(255,255,255,0.35)',
                        background: 'transparent',
                        borderRadius: 999,
                        height: 36,
                        display: 'inline-flex',
                        alignItems: 'center',
                    }}
                >
                    返回
                </Button>
            </div>
            <div ref={listRef} className={s.messages}>
                {messageList}
            </div>
            <div className={s.footer_bar}>
                {/* 图片预览区域 */}
                {currentImages.length > 0 && (
                    <div className={s.image_section}>
                        <ImagePreview
                            images={currentImages}
                            onImageRemove={handleImageRemove}
                            onClearAll={handleClearAllImages}
                            readonly={false}
                            maxDisplay={6}
                            size={60}
                            showBatchActions={true}
                        />
                    </div>
                )}

                <div className={s.input_inline}>
                    <Input.TextArea
                        value={input}
                        autoSize={{ minRows: 1, maxRows: 6 }}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onEnter}
                        placeholder={
                            isClipboardSupported()
                                ? '输入消息，Shift+Enter 换行，Enter 发送，Ctrl+V 粘贴图片'
                                : '输入消息，Shift+Enter 换行，Enter 发送'
                        }
                    />

                    <div className={s.button_group}>
                        {/* 图片上传按钮 */}
                        <ImageUpload
                            onImageAdd={handleImageAdd}
                            disabled={loading}
                            maxSize={15}
                            maxCount={6}
                            currentCount={currentImages.length}
                            multiple={true}
                        />

                        <Popconfirm
                            title="确认清空当前对话？"
                            description="此操作不可撤销，确定要清空吗？"
                            okText="清空"
                            cancelText="取消"
                            placement="topRight"
                            onConfirm={clearMessages}
                        >
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                disabled={loading || messages.length === 0}
                            >
                                清空
                            </Button>
                        </Popconfirm>

                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            loading={loading}
                            onClick={send}
                            disabled={!input.trim() && currentImages.length === 0}
                        >
                            发送
                        </Button>
                    </div>
                </div>

                {/* 功能提示 */}
                {currentImages.length === 0 && !loading && (
                    <div className={s.hint_text}>
                        支持多选、拖拽、粘贴或点击上传图片，最多6张，单张最大15MB
                    </div>
                )}

                {/* 图片数量提示 */}
                {currentImages.length > 0 && !loading && (
                    <div className={s.hint_text}>
                        已选择 {currentImages.length}/6 张图片
                        {isClipboardSupported() && currentImages.length < 6 && '，可继续粘贴添加'}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AiChat
