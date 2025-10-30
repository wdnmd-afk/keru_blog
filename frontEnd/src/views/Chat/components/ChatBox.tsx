import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Button, Input, List, Typography, Avatar, Popover } from 'antd'
import { SendOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'

const { Text } = Typography

// 通用聊天消息类型定义（聊天室/私聊/AI 均可复用）
export interface ChatMessage {
  id: string
  user: string
  text: string
  time: number
}

interface ChatBoxProps {
  // 消息列表
  messages: ChatMessage[]
  // 发送消息回调
  onSend: (text: string) => void
  // 输入框占位符
  placeholder?: string
  // 头部区域（可选）
  header?: React.ReactNode
  // 是否自动聚焦输入框
  autoFocus?: boolean
}

/**
 * 通用聊天输入/消息列表组件
 * - 仅负责展示与输入，状态与同步由上层管理
 */
const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSend, placeholder = '输入消息，回车发送', header, autoFocus = true }) => {
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)

  // 滚动到底部，保持最新消息可见
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [messages])

  const handleSend = useCallback(() => {
    const content = input.trim()
    if (!content) return
    onSend(content)
    setInput('')
  }, [input, onSend])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // 简易表情列表（无需安装第三方依赖）
  const emojis = ['😀','😁','😂','🤣','😊','😍','😎','🤔','😏','🙌','👍','👏','🔥','🌟','🎉','💯','🫶','❤️','🤝','💡']
  const EmojiPanel = (
    <div style={{ maxWidth: 260, padding: 6, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
      {emojis.map((e) => (
        <button
          key={e}
          onClick={() => { setInput((v) => v + e); setShowEmoji(false) }}
          style={{ background: 'transparent', border: 'none', fontSize: 18, lineHeight: '24px', cursor: 'pointer' }}
        >{e}</button>
      ))}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {header}
      {/* 消息区域：轻暗面板 + 圆角，左右气泡样式 */}
      <div ref={listRef} style={{ flex: 1, overflow: 'auto', padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
        <List
          dataSource={messages}
          renderItem={(m) => (
            <List.Item style={{ padding: '8px 0', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Avatar size={28} icon={<UserOutlined />} />
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                    <Text strong style={{ color: '#fff' }}>{m.user}</Text>
                    <Text style={{ marginLeft: 8, color: 'rgba(255,255,255,0.45)' }}>{new Date(m.time).toLocaleTimeString()}</Text>
                  </div>
                  <div style={{
                    marginTop: 6,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: '#fff',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '10px 12px',
                    borderRadius: 12,
                    maxWidth: 720,
                  }}>{m.text}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Popover
          open={showEmoji}
          onOpenChange={setShowEmoji}
          content={EmojiPanel}
          trigger="click"
          placement="topLeft"
        >
          <Button
            icon={<SmileOutlined />}
            onClick={() => setShowEmoji((v) => !v)}
            size="large"
            shape="circle"
            type="text"
            style={{
              width: 40,
              height: 40,
              color: '#fff',
            }}
          />
        </Popover>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          size="large"
          style={{ height: 40 }}
          onPressEnter={(e) => {
            // 防止中文输入法回车触发抖动，遵循 onKeyDown 的逻辑
            e.preventDefault()
            handleSend()
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          size="large"
          style={{ height: 40 }}
        >
          发送
        </Button>
      </div>
    </div>
  )
}

export default ChatBox
