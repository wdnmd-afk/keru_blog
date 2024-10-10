import { Http } from '@/utils'

class FileApi {
    public static async test(params: any) {
        return await Http.post('/file/test', params)
    }
}

export { FileApi }
