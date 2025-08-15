import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ThunderboltOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const PerformanceOptimizationDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/docker')
    }
    
    return (
        <div className={styles.topic_detail_container}>
            {/* 返回按钮 */}
            <div className={styles.back_section}>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回Docker技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker 性能优化详解</h1>
                    <p>掌握Docker容器性能优化技巧与最佳实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="orange">性能优化</Tag>
                        <Tag color="blue">资源管理</Tag>
                        <Tag color="green">监控调优</Tag>
                        <Tag color="purple">最佳实践</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 镜像优化 */}
                <Card title="🖼️ 镜像性能优化" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>镜像大小优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 使用多阶段构建
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:16-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# 使用.dockerignore减少构建上下文
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
coverage
.nyc_output

# 选择合适的基础镜像
FROM alpine:3.16        # 5MB
FROM node:16-alpine     # 110MB vs node:16 (900MB+)
FROM python:3.9-slim    # 45MB vs python:3.9 (885MB)

# 清理缓存和临时文件
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN apk add --no-cache curl`}
                            </pre>
                        </div>
                        
                        <h3>层缓存优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 优化前：每次代码变更都重新安装依赖
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]

# 优化后：利用层缓存
FROM node:16-alpine
WORKDIR /app
# 先复制依赖文件
COPY package*.json ./
RUN npm ci --only=production
# 再复制源代码
COPY . .
CMD ["npm", "start"]

# 合并RUN指令减少层数
RUN apt-get update && \
    apt-get install -y curl vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 而不是
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get clean`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 容器资源优化 */}
                <Card title="⚡ 容器资源优化" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. CPU优化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# CPU限制和预留
docker run -d \
  --name myapp \
  --cpus="1.5" \
  --cpu-shares=1024 \
  myimage

# CPU亲和性设置
docker run -d \
  --name myapp \
  --cpuset-cpus="0,1" \
  myimage

# 在docker-compose中
version: '3.8'
services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '1.5'
        reservations:
          cpus: '0.5'

# 监控CPU使用
docker stats myapp
docker exec myapp top
docker exec myapp htop`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 内存优化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 内存限制
docker run -d \
  --name myapp \
  -m 512m \
  --memory-swap=1g \
  myimage

# 内存交换控制
docker run -d \
  --name myapp \
  -m 512m \
  --memory-swap=512m \  # 禁用swap
  myimage

# OOM Killer配置
docker run -d \
  --name myapp \
  -m 512m \
  --oom-kill-disable=false \
  myimage

# 内存监控
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

# 应用内存优化
# Node.js
ENV NODE_OPTIONS="--max-old-space-size=512"

# Java
ENV JAVA_OPTS="-Xmx512m -Xms256m"`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 磁盘I/O优化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 磁盘I/O限制
docker run -d \
  --name myapp \
  --device-read-bps /dev/sda:1mb \
  --device-write-bps /dev/sda:1mb \
  myimage

# 使用tmpfs减少磁盘I/O
docker run -d \
  --name myapp \
  --tmpfs /tmp:rw,size=100m \
  myimage

# 优化存储驱动
# /etc/docker/daemon.json
{
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ]
}

# 使用多阶段构建减少最终镜像大小
FROM golang:1.19-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:3.16
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/main /main
CMD ["/main"]`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 网络性能优化 */}
                <Card title="🌐 网络性能优化" className={styles.content_card}>
                    <div className={styles.network_section}>
                        <h3>网络模式选择</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Host网络模式（最佳性能）
docker run -d --network=host myapp

# 自定义网络优化
docker network create \
  --driver bridge \
  --opt com.docker.network.driver.mtu=1500 \
  --opt com.docker.network.bridge.enable_icc=true \
  optimized-network

# 容器间通信优化
version: '3.8'
services:
  app:
    image: myapp
    networks:
      - app-network
  db:
    image: postgres:13
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
    driver_opts:
      com.docker.network.driver.mtu: 1500

# 端口映射优化
# 避免不必要的端口映射
docker run -d --name internal-service myapp  # 不映射端口

# 使用特定IP绑定
docker run -d -p 127.0.0.1:8080:80 myapp`}
                            </pre>
                        </div>
                        
                        <h3>负载均衡优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 使用Nginx作为反向代理
# nginx.conf
upstream app_servers {
    least_conn;
    server app1:3000 weight=3;
    server app2:3000 weight=2;
    server app3:3000 weight=1;
}

server {
    listen 80;
    location / {
        proxy_pass http://app_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_connect_timeout 5s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;
    }
}

# docker-compose负载均衡
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
      
  app:
    image: myapp
    deploy:
      replicas: 3
    networks:
      - app-network`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 监控与调优 */}
                <Card title="📊 性能监控与调优" className={styles.content_card}>
                    <div className={styles.monitoring_section}>
                        <h3>性能监控工具</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Docker原生监控
docker stats
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"

# cAdvisor监控
docker run -d \
  --name=cadvisor \
  -p 8080:8080 \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/dev/disk/:/dev/disk:ro \
  gcr.io/cadvisor/cadvisor:latest

# Prometheus + Grafana监控栈
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      
  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"`}
                            </pre>
                        </div>
                        
                        <h3>性能分析</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 容器性能分析
# 1. CPU分析
docker exec myapp top -p 1
docker exec myapp ps aux --sort=-%cpu

# 2. 内存分析
docker exec myapp free -h
docker exec myapp cat /proc/meminfo

# 3. 磁盘I/O分析
docker exec myapp iostat -x 1
docker exec myapp iotop

# 4. 网络分析
docker exec myapp netstat -i
docker exec myapp ss -tuln

# 5. 应用性能分析
# Node.js性能分析
docker exec myapp node --prof app.js
docker exec myapp node --prof-process isolate-*.log

# Java性能分析
docker exec myapp jstat -gc 1
docker exec myapp jmap -histo 1

# 性能测试
# 使用Apache Bench
docker run --rm httpd:2.4-alpine ab -n 1000 -c 10 http://myapp/

# 使用wrk
docker run --rm williamyeh/wrk -t12 -c400 -d30s http://myapp/`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Docker 性能优化最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 镜像优化</h4>
                                <p>构建高效的Docker镜像</p>
                                <ul>
                                    <li>使用多阶段构建减少镜像大小</li>
                                    <li>选择合适的基础镜像</li>
                                    <li>优化Dockerfile层缓存</li>
                                    <li>清理不必要的文件和缓存</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 资源管理</h4>
                                <p>合理配置容器资源</p>
                                <ul>
                                    <li>设置适当的CPU和内存限制</li>
                                    <li>使用资源预留确保性能</li>
                                    <li>监控资源使用情况</li>
                                    <li>避免资源争用</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 网络优化</h4>
                                <p>优化容器网络性能</p>
                                <ul>
                                    <li>选择合适的网络模式</li>
                                    <li>减少不必要的端口映射</li>
                                    <li>使用负载均衡分散流量</li>
                                    <li>优化网络配置参数</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 持续监控</h4>
                                <p>建立性能监控体系</p>
                                <ul>
                                    <li>部署监控工具收集指标</li>
                                    <li>设置性能告警阈值</li>
                                    <li>定期进行性能测试</li>
                                    <li>持续优化和调整</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PerformanceOptimizationDetail
