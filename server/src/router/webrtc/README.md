# WebRTC模块

## 概述

WebRTC模块为Keru Blog项目提供实时音视频通信功能，支持点对点连接和多人房间通信。

## 功能特性

### 🎯 核心功能
- **房间管理**: 创建、加入、离开房间
- **信令服务**: WebRTC信令消息转发
- **连接管理**: 用户连接状态跟踪
- **统计监控**: 实时连接质量统计
- **跨服务器**: Redis Pub/Sub支持集群部署

### 🔧 技术特性
- **WebSocket通信**: 基于Socket.IO的实时通信
- **类型安全**: 完整的TypeScript类型定义
- **依赖注入**: 基于Inversify的模块化架构
- **数据验证**: 使用class-validator进行请求验证
- **错误处理**: 完善的错误处理和日志记录

## 架构设计

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Redis         │
│   (React)       │    │   (Nest.js)     │    │   (Pub/Sub)     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • WebRTC API    │◄──►│ • WebSocket     │◄──►│ • 信令转发      │
│ • Socket.IO     │    │ • 房间管理      │    │ • 状态同步      │
│ • 媒体流处理    │    │ • 用户管理      │    │ • 集群支持      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 目录结构

```
webrtc/
├── controller.ts      # HTTP API控制器
├── service.ts         # 业务逻辑服务
├── gateway.ts         # WebSocket网关
├── websocket.ts       # WebSocket服务器配置
├── dto.ts            # 数据传输对象
├── index.ts          # 模块入口
└── README.md         # 文档
```

## API接口

### HTTP接口

#### 房间管理
- `GET /api/webrtc/rooms` - 获取房间列表
- `POST /api/webrtc/rooms` - 创建房间
- `GET /api/webrtc/rooms/:id` - 获取房间详情
- `POST /api/webrtc/rooms/:id/join` - 加入房间
- `POST /api/webrtc/rooms/:id/leave` - 离开房间
- `DELETE /api/webrtc/rooms/:id` - 删除房间

#### 统计信息
- `GET /api/webrtc/rooms/:id/stats` - 房间统计
- `GET /api/webrtc/users/:id/stats` - 用户统计
- `POST /api/webrtc/stats` - 更新连接统计

#### 配置和状态
- `GET /api/webrtc/status` - 服务状态
- `GET /api/webrtc/ice-servers` - ICE服务器配置
- `GET /api/webrtc/health` - 健康检查

### WebSocket事件

#### 连接管理
- `authenticate` - 用户认证
- `join-room` - 加入房间
- `leave-room` - 离开房间

#### 信令消息
- `offer` - WebRTC Offer
- `answer` - WebRTC Answer
- `ice-candidate` - ICE候选

#### 状态更新
- `connection-state-change` - 连接状态变化
- `stats-update` - 统计信息更新

## 使用示例

### 创建房间

```typescript
// HTTP请求
const response = await fetch('/api/webrtc/rooms', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: '我的直播间',
    description: '欢迎来到我的直播间',
    maxParticipants: 10,
    isPrivate: false
  })
})

const room = await response.json()
```

### WebSocket连接

```typescript
import { io } from 'socket.io-client'

const socket = io('ws://localhost:3001', {
  auth: {
    token: 'your-jwt-token',
    userId: 'user-id',
    username: 'username'
  }
})

// 加入房间
socket.emit('join-room', {
  roomId: 'room-id',
  role: 'broadcaster',
  password: 'optional-password'
})

// 监听事件
socket.on('room-joined', (data) => {
  console.log('成功加入房间:', data)
})

socket.on('user-joined', (data) => {
  console.log('新用户加入:', data)
})
```

### WebRTC信令

```typescript
// 发送Offer
socket.emit('offer', {
  offer: {
    type: 'offer',
    sdp: 'sdp-content'
  },
  targetUserId: 'target-user-id'
})

// 接收Answer
socket.on('answer', (data) => {
  const { answer, fromUserId } = data
  // 处理Answer
})

// ICE候选交换
socket.emit('ice-candidate', {
  candidate: {
    candidate: 'candidate-string',
    sdpMid: 'video',
    sdpMLineIndex: 0
  },
  targetUserId: 'target-user-id'
})
```

## 配置说明

### 环境变量

```bash
# Redis配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# WebSocket配置
MAX_WEBSOCKET_CONNECTIONS=1000
CORS_ORIGIN=http://localhost:3000

# WebRTC配置
WEBRTC_STUN_SERVERS=stun:stun.l.google.com:19302
WEBRTC_TURN_SERVER=turn:your-turn-server.com:3478
WEBRTC_TURN_USERNAME=turnuser
WEBRTC_TURN_PASSWORD=turnpass
```

### ICE服务器配置

```typescript
const iceServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  {
    urls: 'turn:your-turn-server.com:3478',
    username: 'turnuser',
    credential: 'turnpass'
  }
]
```

## 部署说明

### 开发环境

1. 安装依赖
```bash
npm install ioredis socket.io class-validator class-transformer
```

2. 配置环境变量
```bash
cp .env.example .env
# 编辑.env文件
```

3. 启动Redis服务
```bash
redis-server
```

4. 启动应用
```bash
npm run dev
```

### 生产环境

1. 配置TURN服务器（用于NAT穿透）
2. 设置Redis集群（可选）
3. 配置负载均衡器
4. 启用HTTPS（WebRTC要求）

## 监控和调试

### 日志记录

模块提供详细的日志记录：
- 连接建立和断开
- 房间创建和销毁
- 信令消息转发
- 错误和异常

### 统计信息

实时统计信息包括：
- 在线用户数
- 活跃房间数
- 连接质量指标
- 服务器负载

### 健康检查

```bash
curl http://localhost:3001/api/webrtc/health
```

## 故障排除

### 常见问题

1. **连接失败**
   - 检查防火墙设置
   - 验证STUN/TURN服务器配置
   - 确认网络连通性

2. **音视频质量差**
   - 检查网络带宽
   - 调整编码参数
   - 优化ICE候选选择

3. **信令延迟**
   - 检查Redis连接
   - 优化WebSocket配置
   - 监控服务器负载

### 调试工具

- Chrome DevTools WebRTC内部页面: `chrome://webrtc-internals/`
- Socket.IO调试: 设置`DEBUG=socket.io*`环境变量
- Redis监控: 使用`redis-cli monitor`命令

## 贡献指南

1. 遵循现有代码风格
2. 添加适当的类型定义
3. 编写单元测试
4. 更新文档

## 许可证

MIT License
