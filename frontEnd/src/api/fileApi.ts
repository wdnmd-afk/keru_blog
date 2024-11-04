import { Http } from '@/utils'

interface CheckProp {
    fileHash: string
    fileName: string
}

interface mergeProp extends CheckProp {
    chunkSize: number
}

class FileApi {
    public static async test(params: any) {
        return await Http.post('/file/test', params)
    }

    public static async checkFile(params: CheckProp) {
        return await Http.post('/file/check', params)
    }

    public static async mergeChunk(params: mergeProp) {
        return await Http.post('/file/merge', params)
    }

    public static async uploadFile(params: FormData, onCancel: (fn: () => void) => void) {
        // 如果提供了 onCancel 回调，则传递取消函数
        if (typeof onCancel === 'function') {
            // 如果是一个函数，则直接调用传一个取消方法给 这个方法
            // 所以只要传进来是方法，就会直接传一个参数并直接触发这个函数
            // 那传过来的这个方法就会接收到一个参数（就是取消函数() => controller.abort()）
            // 在调用uploadFile就可以拿到这个参数
            onCancel(() => Http.controller.abort()) // 调用 onCancel 时传入取消函数
        }
        return await Http.postFile('/file/upload', params)
    }
}

export { FileApi }
