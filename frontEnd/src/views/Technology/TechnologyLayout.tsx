import TechBreadcrumb from '@/components/TechBreadcrumb'
import { techMenuItems } from '@/config/technologyRoutes'
import styles from '@/styles/technologyLayout.module.scss'
import { parseRoute } from '@/utils/routeUtils'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

// 加载中组件
const Loading: React.FC = () => {
    const { t } = useTranslation('technology')
    return (
        <div className={styles.loading_container}>
            <div className={styles.loading_spinner}>{t('common.loading')}</div>
        </div>
    )
}

// 404组件
const NotFoundTech: React.FC = () => {
    const { t } = useTranslation('technology')
    return (
        <div className={styles.not_found_container}>
            <h2>{t('common.tech_not_found')}</h2>
            <p>{t('common.tech_not_found_desc')}</p>
        </div>
    )
}

const TechnologyLayout: React.FC = () => {
    const { t } = useTranslation('technology')
    const navigate = useNavigate()
    const location = useLocation()
    const { tech } = useParams<{ tech: string }>()

    const handleMenuClick = (key: string) => {
        navigate(`/technology/${key}`)
    }

    const handleBackToMain = () => {
        navigate('/technology')
    }

    // 根据路由参数渲染对应的技术详解组件
    const renderTechContent = () => {
        const routeResult = parseRoute(location.pathname)

        if (!routeResult.component) {
            return <NotFoundTech />
        }

        const Component = routeResult.component
        return (
            <Suspense fallback={<Loading />}>
                <Component />
            </Suspense>
        )
    }

    return (
        <div className={styles.tech_layout_container}>
            {/* 左侧菜单 */}
            <div className={styles.tech_sidebar}>
                <div className={styles.sidebar_header}>
                    <div className={styles.back_button} onClick={handleBackToMain}>
                        <ArrowLeftOutlined />
                        <span>{t('common.back_to_tech_stack')}</span>
                    </div>
                    <h3>{t('common.tech_details')}</h3>
                </div>

                <Menu
                    mode="vertical"
                    selectedKeys={[tech || '']}
                    className={styles.tech_menu}
                    items={techMenuItems.map((item) => ({
                        key: item.key,
                        icon: item.icon,
                        label: (
                            <div className={styles.menu_item_content}>
                                <span className={styles.menu_title}>{item.label}</span>
                                <span className={styles.menu_desc}>{item.description}</span>
                            </div>
                        ),
                        onClick: () => handleMenuClick(item.key),
                    }))}
                />
            </div>

            {/* 右侧内容区域 */}
            <div className={styles.tech_content_area}>
                {/* 面包屑导航 */}
                <TechBreadcrumb simple />

                {/* 技术详解内容 */}
                <div className={styles.tech_content_wrapper}>{renderTechContent()}</div>
            </div>
        </div>
    )
}

export default TechnologyLayout
