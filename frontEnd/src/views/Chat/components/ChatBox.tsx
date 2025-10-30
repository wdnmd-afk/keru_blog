import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Button, Input, List, Typography, Space, Avatar } from 'antd'
import { SendOutlined, UserOutlined } from '@ant-design/icons'

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {header}
      <div ref={listRef} style={{ flex: 1, overflow: 'auto', padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #e8e8e8' }}>
        <List
          dataSource={messages}
          renderItem={(m) => (
            <List.Item style={{ padding: '6px 0' }}>
              <Space align="start" size={8}>
                <Avatar size={28} icon={<UserOutlined />} />
                <div>
                  <div style={{ fontSize: 12, color: '#6b6b83' }}>
                    <Text strong>{m.user}</Text>
                    <Text type="secondary" style={{ marginLeft: 8 }}>{new Date(m.time).toLocaleTimeString()}</Text>
                  </div>
                  <div style={{ marginTop: 2, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{m.text}</div>
                </div>
              </Space>
            </List.Item>
          )}
        />
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 5 }}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>发送</Button>
      </div>
    </div>
  )
}

export default ChatBox
