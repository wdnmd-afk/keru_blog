import lyf2Image from '@/assets/images/bg.png'
import bookImage from '@/assets/images/book.png'
import logoImage from '@/assets/images/k.jpg'
import lyfImage from '@/assets/images/lyf.png'
import technologyImage from '@/assets/images/technology.png'
import style from '@/styles/home.module.scss'
import {
    BookOutlined,
    CodeOutlined,
    EyeOutlined,
    FileTextOutlined,
    LikeOutlined,
    MessageOutlined,
    ShareAltOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Statistic, Tag } from 'antd'

const { Meta } = Card

// 模拟数据
const cardData = [
    {
        id: 1,
        title: 'React 18 新特性深度解析',
        description:
            '深入了解React 18的并发特性、Suspense改进以及新的Hooks API，掌握现代React开发的核心技术。',
        cover: technologyImage,
        tags: ['React', 'JavaScript', '前端'],
        author: 'K爷',
        avatar: logoImage,
        views: 1234,
        likes: 89,
        comments: 23,
        shares: 12,
        type: 'technology',
        height: 'medium',
    },
    {
        id: 2,
        title: '技术书籍推荐',
        description: '精选优质技术书籍，涵盖前端、后端、算法、系统设计等多个领域，助力技术成长。',
        cover: bookImage,
        tags: ['书籍', '学习', '成长'],
        author: 'K爷',
        avatar: logoImage,
        views: 2156,
        likes: 156,
        comments: 45,
        shares: 28,
        type: 'books',
        height: 'tall',
    },
    {
        id: 3,
        title: 'Node.js 性能优化实战',
        description: '从内存管理、事件循环到集群部署，全方位提升Node.js应用性能。',
        cover: technologyImage,
        tags: ['Node.js', '性能优化', '后端'],
        author: 'K爷',
        avatar: logoImage,
        views: 987,
        likes: 67,
        comments: 12,
        shares: 8,
        type: 'technology',
        height: 'short',
    },
    {
        id: 4,
        title: '美图欣赏',
        description: '分享一些精美的图片和摄影作品，感受视觉艺术的魅力。',
        cover: lyfImage,
        tags: ['摄影', '艺术', '美图'],
        author: 'K爷',
        avatar: logoImage,
        views: 3421,
        likes: 234,
        comments: 67,
        shares: 45,
        type: 'gallery',
        height: 'medium',
    },
    {
        id: 5,
        title: 'TypeScript 进阶指南',
        description:
            '掌握TypeScript的高级类型、装饰器、模块系统等特性，编写更安全的JavaScript代码。',
        cover: technologyImage,
        tags: ['TypeScript', '类型安全', '前端'],
        author: 'K爷',
        avatar: logoImage,
        views: 1876,
        likes: 123,
        comments: 34,
        shares: 19,
        type: 'technology',
        height: 'tall',
    },
    {
        id: 6,
        title: '设计模式实践',
        description: '通过实际案例学习常用设计模式，提升代码质量和可维护性。',
        cover: bookImage,
        tags: ['设计模式', '架构', '编程'],
        author: 'K爷',
        avatar: logoImage,
        views: 1543,
        likes: 98,
        comments: 28,
        shares: 15,
        type: 'books',
        height: 'short',
    },
    {
        id: 7,
        title: '风景摄影集',
        description: '记录旅途中的美好瞬间，分享大自然的壮丽景色。',
        cover: lyf2Image,
        tags: ['风景', '旅行', '摄影'],
        author: 'K爷',
        avatar: logoImage,
        views: 2987,
        likes: 187,
        comments: 56,
        shares: 32,
        type: 'gallery',
        height: 'medium',
    },
    {
        id: 8,
        title: 'Vue 3 Composition API 实战',
        description: '深入学习Vue 3的组合式API，构建更灵活、可复用的组件。',
        cover: technologyImage,
        tags: ['Vue', 'Composition API', '前端'],
        author: 'K爷',
        avatar: logoImage,
        views: 2134,
        likes: 145,
        comments: 39,
        shares: 22,
        type: 'technology',
        height: 'tall',
    },
]

const Home = () => {
    const getCardIcon = (type: string) => {
        switch (type) {
            case 'technology':
                return <CodeOutlined />
            case 'books':
                return <BookOutlined />
            case 'gallery':
                return <FileTextOutlined />
            default:
                return <UserOutlined />
        }
    }

    const getTagColor = (tag: string) => {
        const colorMap: { [key: string]: string } = {
            React: 'blue',
            Vue: 'green',
            'Node.js': 'orange',
            TypeScript: 'purple',
            JavaScript: 'gold',
            前端: 'cyan',
            后端: 'red',
            书籍: 'magenta',
            摄影: 'lime',
            艺术: 'pink',
        }
        return colorMap[tag] || 'default'
    }

    return (
        <div className={style.home_container}>
            <div className={style.home_main}>
                <div className={style.home_header}>
                    <div className={style.header_content}>
                        <Avatar size={80} src={logoImage} className={style.header_avatar} />
                        <div className={style.header_info}>
                            <h1 className={style.home_title}>K's Tech Space</h1>
                            <p className={style.home_subtitle}>
                                Share Technical Insights · Document Learning Journey · Explore
                                Infinite Possibilities
                            </p>
                            <div className={style.stats}>
                                <Statistic title="文章" value={24} />
                                <Statistic title="访问" value={12580} />
                                <Statistic title="点赞" value={1024} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.home_card_box}>
                    {cardData.map((item) => (
                        <Card
                            key={item.id}
                            hoverable
                            className={`${style.card_item} ${style[`card_${item.height}`]}`}
                            cover={
                                <div className={style.card_cover}>
                                    <img alt={item.title} src={item.cover} />
                                    <div className={style.card_overlay}>
                                        <Button type="primary" icon={<EyeOutlined />}>
                                            查看详情
                                        </Button>
                                    </div>
                                    <div className={style.card_tags_overlay}>
                                        {item.tags.map((tag) => (
                                            <Tag key={tag} color={getTagColor(tag)} size="small">
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>
                            }
                            actions={[
                                <div key="likes" className={style.action_item}>
                                    <LikeOutlined />
                                    <span>{item.likes}</span>
                                </div>,
                                <div key="comments" className={style.action_item}>
                                    <MessageOutlined />
                                    <span>{item.comments}</span>
                                </div>,
                                <div key="share" className={style.action_item}>
                                    <ShareAltOutlined />
                                    <span>{item.shares}</span>
                                </div>,
                            ]}
                        >
                            <Meta title={item.title} description={item.description} />
                            <div className={style.card_footer}>
                                <div className={style.author_info}>
                                    <Avatar size="small" src={item.avatar} />
                                    <span>{item.author}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

// 导出 App 组件
export default Home
