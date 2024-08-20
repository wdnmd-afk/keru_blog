import { Http } from "@/utils";

class LoginApi {
  public static async register(params: any) {
    const { data } = await Http.post("/user/create", params);
    return data;
  }
}
export { LoginApi };
