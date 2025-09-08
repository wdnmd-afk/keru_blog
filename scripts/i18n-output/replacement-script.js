#!/usr/bin/env node

/**
 * 自动生成的国际化替换脚本
 * 使用方法: node replacement-script.js
 */

const fs = require('fs');

const replacements = {
  '..\frontEnd\src\views\Technology\index.tsx': [
    {
      original: "React生态系统与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\index_react生态系统与最佳实践')`,
      line: 27
    },
    {
      original: "React生态系统与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\index_react生态系统与最佳实践')`,
      line: 27
    },
    {
      original: "TypeScript类型系统与进阶",
      replacement: `t('common:..\frontend\src\views\technology\index_typescript类型系统与进阶')`,
      line: 35
    },
    {
      original: "TypeScript类型系统与进阶",
      replacement: `t('common:..\frontend\src\views\technology\index_typescript类型系统与进阶')`,
      line: 35
    },
    {
      original: "Node.js后端开发技术",
      replacement: `t('common:..\frontend\src\views\technology\index_node_js后端开发技术')`,
      line: 43
    },
    {
      original: "Node.js后端开发技术",
      replacement: `t('common:..\frontend\src\views\technology\index_node_js后端开发技术')`,
      line: 43
    },
    {
      original: "Vue.js框架深度解析",
      replacement: `t('common:..\frontend\src\views\technology\index_vue_js框架深度解析')`,
      line: 51
    },
    {
      original: "Vue.js框架深度解析",
      replacement: `t('common:..\frontend\src\views\technology\index_vue_js框架深度解析')`,
      line: 51
    },
    {
      original: "Docker容器化技术",
      replacement: `t('common:..\frontend\src\views\technology\index_docker容器化技术')`,
      line: 60
    },
    {
      original: "Docker容器化技术",
      replacement: `t('common:..\frontend\src\views\technology\index_docker容器化技术')`,
      line: 60
    },
    {
      original: "开发工具",
      replacement: `t('common:..\frontend\src\views\technology\index_开发工具')`,
      line: 63
    },
    {
      original: "开发工具",
      replacement: `t('common:..\frontend\src\views\technology\index_开发工具')`,
      line: 63
    },
    {
      original: "开发工具与效率提升",
      replacement: `t('common:..\frontend\src\views\technology\index_开发工具与效率提升')`,
      line: 68
    },
    {
      original: "开发工具与效率提升",
      replacement: `t('common:..\frontend\src\views\technology\index_开发工具与效率提升')`,
      line: 68
    },
    {
      original: "版本控制与团队协作",
      replacement: `t('common:..\frontend\src\views\technology\index_版本控制与团队协作')`,
      line: 76
    },
    {
      original: "版本控制与团队协作",
      replacement: `t('common:..\frontend\src\views\technology\index_版本控制与团队协作')`,
      line: 76
    },
    {
      original: "Jest测试框架与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\index_jest测试框架与最佳实践')`,
      line: 84
    },
    {
      original: "Jest测试框架与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\index_jest测试框架与最佳实践')`,
      line: 84
    },
    {
      original: "K爷的博客系统",
      replacement: `t('common:..\frontend\src\views\technology\index_k爷的博客系统')`,
      line: 92
    },
    {
      original: "K爷的博客系统",
      replacement: `t('common:..\frontend\src\views\technology\index_k爷的博客系统')`,
      line: 92
    },
    {
      original: "基于React + Node.js的全栈博客系统，支持文章发布、评论、用户管理等功能。",
      replacement: `t('common:..\frontend\src\views\technology\index_基于react_node_js的全栈博客系统')`,
      line: 93
    },
    {
      original: "基于React + Node.js的全栈博客系统，支持文章发布、评论、用户管理等功能。",
      replacement: `t('common:..\frontend\src\views\technology\index_基于react_node_js的全栈博客系统')`,
      line: 93
    },
    {
      original: "进行中",
      replacement: `t('common:..\frontend\src\views\technology\index_进行中')`,
      line: 95
    },
    {
      original: "进行中",
      replacement: `t('common:..\frontend\src\views\technology\index_进行中')`,
      line: 95
    },
    {
      original: "文件管理系统",
      replacement: `t('common:..\frontend\src\views\technology\index_文件管理系统')`,
      line: 102
    },
    {
      original: "文件管理系统",
      replacement: `t('common:..\frontend\src\views\technology\index_文件管理系统')`,
      line: 102
    },
    {
      original: "支持多种文件格式预览和管理的Web应用，包含上传、下载、预览等功能。",
      replacement: `t('common:..\frontend\src\views\technology\index_支持多种文件格式预览和管理的web应用_包含上传_下载')`,
      line: 103
    },
    {
      original: "支持多种文件格式预览和管理的Web应用，包含上传、下载、预览等功能。",
      replacement: `t('common:..\frontend\src\views\technology\index_支持多种文件格式预览和管理的web应用_包含上传_下载')`,
      line: 103
    },
    {
      original: "已完成",
      replacement: `t('common:..\frontend\src\views\technology\index_已完成')`,
      line: 105
    },
    {
      original: "已完成",
      replacement: `t('common:..\frontend\src\views\technology\index_已完成')`,
      line: 105
    },
    {
      original: "实时聊天应用",
      replacement: `t('common:..\frontend\src\views\technology\index_实时聊天应用')`,
      line: 112
    },
    {
      original: "实时聊天应用",
      replacement: `t('common:..\frontend\src\views\technology\index_实时聊天应用')`,
      line: 112
    },
    {
      original: "基于WebSocket的实时聊天应用，支持群聊、私聊、文件传输等功能。",
      replacement: `t('common:..\frontend\src\views\technology\index_基于websocket的实时聊天应用_支持群聊_私聊')`,
      line: 113
    },
    {
      original: "基于WebSocket的实时聊天应用，支持群聊、私聊、文件传输等功能。",
      replacement: `t('common:..\frontend\src\views\technology\index_基于websocket的实时聊天应用_支持群聊_私聊')`,
      line: 113
    },
    {
      original: "计划中",
      replacement: `t('common:..\frontend\src\views\technology\index_计划中')`,
      line: 115
    },
    {
      original: "计划中",
      replacement: `t('common:..\frontend\src\views\technology\index_计划中')`,
      line: 115
    },
    {
      original: "2024年",
      replacement: `t('common:..\frontend\src\views\technology\index_2024年')`,
      line: 125
    },
    {
      original: "2024年",
      replacement: `t('common:..\frontend\src\views\technology\index_2024年')`,
      line: 125
    },
    {
      original: "深入学习微前端架构",
      replacement: `t('common:..\frontend\src\views\technology\index_深入学习微前端架构')`,
      line: 126
    },
    {
      original: "深入学习微前端架构",
      replacement: `t('common:..\frontend\src\views\technology\index_深入学习微前端架构')`,
      line: 126
    },
    {
      original: "研究qiankun、single-spa等微前端解决方案",
      replacement: `t('common:..\frontend\src\views\technology\index_研究qiankun_single_spa等微前端解决方案')`,
      line: 127
    },
    {
      original: "研究qiankun、single-spa等微前端解决方案",
      replacement: `t('common:..\frontend\src\views\technology\index_研究qiankun_single_spa等微前端解决方案')`,
      line: 127
    },
    {
      original: "2023年",
      replacement: `t('common:..\frontend\src\views\technology\index_2023年')`,
      line: 131
    },
    {
      original: "2023年",
      replacement: `t('common:..\frontend\src\views\technology\index_2023年')`,
      line: 131
    },
    {
      original: "掌握云原生技术",
      replacement: `t('common:..\frontend\src\views\technology\index_掌握云原生技术')`,
      line: 132
    },
    {
      original: "掌握云原生技术",
      replacement: `t('common:..\frontend\src\views\technology\index_掌握云原生技术')`,
      line: 132
    },
    {
      original: "学习Docker、Kubernetes、CI/CD等技术",
      replacement: `t('common:..\frontend\src\views\technology\index_学习docker_kubernetes_ci')`,
      line: 133
    },
    {
      original: "学习Docker、Kubernetes、CI/CD等技术",
      replacement: `t('common:..\frontend\src\views\technology\index_学习docker_kubernetes_ci')`,
      line: 133
    },
    {
      original: "2022年",
      replacement: `t('common:..\frontend\src\views\technology\index_2022年')`,
      line: 137
    },
    {
      original: "2022年",
      replacement: `t('common:..\frontend\src\views\technology\index_2022年')`,
      line: 137
    },
    {
      original: "全栈开发能力提升",
      replacement: `t('common:..\frontend\src\views\technology\index_全栈开发能力提升')`,
      line: 138
    },
    {
      original: "全栈开发能力提升",
      replacement: `t('common:..\frontend\src\views\technology\index_全栈开发能力提升')`,
      line: 138
    },
    {
      original: "深入学习Node.js、数据库设计、系统架构",
      replacement: `t('common:..\frontend\src\views\technology\index_深入学习node_js_数据库设计')`,
      line: 139
    },
    {
      original: "深入学习Node.js、数据库设计、系统架构",
      replacement: `t('common:..\frontend\src\views\technology\index_深入学习node_js_数据库设计')`,
      line: 139
    },
    {
      original: "2021年",
      replacement: `t('common:..\frontend\src\views\technology\index_2021年')`,
      line: 143
    },
    {
      original: "2021年",
      replacement: `t('common:..\frontend\src\views\technology\index_2021年')`,
      line: 143
    },
    {
      original: "前端框架精通",
      replacement: `t('common:..\frontend\src\views\technology\index_前端框架精通')`,
      line: 144
    },
    {
      original: "前端框架精通",
      replacement: `t('common:..\frontend\src\views\technology\index_前端框架精通')`,
      line: 144
    },
    {
      original: "深入学习React、Vue.js生态系统",
      replacement: `t('common:..\frontend\src\views\technology\index_深入学习react_vue_js生态系统')`,
      line: 145
    },
    {
      original: "深入学习React、Vue.js生态系统",
      replacement: `t('common:..\frontend\src\views\technology\index_深入学习react_vue_js生态系统')`,
      line: 145
    },
    {
      original: "项目展示",
      replacement: `t('common:..\frontend\src\views\technology\index_项目展示')`,
      line: 267
    },
    {
      original: "已完成",
      replacement: `t('common:..\frontend\src\views\technology\index_已完成')`,
      line: 302
    },
    {
      original: "进行中",
      replacement: `t('common:..\frontend\src\views\technology\index_进行中')`,
      line: 304
    },
    {
      original: "进度:",
      replacement: `t('common:..\frontend\src\views\technology\index_进度')`,
      line: 324
    },
    {
      original: "技术成长时间线",
      replacement: `t('common:..\frontend\src\views\technology\index_技术成长时间线')`,
      line: 351
    },
  ],
  '..\frontEnd\src\views\Technology\pages\VueDetail.tsx': [
    {
      original: "Vue 3组合式API的深度解析与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue_3组合式api的深度解析与最佳实践')`,
      line: 21
    },
    {
      original: "Vue 3组合式API的深度解析与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue_3组合式api的深度解析与最佳实践')`,
      line: 21
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 24
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 24
    },
    {
      original: "响应式原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_响应式原理')`,
      line: 29
    },
    {
      original: "响应式原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_响应式原理')`,
      line: 29
    },
    {
      original: "Vue响应式系统的实现原理与性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue响应式系统的实现原理与性能优化')`,
      line: 30
    },
    {
      original: "Vue响应式系统的实现原理与性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue响应式系统的实现原理与性能优化')`,
      line: 30
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_高级')`,
      line: 33
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_高级')`,
      line: 33
    },
    {
      original: "核心原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_核心原理')`,
      line: 34
    },
    {
      original: "核心原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_核心原理')`,
      line: 34
    },
    {
      original: "Vue路由系统的配置与高级用法",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue路由系统的配置与高级用法')`,
      line: 39
    },
    {
      original: "Vue路由系统的配置与高级用法",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue路由系统的配置与高级用法')`,
      line: 39
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 42
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 42
    },
    {
      original: "生态系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_生态系统')`,
      line: 43
    },
    {
      original: "生态系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_生态系统')`,
      line: 43
    },
    {
      original: "Vue状态管理解决方案对比与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue状态管理解决方案对比与实践')`,
      line: 48
    },
    {
      original: "Vue状态管理解决方案对比与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue状态管理解决方案对比与实践')`,
      line: 48
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 51
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 51
    },
    {
      original: "状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_状态管理')`,
      line: 52
    },
    {
      original: "状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_状态管理')`,
      line: 52
    },
    {
      original: "Vue应用性能优化策略与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue应用性能优化策略与实践')`,
      line: 57
    },
    {
      original: "Vue应用性能优化策略与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue应用性能优化策略与实践')`,
      line: 57
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_高级')`,
      line: 60
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_高级')`,
      line: 60
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_性能优化')`,
      line: 61
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_性能优化')`,
      line: 61
    },
    {
      original: "Vue组件测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue组件测试最佳实践')`,
      line: 66
    },
    {
      original: "Vue组件测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue组件测试最佳实践')`,
      line: 66
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 69
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 69
    },
    {
      original: "测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_测试')`,
      line: 70
    },
    {
      original: "测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_测试')`,
      line: 70
    },
    {
      original: "服务端渲染与Nuxt.js框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_服务端渲染与nuxt_js框架')`,
      line: 75
    },
    {
      original: "服务端渲染与Nuxt.js框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_服务端渲染与nuxt_js框架')`,
      line: 75
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_高级')`,
      line: 78
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_高级')`,
      line: 78
    },
    {
      original: "服务端渲染",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_服务端渲染')`,
      line: 79
    },
    {
      original: "服务端渲染",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_服务端渲染')`,
      line: 79
    },
    {
      original: "Vue 2到Vue 3的迁移指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue_2到vue_3的迁移指南')`,
      line: 84
    },
    {
      original: "Vue 2到Vue 3的迁移指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue_2到vue_3的迁移指南')`,
      line: 84
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 87
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 87
    },
    {
      original: "迁移升级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_迁移升级')`,
      line: 88
    },
    {
      original: "迁移升级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_迁移升级')`,
      line: 88
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_简单')`,
      line: 101
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_中等')`,
      line: 103
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_高级')`,
      line: 105
    },
    {
      original: "Vue.js 技术深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_vue_js_技术深度解析')`,
      line: 119
    },
    {
      original: "深入理解Vue.js的核心概念、生态系统和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_深入理解vue_js的核心概念_生态系统和最佳实践')`,
      line: 120
    },
    {
      original: "前端框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_前端框架')`,
      line: 122
    },
    {
      original: "渐进式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_渐进式')`,
      line: 123
    },
    {
      original: "响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_响应式')`,
      line: 124
    },
    {
      original: "组合式API",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_组合式api')`,
      line: 125
    },
    {
      original: "点击查看详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\vuedetail_点击查看详解')`,
      line: 160
    },
  ],
  '..\frontEnd\src\views\Technology\pages\TypeScriptDetail.tsx': [
    {
      original: "基础类型系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_基础类型系统')`,
      line: 20
    },
    {
      original: "基础类型系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_基础类型系统')`,
      line: 20
    },
    {
      original: "TypeScript基础类型与类型注解详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_typescript基础类型与类型注解详解')`,
      line: 21
    },
    {
      original: "TypeScript基础类型与类型注解详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_typescript基础类型与类型注解详解')`,
      line: 21
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_简单')`,
      line: 24
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_简单')`,
      line: 24
    },
    {
      original: "基础语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_基础语法')`,
      line: 25
    },
    {
      original: "基础语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_基础语法')`,
      line: 25
    },
    {
      original: "高级类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级类型')`,
      line: 29
    },
    {
      original: "高级类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级类型')`,
      line: 29
    },
    {
      original: "联合类型、交叉类型、条件类型等高级特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_联合类型_交叉类型_条件类型等高级特性')`,
      line: 30
    },
    {
      original: "联合类型、交叉类型、条件类型等高级特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_联合类型_交叉类型_条件类型等高级特性')`,
      line: 30
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级')`,
      line: 33
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级')`,
      line: 33
    },
    {
      original: "高级特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级特性')`,
      line: 34
    },
    {
      original: "高级特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级特性')`,
      line: 34
    },
    {
      original: "泛型编程",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_泛型编程')`,
      line: 38
    },
    {
      original: "泛型编程",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_泛型编程')`,
      line: 38
    },
    {
      original: "泛型的使用技巧与实际应用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_泛型的使用技巧与实际应用场景')`,
      line: 39
    },
    {
      original: "泛型的使用技巧与实际应用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_泛型的使用技巧与实际应用场景')`,
      line: 39
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 42
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 42
    },
    {
      original: "泛型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_泛型')`,
      line: 43
    },
    {
      original: "泛型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_泛型')`,
      line: 43
    },
    {
      original: "装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_装饰器')`,
      line: 47
    },
    {
      original: "装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_装饰器')`,
      line: 47
    },
    {
      original: "装饰器模式在TypeScript中的应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_装饰器模式在typescript中的应用')`,
      line: 48
    },
    {
      original: "装饰器模式在TypeScript中的应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_装饰器模式在typescript中的应用')`,
      line: 48
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级')`,
      line: 51
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级')`,
      line: 51
    },
    {
      original: "装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_装饰器')`,
      line: 52
    },
    {
      original: "装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_装饰器')`,
      line: 52
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_模块系统')`,
      line: 56
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_模块系统')`,
      line: 56
    },
    {
      original: "TypeScript模块化开发与命名空间",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_typescript模块化开发与命名空间')`,
      line: 57
    },
    {
      original: "TypeScript模块化开发与命名空间",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_typescript模块化开发与命名空间')`,
      line: 57
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 60
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 60
    },
    {
      original: "模块化",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_模块化')`,
      line: 61
    },
    {
      original: "模块化",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_模块化')`,
      line: 61
    },
    {
      original: "工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_工具类型')`,
      line: 65
    },
    {
      original: "工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_工具类型')`,
      line: 65
    },
    {
      original: "内置工具类型与自定义工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_内置工具类型与自定义工具类型')`,
      line: 66
    },
    {
      original: "内置工具类型与自定义工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_内置工具类型与自定义工具类型')`,
      line: 66
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 69
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 69
    },
    {
      original: "工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_工具类型')`,
      line: 70
    },
    {
      original: "工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_工具类型')`,
      line: 70
    },
    {
      original: "TypeScript在React项目中的最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_typescript在react项目中的最佳实践')`,
      line: 75
    },
    {
      original: "TypeScript在React项目中的最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_typescript在react项目中的最佳实践')`,
      line: 75
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 78
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 78
    },
    {
      original: "React集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_react集成')`,
      line: 79
    },
    {
      original: "React集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_react集成')`,
      line: 79
    },
    {
      original: "配置与工具链",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_配置与工具链')`,
      line: 83
    },
    {
      original: "配置与工具链",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_配置与工具链')`,
      line: 83
    },
    {
      original: "tsconfig.json配置与开发工具集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_tsconfig_json配置与开发工具集成')`,
      line: 84
    },
    {
      original: "tsconfig.json配置与开发工具集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_tsconfig_json配置与开发工具集成')`,
      line: 84
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_简单')`,
      line: 87
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_简单')`,
      line: 87
    },
    {
      original: "配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_配置')`,
      line: 88
    },
    {
      original: "配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_配置')`,
      line: 88
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_简单')`,
      line: 101
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_中等')`,
      line: 103
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_高级')`,
      line: 105
    },
    {
      original: "TypeScript 技术深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_typescript_技术深度解析')`,
      line: 119
    },
    {
      original: "掌握TypeScript类型系统，编写更安全、更可维护的JavaScript代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_掌握typescript类型系统_编写更安全_更可维护的javascript代码')`,
      line: 120
    },
    {
      original: "类型安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_类型安全')`,
      line: 122
    },
    {
      original: "静态检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_静态检查')`,
      line: 123
    },
    {
      original: "JavaScript超集",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_javascript超集')`,
      line: 124
    },
    {
      original: "开发体验",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_开发体验')`,
      line: 125
    },
    {
      original: "点击查看详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescriptdetail_点击查看详解')`,
      line: 160
    },
  ],
  '..\frontEnd\src\views\Technology\pages\ToolsDetail.tsx': [
    {
      original: "VS Code编辑器配置、插件与高效开发技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_vs_code编辑器配置_插件与高效开发技巧')`,
      line: 21
    },
    {
      original: "VS Code编辑器配置、插件与高效开发技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_vs_code编辑器配置_插件与高效开发技巧')`,
      line: 21
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 24
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 24
    },
    {
      original: "代码编辑器",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_代码编辑器')`,
      line: 25
    },
    {
      original: "代码编辑器",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_代码编辑器')`,
      line: 25
    },
    {
      original: "模块打包工具配置与性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_模块打包工具配置与性能优化')`,
      line: 30
    },
    {
      original: "模块打包工具配置与性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_模块打包工具配置与性能优化')`,
      line: 30
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 33
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 33
    },
    {
      original: "构建工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_构建工具')`,
      line: 34
    },
    {
      original: "构建工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_构建工具')`,
      line: 34
    },
    {
      original: "下一代前端构建工具与开发服务器",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_下一代前端构建工具与开发服务器')`,
      line: 39
    },
    {
      original: "下一代前端构建工具与开发服务器",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_下一代前端构建工具与开发服务器')`,
      line: 39
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 42
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 42
    },
    {
      original: "构建工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_构建工具')`,
      line: 43
    },
    {
      original: "构建工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_构建工具')`,
      line: 43
    },
    {
      original: "代码质量检查与格式化工具配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_代码质量检查与格式化工具配置')`,
      line: 48
    },
    {
      original: "代码质量检查与格式化工具配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_代码质量检查与格式化工具配置')`,
      line: 48
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 51
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 51
    },
    {
      original: "代码质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_代码质量')`,
      line: 52
    },
    {
      original: "代码质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_代码质量')`,
      line: 52
    },
    {
      original: "浏览器开发者工具调试技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_浏览器开发者工具调试技巧')`,
      line: 57
    },
    {
      original: "浏览器开发者工具调试技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_浏览器开发者工具调试技巧')`,
      line: 57
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 60
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 60
    },
    {
      original: "调试工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_调试工具')`,
      line: 61
    },
    {
      original: "调试工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_调试工具')`,
      line: 61
    },
    {
      original: "API测试与接口文档管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_api测试与接口文档管理')`,
      line: 66
    },
    {
      original: "API测试与接口文档管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_api测试与接口文档管理')`,
      line: 66
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 69
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 69
    },
    {
      original: "API工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_api工具')`,
      line: 70
    },
    {
      original: "API工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_api工具')`,
      line: 70
    },
    {
      original: "终端工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_终端工具')`,
      line: 74
    },
    {
      original: "终端工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_终端工具')`,
      line: 74
    },
    {
      original: "Shell、Zsh、终端效率提升技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_shell_zsh_终端效率提升技巧')`,
      line: 75
    },
    {
      original: "Shell、Zsh、终端效率提升技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_shell_zsh_终端效率提升技巧')`,
      line: 75
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 78
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 78
    },
    {
      original: "命令行",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_命令行')`,
      line: 79
    },
    {
      original: "命令行",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_命令行')`,
      line: 79
    },
    {
      original: "效率工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_效率工具')`,
      line: 83
    },
    {
      original: "效率工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_效率工具')`,
      line: 83
    },
    {
      original: "开发效率提升的工具与方法论",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_开发效率提升的工具与方法论')`,
      line: 84
    },
    {
      original: "开发效率提升的工具与方法论",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_开发效率提升的工具与方法论')`,
      line: 84
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 87
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 87
    },
    {
      original: "效率提升",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_效率提升')`,
      line: 88
    },
    {
      original: "效率提升",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_效率提升')`,
      line: 88
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_简单')`,
      line: 101
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_中等')`,
      line: 103
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_高级')`,
      line: 105
    },
    {
      original: "开发工具 技术深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_开发工具_技术深度解析')`,
      line: 119
    },
    {
      original: "掌握现代开发工具链，提升开发效率与代码质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_掌握现代开发工具链_提升开发效率与代码质量')`,
      line: 120
    },
    {
      original: "效率提升",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_效率提升')`,
      line: 122
    },
    {
      original: "工具链",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_工具链')`,
      line: 123
    },
    {
      original: "自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_自动化')`,
      line: 124
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_最佳实践')`,
      line: 125
    },
    {
      original: "点击查看详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\toolsdetail_点击查看详解')`,
      line: 160
    },
  ],
  '..\frontEnd\src\views\Technology\pages\ReactDetail.tsx': [
    {
      original: "Effect Hook的使用技巧与常见陷阱",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_effect_hook的使用技巧与常见陷阱')`,
      line: 21
    },
    {
      original: "Effect Hook的使用技巧与常见陷阱",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_effect_hook的使用技巧与常见陷阱')`,
      line: 21
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 24
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 24
    },
    {
      original: "性能优化利器，避免不必要的重新渲染",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_性能优化利器_避免不必要的重新渲染')`,
      line: 30
    },
    {
      original: "性能优化利器，避免不必要的重新渲染",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_性能优化利器_避免不必要的重新渲染')`,
      line: 30
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 33
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 33
    },
    {
      original: "缓存计算结果，优化组件性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_缓存计算结果_优化组件性能')`,
      line: 39
    },
    {
      original: "缓存计算结果，优化组件性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_缓存计算结果_优化组件性能')`,
      line: 39
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 42
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 42
    },
    {
      original: "跨组件状态共享的最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_跨组件状态共享的最佳实践')`,
      line: 48
    },
    {
      original: "跨组件状态共享的最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_跨组件状态共享的最佳实践')`,
      line: 48
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_简单')`,
      line: 51
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_简单')`,
      line: 51
    },
    {
      original: "自定义Hook的设计模式与实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_自定义hook的设计模式与实现')`,
      line: 57
    },
    {
      original: "自定义Hook的设计模式与实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_自定义hook的设计模式与实现')`,
      line: 57
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_高级')`,
      line: 60
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_高级')`,
      line: 60
    },
    {
      original: "React性能优化策略与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_react性能优化策略与实践')`,
      line: 66
    },
    {
      original: "React性能优化策略与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_react性能优化策略与实践')`,
      line: 66
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_高级')`,
      line: 69
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_高级')`,
      line: 69
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_性能优化')`,
      line: 70
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_性能优化')`,
      line: 70
    },
    {
      original: "错误边界处理与异常捕获",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_错误边界处理与异常捕获')`,
      line: 75
    },
    {
      original: "错误边界处理与异常捕获",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_错误边界处理与异常捕获')`,
      line: 75
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 78
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 78
    },
    {
      original: "错误处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_错误处理')`,
      line: 79
    },
    {
      original: "错误处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_错误处理')`,
      line: 79
    },
    {
      original: "React组件测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_react组件测试最佳实践')`,
      line: 84
    },
    {
      original: "React组件测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_react组件测试最佳实践')`,
      line: 84
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 87
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 87
    },
    {
      original: "测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_测试')`,
      line: 88
    },
    {
      original: "测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_测试')`,
      line: 88
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_简单')`,
      line: 101
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_中等')`,
      line: 103
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_高级')`,
      line: 105
    },
    {
      original: "React 技术深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_react_技术深度解析')`,
      line: 119
    },
    {
      original: "深入理解React的核心概念、最佳实践和常见难点",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_深入理解react的核心概念_最佳实践和常见难点')`,
      line: 120
    },
    {
      original: "前端框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_前端框架')`,
      line: 122
    },
    {
      original: "组件化",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_组件化')`,
      line: 123
    },
    {
      original: "虚拟DOM",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_虚拟dom')`,
      line: 124
    },
    {
      original: "点击查看详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\reactdetail_点击查看详解')`,
      line: 160
    },
  ],
  '..\frontEnd\src\views\Technology\pages\NodeJSDetail.tsx': [
    {
      original: "事件循环机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_事件循环机制')`,
      line: 19
    },
    {
      original: "事件循环机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_事件循环机制')`,
      line: 19
    },
    {
      original: "Node.js事件循环原理与异步编程模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_node_js事件循环原理与异步编程模式')`,
      line: 20
    },
    {
      original: "Node.js事件循环原理与异步编程模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_node_js事件循环原理与异步编程模式')`,
      line: 20
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_高级')`,
      line: 23
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_高级')`,
      line: 23
    },
    {
      original: "核心原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_核心原理')`,
      line: 24
    },
    {
      original: "核心原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_核心原理')`,
      line: 24
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_模块系统')`,
      line: 28
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_模块系统')`,
      line: 28
    },
    {
      original: "CommonJS、ES Modules与包管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_commonjs_es_modules与包管理')`,
      line: 29
    },
    {
      original: "CommonJS、ES Modules与包管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_commonjs_es_modules与包管理')`,
      line: 29
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 32
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 32
    },
    {
      original: "模块化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_模块化')`,
      line: 33
    },
    {
      original: "模块化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_模块化')`,
      line: 33
    },
    {
      original: "Express框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_express框架')`,
      line: 37
    },
    {
      original: "Express框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_express框架')`,
      line: 37
    },
    {
      original: "Express.js Web应用开发与中间件",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_express_js_web应用开发与中间件')`,
      line: 38
    },
    {
      original: "Express.js Web应用开发与中间件",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_express_js_web应用开发与中间件')`,
      line: 38
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 41
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 41
    },
    {
      original: "Web框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_web框架')`,
      line: 42
    },
    {
      original: "Web框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_web框架')`,
      line: 42
    },
    {
      original: "数据库集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_数据库集成')`,
      line: 46
    },
    {
      original: "数据库集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_数据库集成')`,
      line: 46
    },
    {
      original: "MongoDB、MySQL等数据库操作与ORM",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_mongodb_mysql等数据库操作与orm')`,
      line: 47
    },
    {
      original: "MongoDB、MySQL等数据库操作与ORM",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_mongodb_mysql等数据库操作与orm')`,
      line: 47
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 50
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 50
    },
    {
      original: "数据库",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_数据库')`,
      line: 51
    },
    {
      original: "数据库",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_数据库')`,
      line: 51
    },
    {
      original: "身份认证",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_身份认证')`,
      line: 55
    },
    {
      original: "身份认证",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_身份认证')`,
      line: 55
    },
    {
      original: "JWT、OAuth、Session等认证方案",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_jwt_oauth_session等认证方案')`,
      line: 56
    },
    {
      original: "JWT、OAuth、Session等认证方案",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_jwt_oauth_session等认证方案')`,
      line: 56
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 59
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 59
    },
    {
      original: "安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_安全')`,
      line: 60
    },
    {
      original: "安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_安全')`,
      line: 60
    },
    {
      original: "测试策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_测试策略')`,
      line: 64
    },
    {
      original: "测试策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_测试策略')`,
      line: 64
    },
    {
      original: "Jest、Mocha等测试框架与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_jest_mocha等测试框架与实践')`,
      line: 65
    },
    {
      original: "Jest、Mocha等测试框架与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_jest_mocha等测试框架与实践')`,
      line: 65
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 68
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 68
    },
    {
      original: "测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_测试')`,
      line: 69
    },
    {
      original: "测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_测试')`,
      line: 69
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_性能优化')`,
      line: 73
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_性能优化')`,
      line: 73
    },
    {
      original: "内存管理、集群部署与性能监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_内存管理_集群部署与性能监控')`,
      line: 74
    },
    {
      original: "内存管理、集群部署与性能监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_内存管理_集群部署与性能监控')`,
      line: 74
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_高级')`,
      line: 77
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_高级')`,
      line: 77
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_性能优化')`,
      line: 78
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_性能优化')`,
      line: 78
    },
    {
      original: "微服务架构",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_微服务架构')`,
      line: 82
    },
    {
      original: "微服务架构",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_微服务架构')`,
      line: 82
    },
    {
      original: "微服务设计模式与服务间通信",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_微服务设计模式与服务间通信')`,
      line: 83
    },
    {
      original: "微服务设计模式与服务间通信",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_微服务设计模式与服务间通信')`,
      line: 83
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_高级')`,
      line: 86
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_高级')`,
      line: 86
    },
    {
      original: "架构设计",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_架构设计')`,
      line: 87
    },
    {
      original: "架构设计",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_架构设计')`,
      line: 87
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_简单')`,
      line: 100
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_中等')`,
      line: 102
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_高级')`,
      line: 104
    },
    {
      original: "Node.js 技术深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_node_js_技术深度解析')`,
      line: 118
    },
    {
      original: "掌握Node.js后端开发技术，构建高性能的服务端应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_掌握node_js后端开发技术_构建高性能的服务端应用')`,
      line: 119
    },
    {
      original: "JavaScript运行时",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_javascript运行时')`,
      line: 121
    },
    {
      original: "事件驱动",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_事件驱动')`,
      line: 122
    },
    {
      original: "非阻塞I/O",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_非阻塞i_o')`,
      line: 123
    },
    {
      original: "高并发",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_高并发')`,
      line: 124
    },
    {
      original: "点击查看详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejsdetail_点击查看详解')`,
      line: 159
    },
  ],
  '..\frontEnd\src\views\Technology\pages\JestDetail.tsx': [
    {
      original: "Jest 基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_基础')`,
      line: 19
    },
    {
      original: "Jest 基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_基础')`,
      line: 19
    },
    {
      original: "Jest 安装配置、基本概念与测试环境搭建",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_安装配置_基本概念与测试环境搭建')`,
      line: 20
    },
    {
      original: "Jest 安装配置、基本概念与测试环境搭建",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_安装配置_基本概念与测试环境搭建')`,
      line: 20
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_简单')`,
      line: 23
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_简单')`,
      line: 23
    },
    {
      original: "基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_基础配置')`,
      line: 24
    },
    {
      original: "基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_基础配置')`,
      line: 24
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_单元测试')`,
      line: 28
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_单元测试')`,
      line: 28
    },
    {
      original: "编写单元测试、断言方法与测试用例设计",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_编写单元测试_断言方法与测试用例设计')`,
      line: 29
    },
    {
      original: "编写单元测试、断言方法与测试用例设计",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_编写单元测试_断言方法与测试用例设计')`,
      line: 29
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_简单')`,
      line: 32
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_简单')`,
      line: 32
    },
    {
      original: "测试编写",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_测试编写')`,
      line: 33
    },
    {
      original: "测试编写",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_测试编写')`,
      line: 33
    },
    {
      original: "Mock 与 Spy",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_mock_与_spy')`,
      line: 37
    },
    {
      original: "Mock 与 Spy",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_mock_与_spy')`,
      line: 37
    },
    {
      original: "Jest Mock 功能、函数模拟与依赖注入测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_mock_功能')`,
      line: 38
    },
    {
      original: "Jest Mock 功能、函数模拟与依赖注入测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_mock_功能')`,
      line: 38
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_中等')`,
      line: 41
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_中等')`,
      line: 41
    },
    {
      original: "高级功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_高级功能')`,
      line: 42
    },
    {
      original: "高级功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_高级功能')`,
      line: 42
    },
    {
      original: "异步测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_异步测试')`,
      line: 46
    },
    {
      original: "异步测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_异步测试')`,
      line: 46
    },
    {
      original: "Promise、async/await 与异步代码的测试方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_promise_async_await')`,
      line: 47
    },
    {
      original: "Promise、async/await 与异步代码的测试方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_promise_async_await')`,
      line: 47
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_中等')`,
      line: 50
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_中等')`,
      line: 50
    },
    {
      original: "异步处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_异步处理')`,
      line: 51
    },
    {
      original: "异步处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_异步处理')`,
      line: 51
    },
    {
      original: "测试覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_测试覆盖率')`,
      line: 55
    },
    {
      original: "测试覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_测试覆盖率')`,
      line: 55
    },
    {
      original: "代码覆盖率分析、报告生成与质量评估",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_代码覆盖率分析_报告生成与质量评估')`,
      line: 56
    },
    {
      original: "代码覆盖率分析、报告生成与质量评估",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_代码覆盖率分析_报告生成与质量评估')`,
      line: 56
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_中等')`,
      line: 59
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_中等')`,
      line: 59
    },
    {
      original: "质量保证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_质量保证')`,
      line: 60
    },
    {
      original: "质量保证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_质量保证')`,
      line: 60
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_最佳实践')`,
      line: 64
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_最佳实践')`,
      line: 64
    },
    {
      original: "Jest 测试最佳实践、性能优化与团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_测试最佳实践_性能优化与团队协作')`,
      line: 65
    },
    {
      original: "Jest 测试最佳实践、性能优化与团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_测试最佳实践_性能优化与团队协作')`,
      line: 65
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_高级')`,
      line: 68
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_高级')`,
      line: 68
    },
    {
      original: "实践指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_实践指南')`,
      line: 69
    },
    {
      original: "实践指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_实践指南')`,
      line: 69
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_简单')`,
      line: 82
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_中等')`,
      line: 84
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_高级')`,
      line: 86
    },
    {
      original: "Jest 测试框架深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_jest_测试框架深度解析')`,
      line: 100
    },
    {
      original: "掌握Jest测试框架的核心概念、最佳实践和高级特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_掌握jest测试框架的核心概念_最佳实践和高级特性')`,
      line: 101
    },
    {
      original: "测试框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_测试框架')`,
      line: 103
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_单元测试')`,
      line: 104
    },
    {
      original: "覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_覆盖率')`,
      line: 106
    },
    {
      original: "点击查看详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\jestdetail_点击查看详解')`,
      line: 141
    },
  ],
  '..\frontEnd\src\views\Technology\pages\GitDetail.tsx': [
    {
      original: "Git基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git基础')`,
      line: 20
    },
    {
      original: "Git基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git基础')`,
      line: 20
    },
    {
      original: "Git版本控制基本概念与常用命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git版本控制基本概念与常用命令')`,
      line: 21
    },
    {
      original: "Git版本控制基本概念与常用命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git版本控制基本概念与常用命令')`,
      line: 21
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_简单')`,
      line: 24
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_简单')`,
      line: 24
    },
    {
      original: "基础操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_基础操作')`,
      line: 25
    },
    {
      original: "基础操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_基础操作')`,
      line: 25
    },
    {
      original: "分支管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_分支管理')`,
      line: 29
    },
    {
      original: "分支管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_分支管理')`,
      line: 29
    },
    {
      original: "Git分支策略与合并冲突解决",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git分支策略与合并冲突解决')`,
      line: 30
    },
    {
      original: "Git分支策略与合并冲突解决",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git分支策略与合并冲突解决')`,
      line: 30
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 33
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 33
    },
    {
      original: "分支管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_分支管理')`,
      line: 34
    },
    {
      original: "分支管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_分支管理')`,
      line: 34
    },
    {
      original: "GitHub工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_github工作流')`,
      line: 38
    },
    {
      original: "GitHub工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_github工作流')`,
      line: 38
    },
    {
      original: "Pull Request、Issue、Code Review流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_pull_request_issue')`,
      line: 39
    },
    {
      original: "Pull Request、Issue、Code Review流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_pull_request_issue')`,
      line: 39
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 42
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 42
    },
    {
      original: "协作流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_协作流程')`,
      line: 43
    },
    {
      original: "协作流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_协作流程')`,
      line: 43
    },
    {
      original: "CI/CD自动化工作流配置与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_ci_cd自动化工作流配置与实践')`,
      line: 48
    },
    {
      original: "CI/CD自动化工作流配置与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_ci_cd自动化工作流配置与实践')`,
      line: 48
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_高级')`,
      line: 51
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_高级')`,
      line: 51
    },
    {
      original: "Git高级技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git高级技巧')`,
      line: 56
    },
    {
      original: "Git高级技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git高级技巧')`,
      line: 56
    },
    {
      original: "Rebase、Cherry-pick、Stash等高级操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_rebase_cherry_pick')`,
      line: 57
    },
    {
      original: "Rebase、Cherry-pick、Stash等高级操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_rebase_cherry_pick')`,
      line: 57
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_高级')`,
      line: 60
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_高级')`,
      line: 60
    },
    {
      original: "高级操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_高级操作')`,
      line: 61
    },
    {
      original: "高级操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_高级操作')`,
      line: 61
    },
    {
      original: "Git钩子脚本与代码质量自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git钩子脚本与代码质量自动化')`,
      line: 66
    },
    {
      original: "Git钩子脚本与代码质量自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git钩子脚本与代码质量自动化')`,
      line: 66
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 69
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 69
    },
    {
      original: "自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_自动化')`,
      line: 70
    },
    {
      original: "自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_自动化')`,
      line: 70
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_团队协作')`,
      line: 74
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_团队协作')`,
      line: 74
    },
    {
      original: "多人协作开发的最佳实践与规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_多人协作开发的最佳实践与规范')`,
      line: 75
    },
    {
      original: "多人协作开发的最佳实践与规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_多人协作开发的最佳实践与规范')`,
      line: 75
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 78
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 78
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_团队协作')`,
      line: 79
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_团队协作')`,
      line: 79
    },
    {
      original: "安全最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_安全最佳实践')`,
      line: 83
    },
    {
      original: "安全最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_安全最佳实践')`,
      line: 83
    },
    {
      original: "Git安全配置与敏感信息保护",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git安全配置与敏感信息保护')`,
      line: 84
    },
    {
      original: "Git安全配置与敏感信息保护",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git安全配置与敏感信息保护')`,
      line: 84
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 87
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 87
    },
    {
      original: "安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_安全')`,
      line: 88
    },
    {
      original: "安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_安全')`,
      line: 88
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_简单')`,
      line: 101
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_中等')`,
      line: 103
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_高级')`,
      line: 105
    },
    {
      original: "Git & GitHub 技术深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_git_github_技术深度解析')`,
      line: 119
    },
    {
      original: "掌握版本控制与团队协作，构建高效的开发工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_掌握版本控制与团队协作_构建高效的开发工作流')`,
      line: 120
    },
    {
      original: "版本控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_版本控制')`,
      line: 122
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_团队协作')`,
      line: 123
    },
    {
      original: "开源社区",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_开源社区')`,
      line: 124
    },
    {
      original: "点击查看详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\gitdetail_点击查看详解')`,
      line: 160
    },
  ],
  '..\frontEnd\src\views\Technology\pages\DockerDetail.tsx': [
    {
      original: "Docker基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_docker基础')`,
      line: 20
    },
    {
      original: "Docker基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_docker基础')`,
      line: 20
    },
    {
      original: "容器化概念、镜像与容器的基本操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器化概念_镜像与容器的基本操作')`,
      line: 21
    },
    {
      original: "容器化概念、镜像与容器的基本操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器化概念_镜像与容器的基本操作')`,
      line: 21
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_简单')`,
      line: 24
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_简单')`,
      line: 24
    },
    {
      original: "基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_基础概念')`,
      line: 25
    },
    {
      original: "基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_基础概念')`,
      line: 25
    },
    {
      original: "镜像构建文件编写与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_镜像构建文件编写与最佳实践')`,
      line: 30
    },
    {
      original: "镜像构建文件编写与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_镜像构建文件编写与最佳实践')`,
      line: 30
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 33
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 33
    },
    {
      original: "镜像构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_镜像构建')`,
      line: 34
    },
    {
      original: "镜像构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_镜像构建')`,
      line: 34
    },
    {
      original: "多容器应用编排与服务管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_多容器应用编排与服务管理')`,
      line: 39
    },
    {
      original: "多容器应用编排与服务管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_多容器应用编排与服务管理')`,
      line: 39
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 42
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 42
    },
    {
      original: "容器编排",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器编排')`,
      line: 43
    },
    {
      original: "容器编排",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器编排')`,
      line: 43
    },
    {
      original: "网络配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_网络配置')`,
      line: 47
    },
    {
      original: "网络配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_网络配置')`,
      line: 47
    },
    {
      original: "Docker网络模式与容器间通信",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_docker网络模式与容器间通信')`,
      line: 48
    },
    {
      original: "Docker网络模式与容器间通信",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_docker网络模式与容器间通信')`,
      line: 48
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 51
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 51
    },
    {
      original: "网络",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_网络')`,
      line: 52
    },
    {
      original: "网络",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_网络')`,
      line: 52
    },
    {
      original: "数据管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_数据管理')`,
      line: 56
    },
    {
      original: "数据管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_数据管理')`,
      line: 56
    },
    {
      original: "数据卷、绑定挂载与数据持久化",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_数据卷_绑定挂载与数据持久化')`,
      line: 57
    },
    {
      original: "数据卷、绑定挂载与数据持久化",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_数据卷_绑定挂载与数据持久化')`,
      line: 57
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 60
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 60
    },
    {
      original: "数据存储",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_数据存储')`,
      line: 61
    },
    {
      original: "数据存储",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_数据存储')`,
      line: 61
    },
    {
      original: "安全最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_安全最佳实践')`,
      line: 65
    },
    {
      original: "安全最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_安全最佳实践')`,
      line: 65
    },
    {
      original: "容器安全、镜像扫描与权限管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器安全_镜像扫描与权限管理')`,
      line: 66
    },
    {
      original: "容器安全、镜像扫描与权限管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器安全_镜像扫描与权限管理')`,
      line: 66
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_高级')`,
      line: 69
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_高级')`,
      line: 69
    },
    {
      original: "安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_安全')`,
      line: 70
    },
    {
      original: "安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_安全')`,
      line: 70
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_性能优化')`,
      line: 74
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_性能优化')`,
      line: 74
    },
    {
      original: "镜像优化、资源限制与监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_镜像优化_资源限制与监控')`,
      line: 75
    },
    {
      original: "镜像优化、资源限制与监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_镜像优化_资源限制与监控')`,
      line: 75
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_高级')`,
      line: 78
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_高级')`,
      line: 78
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_性能优化')`,
      line: 79
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_性能优化')`,
      line: 79
    },
    {
      original: "Kubernetes集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_kubernetes集成')`,
      line: 83
    },
    {
      original: "Kubernetes集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_kubernetes集成')`,
      line: 83
    },
    {
      original: "K8s容器编排与微服务部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_k8s容器编排与微服务部署')`,
      line: 84
    },
    {
      original: "K8s容器编排与微服务部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_k8s容器编排与微服务部署')`,
      line: 84
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_高级')`,
      line: 87
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_高级')`,
      line: 87
    },
    {
      original: "容器编排",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器编排')`,
      line: 88
    },
    {
      original: "容器编排",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器编排')`,
      line: 88
    },
    {
      original: "简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_简单')`,
      line: 101
    },
    {
      original: "中等",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_中等')`,
      line: 103
    },
    {
      original: "高级",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_高级')`,
      line: 105
    },
    {
      original: "Docker 技术深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_docker_技术深度解析')`,
      line: 119
    },
    {
      original: "掌握Docker容器化技术，实现应用的快速部署与扩展",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_掌握docker容器化技术_实现应用的快速部署与扩展')`,
      line: 120
    },
    {
      original: "容器化",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_容器化')`,
      line: 122
    },
    {
      original: "轻量级",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_轻量级')`,
      line: 123
    },
    {
      original: "可移植",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_可移植')`,
      line: 124
    },
    {
      original: "微服务",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_微服务')`,
      line: 125
    },
    {
      original: "点击查看详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\dockerdetail_点击查看详解')`,
      line: 160
    },
  ],
  '..\frontEnd\src\views\Technology\pages\vue\VuexPiniaDetail.tsx': [
    {
      original: "Vue 状态管理：Vuex & Pinia",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_vue_状态管理_vuex')`,
      line: 47
    },
    {
      original: "掌握Vue生态的状态管理方案，从Vuex到Pinia的演进与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_掌握vue生态的状态管理方案_从vuex到pinia的演进与最佳实践')`,
      line: 48
    },
    {
      original: "状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_状态管理')`,
      line: 53
    },
    {
      original: "📊 状态管理概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_状态管理概述')`,
      line: 62
    },
    {
      original: "为什么需要状态管理？",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_为什么需要状态管理')`,
      line: 64
    },
    {
      original: "当应用变得复杂时，组件间的状态共享和通信变得困难。状态管理库提供了集中式的状态存储和管理方案。",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_当应用变得复杂时_组件间的状态共享和通信变得困难_状态管理库提供了集中式的状态存储和管理方案')`,
      line: 65
    },
    {
      original: "Vuex vs Pinia 对比",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_vuex_vs_pinia')`,
      line: 73
    },
    {
      original: "Vuex vs Pinia 对比",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_vuex_vs_pinia')`,
      line: 96
    },
    {
      original: "🏪 Vuex 状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_vuex_状态管理')`,
      line: 102
    },
    {
      original: "1. Vuex 基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_1_vuex_基础配置')`,
      line: 104
    },
    {
      original: "获取用户失败:",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_获取用户失败')`,
      line: 140
    },
    {
      original: "Vuex基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_vuex基础配置')`,
      line: 157
    },
    {
      original: "2. 组件中使用Vuex",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_2_组件中使用vuex')`,
      line: 160
    },
    {
      original: "计数器: {{ count }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_计数器_count')`,
      line: 164
    },
    {
      original: "双倍计数: {{ doubleCount }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_双倍计数_doublecount')`,
      line: 165
    },
    {
      original: "增加",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_增加')`,
      line: 166
    },
    {
      original: "用户: {{ user.name }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_用户_user_name')`,
      line: 169
    },
    {
      original: "组件中使用Vuex",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_组件中使用vuex')`,
      line: 230
    },
    {
      original: "🍍 Pinia 状态管理 (推荐)",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_pinia_状态管理_推荐')`,
      line: 236
    },
    {
      original: "1. Pinia 基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_1_pinia_基础配置')`,
      line: 238
    },
    {
      original: "获取数据失败:",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_获取数据失败')`,
      line: 284
    },
    {
      original: "Pinia基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_pinia基础配置')`,
      line: 296
    },
    {
      original: "2. 组合式API风格的Store",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_2_组合式api风格的store')`,
      line: 299
    },
    {
      original: "游客",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_游客')`,
      line: 313
    },
    {
      original: "组合式API风格Store",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_组合式api风格store')`,
      line: 364
    },
    {
      original: "3. 在组件中使用Pinia",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_3_在组件中使用pinia')`,
      line: 367
    },
    {
      original: "双倍: {{ counter.doubleCount }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_双倍_counter_doublecount')`,
      line: 373
    },
    {
      original: "增加",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_增加')`,
      line: 374
    },
    {
      original: "欢迎, {{ user.userName }}!",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_欢迎_user_username')`,
      line: 378
    },
    {
      original: "退出",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_退出')`,
      line: 379
    },
    {
      original: "登录",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_登录')`,
      line: 382
    },
    {
      original: "登录失败:",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_登录失败')`,
      line: 412
    },
    {
      original: "计数变化:",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_计数变化')`,
      line: 418
    },
    {
      original: "组件中使用Pinia",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_组件中使用pinia')`,
      line: 422
    },
    {
      original: "🚀 Pinia 高级特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_pinia_高级特性')`,
      line: 428
    },
    {
      original: "1. Store组合与复用",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_1_store组合与复用')`,
      line: 430
    },
    {
      original: "未授权",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_未授权')`,
      line: 480
    },
    {
      original: "Store组合与复用",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_store组合与复用')`,
      line: 489
    },
    {
      original: "2. 插件系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_2_插件系统')`,
      line: 492
    },
    {
      original: "Pinia插件系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_pinia插件系统')`,
      line: 527
    },
    {
      original: "3. TypeScript支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_3_typescript支持')`,
      line: 530
    },
    {
      original: "登录失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_登录失败')`,
      line: 569
    },
    {
      original: "登录失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_登录失败')`,
      line: 569
    },
    {
      original: "TypeScript支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuexpiniadetail_typescript支持')`,
      line: 593
    },
  ],
  '..\frontEnd\src\views\Technology\pages\vue\VueRouterDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Vue Router 路由管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_vue_router_路由管理')`,
      line: 45
    },
    {
      original: "掌握Vue Router的核心概念和高级特性，构建单页应用的路由系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_掌握vue_router的核心概念和高级特性_构建单页应用的路由系统')`,
      line: 46
    },
    {
      original: "路由",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由')`,
      line: 50
    },
    {
      original: "导航",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_导航')`,
      line: 51
    },
    {
      original: "守卫",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_守卫')`,
      line: 52
    },
    {
      original: "🚀 基础配置与使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_基础配置与使用')`,
      line: 60
    },
    {
      original: "安装与基本设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_安装与基本设置')`,
      line: 62
    },
    {
      original: "Vue Router基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_vue_router基础配置')`,
      line: 100
    },
    {
      original: "基本模板使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_基本模板使用')`,
      line: 103
    },
    {
      original: "首页",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_首页')`,
      line: 110
    },
    {
      original: "关于",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_关于')`,
      line: 111
    },
    {
      original: "基本模板使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_基本模板使用')`,
      line: 136
    },
    {
      original: "🔗 动态路由与参数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_动态路由与参数')`,
      line: 142
    },
    {
      original: "1. 路径参数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_1_路径参数')`,
      line: 144
    },
    {
      original: "用户ID: {{ $route.params.id }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_用户id_route_params')`,
      line: 167
    },
    {
      original: "文章ID: {{ $route.params.postId }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_文章id_route_params')`,
      line: 168
    },
    {
      original: "用户ID变化:",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_用户id变化')`,
      line: 179
    },
    {
      original: "动态路径参数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_动态路径参数')`,
      line: 189
    },
    {
      original: "2. 查询参数与Hash",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_2_查询参数与hash')`,
      line: 192
    },
    {
      original: "搜索结果",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_搜索结果')`,
      line: 197
    },
    {
      original: "关键词: {{ $route.query.q }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_关键词_route_query')`,
      line: 198
    },
    {
      original: "分类: {{ $route.query.category }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_分类_route_query')`,
      line: 199
    },
    {
      original: "查询参数变化:",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_查询参数变化')`,
      line: 231
    },
    {
      original: "查询参数处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_查询参数处理')`,
      line: 236
    },
    {
      original: "🏗️ 嵌套路由与命名视图",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_嵌套路由与命名视图')`,
      line: 242
    },
    {
      original: "嵌套路由配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_嵌套路由配置')`,
      line: 244
    },
    {
      original: "用户 {{ $route.params.id }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_用户_route_params')`,
      line: 266
    },
    {
      original: "首页",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_首页')`,
      line: 270
    },
    {
      original: "资料",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_资料')`,
      line: 271
    },
    {
      original: "文章",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_文章')`,
      line: 272
    },
    {
      original: "嵌套路由配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_嵌套路由配置')`,
      line: 280
    },
    {
      original: "命名视图",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_命名视图')`,
      line: 283
    },
    {
      original: "命名视图",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_命名视图')`,
      line: 308
    },
    {
      original: "🛡️ 路由守卫与权限控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由守卫与权限控制')`,
      line: 314
    },
    {
      original: "全局守卫",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_全局守卫')`,
      line: 316
    },
    {
      original: "导航到:",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_导航到')`,
      line: 320
    },
    {
      original: "路由解析完成",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由解析完成')`,
      line: 350
    },
    {
      original: "全局路由守卫",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_全局路由守卫')`,
      line: 353
    },
    {
      original: "路由独享守卫",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由独享守卫')`,
      line: 356
    },
    {
      original: "路由独享守卫",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由独享守卫')`,
      line: 396
    },
    {
      original: "组件内守卫",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_组件内守卫')`,
      line: 399
    },
    {
      original: "即将进入路由",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_即将进入路由')`,
      line: 406
    },
    {
      original: "路由参数更新",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由参数更新')`,
      line: 412
    },
    {
      original: "即将离开路由",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_即将离开路由')`,
      line: 419
    },
    {
      original: "有未保存的更改，确定要离开吗？",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_有未保存的更改_确定要离开吗')`,
      line: 423
    },
    {
      original: "组件内守卫",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_组件内守卫')`,
      line: 429
    },
    {
      original: "🧭 编程式导航",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_编程式导航')`,
      line: 435
    },
    {
      original: "基本导航方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_基本导航方法')`,
      line: 437
    },
    {
      original: "编程式导航方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_编程式导航方法')`,
      line: 484
    },
    {
      original: "路由信息获取",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由信息获取')`,
      line: 487
    },
    {
      original: "路由变化:",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由变化')`,
      line: 503
    },
    {
      original: "默认标题",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_默认标题')`,
      line: 507
    },
    {
      original: "当前路径: {{ currentPath }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_当前路径_currentpath')`,
      line: 524
    },
    {
      original: "路由参数: {{ JSON.stringify(currentParams) }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由参数_json_stringify')`,
      line: 525
    },
    {
      original: "查询参数: {{ JSON.stringify(currentQuery) }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_查询参数_json_stringify')`,
      line: 526
    },
    {
      original: "路由信息获取",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\vuerouterdetail_路由信息获取')`,
      line: 534
    },
  ],
  '..\frontEnd\src\views\Technology\pages\vue\TestingDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Vue.js 测试指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_vue_js_测试指南')`,
      line: 45
    },
    {
      original: "全面掌握Vue.js应用的单元测试、集成测试和E2E测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_全面掌握vue_js应用的单元测试_集成测试和e2e测试')`,
      line: 46
    },
    {
      original: "测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_测试')`,
      line: 49
    },
    {
      original: "🛠️ 测试环境搭建",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_测试环境搭建')`,
      line: 60
    },
    {
      original: "Jest 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_jest_配置')`,
      line: 86
    },
    {
      original: "2. Vitest (推荐用于Vite项目)",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_2_vitest_推荐用于vite项目')`,
      line: 89
    },
    {
      original: "Vitest 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_vitest_配置')`,
      line: 116
    },
    {
      original: "🧪 组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_组件测试')`,
      line: 122
    },
    {
      original: "基础组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_基础组件测试')`,
      line: 124
    },
    {
      original: "计数: {{ count }}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_计数_count')`,
      line: 129
    },
    {
      original: "增加",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_增加')`,
      line: 130
    },
    {
      original: "减少",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_减少')`,
      line: 131
    },
    {
      original: "Counter组件",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_counter组件')`,
      line: 155
    },
    {
      original: "应该渲染初始计数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_应该渲染初始计数')`,
      line: 156
    },
    {
      original: "计数: 0",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_计数_0')`,
      line: 158
    },
    {
      original: "点击增加按钮应该增加计数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_点击增加按钮应该增加计数')`,
      line: 161
    },
    {
      original: "计数: 1",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_计数_1')`,
      line: 166
    },
    {
      original: "点击减少按钮应该减少计数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_点击减少按钮应该减少计数')`,
      line: 169
    },
    {
      original: "计数: -1",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_计数_1')`,
      line: 174
    },
    {
      original: "Vue 组件测试示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_vue_组件测试示例')`,
      line: 178
    },
    {
      original: "Props 和 Events 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_props_和_events')`,
      line: 181
    },
    {
      original: "编辑",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_编辑')`,
      line: 188
    },
    {
      original: "UserCard组件",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_usercard组件')`,
      line: 220
    },
    {
      original: "张三",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_张三')`,
      line: 223
    },
    {
      original: "张三",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_张三')`,
      line: 223
    },
    {
      original: "应该显示用户信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_应该显示用户信息')`,
      line: 227
    },
    {
      original: "张三",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_张三')`,
      line: 232
    },
    {
      original: "只读模式下按钮应该被禁用",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_只读模式下按钮应该被禁用')`,
      line: 236
    },
    {
      original: "点击编辑按钮应该触发edit事件",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_点击编辑按钮应该触发edit事件')`,
      line: 248
    },
    {
      original: "Props 和 Events 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_props_和_events')`,
      line: 260
    },
    {
      original: "🔧 Composables 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_composables_测试')`,
      line: 266
    },
    {
      original: "测试组合式函数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_测试组合式函数')`,
      line: 268
    },
    {
      original: "应该初始化为默认值",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_应该初始化为默认值')`,
      line: 297
    },
    {
      original: "应该初始化为指定值",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_应该初始化为指定值')`,
      line: 302
    },
    {
      original: "应该能够增加计数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_应该能够增加计数')`,
      line: 307
    },
    {
      original: "应该正确计算是否为偶数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_应该正确计算是否为偶数')`,
      line: 315
    },
    {
      original: "应该能够重置计数",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_应该能够重置计数')`,
      line: 324
    },
    {
      original: "Composables 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\testingdetail_composables_测试')`,
      line: 336
    },
  ],
  '..\frontEnd\src\views\Technology\pages\vue\SSRDetail.tsx': [
    {
      original: "Vue.js 服务端渲染 (SSR)",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_vue_js_服务端渲染')`,
      line: 47
    },
    {
      original: "掌握Vue.js服务端渲染技术，提升应用性能和SEO效果",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_掌握vue_js服务端渲染技术_提升应用性能和seo效果')`,
      line: 48
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_性能优化')`,
      line: 54
    },
    {
      original: "🌐 SSR概述与优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_ssr概述与优势')`,
      line: 62
    },
    {
      original: "什么是SSR？",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_什么是ssr')`,
      line: 64
    },
    {
      original: "服务端渲染(SSR)是指在服务器上生成完整的HTML页面，然后发送给客户端，而不是发送空白页面让JavaScript在客户端渲染",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_服务端渲染_ssr_是指在服务器上生成完整的html页面')`,
      line: 65
    },
    {
      original: "SSR vs SPA对比",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_ssr_vs_spa对比')`,
      line: 73
    },
    {
      original: "⚙️ Vue SSR手动实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_vue_ssr手动实现')`,
      line: 85
    },
    {
      original: "1. 基础SSR设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_1_基础ssr设置')`,
      line: 87
    },
    {
      original: "2. 客户端激活",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_2_客户端激活')`,
      line: 96
    },
    {
      original: "3. 构建配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_3_构建配置')`,
      line: 105
    },
    {
      original: "🚀 Nuxt.js - Vue SSR框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_nuxt_js_vue')`,
      line: 117
    },
    {
      original: "快速开始",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_快速开始')`,
      line: 119
    },
    {
      original: "页面和路由",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_页面和路由')`,
      line: 128
    },
    {
      original: "数据获取",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_数据获取')`,
      line: 137
    },
    {
      original: "⚡ SSR性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_ssr性能优化')`,
      line: 149
    },
    {
      original: "1. 缓存策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_1_缓存策略')`,
      line: 151
    },
    {
      original: "2. 代码分割优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_2_代码分割优化')`,
      line: 160
    },
    {
      original: "3. SEO优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\ssrdetail_3_seo优化')`,
      line: 169
    },
  ],
  '..\frontEnd\src\views\Technology\pages\vue\ReactivityDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Vue.js 响应式系统深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_vue_js_响应式系统深度解析')`,
      line: 45
    },
    {
      original: "深入理解Vue.js响应式原理，掌握reactive、ref、computed等核心API",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_深入理解vue_js响应式原理_掌握reactive')`,
      line: 46
    },
    {
      original: "响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_响应式')`,
      line: 49
    },
    {
      original: "⚡ 响应式原理对比",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_响应式原理对比')`,
      line: 60
    },
    {
      original: "Vue 2 vs Vue 3 响应式实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_vue_2_vs')`,
      line: 62
    },
    {
      original: "🔧 核心响应式API",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_核心响应式api')`,
      line: 74
    },
    {
      original: "1. reactive() - 深度响应式对象",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_1_reactive_深度响应式对象')`,
      line: 77
    },
    {
      original: "2. ref() - 基本类型响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_2_ref_基本类型响应式')`,
      line: 88
    },
    {
      original: "3. computed() - 计算属性",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_3_computed_计算属性')`,
      line: 99
    },
    {
      original: "🚀 高级响应式API",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_高级响应式api')`,
      line: 112
    },
    {
      original: "1. shallowReactive - 浅层响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_1_shallowreactive_浅层响应式')`,
      line: 114
    },
    {
      original: "2. readonly - 只读响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_2_readonly_只读响应式')`,
      line: 123
    },
    {
      original: "3. toRefs - 保持响应性解构",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_3_torefs_保持响应性解构')`,
      line: 132
    },
    {
      original: "✅ 响应式最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_响应式最佳实践')`,
      line: 144
    },
    {
      original: "性能优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_性能优化建议')`,
      line: 146
    },
    {
      original: "合理选择API",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_合理选择api')`,
      line: 149
    },
    {
      original: "避免不必要的响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_避免不必要的响应式')`,
      line: 152
    },
    {
      original: "浅层响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_浅层响应式')`,
      line: 155
    },
    {
      original: "计算属性缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_计算属性缓存')`,
      line: 158
    },
    {
      original: "正确解构",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\reactivitydetail_正确解构')`,
      line: 161
    },
  ],
  '..\frontEnd\src\views\Technology\pages\vue\PerformanceDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Vue.js 性能优化指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_vue_js_性能优化指南')`,
      line: 45
    },
    {
      original: "深入掌握Vue.js性能优化技巧，构建高性能的Vue应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_深入掌握vue_js性能优化技巧_构建高性能的vue应用')`,
      line: 46
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_性能优化')`,
      line: 49
    },
    {
      original: "虚拟DOM",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_虚拟dom')`,
      line: 50
    },
    {
      original: "响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_响应式')`,
      line: 51
    },
    {
      original: "代码分割",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_代码分割')`,
      line: 52
    },
    {
      original: "🚀 渲染性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_渲染性能优化')`,
      line: 60
    },
    {
      original: "1. 虚拟DOM优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_1_虚拟dom优化')`,
      line: 62
    },
    {
      original: "2. v-memo指令优化 (Vue 3.2+)",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_2_v_memo指令优化')`,
      line: 71
    },
    {
      original: "3. 条件渲染优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_3_条件渲染优化')`,
      line: 80
    },
    {
      original: "🔧 组件性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_组件性能优化')`,
      line: 92
    },
    {
      original: "1. 异步组件与代码分割",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_1_异步组件与代码分割')`,
      line: 94
    },
    {
      original: "2. KeepAlive缓存优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_2_keepalive缓存优化')`,
      line: 103
    },
    {
      original: "3. 函数式组件优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_3_函数式组件优化')`,
      line: 112
    },
    {
      original: "⚡ 响应式系统优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_响应式系统优化')`,
      line: 124
    },
    {
      original: "1. 合理选择响应式API",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_1_合理选择响应式api')`,
      line: 126
    },
    {
      original: "2. 计算属性优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_2_计算属性优化')`,
      line: 135
    },
    {
      original: "🧹 内存泄漏防护",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_内存泄漏防护')`,
      line: 147
    },
    {
      original: "内存泄漏警告",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_内存泄漏警告')`,
      line: 149
    },
    {
      original: "及时清理事件监听器、定时器和订阅，避免内存泄漏",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_及时清理事件监听器_定时器和订阅_避免内存泄漏')`,
      line: 150
    },
    {
      original: "1. 事件监听器清理",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_1_事件监听器清理')`,
      line: 158
    },
    {
      original: "2. 大列表虚拟滚动",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\performancedetail_2_大列表虚拟滚动')`,
      line: 167
    },
  ],
  '..\frontEnd\src\views\Technology\pages\vue\MigrationDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Vue 2 到 Vue 3 迁移指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_vue_2_到')`,
      line: 45
    },
    {
      original: "完整的Vue 2到Vue 3升级路径，包含破坏性变更和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_完整的vue_2到vue_3升级路径')`,
      line: 46
    },
    {
      original: "迁移",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_迁移')`,
      line: 49
    },
    {
      original: "升级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_升级')`,
      line: 51
    },
    {
      original: "破坏性变更",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_破坏性变更')`,
      line: 52
    },
    {
      original: "🚀 迁移准备工作",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_迁移准备工作')`,
      line: 60
    },
    {
      original: "迁移建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_迁移建议')`,
      line: 62
    },
    {
      original: "建议在迁移前充分测试，并考虑使用Vue 3的兼容模式进行渐进式升级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_建议在迁移前充分测试_并考虑使用vue_3的兼容模式进行渐进式升级')`,
      line: 63
    },
    {
      original: "1. 环境检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_1_环境检查')`,
      line: 71
    },
    {
      original: "2. 依赖升级",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_2_依赖升级')`,
      line: 82
    },
    {
      original: "3. 构建配置更新",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_3_构建配置更新')`,
      line: 93
    },
    {
      original: "⚡ 核心API变更",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_核心api变更')`,
      line: 106
    },
    {
      original: "1. 全局API变更",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_1_全局api变更')`,
      line: 108
    },
    {
      original: "2. 组件API迁移",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_2_组件api迁移')`,
      line: 117
    },
    {
      original: "3. 生命周期变更",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_3_生命周期变更')`,
      line: 126
    },
    {
      original: "🔧 生态系统迁移",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_生态系统迁移')`,
      line: 138
    },
    {
      original: "1. Vue Router 4迁移",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_1_vue_router')`,
      line: 140
    },
    {
      original: "2. 状态管理迁移 (Vuex to Pinia)",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_2_状态管理迁移_vuex')`,
      line: 149
    },
    {
      original: "⚠️ 重要破坏性变更",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_重要破坏性变更')`,
      line: 161
    },
    {
      original: "注意",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_注意')`,
      line: 163
    },
    {
      original: "以下变更可能导致现有代码无法正常工作，需要特别注意",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_以下变更可能导致现有代码无法正常工作_需要特别注意')`,
      line: 164
    },
    {
      original: "1. 事件总线移除",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_1_事件总线移除')`,
      line: 172
    },
    {
      original: "2. 过滤器移除",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\migrationdetail_2_过滤器移除')`,
      line: 181
    },
  ],
  '..\frontEnd\src\views\Technology\pages\vue\CompositionAPIDetail.tsx': [
    {
      original: "Composition API 深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_composition_api_深度解析')`,
      line: 47
    },
    {
      original: "Vue 3组合式API的核心概念与实践应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_vue_3组合式api的核心概念与实践应用')`,
      line: 48
    },
    {
      original: "响应式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_响应式')`,
      line: 52
    },
    {
      original: "组合式",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_组合式')`,
      line: 53
    },
    {
      original: "📚 Composition API 基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_composition_api_基础')`,
      line: 61
    },
    {
      original: "什么是Composition API？",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_什么是composition_api')`,
      line: 63
    },
    {
      original: "基本语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_基本语法')`,
      line: 69
    },
    {
      original: "🎯 核心API详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_核心api详解')`,
      line: 81
    },
    {
      original: "1. ref vs reactive 对比",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_1_ref_vs')`,
      line: 84
    },
    {
      original: "2. 可组合函数 (Composables)",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_2_可组合函数_composables')`,
      line: 95
    },
    {
      original: "3. 生命周期钩子",
      replacement: `t('common:..\frontend\src\views\technology\pages\vue\compositionapidetail_3_生命周期钩子')`,
      line: 106
    },
  ],
  '..\frontEnd\src\views\Technology\pages\typescript\UtilityTypesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "TypeScript 工具类型详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_typescript_工具类型详解')`,
      line: 45
    },
    {
      original: "掌握TypeScript内置工具类型的使用与实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_掌握typescript内置工具类型的使用与实现')`,
      line: 46
    },
    {
      original: "工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_工具类型')`,
      line: 48
    },
    {
      original: "类型操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_类型操作')`,
      line: 49
    },
    {
      original: "类型转换",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_类型转换')`,
      line: 50
    },
    {
      original: "高级类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_高级类型')`,
      line: 51
    },
    {
      original: "🛠️ 工具类型概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_工具类型概述')`,
      line: 59
    },
    {
      original: "什么是工具类型？",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_什么是工具类型')`,
      line: 61
    },
    {
      original: "常用工具类型分类",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_常用工具类型分类')`,
      line: 67
    },
    {
      original: "🔧 属性操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_属性操作')`,
      line: 70
    },
    {
      original: "🔄 类型转换",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_类型转换')`,
      line: 75
    },
    {
      original: "📝 函数相关",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_函数相关')`,
      line: 80
    },
    {
      original: "🎯 条件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_条件类型')`,
      line: 85
    },
    {
      original: "工具类型的优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_工具类型的优势')`,
      line: 91
    },
    {
      original: "工具类型提供了类型安全的方式来操作和转换类型，避免重复定义，提高代码的可维护性和复用性。",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_工具类型提供了类型安全的方式来操作和转换类型_避免重复定义_提高代码的可维护性和复用性')`,
      line: 92
    },
    {
      original: "🔧 属性操作类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_属性操作类型')`,
      line: 100
    },
    {
      original: "🔄 类型转换工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_类型转换工具')`,
      line: 138
    },
    {
      original: "NonNullable & 条件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_nonnullable_条件类型')`,
      line: 149
    },
    {
      original: "📝 函数相关工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_函数相关工具类型')`,
      line: 161
    },
    {
      original: "ConstructorParameters & 高级函数类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_constructorparameters_高级函数类型')`,
      line: 172
    },
    {
      original: "🎨 自定义工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_自定义工具类型')`,
      line: 184
    },
    {
      original: "实用自定义工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_实用自定义工具类型')`,
      line: 186
    },
    {
      original: "✅ 工具类型最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_工具类型最佳实践')`,
      line: 198
    },
    {
      original: "1. 合理选择工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_1_合理选择工具类型')`,
      line: 203
    },
    {
      original: "根据使用场景选择合适的工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_根据使用场景选择合适的工具类型')`,
      line: 204
    },
    {
      original: "更新操作使用Partial",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_更新操作使用partial')`,
      line: 206
    },
    {
      original: "API响应使用Pick/Omit",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_api响应使用pick_omit')`,
      line: 207
    },
    {
      original: "不可变数据使用Readonly",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_不可变数据使用readonly')`,
      line: 208
    },
    {
      original: "键值映射使用Record",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_键值映射使用record')`,
      line: 209
    },
    {
      original: "2. 组合使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_2_组合使用')`,
      line: 217
    },
    {
      original: "灵活组合多个工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_灵活组合多个工具类型')`,
      line: 218
    },
    {
      original: "链式组合：Partial&lt;Pick&lt;T, K&gt;&gt;",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_链式组合_partial_lt')`,
      line: 220
    },
    {
      original: "条件组合：根据条件选择类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_条件组合_根据条件选择类型')`,
      line: 221
    },
    {
      original: "递归组合：处理嵌套结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_递归组合_处理嵌套结构')`,
      line: 222
    },
    {
      original: "泛型组合：提高复用性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_泛型组合_提高复用性')`,
      line: 223
    },
    {
      original: "3. 性能考虑",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_3_性能考虑')`,
      line: 231
    },
    {
      original: "注意类型计算的性能影响",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_注意类型计算的性能影响')`,
      line: 232
    },
    {
      original: "避免过度复杂的递归类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_避免过度复杂的递归类型')`,
      line: 234
    },
    {
      original: "合理使用条件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_合理使用条件类型')`,
      line: 235
    },
    {
      original: "缓存复杂类型计算结果",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_缓存复杂类型计算结果')`,
      line: 236
    },
    {
      original: "监控编译时间",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_监控编译时间')`,
      line: 237
    },
    {
      original: "4. 可读性维护",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_4_可读性维护')`,
      line: 245
    },
    {
      original: "保持类型定义的可读性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_保持类型定义的可读性')`,
      line: 246
    },
    {
      original: "使用有意义的类型别名",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_使用有意义的类型别名')`,
      line: 248
    },
    {
      original: "添加类型注释说明",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_添加类型注释说明')`,
      line: 249
    },
    {
      original: "分解复杂的类型定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_分解复杂的类型定义')`,
      line: 250
    },
    {
      original: "建立类型文档",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\utilitytypesdetail_建立类型文档')`,
      line: 251
    },
  ],
  '..\frontEnd\src\views\Technology\pages\typescript\ReactTypeScriptDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "React + TypeScript 详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_react_typescript_详解')`,
      line: 45
    },
    {
      original: "掌握React与TypeScript的完美结合",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_掌握react与typescript的完美结合')`,
      line: 46
    },
    {
      original: "组件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_组件类型')`,
      line: 50
    },
    {
      original: "Hooks类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_hooks类型')`,
      line: 51
    },
    {
      original: "⚛️ React TypeScript 基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_react_typescript_基础')`,
      line: 59
    },
    {
      original: "为什么使用React + TypeScript？",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_为什么使用react_typescript')`,
      line: 61
    },
    {
      original: "核心优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_核心优势')`,
      line: 66
    },
    {
      original: "🛡️ 类型安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_类型安全')`,
      line: 69
    },
    {
      original: "编译时错误检查，减少运行时错误",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_编译时错误检查_减少运行时错误')`,
      line: 70
    },
    {
      original: "🔍 智能提示",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_智能提示')`,
      line: 74
    },
    {
      original: "IDE提供更好的自动完成和重构支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_ide提供更好的自动完成和重构支持')`,
      line: 75
    },
    {
      original: "📚 自文档化",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_自文档化')`,
      line: 79
    },
    {
      original: "类型定义即文档，提高代码可读性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_类型定义即文档_提高代码可读性')`,
      line: 80
    },
    {
      original: "🔧 重构友好",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_重构友好')`,
      line: 84
    },
    {
      original: "安全的重构操作，减少破坏性变更",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_安全的重构操作_减少破坏性变更')`,
      line: 85
    },
    {
      original: "项目配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_项目配置')`,
      line: 89
    },
    {
      original: "🧩 组件类型定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_组件类型定义')`,
      line: 101
    },
    {
      original: "1. 函数组件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_1_函数组件类型')`,
      line: 104
    },
    {
      original: "2. Props类型进阶",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_2_props类型进阶')`,
      line: 115
    },
    {
      original: "3. 类组件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_3_类组件类型')`,
      line: 126
    },
    {
      original: "🎣 Hooks 类型定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_hooks_类型定义')`,
      line: 139
    },
    {
      original: "基础Hooks类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_基础hooks类型')`,
      line: 141
    },
    {
      original: "自定义Hooks类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_自定义hooks类型')`,
      line: 150
    },
    {
      original: "🎯 事件处理类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_事件处理类型')`,
      line: 162
    },
    {
      original: "常用事件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_常用事件类型')`,
      line: 164
    },
    {
      original: "自定义事件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_自定义事件类型')`,
      line: 173
    },
    {
      original: "✅ React TypeScript 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_react_typescript_最佳实践')`,
      line: 185
    },
    {
      original: "1. 组件设计",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_1_组件设计')`,
      line: 190
    },
    {
      original: "设计类型安全的React组件",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_设计类型安全的react组件')`,
      line: 191
    },
    {
      original: "优先使用函数组件和Hooks",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_优先使用函数组件和hooks')`,
      line: 193
    },
    {
      original: "明确定义Props接口",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_明确定义props接口')`,
      line: 194
    },
    {
      original: "使用泛型提高组件复用性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_使用泛型提高组件复用性')`,
      line: 195
    },
    {
      original: "合理使用React.FC类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_合理使用react_fc类型')`,
      line: 196
    },
    {
      original: "2. 类型定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_2_类型定义')`,
      line: 204
    },
    {
      original: "建立清晰的类型体系",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_建立清晰的类型体系')`,
      line: 205
    },
    {
      original: "分离类型定义文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_分离类型定义文件')`,
      line: 207
    },
    {
      original: "使用联合类型和字面量类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_使用联合类型和字面量类型')`,
      line: 208
    },
    {
      original: "避免使用any类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_避免使用any类型')`,
      line: 209
    },
    {
      original: "合理使用类型断言",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_合理使用类型断言')`,
      line: 210
    },
    {
      original: "3. Hooks使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_3_hooks使用')`,
      line: 218
    },
    {
      original: "类型安全的Hooks使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_类型安全的hooks使用')`,
      line: 219
    },
    {
      original: "明确useState的初始值类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_明确usestate的初始值类型')`,
      line: 221
    },
    {
      original: "正确类型化useRef",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_正确类型化useref')`,
      line: 222
    },
    {
      original: "为自定义Hooks定义返回类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_为自定义hooks定义返回类型')`,
      line: 223
    },
    {
      original: "使用useCallback和useMemo优化性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_使用usecallback和usememo优化性能')`,
      line: 224
    },
    {
      original: "4. 开发工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_4_开发工具')`,
      line: 232
    },
    {
      original: "充分利用TypeScript工具链",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_充分利用typescript工具链')`,
      line: 233
    },
    {
      original: "配置严格的TypeScript规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_配置严格的typescript规则')`,
      line: 235
    },
    {
      original: "使用ESLint TypeScript规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_使用eslint_typescript规则')`,
      line: 236
    },
    {
      original: "集成类型检查到CI/CD",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_集成类型检查到ci_cd')`,
      line: 237
    },
    {
      original: "使用React DevTools",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\reacttypescriptdetail_使用react_devtools')`,
      line: 238
    },
  ],
  '..\frontEnd\src\views\Technology\pages\typescript\ModulesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "TypeScript 模块系统详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_typescript_模块系统详解')`,
      line: 45
    },
    {
      original: "掌握TypeScript模块化开发与代码组织",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_掌握typescript模块化开发与代码组织')`,
      line: 46
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_模块系统')`,
      line: 48
    },
    {
      original: "命名空间",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_命名空间')`,
      line: 51
    },
    {
      original: "📦 TypeScript 模块基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_typescript_模块基础')`,
      line: 59
    },
    {
      original: "什么是模块？",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_什么是模块')`,
      line: 61
    },
    {
      original: "模块系统对比",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_模块系统对比')`,
      line: 66
    },
    {
      original: "现代标准",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_现代标准')`,
      line: 71
    },
    {
      original: "✅ 优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_优势')`,
      line: 75
    },
    {
      original: "静态分析，支持Tree Shaking",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_静态分析_支持tree_shaking')`,
      line: 77
    },
    {
      original: "异步加载支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_异步加载支持')`,
      line: 78
    },
    {
      original: "现代浏览器原生支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_现代浏览器原生支持')`,
      line: 79
    },
    {
      original: "更好的TypeScript集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_更好的typescript集成')`,
      line: 80
    },
    {
      original: "Node.js标准",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_node_js标准')`,
      line: 89
    },
    {
      original: "✅ 优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_优势')`,
      line: 93
    },
    {
      original: "Node.js原生支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_node_js原生支持')`,
      line: 95
    },
    {
      original: "同步加载，简单直接",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_同步加载_简单直接')`,
      line: 96
    },
    {
      original: "广泛的生态支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_广泛的生态支持')`,
      line: 97
    },
    {
      original: "❌ 劣势",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_劣势')`,
      line: 101
    },
    {
      original: "不支持静态分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_不支持静态分析')`,
      line: 103
    },
    {
      original: "浏览器需要打包工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_浏览器需要打包工具')`,
      line: 104
    },
    {
      original: "同步加载影响性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_同步加载影响性能')`,
      line: 105
    },
    {
      original: "推荐使用ES Modules",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_推荐使用es_modules')`,
      line: 113
    },
    {
      original: "在新项目中推荐使用ES Modules，它是JavaScript的官方标准，具有更好的性能和工具支持。",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_在新项目中推荐使用es_modules_它是javascript的官方标准')`,
      line: 114
    },
    {
      original: "🎯 ES Modules 详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_es_modules_详解')`,
      line: 122
    },
    {
      original: "1. 基本导出与导入",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_1_基本导出与导入')`,
      line: 125
    },
    {
      original: "2. 高级导出模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_2_高级导出模式')`,
      line: 136
    },
    {
      original: "3. 动态导入",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_3_动态导入')`,
      line: 147
    },
    {
      original: "🔍 模块解析策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_模块解析策略')`,
      line: 160
    },
    {
      original: "TypeScript模块解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_typescript模块解析')`,
      line: 162
    },
    {
      original: "声明文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_声明文件')`,
      line: 171
    },
    {
      original: "🏷️ 命名空间与模块",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_命名空间与模块')`,
      line: 183
    },
    {
      original: "命名空间基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_命名空间基础')`,
      line: 185
    },
    {
      original: "模块 vs 命名空间",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_模块_vs_命名空间')`,
      line: 194
    },
    {
      original: "✅ 模块系统最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_模块系统最佳实践')`,
      line: 206
    },
    {
      original: "1. 模块组织",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_1_模块组织')`,
      line: 211
    },
    {
      original: "合理组织模块结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_合理组织模块结构')`,
      line: 212
    },
    {
      original: "使用ES Modules作为首选",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_使用es_modules作为首选')`,
      line: 214
    },
    {
      original: "保持模块职责单一",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_保持模块职责单一')`,
      line: 215
    },
    {
      original: "避免循环依赖",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_避免循环依赖')`,
      line: 216
    },
    {
      original: "使用路径映射简化导入",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_使用路径映射简化导入')`,
      line: 217
    },
    {
      original: "2. 导出策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_2_导出策略')`,
      line: 225
    },
    {
      original: "选择合适的导出方式",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_选择合适的导出方式')`,
      line: 226
    },
    {
      original: "优先使用命名导出",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_优先使用命名导出')`,
      line: 228
    },
    {
      original: "默认导出用于主要功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_默认导出用于主要功能')`,
      line: 229
    },
    {
      original: "避免混合导出模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_避免混合导出模式')`,
      line: 230
    },
    {
      original: "保持导出接口稳定",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_保持导出接口稳定')`,
      line: 231
    },
    {
      original: "3. 类型管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_3_类型管理')`,
      line: 239
    },
    {
      original: "有效管理类型定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_有效管理类型定义')`,
      line: 240
    },
    {
      original: "分离类型定义文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_分离类型定义文件')`,
      line: 242
    },
    {
      original: "使用类型导出",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_使用类型导出')`,
      line: 243
    },
    {
      original: "避免类型污染",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_避免类型污染')`,
      line: 244
    },
    {
      original: "合理使用声明合并",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_合理使用声明合并')`,
      line: 245
    },
    {
      original: "4. 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_4_性能优化')`,
      line: 253
    },
    {
      original: "优化模块加载性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_优化模块加载性能')`,
      line: 254
    },
    {
      original: "使用动态导入实现懒加载",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_使用动态导入实现懒加载')`,
      line: 256
    },
    {
      original: "避免不必要的依赖",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_避免不必要的依赖')`,
      line: 257
    },
    {
      original: "利用Tree Shaking",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_利用tree_shaking')`,
      line: 258
    },
    {
      original: "合理配置模块解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\modulesdetail_合理配置模块解析')`,
      line: 259
    },
  ],
  '..\frontEnd\src\views\Technology\pages\typescript\GenericsDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "TypeScript 泛型编程",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_typescript_泛型编程')`,
      line: 45
    },
    {
      original: "掌握泛型的使用技巧与实际应用场景，编写更灵活的类型安全代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_掌握泛型的使用技巧与实际应用场景_编写更灵活的类型安全代码')`,
      line: 46
    },
    {
      original: "泛型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_泛型')`,
      line: 49
    },
    {
      original: "类型编程",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_类型编程')`,
      line: 50
    },
    {
      original: "代码复用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_代码复用')`,
      line: 51
    },
    {
      original: "📚 泛型基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_泛型基础概念')`,
      line: 59
    },
    {
      original: "什么是泛型？",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_什么是泛型')`,
      line: 61
    },
    {
      original: "基本语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_基本语法')`,
      line: 66
    },
    {
      original: "🔗 泛型约束",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_泛型约束')`,
      line: 78
    },
    {
      original: "1. extends 约束",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_1_extends_约束')`,
      line: 81
    },
    {
      original: "2. 条件约束",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_2_条件约束')`,
      line: 94
    },
    {
      original: "🏗️ 泛型接口与类",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_泛型接口与类')`,
      line: 107
    },
    {
      original: "泛型接口",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_泛型接口')`,
      line: 109
    },
    {
      original: "泛型类",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_泛型类')`,
      line: 118
    },
    {
      original: "🚀 高级泛型模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_高级泛型模式')`,
      line: 130
    },
    {
      original: "1. 泛型工厂模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_1_泛型工厂模式')`,
      line: 132
    },
    {
      original: "2. 泛型装饰器模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_2_泛型装饰器模式')`,
      line: 141
    },
    {
      original: "3. 泛型Builder模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_3_泛型builder模式')`,
      line: 150
    },
    {
      original: "💡 实际应用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_实际应用场景')`,
      line: 162
    },
    {
      original: "1. API响应类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_1_api响应类型')`,
      line: 164
    },
    {
      original: "2. 状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_2_状态管理')`,
      line: 173
    },
    {
      original: "✅ 泛型最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_泛型最佳实践')`,
      line: 185
    },
    {
      original: "1. 合理命名泛型参数",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_1_合理命名泛型参数')`,
      line: 190
    },
    {
      original: "使用有意义的泛型参数名称",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_使用有意义的泛型参数名称')`,
      line: 191
    },
    {
      original: "2. 避免过度泛型化",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_2_避免过度泛型化')`,
      line: 205
    },
    {
      original: "只在需要类型复用时使用泛型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_只在需要类型复用时使用泛型')`,
      line: 206
    },
    {
      original: "3. 提供默认类型参数",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_3_提供默认类型参数')`,
      line: 220
    },
    {
      original: "为泛型参数提供合理的默认值",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\genericsdetail_为泛型参数提供合理的默认值')`,
      line: 221
    },
  ],
  '..\frontEnd\src\views\Technology\pages\typescript\DecoratorsDetail.tsx': [
    {
      original: "TypeScript 装饰器详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_typescript_装饰器详解')`,
      line: 45
    },
    {
      original: "掌握TypeScript装饰器的使用与实现原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_掌握typescript装饰器的使用与实现原理')`,
      line: 46
    },
    {
      original: "元编程",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_元编程')`,
      line: 49
    },
    {
      original: "注解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_注解')`,
      line: 50
    },
    {
      original: "反射",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_反射')`,
      line: 51
    },
    {
      original: "✨ 装饰器基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_装饰器基础概念')`,
      line: 59
    },
    {
      original: "什么是装饰器？",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_什么是装饰器')`,
      line: 61
    },
    {
      original: "实验性功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_实验性功能')`,
      line: 67
    },
    {
      original: "装饰器目前是TypeScript的实验性功能，需要在tsconfig.json中启用experimentalDecorators选项。",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_装饰器目前是typescript的实验性功能_需要在tsconfig_json中启用experimentaldecorators选项')`,
      line: 68
    },
    {
      original: "启用装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_启用装饰器')`,
      line: 73
    },
    {
      original: "装饰器类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_装饰器类型')`,
      line: 82
    },
    {
      original: "🏛️ 类装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_类装饰器')`,
      line: 85
    },
    {
      original: "应用于类构造函数，用于观察、修改或替换类定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_应用于类构造函数_用于观察_修改或替换类定义')`,
      line: 86
    },
    {
      original: "⚡ 方法装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_方法装饰器')`,
      line: 90
    },
    {
      original: "应用于方法的属性描述符，用于观察、修改或替换方法定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_应用于方法的属性描述符_用于观察_修改或替换方法定义')`,
      line: 91
    },
    {
      original: "🔍 访问器装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_访问器装饰器')`,
      line: 95
    },
    {
      original: "应用于访问器的属性描述符",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_应用于访问器的属性描述符')`,
      line: 96
    },
    {
      original: "📝 属性装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_属性装饰器')`,
      line: 100
    },
    {
      original: "应用于属性声明",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_应用于属性声明')`,
      line: 101
    },
    {
      original: "📋 参数装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_参数装饰器')`,
      line: 105
    },
    {
      original: "应用于函数参数",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_应用于函数参数')`,
      line: 106
    },
    {
      original: "🏛️ 类装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_类装饰器')`,
      line: 113
    },
    {
      original: "1. 基本类装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_1_基本类装饰器')`,
      line: 116
    },
    {
      original: "2. 装饰器工厂",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_2_装饰器工厂')`,
      line: 127
    },
    {
      original: "3. 实用类装饰器示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_3_实用类装饰器示例')`,
      line: 138
    },
    {
      original: "⚡ 方法装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_方法装饰器')`,
      line: 151
    },
    {
      original: "方法装饰器基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_方法装饰器基础')`,
      line: 153
    },
    {
      original: "高级方法装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_高级方法装饰器')`,
      line: 162
    },
    {
      original: "📝 属性与参数装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_属性与参数装饰器')`,
      line: 174
    },
    {
      original: "属性装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_属性装饰器')`,
      line: 176
    },
    {
      original: "参数装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_参数装饰器')`,
      line: 185
    },
    {
      original: "🛠️ 装饰器实际应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_装饰器实际应用')`,
      line: 197
    },
    {
      original: "依赖注入系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_依赖注入系统')`,
      line: 199
    },
    {
      original: "API路由装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_api路由装饰器')`,
      line: 208
    },
    {
      original: "✅ 装饰器最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_装饰器最佳实践')`,
      line: 220
    },
    {
      original: "1. 设计原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_1_设计原则')`,
      line: 225
    },
    {
      original: "遵循装饰器设计的最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_遵循装饰器设计的最佳实践')`,
      line: 226
    },
    {
      original: "保持装饰器的单一职责",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_保持装饰器的单一职责')`,
      line: 228
    },
    {
      original: "避免在装饰器中修改原始类的结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_避免在装饰器中修改原始类的结构')`,
      line: 229
    },
    {
      original: "使用装饰器工厂提供配置选项",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_使用装饰器工厂提供配置选项')`,
      line: 230
    },
    {
      original: "确保装饰器的可组合性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_确保装饰器的可组合性')`,
      line: 231
    },
    {
      original: "2. 性能考虑",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_2_性能考虑')`,
      line: 239
    },
    {
      original: "注意装饰器对性能的影响",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_注意装饰器对性能的影响')`,
      line: 240
    },
    {
      original: "避免在装饰器中进行重复的计算",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_避免在装饰器中进行重复的计算')`,
      line: 242
    },
    {
      original: "合理使用缓存机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_合理使用缓存机制')`,
      line: 243
    },
    {
      original: "注意装饰器的执行顺序",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_注意装饰器的执行顺序')`,
      line: 244
    },
    {
      original: "避免过度使用装饰器",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_避免过度使用装饰器')`,
      line: 245
    },
    {
      original: "3. 类型安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_3_类型安全')`,
      line: 253
    },
    {
      original: "确保装饰器的类型安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_确保装饰器的类型安全')`,
      line: 254
    },
    {
      original: "为装饰器参数提供正确的类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_为装饰器参数提供正确的类型')`,
      line: 256
    },
    {
      original: "使用泛型约束确保类型安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_使用泛型约束确保类型安全')`,
      line: 257
    },
    {
      original: "提供清晰的类型定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_提供清晰的类型定义')`,
      line: 258
    },
    {
      original: "避免使用any类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_避免使用any类型')`,
      line: 259
    },
    {
      original: "4. 调试和测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_4_调试和测试')`,
      line: 267
    },
    {
      original: "确保装饰器的可调试性和可测试性",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_确保装饰器的可调试性和可测试性')`,
      line: 268
    },
    {
      original: "提供清晰的错误信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_提供清晰的错误信息')`,
      line: 270
    },
    {
      original: "编写装饰器的单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_编写装饰器的单元测试')`,
      line: 271
    },
    {
      original: "使用适当的日志记录",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_使用适当的日志记录')`,
      line: 272
    },
    {
      original: "文档化装饰器的行为",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\decoratorsdetail_文档化装饰器的行为')`,
      line: 273
    },
  ],
  '..\frontEnd\src\views\Technology\pages\typescript\ConfigurationDetail.tsx': [
    {
      original: "TypeScript 配置与工具链详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_typescript_配置与工具链详解')`,
      line: 45
    },
    {
      original: "掌握TypeScript项目配置与开发工具链",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_掌握typescript项目配置与开发工具链')`,
      line: 46
    },
    {
      original: "编译配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_编译配置')`,
      line: 49
    },
    {
      original: "开发工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_开发工具')`,
      line: 50
    },
    {
      original: "构建优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_构建优化')`,
      line: 51
    },
    {
      original: "⚙️ tsconfig.json 配置详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_tsconfig_json_配置详解')`,
      line: 59
    },
    {
      original: "配置文件结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_配置文件结构')`,
      line: 61
    },
    {
      original: "基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_基础配置')`,
      line: 66
    },
    {
      original: "🔧 编译选项详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_编译选项详解')`,
      line: 78
    },
    {
      original: "1. 目标与模块配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_1_目标与模块配置')`,
      line: 81
    },
    {
      original: "2. 严格模式配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_2_严格模式配置')`,
      line: 92
    },
    {
      original: "3. 模块解析配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_3_模块解析配置')`,
      line: 103
    },
    {
      original: "4. 输出配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_4_输出配置')`,
      line: 114
    },
    {
      original: "5. 高级选项",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_5_高级选项')`,
      line: 125
    },
    {
      original: "📁 项目配置策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_项目配置策略')`,
      line: 138
    },
    {
      original: "多项目配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_多项目配置')`,
      line: 140
    },
    {
      original: "环境特定配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_环境特定配置')`,
      line: 149
    },
    {
      original: "🛠️ 开发工具集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_开发工具集成')`,
      line: 161
    },
    {
      original: "VS Code配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_vs_code配置')`,
      line: 163
    },
    {
      original: "ESLint集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_eslint集成')`,
      line: 172
    },
    {
      original: "构建工具集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_构建工具集成')`,
      line: 181
    },
    {
      original: "✅ 配置最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_配置最佳实践')`,
      line: 193
    },
    {
      original: "1. 配置管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_1_配置管理')`,
      line: 198
    },
    {
      original: "合理组织TypeScript配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_合理组织typescript配置')`,
      line: 199
    },
    {
      original: "使用extends继承基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_使用extends继承基础配置')`,
      line: 201
    },
    {
      original: "为不同环境创建专门配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_为不同环境创建专门配置')`,
      line: 202
    },
    {
      original: "启用严格模式提高代码质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_启用严格模式提高代码质量')`,
      line: 203
    },
    {
      original: "合理配置路径映射",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_合理配置路径映射')`,
      line: 204
    },
    {
      original: "2. 编译优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_2_编译优化')`,
      line: 212
    },
    {
      original: "优化TypeScript编译性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_优化typescript编译性能')`,
      line: 213
    },
    {
      original: "启用增量编译",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_启用增量编译')`,
      line: 215
    },
    {
      original: "使用项目引用管理大型项目",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_使用项目引用管理大型项目')`,
      line: 216
    },
    {
      original: "合理配置include和exclude",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_合理配置include和exclude')`,
      line: 217
    },
    {
      original: "跳过不必要的库文件检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_跳过不必要的库文件检查')`,
      line: 218
    },
    {
      original: "3. 工具集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_3_工具集成')`,
      line: 226
    },
    {
      original: "充分利用开发工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_充分利用开发工具')`,
      line: 227
    },
    {
      original: "配置IDE获得最佳开发体验",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_配置ide获得最佳开发体验')`,
      line: 229
    },
    {
      original: "集成ESLint进行代码检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_集成eslint进行代码检查')`,
      line: 230
    },
    {
      original: "使用Prettier统一代码格式",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_使用prettier统一代码格式')`,
      line: 231
    },
    {
      original: "配置自动化构建流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_配置自动化构建流程')`,
      line: 232
    },
    {
      original: "4. 团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_4_团队协作')`,
      line: 240
    },
    {
      original: "建立团队开发规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_建立团队开发规范')`,
      line: 241
    },
    {
      original: "统一团队TypeScript配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_统一团队typescript配置')`,
      line: 243
    },
    {
      original: "建立代码审查流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_建立代码审查流程')`,
      line: 244
    },
    {
      original: "文档化配置选择原因",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_文档化配置选择原因')`,
      line: 245
    },
    {
      original: "定期更新工具链版本",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\configurationdetail_定期更新工具链版本')`,
      line: 246
    },
  ],
  '..\frontEnd\src\views\Technology\pages\typescript\BasicTypesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "TypeScript 基础类型系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_typescript_基础类型系统')`,
      line: 45
    },
    {
      original: "掌握TypeScript的基础类型，构建类型安全的JavaScript应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_掌握typescript的基础类型_构建类型安全的javascript应用')`,
      line: 46
    },
    {
      original: "类型系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_类型系统')`,
      line: 49
    },
    {
      original: "基础类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_基础类型')`,
      line: 50
    },
    {
      original: "类型注解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_类型注解')`,
      line: 51
    },
    {
      original: "类型推断",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_类型推断')`,
      line: 52
    },
    {
      original: "🔤 基础类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_基础类型')`,
      line: 60
    },
    {
      original: "原始类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_原始类型')`,
      line: 62
    },
    {
      original: "特殊类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_特殊类型')`,
      line: 71
    },
    {
      original: "📦 复合类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_复合类型')`,
      line: 83
    },
    {
      original: "数组类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_数组类型')`,
      line: 86
    },
    {
      original: "元组类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_元组类型')`,
      line: 97
    },
    {
      original: "🏗️ 对象类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_对象类型')`,
      line: 110
    },
    {
      original: "对象类型注解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_对象类型注解')`,
      line: 112
    },
    {
      original: "接口定义",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_接口定义')`,
      line: 121
    },
    {
      original: "⚡ 函数类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_函数类型')`,
      line: 133
    },
    {
      original: "函数类型注解",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_函数类型注解')`,
      line: 135
    },
    {
      original: "🔧 类型操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_类型操作')`,
      line: 147
    },
    {
      original: "类型断言",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_类型断言')`,
      line: 149
    },
    {
      original: "联合类型和交叉类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\basictypesdetail_联合类型和交叉类型')`,
      line: 158
    },
  ],
  '..\frontEnd\src\views\Technology\pages\typescript\AdvancedTypesDetail.tsx': [
    {
      original: "TypeScript 高级类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_typescript_高级类型')`,
      line: 40
    },
    {
      original: "掌握TypeScript的高级类型系统，提升类型编程能力",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_掌握typescript的高级类型系统_提升类型编程能力')`,
      line: 41
    },
    {
      original: "高级类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_高级类型')`,
      line: 44
    },
    {
      original: "类型编程",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_类型编程')`,
      line: 45
    },
    {
      original: "类型安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_类型安全')`,
      line: 46
    },
    {
      original: "🔗 联合类型与交叉类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_联合类型与交叉类型')`,
      line: 54
    },
    {
      original: "联合类型 (Union Types)",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_联合类型_union_types')`,
      line: 56
    },
    {
      original: "联合类型表示一个值可以是几种类型之一，使用 | 分隔每个类型。",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_联合类型表示一个值可以是几种类型之一_使用_分隔每个类型')`,
      line: 57
    },
    {
      original: "交叉类型 (Intersection Types)",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_交叉类型_intersection_types')`,
      line: 67
    },
    {
      original: "交叉类型将多个类型合并为一个类型，使用 & 连接。",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_交叉类型将多个类型合并为一个类型_使用_连接')`,
      line: 68
    },
    {
      original: "🎯 条件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_条件类型')`,
      line: 81
    },
    {
      original: "基本条件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_基本条件类型')`,
      line: 84
    },
    {
      original: "分布式条件类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_分布式条件类型')`,
      line: 95
    },
    {
      original: "🗺️ 映射类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_映射类型')`,
      line: 108
    },
    {
      original: "基本映射类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_基本映射类型')`,
      line: 110
    },
    {
      original: "高级映射类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_高级映射类型')`,
      line: 119
    },
    {
      original: "📝 模板字面量类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_模板字面量类型')`,
      line: 131
    },
    {
      original: "模板字面量类型 (Template Literal Types)",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_模板字面量类型_template_literal')`,
      line: 133
    },
    {
      original: "✅ 高级类型最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_高级类型最佳实践')`,
      line: 145
    },
    {
      original: "1. 类型守卫 (Type Guards)",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_1_类型守卫_type')`,
      line: 150
    },
    {
      original: "使用类型守卫来缩小联合类型的范围",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_使用类型守卫来缩小联合类型的范围')`,
      line: 151
    },
    {
      original: "2. 工具类型的组合使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_2_工具类型的组合使用')`,
      line: 165
    },
    {
      original: "组合多个工具类型来创建复杂的类型转换",
      replacement: `t('common:..\frontend\src\views\technology\pages\typescript\advancedtypesdetail_组合多个工具类型来创建复杂的类型转换')`,
      line: 166
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\WebpackDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "学习现代前端构建工具Webpack的配置和优化技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_学习现代前端构建工具webpack的配置和优化技巧')`,
      line: 38
    },
    {
      original: "📋 Webpack 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_webpack_概述')`,
      line: 43
    },
    {
      original: "什么是 Webpack",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_什么是_webpack')`,
      line: 45
    },
    {
      original: "核心概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_核心概念')`,
      line: 52
    },
    {
      original: "Entry（入口）",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_entry_入口')`,
      line: 54
    },
    {
      original: "Output（输出）",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_output_输出')`,
      line: 55
    },
    {
      original: "Loaders（加载器）",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_loaders_加载器')`,
      line: 56
    },
    {
      original: "Plugins（插件）",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_plugins_插件')`,
      line: 57
    },
    {
      original: "Mode（模式）",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_mode_模式')`,
      line: 58
    },
    {
      original: "主要优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_主要优势')`,
      line: 61
    },
    {
      original: "模块化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_模块化')`,
      line: 64
    },
    {
      original: "代码分割",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_代码分割')`,
      line: 67
    },
    {
      original: "资源处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_资源处理')`,
      line: 70
    },
    {
      original: "开发体验",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_开发体验')`,
      line: 73
    },
    {
      original: "生产优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_生产优化')`,
      line: 76
    },
    {
      original: "⚙️ 基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_基础配置')`,
      line: 83
    },
    {
      original: "基本配置文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_基本配置文件')`,
      line: 85
    },
    {
      original: "🔄 加载器 (Loaders)",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_加载器_loaders')`,
      line: 97
    },
    {
      original: "常用加载器配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_常用加载器配置')`,
      line: 99
    },
    {
      original: "🔌 插件 (Plugins)",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_插件_plugins')`,
      line: 111
    },
    {
      original: "常用插件配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_常用插件配置')`,
      line: 113
    },
    {
      original: "🚀 优化配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_优化配置')`,
      line: 125
    },
    {
      original: "代码分割与压缩",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_代码分割与压缩')`,
      line: 127
    },
    {
      original: "🛠️ 开发服务器",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_开发服务器')`,
      line: 139
    },
    {
      original: "DevServer 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_devserver_配置')`,
      line: 141
    },
    {
      original: "🎯 多入口配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_多入口配置')`,
      line: 153
    },
    {
      original: "多页面应用配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_多页面应用配置')`,
      line: 155
    },
    {
      original: "🏭 生产环境配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_生产环境配置')`,
      line: 167
    },
    {
      original: "生产环境优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_生产环境优化')`,
      line: 169
    },
    {
      original: "⚡ 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_性能优化')`,
      line: 181
    },
    {
      original: "性能优化技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_性能优化技巧')`,
      line: 183
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_最佳实践')`,
      line: 195
    },
    {
      original: "Webpack 配置建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_webpack_配置建议')`,
      line: 198
    },
    {
      original: "根据环境分离配置文件（开发/生产）",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_根据环境分离配置文件_开发_生产')`,
      line: 201
    },
    {
      original: "合理使用代码分割减少包体积",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_合理使用代码分割减少包体积')`,
      line: 202
    },
    {
      original: "启用缓存提高构建速度",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_启用缓存提高构建速度')`,
      line: 203
    },
    {
      original: "使用 Tree Shaking 移除无用代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_使用_tree_shaking')`,
      line: 204
    },
    {
      original: "配置合适的 source map",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_配置合适的_source_map')`,
      line: 205
    },
    {
      original: "监控 bundle 大小和性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_监控_bundle_大小和性能')`,
      line: 206
    },
    {
      original: "常见问题解决",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_常见问题解决')`,
      line: 216
    },
    {
      original: "构建速度慢",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_构建速度慢')`,
      line: 220
    },
    {
      original: "包体积大",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_包体积大')`,
      line: 223
    },
    {
      original: "热更新失效",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_热更新失效')`,
      line: 226
    },
    {
      original: "内存溢出",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_内存溢出')`,
      line: 229
    },
    {
      original: "路径问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\webpackdetail_路径问题')`,
      line: 232
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\VSCodeDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_加载失败_error')`,
      line: 22
    },
    {
      original: "掌握VSCode的高级功能和配置，提升开发效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_掌握vscode的高级功能和配置_提升开发效率')`,
      line: 38
    },
    {
      original: "📋 VSCode 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_vscode_概述')`,
      line: 43
    },
    {
      original: "为什么选择 VSCode",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_为什么选择_vscode')`,
      line: 45
    },
    {
      original: "主要特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_主要特性')`,
      line: 51
    },
    {
      original: "智能代码补全",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_智能代码补全')`,
      line: 54
    },
    {
      original: "内置调试器",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_内置调试器')`,
      line: 57
    },
    {
      original: "Git 集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_git_集成')`,
      line: 60
    },
    {
      original: "丰富的扩展",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_丰富的扩展')`,
      line: 63
    },
    {
      original: "多平台支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_多平台支持')`,
      line: 66
    },
    {
      original: "高度可定制",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_高度可定制')`,
      line: 69
    },
    {
      original: "⚙️ 基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_基础配置')`,
      line: 76
    },
    {
      original: "用户设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_用户设置')`,
      line: 78
    },
    {
      original: "工作区设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_工作区设置')`,
      line: 87
    },
    {
      original: "⌨️ 快捷键",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_快捷键')`,
      line: 99
    },
    {
      original: "常用快捷键",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_常用快捷键')`,
      line: 101
    },
    {
      original: "📝 代码片段",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_代码片段')`,
      line: 113
    },
    {
      original: "自定义代码片段",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_自定义代码片段')`,
      line: 115
    },
    {
      original: "代码片段变量",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_代码片段变量')`,
      line: 124
    },
    {
      original: "🐛 调试配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_调试配置')`,
      line: 136
    },
    {
      original: "Launch.json 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_launch_json_配置')`,
      line: 138
    },
    {
      original: "🚀 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_性能优化')`,
      line: 150
    },
    {
      original: "性能优化设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_性能优化设置')`,
      line: 152
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_最佳实践')`,
      line: 164
    },
    {
      original: "VSCode 使用技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_vscode_使用技巧')`,
      line: 167
    },
    {
      original: "合理配置工作区设置，提升团队协作效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_合理配置工作区设置_提升团队协作效率')`,
      line: 170
    },
    {
      original: "使用代码片段提高编码速度",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_使用代码片段提高编码速度')`,
      line: 171
    },
    {
      original: "掌握多光标编辑技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_掌握多光标编辑技巧')`,
      line: 172
    },
    {
      original: "善用命令面板和快捷键",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_善用命令面板和快捷键')`,
      line: 173
    },
    {
      original: "配置合适的主题和字体",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_配置合适的主题和字体')`,
      line: 174
    },
    {
      original: "定期清理不必要的扩展",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_定期清理不必要的扩展')`,
      line: 175
    },
    {
      original: "推荐扩展",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vscodedetail_推荐扩展')`,
      line: 185
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\ViteDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_加载失败_error')`,
      line: 22
    },
    {
      original: "下一代前端构建工具，极速的开发体验",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_下一代前端构建工具_极速的开发体验')`,
      line: 38
    },
    {
      original: "📋 Vite 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_vite_概述')`,
      line: 43
    },
    {
      original: "什么是 Vite",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_什么是_vite')`,
      line: 45
    },
    {
      original: "核心特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_核心特性')`,
      line: 52
    },
    {
      original: "极速冷启动",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_极速冷启动')`,
      line: 54
    },
    {
      original: "即时热更新",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_即时热更新')`,
      line: 55
    },
    {
      original: "真正的按需编译",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_真正的按需编译')`,
      line: 56
    },
    {
      original: "丰富的插件生态",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_丰富的插件生态')`,
      line: 57
    },
    {
      original: "优化的构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_优化的构建')`,
      line: 58
    },
    {
      original: "主要优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_主要优势')`,
      line: 61
    },
    {
      original: "开发速度",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_开发速度')`,
      line: 64
    },
    {
      original: "热更新",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_热更新')`,
      line: 67
    },
    {
      original: "开箱即用",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_开箱即用')`,
      line: 70
    },
    {
      original: "插件生态",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_插件生态')`,
      line: 73
    },
    {
      original: "生产优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_生产优化')`,
      line: 76
    },
    {
      original: "🚀 快速开始",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_快速开始')`,
      line: 83
    },
    {
      original: "创建项目",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_创建项目')`,
      line: 85
    },
    {
      original: "项目结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_项目结构')`,
      line: 94
    },
    {
      original: "基本配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_基本配置')`,
      line: 103
    },
    {
      original: "🔌 插件系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_插件系统')`,
      line: 115
    },
    {
      original: "官方插件",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_官方插件')`,
      line: 117
    },
    {
      original: "社区插件",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_社区插件')`,
      line: 126
    },
    {
      original: "🛠️ 开发体验优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_开发体验优化')`,
      line: 138
    },
    {
      original: "热模块替换 (HMR)",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_热模块替换_hmr')`,
      line: 140
    },
    {
      original: "环境变量",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_环境变量')`,
      line: 149
    },
    {
      original: "📦 构建优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_构建优化')`,
      line: 161
    },
    {
      original: "构建配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_构建配置')`,
      line: 163
    },
    {
      original: "代码分割",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_代码分割')`,
      line: 172
    },
    {
      original: "⚡ 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_性能优化')`,
      line: 184
    },
    {
      original: "性能优化技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_性能优化技巧')`,
      line: 186
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_最佳实践')`,
      line: 198
    },
    {
      original: "Vite 使用建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_vite_使用建议')`,
      line: 201
    },
    {
      original: "充分利用 ESM 的优势，避免不必要的打包",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_充分利用_esm_的优势')`,
      line: 204
    },
    {
      original: "合理配置预构建，优化第三方依赖",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_合理配置预构建_优化第三方依赖')`,
      line: 205
    },
    {
      original: "使用环境变量管理不同环境的配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_使用环境变量管理不同环境的配置')`,
      line: 206
    },
    {
      original: "利用代码分割优化加载性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_利用代码分割优化加载性能')`,
      line: 207
    },
    {
      original: "选择合适的插件提升开发效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_选择合适的插件提升开发效率')`,
      line: 208
    },
    {
      original: "定期更新 Vite 版本获得最新优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_定期更新_vite_版本获得最新优化')`,
      line: 209
    },
    {
      original: "开发速度",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_开发速度')`,
      line: 223
    },
    {
      original: "热更新",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_热更新')`,
      line: 226
    },
    {
      original: "配置复杂度",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_配置复杂度')`,
      line: 229
    },
    {
      original: "生态成熟度",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_生态成熟度')`,
      line: 232
    },
    {
      original: "生产构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\vitedetail_生产构建')`,
      line: 235
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\TestingToolsDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "掌握前端测试工具和框架，确保代码质量和可靠性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_掌握前端测试工具和框架_确保代码质量和可靠性')`,
      line: 38
    },
    {
      original: "📋 测试工具概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试工具概述')`,
      line: 43
    },
    {
      original: "为什么需要测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_为什么需要测试')`,
      line: 45
    },
    {
      original: "测试类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试类型')`,
      line: 52
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_单元测试')`,
      line: 54
    },
    {
      original: "集成测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_集成测试')`,
      line: 55
    },
    {
      original: "E2E测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_e2e测试')`,
      line: 56
    },
    {
      original: "组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_组件测试')`,
      line: 57
    },
    {
      original: "视觉测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_视觉测试')`,
      line: 58
    },
    {
      original: "性能测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_性能测试')`,
      line: 59
    },
    {
      original: "测试金字塔",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试金字塔')`,
      line: 62
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_单元测试')`,
      line: 65
    },
    {
      original: "集成测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_集成测试')`,
      line: 68
    },
    {
      original: "E2E测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_e2e测试')`,
      line: 71
    },
    {
      original: "手动测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_手动测试')`,
      line: 74
    },
    {
      original: "🃏 Jest 测试框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_jest_测试框架')`,
      line: 81
    },
    {
      original: "Jest 配置与基础使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_jest_配置与基础使用')`,
      line: 83
    },
    {
      original: "基础测试示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_基础测试示例')`,
      line: 92
    },
    {
      original: "React 组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_react_组件测试')`,
      line: 101
    },
    {
      original: "🎭 Playwright E2E测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_playwright_e2e测试')`,
      line: 113
    },
    {
      original: "Playwright 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_playwright_配置')`,
      line: 115
    },
    {
      original: "E2E 测试示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_e2e_测试示例')`,
      line: 124
    },
    {
      original: "📚 Storybook 组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_storybook_组件测试')`,
      line: 136
    },
    {
      original: "Storybook 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_storybook_配置')`,
      line: 138
    },
    {
      original: "Story 编写",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_story_编写')`,
      line: 147
    },
    {
      original: "💡 测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试最佳实践')`,
      line: 159
    },
    {
      original: "测试编写技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试编写技巧')`,
      line: 161
    },
    {
      original: "🎯 测试策略建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试策略建议')`,
      line: 173
    },
    {
      original: "测试编写原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试编写原则')`,
      line: 176
    },
    {
      original: "测试应该独立、可重复、快速执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试应该独立_可重复_快速执行')`,
      line: 182
    },
    {
      original: "测试名称应该清晰描述测试场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试名称应该清晰描述测试场景')`,
      line: 183
    },
    {
      original: "优先测试核心业务逻辑和边界情况",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_优先测试核心业务逻辑和边界情况')`,
      line: 184
    },
    {
      original: "保持测试代码的简洁和可读性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_保持测试代码的简洁和可读性')`,
      line: 185
    },
    {
      original: "定期重构和维护测试代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_定期重构和维护测试代码')`,
      line: 186
    },
    {
      original: "测试覆盖率建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试覆盖率建议')`,
      line: 196
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_单元测试')`,
      line: 200
    },
    {
      original: "集成测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_集成测试')`,
      line: 203
    },
    {
      original: "E2E测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_e2e测试')`,
      line: 206
    },
    {
      original: "组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_组件测试')`,
      line: 209
    },
    {
      original: "API测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_api测试')`,
      line: 212
    },
    {
      original: "测试工具选择",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\testingtoolsdetail_测试工具选择')`,
      line: 223
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\TerminalDetail.tsx': [
    {
      original: "加载代码数据中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_加载代码数据中')`,
      line: 22
    },
    {
      original: "加载失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_加载失败')`,
      line: 31
    },
    {
      original: "终端工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_终端工具')`,
      line: 56
    },
    {
      original: "掌握现代终端工具和Shell配置，提升命令行使用效率和开发体验",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_掌握现代终端工具和shell配置_提升命令行使用效率和开发体验')`,
      line: 57
    },
    {
      original: "Shell配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_shell配置')`,
      line: 59
    },
    {
      original: "现代CLI工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_现代cli工具')`,
      line: 60
    },
    {
      original: "终端主题",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_终端主题')`,
      line: 61
    },
    {
      original: "自动化脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_自动化脚本')`,
      line: 62
    },
    {
      original: "📋 终端工具概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_终端工具概述')`,
      line: 70
    },
    {
      original: "为什么要优化终端",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_为什么要优化终端')`,
      line: 72
    },
    {
      original: "终端工具分类",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_终端工具分类')`,
      line: 78
    },
    {
      original: "Shell配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_shell配置')`,
      line: 80
    },
    {
      original: "现代CLI工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_现代cli工具')`,
      line: 81
    },
    {
      original: "终端主题",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_终端主题')`,
      line: 82
    },
    {
      original: "自动化脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_自动化脚本')`,
      line: 83
    },
    {
      original: "开发工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_开发工具')`,
      line: 84
    },
    {
      original: "优化目标",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_优化目标')`,
      line: 87
    },
    {
      original: "提升效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_提升效率')`,
      line: 90
    },
    {
      original: "美化界面",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_美化界面')`,
      line: 93
    },
    {
      original: "智能提示",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_智能提示')`,
      line: 96
    },
    {
      original: "历史管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_历史管理')`,
      line: 99
    },
    {
      original: "多任务处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_多任务处理')`,
      line: 102
    },
    {
      original: "🐚 Shell 配置优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_shell_配置优化')`,
      line: 109
    },
    {
      original: "1. Zsh + Oh My Zsh 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_1_zsh_oh')`,
      line: 112
    },
    {
      original: "2. PowerShell 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_2_powershell_配置')`,
      line: 123
    },
    {
      original: "3. 终端主题配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_3_终端主题配置')`,
      line: 134
    },
    {
      original: "🛠️ 现代化CLI工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_现代化cli工具')`,
      line: 147
    },
    {
      original: "4. 文件和系统工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_4_文件和系统工具')`,
      line: 150
    },
    {
      original: "5. 开发专用工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_5_开发专用工具')`,
      line: 161
    },
    {
      original: "6. Shell 脚本实战",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_6_shell_脚本实战')`,
      line: 172
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_最佳实践')`,
      line: 185
    },
    {
      original: "终端配置建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_终端配置建议')`,
      line: 188
    },
    {
      original: "选择合适的Shell（Zsh、Fish、PowerShell）",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_选择合适的shell_zsh_fish')`,
      line: 192
    },
    {
      original: "配置智能补全和语法高亮",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_配置智能补全和语法高亮')`,
      line: 193
    },
    {
      original: "使用现代化的CLI工具替代传统命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_使用现代化的cli工具替代传统命令')`,
      line: 194
    },
    {
      original: "设置有意义的别名和函数",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_设置有意义的别名和函数')`,
      line: 195
    },
    {
      original: "定期备份和同步配置文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_定期备份和同步配置文件')`,
      line: 196
    },
    {
      original: "学习快捷键和高效操作技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_学习快捷键和高效操作技巧')`,
      line: 197
    },
    {
      original: "效率提升技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_效率提升技巧')`,
      line: 205
    },
    {
      original: "历史搜索",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_历史搜索')`,
      line: 210
    },
    {
      original: "目录跳转",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_目录跳转')`,
      line: 213
    },
    {
      original: "批量操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_批量操作')`,
      line: 216
    },
    {
      original: "会话管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_会话管理')`,
      line: 219
    },
    {
      original: "自动化脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_自动化脚本')`,
      line: 222
    },
    {
      original: "安全注意事项",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_安全注意事项')`,
      line: 231
    },
    {
      original: "权限管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_权限管理')`,
      line: 236
    },
    {
      original: "脚本安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_脚本安全')`,
      line: 239
    },
    {
      original: "敏感信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_敏感信息')`,
      line: 242
    },
    {
      original: "网络安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_网络安全')`,
      line: 245
    },
    {
      original: "定期更新",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\terminaldetail_定期更新')`,
      line: 248
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\ProductivityDetail.tsx': [
    {
      original: "加载代码数据中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_加载代码数据中')`,
      line: 22
    },
    {
      original: "加载失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_加载失败')`,
      line: 31
    },
    {
      original: "生产力工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_生产力工具')`,
      line: 56
    },
    {
      original: "提升开发效率的生产力工具和自动化解决方案，优化工作流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_提升开发效率的生产力工具和自动化解决方案_优化工作流程')`,
      line: 57
    },
    {
      original: "代码片段",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_代码片段')`,
      line: 59
    },
    {
      original: "文本扩展",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_文本扩展')`,
      line: 60
    },
    {
      original: "窗口管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_窗口管理')`,
      line: 61
    },
    {
      original: "自动化脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_自动化脚本')`,
      line: 62
    },
    {
      original: "📋 生产力工具概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_生产力工具概述')`,
      line: 70
    },
    {
      original: "什么是生产力工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_什么是生产力工具')`,
      line: 72
    },
    {
      original: "工具分类",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_工具分类')`,
      line: 79
    },
    {
      original: "代码片段",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_代码片段')`,
      line: 81
    },
    {
      original: "文本扩展",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_文本扩展')`,
      line: 82
    },
    {
      original: "窗口管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_窗口管理')`,
      line: 83
    },
    {
      original: "自动化脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_自动化脚本')`,
      line: 84
    },
    {
      original: "快捷启动",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_快捷启动')`,
      line: 85
    },
    {
      original: "任务调度",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_任务调度')`,
      line: 86
    },
    {
      original: "效率提升原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_效率提升原则')`,
      line: 89
    },
    {
      original: "自动化重复任务",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_自动化重复任务')`,
      line: 92
    },
    {
      original: "快速访问常用功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_快速访问常用功能')`,
      line: 95
    },
    {
      original: "统一工作环境",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_统一工作环境')`,
      line: 98
    },
    {
      original: "减少上下文切换",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_减少上下文切换')`,
      line: 101
    },
    {
      original: "批量处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_批量处理')`,
      line: 104
    },
    {
      original: "📝 代码片段管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_代码片段管理')`,
      line: 111
    },
    {
      original: "1. VS Code 代码片段",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_1_vs_code')`,
      line: 114
    },
    {
      original: "2. 文本扩展工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_2_文本扩展工具')`,
      line: 125
    },
    {
      original: "3. Raycast 脚本命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_3_raycast_脚本命令')`,
      line: 136
    },
    {
      original: "🤖 自动化工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_自动化工具')`,
      line: 149
    },
    {
      original: "4. 窗口管理配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_4_窗口管理配置')`,
      line: 152
    },
    {
      original: "5. 自动化工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_5_自动化工作流')`,
      line: 163
    },
    {
      original: "6. 自定义自动化脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_6_自定义自动化脚本')`,
      line: 174
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_最佳实践')`,
      line: 187
    },
    {
      original: "生产力工具使用建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_生产力工具使用建议')`,
      line: 190
    },
    {
      original: "从小处着手，逐步建立自动化工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_从小处着手_逐步建立自动化工作流')`,
      line: 194
    },
    {
      original: "定期评估和优化工具配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_定期评估和优化工具配置')`,
      line: 195
    },
    {
      original: "保持工具配置的版本控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_保持工具配置的版本控制')`,
      line: 196
    },
    {
      original: "团队共享有用的工具和配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_团队共享有用的工具和配置')`,
      line: 197
    },
    {
      original: "避免过度依赖工具，保持基础技能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_避免过度依赖工具_保持基础技能')`,
      line: 198
    },
    {
      original: "定期备份重要的配置和脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_定期备份重要的配置和脚本')`,
      line: 199
    },
    {
      original: "效率提升策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_效率提升策略')`,
      line: 207
    },
    {
      original: "快捷键优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_快捷键优化')`,
      line: 212
    },
    {
      original: "模板化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_模板化')`,
      line: 215
    },
    {
      original: "批处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_批处理')`,
      line: 218
    },
    {
      original: "环境同步",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_环境同步')`,
      line: 221
    },
    {
      original: "监控自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_监控自动化')`,
      line: 224
    },
    {
      original: "工具选择建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_工具选择建议')`,
      line: 233
    },
    {
      original: "跨平台兼容",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_跨平台兼容')`,
      line: 238
    },
    {
      original: "学习成本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_学习成本')`,
      line: 241
    },
    {
      original: "社区支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_社区支持')`,
      line: 244
    },
    {
      original: "数据安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_数据安全')`,
      line: 247
    },
    {
      original: "可扩展性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\productivitydetail_可扩展性')`,
      line: 250
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\PostmanDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_加载失败_error')`,
      line: 22
    },
    {
      original: "掌握Postman API测试工具，提升接口开发和测试效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_掌握postman_api测试工具_提升接口开发和测试效率')`,
      line: 38
    },
    {
      original: "📋 Postman 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_postman_概述')`,
      line: 43
    },
    {
      original: "什么是 Postman",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_什么是_postman')`,
      line: 45
    },
    {
      original: "主要功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_主要功能')`,
      line: 51
    },
    {
      original: "HTTP请求测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_http请求测试')`,
      line: 53
    },
    {
      original: "环境变量管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_环境变量管理')`,
      line: 54
    },
    {
      original: "自动化测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_自动化测试')`,
      line: 55
    },
    {
      original: "Mock服务器",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_mock服务器')`,
      line: 56
    },
    {
      original: "API文档",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_api文档')`,
      line: 57
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_团队协作')`,
      line: 58
    },
    {
      original: "使用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_使用场景')`,
      line: 61
    },
    {
      original: "API开发",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_api开发')`,
      line: 64
    },
    {
      original: "自动化测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_自动化测试')`,
      line: 67
    },
    {
      original: "文档生成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_文档生成')`,
      line: 70
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_团队协作')`,
      line: 73
    },
    {
      original: "监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_监控')`,
      line: 76
    },
    {
      original: "🚀 基础使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_基础使用')`,
      line: 83
    },
    {
      original: "HTTP请求测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_http请求测试')`,
      line: 85
    },
    {
      original: "环境变量管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_环境变量管理')`,
      line: 94
    },
    {
      original: "测试脚本编写",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_测试脚本编写')`,
      line: 103
    },
    {
      original: "⚡ 高级功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_高级功能')`,
      line: 115
    },
    {
      original: "Collection Runner 批量测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_collection_runner_批量测试')`,
      line: 117
    },
    {
      original: "Mock服务器",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_mock服务器')`,
      line: 126
    },
    {
      original: "API文档生成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_api文档生成')`,
      line: 135
    },
    {
      original: "🖥️ Newman CLI 自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_newman_cli_自动化')`,
      line: 147
    },
    {
      original: "Newman 命令行工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_newman_命令行工具')`,
      line: 149
    },
    {
      original: "自定义Newman脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_自定义newman脚本')`,
      line: 158
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_最佳实践')`,
      line: 170
    },
    {
      original: "Postman 使用建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_postman_使用建议')`,
      line: 173
    },
    {
      original: "合理组织Collection结构，按功能模块分类",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_合理组织collection结构_按功能模块分类')`,
      line: 176
    },
    {
      original: "充分利用环境变量，避免硬编码",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_充分利用环境变量_避免硬编码')`,
      line: 177
    },
    {
      original: "编写完整的测试脚本，确保API质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_编写完整的测试脚本_确保api质量')`,
      line: 178
    },
    {
      original: "使用Mock服务器进行前端开发",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_使用mock服务器进行前端开发')`,
      line: 179
    },
    {
      original: "定期更新和维护API文档",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_定期更新和维护api文档')`,
      line: 180
    },
    {
      original: "集成CI/CD流程，实现自动化测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_集成ci_cd流程_实现自动化测试')`,
      line: 181
    },
    {
      original: "测试策略建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_测试策略建议')`,
      line: 191
    },
    {
      original: "功能测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_功能测试')`,
      line: 195
    },
    {
      original: "边界测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_边界测试')`,
      line: 198
    },
    {
      original: "异常测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_异常测试')`,
      line: 201
    },
    {
      original: "性能测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_性能测试')`,
      line: 204
    },
    {
      original: "安全测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_安全测试')`,
      line: 207
    },
    {
      original: "团队协作建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_团队协作建议')`,
      line: 218
    },
    {
      original: "统一规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_统一规范')`,
      line: 222
    },
    {
      original: "版本管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_版本管理')`,
      line: 225
    },
    {
      original: "权限控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_权限控制')`,
      line: 228
    },
    {
      original: "文档维护",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_文档维护')`,
      line: 231
    },
    {
      original: "监控告警",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\postmandetail_监控告警')`,
      line: 234
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\PerformanceToolsDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "掌握前端性能分析和优化工具，提升应用性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_掌握前端性能分析和优化工具_提升应用性能')`,
      line: 38
    },
    {
      original: "📋 性能工具概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_性能工具概述')`,
      line: 43
    },
    {
      original: "为什么需要性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_为什么需要性能优化')`,
      line: 45
    },
    {
      original: "性能工具分类",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_性能工具分类')`,
      line: 52
    },
    {
      original: "浏览器工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_浏览器工具')`,
      line: 54
    },
    {
      original: "性能审计",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_性能审计')`,
      line: 55
    },
    {
      original: "Bundle分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_bundle分析')`,
      line: 56
    },
    {
      original: "监控工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_监控工具')`,
      line: 57
    },
    {
      original: "压测工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_压测工具')`,
      line: 58
    },
    {
      original: "关键性能指标",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_关键性能指标')`,
      line: 61
    },
    {
      original: "🔍 Chrome DevTools 性能分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_chrome_devtools_性能分析')`,
      line: 83
    },
    {
      original: "Performance面板使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_performance面板使用')`,
      line: 85
    },
    {
      original: "Memory面板内存分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_memory面板内存分析')`,
      line: 94
    },
    {
      original: "Network面板网络优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_network面板网络优化')`,
      line: 103
    },
    {
      original: "🏮 Lighthouse 性能审计",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_lighthouse_性能审计')`,
      line: 115
    },
    {
      original: "Lighthouse使用指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_lighthouse使用指南')`,
      line: 117
    },
    {
      original: "Core Web Vitals优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_core_web_vitals优化')`,
      line: 126
    },
    {
      original: "📦 Bundle 分析工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_bundle_分析工具')`,
      line: 138
    },
    {
      original: "Bundle分析工具使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_bundle分析工具使用')`,
      line: 140
    },
    {
      original: "💡 性能优化最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_性能优化最佳实践')`,
      line: 152
    },
    {
      original: "性能分析建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_性能分析建议')`,
      line: 155
    },
    {
      original: "定期进行性能审计，建立性能基线",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_定期进行性能审计_建立性能基线')`,
      line: 158
    },
    {
      original: "关注Core Web Vitals指标",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_关注core_web_vitals指标')`,
      line: 159
    },
    {
      original: "使用真实用户数据进行性能监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_使用真实用户数据进行性能监控')`,
      line: 160
    },
    {
      original: "在不同网络条件下测试性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_在不同网络条件下测试性能')`,
      line: 161
    },
    {
      original: "分析Bundle大小，移除无用代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_分析bundle大小_移除无用代码')`,
      line: 162
    },
    {
      original: "优化关键渲染路径",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_优化关键渲染路径')`,
      line: 163
    },
    {
      original: "性能优化策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_性能优化策略')`,
      line: 173
    },
    {
      original: "资源优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_资源优化')`,
      line: 177
    },
    {
      original: "缓存策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_缓存策略')`,
      line: 180
    },
    {
      original: "代码分割",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_代码分割')`,
      line: 183
    },
    {
      original: "图片优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_图片优化')`,
      line: 186
    },
    {
      original: "服务端优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_服务端优化')`,
      line: 189
    },
    {
      original: "常见性能问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_常见性能问题')`,
      line: 200
    },
    {
      original: "JavaScript阻塞",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_javascript阻塞')`,
      line: 204
    },
    {
      original: "资源阻塞",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_资源阻塞')`,
      line: 207
    },
    {
      original: "内存泄漏",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_内存泄漏')`,
      line: 210
    },
    {
      original: "布局抖动",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_布局抖动')`,
      line: 213
    },
    {
      original: "网络延迟",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\performancetoolsdetail_网络延迟')`,
      line: 216
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\ESLintPrettierDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "代码质量检查和格式化工具，提升代码规范性和一致性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_代码质量检查和格式化工具_提升代码规范性和一致性')`,
      line: 38
    },
    {
      original: "📋 工具概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_工具概述')`,
      line: 43
    },
    {
      original: "ESLint - 代码质量检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_eslint_代码质量检查')`,
      line: 45
    },
    {
      original: "Prettier - 代码格式化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_prettier_代码格式化')`,
      line: 51
    },
    {
      original: "工具特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_工具特性')`,
      line: 57
    },
    {
      original: "代码质量检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_代码质量检查')`,
      line: 59
    },
    {
      original: "自动格式化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_自动格式化')`,
      line: 60
    },
    {
      original: "规则可配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_规则可配置')`,
      line: 61
    },
    {
      original: "编辑器集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_编辑器集成')`,
      line: 62
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_团队协作')`,
      line: 63
    },
    {
      original: "🔍 ESLint 基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_eslint_基础配置')`,
      line: 69
    },
    {
      original: "安装与配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_安装与配置')`,
      line: 71
    },
    {
      original: "基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_基础配置')`,
      line: 80
    },
    {
      original: "⚙️ 框架特定配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_框架特定配置')`,
      line: 92
    },
    {
      original: "React 项目配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_react_项目配置')`,
      line: 94
    },
    {
      original: "Vue 项目配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_vue_项目配置')`,
      line: 103
    },
    {
      original: "🎨 Prettier 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_prettier_配置')`,
      line: 115
    },
    {
      original: "安装与配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_安装与配置')`,
      line: 117
    },
    {
      original: "配置选项",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_配置选项')`,
      line: 126
    },
    {
      original: "🔗 工具集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_工具集成')`,
      line: 138
    },
    {
      original: "ESLint 与 Prettier 集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_eslint_与_prettier')`,
      line: 140
    },
    {
      original: "编辑器集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_编辑器集成')`,
      line: 149
    },
    {
      original: "Git Hooks 集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_git_hooks_集成')`,
      line: 158
    },
    {
      original: "🚀 高级配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_高级配置')`,
      line: 170
    },
    {
      original: "自定义规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_自定义规则')`,
      line: 172
    },
    {
      original: "项目特定配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_项目特定配置')`,
      line: 181
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_最佳实践')`,
      line: 193
    },
    {
      original: "ESLint 使用建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_eslint_使用建议')`,
      line: 196
    },
    {
      original: "从推荐配置开始，逐步添加自定义规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_从推荐配置开始_逐步添加自定义规则')`,
      line: 199
    },
    {
      original: "团队统一配置文件，确保代码风格一致",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_团队统一配置文件_确保代码风格一致')`,
      line: 200
    },
    {
      original: "合理设置规则严重程度（error/warn/off）",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_合理设置规则严重程度_error_warn')`,
      line: 201
    },
    {
      original: "使用 overrides 为不同文件类型设置不同规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_使用_overrides_为不同文件类型设置不同规则')`,
      line: 202
    },
    {
      original: "定期更新 ESLint 和相关插件",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_定期更新_eslint_和相关插件')`,
      line: 203
    },
    {
      original: "结合 CI/CD 流程进行代码检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_结合_ci_cd')`,
      line: 204
    },
    {
      original: "Prettier 使用建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_prettier_使用建议')`,
      line: 214
    },
    {
      original: "保持配置简单，使用默认设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_保持配置简单_使用默认设置')`,
      line: 217
    },
    {
      original: "团队统一格式化规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_团队统一格式化规则')`,
      line: 218
    },
    {
      original: "配置编辑器保存时自动格式化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_配置编辑器保存时自动格式化')`,
      line: 219
    },
    {
      original: "使用 .prettierignore 排除不需要格式化的文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_使用_prettierignore_排除不需要格式化的文件')`,
      line: 220
    },
    {
      original: "结合 Git Hooks 确保提交代码已格式化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_结合_git_hooks')`,
      line: 221
    },
    {
      original: "常见问题解决",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_常见问题解决')`,
      line: 231
    },
    {
      original: "规则冲突",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_规则冲突')`,
      line: 235
    },
    {
      original: "性能问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_性能问题')`,
      line: 238
    },
    {
      original: "编辑器不生效",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_编辑器不生效')`,
      line: 241
    },
    {
      original: "Git Hooks 失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\eslintprettierdetail_git_hooks_失败')`,
      line: 244
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\ChromeDevToolsDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "掌握Chrome开发者工具，提升前端调试和性能优化能力",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_掌握chrome开发者工具_提升前端调试和性能优化能力')`,
      line: 38
    },
    {
      original: "📋 DevTools 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_devtools_概述')`,
      line: 43
    },
    {
      original: "什么是 Chrome DevTools",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_什么是_chrome_devtools')`,
      line: 45
    },
    {
      original: "主要面板",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_主要面板')`,
      line: 51
    },
    {
      original: "快捷键",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_快捷键')`,
      line: 63
    },
    {
      original: "🔍 Elements 面板详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_elements_面板详解')`,
      line: 75
    },
    {
      original: "DOM检查与修改",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_dom检查与修改')`,
      line: 77
    },
    {
      original: "CSS样式调试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_css样式调试')`,
      line: 86
    },
    {
      original: "响应式设计调试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_响应式设计调试')`,
      line: 95
    },
    {
      original: "📝 Console 面板详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_console_面板详解')`,
      line: 107
    },
    {
      original: "Console API详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_console_api详解')`,
      line: 109
    },
    {
      original: "Console实用工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_console实用工具')`,
      line: 118
    },
    {
      original: "📁 Sources 调试详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_sources_调试详解')`,
      line: 130
    },
    {
      original: "断点调试",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_断点调试')`,
      line: 132
    },
    {
      original: "变量监视与作用域",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_变量监视与作用域')`,
      line: 141
    },
    {
      original: "🌐 Network 网络分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_network_网络分析')`,
      line: 153
    },
    {
      original: "网络请求分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_网络请求分析')`,
      line: 155
    },
    {
      original: "性能优化分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_性能优化分析')`,
      line: 164
    },
    {
      original: "⚡ Performance 性能分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_performance_性能分析')`,
      line: 176
    },
    {
      original: "性能录制与分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_性能录制与分析')`,
      line: 178
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_最佳实践')`,
      line: 190
    },
    {
      original: "DevTools 使用技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_devtools_使用技巧')`,
      line: 193
    },
    {
      original: "熟练掌握快捷键，提升调试效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_熟练掌握快捷键_提升调试效率')`,
      line: 196
    },
    {
      original: "善用Console面板的各种API和工具函数",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_善用console面板的各种api和工具函数')`,
      line: 197
    },
    {
      original: "利用断点调试深入理解代码执行流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_利用断点调试深入理解代码执行流程')`,
      line: 198
    },
    {
      original: "使用Network面板优化资源加载性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_使用network面板优化资源加载性能')`,
      line: 199
    },
    {
      original: "通过Performance面板识别性能瓶颈",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_通过performance面板识别性能瓶颈')`,
      line: 200
    },
    {
      original: "结合Elements面板调试CSS布局问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_结合elements面板调试css布局问题')`,
      line: 201
    },
    {
      original: "调试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_调试最佳实践')`,
      line: 211
    },
    {
      original: "使用条件断点减少无效暂停",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_使用条件断点减少无效暂停')`,
      line: 214
    },
    {
      original: "善用Watch面板监视关键变量",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_善用watch面板监视关键变量')`,
      line: 215
    },
    {
      original: "利用Console执行代码测试修复方案",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_利用console执行代码测试修复方案')`,
      line: 216
    },
    {
      original: "使用Performance面板分析运行时性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_使用performance面板分析运行时性能')`,
      line: 217
    },
    {
      original: "通过Network面板优化加载策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_通过network面板优化加载策略')`,
      line: 218
    },
    {
      original: "性能优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_性能优化建议')`,
      line: 228
    },
    {
      original: "减少HTTP请求",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_减少http请求')`,
      line: 232
    },
    {
      original: "启用压缩",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_启用压缩')`,
      line: 235
    },
    {
      original: "优化图片",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_优化图片')`,
      line: 238
    },
    {
      original: "代码分割",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_代码分割')`,
      line: 241
    },
    {
      original: "缓存策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\chromedevtoolsdetail_缓存策略')`,
      line: 244
    },
  ],
  '..\frontEnd\src\views\Technology\pages\tools\AutomationToolsDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "提升开发效率的自动化工具和脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_提升开发效率的自动化工具和脚本')`,
      line: 38
    },
    {
      original: "📋 自动化工具概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_自动化工具概述')`,
      line: 43
    },
    {
      original: "什么是自动化工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_什么是自动化工具')`,
      line: 45
    },
    {
      original: "自动化工具类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_自动化工具类型')`,
      line: 52
    },
    {
      original: "任务运行器",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_任务运行器')`,
      line: 54
    },
    {
      original: "构建工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_构建工具')`,
      line: 55
    },
    {
      original: "代码生成器",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_代码生成器')`,
      line: 56
    },
    {
      original: "部署工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_部署工具')`,
      line: 57
    },
    {
      original: "监控工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_监控工具')`,
      line: 58
    },
    {
      original: "自动化的好处",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_自动化的好处')`,
      line: 61
    },
    {
      original: "提升效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_提升效率')`,
      line: 64
    },
    {
      original: "减少错误",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_减少错误')`,
      line: 67
    },
    {
      original: "标准化流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_标准化流程')`,
      line: 70
    },
    {
      original: "持续集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_持续集成')`,
      line: 73
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_团队协作')`,
      line: 76
    },
    {
      original: "⚙️ 任务运行器",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_任务运行器')`,
      line: 83
    },
    {
      original: "npm scripts 自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_npm_scripts_自动化')`,
      line: 85
    },
    {
      original: "Gulp 任务自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_gulp_任务自动化')`,
      line: 94
    },
    {
      original: "自定义构建脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_自定义构建脚本')`,
      line: 103
    },
    {
      original: "🎯 代码生成工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_代码生成工具')`,
      line: 115
    },
    {
      original: "Plop.js 代码生成器",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_plop_js_代码生成器')`,
      line: 117
    },
    {
      original: "自定义代码生成脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_自定义代码生成脚本')`,
      line: 126
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_最佳实践')`,
      line: 138
    },
    {
      original: "自动化工具使用建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_自动化工具使用建议')`,
      line: 141
    },
    {
      original: "从简单的任务开始，逐步扩展自动化范围",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_从简单的任务开始_逐步扩展自动化范围')`,
      line: 144
    },
    {
      original: "保持脚本的可读性和可维护性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_保持脚本的可读性和可维护性')`,
      line: 145
    },
    {
      original: "为自动化脚本编写文档和使用说明",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_为自动化脚本编写文档和使用说明')`,
      line: 146
    },
    {
      original: "定期更新和优化自动化流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_定期更新和优化自动化流程')`,
      line: 147
    },
    {
      original: "团队共享自动化工具和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_团队共享自动化工具和最佳实践')`,
      line: 148
    },
    {
      original: "监控自动化任务的执行状态",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_监控自动化任务的执行状态')`,
      line: 149
    },
    {
      original: "代码生成器建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_代码生成器建议')`,
      line: 159
    },
    {
      original: "设计灵活的模板系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_设计灵活的模板系统')`,
      line: 162
    },
    {
      original: "支持交互式配置选项",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_支持交互式配置选项')`,
      line: 163
    },
    {
      original: "生成的代码要符合项目规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_生成的代码要符合项目规范')`,
      line: 164
    },
    {
      original: "提供代码生成的撤销机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_提供代码生成的撤销机制')`,
      line: 165
    },
    {
      original: "定期更新模板以适应新需求",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_定期更新模板以适应新需求')`,
      line: 166
    },
    {
      original: "常见问题解决",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_常见问题解决')`,
      line: 176
    },
    {
      original: "脚本执行失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_脚本执行失败')`,
      line: 180
    },
    {
      original: "跨平台兼容性",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_跨平台兼容性')`,
      line: 183
    },
    {
      original: "性能问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_性能问题')`,
      line: 186
    },
    {
      original: "错误处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_错误处理')`,
      line: 189
    },
    {
      original: "版本兼容",
      replacement: `t('common:..\frontend\src\views\technology\pages\tools\automationtoolsdetail_版本兼容')`,
      line: 192
    },
  ],
  '..\frontEnd\src\views\Technology\pages\react\UseMemoDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_加载中')`,
      line: 24
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_加载失败_error')`,
      line: 28
    },
    {
      original: "useMemo 深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_usememo_深度解析')`,
      line: 51
    },
    {
      original: "缓存计算结果，优化组件性能，避免昂贵计算的重复执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_缓存计算结果_优化组件性能_避免昂贵计算的重复执行')`,
      line: 52
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_性能优化')`,
      line: 55
    },
    {
      original: "缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_缓存')`,
      line: 56
    },
    {
      original: "计算优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_计算优化')`,
      line: 57
    },
    {
      original: "📚 基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_基础概念')`,
      line: 65
    },
    {
      original: "什么是useMemo？",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_什么是usememo')`,
      line: 67
    },
    {
      original: "基本语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_基本语法')`,
      line: 72
    },
    {
      original: "工作原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_工作原理')`,
      line: 81
    },
    {
      original: "🎯 核心使用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_核心使用场景')`,
      line: 89
    },
    {
      original: "1. 昂贵计算优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_1_昂贵计算优化')`,
      line: 92
    },
    {
      original: "2. 对象引用稳定化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_2_对象引用稳定化')`,
      line: 103
    },
    {
      original: "3. 复杂数据转换",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_3_复杂数据转换')`,
      line: 114
    },
    {
      original: "⚠️ 常见陷阱与解决方案",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_常见陷阱与解决方案')`,
      line: 127
    },
    {
      original: "重要提醒",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_重要提醒')`,
      line: 129
    },
    {
      original: "useMemo的使用需要权衡，不当使用可能降低性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_usememo的使用需要权衡_不当使用可能降低性能')`,
      line: 130
    },
    {
      original: "陷阱1: 过度使用useMemo",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_陷阱1_过度使用usememo')`,
      line: 141
    },
    {
      original: "❌ 错误示例：",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_错误示例')`,
      line: 144
    },
    {
      original: "❌ 错误示例：",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_错误示例')`,
      line: 145
    },
    {
      original: "陷阱2: 依赖项包含对象或数组",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_陷阱2_依赖项包含对象或数组')`,
      line: 159
    },
    {
      original: "❌ 错误示例：",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_错误示例')`,
      line: 162
    },
    {
      original: "❌ 错误示例：",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_错误示例')`,
      line: 163
    },
    {
      original: "✅ 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_最佳实践')`,
      line: 177
    },
    {
      original: "1. 只缓存昂贵计算",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_1_只缓存昂贵计算')`,
      line: 182
    },
    {
      original: "2. 配合React.memo使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_2_配合react_memo使用')`,
      line: 192
    },
    {
      original: "3. 性能测量",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_3_性能测量')`,
      line: 202
    },
    {
      original: "4. 避免复杂依赖",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_4_避免复杂依赖')`,
      line: 213
    },
    {
      original: "尽量避免将对象或数组直接作为依赖项，考虑解构出具体的原始值",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_尽量避免将对象或数组直接作为依赖项_考虑解构出具体的原始值')`,
      line: 214
    },
    {
      original: "🚀 进阶技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_进阶技巧')`,
      line: 221
    },
    {
      original: "1. 与useCallback的区别",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_1_与usecallback的区别')`,
      line: 223
    },
    {
      original: "2. 条件性缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_2_条件性缓存')`,
      line: 232
    },
    {
      original: "3. 自定义Hook中的应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usememodetail_3_自定义hook中的应用')`,
      line: 241
    },
  ],
  '..\frontEnd\src\views\Technology\pages\react\UseEffectDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "useEffect 深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_useeffect_深度解析')`,
      line: 45
    },
    {
      original: "掌握Effect Hook的使用技巧，避免常见陷阱，提升React应用性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_掌握effect_hook的使用技巧_避免常见陷阱')`,
      line: 46
    },
    {
      original: "副作用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_副作用')`,
      line: 49
    },
    {
      original: "生命周期",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_生命周期')`,
      line: 50
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_性能优化')`,
      line: 51
    },
    {
      original: "📚 基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_基础概念')`,
      line: 59
    },
    {
      original: "什么是useEffect？",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_什么是useeffect')`,
      line: 61
    },
    {
      original: "基本语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_基本语法')`,
      line: 67
    },
    {
      original: "🔧 常见用法",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_常见用法')`,
      line: 79
    },
    {
      original: "1. 清理函数",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_1_清理函数')`,
      line: 82
    },
    {
      original: "2. 数据获取",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_2_数据获取')`,
      line: 93
    },
    {
      original: "3. 常见错误和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\useeffectdetail_3_常见错误和最佳实践')`,
      line: 104
    },
  ],
  '..\frontEnd\src\views\Technology\pages\react\UseContextDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "useContext 深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_usecontext_深度解析')`,
      line: 45
    },
    {
      original: "跨组件状态共享的最佳实践，避免props drilling问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_跨组件状态共享的最佳实践_避免props_drilling问题')`,
      line: 46
    },
    {
      original: "状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_状态管理')`,
      line: 49
    },
    {
      original: "跨组件通信",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_跨组件通信')`,
      line: 51
    },
    {
      original: "📚 基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_基础概念')`,
      line: 59
    },
    {
      original: "什么是useContext？",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_什么是usecontext')`,
      line: 61
    },
    {
      original: "基本语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_基本语法')`,
      line: 67
    },
    {
      original: "工作原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_工作原理')`,
      line: 76
    },
    {
      original: "🎯 核心使用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_核心使用场景')`,
      line: 84
    },
    {
      original: "1. 多个Context的使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_1_多个context的使用')`,
      line: 87
    },
    {
      original: "2. 性能优化技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_2_性能优化技巧')`,
      line: 98
    },
    {
      original: "3. 常见错误和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecontextdetail_3_常见错误和最佳实践')`,
      line: 109
    },
  ],
  '..\frontEnd\src\views\Technology\pages\react\UseCallbackDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_加载中')`,
      line: 24
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_加载失败_error')`,
      line: 28
    },
    {
      original: "useCallback 深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_usecallback_深度解析')`,
      line: 51
    },
    {
      original: "性能优化利器，避免不必要的重新渲染，提升React应用性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_性能优化利器_避免不必要的重新渲染_提升react应用性能')`,
      line: 52
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_性能优化')`,
      line: 55
    },
    {
      original: "缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_缓存')`,
      line: 56
    },
    {
      original: "记忆化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_记忆化')`,
      line: 57
    },
    {
      original: "📚 基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_基础概念')`,
      line: 65
    },
    {
      original: "什么是useCallback？",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_什么是usecallback')`,
      line: 67
    },
    {
      original: "基本语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_基本语法')`,
      line: 72
    },
    {
      original: "工作原理",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_工作原理')`,
      line: 81
    },
    {
      original: "🎯 核心使用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_核心使用场景')`,
      line: 89
    },
    {
      original: "1. 优化子组件渲染",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_1_优化子组件渲染')`,
      line: 92
    },
    {
      original: "2. 依赖数组的使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_2_依赖数组的使用')`,
      line: 103
    },
    {
      original: "3. 常见错误和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_3_常见错误和最佳实践')`,
      line: 114
    },
    {
      original: "⚠️ 常见陷阱与解决方案",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_常见陷阱与解决方案')`,
      line: 127
    },
    {
      original: "重要提醒",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_重要提醒')`,
      line: 129
    },
    {
      original: "useCallback的使用需要谨慎，错误使用可能适得其反",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_usecallback的使用需要谨慎_错误使用可能适得其反')`,
      line: 130
    },
    {
      original: "不使用 useCallback 的问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_不使用_usecallback_的问题')`,
      line: 141
    },
    {
      original: "性能优化实战",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_性能优化实战')`,
      line: 157
    },
    {
      original: "✅ 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_最佳实践')`,
      line: 173
    },
    {
      original: "1. 配合React.memo使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_1_配合react_memo使用')`,
      line: 178
    },
    {
      original: "2. 使用ESLint规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_2_使用eslint规则')`,
      line: 195
    },
    {
      original: "启用exhaustive-deps规则，确保依赖项的完整性",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_启用exhaustive_deps规则_确保依赖项的完整性')`,
      line: 196
    },
    {
      original: "3. 避免在循环中使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_3_避免在循环中使用')`,
      line: 203
    },
    {
      original: "4. 性能测量",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_4_性能测量')`,
      line: 213
    },
    {
      original: "使用React DevTools Profiler测量实际的性能提升效果",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\usecallbackdetail_使用react_devtools_profiler测量实际的性能提升效果')`,
      line: 214
    },
  ],
  '..\frontEnd\src\views\Technology\pages\react\TestingDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "React 测试完全指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_react_测试完全指南')`,
      line: 45
    },
    {
      original: "掌握React应用的单元测试、集成测试和E2E测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_掌握react应用的单元测试_集成测试和e2e测试最佳实践')`,
      line: 46
    },
    {
      original: "🛠️ 测试环境搭建",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_测试环境搭建')`,
      line: 60
    },
    {
      original: "安装和配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_安装和配置')`,
      line: 62
    },
    {
      original: "🧪 组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_组件测试')`,
      line: 74
    },
    {
      original: "1. 基础组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_1_基础组件测试')`,
      line: 77
    },
    {
      original: "2. 异步组件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_2_异步组件测试')`,
      line: 88
    },
    {
      original: "🪝 Custom Hook测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_custom_hook测试')`,
      line: 101
    },
    {
      original: "测试自定义Hook",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_测试自定义hook')`,
      line: 103
    },
    {
      original: "✅ 测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_测试最佳实践')`,
      line: 115
    },
    {
      original: "测试原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_测试原则')`,
      line: 117
    },
    {
      original: "测试用户行为，而非实现细节",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_测试用户行为_而非实现细节')`,
      line: 120
    },
    {
      original: "保持测试简单明了",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_保持测试简单明了')`,
      line: 123
    },
    {
      original: "使用有意义的测试描述",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_使用有意义的测试描述')`,
      line: 126
    },
    {
      original: "模拟外部依赖",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_模拟外部依赖')`,
      line: 129
    },
    {
      original: "避免测试实现细节",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_避免测试实现细节')`,
      line: 132
    },
    {
      original: "常见测试场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_常见测试场景')`,
      line: 136
    },
    {
      original: "点击按钮应该增加计数",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_点击按钮应该增加计数')`,
      line: 139
    },
    {
      original: "计数: 1",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_计数_1')`,
      line: 146
    },
    {
      original: "应该调用setState",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_应该调用setstate')`,
      line: 150
    },
    {
      original: "应该提交表单数据",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_应该提交表单数据')`,
      line: 157
    },
    {
      original: "应该显示错误信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_应该显示错误信息')`,
      line: 174
    },
    {
      original: "网络错误",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_网络错误')`,
      line: 175
    },
    {
      original: "测试最佳实践示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\testingdetail_测试最佳实践示例')`,
      line: 185
    },
  ],
  '..\frontEnd\src\views\Technology\pages\react\PerformanceDetail.tsx': [
    {
      original: "React 性能优化指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_react_性能优化指南')`,
      line: 52
    },
    {
      original: "深入理解React性能优化技巧，构建高性能的React应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_深入理解react性能优化技巧_构建高性能的react应用')`,
      line: 53
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_性能优化')`,
      line: 56
    },
    {
      original: "虚拟化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_虚拟化')`,
      line: 58
    },
    {
      original: "代码分割",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_代码分割')`,
      line: 59
    },
    {
      original: "📊 性能监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_性能监控')`,
      line: 67
    },
    {
      original: "⚡ 核心优化技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_核心优化技巧')`,
      line: 81
    },
    {
      original: "1. React.memo - 组件记忆化",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_1_react_memo')`,
      line: 84
    },
    {
      original: "2. 虚拟化长列表",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_2_虚拟化长列表')`,
      line: 95
    },
    {
      original: "3. 代码分割与懒加载",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_3_代码分割与懒加载')`,
      line: 106
    },
    {
      original: "🐛 常见性能问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_常见性能问题')`,
      line: 119
    },
    {
      original: "1. 避免在渲染中创建对象和函数",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_1_避免在渲染中创建对象和函数')`,
      line: 124
    },
    {
      original: "❌ 问题代码：",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_问题代码')`,
      line: 125
    },
    {
      original: "✅ 优化方案：",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_优化方案')`,
      line: 134
    },
    {
      original: "2. 使用正确的 key",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\performancedetail_2_使用正确的_key')`,
      line: 148
    },
  ],
  '..\frontEnd\src\views\Technology\pages\react\ErrorBoundaryDetail.tsx': [
    {
      original: "Error Boundary 深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_error_boundary_深度解析')`,
      line: 40
    },
    {
      original: "错误边界处理与异常捕获，构建健壮的React应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_错误边界处理与异常捕获_构建健壮的react应用')`,
      line: 41
    },
    {
      original: "错误处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_错误处理')`,
      line: 44
    },
    {
      original: "异常捕获",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_异常捕获')`,
      line: 45
    },
    {
      original: "用户体验",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_用户体验')`,
      line: 46
    },
    {
      original: "📚 基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_基础概念')`,
      line: 54
    },
    {
      original: "什么是Error Boundary？",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_什么是error_boundary')`,
      line: 56
    },
    {
      original: "基本实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_基本实现')`,
      line: 62
    },
    {
      original: "🎯 实用Error Boundary示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_实用error_boundary示例')`,
      line: 74
    },
    {
      original: "1. 使用Hook实现ErrorBoundary",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_1_使用hook实现errorboundary')`,
      line: 77
    },
    {
      original: "2. 高级特性和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\errorboundarydetail_2_高级特性和最佳实践')`,
      line: 88
    },
  ],
  '..\frontEnd\src\views\Technology\pages\react\CustomHooksDetail.tsx': [
    {
      original: "加载代码数据中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_加载代码数据中')`,
      line: 22
    },
    {
      original: "加载失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_加载失败')`,
      line: 31
    },
    {
      original: "Custom Hooks 深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_custom_hooks_深度解析')`,
      line: 56
    },
    {
      original: "自定义Hook的设计模式与实现，提升代码复用性和可维护性",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_自定义hook的设计模式与实现_提升代码复用性和可维护性')`,
      line: 57
    },
    {
      original: "代码复用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_代码复用')`,
      line: 60
    },
    {
      original: "设计模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_设计模式')`,
      line: 61
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_最佳实践')`,
      line: 62
    },
    {
      original: "📚 基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_基础概念')`,
      line: 70
    },
    {
      original: "什么是Custom Hooks？",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_什么是custom_hooks')`,
      line: 72
    },
    {
      original: "基本规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_基本规则')`,
      line: 77
    },
    {
      original: "核心优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_核心优势')`,
      line: 86
    },
    {
      original: "逻辑复用",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_逻辑复用')`,
      line: 89
    },
    {
      original: "关注点分离",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_关注点分离')`,
      line: 92
    },
    {
      original: "易于测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_易于测试')`,
      line: 95
    },
    {
      original: "组合性",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_组合性')`,
      line: 98
    },
    {
      original: "🎯 实用Custom Hooks示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_实用custom_hooks示例')`,
      line: 105
    },
    {
      original: "1. useLocalStorage - 本地存储Hook",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_1_uselocalstorage_本地存储hook')`,
      line: 108
    },
    {
      original: "2. useFetch - 数据获取Hook",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_2_usefetch_数据获取hook')`,
      line: 119
    },
    {
      original: "3. useDebounce - 防抖Hook",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_3_usedebounce_防抖hook')`,
      line: 130
    },
    {
      original: "4. useToggle - 切换状态Hook",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_4_usetoggle_切换状态hook')`,
      line: 141
    },
    {
      original: "5. useCounter - 计数器Hook",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_5_usecounter_计数器hook')`,
      line: 152
    },
    {
      original: "6. useArray - 数组操作Hook",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_6_usearray_数组操作hook')`,
      line: 163
    },
    {
      original: "🎨 设计原则与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_设计原则与最佳实践')`,
      line: 176
    },
    {
      original: "1. 单一职责原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_1_单一职责原则')`,
      line: 181
    },
    {
      original: "每个自定义Hook应该只负责一个特定的功能，保持简单和专注",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_每个自定义hook应该只负责一个特定的功能_保持简单和专注')`,
      line: 182
    },
    {
      original: "单一职责原则示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_单一职责原则示例')`,
      line: 203
    },
    {
      original: "2. 返回对象而非数组",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_2_返回对象而非数组')`,
      line: 211
    },
    {
      original: "对于复杂的返回值，使用对象可以提供更好的可读性和灵活性",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_对于复杂的返回值_使用对象可以提供更好的可读性和灵活性')`,
      line: 212
    },
    {
      original: "返回对象 vs 返回数组",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_返回对象_vs_返回数组')`,
      line: 230
    },
    {
      original: "3. 提供清理机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_3_提供清理机制')`,
      line: 237
    },
    {
      original: "确保自定义Hook能够正确清理副作用，避免内存泄漏",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_确保自定义hook能够正确清理副作用_避免内存泄漏')`,
      line: 238
    },
    {
      original: "提供清理机制示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\react\customhooksdetail_提供清理机制示例')`,
      line: 255
    },
  ],
  '..\frontEnd\src\views\Technology\pages\nodejs\TestingDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "学习Node.js应用的单元测试、集成测试和测试驱动开发",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_学习node_js应用的单元测试_集成测试和测试驱动开发')`,
      line: 38
    },
    {
      original: "📋 测试概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试概述')`,
      line: 43
    },
    {
      original: "为什么需要测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_为什么需要测试')`,
      line: 45
    },
    {
      original: "测试类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试类型')`,
      line: 51
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_单元测试')`,
      line: 53
    },
    {
      original: "集成测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_集成测试')`,
      line: 54
    },
    {
      original: "端到端测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_端到端测试')`,
      line: 55
    },
    {
      original: "性能测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_性能测试')`,
      line: 56
    },
    {
      original: "安全测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_安全测试')`,
      line: 57
    },
    {
      original: "测试的好处",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试的好处')`,
      line: 60
    },
    {
      original: "提高代码质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_提高代码质量')`,
      line: 63
    },
    {
      original: "增强信心",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_增强信心')`,
      line: 66
    },
    {
      original: "便于重构",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_便于重构')`,
      line: 69
    },
    {
      original: "文档作用",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_文档作用')`,
      line: 72
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_团队协作')`,
      line: 75
    },
    {
      original: "🧪 Jest 基础测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_jest_基础测试')`,
      line: 82
    },
    {
      original: "基本测试语法",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_基本测试语法')`,
      line: 84
    },
    {
      original: "⏰ 异步测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_异步测试')`,
      line: 96
    },
    {
      original: "Promise 和 async/await 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_promise_和_async')`,
      line: 98
    },
    {
      original: "🎭 Mock 和 Spy",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_mock_和_spy')`,
      line: 110
    },
    {
      original: "模拟和监听",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_模拟和监听')`,
      line: 112
    },
    {
      original: "🔗 集成测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_集成测试')`,
      line: 124
    },
    {
      original: "API 集成测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_api_集成测试')`,
      line: 126
    },
    {
      original: "⚙️ 测试配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试配置')`,
      line: 138
    },
    {
      original: "Jest 配置和工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_jest_配置和工具')`,
      line: 140
    },
    {
      original: "💡 测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试最佳实践')`,
      line: 152
    },
    {
      original: "测试编写原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试编写原则')`,
      line: 155
    },
    {
      original: "测试应该独立且可重复",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试应该独立且可重复')`,
      line: 161
    },
    {
      original: "使用描述性的测试名称",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_使用描述性的测试名称')`,
      line: 162
    },
    {
      original: "一个测试只验证一个功能点",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_一个测试只验证一个功能点')`,
      line: 163
    },
    {
      original: "保持测试简单和快速",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_保持测试简单和快速')`,
      line: 164
    },
    {
      original: "使用适当的断言方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_使用适当的断言方法')`,
      line: 165
    },
    {
      original: "测试覆盖率建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试覆盖率建议')`,
      line: 175
    },
    {
      original: "追求有意义的覆盖率，而非100%覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_追求有意义的覆盖率_而非100_覆盖率')`,
      line: 178
    },
    {
      original: "重点测试核心业务逻辑",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_重点测试核心业务逻辑')`,
      line: 179
    },
    {
      original: "测试边界条件和异常情况",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_测试边界条件和异常情况')`,
      line: 180
    },
    {
      original: "定期审查和更新测试用例",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_定期审查和更新测试用例')`,
      line: 181
    },
    {
      original: "使用测试驱动开发（TDD）方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\testingdetail_使用测试驱动开发_tdd_方法')`,
      line: 182
    },
  ],
  '..\frontEnd\src\views\Technology\pages\nodejs\ModulesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "深入了解Node.js的模块系统，包括CommonJS、ES Modules和包管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_深入了解node_js的模块系统_包括commonjs')`,
      line: 38
    },
    {
      original: "📋 模块系统概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_模块系统概述')`,
      line: 43
    },
    {
      original: "什么是模块",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_什么是模块')`,
      line: 45
    },
    {
      original: "模块系统的优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_模块系统的优势')`,
      line: 51
    },
    {
      original: "代码复用",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_代码复用')`,
      line: 54
    },
    {
      original: "命名空间",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_命名空间')`,
      line: 57
    },
    {
      original: "依赖管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_依赖管理')`,
      line: 60
    },
    {
      original: "按需加载",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_按需加载')`,
      line: 63
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_团队协作')`,
      line: 66
    },
    {
      original: "🔧 模块类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_模块类型')`,
      line: 73
    },
    {
      original: "CommonJS (CJS) - Node.js 默认模块系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_commonjs_cjs_node')`,
      line: 75
    },
    {
      original: "ES Modules (ESM) - 现代模块系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_es_modules_esm')`,
      line: 84
    },
    {
      original: "🔍 模块解析机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_模块解析机制')`,
      line: 96
    },
    {
      original: "模块解析算法",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_模块解析算法')`,
      line: 99
    },
    {
      original: "📄 Package.json 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_package_json_配置')`,
      line: 112
    },
    {
      original: "基本配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_基本配置')`,
      line: 114
    },
    {
      original: "📦 NPM 包管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_npm_包管理')`,
      line: 126
    },
    {
      original: "依赖管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_依赖管理')`,
      line: 128
    },
    {
      original: "🛠️ 自定义模块开发",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_自定义模块开发')`,
      line: 140
    },
    {
      original: "模块开发最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_模块开发最佳实践')`,
      line: 142
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_最佳实践')`,
      line: 154
    },
    {
      original: "模块开发最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_模块开发最佳实践')`,
      line: 157
    },
    {
      original: "保持模块的单一职责原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_保持模块的单一职责原则')`,
      line: 160
    },
    {
      original: "使用清晰的命名和文档",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_使用清晰的命名和文档')`,
      line: 161
    },
    {
      original: "合理组织模块结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_合理组织模块结构')`,
      line: 162
    },
    {
      original: "遵循语义化版本控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_遵循语义化版本控制')`,
      line: 163
    },
    {
      original: "避免循环依赖",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_避免循环依赖')`,
      line: 164
    },
    {
      original: "使用TypeScript增强类型安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_使用typescript增强类型安全')`,
      line: 165
    },
    {
      original: "性能优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_性能优化建议')`,
      line: 175
    },
    {
      original: "使用动态导入进行代码分割",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_使用动态导入进行代码分割')`,
      line: 178
    },
    {
      original: "避免导入整个库，使用按需导入",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_避免导入整个库_使用按需导入')`,
      line: 179
    },
    {
      original: "合理使用模块缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_合理使用模块缓存')`,
      line: 180
    },
    {
      original: "定期清理未使用的依赖",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_定期清理未使用的依赖')`,
      line: 181
    },
    {
      original: "使用工具分析包大小",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\modulesdetail_使用工具分析包大小')`,
      line: 182
    },
  ],
  '..\frontEnd\src\views\Technology\pages\nodejs\MicroservicesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "学习如何使用Node.js构建可扩展的微服务架构",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_学习如何使用node_js构建可扩展的微服务架构')`,
      line: 38
    },
    {
      original: "📋 微服务概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_微服务概述')`,
      line: 43
    },
    {
      original: "什么是微服务",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_什么是微服务')`,
      line: 45
    },
    {
      original: "微服务的优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_微服务的优势')`,
      line: 52
    },
    {
      original: "技术多样性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_技术多样性')`,
      line: 55
    },
    {
      original: "独立部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_独立部署')`,
      line: 58
    },
    {
      original: "故障隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_故障隔离')`,
      line: 61
    },
    {
      original: "团队自治",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_团队自治')`,
      line: 64
    },
    {
      original: "可扩展性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_可扩展性')`,
      line: 67
    },
    {
      original: "微服务的挑战",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_微服务的挑战')`,
      line: 71
    },
    {
      original: "分布式复杂性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_分布式复杂性')`,
      line: 74
    },
    {
      original: "运维复杂性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_运维复杂性')`,
      line: 77
    },
    {
      original: "数据管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_数据管理')`,
      line: 80
    },
    {
      original: "服务治理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_服务治理')`,
      line: 83
    },
    {
      original: "🏗️ 架构设计",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_架构设计')`,
      line: 90
    },
    {
      original: "服务拆分策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_服务拆分策略')`,
      line: 92
    },
    {
      original: "1. 按业务领域拆分",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_1_按业务领域拆分')`,
      line: 95
    },
    {
      original: "2. 数据库拆分",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_2_数据库拆分')`,
      line: 106
    },
    {
      original: "3. 服务间通信",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_3_服务间通信')`,
      line: 117
    },
    {
      original: "🚪 API网关",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_api网关')`,
      line: 130
    },
    {
      original: "Express API网关",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_express_api网关')`,
      line: 132
    },
    {
      original: "服务发现与负载均衡",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_服务发现与负载均衡')`,
      line: 141
    },
    {
      original: "服务发现与负载均衡代码示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_服务发现与负载均衡代码示例')`,
      line: 143
    },
    {
      original: "📊 监控与日志",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_监控与日志')`,
      line: 149
    },
    {
      original: "分布式链路追踪",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_分布式链路追踪')`,
      line: 151
    },
    {
      original: "分布式链路追踪代码示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_分布式链路追踪代码示例')`,
      line: 153
    },
    {
      original: "健康检查与指标收集",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_健康检查与指标收集')`,
      line: 156
    },
    {
      original: "健康检查与指标收集代码示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_健康检查与指标收集代码示例')`,
      line: 158
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_最佳实践')`,
      line: 164
    },
    {
      original: "微服务最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_微服务最佳实践')`,
      line: 167
    },
    {
      original: "保持服务的单一职责原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_保持服务的单一职责原则')`,
      line: 170
    },
    {
      original: "使用异步通信减少服务间耦合",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_使用异步通信减少服务间耦合')`,
      line: 171
    },
    {
      original: "实现熔断器模式防止级联故障",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_实现熔断器模式防止级联故障')`,
      line: 172
    },
    {
      original: "建立完善的监控和日志系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_建立完善的监控和日志系统')`,
      line: 173
    },
    {
      original: "使用容器化技术简化部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_使用容器化技术简化部署')`,
      line: 174
    },
    {
      original: "实现自动化测试和CI/CD",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_实现自动化测试和ci_cd')`,
      line: 175
    },
    {
      original: "注意事项",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_注意事项')`,
      line: 185
    },
    {
      original: "避免过度拆分，增加不必要的复杂性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_避免过度拆分_增加不必要的复杂性')`,
      line: 188
    },
    {
      original: "确保数据一致性和事务处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_确保数据一致性和事务处理')`,
      line: 189
    },
    {
      original: "处理网络分区和服务故障",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_处理网络分区和服务故障')`,
      line: 190
    },
    {
      original: "建立服务版本管理策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_建立服务版本管理策略')`,
      line: 191
    },
    {
      original: "考虑安全性和认证授权",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\microservicesdetail_考虑安全性和认证授权')`,
      line: 192
    },
  ],
  '..\frontEnd\src\views\Technology\pages\nodejs\ExpressDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Express.js 框架详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_express_js_框架详解')`,
      line: 45
    },
    {
      original: "掌握Node.js最流行的Web应用框架，构建高效的服务端应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_掌握node_js最流行的web应用框架_构建高效的服务端应用')`,
      line: 46
    },
    {
      original: "Web框架",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_web框架')`,
      line: 49
    },
    {
      original: "中间件",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_中间件')`,
      line: 50
    },
    {
      original: "🚀 Express.js 基础入门",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_express_js_基础入门')`,
      line: 59
    },
    {
      original: "什么是Express.js？",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_什么是express_js')`,
      line: 61
    },
    {
      original: "快速开始",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_快速开始')`,
      line: 66
    },
    {
      original: "Express应用生成器",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_express应用生成器')`,
      line: 75
    },
    {
      original: "🛣️ 路由系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_路由系统')`,
      line: 87
    },
    {
      original: "1. 基本路由",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_1_基本路由')`,
      line: 90
    },
    {
      original: "2. 路由模块化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_2_路由模块化')`,
      line: 101
    },
    {
      original: "3. 路由模式匹配",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_3_路由模式匹配')`,
      line: 112
    },
    {
      original: "🔧 中间件系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_中间件系统')`,
      line: 125
    },
    {
      original: "内置中间件",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_内置中间件')`,
      line: 127
    },
    {
      original: "第三方中间件",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_第三方中间件')`,
      line: 136
    },
    {
      original: "自定义中间件",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_自定义中间件')`,
      line: 145
    },
    {
      original: "🚨 错误处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_错误处理')`,
      line: 157
    },
    {
      original: "错误处理中间件",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_错误处理中间件')`,
      line: 159
    },
    {
      original: "全局异常捕获",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_全局异常捕获')`,
      line: 168
    },
    {
      original: "🌐 RESTful API 设计",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_restful_api_设计')`,
      line: 180
    },
    {
      original: "RESTful API 示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_restful_api_示例')`,
      line: 182
    },
    {
      original: "✅ Express.js 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_express_js_最佳实践')`,
      line: 194
    },
    {
      original: "1. 项目结构组织",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_1_项目结构组织')`,
      line: 199
    },
    {
      original: "采用清晰的项目结构，便于维护和扩展",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_采用清晰的项目结构_便于维护和扩展')`,
      line: 200
    },
    {
      original: "2. 安全性配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_2_安全性配置')`,
      line: 214
    },
    {
      original: "实施必要的安全措施保护应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_实施必要的安全措施保护应用')`,
      line: 215
    },
    {
      original: "3. 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_3_性能优化')`,
      line: 229
    },
    {
      original: "优化应用性能，提升用户体验",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_优化应用性能_提升用户体验')`,
      line: 230
    },
    {
      original: "使用压缩中间件减少响应大小",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_使用压缩中间件减少响应大小')`,
      line: 232
    },
    {
      original: "启用HTTP缓存头",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_启用http缓存头')`,
      line: 233
    },
    {
      original: "使用连接池管理数据库连接",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_使用连接池管理数据库连接')`,
      line: 234
    },
    {
      original: "实施适当的日志级别",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_实施适当的日志级别')`,
      line: 235
    },
    {
      original: "使用集群模式充分利用多核CPU",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\expressdetail_使用集群模式充分利用多核cpu')`,
      line: 236
    },
  ],
  '..\frontEnd\src\views\Technology\pages\nodejs\EventLoopDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Node.js 事件循环机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_node_js_事件循环机制')`,
      line: 45
    },
    {
      original: "深入理解Node.js的事件循环原理与异步编程模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_深入理解node_js的事件循环原理与异步编程模式')`,
      line: 46
    },
    {
      original: "事件循环",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_事件循环')`,
      line: 49
    },
    {
      original: "异步编程",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_异步编程')`,
      line: 50
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_性能优化')`,
      line: 51
    },
    {
      original: "📚 事件循环基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_事件循环基础')`,
      line: 59
    },
    {
      original: "什么是事件循环？",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_什么是事件循环')`,
      line: 61
    },
    {
      original: "事件循环的阶段",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_事件循环的阶段')`,
      line: 66
    },
    {
      original: "执行顺序示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_执行顺序示例')`,
      line: 75
    },
    {
      original: "🎯 微任务与宏任务",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_微任务与宏任务')`,
      line: 87
    },
    {
      original: "微任务 (Microtasks)",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_微任务_microtasks')`,
      line: 90
    },
    {
      original: "宏任务 (Macrotasks)",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_宏任务_macrotasks')`,
      line: 101
    },
    {
      original: "💡 实际应用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_实际应用场景')`,
      line: 114
    },
    {
      original: "1. 避免阻塞事件循环",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_1_避免阻塞事件循环')`,
      line: 116
    },
    {
      original: "2. 理解异步操作的执行顺序",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_2_理解异步操作的执行顺序')`,
      line: 125
    },
    {
      original: "⚡ 性能优化技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_性能优化技巧')`,
      line: 137
    },
    {
      original: "1. 监控事件循环延迟",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_1_监控事件循环延迟')`,
      line: 139
    },
    {
      original: "✅ 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_最佳实践')`,
      line: 151
    },
    {
      original: "1. 避免长时间运行的同步操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_1_避免长时间运行的同步操作')`,
      line: 156
    },
    {
      original: "将CPU密集型任务分解为小块，使用setImmediate()让出控制权",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_将cpu密集型任务分解为小块_使用setimmediate_让出控制权')`,
      line: 157
    },
    {
      original: "2. 合理使用process.nextTick()",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_2_合理使用process_nexttick')`,
      line: 164
    },
    {
      original: "避免过度使用process.nextTick()，可能导致I/O饥饿",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_避免过度使用process_nexttick_可能导致i')`,
      line: 165
    },
    {
      original: "3. 监控应用性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_3_监控应用性能')`,
      line: 172
    },
    {
      original: "使用工具监控事件循环延迟和内存使用情况",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_使用工具监控事件循环延迟和内存使用情况')`,
      line: 173
    },
    {
      original: "4. 理解异步操作的执行顺序",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_4_理解异步操作的执行顺序')`,
      line: 180
    },
    {
      original: "掌握微任务和宏任务的执行优先级，编写可预测的异步代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\eventloopdetail_掌握微任务和宏任务的执行优先级_编写可预测的异步代码')`,
      line: 181
    },
  ],
  '..\frontEnd\src\views\Technology\pages\nodejs\DatabaseDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_加载失败_error')`,
      line: 22
    },
    {
      original: "学习Node.js中各种数据库的连接和操作方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_学习node_js中各种数据库的连接和操作方法')`,
      line: 38
    },
    {
      original: "📋 数据库概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_数据库概述')`,
      line: 43
    },
    {
      original: "支持的数据库类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_支持的数据库类型')`,
      line: 45
    },
    {
      original: "选择数据库的考虑因素",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_选择数据库的考虑因素')`,
      line: 54
    },
    {
      original: "数据结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_数据结构')`,
      line: 57
    },
    {
      original: "扩展性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_扩展性')`,
      line: 60
    },
    {
      original: "一致性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_一致性')`,
      line: 63
    },
    {
      original: "性能要求",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_性能要求')`,
      line: 66
    },
    {
      original: "开发复杂度",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_开发复杂度')`,
      line: 69
    },
    {
      original: "🐬 MySQL 数据库",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_mysql_数据库')`,
      line: 76
    },
    {
      original: "MySQL连接与操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_mysql连接与操作')`,
      line: 78
    },
    {
      original: "1. 原生驱动使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_1_原生驱动使用')`,
      line: 81
    },
    {
      original: "🍃 MongoDB 数据库",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_mongodb_数据库')`,
      line: 116
    },
    {
      original: "原生MongoDB驱动",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_原生mongodb驱动')`,
      line: 118
    },
    {
      original: "🔴 Redis 缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_redis_缓存')`,
      line: 139
    },
    {
      original: "Redis基本使用",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_redis基本使用')`,
      line: 141
    },
    {
      original: "Redis缓存策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_redis缓存策略')`,
      line: 150
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_最佳实践')`,
      line: 162
    },
    {
      original: "数据库最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_数据库最佳实践')`,
      line: 165
    },
    {
      original: "使用连接池管理数据库连接",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_使用连接池管理数据库连接')`,
      line: 168
    },
    {
      original: "实现适当的错误处理和重试机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_实现适当的错误处理和重试机制')`,
      line: 169
    },
    {
      original: "使用参数化查询防止SQL注入",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_使用参数化查询防止sql注入')`,
      line: 170
    },
    {
      original: "建立数据备份和恢复策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_建立数据备份和恢复策略')`,
      line: 171
    },
    {
      original: "监控数据库性能和慢查询",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_监控数据库性能和慢查询')`,
      line: 172
    },
    {
      original: "合理设计数据库索引",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_合理设计数据库索引')`,
      line: 173
    },
    {
      original: "性能优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_性能优化建议')`,
      line: 183
    },
    {
      original: "使用适当的数据类型和字段长度",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_使用适当的数据类型和字段长度')`,
      line: 186
    },
    {
      original: "避免N+1查询问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_避免n_1查询问题')`,
      line: 187
    },
    {
      original: "实现查询结果缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_实现查询结果缓存')`,
      line: 188
    },
    {
      original: "使用数据库分页而非应用层分页",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_使用数据库分页而非应用层分页')`,
      line: 189
    },
    {
      original: "定期分析和优化查询性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\databasedetail_定期分析和优化查询性能')`,
      line: 190
    },
  ],
  '..\frontEnd\src\views\Technology\pages\nodejs\AuthenticationDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Node.js 身份认证详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_node_js_身份认证详解')`,
      line: 45
    },
    {
      original: "掌握Node.js应用的身份认证与授权机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_掌握node_js应用的身份认证与授权机制')`,
      line: 46
    },
    {
      original: "身份认证",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_身份认证')`,
      line: 48
    },
    {
      original: "🔐 认证方式对比",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_认证方式对比')`,
      line: 59
    },
    {
      original: "主流认证方式",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_主流认证方式')`,
      line: 61
    },
    {
      original: "传统方式",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_传统方式')`,
      line: 66
    },
    {
      original: "✅ 优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_优势')`,
      line: 70
    },
    {
      original: "服务器完全控制会话",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_服务器完全控制会话')`,
      line: 72
    },
    {
      original: "可以随时撤销会话",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_可以随时撤销会话')`,
      line: 73
    },
    {
      original: "相对安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_相对安全')`,
      line: 74
    },
    {
      original: "实现简单",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_实现简单')`,
      line: 75
    },
    {
      original: "❌ 劣势",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_劣势')`,
      line: 79
    },
    {
      original: "服务器存储压力",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_服务器存储压力')`,
      line: 81
    },
    {
      original: "扩展性差",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_扩展性差')`,
      line: 82
    },
    {
      original: "跨域问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_跨域问题')`,
      line: 83
    },
    {
      original: "移动端支持差",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_移动端支持差')`,
      line: 84
    },
    {
      original: "无状态方式",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_无状态方式')`,
      line: 93
    },
    {
      original: "✅ 优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_优势')`,
      line: 97
    },
    {
      original: "无状态，易扩展",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_无状态_易扩展')`,
      line: 99
    },
    {
      original: "跨域友好",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_跨域友好')`,
      line: 100
    },
    {
      original: "移动端支持好",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_移动端支持好')`,
      line: 101
    },
    {
      original: "减少服务器存储",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_减少服务器存储')`,
      line: 102
    },
    {
      original: "❌ 劣势",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_劣势')`,
      line: 106
    },
    {
      original: "难以撤销令牌",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_难以撤销令牌')`,
      line: 108
    },
    {
      original: "令牌可能较大",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_令牌可能较大')`,
      line: 109
    },
    {
      original: "需要处理过期",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_需要处理过期')`,
      line: 110
    },
    {
      original: "安全性依赖实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_安全性依赖实现')`,
      line: 111
    },
    {
      original: "选择建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_选择建议')`,
      line: 119
    },
    {
      original: "对于单体应用推荐Session，对于微服务和移动应用推荐JWT。也可以结合使用，短期用JWT，长期用Refresh Token。",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_对于单体应用推荐session_对于微服务和移动应用推荐jwt_也可以结合使用')`,
      line: 120
    },
    {
      original: "🍪 Session 认证实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_session_认证实现')`,
      line: 128
    },
    {
      original: "1. Express Session配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_1_express_session配置')`,
      line: 131
    },
    {
      original: "2. 密码安全处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_2_密码安全处理')`,
      line: 142
    },
    {
      original: "3. 会话管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_3_会话管理')`,
      line: 153
    },
    {
      original: "🎫 JWT 认证实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_jwt_认证实现')`,
      line: 166
    },
    {
      original: "JWT基础实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_jwt基础实现')`,
      line: 168
    },
    {
      original: "JWT安全增强",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_jwt安全增强')`,
      line: 177
    },
    {
      original: "🔗 OAuth 第三方登录",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_oauth_第三方登录')`,
      line: 189
    },
    {
      original: "OAuth第三方登录",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_oauth第三方登录')`,
      line: 191
    },
    {
      original: "✅ 身份认证最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_身份认证最佳实践')`,
      line: 203
    },
    {
      original: "1. 安全存储",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_1_安全存储')`,
      line: 208
    },
    {
      original: "安全地存储和传输认证信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_安全地存储和传输认证信息')`,
      line: 209
    },
    {
      original: "使用强加密算法存储密码",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_使用强加密算法存储密码')`,
      line: 211
    },
    {
      original: "使用HTTPS传输敏感信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_使用https传输敏感信息')`,
      line: 212
    },
    {
      original: "设置安全的Cookie属性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_设置安全的cookie属性')`,
      line: 213
    },
    {
      original: "定期轮换密钥和令牌",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_定期轮换密钥和令牌')`,
      line: 214
    },
    {
      original: "2. 会话管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_2_会话管理')`,
      line: 222
    },
    {
      original: "合理管理用户会话",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_合理管理用户会话')`,
      line: 223
    },
    {
      original: "设置合适的会话过期时间",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_设置合适的会话过期时间')`,
      line: 225
    },
    {
      original: "实施会话固定攻击防护",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_实施会话固定攻击防护')`,
      line: 226
    },
    {
      original: "监控异常登录行为",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_监控异常登录行为')`,
      line: 227
    },
    {
      original: "提供安全的登出机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_提供安全的登出机制')`,
      line: 228
    },
    {
      original: "3. 多因素认证",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_3_多因素认证')`,
      line: 236
    },
    {
      original: "增强账户安全性",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_增强账户安全性')`,
      line: 237
    },
    {
      original: "支持短信验证码",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_支持短信验证码')`,
      line: 239
    },
    {
      original: "集成TOTP应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_集成totp应用')`,
      line: 240
    },
    {
      original: "提供备用恢复码",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_提供备用恢复码')`,
      line: 241
    },
    {
      original: "实施风险评估",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_实施风险评估')`,
      line: 242
    },
    {
      original: "4. 错误处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_4_错误处理')`,
      line: 250
    },
    {
      original: "安全的错误处理机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_安全的错误处理机制')`,
      line: 251
    },
    {
      original: "避免泄露敏感信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_避免泄露敏感信息')`,
      line: 253
    },
    {
      original: "实施登录尝试限制",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_实施登录尝试限制')`,
      line: 254
    },
    {
      original: "记录安全相关日志",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_记录安全相关日志')`,
      line: 255
    },
    {
      original: "提供友好的错误提示",
      replacement: `t('common:..\frontend\src\views\technology\pages\nodejs\authenticationdetail_提供友好的错误提示')`,
      line: 256
    },
  ],
  '..\frontEnd\src\views\Technology\pages\jest\UnitTestingDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Jest 单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_jest_单元测试')`,
      line: 45
    },
    {
      original: "掌握Jest单元测试的编写方法和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_掌握jest单元测试的编写方法和最佳实践')`,
      line: 46
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_单元测试')`,
      line: 48
    },
    {
      original: "断言",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_断言')`,
      line: 49
    },
    {
      original: "边界测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_边界测试')`,
      line: 50
    },
    {
      original: "📋 单元测试概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_单元测试概述')`,
      line: 58
    },
    {
      original: "什么是单元测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_什么是单元测试')`,
      line: 60
    },
    {
      original: "单元测试的特点",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_单元测试的特点')`,
      line: 67
    },
    {
      original: "独立性",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_独立性')`,
      line: 69
    },
    {
      original: "快速执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_快速执行')`,
      line: 70
    },
    {
      original: "可重复",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_可重复')`,
      line: 71
    },
    {
      original: "自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_自动化')`,
      line: 72
    },
    {
      original: "明确结果",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_明确结果')`,
      line: 73
    },
    {
      original: "单元测试的价值",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_单元测试的价值')`,
      line: 76
    },
    {
      original: "早期发现问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_早期发现问题')`,
      line: 79
    },
    {
      original: "重构保障",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_重构保障')`,
      line: 82
    },
    {
      original: "文档作用",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_文档作用')`,
      line: 85
    },
    {
      original: "设计改进",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_设计改进')`,
      line: 88
    },
    {
      original: "回归测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_回归测试')`,
      line: 91
    },
    {
      original: "🚀 基础函数测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_基础函数测试')`,
      line: 98
    },
    {
      original: "简单函数测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_简单函数测试')`,
      line: 100
    },
    {
      original: "边界条件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_边界条件测试')`,
      line: 109
    },
    {
      original: "🏗️ 类和对象测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_类和对象测试')`,
      line: 121
    },
    {
      original: "类方法测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_类方法测试')`,
      line: 123
    },
    {
      original: "状态测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_状态测试')`,
      line: 132
    },
    {
      original: "⚠️ 异常和错误测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_异常和错误测试')`,
      line: 144
    },
    {
      original: "异常抛出测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_异常抛出测试')`,
      line: 146
    },
    {
      original: "错误处理测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_错误处理测试')`,
      line: 155
    },
    {
      original: "🔄 参数化测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_参数化测试')`,
      line: 167
    },
    {
      original: "测试数据驱动",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试数据驱动')`,
      line: 169
    },
    {
      original: "测试用例生成",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试用例生成')`,
      line: 178
    },
    {
      original: "📚 测试组织与结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试组织与结构')`,
      line: 190
    },
    {
      original: "测试分组",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试分组')`,
      line: 192
    },
    {
      original: "测试生命周期",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试生命周期')`,
      line: 201
    },
    {
      original: "💡 单元测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_单元测试最佳实践')`,
      line: 213
    },
    {
      original: "测试编写原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试编写原则')`,
      line: 216
    },
    {
      original: "一个测试只验证一个行为",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_一个测试只验证一个行为')`,
      line: 222
    },
    {
      original: "测试名称要清晰描述测试场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试名称要清晰描述测试场景')`,
      line: 223
    },
    {
      original: "测试应该独立且可重复执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试应该独立且可重复执行')`,
      line: 224
    },
    {
      original: "优先测试核心业务逻辑",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_优先测试核心业务逻辑')`,
      line: 225
    },
    {
      original: "测试边界条件和异常情况",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试边界条件和异常情况')`,
      line: 226
    },
    {
      original: "测试质量保证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试质量保证')`,
      line: 236
    },
    {
      original: "覆盖率目标",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_覆盖率目标')`,
      line: 240
    },
    {
      original: "测试数据",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试数据')`,
      line: 243
    },
    {
      original: "断言明确",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_断言明确')`,
      line: 246
    },
    {
      original: "失败信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_失败信息')`,
      line: 249
    },
    {
      original: "测试维护",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_测试维护')`,
      line: 252
    },
    {
      original: "常见陷阱避免",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_常见陷阱避免')`,
      line: 263
    },
    {
      original: "避免测试实现细节",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_避免测试实现细节')`,
      line: 267
    },
    {
      original: "避免脆弱测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_避免脆弱测试')`,
      line: 270
    },
    {
      original: "避免重复测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_避免重复测试')`,
      line: 273
    },
    {
      original: "避免复杂测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_避免复杂测试')`,
      line: 276
    },
    {
      original: "避免忽略失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\unittestingdetail_避免忽略失败')`,
      line: 279
    },
  ],
  '..\frontEnd\src\views\Technology\pages\jest\MockingDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Jest Mock 与 Spy",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_jest_mock_与')`,
      line: 45
    },
    {
      original: "掌握Jest的Mock功能，实现依赖隔离和行为验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_掌握jest的mock功能_实现依赖隔离和行为验证')`,
      line: 46
    },
    {
      original: "依赖隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_依赖隔离')`,
      line: 50
    },
    {
      original: "📋 Mock 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_概述')`,
      line: 58
    },
    {
      original: "什么是 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_什么是_mock')`,
      line: 60
    },
    {
      original: "Mock 的类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_的类型')`,
      line: 67
    },
    {
      original: "函数 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_函数_mock')`,
      line: 69
    },
    {
      original: "模块 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_模块_mock')`,
      line: 70
    },
    {
      original: "类 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_类_mock')`,
      line: 71
    },
    {
      original: "部分 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_部分_mock')`,
      line: 72
    },
    {
      original: "Mock 的作用",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_的作用')`,
      line: 76
    },
    {
      original: "依赖隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_依赖隔离')`,
      line: 79
    },
    {
      original: "行为控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_行为控制')`,
      line: 82
    },
    {
      original: "交互验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_交互验证')`,
      line: 85
    },
    {
      original: "性能提升",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_性能提升')`,
      line: 88
    },
    {
      original: "边界测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_边界测试')`,
      line: 91
    },
    {
      original: "🔧 函数 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_函数_mock')`,
      line: 98
    },
    {
      original: "基础函数 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_基础函数_mock')`,
      line: 100
    },
    {
      original: "Mock 返回值",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_返回值')`,
      line: 109
    },
    {
      original: "📦 模块 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_模块_mock')`,
      line: 121
    },
    {
      original: "完整模块 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_完整模块_mock')`,
      line: 123
    },
    {
      original: "部分模块 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_部分模块_mock')`,
      line: 132
    },
    {
      original: "🕵️ Spy 功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_spy_功能')`,
      line: 144
    },
    {
      original: "对象方法 Spy",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_对象方法_spy')`,
      line: 146
    },
    {
      original: "全局函数 Spy",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_全局函数_spy')`,
      line: 155
    },
    {
      original: "⚙️ Mock 实现策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_实现策略')`,
      line: 167
    },
    {
      original: "自定义 Mock 实现",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_自定义_mock_实现')`,
      line: 169
    },
    {
      original: "异步 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_异步_mock')`,
      line: 178
    },
    {
      original: "✅ Mock 验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_验证')`,
      line: 190
    },
    {
      original: "调用验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_调用验证')`,
      line: 192
    },
    {
      original: "高级验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_高级验证')`,
      line: 201
    },
    {
      original: "💡 Mock 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_最佳实践')`,
      line: 213
    },
    {
      original: "Mock 使用原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_使用原则')`,
      line: 216
    },
    {
      original: "只 Mock 必要的依赖项，避免过度 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_只_mock_必要的依赖项')`,
      line: 219
    },
    {
      original: "Mock 应该尽可能简单和明确",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_应该尽可能简单和明确')`,
      line: 220
    },
    {
      original: "验证重要的交互，忽略实现细节",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_验证重要的交互_忽略实现细节')`,
      line: 221
    },
    {
      original: "使用有意义的 Mock 数据",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_使用有意义的_mock_数据')`,
      line: 222
    },
    {
      original: "在测试后清理 Mock 状态",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_在测试后清理_mock_状态')`,
      line: 223
    },
    {
      original: "优先使用真实对象，必要时才使用 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_优先使用真实对象_必要时才使用_mock')`,
      line: 224
    },
    {
      original: "Mock 策略选择",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_策略选择')`,
      line: 234
    },
    {
      original: "函数 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_函数_mock')`,
      line: 238
    },
    {
      original: "模块 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_模块_mock')`,
      line: 241
    },
    {
      original: "部分 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_部分_mock')`,
      line: 244
    },
    {
      original: "手动 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_手动_mock')`,
      line: 250
    },
    {
      original: "常见陷阱避免",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_常见陷阱避免')`,
      line: 261
    },
    {
      original: "过度 Mock",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_过度_mock')`,
      line: 265
    },
    {
      original: "Mock 泄露",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_泄露')`,
      line: 268
    },
    {
      original: "实现耦合",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_实现耦合')`,
      line: 271
    },
    {
      original: "验证过度",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_验证过度')`,
      line: 274
    },
    {
      original: "Mock 复杂化",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\mockingdetail_mock_复杂化')`,
      line: 277
    },
  ],
  '..\frontEnd\src\views\Technology\pages\jest\JestBasicsDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Jest 基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_jest_基础配置')`,
      line: 45
    },
    {
      original: "掌握Jest测试框架的安装、配置和基本概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_掌握jest测试框架的安装_配置和基本概念')`,
      line: 46
    },
    {
      original: "基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_基础配置')`,
      line: 48
    },
    {
      original: "安装",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_安装')`,
      line: 49
    },
    {
      original: "项目结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_项目结构')`,
      line: 50
    },
    {
      original: "📋 Jest 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_jest_概述')`,
      line: 58
    },
    {
      original: "什么是 Jest",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_什么是_jest')`,
      line: 60
    },
    {
      original: "核心特性",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_核心特性')`,
      line: 67
    },
    {
      original: "零配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_零配置')`,
      line: 69
    },
    {
      original: "快照测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_快照测试')`,
      line: 70
    },
    {
      original: "并行测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_并行测试')`,
      line: 71
    },
    {
      original: "代码覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_代码覆盖率')`,
      line: 72
    },
    {
      original: "Mock 功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_mock_功能')`,
      line: 73
    },
    {
      original: "监视模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_监视模式')`,
      line: 74
    },
    {
      original: "Jest 优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_jest_优势')`,
      line: 77
    },
    {
      original: "开箱即用",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_开箱即用')`,
      line: 80
    },
    {
      original: "功能全面",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_功能全面')`,
      line: 83
    },
    {
      original: "性能优秀",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_性能优秀')`,
      line: 86
    },
    {
      original: "生态丰富",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_生态丰富')`,
      line: 89
    },
    {
      original: "开发体验",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_开发体验')`,
      line: 92
    },
    {
      original: "🚀 安装与配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_安装与配置')`,
      line: 99
    },
    {
      original: "安装 Jest",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_安装_jest')`,
      line: 101
    },
    {
      original: "基础配置文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_基础配置文件')`,
      line: 110
    },
    {
      original: "TypeScript 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_typescript_配置')`,
      line: 119
    },
    {
      original: "📚 基本概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_基本概念')`,
      line: 131
    },
    {
      original: "测试结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_测试结构')`,
      line: 133
    },
    {
      original: "常用匹配器",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_常用匹配器')`,
      line: 142
    },
    {
      original: "⚡ 测试命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_测试命令')`,
      line: 154
    },
    {
      original: "常用命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_常用命令')`,
      line: 156
    },
    {
      original: "监视模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_监视模式')`,
      line: 165
    },
    {
      original: "📁 项目结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_项目结构')`,
      line: 177
    },
    {
      original: "推荐的目录结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_推荐的目录结构')`,
      line: 179
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_最佳实践')`,
      line: 191
    },
    {
      original: "Jest 配置建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_jest_配置建议')`,
      line: 194
    },
    {
      original: "使用 jest.config.js 文件进行配置管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_使用_jest_config')`,
      line: 197
    },
    {
      original: "合理设置测试环境（node、jsdom等）",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_合理设置测试环境_node_jsdom等')`,
      line: 198
    },
    {
      original: "配置适当的测试文件匹配模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_配置适当的测试文件匹配模式')`,
      line: 199
    },
    {
      original: "启用代码覆盖率收集",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_启用代码覆盖率收集')`,
      line: 200
    },
    {
      original: "设置合理的覆盖率阈值",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_设置合理的覆盖率阈值')`,
      line: 201
    },
    {
      original: "使用 setupFilesAfterEnv 进行全局设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_使用_setupfilesafterenv_进行全局设置')`,
      line: 202
    },
    {
      original: "测试文件组织",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_测试文件组织')`,
      line: 212
    },
    {
      original: "命名规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_命名规范')`,
      line: 216
    },
    {
      original: "目录结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_目录结构')`,
      line: 219
    },
    {
      original: "分组测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_分组测试')`,
      line: 222
    },
    {
      original: "测试描述",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_测试描述')`,
      line: 225
    },
    {
      original: "测试隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_测试隔离')`,
      line: 228
    },
    {
      original: "性能优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_性能优化建议')`,
      line: 239
    },
    {
      original: "并行执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_并行执行')`,
      line: 243
    },
    {
      original: "测试缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_测试缓存')`,
      line: 246
    },
    {
      original: "选择性运行",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_选择性运行')`,
      line: 249
    },
    {
      original: "资源清理",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_资源清理')`,
      line: 252
    },
    {
      original: "Mock 优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\jestbasicsdetail_mock_优化')`,
      line: 255
    },
  ],
  '..\frontEnd\src\views\Technology\pages\jest\CoverageDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Jest 测试覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_jest_测试覆盖率')`,
      line: 45
    },
    {
      original: "掌握代码覆盖率分析、报告生成与质量评估",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_掌握代码覆盖率分析_报告生成与质量评估')`,
      line: 46
    },
    {
      original: "覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率')`,
      line: 48
    },
    {
      original: "报告",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_报告')`,
      line: 49
    },
    {
      original: "质量评估",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_质量评估')`,
      line: 50
    },
    {
      original: "📋 测试覆盖率概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_测试覆盖率概述')`,
      line: 58
    },
    {
      original: "什么是测试覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_什么是测试覆盖率')`,
      line: 60
    },
    {
      original: "覆盖率类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率类型')`,
      line: 66
    },
    {
      original: "语句覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_语句覆盖率')`,
      line: 68
    },
    {
      original: "分支覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_分支覆盖率')`,
      line: 69
    },
    {
      original: "函数覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_函数覆盖率')`,
      line: 70
    },
    {
      original: "行覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_行覆盖率')`,
      line: 71
    },
    {
      original: "覆盖率的价值",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率的价值')`,
      line: 74
    },
    {
      original: "质量评估",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_质量评估')`,
      line: 77
    },
    {
      original: "风险识别",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_风险识别')`,
      line: 80
    },
    {
      original: "重构保障",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_重构保障')`,
      line: 83
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_团队协作')`,
      line: 86
    },
    {
      original: "持续改进",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_持续改进')`,
      line: 89
    },
    {
      original: "⚙️ 覆盖率配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率配置')`,
      line: 96
    },
    {
      original: "基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_基础配置')`,
      line: 98
    },
    {
      original: "高级配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_高级配置')`,
      line: 107
    },
    {
      original: "🎯 覆盖率阈值",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率阈值')`,
      line: 119
    },
    {
      original: "阈值设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_阈值设置')`,
      line: 121
    },
    {
      original: "分目录阈值",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_分目录阈值')`,
      line: 130
    },
    {
      original: "📊 覆盖率报告",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率报告')`,
      line: 142
    },
    {
      original: "报告格式配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_报告格式配置')`,
      line: 144
    },
    {
      original: "自定义报告",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_自定义报告')`,
      line: 153
    },
    {
      original: "🚀 覆盖率优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率优化')`,
      line: 165
    },
    {
      original: "提高覆盖率策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_提高覆盖率策略')`,
      line: 167
    },
    {
      original: "覆盖率分析",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率分析')`,
      line: 176
    },
    {
      original: "🔄 CI/CD 集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_ci_cd_集成')`,
      line: 188
    },
    {
      original: "GitHub Actions 集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_github_actions_集成')`,
      line: 190
    },
    {
      original: "覆盖率徽章",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率徽章')`,
      line: 199
    },
    {
      original: "💡 覆盖率最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率最佳实践')`,
      line: 211
    },
    {
      original: "覆盖率目标设定",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率目标设定')`,
      line: 214
    },
    {
      original: "核心业务逻辑：90-95% 覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_核心业务逻辑_90_95')`,
      line: 217
    },
    {
      original: "工具函数和库：85-90% 覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_工具函数和库_85_90')`,
      line: 218
    },
    {
      original: "UI组件：70-80% 覆盖率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_ui组件_70_80')`,
      line: 219
    },
    {
      original: "配置文件：可以较低或排除",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_配置文件_可以较低或排除')`,
      line: 220
    },
    {
      original: "第三方库：通常排除在外",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_第三方库_通常排除在外')`,
      line: 221
    },
    {
      original: "渐进式提升，避免一步到位",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_渐进式提升_避免一步到位')`,
      line: 222
    },
    {
      original: "覆盖率质量保证",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率质量保证')`,
      line: 232
    },
    {
      original: "质量优于数量",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_质量优于数量')`,
      line: 236
    },
    {
      original: "边界测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_边界测试')`,
      line: 239
    },
    {
      original: "业务逻辑",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_业务逻辑')`,
      line: 242
    },
    {
      original: "代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_代码审查')`,
      line: 245
    },
    {
      original: "定期评估",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_定期评估')`,
      line: 248
    },
    {
      original: "常见误区避免",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_常见误区避免')`,
      line: 259
    },
    {
      original: "盲目追求100%",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_盲目追求100')`,
      line: 263
    },
    {
      original: "忽视测试质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_忽视测试质量')`,
      line: 266
    },
    {
      original: "测试实现细节",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_测试实现细节')`,
      line: 269
    },
    {
      original: "覆盖率造假",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_覆盖率造假')`,
      line: 272
    },
    {
      original: "忽视维护成本",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\coveragedetail_忽视维护成本')`,
      line: 275
    },
  ],
  '..\frontEnd\src\views\Technology\pages\jest\BestPracticesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Jest 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_jest_最佳实践')`,
      line: 45
    },
    {
      original: "掌握Jest测试的最佳实践、性能优化与团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_掌握jest测试的最佳实践_性能优化与团队协作')`,
      line: 46
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_最佳实践')`,
      line: 48
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_性能优化')`,
      line: 49
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_团队协作')`,
      line: 50
    },
    {
      original: "📋 测试最佳实践概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试最佳实践概述')`,
      line: 58
    },
    {
      original: "为什么需要最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_为什么需要最佳实践')`,
      line: 60
    },
    {
      original: "实践领域",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_实践领域')`,
      line: 67
    },
    {
      original: "测试结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试结构')`,
      line: 69
    },
    {
      original: "命名规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_命名规范')`,
      line: 70
    },
    {
      original: "测试策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试策略')`,
      line: 71
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_性能优化')`,
      line: 72
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_团队协作')`,
      line: 73
    },
    {
      original: "CI/CD集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_ci_cd集成')`,
      line: 74
    },
    {
      original: "实践价值",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_实践价值')`,
      line: 77
    },
    {
      original: "代码质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_代码质量')`,
      line: 80
    },
    {
      original: "开发效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_开发效率')`,
      line: 83
    },
    {
      original: "维护成本",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_维护成本')`,
      line: 86
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_团队协作')`,
      line: 89
    },
    {
      original: "持续集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_持续集成')`,
      line: 92
    },
    {
      original: "🏗️ 测试结构最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试结构最佳实践')`,
      line: 99
    },
    {
      original: "AAA 模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_aaa_模式')`,
      line: 101
    },
    {
      original: "测试组织",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试组织')`,
      line: 110
    },
    {
      original: "📝 命名规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_命名规范')`,
      line: 122
    },
    {
      original: "测试命名",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试命名')`,
      line: 124
    },
    {
      original: "变量命名",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_变量命名')`,
      line: 133
    },
    {
      original: "🎯 测试策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试策略')`,
      line: 145
    },
    {
      original: "测试金字塔",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试金字塔')`,
      line: 147
    },
    {
      original: "测试分类",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试分类')`,
      line: 156
    },
    {
      original: "⚡ 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_性能优化')`,
      line: 168
    },
    {
      original: "测试性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试性能优化')`,
      line: 170
    },
    {
      original: "并行测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_并行测试')`,
      line: 179
    },
    {
      original: "👥 团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_团队协作')`,
      line: 191
    },
    {
      original: "代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_代码审查')`,
      line: 193
    },
    {
      original: "测试文档",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试文档')`,
      line: 202
    },
    {
      original: "🔄 CI/CD 集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_ci_cd_集成')`,
      line: 214
    },
    {
      original: "持续集成配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_持续集成配置')`,
      line: 216
    },
    {
      original: "💡 最佳实践总结",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_最佳实践总结')`,
      line: 228
    },
    {
      original: "核心原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_核心原则')`,
      line: 231
    },
    {
      original: "测试应该简单、清晰、易于理解",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试应该简单_清晰_易于理解')`,
      line: 234
    },
    {
      original: "一个测试只验证一个行为",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_一个测试只验证一个行为')`,
      line: 235
    },
    {
      original: "测试应该独立且可重复执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_测试应该独立且可重复执行')`,
      line: 236
    },
    {
      original: "优先测试核心业务逻辑",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_优先测试核心业务逻辑')`,
      line: 237
    },
    {
      original: "保持测试代码的高质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_保持测试代码的高质量')`,
      line: 238
    },
    {
      original: "定期重构和维护测试代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_定期重构和维护测试代码')`,
      line: 239
    },
    {
      original: "团队协作建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_团队协作建议')`,
      line: 249
    },
    {
      original: "统一标准",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_统一标准')`,
      line: 253
    },
    {
      original: "代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_代码审查')`,
      line: 256
    },
    {
      original: "知识分享",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_知识分享')`,
      line: 259
    },
    {
      original: "工具统一",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_工具统一')`,
      line: 262
    },
    {
      original: "持续改进",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_持续改进')`,
      line: 265
    },
    {
      original: "常见问题避免",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_常见问题避免')`,
      line: 276
    },
    {
      original: "过度测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_过度测试')`,
      line: 280
    },
    {
      original: "脆弱测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_脆弱测试')`,
      line: 283
    },
    {
      original: "重复测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_重复测试')`,
      line: 286
    },
    {
      original: "忽视维护",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_忽视维护')`,
      line: 289
    },
    {
      original: "缺乏文档",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\bestpracticesdetail_缺乏文档')`,
      line: 292
    },
  ],
  '..\frontEnd\src\views\Technology\pages\jest\AsyncTestingDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Jest 异步测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_jest_异步测试')`,
      line: 45
    },
    {
      original: "掌握Promise、async/await和异步代码的测试方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_掌握promise_async_await和异步代码的测试方法')`,
      line: 46
    },
    {
      original: "异步测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_异步测试')`,
      line: 48
    },
    {
      original: "📋 异步测试概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_异步测试概述')`,
      line: 58
    },
    {
      original: "异步测试的重要性",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_异步测试的重要性')`,
      line: 60
    },
    {
      original: "异步测试类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_异步测试类型')`,
      line: 67
    },
    {
      original: "Promise 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_promise_测试')`,
      line: 69
    },
    {
      original: "async/await 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_async_await_测试')`,
      line: 70
    },
    {
      original: "回调函数测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_回调函数测试')`,
      line: 71
    },
    {
      original: "定时器测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_定时器测试')`,
      line: 72
    },
    {
      original: "事件测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_事件测试')`,
      line: 73
    },
    {
      original: "常见异步场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_常见异步场景')`,
      line: 76
    },
    {
      original: "API 请求",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_api_请求')`,
      line: 79
    },
    {
      original: "数据库操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_数据库操作')`,
      line: 82
    },
    {
      original: "文件操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_文件操作')`,
      line: 85
    },
    {
      original: "定时器",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_定时器')`,
      line: 88
    },
    {
      original: "事件处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_事件处理')`,
      line: 91
    },
    {
      original: "🤝 Promise 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_promise_测试')`,
      line: 98
    },
    {
      original: "基础 Promise 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_基础_promise_测试')`,
      line: 100
    },
    {
      original: "Promise 错误处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_promise_错误处理')`,
      line: 109
    },
    {
      original: "⚡ async/await 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_async_await_测试')`,
      line: 121
    },
    {
      original: "async/await 基础测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_async_await_基础测试')`,
      line: 123
    },
    {
      original: "并发异步测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_并发异步测试')`,
      line: 132
    },
    {
      original: "⏰ 定时器测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_定时器测试')`,
      line: 144
    },
    {
      original: "假定时器",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_假定时器')`,
      line: 146
    },
    {
      original: "定时器高级用法",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_定时器高级用法')`,
      line: 155
    },
    {
      original: "🌐 API 测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_api_测试')`,
      line: 167
    },
    {
      original: "HTTP 请求测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_http_请求测试')`,
      line: 169
    },
    {
      original: "API 错误处理测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_api_错误处理测试')`,
      line: 178
    },
    {
      original: "📞 回调函数测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_回调函数测试')`,
      line: 190
    },
    {
      original: "传统回调测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_传统回调测试')`,
      line: 192
    },
    {
      original: "💡 异步测试最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_异步测试最佳实践')`,
      line: 204
    },
    {
      original: "异步测试原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_异步测试原则')`,
      line: 207
    },
    {
      original: "优先使用 async/await 语法，代码更清晰",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_优先使用_async_await')`,
      line: 210
    },
    {
      original: "正确处理 Promise 的 resolve 和 reject",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_正确处理_promise_的')`,
      line: 211
    },
    {
      original: "使用 expect.assertions() 确保异步断言被执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_使用_expect_assertions')`,
      line: 212
    },
    {
      original: "合理设置测试超时时间",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_合理设置测试超时时间')`,
      line: 213
    },
    {
      original: "使用假定时器避免真实等待",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_使用假定时器避免真实等待')`,
      line: 214
    },
    {
      original: "Mock 外部依赖，专注测试逻辑",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_mock_外部依赖_专注测试逻辑')`,
      line: 215
    },
    {
      original: "性能优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_性能优化建议')`,
      line: 225
    },
    {
      original: "并行测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_并行测试')`,
      line: 229
    },
    {
      original: "假定时器",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_假定时器')`,
      line: 232
    },
    {
      original: "Mock 网络",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_mock_网络')`,
      line: 236
    },
    {
      original: "超时控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_超时控制')`,
      line: 239
    },
    {
      original: "资源清理",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_资源清理')`,
      line: 242
    },
    {
      original: "常见陷阱避免",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_常见陷阱避免')`,
      line: 253
    },
    {
      original: "忘记等待",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_忘记等待')`,
      line: 257
    },
    {
      original: "竞态条件",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_竞态条件')`,
      line: 260
    },
    {
      original: "内存泄漏",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_内存泄漏')`,
      line: 263
    },
    {
      original: "假阳性",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_假阳性')`,
      line: 266
    },
    {
      original: "超时设置",
      replacement: `t('common:..\frontend\src\views\technology\pages\jest\asynctestingdetail_超时设置')`,
      line: 269
    },
  ],
  '..\frontEnd\src\views\Technology\pages\git\SecurityBestPracticesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_加载中')`,
      line: 13
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_加载失败_error')`,
      line: 14
    },
    {
      original: "Git 安全最佳实践详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_git_安全最佳实践详解')`,
      line: 40
    },
    {
      original: "掌握Git和GitHub的安全防护与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_掌握git和github的安全防护与最佳实践')`,
      line: 41
    },
    {
      original: "Git安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_git安全')`,
      line: 43
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_最佳实践')`,
      line: 44
    },
    {
      original: "安全防护",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_安全防护')`,
      line: 45
    },
    {
      original: "权限管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_权限管理')`,
      line: 46
    },
    {
      original: "🛡️ Git 安全威胁概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_git_安全威胁概述')`,
      line: 54
    },
    {
      original: "常见安全威胁",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_常见安全威胁')`,
      line: 56
    },
    {
      original: "🔐 凭据泄露",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_凭据泄露')`,
      line: 63
    },
    {
      original: "敏感信息意外提交",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_敏感信息意外提交')`,
      line: 64
    },
    {
      original: "API密钥和令牌",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_api密钥和令牌')`,
      line: 66
    },
    {
      original: "数据库连接字符串",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_数据库连接字符串')`,
      line: 67
    },
    {
      original: "私钥和证书",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_私钥和证书')`,
      line: 68
    },
    {
      original: "密码和配置文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_密码和配置文件')`,
      line: 69
    },
    {
      original: "👤 身份伪造",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_身份伪造')`,
      line: 74
    },
    {
      original: "提交身份验证问题",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_提交身份验证问题')`,
      line: 75
    },
    {
      original: "伪造提交者信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_伪造提交者信息')`,
      line: 77
    },
    {
      original: "未签名的提交",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_未签名的提交')`,
      line: 78
    },
    {
      original: "账户劫持",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_账户劫持')`,
      line: 79
    },
    {
      original: "社会工程攻击",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_社会工程攻击')`,
      line: 80
    },
    {
      original: "🔓 权限滥用",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_权限滥用')`,
      line: 85
    },
    {
      original: "访问控制不当",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_访问控制不当')`,
      line: 86
    },
    {
      original: "过度权限分配",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_过度权限分配')`,
      line: 88
    },
    {
      original: "权限管理不当",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_权限管理不当')`,
      line: 89
    },
    {
      original: "分支保护不足",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_分支保护不足')`,
      line: 90
    },
    {
      original: "第三方应用风险",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_第三方应用风险')`,
      line: 91
    },
    {
      original: "🦠 恶意代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_恶意代码')`,
      line: 96
    },
    {
      original: "代码安全威胁",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_代码安全威胁')`,
      line: 97
    },
    {
      original: "恶意依赖包",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_恶意依赖包')`,
      line: 99
    },
    {
      original: "供应链攻击",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_供应链攻击')`,
      line: 100
    },
    {
      original: "代码注入",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_代码注入')`,
      line: 101
    },
    {
      original: "后门植入",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_后门植入')`,
      line: 102
    },
    {
      original: "安全提醒",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_安全提醒')`,
      line: 108
    },
    {
      original: "一旦敏感信息被提交到Git历史中，即使后续删除，仍可能被恶意用户获取。预防胜于治疗。",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_一旦敏感信息被提交到git历史中_即使后续删除_仍可能被恶意用户获取')`,
      line: 109
    },
    {
      original: "🔒 敏感信息防护",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_敏感信息防护')`,
      line: 117
    },
    {
      original: "1. 环境变量管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_1_环境变量管理')`,
      line: 120
    },
    {
      original: "环境变量管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_环境变量管理')`,
      line: 125
    },
    {
      original: "2. Git Secrets工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_2_git_secrets工具')`,
      line: 131
    },
    {
      original: "Git Secrets工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_git_secrets工具')`,
      line: 136
    },
    {
      original: "3. 敏感信息清理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_3_敏感信息清理')`,
      line: 142
    },
    {
      original: "敏感信息清理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_敏感信息清理')`,
      line: 147
    },
    {
      original: "✍️ 身份验证与签名",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_身份验证与签名')`,
      line: 155
    },
    {
      original: "GPG签名配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_gpg签名配置')`,
      line: 157
    },
    {
      original: "GPG签名配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_gpg签名配置')`,
      line: 162
    },
    {
      original: "SSH密钥管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_ssh密钥管理')`,
      line: 166
    },
    {
      original: "SSH密钥管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_ssh密钥管理')`,
      line: 171
    },
    {
      original: "👥 权限管理与访问控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_权限管理与访问控制')`,
      line: 178
    },
    {
      original: "GitHub权限管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_github权限管理')`,
      line: 180
    },
    {
      original: "GitHub权限管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_github权限管理')`,
      line: 185
    },
    {
      original: "访问令牌管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_访问令牌管理')`,
      line: 189
    },
    {
      original: "访问令牌管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_访问令牌管理')`,
      line: 194
    },
    {
      original: "✅ Git 安全最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_git_安全最佳实践')`,
      line: 201
    },
    {
      original: "1. 预防措施",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_1_预防措施')`,
      line: 206
    },
    {
      original: "建立安全防护机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_建立安全防护机制')`,
      line: 207
    },
    {
      original: "配置.gitignore忽略敏感文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_配置_gitignore忽略敏感文件')`,
      line: 209
    },
    {
      original: "使用环境变量管理配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_使用环境变量管理配置')`,
      line: 210
    },
    {
      original: "部署Git Hooks进行检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_部署git_hooks进行检查')`,
      line: 211
    },
    {
      original: "定期进行安全审计",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_定期进行安全审计')`,
      line: 212
    },
    {
      original: "2. 身份验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_2_身份验证')`,
      line: 220
    },
    {
      original: "确保提交身份可信",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_确保提交身份可信')`,
      line: 221
    },
    {
      original: "启用GPG签名验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_启用gpg签名验证')`,
      line: 223
    },
    {
      original: "使用强密码和2FA",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_使用强密码和2fa')`,
      line: 224
    },
    {
      original: "定期轮换访问令牌",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_定期轮换访问令牌')`,
      line: 225
    },
    {
      original: "监控异常登录活动",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_监控异常登录活动')`,
      line: 226
    },
    {
      original: "3. 权限控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_3_权限控制')`,
      line: 234
    },
    {
      original: "实施最小权限原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_实施最小权限原则')`,
      line: 235
    },
    {
      original: "合理分配仓库权限",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_合理分配仓库权限')`,
      line: 237
    },
    {
      original: "配置分支保护规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_配置分支保护规则')`,
      line: 238
    },
    {
      original: "使用CODEOWNERS文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_使用codeowners文件')`,
      line: 239
    },
    {
      original: "定期审查权限分配",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_定期审查权限分配')`,
      line: 240
    },
    {
      original: "4. 应急响应",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_4_应急响应')`,
      line: 248
    },
    {
      original: "制定安全事件响应计划",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_制定安全事件响应计划')`,
      line: 249
    },
    {
      original: "建立事件响应流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_建立事件响应流程')`,
      line: 251
    },
    {
      original: "准备历史清理工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_准备历史清理工具')`,
      line: 252
    },
    {
      original: "制定通知机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_制定通知机制')`,
      line: 253
    },
    {
      original: "定期演练应急预案",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\securitybestpracticesdetail_定期演练应急预案')`,
      line: 254
    },
  ],
  '..\frontEnd\src\views\Technology\pages\git\GitHubWorkflowDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "GitHub 工作流详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_github_工作流详解')`,
      line: 45
    },
    {
      original: "掌握GitHub协作开发的完整工作流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_掌握github协作开发的完整工作流程')`,
      line: 46
    },
    {
      original: "协作开发",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_协作开发')`,
      line: 51
    },
    {
      original: "🔄 GitHub 工作流概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_github_工作流概述')`,
      line: 59
    },
    {
      original: "GitHub Flow 核心理念",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_github_flow_核心理念')`,
      line: 61
    },
    {
      original: "工作流步骤",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_工作流步骤')`,
      line: 67
    },
    {
      original: "创建分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_创建分支')`,
      line: 72
    },
    {
      original: "从main分支创建功能分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_从main分支创建功能分支')`,
      line: 73
    },
    {
      original: "添加提交",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_添加提交')`,
      line: 80
    },
    {
      original: "在分支上进行开发并提交代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_在分支上进行开发并提交代码')`,
      line: 81
    },
    {
      original: "创建PR",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_创建pr')`,
      line: 88
    },
    {
      original: "开启Pull Request进行讨论",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_开启pull_request进行讨论')`,
      line: 89
    },
    {
      original: "代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_代码审查')`,
      line: 96
    },
    {
      original: "团队成员审查和讨论代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_团队成员审查和讨论代码')`,
      line: 97
    },
    {
      original: "部署测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_部署测试')`,
      line: 104
    },
    {
      original: "在测试环境验证功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_在测试环境验证功能')`,
      line: 105
    },
    {
      original: "合并部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_合并部署')`,
      line: 112
    },
    {
      original: "合并到main并部署到生产",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_合并到main并部署到生产')`,
      line: 113
    },
    {
      original: "🔀 Pull Request 详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_pull_request_详解')`,
      line: 121
    },
    {
      original: "1. 创建Pull Request",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_1_创建pull_request')`,
      line: 124
    },
    {
      original: "2. PR模板和规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_2_pr模板和规范')`,
      line: 135
    },
    {
      original: "3. PR状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_3_pr状态管理')`,
      line: 146
    },
    {
      original: "👀 代码审查最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_代码审查最佳实践')`,
      line: 159
    },
    {
      original: "审查者指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_审查者指南')`,
      line: 161
    },
    {
      original: "审查评论技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_审查评论技巧')`,
      line: 170
    },
    {
      original: "🛡️ 分支保护与自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_分支保护与自动化')`,
      line: 182
    },
    {
      original: "分支保护规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_分支保护规则')`,
      line: 184
    },
    {
      original: "✅ GitHub 工作流最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_github_工作流最佳实践')`,
      line: 196
    },
    {
      original: "1. PR管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_1_pr管理')`,
      line: 201
    },
    {
      original: "高效的Pull Request管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_高效的pull_request管理')`,
      line: 202
    },
    {
      original: "保持PR小而专注，易于审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_保持pr小而专注_易于审查')`,
      line: 204
    },
    {
      original: "写清晰的PR描述和提交信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_写清晰的pr描述和提交信息')`,
      line: 205
    },
    {
      original: "及时响应审查意见",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_及时响应审查意见')`,
      line: 206
    },
    {
      original: "使用Draft PR进行早期反馈",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_使用draft_pr进行早期反馈')`,
      line: 207
    },
    {
      original: "2. 代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_2_代码审查')`,
      line: 215
    },
    {
      original: "建设性的代码审查文化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_建设性的代码审查文化')`,
      line: 216
    },
    {
      original: "及时进行代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_及时进行代码审查')`,
      line: 218
    },
    {
      original: "提供建设性的反馈",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_提供建设性的反馈')`,
      line: 219
    },
    {
      original: "关注代码质量和安全性",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_关注代码质量和安全性')`,
      line: 220
    },
    {
      original: "学习和分享最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_学习和分享最佳实践')`,
      line: 221
    },
    {
      original: "3. 自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_3_自动化')`,
      line: 229
    },
    {
      original: "充分利用GitHub的自动化功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_充分利用github的自动化功能')`,
      line: 230
    },
    {
      original: "设置CI/CD流水线",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_设置ci_cd流水线')`,
      line: 232
    },
    {
      original: "使用分支保护规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_使用分支保护规则')`,
      line: 233
    },
    {
      original: "自动化测试和部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_自动化测试和部署')`,
      line: 234
    },
    {
      original: "集成第三方工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_集成第三方工具')`,
      line: 235
    },
    {
      original: "4. 团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_4_团队协作')`,
      line: 243
    },
    {
      original: "促进团队高效协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_促进团队高效协作')`,
      line: 244
    },
    {
      original: "建立清晰的工作流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_建立清晰的工作流程')`,
      line: 246
    },
    {
      original: "使用Issue跟踪任务",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_使用issue跟踪任务')`,
      line: 247
    },
    {
      original: "定期进行项目回顾",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_定期进行项目回顾')`,
      line: 248
    },
    {
      original: "文档化团队规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubworkflowdetail_文档化团队规范')`,
      line: 249
    },
  ],
  '..\frontEnd\src\views\Technology\pages\git\GitHubActionsDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "GitHub Actions 自动化详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_github_actions_自动化详解')`,
      line: 45
    },
    {
      original: "掌握GitHub的CI/CD自动化工作流，提升开发效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_掌握github的ci_cd自动化工作流_提升开发效率')`,
      line: 46
    },
    {
      original: "自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_自动化')`,
      line: 50
    },
    {
      original: "工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_工作流')`,
      line: 51
    },
    {
      original: "🚀 GitHub Actions 基础概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_github_actions_基础概念')`,
      line: 59
    },
    {
      original: "什么是GitHub Actions？",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_什么是github_actions')`,
      line: 61
    },
    {
      original: "核心概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_核心概念')`,
      line: 68
    },
    {
      original: "🔄 工作流 (Workflow)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_工作流_workflow')`,
      line: 71
    },
    {
      original: "可配置的自动化过程，由一个或多个作业组成",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_可配置的自动化过程_由一个或多个作业组成')`,
      line: 72
    },
    {
      original: "⚡ 事件 (Event)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_事件_event')`,
      line: 76
    },
    {
      original: "触发工作流运行的特定活动",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_触发工作流运行的特定活动')`,
      line: 77
    },
    {
      original: "💼 作业 (Job)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_作业_job')`,
      line: 81
    },
    {
      original: "在同一运行器上执行的一组步骤",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_在同一运行器上执行的一组步骤')`,
      line: 82
    },
    {
      original: "📋 步骤 (Step)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_步骤_step')`,
      line: 86
    },
    {
      original: "可以运行命令或动作的单个任务",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_可以运行命令或动作的单个任务')`,
      line: 87
    },
    {
      original: "🎬 动作 (Action)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_动作_action')`,
      line: 91
    },
    {
      original: "可重用的代码单元",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_可重用的代码单元')`,
      line: 92
    },
    {
      original: "🖥️ 运行器 (Runner)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_运行器_runner')`,
      line: 96
    },
    {
      original: "运行工作流的服务器",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_运行工作流的服务器')`,
      line: 97
    },
    {
      original: "基本工作流文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_基本工作流文件')`,
      line: 101
    },
    {
      original: "⚡ 工作流触发事件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_工作流触发事件')`,
      line: 113
    },
    {
      original: "1. 推送事件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_1_推送事件')`,
      line: 116
    },
    {
      original: "2. Pull Request事件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_2_pull_request事件')`,
      line: 127
    },
    {
      original: "3. 定时和手动触发",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_3_定时和手动触发')`,
      line: 138
    },
    {
      original: "💼 作业配置与策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_作业配置与策略')`,
      line: 151
    },
    {
      original: "基本作业配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_基本作业配置')`,
      line: 153
    },
    {
      original: "环境变量和密钥",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_环境变量和密钥')`,
      line: 162
    },
    {
      original: "🎬 常用Actions与实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_常用actions与实践')`,
      line: 174
    },
    {
      original: "官方Actions",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_官方actions')`,
      line: 176
    },
    {
      original: "第三方Actions",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_第三方actions')`,
      line: 185
    },
    {
      original: "🛠️ 实际应用示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_实际应用示例')`,
      line: 197
    },
    {
      original: "1. 前端项目CI/CD",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_1_前端项目ci_cd')`,
      line: 199
    },
    {
      original: "2. 自动化发布流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_2_自动化发布流程')`,
      line: 208
    },
    {
      original: "✅ GitHub Actions 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_github_actions_最佳实践')`,
      line: 220
    },
    {
      original: "1. 安全性最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_1_安全性最佳实践')`,
      line: 225
    },
    {
      original: "保护敏感信息和工作流安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_保护敏感信息和工作流安全')`,
      line: 226
    },
    {
      original: "使用Secrets存储敏感信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_使用secrets存储敏感信息')`,
      line: 228
    },
    {
      original: "限制工作流权限",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_限制工作流权限')`,
      line: 229
    },
    {
      original: "使用OIDC进行云服务认证",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_使用oidc进行云服务认证')`,
      line: 230
    },
    {
      original: "定期更新Actions版本",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_定期更新actions版本')`,
      line: 231
    },
    {
      original: "审查第三方Actions的安全性",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_审查第三方actions的安全性')`,
      line: 232
    },
    {
      original: "2. 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_2_性能优化')`,
      line: 240
    },
    {
      original: "提高工作流执行效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_提高工作流执行效率')`,
      line: 241
    },
    {
      original: "3. 可维护性",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_3_可维护性')`,
      line: 255
    },
    {
      original: "编写可维护的工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_编写可维护的工作流')`,
      line: 256
    },
    {
      original: "使用有意义的作业和步骤名称",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_使用有意义的作业和步骤名称')`,
      line: 258
    },
    {
      original: "添加适当的注释",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_添加适当的注释')`,
      line: 259
    },
    {
      original: "模块化复杂的工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_模块化复杂的工作流')`,
      line: 260
    },
    {
      original: "使用可重用的工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_使用可重用的工作流')`,
      line: 261
    },
    {
      original: "定期清理不用的工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_定期清理不用的工作流')`,
      line: 262
    },
    {
      original: "4. 监控和调试",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_4_监控和调试')`,
      line: 270
    },
    {
      original: "有效监控和调试工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_有效监控和调试工作流')`,
      line: 271
    },
    {
      original: "添加适当的日志输出",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_添加适当的日志输出')`,
      line: 273
    },
    {
      original: "使用工作流状态检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_使用工作流状态检查')`,
      line: 274
    },
    {
      original: "设置失败通知",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_设置失败通知')`,
      line: 275
    },
    {
      original: "保存调试信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_保存调试信息')`,
      line: 276
    },
    {
      original: "使用工作流可视化工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githubactionsdetail_使用工作流可视化工具')`,
      line: 277
    },
  ],
  '..\frontEnd\src\views\Technology\pages\git\GitHooksDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Git Hooks 详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_git_hooks_详解')`,
      line: 45
    },
    {
      original: "掌握Git钩子的使用与自动化工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_掌握git钩子的使用与自动化工作流')`,
      line: 46
    },
    {
      original: "自动化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_自动化')`,
      line: 49
    },
    {
      original: "工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_工作流')`,
      line: 50
    },
    {
      original: "质量控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_质量控制')`,
      line: 51
    },
    {
      original: "🎣 Git Hooks 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_git_hooks_概述')`,
      line: 59
    },
    {
      original: "什么是Git Hooks？",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_什么是git_hooks')`,
      line: 61
    },
    {
      original: "Hook类型分类",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_hook类型分类')`,
      line: 67
    },
    {
      original: "📥 客户端Hooks",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_客户端hooks')`,
      line: 70
    },
    {
      original: "在本地仓库执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_在本地仓库执行')`,
      line: 71
    },
    {
      original: "pre-commit: 提交前检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_pre_commit_提交前检查')`,
      line: 73
    },
    {
      original: "commit-msg: 提交信息验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_commit_msg_提交信息验证')`,
      line: 74
    },
    {
      original: "post-commit: 提交后操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_post_commit_提交后操作')`,
      line: 75
    },
    {
      original: "pre-push: 推送前检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_pre_push_推送前检查')`,
      line: 76
    },
    {
      original: "🖥️ 服务端Hooks",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_服务端hooks')`,
      line: 81
    },
    {
      original: "在远程仓库执行",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_在远程仓库执行')`,
      line: 82
    },
    {
      original: "pre-receive: 接收前检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_pre_receive_接收前检查')`,
      line: 84
    },
    {
      original: "update: 分支更新检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_update_分支更新检查')`,
      line: 85
    },
    {
      original: "post-receive: 接收后操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_post_receive_接收后操作')`,
      line: 86
    },
    {
      original: "post-update: 更新后操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_post_update_更新后操作')`,
      line: 87
    },
    {
      original: "Hook位置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_hook位置')`,
      line: 93
    },
    {
      original: "Git Hooks位于.git/hooks/目录下。客户端hooks可以被绕过，服务端hooks无法绕过。",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_git_hooks位于_git')`,
      line: 94
    },
    {
      original: "💻 客户端 Hooks",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_客户端_hooks')`,
      line: 102
    },
    {
      original: "🖥️ 服务端 Hooks",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_服务端_hooks')`,
      line: 140
    },
    {
      original: "🐕 Husky 工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_husky_工具')`,
      line: 163
    },
    {
      original: "Husky安装与配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_husky安装与配置')`,
      line: 165
    },
    {
      original: "lint-staged集成",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_lint_staged集成')`,
      line: 174
    },
    {
      original: "✅ Git Hooks 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_git_hooks_最佳实践')`,
      line: 186
    },
    {
      original: "1. Hook设计原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_1_hook设计原则')`,
      line: 191
    },
    {
      original: "设计高效的Git Hooks",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_设计高效的git_hooks')`,
      line: 192
    },
    {
      original: "保持Hook脚本简洁高效",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_保持hook脚本简洁高效')`,
      line: 194
    },
    {
      original: "提供清晰的错误信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_提供清晰的错误信息')`,
      line: 195
    },
    {
      original: "支持跳过机制（--no-verify）",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_支持跳过机制_no_verify')`,
      line: 196
    },
    {
      original: "记录Hook执行日志",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_记录hook执行日志')`,
      line: 197
    },
    {
      original: "2. 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_2_性能优化')`,
      line: 205
    },
    {
      original: "优化Hook执行性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_优化hook执行性能')`,
      line: 206
    },
    {
      original: "只检查变更的文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_只检查变更的文件')`,
      line: 208
    },
    {
      original: "并行执行检查任务",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_并行执行检查任务')`,
      line: 209
    },
    {
      original: "使用缓存机制",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_使用缓存机制')`,
      line: 210
    },
    {
      original: "避免重复检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_避免重复检查')`,
      line: 211
    },
    {
      original: "3. 团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_3_团队协作')`,
      line: 219
    },
    {
      original: "确保团队一致性",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_确保团队一致性')`,
      line: 220
    },
    {
      original: "使用Husky管理Hooks",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_使用husky管理hooks')`,
      line: 222
    },
    {
      original: "版本控制Hook配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_版本控制hook配置')`,
      line: 223
    },
    {
      original: "文档化Hook规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_文档化hook规则')`,
      line: 224
    },
    {
      original: "定期更新Hook脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_定期更新hook脚本')`,
      line: 225
    },
    {
      original: "4. 安全考虑",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_4_安全考虑')`,
      line: 233
    },
    {
      original: "确保Hook安全性",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_确保hook安全性')`,
      line: 234
    },
    {
      original: "验证Hook脚本来源",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_验证hook脚本来源')`,
      line: 236
    },
    {
      original: "限制Hook执行权限",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_限制hook执行权限')`,
      line: 237
    },
    {
      original: "审计Hook执行日志",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_审计hook执行日志')`,
      line: 238
    },
    {
      original: "防止恶意代码注入",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\githooksdetail_防止恶意代码注入')`,
      line: 239
    },
  ],
  '..\frontEnd\src\views\Technology\pages\git\GitBasicsDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Git 基础操作详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_git_基础操作详解')`,
      line: 45
    },
    {
      original: "掌握Git版本控制的核心概念与基本命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_掌握git版本控制的核心概念与基本命令')`,
      line: 46
    },
    {
      original: "版本控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_版本控制')`,
      line: 49
    },
    {
      original: "基础命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_基础命令')`,
      line: 50
    },
    {
      original: "工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_工作流')`,
      line: 51
    },
    {
      original: "📚 Git 核心概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_git_核心概念')`,
      line: 59
    },
    {
      original: "Git 的三个区域",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_git_的三个区域')`,
      line: 61
    },
    {
      original: "📁 工作区 (Working Directory)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_工作区_working_directory')`,
      line: 64
    },
    {
      original: "当前正在编辑的文件所在的目录，包含项目的实际文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_当前正在编辑的文件所在的目录_包含项目的实际文件')`,
      line: 65
    },
    {
      original: "📋 暂存区 (Staging Area)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_暂存区_staging_area')`,
      line: 69
    },
    {
      original: "准备提交的文件快照存储区域，也称为索引(Index)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_准备提交的文件快照存储区域_也称为索引_index')`,
      line: 70
    },
    {
      original: "🗄️ 版本库 (Repository)",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_版本库_repository')`,
      line: 74
    },
    {
      original: "存储项目历史版本的数据库，包含所有提交记录",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_存储项目历史版本的数据库_包含所有提交记录')`,
      line: 75
    },
    {
      original: "Git 对象模型",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_git_对象模型')`,
      line: 79
    },
    {
      original: "⚡ Git 基础命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_git_基础命令')`,
      line: 91
    },
    {
      original: "1. 仓库初始化与配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_1_仓库初始化与配置')`,
      line: 94
    },
    {
      original: "2. 文件状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_2_文件状态管理')`,
      line: 112
    },
    {
      original: "3. 提交管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_3_提交管理')`,
      line: 130
    },
    {
      original: "🌿 分支操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_分支操作')`,
      line: 150
    },
    {
      original: "分支基础操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_分支基础操作')`,
      line: 152
    },
    {
      original: "分支合并策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_分支合并策略')`,
      line: 161
    },
    {
      original: "🌐 远程仓库操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_远程仓库操作')`,
      line: 173
    },
    {
      original: "远程仓库管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_远程仓库管理')`,
      line: 175
    },
    {
      original: "同步操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_同步操作')`,
      line: 184
    },
    {
      original: "远程同步操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_远程同步操作')`,
      line: 189
    },
    {
      original: "↩️ 撤销与回退操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_撤销与回退操作')`,
      line: 196
    },
    {
      original: "撤销操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_撤销操作')`,
      line: 198
    },
    {
      original: "✅ Git 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_git_最佳实践')`,
      line: 210
    },
    {
      original: "1. 提交信息规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_1_提交信息规范')`,
      line: 215
    },
    {
      original: "编写清晰、有意义的提交信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_编写清晰_有意义的提交信息')`,
      line: 216
    },
    {
      original: "2. .gitignore 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_2_gitignore_配置')`,
      line: 230
    },
    {
      original: "合理配置忽略文件，避免提交不必要的文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_合理配置忽略文件_避免提交不必要的文件')`,
      line: 231
    },
    {
      original: "3. 分支命名规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_3_分支命名规范')`,
      line: 245
    },
    {
      original: "使用有意义的分支名称，便于团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_使用有意义的分支名称_便于团队协作')`,
      line: 246
    },
    {
      original: "4. 安全注意事项",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_4_安全注意事项')`,
      line: 270
    },
    {
      original: "保护敏感信息，避免安全风险",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_保护敏感信息_避免安全风险')`,
      line: 271
    },
    {
      original: "不要提交密码、API密钥等敏感信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_不要提交密码_api密钥等敏感信息')`,
      line: 273
    },
    {
      original: "使用环境变量管理配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_使用环境变量管理配置')`,
      line: 274
    },
    {
      original: "定期检查提交历史中的敏感信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_定期检查提交历史中的敏感信息')`,
      line: 275
    },
    {
      original: "使用GPG签名验证提交身份",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\gitbasicsdetail_使用gpg签名验证提交身份')`,
      line: 276
    },
  ],
  '..\frontEnd\src\views\Technology\pages\git\CollaborationDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Git 团队协作详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_git_团队协作详解')`,
      line: 45
    },
    {
      original: "掌握Git团队协作的最佳实践与工作流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_掌握git团队协作的最佳实践与工作流程')`,
      line: 46
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_团队协作')`,
      line: 48
    },
    {
      original: "工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_工作流')`,
      line: 49
    },
    {
      original: "代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_代码审查')`,
      line: 50
    },
    {
      original: "分支策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_分支策略')`,
      line: 51
    },
    {
      original: "👥 团队协作概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_团队协作概述')`,
      line: 59
    },
    {
      original: "为什么需要团队协作规范？",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_为什么需要团队协作规范')`,
      line: 61
    },
    {
      original: "协作核心要素",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_协作核心要素')`,
      line: 66
    },
    {
      original: "🌿 分支策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_分支策略')`,
      line: 69
    },
    {
      original: "合理的分支管理模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_合理的分支管理模式')`,
      line: 70
    },
    {
      original: "📝 提交规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_提交规范')`,
      line: 79
    },
    {
      original: "统一的提交信息格式",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_统一的提交信息格式')`,
      line: 80
    },
    {
      original: "提交信息模板",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_提交信息模板')`,
      line: 83
    },
    {
      original: "自动化检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_自动化检查')`,
      line: 84
    },
    {
      original: "🔍 代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_代码审查')`,
      line: 89
    },
    {
      original: "保证代码质量的关键环节",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_保证代码质量的关键环节')`,
      line: 90
    },
    {
      original: "自动化测试",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_自动化测试')`,
      line: 94
    },
    {
      original: "🚀 发布管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_发布管理')`,
      line: 99
    },
    {
      original: "稳定的版本发布流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_稳定的版本发布流程')`,
      line: 100
    },
    {
      original: "版本标签",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_版本标签')`,
      line: 102
    },
    {
      original: "发布分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_发布分支')`,
      line: 103
    },
    {
      original: "回滚策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_回滚策略')`,
      line: 104
    },
    {
      original: "🌿 分支策略详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_分支策略详解')`,
      line: 112
    },
    {
      original: "1. Git Flow 工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_1_git_flow')`,
      line: 115
    },
    {
      original: "2. GitHub Flow 工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_2_github_flow')`,
      line: 126
    },
    {
      original: "3. GitLab Flow 工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_3_gitlab_flow')`,
      line: 137
    },
    {
      original: "🔍 代码审查最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_代码审查最佳实践')`,
      line: 150
    },
    {
      original: "Pull Request 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_pull_request_最佳实践')`,
      line: 152
    },
    {
      original: "代码审查指南",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_代码审查指南')`,
      line: 161
    },
    {
      original: "⚔️ 冲突解决策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_冲突解决策略')`,
      line: 173
    },
    {
      original: "合并冲突处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_合并冲突处理')`,
      line: 175
    },
    {
      original: "团队协作规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_团队协作规范')`,
      line: 184
    },
    {
      original: "✅ 团队协作最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_团队协作最佳实践')`,
      line: 196
    },
    {
      original: "1. 分支管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_1_分支管理')`,
      line: 201
    },
    {
      original: "建立清晰的分支策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_建立清晰的分支策略')`,
      line: 202
    },
    {
      original: "选择适合团队的工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_选择适合团队的工作流')`,
      line: 204
    },
    {
      original: "统一分支命名规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_统一分支命名规范')`,
      line: 205
    },
    {
      original: "定期清理无用分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_定期清理无用分支')`,
      line: 206
    },
    {
      original: "保护重要分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_保护重要分支')`,
      line: 207
    },
    {
      original: "2. 提交规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_2_提交规范')`,
      line: 215
    },
    {
      original: "维护清晰的提交历史",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_维护清晰的提交历史')`,
      line: 216
    },
    {
      original: "使用统一的提交信息格式",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_使用统一的提交信息格式')`,
      line: 218
    },
    {
      original: "保持提交的原子性",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_保持提交的原子性')`,
      line: 219
    },
    {
      original: "编写有意义的提交信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_编写有意义的提交信息')`,
      line: 220
    },
    {
      original: "使用工具自动化检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_使用工具自动化检查')`,
      line: 221
    },
    {
      original: "3. 代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_3_代码审查')`,
      line: 229
    },
    {
      original: "确保代码质量",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_确保代码质量')`,
      line: 230
    },
    {
      original: "建立代码审查流程",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_建立代码审查流程')`,
      line: 232
    },
    {
      original: "培养审查文化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_培养审查文化')`,
      line: 233
    },
    {
      original: "使用自动化工具辅助",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_使用自动化工具辅助')`,
      line: 234
    },
    {
      original: "及时响应审查意见",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_及时响应审查意见')`,
      line: 235
    },
    {
      original: "4. 团队沟通",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_4_团队沟通')`,
      line: 243
    },
    {
      original: "加强团队协作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_加强团队协作')`,
      line: 244
    },
    {
      original: "定期同步开发进度",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_定期同步开发进度')`,
      line: 246
    },
    {
      original: "及时沟通技术决策",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_及时沟通技术决策')`,
      line: 247
    },
    {
      original: "分享最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_分享最佳实践')`,
      line: 248
    },
    {
      original: "建立知识文档",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\collaborationdetail_建立知识文档')`,
      line: 249
    },
  ],
  '..\frontEnd\src\views\Technology\pages\git\BranchingDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Git 分支管理详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_git_分支管理详解')`,
      line: 45
    },
    {
      original: "掌握Git分支策略与高效的分支管理技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_掌握git分支策略与高效的分支管理技巧')`,
      line: 46
    },
    {
      original: "分支策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_分支策略')`,
      line: 49
    },
    {
      original: "合并管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_合并管理')`,
      line: 50
    },
    {
      original: "工作流",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_工作流')`,
      line: 51
    },
    {
      original: "🌳 Git 分支基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_git_分支基础')`,
      line: 59
    },
    {
      original: "什么是Git分支？",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_什么是git分支')`,
      line: 61
    },
    {
      original: "分支的优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_分支的优势')`,
      line: 66
    },
    {
      original: "🚀 并行开发",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_并行开发')`,
      line: 69
    },
    {
      original: "多个功能可以同时开发，互不干扰",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_多个功能可以同时开发_互不干扰')`,
      line: 70
    },
    {
      original: "🔒 代码隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_代码隔离')`,
      line: 74
    },
    {
      original: "实验性代码不会影响稳定版本",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_实验性代码不会影响稳定版本')`,
      line: 75
    },
    {
      original: "🔄 轻松切换",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_轻松切换')`,
      line: 79
    },
    {
      original: "可以快速在不同版本间切换",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_可以快速在不同版本间切换')`,
      line: 80
    },
    {
      original: "📝 历史追踪",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_历史追踪')`,
      line: 84
    },
    {
      original: "每个功能的开发历史清晰可见",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_每个功能的开发历史清晰可见')`,
      line: 85
    },
    {
      original: "基本分支操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_基本分支操作')`,
      line: 89
    },
    {
      original: "🎯 常用分支策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_常用分支策略')`,
      line: 108
    },
    {
      original: "GitLab Flow策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_gitlab_flow策略')`,
      line: 138
    },
    {
      original: "🔀 分支合并技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_分支合并技巧')`,
      line: 146
    },
    {
      original: "合并方式对比",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_合并方式对比')`,
      line: 148
    },
    {
      original: "解决合并冲突",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_解决合并冲突')`,
      line: 157
    },
    {
      original: "高级合并技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_高级合并技巧')`,
      line: 166
    },
    {
      original: "🌐 远程分支管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_远程分支管理')`,
      line: 185
    },
    {
      original: "远程分支操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_远程分支操作')`,
      line: 187
    },
    {
      original: "多远程仓库管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_多远程仓库管理')`,
      line: 196
    },
    {
      original: "多远程仓库管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_多远程仓库管理')`,
      line: 201
    },
    {
      original: "✅ 分支管理最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_分支管理最佳实践')`,
      line: 208
    },
    {
      original: "1. 分支命名规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_1_分支命名规范')`,
      line: 213
    },
    {
      original: "使用清晰的分支命名约定",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_使用清晰的分支命名约定')`,
      line: 214
    },
    {
      original: "功能分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_功能分支')`,
      line: 217
    },
    {
      original: "修复分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_修复分支')`,
      line: 221
    },
    {
      original: "发布分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_发布分支')`,
      line: 225
    },
    {
      original: "实验分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_实验分支')`,
      line: 228
    },
    {
      original: "2. 分支生命周期管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_2_分支生命周期管理')`,
      line: 238
    },
    {
      original: "合理管理分支的创建和删除",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_合理管理分支的创建和删除')`,
      line: 239
    },
    {
      original: "及时删除已合并的功能分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_及时删除已合并的功能分支')`,
      line: 241
    },
    {
      original: "定期清理过期的分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_定期清理过期的分支')`,
      line: 242
    },
    {
      original: "保持主分支的稳定性",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_保持主分支的稳定性')`,
      line: 243
    },
    {
      original: "使用保护规则防止直接推送",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_使用保护规则防止直接推送')`,
      line: 244
    },
    {
      original: "3. 合并策略选择",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_3_合并策略选择')`,
      line: 252
    },
    {
      original: "根据项目需求选择合适的合并方式",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_根据项目需求选择合适的合并方式')`,
      line: 253
    },
    {
      original: "功能分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_功能分支')`,
      line: 256
    },
    {
      original: "发布分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_发布分支')`,
      line: 259
    },
    {
      original: "热修复",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_热修复')`,
      line: 262
    },
    {
      original: "避免在公共分支上使用rebase",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_避免在公共分支上使用rebase')`,
      line: 264
    },
    {
      original: "4. 团队协作规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_4_团队协作规范')`,
      line: 272
    },
    {
      original: "建立团队分支管理规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_建立团队分支管理规范')`,
      line: 273
    },
    {
      original: "制定清晰的分支策略文档",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_制定清晰的分支策略文档')`,
      line: 275
    },
    {
      original: "使用Pull Request进行代码审查",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_使用pull_request进行代码审查')`,
      line: 276
    },
    {
      original: "设置分支保护规则",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_设置分支保护规则')`,
      line: 277
    },
    {
      original: "定期进行分支管理培训",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\branchingdetail_定期进行分支管理培训')`,
      line: 278
    },
  ],
  '..\frontEnd\src\views\Technology\pages\git\AdvancedTechniquesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "Git 高级技巧详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_git_高级技巧详解')`,
      line: 45
    },
    {
      original: "掌握Git的高级功能与实用技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_掌握git的高级功能与实用技巧')`,
      line: 46
    },
    {
      original: "高级技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_高级技巧')`,
      line: 48
    },
    {
      original: "Git命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_git命令')`,
      line: 49
    },
    {
      original: "工作流优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_工作流优化')`,
      line: 50
    },
    {
      original: "问题解决",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_问题解决')`,
      line: 51
    },
    {
      original: "📝 高级提交技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_高级提交技巧')`,
      line: 59
    },
    {
      original: "交互式提交",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_交互式提交')`,
      line: 61
    },
    {
      original: "提交信息规范",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_提交信息规范')`,
      line: 70
    },
    {
      original: "提交规范和高级命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_提交规范和高级命令')`,
      line: 75
    },
    {
      original: "🌿 高级分支操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_高级分支操作')`,
      line: 82
    },
    {
      original: "1. 交互式变基",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_1_交互式变基')`,
      line: 85
    },
    {
      original: "2. 高级合并策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_2_高级合并策略')`,
      line: 96
    },
    {
      original: "高级合并策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_高级合并策略')`,
      line: 101
    },
    {
      original: "3. 分支管理技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_3_分支管理技巧')`,
      line: 107
    },
    {
      original: "分支管理技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_分支管理技巧')`,
      line: 112
    },
    {
      original: "🔍 高级查询与搜索",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_高级查询与搜索')`,
      line: 120
    },
    {
      original: "日志查询",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_日志查询')`,
      line: 122
    },
    {
      original: "高级日志查询",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_高级日志查询')`,
      line: 127
    },
    {
      original: "内容搜索",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_内容搜索')`,
      line: 131
    },
    {
      original: "🔧 数据恢复与修复",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_数据恢复与修复')`,
      line: 143
    },
    {
      original: "提交恢复",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_提交恢复')`,
      line: 145
    },
    {
      original: "历史修改",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_历史修改')`,
      line: 154
    },
    {
      original: "⚡ Git 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_git_性能优化')`,
      line: 166
    },
    {
      original: "仓库优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_仓库优化')`,
      line: 168
    },
    {
      original: "大文件处理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_大文件处理')`,
      line: 177
    },
    {
      original: "✅ Git 高级技巧最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_git_高级技巧最佳实践')`,
      line: 189
    },
    {
      original: "1. 提交管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_1_提交管理')`,
      line: 194
    },
    {
      original: "保持清晰的提交历史",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_保持清晰的提交历史')`,
      line: 195
    },
    {
      original: "使用语义化的提交信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_使用语义化的提交信息')`,
      line: 197
    },
    {
      original: "保持提交的原子性",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_保持提交的原子性')`,
      line: 198
    },
    {
      original: "定期整理提交历史",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_定期整理提交历史')`,
      line: 199
    },
    {
      original: "避免在公共分支上使用rebase",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_避免在公共分支上使用rebase')`,
      line: 200
    },
    {
      original: "2. 分支策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_2_分支策略')`,
      line: 208
    },
    {
      original: "合理使用分支功能",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_合理使用分支功能')`,
      line: 209
    },
    {
      original: "选择适合团队的分支模型",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_选择适合团队的分支模型')`,
      line: 211
    },
    {
      original: "及时清理无用分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_及时清理无用分支')`,
      line: 212
    },
    {
      original: "使用描述性的分支名称",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_使用描述性的分支名称')`,
      line: 213
    },
    {
      original: "保护重要分支",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_保护重要分支')`,
      line: 214
    },
    {
      original: "3. 性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_3_性能优化')`,
      line: 222
    },
    {
      original: "保持仓库高效运行",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_保持仓库高效运行')`,
      line: 223
    },
    {
      original: "定期进行垃圾回收",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_定期进行垃圾回收')`,
      line: 225
    },
    {
      original: "使用LFS管理大文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_使用lfs管理大文件')`,
      line: 226
    },
    {
      original: "合理配置Git选项",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_合理配置git选项')`,
      line: 227
    },
    {
      original: "监控仓库大小",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_监控仓库大小')`,
      line: 228
    },
    {
      original: "4. 安全考虑",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_4_安全考虑')`,
      line: 236
    },
    {
      original: "确保代码和历史安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_确保代码和历史安全')`,
      line: 237
    },
    {
      original: "使用GPG签名重要提交",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_使用gpg签名重要提交')`,
      line: 239
    },
    {
      original: "及时清理敏感信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_及时清理敏感信息')`,
      line: 240
    },
    {
      original: "定期备份重要仓库",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_定期备份重要仓库')`,
      line: 241
    },
    {
      original: "控制仓库访问权限",
      replacement: `t('common:..\frontend\src\views\technology\pages\git\advancedtechniquesdetail_控制仓库访问权限')`,
      line: 242
    },
  ],
  '..\frontEnd\src\views\Technology\pages\docker\SecurityDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_加载失败_error')`,
      line: 22
    },
    {
      original: "掌握Docker容器安全最佳实践和防护策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_掌握docker容器安全最佳实践和防护策略')`,
      line: 38
    },
    {
      original: "📋 Docker 安全概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_docker_安全概述')`,
      line: 43
    },
    {
      original: "容器安全的重要性",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_容器安全的重要性')`,
      line: 45
    },
    {
      original: "安全威胁类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_安全威胁类型')`,
      line: 51
    },
    {
      original: "镜像漏洞",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_镜像漏洞')`,
      line: 53
    },
    {
      original: "权限提升",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_权限提升')`,
      line: 54
    },
    {
      original: "数据泄露",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_数据泄露')`,
      line: 55
    },
    {
      original: "网络攻击",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_网络攻击')`,
      line: 56
    },
    {
      original: "恶意代码",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_恶意代码')`,
      line: 57
    },
    {
      original: "安全防护层次",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_安全防护层次')`,
      line: 60
    },
    {
      original: "镜像安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_镜像安全')`,
      line: 63
    },
    {
      original: "运行时安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_运行时安全')`,
      line: 66
    },
    {
      original: "网络安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_网络安全')`,
      line: 69
    },
    {
      original: "数据安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_数据安全')`,
      line: 72
    },
    {
      original: "监控审计",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_监控审计')`,
      line: 75
    },
    {
      original: "🖼️ 镜像安全管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_镜像安全管理')`,
      line: 82
    },
    {
      original: "安全镜像构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_安全镜像构建')`,
      line: 84
    },
    {
      original: "镜像漏洞扫描",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_镜像漏洞扫描')`,
      line: 93
    },
    {
      original: "镜像签名验证",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_镜像签名验证')`,
      line: 102
    },
    {
      original: "🏃 容器运行时安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_容器运行时安全')`,
      line: 114
    },
    {
      original: "用户权限控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_用户权限控制')`,
      line: 116
    },
    {
      original: "资源限制与隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_资源限制与隔离')`,
      line: 125
    },
    {
      original: "安全配置文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_安全配置文件')`,
      line: 134
    },
    {
      original: "🌐 网络安全配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_网络安全配置')`,
      line: 146
    },
    {
      original: "网络隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_网络隔离')`,
      line: 148
    },
    {
      original: "TLS加密通信",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_tls加密通信')`,
      line: 157
    },
    {
      original: "🔐 密钥与配置管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_密钥与配置管理')`,
      line: 169
    },
    {
      original: "环境变量安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_环境变量安全')`,
      line: 180
    },
    {
      original: "📊 安全监控与审计",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_安全监控与审计')`,
      line: 192
    },
    {
      original: "运行时安全监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_运行时安全监控')`,
      line: 194
    },
    {
      original: "日志审计",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_日志审计')`,
      line: 203
    },
    {
      original: "合规性检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_合规性检查')`,
      line: 212
    },
    {
      original: "💡 安全最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_安全最佳实践')`,
      line: 224
    },
    {
      original: "镜像安全建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_镜像安全建议')`,
      line: 227
    },
    {
      original: "使用官方或可信的基础镜像",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_使用官方或可信的基础镜像')`,
      line: 230
    },
    {
      original: "定期更新基础镜像和依赖包",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_定期更新基础镜像和依赖包')`,
      line: 231
    },
    {
      original: "使用多阶段构建减少攻击面",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_使用多阶段构建减少攻击面')`,
      line: 232
    },
    {
      original: "定期扫描镜像漏洞",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_定期扫描镜像漏洞')`,
      line: 233
    },
    {
      original: "使用镜像签名验证完整性",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_使用镜像签名验证完整性')`,
      line: 234
    },
    {
      original: "避免在镜像中包含敏感信息",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_避免在镜像中包含敏感信息')`,
      line: 235
    },
    {
      original: "运行时安全建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_运行时安全建议')`,
      line: 245
    },
    {
      original: "最小权限原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_最小权限原则')`,
      line: 249
    },
    {
      original: "资源限制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_资源限制')`,
      line: 252
    },
    {
      original: "网络隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_网络隔离')`,
      line: 255
    },
    {
      original: "只读文件系统",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_只读文件系统')`,
      line: 258
    },
    {
      original: "禁用特权模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_禁用特权模式')`,
      line: 261
    },
    {
      original: "监控与审计建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_监控与审计建议')`,
      line: 272
    },
    {
      original: "实时监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_实时监控')`,
      line: 276
    },
    {
      original: "日志收集",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_日志收集')`,
      line: 279
    },
    {
      original: "异常检测",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_异常检测')`,
      line: 282
    },
    {
      original: "合规检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_合规检查')`,
      line: 285
    },
    {
      original: "事件响应",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\securitydetail_事件响应')`,
      line: 288
    },
  ],
  '..\frontEnd\src\views\Technology\pages\docker\PerformanceOptimizationDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "掌握Docker容器性能优化技术和最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_掌握docker容器性能优化技术和最佳实践')`,
      line: 38
    },
    {
      original: "📋 性能优化概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_性能优化概述')`,
      line: 43
    },
    {
      original: "性能优化的重要性",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_性能优化的重要性')`,
      line: 45
    },
    {
      original: "优化维度",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_优化维度')`,
      line: 52
    },
    {
      original: "镜像优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_镜像优化')`,
      line: 54
    },
    {
      original: "资源管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_资源管理')`,
      line: 55
    },
    {
      original: "网络优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_网络优化')`,
      line: 56
    },
    {
      original: "存储优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_存储优化')`,
      line: 57
    },
    {
      original: "监控调优",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_监控调优')`,
      line: 58
    },
    {
      original: "性能指标",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_性能指标')`,
      line: 61
    },
    {
      original: "启动时间",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_启动时间')`,
      line: 64
    },
    {
      original: "资源利用率",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_资源利用率')`,
      line: 67
    },
    {
      original: "网络延迟",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_网络延迟')`,
      line: 70
    },
    {
      original: "吞吐量",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_吞吐量')`,
      line: 73
    },
    {
      original: "扩缩容速度",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_扩缩容速度')`,
      line: 76
    },
    {
      original: "🖼️ 镜像性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_镜像性能优化')`,
      line: 83
    },
    {
      original: "镜像大小优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_镜像大小优化')`,
      line: 85
    },
    {
      original: "层缓存优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_层缓存优化')`,
      line: 94
    },
    {
      original: "多阶段构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_多阶段构建')`,
      line: 103
    },
    {
      original: "⚡ 容器资源优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_容器资源优化')`,
      line: 115
    },
    {
      original: "CPU 优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_cpu_优化')`,
      line: 117
    },
    {
      original: "内存优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_内存优化')`,
      line: 126
    },
    {
      original: "磁盘I/O优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_磁盘i_o优化')`,
      line: 135
    },
    {
      original: "🌐 网络性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_网络性能优化')`,
      line: 147
    },
    {
      original: "网络模式选择",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_网络模式选择')`,
      line: 149
    },
    {
      original: "负载均衡优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_负载均衡优化')`,
      line: 158
    },
    {
      original: "💾 存储性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_存储性能优化')`,
      line: 170
    },
    {
      original: "存储驱动选择",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_存储驱动选择')`,
      line: 172
    },
    {
      original: "卷性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_卷性能优化')`,
      line: 181
    },
    {
      original: "📊 性能监控与调优",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_性能监控与调优')`,
      line: 193
    },
    {
      original: "性能监控工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_性能监控工具')`,
      line: 195
    },
    {
      original: "性能分析与调优",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_性能分析与调优')`,
      line: 204
    },
    {
      original: "自动化调优",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_自动化调优')`,
      line: 213
    },
    {
      original: "💡 性能优化最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_性能优化最佳实践')`,
      line: 225
    },
    {
      original: "镜像优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_镜像优化建议')`,
      line: 228
    },
    {
      original: "使用Alpine Linux等轻量级基础镜像",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_使用alpine_linux等轻量级基础镜像')`,
      line: 231
    },
    {
      original: "利用多阶段构建减少镜像大小",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_利用多阶段构建减少镜像大小')`,
      line: 232
    },
    {
      original: "合理安排Dockerfile指令顺序",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_合理安排dockerfile指令顺序')`,
      line: 233
    },
    {
      original: "使用.dockerignore排除不必要文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_使用_dockerignore排除不必要文件')`,
      line: 234
    },
    {
      original: "定期清理镜像层和缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_定期清理镜像层和缓存')`,
      line: 235
    },
    {
      original: "使用镜像压缩和优化工具",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_使用镜像压缩和优化工具')`,
      line: 236
    },
    {
      original: "资源管理建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_资源管理建议')`,
      line: 246
    },
    {
      original: "CPU限制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_cpu限制')`,
      line: 250
    },
    {
      original: "内存管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_内存管理')`,
      line: 253
    },
    {
      original: "磁盘I/O",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_磁盘i_o')`,
      line: 256
    },
    {
      original: "资源监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_资源监控')`,
      line: 259
    },
    {
      original: "弹性伸缩",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_弹性伸缩')`,
      line: 262
    },
    {
      original: "网络与存储优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_网络与存储优化')`,
      line: 273
    },
    {
      original: "网络模式",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_网络模式')`,
      line: 277
    },
    {
      original: "负载均衡",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_负载均衡')`,
      line: 280
    },
    {
      original: "存储驱动",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_存储驱动')`,
      line: 283
    },
    {
      original: "缓存策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_缓存策略')`,
      line: 286
    },
    {
      original: "连接池",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\performanceoptimizationdetail_连接池')`,
      line: 289
    },
  ],
  '..\frontEnd\src\views\Technology\pages\docker\NetworkingDetail.tsx': [
    {
      original: "加载代码数据中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_加载代码数据中')`,
      line: 22
    },
    {
      original: "加载失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_加载失败')`,
      line: 31
    },
    {
      original: "Docker 网络深度解析",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_docker_网络深度解析')`,
      line: 56
    },
    {
      original: "掌握Docker容器网络配置、管理和优化，构建高效安全的容器网络架构",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_掌握docker容器网络配置_管理和优化_构建高效安全的容器网络架构')`,
      line: 57
    },
    {
      original: "容器网络",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_容器网络')`,
      line: 59
    },
    {
      original: "网络配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_网络配置')`,
      line: 60
    },
    {
      original: "安全隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_安全隔离')`,
      line: 61
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_性能优化')`,
      line: 62
    },
    {
      original: "📚 Docker 网络基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_docker_网络基础')`,
      line: 70
    },
    {
      original: "什么是Docker网络？",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_什么是docker网络')`,
      line: 72
    },
    {
      original: "网络驱动类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_网络驱动类型')`,
      line: 78
    },
    {
      original: "bridge (桥接)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_bridge_桥接')`,
      line: 80
    },
    {
      original: "host (主机)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_host_主机')`,
      line: 81
    },
    {
      original: "none (无网络)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_none_无网络')`,
      line: 82
    },
    {
      original: "overlay (覆盖)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_overlay_覆盖')`,
      line: 83
    },
    {
      original: "macvlan (MAC虚拟)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_macvlan_mac虚拟')`,
      line: 84
    },
    {
      original: "核心优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_核心优势')`,
      line: 87
    },
    {
      original: "网络隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_网络隔离')`,
      line: 90
    },
    {
      original: "服务发现",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_服务发现')`,
      line: 93
    },
    {
      original: "动态配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_动态配置')`,
      line: 96
    },
    {
      original: "多主机支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_多主机支持')`,
      line: 99
    },
    {
      original: "网络模式详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_网络模式详解')`,
      line: 103
    },
    {
      original: "🛠️ 自定义网络配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_自定义网络配置')`,
      line: 115
    },
    {
      original: "1. 自定义网络创建",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_1_自定义网络创建')`,
      line: 118
    },
    {
      original: "2. 容器间通信配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_2_容器间通信配置')`,
      line: 129
    },
    {
      original: "3. 端口映射与暴露",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_3_端口映射与暴露')`,
      line: 140
    },
    {
      original: "🔒 网络安全与性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_网络安全与性能优化')`,
      line: 153
    },
    {
      original: "4. 网络安全配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_4_网络安全配置')`,
      line: 156
    },
    {
      original: "5. 网络故障排查",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_5_网络故障排查')`,
      line: 167
    },
    {
      original: "6. 性能优化策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_6_性能优化策略')`,
      line: 178
    },
    {
      original: "🎨 设计原则与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_设计原则与最佳实践')`,
      line: 191
    },
    {
      original: "1. 网络隔离原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_1_网络隔离原则')`,
      line: 196
    },
    {
      original: "为不同的应用层级创建独立的网络，实现安全隔离和访问控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_为不同的应用层级创建独立的网络_实现安全隔离和访问控制')`,
      line: 197
    },
    {
      original: "2. 服务发现与命名",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_2_服务发现与命名')`,
      line: 212
    },
    {
      original: "使用有意义的容器名称和网络别名，便于服务发现和维护",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_使用有意义的容器名称和网络别名_便于服务发现和维护')`,
      line: 213
    },
    {
      original: "3. 端口管理策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_3_端口管理策略')`,
      line: 228
    },
    {
      original: "合理规划端口映射，避免端口冲突，提供清晰的服务访问方式",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_合理规划端口映射_避免端口冲突_提供清晰的服务访问方式')`,
      line: 229
    },
    {
      original: "🚀 生产环境部署建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_生产环境部署建议')`,
      line: 244
    },
    {
      original: "网络架构设计",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_网络架构设计')`,
      line: 247
    },
    {
      original: "分层网络",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_分层网络')`,
      line: 252
    },
    {
      original: "负载均衡",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_负载均衡')`,
      line: 255
    },
    {
      original: "服务网格",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_服务网格')`,
      line: 258
    },
    {
      original: "监控告警",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_监控告警')`,
      line: 261
    },
    {
      original: "安全加固措施",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_安全加固措施')`,
      line: 270
    },
    {
      original: "网络隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_网络隔离')`,
      line: 275
    },
    {
      original: "TLS加密",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_tls加密')`,
      line: 278
    },
    {
      original: "访问控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_访问控制')`,
      line: 281
    },
    {
      original: "安全扫描",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_安全扫描')`,
      line: 284
    },
    {
      original: "日志审计",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_日志审计')`,
      line: 287
    },
    {
      original: "性能优化策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_性能优化策略')`,
      line: 296
    },
    {
      original: "网络驱动",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_网络驱动')`,
      line: 301
    },
    {
      original: "连接池",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_连接池')`,
      line: 304
    },
    {
      original: "缓存策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_缓存策略')`,
      line: 307
    },
    {
      original: "CDN加速",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_cdn加速')`,
      line: 310
    },
    {
      original: "压缩传输",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\networkingdetail_压缩传输')`,
      line: 313
    },
  ],
  '..\frontEnd\src\views\Technology\pages\docker\KubernetesDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_加载中')`,
      line: 18
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_加载失败_error')`,
      line: 22
    },
    {
      original: "掌握Kubernetes容器编排和集群管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_掌握kubernetes容器编排和集群管理')`,
      line: 38
    },
    {
      original: "📋 Kubernetes 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_kubernetes_概述')`,
      line: 43
    },
    {
      original: "什么是 Kubernetes",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_什么是_kubernetes')`,
      line: 45
    },
    {
      original: "核心概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_核心概念')`,
      line: 51
    },
    {
      original: "Pod (容器组)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_pod_容器组')`,
      line: 53
    },
    {
      original: "Service (服务)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_service_服务')`,
      line: 54
    },
    {
      original: "Deployment (部署)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_deployment_部署')`,
      line: 55
    },
    {
      original: "Namespace (命名空间)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_namespace_命名空间')`,
      line: 56
    },
    {
      original: "ConfigMap (配置)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_configmap_配置')`,
      line: 57
    },
    {
      original: "Secret (密钥)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_secret_密钥')`,
      line: 58
    },
    {
      original: "Kubernetes 优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_kubernetes_优势')`,
      line: 61
    },
    {
      original: "自动化部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_自动化部署')`,
      line: 64
    },
    {
      original: "弹性扩缩",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_弹性扩缩')`,
      line: 67
    },
    {
      original: "服务发现",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_服务发现')`,
      line: 70
    },
    {
      original: "自我修复",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_自我修复')`,
      line: 73
    },
    {
      original: "滚动更新",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_滚动更新')`,
      line: 76
    },
    {
      original: "⚡ 基础操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_基础操作')`,
      line: 83
    },
    {
      original: "kubectl 基本命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_kubectl_基本命令')`,
      line: 85
    },
    {
      original: "📦 Pod 管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_pod_管理')`,
      line: 97
    },
    {
      original: "Pod 定义与创建",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_pod_定义与创建')`,
      line: 99
    },
    {
      original: "多容器 Pod",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_多容器_pod')`,
      line: 108
    },
    {
      original: "Pod 生命周期",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_pod_生命周期')`,
      line: 117
    },
    {
      original: "📋 Deployment 部署管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_deployment_部署管理')`,
      line: 129
    },
    {
      original: "Deployment 基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_deployment_基础')`,
      line: 131
    },
    {
      original: "滚动更新",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_滚动更新')`,
      line: 140
    },
    {
      original: "🔄 Service 网络服务",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_service_网络服务')`,
      line: 152
    },
    {
      original: "Service 类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_service_类型')`,
      line: 154
    },
    {
      original: "Ingress 控制器",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_ingress_控制器')`,
      line: 163
    },
    {
      original: "🗂️ 配置与密钥管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_配置与密钥管理')`,
      line: 175
    },
    {
      original: "ConfigMap 配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_configmap_配置')`,
      line: 177
    },
    {
      original: "Secret 密钥管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_secret_密钥管理')`,
      line: 186
    },
    {
      original: "💾 存储管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_存储管理')`,
      line: 198
    },
    {
      original: "持久化存储",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_持久化存储')`,
      line: 200
    },
    {
      original: "📊 监控与日志",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_监控与日志')`,
      line: 212
    },
    {
      original: "集群监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_集群监控')`,
      line: 214
    },
    {
      original: "日志管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_日志管理')`,
      line: 223
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_最佳实践')`,
      line: 235
    },
    {
      original: "Kubernetes 部署建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_kubernetes_部署建议')`,
      line: 238
    },
    {
      original: "使用Namespace隔离不同环境和应用",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_使用namespace隔离不同环境和应用')`,
      line: 241
    },
    {
      original: "为Pod设置资源限制和请求",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_为pod设置资源限制和请求')`,
      line: 242
    },
    {
      original: "使用健康检查确保应用可用性",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_使用健康检查确保应用可用性')`,
      line: 243
    },
    {
      original: "合理配置副本数量和扩缩策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_合理配置副本数量和扩缩策略')`,
      line: 244
    },
    {
      original: "使用标签和选择器组织资源",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_使用标签和选择器组织资源')`,
      line: 245
    },
    {
      original: "定期备份etcd数据",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_定期备份etcd数据')`,
      line: 246
    },
    {
      original: "安全建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_安全建议')`,
      line: 256
    },
    {
      original: "RBAC权限",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_rbac权限')`,
      line: 260
    },
    {
      original: "网络策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_网络策略')`,
      line: 263
    },
    {
      original: "镜像安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_镜像安全')`,
      line: 266
    },
    {
      original: "密钥管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_密钥管理')`,
      line: 269
    },
    {
      original: "安全上下文",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_安全上下文')`,
      line: 272
    },
    {
      original: "运维建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_运维建议')`,
      line: 283
    },
    {
      original: "监控告警",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_监控告警')`,
      line: 287
    },
    {
      original: "日志收集",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_日志收集')`,
      line: 290
    },
    {
      original: "备份策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_备份策略')`,
      line: 293
    },
    {
      original: "版本管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_版本管理')`,
      line: 296
    },
    {
      original: "灾难恢复",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\kubernetesdetail_灾难恢复')`,
      line: 299
    },
  ],
  '..\frontEnd\src\views\Technology\pages\docker\FundamentalsDetail.tsx': [
    {
      original: "加载代码数据中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_加载代码数据中')`,
      line: 22
    },
    {
      original: "加载失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_加载失败')`,
      line: 31
    },
    {
      original: "Docker 基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_docker_基础')`,
      line: 56
    },
    {
      original: "掌握Docker容器化技术的基础概念和核心操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_掌握docker容器化技术的基础概念和核心操作')`,
      line: 57
    },
    {
      original: "镜像 (Image)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_镜像_image')`,
      line: 59
    },
    {
      original: "容器 (Container)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_容器_container')`,
      line: 60
    },
    {
      original: "仓库 (Registry)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_仓库_registry')`,
      line: 61
    },
    {
      original: "数据卷 (Volume)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_数据卷_volume')`,
      line: 63
    },
    {
      original: "网络 (Network)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_网络_network')`,
      line: 64
    },
    {
      original: "📋 Docker 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_docker_概述')`,
      line: 72
    },
    {
      original: "什么是 Docker",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_什么是_docker')`,
      line: 74
    },
    {
      original: "核心概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_核心概念')`,
      line: 81
    },
    {
      original: "镜像 (Image)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_镜像_image')`,
      line: 83
    },
    {
      original: "容器 (Container)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_容器_container')`,
      line: 84
    },
    {
      original: "仓库 (Registry)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_仓库_registry')`,
      line: 85
    },
    {
      original: "数据卷 (Volume)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_数据卷_volume')`,
      line: 87
    },
    {
      original: "网络 (Network)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_网络_network')`,
      line: 88
    },
    {
      original: "Docker 优势",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_docker_优势')`,
      line: 91
    },
    {
      original: "环境一致性",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_环境一致性')`,
      line: 94
    },
    {
      original: "快速部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_快速部署')`,
      line: 97
    },
    {
      original: "资源高效",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_资源高效')`,
      line: 100
    },
    {
      original: "易于管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_易于管理')`,
      line: 103
    },
    {
      original: "微服务支持",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_微服务支持')`,
      line: 106
    },
    {
      original: "🚀 Docker 安装",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_docker_安装')`,
      line: 113
    },
    {
      original: "各平台安装方法",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_各平台安装方法')`,
      line: 116
    },
    {
      original: "⚡ 基础命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_基础命令')`,
      line: 129
    },
    {
      original: "Docker 基础操作",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_docker_基础操作')`,
      line: 132
    },
    {
      original: "📄 Dockerfile 基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_dockerfile_基础')`,
      line: 145
    },
    {
      original: "Dockerfile 编写",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_dockerfile_编写')`,
      line: 148
    },
    {
      original: "🔄 容器生命周期",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_容器生命周期')`,
      line: 161
    },
    {
      original: "容器状态管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_容器状态管理')`,
      line: 164
    },
    {
      original: "💾 数据卷管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_数据卷管理')`,
      line: 177
    },
    {
      original: "数据持久化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_数据持久化')`,
      line: 180
    },
    {
      original: "🌐 网络基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_网络基础')`,
      line: 193
    },
    {
      original: "容器网络配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_容器网络配置')`,
      line: 196
    },
    {
      original: "🎯 镜像优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_镜像优化')`,
      line: 209
    },
    {
      original: "构建高效镜像",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_构建高效镜像')`,
      line: 212
    },
    {
      original: "📊 容器监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_容器监控')`,
      line: 225
    },
    {
      original: "监控和调试",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_监控和调试')`,
      line: 228
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_最佳实践')`,
      line: 241
    },
    {
      original: "Docker 使用建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_docker_使用建议')`,
      line: 244
    },
    {
      original: "使用官方镜像作为基础镜像",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_使用官方镜像作为基础镜像')`,
      line: 248
    },
    {
      original: "保持镜像尽可能小，使用Alpine版本",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_保持镜像尽可能小_使用alpine版本')`,
      line: 249
    },
    {
      original: "利用多阶段构建优化镜像大小",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_利用多阶段构建优化镜像大小')`,
      line: 250
    },
    {
      original: "合理使用.dockerignore文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_合理使用_dockerignore文件')`,
      line: 251
    },
    {
      original: "不要在容器中存储数据，使用数据卷",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_不要在容器中存储数据_使用数据卷')`,
      line: 252
    },
    {
      original: "为容器设置资源限制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_为容器设置资源限制')`,
      line: 253
    },
    {
      original: "安全建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_安全建议')`,
      line: 261
    },
    {
      original: "用户权限",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_用户权限')`,
      line: 266
    },
    {
      original: "镜像安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_镜像安全')`,
      line: 269
    },
    {
      original: "网络隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_网络隔离')`,
      line: 272
    },
    {
      original: "敏感数据",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_敏感数据')`,
      line: 275
    },
    {
      original: "镜像扫描",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_镜像扫描')`,
      line: 278
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_性能优化')`,
      line: 287
    },
    {
      original: "层缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_层缓存')`,
      line: 292
    },
    {
      original: "并行构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_并行构建')`,
      line: 295
    },
    {
      original: "资源限制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_资源限制')`,
      line: 298
    },
    {
      original: "健康检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_健康检查')`,
      line: 301
    },
    {
      original: "日志管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\fundamentalsdetail_日志管理')`,
      line: 304
    },
  ],
  '..\frontEnd\src\views\Technology\pages\docker\DockerfileDetail.tsx': [
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_加载中')`,
      line: 32
    },
    {
      original: "加载失败: {error}",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_加载失败_error')`,
      line: 37
    },
    {
      original: "Dockerfile 镜像构建详解",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_dockerfile_镜像构建详解')`,
      line: 56
    },
    {
      original: "掌握 Dockerfile 编写技巧，构建高效、安全的容器镜像",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_掌握_dockerfile_编写技巧')`,
      line: 57
    },
    {
      original: "镜像构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_镜像构建')`,
      line: 59
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_最佳实践')`,
      line: 60
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_性能优化')`,
      line: 61
    },
    {
      original: "安全配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_安全配置')`,
      line: 62
    },
    {
      original: "📚 Dockerfile 基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_dockerfile_基础')`,
      line: 71
    },
    {
      original: "什么是 Dockerfile？",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_什么是_dockerfile')`,
      line: 73
    },
    {
      original: "核心指令",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_核心指令')`,
      line: 80
    },
    {
      original: "FROM (基础镜像)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_from_基础镜像')`,
      line: 82
    },
    {
      original: "RUN (执行命令)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_run_执行命令')`,
      line: 83
    },
    {
      original: "COPY/ADD (复制文件)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_copy_add_复制文件')`,
      line: 84
    },
    {
      original: "WORKDIR (工作目录)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_workdir_工作目录')`,
      line: 85
    },
    {
      original: "EXPOSE (暴露端口)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_expose_暴露端口')`,
      line: 86
    },
    {
      original: "CMD/ENTRYPOINT (启动命令)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_cmd_entrypoint_启动命令')`,
      line: 87
    },
    {
      original: "基础示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_基础示例')`,
      line: 90
    },
    {
      original: "🚀 多阶段构建优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_多阶段构建优化')`,
      line: 102
    },
    {
      original: "为什么使用多阶段构建？",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_为什么使用多阶段构建')`,
      line: 104
    },
    {
      original: "镜像体积小",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_镜像体积小')`,
      line: 115
    },
    {
      original: "安全性高",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_安全性高')`,
      line: 121
    },
    {
      original: "构建效率",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_构建效率')`,
      line: 127
    },
    {
      original: "🔒 安全最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_安全最佳实践')`,
      line: 143
    },
    {
      original: "容器安全原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_容器安全原则')`,
      line: 145
    },
    {
      original: "1. 使用非 root 用户",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_1_使用非_root')`,
      line: 155
    },
    {
      original: "创建专用用户运行应用，避免使用 root 权限",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_创建专用用户运行应用_避免使用_root')`,
      line: 156
    },
    {
      original: "2. 最小化镜像内容",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_2_最小化镜像内容')`,
      line: 162
    },
    {
      original: "只安装必需的软件包，移除不必要的文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_只安装必需的软件包_移除不必要的文件')`,
      line: 163
    },
    {
      original: "3. 使用官方基础镜像",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_3_使用官方基础镜像')`,
      line: 169
    },
    {
      original: "选择官方维护的、定期更新的基础镜像",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_选择官方维护的_定期更新的基础镜像')`,
      line: 170
    },
    {
      original: "⚡ 性能优化技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_性能优化技巧')`,
      line: 186
    },
    {
      original: "镜像层优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_镜像层优化')`,
      line: 188
    },
    {
      original: "1. 合并 RUN 指令",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_1_合并_run')`,
      line: 198
    },
    {
      original: "将多个 RUN 命令合并为一个，减少镜像层数",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_将多个_run_命令合并为一个')`,
      line: 199
    },
    {
      original: "2. 利用构建缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_2_利用构建缓存')`,
      line: 205
    },
    {
      original: "将变化频率低的指令放在前面，提高缓存命中率",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_将变化频率低的指令放在前面_提高缓存命中率')`,
      line: 206
    },
    {
      original: "3. 使用 .dockerignore",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_3_使用_dockerignore')`,
      line: 212
    },
    {
      original: "排除不必要的文件，减小构建上下文",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_排除不必要的文件_减小构建上下文')`,
      line: 213
    },
    {
      original: ".dockerignore 文件配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_dockerignore_文件配置')`,
      line: 226
    },
    {
      original: "⚙️ 环境变量与配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_环境变量与配置')`,
      line: 238
    },
    {
      original: "灵活的配置管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_灵活的配置管理')`,
      line: 240
    },
    {
      original: "合理使用 ENV 和 ARG 指令可以让镜像更加灵活， 支持不同环境的配置需求。",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_合理使用_env_和')`,
      line: 241
    },
    {
      original: "🏥 健康检查配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_健康检查配置')`,
      line: 268
    },
    {
      original: "容器健康监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_容器健康监控')`,
      line: 270
    },
    {
      original: "自动重启",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_自动重启')`,
      line: 280
    },
    {
      original: "负载均衡",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_负载均衡')`,
      line: 286
    },
    {
      original: "监控告警",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_监控告警')`,
      line: 292
    },
    {
      original: "🌐 不同语言的最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_不同语言的最佳实践')`,
      line: 308
    },
    {
      original: "针对不同技术栈的优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_针对不同技术栈的优化')`,
      line: 310
    },
    {
      original: "💡 设计原则与最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_设计原则与最佳实践')`,
      line: 326
    },
    {
      original: "Dockerfile 设计原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_dockerfile_设计原则')`,
      line: 328
    },
    {
      original: "单一职责",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_单一职责')`,
      line: 334
    },
    {
      original: "每个容器应该只运行一个主要进程，遵循微服务架构原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_每个容器应该只运行一个主要进程_遵循微服务架构原则')`,
      line: 335
    },
    {
      original: "最小化原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_最小化原则')`,
      line: 342
    },
    {
      original: "只安装必需的软件包，使用轻量级基础镜像",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_只安装必需的软件包_使用轻量级基础镜像')`,
      line: 343
    },
    {
      original: "安全优先",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_安全优先')`,
      line: 350
    },
    {
      original: "使用非 root 用户，定期更新依赖，扫描安全漏洞",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_使用非_root_用户')`,
      line: 351
    },
    {
      original: "构建优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_构建优化建议')`,
      line: 359
    },
    {
      original: "缓存策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_缓存策略')`,
      line: 363
    },
    {
      original: "层数控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_层数控制')`,
      line: 366
    },
    {
      original: "文件排除",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_文件排除')`,
      line: 369
    },
    {
      original: "多阶段构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_多阶段构建')`,
      line: 372
    },
    {
      original: "生产环境注意事项",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_生产环境注意事项')`,
      line: 383
    },
    {
      original: "镜像扫描",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_镜像扫描')`,
      line: 387
    },
    {
      original: "版本管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_版本管理')`,
      line: 390
    },
    {
      original: "资源限制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_资源限制')`,
      line: 394
    },
    {
      original: "日志配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_日志配置')`,
      line: 397
    },
    {
      original: "健康检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_健康检查')`,
      line: 400
    },
    {
      original: "性能优化技巧",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_性能优化技巧')`,
      line: 411
    },
    {
      original: "基础镜像选择",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_基础镜像选择')`,
      line: 415
    },
    {
      original: "并行构建",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_并行构建')`,
      line: 418
    },
    {
      original: "依赖缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_依赖缓存')`,
      line: 421
    },
    {
      original: "清理缓存",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockerfiledetail_清理缓存')`,
      line: 424
    },
  ],
  '..\frontEnd\src\views\Technology\pages\docker\DockerComposeDetail.tsx': [
    {
      original: "加载代码数据中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_加载代码数据中')`,
      line: 22
    },
    {
      original: "加载失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_加载失败')`,
      line: 31
    },
    {
      original: "使用Docker Compose管理多容器应用程序，实现服务编排和环境一致性",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_使用docker_compose管理多容器应用程序_实现服务编排和环境一致性')`,
      line: 57
    },
    {
      original: "服务编排",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_服务编排')`,
      line: 59
    },
    {
      original: "多容器管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_多容器管理')`,
      line: 60
    },
    {
      original: "环境配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_环境配置')`,
      line: 61
    },
    {
      original: "微服务架构",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_微服务架构')`,
      line: 62
    },
    {
      original: "📋 Docker Compose 概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_docker_compose_概述')`,
      line: 70
    },
    {
      original: "什么是 Docker Compose",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_什么是_docker_compose')`,
      line: 72
    },
    {
      original: "核心概念",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_核心概念')`,
      line: 78
    },
    {
      original: "服务 (Services)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_服务_services')`,
      line: 80
    },
    {
      original: "网络 (Networks)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_网络_networks')`,
      line: 81
    },
    {
      original: "数据卷 (Volumes)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_数据卷_volumes')`,
      line: 82
    },
    {
      original: "配置 (Configs)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_配置_configs')`,
      line: 83
    },
    {
      original: "密钥 (Secrets)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_密钥_secrets')`,
      line: 84
    },
    {
      original: "使用场景",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_使用场景')`,
      line: 87
    },
    {
      original: "开发环境",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_开发环境')`,
      line: 90
    },
    {
      original: "测试环境",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_测试环境')`,
      line: 93
    },
    {
      original: "单机部署",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_单机部署')`,
      line: 96
    },
    {
      original: "微服务",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_微服务')`,
      line: 99
    },
    {
      original: "📄 基础配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_基础配置')`,
      line: 106
    },
    {
      original: "1. docker-compose.yml 基础结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_1_docker_compose')`,
      line: 109
    },
    {
      original: "2. 多阶段构建配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_2_多阶段构建配置')`,
      line: 120
    },
    {
      original: "3. Docker Compose 命令",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_3_docker_compose')`,
      line: 131
    },
    {
      original: "🔧 环境配置与管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_环境配置与管理')`,
      line: 144
    },
    {
      original: "4. 开发环境配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_4_开发环境配置')`,
      line: 147
    },
    {
      original: "5. 生产环境配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_5_生产环境配置')`,
      line: 158
    },
    {
      original: "6. 环境变量管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_6_环境变量管理')`,
      line: 169
    },
    {
      original: "🎯 高级配置与优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_高级配置与优化')`,
      line: 182
    },
    {
      original: "7. 网络配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_7_网络配置')`,
      line: 185
    },
    {
      original: "8. 数据卷管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_8_数据卷管理')`,
      line: 196
    },
    {
      original: "9. 健康检查配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_9_健康检查配置')`,
      line: 207
    },
    {
      original: "🏢 企业级应用示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_企业级应用示例')`,
      line: 220
    },
    {
      original: "10. 资源限制与安全配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_10_资源限制与安全配置')`,
      line: 223
    },
    {
      original: "11. 微服务架构示例",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_11_微服务架构示例')`,
      line: 234
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_最佳实践')`,
      line: 247
    },
    {
      original: "Docker Compose 使用建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_docker_compose_使用建议')`,
      line: 250
    },
    {
      original: "使用版本控制管理compose文件",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_使用版本控制管理compose文件')`,
      line: 254
    },
    {
      original: "合理组织项目文件结构",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_合理组织项目文件结构')`,
      line: 255
    },
    {
      original: "明确指定镜像版本，避免使用latest",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_明确指定镜像版本_避免使用latest')`,
      line: 256
    },
    {
      original: "使用环境变量管理配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_使用环境变量管理配置')`,
      line: 257
    },
    {
      original: "为服务设置健康检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_为服务设置健康检查')`,
      line: 258
    },
    {
      original: "合理配置资源限制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_合理配置资源限制')`,
      line: 259
    },
    {
      original: "生产环境注意事项",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_生产环境注意事项')`,
      line: 267
    },
    {
      original: "安全配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_安全配置')`,
      line: 272
    },
    {
      original: "网络隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_网络隔离')`,
      line: 275
    },
    {
      original: "日志管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_日志管理')`,
      line: 278
    },
    {
      original: "监控告警",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_监控告警')`,
      line: 281
    },
    {
      original: "备份策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_备份策略')`,
      line: 284
    },
    {
      original: "性能优化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_性能优化建议')`,
      line: 293
    },
    {
      original: "镜像优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_镜像优化')`,
      line: 298
    },
    {
      original: "缓存利用",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_缓存利用')`,
      line: 301
    },
    {
      original: "并行启动",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_并行启动')`,
      line: 304
    },
    {
      original: "资源分配",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_资源分配')`,
      line: 307
    },
    {
      original: "网络优化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\dockercomposedetail_网络优化')`,
      line: 310
    },
  ],
  '..\frontEnd\src\views\Technology\pages\docker\DataManagementDetail.tsx': [
    {
      original: "加载代码数据中...",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_加载代码数据中')`,
      line: 22
    },
    {
      original: "加载失败",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_加载失败')`,
      line: 31
    },
    {
      original: "Docker 数据管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_docker_数据管理')`,
      line: 56
    },
    {
      original: "掌握Docker容器数据持久化和管理策略，实现数据安全与高效存储",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_掌握docker容器数据持久化和管理策略_实现数据安全与高效存储')`,
      line: 57
    },
    {
      original: "数据卷 (Volumes)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据卷_volumes')`,
      line: 59
    },
    {
      original: "绑定挂载 (Bind Mounts)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_绑定挂载_bind_mounts')`,
      line: 60
    },
    {
      original: "数据备份",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据备份')`,
      line: 61
    },
    {
      original: "数据安全",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据安全')`,
      line: 62
    },
    {
      original: "📋 数据管理概述",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据管理概述')`,
      line: 70
    },
    {
      original: "为什么需要数据管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_为什么需要数据管理')`,
      line: 72
    },
    {
      original: "数据存储类型",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据存储类型')`,
      line: 78
    },
    {
      original: "Volumes (数据卷)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_volumes_数据卷')`,
      line: 80
    },
    {
      original: "Bind Mounts (绑定挂载)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_bind_mounts_绑定挂载')`,
      line: 81
    },
    {
      original: "tmpfs Mounts (临时文件系统)",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_tmpfs_mounts_临时文件系统')`,
      line: 82
    },
    {
      original: "选择原则",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_选择原则')`,
      line: 85
    },
    {
      original: "📦 基础数据管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_基础数据管理')`,
      line: 101
    },
    {
      original: "1. Volumes 数据卷基础",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_1_volumes_数据卷基础')`,
      line: 104
    },
    {
      original: "2. Bind Mounts 绑定挂载",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_2_bind_mounts')`,
      line: 115
    },
    {
      original: "3. Volume 高级配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_3_volume_高级配置')`,
      line: 126
    },
    {
      original: "💾 数据备份与恢复",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据备份与恢复')`,
      line: 139
    },
    {
      original: "4. 数据备份策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_4_数据备份策略')`,
      line: 142
    },
    {
      original: "5. 数据迁移",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_5_数据迁移')`,
      line: 153
    },
    {
      original: "6. 开发环境配置",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_6_开发环境配置')`,
      line: 164
    },
    {
      original: "🗄️ 数据库容器化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据库容器化')`,
      line: 177
    },
    {
      original: "7. MySQL 容器化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_7_mysql_容器化')`,
      line: 180
    },
    {
      original: "8. PostgreSQL 容器化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_8_postgresql_容器化')`,
      line: 191
    },
    {
      original: "9. Redis 容器化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_9_redis_容器化')`,
      line: 202
    },
    {
      original: "🔒 数据安全与监控",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据安全与监控')`,
      line: 215
    },
    {
      original: "10. 访问控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_10_访问控制')`,
      line: 218
    },
    {
      original: "11. 数据加密",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_11_数据加密')`,
      line: 229
    },
    {
      original: "💡 最佳实践",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_最佳实践')`,
      line: 242
    },
    {
      original: "数据管理建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据管理建议')`,
      line: 245
    },
    {
      original: "生产环境优先使用Volumes而非Bind Mounts",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_生产环境优先使用volumes而非bind_mounts')`,
      line: 249
    },
    {
      original: "为重要数据设置定期备份策略",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_为重要数据设置定期备份策略')`,
      line: 250
    },
    {
      original: "使用命名卷而非匿名卷，便于管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_使用命名卷而非匿名卷_便于管理')`,
      line: 251
    },
    {
      original: "合理设置卷的标签，便于分类管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_合理设置卷的标签_便于分类管理')`,
      line: 252
    },
    {
      original: "定期清理不使用的卷，释放存储空间",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_定期清理不使用的卷_释放存储空间')`,
      line: 253
    },
    {
      original: "监控卷的使用情况和性能",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_监控卷的使用情况和性能')`,
      line: 254
    },
    {
      original: "数据库容器化建议",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据库容器化建议')`,
      line: 262
    },
    {
      original: "数据持久化",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_数据持久化')`,
      line: 267
    },
    {
      original: "配置管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_配置管理')`,
      line: 270
    },
    {
      original: "初始化脚本",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_初始化脚本')`,
      line: 273
    },
    {
      original: "健康检查",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_健康检查')`,
      line: 276
    },
    {
      original: "资源限制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_资源限制')`,
      line: 279
    },
    {
      original: "安全注意事项",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_安全注意事项')`,
      line: 288
    },
    {
      original: "权限控制",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_权限控制')`,
      line: 293
    },
    {
      original: "网络隔离",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_网络隔离')`,
      line: 296
    },
    {
      original: "密码管理",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_密码管理')`,
      line: 299
    },
    {
      original: "备份加密",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_备份加密')`,
      line: 302
    },
    {
      original: "访问日志",
      replacement: `t('common:..\frontend\src\views\technology\pages\docker\datamanagementdetail_访问日志')`,
      line: 305
    },
  ],
  '..\frontEnd\src\views\systemPages\ResetPassword.tsx': [
    {
      original: "密码重置成功，请使用新密码登录",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_密码重置成功_请使用新密码登录')`,
      line: 42
    },
    {
      original: "用户名或邮箱不匹配，请检查后重试",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_用户名或邮箱不匹配_请检查后重试')`,
      line: 47
    },
    {
      original: "请输入用户名!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入用户名')`,
      line: 61
    },
    {
      original: "请输入用户名!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入用户名')`,
      line: 61
    },
    {
      original: "请输入用户名",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入用户名')`,
      line: 68
    },
    {
      original: "请输入邮箱地址!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入邮箱地址')`,
      line: 78
    },
    {
      original: "请输入邮箱地址!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入邮箱地址')`,
      line: 78
    },
    {
      original: "请输入有效的邮箱地址!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入有效的邮箱地址')`,
      line: 79
    },
    {
      original: "请输入有效的邮箱地址!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入有效的邮箱地址')`,
      line: 79
    },
    {
      original: "请输入邮箱地址",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入邮箱地址')`,
      line: 87
    },
    {
      original: "请输入新密码!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入新密码')`,
      line: 97
    },
    {
      original: "请输入新密码!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入新密码')`,
      line: 97
    },
    {
      original: "密码长度至少为6位!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_密码长度至少为6位')`,
      line: 98
    },
    {
      original: "密码长度至少为6位!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_密码长度至少为6位')`,
      line: 98
    },
    {
      original: "请输入新密码",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请输入新密码')`,
      line: 106
    },
    {
      original: "请确认新密码!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请确认新密码')`,
      line: 124
    },
    {
      original: "请确认新密码!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请确认新密码')`,
      line: 124
    },
    {
      original: "两次输入的密码不一致!",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_两次输入的密码不一致')`,
      line: 130
    },
    {
      original: "请确认新密码",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_请确认新密码')`,
      line: 140
    },
    {
      original: "重置密码",
      replacement: `t('common:..\frontend\src\views\systempages\resetpassword_重置密码')`,
      line: 160
    },
  ],
  '..\frontEnd\src\views\systemPages\Login.tsx': [
    {
      original: "登录成功",
      replacement: `t('common:..\frontend\src\views\systempages\login_登录成功')`,
      line: 74
    },
    {
      original: "登录失败，请检查用户名和密码",
      replacement: `t('common:..\frontend\src\views\systempages\login_登录失败_请检查用户名和密码')`,
      line: 79
    },
    {
      original: "注册成功",
      replacement: `t('common:..\frontend\src\views\systempages\login_注册成功')`,
      line: 95
    },
    {
      original: "注册失败，请稍后重试",
      replacement: `t('common:..\frontend\src\views\systempages\login_注册失败_请稍后重试')`,
      line: 98
    },
    {
      original: "K爷的空间",
      replacement: `t('common:..\frontend\src\views\systempages\login_k爷的空间')`,
      line: 119
    },
    {
      original: "请输入用户名!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入用户名')`,
      line: 132
    },
    {
      original: "请输入用户名!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入用户名')`,
      line: 132
    },
    {
      original: "请输入用户名或邮箱",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入用户名或邮箱')`,
      line: 139
    },
    {
      original: "请输入密码!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入密码')`,
      line: 146
    },
    {
      original: "请输入密码!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入密码')`,
      line: 146
    },
    {
      original: "请输入密码",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入密码')`,
      line: 153
    },
    {
      original: "记住密码",
      replacement: `t('common:..\frontend\src\views\systempages\login_记住密码')`,
      line: 167
    },
    {
      original: "K爷的空间",
      replacement: `t('common:..\frontend\src\views\systempages\login_k爷的空间')`,
      line: 199
    },
    {
      original: "请输入用户名!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入用户名')`,
      line: 211
    },
    {
      original: "请输入用户名!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入用户名')`,
      line: 211
    },
    {
      original: "请输入用户名",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入用户名')`,
      line: 218
    },
    {
      original: "请输入邮箱!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入邮箱')`,
      line: 227
    },
    {
      original: "请输入邮箱!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入邮箱')`,
      line: 227
    },
    {
      original: "请输入有效的邮箱地址!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入有效的邮箱地址')`,
      line: 228
    },
    {
      original: "请输入有效的邮箱地址!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入有效的邮箱地址')`,
      line: 228
    },
    {
      original: "请输入邮箱",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入邮箱')`,
      line: 236
    },
    {
      original: "请输入密码!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入密码')`,
      line: 245
    },
    {
      original: "请输入密码!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入密码')`,
      line: 245
    },
    {
      original: "密码长度至少为6位!",
      replacement: `t('common:..\frontend\src\views\systempages\login_密码长度至少为6位')`,
      line: 246
    },
    {
      original: "密码长度至少为6位!",
      replacement: `t('common:..\frontend\src\views\systempages\login_密码长度至少为6位')`,
      line: 246
    },
    {
      original: "请输入密码",
      replacement: `t('common:..\frontend\src\views\systempages\login_请输入密码')`,
      line: 254
    },
    {
      original: "请确认密码!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请确认密码')`,
      line: 271
    },
    {
      original: "请确认密码!",
      replacement: `t('common:..\frontend\src\views\systempages\login_请确认密码')`,
      line: 271
    },
    {
      original: "两次输入的密码不一致!",
      replacement: `t('common:..\frontend\src\views\systempages\login_两次输入的密码不一致')`,
      line: 277
    },
    {
      original: "请确认密码",
      replacement: `t('common:..\frontend\src\views\systempages\login_请确认密码')`,
      line: 287
    },
    {
      original: "探索技术的无限可能",
      replacement: `t('common:..\frontend\src\views\systempages\login_探索技术的无限可能')`,
      line: 318
    },
    {
      original: "登录",
      replacement: `t('common:..\frontend\src\views\systempages\login_登录')`,
      line: 332
    },
    {
      original: "登录",
      replacement: `t('common:..\frontend\src\views\systempages\login_登录')`,
      line: 332
    },
    {
      original: "注册",
      replacement: `t('common:..\frontend\src\views\systempages\login_注册')`,
      line: 337
    },
    {
      original: "注册",
      replacement: `t('common:..\frontend\src\views\systempages\login_注册')`,
      line: 337
    },
  ],
  '..\frontEnd\src\views\Home\components\TodoList.tsx': [
    {
      original: "近期要做",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_近期要做')`,
      line: 11
    },
    {
      original: "近期要做",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_近期要做')`,
      line: 11
    },
    {
      original: "长期任务",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_长期任务')`,
      line: 12
    },
    {
      original: "长期任务",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_长期任务')`,
      line: 12
    },
    {
      original: "学习计划",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_学习计划')`,
      line: 13
    },
    {
      original: "学习计划",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_学习计划')`,
      line: 13
    },
    {
      original: "待办事项",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_待办事项')`,
      line: 75
    },
    {
      original: "编辑待办事项",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_编辑待办事项')`,
      line: 83
    },
    {
      original: "添加新的待办事项",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_添加新的待办事项')`,
      line: 83
    },
    {
      original: "添加新的待办事项",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_添加新的待办事项')`,
      line: 83
    },
    {
      original: "确认",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_确认')`,
      line: 87
    },
    {
      original: "取消",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_取消')`,
      line: 88
    },
    {
      original: "内容",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_内容')`,
      line: 94
    },
    {
      original: "请输入待办内容!",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_请输入待办内容')`,
      line: 95
    },
    {
      original: "请输入待办内容!",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_请输入待办内容')`,
      line: 95
    },
    {
      original: "准备做什么？",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_准备做什么')`,
      line: 97
    },
    {
      original: "类型",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_类型')`,
      line: 101
    },
    {
      original: "请选择类型!",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_请选择类型')`,
      line: 102
    },
    {
      original: "请选择类型!",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_请选择类型')`,
      line: 102
    },
    {
      original: "全部",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_全部')`,
      line: 118
    },
    {
      original: "确定删除吗？",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_确定删除吗')`,
      line: 135
    },
    {
      original: "暂无待办事项",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_暂无待办事项')`,
      line: 151
    },
    {
      original: "暂无待办事项",
      replacement: `t('common:..\frontend\src\views\home\components\todolist_暂无待办事项')`,
      line: 151
    },
  ],
  '..\frontEnd\src\views\Home\components\Header.tsx': [
    {
      original: "文章",
      replacement: `t('common:..\frontend\src\views\home\components\header_文章')`,
      line: 17
    },
    {
      original: "访问",
      replacement: `t('common:..\frontend\src\views\home\components\header_访问')`,
      line: 18
    },
    {
      original: "点赞",
      replacement: `t('common:..\frontend\src\views\home\components\header_点赞')`,
      line: 19
    },
  ],
  '..\frontEnd\src\views\Home\components\Content.tsx': [
    {
      original: "React 18 新特性深度解析",
      replacement: `t('common:..\frontend\src\views\home\components\content_react_18_新特性深度解析')`,
      line: 25
    },
    {
      original: "React 18 新特性深度解析",
      replacement: `t('common:..\frontend\src\views\home\components\content_react_18_新特性深度解析')`,
      line: 25
    },
    {
      original: "深入了解React 18的并发特性、Suspense改进以及新的Hooks API，掌握现代React开发的核心技术。",
      replacement: `t('common:..\frontend\src\views\home\components\content_深入了解react_18的并发特性_suspense改进以及新的hooks')`,
      line: 27
    },
    {
      original: "前端",
      replacement: `t('common:..\frontend\src\views\home\components\content_前端')`,
      line: 29
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 30
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 30
    },
    {
      original: "技术书籍推荐",
      replacement: `t('common:..\frontend\src\views\home\components\content_技术书籍推荐')`,
      line: 41
    },
    {
      original: "技术书籍推荐",
      replacement: `t('common:..\frontend\src\views\home\components\content_技术书籍推荐')`,
      line: 41
    },
    {
      original: "精选优质技术书籍，涵盖前端、后端、算法、系统设计等多个领域，助力技术成长。",
      replacement: `t('common:..\frontend\src\views\home\components\content_精选优质技术书籍_涵盖前端_后端')`,
      line: 42
    },
    {
      original: "精选优质技术书籍，涵盖前端、后端、算法、系统设计等多个领域，助力技术成长。",
      replacement: `t('common:..\frontend\src\views\home\components\content_精选优质技术书籍_涵盖前端_后端')`,
      line: 42
    },
    {
      original: "书籍",
      replacement: `t('common:..\frontend\src\views\home\components\content_书籍')`,
      line: 44
    },
    {
      original: "学习",
      replacement: `t('common:..\frontend\src\views\home\components\content_学习')`,
      line: 44
    },
    {
      original: "成长",
      replacement: `t('common:..\frontend\src\views\home\components\content_成长')`,
      line: 44
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 45
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 45
    },
    {
      original: "Node.js 性能优化实战",
      replacement: `t('common:..\frontend\src\views\home\components\content_node_js_性能优化实战')`,
      line: 56
    },
    {
      original: "Node.js 性能优化实战",
      replacement: `t('common:..\frontend\src\views\home\components\content_node_js_性能优化实战')`,
      line: 56
    },
    {
      original: "从内存管理、事件循环到集群部署，全方位提升Node.js应用性能。",
      replacement: `t('common:..\frontend\src\views\home\components\content_从内存管理_事件循环到集群部署_全方位提升node')`,
      line: 57
    },
    {
      original: "从内存管理、事件循环到集群部署，全方位提升Node.js应用性能。",
      replacement: `t('common:..\frontend\src\views\home\components\content_从内存管理_事件循环到集群部署_全方位提升node')`,
      line: 57
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\views\home\components\content_性能优化')`,
      line: 59
    },
    {
      original: "后端",
      replacement: `t('common:..\frontend\src\views\home\components\content_后端')`,
      line: 59
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 60
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 60
    },
    {
      original: "美图欣赏",
      replacement: `t('common:..\frontend\src\views\home\components\content_美图欣赏')`,
      line: 71
    },
    {
      original: "美图欣赏",
      replacement: `t('common:..\frontend\src\views\home\components\content_美图欣赏')`,
      line: 71
    },
    {
      original: "分享一些精美的图片和摄影作品，感受视觉艺术的魅力。",
      replacement: `t('common:..\frontend\src\views\home\components\content_分享一些精美的图片和摄影作品_感受视觉艺术的魅力')`,
      line: 72
    },
    {
      original: "分享一些精美的图片和摄影作品，感受视觉艺术的魅力。",
      replacement: `t('common:..\frontend\src\views\home\components\content_分享一些精美的图片和摄影作品_感受视觉艺术的魅力')`,
      line: 72
    },
    {
      original: "摄影",
      replacement: `t('common:..\frontend\src\views\home\components\content_摄影')`,
      line: 74
    },
    {
      original: "艺术",
      replacement: `t('common:..\frontend\src\views\home\components\content_艺术')`,
      line: 74
    },
    {
      original: "美图",
      replacement: `t('common:..\frontend\src\views\home\components\content_美图')`,
      line: 74
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 75
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 75
    },
    {
      original: "TypeScript 进阶指南",
      replacement: `t('common:..\frontend\src\views\home\components\content_typescript_进阶指南')`,
      line: 86
    },
    {
      original: "TypeScript 进阶指南",
      replacement: `t('common:..\frontend\src\views\home\components\content_typescript_进阶指南')`,
      line: 86
    },
    {
      original: "掌握TypeScript的高级类型、装饰器、模块系统等特性，编写更安全的JavaScript代码。",
      replacement: `t('common:..\frontend\src\views\home\components\content_掌握typescript的高级类型_装饰器_模块系统等特性')`,
      line: 88
    },
    {
      original: "类型安全",
      replacement: `t('common:..\frontend\src\views\home\components\content_类型安全')`,
      line: 90
    },
    {
      original: "前端",
      replacement: `t('common:..\frontend\src\views\home\components\content_前端')`,
      line: 90
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 91
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 91
    },
    {
      original: "设计模式实践",
      replacement: `t('common:..\frontend\src\views\home\components\content_设计模式实践')`,
      line: 102
    },
    {
      original: "设计模式实践",
      replacement: `t('common:..\frontend\src\views\home\components\content_设计模式实践')`,
      line: 102
    },
    {
      original: "通过实际案例学习常用设计模式，提升代码质量和可维护性。",
      replacement: `t('common:..\frontend\src\views\home\components\content_通过实际案例学习常用设计模式_提升代码质量和可维护性')`,
      line: 103
    },
    {
      original: "通过实际案例学习常用设计模式，提升代码质量和可维护性。",
      replacement: `t('common:..\frontend\src\views\home\components\content_通过实际案例学习常用设计模式_提升代码质量和可维护性')`,
      line: 103
    },
    {
      original: "设计模式",
      replacement: `t('common:..\frontend\src\views\home\components\content_设计模式')`,
      line: 105
    },
    {
      original: "架构",
      replacement: `t('common:..\frontend\src\views\home\components\content_架构')`,
      line: 105
    },
    {
      original: "编程",
      replacement: `t('common:..\frontend\src\views\home\components\content_编程')`,
      line: 105
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 106
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 106
    },
    {
      original: "风景摄影集",
      replacement: `t('common:..\frontend\src\views\home\components\content_风景摄影集')`,
      line: 117
    },
    {
      original: "风景摄影集",
      replacement: `t('common:..\frontend\src\views\home\components\content_风景摄影集')`,
      line: 117
    },
    {
      original: "记录旅途中的美好瞬间，分享大自然的壮丽景色。",
      replacement: `t('common:..\frontend\src\views\home\components\content_记录旅途中的美好瞬间_分享大自然的壮丽景色')`,
      line: 118
    },
    {
      original: "记录旅途中的美好瞬间，分享大自然的壮丽景色。",
      replacement: `t('common:..\frontend\src\views\home\components\content_记录旅途中的美好瞬间_分享大自然的壮丽景色')`,
      line: 118
    },
    {
      original: "风景",
      replacement: `t('common:..\frontend\src\views\home\components\content_风景')`,
      line: 120
    },
    {
      original: "旅行",
      replacement: `t('common:..\frontend\src\views\home\components\content_旅行')`,
      line: 120
    },
    {
      original: "摄影",
      replacement: `t('common:..\frontend\src\views\home\components\content_摄影')`,
      line: 120
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 121
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 121
    },
    {
      original: "Vue 3 Composition API 实战",
      replacement: `t('common:..\frontend\src\views\home\components\content_vue_3_composition')`,
      line: 132
    },
    {
      original: "Vue 3 Composition API 实战",
      replacement: `t('common:..\frontend\src\views\home\components\content_vue_3_composition')`,
      line: 132
    },
    {
      original: "深入学习Vue 3的组合式API，构建更灵活、可复用的组件。",
      replacement: `t('common:..\frontend\src\views\home\components\content_深入学习vue_3的组合式api_构建更灵活')`,
      line: 133
    },
    {
      original: "深入学习Vue 3的组合式API，构建更灵活、可复用的组件。",
      replacement: `t('common:..\frontend\src\views\home\components\content_深入学习vue_3的组合式api_构建更灵活')`,
      line: 133
    },
    {
      original: "前端",
      replacement: `t('common:..\frontend\src\views\home\components\content_前端')`,
      line: 135
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 136
    },
    {
      original: "K爷",
      replacement: `t('common:..\frontend\src\views\home\components\content_k爷')`,
      line: 136
    },
  ],
  '..\frontEnd\src\views\Files\Upload.tsx': [
    {
      original: "开始上传: ${fileName}",
      replacement: `t('common:..\frontend\src\views\files\upload_开始上传_filename')`,
      line: 48
    },
    {
      original: "开始上传: ${fileName}",
      replacement: `t('common:..\frontend\src\views\files\upload_开始上传_filename')`,
      line: 48
    },
    {
      original: "文件上传成功，状态已更新:",
      replacement: `t('common:..\frontend\src\views\files\upload_文件上传成功_状态已更新')`,
      line: 74
    },
    {
      original: "${fileName} 上传成功！",
      replacement: `t('common:..\frontend\src\views\files\upload_filename_上传成功')`,
      line: 77
    },
    {
      original: "${fileName} 上传成功！",
      replacement: `t('common:..\frontend\src\views\files\upload_filename_上传成功')`,
      line: 77
    },
    {
      original: "文件上传失败，状态已更新:",
      replacement: `t('common:..\frontend\src\views\files\upload_文件上传失败_状态已更新')`,
      line: 90
    },
    {
      original: "${fileName} 上传失败: ${error}",
      replacement: `t('common:..\frontend\src\views\files\upload_filename_上传失败_error')`,
      line: 93
    },
    {
      original: "${fileName} 上传失败: ${error}",
      replacement: `t('common:..\frontend\src\views\files\upload_filename_上传失败_error')`,
      line: 93
    },
    {
      original: "开始合并文件: ${fileName}",
      replacement: `t('common:..\frontend\src\views\files\upload_开始合并文件_filename')`,
      line: 104
    },
    {
      original: "开始合并文件: ${fileName}",
      replacement: `t('common:..\frontend\src\views\files\upload_开始合并文件_filename')`,
      line: 104
    },
    {
      original: "文件合并完成: ${fileName}",
      replacement: `t('common:..\frontend\src\views\files\upload_文件合并完成_filename')`,
      line: 108
    },
    {
      original: "文件合并完成: ${fileName}",
      replacement: `t('common:..\frontend\src\views\files\upload_文件合并完成_filename')`,
      line: 108
    },
    {
      original: "=== 暂停文件 ===",
      replacement: `t('common:..\frontend\src\views\files\upload_暂停文件')`,
      line: 160
    },
    {
      original: "使用标识符暂停文件:",
      replacement: `t('common:..\frontend\src\views\files\upload_使用标识符暂停文件')`,
      line: 171
    },
    {
      original: "文件暂停处理完成:",
      replacement: `t('common:..\frontend\src\views\files\upload_文件暂停处理完成')`,
      line: 180
    },
    {
      original: "文件上传过滤结果:",
      replacement: `t('common:..\frontend\src\views\files\upload_文件上传过滤结果')`,
      line: 251
    },
    {
      original: "没有需要上传的文件",
      replacement: `t('common:..\frontend\src\views\files\upload_没有需要上传的文件')`,
      line: 262
    },
    {
      original: "上传失败",
      replacement: `t('common:..\frontend\src\views\files\upload_上传失败')`,
      line: 297
    },
    {
      original: "上传失败",
      replacement: `t('common:..\frontend\src\views\files\upload_上传失败')`,
      line: 297
    },
  ],
  '..\frontEnd\src\views\Files\FilePreview.tsx': [
    {
      original: "文件列表",
      replacement: `t('common:..\frontend\src\views\files\filepreview_文件列表')`,
      line: 136
    },
    {
      original: "文件预览",
      replacement: `t('common:..\frontend\src\views\files\filepreview_文件预览')`,
      line: 162
    },
  ],
  '..\frontEnd\src\views\Files\components\VideoPreview.tsx': [
    {
      original: "视频加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_视频加载失败')`,
      line: 85
    },
    {
      original: "视频加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_视频加载失败')`,
      line: 86
    },
    {
      original: "视频预览失败",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_视频预览失败')`,
      line: 243
    },
    {
      original: "重新加载",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_重新加载')`,
      line: 250
    },
    {
      original: "下载视频",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_下载视频')`,
      line: 251
    },
    {
      original: "重新加载",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_重新加载')`,
      line: 272
    },
    {
      original: "全屏",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_全屏')`,
      line: 276
    },
    {
      original: "下载",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_下载')`,
      line: 284
    },
    {
      original: "加载视频中...",
      replacement: `t('common:..\frontend\src\views\files\components\videopreview_加载视频中')`,
      line: 315
    },
  ],
  '..\frontEnd\src\views\Files\components\TextPreview.tsx': [
    {
      original: "内容已复制到剪贴板",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_内容已复制到剪贴板')`,
      line: 128
    },
    {
      original: "复制失败",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_复制失败')`,
      line: 130
    },
    {
      original: "文本预览失败",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_文本预览失败')`,
      line: 226
    },
    {
      original: "重新加载",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_重新加载')`,
      line: 233
    },
    {
      original: "下载文件",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_下载文件')`,
      line: 234
    },
    {
      original: "编码:",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_编码')`,
      line: 256
    },
    {
      original: "行号:",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_行号')`,
      line: 273
    },
    {
      original: "换行:",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_换行')`,
      line: 278
    },
    {
      original: "字号:",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_字号')`,
      line: 283
    },
    {
      original: "复制内容",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_复制内容')`,
      line: 297
    },
    {
      original: "重新加载",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_重新加载')`,
      line: 306
    },
    {
      original: "全屏预览",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_全屏预览')`,
      line: 310
    },
    {
      original: "下载",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_下载')`,
      line: 318
    },
    {
      original: "加载文本中...",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_加载文本中')`,
      line: 334
    },
    {
      original: "编码: {selectedEncoding.toUpperCase()}",
      replacement: `t('common:..\frontend\src\views\files\components\textpreview_编码_selectedencoding_touppercase')`,
      line: 347
    },
  ],
  '..\frontEnd\src\views\Files\components\PDFPreview.tsx': [
    {
      original: "检测到的PDF.js版本:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_检测到的pdf_js版本')`,
      line: 28
    },
    {
      original: "PDF.js worker配置成功 (v${currentVersion})",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf_js_worker配置成功')`,
      line: 34
    },
    {
      original: "PDF.js worker配置成功 (v${currentVersion})",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf_js_worker配置成功')`,
      line: 34
    },
    {
      original: "Worker源:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_worker源')`,
      line: 35
    },
    {
      original: "尝试备用PDF worker配置",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_尝试备用pdf_worker配置')`,
      line: 127
    },
    {
      original: "使用本地静态.mjs文件作为备用worker源",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_使用本地静态_mjs文件作为备用worker源')`,
      line: 131
    },
    {
      original: "PDF加载错误详情:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf加载错误详情')`,
      line: 144
    },
    {
      original: "当前PDF.js版本:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_当前pdf_js版本')`,
      line: 145
    },
    {
      original: "当前Worker配置:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_当前worker配置')`,
      line: 146
    },
    {
      original: "PDF加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf加载失败')`,
      line: 148
    },
    {
      original: "PDF渲染引擎加载失败，正在尝试修复...",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf渲染引擎加载失败_正在尝试修复')`,
      line: 152
    },
    {
      original: "PDF worker加载失败，尝试备用配置方案",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf_worker加载失败_尝试备用配置方案')`,
      line: 154
    },
    {
      original: "当前PDF.js版本:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_当前pdf_js版本')`,
      line: 155
    },
    {
      original: "当前Worker配置:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_当前worker配置')`,
      line: 156
    },
    {
      original: "网络连接失败，请检查网络连接后重试",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_网络连接失败_请检查网络连接后重试')`,
      line: 163
    },
    {
      original: "PDF文件格式无效或已损坏",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf文件格式无效或已损坏')`,
      line: 165
    },
    {
      original: "PDF加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf加载失败')`,
      line: 167
    },
    {
      original: "全屏功能不支持:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_全屏功能不支持')`,
      line: 324
    },
    {
      original: "当前浏览器不支持全屏功能",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_当前浏览器不支持全屏功能')`,
      line: 325
    },
    {
      original: "PDF预览失败",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf预览失败')`,
      line: 481
    },
    {
      original: "重新加载",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_重新加载')`,
      line: 488
    },
    {
      original: "下载PDF文件",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_下载pdf文件')`,
      line: 489
    },
    {
      original: "在新窗口中打开",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_在新窗口中打开')`,
      line: 490
    },
    {
      original: "上一页 (←)",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_上一页')`,
      line: 514
    },
    {
      original: "下一页 (→)",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_下一页')`,
      line: 538
    },
    {
      original: "放大 (+)",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_放大')`,
      line: 553
    },
    {
      original: "缩小 (-)",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_缩小')`,
      line: 563
    },
    {
      original: "实际大小 (Ctrl+0)",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_实际大小_ctrl_0')`,
      line: 573
    },
    {
      original: "适合宽度",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_适合宽度')`,
      line: 584
    },
    {
      original: "适合高度",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_适合高度')`,
      line: 593
    },
    {
      original: "刷新",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_刷新')`,
      line: 602
    },
    {
      original: "全屏预览",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_全屏预览')`,
      line: 611
    },
    {
      original: "下载",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_下载')`,
      line: 620
    },
    {
      original: "加载PDF中...",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_加载pdf中')`,
      line: 648
    },
    {
      original: "PDF加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf加载失败')`,
      line: 654
    },
    {
      original: "无法加载PDF文件，请检查文件是否损坏",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_无法加载pdf文件_请检查文件是否损坏')`,
      line: 655
    },
    {
      original: "没有PDF数据",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_没有pdf数据')`,
      line: 664
    },
    {
      original: "PDF文件为空或无效",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_pdf文件为空或无效')`,
      line: 665
    },
    {
      original: "页面加载失败:",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_页面加载失败')`,
      line: 677
    },
    {
      original: "第${currentPage}页加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_第_currentpage_页加载失败')`,
      line: 678
    },
    {
      original: "第${currentPage}页加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_第_currentpage_页加载失败')`,
      line: 678
    },
    {
      original: "实际大小",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_实际大小')`,
      line: 696
    },
    {
      original: "适合宽度",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_适合宽度')`,
      line: 698
    },
    {
      original: "适合高度",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_适合高度')`,
      line: 700
    },
    {
      original: "自定义",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_自定义')`,
      line: 701
    },
    {
      original: "自定义",
      replacement: `t('common:..\frontend\src\views\files\components\pdfpreview_自定义')`,
      line: 701
    },
  ],
  '..\frontEnd\src\views\Files\components\MarkdownPreview.tsx': [
    {
      original: "文件过大，无法预览（限制1MB）",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_文件过大_无法预览_限制1mb')`,
      line: 139
    },
    {
      original: "Markdown加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_markdown加载失败')`,
      line: 150
    },
    {
      original: "Markdown加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_markdown加载失败')`,
      line: 150
    },
    {
      original: "内容已复制到剪贴板",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_内容已复制到剪贴板')`,
      line: 164
    },
    {
      original: "复制失败",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_复制失败')`,
      line: 166
    },
    {
      original: "Markdown预览失败",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_markdown预览失败')`,
      line: 223
    },
    {
      original: "重新加载",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_重新加载')`,
      line: 230
    },
    {
      original: "下载文件",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_下载文件')`,
      line: 231
    },
    {
      original: "源码",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_源码')`,
      line: 266
    },
    {
      original: "预览",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_预览')`,
      line: 266
    },
    {
      original: "预览",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_预览')`,
      line: 266
    },
    {
      original: "复制内容",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_复制内容')`,
      line: 273
    },
    {
      original: "重新加载",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_重新加载')`,
      line: 282
    },
    {
      original: "全屏预览",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_全屏预览')`,
      line: 286
    },
    {
      original: "下载",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_下载')`,
      line: 294
    },
    {
      original: "加载Markdown中...",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_加载markdown中')`,
      line: 310
    },
    {
      original: "模式: {showSource ? '源码' : '预览'}",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_模式_showsource_源码')`,
      line: 335
    },
    {
      original: "源码",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_源码')`,
      line: 335
    },
    {
      original: "预览",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_预览')`,
      line: 335
    },
    {
      original: "预览",
      replacement: `t('common:..\frontend\src\views\files\components\markdownpreview_预览')`,
      line: 335
    },
  ],
  '..\frontEnd\src\views\Files\components\ImagePreview.tsx': [
    {
      original: "图片加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_图片加载失败')`,
      line: 91
    },
    {
      original: "图片预览失败",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_图片预览失败')`,
      line: 284
    },
    {
      original: "window.open(src, '_blank')}>在新窗口中打开",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_window_open_src')`,
      line: 290
    },
    {
      original: "放大",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_放大')`,
      line: 310
    },
    {
      original: "缩小",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_缩小')`,
      line: 319
    },
    {
      original: "向左旋转",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_向左旋转')`,
      line: 328
    },
    {
      original: "向右旋转",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_向右旋转')`,
      line: 336
    },
    {
      original: "重置",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_重置')`,
      line: 344
    },
    {
      original: "全屏预览",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_全屏预览')`,
      line: 354
    },
    {
      original: "下载",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_下载')`,
      line: 362
    },
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_加载中')`,
      line: 391
    },
    {
      original: "| 旋转: ${rotation}°",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_旋转_rotation')`,
      line: 430
    },
    {
      original: "| 旋转: ${rotation}°",
      replacement: `t('common:..\frontend\src\views\files\components\imagepreview_旋转_rotation')`,
      line: 430
    },
  ],
  '..\frontEnd\src\views\Files\components\FileViewerContainer.tsx': [
    {
      original: "请选择文件进行预览",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_请选择文件进行预览')`,
      line: 22
    },
    {
      original: "请选择文件进行预览",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_请选择文件进行预览')`,
      line: 32
    },
    {
      original: "文件预览加载完成: ${name}",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_文件预览加载完成_name')`,
      line: 42
    },
    {
      original: "文件预览加载完成: ${name}",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_文件预览加载完成_name')`,
      line: 42
    },
    {
      original: "文件预览失败: ${name}",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_文件预览失败_name')`,
      line: 46
    },
    {
      original: "文件预览失败: ${name}",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_文件预览失败_name')`,
      line: 46
    },
    {
      original: "图片",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_图片')`,
      line: 52
    },
    {
      original: "图片",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_图片')`,
      line: 52
    },
    {
      original: "PDF文档",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_pdf文档')`,
      line: 53
    },
    {
      original: "PDF文档",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_pdf文档')`,
      line: 53
    },
    {
      original: "视频",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_视频')`,
      line: 54
    },
    {
      original: "视频",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_视频')`,
      line: 54
    },
    {
      original: "音频",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_音频')`,
      line: 55
    },
    {
      original: "音频",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_音频')`,
      line: 55
    },
    {
      original: "文本",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_文本')`,
      line: 56
    },
    {
      original: "文本",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_文本')`,
      line: 56
    },
    {
      original: "代码",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_代码')`,
      line: 58
    },
    {
      original: "代码",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_代码')`,
      line: 58
    },
    {
      original: "Office文档",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_office文档')`,
      line: 59
    },
    {
      original: "Office文档",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_office文档')`,
      line: 59
    },
    {
      original: "压缩文件",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_压缩文件')`,
      line: 60
    },
    {
      original: "压缩文件",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_压缩文件')`,
      line: 60
    },
    {
      original: "未知类型",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_未知类型')`,
      line: 61
    },
    {
      original: "未知类型",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_未知类型')`,
      line: 61
    },
    {
      original: "未知类型",
      replacement: `t('common:..\frontend\src\views\files\components\fileviewercontainer_未知类型')`,
      line: 63
    },
  ],
  '..\frontEnd\src\views\Files\components\FilePreviewModal.tsx': [
    {
      original: "文件预览",
      replacement: `t('common:..\frontend\src\views\files\components\filepreviewmodal_文件预览')`,
      line: 55
    },
    {
      original: "${typeDisplayName}预览 - ${fileInfo.name}",
      replacement: `t('common:..\frontend\src\views\files\components\filepreviewmodal_typedisplayname_预览_fileinfo')`,
      line: 60
    },
    {
      original: "${typeDisplayName}预览 - ${fileInfo.name}",
      replacement: `t('common:..\frontend\src\views\files\components\filepreviewmodal_typedisplayname_预览_fileinfo')`,
      line: 60
    },
    {
      original: "文件预览加载成功:",
      replacement: `t('common:..\frontend\src\views\files\components\filepreviewmodal_文件预览加载成功')`,
      line: 67
    },
    {
      original: "文件预览失败:",
      replacement: `t('common:..\frontend\src\views\files\components\filepreviewmodal_文件预览失败')`,
      line: 74
    },
    {
      original: "没有选择文件",
      replacement: `t('common:..\frontend\src\views\files\components\filepreviewmodal_没有选择文件')`,
      line: 162
    },
    {
      original: "请选择要预览的文件",
      replacement: `t('common:..\frontend\src\views\files\components\filepreviewmodal_请选择要预览的文件')`,
      line: 163
    },
  ],
  '..\frontEnd\src\views\Files\components\FilePreview.tsx': [
    {
      original: "Markdown加载失败:",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_markdown加载失败')`,
      line: 147
    },
    {
      original: "Markdown加载成功，长度:",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_markdown加载成功_长度')`,
      line: 148
    },
    {
      original: "Office文档预览",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_office文档预览')`,
      line: 179
    },
    {
      original: "此文件类型需要下载后使用相应软件打开",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_此文件类型需要下载后使用相应软件打开')`,
      line: 180
    },
    {
      original: "压缩文件",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_压缩文件')`,
      line: 199
    },
    {
      original: "压缩文件无法在线预览，请下载后解压查看",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_压缩文件无法在线预览_请下载后解压查看')`,
      line: 200
    },
    {
      original: "不支持预览此文件类型",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_不支持预览此文件类型')`,
      line: 221
    },
    {
      original: "无法预览此文件",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_无法预览此文件')`,
      line: 258
    },
    {
      original: "文件过大，无法预览（限制${formatFileSize(sizeLimit)}）",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_文件过大_无法预览_限制')`,
      line: 263
    },
    {
      original: "文件过大，无法预览（限制${formatFileSize(sizeLimit)}）",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_文件过大_无法预览_限制')`,
      line: 263
    },
    {
      original: "文件预览限制",
      replacement: `t('common:..\frontend\src\views\files\components\filepreview_文件预览限制')`,
      line: 270
    },
  ],
  '..\frontEnd\src\views\Files\components\EnhancedMarkdownPreview.tsx': [
    {
      original: "未提供文件URL",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_未提供文件url')`,
      line: 124
    },
    {
      original: "Markdown加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_markdown加载失败')`,
      line: 146
    },
    {
      original: "Markdown加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_markdown加载失败')`,
      line: 146
    },
    {
      original: "内容已复制到剪贴板",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_内容已复制到剪贴板')`,
      line: 165
    },
    {
      original: "复制失败",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_复制失败')`,
      line: 167
    },
    {
      original: "代码已复制",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_代码已复制')`,
      line: 276
    },
    {
      original: "图片加载失败: {alt || src}",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_图片加载失败_alt_src')`,
      line: 297
    },
    {
      original: "Markdown加载失败",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_markdown加载失败')`,
      line: 329
    },
    {
      original: "Markdown文档",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_markdown文档')`,
      line: 352
    },
    {
      original: "目录",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_目录')`,
      line: 363
    },
    {
      original: "主题",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_主题')`,
      line: 372
    },
    {
      original: "预览模式",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_预览模式')`,
      line: 382
    },
    {
      original: "源码模式",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_源码模式')`,
      line: 382
    },
    {
      original: "源码模式",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_源码模式')`,
      line: 382
    },
    {
      original: "复制",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_复制')`,
      line: 391
    },
    {
      original: "下载",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_下载')`,
      line: 395
    },
    {
      original: "退出全屏",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_退出全屏')`,
      line: 403
    },
    {
      original: "全屏",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_全屏')`,
      line: 403
    },
    {
      original: "全屏",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_全屏')`,
      line: 403
    },
    {
      original: "刷新",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_刷新')`,
      line: 411
    },
    {
      original: "加载Markdown中...",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_加载markdown中')`,
      line: 431
    },
    {
      original: "目录",
      replacement: `t('common:..\frontend\src\views\files\components\enhancedmarkdownpreview_目录')`,
      line: 459
    },
  ],
  '..\frontEnd\src\views\Books\index.tsx': [
    {
      original: "JavaScript高级程序设计",
      replacement: `t('common:..\frontend\src\views\books\index_javascript高级程序设计')`,
      line: 13
    },
    {
      original: "JavaScript高级程序设计",
      replacement: `t('common:..\frontend\src\views\books\index_javascript高级程序设计')`,
      line: 13
    },
    {
      original: "深入理解JavaScript语言核心特性，掌握现代Web开发技术。",
      replacement: `t('common:..\frontend\src\views\books\index_深入理解javascript语言核心特性_掌握现代web开发技术')`,
      line: 16
    },
    {
      original: "深入理解JavaScript语言核心特性，掌握现代Web开发技术。",
      replacement: `t('common:..\frontend\src\views\books\index_深入理解javascript语言核心特性_掌握现代web开发技术')`,
      line: 16
    },
    {
      original: "前端",
      replacement: `t('common:..\frontend\src\views\books\index_前端')`,
      line: 19
    },
    {
      original: "编程",
      replacement: `t('common:..\frontend\src\views\books\index_编程')`,
      line: 19
    },
    {
      original: "React技术揭秘",
      replacement: `t('common:..\frontend\src\views\books\index_react技术揭秘')`,
      line: 25
    },
    {
      original: "React技术揭秘",
      replacement: `t('common:..\frontend\src\views\books\index_react技术揭秘')`,
      line: 25
    },
    {
      original: "卡颂",
      replacement: `t('common:..\frontend\src\views\books\index_卡颂')`,
      line: 26
    },
    {
      original: "卡颂",
      replacement: `t('common:..\frontend\src\views\books\index_卡颂')`,
      line: 26
    },
    {
      original: "深入React源码，理解React的设计思想和实现原理。",
      replacement: `t('common:..\frontend\src\views\books\index_深入react源码_理解react的设计思想和实现原理')`,
      line: 28
    },
    {
      original: "深入React源码，理解React的设计思想和实现原理。",
      replacement: `t('common:..\frontend\src\views\books\index_深入react源码_理解react的设计思想和实现原理')`,
      line: 28
    },
    {
      original: "前端",
      replacement: `t('common:..\frontend\src\views\books\index_前端')`,
      line: 31
    },
    {
      original: "源码",
      replacement: `t('common:..\frontend\src\views\books\index_源码')`,
      line: 31
    },
    {
      original: "Node.js实战",
      replacement: `t('common:..\frontend\src\views\books\index_node_js实战')`,
      line: 37
    },
    {
      original: "Node.js实战",
      replacement: `t('common:..\frontend\src\views\books\index_node_js实战')`,
      line: 37
    },
    {
      original: "全面掌握Node.js开发技术，构建高性能Web应用。",
      replacement: `t('common:..\frontend\src\views\books\index_全面掌握node_js开发技术_构建高性能web应用')`,
      line: 40
    },
    {
      original: "全面掌握Node.js开发技术，构建高性能Web应用。",
      replacement: `t('common:..\frontend\src\views\books\index_全面掌握node_js开发技术_构建高性能web应用')`,
      line: 40
    },
    {
      original: "后端",
      replacement: `t('common:..\frontend\src\views\books\index_后端')`,
      line: 43
    },
    {
      original: "实战",
      replacement: `t('common:..\frontend\src\views\books\index_实战')`,
      line: 43
    },
    {
      original: "技术书籍推荐",
      replacement: `t('common:..\frontend\src\views\books\index_技术书籍推荐')`,
      line: 91
    },
    {
      original: "精选优质技术书籍，助力技术成长",
      replacement: `t('common:..\frontend\src\views\books\index_精选优质技术书籍_助力技术成长')`,
      line: 92
    },
    {
      original: "搜索书籍或作者",
      replacement: `t('common:..\frontend\src\views\books\index_搜索书籍或作者')`,
      line: 97
    },
    {
      original: "全部分类",
      replacement: `t('common:..\frontend\src\views\books\index_全部分类')`,
      line: 112
    },
    {
      original: "作者：{book.author}",
      replacement: `t('common:..\frontend\src\views\books\index_作者_book_author')`,
      line: 153
    },
    {
      original: "{book.pages}页",
      replacement: `t('common:..\frontend\src\views\books\index_book_pages_页')`,
      line: 157
    },
    {
      original: "{book.publishYear}年",
      replacement: `t('common:..\frontend\src\views\books\index_book_publishyear_年')`,
      line: 158
    },
  ],
  '..\frontEnd\src\utils\routeUtils.ts': [
    {
      original: "开发工具",
      replacement: `t('common:..\frontend\src\utils\routeutils_开发工具')`,
      line: 77
    },
    {
      original: "开发工具",
      replacement: `t('common:..\frontend\src\utils\routeutils_开发工具')`,
      line: 77
    },
    {
      original: "首页",
      replacement: `t('common:..\frontend\src\utils\routeutils_首页')`,
      line: 126
    },
    {
      original: "首页",
      replacement: `t('common:..\frontend\src\utils\routeutils_首页')`,
      line: 126
    },
    {
      original: "技术栈",
      replacement: `t('common:..\frontend\src\utils\routeutils_技术栈')`,
      line: 133
    },
    {
      original: "技术栈",
      replacement: `t('common:..\frontend\src\utils\routeutils_技术栈')`,
      line: 133
    },
    {
      original: "技术栈",
      replacement: `t('common:..\frontend\src\utils\routeutils_技术栈')`,
      line: 174
    },
    {
      original: "技术栈",
      replacement: `t('common:..\frontend\src\utils\routeutils_技术栈')`,
      line: 174
    },
  ],
  '..\frontEnd\src\utils\resumeStorage.ts': [
    {
      original: "断点信息已保存: ${info.fileName} (${fileHash})",
      replacement: `t('common:..\frontend\src\utils\resumestorage_断点信息已保存_info_filename')`,
      line: 83
    },
    {
      original: "断点信息已保存: ${info.fileName} (${fileHash})",
      replacement: `t('common:..\frontend\src\utils\resumestorage_断点信息已保存_info_filename')`,
      line: 83
    },
    {
      original: "保存断点信息失败:",
      replacement: `t('common:..\frontend\src\utils\resumestorage_保存断点信息失败')`,
      line: 85
    },
    {
      original: "获取断点信息失败:",
      replacement: `t('common:..\frontend\src\utils\resumestorage_获取断点信息失败')`,
      line: 112
    },
    {
      original: "断点信息已删除: ${fileHash}",
      replacement: `t('common:..\frontend\src\utils\resumestorage_断点信息已删除_filehash')`,
      line: 129
    },
    {
      original: "断点信息已删除: ${fileHash}",
      replacement: `t('common:..\frontend\src\utils\resumestorage_断点信息已删除_filehash')`,
      line: 129
    },
    {
      original: "删除断点信息失败:",
      replacement: `t('common:..\frontend\src\utils\resumestorage_删除断点信息失败')`,
      line: 132
    },
    {
      original: "获取所有断点信息失败:",
      replacement: `t('common:..\frontend\src\utils\resumestorage_获取所有断点信息失败')`,
      line: 186
    },
    {
      original: "已清理 ${cleanedCount} 个过期的断点信息",
      replacement: `t('common:..\frontend\src\utils\resumestorage_已清理_cleanedcount_个过期的断点信息')`,
      line: 209
    },
    {
      original: "已清理 ${cleanedCount} 个过期的断点信息",
      replacement: `t('common:..\frontend\src\utils\resumestorage_已清理_cleanedcount_个过期的断点信息')`,
      line: 209
    },
    {
      original: "清理过期数据失败:",
      replacement: `t('common:..\frontend\src\utils\resumestorage_清理过期数据失败')`,
      line: 212
    },
    {
      original: "所有断点信息已清空",
      replacement: `t('common:..\frontend\src\utils\resumestorage_所有断点信息已清空')`,
      line: 222
    },
    {
      original: "清空断点数据失败:",
      replacement: `t('common:..\frontend\src\utils\resumestorage_清空断点数据失败')`,
      line: 224
    },
    {
      original: "获取存储大小失败:",
      replacement: `t('common:..\frontend\src\utils\resumestorage_获取存储大小失败')`,
      line: 237
    },
    {
      original: "解析存储数据失败:",
      replacement: `t('common:..\frontend\src\utils\resumestorage_解析存储数据失败')`,
      line: 253
    },
  ],
  '..\frontEnd\src\utils\i18n.ts': [
    {
      original: "中文",
      replacement: `t('common:..\frontend\src\utils\i18n_中文')`,
      line: 125
    },
    {
      original: "中文",
      replacement: `t('common:..\frontend\src\utils\i18n_中文')`,
      line: 125
    },
    {
      original: "中文",
      replacement: `t('common:..\frontend\src\utils\i18n_中文')`,
      line: 136
    },
    {
      original: "中文",
      replacement: `t('common:..\frontend\src\utils\i18n_中文')`,
      line: 136
    },
  ],
  '..\frontEnd\src\utils\filePreview.ts': [
    {
      original: "图片",
      replacement: `t('common:..\frontend\src\utils\filepreview_图片')`,
      line: 240
    },
    {
      original: "图片",
      replacement: `t('common:..\frontend\src\utils\filepreview_图片')`,
      line: 240
    },
    {
      original: "PDF文档",
      replacement: `t('common:..\frontend\src\utils\filepreview_pdf文档')`,
      line: 241
    },
    {
      original: "PDF文档",
      replacement: `t('common:..\frontend\src\utils\filepreview_pdf文档')`,
      line: 241
    },
    {
      original: "视频",
      replacement: `t('common:..\frontend\src\utils\filepreview_视频')`,
      line: 242
    },
    {
      original: "视频",
      replacement: `t('common:..\frontend\src\utils\filepreview_视频')`,
      line: 242
    },
    {
      original: "音频",
      replacement: `t('common:..\frontend\src\utils\filepreview_音频')`,
      line: 243
    },
    {
      original: "音频",
      replacement: `t('common:..\frontend\src\utils\filepreview_音频')`,
      line: 243
    },
    {
      original: "文本",
      replacement: `t('common:..\frontend\src\utils\filepreview_文本')`,
      line: 244
    },
    {
      original: "文本",
      replacement: `t('common:..\frontend\src\utils\filepreview_文本')`,
      line: 244
    },
    {
      original: "代码",
      replacement: `t('common:..\frontend\src\utils\filepreview_代码')`,
      line: 246
    },
    {
      original: "代码",
      replacement: `t('common:..\frontend\src\utils\filepreview_代码')`,
      line: 246
    },
    {
      original: "Office文档",
      replacement: `t('common:..\frontend\src\utils\filepreview_office文档')`,
      line: 247
    },
    {
      original: "Office文档",
      replacement: `t('common:..\frontend\src\utils\filepreview_office文档')`,
      line: 247
    },
    {
      original: "压缩文件",
      replacement: `t('common:..\frontend\src\utils\filepreview_压缩文件')`,
      line: 248
    },
    {
      original: "压缩文件",
      replacement: `t('common:..\frontend\src\utils\filepreview_压缩文件')`,
      line: 248
    },
    {
      original: "未知类型",
      replacement: `t('common:..\frontend\src\utils\filepreview_未知类型')`,
      line: 249
    },
    {
      original: "未知类型",
      replacement: `t('common:..\frontend\src\utils\filepreview_未知类型')`,
      line: 249
    },
    {
      original: "未知类型",
      replacement: `t('common:..\frontend\src\utils\filepreview_未知类型')`,
      line: 252
    },
  ],
  '..\frontEnd\src\utils\upload\hash-worker.js': [
    {
      original: "worker监听发生错误:",
      replacement: `t('common:..\frontend\src\utils\upload\hash-worker_worker监听发生错误')`,
      line: 78
    },
    {
      original: "Worker触发主线程的error事件：",
      replacement: `t('common:..\frontend\src\utils\upload\hash-worker_worker触发主线程的error事件')`,
      line: 86
    },
  ],
  '..\frontEnd\src\utils\message\messageBox.ts': [
    {
      original: "取消",
      replacement: `t('common:..\frontend\src\utils\message\messagebox_取消')`,
      line: 17
    },
    {
      original: "确认",
      replacement: `t('common:..\frontend\src\utils\message\messagebox_确认')`,
      line: 18
    },
    {
      original: "提示",
      replacement: `t('common:..\frontend\src\utils\message\messagebox_提示')`,
      line: 22
    },
    {
      original: "提示",
      replacement: `t('common:..\frontend\src\utils\message\messagebox_提示')`,
      line: 22
    },
  ],
  '..\frontEnd\src\utils\http\index.ts': [
    {
      original: "请求被取消或网络错误:",
      replacement: `t('common:..\frontend\src\utils\http\index_请求被取消或网络错误')`,
      line: 84
    },
    {
      original: "响应数据为空",
      replacement: `t('common:..\frontend\src\utils\http\index_响应数据为空')`,
      line: 93
    },
    {
      original: "登录过期,请重新登录",
      replacement: `t('common:..\frontend\src\utils\http\index_登录过期_请重新登录')`,
      line: 101
    },
    {
      original: "登录过期,请重新登录",
      replacement: `t('common:..\frontend\src\utils\http\index_登录过期_请重新登录')`,
      line: 101
    },
  ],
  '..\frontEnd\src\store\fileStore.ts': [
    {
      original: "获取文件列表失败",
      replacement: `t('common:..\frontend\src\store\filestore_获取文件列表失败')`,
      line: 168
    },
    {
      original: "文件删除成功",
      replacement: `t('common:..\frontend\src\store\filestore_文件删除成功')`,
      line: 196
    },
    {
      original: "文件删除失败",
      replacement: `t('common:..\frontend\src\store\filestore_文件删除失败')`,
      line: 199
    },
    {
      original: "=== 文件状态更新 ===",
      replacement: `t('common:..\frontend\src\store\filestore_文件状态更新')`,
      line: 246
    },
    {
      original: "未找到要更新的文件:",
      replacement: `t('common:..\frontend\src\store\filestore_未找到要更新的文件')`,
      line: 254
    },
  ],
  '..\frontEnd\src\routes\index.tsx': [
    {
      original: "登录/注册页面",
      replacement: `t('common:..\frontend\src\routes\index_登录_注册页面')`,
      line: 59
    },
    {
      original: "登录/注册页面",
      replacement: `t('common:..\frontend\src\routes\index_登录_注册页面')`,
      line: 59
    },
    {
      original: "404错误页面 - 处理所有未匹配的路由",
      replacement: `t('common:..\frontend\src\routes\index_404错误页面_处理所有未匹配的路由')`,
      line: 64
    },
    {
      original: "404错误页面 - 处理所有未匹配的路由",
      replacement: `t('common:..\frontend\src\routes\index_404错误页面_处理所有未匹配的路由')`,
      line: 64
    },
    {
      original: "首页 - 技术博客和文章展示",
      replacement: `t('common:..\frontend\src\routes\index_首页_技术博客和文章展示')`,
      line: 79
    },
    {
      original: "首页 - 技术博客和文章展示",
      replacement: `t('common:..\frontend\src\routes\index_首页_技术博客和文章展示')`,
      line: 79
    },
    {
      original: "书籍推荐 - 技术书籍展示和推荐",
      replacement: `t('common:..\frontend\src\routes\index_书籍推荐_技术书籍展示和推荐')`,
      line: 84
    },
    {
      original: "书籍推荐 - 技术书籍展示和推荐",
      replacement: `t('common:..\frontend\src\routes\index_书籍推荐_技术书籍展示和推荐')`,
      line: 84
    },
    {
      original: "技术栈 - 个人技能、项目经验、学习历程展示",
      replacement: `t('common:..\frontend\src\routes\index_技术栈_个人技能_项目经验')`,
      line: 89
    },
    {
      original: "技术栈 - 个人技能、项目经验、学习历程展示",
      replacement: `t('common:..\frontend\src\routes\index_技术栈_个人技能_项目经验')`,
      line: 89
    },
    {
      original: "技术详解 - 具体技术的深度解析",
      replacement: `t('common:..\frontend\src\routes\index_技术详解_具体技术的深度解析')`,
      line: 94
    },
    {
      original: "技术详解 - 具体技术的深度解析",
      replacement: `t('common:..\frontend\src\routes\index_技术详解_具体技术的深度解析')`,
      line: 94
    },
    {
      original: "技术主题详解 - 具体技术主题的深度解析",
      replacement: `t('common:..\frontend\src\routes\index_技术主题详解_具体技术主题的深度解析')`,
      line: 99
    },
    {
      original: "技术主题详解 - 具体技术主题的深度解析",
      replacement: `t('common:..\frontend\src\routes\index_技术主题详解_具体技术主题的深度解析')`,
      line: 99
    },
    {
      original: "文件管理 - 文件上传、预览、管理功能",
      replacement: `t('common:..\frontend\src\routes\index_文件管理_文件上传_预览')`,
      line: 104
    },
    {
      original: "文件管理 - 文件上传、预览、管理功能",
      replacement: `t('common:..\frontend\src\routes\index_文件管理_文件上传_预览')`,
      line: 104
    },
  ],
  '..\frontEnd\src\i18n\index.ts': [
    {
      original: "中文",
      replacement: `t('common:..\frontend\src\i18n\index_中文')`,
      line: 51
    },
    {
      original: "中文",
      replacement: `t('common:..\frontend\src\i18n\index_中文')`,
      line: 51
    },
  ],
  '..\frontEnd\src\hooks\useUpload.ts': [
    {
      original: "用户主动暂停",
      replacement: `t('common:..\frontend\src\hooks\useupload_用户主动暂停')`,
      line: 207
    },
    {
      original: "用户主动暂停",
      replacement: `t('common:..\frontend\src\hooks\useupload_用户主动暂停')`,
      line: 207
    },
    {
      original: "用户主动暂停",
      replacement: `t('common:..\frontend\src\hooks\useupload_用户主动暂停')`,
      line: 211
    },
    {
      original: "=== 暂停状态保存 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_暂停状态保存')`,
      line: 220
    },
    {
      original: "=== 取消请求 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_取消请求')`,
      line: 237
    },
    {
      original: "=== 取消请求 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_取消请求')`,
      line: 237
    },
    {
      original: "取消分片${itemB.index}的请求",
      replacement: `t('common:..\frontend\src\hooks\useupload_取消分片_itemb_index')`,
      line: 247
    },
    {
      original: "取消分片${itemB.index}的请求",
      replacement: `t('common:..\frontend\src\hooks\useupload_取消分片_itemb_index')`,
      line: 247
    },
    {
      original: "强制取消分片${chunk.index}的请求",
      replacement: `t('common:..\frontend\src\hooks\useupload_强制取消分片_chunk_index')`,
      line: 256
    },
    {
      original: "强制取消分片${chunk.index}的请求",
      replacement: `t('common:..\frontend\src\hooks\useupload_强制取消分片_chunk_index')`,
      line: 256
    },
    {
      original: "重置正在上传分片${chunk.index}的状态",
      replacement: `t('common:..\frontend\src\hooks\useupload_重置正在上传分片_chunk_index')`,
      line: 268
    },
    {
      original: "重置正在上传分片${chunk.index}的状态",
      replacement: `t('common:..\frontend\src\hooks\useupload_重置正在上传分片_chunk_index')`,
      line: 268
    },
    {
      original: "=== 进度计算详情 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_进度计算详情')`,
      line: 304
    },
    {
      original: "文件合并失败: ${fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件合并失败_filename')`,
      line: 387
    },
    {
      original: "文件合并失败: ${fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件合并失败_filename')`,
      line: 387
    },
    {
      original: "文件合并失败！",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件合并失败')`,
      line: 392
    },
    {
      original: "任务状态不是上传中，停止处理: ${taskArrItem.fileName}, 状态: ${taskArrItem.state}",
      replacement: `t('common:..\frontend\src\hooks\useupload_任务状态不是上传中_停止处理_taskarritem')`,
      line: 407
    },
    {
      original: "任务状态不是上传中，停止处理: ${taskArrItem.fileName}, 状态: ${taskArrItem.state}",
      replacement: `t('common:..\frontend\src\hooks\useupload_任务状态不是上传中_停止处理_taskarritem')`,
      line: 407
    },
    {
      original: "任务错误次数过多，暂停上传: ${taskArrItem.fileName}, 错误次数: ${taskArrItem.errNumber}",
      replacement: `t('common:..\frontend\src\hooks\useupload_任务错误次数过多_暂停上传_taskarritem')`,
      line: 415
    },
    {
      original: "任务错误次数过多，暂停上传: ${taskArrItem.fileName}, 错误次数: ${taskArrItem.errNumber}",
      replacement: `t('common:..\frontend\src\hooks\useupload_任务错误次数过多_暂停上传_taskarritem')`,
      line: 415
    },
    {
      original: "=== 选择上传分片 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_选择上传分片')`,
      line: 445
    },
    {
      original: "开始上传${chunksToUpload.length}个分片:",
      replacement: `t('common:..\frontend\src\hooks\useupload_开始上传_chunkstoupload_length')`,
      line: 461
    },
    {
      original: "开始上传${chunksToUpload.length}个分片:",
      replacement: `t('common:..\frontend\src\hooks\useupload_开始上传_chunkstoupload_length')`,
      line: 461
    },
    {
      original: "分片上传前状态检查失败: ${taskArrItem.fileName}, 状态: ${taskArrItem.state}",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片上传前状态检查失败_taskarritem_filename')`,
      line: 497
    },
    {
      original: "分片上传前状态检查失败: ${taskArrItem.fileName}, 状态: ${taskArrItem.state}",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片上传前状态检查失败_taskarritem_filename')`,
      line: 497
    },
    {
      original: "分片上传完成后检测到暂停/中断状态: ${taskArrItem.fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片上传完成后检测到暂停_中断状态_taskarritem')`,
      line: 517
    },
    {
      original: "分片上传完成后检测到暂停/中断状态: ${taskArrItem.fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片上传完成后检测到暂停_中断状态_taskarritem')`,
      line: 517
    },
    {
      original: "分片${chunk.index}上传完成，当前完成数: ${taskArrItem.finishNumber}/${taskArrItem.allChunkList.length}",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 530
    },
    {
      original: "分片${chunk.index}上传完成，当前完成数: ${taskArrItem.finishNumber}/${taskArrItem.allChunkList.length}",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 530
    },
    {
      original: "分片${chunk.index}完成，但任务状态不是上传中(${taskArrItem.state})，停止继续上传",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 549
    },
    {
      original: "分片${chunk.index}完成，但任务状态不是上传中(${taskArrItem.state})，停止继续上传",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 549
    },
    {
      original: "分片${chunk.index}请求被取消",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 556
    },
    {
      original: "分片${chunk.index}请求被取消",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 556
    },
    {
      original: "分片${chunk.index}上传失败，但任务已不是上传状态:",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 563
    },
    {
      original: "分片${chunk.index}上传失败，但任务已不是上传状态:",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 563
    },
    {
      original: "分片${chunk.index}网络错误，${retryDelay}ms后进行第${retryCount + 1}次重试",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 585
    },
    {
      original: "分片${chunk.index}网络错误，${retryDelay}ms后进行第${retryCount + 1}次重试",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 585
    },
    {
      original: "分片${chunk.index}重试失败:",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 596
    },
    {
      original: "分片${chunk.index}重试失败:",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 596
    },
    {
      original: "分片${chunk.index}重试时发现任务已不是上传状态，取消重试",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 599
    },
    {
      original: "分片${chunk.index}重试时发现任务已不是上传状态，取消重试",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 599
    },
    {
      original: "分片${chunk.index}上传失败:",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 607
    },
    {
      original: "分片${chunk.index}上传失败:",
      replacement: `t('common:..\frontend\src\hooks\useupload_分片_chunk_index')`,
      line: 607
    },
    {
      original: "文件${taskArrItem.fileName}上传失败次数过多，暂停上传",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件_taskarritem_filename')`,
      line: 610
    },
    {
      original: "文件${taskArrItem.fileName}上传失败次数过多，暂停上传",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件_taskarritem_filename')`,
      line: 610
    },
    {
      original: "网络连接异常，请检查网络连接后重试",
      replacement: `t('common:..\frontend\src\hooks\useupload_网络连接异常_请检查网络连接后重试')`,
      line: 616
    },
    {
      original: "网络连接异常，请检查网络连接后重试",
      replacement: `t('common:..\frontend\src\hooks\useupload_网络连接异常_请检查网络连接后重试')`,
      line: 616
    },
    {
      original: "上传失败: ${e.message ||",
      replacement: `t('common:..\frontend\src\hooks\useupload_上传失败_e_message')`,
      line: 621
    },
    {
      original: "上传失败: ${e.message || '未知错误'}",
      replacement: `t('common:..\frontend\src\hooks\useupload_上传失败_e_message')`,
      line: 621
    },
    {
      original: "小文件上传",
      replacement: `t('common:..\frontend\src\hooks\useupload_小文件上传')`,
      line: 665
    },
    {
      original: "小文件上传 - 文件名:",
      replacement: `t('common:..\frontend\src\hooks\useupload_小文件上传_文件名')`,
      line: 671
    },
    {
      original: "小文件上传失败",
      replacement: `t('common:..\frontend\src\hooks\useupload_小文件上传失败')`,
      line: 727
    },
    {
      original: "小文件上传失败",
      replacement: `t('common:..\frontend\src\hooks\useupload_小文件上传失败')`,
      line: 727
    },
    {
      original: "文件已存在，实现秒传",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件已存在_实现秒传')`,
      line: 782
    },
    {
      original: "大文件上传失败",
      replacement: `t('common:..\frontend\src\hooks\useupload_大文件上传失败')`,
      line: 826
    },
    {
      original: "大文件上传失败",
      replacement: `t('common:..\frontend\src\hooks\useupload_大文件上传失败')`,
      line: 826
    },
    {
      original: "=== 文件上传策略选择 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件上传策略选择')`,
      line: 877
    },
    {
      original: "小文件直接上传",
      replacement: `t('common:..\frontend\src\hooks\useupload_小文件直接上传')`,
      line: 882
    },
    {
      original: "大文件分片上传",
      replacement: `t('common:..\frontend\src\hooks\useupload_大文件分片上传')`,
      line: 882
    },
    {
      original: "大文件分片上传",
      replacement: `t('common:..\frontend\src\hooks\useupload_大文件分片上传')`,
      line: 882
    },
    {
      original: "上传失败",
      replacement: `t('common:..\frontend\src\hooks\useupload_上传失败')`,
      line: 893
    },
    {
      original: "上传失败",
      replacement: `t('common:..\frontend\src\hooks\useupload_上传失败')`,
      line: 893
    },
    {
      original: "文件 ${file.name} 上传失败:",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件_file_name')`,
      line: 902
    },
    {
      original: "文件 ${file.name} 上传失败:",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件_file_name')`,
      line: 902
    },
    {
      original: "=== pauseFile被调用 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_pausefile被调用')`,
      line: 920
    },
    {
      original: "通过fileName查找任务:",
      replacement: `t('common:..\frontend\src\hooks\useupload_通过filename查找任务')`,
      line: 936
    },
    {
      original: "找到",
      replacement: `t('common:..\frontend\src\hooks\useupload_找到')`,
      line: 936
    },
    {
      original: "未找到",
      replacement: `t('common:..\frontend\src\hooks\useupload_未找到')`,
      line: 936
    },
    {
      original: "未找到",
      replacement: `t('common:..\frontend\src\hooks\useupload_未找到')`,
      line: 936
    },
    {
      original: "找到上传中的任务，开始暂停:",
      replacement: `t('common:..\frontend\src\hooks\useupload_找到上传中的任务_开始暂停')`,
      line: 940
    },
    {
      original: "暂停后任务状态:",
      replacement: `t('common:..\frontend\src\hooks\useupload_暂停后任务状态')`,
      line: 948
    },
    {
      original: "用户主动暂停",
      replacement: `t('common:..\frontend\src\hooks\useupload_用户主动暂停')`,
      line: 969
    },
    {
      original: "用户主动暂停",
      replacement: `t('common:..\frontend\src\hooks\useupload_用户主动暂停')`,
      line: 969
    },
    {
      original: "文件已暂停: ${task.fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件已暂停_task_filename')`,
      line: 973
    },
    {
      original: "文件已暂停: ${task.fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件已暂停_task_filename')`,
      line: 973
    },
    {
      original: "未找到可暂停的任务:",
      replacement: `t('common:..\frontend\src\hooks\useupload_未找到可暂停的任务')`,
      line: 975
    },
    {
      original: "=== 开始继续上传 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_开始继续上传')`,
      line: 1001
    },
    {
      original: "修复分片${chunk.index}状态: loaded=${chunk.loaded || 0} -> 0",
      replacement: `t('common:..\frontend\src\hooks\useupload_修复分片_chunk_index')`,
      line: 1028
    },
    {
      original: "修复分片${chunk.index}状态: loaded=${chunk.loaded || 0} -> 0",
      replacement: `t('common:..\frontend\src\hooks\useupload_修复分片_chunk_index')`,
      line: 1028
    },
    {
      original: "=== 继续上传分片状态 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_继续上传分片状态')`,
      line: 1034
    },
    {
      original: "文件继续上传: ${task.fileName}, 剩余分片: ${unfinishedChunks.length}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件继续上传_task_filename')`,
      line: 1059
    },
    {
      original: "文件继续上传: ${task.fileName}, 剩余分片: ${unfinishedChunks.length}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件继续上传_task_filename')`,
      line: 1059
    },
    {
      original: "所有分片已完成，开始合并文件:",
      replacement: `t('common:..\frontend\src\hooks\useupload_所有分片已完成_开始合并文件')`,
      line: 1063
    },
    {
      original: "文件重试上传: ${task.fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件重试上传_task_filename')`,
      line: 1095
    },
    {
      original: "文件重试上传: ${task.fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件重试上传_task_filename')`,
      line: 1095
    },
    {
      original: "=== 取消文件上传 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_取消文件上传')`,
      line: 1116
    },
    {
      original: "=== 取消文件上传 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_取消文件上传')`,
      line: 1116
    },
    {
      original: "文件已取消: ${task.fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件已取消_task_filename')`,
      line: 1146
    },
    {
      original: "文件已取消: ${task.fileName}",
      replacement: `t('common:..\frontend\src\hooks\useupload_文件已取消_task_filename')`,
      line: 1146
    },
    {
      original: "=== pauseAll被调用 ===",
      replacement: `t('common:..\frontend\src\hooks\useupload_pauseall被调用')`,
      line: 1156
    },
    {
      original: "暂停任务: ${task.fileName}, 使用标识符: ${identifier}",
      replacement: `t('common:..\frontend\src\hooks\useupload_暂停任务_task_filename')`,
      line: 1168
    },
    {
      original: "暂停任务: ${task.fileName}, 使用标识符: ${identifier}",
      replacement: `t('common:..\frontend\src\hooks\useupload_暂停任务_task_filename')`,
      line: 1168
    },
  ],
  '..\frontEnd\src\hooks\useFilePreview.ts': [
    {
      original: "文件过大，无法预览",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_文件过大_无法预览')`,
      line: 129
    },
    {
      original: "不支持的文件类型",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_不支持的文件类型')`,
      line: 247
    },
    {
      original: "不支持的文件类型",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_不支持的文件类型')`,
      line: 247
    },
    {
      original: "文件过大（限制${formatFileSize(sizeLimit)}）",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_文件过大_限制_formatfilesize')`,
      line: 257
    },
    {
      original: "文件过大（限制${formatFileSize(sizeLimit)}）",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_文件过大_限制_formatfilesize')`,
      line: 257
    },
    {
      original: "文件过大（限制${formatFileSize(sizeLimit)}）",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_文件过大_限制_formatfilesize')`,
      line: 257
    },
    {
      original: "加载中...",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_加载中')`,
      line: 301
    },
    {
      original: "可以预览",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_可以预览')`,
      line: 305
    },
    {
      original: "无法预览",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_无法预览')`,
      line: 306
    },
    {
      original: "无法预览",
      replacement: `t('common:..\frontend\src\hooks\usefilepreview_无法预览')`,
      line: 306
    },
  ],
  '..\frontEnd\src\hooks\useCodeData.ts': [
    {
      original: "加载代码数据失败",
      replacement: `t('common:..\frontend\src\hooks\usecodedata_加载代码数据失败')`,
      line: 23
    },
    {
      original: "加载代码数据失败",
      replacement: `t('common:..\frontend\src\hooks\usecodedata_加载代码数据失败')`,
      line: 23
    },
    {
      original: "加载代码块失败",
      replacement: `t('common:..\frontend\src\hooks\usecodedata_加载代码块失败')`,
      line: 57
    },
    {
      original: "加载代码块失败",
      replacement: `t('common:..\frontend\src\hooks\usecodedata_加载代码块失败')`,
      line: 57
    },
  ],
  '..\frontEnd\src\config\upload.ts': [
    {
      original: "文件大小不能超过${UPLOAD_CONFIG.FILE_SIZE.MAX_SIZE_TEXT}",
      replacement: `t('common:..\frontend\src\config\upload_文件大小不能超过_upload_config')`,
      line: 197
    },
    {
      original: "文件大小不能超过${UPLOAD_CONFIG.FILE_SIZE.MAX_SIZE_TEXT}",
      replacement: `t('common:..\frontend\src\config\upload_文件大小不能超过_upload_config')`,
      line: 197
    },
    {
      original: "不支持的文件类型",
      replacement: `t('common:..\frontend\src\config\upload_不支持的文件类型')`,
      line: 205
    },
  ],
  '..\frontEnd\src\config\technologyRoutes.ts': [
    {
      original: "React生态系统与最佳实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_react生态系统与最佳实践')`,
      line: 210
    },
    {
      original: "React生态系统与最佳实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_react生态系统与最佳实践')`,
      line: 210
    },
    {
      original: "Vue.js框架深度解析",
      replacement: `t('common:..\frontend\src\config\technologyroutes_vue_js框架深度解析')`,
      line: 226
    },
    {
      original: "Vue.js框架深度解析",
      replacement: `t('common:..\frontend\src\config\technologyroutes_vue_js框架深度解析')`,
      line: 226
    },
    {
      original: "TypeScript类型系统与进阶",
      replacement: `t('common:..\frontend\src\config\technologyroutes_typescript类型系统与进阶')`,
      line: 242
    },
    {
      original: "TypeScript类型系统与进阶",
      replacement: `t('common:..\frontend\src\config\technologyroutes_typescript类型系统与进阶')`,
      line: 242
    },
    {
      original: "Node.js后端开发技术",
      replacement: `t('common:..\frontend\src\config\technologyroutes_node_js后端开发技术')`,
      line: 258
    },
    {
      original: "Node.js后端开发技术",
      replacement: `t('common:..\frontend\src\config\technologyroutes_node_js后端开发技术')`,
      line: 258
    },
    {
      original: "Docker容器化技术",
      replacement: `t('common:..\frontend\src\config\technologyroutes_docker容器化技术')`,
      line: 273
    },
    {
      original: "Docker容器化技术",
      replacement: `t('common:..\frontend\src\config\technologyroutes_docker容器化技术')`,
      line: 273
    },
    {
      original: "开发工具",
      replacement: `t('common:..\frontend\src\config\technologyroutes_开发工具')`,
      line: 287
    },
    {
      original: "开发工具",
      replacement: `t('common:..\frontend\src\config\technologyroutes_开发工具')`,
      line: 287
    },
    {
      original: "开发工具与效率提升",
      replacement: `t('common:..\frontend\src\config\technologyroutes_开发工具与效率提升')`,
      line: 289
    },
    {
      original: "开发工具与效率提升",
      replacement: `t('common:..\frontend\src\config\technologyroutes_开发工具与效率提升')`,
      line: 289
    },
    {
      original: "版本控制与团队协作",
      replacement: `t('common:..\frontend\src\config\technologyroutes_版本控制与团队协作')`,
      line: 305
    },
    {
      original: "版本控制与团队协作",
      replacement: `t('common:..\frontend\src\config\technologyroutes_版本控制与团队协作')`,
      line: 305
    },
    {
      original: "Jest测试框架与最佳实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_jest测试框架与最佳实践')`,
      line: 321
    },
    {
      original: "Jest测试框架与最佳实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_jest测试框架与最佳实践')`,
      line: 321
    },
    {
      original: "自定义 Hook",
      replacement: `t('common:..\frontend\src\config\technologyroutes_自定义_hook')`,
      line: 362
    },
    {
      original: "自定义 Hook",
      replacement: `t('common:..\frontend\src\config\technologyroutes_自定义_hook')`,
      line: 362
    },
    {
      original: "React 性能优化",
      replacement: `t('common:..\frontend\src\config\technologyroutes_react_性能优化')`,
      line: 367
    },
    {
      original: "React 性能优化",
      replacement: `t('common:..\frontend\src\config\technologyroutes_react_性能优化')`,
      line: 367
    },
    {
      original: "错误边界",
      replacement: `t('common:..\frontend\src\config\technologyroutes_错误边界')`,
      line: 372
    },
    {
      original: "错误边界",
      replacement: `t('common:..\frontend\src\config\technologyroutes_错误边界')`,
      line: 372
    },
    {
      original: "React 测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_react_测试')`,
      line: 377
    },
    {
      original: "React 测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_react_测试')`,
      line: 377
    },
    {
      original: "响应式原理",
      replacement: `t('common:..\frontend\src\config\technologyroutes_响应式原理')`,
      line: 392
    },
    {
      original: "响应式原理",
      replacement: `t('common:..\frontend\src\config\technologyroutes_响应式原理')`,
      line: 392
    },
    {
      original: "Vue 性能优化",
      replacement: `t('common:..\frontend\src\config\technologyroutes_vue_性能优化')`,
      line: 407
    },
    {
      original: "Vue 性能优化",
      replacement: `t('common:..\frontend\src\config\technologyroutes_vue_性能优化')`,
      line: 407
    },
    {
      original: "Vue 测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_vue_测试')`,
      line: 412
    },
    {
      original: "Vue 测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_vue_测试')`,
      line: 412
    },
    {
      original: "服务端渲染",
      replacement: `t('common:..\frontend\src\config\technologyroutes_服务端渲染')`,
      line: 417
    },
    {
      original: "服务端渲染",
      replacement: `t('common:..\frontend\src\config\technologyroutes_服务端渲染')`,
      line: 417
    },
    {
      original: "版本迁移指南",
      replacement: `t('common:..\frontend\src\config\technologyroutes_版本迁移指南')`,
      line: 422
    },
    {
      original: "版本迁移指南",
      replacement: `t('common:..\frontend\src\config\technologyroutes_版本迁移指南')`,
      line: 422
    },
    {
      original: "基础类型",
      replacement: `t('common:..\frontend\src\config\technologyroutes_基础类型')`,
      line: 432
    },
    {
      original: "基础类型",
      replacement: `t('common:..\frontend\src\config\technologyroutes_基础类型')`,
      line: 432
    },
    {
      original: "高级类型",
      replacement: `t('common:..\frontend\src\config\technologyroutes_高级类型')`,
      line: 437
    },
    {
      original: "高级类型",
      replacement: `t('common:..\frontend\src\config\technologyroutes_高级类型')`,
      line: 437
    },
    {
      original: "泛型",
      replacement: `t('common:..\frontend\src\config\technologyroutes_泛型')`,
      line: 442
    },
    {
      original: "泛型",
      replacement: `t('common:..\frontend\src\config\technologyroutes_泛型')`,
      line: 442
    },
    {
      original: "装饰器",
      replacement: `t('common:..\frontend\src\config\technologyroutes_装饰器')`,
      line: 447
    },
    {
      original: "装饰器",
      replacement: `t('common:..\frontend\src\config\technologyroutes_装饰器')`,
      line: 447
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\config\technologyroutes_模块系统')`,
      line: 452
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\config\technologyroutes_模块系统')`,
      line: 452
    },
    {
      original: "实用类型",
      replacement: `t('common:..\frontend\src\config\technologyroutes_实用类型')`,
      line: 457
    },
    {
      original: "实用类型",
      replacement: `t('common:..\frontend\src\config\technologyroutes_实用类型')`,
      line: 457
    },
    {
      original: "配置指南",
      replacement: `t('common:..\frontend\src\config\technologyroutes_配置指南')`,
      line: 467
    },
    {
      original: "配置指南",
      replacement: `t('common:..\frontend\src\config\technologyroutes_配置指南')`,
      line: 467
    },
    {
      original: "事件循环",
      replacement: `t('common:..\frontend\src\config\technologyroutes_事件循环')`,
      line: 477
    },
    {
      original: "事件循环",
      replacement: `t('common:..\frontend\src\config\technologyroutes_事件循环')`,
      line: 477
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\config\technologyroutes_模块系统')`,
      line: 482
    },
    {
      original: "模块系统",
      replacement: `t('common:..\frontend\src\config\technologyroutes_模块系统')`,
      line: 482
    },
    {
      original: "Express 框架",
      replacement: `t('common:..\frontend\src\config\technologyroutes_express_框架')`,
      line: 487
    },
    {
      original: "Express 框架",
      replacement: `t('common:..\frontend\src\config\technologyroutes_express_框架')`,
      line: 487
    },
    {
      original: "数据库集成",
      replacement: `t('common:..\frontend\src\config\technologyroutes_数据库集成')`,
      line: 492
    },
    {
      original: "数据库集成",
      replacement: `t('common:..\frontend\src\config\technologyroutes_数据库集成')`,
      line: 492
    },
    {
      original: "身份验证",
      replacement: `t('common:..\frontend\src\config\technologyroutes_身份验证')`,
      line: 497
    },
    {
      original: "身份验证",
      replacement: `t('common:..\frontend\src\config\technologyroutes_身份验证')`,
      line: 497
    },
    {
      original: "Node.js 测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_node_js_测试')`,
      line: 502
    },
    {
      original: "Node.js 测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_node_js_测试')`,
      line: 502
    },
    {
      original: "微服务架构",
      replacement: `t('common:..\frontend\src\config\technologyroutes_微服务架构')`,
      line: 507
    },
    {
      original: "微服务架构",
      replacement: `t('common:..\frontend\src\config\technologyroutes_微服务架构')`,
      line: 507
    },
    {
      original: "Docker 基础",
      replacement: `t('common:..\frontend\src\config\technologyroutes_docker_基础')`,
      line: 517
    },
    {
      original: "Docker 基础",
      replacement: `t('common:..\frontend\src\config\technologyroutes_docker_基础')`,
      line: 517
    },
    {
      original: "网络配置",
      replacement: `t('common:..\frontend\src\config\technologyroutes_网络配置')`,
      line: 532
    },
    {
      original: "网络配置",
      replacement: `t('common:..\frontend\src\config\technologyroutes_网络配置')`,
      line: 532
    },
    {
      original: "数据管理",
      replacement: `t('common:..\frontend\src\config\technologyroutes_数据管理')`,
      line: 537
    },
    {
      original: "数据管理",
      replacement: `t('common:..\frontend\src\config\technologyroutes_数据管理')`,
      line: 537
    },
    {
      original: "安全实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_安全实践')`,
      line: 542
    },
    {
      original: "安全实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_安全实践')`,
      line: 542
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\config\technologyroutes_性能优化')`,
      line: 547
    },
    {
      original: "性能优化",
      replacement: `t('common:..\frontend\src\config\technologyroutes_性能优化')`,
      line: 547
    },
    {
      original: "Git 基础",
      replacement: `t('common:..\frontend\src\config\technologyroutes_git_基础')`,
      line: 562
    },
    {
      original: "Git 基础",
      replacement: `t('common:..\frontend\src\config\technologyroutes_git_基础')`,
      line: 562
    },
    {
      original: "分支管理",
      replacement: `t('common:..\frontend\src\config\technologyroutes_分支管理')`,
      line: 567
    },
    {
      original: "分支管理",
      replacement: `t('common:..\frontend\src\config\technologyroutes_分支管理')`,
      line: 567
    },
    {
      original: "GitHub 工作流",
      replacement: `t('common:..\frontend\src\config\technologyroutes_github_工作流')`,
      line: 572
    },
    {
      original: "GitHub 工作流",
      replacement: `t('common:..\frontend\src\config\technologyroutes_github_工作流')`,
      line: 572
    },
    {
      original: "Git 高级技巧",
      replacement: `t('common:..\frontend\src\config\technologyroutes_git_高级技巧')`,
      line: 582
    },
    {
      original: "Git 高级技巧",
      replacement: `t('common:..\frontend\src\config\technologyroutes_git_高级技巧')`,
      line: 582
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\config\technologyroutes_团队协作')`,
      line: 592
    },
    {
      original: "团队协作",
      replacement: `t('common:..\frontend\src\config\technologyroutes_团队协作')`,
      line: 592
    },
    {
      original: "安全最佳实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_安全最佳实践')`,
      line: 597
    },
    {
      original: "安全最佳实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_安全最佳实践')`,
      line: 597
    },
    {
      original: "终端工具",
      replacement: `t('common:..\frontend\src\config\technologyroutes_终端工具')`,
      line: 637
    },
    {
      original: "终端工具",
      replacement: `t('common:..\frontend\src\config\technologyroutes_终端工具')`,
      line: 637
    },
    {
      original: "效率工具",
      replacement: `t('common:..\frontend\src\config\technologyroutes_效率工具')`,
      line: 642
    },
    {
      original: "效率工具",
      replacement: `t('common:..\frontend\src\config\technologyroutes_效率工具')`,
      line: 642
    },
    {
      original: "Jest 基础",
      replacement: `t('common:..\frontend\src\config\technologyroutes_jest_基础')`,
      line: 652
    },
    {
      original: "Jest 基础",
      replacement: `t('common:..\frontend\src\config\technologyroutes_jest_基础')`,
      line: 652
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_单元测试')`,
      line: 657
    },
    {
      original: "单元测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_单元测试')`,
      line: 657
    },
    {
      original: "Mock 与 Spy",
      replacement: `t('common:..\frontend\src\config\technologyroutes_mock_与_spy')`,
      line: 662
    },
    {
      original: "Mock 与 Spy",
      replacement: `t('common:..\frontend\src\config\technologyroutes_mock_与_spy')`,
      line: 662
    },
    {
      original: "异步测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_异步测试')`,
      line: 667
    },
    {
      original: "异步测试",
      replacement: `t('common:..\frontend\src\config\technologyroutes_异步测试')`,
      line: 667
    },
    {
      original: "测试覆盖率",
      replacement: `t('common:..\frontend\src\config\technologyroutes_测试覆盖率')`,
      line: 672
    },
    {
      original: "测试覆盖率",
      replacement: `t('common:..\frontend\src\config\technologyroutes_测试覆盖率')`,
      line: 672
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_最佳实践')`,
      line: 677
    },
    {
      original: "最佳实践",
      replacement: `t('common:..\frontend\src\config\technologyroutes_最佳实践')`,
      line: 677
    },
  ],
  '..\frontEnd\src\components\LanguageSwitcher.tsx': [
    {
      original: "语言切换失败:",
      replacement: `t('common:..\frontend\src\components\languageswitcher_语言切换失败')`,
      line: 60
    },
  ],
  '..\frontEnd\src\components\KTable.tsx': [
    {
      original: "共 ${total} 条",
      replacement: `t('common:..\frontend\src\components\ktable_共_total_条')`,
      line: 184
    },
    {
      original: "共 ${total} 条",
      replacement: `t('common:..\frontend\src\components\ktable_共_total_条')`,
      line: 184
    },
  ],
  '..\frontEnd\src\components\Files\Toolbar.tsx': [
    {
      original: "下载",
      replacement: `t('common:..\frontend\src\components\files\toolbar_下载')`,
      line: 58
    },
    {
      original: "下载",
      replacement: `t('common:..\frontend\src\components\files\toolbar_下载')`,
      line: 58
    },
  ],
  '..\frontEnd\src\components\Files\FileUpload.tsx': [
    {
      original: "上传成功",
      replacement: `t('common:..\frontend\src\components\files\fileupload_上传成功')`,
      line: 77
    },
    {
      original: "上传失败",
      replacement: `t('common:..\frontend\src\components\files\fileupload_上传失败')`,
      line: 80
    },
    {
      original: "上传中",
      replacement: `t('common:..\frontend\src\components\files\fileupload_上传中')`,
      line: 82
    },
    {
      original: "已暂停",
      replacement: `t('common:..\frontend\src\components\files\fileupload_已暂停')`,
      line: 84
    },
    {
      original: "已取消",
      replacement: `t('common:..\frontend\src\components\files\fileupload_已取消')`,
      line: 86
    },
    {
      original: "等待上传",
      replacement: `t('common:..\frontend\src\components\files\fileupload_等待上传')`,
      line: 88
    },
    {
      original: "等待上传",
      replacement: `t('common:..\frontend\src\components\files\fileupload_等待上传')`,
      line: 90
    },
    {
      original: "文件对象无效",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件对象无效')`,
      line: 108
    },
    {
      original: "文件 ${file.name} ${UploadUtils.getFileSizeErrorMessage()}",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件_file_name')`,
      line: 114
    },
    {
      original: "文件 ${file.name} ${UploadUtils.getFileSizeErrorMessage()}",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件_file_name')`,
      line: 114
    },
    {
      original: "文件 ${file.name} 为空文件",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件_file_name')`,
      line: 120
    },
    {
      original: "文件 ${file.name} 为空文件",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件_file_name')`,
      line: 120
    },
    {
      original: "文件 ${file.name} 已存在",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件_file_name')`,
      line: 130
    },
    {
      original: "文件 ${file.name} 已存在",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件_file_name')`,
      line: 130
    },
    {
      original: "请选择文件",
      replacement: `t('common:..\frontend\src\components\files\fileupload_请选择文件')`,
      line: 243
    },
    {
      original: "没有需要上传的文件",
      replacement: `t('common:..\frontend\src\components\files\fileupload_没有需要上传的文件')`,
      line: 253
    },
    {
      original: "上传失败，请重试",
      replacement: `t('common:..\frontend\src\components\files\fileupload_上传失败_请重试')`,
      line: 261
    },
    {
      original: "文件名称",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件名称')`,
      line: 274
    },
    {
      original: "文件名称",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件名称')`,
      line: 274
    },
    {
      original: "文件大小",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件大小')`,
      line: 281
    },
    {
      original: "文件大小",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件大小')`,
      line: 281
    },
    {
      original: "文件类型",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件类型')`,
      line: 292
    },
    {
      original: "文件类型",
      replacement: `t('common:..\frontend\src\components\files\fileupload_文件类型')`,
      line: 292
    },
    {
      original: "状态",
      replacement: `t('common:..\frontend\src\components\files\fileupload_状态')`,
      line: 299
    },
    {
      original: "状态",
      replacement: `t('common:..\frontend\src\components\files\fileupload_状态')`,
      line: 299
    },
    {
      original: "拖拽/点击上传区域",
      replacement: `t('common:..\frontend\src\components\files\fileupload_拖拽_点击上传区域')`,
      line: 393
    },
    {
      original: "支持单个或批量上传，文件大小限制500MB",
      replacement: `t('common:..\frontend\src\components\files\fileupload_支持单个或批量上传_文件大小限制500mb')`,
      line: 402
    },
    {
      original: "待上传文件列表",
      replacement: `t('common:..\frontend\src\components\files\fileupload_待上传文件列表')`,
      line: 410
    },
    {
      original: "共 {fileList.length} 个文件",
      replacement: `t('common:..\frontend\src\components\files\fileupload_共_filelist_length')`,
      line: 412
    },
    {
      original: "上传中...",
      replacement: `t('common:..\frontend\src\components\files\fileupload_上传中')`,
      line: 486
    },
    {
      original: "开始上传",
      replacement: `t('common:..\frontend\src\components\files\fileupload_开始上传')`,
      line: 486
    },
    {
      original: "开始上传",
      replacement: `t('common:..\frontend\src\components\files\fileupload_开始上传')`,
      line: 486
    },
  ],
  '..\frontEnd\src\components\Files\FileSearch.tsx': [
    {
      original: "文件名称",
      replacement: `t('common:..\frontend\src\components\files\filesearch_文件名称')`,
      line: 135
    },
    {
      original: "请输入文件名称",
      replacement: `t('common:..\frontend\src\components\files\filesearch_请输入文件名称')`,
      line: 137
    },
    {
      original: "上传者",
      replacement: `t('common:..\frontend\src\components\files\filesearch_上传者')`,
      line: 145
    },
    {
      original: "请输入上传者名称",
      replacement: `t('common:..\frontend\src\components\files\filesearch_请输入上传者名称')`,
      line: 147
    },
  ],
  '..\frontEnd\src\components\Files\FileList.tsx': [
    {
      original: "文件名称",
      replacement: `t('common:..\frontend\src\components\files\filelist_文件名称')`,
      line: 48
    },
    {
      original: "文件名称",
      replacement: `t('common:..\frontend\src\components\files\filelist_文件名称')`,
      line: 48
    },
    {
      original: "文件大小",
      replacement: `t('common:..\frontend\src\components\files\filelist_文件大小')`,
      line: 55
    },
    {
      original: "文件大小",
      replacement: `t('common:..\frontend\src\components\files\filelist_文件大小')`,
      line: 55
    },
    {
      original: "文件类型",
      replacement: `t('common:..\frontend\src\components\files\filelist_文件类型')`,
      line: 62
    },
    {
      original: "文件类型",
      replacement: `t('common:..\frontend\src\components\files\filelist_文件类型')`,
      line: 62
    },
    {
      original: "上传时间",
      replacement: `t('common:..\frontend\src\components\files\filelist_上传时间')`,
      line: 69
    },
    {
      original: "上传时间",
      replacement: `t('common:..\frontend\src\components\files\filelist_上传时间')`,
      line: 69
    },
    {
      original: "上传者",
      replacement: `t('common:..\frontend\src\components\files\filelist_上传者')`,
      line: 76
    },
    {
      original: "上传者",
      replacement: `t('common:..\frontend\src\components\files\filelist_上传者')`,
      line: 76
    },
    {
      original: "操作",
      replacement: `t('common:..\frontend\src\components\files\filelist_操作')`,
      line: 83
    },
    {
      original: "操作",
      replacement: `t('common:..\frontend\src\components\files\filelist_操作')`,
      line: 83
    },
    {
      original: "预览文件",
      replacement: `t('common:..\frontend\src\components\files\filelist_预览文件')`,
      line: 88
    },
    {
      original: "删除文件",
      replacement: `t('common:..\frontend\src\components\files\filelist_删除文件')`,
      line: 100
    },
  ],
  '..\frontEnd\src\components\Files\ErrorBoundary.tsx': [
    {
      original: "文件管理模块出现错误",
      replacement: `t('common:..\frontend\src\components\files\errorboundary_文件管理模块出现错误')`,
      line: 106
    },
    {
      original: "抱歉，文件管理功能遇到了一些问题。请尝试刷新页面或联系管理员。",
      replacement: `t('common:..\frontend\src\components\files\errorboundary_抱歉_文件管理功能遇到了一些问题_请尝试刷新页面或联系管理员')`,
      line: 107
    },
    {
      original: "错误详情",
      replacement: `t('common:..\frontend\src\components\files\errorboundary_错误详情')`,
      line: 121
    },
    {
      original: "错误信息:",
      replacement: `t('common:..\frontend\src\components\files\errorboundary_错误信息')`,
      line: 124
    },
    {
      original: "组件堆栈:",
      replacement: `t('common:..\frontend\src\components\files\errorboundary_组件堆栈')`,
      line: 131
    },
  ],
};

// 执行替换逻辑
console.log('🔄 开始批量替换...');
// TODO: 实现具体的替换逻辑
console.log('✅ 替换完成！');
