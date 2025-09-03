import { Http } from '@/utils'
import type {
    UploadParams,
    MergeParams,
    FileQuery,
    DeleteFileParams,
    FileListResponse
} from '@/types/files'

/**
 * 文件API类
 * 提供文件管理相关的API接口
 */
class FileApi {
    /**
     * 测试接口
     * @param params 测试参数
     */
    public static async test(params: any): Promise<any> {
        return await Http.post('/file/test', params)
    }

    /**
     * 检查文件是否存在
     * @param params 文件检查参数
     */
    public static async checkFile(params: UploadParams): Promise<any> {
        return await Http.post('/file/check', params)
    }

    /**
     * 合并文件切片
     * @param params 文件合并参数
     */
    public static async mergeChunk(params: MergeParams): Promise<any> {
        return await Http.post('/file/merge', params)
    }

    /**
     * 查询文件列表
     * @param params 查询参数
     */
    public static async queryFileList(params: FileQuery): Promise<any> {
        return await Http.post('/file/query', params)
    }

    /**
     * 上传文件（切片）
     * @param params FormData格式的文件数据
     * @param options 上传选项，包括进度回调和取消信号
     */
    public static async uploadFile(
        params: FormData,
        options?: {
            onUploadProgress?: (progressEvent: any) => void
            signal?: AbortSignal
        }
    ): Promise<any> {
        return await Http.postFile('/file/upload', params, options)
    }

    /**
     * 单文件上传
     * @param params FormData格式的文件数据
     * @param options 上传选项，包括进度回调和取消信号
     */
    public static async uploadFileSingle(
        params: FormData, 
        options?: {
            onUploadProgress?: (progressEvent: any) => void
            signal?: AbortSignal
        }
    ): Promise<any> {
        return await Http.postFile('/file/uploadSingle', params, options)
    }

    /**
     * 删除文件
     * @param params 删除参数
     */
    public static async deleteFile(params: DeleteFileParams): Promise<any> {
        return await Http.post('/file/deleteFile', params)
    }
}

export { FileApi }
