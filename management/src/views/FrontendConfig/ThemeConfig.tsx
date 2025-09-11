import React from "react";
import { Card, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ThemeConfig: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/frontend-config")}
          className="mr-4"
        >
          返回
        </Button>
        <div>
          <Title level={2} className="mb-0">
            主题设置
          </Title>
          <Text type="secondary">配置前端项目的主题色彩和样式</Text>
        </div>
      </div>

      <Card>
        <Text>主题配置功能开发中...</Text>
      </Card>
    </div>
  );
};

export default ThemeConfig;
