/**
 * 路由配置文件
 *
 * 功能说明：
 * 1. 使用 React.lazy() 实现代码分割和懒加载
 * 2. 区分公共路由和私有路由，实现权限控制
 * 3. 私有路由需要用户登录后才能访问
 * 4. 公共路由无需登录即可访问
 *
 * 文件结构：
 * - LazyComponents: 懒加载组件配置
 * - publicRoutes: 公共路由配置（登录页、404页等）
 * - privateRoutes: 私有路由配置（需要登录的功能页面）
 * - AppRoutes: 主路由组件，处理路由渲染和权限验证
 */

import { useGlobalStore } from '@/store'
import { BrowserLocalStorage } from '@/utils'
import { reportPageView } from '@/utils/monitor'
import Layout from '@/views/systemPages/Layout.tsx'
import React, { lazy, useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'

/**
 * 懒加载组件配置
 *
 * 使用 React.lazy() 实现代码分割，提升应用性能
 * 每个组件会在首次访问时才加载对应的代码块
 *
 * 组件分类：
 * - 系统页面：登录、首页、404等基础页面
 * - 功能模块：按业务功能划分的独立模块
 */
const LazyComponents = {
    // ==================== 系统页面 ====================
    Home: lazy(() => import('@/views/Home/index.tsx')), // 首页 - 技术博客展示
    NotFound: lazy(() => import('@/views/systemPages/NotFound.tsx')), // 404错误页面
    Login: lazy(() => import('@/views/systemPages/Login.tsx')), // 登录/注册页面

    // ==================== 功能模块 ====================
    Technology: lazy(() => import('@/views/Technology/index.tsx')), // 技术栈展示模块 - 技能、项目展示
    Learning: lazy(() => import('@/views/Learning/index.tsx')), // 学习模块 - 学习历程和学习计划管理
    Files: lazy(() => import('@/views/Files/index.tsx')), // 文件管理模块 - 文件上传、预览、管理
    WebRTC: lazy(() => import('@/views/WebRTC/index.tsx')), // WebRTC模块 - 实时视频通信功能

    // ==================== Chat 模块 ====================
    ChatEntry: lazy(() => import('@/views/Chat/index.tsx')), // 聊天入口：AI聊天或输入房间号
    ChatAi: lazy(() => import('@/views/Chat/AiChat')), // AI 聊天（保持原有流式渲染）
    ChatRoom: lazy(() => import('@/views/Chat/ChatRoom')), // 聊天室（默认本地渲染，预留 Socket 接入）

    // ==================== Technology子模块 ====================
    TechnologyLayout: lazy(() => import('@/views/Technology/TechnologyLayout.tsx')), // Technology子路由布局
    ReactDetail: lazy(() => import('@/views/Technology/pages/ReactDetail.tsx')), // React技术详解
    // （已迁移至管理端 /pdf-fill）
}

/**
 * 公共路由配置
 *
 * 这些路由无需用户登录即可访问
 * 主要包括：登录页面、错误页面等
 */
const publicRoutes = [
    {
        path: '/login',
        component: <LazyComponents.Login />,
        description: '登录/注册页面',
    },

    {
        path: '*',
        component: <LazyComponents.NotFound />,
        description: '404错误页面 - 处理所有未匹配的路由',
    },
]

/**
 * 私有路由配置
 *
 * 这些路由需要用户登录后才能访问
 * 未登录用户会被重定向到登录页面
 * 所有私有路由都会被 Layout 组件包裹，提供统一的页面布局
 */
const privateRoutes = [
    {
        path: '/',
        component: <LazyComponents.Home />,
        description: '首页 - 技术博客和文章展示',
    },

    {
        path: '/technology',
        component: <LazyComponents.Technology />,
        description: '技术栈 - 个人技能、项目经验展示',
    },
    {
        path: '/learning',
        component: <LazyComponents.Learning />,
        description: '学习模块 - 学习历程和学习计划管理',
    },
    // ==================== Chat 模块路由 ====================
    {
        path: '/chat',
        component: <LazyComponents.ChatEntry />,
        description: '聊天入口 - 选择 AI 聊天或房间号进入聊天室',
    },
    {
        path: '/chat/ai',
        component: <LazyComponents.ChatAi />,
        description: 'AI 聊天（SSE 流式渲染）',
    },
    {
        path: '/chat/room/:roomId',
        component: <LazyComponents.ChatRoom />,
        description: '聊天室 - 通过房间号加入（默认本地直连，预留 Socket 接入）',
    },
    {
        path: '/webrtc',
        component: <LazyComponents.WebRTC />,
        description: 'WebRTC - 实时视频通信功能',
    },
    {
        path: '/technology/:tech',
        component: <LazyComponents.TechnologyLayout />,
        description: '技术详解 - 具体技术的深度解析',
    },
    {
        path: '/technology/:tech/:topic',
        component: <LazyComponents.TechnologyLayout />,
        description: '技术主题详解 - 具体技术主题的深度解析',
    },
    {
        path: '/files',
        component: <LazyComponents.Files />,
        description: '文件管理 - 文件上传、预览、管理功能',
    },
    // （/pdf-generator 已迁移到管理端，不再在前台提供）
]

/**
 * 主路由组件
 *
 * 功能说明：
 * 1. 权限验证：检查用户登录状态，决定是否允许访问私有路由
 * 2. 路由渲染：根据路由配置渲染对应的组件
 * 3. 懒加载：使用 Suspense 包裹懒加载组件，提供加载状态
 * 4. 布局包裹：私有路由使用 Layout 组件提供统一的页面布局
 *
 * 权限验证逻辑：
 * - 检查全局状态中的 user.token
 * - 检查本地存储中的 userInfo
 * - 任一存在即认为用户已登录
 */
// 路由变化监听组件（必须在 Router 内部）
const RouteTracker: React.FC = () => {
    const location = useLocation()
    useEffect(() => {
        reportPageView(location.pathname + location.search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, location.search])
    return null
}

const AppRoutes: React.FC = () => {
    // 获取全局用户状态
    const user = useGlobalStore((state) => state.user)

    // 获取本地存储的用户信息（用于页面刷新后保持登录状态）
    const localToken = BrowserLocalStorage.get('userInfo')

    // 判断用户是否已登录（全局状态或本地存储任一有值即为已登录）
    const isAuthenticated = user.token || localToken

    return (
        <Router>
            {/* 页面浏览埋点 */}
            <RouteTracker />
            <Routes>
                {/* ==================== 公共路由渲染 ==================== */}
                {publicRoutes.map(({ path, component, description: _description }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            // 使用 Suspense 包裹懒加载组件，提供加载状态
                            <React.Suspense fallback={<div>Loading...</div>}>
                                {component}
                            </React.Suspense>
                        }
                    />
                ))}

                {/* ==================== 私有路由渲染 ==================== */}
                {privateRoutes.map(({ path, component, description: _description }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            // 权限验证：已登录用户渲染页面，未登录用户重定向到登录页
                            isAuthenticated ? (
                                // 使用 Layout 组件包裹，提供统一的页面布局（导航栏、侧边栏等）
                                <Layout>
                                    <React.Suspense fallback={<div>Loading...</div>}>
                                        {component}
                                    </React.Suspense>
                                </Layout>
                            ) : (
                                // 未登录用户重定向到登录页面
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                ))}
            </Routes>
        </Router>
    )
}

// 导出主路由组件，供 App.tsx 使用
export default AppRoutes

/**
 * 路由配置总结
 *
 * 🔐 权限控制：
 * - 公共路由：/login, /404 (无需登录)
 * - 私有路由：/, /learning, /technology, /files (需要登录)
 *
 * 📁 页面结构：
 * - 首页 (/)：技术博客和文章展示
 * - 学习中心 (/learning)：学习历程和学习计划管理
 * - 技术栈 (/technology)：个人技能、项目经验展示
 * - 文件管理 (/files)：文件上传、预览、管理功能
 *
 * 🚀 性能优化：
 * - 使用 React.lazy() 实现代码分割
 * - 懒加载减少初始包大小
 * - Suspense 提供加载状态
 *
 * 🎨 用户体验：
 * - 统一的 Layout 布局
 * - 自动重定向未登录用户
 * - 友好的加载提示
 *
 * 📝 扩展指南：
 * 1. 添加新的公共路由：在 publicRoutes 数组中添加配置
 * 2. 添加新的私有路由：在 privateRoutes 数组中添加配置
 * 3. 添加新的懒加载组件：在 LazyComponents 对象中添加
 * 4. 修改权限逻辑：在 isAuthenticated 判断中修改
 */
