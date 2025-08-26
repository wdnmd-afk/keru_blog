import { copyCodeToClipboard, formatCode, getCodeStats } from '@/utils/codeParser'
import { CheckOutlined, CopyOutlined } from '@ant-design/icons'
import { Button, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './CodeHighlight.module.scss'

interface CodeHighlightProps {
    code: string
    language?: string
    title?: string
    showCopy?: boolean
    showStats?: boolean
    maxHeight?: string
    className?: string
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({
    code,
    language = 'javascript',
    title,
    showCopy = true,
    showStats = false,
    maxHeight = '400px',
    className,
}) => {
    const [copied, setCopied] = useState(false)
    const [stats, setStats] = useState<any>(null)

    useEffect(() => {
        if (showStats) {
            setStats(getCodeStats(code))
        }
    }, [code, showStats])

    const handleCopy = async () => {
        const success = await copyCodeToClipboard(code)
        if (success) {
            setCopied(true)
            message.success('代码已复制到剪贴板')
            setTimeout(() => setCopied(false), 2000)
        } else {
            message.error('复制失败，请手动复制')
        }
    }

    const formattedCode = formatCode(code)

    return (
        <div className={`${styles.codeHighlight} ${className || ''}`}>
            {/* 代码块头部 */}
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    {title && <span className={styles.title}>{title}</span>}
                    {showStats && stats && (
                        <div className={styles.stats}>
                            <span>{stats.totalLines} 行</span>
                            <span>{stats.characters} 字符</span>
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    {showCopy && (
                        <Tooltip title={copied ? '已复制' : '复制代码'}>
                            <Button
                                type="text"
                                size="small"
                                icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                                onClick={handleCopy}
                                className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                            />
                        </Tooltip>
                    )}
                    <div className={styles.languageTag}>{language}</div>
                </div>
            </div>

            {/* 代码内容区域 */}
            <div className={styles.codeContainer} style={{ maxHeight }}>
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '16px',
                        background: 'transparent',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                    }}
                    showLineNumbers={true}
                    lineNumberStyle={{
                        color: '#858585',
                        fontSize: '12px',
                        paddingRight: '16px',
                        minWidth: '2em',
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                >
                    {formattedCode}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default CodeHighlight
