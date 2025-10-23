import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, Typography, Tabs, Button, Space, Tag, Tooltip, Modal, message } from "antd";
import { ReloadOutlined, CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { KTable, type IKTableColumns } from "shared/components";
import { MonitorApi } from "@/api";
import dayjs from "dayjs";

const { Title, Text } = Typography;

// 文件日志页面（Tab 按类别切换），按需请求 + 固定高度表格
// 说明：表格放在 flex:1 的容器中，页面不出现滚动条，按按钮触发请求
const FileLogs: React.FC = () => {
  // 类别与选中项
  const [categories, setCategories] = useState<string[]>(["app", "access", "error", "management"]);
  const [active, setActive] = useState<string>("app");

  // 数据与分页
  type FileLogRow = {
    id: string;
    ts?: string;
    source?: string;
    type?: string;
    level?: string;
    message?: string;
    route?: string;
    raw: string;
  };
  const [list, setList] = useState<FileLogRow[]>([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [loading, setLoading] = useState(false);

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

  // 初始化类别
  useEffect(() => {
    (async () => {
      try {
        const types = await MonitorApi.logTypes();
        if (Array.isArray(types) && types.length > 0) {
          setCategories(types);
          setActive(types[0]);
        }
      } catch {
        // 保持默认
      }
    })();
  }, []);

  // JSON 行解析为结构化
  const parseLine = useCallback((line: string): FileLogRow => {
    try {
      const obj = JSON.parse(line);
      return {
        id: `${obj.ts || obj.time || Date.now()}_${Math.random()}`,
        ts: obj.ts || obj.time,
        source: obj.source,
        type: obj.type,
        level: obj.level,
        message: obj.message,
        route: obj?.context?.route,
        raw: line,
      };
    } catch {
      return {
        id: `${Date.now()}_${Math.random()}`,
        message: line,
        raw: line,
      } as FileLogRow;
    }
  }, []);

  // 级别配色（中文注释：严重 error 深红）
  const levelStyle = useCallback((level?: string): React.CSSProperties => {
    const l = String(level || '').toLowerCase();
    if (l === 'error') return { color: '#a8071a', fontWeight: 600 };
    if (l === 'warn' || l === 'warning') return { color: '#d46b08' };
    if (l === 'info') return { color: '#0958d9' };
    return {};
  }, []);

  // 列定义（仅依赖 active）
  const columns: IKTableColumns[] = useMemo(() => [
    { title: '时间', dataIndex: 'ts', key: 'ts', width: 180, render: (v: string) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm:ss') : '-') },
    { title: '来源', dataIndex: 'source', key: 'source', width: 120, render: (v: string) => v || active?.toUpperCase() },
    { title: '类型', dataIndex: 'type', key: 'type', width: 160, render: (v: string) => v || '-' },
    { title: '级别', dataIndex: 'level', key: 'level', width: 100, render: (v: string) => <span style={levelStyle(v)}>{v || '-'}</span> },
    { title: '说明（中文）', dataIndex: 'message', key: 'message', ellipsis: true, render: (v: string, r: FileLogRow) => v || r.raw },
    { title: '路由', dataIndex: 'route', key: 'route', width: 200, ellipsis: true, render: (v: string) => v || '-' },
    {
      title: '操作', key: 'action', width: 160,
      render: (_: any, r: FileLogRow) => (
        <Space size="small">
          <Tooltip title="复制原始日志">
            <Button size="small" type="link" icon={<CopyOutlined />} onClick={async () => { await navigator.clipboard.writeText(r.raw); message.success('已复制原始日志'); }}>复制</Button>
          </Tooltip>
          <Tooltip title="查看原文">
            <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => { setViewerTitle('文件日志原文'); setViewerContent(r.raw || ''); setViewerOpen(true); }}>查看</Button>
          </Tooltip>
        </Space>
      )
    },
  ], [active, levelStyle]);

  // 请求逻辑（去重）
  const fetchLogs = useCallback(async (page: number, size: number) => {
    if (!active) return;
    const key = `${active}:${page}:${size}`;
    if (fetchLock.current) return;
    if (lastKeyRef.current === key) return;
    fetchLock.current = true;
    setLoading(true);
    try {
      const offset = Math.max(0, (page - 1) * size);
      const res = await MonitorApi.logsByType(active, offset, size);
      const rows = (res?.lines || []).filter(Boolean).map((l: string) => parseLine(l));
      setList(rows);
      setTotal(res?.total || 0);
      lastKeyRef.current = key;
    } catch (e: any) {
      message.error(e?.message || '加载日志失败');
    } finally {
      setLoading(false);
      fetchLock.current = false;
    }
  }, [active, autoFetch, parseLine]);

  // 提供稳定的 fetchData 给 KTable（受 autoFetch 门控）
  const fetchData = useCallback(async (p: number, ps: number) => {
    if (!autoFetch) return;
    if (ps !== pageSize) setPageSize(ps);
    await fetchLogs(p, ps);
  }, [autoFetch, pageSize, fetchLogs]);

  // 初始化与 Tab 切换：自动请求第一页
  useEffect(() => {
    lastKeyRef.current = '';
    // 先手动拉一次，避免 KTable 初次触发
    fetchLogs(1, pageSize);
    // 随后允许 KTable 进行分页等请求
    setAutoFetch(true);
  }, [active]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Card
        title={<Title level={4} style={{ margin: 0 }}>文件日志</Title>}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        bodyStyle={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
      >
        <Space className="mb-3" wrap>
          <Tabs activeKey={active} onChange={setActive} items={categories.map((c) => ({ key: c, label: c.toUpperCase() }))} />
          <Button icon={<ReloadOutlined />} onClick={() => { setAutoFetch(true); fetchLogs(1, pageSize); }} loading={loading}>刷新</Button>
          <Tag color="blue">总行数：{total}</Tag>
          <Text type="secondary" style={{ background: '#f6f7f9', padding: '4px 8px', borderRadius: 4 }}>
            表格区域高度占满剩余空间；点击刷新后开始按需请求
          </Text>
        </Space>

        <div ref={bodyRef} style={{ flex: 1, minHeight: 0 }}>
          <KTable
            key={`file-${active}`}
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

export default FileLogs;
