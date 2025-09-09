import logoImage from '@/assets/images/k.jpg'
import style from '@/styles/home.module.scss'
import { Avatar, Statistic } from 'antd'
import { useTranslation } from 'react-i18next'

const HomeHeader = () => {
    const { t } = useTranslation('home')

    return (
        <div className={style.home_header}>
            <div className={style.header_content}>
                <Avatar size={80} src={logoImage} className={style.header_avatar} />
                <div className={style.header_info}>
                    <h1 className={style.home_title}>{t('header.title')}</h1>
                    <p className={style.home_subtitle}>{t('header.subtitle')}</p>
                    <div className={style.stats}>
                        <Statistic title={t('header.stats.articles')} value={24} />
                        <Statistic title={t('header.stats.visits')} value={12580} />
                        <Statistic title={t('header.stats.likes')} value={1024} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader
