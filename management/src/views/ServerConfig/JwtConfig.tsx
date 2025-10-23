import React, { useEffect, useState } from "react";
import { Card, Typography, Form, Input, Button, Space, Alert, message, Select } from "antd";
import { ConfigApi, type ServerSideConfig } from "@/api";

const { Title, Text } = Typography;

const options = [
  { label: "12 小时", value: "12h" },
  { label: "1 天", value: "1d" },
  { label: "7 天", value: "7d" },
  { label: "30 天", value: "30d" },
];

const JwtConfig: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 加载服务端配置（JWT 部分）
  useEffect(() => {
    const run = async () => {
      try {
        const cfg = await ConfigApi.getServerConfig();
        form.setFieldsValue({ expiresIn: cfg?.jwt?.expiresIn || "1d" });
      } catch (e: any) {
        message.error(e?.message || "加载配置失败");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [form]);

  // 保存 JWT 配置
  const handleSave = async (values: { expiresIn?: string }) => {
    setSaving(true);
    try {
      const payload: Partial<ServerSideConfig> = { jwt: { expiresIn: values.expiresIn } };
      await ConfigApi.saveServerConfig(payload);
      message.success("已保存 JWT 配置（部分配置需重启服务生效）");
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
          JWT 配置
        </Title>
        <Text type="secondary">配置 JWT 认证相关设置</Text>
      </div>

      <Card loading={loading} title="Token 设置">
        <Alert type="info" showIcon className="mb-4" message="提示：修改 Token 失效时间后，可能需要重启服务才能生效" />
        {/* JWT 配置表单 */}
        <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
          <Form.Item label="Token 过期时间 (expiresIn)" name="expiresIn" rules={[{ required: true, message: "请输入或选择过期时间" }]}> 
            <Select options={options} allowClear showSearch placeholder="例如：1d/12h/30d" style={{ maxWidth: 240 }} />
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

export default JwtConfig;
