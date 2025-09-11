import React from "react";
import { Card, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ApiConfig: React.FC = () => {
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
            API 配置
          </Title>
          <Text type="secondary">管理前端项目的 API 接口配置</Text>
        </div>
      </div>

      <Card>
        <Text>API 配置功能开发中...</Text>
      </Card>
    </div>
  );
};

export default ApiConfig;
