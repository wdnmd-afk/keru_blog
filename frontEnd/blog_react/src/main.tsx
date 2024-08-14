import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/init.scss";
import "./index.css";
import "virtual:uno.css";
import { Provider } from "react-redux";
import { SystemStore } from "@/store";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={SystemStore}>
      <App />
    </Provider>
  </React.StrictMode>,
);
