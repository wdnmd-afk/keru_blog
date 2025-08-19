import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    CloudOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const FundamentalsDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Docker', 'fundamentals')

    const handleBack = () => {
        navigate('/technology/docker')
    }

    if (loading) {
        return <div className={styles.loading}>加载中...</div>
    }

    if (error) {
        return <div className={styles.error}>加载失败: {error}</div>
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
                    <CloudOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Docker 基础概念</h1>
                    <p>容器化技术的核心概念与基本操作</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Docker</Tag>
                        <Tag color="green">容器化</Tag>
                        <Tag color="orange">基础概念</Tag>
                        <Tag color="purple">DevOps</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 Docker 核心概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Docker？</h3>
                        <p>Docker是一个开源的容器化平台，它允许开发者将应用程序及其依赖项打包到一个轻量级、可移植的容器中，然后可以在任何支持Docker的环境中运行。</p>

                        <h3>核心组件</h3>
                        <div className={styles.components_grid}>
                            <div className={styles.component_item}>
                                <h4>🖼️ 镜像 (Image)</h4>
                                <p>只读的模板，包含运行应用所需的代码、运行时、库、环境变量和配置文件</p>
                            </div>

                            <div className={styles.component_item}>
                                <h4>📦 容器 (Container)</h4>
                                <p>镜像的运行实例，是一个轻量级、可移植的执行环境</p>
                            </div>

                            <div className={styles.component_item}>
                                <h4>📋 Dockerfile</h4>
                                <p>文本文件，包含构建镜像的指令和配置</p>
                            </div>

                            <div className={styles.component_item}>
                                <h4>🏪 仓库 (Registry)</h4>
                                <p>存储和分发镜像的服务，如Docker Hub、私有仓库</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 基本命令 */}
                <Card title="⚡ 基本命令" className={styles.content_card}>
                    <div className={styles.commands_section}>
                        <h3>镜像操作</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 拉取镜像
docker pull nginx:latest

# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx:latest

# 构建镜像
docker build -t myapp:1.0 .

# 推送镜像到仓库
docker push myapp:1.0`}
                            </pre>
                        </div>

                        <h3>容器操作</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 运行容器
docker run -d --name mynginx -p 8080:80 nginx

# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 停止容器
docker stop mynginx

# 启动容器
docker start mynginx

# 重启容器
docker restart mynginx

# 删除容器
docker rm mynginx

# 进入容器
docker exec -it mynginx bash

# 查看容器日志
docker logs mynginx`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 实践示例 */}
                <Card title="🛠️ 实践示例" className={styles.content_card}>
                    <div className={styles.example_section}>
                        <h3>1. 运行一个简单的Web服务器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 运行Nginx服务器
docker run -d \\
  --name my-nginx \\
  -p 8080:80 \\
  -v /path/to/html:/usr/share/nginx/html \\
  nginx:latest

# 访问 http://localhost:8080 查看效果`}
                            </pre>
                        </div>

                        <h3>2. 运行数据库</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 运行MySQL数据库
docker run -d \\
  --name mysql-db \\
  -e MYSQL_ROOT_PASSWORD=mypassword \\
  -e MYSQL_DATABASE=myapp \\
  -p 3306:3306 \\
  -v mysql-data:/var/lib/mysql \\
  mysql:8.0

# 连接到数据库
docker exec -it mysql-db mysql -u root -p`}
                            </pre>
                        </div>

                        <h3>3. 创建简单的Node.js应用</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# 构建和运行
docker build -t my-node-app .
docker run -d --name node-app -p 3000:3000 my-node-app`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 使用官方镜像</h4>
                                <p>优先使用官方维护的镜像，它们经过安全审查和优化</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 保持镜像轻量</h4>
                                <p>使用Alpine Linux等轻量级基础镜像，减少镜像大小</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 合理使用缓存</h4>
                                <p>优化Dockerfile层级结构，充分利用Docker的构建缓存</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 数据持久化</h4>
                                <p>使用数据卷(Volume)来持久化重要数据，避免数据丢失</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>5. 安全考虑</h4>
                                <p>不要在镜像中包含敏感信息，使用环境变量传递配置</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>6. 健康检查</h4>
                                <p>为容器添加健康检查，确保应用正常运行</p>
                                <div className={styles.code_block}>
                                    <pre>
{`# 在Dockerfile中添加健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1`}
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

export default FundamentalsDetail
