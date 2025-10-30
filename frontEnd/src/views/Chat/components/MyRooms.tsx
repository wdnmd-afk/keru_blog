import React, { useCallback, useEffect, useState } from 'react'
import { Button, Empty, message, Popconfirm, Tag } from 'antd'
import { ChatRoomApi } from '@/api/chatroom'
import { useNavigate } from 'react-router-dom'
import { VideoCameraOutlined, StopOutlined } from '@ant-design/icons'
import s from '../ChatEntry.module.scss'

interface ChatRoomItem {
  id: string
  roomNo: string
  name: string
  coverUrl?: string
  ownerId: string
  ownerName?: string | null
  status: 'ACTIVE' | 'ENDED'
  createdAt: string
  startTime: string
  endTime?: string
  currentParticipants: number
}

const MyRooms: React.FC = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState<ChatRoomItem[]>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await ChatRoomApi.mine({ ownerOnly: true })
      setItems(res?.data || [])
    } catch (e: any) {
      message.error(e?.message || '加载我的聊天室失败')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const onClose = useCallback(async (id: string) => {
    try {
      await ChatRoomApi.close(id)
      message.success('已关闭')
      load()
    } catch (e: any) {
      message.error(e?.message || '关闭失败')
    }
  }, [load])

  if (!loading && items.length === 0) {
    return (
      <div className={s.emptyWrap}>
        <Empty description={<span style={{ color: 'rgba(255,255,255,0.65)' }}>暂无我的聊天室</span>} />
      </div>
    )
  }

  return (
    <div className={s.cardsGrid}>
      {items.map((it) => (
        <div key={it.id} className={s.listCard} onClick={() => navigate(`/chat/room/${encodeURIComponent(it.id)}`)}>
          <div className={s.roomBadge}>#{it.roomNo}</div>
          <div className={s.roomCover} style={{ backgroundImage: `url(${it.coverUrl || ''})` }} />
          <div className={s.roomInfo}>
            <div className={s.roomName}>{it.name}</div>
            <div className={s.roomMetaLine}>
              <span className={s.roomOwner}>拥有者：{it.ownerName || '我'}</span>
              <span className={s.roomCount}><VideoCameraOutlined /> {it.currentParticipants}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {it.status === 'ACTIVE' ? <Tag color="green">进行中</Tag> : <Tag>已结束</Tag>}
              {it.status === 'ACTIVE' && (
                <Popconfirm title="确定关闭该聊天室吗？" onConfirm={(e) => { e?.stopPropagation(); onClose(it.id) }} onCancel={(e) => e?.stopPropagation()}>
                  <Button size="small" danger icon={<StopOutlined />} onClick={(e) => e.stopPropagation()}>
                    关闭
                  </Button>
                </Popconfirm>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyRooms
