// 管理端 - 医学检验建议调试页
// 作用：输入/导入检验 JSON，调用后端 /ai/medlab/advice 生成建议，便于联调与验收
// 注意：本页面仅用于管理端内部调试，需管理员登录后访问

import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button, Card, Col, Form, Input, Row, Space, message, Typography, Divider } from "antd";
import { UploadOutlined, PlayCircleOutlined, ClearOutlined, FileTextOutlined, ExperimentOutlined } from "@ant-design/icons";
import MedLabApi, { MedLabAdviceRequest, MedLabAdviceResponse } from "@/api/medlab";

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

// 简单示例数据，便于快速测试
const SAMPLE_JSON = JSON.stringify(
  {
    patient: { gender: "男", age: 32 },
    items: [
      { name: "白细胞计数(WBC)", result: "10.8", unit: "10^9/L", refRange: "3.50-9.50", sampleType: "全血", method: "电阻抗法" },
      { name: "红细胞计数(RBC)", result: "4.10", unit: "10^12/L", refRange: "4.30-5.80", sampleType: "全血" },
      { name: "血红蛋白(HGB)", result: "125", unit: "g/L", refRange: "130-175" },
      { name: "C 反应蛋白(CRP)", result: ">10", unit: "mg/L", refRange: "0-8", sampleType: "血清", method: "免疫比浊法" }
    ],
    context: { department: "体检中心" }
  },
  null,
  2
);

const PDFMedicalAdvice: React.FC = () => {
  // JSON 文本
  const [jsonText, setJsonText] = useState<string>(SAMPLE_JSON);
  // 运行时可覆盖配置
  const [language, setLanguage] = useState<string>("zh-CN");
  const [maxChars, setMaxChars] = useState<number>(450);
  const [systemHeader, setSystemHeader] = useState<string>("");
  const [disclaimer, setDisclaimer] = useState<string>("");

  // 返回的建议
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 文件导入
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 安全解析 JSON
  const parseSafe = useCallback((txt: string): any => {
    try { return JSON.parse(txt || "{}"); } catch { return null; }
  }, []);

  // 触发导入
  const triggerImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 文件选择回调
  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      setJsonText(text);
      message.success("已载入 JSON 文件");
    } catch (err: any) {
      message.error(err?.message || "读取文件失败");
    } finally {
      // 重置 input，避免同一文件不能再次选择
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, []);

  // 提交生成建议
  const handleGenerate = useCallback(async () => {
    const obj = parseSafe(jsonText);
    if (!obj || (!Array.isArray(obj.items) || obj.items.length === 0) && !Array.isArray(obj.data)) {
      message.info("请提供包含 items[] 或 data[] 的检验 JSON 数据");
      return;
    }

    const itemsFromItems = Array.isArray(obj.items)
      ? (obj.items || []).map((it: any) => ({
          name: String(it.name || ""),
          sampleType: it.sampleType ? String(it.sampleType) : undefined,
          method: it.method ? String(it.method) : undefined,
          instrument: it.instrument ? String(it.instrument) : undefined,
          // 统一转 string，兼容数值、">10"、"阴性"等
          result: String(it.result ?? ""),
          unit: it.unit ? String(it.unit) : undefined,
          refRange: it.refRange ? String(it.refRange) : undefined,
        }))
      : undefined;

    const payload: MedLabAdviceRequest & { data?: any[] } = {
      patient: obj.patient,
      // 若 items 不存在或为空，则透传 data 交由后端归一化处理
      ...(itemsFromItems && itemsFromItems.length > 0
        ? { items: itemsFromItems }
        : Array.isArray(obj.data)
        ? { data: obj.data }
        : {}),
      context: obj.context || undefined,
      config: {
        language: language || undefined,
        maxAdviceChars: Number.isFinite(Number(maxChars)) ? Number(maxChars) : undefined,
        systemPromptHeader: systemHeader || undefined,
        disclaimer: disclaimer || undefined,
      },
    };

    setLoading(true);
    setAdvice("");
    try {
      const res = await MedLabApi.generateAdvice(payload);
      setAdvice(res.advice || "");
      message.success("生成完成");
    } catch (e: any) {
      message.error(e?.message || "生成失败");
    } finally {
      setLoading(false);
    }
  }, [jsonText, language, maxChars, systemHeader, disclaimer, parseSafe]);

  // 清空
  const handleClear = useCallback(() => {
    setAdvice("");
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        title={<Space><ExperimentOutlined /> <span>医学检验建议（调试）</span></Space>}
        extra={
          <Space>
            <Button icon={<FileTextOutlined />} onClick={() => setJsonText(SAMPLE_JSON)}>装载示例</Button>
            <Button icon={<UploadOutlined />} onClick={triggerImport}>导入 JSON</Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json,text/plain"
              style={{ display: "none" }}
              onChange={onFileChange}
            />
            <Button type="primary" icon={<PlayCircleOutlined />} loading={loading} onClick={handleGenerate}>生成建议</Button>
            <Button danger icon={<ClearOutlined />} onClick={handleClear}>清空结果</Button>
          </Space>
        }
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minHeight: 0 }}
      >
        <Row gutter={[12, 12]} style={{ flex: 1, minHeight: 0 }}>
          {/* 左侧：请求 JSON 与配置 */}
          <Col span={12} style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Title level={5} style={{ marginTop: 0 }}>请求 JSON</Title>
            <TextArea
              rows={18}
              style={{ flex: 1 }}
              value={jsonText}
              onChange={e => setJsonText(e.target.value)}
              placeholder="请粘贴包含 items[] 的检验 JSON（不含个人隐私）"
            />

            <Divider style={{ margin: "12px 0" }} />

            <Title level={5} style={{ marginTop: 0 }}>运行时配置覆盖（可选）</Title>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item label="语言">
                  <Input placeholder="如 zh-CN 或 en" value={language} onChange={e => setLanguage(e.target.value)} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="最大字数">
                  <Input type="number" placeholder="默认 450" value={maxChars} onChange={e => setMaxChars(Number(e.target.value || 0))} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="系统提示开头">
                  <Input placeholder="可覆盖默认系统角色开头" value={systemHeader} onChange={e => setSystemHeader(e.target.value)} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="免责声明">
                  <Input placeholder="可覆盖默认免责声明" value={disclaimer} onChange={e => setDisclaimer(e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          {/* 右侧：生成结果 */}
          <Col span={12} style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Title level={5} style={{ marginTop: 0 }}>生成结果</Title>
            <TextArea rows={18} style={{ flex: 1 }} value={advice} readOnly placeholder="生成的医学检验建议将显示在此" />
            <Paragraph type="secondary" style={{ marginTop: 8 }}>
              <Text>注：建议仅供健康科普与就医参考，不能替代医生面诊与诊断。</Text>
            </Paragraph>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PDFMedicalAdvice;
