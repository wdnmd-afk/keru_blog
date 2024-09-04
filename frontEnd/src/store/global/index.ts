/*import { makeAutoObservable, observable } from "mobx";
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
  clearUserInfo() {
    this.user = {};
  }
}

export { GlobalStore };
export * from "./provider.tsx";*/
import { create } from "zustand";
const useGlobalStore = create((set, get) => ({
  user: { id: "", name: "", admin: false, token: "" },
  getUser() {
    return get().user;
  },
  setUserInfo: (data) => {
    const user = { ...get().user, ...data };
    set(() => ({ user }));
  },
}));

export { useGlobalStore };
