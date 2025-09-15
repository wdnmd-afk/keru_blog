# AI聊天性能测试指南

## 测试环境要求

### 推荐测试环境
- **浏览器**: Chrome 120+ (开发者工具支持最佳)
- **设备配置**: 
  - CPU: Intel i5 8代+ 或 AMD Ryzen 5 3600+
  - 内存: 8GB+ RAM
  - 网络: 稳定的宽带连接
- **屏幕分辨率**: 1920x1080 或更高

### 测试数据准备
```javascript
// 短文本测试数据
const shortText = "这是一个简单的测试消息"

// 中等长度文本测试数据
const mediumText = "这是一个中等长度的测试消息，包含了一些复杂的内容，用于测试输入性能和渲染性能。".repeat(3)

// 长文本测试数据
const longText = "这是一个很长的测试消息，用于测试大量文本输入时的性能表现。包含各种字符：数字123456789，英文abcdefghijklmnopqrstuvwxyz，特殊符号!@#$%^&*()。".repeat(10)

// 包含代码的测试数据
const codeText = `请帮我生成一个React组件：
\`\`\`typescript
interface Props {
  title: string
  content: string
}

const MyComponent: React.FC<Props> = ({ title, content }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}
\`\`\`
这个组件应该如何优化？`
```

## 性能测试步骤

### 1. 输入性能测试

#### 测试步骤：
1. 打开 Chrome DevTools → Performance 面板
2. 点击录制按钮 (Record)
3. 在AI聊天输入框中执行以下操作：
   - 快速输入短文本 (50字符以内)
   - 快速输入中等文本 (200字符左右)
   - 快速输入长文本 (1000字符以上)
4. 停止录制并分析结果

#### 关键指标：
- **输入延迟**: 按键到字符显示的时间 < 50ms
- **帧率**: 输入过程中保持 55+ FPS
- **CPU使用率**: 输入时 < 40%
- **内存增长**: 输入过程中内存增长 < 5MB

#### 测试脚本：
```javascript
// 在浏览器控制台中运行
function testInputPerformance() {
  const textarea = document.querySelector('textarea[placeholder*="输入消息"]')
  if (!textarea) {
    console.error('未找到输入框')
    return
  }
  
  const testTexts = [
    "短文本测试",
    "中等长度文本测试".repeat(10),
    "长文本性能测试".repeat(50)
  ]
  
  let index = 0
  const interval = setInterval(() => {
    if (index >= testTexts.length) {
      clearInterval(interval)
      console.log('输入性能测试完成')
      return
    }
    
    const startTime = performance.now()
    textarea.value = testTexts[index]
    textarea.dispatchEvent(new Event('input', { bubbles: true }))
    const endTime = performance.now()
    
    console.log(`测试 ${index + 1}: 输入时间 ${endTime - startTime}ms`)
    index++
  }, 1000)
}

// 运行测试
testInputPerformance()
```

### 2. 流式响应性能测试

#### 测试步骤：
1. 发送会产生长回复的消息（如请求代码示例）
2. 观察AI回复的流式显示过程
3. 使用Performance面板记录整个过程

#### 关键指标：
- **流式渲染帧率**: 保持 50+ FPS
- **Markdown解析时间**: 每次更新 < 10ms
- **DOM更新频率**: 合理的批量更新
- **内存使用**: 流式过程中内存稳定

#### 测试用例：
```javascript
// 测试流式响应性能
async function testStreamPerformance() {
  const sendButton = document.querySelector('button[type="primary"]')
  const textarea = document.querySelector('textarea')
  
  if (!textarea || !sendButton) {
    console.error('未找到必要元素')
    return
  }
  
  // 发送会产生长回复的消息
  textarea.value = "请生成一个复杂的React组件代码示例，包含状态管理、事件处理和样式"
  textarea.dispatchEvent(new Event('input', { bubbles: true }))
  
  const startTime = performance.now()
  sendButton.click()
  
  // 监听回复完成
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const endTime = performance.now()
        console.log(`流式响应时间: ${endTime - startTime}ms`)
      }
    })
  })
  
  const messagesContainer = document.querySelector('.messages')
  if (messagesContainer) {
    observer.observe(messagesContainer, {
      childList: true,
      subtree: true,
      characterData: true
    })
  }
}
```

### 3. 内存泄漏测试

#### 测试步骤：
1. 打开 Chrome DevTools → Memory 面板
2. 执行多轮对话（10-20轮）
3. 每5轮对话后拍摄内存快照
4. 分析内存使用趋势

#### 测试脚本：
```javascript
// 内存泄漏测试
async function testMemoryLeak() {
  const testMessages = [
    "测试消息1",
    "请解释React的useEffect",
    "生成一个简单的JavaScript函数",
    "什么是闭包？",
    "如何优化React性能？"
  ]
  
  for (let round = 0; round < 4; round++) {
    console.log(`开始第 ${round + 1} 轮测试`)
    
    for (let i = 0; i < testMessages.length; i++) {
      const textarea = document.querySelector('textarea')
      const sendButton = document.querySelector('button[type="primary"]')
      
      if (textarea && sendButton) {
        textarea.value = testMessages[i]
        textarea.dispatchEvent(new Event('input', { bubbles: true }))
        sendButton.click()
        
        // 等待回复完成
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    }
    
    // 清空对话
    const clearButton = document.querySelector('button[danger]')
    if (clearButton && !clearButton.disabled) {
      clearButton.click()
      // 确认清空
      setTimeout(() => {
        const confirmButton = document.querySelector('.ant-popconfirm .ant-btn-primary')
        if (confirmButton) confirmButton.click()
      }, 100)
    }
    
    console.log(`第 ${round + 1} 轮测试完成，请拍摄内存快照`)
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
}
```

## 性能基准对比

### 优化前基准（预期）
```
输入性能:
- 短文本输入延迟: 100-200ms
- 长文本输入延迟: 300-500ms
- 输入时帧率: 30-40 FPS

流式响应:
- Markdown渲染时间: 20-50ms per update
- 流式显示帧率: 25-35 FPS
- 内存使用: 持续增长

整体性能:
- CPU使用率: 60-80%
- 内存占用: 50-100MB (持续增长)
```

### 优化后目标
```
输入性能:
- 短文本输入延迟: < 50ms
- 长文本输入延迟: < 100ms
- 输入时帧率: 55+ FPS

流式响应:
- Markdown渲染时间: < 10ms per update
- 流式显示帧率: 50+ FPS
- 内存使用: 稳定

整体性能:
- CPU使用率: < 40%
- 内存占用: < 50MB (稳定)
```

## 问题诊断指南

### 常见性能问题及解决方案

#### 1. 输入卡顿
**症状**: 输入文字时有明显延迟
**可能原因**: 
- 缺少防抖机制
- 组件重复渲染
- 复杂的状态计算

**诊断方法**:
```javascript
// 检查输入事件频率
let inputCount = 0
document.querySelector('textarea').addEventListener('input', () => {
  inputCount++
  console.log(`输入事件触发次数: ${inputCount}`)
})
```

#### 2. 流式响应卡顿
**症状**: AI回复显示不流畅，有跳跃感
**可能原因**:
- Markdown解析频率过高
- DOM更新未批量处理
- 组件未正确memo化

**诊断方法**:
```javascript
// 监控DOM更新频率
const observer = new MutationObserver((mutations) => {
  console.log(`DOM更新次数: ${mutations.length}`)
})
observer.observe(document.querySelector('.messages'), {
  childList: true,
  subtree: true,
  characterData: true
})
```

#### 3. 内存泄漏
**症状**: 长时间使用后页面变慢，内存持续增长
**可能原因**:
- 事件监听器未清理
- 定时器未清除
- 组件引用未释放

**诊断方法**:
- 使用Chrome DevTools Memory面板
- 对比多个时间点的内存快照
- 查找未释放的对象引用

## 测试报告模板

```markdown
# AI聊天性能测试报告

## 测试环境
- 浏览器: Chrome 120.0.6099.109
- 操作系统: Windows 11
- 设备配置: Intel i7-10700K, 16GB RAM
- 测试时间: 2024-01-XX

## 测试结果

### 输入性能
- 短文本输入延迟: XXms
- 长文本输入延迟: XXms
- 输入时平均帧率: XX FPS

### 流式响应性能
- 平均响应延迟: XXms
- 流式显示帧率: XX FPS
- Markdown渲染时间: XXms

### 内存使用
- 初始内存: XXMb
- 10轮对话后: XXMb
- 内存增长率: XX%

## 问题发现
1. [具体问题描述]
2. [性能瓶颈分析]

## 优化建议
1. [具体优化方案]
2. [预期性能提升]
```

通过这套完整的测试流程，可以全面评估AI聊天功能的性能表现，及时发现和解决性能问题。
