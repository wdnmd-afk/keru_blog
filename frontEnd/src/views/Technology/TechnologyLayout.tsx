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
    GithubOutlined,
    BugOutlined
} from '@ant-design/icons'
import ReactDetail from './pages/ReactDetail'
import UseEffectDetail from './pages/react/UseEffectDetail'
import UseCallbackDetail from './pages/react/UseCallbackDetail'
import UseMemoDetail from './pages/react/UseMemoDetail'
import UseContextDetail from './pages/react/UseContextDetail'
import CustomHooksDetail from './pages/react/CustomHooksDetail'
import PerformanceDetail from './pages/react/PerformanceDetail'
import ErrorBoundaryDetail from './pages/react/ErrorBoundaryDetail'
import ReactTestingDetail from './pages/react/TestingDetail'
import VueDetail from './pages/VueDetail'
import TypeScriptDetail from './pages/TypeScriptDetail'
import NodeJSDetail from './pages/NodeJSDetail'

import DockerDetail from './pages/DockerDetail'
import ToolsDetail from './pages/ToolsDetail'
import GitDetail from './pages/GitDetail'
import JestDetail from './pages/JestDetail'
import CompositionAPIDetail from './pages/vue/CompositionAPIDetail'
import AdvancedTypesDetail from './pages/typescript/AdvancedTypesDetail'
import EventLoopDetail from './pages/nodejs/EventLoopDetail'
import DockerFundamentalsDetail from './pages/docker/FundamentalsDetail'
import ReactivityDetail from './pages/vue/ReactivityDetail'
import BasicTypesDetail from './pages/typescript/BasicTypesDetail'
import NodeModulesDetail from './pages/nodejs/ModulesDetail'
import WebFrameworksDetail from './pages/python/WebFrameworksDetail'
import GitBasicsDetail from './pages/git/GitBasicsDetail'
import VSCodeDetail from './pages/tools/VSCodeDetail'
import GenericsDetail from './pages/typescript/GenericsDetail'
import DecoratorsDetail from './pages/typescript/DecoratorsDetail'
import TSModulesDetail from './pages/typescript/ModulesDetail'
import UtilityTypesDetail from './pages/typescript/UtilityTypesDetail'
import ReactTypeScriptDetail from './pages/typescript/ReactTypeScriptDetail'
import ConfigurationDetail from './pages/typescript/ConfigurationDetail'

import DockerComposeDetail from './pages/docker/DockerComposeDetail'
import NetworkingDetail from './pages/docker/NetworkingDetail'
import DataManagementDetail from './pages/docker/DataManagementDetail'
import SecurityDetail from './pages/docker/SecurityDetail'
import KubernetesDetail from './pages/docker/KubernetesDetail'
import PerformanceOptimizationDetail from './pages/docker/PerformanceOptimizationDetail'
import VueRouterDetail from './pages/vue/VueRouterDetail'
import ExpressDetail from './pages/nodejs/ExpressDetail'
import DatabaseDetail from './pages/nodejs/DatabaseDetail'
import AuthenticationDetail from './pages/nodejs/AuthenticationDetail'
import NodeTestingDetail from './pages/nodejs/TestingDetail'
import MicroservicesDetail from './pages/nodejs/MicroservicesDetail'
import WebpackDetail from './pages/tools/WebpackDetail'
import GitHubActionsDetail from './pages/git/GitHubActionsDetail'
import BranchingDetail from './pages/git/BranchingDetail'
import GitHubWorkflowDetail from './pages/git/GitHubWorkflowDetail'
import AdvancedTechniquesDetail from './pages/git/AdvancedTechniquesDetail'
import TestingToolsDetail from './pages/tools/TestingToolsDetail'
import GitHooksDetail from './pages/git/GitHooksDetail'
import CollaborationDetail from './pages/git/CollaborationDetail'
import PerformanceToolsDetail from './pages/tools/PerformanceToolsDetail'
import AutomationToolsDetail from './pages/tools/AutomationToolsDetail'
import PostmanDetail from './pages/tools/PostmanDetail'
import TerminalDetail from './pages/tools/TerminalDetail'
import ProductivityDetail from './pages/tools/ProductivityDetail'
import SecurityBestPracticesDetail from './pages/git/SecurityBestPracticesDetail'
import VuexPiniaDetail from './pages/vue/VuexPiniaDetail'
import VuePerformanceDetail from './pages/vue/PerformanceDetail'
import VueTestingDetail from './pages/vue/TestingDetail'
import SSRDetail from './pages/vue/SSRDetail'
import MigrationDetail from './pages/vue/MigrationDetail'
import ChromeDevToolsDetail from './pages/tools/ChromeDevToolsDetail'
import ViteDetail from './pages/tools/ViteDetail'
import ESLintPrettierDetail from './pages/tools/ESLintPrettierDetail'
import JestBasicsDetail from './pages/jest/JestBasicsDetail'
import UnitTestingDetail from './pages/jest/UnitTestingDetail'
import MockingDetail from './pages/jest/MockingDetail'
import AsyncTestingDetail from './pages/jest/AsyncTestingDetail'
import CoverageDetail from './pages/jest/CoverageDetail'
import BestPracticesDetail from './pages/jest/BestPracticesDetail'
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
    },
    {
        key: 'jest',
        label: 'Jest',
        icon: <BugOutlined />,
        description: 'Jest测试框架与最佳实践'
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
                    return <ReactTestingDetail />
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
                    return <TSModulesDetail />
                case 'utility-types':
                    return <UtilityTypesDetail />
                case 'react-typescript':
                    return <ReactTypeScriptDetail />
                case 'configuration':
                    return <ConfigurationDetail />
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
                    return <NodeModulesDetail />
                case 'express':
                    return <ExpressDetail />
                case 'database':
                    return <DatabaseDetail />
                case 'authentication':
                    return <AuthenticationDetail />
                case 'testing':
                    return <NodeTestingDetail />
                case 'performance':
                    return <PerformanceDetail />
                case 'microservices':
                    return <MicroservicesDetail />
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
                    return <GitHooksDetail />
                case 'collaboration':
                    return <CollaborationDetail />
                case 'security':
                    return <SecurityBestPracticesDetail />
                default:
                    return <GitDetail />
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
                    return <ViteDetail />
                case 'eslint-prettier':
                    return <ESLintPrettierDetail />
                case 'chrome-devtools':
                    return <ChromeDevToolsDetail />
                case 'postman':
                    return <PostmanDetail />
                case 'terminal':
                    return <TerminalDetail />
                case 'productivity':
                    return <ProductivityDetail />
                default:
                    return <ToolsDetail />
            }
        }

        // Jest子路由处理
        if (currentPath.includes('/technology/jest/')) {
            const subTopic = currentPath.split('/').pop()
            switch (subTopic) {
                case 'jest-basics':
                    return <JestBasicsDetail />
                case 'unit-testing':
                    return <UnitTestingDetail />
                case 'mocking':
                    return <MockingDetail />
                case 'async-testing':
                    return <AsyncTestingDetail />
                case 'coverage':
                    return <CoverageDetail />
                case 'best-practices':
                    return <BestPracticesDetail />
                default:
                    return <JestDetail />
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
            case 'jest':
                return <JestDetail />
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
