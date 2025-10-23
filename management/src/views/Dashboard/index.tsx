import React from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Space,
  Divider,
  Button,
} from "antd";
import {
  UserOutlined,
  SettingOutlined,
  MonitorOutlined,
  DatabaseOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// 注意：这里演示了跨项目组件引用的配置
// import LanguageSwitcher from '@frontend-components/LanguageSwitcher';

const { Title, Text, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      {/* 页面标题 */}
      <div className="mb-6">
        <Title level={2} className="mb-2">
          管理系统仪表板
        </Title>
        <Text type="secondary">
          欢迎使用博客管理系统，这里可以配置和管理前端和服务端的各种设置
        </Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="在线用户"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="系统配置"
              value={25}
              prefix={<SettingOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="服务状态"
              value={98.5}
              prefix={<MonitorOutlined />}
              suffix="%"
              precision={1}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="数据库连接"
              value={5}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: "#cf1322" }}
              suffix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要功能区域 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="系统概览" className="mb-4">
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <Title level={4}>功能模块</Title>
                <Paragraph>
                  管理系统提供了完整的前端和服务端配置管理功能，包括：
                </Paragraph>
                <ul className="ml-4 space-y-1">
                  <li>🎨 前端配置：主题设置、功能开关、API 配置</li>
                  <li>⚙️ 服务端配置：数据库、Redis、JWT 配置</li>
                  <li>👥 用户管理：用户列表、角色管理、权限控制</li>
                  <li>📊 系统监控：日志管理、性能监控、系统状态</li>
                </ul>
              </div>

              <Divider />

              <div>
                <Title level={4}>快捷操作</Title>
                <Space wrap>
                  <Button type="primary" icon={<SettingOutlined />} onClick={() => navigate('/frontend-config')}>
                    前端配置
                  </Button>
                  <Button icon={<DatabaseOutlined />} onClick={() => navigate('/server-config/database')}>数据库配置</Button>
                  <Button icon={<UserOutlined />} onClick={() => navigate('/user-management')}>用户管理</Button>
                  <Button icon={<MonitorOutlined />} onClick={() => navigate('/system-monitor')}>系统监控</Button>
                </Space>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="跨项目组件共享" className="mb-4">
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <Text strong>跨项目组件引用配置：</Text>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <Text code>
                  import Component from '@frontend-components/Component'
                </Text>
              </div>

              <div>
                <Text strong>已配置的别名：</Text>
                <ul className="mt-2 ml-4 space-y-1 text-sm">
                  <li>
                    <Text code>@frontend-components</Text> - frontEnd 组件
                  </li>
                  <li>
                    <Text code>@frontend-utils</Text> - frontEnd 工具函数
                  </li>
                  <li>
                    <Text code>@frontend-types</Text> - frontEnd 类型定义
                  </li>
                  <li>
                    <Text code>@frontend-hooks</Text> - frontEnd Hooks
                  </li>
                </ul>
              </div>

              <Divider />

              <Text type="success">✅ 跨项目组件引用配置完成！</Text>

              <Paragraph type="secondary" className="text-sm">
                management 项目已配置完整的跨项目组件引用能力， 可以引用
                frontEnd 项目中的组件、工具函数、类型定义等。 同时 frontEnd
                项目也可以引用 management 项目的组件。
              </Paragraph>
            </Space>
          </Card>

          <Card title="系统信息">
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <div className="flex justify-between">
                <Text type="secondary">系统版本：</Text>
                <Text>v1.0.0</Text>
              </div>
              <div className="flex justify-between">
                <Text type="secondary">React 版本：</Text>
                <Text>18.3.1</Text>
              </div>
              <div className="flex justify-between">
                <Text type="secondary">Ant Design：</Text>
                <Text>5.20.1</Text>
              </div>
              <div className="flex justify-between">
                <Text type="secondary">构建工具：</Text>
                <Text>Vite 5.3.4</Text>
              </div>
              <div className="flex justify-between">
                <Text type="secondary">样式框架：</Text>
                <Text>UnoCSS 0.62.1</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
