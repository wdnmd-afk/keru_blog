# 博客管理系统

## 项目简介

这是一个用于配置和管理前端(frontend)和服务端(server)的各种内容和配置的管理系统。

## 技术栈

- React 18
- TypeScript
- Vite
- UnoCSS
- Ant Design

## 特性

- 🔄 **跨项目组件共享** - 支持与 frontEnd 项目双向组件引用
- 🎨 **现代化 UI** - 基于 Ant Design 的管理界面
- ⚡ **快速开发** - Vite 构建工具，热更新支持
- 🎯 **类型安全** - 完整的 TypeScript 支持
- 🎪 **样式框架** - UnoCSS 原子化 CSS

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:9395 查看管理系统

### 构建生产版本

```bash
npm run build:pro
```

## 项目结构

```
management/
├── src/
│   ├── components/          # 组件目录
│   │   ├── ManagementCard.tsx
│   │   └── index.ts
│   ├── types/              # 类型定义
│   │   └── index.ts
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 入口文件
│   ├── index.css           # 全局样式
│   └── vite-env.d.ts       # Vite 类型定义
├── index.html              # HTML 入口
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── uno.config.ts           # UnoCSS 配置
```

## 跨项目组件引用

### 引用 frontEnd 项目组件

```typescript
// 引用组件
import SvgIcon from "@frontend-components/SvgIcon";
import LanguageSwitcher from "@frontend-components/LanguageSwitcher";

// 引用工具函数
import { formatDate } from "@frontend-utils";

// 引用类型定义
import type { UserInfo } from "@frontend-types";

// 引用 Hooks
import { useStores } from "@frontend-hooks/useStores";
```

### 供 frontEnd 项目引用

```typescript
// 在 frontEnd 项目中引用 management 组件
import { ManagementCard } from "@management-components";
import type { SystemConfig } from "@management-types";
```

## 可用的别名

- `@` - 当前项目 src 目录
- `@frontend` - frontEnd 项目 src 目录
- `@frontend-components` - frontEnd 项目组件
- `@frontend-utils` - frontEnd 项目工具函数
- `@frontend-types` - frontEnd 项目类型定义
- `@frontend-hooks` - frontEnd 项目 Hooks
- `@frontend-stores` - frontEnd 项目状态管理
- `@frontend-api` - frontEnd 项目 API

## 开发指南

### 添加新组件

1. 在 `src/components/` 目录下创建组件文件
2. 在 `src/components/index.ts` 中导出组件
3. 更新类型定义（如需要）

### 样式开发

- 使用 UnoCSS 原子化 CSS 类
- 管理系统特有样式类以 `management-` 前缀命名
- 全局样式定义在 `src/index.css` 中

### 类型定义

- 项目类型定义在 `src/types/index.ts` 中
- 支持引用 frontEnd 项目的类型定义

## 注意事项

- 开发端口为 9395，避免与其他项目冲突
- 跨项目引用时注意路径映射配置
- 保持与 frontEnd 项目的兼容性
