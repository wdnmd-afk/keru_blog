import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    SafetyOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const SecurityDetail: React.FC = () => {
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
                    <SafetyOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker 安全详解</h1>
                    <p>掌握Docker容器安全配置与防护策略</p>
                    <div className={styles.topic_tags}>
                        <Tag color="red">容器安全</Tag>
                        <Tag color="orange">权限控制</Tag>
                        <Tag color="blue">镜像安全</Tag>
                        <Tag color="purple">网络安全</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 安全威胁与防护 */}
                <Card title="🛡️ Docker 安全威胁与防护" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>常见安全威胁</h3>
                        <div className={styles.threats_grid}>
                            <div className={styles.threat_item}>
                                <h4>🔓 权限提升</h4>
                                <p>容器逃逸获取主机root权限</p>
                            </div>

                            <div className={styles.threat_item}>
                                <h4>🦠 恶意镜像</h4>
                                <p>包含恶意软件的Docker镜像</p>
                            </div>

                            <div className={styles.threat_item}>
                                <h4>📊 资源滥用</h4>
                                <p>容器消耗过多系统资源</p>
                            </div>

                            <div className={styles.threat_item}>
                                <h4>🔍 信息泄露</h4>
                                <p>敏感数据暴露或泄露</p>
                            </div>
                        </div>

                        <Alert
                            message="安全原则"
                            description="遵循最小权限原则、深度防御策略和持续监控原则，构建多层安全防护体系。"
                            type="warning"
                            showIcon
                        />
                    </div>
                </Card>

                {/* 镜像安全 */}
                <Card title="🖼️ 镜像安全管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 安全镜像构建</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 使用官方基础镜像
FROM node:16-alpine

# 创建非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production && \
    npm cache clean --force

# 复制应用代码
COPY --chown=nextjs:nodejs . .

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 镜像扫描与验证</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 使用Docker Scout扫描镜像
docker scout cves myimage:latest

# 使用Trivy扫描漏洞
trivy image myimage:latest

# 使用Clair扫描
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  quay.io/coreos/clair:latest \
  -config=/config/config.yaml

# 镜像签名验证
export DOCKER_CONTENT_TRUST=1
docker pull myregistry/myimage:latest

# 使用Notary签名镜像
notary -s https://notary.docker.io -d ~/.docker/trust \
  addhash docker.io/myimage latest \
  --sha256 <hash>

# 验证镜像完整性
docker trust inspect myimage:latest`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 私有镜像仓库安全</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 配置私有仓库TLS
# registry配置
version: 0.1
log:
  fields:
    service: registry
storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
http:
  addr: :5000
  tls:
    certificate: /certs/domain.crt
    key: /certs/domain.key
auth:
  htpasswd:
    realm: basic-realm
    path: /auth/htpasswd

# 创建认证文件
htpasswd -Bbn username password > auth/htpasswd

# 启动安全的私有仓库
docker run -d \
  --name registry \
  -p 5000:5000 \
  -v $(pwd)/certs:/certs \
  -v $(pwd)/auth:/auth \
  -e REGISTRY_AUTH=htpasswd \
  -e REGISTRY_AUTH_HTPASSWD_REALM="Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  registry:2`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 容器运行时安全 */}
                <Card title="🏃 容器运行时安全" className={styles.content_card}>
                    <div className={styles.runtime_section}>
                        <h3>用户权限控制</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 以非root用户运行容器
docker run --user 1000:1000 myimage

# 禁止特权模式
# ❌ 危险：不要使用特权模式
# docker run --privileged myimage

# 限制capabilities
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myimage

# 只读根文件系统
docker run --read-only myimage

# 禁用新特权获取
docker run --security-opt=no-new-privileges myimage

# 设置SELinux标签
docker run --security-opt label=level:s0:c100,c200 myimage

# AppArmor配置
docker run --security-opt apparmor=docker-default myimage`}
                            </pre>
                        </div>

                        <h3>资源限制</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# CPU限制
docker run --cpus="1.5" myimage
docker run --cpu-shares=512 myimage

# 内存限制
docker run -m 512m myimage
docker run --memory=1g --memory-swap=2g myimage

# 磁盘IO限制
docker run --device-read-bps /dev/sda:1mb myimage
docker run --device-write-bps /dev/sda:1mb myimage

# 进程数限制
docker run --pids-limit=100 myimage

# 文件描述符限制
docker run --ulimit nofile=1024:1024 myimage

# 综合资源限制示例
docker run -d \
  --name secure-app \
  --user 1000:1000 \
  --read-only \
  --tmpfs /tmp \
  --tmpfs /var/run \
  -m 512m \
  --cpus="0.5" \
  --pids-limit=50 \
  --cap-drop=ALL \
  --security-opt=no-new-privileges \
  myimage`}
                            </pre>
                        </div>

                        <h3>网络安全隔离</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 创建隔离网络
docker network create --internal backend-net

# 禁用容器间通信
docker network create --opt com.docker.network.bridge.enable_icc=false isolated-net

# 使用用户定义网络
docker run --network=custom-net myimage

# 禁用网络
docker run --network=none myimage

# 限制出站连接
iptables -I DOCKER-USER -s 172.17.0.0/16 -d 0.0.0.0/0 -j DROP
iptables -I DOCKER-USER -s 172.17.0.0/16 -d 192.168.1.0/24 -j ACCEPT

# 使用防火墙规则
# 只允许特定端口
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -j DROP`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 密钥管理 */}
                <Card title="🔐 密钥与配置管理" className={styles.content_card}>
                    <div className={styles.secrets_section}>
                        <h3>Docker Secrets</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 创建密钥
echo "mysecretpassword" | docker secret create db_password -

# 从文件创建密钥
docker secret create ssl_cert ./server.crt

# 查看密钥列表
docker secret ls

# 在服务中使用密钥
docker service create \
  --name webapp \
  --secret db_password \
  --secret ssl_cert \
  myimage

# 在容器中访问密钥
# 密钥挂载在 /run/secrets/ 目录下
cat /run/secrets/db_password

# docker-compose中使用密钥
version: '3.8'
services:
  webapp:
    image: myimage
    secrets:
      - db_password
      - ssl_cert

secrets:
  db_password:
    external: true
  ssl_cert:
    file: ./server.crt`}
                            </pre>
                        </div>

                        <h3>环境变量安全</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# ❌ 不安全：直接在命令行传递密码
# docker run -e DB_PASSWORD=secret myimage

# ✅ 使用文件传递环境变量
echo "DB_PASSWORD=secret" > .env
docker run --env-file .env myimage

# ✅ 使用外部密钥管理系统
# 集成HashiCorp Vault
docker run -d \
  --name vault \
  --cap-add=IPC_LOCK \
  -e 'VAULT_DEV_ROOT_TOKEN_ID=myroot' \
  -e 'VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:8200' \
  vault

# 在应用中获取密钥
#!/bin/bash
export VAULT_ADDR='http://vault:8200'
export VAULT_TOKEN='myroot'

DB_PASSWORD=$(vault kv get -field=password secret/database)
docker run -e DB_PASSWORD="$DB_PASSWORD" myimage

# 使用init容器获取密钥
version: '3.8'
services:
  vault-init:
    image: vault:latest
    command: |
      sh -c "
        vault auth -method=userpass username=app password=secret
        vault kv get -field=password secret/db > /shared/db_password
      "
    volumes:
      - shared:/shared
      
  app:
    image: myapp
    depends_on:
      - vault-init
    volumes:
      - shared:/secrets

volumes:
  shared:`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 安全监控 */}
                <Card title="📊 安全监控与审计" className={styles.content_card}>
                    <div className={styles.monitoring_section}>
                        <h3>容器行为监控</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 使用Falco进行运行时安全监控
# falco配置文件
rules_file:
  - /etc/falco/falco_rules.yaml
  - /etc/falco/falco_rules.local.yaml

json_output: true
json_include_output_property: true

# 启动Falco
docker run --rm -i -t \
  --name falco \
  --privileged \
  -v /var/run/docker.sock:/host/var/run/docker.sock \
  -v /dev:/host/dev \
  -v /proc:/host/proc:ro \
  -v /boot:/host/boot:ro \
  -v /lib/modules:/host/lib/modules:ro \
  -v /usr:/host/usr:ro \
  falcosecurity/falco

# 自定义安全规则
- rule: Unexpected outbound connection
  desc: Detect unexpected outbound connections
  condition: >
    outbound and not fd.typechar=4 and not fd.is_unix_socket and not proc.name in (curl, wget)
  output: >
    Unexpected outbound connection (user=%user.name command=%proc.cmdline 
    connection=%fd.name)
  priority: WARNING`}
                            </pre>
                        </div>

                        <h3>日志审计</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 配置Docker daemon日志
# /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "audit-logs": true
}

# 使用syslog驱动
docker run --log-driver=syslog \
  --log-opt syslog-address=tcp://192.168.1.100:514 \
  myimage

# 集中化日志收集
version: '3.8'
services:
  app:
    image: myapp
    logging:
      driver: "fluentd"
      options:
        fluentd-address: localhost:24224
        tag: myapp
        
  fluentd:
    image: fluent/fluentd:latest
    ports:
      - "24224:24224"
    volumes:
      - ./fluentd.conf:/fluentd/etc/fluent.conf

# 安全事件告警
# 使用ELK Stack进行日志分析
version: '3.8'
services:
  elasticsearch:
    image: elasticsearch:7.14.0
    environment:
      - discovery.type=single-node
      
  logstash:
    image: logstash:7.14.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
      
  kibana:
    image: kibana:7.14.0
    ports:
      - "5601:5601"`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Docker 安全最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 镜像安全</h4>
                                <p>确保镜像安全可信</p>
                                <ul>
                                    <li>使用官方或可信的基础镜像</li>
                                    <li>定期更新镜像和依赖</li>
                                    <li>扫描镜像漏洞</li>
                                    <li>使用多阶段构建减少攻击面</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 运行时安全</h4>
                                <p>加强容器运行时防护</p>
                                <ul>
                                    <li>以非root用户运行容器</li>
                                    <li>使用只读文件系统</li>
                                    <li>限制容器capabilities</li>
                                    <li>设置资源限制</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 网络安全</h4>
                                <p>保护容器网络通信</p>
                                <ul>
                                    <li>使用自定义网络隔离容器</li>
                                    <li>最小化端口暴露</li>
                                    <li>配置防火墙规则</li>
                                    <li>使用TLS加密通信</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 持续监控</h4>
                                <p>建立安全监控体系</p>
                                <ul>
                                    <li>监控容器行为异常</li>
                                    <li>收集和分析安全日志</li>
                                    <li>设置安全告警机制</li>
                                    <li>定期进行安全审计</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SecurityDetail
