import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const SystemMonitor: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          系统监控
        </Title>
        <Text type="secondary">监控系统运行状态和性能</Text>
      </div>

      <Card>
        <Text>系统监控功能开发中...</Text>
      </Card>
    </div>
  );
};

export default SystemMonitor;
