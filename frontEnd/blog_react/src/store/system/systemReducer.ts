// 创建计数器切片slice
// 导入创建切片的函数
import { createSlice } from "@reduxjs/toolkit";
import type { Reducer, Action } from "@reduxjs/toolkit";
interface UserDto {
  userName?: string;
  userId?: string;
}

// 定义初始化状态类型
interface InitialState {
  userInfo: UserDto;
}

// 初始化状态
const initialState: InitialState = { userInfo: {} };

// 创建切片
const system = createSlice({
  // 切片名称
  name: "system",
  // 初始化状态
  initialState,
  // 定义处理器
  reducers: {
    // 处理加法
    setUserInfo: (state: InitialState, payload: object) => {
      state.userInfo = payload;
      console.log(state.userInfo, "state.userInfo");
    },
  },
});

export const selectUser = (state) => state.systemReducer.userInfo;
// 导出动作类型
export const { setUserInfo } = system.actions;

// 导出处理器类型
const systemReducer: Reducer<InitialState, Action> = system.reducer;

export { systemReducer };
