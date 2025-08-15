import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    RocketOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const GitHubActionsDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/git')
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
                    返回Git & GitHub技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>GitHub Actions 自动化详解</h1>
                    <p>掌握GitHub的CI/CD自动化工作流，提升开发效率</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">GitHub Actions</Tag>
                        <Tag color="blue">CI/CD</Tag>
                        <Tag color="orange">自动化</Tag>
                        <Tag color="purple">工作流</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* GitHub Actions基础 */}
                <Card title="🚀 GitHub Actions 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是GitHub Actions？</h3>
                        <p>GitHub Actions是GitHub提供的持续集成和持续部署(CI/CD)平台，允许你自动化构建、测试和部署管道。你可以创建工作流来构建和测试仓库的每个pull request，或将合并的pull request部署到生产环境。</p>
                        
                        <h3>核心概念</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔄 工作流 (Workflow)</h4>
                                <p>可配置的自动化过程，由一个或多个作业组成</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>⚡ 事件 (Event)</h4>
                                <p>触发工作流运行的特定活动</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>💼 作业 (Job)</h4>
                                <p>在同一运行器上执行的一组步骤</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📋 步骤 (Step)</h4>
                                <p>可以运行命令或动作的单个任务</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🎬 动作 (Action)</h4>
                                <p>可重用的代码单元</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🖥️ 运行器 (Runner)</h4>
                                <p>运行工作流的服务器</p>
                            </div>
                        </div>
                        
                        <h3>基本工作流文件</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# .github/workflows/ci.yml
name: CI

# 触发条件
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

# 作业定义
jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - name: 检出代码
      uses: actions/checkout@v3
    
    - name: 设置Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: 安装依赖
      run: npm ci
    
    - name: 运行测试
      run: npm test
    
    - name: 运行构建
      run: npm run build`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 触发事件 */}
                <Card title="⚡ 工作流触发事件" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 推送事件</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 推送到特定分支
on:
  push:
    branches:
      - main
      - develop
      - 'release/*'

# 推送特定文件时触发
on:
  push:
    paths:
      - 'src/**'
      - 'package.json'

# 推送标签时触发
on:
  push:
    tags:
      - 'v*'

# 排除特定路径
on:
  push:
    paths-ignore:
      - 'docs/**'
      - '*.md'`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Pull Request事件</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# PR事件
on:
  pull_request:
    branches: [ main ]
    types: [opened, synchronize, reopened]

# PR到特定分支
on:
  pull_request:
    branches:
      - main
      - develop

# PR涉及特定文件
on:
  pull_request:
    paths:
      - 'src/**'
      - 'tests/**'

# PR审查事件
on:
  pull_request_review:
    types: [submitted]`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 定时和手动触发</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 定时触发 (cron)
on:
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨2点
    - cron: '0 0 * * 0'  # 每周日午夜

# 手动触发
on:
  workflow_dispatch:
    inputs:
      environment:
        description: '部署环境'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
      version:
        description: '版本号'
        required: false
        type: string

# 仓库事件
on:
  issues:
    types: [opened, closed]
  
  release:
    types: [published]

# 多个事件
on: [push, pull_request, workflow_dispatch]`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 作业配置 */}
                <Card title="💼 作业配置与策略" className={styles.content_card}>
                    <div className={styles.jobs_section}>
                        <h3>基本作业配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`jobs:
  # 基本作业
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - name: 构建项目
        run: npm run build

  # 多操作系统测试
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [14, 16, 18]
    
    steps:
      - uses: actions/checkout@v3
      - name: 设置Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm ci
      - run: npm test

  # 作业依赖
  deploy:
    needs: [build, test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: 部署到生产环境
        run: echo "部署中..."

  # 并行作业
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run lint

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm audit`}
                            </pre>
                        </div>
                        
                        <h3>环境变量和密钥</h3>
                        <div className={styles.code_block}>
                            <pre>
{`jobs:
  deploy:
    runs-on: ubuntu-latest
    
    # 作业级环境变量
    env:
      NODE_ENV: production
      API_URL: https://api.example.com
    
    steps:
      - uses: actions/checkout@v3
      
      # 使用密钥
      - name: 部署到服务器
        env:
          SSH_PRIVATE_KEY: \${{ secrets.SSH_PRIVATE_KEY }}
          SERVER_HOST: \${{ secrets.SERVER_HOST }}
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: |
          echo "部署到 \$SERVER_HOST"
          echo "数据库: \$DATABASE_URL"
      
      # 条件执行
      - name: 发送通知
        if: success()
        run: echo "部署成功"
      
      - name: 错误处理
        if: failure()
        run: echo "部署失败"

# 工作流级环境变量
env:
  GLOBAL_VAR: value

# 在GitHub仓库设置中配置Secrets:
# Settings > Secrets and variables > Actions
# - SSH_PRIVATE_KEY
# - SERVER_HOST
# - DATABASE_URL`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 常用Actions */}
                <Card title="🎬 常用Actions与实践" className={styles.content_card}>
                    <div className={styles.actions_section}>
                        <h3>官方Actions</h3>
                        <div className={styles.code_block}>
                            <pre>
{`steps:
  # 检出代码
  - name: 检出代码
    uses: actions/checkout@v3
    with:
      fetch-depth: 0  # 获取完整历史

  # 设置Node.js环境
  - name: 设置Node.js
    uses: actions/setup-node@v3
    with:
      node-version: '18'
      cache: 'npm'
      registry-url: 'https://registry.npmjs.org'

  # 设置Python环境
  - name: 设置Python
    uses: actions/setup-python@v4
    with:
      python-version: '3.9'
      cache: 'pip'

  # 缓存依赖
  - name: 缓存node_modules
    uses: actions/cache@v3
    with:
      path: ~/.npm
      key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        \${{ runner.os }}-node-

  # 上传构建产物
  - name: 上传构建产物
    uses: actions/upload-artifact@v3
    with:
      name: build-files
      path: dist/

  # 下载构建产物
  - name: 下载构建产物
    uses: actions/download-artifact@v3
    with:
      name: build-files
      path: dist/`}
                            </pre>
                        </div>
                        
                        <h3>第三方Actions</h3>
                        <div className={styles.code_block}>
                            <pre>
{`steps:
  # 代码覆盖率报告
  - name: 上传覆盖率到Codecov
    uses: codecov/codecov-action@v3
    with:
      file: ./coverage/lcov.info
      flags: unittests

  # Slack通知
  - name: 发送Slack通知
    uses: 8398a7/action-slack@v3
    with:
      status: \${{ job.status }}
      channel: '#deployments'
      webhook_url: \${{ secrets.SLACK_WEBHOOK }}

  # Docker构建和推送
  - name: 构建Docker镜像
    uses: docker/build-push-action@v4
    with:
      context: .
      push: true
      tags: myapp:latest

  # 部署到AWS
  - name: 部署到AWS
    uses: aws-actions/configure-aws-credentials@v2
    with:
      aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
      aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
      aws-region: us-east-1

  # 语义化版本发布
  - name: 语义化发布
    uses: cycjimmy/semantic-release-action@v3
    with:
      semantic_version: 19
    env:
      GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: \${{ secrets.NPM_TOKEN }}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 实际应用示例 */}
                <Card title="🛠️ 实际应用示例" className={styles.content_card}>
                    <div className={styles.example_section}>
                        <h3>1. 前端项目CI/CD</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# .github/workflows/frontend.yml
name: Frontend CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: 设置Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: 安装依赖
        run: npm ci
      
      - name: 代码检查
        run: npm run lint
      
      - name: 类型检查
        run: npm run type-check
      
      - name: 单元测试
        run: npm run test:unit
      
      - name: E2E测试
        run: npm run test:e2e
      
      - name: 构建项目
        run: npm run build
      
      - name: 上传构建产物
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: 下载构建产物
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: 部署到S3
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 sync dist/ s3://my-website-bucket --delete
          aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_ID }} --paths "/*"`}
                            </pre>
                        </div>
                        
                        <h3>2. 自动化发布流程</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: 设置Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: 安装依赖
        run: npm ci
      
      - name: 构建项目
        run: npm run build
      
      - name: 运行测试
        run: npm test
      
      - name: 发布到NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
      
      - name: 创建GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: \${{ github.ref }}
          release_name: Release \${{ github.ref }}
          draft: false
          prerelease: false
      
      - name: 构建Docker镜像
        run: |
          docker build -t myapp:\${{ github.ref_name }} .
          docker tag myapp:\${{ github.ref_name }} myapp:latest
      
      - name: 推送Docker镜像
        run: |
          echo \${{ secrets.DOCKER_PASSWORD }} | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myapp:\${{ github.ref_name }}
          docker push myapp:latest`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ GitHub Actions 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 安全性最佳实践</h4>
                                <p>保护敏感信息和工作流安全</p>
                                <ul>
                                    <li>使用Secrets存储敏感信息</li>
                                    <li>限制工作流权限</li>
                                    <li>使用OIDC进行云服务认证</li>
                                    <li>定期更新Actions版本</li>
                                    <li>审查第三方Actions的安全性</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能优化</h4>
                                <p>提高工作流执行效率</p>
                                <div className={styles.code_block}>
                                    <pre>
{`# 使用缓存
- name: 缓存依赖
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}

# 并行执行作业
jobs:
  lint:
    runs-on: ubuntu-latest
  test:
    runs-on: ubuntu-latest
  build:
    runs-on: ubuntu-latest

# 条件执行
- name: 部署
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 可维护性</h4>
                                <p>编写可维护的工作流</p>
                                <ul>
                                    <li>使用有意义的作业和步骤名称</li>
                                    <li>添加适当的注释</li>
                                    <li>模块化复杂的工作流</li>
                                    <li>使用可重用的工作流</li>
                                    <li>定期清理不用的工作流</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 监控和调试</h4>
                                <p>有效监控和调试工作流</p>
                                <ul>
                                    <li>添加适当的日志输出</li>
                                    <li>使用工作流状态检查</li>
                                    <li>设置失败通知</li>
                                    <li>保存调试信息</li>
                                    <li>使用工作流可视化工具</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GitHubActionsDetail
