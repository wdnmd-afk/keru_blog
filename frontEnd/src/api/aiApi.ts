import { Http } from '@/utils'

// 图片项接口定义（与组件保持一致）
export interface ImageItem {
    id: string
    url: string          // 图片URL或base64
    name: string         // 文件名
    size: number         // 文件大小（字节）
    type: string         // MIME类型
    status: 'uploading' | 'uploaded' | 'error'  // 上传状态
}

// 消息项接口定义（扩展支持图片）
export interface MsgItem {
    id: string
    role: 'user' | 'assistant'
    text: string
    images?: ImageItem[]  // 可选的图片数组
}

// 请求体类型定义（扩展支持图片）
export interface ChatReq {
    message: string
    conversationId?: string
    images?: {
        url: string      // 图片URL或base64
        type: string     // MIME类型
    }[]                  // 可选的图片数组
}

// 非流式问答接口
export async function chat(req: ChatReq) {
    // 改为使用 Http 类，统一错误处理（包括401拦截）
    return await Http.post('/ai/chat', req)
}

// 流式问答接口（SSE via Http.stream 方法）
// 说明：使用封装的 Http.stream 方法，统一错误处理的同时保持流式处理能力
export async function streamChat(
    req: ChatReq,
    handlers: {
        onChunk?: (text: string) => void
        onDone?: () => void
        onError?: (err: any) => void
    } = {}
) {
    // 使用 Http 类的 stream 方法，享受统一的错误处理和认证管理
    return await Http.stream('/ai/chat/stream', req, handlers)
}

//

//

export interface ConversationItem {
    id: string
    message: string
    response: string
    createdAt: string //
}

export async function fetchRecentConversations(): Promise<{
    success: boolean
    code: number
    message: string
    data: ConversationItem[]
}> {
    // 改为使用 Http 类，统一错误处理（包括401拦截）
    return await Http.post('/ai/conversations/recent', {})
}
