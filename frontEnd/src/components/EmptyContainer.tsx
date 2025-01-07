import React, { ReactNode } from 'react'

interface EmptyProps {
    flag: boolean | any
    fallback?: ReactNode
    children: ReactNode
}

const DefaultFallback = () => (
    <div wh-full f-c-c font-bold className={'text-[18px]'}>
        <div>暂无数据</div>
    </div>
)

const EmptyContainer: React.FC<EmptyProps> = ({ flag, fallback, children }) => {
    if (flag) {
        return <>{children}</>
    }
    return <>{fallback ? fallback : <DefaultFallback />}</>
}

export default EmptyContainer
