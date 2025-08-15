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

const ModulesDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/nodejs')
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
                    返回Node.js技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <DatabaseOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Node.js 模块系统深度解析</h1>
                    <p>掌握CommonJS、ES Modules与包管理的核心概念</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Node.js</Tag>
                        <Tag color="blue">模块系统</Tag>
                        <Tag color="orange">CommonJS</Tag>
                        <Tag color="purple">ES Modules</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* CommonJS vs ES Modules */}
                <Card title="📦 CommonJS vs ES Modules" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>CommonJS (CJS) - Node.js 默认模块系统</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 导出模块 - module.exports
// math.js
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

// 方式1：逐个导出
exports.add = add
exports.subtract = subtract

// 方式2：整体导出
module.exports = {
    add,
    subtract,
    PI: 3.14159
}

// 方式3：导出单个函数
module.exports = function multiply(a, b) {
    return a * b
}

// 导入模块 - require()
// app.js
const math = require('./math')
const { add, subtract } = require('./math')
const fs = require('fs')  // 内置模块
const express = require('express')  // 第三方模块

console.log(math.add(2, 3))  // 5
console.log(add(2, 3))       // 5`}
                            </pre>
                        </div>
                        
                        <h3>ES Modules (ESM) - 现代模块系统</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 导出模块 - export
// math.mjs 或在 package.json 中设置 "type": "module"
export function add(a, b) {
    return a + b
}

export function subtract(a, b) {
    return a - b
}

// 默认导出
export default function multiply(a, b) {
    return a * b
}

// 重新导出
export { PI } from './constants.mjs'

// 导入模块 - import
// app.mjs
import multiply, { add, subtract } from './math.mjs'
import * as math from './math.mjs'
import fs from 'fs'
import { readFile } from 'fs/promises'

console.log(add(2, 3))      // 5
console.log(multiply(2, 3)) // 6
console.log(math.add(2, 3)) // 5

// 动态导入
async function loadModule() {
    const { add } = await import('./math.mjs')
    return add(2, 3)
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 模块解析机制 */}
                <Card title="🔍 模块解析机制" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>CommonJS 模块解析</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Node.js 模块解析算法
require('./math')        // 相对路径
require('/abs/path')     // 绝对路径
require('express')       // 包名

// 解析顺序：
// 1. 核心模块 (fs, path, http 等)
// 2. 文件模块
//    - ./math.js
//    - ./math.json
//    - ./math.node
// 3. 目录模块
//    - ./math/package.json (main 字段)
//    - ./math/index.js
// 4. node_modules 查找
//    - ./node_modules/express
//    - ../node_modules/express
//    - ../../node_modules/express
//    - ... (向上递归)

// 模块缓存
console.log(require.cache)  // 查看模块缓存
delete require.cache[require.resolve('./math')]  // 清除缓存

// 模块包装
// Node.js 会将每个模块包装在函数中
(function(exports, require, module, __filename, __dirname) {
    // 模块代码
    console.log(__filename)  // 当前文件路径
    console.log(__dirname)   // 当前目录路径
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>ES Modules 解析</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// ES Modules 解析特点
// 1. 静态解析 - 编译时确定依赖关系
import { add } from './math.mjs'  // 静态导入

// 2. 动态导入 - 运行时加载
const math = await import('./math.mjs')  // 动态导入

// 3. 严格模式 - 自动启用严格模式
// 4. 顶层 await - 可以在模块顶层使用 await
const data = await fetch('/api/data')

// 5. import.meta - 模块元信息
console.log(import.meta.url)      // 当前模块 URL
console.log(import.meta.resolve)  // 解析模块路径

// 6. 条件导出 - package.json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}

// 7. 模块图 - 静态分析依赖关系
// 支持 tree-shaking 优化`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* package.json 配置 */}
                <Card title="📋 package.json 配置详解" className={styles.content_card}>
                    <div className={styles.package_section}>
                        <h3>基本配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`{
  "name": "my-package",
  "version": "1.0.0",
  "description": "A sample Node.js package",
  "main": "index.js",           // CommonJS 入口
  "module": "index.mjs",        // ES Module 入口
  "type": "module",             // 设置默认模块类型
  "exports": {                  // 现代导出配置
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils.mjs",
      "require": "./dist/utils.cjs"
    }
  },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "rollup -c",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "nodemon": "^2.0.15",
    "jest": "^27.5.1"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>高级配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`{
  // 条件导出
  "exports": {
    ".": {
      "node": "./dist/node.js",
      "browser": "./dist/browser.js",
      "development": "./src/index.js",
      "production": "./dist/index.min.js",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    }
  },
  
  // 导入映射
  "imports": {
    "#utils/*": "./src/utils/*",
    "#config": "./config/index.js"
  },
  
  // 文件包含/排除
  "files": [
    "dist/",
    "README.md",
    "LICENSE"
  ],
  
  // 二进制文件
  "bin": {
    "my-cli": "./bin/cli.js"
  },
  
  // 工作区配置
  "workspaces": [
    "packages/*"
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* NPM 包管理 */}
                <Card title="📦 NPM 包管理" className={styles.content_card}>
                    <div className={styles.npm_section}>
                        <h3>依赖管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装依赖
npm install express                    # 生产依赖
npm install --save-dev jest           # 开发依赖
npm install --global nodemon          # 全局安装
npm install express@4.18.0            # 指定版本

# 版本语义化 (Semantic Versioning)
"express": "4.18.0"      # 精确版本
"express": "^4.18.0"     # 兼容版本 (4.x.x)
"express": "~4.18.0"     # 补丁版本 (4.18.x)
"express": "*"           # 最新版本
"express": ">=4.18.0"    # 最小版本

# 锁定文件
package-lock.json        # npm 锁定文件
yarn.lock               # yarn 锁定文件

# 脚本执行
npm run start           # 执行 scripts 中的命令
npm run build
npx create-react-app    # 执行包而不安装`}
                            </pre>
                        </div>
                        
                        <h3>发布包</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 发布流程
npm login                # 登录 npm
npm version patch        # 更新版本号
npm publish             # 发布包
npm unpublish           # 撤销发布 (24小时内)

# .npmignore 文件
node_modules/
src/
tests/
*.test.js
.env

# 发布配置
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo.git"
  },
  "keywords": ["node", "javascript", "utility"],
  "author": "Your Name <email@example.com>",
  "license": "MIT"
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 模块系统最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 选择合适的模块系统</h4>
                                <p>根据项目需求选择 CommonJS 或 ES Modules</p>
                                <ul>
                                    <li><strong>CommonJS</strong>：传统 Node.js 项目，动态加载</li>
                                    <li><strong>ES Modules</strong>：现代项目，支持 tree-shaking</li>
                                    <li><strong>混合使用</strong>：通过条件导出支持两种格式</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 合理组织模块结构</h4>
                                <p>按功能和职责组织模块，保持清晰的依赖关系</p>
                                <div className={styles.code_block}>
                                    <pre>
{`src/
├── controllers/     # 控制器
├── models/         # 数据模型
├── services/       # 业务逻辑
├── utils/          # 工具函数
├── config/         # 配置文件
└── index.js        # 入口文件`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 版本管理策略</h4>
                                <p>遵循语义化版本控制，合理管理依赖版本</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 推荐的版本策略
{
  "dependencies": {
    "express": "^4.18.0",      // 主要依赖使用 ^
    "lodash": "~4.17.21"       // 工具库使用 ~
  },
  "devDependencies": {
    "jest": "^27.5.1",         // 开发工具可以更宽松
    "nodemon": "*"             // 开发工具可以使用最新版
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 性能优化</h4>
                                <p>优化模块加载性能，减少启动时间</p>
                                <ul>
                                    <li>使用动态导入延迟加载大型模块</li>
                                    <li>避免循环依赖</li>
                                    <li>合理使用模块缓存</li>
                                    <li>使用 ES Modules 支持 tree-shaking</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ModulesDetail
