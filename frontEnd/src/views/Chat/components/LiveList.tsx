import React, { useCallback, useEffect, useState } from 'react'
import { Empty, message, Tag } from 'antd'
import { Http } from '@/utils'
import { VideoCameraOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import s from '../ChatEntry.module.scss'

interface WebRtcRoomItem {
  id: string
  name: string
  description?: string
  status: string
  creatorId: string
  createdAt: string
  updatedAt: string
  maxParticipants: number
  currentParticipants: number
  isPrivate: boolean
  tags: string[]
}

const DEFAULT_COVER = '/static/IMAGE/default-live-cover.png'

const LiveList: React.FC = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState<WebRtcRoomItem[]>([])

  const load = useCallback(async () => {
    try {
      // 注意：WebRTC 返回结构为 { data: { data: Room[], pagination: {...} } }
      const res: any = await Http.get('/webrtc/rooms', { page: 1, limit: 20 })
      const payload = res?.data
      const arr = payload?.data || []
      setItems(arr)
    } catch (e: any) {
      message.error(e?.message || '获取直播间列表失败')
    }
  }, [])

  useEffect(() => { load() }, [load])

  if (items.length === 0) {
    return (
      <div className={s.emptyWrap}>
        <Empty description={<span style={{ color: 'rgba(255,255,255,0.65)' }}>暂无直播间</span>} />
      </div>
    )
  }

  return (
    <div className={s.cardsGrid}>
      {items.map((it) => (
        <div key={it.id} className={s.listCard} onClick={() => navigate(`/chat/room/${encodeURIComponent(it.id)}`)}>
          <div className={s.roomBadge}>直播</div>
          <div className={s.roomCover} style={{ backgroundImage: `url(${DEFAULT_COVER})` }} />
          <div className={s.roomInfo}>
            <div className={s.roomName}>{it.name}</div>
            <div className={s.roomMetaLine}>
              <span className={s.roomOwner}>拥有者：{it.creatorId.slice(0, 8)}</span>
              <span className={s.roomCount}><VideoCameraOutlined /> {it.currentParticipants}</span>
            </div>
            {it.status === 'active' && <Tag color="green">进行中</Tag>}
            {it.status === 'waiting' && <Tag color="gold">等待中</Tag>}
            {it.status === 'ended' && <Tag color="default">已结束</Tag>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LiveList
