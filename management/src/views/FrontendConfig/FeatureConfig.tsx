import React from "react";
import { Card, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const FeatureConfig: React.FC = () => {
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
            功能开关
          </Title>
          <Text type="secondary">控制前端项目的功能模块启用状态</Text>
        </div>
      </div>

      <Card>
        <Text>功能开关配置开发中...</Text>
      </Card>
    </div>
  );
};

export default FeatureConfig;
