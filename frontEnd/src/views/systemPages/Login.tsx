import style from '@/styles/login.module.scss'
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    LockOutlined,
    MailOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Tabs, message } from 'antd'
import React, { useState } from 'react'
// import useStores from "@/hooks/useStores.ts";
import { LoginApi } from '@/api'
import logoImage from '@/assets/images/k.jpg'
import backgroundImage from '@/assets/images/login.png'
import { useGlobalStoreAction } from '@/store'
import { BrowserLocalStorage, getRandomNumber } from '@/utils'
import { useNavigate } from 'react-router-dom'

type FieldType = {
    name?: string
    password?: string
    email?: string
    remember?: boolean
    admin?: boolean
}

const Login: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const { setUserInfo } = useGlobalStoreAction()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const onFinish = async (params: FieldType) => {
        setLoading(true)
        try {
            const { data } = await LoginApi.login({
                ...params,
            })

            if (data) {
                data.token = 'Bearer ' + data.token
                setUserInfo(data)
                BrowserLocalStorage.set('userInfo', data)
                messageApi.success('登录成功')
                navigate('/')
                reset()
            }
        } catch (error) {
            messageApi.error('登录失败，请检查用户名和密码')
        } finally {
            setLoading(false)
        }
    }
    const onFinishRegistry = async (params: FieldType) => {
        setLoading(true)
        try {
            const temp = {
                name: params.name,
                password: params.password,
                email: params.email,
                random: getRandomNumber(1, 1000),
                admin: true,
            }
            await LoginApi.register(temp)
            messageApi.success('注册成功')
            reset()
        } catch (error) {
            messageApi.error('注册失败，请稍后重试')
        } finally {
            setLoading(false)
        }
    }

    const [form] = Form.useForm()
    const reset = () => {
        form.resetFields()
    }
    const loginForm = (
        <div className={style.formContainer}>
            <div className={style.formHeader}>
                <img src={logoImage} alt="K爷的空间" className={style.formLogo} />
            </div>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                clearOnDestroy
                form={form}
                className={style.loginForm}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                    className={style.formItem}
                >
                    <div className={style.inputWrapper}>
                        <UserOutlined className={style.inputIcon} />
                        <Input
                            size="large"
                            placeholder="请输入用户名或邮箱"
                            className={style.customInput}
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                    className={style.formItem}
                >
                    <div className={style.inputWrapper}>
                        <LockOutlined className={style.inputIcon} />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="请输入密码"
                            size="large"
                            className={style.customInput}
                        />
                        <Button
                            type="text"
                            icon={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            onClick={() => setShowPassword(!showPassword)}
                            className={style.togglePassword}
                        />
                    </div>
                </Form.Item>
                <div className={style.rememberMe}>
                    <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <a href="#" className={style.forgotPassword}>
                        忘记密码?
                    </a>
                </div>
                <Form.Item className={style.submitButton}>
                    <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className={style.loginButton}
                        block
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

    const registerForm = (
        <div className={style.formContainer}>
            <div className={style.formHeader}>
                <img src={logoImage} alt="K爷的空间" className={style.formLogo} />
            </div>
            <Form
                name="register"
                onFinish={onFinishRegistry}
                autoComplete="off"
                clearOnDestroy
                form={form}
                className={style.loginForm}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                    className={style.formItem}
                >
                    <div className={style.inputWrapper}>
                        <UserOutlined className={style.inputIcon} />
                        <Input
                            size="large"
                            placeholder="请输入用户名"
                            className={style.customInput}
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: '请输入邮箱!' },
                        { type: 'email', message: '请输入有效的邮箱地址!' },
                    ]}
                    className={style.formItem}
                >
                    <div className={style.inputWrapper}>
                        <MailOutlined className={style.inputIcon} />
                        <Input
                            size="large"
                            placeholder="请输入邮箱"
                            className={style.customInput}
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码!' },
                        { min: 6, message: '密码长度至少为6位!' },
                    ]}
                    className={style.formItem}
                >
                    <div className={style.inputWrapper}>
                        <LockOutlined className={style.inputIcon} />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="请输入密码"
                            size="large"
                            className={style.customInput}
                        />
                        <Button
                            type="text"
                            icon={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            onClick={() => setShowPassword(!showPassword)}
                            className={style.togglePassword}
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '请确认密码!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
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
                        <Input
                            type="password"
                            placeholder="请确认密码"
                            size="large"
                            className={style.customInput}
                        />
                    </div>
                </Form.Item>
                <Form.Item className={style.submitButton}>
                    <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className={style.loginButton}
                        block
                    >
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

    return (
        <div className={style.loginContainer}>
            {contextHolder}
            <div className={style.backgroundSection}>
                <img src={backgroundImage} alt="" className={style.backgroundImage} />
                <div className={style.backgroundOverlay}></div>
                <div className={style.brandSection}>
                    <h1 className={style.brandTitle}>KeruのBlog</h1>
                    <p className={style.brandSubtitle}>探索技术的无限可能</p>
                </div>
            </div>
            <div className={style.formSection}>
                <div className={style.loginCard}>
                    <Tabs
                        defaultActiveKey="login"
                        destroyInactiveTabPane={true}
                        className={style.customTabs}
                        items={[
                            {
                                label: '登录',
                                key: 'login',
                                children: loginForm,
                            },
                            {
                                label: '注册',
                                key: 'register',
                                children: registerForm,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
