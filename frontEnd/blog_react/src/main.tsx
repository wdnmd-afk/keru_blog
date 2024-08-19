import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/init.scss";
import "./index.css";
import "virtual:uno.css";
import { GlobalStoreProvider } from "@/store/global";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStoreProvider>
      <App />
    </GlobalStoreProvider>
  </React.StrictMode>,
);
