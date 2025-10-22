// 模板管理页面（列表 + 编辑）
// 说明：先用 TextArea 作为模板编辑器（后续可替换 Monaco），右侧提供 HTML/生成PDF预览
// 风格与布局参考 `management/src/pages/FeedbackManagement/index.tsx`

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Drawer, Form, Input, InputNumber, Modal, Select, Space, Tabs, Tag, Switch, message } from "antd";
import { PlusOutlined, SearchOutlined, ReloadOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CodeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { KTable, type IKTableColumns } from "shared/components";
import TemplateApi, { type HtmlTemplate, type QueryTemplateRequest, type TemplateType, type UpsertTemplateRequest, type GeneratePdfRequest } from "@/api/template";
import PDFPreviewDrawer from "@/components/PDFPreviewDrawer";

const { TextArea } = Input;

// 模板类型选项
const TYPE_OPTIONS: { label: string; value: TemplateType }[] = [
  { label: "A4", value: "A4" },
  { label: "A5", value: "A5" },
  { label: "自定义", value: "CUSTOM" },
];

const formatDateTime = (v: string | number) => {
  try {
    const d = new Date(v);
    if (!d || Number.isNaN(d.getTime())) return "-";
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  } catch {
    return "-";
  }
};

// 列表页 + 编辑抽屉
const TemplateManagement: React.FC = () => {
  const navigate = useNavigate();
  // 列表状态
  const [list, setList] = useState<HtmlTemplate[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // 查询条件
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState<TemplateType | undefined>();

  // 编辑抽屉/预览
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<HtmlTemplate | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  // PDF 预览抽屉
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined);
  const [pdfName, setPdfName] = useState<string | undefined>(undefined);
  const [pdfSize, setPdfSize] = useState<number | undefined>(undefined);

  const [form] = Form.useForm<UpsertTemplateRequest>();
  // 监听表单中的当前模板类型，用于控制宽高禁用与默认赋值
  const editType = Form.useWatch("type", form) as TemplateType | undefined;

  // 当类型为 A4/A5 时，自动设置标准尺寸并禁用宽高输入；CUSTOM 则允许编辑
  useEffect(() => {
    if (!open) return; // 仅在抽屉打开时生效，避免干扰查询表单
    if (editType === "A4") {
      form.setFieldsValue({ widthMm: 210, heightMm: 297 });
    } else if (editType === "A5") {
      form.setFieldsValue({ widthMm: 148, heightMm: 210 });
    }
    // CUSTOM 情况不强制设值，交由用户填写
  }, [editType, open, form]);

  // 表头列
  const columns: IKTableColumns[] = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id", width: 220, ellipsis: true },
      { title: "名称", dataIndex: "name", key: "name", minWidth: 220, ellipsis: true },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 120,
        render: (v: TemplateType) => (
          <Tag color={v === "A4" ? "blue" : v === "A5" ? "green" : "default"}>{v}</Tag>
        ),
      },
      { title: "更新时间", dataIndex: "updatedAt", key: "updatedAt", width: 200, render: (v: any) => formatDateTime(v) },
      {
        title: "操作",
        key: "action",
        width: 260,
        render: (_: any, record: HtmlTemplate) => (
          <Space>
            <Button size="small" icon={<EyeOutlined />} onClick={() => handlePreviewHtml(record)}>预览HTML</Button>
            <Button size="small" icon={<FilePdfOutlined />} onClick={() => handlePreviewPdf(record)}>生成PDF</Button>
            <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
            <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>删除</Button>
          </Space>
        ),
      },
    ],
    [],
  );

  // 查询
  const fetchData = useCallback(
    async (curPage: number, curSize: number) => {
      setLoading(true);
      try {
        const params: QueryTemplateRequest = {
          page: curPage,
          pageSize: curSize,
          keyword: keyword || undefined,
          type: type || undefined,
        };
        const res = await TemplateApi.query(params);
        setList(res.data || []);
        setTotal(res.total || 0);
        setPage(res.page || curPage);
        setPageSize(res.pageSize || curSize);
      } catch (e) {
        console.error("[Template] query error", e);
      } finally {
        setLoading(false);
      }
    },
    [keyword, type],
  );

  const handleSearch = () => fetchData(1, pageSize);
  const handleReset = () => {
    setKeyword("");
    setType(undefined);
    fetchData(1, pageSize);
  };

  // 新建
  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    // 新建默认 A4，并自动赋值标准尺寸
    form.setFieldsValue({
      type: "A4",
      widthMm: 210,
      heightMm: 297,
      // 模板级页眉/页脚默认值
      displayHeaderFooter: true,
      headerHeightMm: 15,
      footerHeightMm: 15,
    } as any);
    setOpen(true);
  };

  // 编辑
  const handleEdit = (record: HtmlTemplate) => {
    setEditing(record);
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      type: record.type,
      content: record.content,
      widthMm: record.widthMm ?? undefined,
      heightMm: record.heightMm ?? undefined,
      fields: record.fields ? JSON.stringify(record.fields, null, 2) : undefined,
      remark: record.remark ?? undefined,
      // 模板级页眉/页脚
      displayHeaderFooter: record.displayHeaderFooter ?? true,
      headerHeightMm: record.headerHeightMm ?? 15,
      footerHeightMm: record.footerHeightMm ?? 15,
      headerHtml: record.headerHtml ?? undefined,
      footerHtml: record.footerHtml ?? undefined,
    } as any);
    setOpen(true);
  };

  // 删除
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "确认删除该模板？",
      onOk: async () => {
        await TemplateApi.remove(id);
        message.success("删除成功");
        fetchData(page, pageSize);
      },
    });
  };

  // 保存（创建/更新）
  const handleSave = async () => {
    const values = await form.validateFields();
    const payload: UpsertTemplateRequest = {
      ...values,
      // fields 文本转换为对象
      fields: values.fields ? parseJsonSafe(values.fields) : undefined,
    } as any;
    if (editing?.id) payload.id = editing.id;

    if (!payload.content || !payload.name || !payload.type) {
      return message.error("请完善必填项");
    }

    if (payload.type === "CUSTOM") {
      if (!payload.widthMm || !payload.heightMm) {
        return message.error("自定义尺寸需要填写宽高(mm)");
      }
    }

    if (editing?.id) {
      await TemplateApi.update(payload);
      message.success("更新成功");
    } else {
      await TemplateApi.create(payload);
      message.success("创建成功");
    }

    setOpen(false);
    fetchData(page, pageSize);
  };

  // 预览 HTML
  const handlePreviewHtml = async (record: HtmlTemplate) => {
    try {
      // 预览时注入模板级页眉/页脚
      const html = await TemplateApi.renderHtml({ templateId: record.id, data: {}, sanitize: true, previewHeaderFooter: true });
      setPreviewHtml(html);
      setPreviewOpen(true);
    } catch (e: any) {
      message.error(e?.message || "预览失败");
    }
  };

  // 生成并预览 PDF（简化：使用新窗口 iframe 加载 URL）
  const handlePreviewPdf = async (record: HtmlTemplate) => {
    try {
      const result = await TemplateApi.generatePdf({ templateId: record.id, data: {}, sanitize: true } as GeneratePdfRequest);
      setPdfUrl(result.url);
      setPdfName(result.fileName);
      setPdfSize(result.size);
      setPdfOpen(true);
    } catch (e: any) {
      message.error(e?.message || "生成失败");
    }
  };

  // 工具
  const parseJsonSafe = (txt?: string) => {
    if (!txt) return undefined;
    try { return JSON.parse(txt); } catch { return undefined; }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        title="模板管理"
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新建模板</Button>}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
      >
        {/* 搜索区域 */}
        <Space wrap size={16} style={{ marginBottom: 16 }}>
          <Input
            placeholder="模板名称关键字"
            allowClear
            style={{ width: 240 }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Select
            placeholder="模板类型"
            allowClear
            options={TYPE_OPTIONS}
            style={{ width: 160 }}
            value={type}
            onChange={setType}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>查询</Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>重置</Button>
        </Space>

        {/* 表格区域 */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <KTable
            columns={columns}
            dataSource={list}
            rowKey="id"
            loading={loading}
            total={total}
            pageSize={pageSize}
            stripe
            size="middle"
            tableLayout="auto"
            showSorterTooltip={{ rootClassName: 'sorter-tooltip-blue' }}
            fetchData={fetchData}
            rowDoubleClick={(record: HtmlTemplate) => navigate(`/pdf-library?templateId=${record.id}`)}
          />
        </div>
      </Card>

      {/* 编辑抽屉 */}
      <Drawer
        title={editing ? "编辑模板" : "新建模板"}
        open={open}
        onClose={() => setOpen(false)}
        width={920}
        extra={<Space><Button onClick={() => setOpen(false)}>取消</Button><Button type="primary" onClick={handleSave}>保存</Button></Space>}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="模板名称" name="name" rules={[{ required: true, message: '请输入模板名称' }]}>
            <Input placeholder="例如：出货单模板_v1" />
          </Form.Item>

          <Space size={16} style={{ width: '100%' }}>
            <Form.Item label="类型" name="type" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Select options={TYPE_OPTIONS} />
            </Form.Item>
            <Form.Item label="宽(mm) - CUSTOM 生效" name="widthMm" style={{ width: 180 }}>
              <InputNumber style={{ width: '100%' }} min={10} max={1000} disabled={editType !== 'CUSTOM'} />
            </Form.Item>
            <Form.Item label="高(mm) - CUSTOM 生效" name="heightMm" style={{ width: 180 }}>
              <InputNumber style={{ width: '100%' }} min={10} max={1000} disabled={editType !== 'CUSTOM'} />
            </Form.Item>
          </Space>

          <Form.Item label="备注" name="remark">
            <Input placeholder="可选" />
          </Form.Item>

          {/* 模板级页眉/页脚配置 */}
          <Card size="small" title="页眉/页脚配置（模板级，PDF 生成时默认生效）" style={{ marginBottom: 12 }}>
            <Space wrap size={16}>
              <Form.Item label="固定页眉/页脚" name="displayHeaderFooter" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="页眉高度(mm)" name="headerHeightMm">
                <InputNumber min={0} max={100} style={{ width: 160 }} />
              </Form.Item>
              <Form.Item label="页脚高度(mm)" name="footerHeightMm">
                <InputNumber min={0} max={100} style={{ width: 160 }} />
              </Form.Item>
            </Space>
            <Space align="start" size={16} wrap style={{ marginTop: 12 }}>
              <Form.Item label="页眉 HTML（可选）" name="headerHtml" style={{ flex: 1, minWidth: 380 }}>
                <TextArea rows={6} placeholder="可包含 {{变量}}；Puppeteer 支持 .title/.date 默认占位" />
              </Form.Item>
              <Form.Item label="页脚 HTML（可选）" name="footerHtml" style={{ flex: 1, minWidth: 380 }}>
                <TextArea rows={6} placeholder="可包含 {{变量}}；可用 .pageNumber/.totalPages 显示页码" />
              </Form.Item>
            </Space>
          </Card>

          <Tabs
            items={[
              {
                key: 'html',
                label: (<span><CodeOutlined /> 模板HTML</span>),
                children: (
                  <Form.Item name="content" rules={[{ required: true, message: '请输入模板HTML' }]}> 
                    <TextArea rows={14} placeholder="支持 {{变量}} 语法；请使用内联样式或本地 /static 资源" />
                  </Form.Item>
                )
              },
              {
                key: 'fields',
                label: '字段定义(JSON)',
                children: (
                  <Form.Item name="fields"> 
                    <TextArea rows={10} placeholder='示例: [{"key":"company","label":"公司","type":"text","required":true}]' />
                  </Form.Item>
                )
              }
            ]}
          />

          <Space>
            <Button onClick={async () => {
              try {
                const id = editing?.id;
                if (!id) return message.info('请先保存模板后再预览');
                const html = await TemplateApi.renderHtml({ templateId: id, data: {}, sanitize: true });
                setPreviewHtml(html);
                setPreviewOpen(true);
              } catch (e: any) {
                message.error(e?.message || '预览失败');
              }
            }}>预览HTML</Button>
          </Space>
        </Form>
      </Drawer>

      {/* HTML 预览对话框 */}
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

export default TemplateManagement;
