import { Http } from '@/utils'
interface LoginProp {
    name?: string
    password?: string
    email?: string
    remember?: boolean
    admin?: boolean
}

interface ResetPasswordProp {
    name: string
    email: string
    newPassword: string
}

class LoginApi {
    public static async register(params: LoginProp) {
        return await Http.post('/user/register', params)
    }
    public static async login(params: LoginProp) {
        return await Http.post('/user/login', params)
    }
    
    // 重置密码 - 通过用户名和邮箱验证
    public static async resetPassword(params: ResetPasswordProp) {
        return await Http.post('/user/resetPassword', params)
    }
}
export { LoginApi }
