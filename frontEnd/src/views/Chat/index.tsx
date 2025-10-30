import useTheme, { getThemeColors } from '@/hooks/useTheme'
import { ArrowRightOutlined, DeleteOutlined, LoginOutlined, RobotOutlined } from '@ant-design/icons'
import { Button, Empty, Input, Modal, Space, Tag, Typography, message } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ChatEntry.module.scss'

const { Title, Text } = Typography

/**
 * Chat 入口页（新版）
 * - 上方：功能模块卡片（正方形 + 圆角）
 * - 下方：聊天室列表（最近进入）；无数据时显示缺省
 * - 主题：跟随全局主题色，确保文字可读
 */

// 最近房间记录类型
type RecentRoom = { id: string; nickname: string; time: number }
const STORAGE_KEY = 'chat_recent_rooms'

// 读取最近房间列表（最多20条）
const loadRecentRooms = (): RecentRoom[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const arr = JSON.parse(raw)
        return Array.isArray(arr) ? arr.slice(0, 20) : []
    } catch {
        return []
    }
}

// 保存最近房间列表
const saveRecentRooms = (rooms: RecentRoom[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms.slice(0, 20)))
    } catch (e) {
        // 忽略本地存储异常（如隐私模式）；不影响功能
    }
}

const ChatEntry: React.FC = () => {
    const navigate = useNavigate()

    // 主题色获取（避免暗色模式文字不可见）
    const { resolvedTheme } = useTheme()
    const colors = useMemo(() => getThemeColors(resolvedTheme), [resolvedTheme])

    // 加入房间弹窗与输入状态
    const [showJoin, setShowJoin] = useState(false)
    const [roomId, setRoomId] = useState('')
    const [nickname, setNickname] = useState('')

    // 最近房间列表
    const [rooms, setRooms] = useState<RecentRoom[]>(() => loadRecentRooms())

    // 跳转到 AI 聊天
    const goAi = useCallback(() => navigate('/chat/ai'), [navigate])

    // 执行加入房间：写入最近记录并跳转
    const doJoin = useCallback(() => {
        const id = roomId.trim()
        if (!id) {
            message.warning('请输入房间号')
            return
        }
        const name = (nickname.trim() || `用户-${Math.floor(Math.random() * 1000)}`).slice(0, 20)
        const next: RecentRoom[] = [
            { id, nickname: name, time: Date.now() },
            ...rooms.filter((r) => r.id !== id),
        ].slice(0, 20)
        setRooms(next)
        saveRecentRooms(next)
        setShowJoin(false)
        navigate(`/chat/room/${encodeURIComponent(id)}?name=${encodeURIComponent(name)}`)
    }, [roomId, nickname, rooms, navigate])

    // 快速进入历史房间
    const quickEnter = useCallback(
        (r: RecentRoom) => {
            navigate(
                `/chat/room/${encodeURIComponent(r.id)}?name=${encodeURIComponent(r.nickname || '访客')}`
            )
        },
        [navigate]
    )

    // 删除某条历史
    const removeOne = useCallback(
        (id: string) => {
            const next = rooms.filter((r) => r.id !== id)
            setRooms(next)
            saveRecentRooms(next)
        },
        [rooms]
    )

    // 清空历史
    const clearAll = useCallback(() => {
        setRooms([])
        saveRecentRooms([])
        message.success('已清空最近房间')
    }, [])

    return (
        <div className={s.page}>
            {/* 隐藏的 SVG 滤镜定义：用于“雷电”边框的噪声位移效果 */}
            <svg
                aria-hidden
                focusable="false"
                style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    pointerEvents: 'none',
                }}
            >
                <defs>
                    <filter
                        id="turbulent-displace"
                        colorInterpolationFilters="sRGB"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                    >
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.02"
                            numOctaves="10"
                            result="noise1"
                            seed="1"
                        />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate
                                attributeName="dy"
                                values="700; 0"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </feOffset>

                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.02"
                            numOctaves="10"
                            result="noise2"
                            seed="1"
                        />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate
                                attributeName="dy"
                                values="0; -700"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </feOffset>

                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.02"
                            numOctaves="10"
                            result="noise1b"
                            seed="2"
                        />
                        <feOffset in="noise1b" dx="0" dy="0" result="offsetNoise3">
                            <animate
                                attributeName="dx"
                                values="490; 0"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </feOffset>

                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.02"
                            numOctaves="10"
                            result="noise2b"
                            seed="2"
                        />
                        <feOffset in="noise2b" dx="0" dy="0" result="offsetNoise4">
                            <animate
                                attributeName="dx"
                                values="0; -490"
                                dur="6s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </feOffset>

                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="combinedNoise"
                            scale="30"
                            xChannelSelector="R"
                            yChannelSelector="B"
                        />
                    </filter>
                    {/* 两侧描边使用的位移滤镜，尽量保持左右对称不偏移 */}
                    <filter id="electric-sides" colorInterpolationFilters="sRGB">
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.02"
                            numOctaves="8"
                            seed="3"
                            result="noise"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values="0.015;0.03;0.015"
                                dur="4s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </feTurbulence>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="32"
                            xChannelSelector="R"
                            yChannelSelector="B"
                        >
                            <animate
                                attributeName="scale"
                                values="26;40;26"
                                dur="4s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </feDisplacementMap>
                    </filter>
                    {/* Hover/Active 强化版 */}
                    <filter id="electric-sides-strong" colorInterpolationFilters="sRGB">
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.024"
                            numOctaves="9"
                            seed="4"
                            result="noise"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values="0.02;0.035;0.02"
                                dur="3.5s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </feTurbulence>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="44"
                            xChannelSelector="R"
                            yChannelSelector="B"
                        >
                            <animate
                                attributeName="scale"
                                values="36;52;36"
                                dur="3.5s"
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </feDisplacementMap>
                    </filter>
                </defs>
            </svg>
            {/* 顶部功能模块入口（正方形卡片） */}
            <div className={s.section}>
                <div className={s.sectionHeader}>
                    {/* 深色背景下使用白色标题，确保对比度 */}
                    <Title level={3} style={{ margin: 0, color: '#ffffff' }}>
                        聊天中心
                    </Title>
                </div>
                <div className={s.grid}>
                    {/* AI Chat 面板（示例同款边框+发光层结构） */}
                    <div
                        className={s.electricPanel}
                        onClick={goAi}
                        role="button"
                        aria-label="AI Chat"
                    >
                        <div className={s.panelInner}>
                            <div className={s.panelBorderOuter}>
                                <div className={s.panelMainCard} />
                            </div>
                            <div className={s.panelEdgeGlow1} />
                            <div className={s.panelEdgeGlow2} />
                        </div>
                        <div className={s.panelOverlay1} />
                        <div className={s.panelOverlay2} />
                        <div className={s.panelBackgroundGlow} />
                        <div className={s.panelContent}>
                            <div
                                className={s.iconWrap}
                                style={{
                                    background:
                                        'color-mix(in oklch, var(--electric-color, #dd8448) 18%, transparent)',
                                    color: 'var(--electric-color, #dd8448)',
                                }}
                            >
                                <RobotOutlined style={{ fontSize: 32 }} />
                            </div>
                            <div className={s.panelTitle}>AI Chat</div>
                            <div className={s.panelDesc}>流式对话与图片识别</div>
                        </div>
                    </div>

                    {/* 加入聊天室 面板（示例同款结构）*/}
                    <div
                        className={s.electricPanel}
                        onClick={() => setShowJoin(true)}
                        role="button"
                        aria-label="加入聊天室"
                    >
                        <div className={s.panelInner}>
                            <div className={s.panelBorderOuter}>
                                <div className={s.panelMainCard} />
                            </div>
                            <div className={s.panelEdgeGlow1} />
                            <div className={s.panelEdgeGlow2} />
                        </div>
                        <div className={s.panelOverlay1} />
                        <div className={s.panelOverlay2} />
                        <div className={s.panelBackgroundGlow} />
                        <div className={s.panelContent}>
                            <div
                                className={s.iconWrap}
                                style={{
                                    background:
                                        'color-mix(in oklch, var(--electric-color, #dd8448) 18%, transparent)',
                                    color: 'var(--electric-color, #dd8448)',
                                }}
                            >
                                <LoginOutlined style={{ fontSize: 32 }} />
                            </div>
                            <div className={s.panelTitle}>加入聊天室</div>
                            <div className={s.panelDesc}>输入房间号即可加入</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 最近聊天室列表 */}
            <div className={s.section}>
                <div className={s.sectionHeader}>
                    {/* 深色背景下使用白色标题，确保对比度 */}
                    <Title level={4} style={{ margin: 0, color: '#ffffff' }}>
                        聊天室列表
                    </Title>
                    {rooms.length > 0 && (
                        <Button
                            type="link"
                            size="small"
                            onClick={clearAll}
                            style={{ padding: 0, color: 'rgba(255,255,255,0.85)' }}
                        >
                            清空
                        </Button>
                    )}
                </div>

                {rooms.length > 0 ? (
                    <div className={s.grid}>
                        {rooms.map((r) => (
                            <div
                                key={`${r.id}-${r.time}`}
                                className={s.roomCard}
                                onClick={() => quickEnter(r)}
                                role="button"
                            >
                                <div className={s.roomTopBar} onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        size="small"
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeOne(r.id)}
                                    />
                                </div>
                                <div className={s.roomBody}>
                                    <div className={s.roomId} style={{ color: colors.text }}>
                                        {r.id}
                                    </div>
                                    <div
                                        className={s.roomMeta}
                                        style={{ color: colors.textSecondary }}
                                    >
                                        <Tag color="blue" style={{ marginRight: 8 }}>
                                            昵称 {r.nickname}
                                        </Tag>
                                        <Text type="secondary">
                                            {new Date(r.time).toLocaleString()}
                                        </Text>
                                    </div>
                                    <Button
                                        type="primary"
                                        size="small"
                                        icon={<ArrowRightOutlined />}
                                        onClick={() => quickEnter(r)}
                                    >
                                        进入
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={s.emptyWrap}>
                        <Empty
                            description={
                                <span style={{ color: 'rgba(255,255,255,0.65)' }}>
                                    暂无最近聊天室，点击上方加入一个房间
                                </span>
                            }
                        />
                    </div>
                )}
            </div>

            {/* 加入聊天室弹窗 */}
            <Modal
                open={showJoin}
                title="加入聊天室"
                okText="进入"
                onOk={doJoin}
                onCancel={() => setShowJoin(false)}
                destroyOnClose
            >
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <Input
                        placeholder="输入房间号"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <Input
                        placeholder="你的昵称（可选）"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <Text type="secondary">
                        无需后端：本地 BroadcastChannel 实时同步；后续可切换 Socket.IO
                    </Text>
                </Space>
            </Modal>
        </div>
    )
}

export default ChatEntry
