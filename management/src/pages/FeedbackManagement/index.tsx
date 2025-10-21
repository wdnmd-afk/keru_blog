import React, { useCallback, useMemo, useState } from "react";
import {
  Card,
  Space,
  Input,
  Select,
  DatePicker,
  Button,
  Modal,
  Tag,
} from "antd";
import { SearchOutlined, ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import { KTable, type IKTableColumns } from "shared/components";

import {
  FeedbackApi,
  type Feedback,
  type FeedbackStatus,
  type FeedbackCategory,
} from "@/api/feedback";

const { RangePicker } = DatePicker;

// 状态选项
const STATUS_OPTIONS: { label: string; value: FeedbackStatus }[] = [
  { label: "待处理", value: "PENDING" },
  { label: "已查看", value: "VIEWED" },
  { label: "已处理", value: "RESOLVED" },
];

// 分类选项
const CATEGORY_OPTIONS: { label: string; value: FeedbackCategory }[] = [
  { label: "功能建议", value: "SUGGESTION" },
  { label: "问题反馈", value: "BUG" },
  { label: "其他", value: "OTHER" },
];

// 时间格式化（避免额外依赖）
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

const FeedbackManagement: React.FC = () => {
  // 列表与分页状态
  const [list, setList] = useState<Feedback[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // 查询条件
  const [userKeyword, setUserKeyword] = useState<string>("");
  const [status, setStatus] = useState<FeedbackStatus | undefined>();
  const [category, setCategory] = useState<FeedbackCategory | undefined>();
  const [timeRange, setTimeRange] = useState<any>();

  // 详情弹窗
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailContent, setDetailContent] = useState<string>("");

  // 表头列定义（按要求展示所有字段，并优化显示）
  const columns: IKTableColumns[] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 220,
        ellipsis: true,
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        minWidth: 240,
        ellipsis: true,
        sorter: (a: any, b: any) =>
          (a.title || "").localeCompare(b.title || ""),
      },
      {
        title: "反馈内容",
        dataIndex: "content",
        key: "content",
        minWidth: 420,
        ellipsis: true,
        render: (value: string, record: Feedback) => {
          // 去除可能的标题前缀：形如 【title】\n 正文
          const textRaw = value || "-";
          const prefix = record.title ? `【${record.title}】\n` : "";
          const pure =
            prefix && textRaw.startsWith(prefix)
              ? textRaw.slice(prefix.length)
              : textRaw;
          const short = pure.length > 60 ? pure.slice(0, 60) + "..." : pure;
          return (
            <Space>
              <span title={pure}>{short}</span>
              {pure.length > 60 && (
                <Button
                  type="link"
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => {
                    setDetailContent(pure);
                    setDetailOpen(true);
                  }}
                >
                  查看
                </Button>
              )}
            </Space>
          );
        },
      },
      {
        title: "AI建议",
        dataIndex: "advice",
        key: "advice",
        minWidth: 360,
        ellipsis: true,
        render: (advice: string | null) => {
          const pure = (advice || "-").trim();
          const short = pure.length > 60 ? pure.slice(0, 60) + "..." : pure;
          return (
            <Space>
              <span title={pure}>{short}</span>
              {pure && pure !== "-" && pure.length > 60 && (
                <Button
                  type="link"
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => {
                    setDetailContent(pure);
                    setDetailOpen(true);
                  }}
                >
                  查看
                </Button>
              )}
            </Space>
          );
        },
      },
      {
        title: "姓名",
        dataIndex: "userName",
        key: "userName",
        width: 160,
        ellipsis: true,
        render: (v: string | null) => v || "-",
      },
      {
        title: "邮箱",
        dataIndex: "userEmail",
        key: "userEmail",
        width: 220,
        ellipsis: true,
        render: (v: string | null) => v || "-",
      },
      {
        title: "反馈类型/分类",
        dataIndex: "category",
        key: "category",
        width: 140,
        render: (v: FeedbackCategory) => {
          const map: Record<FeedbackCategory, string> = {
            SUGGESTION: "功能建议",
            BUG: "问题反馈",
            OTHER: "其他",
          };
          return (
            <Tag
              color={
                v === "BUG" ? "red" : v === "SUGGESTION" ? "blue" : "default"
              }
            >
              {map[v]}
            </Tag>
          );
        },
      },
      {
        title: "反馈状态",
        dataIndex: "status",
        key: "status",
        width: 120,
        render: (v: FeedbackStatus) => {
          const map: Record<FeedbackStatus, string> = {
            PENDING: "待处理",
            VIEWED: "已查看",
            RESOLVED: "已处理",
          };
          const color =
            v === "PENDING" ? "gold" : v === "VIEWED" ? "blue" : "green";
          return <Tag color={color}>{map[v]}</Tag>;
        },
      },
      {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 200,
        sorter: (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        defaultSortOrder: "descend",
        render: (v: string | number) => formatDateTime(v),
      },
      {
        title: "更新时间",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 200,
        sorter: (a: any, b: any) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        render: (v: string | number) => formatDateTime(v),
      },
    ],
    [],
  );

  // 拉取数据（使用 useCallback 保持引用稳定，避免子组件依赖变化导致的重复调用）
  const fetchData = useCallback(
    async (curPage: number, curSize: number) => {
      setLoading(true);
      try {
        const params: any = {
          page: curPage,
          pageSize: curSize,
          user: userKeyword || undefined,
          status: status || undefined,
          category: category || undefined,
        };
        if (
          timeRange &&
          Array.isArray(timeRange) &&
          timeRange[0] &&
          timeRange[1]
        ) {
          params.startTime = new Date(timeRange[0]).toISOString();
          params.endTime = new Date(timeRange[1]).toISOString();
        }
        const res = await FeedbackApi.queryFeedbacks(params);
        setList(res.data || []);
        setTotal(res.total || 0);
        setPage(res.page || curPage);
        setPageSize(res.pageSize || curSize);
      } catch (e) {
        console.error("[Feedback] query error", e);
      } finally {
        setLoading(false);
      }
    },
    [userKeyword, status, category, timeRange],
  );

  // 注意：初始加载交由 KTable 内部根据 fetchData 触发，避免父子双方重复触发导致的多次请求

  // 查询/重置
  const handleSearch = () => fetchData(1, pageSize);
  const handleReset = () => {
    setUserKeyword("");
    setStatus(undefined);
    setCategory(undefined);
    setTimeRange(undefined);
    fetchData(1, pageSize);
  };

  // 页面布局遵循统一规范（Card + KTable，自适应高度）
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        title="意见反馈管理"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* 搜索条件区域 */}
        <Space wrap size={16} style={{ marginBottom: 16 }}>
          <Input
            placeholder="反馈人/邮箱/关键字"
            allowClear
            style={{ width: 240 }}
            value={userKeyword}
            onChange={(e) => setUserKeyword(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Select
            placeholder="状态"
            allowClear
            style={{ width: 160 }}
            options={STATUS_OPTIONS}
            value={status}
            onChange={setStatus}
          />
          <Select
            placeholder="类型/分类"
            allowClear
            style={{ width: 180 }}
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={setCategory}
          />
          <RangePicker
            style={{ width: 320 }}
            value={timeRange}
            onChange={(v) => setTimeRange(v as any)}
            showTime
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            查询
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
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
            // 开启排序提示并指定自定义样式类，改变文字颜色
            showSorterTooltip={{ rootClassName: 'sorter-tooltip-blue' }}
            fetchData={fetchData}
          />
        </div>
      </Card>

      {/* 详情弹窗 */}
      <Modal
        title="反馈详情"
        open={detailOpen}
        footer={null}
        onCancel={() => setDetailOpen(false)}
        width={720}
      >
        <div style={{ whiteSpace: "pre-wrap" }}>{detailContent}</div>
      </Modal>
    </div>
  );
};

export default FeedbackManagement;
