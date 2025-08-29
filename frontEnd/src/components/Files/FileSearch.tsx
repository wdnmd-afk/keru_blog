import type { FileSearchProps } from '@/types/files'
import { Button, Col, Form, Input, Row } from 'antd'
import React, { useCallback, useEffect, useRef } from 'react'

/**
 * 搜索表单值类型
 */
interface SearchFormValues {
    fileName?: string
    userName?: string
}

/**
 * 文件搜索组件
 * 提供文件名和上传者的搜索功能，支持防抖搜索
 */
const FileSearch: React.FC<FileSearchProps> = ({
    value,
    onSearch,
    onReset,
    loading = false
}) => {
    const [form] = Form.useForm()
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
    
    // 防抖延迟时间（毫秒）
    const DEBOUNCE_DELAY = 500

    /**
     * 防抖搜索函数
     * @param searchParams 搜索参数
     */
    const debouncedSearch = useCallback((searchParams: SearchFormValues) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }
        
        debounceTimerRef.current = setTimeout(() => {
            const searchQuery = {
                ...value,
                fileName: searchParams.fileName?.trim() || '',
                userName: searchParams.userName?.trim() || '',
                page: 1, // 搜索时重置到第一页
            }
            onSearch(searchQuery)
        }, DEBOUNCE_DELAY)
    }, [value, onSearch])
    
    /**
     * 处理输入框变化（实时防抖搜索）
     * @param changedValues 变化的值
     * @param allValues 所有值
     */
    const handleValuesChange = useCallback((changedValues: Partial<SearchFormValues>, allValues: SearchFormValues) => {
        // 只有当输入框的值发生变化时才触发防抖搜索
        if (changedValues.fileName !== undefined || changedValues.userName !== undefined) {
            debouncedSearch(allValues)
        }
    }, [debouncedSearch])

    /**
     * 处理搜索提交
     * @param values 表单值
     */
    const handleSearch = (values: SearchFormValues) => {
        // 清除防抖定时器，立即执行搜索
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
            debounceTimerRef.current = null
        }
        
        const searchQuery = {
            ...value,
            fileName: values.fileName?.trim() || '',
            userName: values.userName?.trim() || '',
            page: 1, // 搜索时重置到第一页
        }
        onSearch(searchQuery)
    }

    /**
     * 处理重置
     */
    const handleReset = () => {
        // 清除防抖定时器
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
            debounceTimerRef.current = null
        }
        
        form.resetFields()
        const resetQuery = {
            ...value,
            fileName: '',
            userName: '',
            page: 1,
        }
        onSearch(resetQuery)
        onReset?.()
    }

    /**
     * 处理回车搜索
     */
    const handleEnterSearch = () => {
        form.submit()
    }

    // 组件卸载时清理定时器
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    return (
        <div className="file-search mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSearch}
                onValuesChange={handleValuesChange}
                initialValues={{
                    fileName: value.fileName,
                    userName: value.userName,
                }}
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            label="文件名称"
                            name="fileName"
                            className="mb-2"
                        >
                            <Input
                                placeholder="请输入文件名称"
                                allowClear
                                onPressEnter={handleEnterSearch}
                                disabled={loading}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="上传者"
                            name="userName"
                            className="mb-2"
                        >
                            <Input
                                placeholder="请输入上传者名称"
                                allowClear
                                onPressEnter={handleEnterSearch}
                                disabled={loading}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label=" " className="mb-2">
                            <div className="flex gap-2">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="flex-1"
                                >
                                    搜索
                                </Button>
                                <Button
                                    onClick={handleReset}
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    重置
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default FileSearch