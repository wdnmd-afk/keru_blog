import React from "react";
import style from "@/styles/login.module.scss";
import { Button, Form, Input, Checkbox, Tabs, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import useStores from "@/hooks/useStores.ts";
import { LoginApi } from "@/api";
import { BrowserLocalStorage, getRandomNumber } from "@/utils";
import backgroundImage from "@/assets/images/login.png";
type FieldType = {
  name?: string;
  password?: string;
  email?: string;
  remember?: boolean;
  admin?: boolean;
};

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (params: FieldType) => {
    const { data } = await LoginApi.login({
      ...params,
    });
    if (data) {
      data.token = "Bearer " + data.token;
      GlobalStore.setUserInfo(data);
      BrowserLocalStorage.set("userInfo", data);
      messageApi.success("登录成功");
      reset();
    }
  };
  const onFinishRegistry = async (params: FieldType) => {
    const temp = {
      name: params.name,
      password: params.password,
      email: params.email,
      random: getRandomNumber(1, 1000),
      admin: true,
    };

    await LoginApi.register(temp);
    messageApi.success("注册成功");
    reset();
  };
  const { GlobalStore } = useStores();
  const [form] = Form.useForm();
  const reset = () => {
    form.resetFields();
  };
  const loginForm = (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ width: 400, marginTop: 20 }}
      autoComplete="off"
      clearOnDestroy
      form={form}
    >
      <Form.Item
        name="name"
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
      clearOnDestroy
      form={form}
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
      {contextHolder}
      <img src={backgroundImage} alt="" className="w-full h-full" />
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
