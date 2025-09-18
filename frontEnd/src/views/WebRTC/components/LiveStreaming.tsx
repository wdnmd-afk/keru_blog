/**
 * WebRTC实时直播组件
 * 
 * 功能说明：
 * 1. 实现WebRTC视频直播功能
 * 2. 支持接收来自React Native端的视频流
 * 3. 提供播放控制、质量调节等功能
 * 4. 显示连接状态和统计信息
 */

import React, { useRef, useEffect, useState } from 'react'
import { Card, Button, Select, Slider, Row, Col, Statistic, Alert, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    SoundOutlined,
    SettingOutlined,
    WifiOutlined,
    ClockCircleOutlined
} from '@ant-design/icons'
import { useWebRTC } from '../hooks/useWebRTC'
import styles from '@/styles/webrtc.module.scss'

const { Option } = Select

const LiveStreaming: React.FC = () => {
    const { t } = useTranslation('webrtc')
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(80)
    const [quality, setQuality] = useState('720p')
    
    // 使用自定义WebRTC Hook
    const {
        connectionState,
        isConnected,
        stats,
        connect,
        disconnect,
        remoteStream
    } = useWebRTC()

    // 当接收到远程流时，设置到video元素
    useEffect(() => {
        if (videoRef.current && remoteStream) {
            videoRef.current.srcObject = remoteStream
            videoRef.current.play().catch(console.error)
            setIsPlaying(true)
        }
    }, [remoteStream])

    // 音量控制
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume / 100
        }
    }, [volume])

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch(console.error)
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleConnect = () => {
        if (isConnected) {
            disconnect()
        } else {
            connect()
        }
    }

    const getConnectionStatusColor = () => {
        switch (connectionState) {
            case 'connected':
                return 'success'
            case 'connecting':
                return 'warning'
            case 'disconnected':
                return 'default'
            case 'failed':
                return 'error'
            default:
                return 'default'
        }
    }

    return (
        <div className={styles.live_streaming}>
            {/* 连接状态提示 */}
            <Alert
                message={t(`streaming.connection.status.${connectionState}`)}
                type={getConnectionStatusColor() as any}
                showIcon
                className={styles.connection_alert}
            />

            <Row gutter={[16, 16]}>
                {/* 视频播放区域 */}
                <Col xs={24} lg={16}>
                    <Card className={styles.video_card}>
                        <div className={styles.video_container}>
                            <video
                                ref={videoRef}
                                className={styles.video_player}
                                autoPlay
                                playsInline
                                muted={false}
                                poster="/placeholder-video.jpg"
                            />
                            
                            {!remoteStream && (
                                <div className={styles.video_placeholder}>
                                    <div className={styles.placeholder_content}>
                                        <WifiOutlined className={styles.placeholder_icon} />
                                        <h3>{t('streaming.video.waiting')}</h3>
                                        <p>{t('streaming.video.waiting_description')}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 视频控制栏 */}
                        <div className={styles.video_controls}>
                            <Space>
                                <Button
                                    type="primary"
                                    icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                    onClick={handlePlayPause}
                                    disabled={!remoteStream}
                                >
                                    {isPlaying ? t('streaming.controls.pause') : t('streaming.controls.play')}
                                </Button>

                                <div className={styles.volume_control}>
                                    <SoundOutlined />
                                    <Slider
                                        value={volume}
                                        onChange={setVolume}
                                        style={{ width: 100, marginLeft: 8 }}
                                        tooltip={{ formatter: (value) => `${value}%` }}
                                    />
                                </div>

                                <Select
                                    value={quality}
                                    onChange={setQuality}
                                    style={{ width: 100 }}
                                    suffixIcon={<SettingOutlined />}
                                >
                                    <Option value="1080p">1080p</Option>
                                    <Option value="720p">720p</Option>
                                    <Option value="480p">480p</Option>
                                    <Option value="360p">360p</Option>
                                </Select>
                            </Space>
                        </div>
                    </Card>
                </Col>

                {/* 控制面板 */}
                <Col xs={24} lg={8}>
                    {/* 连接控制 */}
                    <Card title={t('streaming.connection.title')} className={styles.control_card}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type={isConnected ? 'danger' : 'primary'}
                                size="large"
                                block
                                onClick={handleConnect}
                                loading={connectionState === 'connecting'}
                            >
                                {isConnected 
                                    ? t('streaming.connection.disconnect')
                                    : t('streaming.connection.connect')
                                }
                            </Button>
                            
                            <div className={styles.connection_info}>
                                <p>
                                    <strong>{t('streaming.connection.state')}:</strong>{' '}
                                    {t(`streaming.connection.status.${connectionState}`)}
                                </p>
                            </div>
                        </Space>
                    </Card>

                    {/* 统计信息 */}
                    <Card title={t('streaming.stats.title')} className={styles.stats_card}>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Statistic
                                    title={t('streaming.stats.latency')}
                                    value={stats.latency}
                                    suffix="ms"
                                    valueStyle={{ fontSize: '16px' }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title={t('streaming.stats.bitrate')}
                                    value={stats.bitrate}
                                    suffix="kbps"
                                    valueStyle={{ fontSize: '16px' }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title={t('streaming.stats.fps')}
                                    value={stats.frameRate}
                                    suffix="fps"
                                    valueStyle={{ fontSize: '16px' }}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title={t('streaming.stats.resolution')}
                                    value={stats.resolution}
                                    valueStyle={{ fontSize: '16px' }}
                                />
                            </Col>
                        </Row>
                        
                        <div className={styles.connection_time}>
                            <ClockCircleOutlined />
                            <span>{t('streaming.stats.duration')}: {stats.duration}</span>
                        </div>
                    </Card>

                    {/* 质量设置 */}
                    <Card title={t('streaming.quality.title')} className={styles.quality_card}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <label>{t('streaming.quality.video_quality')}</label>
                                <Select
                                    value={quality}
                                    onChange={setQuality}
                                    style={{ width: '100%', marginTop: 4 }}
                                >
                                    <Option value="1080p">1080p (2.5Mbps)</Option>
                                    <Option value="720p">720p (1.5Mbps)</Option>
                                    <Option value="480p">480p (800kbps)</Option>
                                    <Option value="360p">360p (500kbps)</Option>
                                </Select>
                            </div>
                            
                            <div>
                                <label>{t('streaming.quality.auto_adjust')}</label>
                                <p className={styles.quality_description}>
                                    {t('streaming.quality.auto_adjust_description')}
                                </p>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LiveStreaming
