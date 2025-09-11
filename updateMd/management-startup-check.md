# Management 项目启动检查清单

## 启动前检查
- [ ] 确认 Node.js 版本 >= 18
- [ ] 确认已安装 pnpm 或 npm
- [ ] 确认在 management 目录下

## 依赖安装
```bash
# 检查是否已安装依赖
ls node_modules

# 如果没有 node_modules 目录，安装依赖
pnpm install
# 或者
npm install
```

## 环境配置检查
- [ ] 确认 `.env.development` 文件存在
- [ ] 确认 API 配置正确：`VITE_MANAGEMENT_API_URL=/management-api`
- [ ] 确认后端服务运行在端口 5566

## 启动命令
```bash
# 开发环境启动
pnpm dev
# 或者
npm run dev
```

## 预期结果
- [ ] 项目在 http://localhost:9395 启动成功
- [ ] 登录页面正常显示
- [ ] 主题色为 #8785a2
- [ ] 动画背景正常运行
- [ ] 登录按钮居中对齐

## 常见问题排查

### 1. 端口冲突
如果 9395 端口被占用：
```bash
# 查看端口占用
netstat -ano | findstr :9395
# 或者修改 vite.config.ts 中的端口配置
```

### 2. 依赖安装失败
```bash
# 清除缓存重新安装
pnpm store prune
pnpm install
# 或者
npm cache clean --force
npm install
```

### 3. 代理配置问题
确认 vite.config.ts 中的代理配置：
```typescript
proxy: {
  '/management-api': {
    target: 'http://127.0.0.1:5566',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/management-api/, ''),
  },
}
```

### 4. 后端服务连接问题
- [ ] 确认后端服务在 127.0.0.1:5566 运行
- [ ] 检查防火墙设置
- [ ] 验证网络连接

## 功能验证清单

### 登录功能
- [ ] 输入用户名和密码
- [ ] 点击登录按钮
- [ ] 验证 API 请求发送到 `/management-api/user/login`
- [ ] 验证登录成功后跳转到 dashboard

### 界面检查
- [ ] 主题色 #8785a2 正确应用
- [ ] 登录按钮完全居中
- [ ] 动画背景流畅运行
- [ ] 输入框聚焦效果正常
- [ ] 响应式布局在不同屏幕尺寸下正常

### 网络请求
- [ ] 打开浏览器开发者工具
- [ ] 检查 Network 标签
- [ ] 验证登录请求发送到正确的端点
- [ ] 确认请求参数格式正确（name, password, remember）

## 性能检查
- [ ] 页面加载时间 < 3秒
- [ ] 动画帧率稳定
- [ ] 内存使用正常
- [ ] 无控制台错误

## 浏览器兼容性
- [ ] Chrome (推荐)
- [ ] Firefox
- [ ] Edge
- [ ] Safari (如果在 macOS)

## 开发工具推荐
- [ ] React Developer Tools
- [ ] Redux DevTools (用于 Zustand)
- [ ] Vue.js devtools (如果需要)

## 故障排除步骤

1. **清除浏览器缓存**
   - 硬刷新：Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
   - 清除应用数据：开发者工具 > Application > Storage > Clear storage

2. **重启开发服务器**
   ```bash
   # 停止服务器 (Ctrl+C)
   # 重新启动
   pnpm dev
   ```

3. **检查控制台错误**
   - 打开开发者工具 (F12)
   - 查看 Console 标签中的错误信息
   - 查看 Network 标签中的请求状态

4. **验证配置文件**
   - 检查 vite.config.ts
   - 检查 .env.development
   - 检查 package.json 中的脚本

## 成功启动标志
当看到以下内容时，表示项目启动成功：
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:9395/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## 下一步操作
项目启动成功后，可以：
1. 测试登录功能
2. 验证 API 连接
3. 检查界面样式
4. 开始功能开发

## 联系支持
如果遇到无法解决的问题：
1. 检查项目文档
2. 查看 GitHub Issues
3. 联系开发团队
