/**
 * 管理系统路由配置文件
 *
 * 功能说明：
 * 1. 使用 React.lazy() 实现代码分割和懒加载
 * 2. 区分公共路由和私有路由，实现权限控制
 * 3. 私有路由需要管理员登录后才能访问
 * 4. 公共路由无需登录即可访问
 *
 * 文件结构：
 * - LazyComponents: 懒加载组件配置
 * - publicRoutes: 公共路由配置（登录页、404页等）
 * - privateRoutes: 私有路由配置（需要登录的管理功能页面）
 * - ManagementRoutes: 主路由组件，处理路由渲染和权限验证
 */

import { useManagementStore } from "@/store";
import Layout from "@/components/Layout";
import React, { lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

/**
 * 懒加载组件配置
 *
 * 使用 React.lazy() 实现代码分割，提升应用性能
 * 每个组件会在首次访问时才加载对应的代码块
 *
 * 组件分类：
 * - 系统页面：登录、首页、404等基础页面
 * - 管理模块：按业务功能划分的管理模块
 */
const LazyComponents = {
  // ==================== 系统页面 ====================
  Login: lazy(() => import("@/views/Login")), // 管理员登录页面
  Dashboard: lazy(() => import("@/views/Dashboard")), // 管理系统仪表板
  NotFound: lazy(() => import("@/views/NotFound")), // 404错误页面

  // ==================== 前端配置管理 ====================
  FrontendConfig: lazy(() => import("@/views/FrontendConfig")), // 前端配置总览
  ThemeConfig: lazy(() => import("@/views/FrontendConfig/ThemeConfig")), // 主题配置
  FeatureConfig: lazy(() => import("@/views/FrontendConfig/FeatureConfig")), // 功能开关配置
  ApiConfig: lazy(() => import("@/views/FrontendConfig/ApiConfig")), // API 配置

  // ==================== 服务端配置管理 ====================
  ServerConfig: lazy(() => import("@/views/ServerConfig")), // 服务端配置总览
  DatabaseConfig: lazy(() => import("@/views/ServerConfig/DatabaseConfig")), // 数据库配置
  RedisConfig: lazy(() => import("@/views/ServerConfig/RedisConfig")), // Redis 配置
  JwtConfig: lazy(() => import("@/views/ServerConfig/JwtConfig")), // JWT 配置

  // ==================== 用户管理 ====================
  UserManagement: lazy(() => import("@/views/UserManagement")), // 用户管理
  RoleManagement: lazy(() => import("@/pages/UserManagement/RoleManagement")), // 角色管理
  PermissionManagement: lazy(
    () => import("@/pages/UserManagement/PermissionManagement"),
  ), // 权限管理
  UserRoleManagement: lazy(
    () => import("@/pages/UserManagement/UserRoleManagement"),
  ), // 用户角色管理

  // ==================== 系统监控 ====================
  SystemMonitor: lazy(() => import("@/views/SystemMonitor")), // 系统监控
  LogManagement: lazy(() => import("@/views/SystemMonitor/LogManagement")), // 日志管理
  PerformanceMonitor: lazy(
    () => import("@/views/SystemMonitor/PerformanceMonitor"),
  ), // 性能监控
  // 拆分后的日志页面
  FileLogs: lazy(() => import("@/views/SystemMonitor/FileLogs")), // 文件日志
  DbLogs: lazy(() => import("@/views/SystemMonitor/DbLogs")), // 数据库日志

  // ==================== 意见反馈管理 ====================
  FeedbackManagement: lazy(() => import("@/pages/FeedbackManagement")), // 意见反馈管理
  // ==================== 模板管理 ====================
  TemplateManagement: lazy(() => import("@/pages/TemplateManagement")), // 模板管理
  // ==================== PDF 内容填充 ====================
  PDFFill: lazy(() => import("@/pages/PDFContentFill")), // PDF 内容填充（生成 PDF）
  // ==================== PDF 文件库 ====================
  PDFLibrary: lazy(() => import("@/pages/PDFLibrary")), // PDF 文件库
  // ==================== 医学检验建议（调试） ====================
  PDFMedicalAdvice: lazy(() => import("@/pages/PDFMedicalAdvice")),
};

/**
 * 公共路由配置
 *
 * 这些路由无需管理员登录即可访问
 * 主要包括：登录页面、错误页面等
 */
const publicRoutes = [
  {
    path: "/login",
    component: <LazyComponents.Login />,
    description: "管理员登录页面",
  },
  {
    path: "*",
    component: <LazyComponents.NotFound />,
    description: "404错误页面 - 处理所有未匹配的路由",
  },
];

/**
 * 私有路由配置
 *
 * 这些路由需要管理员登录后才能访问
 * 未登录管理员会被重定向到登录页面
 * 所有私有路由都会被 Layout 组件包裹，提供统一的管理界面布局
 */
const privateRoutes = [
  {
    path: "/",
    component: <LazyComponents.Dashboard />,
    description: "管理系统仪表板 - 系统概览和快捷操作",
  },
  {
    path: "/dashboard",
    component: <LazyComponents.Dashboard />,
    description: "管理系统仪表板",
  },

  // ==================== 前端配置管理路由 ====================
  {
    path: "/frontend-config",
    component: <LazyComponents.FrontendConfig />,
    description: "前端配置总览",
  },
  {
    path: "/frontend-config/theme",
    component: <LazyComponents.ThemeConfig />,
    description: "前端主题配置",
  },
  {
    path: "/frontend-config/features",
    component: <LazyComponents.FeatureConfig />,
    description: "前端功能开关配置",
  },
  {
    path: "/frontend-config/api",
    component: <LazyComponents.ApiConfig />,
    description: "前端 API 配置",
  },

  // ==================== 服务端配置管理路由 ====================
  {
    path: "/server-config",
    component: <LazyComponents.ServerConfig />,
    description: "服务端配置总览",
  },
  {
    path: "/server-config/database",
    component: <LazyComponents.DatabaseConfig />,
    description: "数据库配置",
  },
  {
    path: "/server-config/redis",
    component: <LazyComponents.RedisConfig />,
    description: "Redis 配置",
  },
  {
    path: "/server-config/jwt",
    component: <LazyComponents.JwtConfig />,
    description: "JWT 配置",
  },

  // ==================== 用户管理路由 ====================
  {
    path: "/user-management",
    component: <LazyComponents.UserRoleManagement />,
    description: "用户角色管理",
  },
  {
    path: "/user-management/roles",
    component: <LazyComponents.RoleManagement />,
    description: "角色管理",
  },
  {
    path: "/user-management/permissions",
    component: <LazyComponents.PermissionManagement />,
    description: "权限管理",
  },

  // ==================== 系统监控路由 ====================
  {
    path: "/system-monitor",
    component: <LazyComponents.SystemMonitor />,
    description: "系统监控",
  },
  {
    path: "/system-monitor/logs",
    component: <Navigate to="/system-monitor/file-logs" replace />,
    description: "日志管理（兼容路由，重定向至文件日志）",
  },
  {
    path: "/system-monitor/file-logs",
    component: <LazyComponents.FileLogs />,
    description: "系统监控 - 文件日志",
  },
  {
    path: "/system-monitor/db-logs",
    component: <LazyComponents.DbLogs />,
    description: "系统监控 - 数据库日志",
  },
  {
    path: "/system-monitor/performance",
    component: <LazyComponents.PerformanceMonitor />,
    description: "性能监控",
  },

  // ==================== 意见反馈管理路由 ====================
  {
    path: "/feedback-management",
    component: <LazyComponents.FeedbackManagement />,
    description: "意见反馈管理",
  },
  // ==================== 模板管理路由 ====================
  {
    path: "/template-management",
    component: <LazyComponents.TemplateManagement />,
    description: "模板管理",
  },
  // ==================== PDF 内容填充路由 ====================
  {
    path: "/pdf-fill",
    component: <LazyComponents.PDFFill />,
    description: "PDF 内容填充与生成",
  },
  // ==================== PDF 文件库 ====================
  {
    path: "/pdf-library",
    component: <LazyComponents.PDFLibrary />,
    description: "PDF 文件库",
  },
  // ==================== 医学检验建议（调试） ====================
  {
    path: "/pdf-medical-advice",
    component: <LazyComponents.PDFMedicalAdvice />,
    description: "医学检验建议（调试）",
  },
];

/**
 * 主路由组件
 *
 * 功能说明：
 * 1. 权限验证：检查管理员登录状态，决定是否允许访问私有路由
 * 2. 路由渲染：根据路由配置渲染对应的组件
 * 3. 懒加载：使用 Suspense 包裹懒加载组件，提供加载状态
 * 4. 布局包裹：私有路由使用 Layout 组件提供统一的管理界面布局
 *
 * 权限验证逻辑：
 * - 检查本地存储中的 userInfo（与登录逻辑保持一致）
 * - 存在且包含有效 token 即认为管理员已登录
 */
const ManagementRoutes: React.FC = () => {
  // 使用 Zustand 的响应式状态，确保清理后会触发重渲染，避免需要点击两次
  const isAuthenticated = useManagementStore((state) => state.isAuthenticated);
  const user = useManagementStore((state) => state.user);

  console.log("Management 路由权限检查:", { isAuthenticated, user });

  return (
    <Router>
      <Routes>
        {/* ==================== 公共路由渲染 ==================== */}
        {publicRoutes.map(({ path, component, description }) => (
          <Route
            key={path}
            path={path}
            element={
              // 使用 Suspense 包裹懒加载组件，提供加载状态
              <React.Suspense
                fallback={
                  <div className="management-loading">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">加载中...</div>
                  </div>
                }
              >
                {path === '/login' && isAuthenticated ? (
                  // 已登录访问 /login 时直接重定向到 dashboard，避免停留在登录页
                  <Navigate to="/dashboard" replace />
                ) : (
                  component
                )}
              </React.Suspense>
            }
          />
        ))}

        {/* ==================== 私有路由渲染 ==================== */}
        {privateRoutes.map(({ path, component, description }) => (
          <Route
            key={path}
            path={path}
            element={
              // 权限验证：已登录管理员渲染页面，未登录管理员重定向到登录页
              isAuthenticated ? (
                // 使用 Layout 组件包裹，提供统一的管理界面布局
                <Layout>
                  <React.Suspense
                    fallback={
                      <div className="management-loading">
                        <div className="loading-spinner"></div>
                        <div className="loading-text">加载中...</div>
                      </div>
                    }
                  >
                    {component}
                  </React.Suspense>
                </Layout>
              ) : (
                // 未登录管理员重定向到登录页面
                <Navigate to="/login" replace />
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

// 导出主路由组件，供 App.tsx 使用
export default ManagementRoutes;

/**
 * 管理系统路由配置总结
 *
 * 🔐 权限控制：
 * - 公共路由：/login, /404 (无需登录)
 * - 私有路由：/, /dashboard, /frontend-config/*, /server-config/*, /user-management/*, /system-monitor/* (需要登录)
 *
 * 📁 页面结构：
 * - 仪表板 (/)：系统概览和快捷操作
 * - 前端配置 (/frontend-config)：主题、功能、API 配置
 * - 服务端配置 (/server-config)：数据库、Redis、JWT 配置
 * - 用户管理 (/user-management)：用户、角色、权限管理
 * - 系统监控 (/system-monitor)：日志、性能监控
 *
 * 🚀 性能优化：
 * - 使用 React.lazy() 实现代码分割
 * - 懒加载减少初始包大小
 * - Suspense 提供加载状态
 *
 * 🎨 用户体验：
 * - 统一的 Layout 布局
 * - 自动重定向未登录管理员
 * - 友好的加载提示
 */
