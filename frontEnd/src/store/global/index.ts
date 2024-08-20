import { makeAutoObservable, observable } from "mobx";
interface User {
  id?: string;
  name?: string;
  admin?: boolean;
  token?: string;
}

class GlobalStore {
  user: User = {};

  constructor() {
    makeAutoObservable(this, {
      user: observable,
    });
  }

  setUserInfo(data: User) {
    this.user = data;
  }
}

export { GlobalStore };
export * from "./provider.tsx";
