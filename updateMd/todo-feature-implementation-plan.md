# 待办事项功能实现计划

本文档旨在规划和记录向 `keru_blog` 项目中添加“待办事项”功能的完整步骤。

## 1. 前端重构与组件化

### 1.1. `Home` 页面结构调整

- 创建新目录 `frontEnd/src/views/Home`。
- 将现有 `frontEnd/src/views/index.tsx` 的内容迁移至 `frontEnd/src/views/Home/index.tsx`，并更新路由。
- `Home` 页面将作为容器，整合以下将要拆分的组件。

### 1.2. 页面组件拆分

- **Header 组件 (`frontEnd/src/views/Home/components/Header.tsx`):**
  - 负责显示页面标题、欢迎信息等头部内容。
- **Todo 组件 (`frontEnd/src/views/Home/components/TodoList.tsx`):**
  - 待办事项的核心功能模块。
  - 获取并展示当前用户的待办列表。
  - 提供添加、标记完成、删除待办事项的交互功能。
  - 处理待办列表为空时的缺省状态（如提示或引导）。
- **内容组件 (`frontEnd/src/views/Home/components/Content.tsx`):**
  - 用于展示原有的瀑布流等内容。

### 1.3. 样式
- 新建或更新 `frontEnd/src/styles/home.module.scss` 文件。
- 确保新组件的样式与项目整体深色系、简约的风格保持一致。

## 2. 后端实现

### 2.1. 数据库模型扩展

- 在 `server/prisma/schema.prisma` 文件中，新增 `Todo` 模型。
- `Todo` 模型将包含以下字段：
  - `id`: 唯一标识符。
  - `content`: 待办事项的内容 (String)。
  - `completed`: 完成状态 (Boolean)。
  - `createdAt`, `updatedAt`: 时间戳。
  - `userId`: 与 `User` 模型关联的外键，确保每个待办事项都属于特定用户。

### 2.2. API 路由和逻辑

- 创建新的后端模块 `server/src/router/todo`。
- **Controller (`controller.ts`):** 定义处理 HTTP 请求的控制器，负责路由分发。
- **Service (`service.ts`):** 实现核心业务逻辑，如：
  - `getTodos(userId)`: 获取指定用户的所有待办事项。
  - `createTodo(userId, content)`: 为指定用户创建新的待办事项。
  - `updateTodo(todoId, completed)`: 更新待办事项的状态。
  - `deleteTodo(todoId)`: 删除待办事项。
- **DTO (`dto.ts`):** 定义用于数据传输和验证的对象。
- 在主路由文件 (`server/src/router/index.ts`) 中注册 `Todo` 路由。

## 3. API 对接与状态管理

- **前端 API (`frontEnd/src/api/todoApi.ts`):** 创建用于调用后端 Todo 相关接口的 API 服务。
- **状态管理 (Zustand):** 在前端状态管理中加入 `todos` 相关的 state 和 actions，实现前端数据与后端服务的同步。

通过以上步骤，我们将完成一个与用户关联、功能完整且风格统一的待办事项功能。
