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

const PostmanDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/tools')
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
                    返回开发工具技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ApiOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Postman API 测试详解</h1>
                    <p>掌握Postman API测试与接口调试技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">API测试</Tag>
                        <Tag color="green">接口调试</Tag>
                        <Tag color="orange">自动化测试</Tag>
                        <Tag color="purple">团队协作</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Postman概述 */}
                <Card title="📡 Postman 概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Postman？</h3>
                        <p>Postman是一个功能强大的API开发和测试平台，提供了完整的API生命周期管理工具。它支持REST、GraphQL、WebSocket等多种API类型，是前端开发者必备的接口测试工具。</p>
                        
                        <h3>核心功能</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔍 API测试</h4>
                                <p>强大的接口测试功能</p>
                                <ul>
                                    <li>HTTP请求发送</li>
                                    <li>响应数据验证</li>
                                    <li>参数化测试</li>
                                    <li>断言检查</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📚 集合管理</h4>
                                <p>组织和管理API集合</p>
                                <ul>
                                    <li>请求分组</li>
                                    <li>环境变量</li>
                                    <li>预设脚本</li>
                                    <li>文档生成</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🤖 自动化测试</h4>
                                <p>自动化API测试流程</p>
                                <ul>
                                    <li>测试脚本</li>
                                    <li>工作流程</li>
                                    <li>CI/CD集成</li>
                                    <li>监控报告</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>👥 团队协作</h4>
                                <p>团队共享和协作</p>
                                <ul>
                                    <li>工作空间共享</li>
                                    <li>版本控制</li>
                                    <li>权限管理</li>
                                    <li>评论讨论</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 基础使用 */}
                <Card title="🚀 Postman 基础使用" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 发送HTTP请求</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// GET请求示例
GET https://jsonplaceholder.typicode.com/posts/1

// 请求头设置
Content-Type: application/json
Authorization: Bearer your-token-here
User-Agent: MyApp/1.0

// POST请求示例
POST https://jsonplaceholder.typicode.com/posts
Content-Type: application/json

{
  "title": "新文章标题",
  "body": "文章内容",
  "userId": 1
}

// PUT请求示例
PUT https://jsonplaceholder.typicode.com/posts/1
Content-Type: application/json

{
  "id": 1,
  "title": "更新的标题",
  "body": "更新的内容",
  "userId": 1
}

// DELETE请求示例
DELETE https://jsonplaceholder.typicode.com/posts/1

// 查询参数
GET https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5

// 路径参数
GET https://api.example.com/users/:userId/posts/:postId

// 表单数据
POST https://httpbin.org/post
Content-Type: application/x-www-form-urlencoded

name=张三&email=zhangsan@example.com&age=25

// 文件上传
POST https://httpbin.org/post
Content-Type: multipart/form-data

file: [选择文件]
description: 文件描述`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 环境变量管理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 环境变量定义
// Development环境
{
  "baseUrl": "http://localhost:3000",
  "apiKey": "dev-api-key-123",
  "dbHost": "localhost",
  "dbPort": "5432"
}

// Production环境
{
  "baseUrl": "https://api.production.com",
  "apiKey": "prod-api-key-456",
  "dbHost": "prod-db.example.com",
  "dbPort": "5432"
}

// 在请求中使用环境变量
GET {{baseUrl}}/api/users
Authorization: Bearer {{apiKey}}

// 全局变量
{
  "timestamp": "{{$timestamp}}",
  "randomInt": "{{$randomInt}}",
  "guid": "{{$guid}}"
}

// 动态变量
{{$timestamp}}          // 当前时间戳
{{$isoTimestamp}}       // ISO格式时间
{{$randomUUID}}         // 随机UUID
{{$randomInt}}          // 随机整数
{{$randomAlphaNumeric}} // 随机字母数字

// 在Pre-request Script中设置变量
pm.environment.set("userId", "12345");
pm.globals.set("requestId", pm.variables.replaceIn("{{$guid}}"));

// 在Tests中获取变量
const userId = pm.environment.get("userId");
const baseUrl = pm.variables.get("baseUrl");`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 测试脚本编写</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Pre-request Script (请求前脚本)
// 设置动态参数
pm.environment.set("timestamp", Date.now());

// 生成签名
const crypto = require('crypto-js');
const message = pm.request.url + pm.request.body;
const signature = crypto.HmacSHA256(message, pm.environment.get("secretKey"));
pm.request.headers.add({
    key: "X-Signature",
    value: signature.toString()
});

// Tests (测试脚本)
// 基础状态码检查
pm.test("状态码为200", function () {
    pm.response.to.have.status(200);
});

// 响应时间检查
pm.test("响应时间小于500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// 响应头检查
pm.test("Content-Type为JSON", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// JSON响应体检查
pm.test("响应包含用户ID", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("id");
    pm.expect(jsonData.id).to.be.a("number");
});

// 数组长度检查
pm.test("返回用户列表不为空", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("array");
    pm.expect(jsonData.length).to.be.above(0);
});

// 字段值验证
pm.test("用户邮箱格式正确", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

// 设置下一个请求的变量
pm.test("提取用户ID", function () {
    const jsonData = pm.response.json();
    pm.environment.set("extractedUserId", jsonData.id);
});

// 条件测试
pm.test("根据环境检查不同值", function () {
    const env = pm.environment.get("environment");
    const jsonData = pm.response.json();
    
    if (env === "development") {
        pm.expect(jsonData.debug).to.be.true;
    } else {
        pm.expect(jsonData.debug).to.be.undefined;
    }
});`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 高级功能 */}
                <Card title="⚡ Postman 高级功能" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>Collection Runner</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 批量运行测试集合
// 1. 创建测试数据文件 (CSV/JSON)
// users.csv
name,email,age
张三,zhangsan@example.com,25
李四,lisi@example.com,30
王五,wangwu@example.com,28

// users.json
[
  {
    "name": "张三",
    "email": "zhangsan@example.com",
    "age": 25
  },
  {
    "name": "李四", 
    "email": "lisi@example.com",
    "age": 30
  }
]

// 2. 在请求中使用数据变量
POST {{baseUrl}}/api/users
Content-Type: application/json

{
  "name": "{{name}}",
  "email": "{{email}}",
  "age": {{age}}
}

// 3. Runner配置
{
  "collection": "User Management API",
  "environment": "Development",
  "iterations": 3,
  "delay": 1000,
  "dataFile": "users.csv"
}

// 工作流控制
// 跳过请求
if (pm.environment.get("skipThisRequest") === "true") {
    pm.execution.skipRequest();
}

// 设置下一个请求
pm.execution.setNextRequest("Get User Details");

// 停止执行
if (pm.response.code !== 200) {
    pm.execution.skipRequest();
}`}
                            </pre>
                        </div>
                        
                        <h3>Mock服务器</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 创建Mock服务器
// 1. 在Collection中添加示例响应
GET /api/users
Example Response:
{
  "users": [
    {
      "id": 1,
      "name": "张三",
      "email": "zhangsan@example.com"
    },
    {
      "id": 2,
      "name": "李四", 
      "email": "lisi@example.com"
    }
  ]
}

// 2. 动态Mock响应
// Pre-request Script
pm.globals.set("mockUserId", Math.floor(Math.random() * 1000));

// Mock响应模板
{
  "id": {{mockUserId}},
  "name": "用户{{mockUserId}}",
  "email": "user{{mockUserId}}@example.com",
  "createdAt": "{{$isoTimestamp}}"
}

// 3. 条件Mock响应
// 根据请求参数返回不同响应
if (pm.request.url.query.get("type") === "admin") {
    // 返回管理员用户
} else {
    // 返回普通用户
}

// Mock服务器URL
https://{{mockId}}.mock.pstmn.io/api/users`}
                            </pre>
                        </div>
                        
                        <h3>API文档生成</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Collection描述
{
  "info": {
    "name": "用户管理API",
    "description": "用户管理系统的RESTful API接口文档",
    "version": "1.0.0",
    "contact": {
      "name": "API支持",
      "email": "api-support@example.com"
    }
  }
}

// 请求描述
GET /api/users/:id
Description: 根据用户ID获取用户详细信息

Parameters:
- id (path): 用户唯一标识符

Headers:
- Authorization: Bearer token (required)
- Content-Type: application/json

Response Examples:
200 OK:
{
  "id": 1,
  "name": "张三",
  "email": "zhangsan@example.com",
  "createdAt": "2023-01-01T00:00:00Z"
}

404 Not Found:
{
  "error": "用户不存在",
  "code": "USER_NOT_FOUND"
}

// 自动生成文档
// 1. 添加详细的请求描述
// 2. 提供多个示例响应
// 3. 说明参数和头部信息
// 4. 发布到Postman文档

// 文档URL示例
https://documenter.getpostman.com/view/{{collectionId}}/{{version}}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Newman CLI */}
                <Card title="🖥️ Newman CLI 自动化" className={styles.content_card}>
                    <div className={styles.newman_section}>
                        <h3>Newman安装和使用</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Newman
npm install -g newman

// 基本使用
newman run collection.json

// 使用环境文件
newman run collection.json -e environment.json

// 使用数据文件
newman run collection.json -d data.csv

// 生成报告
newman run collection.json -r html,json,cli

// 完整命令示例
newman run "User API Tests.postman_collection.json" \
  --environment "Development.postman_environment.json" \
  --data "test-data.csv" \
  --reporters html,json,cli \
  --reporter-html-export "test-report.html" \
  --reporter-json-export "test-results.json" \
  --iteration-count 3 \
  --delay-request 1000 \
  --timeout-request 30000

// CI/CD集成
// GitHub Actions
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install Newman
        run: npm install -g newman
      
      - name: Run API Tests
        run: |
          newman run postman/collection.json \
            -e postman/environment.json \
            -r json,cli \
            --reporter-json-export results.json
      
      - name: Upload Test Results
        uses: actions/upload-artifact@v2
        with:
          name: test-results
          path: results.json

// Jenkins Pipeline
pipeline {
    agent any
    stages {
        stage('API Tests') {
            steps {
                sh 'newman run collection.json -e environment.json -r junit --reporter-junit-export results.xml'
                publishTestResults testResultsPattern: 'results.xml'
            }
        }
    }
}`}
                            </pre>
                        </div>
                        
                        <h3>自定义Newman脚本</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// test-runner.js
const newman = require('newman');
const fs = require('fs');

class APITestRunner {
    constructor(config) {
        this.config = config;
    }
    
    async runTests() {
        return new Promise((resolve, reject) => {
            newman.run({
                collection: this.config.collection,
                environment: this.config.environment,
                data: this.config.data,
                reporters: ['cli', 'json'],
                reporter: {
                    json: {
                        export: this.config.reportPath
                    }
                }
            }, (err, summary) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(summary);
                }
            });
        });
    }
    
    generateReport(summary) {
        const report = {
            totalTests: summary.run.stats.tests.total,
            passedTests: summary.run.stats.tests.total - summary.run.stats.tests.failed,
            failedTests: summary.run.stats.tests.failed,
            totalRequests: summary.run.stats.requests.total,
            averageResponseTime: summary.run.timings.responseAverage,
            failures: summary.run.failures.map(failure => ({
                test: failure.error.test,
                message: failure.error.message,
                request: failure.source.name
            }))
        };
        
        fs.writeFileSync('test-summary.json', JSON.stringify(report, null, 2));
        return report;
    }
}

// 使用示例
const config = {
    collection: 'api-tests.json',
    environment: 'dev-env.json',
    data: 'test-data.csv',
    reportPath: 'detailed-report.json'
};

const runner = new APITestRunner(config);

runner.runTests()
    .then(summary => {
        const report = runner.generateReport(summary);
        console.log('测试完成:', report);
        
        if (report.failedTests > 0) {
            process.exit(1);
        }
    })
    .catch(error => {
        console.error('测试失败:', error);
        process.exit(1);
    });`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Postman 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 组织结构</h4>
                                <p>合理组织API集合</p>
                                <ul>
                                    <li>按功能模块分组</li>
                                    <li>使用文件夹层级结构</li>
                                    <li>统一命名规范</li>
                                    <li>添加详细描述</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 环境管理</h4>
                                <p>有效管理不同环境</p>
                                <ul>
                                    <li>分离开发和生产环境</li>
                                    <li>使用环境变量</li>
                                    <li>敏感信息加密</li>
                                    <li>版本控制配置</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 测试策略</h4>
                                <p>编写有效的测试</p>
                                <ul>
                                    <li>覆盖正常和异常情况</li>
                                    <li>验证响应数据结构</li>
                                    <li>检查业务逻辑</li>
                                    <li>性能测试</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队协作</h4>
                                <p>促进团队协作</p>
                                <ul>
                                    <li>共享工作空间</li>
                                    <li>版本控制集合</li>
                                    <li>文档化API</li>
                                    <li>定期同步更新</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PostmanDetail
