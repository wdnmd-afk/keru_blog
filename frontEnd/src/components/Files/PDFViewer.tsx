// components/FileViewer/viewers/PDFViewer.tsx
import SvgIcon from '@/components/SvgIcon.tsx'
import styles from '@/styles/files.module.scss'
import { Input, Tooltip, message } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { ViewerComponentProps } from './dto.ts'
pdfjs.GlobalWorkerOptions.workerSrc = `http://localhost:3000/static/JS/pdf.worker.min.js`

interface IPageSelect {
    page: number
    total: number
}

interface IRatioViewer {
    ratio: number
}
const RatioViewer: React.FC<IRatioViewer> = ({ ratio }) => {
    return <div>{ratio}%</div>
}
const PageSelect: React.FC<IPageSelect> = ({ page, total }) => {
    useEffect(() => {
        console.log(total, 'tototototot')
    }, [total])
    return (
        <div>
            {page}/{total}
        </div>
    )
}
function PDFViewer({ url, fileInfo }: ViewerComponentProps) {
    const [pageNumber, setPageNumber] = useState(1)
    const [numPages, setNumPages] = useState(10)
    const [ratio, setRatio] = useState(100)
    const scale = useMemo(() => ratio / 100, [ratio])
    const [inputValue, setInputValue] = useState(1)
    useEffect(() => {
        setInputValue(pageNumber)
    }, [pageNumber])

    // 页码更新和缩放更新函数
    const handleZoomIn = () => setRatio((prev) => Math.min(prev + 10, 200))
    const handleZoomOut = () => setRatio((prev) => Math.max(prev - 10, 50))
    const handleNextPage = () => {
        if (pageNumber == numPages) return message.warning('已经是最后一页了')
        setPageNumber((prev) => Math.min(prev + 1, numPages))
    }
    const handlePreviousPage = () => {
        if (pageNumber == 1) return message.warning('已经是第一页了')
        setPageNumber((prev) => Math.max(prev - 1, 1))
    }
    const [fullscreen, setFullscreen] = useState(false)
    const toPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const data = (e.target as HTMLInputElement).value
        if (Number(data) > 0 && Number(data) <= numPages) {
            setPageNumber(Number(data))
        }
    }
    const onPageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = e.target.value
        if (Number.isInteger(Number(data))) {
            setInputValue(Number(data))
        }
    }
    return (
        <div className="h-full flex-col pos-relative ">
            <div className={styles.pageTool} z-9999>
                <Tooltip title={pageNumber == 1 ? '已是第一页' : '上一页'}>
                    <span f-c-c onClick={handlePreviousPage}>
                        <SvgIcon name={'last'}></SvgIcon>
                    </span>
                </Tooltip>
                <Input
                    value={inputValue}
                    onChange={onPageNumberChange}
                    onPressEnter={toPage}
                    type="number"
                />{' '}
                / {numPages}
                <Tooltip title={pageNumber == numPages ? '已是最后一页' : '下一页'}>
                    <span f-c-c onClick={handleNextPage}>
                        <SvgIcon name={'next'} color={'#fff'}></SvgIcon>
                    </span>
                </Tooltip>
                <Tooltip title="放大">
                    <span f-c-c onClick={handleZoomIn}>
                        <SvgIcon name={'zoomIn'}></SvgIcon>
                    </span>
                </Tooltip>
                <Tooltip title="缩小">
                    <span f-c-c onClick={handleZoomOut}>
                        <SvgIcon name={'narrow'}></SvgIcon>
                    </span>
                </Tooltip>
                <Tooltip title={fullscreen ? '恢复默认' : '适合窗口'}>
                    <span f-c-c>
                        <SvgIcon name={'fullscreen'}></SvgIcon>
                    </span>
                </Tooltip>
            </div>

            <div flex-1 h-0 f-c-c overflow-hidden>
                <Document
                    file={url}
                    onLoadSuccess={({ numPages }) => {
                        setNumPages(numPages)
                    }}
                >
                    <Page h-full pageNumber={pageNumber} scale={scale} z-111 />
                </Document>
            </div>
        </div>
    )
}

export default PDFViewer
