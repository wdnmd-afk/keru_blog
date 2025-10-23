// 前端埋点上报工具（匿名接口 /public/monitor/logs）
// 所有上报信息均包含中文说明，便于后端与运维理解

export interface ReportPayload {
    source?: 'frontend' | 'management'
    type?: string // 行为类型：page_view/api_error/js_error/unhandled_rejection 等
    level?: 'info' | 'warn' | 'error'
    message: string // 中文说明
    context?: any // 结构化上下文
}

/**
 * 统一上报入口（前台使用匿名公开端点）
 */
export async function report(payload: ReportPayload) {
    try {
        const base =
            (import.meta as any)?.env?.VITE_API_URL ||
            (import.meta as any)?.env?.VITE_API_BASE_URL ||
            '/dev-api'
        const url = `${base}/public/monitor/logs`
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source: payload.source || 'frontend',
                type: (payload.type || 'client_log').toLowerCase(),
                level: payload.level || 'info',
                message: payload.message,
                context: payload.context || null,
            }),
            credentials: 'include',
        })
    } catch (e) {
        // 上报失败不影响主流程
        console.debug('[monitor] report failed:', e)
    }
}

/** 页面浏览埋点 */
export function reportPageView(route: string, extra: Record<string, any> = {}) {
    report({
        type: 'page_view',
        level: 'info',
        message: '页面浏览',
        context: {
            route,
            title: document.title,
            referrer: document.referrer,
            viewport: { w: window.innerWidth, h: window.innerHeight },
            ...extra,
        },
    })
}

/** 接口错误埋点 */
export function reportApiError(error: any) {
    try {
        const cfg = error?.config || {}
        const res = error?.response || {}
        report({
            type: 'api_error',
            level: 'error',
            message: '接口请求错误',
            context: {
                route: cfg?.url,
                method: (cfg?.method || '').toUpperCase(),
                status: res?.status,
                code: res?.data?.code,
                errMsg: res?.data?.message || error?.message || '请求失败',
            },
        })
    } catch {
        // 忽略
    }
}

/** 绑定全局错误监听（JS Error 与 Promise 未处理拒绝） */
export function bindGlobalMonitors() {
    if ((window as any).__globalMonitorsBound) return
    ;(window as any).__globalMonitorsBound = true

    window.addEventListener('error', (event) => {
        try {
            report({
                type: 'js_error',
                level: 'error',
                message: '脚本运行异常',
                context: {
                    route: location.pathname + location.search,
                    message: event?.message || '',
                    filename: (event as any)?.filename,
                    lineno: (event as any)?.lineno,
                    colno: (event as any)?.colno,
                    error: (event as any)?.error?.stack || (event as any)?.error?.message,
                    userAgent: navigator.userAgent,
                },
            })
        } catch {}
    })

    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
        try {
            const reason: any = event?.reason
            report({
                type: 'unhandled_rejection',
                level: 'error',
                message: '未处理的 Promise 拒绝',
                context: {
                    route: location.pathname + location.search,
                    reason: typeof reason === 'string' ? reason : reason?.message || '',
                    stack: reason?.stack,
                    userAgent: navigator.userAgent,
                },
            })
        } catch {}
    })
}
