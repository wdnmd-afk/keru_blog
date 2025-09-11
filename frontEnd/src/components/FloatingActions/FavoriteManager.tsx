/**
 * 收藏管理器组件
 *
 * 功能说明：
 * 1. 管理用户收藏的页面和内容
 * 2. 支持添加、删除、搜索收藏项
 * 3. 标签分类和筛选功能
 * 4. 响应式设计和无障碍访问支持
 */

import { FavoriteItem } from '@/types/floatingActions'
import {
    CloseOutlined,
    DeleteOutlined,
    HeartFilled,
    HeartOutlined,
    LinkOutlined,
    TagOutlined,
} from '@ant-design/icons'
import { Button, Card, Empty, Input, List, Space, Tag, Tooltip, Typography, message } from 'antd'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FavoriteManager.module.scss'

const { Text, Title } = Typography
const { Search } = Input

/**
 * 收藏管理器Props接口
 */
interface FavoriteManagerProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 收藏列表 */
    favorites: FavoriteItem[]
    /** 添加收藏回调 */
    onAddFavorite: (item: Omit<FavoriteItem, 'id' | 'createdAt' | 'updatedAt'>) => void
    /** 移除收藏回调 */
    onRemoveFavorite: (id: string) => void
}

/**
 * 收藏管理器组件
 */
const FavoriteManager: React.FC<FavoriteManagerProps> = ({
    visible,
    onClose,
    favorites,
    onAddFavorite,
    onRemoveFavorite,
}) => {
    const { t } = useTranslation('floatingActions')
    const [searchText, setSearchText] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    // 获取所有标签
    const allTags = useMemo(() => {
        const tagSet = new Set<string>()
        favorites.forEach((item) => {
            item.tags.forEach((tag) => tagSet.add(tag))
        })
        return Array.from(tagSet).sort()
    }, [favorites])

    // 过滤收藏项
    const filteredFavorites = useMemo(() => {
        return favorites.filter((item) => {
            // 搜索文本过滤
            const matchesSearch =
                !searchText ||
                item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchText.toLowerCase()) ||
                item.url.toLowerCase().includes(searchText.toLowerCase())

            // 标签过滤
            const matchesTag = !selectedTag || item.tags.includes(selectedTag)

            return matchesSearch && matchesTag
        })
    }, [favorites, searchText, selectedTag])

    // 检查当前页面是否已收藏
    const isCurrentPageFavorited = useMemo(() => {
        const currentUrl = window.location.href
        return favorites.some((item) => item.url === currentUrl)
    }, [favorites])

    // 添加当前页面到收藏
    const handleAddCurrentPage = () => {
        const currentUrl = window.location.href
        const favoriteItem: Omit<FavoriteItem, 'id' | 'createdAt' | 'updatedAt'> = {
            title: document.title || 'Untitled',
            url: currentUrl,
            description:
                document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
            thumbnail:
                document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
            tags: [window.location.pathname.split('/')[1] || 'general'],
        }
        onAddFavorite(favoriteItem)
        message.success(t('favorite.added', '已添加到收藏'))
    }

    // 移除当前页面收藏
    const handleRemoveCurrentPage = () => {
        const currentUrl = window.location.href
        const existingFavorite = favorites.find((item) => item.url === currentUrl)
        if (existingFavorite) {
            onRemoveFavorite(existingFavorite.id)
            message.success(t('favorite.removed', '已从收藏中移除'))
        }
    }

    // 删除收藏项
    const handleDeleteFavorite = (id: string, title: string) => {
        onRemoveFavorite(id)
        message.success(t('favorite.deleted', `已删除收藏：${title}`))
    }

    // 打开收藏链接
    const handleOpenLink = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    // 复制链接
    const handleCopyLink = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url)
            message.success(t('favorite.link_copied', '链接已复制'))
        } catch (error) {
            message.error(t('favorite.copy_failed', '复制失败'))
        }
    }

    // 格式化日期
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date)
    }

    if (!visible) {
        return null
    }

    return (
        <div className={styles.favorite_manager_overlay} onClick={onClose}>
            <Card
                className={styles.favorite_manager}
                onClick={(e) => e.stopPropagation()}
                title={
                    <div className={styles.panel_header}>
                        <Title level={4} className={styles.panel_title}>
                            {t('favorite.title', '我的收藏')} ({favorites.length})
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
                {/* 当前页面收藏状态 */}
                <div className={styles.current_page_section}>
                    <div className={styles.current_page_info}>
                        <Text strong>{document.title}</Text>
                        <Text type="secondary" className={styles.current_url}>
                            {window.location.href}
                        </Text>
                    </div>
                    <Button
                        type={isCurrentPageFavorited ? 'default' : 'primary'}
                        icon={isCurrentPageFavorited ? <HeartFilled /> : <HeartOutlined />}
                        onClick={
                            isCurrentPageFavorited ? handleRemoveCurrentPage : handleAddCurrentPage
                        }
                        className={styles.favorite_toggle_button}
                    >
                        {isCurrentPageFavorited
                            ? t('favorite.remove_current', '取消收藏')
                            : t('favorite.add_current', '收藏此页')}
                    </Button>
                </div>

                {/* 搜索和筛选 */}
                <div className={styles.filter_section}>
                    <Search
                        placeholder={t('favorite.search_placeholder', '搜索收藏...')}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.search_input}
                        allowClear
                    />

                    {allTags.length > 0 && (
                        <div className={styles.tag_filter}>
                            <Tag
                                color={selectedTag === null ? 'blue' : 'default'}
                                onClick={() => setSelectedTag(null)}
                                className={styles.filter_tag}
                            >
                                {t('favorite.all_tags', '全部')}
                            </Tag>
                            {allTags.map((tag) => (
                                <Tag
                                    key={tag}
                                    color={selectedTag === tag ? 'blue' : 'default'}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={styles.filter_tag}
                                >
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    )}
                </div>

                {/* 收藏列表 */}
                <div className={styles.favorites_list}>
                    {filteredFavorites.length === 0 ? (
                        <Empty
                            description={
                                searchText || selectedTag
                                    ? t('favorite.no_results', '没有找到匹配的收藏')
                                    : t('favorite.empty', '暂无收藏内容')
                            }
                            className={styles.empty_state}
                        />
                    ) : (
                        <List
                            dataSource={filteredFavorites}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.id}
                                    className={styles.favorite_item}
                                    actions={[
                                        <Tooltip
                                            title={t('favorite.copy_link', '复制链接')}
                                            key="copy"
                                        >
                                            <Button
                                                type="text"
                                                icon={<LinkOutlined />}
                                                onClick={() => handleCopyLink(item.url)}
                                                size="small"
                                            />
                                        </Tooltip>,
                                        <Tooltip title={t('favorite.delete', '删除')} key="delete">
                                            <Button
                                                type="text"
                                                icon={<DeleteOutlined />}
                                                onClick={() =>
                                                    handleDeleteFavorite(item.id, item.title)
                                                }
                                                size="small"
                                                danger
                                            />
                                        </Tooltip>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.favorite_title}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleOpenLink(item.url)
                                                }}
                                            >
                                                {item.title}
                                            </a>
                                        }
                                        description={
                                            <div className={styles.favorite_meta}>
                                                {item.description && (
                                                    <Text
                                                        type="secondary"
                                                        className={styles.favorite_description}
                                                    >
                                                        {item.description}
                                                    </Text>
                                                )}
                                                <div className={styles.favorite_footer}>
                                                    <Space size="small">
                                                        {item.tags.map((tag) => (
                                                            <Tag
                                                                key={tag}
                                                                icon={<TagOutlined />}
                                                                style={{
                                                                    fontSize: '12px',
                                                                    padding: '2px 6px',
                                                                }}
                                                            >
                                                                {tag}
                                                            </Tag>
                                                        ))}
                                                    </Space>
                                                    <Text
                                                        type="secondary"
                                                        className={styles.favorite_date}
                                                    >
                                                        {formatDate(item.createdAt)}
                                                    </Text>
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </Card>
        </div>
    )
}

export default FavoriteManager
