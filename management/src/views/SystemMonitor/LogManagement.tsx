import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, Typography, Tabs, Input, Button, Space, message, Tag, DatePicker, Select, Tooltip, Modal } from "antd";
import { KTable, type IKTableColumns } from "shared/components";
import { CopyOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { MonitorApi } from "@/api";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;

const LogManagement: React.FC = () => {
  // 日志类别列表与当前选择
  const [categories, setCategories] = useState<string[]>(["app", "access", "error", "management"]);
  const [active, setActive] = useState<string>("app");
  // 文件日志（文件尾分页读取）-> 使用 KTable 展示
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
  const [fileRows, setFileRows] = useState<FileLogRow[]>([]);
  const [fileTotal, setFileTotal] = useState<number>(0);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [filePageSize, setFilePageSize] = useState<number>(50);
  const [fileAutoFetch, setFileAutoFetch] = useState(false);
  const fileFetchLock = useRef(false);
  const fileLastKeyRef = useRef<string>("");

  // ===== 数据库日志（system_logs）相关状态 =====
  const [dbItems, setDbItems] = useState<any[]>([]);
  const [dbTotal, setDbTotal] = useState<number>(0);
  const [dbPage, setDbPage] = useState<number>(1);
  const [dbPageSize, setDbPageSize] = useState<number>(20);
  const [dbLoading, setDbLoading] = useState<boolean>(false);
  // 筛选条件
  const [dbSource, setDbSource] = useState<string | undefined>(undefined);
  const [dbType, setDbType] = useState<string | undefined>(undefined);
  const [dbLevel, setDbLevel] = useState<string | undefined>(undefined);
  const [dbKeyword, setDbKeyword] = useState<string>("");
  const [dbRange, setDbRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [dbAutoFetch, setDbAutoFetch] = useState(false);
  const dbFetchLock = useRef(false);
  const dbLastKeyRef = useRef<string>("");

  // 弹窗查看器状态
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerTitle, setViewerTitle] = useState("");
  const [viewerContent, setViewerContent] = useState("");

  // 初始化加载分类
  useEffect(() => {
    (async () => {
      try {
        const types = await MonitorApi.logTypes();
        if (Array.isArray(types) && types.length > 0) {
          setCategories(types);
          setActive(types[0]);
        }
      } catch {
        // 保持默认分类
      }
    })();
  }, []);

  // 解析文件日志行（尽可能解析 JSON）
  const parseFileLine = useCallback((line: string): FileLogRow => {
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
      };
    }
  }, []);

  // 拉取文件日志（分页）
  const fetchFileLogs = useCallback(
    async (page: number, pageSize: number) => {
      if (!active) return;
      if (!fileAutoFetch) return; // 按需请求：未开启则忽略 KTable 的初始拉取
      const key = `${active}:${page}:${pageSize}`;
      if (fileFetchLock.current) return;
      if (fileLastKeyRef.current === key) return; // 参数未变时去重
      fileFetchLock.current = true;
      setFileLoading(true);
      try {
        const offset = Math.max(0, (page - 1) * pageSize);
        const res = await MonitorApi.logsByType(active, offset, pageSize);
        const rows = (res?.lines || [])
          .filter(Boolean)
          .map((l: string) => parseFileLine(l));
        setFileRows(rows);
        setFileTotal(res?.total || 0);
        fileLastKeyRef.current = key;
      } catch (e: any) {
        message.error(e?.message || "加载日志失败");
      } finally {
        setFileLoading(false);
        fileFetchLock.current = false;
      }
    },
    [active, parseFileLine, fileAutoFetch]
  );

  // 文件日志：提供稳定引用给 KTable，避免不必要的重复请求
  const fetchFile = useCallback(
    async (p: number, ps: number) => {
      if (ps !== filePageSize) setFilePageSize(ps);
      await fetchFileLogs(p, ps);
    },
    [filePageSize, fetchFileLogs]
  );

  // 级别颜色（严重 error 使用深红色）- 放在列定义之前，避免引用次序问题
  const levelStyle = useCallback((level?: string): React.CSSProperties => {
    const l = String(level || '').toLowerCase();
    if (l === 'error') return { color: '#a8071a', fontWeight: 600 };
    if (l === 'warn' || l === 'warning') return { color: '#d46b08' };
    if (l === 'info') return { color: '#0958d9' };
    return {};
  }, []);

  // 数据库日志列（稳定引用）
  const useMemoDbColumns: IKTableColumns[] = useMemo(
    () => [
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
    ],
    [levelStyle]
  );

  // ===== 查询数据库日志 =====
  const fetchDbLogs = useCallback(
    async (page = 1, pageSizeParam = dbPageSize) => {
      if (!dbAutoFetch) return; // 按需请求
      const startStr = dbRange && dbRange[0] && dbRange[1] ? dbRange[0].toISOString() : "";
      const endStr = dbRange && dbRange[0] && dbRange[1] ? dbRange[1].toISOString() : "";
      const key = `p=${page}&ps=${pageSizeParam}&src=${dbSource || ""}&t=${dbType || ""}&lvl=${dbLevel || ""}&kw=${dbKeyword || ""}&st=${startStr}&ed=${endStr}`;
      if (dbFetchLock.current) return;
      if (dbLastKeyRef.current === key) return; // 参数未变时去重
      dbFetchLock.current = true;
      setDbLoading(true);
      try {
        const params: any = {
          page,
          pageSize: pageSizeParam,
          source: dbSource,
          type: dbType,
          level: dbLevel,
          keyword: dbKeyword || undefined,
        };
        if (startStr && endStr) {
          params.start = startStr;
          params.end = endStr;
        }
        const res = await MonitorApi.dbLogs(params);
        setDbItems(res.items || []);
        setDbTotal(res.total || 0);
        setDbPage(res.page || page);
        if (res.pageSize && res.pageSize !== dbPageSize) setDbPageSize(res.pageSize);
        dbLastKeyRef.current = key;
      } catch (e: any) {
        message.error(e?.message || "加载数据库日志失败");
      } finally {
        setDbLoading(false);
        dbFetchLock.current = false;
      }
    },
    [dbPageSize, dbSource, dbType, dbLevel, dbKeyword, dbRange, dbAutoFetch]
  );

  // 提供稳定引用给 KTable
  const fetchDb = useCallback(
    async (p: number, ps: number) => {
      if (ps !== dbPageSize) setDbPageSize(ps);
      await fetchDbLogs(p, ps);
    },
    [dbPageSize, fetchDbLogs]
  );

  // 注意：初始与切换分类的加载交由 KTable 根据 fetchData 触发，避免双重触发导致的多次请求

  // 发送测试日志（客户端上报）
  const sendTestLog = async () => {
    try {
      const now = new Date().toISOString();
      await MonitorApi.ingestLog({ source: "management", level: "info", message: `test log at ${now}`, context: { page: "LogManagement" } });
      message.success("已发送测试日志，切换到 management 类型即可查看");
    } catch (e: any) {
      message.error(e?.message || "发送日志失败");
    }
  };

  // 文件日志表头
  const fileColumns: IKTableColumns[] = useMemo(
    () => [
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
              <Button size="small" type="link" icon={<CopyOutlined />} onClick={async () => { await navigator.clipboard.writeText(r.raw); message.success('已复制原始日志'); }}>
                复制
              </Button>
            </Tooltip>
            <Tooltip title="查看原文">
              <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => { setViewerTitle('文件日志原文'); setViewerContent(r.raw || ''); setViewerOpen(true); }}>查看</Button>
            </Tooltip>
          </Space>
        )
      },
    ],
    [active]
  );

  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          日志管理
        </Title>
        <Text type="secondary">按类别查看系统日志，支持从日志尾部向前分页加载</Text>
      </div>

      <Card>
        <Space className="mb-3" wrap>
          <Tabs activeKey={active} onChange={setActive} items={categories.map((c) => ({ key: c, label: c.toUpperCase() }))} />
          <Button icon={<ReloadOutlined />} onClick={() => { setFileAutoFetch(true); fetchFileLogs(1, filePageSize); }} loading={fileLoading}>刷新</Button>
          <Button type="dashed" onClick={sendTestLog}>发送测试日志</Button>
          <Tag color="blue">总行数：{fileTotal}</Tag>
          <Text type="secondary" style={{ background: '#f6f7f9', padding: '4px 8px', borderRadius: 4 }}>
            文件日志按类别分页展示；如需更强的检索与结构化信息，请使用下方“数据库日志（SystemLog）”。
          </Text>
        </Space>

        <div style={{ background: '#fff' }}>
          <KTable
            key={`file-${active}`}
            columns={fileColumns}
            dataSource={fileRows}
            rowKey={'id'}
            loading={fileLoading}
            total={fileTotal}
            pageSize={filePageSize}
            tableLayout="auto"
            stripe
            size="small"
            fetchData={fetchFile}
          />
        </div>
      </Card>

      {/* ===== 数据库日志（SystemLog） ===== */}
      <Card className="mt-4" title="数据库日志（SystemLog）" loading={dbLoading}>
        <Space className="mb-3" wrap>
          {/* 来源筛选 */}
          <Select
            allowClear
            placeholder="来源（source）"
            style={{ width: 160 }}
            value={dbSource}
            onChange={setDbSource}
            options={[
              { label: 'frontend', value: 'frontend' },
              { label: 'management', value: 'management' },
              { label: 'server', value: 'server' },
            ]}
          />
          {/* 类型筛选 */}
          <Select
            allowClear
            placeholder="类型（type）"
            style={{ width: 180 }}
            value={dbType}
            onChange={setDbType}
            options={[
              { label: 'page_view', value: 'page_view' },
              { label: 'api_error', value: 'api_error' },
              { label: 'js_error', value: 'js_error' },
              { label: 'unhandled_rejection', value: 'unhandled_rejection' },
              { label: 'server_error', value: 'server_error' },
              { label: 'client_log', value: 'client_log' },
            ]}
          />
          {/* 级别筛选 */}
          <Select
            allowClear
            placeholder="级别（level）"
            style={{ width: 140 }}
            value={dbLevel}
            onChange={setDbLevel}
            options={[
              { label: 'info', value: 'info' },
              { label: 'warn', value: 'warn' },
              { label: 'error', value: 'error' },
            ]}
          />
          {/* 关键字 */}
          <Input
            allowClear
            style={{ width: 240 }}
            placeholder="关键字（message/route）"
            value={dbKeyword}
            onChange={(e) => setDbKeyword(e.target.value)}
          />
          {/* 时间范围 */}
          <DatePicker.RangePicker
            showTime
            value={dbRange as any}
            onChange={(v) => setDbRange(v as any)}
          />
          <Button type="primary" onClick={() => { setDbAutoFetch(true); fetchDbLogs(1); }}>查询</Button>
          <Button onClick={() => { setDbSource(undefined); setDbType(undefined); setDbLevel(undefined); setDbKeyword(""); setDbRange(null); setDbAutoFetch(false); setDbItems([]); setDbTotal(0); setDbPage(1); }}>重置</Button>
        </Space>

        {/* 数据库日志使用共享表格组件，便于大批量数据分页与复制 */}
        <div style={{ background: '#fff' }}>
          <KTable
            columns={useMemoDbColumns}
            dataSource={dbItems}
            rowKey={'id'}
            loading={dbLoading}
            total={dbTotal}
            pageSize={dbPageSize}
            tableLayout="auto"
            stripe
            size="small"
            fetchData={fetchDb}
          />
        </div>
      </Card>

      {/* 查看弹窗（文件/数据库日志通用） */}
      <Modal open={viewerOpen} title={viewerTitle || '日志详情'} onCancel={() => setViewerOpen(false)} footer={null} width={900}>
        <pre style={{ whiteSpace: 'pre-wrap', margin: 0, maxHeight: '70vh', overflow: 'auto' }}>{viewerContent}</pre>
      </Modal>
    </div>
  );
};

export default LogManagement;
