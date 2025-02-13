// components/FileViewer/viewers/PDFViewer.tsx
import { Document, Page } from 'react-pdf'
import React, { useState } from 'react'
export function PDFViewer({ url }: ViewerComponentProps) {
    const [numPages, setNumPages] = useState<number>()
    const [pageNumber, setPageNumber] = useState(1)

    return (
        <div className="pdf-viewer">
            <Document file={url} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                <Page pageNumber={pageNumber} />
            </Document>
            <div className="pdf-controls">
                <button
                    onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                    disabled={pageNumber <= 1}
                >
                    Previous
                </button>
                <span>
                    Page {pageNumber} of {numPages}
                </span>
                <button
                    onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages || 1))}
                    disabled={pageNumber >= (numPages || 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
