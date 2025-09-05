# PDF预览功能依赖安装说明

## 必需依赖

为了使用优化后的PDF预览功能，需要安装以下npm包：

### 1. 安装react-pdf和pdfjs-dist

```bash
npm install react-pdf pdfjs-dist
```

或者使用yarn：

```bash
yarn add react-pdf pdfjs-dist
```

### 2. 安装类型定义（如果使用TypeScript）

```bash
npm install --save-dev @types/react-pdf
```

或者：

```bash
yarn add -D @types/react-pdf
```

## 版本兼容性

### 当前使用版本（已验证可用）

- `react-pdf`: ^7.5.1 或更高版本
- `pdfjs-dist`: 使用CDN版本 2.10.377（已验证稳定）

### 重要说明

由于PDF.js worker加载问题，当前配置使用指定的CDN版本：
- **PDF.js主库**: https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js
- **PDF.js Worker**: https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js

这个版本组合已经过测试验证，能够稳定工作。

## 配置说明

### 1. PDF.js Worker配置

在PDFPreview组件中，我们使用指定版本的CDN加载PDF.js worker：

```typescript
import { pdfjs } from 'react-pdf'

// 设置PDF.js worker - 使用指定的可用版本（2.10.377）
const setupPDFWorker = () => {
    const workerSources = [
        // 主要CDN源 - 用户指定的可用版本
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js',
        // 备用CDN源 - 同版本
        'https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js',
        'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.10.377/build/pdf.worker.min.js',
        // 本地fallback
        '/pdf.worker.min.js'
    ]

    pdfjs.GlobalWorkerOptions.workerSrc = workerSources[0]
    console.log('PDF.js worker配置 (v2.10.377):', pdfjs.GlobalWorkerOptions.workerSrc)
}

setupPDFWorker()
```

### 2. 样式文件导入

确保导入必要的CSS文件：

```typescript
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
```

### 3. Webpack配置（如果需要）

如果遇到构建问题，可能需要在webpack配置中添加：

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.min.js',
    },
  },
  // ...
}
```

## 功能特性

安装完成后，PDF预览器将支持以下功能：

### 页面导航
- 上一页/下一页按钮
- 页码输入框直接跳转
- 显示当前页码和总页数

### 缩放控制
- 放大/缩小按钮
- 实际大小（100%）
- 适合页面宽度
- 适合页面高度
- 自定义缩放比例显示

### 键盘快捷键
- `←` `↑`: 上一页
- `→` `↓`: 下一页
- `+` `=`: 放大
- `-`: 缩小
- `Ctrl+0`: 实际大小
- `Home`: 第一页
- `End`: 最后一页

### 性能优化
- 页面懒加载
- 内存管理优化
- 响应式设计

## 故障排除

### 1. Worker加载失败 ⚠️ 常见问题

#### 问题现象
- 错误信息：`Setting up fake worker failed`
- 错误详情：`Failed to fetch dynamically imported module`
- PDF文件无法预览

#### 解决方案

##### 方案1：多CDN源配置（推荐）
```typescript
// PDFPreview.tsx中已实现
const workerSources = [
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`,
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`,
  `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`,
  '/pdf.worker.min.js'
]
```

##### 方案2：本地Worker文件
1. 下载PDF.js worker文件到public目录：
```bash
# 下载对应版本的worker文件
curl -o public/pdf.worker.min.js https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js
```

2. 配置使用本地worker：
```typescript
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
```

##### 方案3：npm包本地引入
```typescript
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
```

### 2. 样式问题

确保正确导入CSS文件，如果样式不生效，可以检查CSS加载顺序。

### 3. 构建错误

如果遇到构建错误，可能需要配置webpack或使用动态导入：

```typescript
const pdfjs = await import('pdfjs-dist/build/pdf')
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
```

## 使用示例

```typescript
import PDFPreview from '@/views/Files/components/PDFPreview'

<PDFPreview
  src="https://example.com/document.pdf"
  fileName="示例文档.pdf"
  fileSize={1024000}
  showToolbar={true}
  initialScale={1}
  enableKeyboard={true}
  onLoad={(numPages) => console.log(`PDF加载完成，共${numPages}页`)}
  onError={(error) => console.error('PDF加载失败:', error)}
  onPageChange={(pageNumber) => console.log(`切换到第${pageNumber}页`)}
/>
```

## 注意事项

1. **CORS问题**: 确保PDF文件服务器支持跨域访问
2. **文件大小**: 大文件可能需要较长加载时间
3. **浏览器兼容性**: 现代浏览器支持更好
4. **内存使用**: 大PDF文件会占用较多内存

安装完成后，重启开发服务器即可使用优化后的PDF预览功能。
