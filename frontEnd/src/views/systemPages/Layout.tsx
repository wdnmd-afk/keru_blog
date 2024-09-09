import React from "react";
import style from "@/styles/layout.module.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={style.layout_container}>
      <div color={"red"}>共用Header</div>
      {children}
    </div>
  );
};

export default Layout;
