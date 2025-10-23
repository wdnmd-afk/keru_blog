import React, { useEffect, useMemo, useState } from "react";
import { Card, Typography, Descriptions, Progress, Space, Statistic, Row, Col, Tag, message } from "antd";
import { MonitorApi, type MetricsInfo } from "@/api";

const { Title, Text } = Typography;

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 轮询获取指标（每 5s）
  useEffect(() => {
    let timer: any;
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const data = await MonitorApi.metrics();
        setMetrics(data);
      } catch (e: any) {
        message.error(e?.message || "获取性能指标失败");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
    timer = setInterval(fetchMetrics, 5000);
    return () => clearInterval(timer);
  }, []);

  const memPercent = useMemo(() => {
    if (!metrics) return 0;
    const { totalMem, usedMem } = metrics.system;
    return totalMem ? Math.round((usedMem / totalMem) * 100) : 0;
  }, [metrics]);

  const loadAvg = metrics?.system?.loadAvg || [];

  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          性能监控
        </Title>
        <Text type="secondary">监控系统性能指标（每 5 秒刷新一次）</Text>
      </div>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card loading={loading} title="系统概况">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <Statistic title="CPU 核心数" value={metrics?.system?.cpus || 0} />
            </Col>
            <Col xs={24} md={6}>
              <Statistic title="内存使用率" value={memPercent} suffix="%" />
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Text type="secondary">内存使用</Text>
                <Progress percent={memPercent} status="active" />
                <div>
                  <Text>
                    已用：{Math.round((metrics?.system?.usedMem || 0) / 1024 / 1024)} MB / 总计：{Math.round((metrics?.system?.totalMem || 0) / 1024 / 1024)} MB
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        <Card loading={loading} title="系统负载 (loadavg)">
          <Space>
            <Tag color="blue">1 分钟：{loadAvg[0] ?? '-'}</Tag>
            <Tag color="green">5 分钟：{loadAvg[1] ?? '-'}</Tag>
            <Tag color="orange">15 分钟：{loadAvg[2] ?? '-'}</Tag>
          </Space>
        </Card>

        <Card loading={loading} title="进程内存">
          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="PID">{metrics?.process?.pid}</Descriptions.Item>
            <Descriptions.Item label="Uptime(秒)">{Math.round(metrics?.process?.uptime || 0)}</Descriptions.Item>
            <Descriptions.Item label="RSS">{Math.round((metrics?.process?.rss || 0) / 1024 / 1024)} MB</Descriptions.Item>
            <Descriptions.Item label="Heap Total">{Math.round((metrics?.process?.heapTotal || 0) / 1024 / 1024)} MB</Descriptions.Item>
            <Descriptions.Item label="Heap Used">{Math.round((metrics?.process?.heapUsed || 0) / 1024 / 1024)} MB</Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </div>
  );
};

export default PerformanceMonitor;
