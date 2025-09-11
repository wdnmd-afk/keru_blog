import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const PerformanceMonitor: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          性能监控
        </Title>
        <Text type="secondary">监控系统性能指标</Text>
      </div>

      <Card>
        <Text>性能监控功能开发中...</Text>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
