// Express类型声明文件
// 为Express提供基本的类型定义，解决TS2305错误

declare module 'express' {
    import { IncomingMessage, ServerResponse } from 'http'
    import { ParsedQs } from 'qs'
    import { File } from 'multer'

    export interface Request extends IncomingMessage {
        // 基本属性
        params: any
        query: ParsedQs
        body: any
        headers: any
        method: string
        url: string
        path: string
        originalUrl: string
        baseUrl: string
        hostname: string
        ip: string
        ips: string[]
        protocol: string
        secure: boolean
        xhr: boolean
        
        // 路由相关
        route?: any
        
        // 自定义扩展属性
        file?: File
        files?: File[] | { [fieldname: string]: File[] }
        requestId?: string
        userId?: string
        user?: {
            id: string
            username: string
            email?: string
        }
        userInfo?: {
            id: string
            username: string
            email?: string
        }
        token?: string
        tokenPayload?: {
            userId: string
            username: string
            iat?: number
            exp?: number
        }
        validatedData?: any
        pagination?: {
            page: number
            limit: number
            offset: number
        }
        
        // 方法
        get(name: string): string | undefined
        header(name: string): string | undefined
        accepts(): string[]
        accepts(type: string): string | false
        accepts(type: string[]): string | false
        accepts(...type: string[]): string | false
        acceptsCharsets(): string[]
        acceptsCharsets(charset: string): string | false
        acceptsCharsets(charset: string[]): string | false
        acceptsCharsets(...charset: string[]): string | false
        acceptsEncodings(): string[]
        acceptsEncodings(encoding: string): string | false
        acceptsEncodings(encoding: string[]): string | false
        acceptsEncodings(...encoding: string[]): string | false
        acceptsLanguages(): string[]
        acceptsLanguages(lang: string): string | false
        acceptsLanguages(lang: string[]): string | false
        acceptsLanguages(...lang: string[]): string | false
        is(type: string | string[]): string | false | null
        param(name: string, defaultValue?: any): string
        range(size: number, options?: any): any
    }

    export interface Response extends ServerResponse {
        // 基本属性
        locals: any
        headersSent: boolean
        
        // 自定义扩展方法
        sendResponse?(result: any): void
        sendSuccess?<T>(data?: T, message?: string): void
        sendError?(code: number, message: string): void
        sendValidationError?(message: string): void
        
        // Express响应方法
        status(code: number): this
        sendStatus(code: number): this
        links(links: any): this
        send(body?: any): this
        json(body?: any): this
        jsonp(body?: any): this
        sendFile(path: string, options?: any, callback?: (err?: any) => void): void
        sendFile(path: string, callback?: (err?: any) => void): void
        download(path: string, callback?: (err?: any) => void): void
        download(path: string, filename: string, callback?: (err?: any) => void): void
        download(path: string, filename: string, options: any, callback?: (err?: any) => void): void
        contentType(type: string): this
        type(type: string): this
        format(obj: any): this
        attachment(filename?: string): this
        set(field: any): this
        set(field: string, value?: string | string[]): this
        header(field: any): this
        header(field: string, value?: string | string[]): this
        get(field: string): string | undefined
        clearCookie(name: string, options?: any): this
        cookie(name: string, value: any, options?: any): this
        location(url: string): this
        redirect(url: string): void
        redirect(status: number, url: string): void
        redirect(url: string, status: number): void
        render(view: string, options?: object, callback?: (err: Error, html: string) => void): void
        render(view: string, callback?: (err: Error, html: string) => void): void
        vary(field: string): this
        append(field: string, value?: string | string[]): this
        end(cb?: () => void): void
        end(chunk: any, cb?: () => void): void
        end(chunk: any, encoding: BufferEncoding, cb?: () => void): void
    }

    export interface NextFunction {
        (err?: any): void
        (deferToNext: 'router'): void
        (deferToNext: 'route'): void
    }

    export interface Application {
        use(...args: any[]): this
        get(path: string, ...handlers: any[]): this
        post(path: string, ...handlers: any[]): this
        put(path: string, ...handlers: any[]): this
        delete(path: string, ...handlers: any[]): this
        patch(path: string, ...handlers: any[]): this
        options(path: string, ...handlers: any[]): this
        head(path: string, ...handlers: any[]): this
        all(path: string, ...handlers: any[]): this
        listen(port: number, callback?: () => void): any
        listen(port: number, hostname: string, callback?: () => void): any
        listen(port: number, hostname: string, backlog: number, callback?: () => void): any
        set(setting: string, val: any): this
        get(setting: string): any
        enabled(setting: string): boolean
        disabled(setting: string): boolean
        enable(setting: string): this
        disable(setting: string): this
        engine(ext: string, fn: any): this
        param(name: string, handler: any): this
        param(callback: any): this
        route(path: string): any
        locals: any
    }

    export interface Router {
        use(...args: any[]): this
        get(path: string, ...handlers: any[]): this
        post(path: string, ...handlers: any[]): this
        put(path: string, ...handlers: any[]): this
        delete(path: string, ...handlers: any[]): this
        patch(path: string, ...handlers: any[]): this
        options(path: string, ...handlers: any[]): this
        head(path: string, ...handlers: any[]): this
        all(path: string, ...handlers: any[]): this
        param(name: string, handler: any): this
        param(callback: any): this
        route(path: string): any
    }

    export interface Express extends Application {}

    export function Router(options?: any): Router
    export function json(options?: any): any
    export function urlencoded(options?: any): any
    export function text(options?: any): any
    export function raw(options?: any): any
    export function static(root: string, options?: any): any

    function express(): Express
    export = express
}
