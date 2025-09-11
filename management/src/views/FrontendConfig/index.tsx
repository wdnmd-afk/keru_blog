import React from "react";
import { Card, Typography, Space, Button, Row, Col } from "antd";
import {
  SettingOutlined,
  BgColorsOutlined,
  ApiOutlined,
  FunctionOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const FrontendConfig: React.FC = () => {
  const navigate = useNavigate();

  const configModules = [
    {
      key: "theme",
      title: "主题设置",
      description: "配置前端项目的主题色彩、布局样式等视觉元素",
      icon: <BgColorsOutlined className="text-2xl text-blue-500" />,
      path: "/frontend-config/theme",
    },
    {
      key: "features",
      title: "功能开关",
      description: "控制前端项目的各种功能模块的启用和禁用",
      icon: <FunctionOutlined className="text-2xl text-green-500" />,
      path: "/frontend-config/features",
    },
    {
      key: "api",
      title: "API 配置",
      description: "管理前端项目的 API 接口地址和请求配置",
      icon: <ApiOutlined className="text-2xl text-orange-500" />,
      path: "/frontend-config/api",
    },
  ];

  return (
    <div className="frontend-config-container">
      {/* 页面标题 */}
      <div className="mb-6">
        <Title level={2} className="mb-2">
          前端配置管理
        </Title>
        <Text type="secondary">
          管理和配置前端项目的各种设置，包括主题、功能开关、API 配置等
        </Text>
      </div>

      {/* 配置模块卡片 */}
      <Row gutter={[16, 16]}>
        {configModules.map((module) => (
          <Col xs={24} md={12} lg={8} key={module.key}>
            <Card
              hoverable
              className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => navigate(module.path)}
            >
              <div className="text-center">
                <div className="mb-4">{module.icon}</div>
                <Title level={4} className="mb-2">
                  {module.title}
                </Title>
                <Paragraph type="secondary" className="text-sm">
                  {module.description}
                </Paragraph>
                <Button type="primary" icon={<SettingOutlined />}>
                  进入配置
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 配置概览 */}
      <Card title="配置概览" className="mt-6">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Title level={4}>当前配置状态</Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">Light</div>
                  <div className="text-sm text-gray-600">当前主题</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <div className="text-sm text-gray-600">启用功能</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">API 端点</div>
                </div>
              </Col>
            </Row>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default FrontendConfig;
