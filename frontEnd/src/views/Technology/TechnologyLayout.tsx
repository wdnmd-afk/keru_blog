import { ArrowLeftOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { Suspense } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { techMenuItems } from '@/config/technologyRoutes'
import { parseRoute } from '@/utils/routeUtils'
import styles from '@/styles/technologyLayout.module.scss'

// 加载中组件
const Loading: React.FC = () => (
    <div className={styles.loading_container}>
        <div className={styles.loading_spinner}>加载中...</div>
    </div>
)

// 404组件
const NotFoundTech: React.FC = () => (
    <div className={styles.not_found_container}>
        <h2>技术栈不存在</h2>
        <p>请选择一个有效的技术栈查看详解</p>
    </div>
)

const TechnologyLayout: React.FC = () => {
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
                        <span>返回技术栈</span>
                    </div>
                    <h3>技术详解</h3>
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
                {renderTechContent()}
            </div>
        </div>
    )
}

export default TechnologyLayout
