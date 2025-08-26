import AppRoutes from '@/routes/index.tsx'
import { ConfigProvider, ThemeConfig } from 'antd'
import React from 'react'

const App: React.FC = () => {
    const theme: Partial<ThemeConfig> = {
        token: {
            colorPrimary: '#1C47B5',
            colorBgBase: '#f0f2f5',
            colorError: '#B81919',
            colorWarning: '#786C36',
            colorInfo: '#7F2F4F',
            colorSuccess: '#2F7F55',
        },
        components: {
            Table: {
                borderColor: '#566B99',
                headerColor: '#fff',
                headerBorderRadius: 0,
                headerBg: '#5E83BB',
            },
        },
    }
    return (
        <ConfigProvider theme={theme}>
            <div h-full>
                <AppRoutes></AppRoutes>
            </div>
        </ConfigProvider>
    )
}

export default App
