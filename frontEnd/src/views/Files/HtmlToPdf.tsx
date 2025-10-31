import React, { useCallback, useMemo, useState } from 'react'
import { Button, Card, Divider, Form, Input, InputNumber, message, Radio, Select, Space, Typography, Upload } from 'antd'
import type { UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import PDFPreview from './components/PDFPreview'
import TemplateApiFront, { type GeneratePdfFromHtmlRequest, type TemplateType } from '@/api/template'

/**
 * HTML 转 PDF 组件（文件/源码两种方式）
 * - 复用后端模板 + PDF 生成接口：先创建临时模板，再调用 /htmlpdf/generate
 * - 生成的 PDF 将落盘于 /static/PDF/YYYYMMDD/xxx.pdf（通过 /static 暴露）
 */
const HtmlToPdf: React.FC = () => {
    // 模式：上传HTML文件 或 粘贴HTML源码
    const [mode, setMode] = useState<'upload' | 'paste'>('upload')
    const [htmlSource, setHtmlSource] = useState<string>('')

    // PDF 生成选项
    const [pdfType, setPdfType] = useState<TemplateType>('A4')
    const [widthMm, setWidthMm] = useState<number | undefined>(undefined)
    const [heightMm, setHeightMm] = useState<number | undefined>(undefined)
    const [marginTop, setMarginTop] = useState<number>(15)
    const [marginRight, setMarginRight] = useState<number>(11)
    const [marginBottom, setMarginBottom] = useState<number>(15)
    const [marginLeft, setMarginLeft] = useState<number>(11)
    const [fileName, setFileName] = useState<string>('')

    const [loading, setLoading] = useState(false)
    const [resultUrl, setResultUrl] = useState<string>('')

    // 读取上传的 .html 文件内容到 htmlSource
    const uploadProps: UploadProps = useMemo(
        () => ({
            accept: '.html,.htm',
            maxCount: 1,
            multiple: false,
            beforeUpload: () => false, // 阻止自动上传
            onChange: async ({ file }) => {
                try {
                    // 仅当选择完成后再读取
                    const f = file.originFileObj
                    if (!f) return
                    const text = await f.text()
                    setHtmlSource(text)
                    message.success('HTML 文件读取成功')
                } catch (e: any) {
                    console.error(e)
                    message.error('读取HTML文件失败')
                }
            },
        }),
        []
    )

    // 过去用于模板名的函数已不再需要（切换到 generate-raw 接口）

    // 提交生成 PDF（异步：仅入队，不跟踪）
    const handleGenerate = useCallback(async () => {
        const html = (htmlSource || '').trim()
        if (!html) {
            return message.warning('请先上传HTML文件或粘贴HTML源码')
        }

        // 校验自定义尺寸
        if (pdfType === 'CUSTOM' && (!widthMm || !heightMm)) {
            return message.warning('自定义尺寸需要同时指定宽度和高度（单位：mm）')
        }

        setLoading(true)
        setResultUrl('')
        try {
            // 直接调用“原始HTML转PDF”异步入队接口（后端会预处理：移除 <title>、@page，并覆盖 ActiveReports 分页）
            const options: GeneratePdfFromHtmlRequest['options'] = {
                type: pdfType,
                widthMm: pdfType === 'CUSTOM' ? widthMm : undefined,
                heightMm: pdfType === 'CUSTOM' ? heightMm : undefined,
                marginMm: {
                    top: marginTop,
                    right: marginRight,
                    bottom: marginBottom,
                    left: marginLeft,
                },
                fileName: fileName?.trim() || undefined,
                // 关闭页眉/页脚，避免引用 <title>
                displayHeaderFooter: false,
                // 对于包含 Canvas/SVG/脚本的 HTML，如需运行脚本可选择放开：
                // sanitize: false,
                // allowScripts: true,
                // waitUntil: 'domcontentloaded',
            }
            await TemplateApiFront.enqueuePdfFromHtml({ html, options })
            message.success('任务已提交，后台将自动生成')
            setLoading(false)
        } catch (e: any) {
            console.error(e)
            message.error(e?.message || '任务入队失败')
            setLoading(false)
        }
    }, [htmlSource, pdfType, widthMm, heightMm, marginTop, marginRight, marginBottom, marginLeft, fileName])

    const handleReset = useCallback(() => {
        setHtmlSource('')
        setResultUrl('')
        setPdfType('A4')
        setWidthMm(undefined)
        setHeightMm(undefined)
        setMarginTop(15)
        setMarginRight(11)
        setMarginBottom(15)
        setMarginLeft(11)
        setFileName('')
    }, [])

    return (
        <Card title={<span>🧾 HTML 转 PDF</span>} bordered>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                {/* 模式选择 */}
                <div>
                    <Typography.Text strong>导入方式：</Typography.Text>
                    <Radio.Group
                        style={{ marginLeft: 12 }}
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                    >
                        <Radio.Button value="upload">上传HTML文件</Radio.Button>
                        <Radio.Button value="paste">粘贴HTML源码</Radio.Button>
                    </Radio.Group>
                </div>

                {/* 上传或粘贴区域 */}
                {mode === 'upload' ? (
                    <Upload.Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽上传 .html/.htm 文件</p>
                        <p className="ant-upload-hint">文件将仅在本地读取为文本，不会直接上传到服务器</p>
                    </Upload.Dragger>
                ) : (
                    <Form layout="vertical">
                        <Form.Item label="HTML 源码">
                            {/* 固定高度的输入框，避免超长内容把页面撑开；开启换行与断词，并允许滚动查看 */}
                            <Input.TextArea
                                value={htmlSource}
                                onChange={(e) => setHtmlSource(e.target.value)}
                                rows={12}
                                style={{
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    overflow: 'auto',
                                }}
                                placeholder="在此粘贴完整 HTML 文档（建议包含 <html>/<head>/<body> 结构）"
                            />
                        </Form.Item>
                    </Form>
                )}

                <Divider />

                {/* PDF 选项 */}
                <Form layout="inline">
                    <Form.Item label="纸张大小">
                        <Select<TemplateType> value={pdfType} onChange={setPdfType} style={{ width: 160 }}>
                            <Select.Option value="A4">A4</Select.Option>
                            <Select.Option value="A5">A5</Select.Option>
                            <Select.Option value="CUSTOM">自定义</Select.Option>
                        </Select>
                    </Form.Item>
                    {pdfType === 'CUSTOM' && (
                        <>
                            <Form.Item label="宽(mm)">
                                <InputNumber min={10} max={1000} value={widthMm} onChange={setWidthMm as any} />
                            </Form.Item>
                            <Form.Item label="高(mm)">
                                <InputNumber min={10} max={1000} value={heightMm} onChange={setHeightMm as any} />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item label="上边距(mm)">
                        <InputNumber min={0} max={100} value={marginTop} onChange={setMarginTop as any} />
                    </Form.Item>
                    <Form.Item label="右边距(mm)">
                        <InputNumber min={0} max={100} value={marginRight} onChange={setMarginRight as any} />
                    </Form.Item>
                    <Form.Item label="下边距(mm)">
                        <InputNumber min={0} max={100} value={marginBottom} onChange={setMarginBottom as any} />
                    </Form.Item>
                    <Form.Item label="左边距(mm)">
                        <InputNumber min={0} max={100} value={marginLeft} onChange={setMarginLeft as any} />
                    </Form.Item>
                    <Form.Item label="文件名(可选)">
                        <Input
                            allowClear
                            placeholder="不填则后端自动生成"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            style={{ width: 220 }}
                        />
                    </Form.Item>
                </Form>

                <Space>
                    <Button type="primary" loading={loading} onClick={handleGenerate}>
                        生成 PDF
                    </Button>
                    <Button onClick={handleReset} disabled={loading}>
                        重置
                    </Button>
                </Space>

                {/* 结果展示（仅当同步模式才会立即显示；异步入队模式无需展示）*/}
                {resultUrl && (
                    <Card type="inner" title="生成结果">
                        <Space direction="vertical" style={{ width: '100%' }} size="middle">
                            <Typography.Paragraph>
                                已生成：
                                <a href={resultUrl} target="_blank" rel="noreferrer">
                                    {resultUrl}
                                </a>
                            </Typography.Paragraph>
                            {/* 内联预览（可选） */}
                            <div style={{ height: 600 }}>
                                <PDFPreview src={resultUrl} fileName={fileName || 'document.pdf'} />
                            </div>
                        </Space>
                    </Card>
                )}
            </Space>
        </Card>
    )
}

export default HtmlToPdf
