import type { FileSearchProps } from '@/types/files'
import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'

/**
 * 文件搜索组件
 * 提供文件名和上传者的搜索功能
 */
const FileSearch: React.FC<FileSearchProps> = ({
    value,
    onSearch,
    onReset,
    loading = false
}) => {
    const [form] = Form.useForm()

    /**
     * 处理搜索提交
     * @param values 表单值
     */
    const handleSearch = (values: any) => {
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

    return (
        <div className="file-search mb-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSearch}
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