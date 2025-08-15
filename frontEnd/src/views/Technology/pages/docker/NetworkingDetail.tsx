import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    GlobalOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const NetworkingDetail: React.FC = () => {
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
                    <GlobalOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker 网络详解</h1>
                    <p>掌握Docker容器网络配置与通信机制</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Docker Network</Tag>
                        <Tag color="green">容器通信</Tag>
                        <Tag color="orange">网络配置</Tag>
                        <Tag color="purple">端口映射</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Docker网络基础 */}
                <Card title="🌐 Docker 网络基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>Docker网络模型</h3>
                        <p>Docker使用CNM（Container Network Model）来管理容器网络，提供了多种网络驱动来满足不同的网络需求。</p>
                        
                        <h3>网络驱动类型</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔗 bridge（桥接）</h4>
                                <p>默认网络驱动，适用于单主机上的容器通信</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🌍 host（主机）</h4>
                                <p>容器直接使用主机网络，性能最佳但隔离性差</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🚫 none（无网络）</h4>
                                <p>容器没有网络接口，完全隔离</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔄 overlay（覆盖）</h4>
                                <p>用于Docker Swarm集群中的跨主机通信</p>
                            </div>
                        </div>
                        
                        <h3>基本网络命令</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 查看网络列表
docker network ls

# 查看网络详细信息
docker network inspect bridge

# 创建自定义网络
docker network create mynetwork

# 删除网络
docker network rm mynetwork

# 连接容器到网络
docker network connect mynetwork mycontainer

# 断开容器网络连接
docker network disconnect mynetwork mycontainer`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 端口映射 */}
                <Card title="🔌 端口映射与暴露" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基本端口映射</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 映射单个端口
docker run -p 8080:80 nginx

# 映射多个端口
docker run -p 8080:80 -p 8443:443 nginx

# 映射到随机端口
docker run -P nginx

# 指定协议
docker run -p 8080:80/tcp -p 8081:80/udp nginx

# 绑定到特定IP
docker run -p 127.0.0.1:8080:80 nginx

# 查看端口映射
docker port container_name`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. EXPOSE指令</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# Dockerfile中暴露端口
FROM nginx:alpine

# 暴露端口（仅作为文档说明）
EXPOSE 80 443

# 运行时仍需要-p参数映射
# docker run -p 8080:80 myimage

# 使用-P参数自动映射所有EXPOSE的端口
# docker run -P myimage

# 查看镜像暴露的端口
docker inspect myimage | grep ExposedPorts`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 动态端口管理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 获取容器映射的端口
PORT=$(docker port mycontainer 80/tcp | cut -d: -f2)
echo "应用运行在端口: $PORT"

# 使用docker-compose管理端口
# docker-compose.yml
version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "8080:80"        # 固定端口
      - "80"             # 随机端口
      - "127.0.0.1:8081:80"  # 绑定IP
    expose:
      - "3000"           # 仅容器间可访问

# 查看服务端口
docker-compose port web 80`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 自定义网络 */}
                <Card title="🏗️ 自定义网络配置" className={styles.content_card}>
                    <div className={styles.network_section}>
                        <h3>创建自定义网络</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 创建bridge网络
docker network create \
  --driver bridge \
  --subnet=172.20.0.0/16 \
  --ip-range=172.20.240.0/20 \
  --gateway=172.20.0.1 \
  mynetwork

# 创建带标签的网络
docker network create \
  --label environment=production \
  --label team=backend \
  prod-network

# 查看网络配置
docker network inspect mynetwork

# 使用自定义网络运行容器
docker run -d \
  --name web1 \
  --network mynetwork \
  --ip 172.20.0.10 \
  nginx

docker run -d \
  --name web2 \
  --network mynetwork \
  nginx`}
                            </pre>
                        </div>
                        
                        <h3>容器间通信</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 在同一网络中的容器可以通过容器名通信
docker network create app-network

# 启动数据库容器
docker run -d \
  --name database \
  --network app-network \
  -e MYSQL_ROOT_PASSWORD=password \
  mysql:8.0

# 启动应用容器
docker run -d \
  --name webapp \
  --network app-network \
  -p 8080:80 \
  myapp

# 在webapp中可以通过 'database:3306' 连接数据库

# 测试容器间连通性
docker exec webapp ping database
docker exec webapp nslookup database

# 查看网络中的容器
docker network inspect app-network`}
                            </pre>
                        </div>
                        
                        <h3>网络别名</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 为容器设置网络别名
docker run -d \
  --name mysql-server \
  --network app-network \
  --network-alias db \
  --network-alias database \
  mysql:8.0

# 现在可以通过多个名称访问同一容器
# mysql-server, db, database 都指向同一容器

# 在docker-compose中使用别名
version: '3.8'
services:
  database:
    image: mysql:8.0
    networks:
      app-network:
        aliases:
          - db
          - mysql-server
          
networks:
  app-network:
    driver: bridge`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 网络安全 */}
                <Card title="🔒 网络安全与隔离" className={styles.content_card}>
                    <div className={styles.security_section}>
                        <h3>网络隔离策略</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 创建隔离的网络环境
docker network create --internal backend-network
docker network create frontend-network

# 前端服务（可访问外网）
docker run -d \
  --name frontend \
  --network frontend-network \
  -p 80:80 \
  nginx

# 后端服务（内部网络，不能访问外网）
docker run -d \
  --name backend \
  --network backend-network \
  myapi

# 数据库（完全隔离）
docker run -d \
  --name database \
  --network backend-network \
  mysql:8.0

# 连接前后端网络
docker network connect backend-network frontend`}
                            </pre>
                        </div>
                        
                        <h3>防火墙规则</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Docker会自动创建iptables规则
# 查看Docker创建的规则
sudo iptables -L DOCKER

# 禁用Docker的iptables管理（不推荐）
# /etc/docker/daemon.json
{
  "iptables": false
}

# 自定义防火墙规则
# 只允许特定IP访问容器
sudo iptables -I DOCKER-USER -s 192.168.1.0/24 -j ACCEPT
sudo iptables -I DOCKER-USER -j DROP

# 限制容器间通信
docker network create \
  --opt com.docker.network.bridge.enable_icc=false \
  isolated-network`}
                            </pre>
                        </div>
                        
                        <h3>TLS加密通信</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 使用TLS保护Docker daemon
# 生成证书
openssl genrsa -aes256 -out ca-key.pem 4096
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem

# 配置Docker daemon使用TLS
# /etc/docker/daemon.json
{
  "hosts": ["tcp://0.0.0.0:2376"],
  "tls": true,
  "tlscert": "/etc/docker/server-cert.pem",
  "tlskey": "/etc/docker/server-key.pem",
  "tlsverify": true,
  "tlscacert": "/etc/docker/ca.pem"
}

# 客户端连接
docker --tlsverify \
  --tlscacert=ca.pem \
  --tlscert=cert.pem \
  --tlskey=key.pem \
  -H=daemon.example.com:2376 \
  version`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Docker 网络最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 网络设计原则</h4>
                                <p>合理设计容器网络架构</p>
                                <ul>
                                    <li>使用自定义网络而不是默认bridge</li>
                                    <li>按功能划分网络（前端、后端、数据库）</li>
                                    <li>避免使用host网络模式</li>
                                    <li>合理规划IP地址段</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 安全配置</h4>
                                <p>确保网络安全</p>
                                <ul>
                                    <li>使用内部网络隔离敏感服务</li>
                                    <li>最小化端口暴露</li>
                                    <li>定期审查网络配置</li>
                                    <li>使用TLS加密通信</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>优化网络性能</p>
                                <ul>
                                    <li>选择合适的网络驱动</li>
                                    <li>避免不必要的网络跳转</li>
                                    <li>使用本地DNS解析</li>
                                    <li>监控网络流量</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 故障排查</h4>
                                <p>网络问题诊断</p>
                                <ul>
                                    <li>使用docker network inspect检查配置</li>
                                    <li>使用ping和telnet测试连通性</li>
                                    <li>检查防火墙规则</li>
                                    <li>查看容器日志</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default NetworkingDetail
