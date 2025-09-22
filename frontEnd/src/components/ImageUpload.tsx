import { Http } from '@/utils'
import { PictureOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import React from 'react'

// 图片项接口定义
export interface ImageItem {
    id: string
    url: string // 图片URL或base64
    name: string // 文件名
    size: number // 文件大小（字节）
    type: string // MIME类型
    status: 'uploading' | 'uploaded' | 'error' // 上传状态
}

interface ImageUploadProps {
    onImageAdd: (image: ImageItem) => void // 单个图片添加回调
    onImagesAdd?: (images: ImageItem[]) => void // 批量图片添加回调
    disabled?: boolean // 是否禁用
    maxSize?: number // 最大文件大小（MB）
    maxCount?: number // 最大图片数量
    currentCount?: number // 当前已有图片数量
    multiple?: boolean // 是否支持多选
}

/**
 * 图片上传组件
 * 支持点击上传、拖拽上传，包含文件类型和大小验证
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
    onImageAdd,
    onImagesAdd,
    disabled = false,
    maxSize = 15,
    maxCount = 6,
    currentCount = 0,
    multiple = true,
}) => {
    /**
     * 处理单个文件的验证和上传
     */
    const processFile = async (file: File): Promise<ImageItem | null> => {
        // 文件大小检查
        if (file.size > maxSize * 1024 * 1024) {
            message.error(`图片大小不能超过${maxSize}MB`)
            return null
        }

        // 文件类型检查
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            message.error('仅支持 JPG、PNG、GIF、WebP 格式的图片')
            return null
        }

        try {
            // 创建临时图片项，用于显示上传进度
            const tempImage: ImageItem = {
                id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                url: URL.createObjectURL(file), // 创建本地预览URL
                name: file.name,
                size: file.size,
                type: file.type,
                status: 'uploading',
            }

            // 真实上传到服务器
            const formData = new FormData()
            formData.append('file', file)

            const response = await Http.postFile('/ai/upload-image', formData)

            // 上传成功，更新图片状态
            const uploadedImage: ImageItem = {
                ...tempImage,
                url: response.data.url, // 使用服务器返回的URL
                status: 'uploaded',
            }

            return uploadedImage
        } catch (error) {
            console.error('图片上传失败:', error)
            return null
        }
    }

    /**
     * 处理文件上传前的验证和批量处理
     */
    const handleUpload = async (file: File, fileList: File[]) => {
        // 检查数量限制
        const totalCount = currentCount + fileList.length
        if (totalCount > maxCount) {
            message.error(`最多只能上传${maxCount}张图片，当前已有${currentCount}张`)
            return false
        }

        // 如果是多选模式且选择了多个文件
        if (multiple && fileList.length > 1) {
            const processedImages: ImageItem[] = []

            // 先显示所有上传中的图片
            for (const f of fileList) {
                const result = await processFile(f)
                if (result) {
                    // 先显示上传中状态
                    const uploadingImage = { ...result, status: 'uploading' as const }
                    onImageAdd(uploadingImage)
                    processedImages.push(result)
                }
            }

            // 批量回调（如果提供了批量回调函数）
            if (onImagesAdd && processedImages.length > 0) {
                onImagesAdd(processedImages)
            }

            // 逐个更新为上传成功状态
            for (const img of processedImages) {
                setTimeout(() => {
                    onImageAdd(img)
                }, 100)
            }

            if (processedImages.length > 0) {
                message.success(`成功上传${processedImages.length}张图片`)
            }
        } else {
            // 单文件处理
            const result = await processFile(file)
            if (result) {
                // 先显示上传中状态
                const uploadingImage = { ...result, status: 'uploading' as const }
                onImageAdd(uploadingImage)

                // 延迟更新为成功状态
                setTimeout(() => {
                    onImageAdd(result)
                    message.success('图片上传成功')
                }, 100)
            }
        }

        // 阻止默认上传行为
        return false
    }

    // 检查是否已达到最大数量
    const isMaxReached = currentCount >= maxCount
    const remainingCount = maxCount - currentCount

    return (
        <Upload
            beforeUpload={handleUpload}
            showUploadList={false} // 不显示默认的文件列表，我们用自定义预览
            disabled={disabled || isMaxReached}
            accept="image/*" // 只接受图片文件
            multiple={multiple} // 支持多选
        >
            <Button
                icon={<PictureOutlined />}
                disabled={disabled || isMaxReached}
                size="middle"
                type="default"
            >
                {isMaxReached
                    ? `已达上限(${maxCount}张)`
                    : multiple
                      ? `上传图片(还可选${remainingCount}张)`
                      : '上传图片'}
            </Button>
        </Upload>
    )
}

export default ImageUpload
