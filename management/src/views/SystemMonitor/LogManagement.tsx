import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const LogManagement: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          日志管理
        </Title>
        <Text type="secondary">查看和管理系统日志</Text>
      </div>

      <Card>
        <Text>日志管理功能开发中...</Text>
      </Card>
    </div>
  );
};

export default LogManagement;
