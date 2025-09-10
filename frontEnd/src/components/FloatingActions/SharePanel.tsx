/**
 * 分享面板组件
 * 
 * 功能说明：
 * 1. 提供多种分享方式：原生分享、复制链接、社交媒体分享
 * 2. 支持Web Share API并提供降级方案
 * 3. 响应式设计和无障碍访问支持
 * 4. 集成useFloatingActions Hook
 */

import { ShareOption, ShareType } from '@/types/floatingActions'
import { 
    CopyOutlined, 
    FacebookOutlined, 
    LinkOutlined, 
    QqOutlined, 
    ShareAltOutlined, 
    TwitterOutlined, 
    WeiboOutlined,
    CloseOutlined 
} from '@ant-design/icons'
import { Button, Card, Col, Divider, Row, Space, Tooltip, Typography } from 'antd'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SharePanel.module.scss'

const { Text, Title } = Typography

/**
 * 分享面板Props接口
 */
interface SharePanelProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 分享数据 */
    shareData?: {
        title?: string
        url?: string
        description?: string
        image?: string
    }
    /** 自定义分享选项 */
    customShareOptions?: ShareOption[]
}

/**
 * 分享面板组件
 */
const SharePanel: React.FC<SharePanelProps> = ({
    visible,
    onClose,
    shareData,
    customShareOptions,
}) => {
    const { t } = useTranslation('floatingActions')

    // 获取当前页面分享数据
    const currentShareData = useMemo(() => {
        return {
            title: shareData?.title || document.title || 'Keru Blog',
            url: shareData?.url || window.location.href,
            description: shareData?.description || 
                document.querySelector('meta[name="description"]')?.getAttribute('content') || 
                '分享来自 Keru Blog 的精彩内容',
            image: shareData?.image || 
                document.querySelector('meta[property="og:image"]')?.getAttribute('content') || 
                '',
        }
    }, [shareData])

    // 原生分享处理
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: currentShareData.title,
                    text: currentShareData.description,
                    url: currentShareData.url,
                })
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('原生分享失败:', error)
                }
            }
        }
    }

    // 复制链接处理
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentShareData.url)
        } catch (error) {
            console.error('复制链接失败:', error)
        }
    }

    // 社交媒体分享处理
    const handleSocialShare = (type: ShareType) => {
        const encodedUrl = encodeURIComponent(currentShareData.url)
        const encodedTitle = encodeURIComponent(currentShareData.title)
        const encodedDescription = encodeURIComponent(currentShareData.description)
        
        let shareUrl = ''
        
        switch (type) {
            case ShareType.WEIBO:
                shareUrl = `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}&pic=${currentShareData.image}`
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
            window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
        }
    }

    // 默认分享选项
    const defaultShareOptions: ShareOption[] = useMemo(() => [
        {
            type: ShareType.NATIVE,
            label: t('share.native', '原生分享'),
            icon: 'ShareAltOutlined',
            onClick: handleNativeShare,
        },
        {
            type: ShareType.COPY_LINK,
            label: t('share.copy_link', '复制链接'),
            icon: 'LinkOutlined',
            onClick: handleCopyLink,
        },
        {
            type: ShareType.WEIBO,
            label: t('share.weibo', '微博'),
            icon: 'WeiboOutlined',
            onClick: () => handleSocialShare(ShareType.WEIBO),
        },
        {
            type: ShareType.QQ,
            label: t('share.qq', 'QQ'),
            icon: 'QqOutlined',
            onClick: () => handleSocialShare(ShareType.QQ),
        },
        {
            type: ShareType.TWITTER,
            label: t('share.twitter', 'Twitter'),
            icon: 'TwitterOutlined',
            onClick: () => handleSocialShare(ShareType.TWITTER),
        },
        {
            type: ShareType.FACEBOOK,
            label: t('share.facebook', 'Facebook'),
            icon: 'FacebookOutlined',
            onClick: () => handleSocialShare(ShareType.FACEBOOK),
        },
    ], [t])

    // 使用自定义分享选项或默认选项
    const shareOptions = customShareOptions || defaultShareOptions

    // 获取图标组件
    const getIconComponent = (iconName: string) => {
        const iconMap: Record<string, React.ReactNode> = {
            ShareAltOutlined: <ShareAltOutlined />,
            LinkOutlined: <LinkOutlined />,
            CopyOutlined: <CopyOutlined />,
            WeiboOutlined: <WeiboOutlined />,
            QqOutlined: <QqOutlined />,
            TwitterOutlined: <TwitterOutlined />,
            FacebookOutlined: <FacebookOutlined />,
        }
        return iconMap[iconName] || <ShareAltOutlined />
    }

    // 检查是否支持原生分享
    const supportsNativeShare = 'share' in navigator

    if (!visible) {
        return null
    }

    return (
        <div className={styles.share_panel_overlay} onClick={onClose}>
            <Card 
                className={styles.share_panel}
                onClick={(e) => e.stopPropagation()}
                title={
                    <div className={styles.panel_header}>
                        <Title level={4} className={styles.panel_title}>
                            {t('share.title', '分享内容')}
                        </Title>
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={onClose}
                            className={styles.close_button}
                            aria-label={t('common.close', '关闭')}
                        />
                    </div>
                }
                bordered={false}
            >
                {/* 分享内容预览 */}
                <div className={styles.share_preview}>
                    <Text strong className={styles.preview_title}>
                        {currentShareData.title}
                    </Text>
                    <Text type="secondary" className={styles.preview_description}>
                        {currentShareData.description}
                    </Text>
                    <Text code className={styles.preview_url}>
                        {currentShareData.url}
                    </Text>
                </div>

                <Divider />

                {/* 分享选项 */}
                <div className={styles.share_options}>
                    <Row gutter={[12, 12]}>
                        {shareOptions.map((option) => {
                            // 如果是原生分享但不支持，则跳过
                            if (option.type === ShareType.NATIVE && !supportsNativeShare) {
                                return null
                            }

                            return (
                                <Col xs={12} sm={8} md={6} key={option.type}>
                                    <Tooltip title={option.label} placement="top">
                                        <Button
                                            type="default"
                                            icon={getIconComponent(option.icon)}
                                            onClick={option.onClick}
                                            className={styles.share_button}
                                            block
                                        >
                                            <span className={styles.share_button_text}>
                                                {option.label}
                                            </span>
                                        </Button>
                                    </Tooltip>
                                </Col>
                            )
                        })}
                    </Row>
                </div>

                {/* 快捷操作 */}
                <Divider />
                <div className={styles.quick_actions}>
                    <Space size="middle">
                        <Button
                            type="primary"
                            icon={<CopyOutlined />}
                            onClick={handleCopyLink}
                            size="small"
                        >
                            {t('share.quick_copy', '快速复制')}
                        </Button>
                        {supportsNativeShare && (
                            <Button
                                type="default"
                                icon={<ShareAltOutlined />}
                                onClick={handleNativeShare}
                                size="small"
                            >
                                {t('share.quick_share', '快速分享')}
                            </Button>
                        )}
                    </Space>
                </div>
            </Card>
        </div>
    )
}

export default SharePanel
