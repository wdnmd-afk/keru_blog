import React, { useEffect, useMemo, useState } from "react";
import { Card, Typography, Tabs, List, Input, Button, Space, message, Tag, Alert } from "antd";
import { MonitorApi } from "@/api";

const { Title, Text } = Typography;

const LogManagement: React.FC = () => {
  // 日志类别列表与当前选择
  const [categories, setCategories] = useState<string[]>(["app", "access", "error", "management"]);
  const [active, setActive] = useState<string>("app");
  // 日志内容与分页
  const [lines, setLines] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [limit] = useState<number>(200);
  // 状态与过滤
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

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

  // 加载某分类的最新日志（尾部）
  const loadLatest = async (category: string) => {
    setLoading(true);
    try {
      const res = await MonitorApi.logsByType(category, 0, limit);
      setLines((res?.lines || []).filter(Boolean));
      setOffset(0);
      setTotal(res?.total || 0);
    } catch (e: any) {
      message.error(e?.message || "加载日志失败");
    } finally {
      setLoading(false);
    }
  };

  // 切换分类
  useEffect(() => {
    if (!active) return;
    loadLatest(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // 加载更多（更早的日志）
  const handleLoadMore = async () => {
    if (!active) return;
    setLoadingMore(true);
    try {
      const nextOffset = offset + limit;
      const res = await MonitorApi.logsByType(active, nextOffset, limit);
      const chunk = (res?.lines || []).filter(Boolean);
      // 追加到当前列表前方（更旧的在前面）
      setLines((prev) => [...chunk, ...prev]);
      setOffset(nextOffset);
      setTotal(res?.total || total);
    } catch (e: any) {
      message.error(e?.message || "加载更多失败");
    } finally {
      setLoadingMore(false);
    }
  };

  // 简单搜索过滤（前端过滤）
  const filtered = useMemo(() => {
    if (!keyword) return lines;
    const k = keyword.toLowerCase();
    return lines.filter((l) => l.toLowerCase().includes(k));
  }, [lines, keyword]);

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

  const canLoadMore = useMemo(() => {
    // 按 offset 分段从文件尾部向前读取，offset + limit < total 时仍可继续加载
    return offset + limit < total;
  }, [offset, limit, total]);

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
          <Input.Search allowClear placeholder="输入关键字过滤当前列表" style={{ maxWidth: 360 }} onSearch={setKeyword} onChange={(e) => setKeyword(e.target.value)} />
          <Button onClick={() => active && loadLatest(active)} loading={loading}>刷新</Button>
          <Button type="dashed" onClick={sendTestLog}>发送测试日志</Button>
          <Tag color="blue">总行数：{total}</Tag>
        </Space>

        <Tabs activeKey={active} onChange={setActive} items={categories.map((c) => ({ key: c, label: c.toUpperCase() }))} />

        <List
          size="small"
          bordered
          dataSource={filtered}
          renderItem={(item, idx) => (
            <List.Item key={idx}>
              <code style={{ whiteSpace: "pre-wrap" }}>{item}</code>
            </List.Item>
          )}
          style={{ background: "#fff" }}
        />

        <div className="mt-3">
          <Space>
            <Button onClick={handleLoadMore} disabled={!canLoadMore} loading={loadingMore}>加载更多</Button>
            <Text type="secondary">已加载：{lines.length} / {total} 行</Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default LogManagement;
