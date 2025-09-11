/**
 * 帮助提示组件
 *
 * 功能说明：
 * 1. 提供快捷键提示和功能引导
 * 2. 分类显示帮助信息
 * 3. 支持搜索和筛选
 * 4. 响应式设计和无障碍访问支持
 */

import { HelpTipItem } from '@/types/floatingActions'
// 临时修改：由于 @ant-design/icons 包安装问题导致 KeyboardOutlined 无法导入，
// 暂时使用 SettingOutlined 替代，保持快捷键提示功能的视觉完整性
import { CloseOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Card, Collapse, Empty, Input, Space, Tag, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './HelpTooltip.module.scss'

const { Text, Title } = Typography
const { Search } = Input
const { Panel } = Collapse

/**
 * 帮助提示Props接口
 */
interface HelpTooltipProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
}

/**
 * 帮助提示组件
 */
const HelpTooltip: React.FC<HelpTooltipProps> = ({ visible, onClose }) => {
    const { t } = useTranslation('floatingActions')
    const [searchText, setSearchText] = useState('')

    // 帮助提示数据
    const helpTips: HelpTipItem[] = useMemo(
        () => [
            // 快捷键类别
            {
                id: 'shortcut-scroll-top',
                title: t('help.shortcuts.scroll_top', '返回顶部'),
                content: t('help.shortcuts.scroll_top_desc', '快速滚动到页面顶部'),
                shortcut: 'Home',
                category: t('help.category.shortcuts', '快捷键'),
            },
            {
                id: 'shortcut-scroll-bottom',
                title: t('help.shortcuts.scroll_bottom', '滚动到底部'),
                content: t('help.shortcuts.scroll_bottom_desc', '快速滚动到页面底部'),
                shortcut: 'End',
                category: t('help.category.shortcuts', '快捷键'),
            },
            {
                id: 'shortcut-search',
                title: t('help.shortcuts.search', '搜索'),
                content: t('help.shortcuts.search_desc', '打开搜索功能'),
                shortcut: 'Ctrl + K',
                category: t('help.category.shortcuts', '快捷键'),
            },
            {
                id: 'shortcut-help',
                title: t('help.shortcuts.help', '帮助'),
                content: t('help.shortcuts.help_desc', '打开帮助面板'),
                shortcut: 'F8',
                category: t('help.category.shortcuts', '快捷键'),
            },

            // 功能介绍类别
            {
                id: 'feature-share',
                title: t('help.features.share', '分享功能'),
                content: t(
                    'help.features.share_desc',
                    '支持多种方式分享当前页面，包括原生分享、复制链接和社交媒体分享'
                ),
                category: t('help.category.features', '功能介绍'),
            },
            {
                id: 'feature-favorite',
                title: t('help.features.favorite', '收藏功能'),
                content: t(
                    'help.features.favorite_desc',
                    '收藏感兴趣的页面，支持标签分类和搜索管理'
                ),
                category: t('help.category.features', '功能介绍'),
            },
            {
                id: 'feature-settings',
                title: t('help.features.settings', '设置功能'),
                content: t(
                    'help.features.settings_desc',
                    '自定义主题、语言和显示选项，个性化您的使用体验'
                ),
                category: t('help.category.features', '功能介绍'),
            },
            {
                id: 'feature-feedback',
                title: t('help.features.feedback', '反馈功能'),
                content: t(
                    'help.features.feedback_desc',
                    '提交功能建议、bug报告或其他反馈，帮助我们改进产品'
                ),
                category: t('help.category.features', '功能介绍'),
            },

            // 使用技巧类别
            {
                id: 'tip-navigation',
                title: t('help.tips.navigation', '页面导航'),
                content: t(
                    'help.tips.navigation_desc',
                    '使用浮动按钮快速访问常用功能，提高浏览效率'
                ),
                category: t('help.category.tips', '使用技巧'),
            },
            {
                id: 'tip-keyboard',
                title: t('help.tips.keyboard', '键盘操作'),
                content: t('help.tips.keyboard_desc', '熟练使用快捷键可以大大提高操作效率'),
                category: t('help.category.tips', '使用技巧'),
            },
            {
                id: 'tip-mobile',
                title: t('help.tips.mobile', '移动端使用'),
                content: t(
                    'help.tips.mobile_desc',
                    '在移动设备上，浮动按钮会自动适配屏幕尺寸，提供最佳体验'
                ),
                category: t('help.category.tips', '使用技巧'),
            },
        ],
        [t]
    )

    // 获取所有分类
    const categories = useMemo(() => {
        const categorySet = new Set<string>()
        helpTips.forEach((tip) => categorySet.add(tip.category))
        return Array.from(categorySet)
    }, [helpTips])

    // 过滤帮助提示
    const filteredTips = useMemo(() => {
        if (!searchText) return helpTips

        return helpTips.filter(
            (tip) =>
                tip.title.toLowerCase().includes(searchText.toLowerCase()) ||
                tip.content.toLowerCase().includes(searchText.toLowerCase()) ||
                tip.shortcut?.toLowerCase().includes(searchText.toLowerCase())
        )
    }, [helpTips, searchText])

    // 按分类分组
    const groupedTips = useMemo(() => {
        const groups: Record<string, HelpTipItem[]> = {}
        filteredTips.forEach((tip) => {
            if (!groups[tip.category]) {
                groups[tip.category] = []
            }
            groups[tip.category].push(tip)
        })
        return groups
    }, [filteredTips])

    // 渲染快捷键标签
    const renderShortcut = (shortcut: string) => {
        const keys = shortcut.split(' + ')
        return (
            <Space size={4}>
                {keys.map((key, index) => (
                    <React.Fragment key={key}>
                        {index > 0 && <Text type="secondary">+</Text>}
                        <Tag className={styles.shortcut_key}>{key}</Tag>
                    </React.Fragment>
                ))}
            </Space>
        )
    }

    if (!visible) {
        return null
    }

    return (
        <div className={styles.help_tooltip_overlay} onClick={onClose}>
            <Card
                className={styles.help_tooltip}
                onClick={(e) => e.stopPropagation()}
                title={
                    <div className={styles.panel_header}>
                        <Title level={4} className={styles.panel_title}>
                            <QuestionCircleOutlined className={styles.title_icon} />
                            {t('help.title', '帮助中心')}
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
                {/* 搜索框 */}
                <div className={styles.search_section}>
                    <Search
                        placeholder={t('help.search_placeholder', '搜索帮助内容...')}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={styles.search_input}
                        allowClear
                    />
                </div>

                {/* 帮助内容 */}
                <div className={styles.help_content}>
                    {Object.keys(groupedTips).length === 0 ? (
                        <Empty
                            description={t('help.no_results', '没有找到匹配的帮助内容')}
                            className={styles.empty_state}
                        />
                    ) : (
                        <Collapse
                            defaultActiveKey={categories}
                            className={styles.help_collapse}
                            expandIconPosition="end"
                        >
                            {categories.map((category) => {
                                const categoryTips = groupedTips[category]
                                if (!categoryTips || categoryTips.length === 0) return null

                                return (
                                    <Panel
                                        key={category}
                                        header={
                                            <div className={styles.category_header}>
                                                <Text strong className={styles.category_title}>
                                                    {category}
                                                </Text>
                                                <Tag className={styles.category_count}>
                                                    {categoryTips.length}
                                                </Tag>
                                            </div>
                                        }
                                        className={styles.help_panel}
                                    >
                                        <div className={styles.tips_list}>
                                            {categoryTips.map((tip) => (
                                                <div key={tip.id} className={styles.tip_item}>
                                                    <div className={styles.tip_header}>
                                                        <Text strong className={styles.tip_title}>
                                                            {tip.title}
                                                        </Text>
                                                        {tip.shortcut && (
                                                            <div className={styles.tip_shortcut}>
                                                                <SettingOutlined
                                                                    className={styles.shortcut_icon}
                                                                />
                                                                {renderShortcut(tip.shortcut)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Text
                                                        type="secondary"
                                                        className={styles.tip_content}
                                                    >
                                                        {tip.content}
                                                    </Text>
                                                </div>
                                            ))}
                                        </div>
                                    </Panel>
                                )
                            })}
                        </Collapse>
                    )}
                </div>

                {/* 底部提示 */}
                <div className={styles.footer_tip}>
                    <Text type="secondary" className={styles.footer_text}>
                        {t('help.footer_tip', '按 F8 可随时打开帮助，按 Esc 关闭面板')}
                    </Text>
                </div>
            </Card>
        </div>
    )
}

export default HelpTooltip
