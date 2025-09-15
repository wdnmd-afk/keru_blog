# Views 文件结构说明

## 📁 文件夹结构

```
src/views/
├── systemPages/           # 系统页面
│   ├── Home.tsx          # 首页
│   ├── Login.tsx         # 登录页
│   ├── Layout.tsx        # 布局组件
│   └── NotFound.tsx      # 404页面
│
├── Files/                # 文件管理模块
│   ├── index.tsx         # 文件管理主页面
│   ├── Upload.tsx        # 文件上传组件
│   ├── FilePreview.tsx   # 文件预览组件
│   └── components/       # 文件模块专用组件
│       └── FileViewerContainer.tsx
│
├── Books/                # 书籍推荐模块
│   └── index.tsx         # 书籍推荐页面
│
├── Technology/           # 技术展示模块
│   └── index.tsx         # 技术栈展示页面
│
└── README.md            # 本说明文件
```

## 🎯 设计原则

### 1. 模块化组织

- 每个功能模块独立成文件夹
- 相关组件放在同一模块下
- 便于维护和扩展

### 2. 命名规范

- 文件夹使用 PascalCase（如 `Files`、`Books`）
- 主入口文件统一命名为 `index.tsx`
- 子组件按功能命名（如 `Upload.tsx`、`FilePreview.tsx`）

### 3. 组件分类

- **systemPages**: 系统级页面，如登录、首页、布局等
- **功能模块**: 按业务功能划分，如 Files、Books、Technology

## 📋 各模块说明

### Files 模块

- **功能**: 文件上传、预览、管理
- **主要组件**:
    - `index.tsx`: 主页面，包含Tab切换
    - `Upload.tsx`: 文件上传功能
    - `FilePreview.tsx`: 文件列表和预览
    - `FileViewerContainer.tsx`: 文件查看器

### Books 模块

- **功能**: 技术书籍推荐和展示
- **特点**: 卡片式布局，支持搜索和分类筛选

### Technology 模块

- **功能**: 技术栈展示、项目经验、学习历程
- **特点**: Tab页面，包含技能图表、项目展示、时间线

## 🔄 路由配置

路由配置文件位于 `src/routes/index.tsx`，已更新为新的文件结构：

```typescript
const LazyComponents = {
    Home: lazy(() => import('@/views/systemPages/Home.tsx')),
    NotFound: lazy(() => import('@/views/systemPages/NotFound.tsx')),
    Login: lazy(() => import('@/views/systemPages/Login.tsx')),
    Books: lazy(() => import('@/views/Books/index.tsx')),
    Technology: lazy(() => import('@/views/Technology/index.tsx')),
    Files: lazy(() => import('@/views/Files/index.tsx')),
}
```

## 🎨 样式文件

对应的样式文件位于 `src/styles/` 目录：

- `books.module.scss`: Books模块样式
- `technology.module.scss`: Technology模块样式
- `files.module.scss`: Files模块样式（如需要）

## 🚀 扩展指南

### 添加新模块

1. 在 `views/` 下创建新的模块文件夹
2. 创建 `index.tsx` 作为主入口
3. 在 `routes/index.tsx` 中添加路由配置
4. 在 `styles/` 中创建对应的样式文件

### 添加子组件

1. 在模块文件夹下直接添加组件文件
2. 或在模块下创建 `components/` 文件夹存放专用组件
3. 通过相对路径导入使用

## 📝 注意事项

1. **导入路径**: 使用 `@/` 别名进行绝对路径导入
2. **懒加载**: 所有页面组件都使用 `React.lazy()` 进行懒加载
3. **样式隔离**: 使用 CSS Modules 确保样式隔离
4. **组件复用**: 公共组件放在 `src/components/` 目录
5. **类型定义**: TypeScript 接口定义放在组件文件内或单独的 `types/` 目录

## 🔧 维护建议

1. 定期检查模块间的依赖关系
2. 保持组件的单一职责原则
3. 及时更新文档和注释
4. 遵循项目的编码规范
