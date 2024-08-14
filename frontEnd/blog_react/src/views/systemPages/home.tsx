import React from "react";
import { Http } from "@/utils";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  addValue,
  syncAddvalue,
} from "@/store/system/counterSlice";
// 定义 Home 组件
const Home: React.FC = () => {
  // 获取仓库数据
  const count = useSelector((state) => state.counter.value);
  // 获取修改仓库数据的工具
  const dispatch = useDispatch();
  // 点击按钮的处理函数
  const handleClick = async () => {
    const { data } = await Http.post("/user/create", {});
    console.log(data);
  };

  return (
    <div className={"container"}>
      <Button type="primary" ghost onClick={handleClick}>
        点击我
      </Button>
      {count}
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(addValue(5))}>+5</button>
      <button onClick={() => dispatch(syncAddvalue(10))}>两秒后+10</button>
    </div>
  );
};

// 导出 Home 组件
export default Home;
