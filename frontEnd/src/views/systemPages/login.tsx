import React from "react";
import style from "@/styles/login.module.scss";
import { Button, Form, Input, Checkbox, Tabs } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import useStores from "@/hooks/useStores.ts";
import { LoginApi } from "@/api";
import { getRandomNumber } from "@/utils";

type FieldType = {
  name?: string;
  password?: string;
  email?: string;
  remember?: boolean;
  admin?: boolean;
};

const Login: React.FC = () => {
  const onFinish = (data: FieldType) => {
    console.log(GlobalStore.user, "ss");
    GlobalStore.setUserInfo({ name: "12423532" });
    console.log(GlobalStore.user, "ss");
  };
  const onFinishRegistry = async (params: FieldType) => {
    const temp = {
      name: params.name,
      password: params.password,
      email: params.email,
      random: getRandomNumber(1, 1000),
      admin: true,
    };

    const res = await LoginApi.register(temp);
    console.log(res, "ress");
  };
  const { GlobalStore } = useStores();
  const loginForm = (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ width: 400, marginTop: 20 }}
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
        <Checkbox className={"color-[#fff]"}>记住密码</Checkbox>
      </Form.Item>
      <Form.Item>
        <div flex justify-center>
          <Button size="large" type="primary" htmlType="submit" w-50>
            登录
          </Button>
        </div>
      </Form.Item>
    </Form>
  );

  const registerForm = (
    <Form
      name="register"
      style={{ width: 400, marginTop: 20 }}
      onFinish={onFinishRegistry}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
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
        <div flex justify-center>
          <Button size="large" type="primary" htmlType="submit" w-50>
            注册
          </Button>
        </div>
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
        <div className={style.login_top}>K爷的空间{GlobalStore.user.name}</div>
        <div className={style.login_box}>
          <Tabs
            defaultActiveKey="login"
            items={[
              {
                label: "登录",
                key: "login",
                children: loginForm,
              },
              {
                label: "注册",
                key: "register",
                children: registerForm,
              },
            ]}
          />
        </div>
        <div className={style.login_bottom}></div>
      </div>
    </div>
  );
};

export default Login;
