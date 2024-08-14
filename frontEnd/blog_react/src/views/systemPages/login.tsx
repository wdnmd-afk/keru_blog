import React from "react";
// import { Http } from "@/utils";
import style from "@/styles/login.module.scss";
import { Button, Form, Input, Checkbox } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const Login: React.FC = () => {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <div className={style.login_container}>
      <div className={style.login_top}></div>
      <div className={style.login_box}>
        <div w-600>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, width: 600, color: "white" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={style.login_bottom}></div>
    </div>
  );
};

export default Login;
