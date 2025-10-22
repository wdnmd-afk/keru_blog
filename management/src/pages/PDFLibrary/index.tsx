// PDF 文件库页面：列出已生成的 PDF，支持按模板筛选与预览
// 说明：通过 /management-api 访问后端 /api/htmlpdf/list 接口

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Modal, Select, Space, Tag, message } from "antd";
import { EyeOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import TemplateApi, { type HtmlTemplate, type PdfRecord } from "@/api/template";
import PDFPreviewDrawer from "@/components/PDFPreviewDrawer";
import { KTable, type IKTableColumns } from "shared/components";

const PDFLibrary: React.FC = () => {
  // 模板筛选
  const [tplList, setTplList] = useState<HtmlTemplate[]>([]);
  const [templateId, setTemplateId] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");

  // 列表
  const [list, setList] = useState<PdfRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  // 预览抽屉
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined);
  const [pdfName, setPdfName] = useState<string | undefined>(undefined);

  // 读取 URL 查询参数中的 templateId（若从模板管理跳转）
  useEffect(() => {
    const usp = new URLSearchParams(window.location.search);
    const tid = usp.get("templateId") || undefined;
    if (tid) setTemplateId(tid);
  }, []);

  // 加载模板列表
  const fetchTemplates = useCallback(async () => {
    try {
      const res = await TemplateApi.query({ page: 1, pageSize: 200 });
      setTplList(res.data || []);
    } catch (e: any) {
      message.error(e?.message || "获取模板失败");
    }
  }, []);

  // 查询PDF列表
  const fetchData = useCallback(async (page: number, size: number) => {
    setLoading(true);
    try {
      const all = await TemplateApi.listPdfs(templateId);
      // 关键字过滤（文件名包含）
      const filtered = (all || []).filter(x => !keyword || x.fileName?.toLowerCase().includes(keyword.toLowerCase()));
      setTotal(filtered.length);
      const start = (page - 1) * size;
      const end = start + size;
      setList(filtered.slice(start, end));
      setPageSize(size);
    } catch (e: any) {
      message.error(e?.message || "加载失败");
    } finally {
      setLoading(false);
    }
  }, [templateId, keyword]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  const columns: IKTableColumns[] = useMemo(() => [
    { title: "文件名", dataIndex: "fileName", key: "fileName", ellipsis: true },
    { title: "访问URL", dataIndex: "url", key: "url", ellipsis: true, render: (v: string) => <a href={v} target="_blank" rel="noreferrer">{v}</a> },
    { title: "日期", dataIndex: "dateKey", key: "dateKey", width: 120 },
    { title: "大小(字节)", dataIndex: "size", key: "size", width: 120 },
    { title: "生成时间", dataIndex: "createdAt", key: "createdAt", width: 180 },
    { title: "操作", key: "action", width: 120, render: (_: any, r: PdfRecord) => (
      <Space>
        <Button size="small" icon={<EyeOutlined />} onClick={() => { setPdfUrl(r.url); setPdfName(r.fileName); setPdfOpen(true); }}>预览</Button>
      </Space>
    )}
  ], []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        title="PDF 文件库"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
        extra={
          <Space>
            <Select
              placeholder="按模板筛选"
              allowClear
              style={{ width: 360 }}
              value={templateId}
              onChange={setTemplateId}
              options={(tplList || []).map(x => ({ label: (<span>{x.name} <Tag color={x.type === 'A4' ? 'blue' : x.type === 'A5' ? 'green' : 'default'}>{x.type}</Tag></span>), value: x.id }))}
            />
            <Input placeholder="文件名关键字" allowClear value={keyword} onChange={(e) => setKeyword(e.target.value)} style={{ width: 220 }} />
            <Button type="primary" icon={<SearchOutlined />} onClick={() => fetchData(1, pageSize)}>查询</Button>
            <Button icon={<ReloadOutlined />} onClick={() => { setKeyword(""); fetchData(1, pageSize); }}>重置</Button>
          </Space>
        }
      >
        <div style={{ flex: 1, minHeight: 0 }}>
          <KTable
            columns={columns}
            dataSource={list}
            rowKey={(r: any) => `${r.url}`}
            loading={loading}
            total={total}
            pageSize={pageSize}
            fetchData={fetchData}
            stripe
          />
        </div>
      </Card>

      {/* PDF 预览抽屉 */}
      <PDFPreviewDrawer open={pdfOpen} src={pdfUrl} fileName={pdfName} onClose={() => setPdfOpen(false)} />
    </div>
  );
};

export default PDFLibrary;
