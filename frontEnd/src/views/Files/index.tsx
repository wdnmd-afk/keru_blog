import FilesErrorBoundary from '@/components/Files/ErrorBoundary'
import styles from '@/styles/files.module.scss'
import { Tabs, TabsProps } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import FilePreview from './FilePreview'
import Upload from './Upload'
import HtmlToPdf from './HtmlToPdf'

/**
 * Files 主组件
 * 文件管理系统的主入口，提供文件上传和预览功能
 * 使用全局状态管理，无需changeKey机制
 */
const Files: React.FC = () => {
    const { t } = useTranslation('files')
    const [activeKey, setActiveKey] = React.useState('1')
    /**
     * 处理Tab切换
     * @param key 新的Tab key
     */
    const handleChange = (key: string) => {
        setActiveKey(key)
        // 全局状态管理会自动同步数据，无需手动触发刷新
    }

    /**
     * 错误处理回调
     * @param error 错误对象
     * @param errorInfo 错误信息
     */
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
        console.error('Files module error:', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
        })

        // 可以在这里添加错误上报逻辑
        // reportError(error, errorInfo)
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span className="flex items-center gap-2">📁 {t('tabs.upload')}</span>,
            children: (
                <FilesErrorBoundary
                    onError={handleError}
                    showDetails={process.env.NODE_ENV === 'development'}
                >
                    <Upload />
                </FilesErrorBoundary>
            ),
        },
        {
            key: '2',
            label: <span className="flex items-center gap-2">📄 {t('tabs.list')}</span>,
            children: (
                <FilesErrorBoundary
                    onError={handleError}
                    showDetails={process.env.NODE_ENV === 'development'}
                >
                    <FilePreview />
                </FilesErrorBoundary>
            ),
        },
        {
            key: '3',
            label: <span className="flex items-center gap-2">🧾 HTML转PDF</span>,
            children: (
                <FilesErrorBoundary
                    onError={handleError}
                    showDetails={process.env.NODE_ENV === 'development'}
                >
                    <HtmlToPdf />
                </FilesErrorBoundary>
            ),
        },
    ]

    return (
        <FilesErrorBoundary
            onError={handleError}
            showDetails={process.env.NODE_ENV === 'development'}
        >
            <div className={styles.file_container}>
                <div>
                    <Tabs
                        activeKey={activeKey}
                        items={items}
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onChange={handleChange}
                        size="large"
                        type="card"
                    />
                </div>
            </div>
        </FilesErrorBoundary>
    )
}

export default Files
