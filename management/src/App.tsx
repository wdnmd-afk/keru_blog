import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import zhCN from "antd/locale/zh_CN";
import ManagementRoutes from "@/routes";
import { initializeManagementStore, useManagementStore } from "@/store";
import { ConfigApi, type FrontendConfig } from "@/api";
import { ManagementApi } from "@/utils";

// 管理系统主应用组件
const App: React.FC = () => {
  // 主题配置（从后端装载）
  const [primaryColor, setPrimaryColor] = useState<string>("#8785a2");
  const [mode, setMode] = useState<"light" | "dark">("light");
  // 从全局状态获取是否已认证，用于条件加载配置，避免未登录 401 造成刷新循环
  const isAuthenticated = useManagementStore((state) => state.isAuthenticated);

  // 初始化状态存储
  useEffect(() => {
    // 初始化状态（恢复本地用户信息与系统配置）
    initializeManagementStore();
  }, []);

  // 加载主题/前端配置：仅在已登录后请求，避免未登录触发 401 被拦截器重定向导致无限刷新
  useEffect(() => {
    if (!isAuthenticated) return; // 未登录不请求配置
    (async () => {
      try {
        const cfg = await ConfigApi.getFrontendConfig();
        if (cfg?.theme?.primaryColor) setPrimaryColor(cfg.theme.primaryColor);
        if (cfg?.theme?.mode === "dark" || cfg?.theme?.mode === "light") setMode(cfg.theme.mode);
        // 应用 API 基础前缀到 axios 实例（仅运行时影响，开发代理仍需 Vite 配置配合）
        if (cfg?.api?.managementApiBaseUrl) {
          try {
            (ManagementApi as any).service.defaults.baseURL = cfg.api.managementApiBaseUrl;
          } catch {}
        }
      } catch (e) {
        // 静默失败，沿用默认主题
      }
    })();
  }, [isAuthenticated]);

  // 监听前端配置变更事件（保存后即时生效，无需刷新）
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Partial<FrontendConfig>>).detail || {};
      if (detail.theme) {
        if (detail.theme.primaryColor) setPrimaryColor(detail.theme.primaryColor);
        if (detail.theme.mode === "dark" || detail.theme.mode === "light") setMode(detail.theme.mode);
      }
      if (detail.api?.managementApiBaseUrl) {
        try {
          (ManagementApi as any).service.defaults.baseURL = detail.api.managementApiBaseUrl;
        } catch {}
      }
    };
    window.addEventListener("management:frontend-config-updated", handler as EventListener);
    return () => window.removeEventListener("management:frontend-config-updated", handler as EventListener);
  }, []);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        // 根据后端配置切换明暗算法
        algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          // 基于配色盘的完整色彩系统（主色由后端配置覆盖）
          colorPrimary: primaryColor,
          colorSuccess: "#ffe2e2", // 成功色 - 温和的浅粉色
          colorWarning: "#ffc7c7", // 警告色 - 温暖的粉红色
          colorError: "#ff8a80", // 错误色 - 柔和的红色
          colorInfo: "#8785a2", // 信息色 - 与主色调一致

          // 背景色系统
          colorBgContainer: "#ffffff", // 容器背景 - 纯白
          colorBgElevated: "#ffffff", // 悬浮背景 - 纯白
          colorBgLayout: "#f6f6f6", // 布局背景 - 配色盘浅灰
          colorBgSpotlight: "#f6f6f6", // 聚光背景

          // 文字色系统
          colorText: "#2c2c2c", // 主要文字 - 深灰
          colorTextSecondary: "#6b6b83", // 次要文字 - 紫灰
          colorTextTertiary: "#9ca3af", // 三级文字 - 浅灰
          colorTextQuaternary: "#d1d5db", // 四级文字 - 极浅灰

          // 边框色系统
          colorBorder: "#e8e8e8", // 主要边框
          colorBorderSecondary: "#f0f0f0", // 次要边框

          // 圆角配置
          borderRadius: 8,
          borderRadiusLG: 12,
          borderRadiusSM: 6,

          // 字体配置
          fontSize: 14,
          fontSizeLG: 16,
          fontSizeSM: 12,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

          // 阴影配置
          boxShadow: "0 2px 8px rgba(135, 133, 162, 0.1)",
          boxShadowSecondary: "0 4px 16px rgba(135, 133, 162, 0.15)",
        },
        components: {
          // 组件级主题：确保选中项文字为白色，背景为主题色
          Menu: {
            // 默认与悬停
            itemBg: 'transparent',
            itemColor: '#2c2c2c',
            itemHoverBg: 'rgba(135, 133, 162, 0.1)',
            itemHoverColor: primaryColor,
            // 选中态
            itemSelectedBg: primaryColor,
            itemSelectedColor: '#ffffff',
            // 激活态
            itemActiveBg: primaryColor,
            // 子菜单/分组
            subMenuItemBg: '#f6f6f6',
            groupTitleColor: '#2c2c2c',
            subMenuItemSelectedColor: primaryColor,
            // 水平菜单
            horizontalItemSelectedBg: primaryColor,
            horizontalItemSelectedColor: '#ffffff',
            // 弹出菜单
            popupBg: '#ffffff',
            // 禁用
            itemDisabledColor: 'rgba(44, 44, 44, 0.25)',
          },
          // 下拉选项选中态
          Select: {
            // 选中项：主色背景+白字，保证对比
            optionSelectedBg: primaryColor,
            optionSelectedColor: '#ffffff',
            // 悬停项：浅色高亮，避免深色背景+深色文字
            optionActiveBg: 'rgba(135, 133, 162, 0.12)',
          },
          // 单选按钮（Button 样式）选中态
          Radio: {
            buttonSolidCheckedBg: primaryColor,
            buttonSolidCheckedHoverBg: primaryColor,
            buttonSolidCheckedActiveBg: primaryColor,
            buttonSolidCheckedColor: '#ffffff',
          },
          // 日期选择器：统一浅色面板与深色文字，提高可读性（仅使用已知合法 token）
          DatePicker: {
            colorBgContainer: '#ffffff',
            colorText: '#2c2c2c',
            colorTextDisabled: '#9ca3af',
          },
          // Layout 组件配色
          Layout: {
            bodyBg: "#f6f6f6", // 使用配色盘的浅灰背景
            headerBg: "#ffffff", // 头部纯白背景
            siderBg: "#ffffff", // 侧边栏纯白背景
            triggerBg: "#8785a2", // 触发器主色调
            triggerColor: "#ffffff", // 触发器文字白色
          },

          // Card 组件配色
          Card: {
            borderRadiusLG: 12,
            boxShadow: "0 2px 8px rgba(135, 133, 162, 0.1)",
            headerBg: "#ffffff",
          },

          // Button 组件配色
          Button: {
            borderRadius: 8,
            primaryShadow: "0 4px 12px rgba(135, 133, 162, 0.3)",
            defaultShadow: "0 2px 4px rgba(135, 133, 162, 0.1)",
          },

          // Input 组件配色
          Input: {
            borderRadius: 8,
            activeBorderColor: "#8785a2",
            hoverBorderColor: "#8785a2",
            activeShadow: "0 0 0 2px rgba(135, 133, 162, 0.2)",
          },

          // Table 组件配色（与 frontEnd 保持一致的蓝色表头）
          Table: {
            headerBg: "#5E83BB", // 表头背景蓝色
            headerColor: "#fff", // 表头文字白色
            headerBorderRadius: 0, // 表头无圆角，风格统一
            borderColor: "#566B99", // 边框颜色
            rowHoverBg: "#f5f7fb", // 行悬停轻微高亮（保持克制）
          },

          // Tag 组件配色
          Tag: {
            defaultBg: "#f6f6f6", // 默认标签背景
            defaultColor: "#6b6b83", // 默认标签文字
          },

          // Message 组件：避免深底深字（使用已知 token）
          Message: {
            contentBg: '#ffffff',
          },
        },
      }}
    >
      <div className="management-app">
        {/* 路由组件 */}
        <ManagementRoutes />
      </div>
    </ConfigProvider>
  );
};

export default App;
