import React from 'react'
import ReactDOM from 'react-dom/client'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import App from './App.tsx'
import './index.css'
import './styles/antd.scss'
import './styles/init.scss'

// import { GlobalStoreProvider } from "@/store/global";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<GlobalStoreProvider>*/}
        <App />
        {/*</GlobalStoreProvider>*/}
    </React.StrictMode>
)
