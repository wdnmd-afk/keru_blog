import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Empty, Input, Modal, Space, Upload, UploadProps, message, Tag } from 'antd'
import { PlusOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { ChatRoomApi } from '@/api/chatroom'
import { FileApi } from '@/api/fileApi'
import { useNavigate } from 'react-router-dom'
import s from '../ChatEntry.module.scss'

// 聊天室列表项类型（与后端响应对齐）
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

// 默认封面占位：使用前端 public 下的 k.svg
const DEFAULT_COVER = '/k.svg'

const ChatRoomList: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<ChatRoomItem[]>([])

  // 创建弹窗
  const [openCreate, setOpenCreate] = useState(false)
  const [name, setName] = useState('')
  const [coverUrl, setCoverUrl] = useState<string | undefined>()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await ChatRoomApi.list({ page: 1, limit: 20 })
      const payload = res.data // { items, pagination }
      setItems(payload?.items || [])
    } catch (e: any) {
      message.error(e?.message || '获取聊天室列表失败')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // 上传封面（可选）
  const uploadProps: UploadProps = useMemo(() => ({
    name: 'file',
    maxCount: 1,
    showUploadList: false,
    customRequest: async (options) => {
      try {
        const form = new FormData()
        form.append('file', options.file as any)
        const resp = await FileApi.uploadFileSingle(form)
        const fileName = resp?.data?.fileName
        if (!fileName) throw new Error('上传失败')
        // 图片类型会被服务端归类到 /static/IMAGE
        const url = `/static/IMAGE/${fileName}`
        setCoverUrl(url)
        message.success('封面上传成功')
        options.onSuccess?.(resp as any, new XMLHttpRequest())
      } catch (err: any) {
        message.error(err?.message || '上传失败')
        options.onError?.(err as any)
      }
    },
  }), [])

  // 创建房间
  const doCreate = useCallback(async () => {
    const n = name.trim()
    if (!n) {
      message.warning('请输入聊天室名称')
      return
    }
    try {
      const resp = await ChatRoomApi.create({ name: n, coverUrl })
      message.success('创建成功')
      setOpenCreate(false)
      setName('')
      setCoverUrl(undefined)
      // 刷新列表
      load()
      // 跳转进入房间
      const id = resp?.data?.id
      if (id) navigate(`/chat/room/${encodeURIComponent(id)}`)
    } catch (e: any) {
      message.error(e?.message || '创建失败')
    }
  }, [name, coverUrl, load, navigate])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ color: '#fff', fontWeight: 600 }}>全部聊天室</div>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenCreate(true)}>
            创建聊天室
          </Button>
        </Space>
      </div>

      {items.length === 0 ? (
        <div className={s.emptyWrap}>
          <Empty description={<span style={{ color: 'rgba(255,255,255,0.65)' }}>暂无聊天室</span>} />
        </div>
      ) : (
        <div className={s.cardsGrid}>
          {items.map((it) => (
            <div key={it.id} className={s.listCard} onClick={() => navigate(`/chat/room/${encodeURIComponent(it.id)}`)}>
              <div className={s.roomBadge}>#{it.roomNo}</div>
              <div className={s.roomCover} style={{ backgroundImage: `url(${it.coverUrl || DEFAULT_COVER})` }} />
              <div className={s.roomInfo}>
                <div className={s.roomName}>{it.name}</div>
                <div className={s.roomMetaLine}>
                  <span className={s.roomOwner}>拥有者：{it.ownerName || '—'}</span>
                  <span className={s.roomCount}><VideoCameraOutlined /> {it.currentParticipants}</span>
                </div>
                {it.status === 'ACTIVE' && <Tag color="green">进行中</Tag>}
                {it.status === 'ENDED' && <Tag color="default">已结束</Tag>}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={openCreate} title="创建聊天室" okText="创建" onOk={doCreate} onCancel={() => setOpenCreate(false)}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="聊天室名称" value={name} onChange={(e) => setName(e.target.value)} />
          <Upload {...uploadProps}>
            <Button>上传封面（可选）</Button>
          </Upload>
          {coverUrl && <div style={{ color: '#999' }}>已选择封面：{coverUrl}</div>}
        </Space>
      </Modal>
    </div>
  )
}

export default ChatRoomList
