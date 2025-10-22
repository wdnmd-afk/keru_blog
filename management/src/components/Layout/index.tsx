import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Breadcrumb,
} from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  MonitorOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ProfileOutlined,
  BellOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserLocalStorage, ManagementMessageBox } from "@/utils";
import { useManagementUser } from "@/store";
import { AuthApi } from "@/api/auth";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// 菜单配置
const menuItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "仪表板",
  },
  {
    key: "frontend-config",
    icon: <SettingOutlined />,
    label: "前端配置",
    children: [
      { key: "/frontend-config/theme", label: "主题设置" },
      { key: "/frontend-config/features", label: "功能开关" },
      { key: "/frontend-config/api", label: "API 配置" },
    ],
  },
  {
    key: "server-config",
    icon: <SettingOutlined />,
    label: "服务端配置",
    children: [
      { key: "/server-config/database", label: "数据库配置" },
      { key: "/server-config/redis", label: "Redis 配置" },
      { key: "/server-config/jwt", label: "JWT 配置" },
    ],
  },
  {
    key: "user-management",
    icon: <UserOutlined />,
    label: "用户管理",
    children: [
      { key: "/user-management", label: "用户列表" },
      { key: "/user-management/roles", label: "角色管理" },
      { key: "/user-management/permissions", label: "权限管理" },
    ],
  },
  {
    key: "system-monitor",
    icon: <MonitorOutlined />,
    label: "系统监控",
    children: [
      { key: "/system-monitor", label: "系统概览" },
      { key: "/system-monitor/logs", label: "日志管理" },
      { key: "/system-monitor/performance", label: "性能监控" },
      { key: "/feedback-management", label: "意见反馈" },
    ],
  },
  {
    key: "/template-management",
    icon: <ProfileOutlined />,
    label: "模板管理",
  },
  // PDF 一级菜单（指向 PDF 内容填充页面）
  {
    key: "pdf",
    icon: <FilePdfOutlined />,
    label: "PDF",
    children: [
      { key: "/pdf-fill", label: "PDF 内容填充" },
    ],
  },
];

// 面包屑映射
const breadcrumbMap: Record<string, string> = {
  "/dashboard": "仪表板",
  "/frontend-config": "前端配置",
  "/frontend-config/theme": "主题设置",
  "/frontend-config/features": "功能开关",
  "/frontend-config/api": "API 配置",
  "/server-config": "服务端配置",
  "/server-config/database": "数据库配置",
  "/server-config/redis": "Redis 配置",
  "/server-config/jwt": "JWT 配置",
  "/user-management": "用户管理",
  "/user-management/roles": "角色管理",
  "/user-management/permissions": "权限管理",
  "/system-monitor": "系统监控",
  "/system-monitor/logs": "日志管理",
  "/system-monitor/performance": "性能监控",
  "/feedback-management": "意见反馈管理",
  "/template-management": "模板管理",
  "/pdf-fill": "PDF 内容填充",
};

interface ManagementLayoutProps {
  children: React.ReactNode;
}

const ManagementLayout: React.FC<ManagementLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 获取用户状态和操作方法
  const { user, clearUser } = useManagementUser();

  // 获取当前用户信息 - 修复存储键名
  const userInfo = user ||
    BrowserLocalStorage.get("userInfo") || {
      name: "管理员",
      avatar: null,
      admin: true,
    };

  // 切换侧边栏折叠状态
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // 处理用户菜单点击
  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "profile":
        // 跳转到个人资料页面
        navigate("/profile");
        break;
      case "logout":
        // 退出登录确认
        ManagementMessageBox.confirm({
          title: "确认退出",
          content: "确定要退出管理系统吗？",
          confirm: async () => {
            console.log("[Layout] 开始退出登录流程");

            try {
              // 调用退出登录 API
              await AuthApi.logout();
              console.log("[Layout] 退出登录 API 调用成功");
            } catch (error) {
              console.warn("[Layout] 退出登录 API 调用失败:", error);
              // 即使 API 调用失败，也要继续清理本地状态
            }

            // 清除用户状态和本地存储
            clearUser();
            console.log("[Layout] 用户状态已清除");

            // 跳转到登录页面
            navigate("/login", { replace: true });
            console.log("[Layout] 已跳转到登录页面");
          },
        });
        break;
    }
  };

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "个人资料",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      danger: true,
    },
  ];

  // 生成面包屑
  const generateBreadcrumb = () => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    // 定义面包屑项类型，onClick 属性可选
    type BreadcrumbItem = {
      title: string;
      onClick?: () => void;
    };

    const breadcrumbItems: BreadcrumbItem[] = [
      {
        title: "首页",
        onClick: () => navigate("/dashboard"),
      },
    ];

    let currentPath = "";
    pathSnippets.forEach((snippet, index) => {
      currentPath += `/${snippet}`;
      const title = breadcrumbMap[currentPath];
      if (title) {
        const item: BreadcrumbItem = {
          title,
        };

        // 只有非最后一项才添加 onClick 属性
        if (index !== pathSnippets.length - 1) {
          item.onClick = () => navigate(currentPath);
        }

        breadcrumbItems.push(item);
      }
    });

    return breadcrumbItems;
  };

  return (
    <Layout className="management-layout" style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="management-sidebar"
        width={250}
        style={{
          background: "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo 区域 */}
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Title
            level={4}
            style={{
              color: "#1890ff",
              margin: 0,
              fontSize: collapsed ? "14px" : "18px",
              transition: "all 0.3s",
            }}
          >
            {collapsed ? "MS" : "管理系统"}
          </Title>
        </div>

        {/* 菜单 */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={[
            "frontend-config",
            "server-config",
            "user-management",
            "system-monitor",
            "pdf",
          ]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            borderRight: 0,
            height: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        />
      </Sider>

      <Layout className="management-main">
        {/* 顶部导航栏 */}
        <Header
          className="management-header"
          style={{
            background: "#fff",
            padding: "0 24px",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />

            {/* 面包屑导航 */}
            <Breadcrumb
              items={generateBreadcrumb()}
              style={{ fontSize: "14px" }}
            />
          </Space>

          {/* 右侧用户信息 */}
          <Space size="middle">
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ fontSize: "16px" }}
            />

            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
              arrow
            >
              <Space style={{ cursor: "pointer" }}>
                <Avatar
                  src={userInfo.avatar}
                  icon={<UserOutlined />}
                  size="small"
                />
                <Text>{userInfo.name || userInfo.username || "管理员"}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* 主内容区域 */}
        <Content
          className="management-content"
          style={{
            margin: "24px",
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            minHeight: "calc(100vh - 112px)",
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagementLayout;
