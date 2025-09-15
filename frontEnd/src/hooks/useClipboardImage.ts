import { useCallback, useEffect } from 'react'
import { message } from 'antd'
import { ImageItem } from '@/components/ImageUpload'
import { Http } from '@/utils'

interface UseClipboardImageOptions {
    maxSize?: number        // 最大文件大小（MB）
    maxCount?: number       // 最大图片数量
    currentCount?: number   // 当前已有图片数量
    enabled?: boolean       // 是否启用剪贴板监听
    onImagePaste?: (image: ImageItem) => void  // 图片粘贴回调
}

/**
 * 剪贴板图片处理Hook
 * 支持监听 Ctrl+V 粘贴事件，自动检测和处理图片数据
 */
export const useClipboardImage = (options: UseClipboardImageOptions = {}) => {
    const {
        maxSize = 15,
        maxCount = 6,
        currentCount = 0,
        enabled = true,
        onImagePaste
    } = options

    /**
     * 处理粘贴事件
     */
    const handlePaste = useCallback(async (e: ClipboardEvent) => {
        // 如果未启用或没有回调函数，直接返回
        if (!enabled || !onImagePaste) return

        // 检查数量限制
        if (currentCount >= maxCount) {
            message.warning(`最多只能添加${maxCount}张图片`)
            return
        }

        const items = e.clipboardData?.items
        if (!items) return

        // 遍历剪贴板项目，查找图片
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile()
                if (!file) continue

                // 文件大小检查
                if (file.size > maxSize * 1024 * 1024) {
                    message.error(`粘贴的图片大小不能超过${maxSize}MB`)
                    continue
                }

                // 检查文件类型
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
                if (!allowedTypes.includes(file.type)) {
                    message.error('仅支持粘贴 JPG、PNG、GIF、WebP 格式的图片')
                    continue
                }

                try {
                    // 生成文件名
                    const timestamp = Date.now()
                    const extension = file.type.split('/')[1] || 'png'
                    const fileName = `粘贴图片-${timestamp}.${extension}`

                    // 创建临时图片项，用于显示上传进度
                    const tempImage: ImageItem = {
                        id: `paste-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
                        url: URL.createObjectURL(file), // 创建本地预览URL
                        name: fileName,
                        size: file.size,
                        type: file.type,
                        status: 'uploading'
                    }

                    // 先添加临时图片显示上传状态
                    onImagePaste(tempImage)

                    // 上传到服务器
                    const formData = new FormData()
                    formData.append('file', file)

                    const response = await Http.postFile('/ai/upload-image', formData)

                    // 上传成功，更新图片状态
                    const uploadedImage: ImageItem = {
                        ...tempImage,
                        url: response.data.url, // 使用服务器返回的URL
                        status: 'uploaded'
                    }

                    // 更新图片状态（这里需要通过回调更新）
                    onImagePaste(uploadedImage)
                    message.success(`图片粘贴成功 (${currentCount + 1}/${maxCount})`)

                } catch (error) {
                    console.error('处理粘贴图片失败:', error)
                    message.error('图片粘贴失败，请重试')

                    // 更新为错误状态
                    const errorImage: ImageItem = {
                        ...tempImage,
                        status: 'error'
                    }
                    onImagePaste(errorImage)
                }

                // 只处理第一个图片，避免重复处理
                break
            }
        }
    }, [enabled, onImagePaste, maxSize, maxCount, currentCount])

    /**
     * 检查浏览器是否支持剪贴板API
     */
    const isClipboardSupported = useCallback(() => {
        return !!(navigator.clipboard && window.ClipboardEvent)
    }, [])

    /**
     * 手动触发粘贴处理（用于测试或特殊场景）
     */
    const triggerPaste = useCallback(async () => {
        if (!isClipboardSupported()) {
            message.warning('当前浏览器不支持剪贴板功能')
            return
        }

        try {
            // 尝试读取剪贴板内容
            const clipboardItems = await navigator.clipboard.read()

            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    if (type.startsWith('image/')) {
                        const blob = await clipboardItem.getType(type)
                        const file = new File([blob], `clipboard-image.${type.split('/')[1]}`, { type })

                        // 创建模拟的粘贴事件
                        const mockEvent = new ClipboardEvent('paste', {
                            clipboardData: new DataTransfer()
                        })

                        // 这里需要手动处理，因为无法完全模拟ClipboardEvent
                        if (file.size > maxSize * 1024 * 1024) {
                            message.error(`图片大小不能超过${maxSize}MB`)
                            return
                        }

                        try {
                            const timestamp = Date.now()
                            const extension = type.split('/')[1] || 'png'
                            const fileName = `剪贴板图片-${timestamp}.${extension}`

                            // 创建临时图片项
                            const tempImage: ImageItem = {
                                id: `manual-paste-${timestamp}`,
                                url: URL.createObjectURL(file),
                                name: fileName,
                                size: file.size,
                                type: file.type,
                                status: 'uploading'
                            }

                            onImagePaste?.(tempImage)

                            // 上传到服务器
                            const formData = new FormData()
                            formData.append('file', file)

                            const response = await Http.postFile('/ai/upload-image', formData)

                            // 上传成功，更新图片状态
                            const uploadedImage: ImageItem = {
                                ...tempImage,
                                url: response.data.url,
                                status: 'uploaded'
                            }

                            onImagePaste?.(uploadedImage)
                            message.success('图片粘贴成功')

                        } catch (error) {
                            console.error('手动粘贴图片失败:', error)
                            message.error('图片粘贴失败，请重试')
                        }
                        return
                    }
                }
            }

            message.info('剪贴板中没有找到图片')
        } catch (error) {
            console.error('读取剪贴板失败:', error)
            message.error('无法访问剪贴板，请使用 Ctrl+V 粘贴')
        }
    }, [isClipboardSupported, maxSize, onImagePaste])

    /**
     * 自动绑定和解绑粘贴事件监听器
     */
    useEffect(() => {
        if (!enabled) return

        // 绑定全局粘贴事件
        document.addEventListener('paste', handlePaste)

        // 清理函数
        return () => {
            document.removeEventListener('paste', handlePaste)
        }
    }, [handlePaste, enabled])

    return {
        handlePaste,           // 手动处理粘贴事件的函数
        triggerPaste,          // 手动触发粘贴的函数
        isClipboardSupported   // 检查浏览器支持的函数
    }
}

export default useClipboardImage
