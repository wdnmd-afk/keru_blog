import { copyCodeToClipboard, formatCode, getCodeStats } from '@/utils/codeParser'
import { CheckOutlined, CopyOutlined } from '@ant-design/icons'
import { Button, Tooltip, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation('common')
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
            message.success(t('code.copied_to_clipboard'))
            setTimeout(() => setCopied(false), 2000)
        } else {
            message.error(t('code.copy_failed'))
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
                            <span>{stats.totalLines} {t('code.lines')}</span>
                            <span>{stats.characters} {t('code.characters')}</span>
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    {showCopy && (
                        <Tooltip title={copied ? t('code.copied') : t('code.copy_code')}>
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
