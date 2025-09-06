import {
    BugOutlined,
    CloudOutlined,
    CodeOutlined,
    DatabaseOutlined,
    GithubOutlined,
    ToolOutlined,
} from '@ant-design/icons'
import React from 'react'
import type { TechMenuItem, TechnologyRouteMap } from './technologyTypes'

// 懒加载主技术栈组件
const ReactDetail = React.lazy(() => import('@/views/Technology/pages/ReactDetail'))
const VueDetail = React.lazy(() => import('@/views/Technology/pages/VueDetail'))
const TypeScriptDetail = React.lazy(() => import('@/views/Technology/pages/TypeScriptDetail'))
const NodeJSDetail = React.lazy(() => import('@/views/Technology/pages/NodeJSDetail'))
const DockerDetail = React.lazy(() => import('@/views/Technology/pages/DockerDetail'))
const GitDetail = React.lazy(() => import('@/views/Technology/pages/GitDetail'))
const ToolsDetail = React.lazy(() => import('@/views/Technology/pages/ToolsDetail'))
const JestDetail = React.lazy(() => import('@/views/Technology/pages/JestDetail'))

// 懒加载 React 子组件
const UseEffectDetail = React.lazy(() => import('@/views/Technology/pages/react/UseEffectDetail'))
const UseCallbackDetail = React.lazy(
    () => import('@/views/Technology/pages/react/UseCallbackDetail')
)
const UseMemoDetail = React.lazy(() => import('@/views/Technology/pages/react/UseMemoDetail'))
const UseContextDetail = React.lazy(() => import('@/views/Technology/pages/react/UseContextDetail'))
const CustomHooksDetail = React.lazy(
    () => import('@/views/Technology/pages/react/CustomHooksDetail')
)
const PerformanceDetail = React.lazy(
    () => import('@/views/Technology/pages/react/PerformanceDetail')
)
const ErrorBoundaryDetail = React.lazy(
    () => import('@/views/Technology/pages/react/ErrorBoundaryDetail')
)
const ReactTestingDetail = React.lazy(() => import('@/views/Technology/pages/react/TestingDetail'))

// 懒加载 Vue 子组件
const CompositionAPIDetail = React.lazy(
    () => import('@/views/Technology/pages/vue/CompositionAPIDetail')
)
const ReactivityDetail = React.lazy(() => import('@/views/Technology/pages/vue/ReactivityDetail'))
const VueRouterDetail = React.lazy(() => import('@/views/Technology/pages/vue/VueRouterDetail'))
const VuexPiniaDetail = React.lazy(() => import('@/views/Technology/pages/vue/VuexPiniaDetail'))
const VuePerformanceDetail = React.lazy(
    () => import('@/views/Technology/pages/vue/PerformanceDetail')
)
const VueTestingDetail = React.lazy(() => import('@/views/Technology/pages/vue/TestingDetail'))
const SSRDetail = React.lazy(() => import('@/views/Technology/pages/vue/SSRDetail'))
const MigrationDetail = React.lazy(() => import('@/views/Technology/pages/vue/MigrationDetail'))

// 懒加载 TypeScript 子组件
const BasicTypesDetail = React.lazy(
    () => import('@/views/Technology/pages/typescript/BasicTypesDetail')
)
const AdvancedTypesDetail = React.lazy(
    () => import('@/views/Technology/pages/typescript/AdvancedTypesDetail')
)
const GenericsDetail = React.lazy(
    () => import('@/views/Technology/pages/typescript/GenericsDetail')
)
const DecoratorsDetail = React.lazy(
    () => import('@/views/Technology/pages/typescript/DecoratorsDetail')
)
const TSModulesDetail = React.lazy(
    () => import('@/views/Technology/pages/typescript/ModulesDetail')
)
const UtilityTypesDetail = React.lazy(
    () => import('@/views/Technology/pages/typescript/UtilityTypesDetail')
)
const ReactTypeScriptDetail = React.lazy(
    () => import('@/views/Technology/pages/typescript/ReactTypeScriptDetail')
)
const ConfigurationDetail = React.lazy(
    () => import('@/views/Technology/pages/typescript/ConfigurationDetail')
)

// 懒加载 Node.js 子组件
const EventLoopDetail = React.lazy(() => import('@/views/Technology/pages/nodejs/EventLoopDetail'))
const NodeModulesDetail = React.lazy(() => import('@/views/Technology/pages/nodejs/ModulesDetail'))
const ExpressDetail = React.lazy(() => import('@/views/Technology/pages/nodejs/ExpressDetail'))
const DatabaseDetail = React.lazy(() => import('@/views/Technology/pages/nodejs/DatabaseDetail'))
const AuthenticationDetail = React.lazy(
    () => import('@/views/Technology/pages/nodejs/AuthenticationDetail')
)
const NodeTestingDetail = React.lazy(() => import('@/views/Technology/pages/nodejs/TestingDetail'))
const MicroservicesDetail = React.lazy(
    () => import('@/views/Technology/pages/nodejs/MicroservicesDetail')
)

// 懒加载 Docker 子组件
const DockerFundamentalsDetail = React.lazy(
    () => import('@/views/Technology/pages/docker/FundamentalsDetail')
)
const DockerfileDetail = React.lazy(
    () => import('@/views/Technology/pages/docker/DockerfileDetail')
)
const DockerComposeDetail = React.lazy(
    () => import('@/views/Technology/pages/docker/DockerComposeDetail')
)
const NetworkingDetail = React.lazy(
    () => import('@/views/Technology/pages/docker/NetworkingDetail')
)
const DataManagementDetail = React.lazy(
    () => import('@/views/Technology/pages/docker/DataManagementDetail')
)
const SecurityDetail = React.lazy(() => import('@/views/Technology/pages/docker/SecurityDetail'))
const PerformanceOptimizationDetail = React.lazy(
    () => import('@/views/Technology/pages/docker/PerformanceOptimizationDetail')
)
const KubernetesDetail = React.lazy(
    () => import('@/views/Technology/pages/docker/KubernetesDetail')
)

// 懒加载 Git 子组件
const GitBasicsDetail = React.lazy(() => import('@/views/Technology/pages/git/GitBasicsDetail'))
const BranchingDetail = React.lazy(() => import('@/views/Technology/pages/git/BranchingDetail'))
const GitHubWorkflowDetail = React.lazy(
    () => import('@/views/Technology/pages/git/GitHubWorkflowDetail')
)
const GitHubActionsDetail = React.lazy(
    () => import('@/views/Technology/pages/git/GitHubActionsDetail')
)
const AdvancedTechniquesDetail = React.lazy(
    () => import('@/views/Technology/pages/git/AdvancedTechniquesDetail')
)
const GitHooksDetail = React.lazy(() => import('@/views/Technology/pages/git/GitHooksDetail'))
const CollaborationDetail = React.lazy(
    () => import('@/views/Technology/pages/git/CollaborationDetail')
)
const SecurityBestPracticesDetail = React.lazy(
    () => import('@/views/Technology/pages/git/SecurityBestPracticesDetail')
)

// 懒加载 Tools 子组件
const VSCodeDetail = React.lazy(() => import('@/views/Technology/pages/tools/VSCodeDetail'))
const WebpackDetail = React.lazy(() => import('@/views/Technology/pages/tools/WebpackDetail'))
const ViteDetail = React.lazy(() => import('@/views/Technology/pages/tools/ViteDetail'))
const ESLintPrettierDetail = React.lazy(
    () => import('@/views/Technology/pages/tools/ESLintPrettierDetail')
)
const ChromeDevToolsDetail = React.lazy(
    () => import('@/views/Technology/pages/tools/ChromeDevToolsDetail')
)
const PostmanDetail = React.lazy(() => import('@/views/Technology/pages/tools/PostmanDetail'))
const TerminalDetail = React.lazy(() => import('@/views/Technology/pages/tools/TerminalDetail'))
const ProductivityDetail = React.lazy(
    () => import('@/views/Technology/pages/tools/ProductivityDetail')
)

// 懒加载 Jest 子组件
const JestBasicsDetail = React.lazy(() => import('@/views/Technology/pages/jest/JestBasicsDetail'))
const UnitTestingDetail = React.lazy(
    () => import('@/views/Technology/pages/jest/UnitTestingDetail')
)
const MockingDetail = React.lazy(() => import('@/views/Technology/pages/jest/MockingDetail'))
const AsyncTestingDetail = React.lazy(
    () => import('@/views/Technology/pages/jest/AsyncTestingDetail')
)
const CoverageDetail = React.lazy(() => import('@/views/Technology/pages/jest/CoverageDetail'))
const BestPracticesDetail = React.lazy(
    () => import('@/views/Technology/pages/jest/BestPracticesDetail')
)

/**
 * 技术栈图标类型映射
 */
export const techIconTypes = {
    react: 'CodeOutlined',
    vue: 'CodeOutlined',
    typescript: 'CodeOutlined',
    nodejs: 'DatabaseOutlined',
    docker: 'CloudOutlined',
    tools: 'ToolOutlined',
    git: 'GithubOutlined',
    jest: 'BugOutlined',
} as const

/**
 * 获取技术栈图标组件
 */
export const getTechIcon = (key: string): React.ReactNode => {
    const iconComponents = {
        CodeOutlined: CodeOutlined,
        DatabaseOutlined: DatabaseOutlined,
        CloudOutlined: CloudOutlined,
        ToolOutlined: ToolOutlined,
        GithubOutlined: GithubOutlined,
        BugOutlined: BugOutlined,
    }

    const iconType = techIconTypes[key as keyof typeof techIconTypes]
    if (iconType && iconComponents[iconType]) {
        const IconComponent = iconComponents[iconType]
        return React.createElement(IconComponent)
    }
    return React.createElement(CodeOutlined)
}

/**
 * 技术栈菜单配置
 */
export const techMenuItems: TechMenuItem[] = [
    {
        key: 'react',
        label: 'React',
        icon: getTechIcon('react'),
        description: 'React生态系统与最佳实践',
        subRoutes: [
            'useeffect',
            'usecallback',
            'usememo',
            'usecontext',
            'custom-hooks',
            'performance',
            'error-boundary',
            'testing',
        ],
    },
    {
        key: 'vue',
        label: 'Vue.js',
        icon: getTechIcon('vue'),
        description: 'Vue.js框架深度解析',
        subRoutes: [
            'composition-api',
            'reactivity',
            'vue-router',
            'vuex-pinia',
            'performance',
            'testing',
            'ssr',
            'migration',
        ],
    },
    {
        key: 'typescript',
        label: 'TypeScript',
        icon: getTechIcon('typescript'),
        description: 'TypeScript类型系统与进阶',
        subRoutes: [
            'basic-types',
            'advanced-types',
            'generics',
            'decorators',
            'modules',
            'utility-types',
            'react-typescript',
            'configuration',
        ],
    },
    {
        key: 'nodejs',
        label: 'Node.js',
        icon: getTechIcon('nodejs'),
        description: 'Node.js后端开发技术',
        subRoutes: [
            'event-loop',
            'modules',
            'express',
            'database',
            'authentication',
            'testing',
            'microservices',
        ],
    },
    {
        key: 'docker',
        label: 'Docker',
        icon: getTechIcon('docker'),
        description: 'Docker容器化技术',
        subRoutes: [
            'fundamentals',
            'dockerfile',
            'docker-compose',
            'networking',
            'volumes',
            'security',
            'optimization',
            'kubernetes',
        ],
    },
    {
        key: 'tools',
        label: '开发工具',
        icon: getTechIcon('tools'),
        description: '开发工具与效率提升',
        subRoutes: [
            'vscode',
            'webpack',
            'vite',
            'eslint-prettier',
            'chrome-devtools',
            'postman',
            'terminal',
            'productivity',
        ],
    },
    {
        key: 'git',
        label: 'Git & GitHub',
        icon: getTechIcon('git'),
        description: '版本控制与团队协作',
        subRoutes: [
            'git-basics',
            'branching',
            'github-workflow',
            'github-actions',
            'advanced-git',
            'git-hooks',
            'collaboration',
            'security',
        ],
    },
    {
        key: 'jest',
        label: 'Jest',
        icon: getTechIcon('jest'),
        description: 'Jest测试框架与最佳实践',
        subRoutes: [
            'jest-basics',
            'unit-testing',
            'mocking',
            'async-testing',
            'coverage',
            'best-practices',
        ],
    },
]

/**
 * 技术栈路由配置映射
 */
export const technologyRoutes: TechnologyRouteMap = {
    react: {
        main: ReactDetail,
        subRoutes: {
            useeffect: {
                path: '/technology/react/useeffect',
                title: 'useEffect Hook',
                component: UseEffectDetail,
            },
            usecallback: {
                path: '/technology/react/usecallback',
                title: 'useCallback Hook',
                component: UseCallbackDetail,
            },
            usememo: {
                path: '/technology/react/usememo',
                title: 'useMemo Hook',
                component: UseMemoDetail,
            },
            usecontext: {
                path: '/technology/react/usecontext',
                title: 'useContext Hook',
                component: UseContextDetail,
            },
            'custom-hooks': {
                path: '/technology/react/custom-hooks',
                title: '自定义 Hook',
                component: CustomHooksDetail,
            },
            performance: {
                path: '/technology/react/performance',
                title: 'React 性能优化',
                component: PerformanceDetail,
            },
            'error-boundary': {
                path: '/technology/react/error-boundary',
                title: '错误边界',
                component: ErrorBoundaryDetail,
            },
            testing: {
                path: '/technology/react/testing',
                title: 'React 测试',
                component: ReactTestingDetail,
            },
        },
    },
    vue: {
        main: VueDetail,
        subRoutes: {
            'composition-api': {
                path: '/technology/vue/composition-api',
                title: 'Composition API',
                component: CompositionAPIDetail,
            },
            reactivity: {
                path: '/technology/vue/reactivity',
                title: '响应式原理',
                component: ReactivityDetail,
            },
            'vue-router': {
                path: '/technology/vue/vue-router',
                title: 'Vue Router',
                component: VueRouterDetail,
            },
            'vuex-pinia': {
                path: '/technology/vue/vuex-pinia',
                title: 'Vuex & Pinia',
                component: VuexPiniaDetail,
            },
            performance: {
                path: '/technology/vue/performance',
                title: 'Vue 性能优化',
                component: VuePerformanceDetail,
            },
            testing: {
                path: '/technology/vue/testing',
                title: 'Vue 测试',
                component: VueTestingDetail,
            },
            ssr: {
                path: '/technology/vue/ssr',
                title: '服务端渲染',
                component: SSRDetail,
            },
            migration: {
                path: '/technology/vue/migration',
                title: '版本迁移指南',
                component: MigrationDetail,
            },
        },
    },
    typescript: {
        main: TypeScriptDetail,
        subRoutes: {
            'basic-types': {
                path: '/technology/typescript/basic-types',
                title: '基础类型',
                component: BasicTypesDetail,
            },
            'advanced-types': {
                path: '/technology/typescript/advanced-types',
                title: '高级类型',
                component: AdvancedTypesDetail,
            },
            generics: {
                path: '/technology/typescript/generics',
                title: '泛型',
                component: GenericsDetail,
            },
            decorators: {
                path: '/technology/typescript/decorators',
                title: '装饰器',
                component: DecoratorsDetail,
            },
            modules: {
                path: '/technology/typescript/modules',
                title: '模块系统',
                component: TSModulesDetail,
            },
            'utility-types': {
                path: '/technology/typescript/utility-types',
                title: '实用类型',
                component: UtilityTypesDetail,
            },
            'react-typescript': {
                path: '/technology/typescript/react-typescript',
                title: 'React + TypeScript',
                component: ReactTypeScriptDetail,
            },
            configuration: {
                path: '/technology/typescript/configuration',
                title: '配置指南',
                component: ConfigurationDetail,
            },
        },
    },
    nodejs: {
        main: NodeJSDetail,
        subRoutes: {
            'event-loop': {
                path: '/technology/nodejs/event-loop',
                title: '事件循环',
                component: EventLoopDetail,
            },
            modules: {
                path: '/technology/nodejs/modules',
                title: '模块系统',
                component: NodeModulesDetail,
            },
            express: {
                path: '/technology/nodejs/express',
                title: 'Express 框架',
                component: ExpressDetail,
            },
            database: {
                path: '/technology/nodejs/database',
                title: '数据库集成',
                component: DatabaseDetail,
            },
            authentication: {
                path: '/technology/nodejs/authentication',
                title: '身份验证',
                component: AuthenticationDetail,
            },
            testing: {
                path: '/technology/nodejs/testing',
                title: 'Node.js 测试',
                component: NodeTestingDetail,
            },
            microservices: {
                path: '/technology/nodejs/microservices',
                title: '微服务架构',
                component: MicroservicesDetail,
            },
        },
    },
    docker: {
        main: DockerDetail,
        subRoutes: {
            fundamentals: {
                path: '/technology/docker/fundamentals',
                title: 'Docker 基础',
                component: DockerFundamentalsDetail,
            },
            dockerfile: {
                path: '/technology/docker/dockerfile',
                title: 'Dockerfile',
                component: DockerfileDetail,
            },
            'docker-compose': {
                path: '/technology/docker/docker-compose',
                title: 'Docker Compose',
                component: DockerComposeDetail,
            },
            networking: {
                path: '/technology/docker/networking',
                title: '网络配置',
                component: NetworkingDetail,
            },
            volumes: {
                path: '/technology/docker/volumes',
                title: '数据管理',
                component: DataManagementDetail,
            },
            security: {
                path: '/technology/docker/security',
                title: '安全实践',
                component: SecurityDetail,
            },
            optimization: {
                path: '/technology/docker/optimization',
                title: '性能优化',
                component: PerformanceOptimizationDetail,
            },
            kubernetes: {
                path: '/technology/docker/kubernetes',
                title: 'Kubernetes',
                component: KubernetesDetail,
            },
        },
    },
    git: {
        main: GitDetail,
        subRoutes: {
            'git-basics': {
                path: '/technology/git/git-basics',
                title: 'Git 基础',
                component: GitBasicsDetail,
            },
            branching: {
                path: '/technology/git/branching',
                title: '分支管理',
                component: BranchingDetail,
            },
            'github-workflow': {
                path: '/technology/git/github-workflow',
                title: 'GitHub 工作流',
                component: GitHubWorkflowDetail,
            },
            'github-actions': {
                path: '/technology/git/github-actions',
                title: 'GitHub Actions',
                component: GitHubActionsDetail,
            },
            'advanced-git': {
                path: '/technology/git/advanced-git',
                title: 'Git 高级技巧',
                component: AdvancedTechniquesDetail,
            },
            'git-hooks': {
                path: '/technology/git/git-hooks',
                title: 'Git Hooks',
                component: GitHooksDetail,
            },
            collaboration: {
                path: '/technology/git/collaboration',
                title: '团队协作',
                component: CollaborationDetail,
            },
            security: {
                path: '/technology/git/security',
                title: '安全最佳实践',
                component: SecurityBestPracticesDetail,
            },
        },
    },
    tools: {
        main: ToolsDetail,
        subRoutes: {
            vscode: {
                path: '/technology/tools/vscode',
                title: 'VS Code',
                component: VSCodeDetail,
            },
            webpack: {
                path: '/technology/tools/webpack',
                title: 'Webpack',
                component: WebpackDetail,
            },
            vite: {
                path: '/technology/tools/vite',
                title: 'Vite',
                component: ViteDetail,
            },
            'eslint-prettier': {
                path: '/technology/tools/eslint-prettier',
                title: 'ESLint & Prettier',
                component: ESLintPrettierDetail,
            },
            'chrome-devtools': {
                path: '/technology/tools/chrome-devtools',
                title: 'Chrome DevTools',
                component: ChromeDevToolsDetail,
            },
            postman: {
                path: '/technology/tools/postman',
                title: 'Postman',
                component: PostmanDetail,
            },
            terminal: {
                path: '/technology/tools/terminal',
                title: '终端工具',
                component: TerminalDetail,
            },
            productivity: {
                path: '/technology/tools/productivity',
                title: '效率工具',
                component: ProductivityDetail,
            },
        },
    },
    jest: {
        main: JestDetail,
        subRoutes: {
            'jest-basics': {
                path: '/technology/jest/jest-basics',
                title: 'Jest 基础',
                component: JestBasicsDetail,
            },
            'unit-testing': {
                path: '/technology/jest/unit-testing',
                title: '单元测试',
                component: UnitTestingDetail,
            },
            mocking: {
                path: '/technology/jest/mocking',
                title: 'Mock 与 Spy',
                component: MockingDetail,
            },
            'async-testing': {
                path: '/technology/jest/async-testing',
                title: '异步测试',
                component: AsyncTestingDetail,
            },
            coverage: {
                path: '/technology/jest/coverage',
                title: '测试覆盖率',
                component: CoverageDetail,
            },
            'best-practices': {
                path: '/technology/jest/best-practices',
                title: '最佳实践',
                component: BestPracticesDetail,
            },
        },
    },
}
