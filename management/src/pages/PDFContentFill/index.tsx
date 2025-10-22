// 管理端 PDF 内容填充页面
// 功能：选择模板 -> 填写数据（可视化表单或 JSON 文本）-> 设置页眉/页脚 -> 预览HTML/生成PDF
// 说明：迁移自前台 PDFGenerator，并新增固定页眉/页脚配置（默认开启）

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Form, Input, Modal, Select, Space, Tabs, Tag, message } from "antd";
import { ReloadOutlined, EyeOutlined, FilePdfOutlined } from "@ant-design/icons";
import TemplateApi, { type HtmlTemplate, type TemplateType } from "@/api/template";
import PDFPreviewDrawer from "@/components/PDFPreviewDrawer";

const { TextArea } = Input;

// 模板类型颜色标签
const TypeTag: React.FC<{ type: TemplateType }> = ({ type }) => {
  const color = type === "A4" ? "blue" : type === "A5" ? "green" : "default";
  return <Tag color={color}>{type}</Tag>;
};

const PDFFill: React.FC = () => {
  // 模板列表与选择
  const [tplList, setTplList] = useState<HtmlTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [templateId, setTemplateId] = useState<string | undefined>();

  // 字段 schema（用于动态表单）
  const [fieldsSchema, setFieldsSchema] = useState<any[] | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "json">("form");

  // 页眉/页脚改由模板级配置维护，此处不再设置

  // 表单实例
  const [form] = Form.useForm();

  // JSON 文本
  const [dataJson, setDataJson] = useState<string>(
    JSON.stringify({
      title: "管理端PDF示例",
      hospital: { name: "某某医院" },
      patient: { name: "张三", gender: "男", age: 32 },
      report: { reportDate: "2025-10-21", sampleType: "全血" },
    }, null, 2),
  );

  // 预览窗口
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  // PDF 抽屉预览
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined);
  const [pdfName, setPdfName] = useState<string | undefined>(undefined);

  // 扁平化/反扁平化
  const flatten = useCallback((obj: any, prefix = "", out: Record<string, any> = {}) => {
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      for (const k of Object.keys(obj)) {
        const p = prefix ? `${prefix}.${k}` : k;
        flatten(obj[k], p, out);
      }
    } else {
      out[prefix] = obj;
    }
    return out;
  }, []);

  const unflatten = useCallback((flat: Record<string, any>) => {
    const res: any = {};
    for (const [path, value] of Object.entries(flat)) {
      if (!path) continue;
      const keys = path.split(".");
      let cur = res;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (i === keys.length - 1) {
          cur[key] = value;
        } else {
          if (typeof cur[key] !== "object" || cur[key] === null) cur[key] = {};
          cur = cur[key];
        }
      }
    }
    return res;
  }, []);

  const parseJsonSafe = useCallback((txt?: string) => {
    if (!txt) return {};
    try { return JSON.parse(txt); } catch { return {}; }
  }, []);

  // 拉取模板列表
  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await TemplateApi.query({ page: 1, pageSize: 100 });
      setTplList(res.data || []);
    } catch (e: any) {
      message.error(e?.message || "获取模板失败");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  // 当选择模板时，拉取详情并回填 fields
  useEffect(() => {
    const run = async () => {
      if (!templateId) {
        setFieldsSchema(null);
        return;
      }
      try {
        const detail = await TemplateApi.detail(templateId);
        let fs: any = detail?.fields ?? null;
        if (typeof fs === "string") { try { fs = JSON.parse(fs); } catch { fs = null; } }
        setFieldsSchema(Array.isArray(fs) ? fs : null);
        const flat = flatten(parseJsonSafe(dataJson));
        form.setFieldsValue(flat);
        setActiveTab(Array.isArray(fs) && fs.length > 0 ? "form" : "json");
      } catch (e) {
        setFieldsSchema(null);
        setActiveTab("json");
      }
    };
    run();
  }, [templateId, dataJson, form, flatten, parseJsonSafe]);

  // 动态渲染表单项
  const renderFormItems = useMemo(() => {
    if (!fieldsSchema || fieldsSchema.length === 0) return null;
    return fieldsSchema.map((f: any) => {
      const name = String(f.key || "");
      const label = String(f.label || name);
      const required = !!f.required;
      const placeholder = f.placeholder || `请输入${label}`;
      const type = String(f.type || "text");

      let inputNode: React.ReactNode = null;
      if (type === "select") {
        const options = (Array.isArray(f.options) ? f.options : []).map((x: any) => ({ label: String(x), value: x }));
        inputNode = <Select options={options} placeholder={placeholder} allowClear />;
      } else if (type === "textarea") {
        inputNode = <TextArea rows={4} placeholder={placeholder} />;
      } else {
        inputNode = <Input placeholder={placeholder} />; // 简化：统一使用 Input，可扩展为 number/date 等
      }

      return (
        <Form.Item key={name} name={name} label={label} rules={required ? [{ required: true, message: `请输入${label}` }] : []}>
          {inputNode}
        </Form.Item>
      );
    });
  }, [fieldsSchema]);

  // 表单变更 -> 更新 JSON
  const handleFormChange = useCallback((_changed: any, allValues: any) => {
    const nested = unflatten(allValues || {});
    setDataJson(JSON.stringify(nested, null, 2));
  }, [unflatten]);

  // JSON 文本变更 -> 如果有 schema 则回填表单
  const handleJsonChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setDataJson(v);
    if (fieldsSchema && Array.isArray(fieldsSchema) && fieldsSchema.length > 0) {
      try {
        const obj = JSON.parse(v || "{}");
        form.setFieldsValue(flatten(obj));
      } catch { /* ignore */ }
    }
  }, [fieldsSchema, form, flatten]);

  // 预览 HTML
  const handlePreviewHtml = async () => {
    if (!templateId) return message.info("请先选择模板");
    try {
      // 预览时注入模板配置的页眉/页脚
      const html = await TemplateApi.renderHtml({ templateId, data: parseJsonSafe(dataJson), sanitize: true, previewHeaderFooter: true });
      setPreviewHtml(html);
      setPreviewOpen(true);
    } catch (e: any) {
      message.error(e?.message || "预览失败");
    }
  };

  // 生成 PDF（使用模板级头尾配置）
  const handleGeneratePdf = async () => {
    if (!templateId) return message.info("请先选择模板");
    try {
      const result = await TemplateApi.generatePdf({ templateId, data: parseJsonSafe(dataJson), sanitize: true });
      setPdfUrl(result.url);
      setPdfName(result.fileName);
      setPdfOpen(true);
    } catch (e: any) {
      message.error(e?.message || "生成失败");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        title="PDF 内容填充"
        extra={<Space>
          <Button icon={<ReloadOutlined />} onClick={fetchTemplates} loading={loading}>刷新模板</Button>
          <Button type="primary" icon={<EyeOutlined />} onClick={handlePreviewHtml}>预览HTML</Button>
          <Button type="primary" icon={<FilePdfOutlined />} onClick={handleGeneratePdf}>生成PDF</Button>
        </Space>}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
      >
        {/* 顶部：模板选择 */}
        <Space wrap size={12} style={{ marginBottom: 12 }}>
          <Select
            placeholder="请选择模板"
            style={{ width: 360 }}
            value={templateId}
            options={(tplList || []).map(x => ({ label: (<span>{x.name} <TypeTag type={x.type} /></span>), value: x.id }))}
            onChange={setTemplateId}
            allowClear
            showSearch
            optionFilterProp="label"
          />
        </Space>

        {/* 中部：页眉/页脚配置已迁移到模板管理，此处仅进行数据填写 */}

        {/* 底部：数据录入 */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <Tabs
            activeKey={activeTab}
            onChange={(k) => setActiveTab(k as any)}
            items={[
              {
                key: "form",
                label: "可视化表单",
                children: (
                  <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
                    {renderFormItems}
                  </Form>
                )
              },
              {
                key: "json",
                label: "JSON 文本",
                children: (
                  <TextArea rows={18} value={dataJson} onChange={handleJsonChange} placeholder="与模板中 {{变量}} 对应的 JSON 数据" />
                )
              }
            ]}
          />
        </div>
      </Card>

      {/* HTML 预览 */}
      <Modal title="HTML 预览" open={previewOpen} width={980} footer={null} onCancel={() => setPreviewOpen(false)}>
        <div style={{ height: 600, border: '1px solid #f0f0f0' }}>
          <iframe title="html-preview" style={{ width: '100%', height: '100%', border: 0 }} srcDoc={previewHtml} />
        </div>
      </Modal>

      {/* PDF 抽屉预览 */}
      <PDFPreviewDrawer
        open={pdfOpen}
        src={pdfUrl}
        fileName={pdfName}
        onClose={() => setPdfOpen(false)}
      />
    </div>
  );
};

export default PDFFill;