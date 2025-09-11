import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const DatabaseConfig: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          数据库配置
        </Title>
        <Text type="secondary">配置数据库连接和相关设置</Text>
      </div>

      <Card>
        <Text>数据库配置功能开发中...</Text>
      </Card>
    </div>
  );
};

export default DatabaseConfig;
