import '@/i18n' // 导入国际化配置
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import App from './App.tsx'
import './index.css'
import './styles/antd.scss'
import './styles/init.scss'
import { bindGlobalMonitors } from './utils/monitor'

// import { GlobalStoreProvider } from "@/store/global";

// 绑定全局监控（只绑定一次）
bindGlobalMonitors()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<GlobalStoreProvider>*/}
        <App />
        {/*</GlobalStoreProvider>*/}
    </React.StrictMode>
)
