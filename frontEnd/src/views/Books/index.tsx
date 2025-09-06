import styles from '@/styles/books.module.scss'
import { BookOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Select, Tag } from 'antd'
import React from 'react'

const { Search } = Input
const { Option } = Select

// 模拟书籍数据
const booksData = [
    {
        id: 1,
        title: 'JavaScript高级程序设计',
        author: 'Nicholas C. Zakas',
        category: 'JavaScript',
        description: '深入理解JavaScript语言核心特性，掌握现代Web开发技术。',
        cover: '/images/js-book.jpg',
        rating: 4.8,
        tags: ['JavaScript', '前端', '编程'],
        publishYear: 2020,
        pages: 896,
    },
    {
        id: 2,
        title: 'React技术揭秘',
        author: '卡颂',
        category: 'React',
        description: '深入React源码，理解React的设计思想和实现原理。',
        cover: '/images/react-book.jpg',
        rating: 4.7,
        tags: ['React', '前端', '源码'],
        publishYear: 2021,
        pages: 432,
    },
    {
        id: 3,
        title: 'Node.js实战',
        author: 'Mike Cantelon',
        category: 'Node.js',
        description: '全面掌握Node.js开发技术，构建高性能Web应用。',
        cover: '/images/node-book.jpg',
        rating: 4.6,
        tags: ['Node.js', '后端', '实战'],
        publishYear: 2019,
        pages: 528,
    },
    // 可以添加更多书籍数据
]

const Books: React.FC = () => {
    const [searchText, setSearchText] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState('all')
    const [filteredBooks, setFilteredBooks] = React.useState(booksData)

    const categories = ['all', 'JavaScript', 'React', 'Node.js', 'Vue', 'TypeScript']

    const handleSearch = (value: string) => {
        setSearchText(value)
        filterBooks(value, selectedCategory)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        filterBooks(searchText, category)
    }

    const filterBooks = (search: string, category: string) => {
        let filtered = booksData

        if (search) {
            filtered = filtered.filter(
                (book) =>
                    book.title.toLowerCase().includes(search.toLowerCase()) ||
                    book.author.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (category !== 'all') {
            filtered = filtered.filter((book) => book.category === category)
        }

        setFilteredBooks(filtered)
    }

    return (
        <div className={styles.books_container}>
            <div className={styles.books_header}>
                <div className={styles.header_content}>
                    <div className={styles.title_section}>
                        <BookOutlined className={styles.title_icon} />
                        <h1>技术书籍推荐</h1>
                        <p>精选优质技术书籍，助力技术成长</p>
                    </div>

                    <div className={styles.search_section}>
                        <Search
                            placeholder="搜索书籍或作者"
                            allowClear
                            enterButton={<SearchOutlined />}
                            size="large"
                            onSearch={handleSearch}
                            className={styles.search_input}
                        />

                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            size="large"
                            className={styles.category_select}
                            suffixIcon={<FilterOutlined />}
                        >
                            <Option value="all">全部分类</Option>
                            {categories.slice(1).map((category) => (
                                <Option key={category} value={category}>
                                    {category}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>

            <div className={styles.books_content}>
                <Row gutter={[24, 24]}>
                    {filteredBooks.map((book) => (
                        <Col xs={24} sm={12} lg={8} xl={6} key={book.id}>
                            <Card
                                hoverable
                                className={styles.book_card}
                                cover={
                                    <div className={styles.book_cover}>
                                        <div className={styles.cover_placeholder}>
                                            <BookOutlined />
                                        </div>
                                    </div>
                                }
                                actions={[
                                    <Button type="text" key="preview">
                                        预览
                                    </Button>,
                                    <Button type="text" key="download">
                                        下载
                                    </Button>,
                                    <Button type="text" key="favorite">
                                        收藏
                                    </Button>,
                                ]}
                            >
                                <Card.Meta
                                    title={<div className={styles.book_title}>{book.title}</div>}
                                    description={
                                        <div className={styles.book_info}>
                                            <p className={styles.author}>作者：{book.author}</p>
                                            <p className={styles.description}>{book.description}</p>
                                            <div className={styles.book_meta}>
                                                <span>⭐ {book.rating}</span>
                                                <span>{book.pages}页</span>
                                                <span>{book.publishYear}年</span>
                                            </div>
                                            <div className={styles.tags}>
                                                {book.tags.map((tag) => (
                                                    <Tag key={tag} color="blue">
                                                        {tag}
                                                    </Tag>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default Books
