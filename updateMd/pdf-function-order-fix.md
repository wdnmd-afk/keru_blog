# PDF预览器函数引用顺序修复文档

## 问题描述

### 错误现象
- **错误类型**: Uncaught ReferenceError: Cannot access 'tryFallbackWorker' before initialization
- **错误位置**: PDFPreview.tsx:172:19
- **错误原因**: 在函数声明之前就尝试引用tryFallbackWorker函数

### 根本原因分析
1. **时间死区违规**: JavaScript的时间死区（Temporal Dead Zone）规则被违反
2. **函数声明顺序错误**: handleDocumentLoadError函数在tryFallbackWorker函数之前声明
3. **依赖关系混乱**: 函数之间的依赖关系没有正确排序
4. **useCallback依赖**: useCallback的依赖数组中引用了尚未声明的函数

### 具体问题点
```typescript
// 问题代码结构
const handleDocumentLoadError = useCallback((error: Error) => {
    // ...
    tryFallbackWorker() // ❌ 引用了尚未声明的函数
}, [onError, tryFallbackWorker]) // ❌ 依赖数组中引用未声明函数

const tryFallbackWorker = useCallback(() => {
    // ...
    handleRefresh() // ❌ 引用了尚未声明的函数
}, [])

const handleRefresh = useCallback(() => {
    // ...
}, [])
```

## 修复方案

### 1. 函数声明顺序重排 ✅

#### 修复策略
按照函数依赖关系重新排序，确保被依赖的函数先声明：

```
handleRefresh (基础函数，无依赖)
    ↓
tryFallbackWorker (依赖 handleRefresh)
    ↓
handleDocumentLoadError (依赖 tryFallbackWorker)
```

#### 修复后的函数顺序
```typescript
/**
 * 刷新PDF - 基础函数，无依赖
 */
const handleRefresh = useCallback(() => {
    setLoading(true)
    setError(null)
    setCurrentPage(1)
    setTotalPages(0)
}, [])

/**
 * 尝试使用备用worker源 - 依赖 handleRefresh
 */
const tryFallbackWorker = useCallback(() => {
    const currentVersion = pdfjs.version
    
    // ... worker源选择逻辑
    
    if (nextIndex >= 0 && nextIndex < workerSources.length) {
        const nextSrc = workerSources[nextIndex]
        console.log(`尝试备用PDF worker源 (v${currentVersion}):`, nextSrc)
        pdfjs.GlobalWorkerOptions.workerSrc = nextSrc
        
        // 延迟重试加载
        setTimeout(() => {
            handleRefresh() // ✅ 现在可以正确引用
        }, 1000)
    }
}, [handleRefresh]) // ✅ 正确的依赖数组

/**
 * 处理PDF文档加载失败 - 依赖 tryFallbackWorker
 */
const handleDocumentLoadError = useCallback((error: Error) => {
    // ... 错误处理逻辑
    
    if (error.message?.includes('worker')) {
        // ... 版本检查逻辑
        
        // 尝试使用备用worker源
        tryFallbackWorker() // ✅ 现在可以正确引用
    }
}, [onError, tryFallbackWorker]) // ✅ 正确的依赖数组
```

### 2. 依赖关系优化 ✅

#### 依赖数组修复
```typescript
// 修复前：依赖未声明的函数
const tryFallbackWorker = useCallback(() => {
    // ...
    handleRefresh()
}, []) // ❌ 缺少handleRefresh依赖

// 修复后：正确的依赖数组
const tryFallbackWorker = useCallback(() => {
    // ...
    handleRefresh()
}, [handleRefresh]) // ✅ 包含所有依赖
```

#### 函数引用检查
```typescript
// 确保所有函数引用都在声明之后
const handleDocumentLoadError = useCallback((error: Error) => {
    // ...
    if (workerSrc && !workerSrc.includes(currentVersion)) {
        // ...
        setTimeout(() => {
            handleRefresh() // ✅ handleRefresh已在前面声明
        }, 500)
    }
    
    // 尝试使用备用worker源
    tryFallbackWorker() // ✅ tryFallbackWorker已在前面声明
}, [onError, tryFallbackWorker]) // ✅ 所有依赖都已声明
```

### 3. 代码结构优化 ✅

#### 函数分组策略
```typescript
// 1. 基础工具函数（无依赖）
const handleRefresh = useCallback(() => { /* ... */ }, [])
const formatFileSize = useCallback(() => { /* ... */ }, [])

// 2. 核心业务函数（依赖基础函数）
const tryFallbackWorker = useCallback(() => { /* ... */ }, [handleRefresh])
const handlePageInputChange = useCallback(() => { /* ... */ }, [])

// 3. 事件处理函数（依赖核心函数）
const handleDocumentLoadError = useCallback(() => { /* ... */ }, [tryFallbackWorker])
const handleDocumentLoadSuccess = useCallback(() => { /* ... */ }, [])

// 4. 用户交互函数（依赖事件处理函数）
const handleZoomIn = useCallback(() => { /* ... */ }, [])
const handleNextPage = useCallback(() => { /* ... */ }, [])
```

## 技术原理

### JavaScript时间死区（TDZ）
```typescript
// 时间死区示例
console.log(myVar) // ❌ ReferenceError: Cannot access 'myVar' before initialization

const myVar = 'Hello'

console.log(myVar) // ✅ 正常工作
```

### useCallback依赖规则
```typescript
// React Hook依赖规则
const myCallback = useCallback(() => {
    someFunction() // 如果引用了外部函数
}, [someFunction]) // 必须在依赖数组中声明
```

### 函数提升 vs const声明
```typescript
// 函数声明 - 会被提升
function myFunction() {
    // 可以在声明前调用
}

// const函数 - 不会被提升
const myFunction = () => {
    // 不能在声明前调用
}
```

## 验证测试

### 1. 语法检查 ✅
```bash
# TypeScript编译检查
npx tsc --noEmit

# ESLint检查
npx eslint src/views/Files/components/PDFPreview.tsx
```

### 2. 运行时测试 ✅
```typescript
// 测试函数引用
console.log('handleRefresh:', typeof handleRefresh) // function
console.log('tryFallbackWorker:', typeof tryFallbackWorker) // function
console.log('handleDocumentLoadError:', typeof handleDocumentLoadError) // function
```

### 3. 功能验证 ✅
- [x] PDF预览器组件正常初始化
- [x] 版本匹配功能正常工作
- [x] 自动修复机制正常工作
- [x] 备用源切换功能正常
- [x] 错误处理功能正常

## 最佳实践

### 1. 函数声明顺序原则
- **无依赖函数优先**: 基础工具函数放在最前面
- **依赖关系排序**: 被依赖的函数先声明
- **分组管理**: 相关功能的函数放在一起

### 2. useCallback依赖管理
- **完整依赖**: 所有引用的外部变量和函数都要在依赖数组中
- **依赖检查**: 使用ESLint规则检查依赖完整性
- **避免循环依赖**: 设计时避免函数间的循环依赖

### 3. 代码组织建议
```typescript
// 推荐的组织结构
const Component = () => {
    // 1. 状态声明
    const [state, setState] = useState()
    
    // 2. 基础工具函数
    const utilFunction = useCallback(() => {}, [])
    
    // 3. 核心业务函数
    const businessFunction = useCallback(() => {}, [utilFunction])
    
    // 4. 事件处理函数
    const eventHandler = useCallback(() => {}, [businessFunction])
    
    // 5. 副作用
    useEffect(() => {}, [])
    
    // 6. 渲染
    return <div>...</div>
}
```

## 预防措施

### 1. 开发工具配置
```json
// .eslintrc.js
{
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-use-before-define": "error"
  }
}
```

### 2. 代码审查检查点
- [ ] 函数声明顺序是否正确
- [ ] useCallback依赖数组是否完整
- [ ] 是否存在循环依赖
- [ ] 函数引用是否在声明之后

### 3. 自动化检查
```bash
# 添加到CI/CD流程
npm run lint
npm run type-check
npm run test
```

这次函数引用顺序修复解决了JavaScript时间死区违规问题，确保了PDF预览器组件的正常初始化和运行，为后续功能开发提供了稳定的基础。
