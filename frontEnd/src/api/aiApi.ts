import { BrowserLocalStorage } from '@/utils'

// 基础地址：开发使用代理 /dev-api，生产从环境变量读取
const baseURL = (import.meta as any).env.VITE_API_URL || (import.meta as any).env.VITE_API_BASE_URL || '/dev-api'

// 请求体类型定义
export interface ChatReq {
  message: string
  conversationId?: string
}

// 非流式问答接口
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
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

// 流式问答接口（SSE via fetch + ReadableStream Reader）
// 说明：使用 POST 以便携带 Authorization 头（EventSource 不支持自定义头）
export async function streamChat(
  req: ChatReq,
  handlers: {
    onChunk?: (text: string) => void
    onDone?: () => void
    onError?: (err: any) => void
  } = {}
) {
  const token = BrowserLocalStorage.get('userInfo')?.token || ''
  const r = await fetch(`${baseURL}/ai/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(req),
    credentials: 'include',
  })
  if (!r.ok || !r.body) {
    const msg = `Stream HTTP ${r.status}`
    handlers.onError?.(new Error(msg))
    throw new Error(msg)
  }

  const reader = r.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      // SSE 以空行分包：每个事件块以 \n\n 结尾
      let idx: number
      while ((idx = buffer.indexOf('\n\n')) >= 0) {
        const chunk = buffer.slice(0, idx)
        buffer = buffer.slice(idx + 2)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6)
            try {
              const obj = JSON.parse(dataStr)
              if (obj.type === 'chunk') handlers.onChunk?.(obj.data || '')
              if (obj.type === 'done') handlers.onDone?.()
              if (obj.type === 'error') handlers.onError?.(new Error(obj.message || 'stream error'))
            } catch {
              // data 非 JSON 时，降级按纯文本追加
              handlers.onChunk?.(dataStr)
            }
          }
        }
      }
    }
    // 流结束回调
    handlers.onDone?.()
  } catch (e) {
    handlers.onError?.(e)
    throw e
  } finally {
    reader.releaseLock()
  }
}

//

//

export interface ConversationItem {
  id: string
  message: string
  response: string
  createdAt: string //
}

export async function fetchRecentConversations(): Promise<{ success: boolean; code: number; message: string; data: ConversationItem[] }> {
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


