import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Typography, Space, Tag, Button, message as AntdMessage } from 'antd'
import ChatBox, { ChatMessage } from './components/ChatBox'

const { Title, Text } = Typography

/**
 * 聊天室页面（默认本地直连渲染）
 * - 使用 BroadcastChannel 实现同源多标签页的实时消息同步
 * - 若浏览器不支持 BroadcastChannel，则回退到 localStorage 事件广播
 * - 预留 Socket.IO 接入点，后续可切换为低延迟后端同步
 */
const ChatRoom: React.FC = () => {
  const { roomId = '' } = useParams()
  const [search] = useSearchParams()
  const nickname = (search.get('name') || `用户-${Math.floor(Math.random() * 1000)}`).slice(0, 20)

  // 本地消息列表
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // BroadcastChannel 与 fallback
  const channelName = useMemo(() => `room-${roomId}`, [roomId])
  const bcRef = useRef<BroadcastChannel | null>(null)

  // 发送消息（本地 + 广播）
  const send = useCallback((text: string) => {
    const msg: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      user: nickname,
      text,
      time: Date.now(),
    }
    setMessages(prev => [...prev, msg])

    // 广播给同房间的其它标签页
    if (bcRef.current) {
      bcRef.current.postMessage(msg)
    } else {
      try {
        localStorage.setItem(`bc:${channelName}`, JSON.stringify({ ...msg, _t: Date.now() }))
      } catch {}
    }
  }, [nickname, channelName])

  // 处理收到的消息
  const onReceive = useCallback((msg: ChatMessage) => {
    setMessages(prev => [...prev, msg])
  }, [])

  // 初始化广播通道
  useEffect(() => {
    if (!roomId) return

    // 尝试使用 BroadcastChannel
    if ('BroadcastChannel' in window) {
      bcRef.current = new BroadcastChannel(channelName)
      bcRef.current.onmessage = (ev) => {
        const data = ev.data as ChatMessage
        if (data && data.id) onReceive(data)
      }
    } else {
      // 回退到 localStorage 事件
      const handler = (e: StorageEvent) => {
        if (e.key === `bc:${channelName}` && typeof e.newValue === 'string') {
          try {
            const data = JSON.parse(e.newValue) as ChatMessage
            if (data && data.id) onReceive(data)
          } catch {}
        }
      }
      window.addEventListener('storage', handler)
      return () => window.removeEventListener('storage', handler)
    }

    // 加入提示
    AntdMessage.success({ content: `已加入房间：${roomId}`, duration: 1.2 })

    return () => {
      if (bcRef.current) {
        bcRef.current.close()
        bcRef.current = null
      }
    }
  }, [roomId, channelName, onReceive])

  // 头部区块
  const header = (
    // 头部信息区：位于页面深色背景上，为确保可读性标题使用白色
    <div style={{ marginBottom: 12 }}>
      <Space size={12}>
        <Title level={4} style={{ margin: 0, color: '#ffffff' }}>聊天室</Title>
        <Tag color="blue">房间：{roomId}</Tag>
        <Tag color="purple">昵称：{nickname}</Tag>
        {/* 预留：切换到 Socket.IO 的按钮或状态显示 */}
        {/* <Button size="small">连接后端</Button> */}
      </Space>
    </div>
  )

  return (
    <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChatBox messages={messages} onSend={send} header={header} />
    </div>
  )
}

export default ChatRoom
