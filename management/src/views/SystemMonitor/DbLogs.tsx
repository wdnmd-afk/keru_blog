import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Card, Typography, Space, Select, Input, DatePicker, Button, Tooltip, Modal, message } from "antd";
import { SearchOutlined, ReloadOutlined, CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { KTable, type IKTableColumns } from "shared/components";
import { MonitorApi } from "@/api";
import dayjs, { Dayjs } from "dayjs";

const { Title } = Typography;

// 数据库日志页面（SystemLog），按需请求 + 固定表格高度
const DbLogs: React.FC = () => {
  // 列表与分页状态
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  // 查询条件
  const [source, setSource] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [level, setLevel] = useState<string | undefined>();
  const [keyword, setKeyword] = useState<string>("");
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  // 按需请求门控 + 去重锁
  const [autoFetch, setAutoFetch] = useState(false);
  const fetchLock = useRef(false);
  const lastKeyRef = useRef<string>("");

  // 查看弹窗
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerTitle, setViewerTitle] = useState("");
  const [viewerContent, setViewerContent] = useState("");

  // 容器高度（固定表格滚动）
  const bodyRef = useRef<HTMLDivElement>(null);
  const [bodyH, setBodyH] = useState(0);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const ro = new (window as any).ResizeObserver((entries: any) => {
      const h = entries?.[0]?.contentRect?.height || el.clientHeight;
      setBodyH(h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 级别配色
  const levelStyle = useCallback((lv?: string): React.CSSProperties => {
    const l = String(lv || '').toLowerCase();
    if (l === 'error') return { color: '#a8071a', fontWeight: 600 };
    if (l === 'warn' || l === 'warning') return { color: '#d46b08' };
    if (l === 'info') return { color: '#0958d9' };
    return {};
  }, []);

  // 列定义（稳定引用）
  const columns: IKTableColumns[] = useMemo(() => [
    { title: '时间', dataIndex: 'createdAt', key: 'createdAt', width: 180, render: (v: string) => v ? dayjs(v).format('YYYY-MM-DD HH:mm:ss') : '-' },
    { title: '来源', dataIndex: 'source', key: 'source', width: 120 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 160 },
    { title: '级别', dataIndex: 'level', key: 'level', width: 100, render: (v: string) => <span style={levelStyle(v)}>{v || '-'}</span> },
    { title: '路由', dataIndex: 'route', key: 'route', width: 220, ellipsis: true },
    { title: '说明（中文）', dataIndex: 'message', key: 'message', ellipsis: true },
    {
      title: '操作', key: 'action', width: 160,
      render: (_: any, r: any) => (
        <Space size="small">
          <Tooltip title="复制整条 JSON">
            <Button size="small" type="link" icon={<CopyOutlined />} onClick={async () => { await navigator.clipboard.writeText(JSON.stringify(r, null, 2)); message.success('已复制日志 JSON'); }}>复制</Button>
          </Tooltip>
          <Tooltip title="查看详情">
            <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => { setViewerTitle('数据库日志详情'); setViewerContent(JSON.stringify(r, null, 2)); setViewerOpen(true); }}>查看</Button>
          </Tooltip>
        </Space>
      )
    },
  ], [levelStyle]);

  // 拉取数据（按需 + 去重）
  const fetchLogs = useCallback(async (page: number, size: number) => {
    if (!autoFetch) return;
    const startStr = range && range[0] && range[1] ? range[0]!.toISOString() : '';
    const endStr = range && range[0] && range[1] ? range[1]!.toISOString() : '';
    const key = `p=${page}&ps=${size}&src=${source || ''}&t=${type || ''}&lvl=${level || ''}&kw=${keyword || ''}&st=${startStr}&ed=${endStr}`;
    if (fetchLock.current) return;
    if (lastKeyRef.current === key) return;
    fetchLock.current = true;
    setLoading(true);
    try {
      const params: any = { page, pageSize: size, source, type, level, keyword: keyword || undefined };
      if (startStr && endStr) { params.start = startStr; params.end = endStr; }
      const res = await MonitorApi.dbLogs(params);
      setList(res.items || []);
      setTotal(res.total || 0);
      lastKeyRef.current = key;
    } catch (e: any) {
      message.error(e?.message || '加载数据库日志失败');
    } finally {
      setLoading(false);
      fetchLock.current = false;
    }
  }, [autoFetch, source, type, level, keyword, range]);

  const fetchData = useCallback(async (p: number, ps: number) => {
    if (ps !== pageSize) setPageSize(ps);
    await fetchLogs(p, ps);
  }, [pageSize, fetchLogs]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Card
        title={<Title level={4} style={{ margin: 0 }}>数据库日志（SystemLog）</Title>}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        bodyStyle={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
      >
        <Space className="mb-3" wrap>
          <Select allowClear placeholder="来源（source）" style={{ width: 160 }} value={source} onChange={setSource}
            options={[{ label: 'frontend', value: 'frontend' }, { label: 'management', value: 'management' }, { label: 'server', value: 'server' }]} />
          <Select allowClear placeholder="类型（type）" style={{ width: 180 }} value={type} onChange={setType}
            options={[{ label: 'page_view', value: 'page_view' }, { label: 'api_error', value: 'api_error' }, { label: 'js_error', value: 'js_error' }, { label: 'unhandled_rejection', value: 'unhandled_rejection' }, { label: 'server_error', value: 'server_error' }, { label: 'client_log', value: 'client_log' }]} />
          <Select allowClear placeholder="级别（level）" style={{ width: 140 }} value={level} onChange={setLevel}
            options={[{ label: 'info', value: 'info' }, { label: 'warn', value: 'warn' }, { label: 'error', value: 'error' }]} />
          <Input allowClear style={{ width: 240 }} placeholder="关键字（message/route）" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <DatePicker.RangePicker showTime value={range as any} onChange={(v) => setRange(v as any)} />
          <Button type="primary" icon={<SearchOutlined />} onClick={() => { setAutoFetch(true); fetchLogs(1, pageSize); }}>查询</Button>
          <Button icon={<ReloadOutlined />} onClick={() => { setSource(undefined); setType(undefined); setLevel(undefined); setKeyword(''); setRange(null); setAutoFetch(false); setList([]); setTotal(0); }}>重置</Button>
        </Space>

        <div ref={bodyRef} style={{ flex: 1, minHeight: 0 }}>
          <KTable
            columns={columns}
            dataSource={list}
            rowKey={'id'}
            loading={loading}
            total={total}
            pageSize={pageSize}
            tableLayout="auto"
            stripe
            size="small"
            scroll={{ y: Math.max(120, bodyH - 56) }}
            fetchData={fetchData}
          />
        </div>
      </Card>

      <Modal open={viewerOpen} title={viewerTitle || '日志详情'} onCancel={() => setViewerOpen(false)} footer={null} width={900}>
        <pre style={{ whiteSpace: 'pre-wrap', margin: 0, maxHeight: '70vh', overflow: 'auto' }}>{viewerContent}</pre>
      </Modal>
    </div>
  );
};

export default DbLogs;
