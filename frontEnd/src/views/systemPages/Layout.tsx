import FloatingActions from '@/components/FloatingActions.tsx'
import HeaderActions from '@/components/HeaderActions.tsx'
import style from '@/styles/layout.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

interface MenuItem {
    name: string
    path: string
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation('layout')
    const navigate = useNavigate()
    const location = useLocation()
    const [activeMenu, setActiveMenu] = useState<string>(location.pathname)

    // 使用国际化的导航菜单项
    const headerList: MenuItem[] = [
        { name: t('header.navigation.home'), path: '/' },
        { name: t('header.navigation.learning'), path: '/learning' },
        { name: t('header.navigation.files'), path: '/files' },
        { name: t('header.navigation.technology'), path: '/technology' },
    ]
    const handleMenuClick = (item: MenuItem) => {
        if (item.path === location.pathname) return
        navigate(item.path)
        setActiveMenu(item.path)
    }

    return (
        <div className={style.layout_container}>
            <div className={style.layout_header}>
                <div className={style.header_logo}></div>
                <div className={style.header_menu}>
                    {headerList.map((item) => (
                        <div
                            className={`${style.menu_item} ${activeMenu === item.path ? style.menu_item_active : ''}`}
                            key={item.name}
                            onClick={() => {
                                handleMenuClick(item)
                            }}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <HeaderActions
                    showLanguageSwitcher={true}
                    showExternalLinks={true}
                    showUserInfo={true}
                    languageSwitcherShowLabel={false}
                    size="medium"
                />
            </div>
            <div className="flex-1 h-full overflow-hidden">{children}</div>
            <FloatingActions />
        </div>
    )
}

export default Layout
