import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    DatabaseOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const DataManagementDetail: React.FC = () => {
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
                    <DatabaseOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker 数据管理详解</h1>
                    <p>掌握Docker容器数据持久化与存储管理</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Docker Volume</Tag>
                        <Tag color="green">数据持久化</Tag>
                        <Tag color="orange">存储管理</Tag>
                        <Tag color="purple">备份恢复</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 数据存储类型 */}
                <Card title="💾 Docker 数据存储类型" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>三种存储方式对比</h3>
                        <div className={styles.comparison_grid}>
                            <div className={styles.comparison_item}>
                                <h4>📁 Volumes（卷）</h4>
                                <p><strong>推荐方式</strong>：由Docker管理，存储在Docker区域</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>完全由Docker管理</li>
                                            <li>可以在容器间共享</li>
                                            <li>支持远程存储</li>
                                            <li>更好的性能</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.comparison_item}>
                                <h4>🔗 Bind Mounts（绑定挂载）</h4>
                                <p><strong>直接映射</strong>：将主机目录映射到容器</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>直接访问主机文件</li>
                                            <li>开发时实时同步</li>
                                            <li>配置文件管理方便</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>依赖主机路径结构</li>
                                            <li>安全性相对较低</li>
                                            <li>跨平台兼容性差</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.comparison_item}>
                                <h4>💿 tmpfs Mounts（内存挂载）</h4>
                                <p><strong>临时存储</strong>：存储在主机内存中</p>
                                <div className={styles.pros_cons}>
                                    <div className={styles.pros}>
                                        <h5>✅ 优势</h5>
                                        <ul>
                                            <li>极快的读写速度</li>
                                            <li>敏感数据不落盘</li>
                                            <li>容器停止自动清理</li>
                                        </ul>
                                    </div>
                                    <div className={styles.cons}>
                                        <h5>❌ 劣势</h5>
                                        <ul>
                                            <li>数据不持久化</li>
                                            <li>占用系统内存</li>
                                            <li>仅限Linux系统</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Volume管理 */}
                <Card title="📦 Volume 卷管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基本Volume操作</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 创建卷
docker volume create myvolume

# 查看所有卷
docker volume ls

# 查看卷详细信息
docker volume inspect myvolume

# 删除卷
docker volume rm myvolume

# 删除未使用的卷
docker volume prune

# 使用卷运行容器
docker run -d \
  --name mycontainer \
  -v myvolume:/data \
  nginx

# 匿名卷（自动创建）
docker run -d -v /data nginx`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 卷的高级配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 创建带标签的卷
docker volume create \
  --label environment=production \
  --label backup=daily \
  prod-data

# 使用驱动创建卷
docker volume create \
  --driver local \
  --opt type=nfs \
  --opt o=addr=192.168.1.100,rw \
  --opt device=:/path/to/dir \
  nfs-volume

# 只读挂载
docker run -d \
  -v myvolume:/data:ro \
  nginx

# 指定卷驱动
docker run -d \
  --mount source=myvolume,target=/data,volume-driver=local \
  nginx`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 数据容器模式</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 创建数据容器
docker create \
  --name datacontainer \
  -v /data \
  busybox

# 其他容器使用数据容器的卷
docker run -d \
  --name app1 \
  --volumes-from datacontainer \
  nginx

docker run -d \
  --name app2 \
  --volumes-from datacontainer \
  apache

# 备份数据容器
docker run --rm \
  --volumes-from datacontainer \
  -v $(pwd):/backup \
  busybox \
  tar czf /backup/data.tar.gz /data

# 恢复数据
docker run --rm \
  --volumes-from datacontainer \
  -v $(pwd):/backup \
  busybox \
  tar xzf /backup/data.tar.gz -C /`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Bind Mounts */}
                <Card title="🔗 Bind Mounts 绑定挂载" className={styles.content_card}>
                    <div className={styles.bind_section}>
                        <h3>基本绑定挂载</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 基本绑定挂载
docker run -d \
  -v /host/path:/container/path \
  nginx

# 使用绝对路径
docker run -d \
  -v $(pwd)/data:/usr/share/nginx/html \
  nginx

# 只读绑定挂载
docker run -d \
  -v /host/config:/etc/nginx:ro \
  nginx

# 使用--mount语法（推荐）
docker run -d \
  --mount type=bind,source=/host/path,target=/container/path \
  nginx

# 绑定单个文件
docker run -d \
  -v /host/nginx.conf:/etc/nginx/nginx.conf:ro \
  nginx`}
                            </pre>
                        </div>
                        
                        <h3>开发环境配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 前端开发环境
docker run -d \
  --name frontend-dev \
  -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/public:/app/public \
  -v /app/node_modules \
  node:16 \
  npm start

# 后端开发环境
docker run -d \
  --name backend-dev \
  -p 8080:8080 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -w /app \
  node:16 \
  npm run dev

# docker-compose开发配置
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development`}
                            </pre>
                        </div>
                        
                        <h3>配置文件管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 配置文件目录结构
project/
├── config/
│   ├── nginx.conf
│   ├── mysql.cnf
│   └── app.env
├── data/
└── docker-compose.yml

# docker-compose配置
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./config/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./data/html:/usr/share/nginx/html
      
  mysql:
    image: mysql:8.0
    volumes:
      - ./config/mysql.cnf:/etc/mysql/conf.d/custom.cnf:ro
      - mysql_data:/var/lib/mysql
    env_file:
      - ./config/app.env

volumes:
  mysql_data:`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 数据备份与恢复 */}
                <Card title="💾 数据备份与恢复" className={styles.content_card}>
                    <div className={styles.backup_section}>
                        <h3>卷备份策略</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 备份卷数据
docker run --rm \
  -v myvolume:/data \
  -v $(pwd):/backup \
  busybox \
  tar czf /backup/volume-backup-$(date +%Y%m%d).tar.gz /data

# 恢复卷数据
docker run --rm \
  -v myvolume:/data \
  -v $(pwd):/backup \
  busybox \
  tar xzf /backup/volume-backup-20240101.tar.gz -C /

# 数据库备份
docker exec mysql-container \
  mysqldump -u root -ppassword mydatabase > backup.sql

# 数据库恢复
docker exec -i mysql-container \
  mysql -u root -ppassword mydatabase < backup.sql

# 自动化备份脚本
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# 备份所有卷
for volume in $(docker volume ls -q); do
  echo "备份卷: $volume"
  docker run --rm \
    -v $volume:/data \
    -v $BACKUP_DIR:/backup \
    busybox \
    tar czf /backup/${volume}_${DATE}.tar.gz /data
done`}
                            </pre>
                        </div>
                        
                        <h3>数据迁移</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 卷之间数据复制
docker run --rm \
  -v source_volume:/source \
  -v target_volume:/target \
  busybox \
  cp -r /source/. /target/

# 容器间数据复制
docker cp source_container:/data/file.txt target_container:/data/

# 主机与容器间数据复制
docker cp /host/file.txt container:/path/
docker cp container:/path/file.txt /host/

# 跨主机卷迁移
# 源主机导出
docker run --rm \
  -v myvolume:/data \
  busybox \
  tar czf - /data | ssh user@target-host 'docker run --rm -i -v myvolume:/data busybox tar xzf - -C /'

# 使用rsync同步
docker run --rm \
  -v source_volume:/source \
  -v target_volume:/target \
  instrumentisto/rsync \
  rsync -av /source/ /target/`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 数据管理最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 存储选择原则</h4>
                                <p>根据使用场景选择合适的存储方式</p>
                                <ul>
                                    <li><strong>Volumes</strong>：生产环境数据持久化</li>
                                    <li><strong>Bind Mounts</strong>：开发环境代码同步</li>
                                    <li><strong>tmpfs</strong>：临时数据和缓存</li>
                                    <li>避免在容器层存储重要数据</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 备份策略</h4>
                                <p>建立完善的数据备份机制</p>
                                <ul>
                                    <li>定期自动备份重要数据</li>
                                    <li>测试备份数据的完整性</li>
                                    <li>实施多层备份策略</li>
                                    <li>文档化恢复流程</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>优化存储性能</p>
                                <ul>
                                    <li>选择合适的存储驱动</li>
                                    <li>避免频繁的小文件操作</li>
                                    <li>使用SSD存储关键数据</li>
                                    <li>监控存储使用情况</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 安全考虑</h4>
                                <p>确保数据安全</p>
                                <ul>
                                    <li>设置适当的文件权限</li>
                                    <li>加密敏感数据</li>
                                    <li>限制容器对主机的访问</li>
                                    <li>定期清理未使用的卷</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default DataManagementDetail
