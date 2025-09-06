# Prettier代码格式化配置指南

## 📋 配置概述

已为项目配置了完整的Prettier代码格式化系统，包括：
- ✅ Prettier核心配置
- ✅ 自动导入排序插件
- ✅ ESLint集成
- ✅ npm脚本命令
- ✅ 忽略文件配置

## 🚀 使用方法

### 1. 格式化所有文件
```bash
# 格式化src目录下的所有支持文件
npm run format
```

### 2. 检查格式化状态
```bash
# 检查文件是否符合格式化规范（不修改文件）
npm run format:check
```

### 3. 支持的文件类型
- JavaScript (.js)
- TypeScript (.ts, .tsx)
- React JSX (.jsx)
- JSON (.json)
- CSS (.css)
- SCSS (.scss)
- Markdown (.md)

## ⚙️ 配置详情

### Prettier配置 (.prettierrc)
```json
{
  "trailingComma": "es5",     // ES5兼容的尾随逗号
  "tabWidth": 4,              // 缩进宽度：4个空格
  "singleQuote": true,        // 使用单引号
  "bracketSameLine": false,   // JSX标签换行
  "printWidth": 100,          // 行宽限制：100字符
  "semi": false,              // 不使用分号
  "plugins": ["prettier-plugin-organize-imports"]  // 自动排序导入
}
```

### 忽略文件配置 (.prettierignore)
自动排除以下文件和目录：
- `node_modules/` - 依赖包
- `dist/`, `build/` - 构建输出
- `*.log` - 日志文件
- `.env*` - 环境变量文件
- `package-lock.json` - 包管理器锁文件
- `TsError/` - TypeScript错误报告目录

## 🔧 IDE集成

### VS Code配置
1. 安装Prettier扩展：
   ```
   ext install esbenp.prettier-vscode
   ```

2. 在设置中启用保存时格式化：
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

### WebStorm/IntelliJ配置
1. 打开 Settings → Languages & Frameworks → JavaScript → Prettier
2. 勾选 "On code reformat" 和 "On save"
3. 设置 Prettier package 路径

## 📝 使用场景

### 1. 开发过程中
- **保存时自动格式化**：配置IDE在保存文件时自动运行Prettier
- **提交前格式化**：使用git hooks在提交前自动格式化

### 2. 团队协作
- **统一代码风格**：确保所有团队成员使用相同的格式化规则
- **减少代码审查争议**：自动处理格式问题，专注于逻辑审查

### 3. CI/CD集成
```bash
# 在CI流程中检查代码格式
npm run format:check
```

## 🎯 最佳实践

### 1. 提交前格式化
```bash
# 格式化所有文件后再提交
npm run format
git add .
git commit -m "feat: 添加新功能"
```

### 2. 批量格式化现有代码
```bash
# 首次使用时格式化整个项目
npm run format
```

### 3. 检查格式化状态
```bash
# 在CI/CD中使用，确保代码符合格式规范
npm run format:check
```

## 🔍 故障排除

### 1. 格式化失败
如果遇到格式化错误，检查：
- 文件语法是否正确
- 是否在.prettierignore中被排除
- Prettier配置是否有效

### 2. 与ESLint冲突
项目已配置`eslint-config-prettier`来避免冲突：
- Prettier负责代码格式化
- ESLint负责代码质量检查

### 3. 导入排序问题
使用了`prettier-plugin-organize-imports`插件：
- 自动按字母顺序排序导入
- 移除未使用的导入
- 合并重复的导入

## 📊 配置效果

### 格式化前
```typescript
import {useState,useEffect} from 'react';
import {Button} from 'antd'
import axios from 'axios';

const MyComponent=()=>{
const[data,setData]=useState(null);
useEffect(()=>{
axios.get('/api/data').then(response=>{
setData(response.data);
});
},[]);
return <Button>Click me</Button>;
};
```

### 格式化后
```typescript
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from 'axios'

const MyComponent = () => {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        axios.get('/api/data').then(response => {
            setData(response.data)
        })
    }, [])
    
    return <Button>Click me</Button>
}
```

## 🎉 总结

Prettier配置已完成，现在可以：
- ✅ 使用 `npm run format` 格式化所有代码
- ✅ 使用 `npm run format:check` 检查格式化状态
- ✅ 享受统一的代码风格
- ✅ 提高团队协作效率
- ✅ 减少代码审查中的格式争议

建议在开发过程中定期运行格式化命令，或配置IDE在保存时自动格式化，以保持代码的一致性和可读性。
