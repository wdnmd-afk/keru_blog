import { Http } from '@/utils'

class HomeApi {
    public static async test(params: any) {
        return await Http.post('/user/index', params)
    }
}
export { HomeApi }
