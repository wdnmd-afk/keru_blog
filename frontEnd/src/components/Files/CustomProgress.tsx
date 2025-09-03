import React from 'react'

interface CustomProgressProps {
    percent: number
    status: 'pending' | 'uploading' | 'success' | 'error'
    strokeColor: string
    uid: string
}

/**
 * 完全自定义的进度条组件
 * 绕过Antd Progress组件的潜在问题，确保进度显示的准确性
 */
const CustomProgress: React.FC<CustomProgressProps> = ({
    percent,
    status,
    strokeColor,
    uid
}) => {
    // 确保percent是有效的数字类型
    const validPercent = typeof percent === 'number' && !isNaN(percent) && isFinite(percent)
        ? Math.max(0, Math.min(100, percent))
        : 0

    // 移除日志，减少控制台输出

    // 根据状态确定颜色
    const getProgressColor = () => {
        switch (status) {
            case 'error':
                return '#ff4d4f'
            case 'success':
                return '#52c41a'
            case 'uploading':
                return strokeColor || '#1890ff'
            default:
                return '#d9d9d9'
        }
    }

    const progressContainerStyle: React.CSSProperties = {
        width: '100px',
        height: '6px',
        backgroundColor: '#f0f0f0',
        borderRadius: '3px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid #e8e8e8'
    }

    const progressBarStyle: React.CSSProperties = {
        width: `${validPercent}%`,
        height: '100%',
        backgroundColor: getProgressColor(),
        transition: 'width 0.2s ease-out',
        borderRadius: '2px',
        position: 'relative',
        // 强制重绘，确保视觉更新
        transform: 'translateZ(0)',
        willChange: 'width'
    }

    return (
        <div style={progressContainerStyle}>
            <div
                style={progressBarStyle}
                title={`${validPercent}%`}
                key={`progress-${uid}-${validPercent}`} // 强制重新渲染
            />
        </div>
    )
}

export default CustomProgress
