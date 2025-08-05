import React, { useState, useEffect } from 'react'
import { Button, Tooltip } from 'antd'
import { ArrowUpOutlined, MessageOutlined, SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import style from '@/styles/floatingActions.module.scss'

const FloatingActions: React.FC = () => {
    const [showBackToTop, setShowBackToTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            setShowBackToTop(scrollTop > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleFeedback = () => {
        // 可以添加反馈功能
        console.log('Feedback clicked')
    }

    const handleSettings = () => {
        // 可以添加设置功能
        console.log('Settings clicked')
    }

    const handleHelp = () => {
        // 可以添加帮助功能
        console.log('Help clicked')
    }

    return (
        <div className={style.floating_container}>
            <div className={style.floating_actions}>
                <Tooltip title="Help" placement="left">
                    <Button
                        type="text"
                        icon={<QuestionCircleOutlined />}
                        className={style.action_button}
                        onClick={handleHelp}
                    />
                </Tooltip>
                
                <Tooltip title="Settings" placement="left">
                    <Button
                        type="text"
                        icon={<SettingOutlined />}
                        className={style.action_button}
                        onClick={handleSettings}
                    />
                </Tooltip>
                
                <Tooltip title="Feedback" placement="left">
                    <Button
                        type="text"
                        icon={<MessageOutlined />}
                        className={style.action_button}
                        onClick={handleFeedback}
                    />
                </Tooltip>
                
                {showBackToTop && (
                    <Tooltip title="Back to Top" placement="left">
                        <Button
                            type="primary"
                            icon={<ArrowUpOutlined />}
                            className={`${style.action_button} ${style.back_to_top}`}
                            onClick={scrollToTop}
                        />
                    </Tooltip>
                )}
            </div>
        </div>
    )
}

export default FloatingActions
