// Management 项目类型定义

// 菜单项类型
export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
}

// 用户信息类型
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

// 系统配置类型
export interface SystemConfig {
  siteName: string;
  siteDescription: string;
  logo?: string;
  theme: "light" | "dark";
  language: string;
}

// 前端配置类型
export interface FrontendConfig {
  apiBaseUrl: string;
  uploadMaxSize: number;
  enabledFeatures: string[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}

// 服务端配置类型
export interface ServerConfig {
  port: number;
  database: {
    host: string;
    port: number;
    name: string;
  };
  redis: {
    host: string;
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

// 管理页面通用属性
export interface ManagementPageProps {
  title: string;
  breadcrumb?: string[];
  actions?: React.ReactNode;
}

// API 响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 分页参数类型
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// 表格列配置类型
export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
  render?: (value: any, record: any) => React.ReactNode;
}
