/**
 * WebRTC自定义Hook
 *
 * 功能说明：
 * 1. 封装WebRTC连接逻辑
 * 2. 管理PeerConnection生命周期
 * 3. 处理信令消息交换
 * 4. 提供连接状态和统计信息
 */

import { message } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { webrtcConfig } from '../config/webrtc.config'

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'failed'

export interface WebRTCStats {
    latency: number
    bitrate: number
    frameRate: number
    resolution: string
    duration: string
    packetLoss: number
}

export interface UseWebRTCReturn {
    connectionState: ConnectionState
    isConnected: boolean
    remoteStream: MediaStream | null
    stats: WebRTCStats
    connect: () => void
    disconnect: () => void
    sendMessage: (message: any) => void
}

export const useWebRTC = (): UseWebRTCReturn => {
    const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected')
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [stats, setStats] = useState<WebRTCStats>({
        latency: 0,
        bitrate: 0,
        frameRate: 0,
        resolution: '0x0',
        duration: '00:00:00',
        packetLoss: 0,
    })

    const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
    const socketRef = useRef<Socket | null>(null)
    const startTimeRef = useRef<number>(0)
    const statsIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const isConnected = connectionState === 'connected'

    // 初始化PeerConnection
    const initializePeerConnection = useCallback(() => {
        const pc = new RTCPeerConnection(webrtcConfig.peerConnectionConfig)

        // 处理远程流
        pc.ontrack = (event) => {
            console.log('Received remote stream:', event.streams[0])
            setRemoteStream(event.streams[0])
        }

        // 处理ICE候选
        pc.onicecandidate = (event) => {
            if (event.candidate && socketRef.current) {
                socketRef.current.emit('ice-candidate', event.candidate)
            }
        }

        // 监听连接状态变化
        pc.onconnectionstatechange = () => {
            console.log('Connection state changed:', pc.connectionState)

            switch (pc.connectionState) {
                case 'connected':
                    setConnectionState('connected')
                    startTimeRef.current = Date.now()
                    startStatsCollection()
                    message.success('WebRTC连接已建立')
                    break
                case 'connecting':
                    setConnectionState('connecting')
                    break
                case 'disconnected':
                case 'closed':
                    setConnectionState('disconnected')
                    stopStatsCollection()
                    break
                case 'failed':
                    setConnectionState('failed')
                    message.error('WebRTC连接失败')
                    break
            }
        }

        // 监听ICE连接状态
        pc.oniceconnectionstatechange = () => {
            console.log('ICE connection state:', pc.iceConnectionState)
        }

        return pc
    }, [])

    // 初始化Socket连接
    const initializeSocket = useCallback(() => {
        const socket = io(webrtcConfig.signalingServerUrl, {
            transports: ['websocket'],
        })

        socket.on('connect', () => {
            console.log('Socket connected to signaling server')
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected from signaling server')
        })

        // 处理offer信令
        socket.on('offer', async (offer: RTCSessionDescriptionInit) => {
            console.log('Received offer:', offer)

            if (!peerConnectionRef.current) return

            try {
                await peerConnectionRef.current.setRemoteDescription(offer)
                const answer = await peerConnectionRef.current.createAnswer()
                await peerConnectionRef.current.setLocalDescription(answer)

                socket.emit('answer', answer)
            } catch (error) {
                console.error('Error handling offer:', error)
                message.error('处理视频信令失败')
            }
        })

        // 处理ICE候选
        socket.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
            console.log('Received ICE candidate:', candidate)

            if (!peerConnectionRef.current) return

            try {
                await peerConnectionRef.current.addIceCandidate(candidate)
            } catch (error) {
                console.error('Error adding ICE candidate:', error)
            }
        })

        socket.on('error', (error: any) => {
            console.error('Socket error:', error)
            message.error('信令服务器连接错误')
        })

        return socket
    }, [])

    // 开始统计信息收集
    const startStatsCollection = useCallback(() => {
        if (statsIntervalRef.current) {
            clearInterval(statsIntervalRef.current)
        }

        statsIntervalRef.current = setInterval(async () => {
            if (!peerConnectionRef.current) return

            try {
                const stats = await peerConnectionRef.current.getStats()
                const newStats = parseWebRTCStats(stats)
                setStats(newStats)
            } catch (error) {
                console.error('Error collecting stats:', error)
            }
        }, 1000)
    }, [])

    // 停止统计信息收集
    const stopStatsCollection = useCallback(() => {
        if (statsIntervalRef.current) {
            clearInterval(statsIntervalRef.current)
            statsIntervalRef.current = null
        }
    }, [])

    // 解析WebRTC统计信息
    const parseWebRTCStats = (stats: RTCStatsReport): WebRTCStats => {
        let latency = 0
        let bitrate = 0
        let frameRate = 0
        let resolution = '0x0'
        let packetLoss = 0

        stats.forEach((report) => {
            if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
                bitrate = Math.round((report.bytesReceived * 8) / 1000) // kbps
                frameRate = report.framesPerSecond || 0

                if (report.frameWidth && report.frameHeight) {
                    resolution = `${report.frameWidth}x${report.frameHeight}`
                }
            }

            if (report.type === 'candidate-pair' && report.state === 'succeeded') {
                latency = report.currentRoundTripTime
                    ? Math.round(report.currentRoundTripTime * 1000)
                    : 0
            }
        })

        // 计算连接时长
        const duration = startTimeRef.current
            ? formatDuration(Date.now() - startTimeRef.current)
            : '00:00:00'

        return {
            latency,
            bitrate,
            frameRate,
            resolution,
            duration,
            packetLoss,
        }
    }

    // 格式化时长
    const formatDuration = (ms: number): string => {
        const seconds = Math.floor(ms / 1000)
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // 连接WebRTC
    const connect = useCallback(() => {
        if (connectionState === 'connecting' || connectionState === 'connected') {
            return
        }

        setConnectionState('connecting')

        try {
            // 初始化PeerConnection
            peerConnectionRef.current = initializePeerConnection()

            // 初始化Socket连接
            socketRef.current = initializeSocket()

            // 通知信令服务器准备接收连接
            socketRef.current.emit('web-client-ready')
        } catch (error) {
            console.error('Error connecting:', error)
            setConnectionState('failed')
            message.error('连接失败，请检查网络设置')
        }
    }, [connectionState, initializePeerConnection, initializeSocket])

    // 断开WebRTC连接
    const disconnect = useCallback(() => {
        // 关闭PeerConnection
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close()
            peerConnectionRef.current = null
        }

        // 关闭Socket连接
        if (socketRef.current) {
            socketRef.current.disconnect()
            socketRef.current = null
        }

        // 清理状态
        setRemoteStream(null)
        setConnectionState('disconnected')
        stopStatsCollection()

        message.info('已断开连接')
    }, [stopStatsCollection])

    // 发送消息
    const sendMessage = useCallback((msg: any) => {
        if (socketRef.current) {
            socketRef.current.emit('message', msg)
        }
    }, [])

    // 组件卸载时清理资源
    useEffect(() => {
        return () => {
            disconnect()
        }
    }, [disconnect])

    return {
        connectionState,
        isConnected,
        remoteStream,
        stats,
        connect,
        disconnect,
        sendMessage,
    }
}
