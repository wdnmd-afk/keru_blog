import React, { useState } from "react";
import style from "@/styles/layout.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const headerList: MenuItem[] = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string>(location.pathname);
  const handleMenuClick = (item: MenuItem) => {
    console.log(item, "item", location.pathname);
    if (item.path === location.pathname) return;
    navigate(item.path);
    setActiveMenu(item.path);
  };
  return (
    <div className={style.layout_container}>
      <div className={style.layout_header}>
        <div className={style.header_logo}></div>
        <div className={style.header_menu}>
          {headerList.map((item) => (
            <div
              className={`${style.menu_item} ${activeMenu === item.path ? style.menu_item_active : ""}`}
              key={item.name}
              onClick={() => {
                handleMenuClick(item);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className={style.header_persone}></div>
      </div>
      <div flex-1 h-0>
        {children}
      </div>
    </div>
  );
};

export default Layout;
