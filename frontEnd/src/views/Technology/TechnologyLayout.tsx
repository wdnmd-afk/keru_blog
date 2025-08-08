import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Menu } from 'antd'
import {
    ArrowLeftOutlined,
    CodeOutlined,
    DatabaseOutlined,
    ApiOutlined,
    CloudOutlined,
    ToolOutlined,
    GithubOutlined
} from '@ant-design/icons'
import ReactDetail from './pages/ReactDetail'
import UseEffectDetail from './pages/react/UseEffectDetail'
import styles from '@/styles/technologyLayout.module.scss'

// 技术栈菜单配置
const techMenuItems = [
    {
        key: 'react',
        label: 'React',
        icon: <CodeOutlined />,
        description: 'React生态系统与最佳实践'
    },
    {
        key: 'vue',
        label: 'Vue.js',
        icon: <CodeOutlined />,
        description: 'Vue.js框架深度解析'
    },
    {
        key: 'typescript',
        label: 'TypeScript',
        icon: <CodeOutlined />,
        description: 'TypeScript类型系统与进阶'
    },
    {
        key: 'nodejs',
        label: 'Node.js',
        icon: <DatabaseOutlined />,
        description: 'Node.js后端开发技术'
    },
    {
        key: 'python',
        label: 'Python',
        icon: <ApiOutlined />,
        description: 'Python开发与数据处理'
    },
    {
        key: 'docker',
        label: 'Docker',
        icon: <CloudOutlined />,
        description: 'Docker容器化技术'
    },
    {
        key: 'tools',
        label: '开发工具',
        icon: <ToolOutlined />,
        description: '开发工具与效率提升'
    },
    {
        key: 'git',
        label: 'Git & GitHub',
        icon: <GithubOutlined />,
        description: '版本控制与团队协作'
    }
]

const TechnologyLayout: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { tech } = useParams<{ tech: string }>()

    const handleMenuClick = (key: string) => {
        navigate(`/technology/${key}`)
    }

    const handleBackToMain = () => {
        navigate('/technology')
    }

    // 根据路由参数渲染对应的技术详解组件
    const renderTechContent = () => {
        const currentPath = location.pathname

        // React子路由处理
        if (currentPath.includes('/technology/react/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'useeffect':
                    return <UseEffectDetail />
                case 'usecallback':
                    return <div className={styles.coming_soon}>useCallback 详解页面开发中...</div>
                case 'usememo':
                    return <div className={styles.coming_soon}>useMemo 详解页面开发中...</div>
                case 'usecontext':
                    return <div className={styles.coming_soon}>useContext 详解页面开发中...</div>
                case 'custom-hooks':
                    return <div className={styles.coming_soon}>Custom Hooks 详解页面开发中...</div>
                case 'performance':
                    return <div className={styles.coming_soon}>Performance 详解页面开发中...</div>
                case 'error-boundary':
                    return <div className={styles.coming_soon}>Error Boundary 详解页面开发中...</div>
                case 'testing':
                    return <div className={styles.coming_soon}>Testing 详解页面开发中...</div>
                default:
                    return <ReactDetail />
            }
        }

        // 主技术栈路由
        switch (tech) {
            case 'react':
                return <ReactDetail />
            case 'vue':
                return <div className={styles.coming_soon}>Vue.js 详解页面开发中...</div>
            case 'typescript':
                return <div className={styles.coming_soon}>TypeScript 详解页面开发中...</div>
            case 'nodejs':
                return <div className={styles.coming_soon}>Node.js 详解页面开发中...</div>
            case 'python':
                return <div className={styles.coming_soon}>Python 详解页面开发中...</div>
            case 'docker':
                return <div className={styles.coming_soon}>Docker 详解页面开发中...</div>
            case 'tools':
                return <div className={styles.coming_soon}>开发工具 详解页面开发中...</div>
            case 'git':
                return <div className={styles.coming_soon}>Git & GitHub 详解页面开发中...</div>
            default:
                return <div className={styles.coming_soon}>请选择一个技术栈查看详解</div>
        }
    }
    
    return (
        <div className={styles.tech_layout_container}>
            {/* 左侧菜单 */}
            <div className={styles.tech_sidebar}>
                <div className={styles.sidebar_header}>
                    <div 
                        className={styles.back_button}
                        onClick={handleBackToMain}
                    >
                        <ArrowLeftOutlined />
                        <span>返回技术栈</span>
                    </div>
                    <h3>技术详解</h3>
                </div>
                
                <Menu
                    mode="vertical"
                    selectedKeys={[tech || '']}
                    className={styles.tech_menu}
                    items={techMenuItems.map(item => ({
                        key: item.key,
                        icon: item.icon,
                        label: (
                            <div className={styles.menu_item_content}>
                                <span className={styles.menu_title}>{item.label}</span>
                                <span className={styles.menu_desc}>{item.description}</span>
                            </div>
                        ),
                        onClick: () => handleMenuClick(item.key)
                    }))}
                />
            </div>

            {/* 右侧内容区域 */}
            <div className={styles.tech_content_area}>
                {renderTechContent()}
            </div>
        </div>
    )
}

export default TechnologyLayout
