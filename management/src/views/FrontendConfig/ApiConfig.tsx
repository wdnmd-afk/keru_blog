import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Form, Input, Space, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ConfigApi, type FrontendConfig } from "@/api";

const { Title, Text } = Typography;

const ApiConfig: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 加载 API 配置
  useEffect(() => {
    const run = async () => {
      try {
        const cfg = await ConfigApi.getFrontendConfig();
        form.setFieldsValue({
          devApiBaseUrl: cfg?.api?.devApiBaseUrl || "/dev-api",
          managementApiBaseUrl: cfg?.api?.managementApiBaseUrl || "/management-api",
        });
      } catch (e: any) {
        message.error(e?.message || "加载配置失败");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [form]);

  const handleSave = async (values: { devApiBaseUrl?: string; managementApiBaseUrl?: string }) => {
    setSaving(true);
    try {
      const payload: Partial<FrontendConfig> = {
        api: {
          devApiBaseUrl: values.devApiBaseUrl,
          managementApiBaseUrl: values.managementApiBaseUrl,
        },
      };
      await ConfigApi.saveFrontendConfig(payload);
      // 广播配置变更事件，让 App.tsx 即时应用 API 前缀
      window.dispatchEvent(new CustomEvent<Partial<FrontendConfig>>("management:frontend-config-updated", { detail: payload } as any));
      message.success("已保存 API 配置");
    } catch (e: any) {
      message.error(e?.message || "保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/frontend-config")}
          className="mr-4"
        >
          返回
        </Button>
        <div>
          <Title level={2} className="mb-0">
            API 配置
          </Title>
          <Text type="secondary">管理前端项目的 API 接口配置</Text>
        </div>
      </div>

      <Card loading={loading} title="API 配置">
        {/* API 配置表单 */}
        <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
          <Form.Item label="前台开发代理前缀 (dev-api)" name="devApiBaseUrl">
            <Input placeholder="/dev-api" style={{ maxWidth: 360 }} />
          </Form.Item>
          <Form.Item label="管理端代理前缀 (management-api)" name="managementApiBaseUrl">
            <Input placeholder="/management-api" style={{ maxWidth: 360 }} />
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

export default ApiConfig;
