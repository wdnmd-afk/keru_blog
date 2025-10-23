import { BrowserLocalStorage } from '@/utils'
import { reportApiError } from '@/utils/monitor'
import { message, Modal } from 'antd'
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import { CustomError, ResultData, ResultEnum } from './httpEnum'

const config = {
    // 默认地址请求地址，可在 .env.** 文件中修改
    // 开发环境使用代理，生产环境使用完整URL
    baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/dev-api',
    // 设置超时时间
    timeout: ResultEnum.TIMEOUT as number,
    // 跨域时候允许携带凭证
    withCredentials: true,
}
// 防止401重复弹出对话框的标记（模块级）
let __authModalOpen = false

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    noLoading?: boolean
}

class RequestHttp {
    service: AxiosInstance
    public controller = new AbortController()
    public signal = this.controller.signal

    public constructor(config: AxiosRequestConfig) {
        // instantiation
        this.service = axios.create({ ...config, signal: this.signal })

        /**
         * @description 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
         */

        this.service.interceptors.request.use(
            (config: CustomAxiosRequestConfig) => {
                // const userStore = useUserStore();
                // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { noLoading: true } 来控制
                // config.noLoading || showFullScreenLoading();
                if (config.headers && typeof config.headers.set === 'function') {
                    config.headers.set('x-access-token', 'token')
                    const data = BrowserLocalStorage.get('userInfo')
                    config.headers.set('Authorization', data?.token || '')
                }
                return config
            },
            (error: AxiosError) => {
                console.log(123)
                return Promise.reject(error)
            }
        )

        /**
         * @description 响应拦截器
         *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data } = response
                // const userStore = useUserStore();
                // tryHideFullScreenLoading();

                // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
                if (data.code && data.code !== ResultEnum.SUCCESS) {
                    // ElMessage.error(data.msg);
                    return Promise.reject(data)
                }
                // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
                return data
            },
            async (error: CustomError) => {
                const { response } = error
                // tryHideFullScreenLoading();

                // 修复：检查response是否存在，避免解构undefined
                if (!response) {
                    // 请求被取消或网络错误，没有response
                    console.log('请求被取消或网络错误:', error.message)
                    // 上报网络错误
                    reportApiError(error)
                    return Promise.reject(error)
                }

                // 请求超时 && 网络错误单独判断，没有 response
                const { data } = response

                // 检查data是否存在
                if (!data) {
                    console.log('响应数据为空')
                    return Promise.reject(error)
                }

                // 统一处理 401 未授权：弹出友好确认框，支持防重复
                const isUnauthorized =
                    response.status === 401 || data.code === ResultEnum.UNAUTHORIZED
                console.log(isUnauthorized, 'is')
                if (isUnauthorized) {
                    if (!__authModalOpen) {
                        __authModalOpen = true
                        const modal = Modal.confirm({
                            title: '登录已过期',
                            content: '您的登录状态已过期，请重新登录以继续使用',
                            okText: '重新登录',
                            cancelText: '取消',
                            centered: true,
                            onOk: () => {
                                try {
                                    BrowserLocalStorage.clear()
                                } finally {
                                    __authModalOpen = false
                                    window.location.href = '/login'
                                }
                            },
                            onCancel: () => {
                                __authModalOpen = false
                                modal.destroy()
                            },
                        })
                    }
                    return Promise.reject(data)
                }

                // 其他错误码处理
                switch (data.code) {
                    case ResultEnum.ERROR:
                        message.error(data.message)
                        reportApiError(error)
                        break
                    case ResultEnum.NORMAL_ERROR:
                        message.error(data.message)
                        reportApiError(error)
                        break
                }
                // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
                // if (!window.navigator.onLine) router.replace("/500");
                return Promise.reject(error)
            }
        )
    }

    /**
     * @description 常用请求方法封装
     */
    get(url: string, params?: object, _object = {}): Promise<ResultData> {
        return this.service.get(url, { params, ..._object })
    }

    post(url: string, params?: object | string, _object = {}): Promise<ResultData> {
        return this.service.post(url, params, _object)
    }

    postFile(url: string, params?: FormData, _object = {}): Promise<ResultData> {
        return this.service.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // 合并传入的配置，允许覆盖signal
            ..._object,
        })
    }

    put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.put(url, params, _object)
    }

    delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
        return this.service.delete(url, { params, ..._object })
    }

    download(url: string, params?: object, _object = {}): Promise<BlobPart> {
        return this.service.post(url, params, { ..._object, responseType: 'blob' })
    }

    /**
     * 流式请求方法 - 用于 SSE 等需要流式处理的场景
     * 注意：由于 axios 在浏览器环境中对流式响应的限制，
     * 这个方法实际上是对原生 fetch 的封装，但保持了统一的错误处理
     */
    async stream(
        url: string,
        params?: object,
        handlers: {
            onChunk?: (text: string) => void
            onDone?: () => void
            onError?: (err: any) => void
        } = {},
        _object: { headers?: Record<string, string> } = {}
    ): Promise<void> {
        try {
            // 获取用户token（复用请求拦截器的逻辑）
            const userInfo = BrowserLocalStorage.get('userInfo')
            const token = userInfo?.token || ''

            // 构建完整URL
            const fullUrl = `${this.service.defaults.baseURL}${url}`

            // 发起流式请求
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                    'x-access-token': 'token',
                    ..._object.headers,
                },
                body: JSON.stringify(params),
                credentials: 'include',
                ..._object,
            })

            // 统一的错误处理（复用响应拦截器逻辑）
            if (!response.ok) {
                // 401错误会被全局的401拦截器处理，这里不需要重复处理
                const errorData = {
                    code: response.status,
                    message: `HTTP ${response.status}`,
                    data: null,
                }

                // 触发与axios响应拦截器相同的错误处理逻辑
                if (response.status === 401) {
                    // 401错误处理已经在全局拦截器中统一处理
                    console.log(
                        '[Stream] 401 error detected, will be handled by global interceptor'
                    )
                }

                const error = new Error(errorData.message) as Error & {
                    response?: { status: number; data: any }
                }
                error.response = { status: response.status, data: errorData }
                handlers.onError?.(error)
                throw error
            }

            if (!response.body) {
                const error = new Error('Response body is null')
                handlers.onError?.(error)
                throw error
            }

            // 流式读取响应
            const reader = response.body.getReader()
            const decoder = new TextDecoder('utf-8')
            let buffer = ''

            try {
                let doneReading = false
                while (!doneReading) {
                    const { value, done } = await reader.read()
                    if (done) {
                        doneReading = true
                        break
                    }

                    buffer += decoder.decode(value, { stream: true })

                    // SSE 解析逻辑
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
                                    if (obj.type === 'error')
                                        handlers.onError?.(new Error(obj.message || 'stream error'))
                                } catch {
                                    // data 非 JSON 时，降级按纯文本追加
                                    handlers.onChunk?.(dataStr)
                                }
                            }
                        }
                    }
                }

                handlers.onDone?.()
            } finally {
                reader.releaseLock()
            }
        } catch (error) {
            handlers.onError?.(error)
            throw error
        }
    }
}

const Http = new RequestHttp(config)

export { Http }
