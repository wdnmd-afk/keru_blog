import FloatingActions from '@/components/FloatingActions.tsx'
import SvgIcon from '@/components/SvgIcon.tsx'
import style from '@/styles/layout.module.scss'
import { BrowserLocalStorage } from '@/utils'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface MenuItem {
    name: string
    path: string
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const headerList: MenuItem[] = [
        { name: 'Home', path: '/' },
        { name: 'Books', path: '/books' },
        { name: 'Files', path: '/files' },
        { name: 'Technology', path: '/technology' },
    ]

    const navigate = useNavigate()
    const location = useLocation()
    const [activeMenu, setActiveMenu] = useState<string>(location.pathname)
    const handleMenuClick = (item: MenuItem) => {
        if (item.path === location.pathname) return
        navigate(item.path)
        setActiveMenu(item.path)
    }
    const name = BrowserLocalStorage.get('userInfo')?.name
    const items: MenuProps['items'] = [
        {
            label: '退出登录',
            key: 'exit',
        },
    ]
    const onClick = ({ key }: { key: string }) => {
        if (key === 'exit') {
            BrowserLocalStorage.remove('userInfo')
            navigate('/login')
        }
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
                <Dropdown
                    menu={{ items, onClick }}
                    arrow={{ pointAtCenter: true }}
                    placement="bottom"
                >
                    <div className={style.header_person}>
                        {/*<div className={style.img}></div>*/}
                        <SvgIcon name={'react'} size={35}></SvgIcon>
                        <div className={style.name}> {name}</div>
                    </div>
                </Dropdown>
            </div>
            <div flex-1 h-0>
                {children}
            </div>
            <FloatingActions />
        </div>
    )
}

export default Layout
