import { Http } from '@/utils/http'

// 前台用户反馈提交 API
export interface SubmitFeedbackPayload {
    // 标题（新增，可选；后端 Prisma 已添加 title 字段）
    title?: string
    content: string
    userName?: string
    userEmail?: string
    category?: 'SUGGESTION' | 'BUG' | 'OTHER'
}

export class FeedbackApiFront {
    // 无需鉴权的公共提交接口
    static async submit(payload: SubmitFeedbackPayload) {
        // 通过 Vite 代理：/dev-api/public/feedback/submit -> /api/public/feedback/submit
        return Http.post('/public/feedback/submit', payload)
    }
}
