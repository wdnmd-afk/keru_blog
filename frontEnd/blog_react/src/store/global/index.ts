import { makeAutoObservable } from "mobx";

class GlobalStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

export { GlobalStore };
export * from "./provider.tsx";
