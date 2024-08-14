// 定义仓库
// 引入configureStore 定义仓库
import { configureStore } from "@reduxjs/toolkit";
// 导入counterSlice
import counter from "./counterSlice";
// 导出
const SystemStore = configureStore({
  // 数据处理
  reducer: {
    counter,
  },
});

export { SystemStore };
