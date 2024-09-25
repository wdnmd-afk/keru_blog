import React, { lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import useStores from "@/hooks/useStores.ts";
import { useGlobalStore } from '@/store'
import { BrowserLocalStorage } from '@/utils'
import Layout from '@/views/systemPages/Layout.tsx'

const LazyComponents = {
    Home: lazy(() => import('@/views/systemPages/Home.tsx')),
    NotFound: lazy(() => import('@/views/systemPages/NotFound.tsx')),
    Login: lazy(() => import('@/views/systemPages/Login.tsx')),
    Books: lazy(() => import('@/views/normalPages/Books.tsx'))
}

const routesConfig = [
    { path: '/', component: <LazyComponents.Home />, requiresAuth: true },
    { path: '/books', component: <LazyComponents.Login />, requiresAuth: true },
    { path: '/login', component: <LazyComponents.Login />, requiresAuth: false },
    { path: '*', component: <LazyComponents.NotFound />, requiresAuth: false }
]

const AppRoutes: React.FC = () => {
    const user = useGlobalStore(state => state.user)
    const localToken = BrowserLocalStorage.get('userInfo')
    return (
        <Router>
            <Routes>
                {routesConfig.map(({ path, component, requiresAuth }) => {
                    const RouteComponent = <React.Suspense fallback={<div>Loading...</div>}>{component}</React.Suspense>

                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                requiresAuth && !user.token && !localToken ? (
                                    <Navigate to='/login' />
                                ) : requiresAuth ? (
                                    <Layout>{RouteComponent}</Layout> // 使用Layout包裹需要认证的路由
                                ) : (
                                    RouteComponent // 直接渲染不需要Layout的路由
                                )
                            }
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default AppRoutes
