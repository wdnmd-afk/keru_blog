import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Tag, Button, Space, Statistic, Alert, message } from "antd";
import { useNavigate } from "react-router-dom";
import { MonitorApi, ConfigApi, type MetricsInfo, type HealthInfo, type FrontendConfig } from "@/api";

const { Title, Text } = Typography;

const SystemMonitor: React.FC = () => {
  const navigate = useNavigate();
  const [health, setHealth] = useState<HealthInfo | null>(null);
  const [metrics, setMetrics] = useState<MetricsInfo | null>(null);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [h, m, cfg] = await Promise.all([
          MonitorApi.health(),
          MonitorApi.metrics(),
          ConfigApi.getFrontendConfig(),
        ]);
        setHealth(h);
        setMetrics(m);
        const enableSM = (cfg as FrontendConfig)?.features?.enableSystemMonitor;
        setEnabled(enableSM !== false);
      } catch (e: any) {
        message.error(e?.message || "加载系统监控数据失败");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          系统监控
        </Title>
        <Text type="secondary">监控系统运行状态和性能</Text>
      </div>

      {!enabled && (
        <Alert className="mb-4" type="warning" showIcon message="系统监控功能已被前端配置关闭（features.enableSystemMonitor=false），当前仅展示静态快照" />
      )}

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card loading={loading} title="运行状态">
            <Space size="large">
              <div>
                <Text type="secondary">状态</Text>
                <div>
                  {health?.status === 'ok' ? <Tag color="green">OK</Tag> : <Tag color="red">异常</Tag>}
                </div>
              </div>
              <div>
                <Text type="secondary">Uptime(秒)</Text>
                <div><Statistic value={Math.round(health?.uptime || 0)} /></div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card loading={loading} title="系统摘要">
            <Row gutter={12}>
              <Col span={8}><Statistic title="CPU" value={metrics?.system?.cpus || 0} /></Col>
              <Col span={8}><Statistic title="架构" value={metrics?.system?.arch || '-'} /></Col>
              <Col span={8}><Statistic title="平台" value={metrics?.system?.platform || '-'} /></Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} md={12}>
          <Card loading={loading} title="负载 (loadavg)">
            <Space>
              <Tag color="blue">1 分钟：{metrics?.system?.loadAvg?.[0] ?? '-'}</Tag>
              <Tag color="green">5 分钟：{metrics?.system?.loadAvg?.[1] ?? '-'}</Tag>
              <Tag color="orange">15 分钟：{metrics?.system?.loadAvg?.[2] ?? '-'}</Tag>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card loading={loading} title="进程信息">
            <Row gutter={12}>
              <Col span={8}><Statistic title="PID" value={metrics?.process?.pid || 0} /></Col>
              <Col span={8}><Statistic title="Uptime(秒)" value={Math.round(metrics?.process?.uptime || 0)} /></Col>
              <Col span={8}><Statistic title="RSS(MB)" value={Math.round((metrics?.process?.rss || 0)/1024/1024)} /></Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <div className="mt-4">
        <Space>
          <Button type="primary" onClick={() => navigate('/system-monitor/performance')}>进入性能监控</Button>
          <Button onClick={() => navigate('/system-monitor/logs')}>进入日志管理</Button>
        </Space>
      </div>
    </div>
  );
};

export default SystemMonitor;
