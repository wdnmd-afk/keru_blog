# Passive Event Listener修复文档

## 问题描述

### 错误信息
- **错误**: `Unable to preventDefault inside passive event listener invocation.`
- **触发条件**: 在图片查看器中使用鼠标滚轮进行缩放操作时
- **影响**: 控制台出现错误警告，但功能仍然可用

### 根本原因分析
1. **浏览器默认行为**: 现代浏览器为了提高滚动性能，默认将wheel事件监听器设置为passive模式
2. **React事件处理**: React的合成事件系统无法覆盖浏览器的passive设置
3. **preventDefault冲突**: 在passive模式下调用`preventDefault()`会产生警告

### 技术背景
```javascript
// 浏览器默认行为
element.addEventListener('wheel', handler) // 默认passive: true

// 无法阻止默认行为
function handler(e) {
    e.preventDefault() // ❌ 在passive模式下无效，产生警告
}
```

## 修复方案

### 1. 使用原生事件监听器 ✅

#### 替换React事件处理
```typescript
// 修复前：使用React合成事件
const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault() // ❌ 在passive模式下产生警告
    // ... 缩放逻辑
}, [scale])

<div onWheel={handleWheel}> // ❌ 无法控制passive设置
```

```typescript
// 修复后：使用原生事件监听器
useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleNativeWheel = (e: WheelEvent) => {
        console.log('Native wheel event triggered:', e.deltaY, 'current scale:', scale)
        
        const delta = Math.sign(e.deltaY) * -0.1
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta))
        
        if (newScale !== scale) {
            e.preventDefault() // ✅ 在非passive模式下正常工作
            setScale(newScale)
        }
    }

    // 添加非passive的wheel事件监听器
    container.addEventListener('wheel', handleNativeWheel, { passive: false })

    return () => {
        container.removeEventListener('wheel', handleNativeWheel)
    }
}, [scale])
```

### 2. 关键技术点 ✅

#### 非Passive模式设置
```typescript
container.addEventListener('wheel', handleNativeWheel, { passive: false })
//                                                      ^^^^^^^^^^^^^^^^
//                                                      明确设置为非passive
```

#### 状态依赖管理
```typescript
useEffect(() => {
    // ... 事件处理逻辑
}, [scale]) // 依赖scale以获取最新值
```

#### 事件清理
```typescript
return () => {
    container.removeEventListener('wheel', handleNativeWheel)
}
```

### 3. 代码清理 ✅

#### 删除不再使用的代码
```typescript
// 删除的React事件处理函数
const handleWheel = useCallback((e: React.WheelEvent) => {
    // ... 已删除
}, [scale])

// 删除的JSX事件绑定
<div onWheel={handleWheel}> // 已删除
```

## 技术优势

### 1. 性能优化 ✅
- **精确控制**: 只在需要缩放时才阻止默认行为
- **减少干扰**: 不影响正常的页面滚动
- **原生性能**: 使用原生事件监听器，性能更好

### 2. 用户体验 ✅
- **无错误警告**: 消除控制台错误信息
- **功能完整**: 滚轮缩放功能正常工作
- **响应及时**: 事件处理更加直接和快速

### 3. 代码质量 ✅
- **明确意图**: 代码清楚表达了对passive模式的控制需求
- **资源管理**: 正确的事件监听器清理
- **状态同步**: 通过依赖数组确保获取最新状态

## 实现细节

### 事件处理逻辑 ✅
```typescript
const handleNativeWheel = (e: WheelEvent) => {
    console.log('Native wheel event triggered:', e.deltaY, 'current scale:', scale)
    
    const delta = Math.sign(e.deltaY) * -0.1
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta))
    
    console.log('Scale change:', { current: scale, delta, newScale })
    
    if (newScale !== scale) {
        e.preventDefault() // 只在实际缩放时阻止默认行为
        setScale(newScale)
    }
}
```

### 生命周期管理 ✅
```typescript
useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 添加事件监听器
    container.addEventListener('wheel', handleNativeWheel, { passive: false })

    // 清理函数
    return () => {
        container.removeEventListener('wheel', handleNativeWheel)
    }
}, [scale]) // 依赖scale确保获取最新值
```

### 条件阻止默认行为 ✅
```typescript
if (newScale !== scale) {
    e.preventDefault() // 只在实际缩放时阻止默认行为
    setScale(newScale)
}
```

**优势**:
- 只在需要时阻止默认行为
- 不影响正常的页面滚动
- 减少不必要的性能开销

## 测试验证

### 功能测试 ✅
- [x] 滚轮缩放功能正常工作
- [x] 缩放范围限制正确（0.1x - 5x）
- [x] 缩放步长合适（0.1增量）
- [x] 调试日志正常输出

### 错误消除 ✅
- [x] 控制台不再出现passive event listener警告
- [x] 没有其他JavaScript错误
- [x] 事件处理性能良好

### 兼容性测试 ✅
- [x] Chrome浏览器正常工作
- [x] Firefox浏览器正常工作
- [x] Safari浏览器正常工作
- [x] Edge浏览器正常工作

## 最佳实践

### 1. 事件监听器选择 ✅
```typescript
// 需要preventDefault时使用原生事件监听器
container.addEventListener('wheel', handler, { passive: false })

// 不需要preventDefault时可以使用React事件
<div onWheel={handler}>
```

### 2. 状态依赖管理 ✅
```typescript
// 在useEffect依赖数组中包含所有使用的状态
useEffect(() => {
    // 使用scale状态
}, [scale]) // 确保获取最新的scale值
```

### 3. 资源清理 ✅
```typescript
// 总是在useEffect的清理函数中移除事件监听器
return () => {
    container.removeEventListener('wheel', handleNativeWheel)
}
```

## 总结

这次修复解决了以下问题：

1. **消除警告**: 彻底解决了passive event listener警告
2. **保持功能**: 滚轮缩放功能完全正常
3. **性能优化**: 使用原生事件监听器提高性能
4. **代码质量**: 清理了不再使用的代码

修复后的实现更加健壮，符合现代浏览器的事件处理最佳实践，为用户提供了无错误的交互体验。
