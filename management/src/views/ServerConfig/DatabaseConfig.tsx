import React, { useEffect, useState } from "react";
import { Card, Typography, Form, Input, Button, Space, Alert, message } from "antd";
import { ConfigApi, type ServerSideConfig } from "@/api";

const { Title, Text } = Typography;

const DatabaseConfig: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 加载服务端配置（数据库部分）
  useEffect(() => {
    const run = async () => {
      try {
        const cfg = await ConfigApi.getServerConfig();
        form.setFieldsValue({ url: cfg?.database?.url || "" });
      } catch (e: any) {
        message.error(e?.message || "加载配置失败");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [form]);

  // 保存数据库配置
  const handleSave = async (values: { url?: string }) => {
    setSaving(true);
    try {
      const payload: Partial<ServerSideConfig> = { database: { url: values.url } };
      await ConfigApi.saveServerConfig(payload);
      message.success("已保存数据库配置（部分配置需重启服务生效）");
    } catch (e: any) {
      message.error(e?.message || "保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          数据库配置
        </Title>
        <Text type="secondary">配置数据库连接和相关设置</Text>
      </div>

      <Card loading={loading} title="数据库连接">
        <Alert
          type="info"
          showIcon
          className="mb-4"
          message="提示：数据库连接等配置修改后，可能需要重启服务才能生效"
        />
        {/* 数据库配置表单 */}
        <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
          <Form.Item label="数据库连接字符串 (MySQL)" name="url" rules={[{ required: true, message: "请输入数据库连接字符串" }]}> 
            <Input placeholder="mysql://user:pass@localhost:3306/dbname" />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={saving}>保存</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default DatabaseConfig;
