# API 请求统一化改造文档

## 改造目标

将项目中所有直接使用原生 `fetch()` API 的接口调用统一改为使用封装的 `Http` 类，确保所有接口都能享受到统一的错误处理、认证管理和拦截器功能。

## 改造范围

### 已完成的修改

#### 1. aiApi.ts 中的 chat 函数
**修改前：**
```typescript
export async function chat(req: ChatReq) {
  const token = BrowserLocalStorage.get('userInfo')?.token || ''
  const r = await fetch(`${baseURL}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(req),
    credentials: 'include',
  })
  if (!r.ok) {
    if (r.status === 401) {
      handle401Error()
    }
    throw new Error(`HTTP ${r.status}`)
  }
  return r.json()
}
```

**修改后：**
```typescript
export async function chat(req: ChatReq) {
  // 改为使用 Http 类，统一错误处理（包括401拦截）
  return await Http.post('/ai/chat', req)
}
```

#### 2. fetchRecentConversations 函数
**修改前：**
```typescript
export async function fetchRecentConversations() {
  const token = BrowserLocalStorage.get('userInfo')?.token || ''
  const r = await fetch(`${baseURL}/ai/conversations/recent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({}),
    credentials: 'include',
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}
```

**修改后：**
```typescript
export async function fetchRecentConversations() {
  // 改为使用 Http 类，统一错误处理（包括401拦截）
  return await Http.post('/ai/conversations/recent', {})
}
```

### 已确认使用 Http 类的 API 文件

以下 API 文件已经正确使用了 `Http` 类，无需修改：

1. **loginApi.ts** - 登录相关接口
   ```typescript
   public static async login(params: LoginProp) {
       return await Http.post('/user/login', params)
   }
   ```

2. **fileApi.ts** - 文件管理接口
   ```typescript
   public static async queryFileList(params: FileQuery) {
       return await Http.post('/file/query', params)
   }
   ```

3. **todoApi.ts** - 待办事项接口
   ```typescript
   public static async getTodos() {
       return await Http.post('/todo/getTodos')
   }
   ```

4. **homeApi.ts** - 首页接口
   ```typescript
   public static async test(params: any) {
       return await Http.post('/user/index', params)
   }
   ```

5. **feedback.ts** - 反馈接口
   ```typescript
   static async submit(payload: SubmitFeedbackPayload) {
       return Http.post('/public/feedback/submit', payload)
   }
   ```

### 保留原生 fetch() 的合理场景

以下场景继续使用原生 `fetch()`，有合理的技术原因：

#### 1. SSE 流式处理（aiApi.ts - streamChat 函数）
**原因：** 需要处理 ReadableStream，axios 不支持流式读取
```typescript
export async function streamChat(req: ChatReq, handlers: {...}) {
  const r = await fetch(`${baseURL}/ai/chat/stream`, {
    method: 'POST',
    // ... 配置
  })
  const reader = r.body.getReader() // 需要直接访问 ReadableStream
  // ... 流式处理逻辑
}
```

#### 2. 静态文件加载
**文件：** EnhancedMarkdownPreview.tsx、TextPreview.tsx、MarkdownPreview.tsx
**原因：** 加载静态文件内容，不需要认证和业务错误处理
```typescript
const response = await fetch(src) // 加载 Markdown 文件内容
const markdownContent = await response.text()
```

#### 3. 示例代码
**文件：** VuexPiniaDetail.tsx
**原因：** 教程示例代码，不是实际的 API 调用

## 改造效果

### 统一的错误处理
- 所有 API 接口现在都享受统一的 401 错误处理
- 自动弹出"登录已过期"确认对话框
- 防重复弹窗机制

### 统一的认证管理
- 自动添加 Authorization 头部
- 无需手动处理 token 获取和设置

### 统一的请求配置
- 统一的超时设置
- 统一的 baseURL 配置
- 统一的跨域凭证处理

## 验证方式

1. **功能验证**
   - 所有 API 调用功能正常
   - 401 错误能正确触发登录过期提示
   - 流式 AI 对话仍然正常工作

2. **错误处理验证**
   - token 过期时，所有接口都能触发统一的错误处理
   - 网络错误、服务器错误等都有统一的处理逻辑

3. **性能验证**
   - 请求性能没有明显下降
   - 流式处理延迟正常

## 技术收益

1. **代码一致性**：所有 API 调用方式统一
2. **维护性提升**：错误处理逻辑集中管理
3. **用户体验改善**：统一的错误提示和处理流程
4. **安全性增强**：统一的认证和授权处理

## 后续建议

1. **新增 API 规范**：新增的 API 接口应优先使用 `Http` 类
2. **代码审查**：在代码审查中检查是否有新的原生 `fetch()` 调用
3. **文档更新**：更新开发文档，明确 API 调用规范
4. **类型安全**：考虑为 `Http` 类添加更严格的 TypeScript 类型定义

## 风险评估

- **低风险**：改动主要是替换调用方式，业务逻辑不变
- **已测试**：核心功能（AI 对话、文件管理、用户认证）已验证正常
- **回滚方案**：如有问题可快速回滚到原生 `fetch()` 实现

## 总结

本次改造成功统一了项目中的 HTTP 请求处理方式，在保持功能完整性的前提下，显著提升了代码的一致性和可维护性。特别是 401 错误处理的统一化，为用户提供了更好的体验。
