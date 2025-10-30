import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Typography, Space, Tag, Button, message as AntdMessage } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { ChatRoomApi } from '@/api/chatroom'
import { useGlobalStore } from '@/store'
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
  const navigate = useNavigate()
  // 默认昵称优先使用登录用户名，其次 URL 传参，最后随机
  const { user } = useGlobalStore()
  const nickname = (
    user?.name ||
    search.get('name') ||
    `用户-${Math.floor(Math.random() * 1000)}`
  ).slice(0, 20)

  // 本地消息列表
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // BroadcastChannel 与 fallback
  const channelName = useMemo(() => `room-${roomId}`, [roomId])
  const bcRef = useRef<BroadcastChannel | null>(null)

  // 发送消息（后端持久化 + 本地广播）
  const send = useCallback(async (text: string) => {
    const tempMsg: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      user: nickname,
      text,
      time: Date.now(),
    }
    // 先乐观渲染
    setMessages((prev) => [...prev, tempMsg])

    // 调用后端持久化
    if (roomId) {
      ChatRoomApi.sendMessage(roomId, text).catch(() => {})
    }

    // 广播给同房间的其它标签页
    const broadcast = (payload: ChatMessage) => {
      if (bcRef.current) {
        bcRef.current.postMessage(payload)
      } else {
        try {
          localStorage.setItem(`bc:${channelName}`, JSON.stringify({ ...payload, _t: Date.now() }))
        } catch {}
      }
    }
    broadcast(tempMsg)
  }, [nickname, channelName, roomId])

  // 处理收到的消息
  const onReceive = useCallback((msg: ChatMessage) => {
    setMessages(prev => [...prev, msg])
  }, [])

  // 初始化广播通道 + 接入后端 join/leave（用于维护在线人数）
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
      // 清理监听
      return () => window.removeEventListener('storage', handler)
    }

    // 加入提示
    AntdMessage.success({ content: `已加入房间：${roomId}`, duration: 1.2 })

    // 调用后端加入接口（鉴权由全局拦截器处理；未登录将提示登录）
    ChatRoomApi.join(roomId).catch(() => {})

    return () => {
      if (bcRef.current) {
        bcRef.current.close()
        bcRef.current = null
      }
      // 离开房间（尽力而为）
      if (roomId) ChatRoomApi.leave(roomId).catch(() => {})
    }
  }, [roomId, channelName, onReceive])

  // 加载最近 30 条历史记录
  useEffect(() => {
    let cancelled = false
    if (!roomId) return
    ChatRoomApi.getMessages(roomId, { limit: 30 })
      .then((res: any) => {
        if (cancelled) return
        const list = Array.isArray(res?.data) ? res.data : []
        const mapped: ChatMessage[] = list.map((m: any) => ({
          id: m.id,
          user: m.userName || '用户',
          text: m.content,
          time: new Date(m.createdAt).getTime(),
        }))
        setMessages(mapped)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [roomId])

  // 头部区块
  const header = (
    // 头部信息区：位于页面深色背景上，为确保可读性标题使用白色
    <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
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
      <Space size={12}>
        <Title level={4} style={{ margin: 0, color: '#ffffff' }}>聊天室</Title>
        <Tag color="blue">房间：{roomId}</Tag>
        <Tag color="purple">昵称：{nickname}</Tag>
      </Space>
    </div>
  )

  return (
    <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChatBox messages={messages} onSend={send} header={header} autoFocus={true} />
    </div>
  )
}

export default ChatRoom
