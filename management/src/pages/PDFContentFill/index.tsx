// 管理端 PDF 内容填充页面
// 功能：选择模板 -> 填写数据（可视化表单或 JSON 文本）-> 设置页眉/页脚 -> 预览HTML/生成PDF
// 说明：迁移自前台 PDFGenerator，并新增固定页眉/页脚配置（默认开启）

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Form, Input, Modal, Select, Space, Tabs, Tag, message, Row, Col, Table, Popconfirm } from "antd";
import { ReloadOutlined, EyeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  // 预览窗口
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  // 类型别名：CBC 行项目
  type CbcItem = { name: string; result: string; unit: string; refRange: string; flag: "H" | "L" | "N" }
  // 数组编辑：CBC 项目与 QA 列表
  const [cbcItems, setCbcItems] = useState<CbcItem[]>([]);
  const [qaList, setQaList] = useState<Array<{ q: string; a: string }>>([]);
  // PDF 抽屉预览
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined);
  const [pdfName, setPdfName] = useState<string | undefined>(undefined);
  // 批量生成参数
  const [batchCount, setBatchCount] = useState<number>(10);
  const [batching, setBatching] = useState<boolean>(false);

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

  // 将数组状态写回 JSON 文本
  const syncArraysToJson = useCallback((nextItems: typeof cbcItems | null, nextQa: typeof qaList | null) => {
    const base = parseJsonSafe(dataJson);
    const newObj: any = { ...base };
    if (!newObj.cbc) newObj.cbc = {};
    if (nextItems) newObj.cbc.items = nextItems;
    if (nextQa) newObj.qa = nextQa;
    setDataJson(JSON.stringify(newObj, null, 2));
  }, [dataJson, parseJsonSafe]);

  // CBC 行编辑辅助
  const updateCbcItem = useCallback((index: number, field: keyof CbcItem, value: any) => {
    setCbcItems(prev => {
      const next = [...prev] as CbcItem[];
      if (field === 'flag') {
        next[index] = { ...next[index], flag: (value as 'H' | 'L' | 'N') };
      } else {
        (next[index] as any)[field] = value;
      }
      syncArraysToJson(next, null);
      return next;
    });
  }, [syncArraysToJson]);

  const addCbcItem = useCallback(() => {
    setCbcItems(prev => {
      const row: CbcItem = { name: "", result: "", unit: "", refRange: "", flag: 'N' };
      const next: CbcItem[] = [...prev, row];
      syncArraysToJson(next, null);
      return next;
    });
  }, [syncArraysToJson]);

  const removeCbcItem = useCallback((index: number) => {
    setCbcItems(prev => {
      const next = prev.filter((_, i) => i !== index);
      syncArraysToJson(next, null);
      return next;
    });
  }, [syncArraysToJson]);

  const clearCbcItems = useCallback(() => {
    setCbcItems(() => {
      const next: typeof cbcItems = [];
      syncArraysToJson(next, null);
      return next;
    });
  }, [syncArraysToJson]);

  // QA 编辑辅助
  const updateQa = useCallback((index: number, field: keyof (typeof qaList)[number], value: any) => {
    setQaList(prev => {
      const next = [...prev];
      (next[index] as any)[field] = value;
      syncArraysToJson(null, next);
      return next;
    });
  }, [syncArraysToJson]);

  const addQa = useCallback(() => {
    setQaList(prev => {
      const next = [...prev, { q: "", a: "" }];
      syncArraysToJson(null, next);
      return next;
    });
  }, [syncArraysToJson]);

  const removeQa = useCallback((index: number) => {
    setQaList(prev => {
      const next = prev.filter((_, i) => i !== index);
      syncArraysToJson(null, next);
      return next;
    });
  }, [syncArraysToJson]);

  const clearQa = useCallback(() => {
    setQaList(() => {
      const next: typeof qaList = [];
      syncArraysToJson(null, next);
      return next;
    });
  }, [syncArraysToJson]);

  // 生成示例数据：30 条 CBC + 10 条 QA
  const fillCbcSamples = useCallback(() => {
    const names = [
      "白细胞计数(WBC)", "红细胞计数(RBC)", "血红蛋白(HGB)", "红细胞压积(HCT)", "平均红细胞体积(MCV)",
      "平均红细胞血红蛋白含量(MCH)", "平均红细胞血红蛋白浓度(MCHC)", "血小板计数(PLT)", "中性粒细胞百分比(NEU%)",
      "淋巴细胞百分比(LYM%)", "单核细胞百分比(MONO%)", "嗜酸性粒细胞百分比(EOS%)", "嗜碱性粒细胞百分比(BASO%)",
      "中性粒细胞绝对值(NEU#)", "淋巴细胞绝对值(LYM#)", "单核细胞绝对值(MONO#)", "嗜酸性粒细胞绝对值(EOS#)",
      "嗜碱性粒细胞绝对值(BASO#)", "红细胞体积分布宽度(RDW-CV)", "红细胞体积分布宽度(RDW-SD)",
      "血小板体积分布宽度(PDW)", "平均血小板体积(MPV)", "血小板压积(PCT)", "大血小板比率(P-LCR)",
      "网织红细胞计数(RET%)", "网织红细胞绝对值(RET#)", "有核红细胞百分比(NRBC%)", "有核红细胞绝对值(NRBC#)",
      "未成熟粒细胞百分比(IG%)", "未成熟粒细胞绝对值(IG#)"
    ];
    const items: CbcItem[] = names.map((n, idx): CbcItem => ({
      name: n,
      result: String((Math.random() * 10 + (idx % 3 === 0 ? 5 : 0)).toFixed(2)),
      unit: idx < 1 ? "10^9/L" : idx < 3 ? "10^12/L" : "%",
      refRange: idx < 1 ? "3.50-9.50" : idx < 3 ? "3.80-5.10" : "",
      flag: 'N'
    }));
    // 标记状态随机（严格为 'H' | 'L' | 'N'）
    const flagged: CbcItem[] = items.map((it, i) => ({
      ...it,
      flag: (i % 10 === 0 ? 'H' : (i % 15 === 0 ? 'L' : 'N')) as 'H' | 'L' | 'N'
    }));
    setCbcItems(flagged);
    syncArraysToJson(flagged, null);
  }, [syncArraysToJson]);

  const fillQaSamples = useCallback(() => {
    const qa = Array.from({ length: 10 }).map((_, i) => ({
      q: `针对第${i + 1}项指标的解读是什么？`,
      a: `第${i + 1}项指标建议结合临床与复查，若持续异常请咨询相关专科。`
    }));
    setQaList(qa);
    syncArraysToJson(null, qa);
  }, [syncArraysToJson]);

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
        // 从 JSON 初始化数组编辑器
        const base = parseJsonSafe(dataJson) as any;
        setCbcItems(Array.isArray(base?.cbc?.items) ? base.cbc.items : []);
        setQaList(Array.isArray(base?.qa) ? base.qa : []);
      } catch (e) {
        setFieldsSchema(null);
        setActiveTab("json");
      }
    };
    run();
  }, [templateId]);

  // 动态渲染表单项
  const renderFormItems = useMemo(() => {
    if (!fieldsSchema || fieldsSchema.length === 0) return null;
    return (
      <Row gutter={[12, 0]}>
        {fieldsSchema.map((f: any) => {
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
          const span = type === "textarea" || f.colSpan === 24 ? 24 : 12; // 默认一行两列
          return (
            <Col key={name} span={span}>
              <Form.Item name={name} label={label} rules={required ? [{ required: true, message: `请输入${label}` }] : []}>
                {inputNode}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    );
  }, [fieldsSchema]);

  // 表单变更 -> 更新 JSON
  const handleFormChange = useCallback((_changed: any, allValues: any) => {
    const nested = unflatten(allValues || {});
    const base = parseJsonSafe(dataJson);
    const merged = { ...(base as any), ...(nested as any) };
    setDataJson(JSON.stringify(merged, null, 2));
  }, [unflatten, dataJson, parseJsonSafe]);

  // JSON 文本变更 -> 如果有 schema 则回填表单
  const handleJsonChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setDataJson(v);
    if (fieldsSchema && Array.isArray(fieldsSchema) && fieldsSchema.length > 0) {
      try {
        const obj = JSON.parse(v || "{}");
        form.setFieldsValue(flatten(obj));
        setCbcItems(Array.isArray((obj as any)?.cbc?.items) ? (obj as any).cbc.items : []);
        setQaList(Array.isArray((obj as any)?.qa) ? (obj as any).qa : []);
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

  // 批量生成 PDF（移动到组件作用域，供按钮调用）
  const handleBatchGenerate = async () => {
    if (!templateId) return message.info("请先选择模板");
    const count = Math.max(1, Math.min(100, Number(batchCount) || 1));
    setBatching(true);
    try {
      const dataObj = parseJsonSafe(dataJson);
      const ts = Date.now();
      const results: { url: string; fileName: string }[] = [];
      for (let i = 1; i <= count; i++) {
        const fileName = `${templateId}_${ts}_${String(i).padStart(2,'0')}`;
        const r = await TemplateApi.generatePdf({ templateId, data: dataObj, sanitize: true, options: { fileName } });
        results.push({ url: r.url, fileName: r.fileName });
      }
      message.success(`批量生成完成，共 ${results.length} 个。`);
      const last = results[results.length - 1];
      setPdfUrl(last.url);
      setPdfName(last.fileName);
      setPdfOpen(true);
    } catch (e: any) {
      message.error(e?.message || "批量生成失败");
    } finally {
      setBatching(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        title="PDF 内容填充"
        extra={<Space>
          <Button icon={<ReloadOutlined />} onClick={() => fetchTemplates()}>刷新模板</Button>
          <Button type="primary" icon={<EyeOutlined />} onClick={handlePreviewHtml}>预览HTML</Button>
          <Button type="primary" danger icon={<FilePdfOutlined />} onClick={handleGeneratePdf}>生成PDF</Button>
          <Space>
            <Input style={{ width: 120 }} addonBefore="批量数量" type="number" value={batchCount} onChange={(e) => setBatchCount(Number(e.target.value || 0))} />
            <Button loading={batching} onClick={handleBatchGenerate}>批量生成</Button>
            <Button onClick={() => navigate('/pdf-library')}>打开PDF文件库</Button>
          </Space>
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
                  <>
                    <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
                      {renderFormItems}
                    </Form>

                    {/* CBC items 数组编辑 */}
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>检测项目结果数据（cbc.items）</div>
                      <Space size="small" style={{ marginBottom: 8 }}>
                        <Button onClick={addCbcItem}>新增一行</Button>
                        <Button onClick={fillCbcSamples}>填充30条示例</Button>
                        <Button danger onClick={clearCbcItems}>清空</Button>
                      </Space>
                      <Table
                        size="small"
                        pagination={{ pageSize: 15 }}
                        dataSource={cbcItems.map((r, i) => ({ ...r, key: i }))}
                        columns={[
                          { title: '项目', dataIndex: 'name', render: (v: any, _r: any, i: number) => <Input value={v} onChange={e => updateCbcItem(i, 'name', e.target.value)} /> },
                          { title: '结果', dataIndex: 'result', render: (v: any, _r: any, i: number) => <Input value={v} onChange={e => updateCbcItem(i, 'result', e.target.value)} /> },
                          { title: '单位', dataIndex: 'unit', render: (v: any, _r: any, i: number) => <Input value={v} onChange={e => updateCbcItem(i, 'unit', e.target.value)} /> },
                          { title: '参考区间', dataIndex: 'refRange', render: (v: any, _r: any, i: number) => <Input value={v} onChange={e => updateCbcItem(i, 'refRange', e.target.value)} /> },
                          { title: '状态', dataIndex: 'flag', width: 120, render: (v: any, _r: any, i: number) => (
                            <Select
                              value={v}
                              onChange={(val) => updateCbcItem(i, 'flag', val)}
                              options={[{label:'正常',value:'N'},{label:'偏高',value:'H'},{label:'偏低',value:'L'}]}
                              style={{ width: 100 }}
                            />
                          ) },
                          { title: '操作', width: 80, render: (_: any, _r: any, i: number) => (
                            <Popconfirm title="删除此行?" onConfirm={() => removeCbcItem(i)}>
                              <a>删除</a>
                            </Popconfirm>
                          ) },
                        ] as any}
                      />
                    </div>

                    {/* QA 数组编辑 */}
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>Q&A 医生建议与解释（qa）</div>
                      <Space size="small" style={{ marginBottom: 8 }}>
                        <Button onClick={addQa}>新增一条</Button>
                        <Button onClick={fillQaSamples}>填充10条示例</Button>
                        <Button danger onClick={clearQa}>清空</Button>
                      </Space>
                      <Table
                        size="small"
                        pagination={{ pageSize: 10 }}
                        dataSource={qaList.map((r, i) => ({ ...r, key: i }))}
                        columns={[
                          { title: '问题', dataIndex: 'q', render: (v: any, _r: any, i: number) => <Input value={v} onChange={e => updateQa(i, 'q', e.target.value)} /> },
                          { title: '解答', dataIndex: 'a', render: (v: any, _r: any, i: number) => <Input value={v} onChange={e => updateQa(i, 'a', e.target.value)} /> },
                          { title: '操作', width: 80, render: (_: any, _r: any, i: number) => (
                            <Popconfirm title="删除此条?" onConfirm={() => removeQa(i)}>
                              <a>删除</a>
                            </Popconfirm>
                          ) },
                        ] as any}
                      />
                    </div>
                  </>
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
        <div style={{ height: '80vh', border: 0, overflow: 'hidden' }}>
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