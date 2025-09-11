/**
 * 浮动操作Hook
 *
 * 功能说明：
 * 1. 封装浮动操作的业务逻辑和状态管理
 * 2. 提供统一的浮动操作接口
 * 3. 处理滚动监听、分享、收藏等功能
 * 4. 集成全局状态管理
 */

import { useGlobalStore, useGlobalStoreAction } from '@/store'
import {
    FavoriteItem,
    FeedbackData,
    FloatingActionType,
    ShareOption,
    ShareType,
} from '@/types/floatingActions'
import { message } from 'antd'
import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

/**
 * 浮动操作Hook
 */
export const useFloatingActions = () => {
    const { t } = useTranslation('floatingActions')
    const location = useLocation()

    // 获取状态和方法
    const floatingActions = useGlobalStore((state) => state.floatingActions)
    const {
        setShowBackToTop,
        setActivePanel,
        addFavorite,
        removeFavorite,
        updateFloatingSettings,
        markHelpTipShown,
        submitFeedback,
    } = useGlobalStoreAction()

    // ==================== 滚动监听 ====================

    /**
     * 处理滚动事件
     */
    const handleScroll = useCallback(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const shouldShow = scrollTop > 300

        if (shouldShow !== floatingActions.showBackToTop) {
            setShowBackToTop(shouldShow)
        }
    }, [floatingActions.showBackToTop, setShowBackToTop])

    // ==================== 键盘快捷键监听 ====================

    /**
     * 处理键盘事件
     */
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            // F8键打开帮助面板
            if (event.key === 'F8') {
                event.preventDefault()
                if (floatingActions.activePanel === FloatingActionType.HELP) {
                    setActivePanel(null) // 如果已经打开则关闭
                } else {
                    setActivePanel(FloatingActionType.HELP) // 打开帮助面板
                }
            }
            // Esc键关闭当前面板
            else if (event.key === 'Escape' && floatingActions.activePanel) {
                event.preventDefault()
                setActivePanel(null)
            }
        },
        [floatingActions.activePanel, setActivePanel]
    )

    /**
     * 返回顶部
     */
    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [])

    // ==================== 分享功能 ====================

    /**
     * 获取当前页面分享数据
     */
    const getShareData = useCallback(() => {
        return {
            title: document.title || 'Keru Blog',
            url: window.location.href,
            description:
                document.querySelector('meta[name="description"]')?.getAttribute('content') ||
                '分享来自 Keru Blog 的精彩内容',
            image:
                document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
        }
    }, [])

    /**
     * 原生分享
     */
    const handleNativeShare = useCallback(async () => {
        const shareData = getShareData()

        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareData.title,
                    text: shareData.description,
                    url: shareData.url,
                })
                message.success(t('share.success'))
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    message.error(t('share.failed'))
                }
            }
        } else {
            // 降级到复制链接
            handleCopyLink()
        }
    }, [getShareData, t])

    /**
     * 复制链接
     */
    const handleCopyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            message.success(t('share.link_copied'))
        } catch (error) {
            message.error(t('share.copy_failed'))
        }
    }, [t])

    /**
     * 社交媒体分享
     */
    const handleSocialShare = useCallback(
        (type: ShareType) => {
            const shareData = getShareData()
            const encodedUrl = encodeURIComponent(shareData.url)
            const encodedTitle = encodeURIComponent(shareData.title)
            const encodedDescription = encodeURIComponent(shareData.description)

            let shareUrl = ''

            switch (type) {
                case ShareType.WEIBO:
                    shareUrl = `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}&pic=${shareData.image}`
                    break
                case ShareType.QQ:
                    shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`
                    break
                case ShareType.TWITTER:
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
                    break
                case ShareType.FACEBOOK:
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
                    break
                default:
                    return
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400')
            }
        },
        [getShareData]
    )

    /**
     * 获取分享选项
     */
    const shareOptions: ShareOption[] = useMemo(
        () => [
            {
                type: ShareType.NATIVE,
                label: t('share.native'),
                icon: 'ShareAltOutlined',
                onClick: handleNativeShare,
            },
            {
                type: ShareType.COPY_LINK,
                label: t('share.copy_link'),
                icon: 'LinkOutlined',
                onClick: handleCopyLink,
            },
            {
                type: ShareType.WEIBO,
                label: t('share.weibo'),
                icon: 'WeiboOutlined',
                onClick: () => handleSocialShare(ShareType.WEIBO),
            },
            {
                type: ShareType.QQ,
                label: t('share.qq'),
                icon: 'QqOutlined',
                onClick: () => handleSocialShare(ShareType.QQ),
            },
            {
                type: ShareType.TWITTER,
                label: t('share.twitter'),
                icon: 'TwitterOutlined',
                onClick: () => handleSocialShare(ShareType.TWITTER),
            },
            {
                type: ShareType.FACEBOOK,
                label: t('share.facebook'),
                icon: 'FacebookOutlined',
                onClick: () => handleSocialShare(ShareType.FACEBOOK),
            },
        ],
        [t, handleNativeShare, handleCopyLink, handleSocialShare]
    )

    // ==================== 收藏功能 ====================

    /**
     * 检查当前页面是否已收藏
     */
    const isCurrentPageFavorited = useMemo(() => {
        const currentUrl = window.location.href
        return floatingActions.favorites.some((item) => item.url === currentUrl)
    }, [floatingActions.favorites])

    /**
     * 切换收藏状态
     */
    const toggleFavorite = useCallback(() => {
        const currentUrl = window.location.href
        const existingFavorite = floatingActions.favorites.find((item) => item.url === currentUrl)

        if (existingFavorite) {
            removeFavorite(existingFavorite.id)
            message.success(t('favorite.removed'))
        } else {
            const favoriteItem: Omit<FavoriteItem, 'id' | 'createdAt' | 'updatedAt'> = {
                title: document.title || 'Untitled',
                url: currentUrl,
                description:
                    document.querySelector('meta[name="description"]')?.getAttribute('content') ||
                    '',
                thumbnail:
                    document.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                    '',
                tags: [location.pathname.split('/')[1] || 'general'],
            }
            addFavorite(favoriteItem)
            message.success(t('favorite.added'))
        }
    }, [floatingActions.favorites, addFavorite, removeFavorite, location.pathname, t])

    // ==================== 面板控制 ====================

    /**
     * 打开面板
     */
    const openPanel = useCallback(
        (panel: FloatingActionType) => {
            setActivePanel(panel)
        },
        [setActivePanel]
    )

    /**
     * 关闭面板
     */
    const closePanel = useCallback(() => {
        setActivePanel(null)
    }, [setActivePanel])

    /**
     * 切换面板
     */
    const togglePanel = useCallback(
        (panel: FloatingActionType) => {
            if (floatingActions.activePanel === panel) {
                closePanel()
            } else {
                openPanel(panel)
            }
        },
        [floatingActions.activePanel, openPanel, closePanel]
    )

    // ==================== 反馈功能 ====================

    /**
     * 提交反馈
     */
    const handleSubmitFeedback = useCallback(
        async (feedback: FeedbackData) => {
            try {
                await submitFeedback(feedback)
                message.success(t('feedback.submit_success'))
                closePanel()
            } catch (error) {
                message.error(t('feedback.submit_failed'))
                throw error
            }
        },
        [submitFeedback, closePanel, t]
    )

    // ==================== 生命周期 ====================

    /**
     * 初始化滚动监听和键盘监听
     */
    useEffect(() => {
        // 添加滚动监听
        window.addEventListener('scroll', handleScroll, { passive: true })
        // 添加键盘监听
        window.addEventListener('keydown', handleKeyDown)

        // 初始检查
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleScroll, handleKeyDown])

    // ==================== 返回接口 ====================

    return {
        // 状态
        floatingActions,
        isCurrentPageFavorited,
        shareOptions,

        // 基础操作
        scrollToTop,
        openPanel,
        closePanel,
        togglePanel,

        // 分享功能
        handleNativeShare,
        handleCopyLink,
        handleSocialShare,
        getShareData,

        // 收藏功能
        toggleFavorite,

        // 反馈功能
        handleSubmitFeedback,

        // 设置功能
        updateFloatingSettings,
        markHelpTipShown,
    }
}
