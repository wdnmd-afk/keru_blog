import { createAIConfig } from '@/config/ai.config'
import OpenAI from 'openai'
import { v4 as uuidv4 } from 'uuid'
import { inject, injectable } from 'inversify'
import { PrismaDB } from '@/db'
import { generateUniqueBigIntId } from '@/utils'

// AI 服务：封装 DeepSeek(OpenAI 兼容) 的同步与流式调用
@injectable()
export class AIService {
  private client: OpenAI
  private model: string

  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {
    const cfg = createAIConfig()
    // 初始化 OpenAI SDK 客户端（DeepSeek 兼容 OpenAI 接口）
    this.client = new OpenAI({ apiKey: cfg.apiKey, baseURL: cfg.baseURL })
    this.model = cfg.model
  }

  // 基础问答（一次性返回）
  public async chat(message: string, conversationId?: string): Promise<{ reply: string; conversationId: string }> {
    const convId = conversationId || uuidv4()
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    })
    const reply = completion.choices?.[0]?.message?.content?.trim() || ''
    return { reply, conversationId: convId }
  }

  // 流式问答：逐段返回内容，供 SSE 写入
  public async streamChat(
    message: string,
    onDelta: (text: string) => void,
    opts?: { signal?: AbortSignal }
  ): Promise<{ conversationId: string }> {
    const convId = uuidv4()
    const stream = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
      stream: true,
      // @ts-ignore openai sdk 允许透传 signal
      signal: opts?.signal,
    } as any)

    // 逐块读取：仅使用 delta.content，避免最终 message.content 再次累加导致重复
    for await (const chunk of stream as any) {
      const delta = chunk?.choices?.[0]?.delta?.content
      if (delta) onDelta(delta)
    }

    return { conversationId: convId }
  }

  // 保存 AI 对话记录（在控制器里拿到完整回复后调用）
  public async saveConversation(userId: string, message: string, response: string): Promise<void> {
    // 增加可观测日志，避免泄露内容，仅打印长度与用户ID
    if (!userId) {
      console.warn('[AI] saveConversation skipped: empty userId')
      return
    }
    try {
      console.log(`[AI] saveConversation try: userId=${userId}, qLen=${message?.length || 0}, aLen=${response?.length || 0}`)
      await this.PrismaDB.prisma.aiConversation.create({
        data: {
          id: generateUniqueBigIntId(true) as string,
          userId,
          message,
          response,
        },
      } as any)
      console.log('[AI] saveConversation success')
    } catch (e: any) {
      console.warn('[AI] saveConversation failed:', e?.message)
      throw e
    }
  }

  // 获取最近 N 条对话
  public async getRecentConversations(userId: string, limit = 10) {
    if (!userId) return []
    const list = await this.PrismaDB.prisma.aiConversation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
    return list
  }
}
