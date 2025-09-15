import { createAIConfig } from '@/config/ai.config'
import { PrismaDB } from '@/db'
import { generateUniqueBigIntId } from '@/utils'
import { inject, injectable } from 'inversify'
import OpenAI from 'openai'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// 图片数据接口
interface ImageData {
  url: string
  type: string
}

// 图片优化器类
class ImageOptimizer {
  // 智能压缩图片
  async optimizeImage(inputPath: string, options: {
    maxWidth?: number
    maxHeight?: number
    quality?: number
    maxSizeKB?: number
    format?: 'jpeg' | 'png' | 'webp'
  } = {}): Promise<Buffer> {
    const {
      maxWidth = 1024,      // 最大宽度
      maxHeight = 1024,     // 最大高度
      quality = 80,         // 压缩质量
      maxSizeKB = 100,      // 最大文件大小(KB)
      format = 'jpeg'       // 输出格式
    } = options

    const startTime = Date.now()
    console.log(`[AI] 🔧 开始Sharp压缩: ${path.basename(inputPath)}`)
    console.log(`[AI] 📋 压缩参数: 最大尺寸${maxWidth}x${maxHeight}, 目标大小${maxSizeKB}KB, 格式${format}`)

    try {
      // 获取原始图片信息
      const originalStats = fs.statSync(inputPath)
      const originalSizeKB = originalStats.size / 1024
      console.log(`[AI] 📊 原始图片: ${originalSizeKB.toFixed(1)}KB`)

      // 获取图片元数据
      const metadata = await sharp(inputPath).metadata()
      console.log(`[AI] 🖼️  原始尺寸: ${metadata.width}x${metadata.height}, 格式: ${metadata.format}`)

      let currentQuality = quality
      let compressedBuffer: Buffer
      let iterationCount = 0

      do {
        iterationCount++
        console.log(`[AI] 🔄 压缩迭代 ${iterationCount}: 质量${currentQuality}%`)

        const sharpInstance = sharp(inputPath)
          .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true
          })

        // 根据格式选择压缩方式
        if (format === 'jpeg') {
          compressedBuffer = await sharpInstance
            .jpeg({
              quality: currentQuality,
              progressive: true,
              mozjpeg: true  // 更好的压缩
            })
            .toBuffer()
        } else if (format === 'png') {
          compressedBuffer = await sharpInstance
            .png({
              quality: currentQuality,
              compressionLevel: 9
            })
            .toBuffer()
        } else {
          compressedBuffer = await sharpInstance
            .webp({
              quality: currentQuality
            })
            .toBuffer()
        }

        const sizeKB = compressedBuffer.length / 1024
        const compressionRatio = ((originalSizeKB - sizeKB) / originalSizeKB * 100).toFixed(1)

        console.log(`[AI] 📉 迭代${iterationCount}结果: ${sizeKB.toFixed(1)}KB (压缩${compressionRatio}%)`)

        if (sizeKB <= maxSizeKB) {
          console.log(`[AI] ✅ 达到目标大小，压缩完成`)
          break
        }

        if (currentQuality <= 20) {
          console.log(`[AI] ⚠️  已达最低质量(20%)，停止压缩`)
          break
        }

        currentQuality -= 10 // 降低质量
        console.log(`[AI] 🔽 降低质量到 ${currentQuality}%`)

      } while (currentQuality > 20)

      const endTime = Date.now()
      const processingTime = endTime - startTime
      const finalSizeKB = compressedBuffer.length / 1024
      const finalCompressionRatio = ((originalSizeKB - finalSizeKB) / originalSizeKB * 100).toFixed(1)

      console.log(`[AI] 🎉 Sharp压缩完成!`)
      console.log(`[AI] ⏱️  处理时间: ${processingTime}ms`)
      console.log(`[AI] 📊 压缩结果: ${originalSizeKB.toFixed(1)}KB → ${finalSizeKB.toFixed(1)}KB`)
      console.log(`[AI] 📈 压缩比例: ${finalCompressionRatio}%`)
      console.log(`[AI] 🔧 最终质量: ${currentQuality}%`)
      console.log(`[AI] 🔄 迭代次数: ${iterationCount}`)

      return compressedBuffer

    } catch (error: any) {
      const endTime = Date.now()
      const processingTime = endTime - startTime
      console.error(`[AI] ❌ Sharp压缩失败 (${processingTime}ms): ${error.message}`)
      throw new Error(`图片压缩失败: ${error.message}`)
    }
  }

  // 计算预估Token数
  estimateTokens(imageSizeKB: number): number {
    // 经验公式: 1KB图片 ≈ 1000-1500 tokens
    const baseTokens = imageSizeKB * 1200
    const base64Overhead = baseTokens * 0.33 // Base64增加33%
    const totalTokens = Math.ceil(baseTokens + base64Overhead)

    console.log(`[AI] 🧮 Token估算: ${imageSizeKB.toFixed(1)}KB → ${baseTokens.toLocaleString()}基础tokens + ${Math.ceil(baseTokens * 0.33).toLocaleString()}Base64开销 = ${totalTokens.toLocaleString()}总tokens`)

    return totalTokens
  }

  // 自适应压缩到目标Token数
  async compressToTokenLimit(inputPath: string, maxTokens: number = 30000): Promise<Buffer> {
    console.log(`[AI] 🎯 开始自适应压缩到目标Token数`)
    console.log(`[AI] 📋 目标限制: ${maxTokens.toLocaleString()} tokens`)

    // 保守估算目标文件大小
    const targetSizeKB = Math.floor(maxTokens / 1500) // 保守估算
    console.log(`[AI] 📊 计算目标大小: ${maxTokens.toLocaleString()} tokens ÷ 1500 = ${targetSizeKB}KB`)

    const startTime = Date.now()

    try {
      const compressedBuffer = await this.optimizeImage(inputPath, {
        maxWidth: 1024,
        maxHeight: 1024,
        maxSizeKB: targetSizeKB,
        quality: 85
      })

      const actualSizeKB = compressedBuffer.length / 1024
      const estimatedTokens = this.estimateTokens(actualSizeKB)
      const endTime = Date.now()
      const processingTime = endTime - startTime

      console.log(`[AI] 🎉 自适应压缩完成!`)
      console.log(`[AI] ⏱️  总处理时间: ${processingTime}ms`)
      console.log(`[AI] 📊 最终结果: ${actualSizeKB.toFixed(1)}KB`)
      console.log(`[AI] 🎯 预估tokens: ${estimatedTokens.toLocaleString()} (目标: ${maxTokens.toLocaleString()})`)

      if (estimatedTokens <= maxTokens) {
        console.log(`[AI] ✅ 成功达到token限制目标!`)
      } else {
        console.log(`[AI] ⚠️  略超token限制，但已尽力压缩`)
      }

      return compressedBuffer

    } catch (error: any) {
      const endTime = Date.now()
      const processingTime = endTime - startTime
      console.error(`[AI] ❌ 自适应压缩失败 (${processingTime}ms): ${error.message}`)
      throw error
    }
  }
}

// AI 服务：封装 DeepSeek(OpenAI 兼容) 的同步与流式调用
@injectable()
export class AIService {
  private client: OpenAI
  private model: string
  private visionModel: string
  private imageOptimizer: ImageOptimizer

  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {
    const cfg = createAIConfig()
    // 初始化 OpenAI SDK 客户端（DeepSeek 兼容 OpenAI 接口）
    this.client = new OpenAI({ apiKey: cfg.apiKey, baseURL: cfg.baseURL })
    this.model = cfg.model
    this.visionModel = cfg.visionModel
    this.imageOptimizer = new ImageOptimizer()
  }

  // 基础问答（一次性返回）
  public async chat(
    message: string,
    conversationId?: string
  ): Promise<{ reply: string; conversationId: string }> {
    const convId = conversationId || uuidv4()
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    })
    const reply = completion.choices?.[0]?.message?.content?.trim() || ''
    return { reply, conversationId: convId }
  }

  // 多模态问答（支持图片+文本）
  public async chatWithImages(
    message: string,
    images: ImageData[] = [],
    conversationId?: string
  ): Promise<{ reply: string; conversationId: string }> {
    const convId = conversationId || uuidv4()

    try {
      // 预检查token限制
      let totalImageSize = 0
      let estimatedTokens = 0

      for (const image of images) {
        if (image.url.startsWith('/static/')) {
          const filePath = path.resolve(process.cwd(), image.url.substring(1))
          if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath)
            totalImageSize += stats.size
            estimatedTokens += Math.floor(stats.size * 1.33 * 0.75)
          }
        }
      }

      estimatedTokens += (message?.length || 0) * 0.75

      console.log(`[AI] 非流式Token估算 - 图片大小: ${(totalImageSize/1024/1024).toFixed(1)}MB, 预估tokens: ${estimatedTokens.toLocaleString()}`)

      // 如果超过token限制，使用压缩策略
      const MAX_CONTEXT_TOKENS = 130000
      let processedImages = images

      if (estimatedTokens > MAX_CONTEXT_TOKENS) {
        console.log(`[AI] 预估tokens超限，使用压缩策略`)
        processedImages = await this.compressImagesForTokenLimit(images)

        if (processedImages.length === 0) {
          throw new Error('图片文件过大，无法处理。请上传较小的图片文件（建议小于500KB）。')
        }
      }

      // 构建多模态消息内容
      const content: any[] = []

      // 添加文本内容
      if (message && message.trim()) {
        content.push({
          type: 'text',
          text: message
        })
      }

      // 添加图片内容 - 使用DeepSeek Vision API格式
      for (const image of processedImages) {
        const imageBase64Data = await this.processImageToBase64ForDeepSeek(image.url, image.type)
        if (imageBase64Data) {
          content.push({
            type: 'image',
            image: {
              data: imageBase64Data,
              format: 'base64'
            }
          })
        }
      }

      // 如果没有任何内容，使用默认提示
      if (content.length === 0) {
        content.push({
          type: 'text',
          text: '请描述这些图片的内容'
        })
      }

      console.log(`[AI] 多模态对话 - 文本长度: ${message?.length || 0}, 图片数量: ${images.length}`)
      console.log(`[AI] 🚀 ========== 准备调用DeepSeek Vision API ==========`)
      console.log(`[AI] 📋 消息格式验证:`)
      console.log(`[AI]    - 内容项数: ${content.length}`)
      console.log(`[AI]    - 模型: ${this.visionModel}`)

      // 统计消息内容
      let textItems = 0
      let imageItems = 0
      for (const item of content) {
        if (item.type === 'text') textItems++
        if (item.type === 'image') imageItems++
      }
      console.log(`[AI]    - 文本项: ${textItems}`)
      console.log(`[AI]    - 图片项: ${imageItems}`)

      // 计算消息大小
      const messageContent = JSON.stringify(content)
      const messageSizeKB = Buffer.byteLength(messageContent, 'utf8') / 1024
      console.log(`[AI]    - 消息大小: ${messageSizeKB.toFixed(1)}KB`)

      console.log(`[AI] 📡 发送API请求...`)
      const apiStartTime = Date.now()

      const completion = await this.client.chat.completions.create({
        model: this.visionModel, // 使用视觉模型
        messages: [{
          role: 'user',
          content: messageContent // DeepSeek需要JSON字符串格式
        }],
        temperature: 0.7,
        max_tokens: 1000
      })

      const apiEndTime = Date.now()
      const apiResponseTime = apiEndTime - apiStartTime
      console.log(`[AI] ✅ API响应成功 (耗时: ${apiResponseTime}ms)`)

      const reply = completion.choices?.[0]?.message?.content?.trim() || ''

      console.log(`[AI] 🎉 ========== DeepSeek Vision API响应成功 ==========`)
      console.log(`[AI] 📊 响应统计:`)
      console.log(`[AI]    - 回复长度: ${reply.length}字符`)
      console.log(`[AI]    - 回复预览: "${reply.substring(0, 100)}${reply.length > 100 ? '...' : ''}"`)

      if (completion.usage) {
        console.log(`[AI] 💰 Token使用情况:`)
        console.log(`[AI]    - 输入tokens: ${completion.usage.prompt_tokens?.toLocaleString() || 'N/A'}`)
        console.log(`[AI]    - 输出tokens: ${completion.usage.completion_tokens?.toLocaleString() || 'N/A'}`)
        console.log(`[AI]    - 总tokens: ${completion.usage.total_tokens?.toLocaleString() || 'N/A'}`)
      }

      console.log(`[AI] ✅ 非流式多模态对话完成`)

      return { reply, conversationId: convId }

    } catch (error: any) {
      console.error('[AI] 多模态对话失败:', error.message)
      throw new Error(`图片分析失败: ${error.message}`)
    }
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

  // 流式多模态问答（支持图片+文本）
  // 注意：DeepSeek Vision API的流式支持可能有限制，使用降级策略
  public async streamChatWithImages(
    message: string,
    images: ImageData[] = [],
    onDelta: (text: string) => void,
    opts?: { signal?: AbortSignal }
  ): Promise<{ conversationId: string }> {
    const convId = uuidv4()

    try {
      console.log(`[AI] 流式多模态对话请求 - 文本长度: ${message?.length || 0}, 图片数量: ${images.length}`)

      // 检查图片大小和token估算
      console.log(`[AI] 🔍 ========== 流式多模态对话预检查 ==========`)
      console.log(`[AI] 📝 文本消息: "${message?.substring(0, 50)}${(message?.length || 0) > 50 ? '...' : ''}"`)
      console.log(`[AI] 📸 图片数量: ${images.length}`)

      let totalImageSize = 0
      let estimatedTokens = 0

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        console.log(`[AI] 🖼️  检查图片${i+1}: ${image.url}`)

        if (image.url.startsWith('/static/')) {
          const filePath = path.resolve(process.cwd(), image.url.substring(1))
          if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath)
            const sizeKB = stats.size / 1024
            const sizeMB = sizeKB / 1024
            totalImageSize += stats.size

            // 估算Base64后的token数量：文件大小 * 1.33 (Base64膨胀) * 0.75 (token估算)
            const imageTokens = Math.floor(stats.size * 1.33 * 0.75)
            estimatedTokens += imageTokens

            console.log(`[AI]    - 大小: ${sizeKB.toFixed(1)}KB (${sizeMB.toFixed(2)}MB)`)
            console.log(`[AI]    - 预估tokens: ${imageTokens.toLocaleString()}`)
          } else {
            console.warn(`[AI]    - ⚠️  文件不存在: ${filePath}`)
          }
        } else {
          console.log(`[AI]    - 📎 非本地文件，跳过大小检查`)
        }
      }

      // 添加文本消息的token估算
      const textTokens = Math.floor((message?.length || 0) * 0.75)
      estimatedTokens += textTokens

      console.log(`[AI] 📊 Token预估算结果:`)
      console.log(`[AI]    - 图片总大小: ${(totalImageSize/1024/1024).toFixed(2)}MB`)
      console.log(`[AI]    - 图片tokens: ${(estimatedTokens - textTokens).toLocaleString()}`)
      console.log(`[AI]    - 文本tokens: ${textTokens.toLocaleString()}`)
      console.log(`[AI]    - 总预估tokens: ${estimatedTokens.toLocaleString()}`)

      // DeepSeek模型最大上下文：131,072 tokens，预留1000给回复
      const MAX_CONTEXT_TOKENS = 130000
      console.log(`[AI] 🎯 模型限制: ${MAX_CONTEXT_TOKENS.toLocaleString()} tokens`)
      console.log(`[AI] 📈 Token使用率: ${((estimatedTokens/MAX_CONTEXT_TOKENS)*100).toFixed(1)}%`)

      if (estimatedTokens > MAX_CONTEXT_TOKENS) {
        const excessTokens = estimatedTokens - MAX_CONTEXT_TOKENS
        console.log(`[AI] ❌ Token超限检测:`)
        console.log(`[AI]    - 预估tokens: ${estimatedTokens.toLocaleString()}`)
        console.log(`[AI]    - 模型限制: ${MAX_CONTEXT_TOKENS.toLocaleString()}`)
        console.log(`[AI]    - 超出tokens: ${excessTokens.toLocaleString()}`)
        console.log(`[AI] 🗜️  启动Sharp压缩策略...`)
        return await this.streamChatWithImagesCompressed(message, images, onDelta, opts)
      }

      // 如果图片总大小超过1MB，使用非流式降级策略
      const MAX_STREAM_IMAGE_SIZE = 1 * 1024 * 1024 // 1MB
      if (totalImageSize > MAX_STREAM_IMAGE_SIZE) {
        console.log(`[AI] 📊 文件大小检查:`)
        console.log(`[AI]    - 图片总大小: ${(totalImageSize/1024/1024).toFixed(2)}MB`)
        console.log(`[AI]    - 流式限制: ${(MAX_STREAM_IMAGE_SIZE/1024/1024).toFixed(1)}MB`)
        console.log(`[AI] 🔄 使用非流式降级策略...`)
        return await this.streamChatWithImagesNonStreaming(message, images, onDelta, opts)
      }

      console.log(`[AI] ✅ 预检查通过，使用正常流式处理`)
      console.log(`[AI] ========== 预检查完成 ==========`)

      // 尝试流式多模态对话
      try {
        return await this.attemptStreamingVision(message, images, onDelta, opts, convId)
      } catch (streamError: any) {
        console.warn(`[AI] 流式多模态对话失败，尝试降级策略: ${streamError.message}`)

        // 如果流式失败，使用非流式降级策略
        return await this.streamChatWithImagesNonStreaming(message, images, onDelta, opts)
      }

    } catch (error: any) {
      console.error('[AI] 流式多模态对话完全失败:', error.message)
      throw new Error(`图片分析失败: ${error.message}`)
    }
  }

  // 尝试真正的流式视觉对话
  private async attemptStreamingVision(
    message: string,
    images: ImageData[],
    onDelta: (text: string) => void,
    opts?: { signal?: AbortSignal },
    convId?: string
  ): Promise<{ conversationId: string }> {
    const conversationId = convId || uuidv4()

    // 构建多模态消息内容
    const content: any[] = []

    // 添加文本内容
    if (message && message.trim()) {
      content.push({
        type: 'text',
        text: message
      })
    }

    // 添加图片内容 - 使用DeepSeek Vision API格式
    for (const image of images) {
      const imageBase64Data = await this.processImageToBase64ForDeepSeek(image.url, image.type)
      if (imageBase64Data) {
        content.push({
          type: 'image',
          image: {
            data: imageBase64Data,
            format: 'base64'
          }
        })
      }
    }

    // 如果没有任何内容，使用默认提示
    if (content.length === 0) {
      content.push({
        type: 'text',
        text: '请描述这些图片的内容'
      })
    }

    console.log(`[AI] 尝试流式视觉对话 - 内容项数: ${content.length}`)

    const stream = await this.client.chat.completions.create({
      model: this.visionModel,
      messages: [{
        role: 'user',
        content: JSON.stringify(content) // DeepSeek需要JSON字符串格式
      }],
      temperature: 0.7,
      max_tokens: 800, // 减少token数量
      stream: true,
      // @ts-ignore openai sdk 允许透传 signal
      signal: opts?.signal,
    } as any)

    // 逐块读取：仅使用 delta.content
    for await (const chunk of stream as any) {
      const delta = chunk?.choices?.[0]?.delta?.content
      if (delta) onDelta(delta)
    }

    return { conversationId }
  }

  // 压缩图片处理策略：压缩图片后进行分析
  private async streamChatWithImagesCompressed(
    message: string,
    images: ImageData[],
    onDelta: (text: string) => void,
    opts?: { signal?: AbortSignal }
  ): Promise<{ conversationId: string }> {
    console.log('[AI] 使用图片压缩策略进行分析')

    // 压缩图片数据
    const compressedImages = await this.compressImagesForTokenLimit(images)

    if (compressedImages.length === 0) {
      // 如果压缩后没有图片，降级为纯文本对话
      console.log('[AI] 图片压缩失败，降级为纯文本对话')
      onDelta('抱歉，图片文件过大无法处理。请尝试上传较小的图片文件（建议小于1MB）。')
      return { conversationId: uuidv4() }
    }

    // 使用压缩后的图片进行非流式分析，然后模拟流式输出
    const { reply, conversationId } = await this.chatWithImages(message, compressedImages)

    // 模拟流式输出
    const words = reply.split('')
    const chunkSize = Math.max(1, Math.floor(words.length / 50))

    for (let i = 0; i < words.length; i += chunkSize) {
      if (opts?.signal?.aborted) {
        throw new Error('Request aborted')
      }

      const chunk = words.slice(i, i + chunkSize).join('')
      onDelta(chunk)
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    return { conversationId }
  }

  // 非流式降级策略：先获取完整回复，然后模拟流式输出
  private async streamChatWithImagesNonStreaming(
    message: string,
    images: ImageData[],
    onDelta: (text: string) => void,
    opts?: { signal?: AbortSignal }
  ): Promise<{ conversationId: string }> {
    console.log('[AI] 使用非流式降级策略进行图片分析')

    // 使用非流式多模态对话获取完整回复
    const { reply, conversationId } = await this.chatWithImages(message, images)

    // 模拟流式输出
    const words = reply.split('')
    const chunkSize = Math.max(1, Math.floor(words.length / 50)) // 分成约50个块

    for (let i = 0; i < words.length; i += chunkSize) {
      // 检查是否被取消
      if (opts?.signal?.aborted) {
        throw new Error('Request aborted')
      }

      const chunk = words.slice(i, i + chunkSize).join('')
      onDelta(chunk)

      // 添加小延迟模拟真实流式效果
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    return { conversationId }
  }

  // 保存 AI 对话记录（在控制器里拿到完整回复后调用）
  public async saveConversation(userId: string, message: string, response: string): Promise<void> {
    // 增加可观测日志，避免泄露内容，仅打印长度与用户ID
    if (!userId) {
      console.warn('[AI] saveConversation skipped: empty userId')
      return
    }
    try {
      console.log(
        `[AI] saveConversation try: userId=${userId}, qLen=${message?.length || 0}, aLen=${response?.length || 0}`
      )
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

  /**
   * 压缩图片以适应token限制（使用Sharp真实压缩）
   * @param images 原始图片数组
   * @returns 压缩后的图片数组
   */
  private async compressImagesForTokenLimit(images: ImageData[]): Promise<ImageData[]> {
    const compressedImages: ImageData[] = []
    const MAX_TOKENS_PER_IMAGE = 30000 // 每张图片最大30K tokens
    const startTime = Date.now()

    console.log(`[AI] 🗜️ ========== 开始Sharp智能压缩 ==========`)
    console.log(`[AI] 📋 压缩任务: ${images.length} 张图片`)
    console.log(`[AI] 🎯 目标限制: ${MAX_TOKENS_PER_IMAGE.toLocaleString()} tokens/张`)
    console.log(`[AI] ⏰ 开始时间: ${new Date().toLocaleTimeString()}`)

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const imageStartTime = Date.now()

      console.log(`[AI] 📸 ========== 处理图片 ${i+1}/${images.length} ==========`)
      console.log(`[AI] 📂 图片路径: ${image.url}`)

      try {
        if (image.url.startsWith('/static/')) {
          const originalPath = path.resolve(process.cwd(), image.url.substring(1))
          console.log(`[AI] 🔍 完整路径: ${originalPath}`)

          if (!fs.existsSync(originalPath)) {
            console.warn(`[AI] ❌ 文件不存在，跳过: ${originalPath}`)
            continue
          }

          // 获取原始文件信息
          const originalStats = fs.statSync(originalPath)
          const originalSizeKB = originalStats.size / 1024
          const originalSizeMB = originalSizeKB / 1024
          const originalTokens = this.imageOptimizer.estimateTokens(originalSizeKB)

          console.log(`[AI] 📊 原始图片信息:`)
          console.log(`[AI]    - 文件大小: ${originalSizeKB.toFixed(1)}KB (${originalSizeMB.toFixed(2)}MB)`)
          console.log(`[AI]    - 预估tokens: ${originalTokens.toLocaleString()}`)
          console.log(`[AI]    - 文件类型: ${image.type}`)

          if (originalTokens <= MAX_TOKENS_PER_IMAGE) {
            // 图片已经足够小，直接使用
            console.log(`[AI] ✅ 图片${i+1}已符合要求，无需压缩`)
            console.log(`[AI] 📈 Token使用率: ${((originalTokens/MAX_TOKENS_PER_IMAGE)*100).toFixed(1)}%`)
            compressedImages.push(image)
          } else {
            // 需要压缩
            const excessTokens = originalTokens - MAX_TOKENS_PER_IMAGE
            const compressionNeeded = ((excessTokens / originalTokens) * 100).toFixed(1)

            console.log(`[AI] 🔄 图片${i+1}需要压缩:`)
            console.log(`[AI]    - 当前tokens: ${originalTokens.toLocaleString()}`)
            console.log(`[AI]    - 目标tokens: ${MAX_TOKENS_PER_IMAGE.toLocaleString()}`)
            console.log(`[AI]    - 超出tokens: ${excessTokens.toLocaleString()}`)
            console.log(`[AI]    - 需压缩: ${compressionNeeded}%`)

            try {
              // 使用Sharp进行智能压缩
              console.log(`[AI] 🚀 启动Sharp压缩引擎...`)
              const compressedBuffer = await this.imageOptimizer.compressToTokenLimit(originalPath, MAX_TOKENS_PER_IMAGE)

              // 生成压缩后的临时文件
              const timestamp = Date.now()
              const tempFileName = `compressed_${timestamp}_${i}_${Math.random().toString(36).substr(2, 6)}.jpg`
              const tempFilePath = path.resolve(process.cwd(), 'static/IMAGE', tempFileName)

              console.log(`[AI] 💾 保存压缩图片: ${tempFileName}`)
              console.log(`[AI] 📂 保存路径: ${tempFilePath}`)

              // 保存压缩后的图片
              fs.writeFileSync(tempFilePath, compressedBuffer)

              // 验证保存的文件
              const savedStats = fs.statSync(tempFilePath)
              const savedSizeKB = savedStats.size / 1024
              const savedTokens = this.imageOptimizer.estimateTokens(savedSizeKB)

              console.log(`[AI] ✅ 文件保存成功:`)
              console.log(`[AI]    - 保存大小: ${savedSizeKB.toFixed(1)}KB`)
              console.log(`[AI]    - 预估tokens: ${savedTokens.toLocaleString()}`)
              console.log(`[AI]    - 压缩比例: ${((originalSizeKB - savedSizeKB) / originalSizeKB * 100).toFixed(1)}%`)
              console.log(`[AI]    - Token减少: ${((originalTokens - savedTokens) / originalTokens * 100).toFixed(1)}%`)

              // 创建新的图片数据对象
              const compressedImage: ImageData = {
                url: `/static/IMAGE/${tempFileName}`,
                type: 'image/jpeg' // 压缩后统一为JPEG格式
              }

              compressedImages.push(compressedImage)

              const imageEndTime = Date.now()
              const imageProcessingTime = imageEndTime - imageStartTime
              console.log(`[AI] 🎉 图片${i+1}压缩成功! (耗时: ${imageProcessingTime}ms)`)

            } catch (compressError: any) {
              const imageEndTime = Date.now()
              const imageProcessingTime = imageEndTime - imageStartTime
              console.error(`[AI] ❌ 图片${i+1}压缩失败 (耗时: ${imageProcessingTime}ms):`)
              console.error(`[AI]    - 错误信息: ${compressError.message}`)
              console.error(`[AI]    - 错误堆栈: ${compressError.stack}`)
              console.log(`[AI] 🔄 跳过此图片，继续处理下一张`)
            }
          }
        } else {
          // 非本地文件，直接添加（假设已经是合适大小）
          console.log(`[AI] 📎 非本地图片，直接使用: ${image.url}`)
          compressedImages.push(image)
        }
      } catch (error: any) {
        const imageEndTime = Date.now()
        const imageProcessingTime = imageEndTime - imageStartTime
        console.error(`[AI] ❌ 处理图片${i+1}异常 (耗时: ${imageProcessingTime}ms):`)
        console.error(`[AI]    - 错误信息: ${error.message}`)
        console.error(`[AI]    - 图片路径: ${image.url}`)
      }

      console.log(`[AI] ========== 图片 ${i+1} 处理完成 ==========`)
    }

    const endTime = Date.now()
    const totalProcessingTime = endTime - startTime

    console.log(`[AI] 🎉 ========== Sharp压缩任务完成 ==========`)
    console.log(`[AI] ⏰ 结束时间: ${new Date().toLocaleTimeString()}`)
    console.log(`[AI] ⏱️  总耗时: ${totalProcessingTime}ms (${(totalProcessingTime/1000).toFixed(1)}秒)`)
    console.log(`[AI] 📊 处理结果: ${compressedImages.length}/${images.length} 张图片可用`)
    console.log(`[AI] 📈 成功率: ${((compressedImages.length/images.length)*100).toFixed(1)}%`)

    if (compressedImages.length === 0) {
      console.warn(`[AI] ⚠️  警告: 没有图片可用于AI分析`)
    } else {
      console.log(`[AI] ✅ 准备将 ${compressedImages.length} 张压缩图片发送给DeepSeek Vision API`)
    }

    return compressedImages
  }

  /**
   * 处理图片转换为DeepSeek Vision API格式的Base64数据
   * @param imageUrl 图片URL或路径
   * @param mimeType MIME类型
   */
  private async processImageToBase64ForDeepSeek(imageUrl: string, mimeType: string): Promise<string | null> {
    try {
      // 如果已经是Base64格式，提取纯Base64数据
      if (imageUrl.startsWith('data:')) {
        console.log('[AI] 图片已是Base64格式，提取纯数据')
        const base64Match = imageUrl.match(/;base64,(.+)$/)
        if (base64Match) {
          return base64Match[1] // 返回纯Base64数据，不包含data:image/xxx;base64,前缀
        } else {
          console.error('[AI] Base64格式不正确:', imageUrl.substring(0, 100) + '...')
          return null
        }
      }

      // 如果是本地文件路径，读取文件并转换为纯Base64
      if (imageUrl.startsWith('/static/')) {
        const filePath = path.resolve(process.cwd(), imageUrl.substring(1))
        console.log('[AI] 读取本地图片文件:', filePath)

        if (!fs.existsSync(filePath)) {
          console.error('[AI] 图片文件不存在:', filePath)
          return null
        }

        const imageBuffer = fs.readFileSync(filePath)
        const base64Data = imageBuffer.toString('base64') // 纯Base64数据，不包含前缀

        console.log(`[AI] DeepSeek格式图片转换成功 - 文件大小: ${imageBuffer.length} 字节, Base64长度: ${base64Data.length}`)
        return base64Data
      }

      // 如果是HTTP URL，暂不支持
      console.warn('[AI] 暂不支持HTTP图片URL:', imageUrl)
      return null

    } catch (error: any) {
      console.error('[AI] DeepSeek格式图片处理失败:', error.message)
      return null
    }
  }

  /**
   * 处理图片转换为Base64格式（保留原方法用于其他用途）
   * 支持本地文件路径和Base64数据
   * @param imageUrl 图片URL或路径
   * @param mimeType MIME类型
   * @param compress 是否启用压缩（用于流式模式）
   */
  private async processImageToBase64(imageUrl: string, mimeType: string, compress: boolean = false): Promise<string | null> {
    try {
      // 如果已经是Base64格式，验证并返回
      if (imageUrl.startsWith('data:')) {
        console.log('[AI] 图片已是Base64格式，验证格式')
        // 验证Base64格式是否正确
        if (imageUrl.includes(';base64,')) {
          return imageUrl
        } else {
          console.error('[AI] Base64格式不正确:', imageUrl.substring(0, 100) + '...')
          return null
        }
      }

      // 如果是本地文件路径，读取文件并转换为Base64
      if (imageUrl.startsWith('/static/')) {
        const filePath = path.resolve(process.cwd(), imageUrl.substring(1)) // 移除开头的 '/'
        console.log('[AI] 读取本地图片文件:', filePath)

        if (!fs.existsSync(filePath)) {
          console.error('[AI] 图片文件不存在:', filePath)
          return null
        }

        let imageBuffer = fs.readFileSync(filePath)

        // 根据文件扩展名确定MIME类型
        let actualMimeType = mimeType
        if (!actualMimeType || actualMimeType === 'application/octet-stream') {
          const ext = path.extname(filePath).toLowerCase()
          switch (ext) {
            case '.jpg':
            case '.jpeg':
              actualMimeType = 'image/jpeg'
              break
            case '.png':
              actualMimeType = 'image/png'
              break
            case '.gif':
              actualMimeType = 'image/gif'
              break
            case '.webp':
              actualMimeType = 'image/webp'
              break
            default:
              actualMimeType = 'image/jpeg' // 默认
          }
        }

        // 如果启用压缩且文件较大，进行简单的质量压缩
        if (compress && imageBuffer.length > 1024 * 1024) { // 大于1MB时压缩
          console.log(`[AI] 图片较大(${(imageBuffer.length/1024/1024).toFixed(1)}MB)，启用压缩模式`)
          // 注意：这里只是示例，实际压缩需要图片处理库如sharp
          // 当前仅通过降低detail参数来减少处理复杂度
        }

        const base64 = imageBuffer.toString('base64')
        const dataUrl = `data:${actualMimeType};base64,${base64}`

        const compressionInfo = compress ? ' (压缩模式)' : ''
        console.log(`[AI] 图片转换成功${compressionInfo} - 文件大小: ${imageBuffer.length} 字节, MIME: ${actualMimeType}, Base64长度: ${base64.length}`)
        return dataUrl
      }

      // 如果是HTTP URL，暂不支持（可以后续扩展）
      console.warn('[AI] 暂不支持HTTP图片URL:', imageUrl)
      return null

    } catch (error: any) {
      console.error('[AI] 图片处理失败:', error.message)
      return null
    }
  }

  /**
   * 智能选择聊天方法
   * 根据是否有图片自动选择文本聊天或多模态聊天
   */
  public async smartChat(
    message: string,
    images: ImageData[] = [],
    conversationId?: string
  ): Promise<{ reply: string; conversationId: string }> {
    // 如果有图片，使用多模态聊天
    if (images && images.length > 0) {
      return this.chatWithImages(message, images, conversationId)
    }

    // 否则使用普通文本聊天
    return this.chat(message, conversationId)
  }

  /**
   * 智能选择流式聊天方法
   * 根据是否有图片自动选择文本聊天或多模态聊天
   */
  public async smartStreamChat(
    message: string,
    images: ImageData[] = [],
    onDelta: (text: string) => void,
    opts?: { signal?: AbortSignal }
  ): Promise<{ conversationId: string }> {
    // 如果有图片，使用流式多模态聊天
    if (images && images.length > 0) {
      return this.streamChatWithImages(message, images, onDelta, opts)
    }

    // 否则使用普通流式文本聊天
    return this.streamChat(message, onDelta, opts)
  }
}
