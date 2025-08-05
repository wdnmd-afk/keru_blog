<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>欢迎回来</h1>
        <p>请登录您的账户继续</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <div class="input-wrapper">
            <User class="input-icon" size="18" />
            <input 
              id="username" 
              v-model="form.username" 
              type="text" 
              placeholder="请输入用户名或邮箱"
              :class="{ 'error': errors.username }"
            />
          </div>
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>
        
        <div class="form-group">
          <div class="password-header">
            <label for="password">密码</label>
            <a href="#" class="forgot-password">忘记密码?</a>
          </div>
          <div class="input-wrapper">
            <Lock class="input-icon" size="18" />
            <input 
              id="password" 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入密码"
              :class="{ 'error': errors.password }"
            />
            <button 
              type="button" 
              class="toggle-password" 
              @click="showPassword = !showPassword"
            >
              <Eye v-if="!showPassword" size="18" />
              <EyeOff v-else size="18" />
            </button>
          </div>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        
        <div class="form-group remember-me">
          <label class="checkbox-container">
            <input type="checkbox" v-model="form.rememberMe" />
            <span class="checkmark"></span>
            记住我
          </label>
        </div>
        
        <button 
          type="submit" 
          class="login-button" 
          :disabled="isLoading"
        >
          <Loader2 v-if="isLoading" class="spinner" size="18" />
          <span v-else>登录</span>
        </button>
      </form>
      
      <div class="login-footer">
        <p>还没有账户? <a href="#" @click.prevent="goToRegister">立即注册</a></p>
        
        <div class="social-login">
          <p>或通过以下方式登录</p>
          <div class="social-icons">
            <button class="social-icon wechat">
              <MessageSquare size="18" />
            </button>
            <button class="social-icon weibo">
              <AtSign size="18" />
            </button>
            <button class="social-icon github">
              <Github size="18" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="login-image">
      <div class="image-overlay"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { User, Lock, Eye, EyeOff, Loader2, MessageSquare, AtSign, Github } from 'lucide-vue-next'

// 表单数据
const form = reactive({
  username: '',
  password: '',
  rememberMe: false
})

// 错误状态
const errors = reactive({
  username: '',
  password: ''
})

// UI 状态
const showPassword = ref(false)
const isLoading = ref(false)

// 表单验证
const validateForm = () => {
  let isValid = true
  
  // 重置错误
  errors.username = ''
  errors.password = ''
  
  if (!form.username.trim()) {
    errors.username = '请输入用户名或邮箱'
    isValid = false
  }
  
  if (!form.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = '密码长度至少为6位'
    isValid = false
  }
  
  return isValid
}

// 登录处理
const handleLogin = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('登录成功', form)
    // 这里可以添加实际的登录逻辑，例如使用 Supabase 或其他认证服务
    
  } catch (error) {
    console.error('登录失败', error)
  } finally {
    isLoading.value = false
  }
}

// 跳转到注册页面
const goToRegister = () => {
  console.log('跳转到注册页面')
  // 实际应用中可以使用路由导航
  // router.push('/register')
}
</script>

<style>
:root {
  --primary: #ff7d00;
  --primary-hover: #ff9a3c;
  --text-primary: #333;
  --text-secondary: #666;
  --text-light: #888;
  --background: #fff;
  --error: #e74c3c;
  --border: #e1e1e1;
  --border-focus: #ccc;
  --shadow: rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-primary);
  line-height: 1.6;
}

.login-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--background);
}

.login-card {
  flex: 1;
  max-width: 500px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-image {
  flex: 1;
  background-image: url('/placeholder.svg?height=1080&width=1080');
  background-size: cover;
  background-position: center;
  position: relative;
  display: none;
}

@media (min-width: 1024px) {
  .login-image {
    display: block;
  }
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.3), rgba(255, 154, 60, 0.1));
}

.login-header {
  margin-bottom: 2rem;
  text-align: center;
}

.login-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.login-header p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-light);
}

input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 2px rgba(255, 125, 0, 0.1);
}

input.error {
  border-color: var(--error);
}

.error-message {
  color: var(--error);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.forgot-password {
  font-size: 0.8rem;
  color: var(--primary);
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remember-me {
  display: flex;
  align-items: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 18px;
  width: 18px;
  background-color: #fff;
  border: 1px solid var(--border);
  border-radius: 3px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary);
  border-color: var(--primary);
}

.checkbox-container input:checked ~ .checkmark:after {
  content: "";
  display: block;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-bottom: 2px;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-button:hover {
  background-color: var(--primary-hover);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.login-footer {
  text-align: center;
}

.login-footer p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.login-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.login-footer a:hover {
  text-decoration: underline;
}

.social-login p {
  color: var(--text-light);
  font-size: 0.85rem;
  margin-bottom: 1rem;
  position: relative;
}

.social-login p::before,
.social-login p::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 25%;
  height: 1px;
  background-color: var(--border);
}

.social-login p::before {
  left: 0;
}

.social-login p::after {
  right: 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  background-color: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
}

.social-icon.wechat:hover {
  color: #07C160;
  border-color: #07C160;
}

.social-icon.weibo:hover {
  color: #E6162D;
  border-color: #E6162D;
}

.social-icon.github:hover {
  color: #333;
  border-color: #333;
}
</style>