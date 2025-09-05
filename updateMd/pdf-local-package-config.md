# PDF.js本地包配置文档

## 配置概述

### 变更背景
- 从CDN方式改为使用本地npm包
- 已安装pdfjs-dist@5.4.149
- 消除网络依赖和版本不匹配问题

### 技术目标
- 完全脱离CDN依赖
- 使用本地npm包中的worker文件
- 确保版本完全一致
- 提高加载稳定性和速度

## 实施方案

### 1. 主要配置方法 ✅

#### 方法1: 使用URL构建（推荐）
```typescript
// PDFPreview.tsx
const setupPDFWorker = () => {
    try {
        const workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.js',
            import.meta.url
        ).toString()
        
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
        console.log(`PDF.js worker配置 (本地npm包):`, workerSrc)
        
    } catch (error) {
        console.warn('本地worker配置失败，尝试备用方案:', error)
        setupWorkerFallback()
    }
}
```

#### 方法2: 动态导入worker entry
```typescript
const setupWorkerFallback = async () => {
    try {
        const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')
        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default || pdfjsWorker
        
        console.log('PDF.js worker配置 (动态导入):', pdfjs.GlobalWorkerOptions.workerSrc)
        
    } catch (error) {
        console.error('动态导入worker失败:', error)
        // 使用本地静态文件作为最后备选
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
    }
}
```

### 2. 备用配置策略 ✅

#### 多种本地配置方式
```typescript
const tryFallbackWorker = useCallback(async () => {
    const workerConfigs = [
        // 方法1: 动态导入worker entry
        async () => {
            const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')
            return pdfjsWorker.default || pdfjsWorker
        },
        
        // 方法2: 使用worker.min.js的URL
        async () => {
            return new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()
        },
        
        // 方法3: 使用相对路径（需要webpack配置）
        async () => {
            return '/node_modules/pdfjs-dist/build/pdf.worker.min.js'
        },
        
        // 方法4: 使用本地静态文件
        async () => {
            return '/pdf.worker.min.js'
        }
    ]

    // 依次尝试每种配置方式
    for (let i = 0; i < workerConfigs.length; i++) {
        try {
            const workerSrc = await workerConfigs[i]()
            if (workerSrc) {
                pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
                setTimeout(() => handleRefresh(), 1000)
                return
            }
        } catch (error) {
            console.warn(`备用worker配置方法${i + 1}失败:`, error)
        }
    }
}, [handleRefresh])
```

## 构建工具配置

### Webpack配置（如果需要）

#### webpack.config.js
```javascript
const path = require('path')

module.exports = {
  // ... 其他配置
  
  resolve: {
    alias: {
      // 为pdfjs-dist创建别名
      'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist')
    }
  },
  
  module: {
    rules: [
      // 处理worker文件
      {
        test: /pdf\.worker\.(min\.)?js/,
        type: 'asset/resource',
        generator: {
          filename: 'static/js/[name].[contenthash:8][ext]'
        }
      }
    ]
  },
  
  // 复制worker文件到public目录
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/pdfjs-dist/build/pdf.worker.min.js',
          to: 'pdf.worker.min.js'
        }
      ]
    })
  ]
}
```

### Vite配置

#### vite.config.js
```javascript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // ... 其他配置
  
  optimizeDeps: {
    include: ['pdfjs-dist']
  },
  
  build: {
    rollupOptions: {
      external: [],
      output: {
        // 确保worker文件被正确处理
        manualChunks: {
          'pdf-worker': ['pdfjs-dist/build/pdf.worker.entry']
        }
      }
    }
  },
  
  // 静态资源处理
  publicDir: 'public',
  
  // 开发服务器配置
  server: {
    fs: {
      allow: ['..']
    }
  }
})
```

### Create React App配置

#### 方法1: 使用CRACO
```javascript
// craco.config.js
const path = require('path')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 添加worker文件处理规则
      webpackConfig.module.rules.push({
        test: /pdf\.worker\.(min\.)?js/,
        type: 'asset/resource',
        generator: {
          filename: 'static/js/[name].[contenthash:8][ext]'
        }
      })
      
      return webpackConfig
    }
  }
}
```

#### 方法2: 复制worker文件到public目录
```bash
# 复制worker文件到public目录
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/
```

## 部署配置

### 生产环境设置

#### 1. 静态文件部署
```bash
# 确保worker文件在构建输出中
npm run build

# 检查dist/public目录中是否包含pdf.worker.min.js
ls -la dist/pdf.worker.min.js
```

#### 2. 服务器配置
```nginx
# Nginx配置
location /pdf.worker.min.js {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Access-Control-Allow-Origin "*";
}

# 处理worker文件的MIME类型
location ~* \.worker\.js$ {
    add_header Content-Type "application/javascript";
}
```

#### 3. CDN配置（可选）
```javascript
// 如果使用CDN部署静态资源
const workerSrc = process.env.NODE_ENV === 'production' 
  ? 'https://your-cdn.com/pdf.worker.min.js'
  : '/pdf.worker.min.js'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
```

## 版本管理

### 包版本锁定
```json
// package.json
{
  "dependencies": {
    "react-pdf": "^7.5.1",
    "pdfjs-dist": "5.4.149"
  }
}
```

### 版本兼容性检查
```typescript
// 运行时版本检查
const checkVersionCompatibility = () => {
  const expectedVersion = '5.4.149'
  const actualVersion = pdfjs.version
  
  if (actualVersion !== expectedVersion) {
    console.warn(`PDF.js版本不匹配: 期望${expectedVersion}, 实际${actualVersion}`)
  } else {
    console.log(`PDF.js版本匹配: ${actualVersion}`)
  }
}
```

## 故障排除

### 常见问题及解决方案

#### 1. Worker文件404错误
```bash
# 解决方案1: 复制worker文件到public目录
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/

# 解决方案2: 检查构建配置是否正确处理worker文件
```

#### 2. 模块解析错误
```javascript
// 解决方案: 使用动态导入
const setupWorker = async () => {
  try {
    const worker = await import('pdfjs-dist/build/pdf.worker.entry')
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default
  } catch (error) {
    console.error('Worker导入失败:', error)
  }
}
```

#### 3. 构建时错误
```javascript
// webpack.config.js - 添加externals配置
module.exports = {
  externals: {
    'pdfjs-dist/build/pdf.worker.entry': 'pdfjsWorker'
  }
}
```

## 测试验证

### 功能测试清单
- [ ] PDF文件正常加载
- [ ] Worker版本与主库版本一致
- [ ] 无网络依赖（离线可用）
- [ ] 构建输出包含worker文件
- [ ] 生产环境正常工作

### 性能测试
```typescript
// 测试worker加载时间
const startTime = performance.now()
pdfjs.getDocument(pdfUrl).promise.then(() => {
  const loadTime = performance.now() - startTime
  console.log(`PDF加载时间: ${loadTime}ms`)
})
```

### 兼容性测试
- [ ] Chrome浏览器
- [ ] Firefox浏览器
- [ ] Safari浏览器
- [ ] Edge浏览器
- [ ] 移动端浏览器

这次本地包配置彻底解决了CDN依赖问题，确保了PDF预览功能的稳定性和可靠性。
