import React from "react";
import style from "@/styles/login.module.scss";
import { Button, Form, Input, Checkbox, Tabs } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, selectUser } from "@/store";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);

  const onFinish = (data: FieldType) => {
    dispatch(setUserInfo(data));
    setTimeout(() => {
      console.log("User Info:", userInfo);
    }, 100);
  };

  const loginForm = (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );

  const registerForm = (
    <Form name="register" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className={style.login_container}>
      <img
        src="/src/assets/images/login.png"
        alt=""
        className="w-full h-full"
      />
      <div className={style.outsideBox}>
        <div className={style.login_top}>K爷的空间</div>
        <div className={style.login_box}>
          <Tabs defaultActiveKey="login">
            <Tabs.TabPane tab="登录" key="login">
              {loginForm}
            </Tabs.TabPane>
            <Tabs.TabPane tab="注册" key="register">
              {registerForm}
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div className={style.login_bottom}></div>
      </div>
    </div>
  );
};

export default Login;
