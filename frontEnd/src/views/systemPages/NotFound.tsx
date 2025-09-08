import { Button, Result } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
    const { t } = useTranslation('common')
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }

    return (
        <div flex items-center justify-center h-full>
            <Result
                status="404"
                title={t('pages.not_found.title')}
                subTitle={t('pages.not_found.subtitle')}
                extra={
                    <Button type="primary" onClick={handleClick}>
                        {t('pages.not_found.back_home')}
                    </Button>
                }
            />
        </div>
    )
}

export default NotFound
