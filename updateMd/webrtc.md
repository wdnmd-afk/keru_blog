📡 RN-WebRTC实时画面转播解决方案
📋 项目概述
🎯 项目目标
实现React Native Android应用实时画面传输至React Web端播放，通过Nest.js和Express.js后台服务实现数据中转和信令管理。

🏗️ 系统架构
复制

📊 技术栈选型
前端采集: React Native + react-native-webrtc
后端处理: Nest.js + WebSocket + Redis
中转服务: Express.js + Socket.IO
Web播放: React + WebRTC API
信令服务: Socket.IO + Redis Pub/Sub
🔧 技术实现方案
1️⃣ React Native端 (视频采集发送)
📦 核心依赖
复制
{
"react-native-webrtc": "^118.0.0",
"socket.io-client": "^4.7.2",
"@react-native-async-storage/async-storage": "^1.19.0"
}
🎥 摄像头配置
复制
// 媒体约束配置
const mediaConstraints = {
audio: {
echoCancellation: true,
noiseSuppression: true,
autoGainControl: true,
},
video: {
width: { min: 640, ideal: 1280, max: 1920 },
height: { min: 480, ideal: 720, max: 1080 },
frameRate: { min: 15, ideal: 30, max: 60 },
facingMode: 'user', // 前置摄像头
}
};
📡 WebRTC连接管理
复制
// RTCPeerConnection配置
const pcConfig = {
iceServers: [
{ urls: 'stun:stun.l.google.com:19302' },
{ urls: 'stun:stun1.l.google.com:19302' },
{
urls: 'turn:your-turn-server.com:3478',
username: 'turnuser',
credential: 'turnpass'
}
],
iceCandidatePoolSize: 10,
};
🔄 流媒体处理流程
初始化摄像头 → 获取MediaStream
创建PeerConnection → 配置ICE服务器
添加本地流 → addStream到PeerConnection
创建Offer → 生成SDP描述
发送信令 → 通过Socket.IO发送给Nest.js
处理Answer → 接收远端SDP并设置
ICE候选交换 → 建立P2P连接
2️⃣ Nest.js后端 (信令处理)
🚀 WebSocket网关
复制
@WebSocketGateway({
cors: {
origin: '*',
},
transports: ['websocket'],
})
export class SignalingGateway {
@WebSocketServer()
server: Server;

// 处理RN端连接
@SubscribeMessage('rn-connect')
handleRNConnect(client: Socket, payload: any) {
// 注册RN客户端
// 存储到Redis
}

// 转发SDP信令
@SubscribeMessage('offer')
handleOffer(client: Socket, payload: RTCSessionDescription) {
// 转发给Express服务器
this.forwardToExpress('offer', payload);
}

// 转发ICE候选
@SubscribeMessage('ice-candidate')
handleIceCandidate(client: Socket, payload: RTCIceCandidate) {
this.forwardToExpress('ice-candidate', payload);
}
}
💾 Redis数据管理
复制
@Injectable()
export class RedisService {
private redis: Redis;

// 存储会话信息
async storeSession(sessionId: string, data: SessionData) {
await this.redis.setex(`session:${sessionId}`, 3600, JSON.stringify(data));
}

// 发布信令消息
async publishSignal(channel: string, message: any) {
await this.redis.publish(channel, JSON.stringify(message));
}

// 订阅信令消息
async subscribeSignal(channel: string, callback: Function) {
await this.redis.subscribe(channel);
this.redis.on('message', callback);
}
}
3️⃣ Express.js中转服务
🔄 Socket.IO信令中转
复制
import express from 'express';
import { Server } from 'socket.io';
import Redis from 'ioredis';

const app = express();
const io = new Server(server, {
cors: { origin: '*' }
});

const redis = new Redis(process.env.REDIS_URL);

// 监听Nest.js转发的信令
redis.subscribe('nest-signals');
redis.on('message', (channel, message) => {
const data = JSON.parse(message);

// 转发给Web客户端
io.emit(data.type, data.payload);
});

// 处理Web端连接
io.on('connection', (socket) => {
console.log('Web client connected:', socket.id);

// 处理Answer信令
socket.on('answer', (answer) => {
// 转发回Nest.js
redis.publish('web-signals', JSON.stringify({
type: 'answer',
payload: answer
}));
});

// 处理ICE候选
socket.on('ice-candidate', (candidate) => {
redis.publish('web-signals', JSON.stringify({
type: 'ice-candidate',
payload: candidate
}));
});
});
📊 流量监控
复制
// 连接状态监控
const connectionStats = {
activeConnections: 0,
totalDataTransferred: 0,
averageLatency: 0
};

// 中间件：流量统计
io.use((socket, next) => {
connectionStats.activeConnections++;

socket.on('disconnect', () => {
connectionStats.activeConnections--;
});

next();
});
4️⃣ React Web端 (视频播放)
🎬 WebRTC接收端
复制
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const VideoPlayer: React.FC = () => {
const videoRef = useRef<HTMLVideoElement>(null);
const pcRef = useRef<RTCPeerConnection>();
const socketRef = useRef<Socket>();

useEffect(() => {
initializeWebRTC();
return () => cleanup();
}, []);

const initializeWebRTC = async () => {
// 创建PeerConnection
const pc = new RTCPeerConnection(pcConfig);
pcRef.current = pc;

    // 处理远程流
    pc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    // 连接Socket.IO
    const socket = io(EXPRESS_SERVER_URL);
    socketRef.current = socket;

    // 监听Offer
    socket.on('offer', handleOffer);
    socket.on('ice-candidate', handleIceCandidate);
};

const handleOffer = async (offer: RTCSessionDescription) => {
const pc = pcRef.current!;

    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    
    // 发送Answer
    socketRef.current!.emit('answer', answer);
};

return (
<div className="video-container">
<video
ref={videoRef}
autoPlay
playsInline
muted
style={{ width: '100%', height: 'auto' }}
/>
</div>
);
};
🎛️ 播放控制
复制
// 视频控制组件
const VideoControls: React.FC = () => {
const [isPlaying, setIsPlaying] = useState(false);
const [volume, setVolume] = useState(1);
const [quality, setQuality] = useState('720p');

return (
<div className="controls">
<button onClick={() => setIsPlaying(!isPlaying)}>
{isPlaying ? '⏸️' : '▶️'}
</button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      
      <select value={quality} onChange={(e) => setQuality(e.target.value)}>
        <option value="480p">480p</option>
        <option value="720p">720p</option>
        <option value="1080p">1080p</option>
      </select>
    </div>
);
};
🔧 部署配置
🐳 Docker容器化
Nest.js Dockerfile
复制
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
Express.js Dockerfile
复制
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 4000
CMD ["npm", "start"]
Docker Compose
复制
version: '3.8'

services:
redis:
image: redis:7-alpine
ports:
- "6379:6379"
volumes:
- redis_data:/data

nest-backend:
build: ./nest-backend
ports:
- "3000:3000"
depends_on:
- redis
environment:
- REDIS_URL=redis://redis:6379

express-server:
build: ./express-server
ports:
- "4000:4000"
depends_on:
- redis
environment:
- REDIS_URL=redis://redis:6379

nginx:
image: nginx:alpine
ports:
- "80:80"
- "443:443"
volumes:
- ./nginx.conf:/etc/nginx/nginx.conf
depends_on:
- nest-backend
- express-server

volumes:
redis_data:
☁️ 云服务配置
AWS部署架构
复制
🌐 CloudFront (CDN)
├── 🔧 Application Load Balancer
├── 🚀 ECS Fargate (Nest.js)
├── ⚡ ECS Fargate (Express.js)
├── 💾 ElastiCache (Redis)
└── 📊 CloudWatch (监控)
环境变量配置
复制
# Nest.js环境变量
NODE_ENV=production
PORT=3000
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
TURN_SERVER_URL=turn:your-turn-server.com:3478
TURN_USERNAME=turnuser
TURN_PASSWORD=turnpass

# Express.js环境变量
NODE_ENV=production
PORT=4000
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=https://your-web-app.com
📊 性能优化
🚀 网络优化
复制
// 自适应码率控制
const adaptiveBitrate = {
'1080p': { width: 1920, height: 1080, bitrate: 2500000 },
'720p':  { width: 1280, height: 720,  bitrate: 1500000 },
'480p':  { width: 854,  height: 480,  bitrate: 800000 },
'360p':  { width: 640,  height: 360,  bitrate: 500000 }
};

// 网络状态检测
const networkMonitor = {
checkBandwidth: async () => {
// 实现带宽检测逻辑
},

adjustQuality: (bandwidth: number) => {
if (bandwidth > 2000000) return '1080p';
if (bandwidth > 1200000) return '720p';
if (bandwidth > 600000) return '480p';
return '360p';
}
};
💾 缓存策略
复制
// Redis缓存配置
const cacheConfig = {
// ICE候选缓存
iceCandidates: {
ttl: 300, // 5分钟
maxSize: 1000
},

// 会话信息缓存
sessions: {
ttl: 3600, // 1小时
maxSize: 10000
},

// 统计数据缓存
stats: {
ttl: 60, // 1分钟
maxSize: 100
}
};
📈 监控指标
复制
// 关键性能指标
const kpiMetrics = {
// 连接质量
connectionQuality: {
rtt: 0,           // 往返时延
jitter: 0,        // 抖动
packetLoss: 0,    // 丢包率
bandwidth: 0      // 带宽利用率
},

// 系统性能
systemPerformance: {
cpuUsage: 0,      // CPU使用率
memoryUsage: 0,   // 内存使用率
activeConnections: 0, // 活跃连接数
throughput: 0     // 吞吐量
}
};
🛡️ 安全措施
🔐 身份认证
复制
// JWT Token验证
@Injectable()
export class AuthGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
const client = context.switchToWs().getClient();
const token = client.handshake.auth.token;

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      client.userId = payload.sub;
      return true;
    } catch {
      return false;
    }
}
}
🔒 数据加密
复制
// DTLS加密配置
const securityConfig = {
dtlsSrtpKeyAgreement: true,
rtcpMuxPolicy: 'require',
bundlePolicy: 'max-bundle',

// 强制加密
mandatory: {
'DtlsSrtpKeyAgreement': true
}
};
🚫 访问控制
复制
// 房间权限控制
const roomAccess = {
validateAccess: (userId: string, roomId: string) => {
// 检查用户权限
return checkUserPermission(userId, roomId);
},

rateLimiting: {
maxConnectionsPerUser: 5,
maxRoomsPerUser: 3,
connectionTimeout: 30000
}
};
🧪 测试策略
🔬 单元测试
复制
// WebRTC连接测试
describe('WebRTC Connection', () => {
test('should establish peer connection', async () => {
const pc = new RTCPeerConnection(pcConfig);
expect(pc.connectionState).toBe('new');

    // 模拟连接建立
    await simulateConnection(pc);
    expect(pc.connectionState).toBe('connected');
});
});
🎭 集成测试
复制
// 端到端流传输测试
describe('E2E Stream Test', () => {
test('should transmit video from RN to Web', async () => {
// 启动RN模拟器
const rnClient = await startRNSimulator();

    // 启动Web客户端
    const webClient = await startWebClient();
    
    // 验证视频流传输
    const streamReceived = await webClient.waitForStream();
    expect(streamReceived).toBe(true);
});
});
📊 性能测试
复制
// 负载测试
describe('Load Test', () => {
test('should handle 100 concurrent connections', async () => {
const connections = [];

    for (let i = 0; i < 100; i++) {
      connections.push(createConnection());
    }
    
    const results = await Promise.all(connections);
    const successRate = results.filter(r => r.success).length / 100;
    
    expect(successRate).toBeGreaterThan(0.95); // 95%成功率
});
});
📈 监控告警
📊 Prometheus指标
复制
# prometheus.yml
global:
scrape_interval: 15s

scrape_configs:
- job_name: 'nest-backend'
  static_configs:
    - targets: ['localhost:3000']
      metrics_path: '/metrics'

- job_name: 'express-server'
  static_configs:
    - targets: ['localhost:4000']
      metrics_path: '/metrics'
      🚨 告警规则
      复制
# alert.rules.yml
groups:
- name: webrtc.rules
  rules:
    - alert: HighConnectionFailureRate
      expr: connection_failure_rate > 0.1
      for: 5m
      annotations:
      summary: "连接失败率过高"

    - alert: HighLatency
      expr: avg_latency > 500
      for: 2m
      annotations:
      summary: "平均延迟过高"
      📱 Grafana仪表板
      复制
      {
      "dashboard": {
      "title": "WebRTC实时监控",
      "panels": [
      {
      "title": "活跃连接数",
      "type": "stat",
      "targets": [
      {
      "expr": "active_connections"
      }
      ]
      },
      {
      "title": "平均延迟",
      "type": "graph",
      "targets": [
      {
      "expr": "avg_latency"
      }
      ]
      }
      ]
      }
      }
      🚀 部署清单
      ✅ 部署前检查
      域名SSL证书配置
      TURN服务器部署
      Redis集群配置
      负载均衡设置
      监控告警配置
      安全策略验证
      📋 发布流程
      代码审查 → Pull Request审批
      自动化测试 → CI/CD流水线
      预发布环境 → 功能验证测试
      生产部署 → 蓝绿部署策略
      监控验证 → 关键指标检查
      回滚准备 → 快速回滚机制
      🎯 成功指标
      连接成功率: > 98%
      平均延迟: < 200ms
      视频质量: 720p@30fps稳定传输
      系统可用性: > 99.9%
      并发支持: 1000+同时连接
      📚 参考资源
      📖 技术文档
      WebRTC官方文档
      React Native WebRTC
      Nest.js WebSocket
      Socket.IO文档
      🛠️ 开发工具
      WebRTC Troubleshooter
      WebRTC Internals
      Wireshark网络分析
      🌟 最佳实践
      WebRTC最佳实践指南
      实时通信架构设计
      流媒体性能优化
      🎉 项目预期效果: 实现低延迟(< 200ms)、高质量(720p+)的实时视频传输，支持1000+并发连接，具备完善的监控和告警机制。
