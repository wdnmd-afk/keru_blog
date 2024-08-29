import { Http } from "@/utils";
interface LoginProp {
  name?: string;
  password?: string;
  email?: string;
  remember?: boolean;
  admin?: boolean;
}
class LoginApi {
  public static async register(params: LoginProp) {
    return await Http.post("/user/create", params);
  }
  public static async login(params: LoginProp) {
    return await Http.post("/user/login", params);
  }
}
export { LoginApi };
