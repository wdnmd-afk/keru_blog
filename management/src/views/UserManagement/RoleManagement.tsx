import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const RoleManagement: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          角色管理
        </Title>
        <Text type="secondary">管理用户角色和权限分配</Text>
      </div>

      <Card>
        <Text>角色管理功能开发中...</Text>
      </Card>
    </div>
  );
};

export default RoleManagement;
