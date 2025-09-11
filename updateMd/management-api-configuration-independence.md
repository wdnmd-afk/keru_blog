# Management 项目 API 配置独立化

## 配置变更概述

根据项目架构需求，将 management 项目的 API 配置修改为独立的管理端前缀，确保管理端有独立的 API 命名空间，同时保持与 frontEnd 项目使用相同的后端服务端口。

## 变更内容

### 1. API 前缀独立化

**变更前：**
- management 项目使用：`/blog-api`（与 frontEnd 相同）
- frontEnd 项目使用：`/blog-api`

**变更后：**
- management 项目使用：`/management-api`（独立前缀）
- frontEnd 项目使用：`/blog-api`

### 2. 后端服务端口统一

**保持不变：**
- 两个项目都请求同一个后端服务：`http://127.0.0.1:5566`
- 通过不同的 API 前缀进行区分

### 3. 配置清理

**移除内容：**
- 删除了 `/dev-api` 代理配置
- 简化了 vite.config.ts 中的 proxy 配置

## 具体文件修改

### 1. vite.config.ts

**修改前：**
```typescript
proxy: {
    // 博客 API 代理 - 与 frontEnd 保持一致
    '/blog-api': {
        target: 'http://127.0.0.1:5566',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blog-api/, ''),
    },
    // 开发环境 API 代理
    '/dev-api': {
        target: 'http://127.0.0.1:5566',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
    },
},
```

**修改后：**
```typescript
proxy: {
    // 管理系统专用 API 代理
    '/management-api': {
        target: 'http://127.0.0.1:5566',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/management-api/, ''),
    },
},
```

### 2. src/utils/http/index.ts

**修改前：**
```typescript
const config = {
    // 管理系统 API 基础地址 - 使用与 frontEnd 一致的 blog-api 前缀
    baseURL: import.meta.env.VITE_MANAGEMENT_API_URL || '/blog-api',
    // ...
}
```

**修改后：**
```typescript
const config = {
    // 管理系统 API 基础地址 - 使用管理端专用的 management-api 前缀
    baseURL: import.meta.env.VITE_MANAGEMENT_API_URL || '/management-api',
    // ...
}
```

### 3. .env.development

**修改前：**
```bash
# API 基础地址 - 与 frontEnd 保持一致
VITE_MANAGEMENT_API_URL=/blog-api
```

**修改后：**
```bash
# API 基础地址 - 管理端专用前缀
VITE_MANAGEMENT_API_URL=/management-api
```

## 架构优势

### 1. 命名空间隔离

- **管理端**：`/management-api/*` - 专用于管理系统的 API
- **前端**：`/blog-api/*` - 专用于博客前端的 API
- 避免了 API 路径冲突和混淆

### 2. 后端路由清晰

后端可以根据不同的前缀进行路由分发：
```javascript
// 后端路由示例
app.use('/management-api', managementRoutes);  // 管理端路由
app.use('/blog-api', blogRoutes);              // 博客前端路由
```

### 3. 权限控制便利

- 可以在代理层面对不同前缀应用不同的权限策略
- 管理端 API 可以有更严格的认证和授权机制
- 便于实施不同的安全策略

### 4. 监控和日志分离

- 可以分别监控管理端和前端的 API 调用
- 日志记录可以按照不同的前缀进行分类
- 便于问题排查和性能分析

## 请求流程

### Management 项目请求流程

```
前端请求 → /management-api/user/login
    ↓
Vite 代理 → http://127.0.0.1:5566/user/login
    ↓
后端服务 → 处理管理端登录逻辑
```

### FrontEnd 项目请求流程

```
前端请求 → /blog-api/user/login
    ↓
Vite 代理 → http://127.0.0.1:5566/user/login
    ↓
后端服务 → 处理博客前端登录逻辑
```

## 配置验证

### 1. 开发环境验证

启动 management 项目：
```bash
cd management
npm run dev
```

检查网络请求：
- 登录请求应该发送到：`http://localhost:9395/management-api/user/login`
- 代理后的实际请求：`http://127.0.0.1:5566/user/login`

### 2. 配置一致性检查

确认以下配置都使用 `/management-api` 前缀：
- [x] `vite.config.ts` 中的 proxy 配置
- [x] `src/utils/http/index.ts` 中的 baseURL
- [x] `.env.development` 中的环境变量

### 3. 功能验证

- [x] 登录功能正常工作
- [x] API 请求发送到正确的端点
- [x] 代理配置正确转发请求
- [x] 后端服务正常响应

## 登录接口修复

### 问题描述
登录时遇到错误：
```
code: 400
message: "property admin should not exist"
success: false
```

### 解决方案
移除登录请求中的 `admin` 字段：

**修改前：**
```typescript
const loginRequest: LoginRequest = {
    name: values.name,
    password: values.password,
    remember: values.remember,
    admin: true // 导致错误的字段
};
```

**修改后：**
```typescript
const loginRequest: LoginRequest = {
    name: values.name,
    password: values.password,
    remember: values.remember
};
```

### 接口定义更新
```typescript
export interface LoginRequest {
    name: string
    password: string
    remember?: boolean
    // 移除了 admin?: boolean
}
```

## 总结

通过这次配置独立化和接口修复，实现了：

1. **命名空间隔离**：管理端使用独立的 `/management-api` 前缀
2. **服务端口统一**：两个项目都请求端口 5566 的后端服务
3. **配置简化**：移除了不必要的 `/dev-api` 配置
4. **接口兼容**：修复了登录接口参数问题
5. **架构清晰**：前端和管理端有明确的 API 边界

这样的配置既保持了项目的独立性，又确保了后端服务的统一管理和接口兼容性。
