import { useFloatingActions } from '@/hooks/useFloatingActions'
import style from '@/styles/floatingActions.module.scss'
import { FloatingActionType } from '@/types/floatingActions'
import {
    ArrowUpOutlined,
    HeartFilled,
    HeartOutlined,
    MessageOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    ShareAltOutlined,
} from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FavoriteManager from './FloatingActions/FavoriteManager'
import FeedbackForm from './FloatingActions/FeedbackForm'
import HelpTooltip from './FloatingActions/HelpTooltip'
import SettingsPanel from './FloatingActions/SettingsPanel'
import SharePanel from './FloatingActions/SharePanel'

/**
 * 浮动操作组件
 *
 * 功能说明：
 * 1. 集成所有浮动操作功能子组件
 * 2. 提供统一的浮动操作入口
 * 3. 响应式设计和无障碍访问支持
 * 4. 与全局状态管理集成
 */
const FloatingActions: React.FC = () => {
    const { t } = useTranslation('floatingActions')

    // 使用浮动操作Hook
    const {
        floatingActions,
        isCurrentPageFavorited,
        scrollToTop,
        togglePanel,
        toggleFavorite,
        handleSubmitFeedback,
    } = useFloatingActions()

    // 处理分享按钮点击
    const handleShare = () => {
        togglePanel(FloatingActionType.SHARE)
    }

    // 处理收藏按钮点击
    const handleFavorite = () => {
        if (floatingActions.activePanel === FloatingActionType.FAVORITE) {
            togglePanel(FloatingActionType.FAVORITE)
        } else {
            toggleFavorite()
        }
    }

    // 处理设置按钮点击
    const handleSettings = () => {
        togglePanel(FloatingActionType.SETTINGS)
    }

    // 处理反馈按钮点击
    const handleFeedback = () => {
        togglePanel(FloatingActionType.FEEDBACK)
    }

    // 处理帮助按钮点击
    const handleHelp = () => {
        togglePanel(FloatingActionType.HELP)
    }

    // 关闭面板
    const handleClosePanel = () => {
        togglePanel(floatingActions.activePanel!)
    }

    // 浮动容器展开/收起控制
    const [isOpen, setIsOpen] = useState(false)
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // 打开容器
    const openContainer = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current)
            hideTimerRef.current = null
        }
        setIsOpen(true)
    }
    // 延迟隐藏容器
    const scheduleHide = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current)
        }
        hideTimerRef.current = setTimeout(() => setIsOpen(false), 3000)
    }
    useEffect(() => () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current) }, [])

    return (
        <>
            <div
                className={style.floating_container}
                onMouseEnter={openContainer}
                onMouseLeave={scheduleHide}
            >
                <div className={`${style.floating_actions} ${isOpen ? style.open : ''}`}>
                    {/* 帮助按钮 */}
                    <Tooltip title={t('help.tooltip', '帮助')} placement="left">
                        <Button
                            type="text"
                            icon={<QuestionCircleOutlined />}
                            className={`${style.action_button} ${
                                floatingActions.activePanel === FloatingActionType.HELP
                                    ? style.active
                                    : ''
                            }`}
                            onClick={handleHelp}
                            aria-label={t('help.tooltip', '帮助')}
                        />
                    </Tooltip>

                    {/* 设置按钮 */}
                    <Tooltip title={t('settings.tooltip', '设置')} placement="left">
                        <Button
                            type="text"
                            icon={<SettingOutlined />}
                            className={`${style.action_button} ${
                                floatingActions.activePanel === FloatingActionType.SETTINGS
                                    ? style.active
                                    : ''
                            }`}
                            onClick={handleSettings}
                            aria-label={t('settings.tooltip', '设置')}
                        />
                    </Tooltip>

                    {/* 反馈按钮 */}
                    <Tooltip title={t('feedback.tooltip', '反馈')} placement="left">
                        <Button
                            type="text"
                            icon={<MessageOutlined />}
                            className={`${style.action_button} ${
                                floatingActions.activePanel === FloatingActionType.FEEDBACK
                                    ? style.active
                                    : ''
                            }`}
                            onClick={handleFeedback}
                            aria-label={t('feedback.tooltip', '反馈')}
                        />
                    </Tooltip>

                    {/* 收藏按钮 */}
                    <Tooltip
                        title={
                            isCurrentPageFavorited
                                ? t('favorite.remove', '取消收藏')
                                : t('favorite.add', '收藏')
                        }
                        placement="left"
                    >
                        <Button
                            type="text"
                            icon={isCurrentPageFavorited ? <HeartFilled /> : <HeartOutlined />}
                            className={`${style.action_button} ${
                                isCurrentPageFavorited ? style.favorited : ''
                            }`}
                            onClick={handleFavorite}
                            aria-label={
                                isCurrentPageFavorited
                                    ? t('favorite.remove', '取消收藏')
                                    : t('favorite.add', '收藏')
                            }
                        />
                    </Tooltip>

                    {/* 分享按钮 */}
                    <Tooltip title={t('share.tooltip', '分享')} placement="left">
                        <Button
                            type="text"
                            icon={<ShareAltOutlined />}
                            className={`${style.action_button} ${
                                floatingActions.activePanel === FloatingActionType.SHARE
                                    ? style.active
                                    : ''
                            }`}
                            onClick={handleShare}
                            aria-label={t('share.tooltip', '分享')}
                        />
                    </Tooltip>

                    {/* 返回顶部按钮 */}
                    {floatingActions.showBackToTop && (
                        <Tooltip title={t('back_to_top.tooltip', '返回顶部')} placement="left">
                            <Button
                                type="primary"
                                icon={<ArrowUpOutlined />}
                                className={`${style.action_button} ${style.back_to_top}`}
                                onClick={scrollToTop}
                                aria-label={t('back_to_top.tooltip', '返回顶部')}
                            />
                        </Tooltip>
                    )}
                </div>
                {/* 右侧细线触发器（默认可见） */}
                <div className={style.edge_trigger} aria-hidden />
            </div>

            {/* 功能面板 */}
            <SharePanel
                visible={floatingActions.activePanel === FloatingActionType.SHARE}
                onClose={handleClosePanel}
            />

            <FavoriteManager
                visible={floatingActions.activePanel === FloatingActionType.FAVORITE}
                onClose={handleClosePanel}
                favorites={floatingActions.favorites}
                onAddFavorite={(item) => {
                    // 这个功能已经在toggleFavorite中处理了
                }}
                onRemoveFavorite={(id) => {
                    // 这个功能已经在toggleFavorite中处理了
                }}
            />

            <SettingsPanel
                visible={floatingActions.activePanel === FloatingActionType.SETTINGS}
                onClose={handleClosePanel}
            />

            <FeedbackForm
                visible={floatingActions.activePanel === FloatingActionType.FEEDBACK}
                onClose={handleClosePanel}
                onSubmit={handleSubmitFeedback}
            />

            <HelpTooltip
                visible={floatingActions.activePanel === FloatingActionType.HELP}
                onClose={handleClosePanel}
            />
        </>
    )
}

export default FloatingActions
