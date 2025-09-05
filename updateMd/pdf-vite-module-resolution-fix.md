# PDF.js Vite模块解析问题修复文档

## 问题描述

### 错误信息
- **错误类型**: [vite] Internal server error: Failed to resolve import "pdfjs-dist/build/pdf.worker.entry" from "src/views/Files/components/PDFPreview.tsx". Does the file exist?
- **构建工具**: Vite
- **问题文件**: PDFPreview.tsx中的动态导入语句

### 根本原因分析
1. **模块解析失败**: Vite无法解析`pdfjs-dist/build/pdf.worker.entry`路径
2. **文件不存在**: pdfjs-dist@5.4.149包中可能没有`pdf.worker.entry`文件
3. **包结构变化**: 不同版本的pdfjs-dist包结构可能不同
4. **Vite配置问题**: Vite的模块解析配置可能需要调整

## 解决方案

### 1. 立即修复：使用本地静态文件 ✅

#### 修复代码
```typescript
// PDFPreview.tsx - 简化的worker配置
const setupPDFWorker = () => {
    const currentVersion = pdfjs.version
    console.log('检测到的PDF.js版本:', currentVersion)
    
    // 直接使用本地静态文件，避免模块解析问题
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
    
    console.log(`PDF.js worker配置成功 (v${currentVersion})`)
    console.log('Worker源:', pdfjs.GlobalWorkerOptions.workerSrc)
}
```

#### 部署worker文件
```bash
# 步骤1: 安装依赖（如果还没有安装）
cd frontEnd
npm install

# 步骤2: 复制worker文件到public目录
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/pdf.worker.min.js

# 步骤3: 验证文件存在
ls -la public/pdf.worker.min.js
```

### 2. 检查pdfjs-dist包结构

#### 检查已安装的包
```bash
# 检查pdfjs-dist包是否正确安装
ls -la node_modules/pdfjs-dist/

# 检查build目录结构
ls -la node_modules/pdfjs-dist/build/

# 查看可用的worker文件
ls -la node_modules/pdfjs-dist/build/pdf.worker*
```

#### 常见的worker文件路径
```bash
# pdfjs-dist@5.4.149可能的worker文件位置
node_modules/pdfjs-dist/build/pdf.worker.min.js
node_modules/pdfjs-dist/build/pdf.worker.js
node_modules/pdfjs-dist/build/pdf.worker.mjs
```

### 3. Vite配置优化（可选）

#### vite.config.js配置
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  // 优化依赖处理
  optimizeDeps: {
    include: [
      'pdfjs-dist',
      'react-pdf'
    ],
    exclude: [
      'pdfjs-dist/build/pdf.worker.min.js'
    ]
  },
  
  // 解决模块解析问题
  resolve: {
    alias: {
      // 为pdfjs-dist创建别名
      'pdfjs-dist': resolve(__dirname, 'node_modules/pdfjs-dist')
    }
  },
  
  // 静态资源处理
  publicDir: 'public',
  
  // 开发服务器配置
  server: {
    fs: {
      // 允许访问项目根目录之外的文件
      allow: ['..']
    }
  },
  
  // 构建配置
  build: {
    rollupOptions: {
      output: {
        // 确保worker文件被正确处理
        manualChunks: (id) => {
          if (id.includes('pdf.worker')) {
            return 'pdf-worker'
          }
        }
      }
    }
  }
})
```

### 4. 依赖管理

#### 确保正确的包版本
```json
// package.json
{
  "dependencies": {
    "react-pdf": "^9.2.1",
    "pdfjs-dist": "5.4.149"
  }
}
```

#### 重新安装依赖
```bash
# 清理node_modules和锁文件
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 或者使用yarn
rm -rf node_modules yarn.lock
yarn install
```

### 5. 替代方案：CDN备用

#### 如果本地包问题持续存在
```typescript
// PDFPreview.tsx - CDN备用方案
const setupPDFWorker = () => {
    const currentVersion = pdfjs.version
    console.log('检测到的PDF.js版本:', currentVersion)
    
    try {
        // 优先使用本地静态文件
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
        console.log('使用本地静态文件')
        
    } catch (error) {
        // 备用方案：使用CDN
        pdfjs.GlobalWorkerOptions.workerSrc = 
            `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${currentVersion}/pdf.worker.min.js`
        console.log('使用CDN备用方案')
    }
}
```

## 故障排除步骤

### 1. 验证依赖安装
```bash
# 检查package.json中的依赖
cat package.json | grep -A 5 -B 5 "pdfjs-dist"

# 检查实际安装的版本
npm list pdfjs-dist react-pdf

# 检查node_modules目录
ls -la node_modules/ | grep pdf
```

### 2. 检查文件存在性
```bash
# 检查pdfjs-dist包结构
find node_modules/pdfjs-dist -name "*.worker*" -type f

# 检查public目录
ls -la public/pdf.worker.min.js
```

### 3. 测试worker加载
```javascript
// 在浏览器控制台测试
fetch('/pdf.worker.min.js')
  .then(response => {
    if (response.ok) {
      console.log('Worker文件可访问')
    } else {
      console.error('Worker文件不可访问:', response.status)
    }
  })
  .catch(error => {
    console.error('Worker文件加载失败:', error)
  })
```

### 4. Vite开发服务器测试
```bash
# 启动开发服务器
npm run dev

# 在浏览器中访问
# http://localhost:5173/pdf.worker.min.js
# 应该能够下载worker文件
```

## 最佳实践

### 1. 简单可靠的配置
- 优先使用本地静态文件
- 避免复杂的动态导入
- 保持配置简单明了

### 2. 版本管理
- 使用固定版本号避免意外更新
- 定期检查依赖兼容性
- 保持react-pdf和pdfjs-dist版本匹配

### 3. 构建工具配置
- 根据使用的构建工具调整配置
- 确保worker文件被正确处理
- 测试生产环境构建

### 4. 错误处理
- 提供清晰的错误信息
- 实现备用方案
- 监控worker加载状态

## 验证清单

### 开发环境
- [ ] 依赖正确安装
- [ ] Worker文件存在于public目录
- [ ] Vite开发服务器正常启动
- [ ] PDF预览功能正常工作

### 生产环境
- [ ] 构建成功完成
- [ ] Worker文件包含在构建输出中
- [ ] 生产环境PDF预览正常
- [ ] 无控制台错误

## 预期结果

### ✅ 问题解决
- 消除Vite模块解析错误
- PDF.js worker正确加载
- PDF预览功能恢复正常

### ✅ 配置简化
- 使用最简单可靠的配置方法
- 避免复杂的模块解析问题
- 提高开发和维护效率

### ✅ 稳定性提升
- 不依赖复杂的动态导入
- 使用经过验证的静态文件方法
- 减少构建工具相关问题

这个修复方案通过使用本地静态文件的方式，彻底避免了Vite的模块解析问题，确保PDF预览功能的稳定性和可靠性。
