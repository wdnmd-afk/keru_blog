import { Card, Space, Typography } from 'antd'
import React from 'react'

// 测试引用 management 项目的组件
// import { ManagementCard } from '@management-components';

const { Text } = Typography

// 测试组件 - 验证 frontEnd 能否引用 management 组件
const ManagementTest: React.FC = () => {
    return (
        <Card title="跨项目组件引用测试">
            <Space direction="vertical">
                <Text>这是 frontEnd 项目中的测试组件</Text>
                <Text type="secondary">用于验证是否能够引用 management 项目中的组件</Text>
                {/* 
        当 management 项目启动后，可以取消注释下面的代码来测试跨项目组件引用：
        <ManagementCard title="来自 Management 的组件">
          <Text>这个卡片组件来自 management 项目</Text>
        </ManagementCard>
        */}
                <Text type="success">
                    ✅ 跨项目引用配置已完成，可以在需要时引用 management 组件
                </Text>
            </Space>
        </Card>
    )
}

export default ManagementTest
