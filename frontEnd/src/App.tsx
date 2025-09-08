import AppRoutes from '@/routes/index.tsx'
import { useGlobalStore } from '@/store'
import { ConfigProvider, ThemeConfig } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import React from 'react'

const App: React.FC = () => {
    // 获取当前语言设置
    const currentLanguage = useGlobalStore((state) => state.preferences.language)

    // 根据语言设置选择Ant Design的locale
    const getAntdLocale = () => {
        switch (currentLanguage) {
            case 'en':
                return enUS
            case 'zh':
            default:
                return zhCN
        }
    }

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
        <ConfigProvider theme={theme} locale={getAntdLocale()}>
            <div h-full>
                <AppRoutes></AppRoutes>
            </div>
        </ConfigProvider>
    )
}

export default App
