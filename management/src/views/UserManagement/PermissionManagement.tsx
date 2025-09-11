import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const PermissionManagement: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          权限管理
        </Title>
        <Text type="secondary">管理系统权限和访问控制</Text>
      </div>

      <Card>
        <Text>权限管理功能开发中...</Text>
      </Card>
    </div>
  );
};

export default PermissionManagement;
