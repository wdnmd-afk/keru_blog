import React, { useEffect } from "react";
import { HomeApi } from "@/api";
import { Button } from "antd";
// import useStores from "@/hooks/useStores.ts";

// 定义 Home 组件
const HomeBox: React.FC = () => {
  // const { GlobalStore } = useStores();
  useEffect(() => {
    console.log("进入了HOme组件");
  });
  const handleClick = () => {
    HomeApi.test({});
  };
  const clear = () => {};
  return (
    <div className={"container"}>
      <Button type="primary" ghost onClick={handleClick}>
        点击我
      </Button>
      <Button type="primary" ghost onClick={clear}>
        点击我2
      </Button>
    </div>
  );
};

// 将 CounterProvider 包裹在 Home 组件的外部
const Home = () => {
  return <HomeBox />;
};

// 导出 App 组件
export default Home;
