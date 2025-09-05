# 静态文件服务器配置修复文档

## 问题描述

### 错误信息
- **错误**: GET http://localhost:3000//static/PDF/%E4%B8%9A%E8%B4%A2%E7%A8%8E%E4%B8%80%E4%BD%93%E5%8C%96%E5%AE%9E%E8%AE%AD%E8%BD%AF%E4%BB%B6%E9%87%87%E8%B4%AD%E9%A1%B9%E7%9B%AE.pdf net::ERR_CONNECTION_REFUSED
- **问题1**: 前端尝试访问localhost:3000端口，但连接被拒绝
- **问题2**: URL中存在双斜杠//问题

### 根本原因分析
1. **端口配置不一致**: 前端配置指向3000端口，但服务器未在该端口运行
2. **静态文件服务缺失**: 缺少专门的静态文件服务器
3. **URL路径问题**: 路径拼接时产生双斜杠
4. **配置分散**: 多个文件中的端口配置不统一

## 解决方案

### 1. 创建专用静态文件服务器 ✅

#### 服务器配置
**文件**: `server/static-server.js`

```javascript
const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 2130

// CORS配置
app.use(cors({
    origin: [
        'http://localhost:9394',  // 前端开发端口
        'http://127.0.0.1:9394',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
    credentials: true
}))

// 静态文件托管 - 修复目录映射
app.use('/static', express.static(path.resolve(process.cwd(), 'static'), {
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath).toLowerCase()
        
        // 设置正确的MIME类型
        if (ext === '.pdf') {
            res.setHeader('Content-Type', 'application/pdf')
        }
        // ... 其他MIME类型配置
        
        // 设置缓存头
        res.setHeader('Cache-Control', 'public, max-age=31536000')
    }
}))

app.listen(PORT, () => {
    console.log(`🌟 静态文件服务器启动成功! 端口: ${PORT}`)
})
```

#### 服务器特性
- **专用端口**: 运行在2130端口
- **CORS支持**: 支持跨域访问
- **MIME类型**: 正确设置文件MIME类型
- **缓存优化**: 设置长期缓存头
- **错误处理**: 完整的错误处理机制

### 2. 前端配置统一修复 ✅

#### 代理配置修复
**文件**: `frontEnd/src/build/proxy.ts`

```typescript
const proxyConfigMappings: Record<ProxyType, ProxyConfig> = {
    // 开发环境调用的接口 - 后端服务器运行在5566端口
    dev: {
        prefix: '/dev-api',
        target: 'http://127.0.0.1:5566',
    },

    // 生产环境调用的接口 - 静态文件服务器运行在2130端口
    prod: {
        prefix: '/prod-api',
        target: 'http://127.0.0.1:2130',
    },
}
```

#### 环境变量配置
**文件**: `frontEnd/.env.development`

```bash
# 开发环境配置
# PDF Worker 路径配置（开发环境使用localhost:2130）
VITE_PDF_WORKER_URL=http://localhost:2130/static/JS/pdf.worker.min.js

# API 基础路径
VITE_API_URL=/dev-api
VITE_API_BASE_URL=http://localhost:5566
```

#### 文件URL构建修复
**文件**: `frontEnd/src/store/fileStore.ts`

```typescript
const buildFileUrl = (path: string): string => {
    // 移除路径开头的斜杠，避免双斜杠
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    
    if (baseUrl) {
        return `${baseUrl}/${cleanPath}`
    }

    // 生产环境使用当前域名
    if (import.meta.env.PROD) {
        return `/${cleanPath}`
    }

    // 开发环境默认配置 - 修复双斜杠问题
    return `http://localhost:2130/${cleanPath}`
}
```

### 3. 启动脚本创建 ✅

#### Linux/Mac启动脚本
**文件**: `server/start-static-server.sh`

```bash
#!/bin/bash
echo "🚀 启动静态文件服务器..."

# 检查static目录
if [ ! -d "static" ]; then
    mkdir -p static/{PDF,IMAGE,VIDEO,DOCUMENT,JS}
fi

# 启动服务器
node static-server.js
```

#### Windows启动脚本
**文件**: `server/start-static-server.bat`

```batch
@echo off
echo 🚀 启动静态文件服务器...

REM 检查static目录
if not exist "static" (
    mkdir static\PDF static\IMAGE static\VIDEO static\DOCUMENT static\JS
)

REM 启动服务器
node static-server.js
```

### 4. 配置文件统一修复 ✅

#### 修复的配置文件列表
1. **frontEnd/src/build/proxy.ts** - 代理配置
2. **frontEnd/.env.development** - 环境变量
3. **frontEnd/src/store/fileStore.ts** - 文件URL构建
4. **frontEnd/src/components/Files/FilePreview.tsx** - 硬编码URL
5. **frontEnd/src/components/Files/PDFViewer.tsx** - Worker URL

#### 端口配置统一
- **后端API服务器**: 5566端口
- **静态文件服务器**: 2130端口
- **前端开发服务器**: 9394端口

## 部署和使用

### 开发环境启动流程

#### 1. 启动后端API服务器
```bash
cd server
npm run dev
# 服务器运行在 http://localhost:5566
```

#### 2. 启动静态文件服务器
```bash
cd server
chmod +x start-static-server.sh
./start-static-server.sh
# 或者 Windows: start-static-server.bat
# 服务器运行在 http://localhost:2130
```

#### 3. 启动前端开发服务器
```bash
cd frontEnd
npm run dev
# 前端运行在 http://localhost:9394
```

### 验证服务器状态

#### 检查静态文件服务器
```bash
# 健康检查
curl http://localhost:2130/health

# 测试静态文件访问
curl -I http://localhost:2130/static/PDF/test.pdf
```

#### 检查前端代理
```bash
# 检查API代理
curl http://localhost:9394/dev-api/health

# 检查前端页面
curl http://localhost:9394
```

## 故障排除

### 常见问题及解决方案

#### 1. 端口占用问题
```bash
# 检查端口占用
netstat -an | grep :2130
lsof -i :2130

# 杀死占用进程
kill -9 <PID>
```

#### 2. 静态文件404错误
```bash
# 检查uploads目录结构
ls -la server/uploads/

# 检查文件权限
chmod -R 755 server/uploads/
```

#### 3. CORS跨域问题
- 确认静态文件服务器的CORS配置包含前端域名
- 检查浏览器开发者工具的网络面板

#### 4. 双斜杠URL问题
- 检查buildFileUrl函数是否正确处理路径
- 验证前端组件中的URL拼接逻辑

### 调试工具

#### 网络请求调试
```javascript
// 在浏览器控制台测试
fetch('http://localhost:2130/health')
  .then(response => response.json())
  .then(data => console.log(data))

// 测试静态文件访问
fetch('http://localhost:2130/static/PDF/test.pdf')
  .then(response => console.log(response.status))
```

#### 服务器日志
```bash
# 查看静态文件服务器日志
node static-server.js

# 查看后端API服务器日志
cd server && npm run dev
```

## 预期效果

### ✅ 问题解决
- 消除ERR_CONNECTION_REFUSED错误
- 静态文件正常访问
- PDF预览功能恢复正常
- URL双斜杠问题修复

### ✅ 系统架构优化
- 清晰的服务分离（API服务器 + 静态文件服务器）
- 统一的端口配置管理
- 完整的CORS和MIME类型支持

### ✅ 开发体验提升
- 自动化启动脚本
- 完整的健康检查机制
- 详细的错误处理和日志

### ✅ 生产环境就绪
- 优化的缓存策略
- 正确的MIME类型设置
- 完整的错误处理机制

## 目录映射修复

### 问题描述
用户反馈需要将URL路径映射从 `uploads` 目录改为 `static` 目录：
- **要求**: `localhost:2130/static/*` 映射到 `E:\github\keru_blog\server\static\*`
- **原配置**: 映射到 `uploads` 目录
- **新配置**: 映射到 `static` 目录

### 修复实施 ✅

#### 1. 服务器配置修复
```javascript
// 修复前
app.use('/static', express.static(path.resolve(process.cwd(), 'uploads'), {

// 修复后
app.use('/static', express.static(path.resolve(process.cwd(), 'static'), {
```

#### 2. 启动脚本更新
```bash
# Linux/Mac脚本修复
if [ ! -d "static" ]; then
    mkdir -p static/{PDF,IMAGE,VIDEO,DOCUMENT,JS}
fi

# Windows脚本修复
if not exist "static" (
    mkdir static\PDF static\IMAGE static\VIDEO static\DOCUMENT static\JS
)
```

#### 3. 配置验证脚本
创建了 `verify-static-setup.js` 用于验证配置：
- 检查目录结构是否正确
- 验证URL路径映射
- 提供测试建议

### 目录结构
```
server/
├── static/
│   ├── PDF/          # PDF文件
│   ├── IMAGE/        # 图片文件
│   ├── VIDEO/        # 视频文件
│   ├── DOCUMENT/     # 文档文件
│   └── JS/           # JavaScript文件
├── static-server.js  # 静态文件服务器
└── verify-static-setup.js  # 配置验证脚本
```

### URL映射关系
- `http://localhost:2130/static/PDF/*` → `E:\github\keru_blog\server\static\PDF\*`
- `http://localhost:2130/static/IMAGE/*` → `E:\github\keru_blog\server\static\IMAGE\*`
- `http://localhost:2130/static/VIDEO/*` → `E:\github\keru_blog\server\static\VIDEO\*`
- `http://localhost:2130/static/DOCUMENT/*` → `E:\github\keru_blog\server\static\DOCUMENT\*`
- `http://localhost:2130/static/JS/*` → `E:\github\keru_blog\server\static\JS\*`

这次静态文件服务器配置修复建立了完整的文件服务架构，解决了端口配置不一致和URL路径问题，并正确配置了目录映射，为PDF预览功能提供了稳定可靠的基础设施支持。
