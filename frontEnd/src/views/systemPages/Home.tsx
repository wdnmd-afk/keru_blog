import React, { useEffect } from "react";
import { HomeApi } from "@/api";
import { Button } from "antd";
import style from "@/styles/home.module.scss";
// import useStores from "@/hooks/useStores.ts";

// 将 CounterProvider 包裹在 Home 组件的外部
const Home = () => {
  return (
    <div className={style.home_container}>
      <Button type="primary">Primary Button</Button>
    </div>
  );
};

// 导出 App 组件
export default Home;
