import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface EmptyProps {
    flag: boolean | any
    fallback?: ReactNode
    children: ReactNode
}

const DefaultFallback = () => {
    const { t } = useTranslation('common')
    return (
        <div wh-full f-c-c font-bold className={'text-[18px]'}>
            <div>{t('messages.no_data')}</div>
        </div>
    )
}

const EmptyContainer: React.FC<EmptyProps> = ({ flag, fallback, children }) => {
    if (flag) {
        return <>{children}</>
    }
    return <>{fallback ? fallback : <DefaultFallback />}</>
}

export default EmptyContainer
