import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import ManagementRoutes from "@/routes";
import { initializeManagementStore } from "@/store";

// 管理系统主应用组件
const App: React.FC = () => {
  // 初始化状态存储
  useEffect(() => {
    initializeManagementStore();
  }, []);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          // 基于配色盘的完整色彩系统
          colorPrimary: "#8785a2", // 主色调 - 专业稳重的紫灰色
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
          // Layout 组件配色
          Layout: {
            bodyBg: "#f6f6f6", // 使用配色盘的浅灰背景
            headerBg: "#ffffff", // 头部纯白背景
            siderBg: "#ffffff", // 侧边栏纯白背景
            triggerBg: "#8785a2", // 触发器主色调
            triggerColor: "#ffffff", // 触发器文字白色
          },

          // Menu 组件配色
          Menu: {
            itemBg: "transparent", // 菜单项透明背景
            itemColor: "#2c2c2c", // 默认菜单项文字色（深灰）
            itemSelectedBg: "#8785a2", // 选中项背景使用主色调
            itemSelectedColor: "#ffffff", // 选中项文字白色，确保对比度
            itemHoverBg: "rgba(135, 133, 162, 0.1)", // 悬停背景使用主色调的浅色版本
            itemHoverColor: "#8785a2", // 悬停文字主色调
            itemActiveBg: "#8785a2", // 激活背景主色调
            // 注意：itemActiveColor 在 Ant Design v5 中不存在，已移除

            // 子菜单配色
            subMenuItemBg: "#f6f6f6", // 子菜单背景浅灰
            // 注意：subMenuItemSelectedBg 在 Ant Design v5 中不存在，已移除

            // 分组和标题配色 - 确保父级菜单可见
            groupTitleColor: "#2c2c2c", // 分组标题文字色（深灰）

            // 关键配置：子菜单选中时的父级菜单标题颜色
            subMenuItemSelectedColor: "#8785a2", // 子菜单选中时父级菜单标题颜色（主色调）

            // 水平菜单配色
            horizontalItemSelectedBg: "#8785a2", // 水平菜单选中项背景
            horizontalItemSelectedColor: "#ffffff", // 水平菜单选中项文字

            // 弹出菜单配色
            popupBg: "#ffffff", // 弹出菜单背景

            // 确保父级菜单在子菜单选中时保持可见
            itemDisabledColor: "rgba(44, 44, 44, 0.25)", // 禁用项文字色
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

          // Table 组件配色
          Table: {
            headerBg: "#f6f6f6", // 表头背景浅灰
            headerColor: "#2c2c2c", // 表头文字深灰
            rowHoverBg: "#ffe2e2", // 行悬停浅粉色
          },

          // Tag 组件配色
          Tag: {
            defaultBg: "#f6f6f6", // 默认标签背景
            defaultColor: "#6b6b83", // 默认标签文字
          },

          // Message 组件配色
          Message: {
            colorSuccess: "#ffe2e2", // 成功消息浅粉色
            colorWarning: "#ffc7c7", // 警告消息粉红色
            colorError: "#ff8a80", // 错误消息柔和红色
            colorInfo: "#8785a2", // 信息消息主色调
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
