import React, { useEffect, useState } from "react";
import { Card, Typography, Form, Input, InputNumber, Button, Space, Alert, message } from "antd";
import { ConfigApi, type ServerSideConfig } from "@/api";

const { Title, Text } = Typography;

const RedisConfig: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 加载服务端配置（Redis 部分）
  useEffect(() => {
    const run = async () => {
      try {
        const cfg = await ConfigApi.getServerConfig();
        form.setFieldsValue({
          host: cfg?.redis?.host || "localhost",
          port: cfg?.redis?.port ?? 6379,
          password: cfg?.redis?.password || "",
        });
      } catch (e: any) {
        message.error(e?.message || "加载配置失败");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [form]);

  // 保存 Redis 配置
  const handleSave = async (values: { host?: string; port?: number; password?: string }) => {
    setSaving(true);
    try {
      const payload: Partial<ServerSideConfig> = {
        redis: { host: values.host, port: values.port, password: values.password },
      };
      await ConfigApi.saveServerConfig(payload);
      message.success("已保存 Redis 配置（部分配置需重启服务生效）");
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
          Redis 配置
        </Title>
        <Text type="secondary">配置 Redis 缓存服务器设置</Text>
      </div>

      <Card loading={loading} title="Redis 连接">
        <Alert type="info" showIcon className="mb-4" message="提示：修改 Redis 连接后可能需要重启服务才能生效" />
        {/* Redis 配置表单 */}
        <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
          <Form.Item label="主机" name="host" rules={[{ required: true, message: "请输入主机" }]}>
            <Input placeholder="localhost" style={{ maxWidth: 360 }} />
          </Form.Item>
          <Form.Item label="端口" name="port" rules={[{ required: true, message: "请输入端口" }]}>
            <InputNumber placeholder="6379" style={{ maxWidth: 200 }} min={1} max={65535} />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password placeholder="可选" style={{ maxWidth: 360 }} />
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

export default RedisConfig;
