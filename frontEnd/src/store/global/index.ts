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
const useGlobalStore = create((set) => ({
  user: { id: "", name: "", admin: false, token: "" },
  setUserInfo: (data) =>
    set((state) => {
      console.log(data, state.user);
      return {
        user: { token: 1 },
      };
    }),
  removeAllBears: () => set({ user: {} }),
}));

export { useGlobalStore };
