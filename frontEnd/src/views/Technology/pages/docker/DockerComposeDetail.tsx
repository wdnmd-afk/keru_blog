import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ApiOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const DockerComposeDetail: React.FC = () => {
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
                    <ApiOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker Compose 详解</h1>
                    <p>掌握多容器应用的编排与管理，简化复杂应用的部署</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Docker Compose</Tag>
                        <Tag color="green">容器编排</Tag>
                        <Tag color="orange">多服务</Tag>
                        <Tag color="purple">YAML配置</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Docker Compose 基础 */}
                <Card title="📚 Docker Compose 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Docker Compose？</h3>
                        <p>Docker Compose是一个用于定义和运行多容器Docker应用程序的工具。通过YAML文件来配置应用程序的服务，然后使用一个命令就可以从配置中创建并启动所有服务。</p>
                        
                        <h3>核心概念</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🏗️ 服务 (Services)</h4>
                                <p>应用程序中的各个组件，如Web服务器、数据库、缓存等</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🌐 网络 (Networks)</h4>
                                <p>服务之间的通信网络，默认创建一个网络供所有服务使用</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>💾 数据卷 (Volumes)</h4>
                                <p>持久化数据存储，在容器重启后数据不会丢失</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📋 项目 (Project)</h4>
                                <p>由docker-compose.yml文件定义的一组相关服务</p>
                            </div>
                        </div>
                        
                        <h3>基本文件结构</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# docker-compose.yml 基本结构
version: '3.8'

services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  
  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password

volumes:
  db_data:

networks:
  app_network:`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 基本命令 */}
                <Card title="⚡ Docker Compose 基本命令" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 项目管理命令</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 启动服务
docker-compose up              # 前台启动所有服务
docker-compose up -d           # 后台启动所有服务
docker-compose up web          # 只启动指定服务

# 停止服务
docker-compose down            # 停止并删除容器、网络
docker-compose down -v         # 同时删除数据卷
docker-compose stop            # 只停止服务，不删除容器

# 重启服务
docker-compose restart         # 重启所有服务
docker-compose restart web     # 重启指定服务

# 暂停和恢复
docker-compose pause           # 暂停所有服务
docker-compose unpause         # 恢复所有服务`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 服务管理命令</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 查看服务状态
docker-compose ps              # 查看服务状态
docker-compose top             # 查看服务进程

# 查看日志
docker-compose logs            # 查看所有服务日志
docker-compose logs web        # 查看指定服务日志
docker-compose logs -f         # 实时跟踪日志

# 执行命令
docker-compose exec web bash   # 在运行的容器中执行命令
docker-compose run web ls      # 在新容器中执行命令

# 构建镜像
docker-compose build           # 构建所有服务的镜像
docker-compose build web       # 构建指定服务的镜像
docker-compose up --build      # 启动前重新构建镜像`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 扩展和配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 扩展服务
docker-compose up --scale web=3    # 启动3个web服务实例

# 配置验证
docker-compose config              # 验证配置文件
docker-compose config --services   # 列出所有服务

# 拉取镜像
docker-compose pull                # 拉取所有服务的镜像
docker-compose pull web            # 拉取指定服务的镜像

# 删除资源
docker-compose rm                  # 删除停止的容器
docker-compose rm -f               # 强制删除容器`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 实际应用示例 */}
                <Card title="🛠️ 实际应用示例" className={styles.content_card}>
                    <div className={styles.example_section}>
                        <h3>1. Web应用 + 数据库</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# docker-compose.yml
version: '3.8'

services:
  # Web应用服务
  web:
    build: .                    # 使用当前目录的Dockerfile构建
    ports:
      - "3000:3000"            # 端口映射
    environment:
      - NODE_ENV=production
      - DB_HOST=database
      - DB_PORT=5432
      - DB_NAME=myapp
      - DB_USER=postgres
      - DB_PASSWORD=password
    depends_on:
      - database               # 依赖数据库服务
    volumes:
      - ./logs:/app/logs       # 挂载日志目录
    networks:
      - app-network
    restart: unless-stopped    # 重启策略

  # 数据库服务
  database:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network
    restart: unless-stopped

  # Redis缓存服务
  redis:
    image: redis:6-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - app-network
    restart: unless-stopped

# 数据卷定义
volumes:
  postgres_data:
  redis_data:

# 网络定义
networks:
  app-network:
    driver: bridge`}
                            </pre>
                        </div>
                        
                        <h3>2. 微服务架构</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# docker-compose.yml
version: '3.8'

services:
  # API网关
  gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - user-service
      - order-service
    networks:
      - microservices

  # 用户服务
  user-service:
    build: ./user-service
    environment:
      - DB_HOST=user-db
      - REDIS_HOST=redis
    depends_on:
      - user-db
      - redis
    networks:
      - microservices
    deploy:
      replicas: 2            # 运行2个实例

  # 订单服务
  order-service:
    build: ./order-service
    environment:
      - DB_HOST=order-db
      - USER_SERVICE_URL=http://user-service:3000
    depends_on:
      - order-db
    networks:
      - microservices

  # 用户数据库
  user-db:
    image: postgres:13
    environment:
      POSTGRES_DB: users
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - user_db_data:/var/lib/postgresql/data
    networks:
      - microservices

  # 订单数据库
  order-db:
    image: postgres:13
    environment:
      POSTGRES_DB: orders
      POSTGRES_USER: order
      POSTGRES_PASSWORD: password
    volumes:
      - order_db_data:/var/lib/postgresql/data
    networks:
      - microservices

  # 共享Redis
  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data
    networks:
      - microservices

volumes:
  user_db_data:
  order_db_data:
  redis_data:

networks:
  microservices:
    driver: bridge`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 高级配置 */}
                <Card title="🚀 高级配置技巧" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. 环境变量管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# .env 文件
DB_PASSWORD=secret123
API_KEY=your-api-key
NODE_ENV=production

# docker-compose.yml
version: '3.8'

services:
  web:
    image: myapp:latest
    environment:
      - DB_PASSWORD=\${DB_PASSWORD}
      - API_KEY=\${API_KEY}
      - NODE_ENV=\${NODE_ENV:-development}  # 默认值
    env_file:
      - .env                    # 从文件加载环境变量
      - .env.local             # 本地覆盖配置

# 多环境配置
# docker-compose.override.yml (开发环境)
version: '3.8'

services:
  web:
    volumes:
      - .:/app                 # 开发时挂载源码
    environment:
      - DEBUG=true

# docker-compose.prod.yml (生产环境)
version: '3.8'

services:
  web:
    restart: always
    environment:
      - DEBUG=false

# 使用指定配置文件
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`}
                            </pre>
                        </div>
                        
                        <h3>2. 健康检查与依赖管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      database:
        condition: service_healthy    # 等待数据库健康检查通过
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  database:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # 使用 wait-for-it 脚本等待服务就绪
  app:
    build: .
    command: ["./wait-for-it.sh", "database:5432", "--", "npm", "start"]
    depends_on:
      - database`}
                            </pre>
                        </div>
                        
                        <h3>3. 资源限制与安全配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`version: '3.8'

services:
  web:
    image: myapp:latest
    # 资源限制
    deploy:
      resources:
        limits:
          cpus: '0.5'          # 限制CPU使用
          memory: 512M         # 限制内存使用
        reservations:
          cpus: '0.25'         # 保留CPU
          memory: 256M         # 保留内存
    
    # 安全配置
    user: "1000:1000"          # 指定用户ID
    read_only: true            # 只读文件系统
    tmpfs:
      - /tmp                   # 临时文件系统
    
    # 网络安全
    networks:
      - frontend
      - backend
    
    # 日志配置
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  database:
    image: postgres:13
    # 只连接后端网络
    networks:
      - backend
    
    # 安全配置
    security_opt:
      - no-new-privileges:true
    
    # 只读根文件系统
    read_only: true
    tmpfs:
      - /tmp
      - /var/run/postgresql

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true             # 内部网络，不能访问外网`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Docker Compose 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 项目结构组织</h4>
                                <p>合理组织项目文件结构</p>
                                <div className={styles.code_block}>
                                    <pre>
{`project/
├── docker-compose.yml          # 主配置文件
├── docker-compose.override.yml # 开发环境覆盖
├── docker-compose.prod.yml     # 生产环境配置
├── .env                        # 环境变量
├── .env.example               # 环境变量示例
├── services/
│   ├── web/
│   │   ├── Dockerfile
│   │   └── src/
│   └── api/
│       ├── Dockerfile
│       └── src/
└── data/
    ├── nginx/
    └── postgres/`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 版本和标签管理</h4>
                                <p>明确指定镜像版本，避免使用latest标签</p>
                                <div className={styles.code_block}>
                                    <pre>
{`# ❌ 避免使用
services:
  web:
    image: nginx:latest        # 不确定的版本

# ✅ 推荐做法
services:
  web:
    image: nginx:1.21-alpine   # 明确版本
  
  database:
    image: postgres:13.4       # 具体版本号`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 数据持久化策略</h4>
                                <p>合理使用数据卷确保数据安全</p>
                                <ul>
                                    <li>数据库数据使用命名卷</li>
                                    <li>配置文件使用绑定挂载</li>
                                    <li>日志文件挂载到宿主机</li>
                                    <li>定期备份重要数据卷</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 监控和日志</h4>
                                <p>配置适当的监控和日志收集</p>
                                <div className={styles.code_block}>
                                    <pre>
{`# 添加监控服务
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
  
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default DockerComposeDetail
