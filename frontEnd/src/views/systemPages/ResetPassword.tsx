import { LoginApi } from '@/api'
import style from '@/styles/login.module.scss'
import { ArrowLeftOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'

type ResetPasswordProps = {
    onBack: () => void
}

type ResetFormType = {
    name?: string
    email?: string
    newPassword?: string
    confirmPassword?: string
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onBack }) => {
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    // 重置密码
    const resetPassword = async (values: ResetFormType) => {
        try {
            setLoading(true)
            await LoginApi.resetPassword({
                name: values.name!,
                email: values.email!,
                newPassword: values.newPassword!,
            })

            messageApi.success('密码重置成功，请使用新密码登录')
            setTimeout(() => {
                onBack()
            }, 1500)
        } catch (error) {
            messageApi.error('用户名或邮箱不匹配，请检查后重试')
        } finally {
            setLoading(false)
        }
    }

    const onFinish = async (values: ResetFormType) => {
        await resetPassword(values)
    }

    const formFields = (
        <>
            <Form.Item
                name="name"
                rules={[{ required: true, message: '请输入用户名!' }]}
                className={style.formItem}
            >
                <div className={style.inputWrapper}>
                    <UserOutlined className={style.inputIcon} />
                    <Input size="large" placeholder="请输入用户名" className={style.customInput} />
                </div>
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: '请输入邮箱地址!' },
                    { type: 'email', message: '请输入有效的邮箱地址!' },
                ]}
                className={style.formItem}
            >
                <div className={style.inputWrapper}>
                    <MailOutlined className={style.inputIcon} />
                    <Input
                        size="large"
                        placeholder="请输入邮箱地址"
                        className={style.customInput}
                    />
                </div>
            </Form.Item>

            <Form.Item
                name="newPassword"
                rules={[
                    { required: true, message: '请输入新密码!' },
                    { min: 6, message: '密码长度至少为6位!' },
                ]}
                className={style.formItem}
            >
                <div className={style.inputWrapper}>
                    <LockOutlined className={style.inputIcon} />
                    <Input.Password
                        size="large"
                        placeholder="请输入新密码"
                        className={style.customInput}
                    />
                </div>
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                    { required: true, message: '请确认新密码!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('两次输入的密码不一致!'))
                        },
                    }),
                ]}
                className={style.formItem}
            >
                <div className={style.inputWrapper}>
                    <LockOutlined className={style.inputIcon} />
                    <Input.Password
                        size="large"
                        placeholder="请确认新密码"
                        className={style.customInput}
                    />
                </div>
            </Form.Item>
        </>
    )

    return (
        <div className={style.formContainer}>
            {contextHolder}
            <div className={style.resetPasswordHeader}>
                <h3 className={style.resetTitle}>重置密码</h3>
            </div>

            <Form
                name="resetPassword"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
                className={style.loginForm}
            >
                {formFields}

                <Form.Item className={style.submitButton}>
                   <div className={'f-ic'}>
                     <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={onBack}
                        className={`${style.loginButton} flex-1 mr-3 bg-[#141A2A]`}
                    >
                        返回登录
                    </Button>
                    <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className={`${style.loginButton} flex-1`}
                        block
                    >
                        重置密码
                    </Button>
                   </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ResetPassword
