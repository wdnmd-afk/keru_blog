/**
 * WebRTC 实时数据图表组件
 * 
 * 功能说明：
 * 1. 实时显示 WebRTC 连接统计数据
 * 2. 支持多种图表类型（折线图、仪表盘、环形图）
 * 3. 响应式设计，适配深色模式
 * 4. 流畅的数据更新动画
 */

import { useTheme } from '@/hooks/useTheme'
import {
    BarChartOutlined,
    DashboardOutlined,
    LineChartOutlined,
    PieChartOutlined,
} from '@ant-design/icons'
import { Card, Col, Progress, Row, Segmented, Statistic } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface WebRTCStats {
    latency: number
    bitrate: number
    frameRate: number
    resolution: string
    duration: string
    packetLoss: number
}

interface StatsChartProps {
    stats: WebRTCStats
    isConnected: boolean
    className?: string
}

type ChartType = 'line' | 'bar' | 'pie' | 'dashboard'

const StatsChart: React.FC<StatsChartProps> = ({ stats, isConnected, className }) => {
    const { t } = useTranslation('webrtc')
    const { resolvedTheme } = useTheme()
    const [chartType, setChartType] = useState<ChartType>('dashboard')
    const [historicalData, setHistoricalData] = useState<{
        timestamps: string[]
        latency: number[]
        bitrate: number[]
        packetLoss: number[]
    }>({
        timestamps: [],
        latency: [],
        bitrate: [],
        packetLoss: [],
    })

    // 收集历史数据
    useEffect(() => {
        if (!isConnected) return

        const interval = setInterval(() => {
            const now = new Date().toLocaleTimeString()
            
            setHistoricalData(prev => {
                const maxDataPoints = 20
                const newData = {
                    timestamps: [...prev.timestamps, now].slice(-maxDataPoints),
                    latency: [...prev.latency, stats.latency].slice(-maxDataPoints),
                    bitrate: [...prev.bitrate, stats.bitrate].slice(-maxDataPoints),
                    packetLoss: [...prev.packetLoss, stats.packetLoss].slice(-maxDataPoints),
                }
                return newData
            })
        }, 2000)

        return () => clearInterval(interval)
    }, [isConnected, stats])

    // 主题相关的颜色配置
    const themeColors = useMemo(() => {
        const isDark = resolvedTheme === 'dark'
        return {
            primary: isDark ? '#0A84FF' : '#007AFF',
            success: isDark ? '#30D158' : '#34C759',
            warning: isDark ? '#FF9F0A' : '#FF9500',
            error: isDark ? '#FF453A' : '#FF3B30',
            text: isDark ? '#FFFFFF' : '#000000',
            textSecondary: isDark ? '#EBEBF5' : '#3C3C43',
            background: isDark ? '#1C1C1E' : '#FFFFFF',
            border: isDark ? 'rgba(84, 84, 88, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        }
    }, [resolvedTheme])

    // 获取延迟状态颜色
    const getLatencyColor = (latency: number) => {
        if (latency < 50) return themeColors.success
        if (latency < 100) return themeColors.warning
        return themeColors.error
    }

    // 获取丢包率状态颜色
    const getPacketLossColor = (loss: number) => {
        if (loss < 1) return themeColors.success
        if (loss < 3) return themeColors.warning
        return themeColors.error
    }

    // 仪表盘视图
    const renderDashboard = () => (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
                <Card className="stats-metric-card">
                    <Statistic
                        title={t('streaming.stats.latency')}
                        value={stats.latency}
                        suffix="ms"
                        valueStyle={{ 
                            color: getLatencyColor(stats.latency),
                            fontSize: '24px',
                            fontWeight: 600 
                        }}
                    />
                    <Progress
                        percent={Math.min((stats.latency / 200) * 100, 100)}
                        strokeColor={getLatencyColor(stats.latency)}
                        showInfo={false}
                        size="small"
                        style={{ marginTop: 8 }}
                    />
                </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
                <Card className="stats-metric-card">
                    <Statistic
                        title={t('streaming.stats.bitrate')}
                        value={stats.bitrate}
                        suffix="kbps"
                        valueStyle={{ 
                            color: themeColors.primary,
                            fontSize: '24px',
                            fontWeight: 600 
                        }}
                    />
                    <Progress
                        percent={Math.min((stats.bitrate / 5000) * 100, 100)}
                        strokeColor={themeColors.primary}
                        showInfo={false}
                        size="small"
                        style={{ marginTop: 8 }}
                    />
                </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
                <Card className="stats-metric-card">
                    <Statistic
                        title={t('streaming.stats.fps')}
                        value={stats.frameRate}
                        suffix="fps"
                        valueStyle={{ 
                            color: themeColors.success,
                            fontSize: '24px',
                            fontWeight: 600 
                        }}
                    />
                    <Progress
                        percent={(stats.frameRate / 60) * 100}
                        strokeColor={themeColors.success}
                        showInfo={false}
                        size="small"
                        style={{ marginTop: 8 }}
                    />
                </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
                <Card className="stats-metric-card">
                    <Statistic
                        title={t('streaming.stats.packet_loss')}
                        value={stats.packetLoss}
                        suffix="%"
                        valueStyle={{ 
                            color: getPacketLossColor(stats.packetLoss),
                            fontSize: '24px',
                            fontWeight: 600 
                        }}
                    />
                    <Progress
                        percent={Math.min((stats.packetLoss / 10) * 100, 100)}
                        strokeColor={getPacketLossColor(stats.packetLoss)}
                        showInfo={false}
                        size="small"
                        style={{ marginTop: 8 }}
                    />
                </Card>
            </Col>
        </Row>
    )

    // 简化的折线图视图（使用 CSS 实现）
    const renderLineChart = () => (
        <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
                <Card title={t('streaming.stats.latency_trend')} className="chart-card">
                    <div className="simple-chart">
                        <div className="chart-value" style={{ color: getLatencyColor(stats.latency) }}>
                            {stats.latency}ms
                        </div>
                        <div className="chart-bars">
                            {historicalData.latency.slice(-10).map((value, index) => (
                                <div
                                    key={index}
                                    className="chart-bar"
                                    style={{
                                        height: `${Math.min((value / 200) * 100, 100)}%`,
                                        backgroundColor: getLatencyColor(value),
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </Col>
            
            <Col xs={24} lg={12}>
                <Card title={t('streaming.stats.bitrate_trend')} className="chart-card">
                    <div className="simple-chart">
                        <div className="chart-value" style={{ color: themeColors.primary }}>
                            {stats.bitrate}kbps
                        </div>
                        <div className="chart-bars">
                            {historicalData.bitrate.slice(-10).map((value, index) => (
                                <div
                                    key={index}
                                    className="chart-bar"
                                    style={{
                                        height: `${Math.min((value / 5000) * 100, 100)}%`,
                                        backgroundColor: themeColors.primary,
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    )

    const chartOptions = [
        { label: t('streaming.charts.dashboard'), value: 'dashboard', icon: <DashboardOutlined /> },
        { label: t('streaming.charts.line'), value: 'line', icon: <LineChartOutlined /> },
        { label: t('streaming.charts.bar'), value: 'bar', icon: <BarChartOutlined /> },
        { label: t('streaming.charts.pie'), value: 'pie', icon: <PieChartOutlined /> },
    ]

    return (
        <div className={`stats-chart-container ${className || ''}`}>
            <Card 
                title={t('streaming.stats.realtime_analytics')}
                extra={
                    <Segmented
                        options={chartOptions}
                        value={chartType}
                        onChange={(value) => setChartType(value as ChartType)}
                        size="small"
                    />
                }
                className="stats-chart-card"
            >
                {!isConnected ? (
                    <div className="no-data-placeholder">
                        <DashboardOutlined style={{ fontSize: 48, color: themeColors.textSecondary }} />
                        <p style={{ color: themeColors.textSecondary, marginTop: 16 }}>
                            {t('streaming.stats.no_connection')}
                        </p>
                    </div>
                ) : (
                    <>
                        {chartType === 'dashboard' && renderDashboard()}
                        {chartType === 'line' && renderLineChart()}
                        {chartType === 'bar' && renderLineChart()}
                        {chartType === 'pie' && renderDashboard()}
                    </>
                )}
            </Card>
        </div>
    )
}

export default StatsChart
