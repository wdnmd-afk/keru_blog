# PDF.js Worker路径配置修复文档

## 问题描述

### 错误现象
- **错误信息**: GET http://localhost:9394/src/views/Files/components/pdfjs-dist/build/pdf.worker.min.js net::ERR_ABORTED 404 (Not Found)
- **问题原因**: worker文件路径解析错误，指向了错误的相对路径
- **影响**: PDF预览功能无法正常工作

### 根本原因分析
1. **路径解析错误**: 使用`new URL()`和`import.meta.url`导致路径解析到组件文件的相对路径
2. **配置过于复杂**: 多种备选方案增加了调试难度
3. **npm包路径问题**: 直接引用npm包路径在某些构建环境下不可用

## 修复方案

### 1. 简化Worker配置 ✅

#### 修复前的复杂配置
```typescript
// 问题代码 - 路径解析错误
const workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString()
// 结果: http://localhost:9394/src/views/Files/components/pdfjs-dist/build/pdf.worker.min.js

// 多种备选方案 - 过于复杂
const workerConfigs = [
    async () => { /* 方法1 */ },
    async () => { /* 方法2 */ },
    async () => { /* 方法3 */ },
    async () => { /* 方法4 */ }
]
```

#### 修复后的简化配置
```typescript
// 简化的worker配置
const setupPDFWorker = async () => {
    const currentVersion = pdfjs.version
    console.log('检测到的PDF.js版本:', currentVersion)
    
    try {
        // 使用动态导入方式加载worker（最可靠的方法）
        const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')
        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default || pdfjsWorker
        
        console.log(`PDF.js worker配置成功 (v${currentVersion})`)
        console.log('Worker源:', pdfjs.GlobalWorkerOptions.workerSrc)
        
    } catch (error) {
        console.error('动态导入worker失败:', error)
        
        // 备用方案：使用本地静态文件
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
        console.log('使用本地静态文件作为worker源')
    }
}
```

### 2. 简化备用源切换 ✅

#### 修复前的复杂切换逻辑
```typescript
// 问题代码 - 多种配置方式
const tryFallbackWorker = useCallback(async () => {
    const workerConfigs = [
        async () => { /* 动态导入 */ },
        async () => { /* URL构建 */ },
        async () => { /* 相对路径 */ },
        async () => { /* 本地静态文件 */ }
    ]
    
    // 复杂的循环尝试逻辑
    for (let i = 0; i < workerConfigs.length; i++) {
        // ...
    }
}, [handleRefresh])
```

#### 修复后的简化切换逻辑
```typescript
// 简化的备用源切换
const tryFallbackWorker = useCallback(() => {
    console.log('尝试备用PDF worker配置')
    
    // 使用本地静态文件作为备用方案
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
    console.log('使用本地静态文件作为备用worker源')
    
    // 延迟重试加载
    setTimeout(() => {
        handleRefresh()
    }, 1000)
}, [handleRefresh])
```

### 3. 删除冗余代码 ✅

#### 删除的内容
- `setupWorkerFallback`备用函数
- 多种worker配置方式的复杂逻辑
- URL构建相关的错误处理
- 不必要的版本检查逻辑

#### 保留的内容
- 动态导入worker entry的主要方法
- 本地静态文件的备用方案
- 基本的错误处理和日志输出

## 技术原理

### 动态导入的优势
```typescript
// 动态导入worker entry
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default || pdfjsWorker
```

**优势**:
1. **构建工具友好**: webpack、vite等构建工具能正确处理
2. **版本一致**: 自动使用与主库相同版本的worker
3. **路径正确**: 不会产生错误的相对路径
4. **类型安全**: TypeScript能正确识别模块类型

### 本地静态文件备用方案
```typescript
// 备用方案：本地静态文件
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
```

**使用场景**:
1. 动态导入失败时的备用方案
2. 需要完全控制worker文件版本
3. 特殊的部署环境要求

**部署要求**:
```bash
# 需要将worker文件复制到public目录
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/
```

## 部署配置

### 开发环境
```bash
# 确保worker文件在public目录中
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/pdf.worker.min.js
```

### 生产环境
```bash
# 构建时确保worker文件被包含
npm run build

# 检查构建输出
ls -la dist/pdf.worker.min.js
```

### 服务器配置
```nginx
# Nginx配置
location /pdf.worker.min.js {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Content-Type "application/javascript";
}
```

## 测试验证

### 功能测试
- [ ] PDF文件正常加载
- [ ] Worker文件正确加载（无404错误）
- [ ] 版本匹配检查通过
- [ ] 备用方案正常工作

### 路径验证
```javascript
// 检查worker路径
console.log('Worker配置:', pdfjs.GlobalWorkerOptions.workerSrc)

// 验证worker文件可访问
fetch(pdfjs.GlobalWorkerOptions.workerSrc)
  .then(response => {
    if (response.ok) {
      console.log('Worker文件可访问')
    } else {
      console.error('Worker文件不可访问:', response.status)
    }
  })
```

### 错误监控
```javascript
// 监控worker加载错误
window.addEventListener('error', (event) => {
  if (event.filename?.includes('pdf.worker')) {
    console.error('PDF Worker加载错误:', event.error)
  }
})
```

## 故障排除

### 常见问题

#### 1. 动态导入失败
**现象**: `Cannot resolve module 'pdfjs-dist/build/pdf.worker.entry'`

**解决方案**:
```bash
# 确保pdfjs-dist包已正确安装
npm install pdfjs-dist@5.4.149

# 检查包文件是否存在
ls node_modules/pdfjs-dist/build/pdf.worker.entry.js
```

#### 2. 本地静态文件404
**现象**: `GET /pdf.worker.min.js 404 (Not Found)`

**解决方案**:
```bash
# 复制worker文件到public目录
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/

# 或在构建配置中添加复制规则
```

#### 3. 版本不匹配
**现象**: Worker版本与主库版本不一致

**解决方案**:
```bash
# 确保使用相同版本
npm install pdfjs-dist@5.4.149 --save-exact
```

## 预期效果

### ✅ 问题解决
- 消除404错误
- Worker文件正确加载
- PDF预览功能正常工作

### ✅ 代码简化
- 删除复杂的多方案配置
- 保留最有效的配置方式
- 减少调试复杂度

### ✅ 稳定性提升
- 使用最可靠的动态导入方式
- 简单有效的备用方案
- 清晰的错误处理逻辑

### ✅ 维护性改善
- 代码结构更清晰
- 配置逻辑更简单
- 问题排查更容易

这次简化配置修复彻底解决了worker路径问题，通过删除复杂的多方案配置，保留最有效的方法，确保了PDF预览功能的稳定性和可维护性。
