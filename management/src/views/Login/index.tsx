import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Checkbox,
  Divider,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BrowserLocalStorage, ManagementMessage } from "@/utils";
import { AuthApi, type LoginRequest } from "@/api";
import { AnimatedBackground } from "@/components";
import { useManagementStore } from "@/store";

const { Title, Text, Paragraph } = Typography;

// 登录表单数据类型 - 与 frontEnd 保持一致
interface LoginFormData {
  name: string;
  password: string;
  remember: boolean;
}

const ManagementLogin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true); // 首屏校验中，展示全屏加载
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { actions } = useManagementStore();

  // 解析并校验 JWT 是否有效（带 Bearer 前缀）
  const isJwtValid = useCallback((bearerToken?: string): boolean => {
    if (!bearerToken || typeof bearerToken !== "string") return false;
    try {
      const token = bearerToken.replace(/^Bearer\s+/i, "");
      const parts = token.split(".");
      if (parts.length !== 3) return false;
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      if (payload && typeof payload.exp === "number") {
        const now = Math.floor(Date.now() / 1000);
        // 预留 30s 时间偏移
        return now < payload.exp - 30;
      }
      // 无 exp 视作有效
      return true;
    } catch {
      return false;
    }
  }, []);

  const checkedRef = useRef(false);

  // 组件加载时检查是否已登录 - 与 frontEnd 保持一致
  useEffect(() => {
    if (checkedRef.current) return; // 避免重复执行导致的闪烁
    checkedRef.current = true;
    console.log("[Login] 组件加载，检查登录状态");
    const userInfo = BrowserLocalStorage.get("userInfo");
    console.log("[Login] 本地存储的用户信息:", userInfo);

    if (userInfo && userInfo.token) {
      if (isJwtValid(userInfo.token)) {
        console.log("[Login] 用户已登录，跳转到 dashboard");
        // 使用硬跳转避免路由上下文不一致导致的页面仍留在登录页
        window.location.replace("/dashboard");
        return;
      } else {
        console.warn("[Login] 本地 token 已失效，清理并留在登录页");
        BrowserLocalStorage.remove("userInfo");
      }
    }

    // 检查是否有保存的登录信息 - 与 frontEnd 保持一致
    const savedLoginInfo = BrowserLocalStorage.get("savedLoginInfo");
    console.log("[Login] 保存的登录信息:", savedLoginInfo);

    if (savedLoginInfo && savedLoginInfo.remember) {
      console.log("[Login] 恢复保存的登录信息");
      form.setFieldsValue({
        name: savedLoginInfo.name,
        password: savedLoginInfo.password,
        remember: true,
      });
    }
    setChecking(false);
  }, [navigate, form, isJwtValid]);

  // 处理登录提交
  const handleLogin = async (values: LoginFormData) => {
    setLoading(true);

    try {
      // 调用真实的登录 API - 与 frontEnd 保持一致
      const loginRequest: LoginRequest = {
        name: values.name,
        password: values.password,
        remember: values.remember,
      };

      const response = await AuthApi.login(loginRequest);

      // 处理响应数据 - 与 frontEnd 保持一致
      if (response) {
        // 添加 Bearer 前缀，与 frontEnd 保持一致
        response.token = "Bearer " + response.token;

        console.log("[Login] 登录成功，用户信息:", response);

        // 先保存用户信息到本地存储 - 与 frontEnd 保持一致
        BrowserLocalStorage.set("userInfo", response);
        console.log("[Login] 用户信息已保存到本地存储");

        // 更新 Zustand 状态
        actions.setUser(response);
        console.log("[Login] Zustand 状态已更新");

        // 处理记住密码 - 与 frontEnd 保持一致
        if (values.remember) {
          const loginInfo = {
            name: values.name,
            password: values.password,
            remember: true,
          };
          BrowserLocalStorage.set("savedLoginInfo", loginInfo);
        } else {
          BrowserLocalStorage.remove("savedLoginInfo");
        }

        // 显示成功消息
        ManagementMessage.success("登录成功！");

        // 确保状态更新完成后再跳转，避免状态竞争导致的闪烁
        console.log("[Login] 准备跳转到 dashboard");
        setTimeout(() => {
          console.log("[Login] 执行页面跳转");
          window.location.replace("/dashboard");
        }, 100); // 短暂延迟确保状态更新完成
      }
    } catch (error: any) {
      console.error("登录失败:", error);
      ManagementMessage.error(error.message || "登录失败，请检查用户名和密码");
    } finally {
      setLoading(false);
    }
  };

  // 处理忘记密码
  const handleForgotPassword = () => {
    ManagementMessage.info("请联系系统管理员重置密码");
  };

  // 切换密码显示状态
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      {(checking || loading) && (
        <div style={{position:'fixed',inset:0,background:'rgba(255,255,255,0.65)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
            <LoadingOutlined style={{fontSize:32,color:'#8785a2'}} />
            <span style={{color:'#6b6b83'}}>处理中，请稍候…</span>
          </div>
        </div>
      )}
      {/* 动画背景 */}
      <AnimatedBackground />

      {/* 登录内容 */}
      <div className="relative z-10 w-full max-w-md">
        {/* 登录卡片 */}
        <Card
          className="shadow-2xl border-0 backdrop-blur-md"
          style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 50px -12px rgba(44, 44, 44, 0.15)",
            border: "1px solid rgba(135, 133, 162, 0.1)",
          }}
        >
          {/* 头部 */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #8785a2 0%, #5a5a6b 100%)",
                boxShadow: "0 8px 25px rgba(135, 133, 162, 0.4)",
                border: "3px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <SafetyCertificateOutlined className="text-white text-3xl" />
            </div>
            <Title
              level={2}
              className="mb-2"
              style={{
                color: "#8785a2",
                fontWeight: 600,
                textShadow: "0 2px 4px rgba(135, 133, 162, 0.1)",
              }}
            >
              管理系统
            </Title>
            <Text className="text-base" style={{ color: "#6b6b83" }}>
              博客管理系统后台
            </Text>
          </div>

          {/* 登录表单 */}
          <Form
            form={form}
            name="managementLogin"
            onFinish={handleLogin}
            autoComplete="off"
            size="large"
            initialValues={{ remember: false }}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "请输入用户名" },
                { min: 3, message: "用户名至少3个字符" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="请输入用户名"
                className="rounded-lg h-12 focus:border-purple-400"
                style={{
                  height: "48px",
                  fontSize: "16px",
                  borderRadius: "12px",
                  border: "1px solid #d9d9d9",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#8785a2";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(135, 133, 162, 0.1)";
                  e.target.style.backgroundColor = "#ffffff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d9d9d9";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码" },
                { min: 6, message: "密码至少6个字符" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="text-gray-400" />}
                type={showPassword ? "text" : "password"}
                placeholder="请输入密码"
                className="rounded-lg h-12 focus:border-purple-400"
                style={{
                  height: "48px",
                  fontSize: "16px",
                  borderRadius: "12px",
                  border: "1px solid #d9d9d9",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#8785a2";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(135, 133, 162, 0.1)";
                  e.target.style.backgroundColor = "#ffffff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d9d9d9";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                }}
                suffix={
                  <Button
                    type="text"
                    icon={
                      showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />
                    }
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#8785a2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#9ca3af";
                    }}
                  />
                }
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center mb-2">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-600">记住密码</Checkbox>
                </Form.Item>
                <Button
                  type="link"
                  className="p-0 transition-colors"
                  onClick={handleForgotPassword}
                  style={{
                    color: "#8785a2",
                    padding: 0,
                    height: "auto",
                    lineHeight: "normal",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#6b6b83";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8785a2";
                  }}
                >
                  忘记密码？
                </Button>
              </div>
            </Form.Item>

            <Form.Item className="mb-0 text-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 mx-auto"
                style={{
                  background: loading
                    ? "linear-gradient(135deg, #a8a6b8 0%, #8785a2 100%)"
                    : "linear-gradient(135deg, #8785a2 0%, #5a5a6b 100%)",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: loading
                    ? "0 4px 12px rgba(135, 133, 162, 0.3)"
                    : "0 6px 20px rgba(135, 133, 162, 0.5)",
                  height: "48px",
                  width: "100%",
                  display: "block",
                  margin: "0 auto",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                icon={loading ? <LoadingOutlined /> : null}
              >
                {loading ? "登录中..." : "立即登录"}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-6">
            <Text type="secondary" className="text-sm">
              系统信息
            </Text>
          </Divider>

          {/* 系统信息 */}
          <div className="text-center space-y-3">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: "#f5f5f5",
                border: "1px solid #d9d9d9",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Text className="text-sm" style={{ color: "#6b6b83" }}>
                <strong style={{ color: "#8785a2" }}>提示：</strong>{" "}
                请使用您的管理员账号登录系统
              </Text>
            </div>
            <Space
              split={<Divider type="vertical" />}
              className="text-xs text-gray-400"
            >
              <span>版本 v1.0.0</span>
              <span>React 18</span>
              <span>Ant Design 5</span>
            </Space>
          </div>
        </Card>

        {/* 底部版权信息 */}
        <div className="text-center mt-8">
          <Text type="secondary" className="text-sm opacity-75">
            © 2024 博客管理系统. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ManagementLogin;
