import { Progress } from 'antd'
import React, { useEffect, useRef } from 'react'

interface UploadProgressProps {
    percent: number
    status: 'pending' | 'uploading' | 'success' | 'error'
    strokeColor: string
    uid: string
}

/**
 * 文件上传进度条组件
 * 专门处理进度条的实时更新和视觉渲染问题
 */
const UploadProgress: React.FC<UploadProgressProps> = ({ percent, status, strokeColor, uid }) => {
    const progressRef = useRef<HTMLDivElement>(null)
    const lastPercentRef = useRef<number>(0)

    // 确保percent是有效的数字类型，处理所有可能的异常情况
    let validPercent: number = 0

    if (typeof percent === 'number' && !isNaN(percent) && isFinite(percent)) {
        validPercent = Math.max(0, Math.min(100, percent)) // 限制在0-100范围内
    } else {
        console.warn(`Invalid percent value: ${percent}, type: ${typeof percent}`)
        validPercent = 0
    }

    // 使用useEffect监听percent变化，强制更新DOM
    useEffect(() => {
        console.log(`UploadProgress useEffect: ${uid}, validPercent: ${validPercent}%`)

        if (progressRef.current && validPercent !== lastPercentRef.current) {
            // 多种DOM选择器尝试，确保找到正确的进度条元素
            const selectors = [
                '.ant-progress-bg',
                '.ant-progress-inner .ant-progress-bg',
                '[role="progressbar"] .ant-progress-bg',
                '.ant-progress-line .ant-progress-bg',
            ]

            let progressBar: Element | null = null
            for (const selector of selectors) {
                progressBar = progressRef.current.querySelector(selector)
                if (progressBar) {
                    console.log(`找到进度条元素，使用选择器: ${selector}`)
                    break
                }
            }

            if (progressBar) {
                // 直接操作DOM，确保进度条视觉更新
                const progressElement = progressBar as HTMLElement
                const widthValue = validPercent.toString() + '%'

                // 强制设置样式，使用!important确保优先级
                progressElement.style.setProperty('width', widthValue, 'important')
                progressElement.style.setProperty('transition', 'width 0.3s ease', 'important')

                // 额外设置transform作为备选方案
                progressElement.style.setProperty(
                    'transform',
                    `scaleX(${validPercent / 100})`,
                    'important'
                )
                progressElement.style.setProperty('transform-origin', 'left', 'important')

                console.log(`强制更新Progress DOM: ${uid} - ${widthValue}`, {
                    element: progressElement,
                    computedWidth: getComputedStyle(progressElement).width,
                    styleWidth: progressElement.style.width,
                })
            } else {
                console.warn(`未找到进度条DOM元素: ${uid}`, {
                    container: progressRef.current,
                    innerHTML: progressRef.current.innerHTML,
                })
            }

            lastPercentRef.current = validPercent
        }
    }, [validPercent, uid])

    // 自定义进度条样式
    const customProgressStyle: React.CSSProperties = {
        width: '100px',
        height: '6px',
        backgroundColor: '#f0f0f0',
        borderRadius: '3px',
        overflow: 'hidden',
        position: 'relative',
    }

    const customProgressBarStyle: React.CSSProperties = {
        width: `${validPercent}%`,
        height: '100%',
        backgroundColor: strokeColor,
        transition: 'width 0.3s ease',
        borderRadius: '3px',
    }

    return (
        <div style={{ width: '100px', minWidth: '100px' }}>
            {/* 使用双重进度条：Antd + 自定义，确保至少一个能正常工作 */}
            <div ref={progressRef} style={{ position: 'relative' }}>
                {/* Antd Progress组件 */}
                <Progress
                    percent={validPercent}
                    size="small"
                    status={status === 'error' ? 'exception' : 'normal'}
                    showInfo={false}
                    strokeColor={strokeColor}
                    trailColor="#f0f0f0"
                    strokeWidth={6}
                />

                {/* 自定义进度条作为备选方案 */}
                <div
                    style={{
                        ...customProgressStyle,
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-50%)',
                        opacity: 0.8, // 半透明，不完全覆盖Antd组件
                        pointerEvents: 'none',
                    }}
                >
                    <div style={customProgressBarStyle} />
                </div>
            </div>
        </div>
    )
}

export default UploadProgress
