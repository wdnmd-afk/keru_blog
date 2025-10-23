import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Form, Switch, Space, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ConfigApi, type FrontendConfig } from "@/api";

const { Title, Text } = Typography;

const FeatureConfig: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 加载前端功能开关配置
  useEffect(() => {
    const run = async () => {
      try {
        const cfg = await ConfigApi.getFrontendConfig();
        form.setFieldsValue({
          enableFeedback: cfg?.features?.enableFeedback ?? true,
          enablePdf: cfg?.features?.enablePdf ?? true,
          enableWebRTC: cfg?.features?.enableWebRTC ?? false,
          enableSystemMonitor: cfg?.features?.enableSystemMonitor ?? true,
        });
      } catch (e: any) {
        message.error(e?.message || "加载配置失败");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [form]);

  const handleSave = async (values: any) => {
    setSaving(true);
    try {
      const payload: Partial<FrontendConfig> = {
        features: {
          enableFeedback: !!values.enableFeedback,
          enablePdf: !!values.enablePdf,
          enableWebRTC: !!values.enableWebRTC,
          enableSystemMonitor: !!values.enableSystemMonitor,
        },
      };
      await ConfigApi.saveFrontendConfig(payload);
      // 广播配置变更事件，便于界面即时响应功能开关
      window.dispatchEvent(new CustomEvent<Partial<FrontendConfig>>("management:frontend-config-updated", { detail: payload } as any));
      message.success("已保存功能开关");
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
            功能开关
          </Title>
          <Text type="secondary">控制前端项目的功能模块启用状态</Text>
        </div>
      </div>

      <Card loading={loading} title="功能开关">
        {/* 功能开关表单 */}
        <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
          <Form.Item label="意见反馈" name="enableFeedback" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="PDF 相关功能" name="enablePdf" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="WebRTC 功能" name="enableWebRTC" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="系统监控模块" name="enableSystemMonitor" valuePropName="checked">
            <Switch />
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

export default FeatureConfig;
