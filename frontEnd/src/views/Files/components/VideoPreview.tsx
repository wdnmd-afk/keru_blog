/**
 * 视频预览器组件
 * 支持mp4, avi, mov等格式的视频预览
 */

import {
    DownloadOutlined,
    FullscreenOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    ReloadOutlined,
    SoundOutlined,
} from '@ant-design/icons'
import { Alert, Button, Progress, Slider, Space, Tooltip } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface VideoPreviewProps {
    /** 视频文件URL */
    src: string
    /** 文件名称 */
    fileName?: string
    /** 文件大小（字节） */
    fileSize?: number
    /** 是否显示控制栏 */
    showControls?: boolean
    /** 是否自动播放 */
    autoPlay?: boolean
    /** 是否循环播放 */
    loop?: boolean
    /** 是否静音 */
    muted?: boolean
    /** 最大宽度 */
    maxWidth?: number | string
    /** 最大高度 */
    maxHeight?: number | string
    /** 加载失败回调 */
    onError?: (error: string) => void
    /** 加载成功回调 */
    onLoad?: () => void
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
    src,
    fileName,
    fileSize,
    showControls = true,
    autoPlay = false,
    loop = false,
    muted = false,
    maxWidth = '100%',
    maxHeight = '70vh',
    onError,
    onLoad,
}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(muted)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [loadProgress, setLoadProgress] = useState(0)

    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    /**
     * 处理视频加载成功
     */
    const handleLoadedData = useCallback(() => {
        setLoading(false)
        setError(null)
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
        onLoad?.()
    }, [onLoad])

    /**
     * 处理视频加载失败
     */
    const handleError = useCallback(() => {
        setLoading(false)
        setError('视频加载失败')
        onError?.('视频加载失败')
    }, [onError])

    /**
     * 播放/暂停切换
     */
    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
        }
    }, [isPlaying])

    /**
     * 处理播放状态变化
     */
    const handlePlay = useCallback(() => {
        setIsPlaying(true)
    }, [])

    const handlePause = useCallback(() => {
        setIsPlaying(false)
    }, [])

    /**
     * 处理时间更新
     */
    const handleTimeUpdate = useCallback(() => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }, [])

    /**
     * 处理进度条拖拽
     */
    const handleSeek = useCallback((value: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = value
            setCurrentTime(value)
        }
    }, [])

    /**
     * 处理音量变化
     */
    const handleVolumeChange = useCallback((value: number) => {
        if (videoRef.current) {
            videoRef.current.volume = value
            setVolume(value)
            setIsMuted(value === 0)
        }
    }, [])

    /**
     * 切换静音
     */
    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            const newMuted = !isMuted
            videoRef.current.muted = newMuted
            setIsMuted(newMuted)
        }
    }, [isMuted])

    /**
     * 全屏切换
     */
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }, [])

    /**
     * 下载视频
     */
    const handleDownload = useCallback(() => {
        const link = document.createElement('a')
        link.href = src
        link.download = fileName || 'video'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }, [src, fileName])

    /**
     * 重新加载视频
     */
    const handleReload = useCallback(() => {
        if (videoRef.current) {
            setLoading(true)
            videoRef.current.load()
        }
    }, [])

    /**
     * 处理加载进度
     */
    const handleProgress = useCallback(() => {
        if (videoRef.current && videoRef.current.buffered.length > 0) {
            const buffered = videoRef.current.buffered.end(0)
            const progress = (buffered / duration) * 100
            setLoadProgress(progress)
        }
    }, [duration])

    /**
     * 格式化时间
     */
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    /**
     * 格式化文件大小
     */
    const formatFileSize = (bytes?: number): string => {
        if (!bytes) return ''

        const units = ['B', 'KB', 'MB', 'GB']
        let size = bytes
        let unitIndex = 0

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024
            unitIndex++
        }

        return `${size.toFixed(1)} ${units[unitIndex]}`
    }

    // 监听全屏状态变化
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }
    }, [])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <Alert
                    message="视频预览失败"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-4"
                />
                <Space>
                    <Button onClick={handleReload}>重新加载</Button>
                    <Button onClick={handleDownload}>下载视频</Button>
                </Space>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="video-preview-container flex-col h-full">
            {/* 工具栏 */}
            {showControls && (
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">{fileName}</span>
                        {fileSize && (
                            <span className="text-xs text-gray-500">
                                ({formatFileSize(fileSize)})
                            </span>
                        )}
                    </div>

                    <Space size="small">
                        <Tooltip title="重新加载">
                            <Button type="text" icon={<ReloadOutlined />} onClick={handleReload} />
                        </Tooltip>

                        <Tooltip title="全屏">
                            <Button
                                type="text"
                                icon={<FullscreenOutlined />}
                                onClick={toggleFullscreen}
                            />
                        </Tooltip>

                        <Tooltip title="下载">
                            <Button
                                type="text"
                                icon={<DownloadOutlined />}
                                onClick={handleDownload}
                            />
                        </Tooltip>
                    </Space>
                </div>
            )}

            {/* 视频播放区域 */}
            <div className=" bg-black flex items-center justify-center flex-1 h-0">
                <video
                    ref={videoRef}
                    src={src}
                    className="max-w-full max-h-full"
                    style={{ maxWidth, maxHeight }}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    onLoadedData={handleLoadedData}
                    onError={handleError}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onTimeUpdate={handleTimeUpdate}
                    onProgress={handleProgress}
                />

                {loading && (
                    <div className=" inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                        <div className="text-white mb-4">加载视频中...</div>
                        <Progress percent={loadProgress} showInfo={false} className="w-48" />
                    </div>
                )}
            </div>

            {/* 控制栏 */}
            {showControls && !loading && !error && (
                <div className="p-4 bg-gray-50 border-t space-y-3">
                    {/* 进度条 */}
                    <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-500 w-12">
                            {formatTime(currentTime)}
                        </span>
                        <Slider
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            tooltip={{ formatter: (value) => formatTime(value || 0) }}
                            className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-12">{formatTime(duration)}</span>
                    </div>

                    {/* 控制按钮 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Button
                                type="text"
                                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                onClick={togglePlay}
                                size="large"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                type="text"
                                icon={<SoundOutlined />}
                                onClick={toggleMute}
                                className={isMuted ? 'text-gray-400' : ''}
                            />
                            <Slider
                                min={0}
                                max={1}
                                step={0.1}
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VideoPreview
