import React from "react";
import { Http } from "@/utils";
import { Button } from "antd";

// 定义 Home 组件
const Home: React.FC = () => {
  // 获取仓库数据

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
    </div>
  );
};

// 导出 Home 组件
export default Home;
