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
import UseCallbackDetail from './pages/react/UseCallbackDetail'
import UseMemoDetail from './pages/react/UseMemoDetail'
import UseContextDetail from './pages/react/UseContextDetail'
import CustomHooksDetail from './pages/react/CustomHooksDetail'
import PerformanceDetail from './pages/react/PerformanceDetail'
import ErrorBoundaryDetail from './pages/react/ErrorBoundaryDetail'
import TestingDetail from './pages/react/TestingDetail'
import VueDetail from './pages/VueDetail'
import TypeScriptDetail from './pages/TypeScriptDetail'
import NodeJSDetail from './pages/NodeJSDetail'

import DockerDetail from './pages/DockerDetail'
import ToolsDetail from './pages/ToolsDetail'
import GitDetail from './pages/GitDetail'
import CompositionAPIDetail from './pages/vue/CompositionAPIDetail'
import AdvancedTypesDetail from './pages/typescript/AdvancedTypesDetail'
import EventLoopDetail from './pages/nodejs/EventLoopDetail'
import DockerFundamentalsDetail from './pages/docker/FundamentalsDetail'
import ReactivityDetail from './pages/vue/ReactivityDetail'
import BasicTypesDetail from './pages/typescript/BasicTypesDetail'
import ModulesDetail from './pages/nodejs/ModulesDetail'
import WebFrameworksDetail from './pages/python/WebFrameworksDetail'
import GitBasicsDetail from './pages/git/GitBasicsDetail'
import VSCodeDetail from './pages/tools/VSCodeDetail'
import GenericsDetail from './pages/typescript/GenericsDetail'
import DecoratorsDetail from './pages/typescript/DecoratorsDetail'

import DockerComposeDetail from './pages/docker/DockerComposeDetail'
import NetworkingDetail from './pages/docker/NetworkingDetail'
import DataManagementDetail from './pages/docker/DataManagementDetail'
import SecurityDetail from './pages/docker/SecurityDetail'
import KubernetesDetail from './pages/docker/KubernetesDetail'
import PerformanceOptimizationDetail from './pages/docker/PerformanceOptimizationDetail'
import VueRouterDetail from './pages/vue/VueRouterDetail'
import ExpressDetail from './pages/nodejs/ExpressDetail'
import WebpackDetail from './pages/tools/WebpackDetail'
import GitHubActionsDetail from './pages/git/GitHubActionsDetail'
import BranchingDetail from './pages/git/BranchingDetail'
import GitHubWorkflowDetail from './pages/git/GitHubWorkflowDetail'
import AdvancedTechniquesDetail from './pages/git/AdvancedTechniquesDetail'
import VuexPiniaDetail from './pages/vue/VuexPiniaDetail'
import VuePerformanceDetail from './pages/vue/PerformanceDetail'
import VueTestingDetail from './pages/vue/TestingDetail'
import SSRDetail from './pages/vue/SSRDetail'
import MigrationDetail from './pages/vue/MigrationDetail'
import ChromeDevToolsDetail from './pages/tools/ChromeDevToolsDetail'
import ViteDetail from './pages/tools/ViteDetail'
import ESLintPrettierDetail from './pages/tools/ESLintPrettierDetail'
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
                    return <UseCallbackDetail />
                case 'usememo':
                    return <UseMemoDetail />
                case 'usecontext':
                    return <UseContextDetail />
                case 'custom-hooks':
                    return <CustomHooksDetail />
                case 'performance':
                    return <PerformanceDetail />
                case 'error-boundary':
                    return <ErrorBoundaryDetail />
                case 'testing':
                    return <TestingDetail />
                default:
                    return <ReactDetail />
            }
        }

        // Vue.js子路由处理
        if (currentPath.includes('/technology/vue/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'composition-api':
                    return <CompositionAPIDetail />
                case 'reactivity':
                    return <ReactivityDetail />
                case 'vue-router':
                    return <VueRouterDetail />
                case 'vuex-pinia':
                    return <VuexPiniaDetail />
                case 'performance':
                    return <VuePerformanceDetail />
                case 'testing':
                    return <VueTestingDetail />
                case 'ssr':
                    return <SSRDetail />
                case 'migration':
                    return <MigrationDetail />
                default:
                    return <VueDetail />
            }
        }

        // TypeScript子路由处理
        if (currentPath.includes('/technology/typescript/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'basic-types':
                    return <BasicTypesDetail />
                case 'advanced-types':
                    return <AdvancedTypesDetail />
                case 'generics':
                    return <GenericsDetail />
                case 'decorators':
                    return <DecoratorsDetail />
                case 'modules':
                    return <div className={styles.coming_soon}>模块系统详解页面开发中...</div>
                case 'utility-types':
                    return <div className={styles.coming_soon}>工具类型详解页面开发中...</div>
                case 'react-typescript':
                    return <div className={styles.coming_soon}>React + TypeScript详解页面开发中...</div>
                case 'configuration':
                    return <div className={styles.coming_soon}>配置与工具链详解页面开发中...</div>
                default:
                    return <TypeScriptDetail />
            }
        }

        // Node.js子路由处理
        if (currentPath.includes('/technology/nodejs/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'event-loop':
                    return <EventLoopDetail />
                case 'modules':
                    return <ModulesDetail />
                case 'express':
                    return <ExpressDetail />
                case 'database':
                    return <div className={styles.coming_soon}>数据库集成详解页面开发中...</div>
                case 'authentication':
                    return <div className={styles.coming_soon}>身份认证详解页面开发中...</div>
                case 'testing':
                    return <div className={styles.coming_soon}>测试策略详解页面开发中...</div>
                case 'performance':
                    return <PerformanceDetail />
                case 'microservices':
                    return <div className={styles.coming_soon}>微服务架构详解页面开发中...</div>
                default:
                    return <NodeJSDetail />
            }
        }



        // Docker子路由处理
        if (currentPath.includes('/technology/docker/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'fundamentals':
                    return <DockerFundamentalsDetail />
                case 'dockerfile':
                    return <div className={styles.coming_soon}>Dockerfile详解页面开发中...</div>
                case 'docker-compose':
                    return <DockerComposeDetail />
                case 'networking':
                    return <NetworkingDetail />
                case 'volumes':
                    return <DataManagementDetail />
                case 'security':
                    return <SecurityDetail />
                case 'optimization':
                    return <PerformanceOptimizationDetail />
                case 'kubernetes':
                    return <KubernetesDetail />
                default:
                    return <DockerDetail />
            }
        }

        // 开发工具子路由处理
        if (currentPath.includes('/technology/tools/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'vscode':
                    return <VSCodeDetail />
                case 'webpack':
                    return <WebpackDetail />
                case 'vite':
                    return <div className={styles.coming_soon}>Vite详解页面开发中...</div>
                case 'eslint-prettier':
                    return <div className={styles.coming_soon}>ESLint & Prettier详解页面开发中...</div>
                case 'chrome-devtools':
                    return <div className={styles.coming_soon}>Chrome DevTools详解页面开发中...</div>
                case 'postman':
                    return <div className={styles.coming_soon}>Postman详解页面开发中...</div>
                case 'terminal':
                    return <div className={styles.coming_soon}>终端工具详解页面开发中...</div>
                case 'productivity':
                    return <div className={styles.coming_soon}>效率工具详解页面开发中...</div>
                default:
                    return <ToolsDetail />
            }
        }

        // Git & GitHub子路由处理
        if (currentPath.includes('/technology/git/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'git-basics':
                    return <GitBasicsDetail />
                case 'branching':
                    return <BranchingDetail />
                case 'github-workflow':
                    return <GitHubWorkflowDetail />
                case 'github-actions':
                    return <GitHubActionsDetail />
                case 'advanced-git':
                    return <AdvancedTechniquesDetail />
                case 'git-hooks':
                    return <div className={styles.coming_soon}>Git Hooks详解页面开发中...</div>
                case 'collaboration':
                    return <div className={styles.coming_soon}>团队协作详解页面开发中...</div>
                case 'security':
                    return <div className={styles.coming_soon}>安全最佳实践详解页面开发中...</div>
                default:
                    return <GitDetail />
            }
        }

        // 开发工具子路由处理
        if (currentPath.includes('/technology/tools/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'chrome-devtools':
                    return <ChromeDevToolsDetail />
                case 'webpack':
                    return <div className={styles.coming_soon}>Webpack详解页面开发中...</div>
                case 'vite':
                    return <ViteDetail />
                case 'eslint':
                    return <ESLintPrettierDetail />
                case 'prettier':
                    return <ESLintPrettierDetail />
                case 'testing':
                    return <div className={styles.coming_soon}>测试工具详解页面开发中...</div>
                case 'performance':
                    return <div className={styles.coming_soon}>性能工具详解页面开发中...</div>
                case 'automation':
                    return <div className={styles.coming_soon}>自动化工具详解页面开发中...</div>
                default:
                    return <ToolsDetail />
            }
        }

        // 主技术栈路由
        switch (tech) {
            case 'react':
                return <ReactDetail />
            case 'vue':
                return <VueDetail />
            case 'typescript':
                return <TypeScriptDetail />
            case 'nodejs':
                return <NodeJSDetail />

            case 'docker':
                return <DockerDetail />
            case 'tools':
                return <ToolsDetail />
            case 'git':
                return <GitDetail />
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
