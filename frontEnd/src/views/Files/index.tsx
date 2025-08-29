import FilesErrorBoundary from '@/components/Files/ErrorBoundary'
import styles from '@/styles/files.module.scss'
import { Tabs, TabsProps } from 'antd'
import React from 'react'
import FilePreview from './FilePreview'
import Upload from './Upload'

/**
 * Files 主组件
 * 文件管理系统的主入口，提供文件上传和预览功能
 */
const Files: React.FC = () => {
    const [changeKey, setChangeKey] = React.useState(1)
    const [activeKey, setActiveKey] = React.useState('1')
    /**
     * 处理Tab切换
     * @param key 新的Tab key
     */
    const handleChange = (key: string) => {
        setActiveKey(key)
        // 切换到文件列表时触发刷新
        if (key === '2') {
            setChangeKey(prev => prev + 1)
        }
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
            label: (
                <span className="flex items-center gap-2">
                    📁 文件上传
                </span>
            ),
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
            label: (
                <span className="flex items-center gap-2">
                    📄 文件列表
                </span>
            ),
            children: (
                <FilesErrorBoundary 
                    onError={handleError}
                    showDetails={process.env.NODE_ENV === 'development'}
                >
                    <FilePreview changeKey={changeKey} />
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
