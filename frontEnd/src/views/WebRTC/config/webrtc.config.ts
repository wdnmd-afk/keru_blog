/**
 * WebRTC配置文件
 *
 * 功能说明：
 * 1. 定义WebRTC相关的配置参数
 * 2. 包含ICE服务器配置、媒体约束等
 * 3. 提供不同环境的配置选项
 */

// 环境配置
const isDevelopment = import.meta.env.MODE === 'development'
const isProduction = import.meta.env.MODE === 'production'

// 信令服务器配置
const signalingServerConfig = {
    development: {
        url: 'http://localhost:3001', // 开发环境的Express服务器地址
        path: '/socket.io',
    },
    production: {
        url: 'https://your-domain.com', // 生产环境的服务器地址
        path: '/socket.io',
    },
}

// ICE服务器配置
const iceServersConfig = {
    development: [
        // 开发环境使用公共STUN服务器
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
    ],
    production: [
        // 生产环境建议使用自建TURN服务器
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        {
            urls: 'turn:your-turn-server.com:3478',
            username: 'turnuser',
            credential: 'turnpass',
        },
        {
            urls: 'turn:your-turn-server.com:3478?transport=tcp',
            username: 'turnuser',
            credential: 'turnpass',
        },
    ],
}

// PeerConnection配置
export const peerConnectionConfig: RTCConfiguration = {
    iceServers: isDevelopment ? iceServersConfig.development : iceServersConfig.production,

    // ICE候选收集策略
    iceCandidatePoolSize: 10,

    // ICE传输策略 - 'all' 允许所有传输方式
    iceTransportPolicy: 'all',

    // Bundle策略 - 'max-bundle' 最大化bundle
    bundlePolicy: 'max-bundle',

    // RTCP复用策略 - 'require' 要求RTCP复用
    rtcpMuxPolicy: 'require',
}

// 媒体约束配置
export const mediaConstraints = {
    // 音频约束
    audio: {
        echoCancellation: true, // 回声消除
        noiseSuppression: true, // 噪声抑制
        autoGainControl: true, // 自动增益控制
        sampleRate: 48000, // 采样率
        channelCount: 2, // 声道数
    },

    // 视频约束
    video: {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        frameRate: { min: 15, ideal: 30, max: 60 },
        facingMode: 'user', // 前置摄像头
    },
}

// 视频质量配置
export const videoQualityConfig = {
    '1080p': {
        width: 1920,
        height: 1080,
        frameRate: 30,
        bitrate: 2500000, // 2.5Mbps
    },
    '720p': {
        width: 1280,
        height: 720,
        frameRate: 30,
        bitrate: 1500000, // 1.5Mbps
    },
    '480p': {
        width: 854,
        height: 480,
        frameRate: 24,
        bitrate: 800000, // 800kbps
    },
    '360p': {
        width: 640,
        height: 360,
        frameRate: 15,
        bitrate: 500000, // 500kbps
    },
}

// 网络自适应配置
export const adaptiveConfig = {
    // 网络质量阈值
    networkThresholds: {
        excellent: { rtt: 50, loss: 0.01, bandwidth: 2000000 }, // RTT<50ms, 丢包率<1%, 带宽>2Mbps
        good: { rtt: 150, loss: 0.03, bandwidth: 1000000 }, // RTT<150ms, 丢包率<3%, 带宽>1Mbps
        poor: { rtt: 300, loss: 0.05, bandwidth: 500000 }, // RTT<300ms, 丢包率<5%, 带宽>500kbps
        bad: { rtt: 500, loss: 0.1, bandwidth: 200000 }, // RTT<500ms, 丢包率<10%, 带宽>200kbps
    },

    // 质量调整策略
    qualityAdjustment: {
        excellent: '1080p',
        good: '720p',
        poor: '480p',
        bad: '360p',
    },

    // 调整间隔（毫秒）
    adjustmentInterval: 5000,
}

// 重连配置
export const reconnectionConfig = {
    maxRetries: 5, // 最大重试次数
    initialDelay: 1000, // 初始延迟（毫秒）
    maxDelay: 30000, // 最大延迟（毫秒）
    backoffMultiplier: 1.5, // 退避倍数
    jitter: 0.1, // 抖动因子
}

// 统计信息收集配置
export const statsConfig = {
    interval: 1000, // 收集间隔（毫秒）
    enabled: true, // 是否启用统计收集

    // 需要收集的统计类型
    types: ['inbound-rtp', 'outbound-rtp', 'candidate-pair', 'local-candidate', 'remote-candidate'],
}

// 主配置对象
export const webrtcConfig = {
    // 信令服务器URL
    signalingServerUrl: isDevelopment
        ? signalingServerConfig.development.url
        : signalingServerConfig.production.url,

    // PeerConnection配置
    peerConnectionConfig,

    // 媒体约束
    mediaConstraints,

    // 视频质量配置
    videoQualityConfig,

    // 网络自适应配置
    adaptiveConfig,

    // 重连配置
    reconnectionConfig,

    // 统计配置
    statsConfig,

    // 调试模式
    debug: isDevelopment,

    // 超时配置
    timeouts: {
        connection: 30000, // 连接超时（30秒）
        iceGathering: 10000, // ICE收集超时（10秒）
        answer: 5000, // Answer响应超时（5秒）
    },
}

// 导出配置验证函数
export const validateWebRTCConfig = (): boolean => {
    try {
        // 检查浏览器WebRTC支持
        if (!window.RTCPeerConnection) {
            console.error('WebRTC is not supported in this browser')
            return false
        }

        // 检查必要的API
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('getUserMedia is not supported in this browser')
            return false
        }

        // 检查配置完整性
        if (!webrtcConfig.signalingServerUrl) {
            console.error('Signaling server URL is not configured')
            return false
        }

        if (
            !webrtcConfig.peerConnectionConfig.iceServers ||
            webrtcConfig.peerConnectionConfig.iceServers.length === 0
        ) {
            console.error('ICE servers are not configured')
            return false
        }

        console.log('WebRTC configuration is valid')
        return true
    } catch (error) {
        console.error('Error validating WebRTC configuration:', error)
        return false
    }
}

// 获取当前环境的配置信息
export const getEnvironmentInfo = () => {
    return {
        environment: isDevelopment ? 'development' : 'production',
        signalingServer: webrtcConfig.signalingServerUrl,
        iceServers: webrtcConfig.peerConnectionConfig.iceServers?.length || 0,
        debug: webrtcConfig.debug,
    }
}

export default webrtcConfig
