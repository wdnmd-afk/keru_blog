import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const RedisConfig: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          Redis 配置
        </Title>
        <Text type="secondary">配置 Redis 缓存服务器设置</Text>
      </div>

      <Card>
        <Text>Redis 配置功能开发中...</Text>
      </Card>
    </div>
  );
};

export default RedisConfig;
