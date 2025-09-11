import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const JwtConfig: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          JWT 配置
        </Title>
        <Text type="secondary">配置 JWT 认证相关设置</Text>
      </div>

      <Card>
        <Text>JWT 配置功能开发中...</Text>
      </Card>
    </div>
  );
};

export default JwtConfig;
