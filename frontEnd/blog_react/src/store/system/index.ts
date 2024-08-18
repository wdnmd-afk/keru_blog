// 定义仓库
import { Store } from "@reduxjs/toolkit";
// 引入configureStore 定义仓库
import { configureStore } from "@reduxjs/toolkit";
// 导入counterSlice
import { systemReducer } from "./systemReducer.ts";
// 导出
const SystemStore: Store = configureStore({
  // 数据处理
  reducer: {
    systemReducer,
  },
}) as ReturnType<typeof configureStore>;

export { SystemStore };

export * from "./systemReducer.ts";
