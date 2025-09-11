import React from "react";
import { Card, CardProps } from "antd";

// 管理系统专用卡片组件
interface ManagementCardProps extends CardProps {
  children: React.ReactNode;
}

const ManagementCard: React.FC<ManagementCardProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <Card className={`management-card ${className}`} {...props}>
      {children}
    </Card>
  );
};

export default ManagementCard;
