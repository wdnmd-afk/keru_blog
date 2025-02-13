import SvgIcon from '@/components/SvgIcon.tsx'
import { Tooltip } from 'antd'

interface ToolbarProps {
    toolList?: FunctionProps[]
}

export interface FunctionProps {
    icon: string
    size?: number
    color?: string
    onClick: () => void
    title?: string
}
function Toolbar({ toolList }: ToolbarProps) {
    return (
        <div
            className={'flex items-center p-2'}
            style={{
                border: '1px solid #f8f8f8',
                background: 'linear-gradient(to bottom right,#e0f7fa, #ffffff)',
            }}
        >
            {toolList?.map((item) => (
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
