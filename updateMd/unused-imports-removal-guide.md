# 自动移除未使用导入的配置指南

## 问题描述

项目中存在许多未使用的导入语句（如 `WarningOutlined`, `BugOutlined` 等），需要配置自动化工具来在格式化时移除这些无用的导入。

## 解决方案分析

### 1. Prettier 的局限性

Prettier 本身**不支持**移除未使用的导入，它主要专注于代码格式化（缩进、换行、引号等）。移除未使用导入属于代码重构范畴，不在 Prettier 的职责范围内。

### 2. 推荐解决方案

有以下几种方案可以实现自动移除未使用的导入：

#### 方案一：使用 prettier-plugin-organize-imports（推荐）

这是最简单且与现有 Prettier 工作流集成最好的方案。

**优点：**
- 与 Prettier 无缝集成
- 在格式化时自动移除未使用导入
- 同时整理导入顺序
- 配置简单

**缺点：**
- 会重新排序导入语句
- 依赖 TypeScript 编译器服务

#### 方案二：使用 eslint-plugin-unused-imports

通过 ESLint 规则来检测和自动修复未使用的导入。

**优点：**
- 更精确的控制
- 可以配置为警告或错误
- 支持自动修复

**缺点：**
- 需要额外的 ESLint 配置
- 不与 Prettier 直接集成

#### 方案三：使用 VS Code 内置功能

利用编辑器的 "Organize Imports" 功能。

**优点：**
- 无需额外依赖
- VS Code 内置支持

**缺点：**
- 需要手动触发或配置保存时执行
- 团队成员需要统一编辑器配置

## 实施步骤

### 推荐实施：方案一 + 方案二组合

#### 步骤1：安装 prettier-plugin-organize-imports

```bash
pnpm add -D prettier-plugin-organize-imports
```

#### 步骤2：更新 .prettierrc 配置

```json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "singleQuote": true,
  "jsxBracketSameLine": false,
  "printWidth": 100,
  "semi": false,
  "plugins": ["prettier-plugin-organize-imports"]
}
```

#### 步骤3：安装 eslint-plugin-unused-imports

```bash
pnpm add -D eslint-plugin-unused-imports
```

#### 步骤4：更新 .eslintrc 配置

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "react-hooks",
    "unused-imports"
  ],
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "rules": {
    "react-refresh/only-export-components": [
      "off",
      {
        "allowConstantExport": true
      }
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

#### 步骤5：配置 VS Code 设置（可选）

在 `.vscode/settings.json` 中添加：

```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true
}
```

## 使用方法

### 自动化使用

1. **保存时自动处理**：配置完成后，每次保存文件时会自动：
   - 移除未使用的导入
   - 整理导入顺序
   - 格式化代码

2. **手动格式化**：运行 `npx prettier --write .` 会处理所有文件

3. **ESLint 修复**：运行 `npx eslint --fix .` 会修复未使用导入的问题

### 批量处理现有文件

```bash
# 使用 Prettier 格式化所有文件
npx prettier --write "src/**/*.{ts,tsx}"

# 使用 ESLint 修复所有文件
npx eslint --fix "src/**/*.{ts,tsx}"
```

## 注意事项

1. **导入顺序变化**：`prettier-plugin-organize-imports` 会重新排序导入语句，可能与现有代码风格不同

2. **类型导入**：确保类型导入使用 `import type` 语法，避免被误删

3. **副作用导入**：对于有副作用的导入（如 CSS 文件），插件通常能正确识别并保留

4. **React 组件**：确保 React 组件的导入被正确识别为已使用

## 测试验证

实施后，可以通过以下方式验证配置是否生效：

1. 在任意 TypeScript 文件中添加一个未使用的导入
2. 保存文件或运行格式化命令
3. 检查未使用的导入是否被自动移除

## 回滚方案

如果配置导致问题，可以：

1. 从 `.prettierrc` 中移除 `plugins` 配置
2. 从 `.eslintrc` 中移除 `unused-imports` 相关配置
3. 卸载相关依赖包

## 总结

虽然 Prettier 本身不支持移除未使用导入，但通过 `prettier-plugin-organize-imports` 插件可以实现这一功能。结合 ESLint 的 `unused-imports` 插件，可以建立一个完整的自动化工作流来保持代码的整洁性。