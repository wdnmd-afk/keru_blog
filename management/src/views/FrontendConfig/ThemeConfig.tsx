import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Form, Radio, Select, message, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ConfigApi, type FrontendConfig } from "@/api";

const { Title, Text } = Typography;

const colorOptions = [
  { label: "默认(#8785a2)", value: "#8785a2" },
  { label: "#71c9ce", value: "#71c9ce" },
  { label: "#3f72af", value: "#3f72af" },
  { label: "#fae3d9", value: "#fae3d9" },
];

const ThemeConfig: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // 加载前端配置（主题部分）
  useEffect(() => {
    const run = async () => {
      try {
        const cfg = await ConfigApi.getFrontendConfig();
        form.setFieldsValue({
          mode: cfg?.theme?.mode || "light",
          primaryColor: cfg?.theme?.primaryColor || "#8785a2",
        });
      } catch (e: any) {
        message.error(e?.message || "加载配置失败");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [form]);

  // 保存主题配置
  const handleSave = async (values: { mode: "light" | "dark"; primaryColor?: string }) => {
    setSaving(true);
    try {
      const payload: Partial<FrontendConfig> = {
        theme: { mode: values.mode, primaryColor: values.primaryColor },
      };
      await ConfigApi.saveFrontendConfig(payload);
      // 广播配置变更事件，让 App.tsx 即时应用主题
      window.dispatchEvent(new CustomEvent<Partial<FrontendConfig>>("management:frontend-config-updated", { detail: payload } as any));
      message.success("已保存主题配置");
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
            主题设置
          </Title>
          <Text type="secondary">配置前端项目的主题色彩和样式</Text>
        </div>
      </div>

      <Card loading={loading} title="主题配置">
        {/* 主题设置表单：包含主题模式与主色选择 */}
        <Form form={form} layout="vertical" onFinish={handleSave} disabled={saving}>
          <Form.Item label="主题模式" name="mode" rules={[{ required: true, message: "请选择主题模式" }]}> 
            <Radio.Group>
              <Radio.Button value="light">浅色</Radio.Button>
              <Radio.Button value="dark">深色</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="主色（影响主视觉）" name="primaryColor">
            <Select
              options={colorOptions}
              style={{ maxWidth: 320 }}
              placeholder="请选择主色"
              allowClear
            />
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

export default ThemeConfig;
