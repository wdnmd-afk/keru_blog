# 认证白名单配置说明

## 概述
为了支持重置密码等无需token的功能，我们实现了认证白名单机制。白名单中的路由可以在无token的情况下直接访问。

## 配置文件
- **位置**: `src/config/whitelist.ts`
- **作用**: 统一管理所有无需认证的路由

## 当前白名单路由
1. `/user/register` - 用户注册
2. `/user/login` - 用户登录  
3. `/user/resetPassword` - 重置密码

## 工作原理
1. **AuthMiddleware** 在每个请求进入时检查路由是否在白名单中
2. 如果路由在白名单中，直接放行，不进行token验证
3. 如果路由不在白名单中，执行正常的JWT token验证流程

## 安全考虑
- 只有真正需要匿名访问的路由才应该加入白名单
- 敏感操作（如用户数据查询、修改）绝不应该加入白名单
- 重置密码已通过双重身份验证（用户名+邮箱）和限流保护确保安全

## 如何添加新的白名单路由
在 `src/config/whitelist.ts` 文件的 `AUTH_WHITELIST` 数组中添加新路由：

```typescript
export const AUTH_WHITELIST = [
    '/user/register',
    '/user/login',
    '/user/resetPassword',
    '/api/public/new-route', // 新增路由
] as const;
```

## 使用效果
现在重置密码接口 `/user/resetPassword` 可以在无token的情况下正常访问，满足用户忘记密码场景的需求。