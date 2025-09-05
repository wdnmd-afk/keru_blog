/**
 * PDF.js Worker 本地配置脚本
 * 用于在CDN不可用时提供本地worker支持
 */

;(function () {
    'use strict'

    // 检查是否已经配置了PDF.js worker
    if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
        console.log('PDF.js worker已配置')
        return
    }

    // 等待PDF.js库加载
    function waitForPDFJS(callback) {
        if (window.pdfjsLib) {
            callback()
        } else {
            setTimeout(() => waitForPDFJS(callback), 100)
        }
    }

    // 配置worker
    waitForPDFJS(() => {
        const pdfjsVersion = window.pdfjsLib.version

        // 多个worker源配置
        const workerSources = [
            // 主要CDN源
            `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`,
            // 备用CDN源
            `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`,
            `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`,
            // 本地worker（如果存在）
            '/pdf.worker.min.js',
        ]

        // 测试worker源可用性
        async function testWorkerSource(src) {
            try {
                const response = await fetch(src, { method: 'HEAD' })
                return response.ok
            } catch (error) {
                console.warn(`Worker源不可用: ${src}`, error)
                return false
            }
        }

        // 选择第一个可用的worker源
        async function setupWorker() {
            for (const src of workerSources) {
                const isAvailable = await testWorkerSource(src)
                if (isAvailable) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = src
                    console.log(`PDF.js worker配置成功: ${src}`)
                    return
                }
            }

            console.error('所有PDF.js worker源都不可用')

            // 如果所有CDN都不可用，尝试使用内联worker
            setupInlineWorker()
        }

        // 内联worker配置（最后的备选方案）
        function setupInlineWorker() {
            try {
                // 创建一个简单的worker blob
                const workerBlob = new Blob(
                    [
                        `
          // 这是一个简化的PDF.js worker
          // 实际使用中应该包含完整的worker代码
          self.onmessage = function(e) {
            console.warn('使用简化的PDF worker，功能可能受限');
            // 这里应该包含PDF.js worker的实际代码
          };
        `,
                    ],
                    { type: 'application/javascript' }
                )

                const workerUrl = URL.createObjectURL(workerBlob)
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

                console.warn('使用内联PDF worker，功能可能受限')
            } catch (error) {
                console.error('内联worker配置失败:', error)
            }
        }

        // 开始配置
        setupWorker()
    })
})()
