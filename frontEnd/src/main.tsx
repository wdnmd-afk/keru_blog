import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/init.scss'
import './styles/antd.scss'
import './index.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

// import { GlobalStoreProvider } from "@/store/global";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<GlobalStoreProvider>*/}
        <App />
        {/*</GlobalStoreProvider>*/}
    </React.StrictMode>
)
