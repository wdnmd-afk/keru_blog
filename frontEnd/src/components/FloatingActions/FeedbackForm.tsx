/**
 * 反馈表单组件
 *
 * 功能说明：
 * 1. 提供用户反馈和bug报告功能
 * 2. 支持多种反馈类型分类
 * 3. 自动收集系统信息
 * 4. 表单验证和提交处理
 * 5. 响应式设计和无障碍访问支持
 */

import { FeedbackData, FeedbackType } from '@/types/floatingActions'
import {
    BugOutlined,
    CloseOutlined,
    CommentOutlined,
    BulbOutlined,
    MailOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons'
import {
    Button,
    Card,
    Form,
    Input,
    Radio,
    Space,
    Typography,
    message
} from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FeedbackForm.module.scss'

const { Text, Title } = Typography
const { TextArea } = Input

/**
 * 反馈表单Props接口
 */
interface FeedbackFormProps {
    /** 是否显示 */
    visible: boolean
    /** 关闭回调 */
    onClose: () => void
    /** 提交回调 */
    onSubmit: (feedback: FeedbackData) => Promise<void>
}

/**
 * 反馈表单组件
 */
const FeedbackForm: React.FC<FeedbackFormProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const { t } = useTranslation('floatingActions')
    const [form] = Form.useForm()
    const [submitting, setSubmitting] = useState(false)

    // 反馈类型选项
    const feedbackTypes = [
        {
            value: FeedbackType.SUGGESTION,
            label: t('feedback.type.suggestion', '功能建议'),
            icon: <BulbOutlined />,
            description: t('feedback.type.suggestion_desc', '建议新功能或改进'),
        },
        {
            value: FeedbackType.BUG_REPORT,
            label: t('feedback.type.bug_report', 'Bug报告'),
            icon: <BugOutlined />,
            description: t('feedback.type.bug_report_desc', '报告系统错误或异常'),
        },
        {
            value: FeedbackType.CONTENT_FEEDBACK,
            label: t('feedback.type.content_feedback', '内容反馈'),
            icon: <CommentOutlined />,
            description: t('feedback.type.content_feedback_desc', '对内容的意见或建议'),
        },
        {
            value: FeedbackType.OTHER,
            label: t('feedback.type.other', '其他'),
            icon: <QuestionCircleOutlined />,
            description: t('feedback.type.other_desc', '其他类型的反馈'),
        },
    ]

    // 获取系统信息
    const getSystemInfo = () => {
        return {
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            pageUrl: window.location.href,
            timestamp: new Date(),
        }
    }

    // 处理表单提交
    const handleSubmit = async (values: any) => {
        setSubmitting(true)

        try {
            const systemInfo = getSystemInfo()
            const feedbackData: FeedbackData = {
                type: values.type,
                title: values.title,
                content: values.content,
                email: values.email,
                pageUrl: systemInfo.pageUrl,
                userAgent: systemInfo.userAgent,
                screenResolution: systemInfo.screenResolution,
                timestamp: systemInfo.timestamp,
            }

            await onSubmit(feedbackData)
            form.resetFields()
            onClose()
        } catch (error) {
            console.error('提交反馈失败:', error)
        } finally {
            setSubmitting(false)
        }
    }

    // 处理表单重置
    const handleReset = () => {
        form.resetFields()
    }

    if (!visible) {
        return null
    }

    return (
        <div className={styles.feedback_form_overlay} onClick={onClose}>
            <Card
                className={styles.feedback_form}
                onClick={(e) => e.stopPropagation()}
                title={
                    <div className={styles.panel_header}>
                        <Title level={4} className={styles.panel_title}>
                            {t('feedback.title', '意见反馈')}
                        </Title>
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={onClose}
                            className={styles.close_button}
                            aria-label={t('common.close', '关闭')}
                        />
                    </div>
                }
                bordered={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className={styles.form}
                    initialValues={{
                        type: FeedbackType.SUGGESTION,
                    }}
                >
                    {/* 反馈类型 */}
                    <Form.Item
                        name="type"
                        label={
                            <Text strong className={styles.form_label}>
                                {t('feedback.type.label', '反馈类型')}
                            </Text>
                        }
                        rules={[
                            { required: true, message: t('feedback.type.required', '请选择反馈类型') }
                        ]}
                    >
                        <Radio.Group>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                {feedbackTypes.map(type => (
                                    <Radio key={type.value} value={type.value}>
                                        <Space>
                                            {type.icon}
                                            <div>
                                                <div>{type.label}</div>
                                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                                    {type.description}
                                                </Text>
                                            </div>
                                        </Space>
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    </Form.Item>

                    {/* 反馈标题 */}
                    <Form.Item
                        name="title"
                        label={
                            <Text strong className={styles.form_label}>
                                {t('feedback.title_label', '反馈标题')}
                            </Text>
                        }
                        rules={[
                            { required: true, message: t('feedback.title.required', '请输入反馈标题') },
                            { max: 100, message: t('feedback.title.max_length', '标题不能超过100个字符') }
                        ]}
                    >
                        <Input
                            placeholder={t('feedback.title.placeholder', '请简要描述您的反馈...')}
                            className={styles.form_input}
                        />
                    </Form.Item>

                    {/* 反馈内容 */}
                    <Form.Item
                        name="content"
                        label={
                            <Text strong className={styles.form_label}>
                                {t('feedback.content_label', '详细描述')}
                            </Text>
                        }
                        rules={[
                            { required: true, message: t('feedback.content.required', '请输入详细描述') },
                            { min: 10, message: t('feedback.content.min_length', '描述至少需要10个字符') },
                            { max: 1000, message: t('feedback.content.max_length', '描述不能超过1000个字符') }
                        ]}
                    >
                        <TextArea
                            rows={6}
                            placeholder={t('feedback.content.placeholder', '请详细描述您遇到的问题或建议...')}
                            className={styles.form_textarea}
                            showCount
                            maxLength={1000}
                        />
                    </Form.Item>

                    {/* 联系邮箱 */}
                    <Form.Item
                        name="email"
                        label={
                            <Text strong className={styles.form_label}>
                                {t('feedback.email_label', '联系邮箱')}
                                <Text type="secondary" className={styles.form_label_optional}>
                                    {t('feedback.email.optional', '（可选）')}
                                </Text>
                            </Text>
                        }
                        rules={[
                            { type: 'email', message: t('feedback.email.invalid', '请输入有效的邮箱地址') }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder={t('feedback.email.placeholder', '如需回复，请留下您的邮箱')}
                            className={styles.form_input}
                        />
                    </Form.Item>

                    {/* 系统信息提示 */}
                    <div className={styles.system_info_notice}>
                        <Text type="secondary" className={styles.notice_text}>
                            {t('feedback.system_info_notice', '为了更好地处理您的反馈，我们会自动收集页面URL、浏览器信息等技术数据。')}
                        </Text>
                    </div>

                    {/* 操作按钮 */}
                    <Form.Item className={styles.form_actions}>
                        <Space>
                            <Button onClick={handleReset}>
                                {t('feedback.reset', '重置')}
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={submitting}
                                className={styles.submit_button}
                            >
                                {submitting
                                    ? t('feedback.submitting', '提交中...')
                                    : t('feedback.submit', '提交反馈')
                                }
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default FeedbackForm
