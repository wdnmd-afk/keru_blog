import SvgIcon from '@/components/SvgIcon.tsx'
import { Tooltip } from 'antd'
import { useEffect, useState } from 'react'

interface ToolbarProps {
    toolList: FunctionProps[]
    isDownload?: boolean
    fileUrl?: string
    fileName?: string
}

export interface FunctionProps {
    icon: string
    size?: number
    color?: string
    onClick: () => void
    title?: string
}

function Toolbar({ toolList, isDownload, fileUrl, fileName }: ToolbarProps) {
    const [realToolList, setRealToolList] = useState<FunctionProps[]>(toolList)
    const handleDownload = () => {
        if (!fileUrl) return

        // 通过 URL.createObjectURL 下载文件
        const link = document.createElement('a')
        // 检查 fileUrl 是 URL 还是 Blob，如果是 URL 直接使用
        if (fileUrl.startsWith('http') || fileUrl.startsWith('https')) {
            link.href = fileUrl
        } else {
            // 如果是 Blob 数据，创建 Blob URL
            const blob = new Blob([fileUrl], { type: 'application/octet-stream' }) // 你可以根据文件类型调整 MIME 类型
            link.href = URL.createObjectURL(blob)
        }

        link.download = fileName || 'temp' // 设置文件名
        link.style.display = 'none' // 隐藏链接
        document.body.appendChild(link)
        link.click() // 触发下载
        document.body.removeChild(link) // 下载完毕移除链接
    }
    useEffect(() => {
        if (isDownload) {
            setRealToolList((prevState) => [
                ...toolList,
                {
                    icon: 'download',
                    title: '下载',
                    onClick: handleDownload,
                },
            ])
        }
    }, [])
    return (
        <div
            className={'f-c-c p-2 '}
            style={{
                border: '1px solid #f8f8f8',
                background: 'linear-gradient(to bottom right,#e0f7fa, #ffffff)',
            }}
        >
            {realToolList?.map((item) => (
                <div
                    key={item.title}
                    cursor-pointer
                    onClick={item.onClick}
                    className={'mx-2 f-c-c'}
                >
                    <Tooltip placement="bottom" title={item.title}>
                        <span className="inline-block">
                            <SvgIcon name={item.icon} size={item.size || 24} color={item.color} />
                        </span>
                    </Tooltip>
                </div>
            ))}
        </div>
    )
}

export default Toolbar
