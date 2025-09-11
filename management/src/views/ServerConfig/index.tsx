import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

const ServerConfig: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          服务端配置
        </Title>
        <Text type="secondary">管理服务端的各种配置设置</Text>
      </div>

      <Card>
        <Text>服务端配置功能开发中...</Text>
      </Card>
    </div>
  );
};

export default ServerConfig;
