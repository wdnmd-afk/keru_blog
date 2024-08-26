import React, { useCallback } from "react";
import { Http } from "@/utils";
import { Button } from "antd";
import { createContext, useContext, useState } from "react";

const CounterContext = createContext({
  count: 0,
  setCount: (data: number) => {},
});
const themeContext = createContext({
  theme: "dark",
  setTheme: (data: string) => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider>
      <Button></Button>

      <CounterContext.Provider value={{ count, setCount }}>
        {children}
      </CounterContext.Provider>
    </ThemeProvider>
  );
};

// 定义 Home 组件
const HomeBox: React.FC = () => {
  const { count, setCount } = useContext(CounterContext);
  const { theme, setTheme } = useContext(themeContext);

  const handleClick = useCallback(() => {
    setCount(count + 1);
    setTheme("dddd");
  }, [count, setCount]);

  return (
    <div className={"container"}>
      <Button type="primary" ghost onClick={handleClick}>
        点击我{theme}
      </Button>
      {count}
    </div>
  );
};

// 将 CounterProvider 包裹在 Home 组件的外部
const Home = () => {
  return (
    <CounterProvider>
      <HomeBox />
    </CounterProvider>
  );
};

// 导出 App 组件
export default Home;
