# Server端Prettier代码格式化指南

## 📋 配置概述

为Server端Node.js项目配置了完整的Prettier代码格式化系统，提供统一的代码风格和自动化格式化功能。

## 🚀 使用方法

### 1. 格式化所有文件
```bash
# 格式化src目录、根目录和scripts目录下的所有支持文件
npm run format
```

### 2. 检查格式化状态
```bash
# 检查文件是否符合格式化规范（不修改文件）
npm run format:check
```

### 3. 支持的文件类型
- TypeScript (.ts)
- JavaScript (.js)
- JSON (.json)

## ⚙️ 配置详情

### Prettier配置 (.prettierrc)
```json
{
  "trailingComma": "es5",     // ES5兼容的尾随逗号
  "tabWidth": 2,              // 缩进宽度：2个空格（Node.js常用）
  "singleQuote": true,        // 使用单引号
  "bracketSameLine": false,   // 对象括号换行
  "printWidth": 100,          // 行宽限制：100字符
  "semi": false,              // 不使用分号
  "endOfLine": "lf",          // 使用LF换行符（Unix风格）
  "arrowParens": "avoid",     // 箭头函数参数避免括号
  "bracketSpacing": true,     // 对象括号内空格
  "plugins": ["prettier-plugin-organize-imports"]  // 自动排序导入
}
```

### 配置特点（适合Node.js后端）
- ✅ **缩进**: 2个空格（Node.js社区标准）
- ✅ **引号**: 单引号
- ✅ **分号**: 不使用分号（现代JavaScript风格）
- ✅ **行宽**: 100字符
- ✅ **换行符**: LF（Unix风格，适合服务器环境）
- ✅ **箭头函数**: 避免不必要的括号
- ✅ **自动导入排序**: 启用

### 忽略文件配置 (.prettierignore)
自动排除以下文件和目录：
- `node_modules/` - 依赖包
- `dist/`, `build/` - 构建输出
- `logs/` - 日志文件
- `static/` - 静态文件目录
- `temp/` - 临时文件
- `prisma/migrations/` - Prisma迁移文件
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
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "[typescript]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     }
   }
   ```

### WebStorm/IntelliJ配置
1. 打开 Settings → Languages & Frameworks → JavaScript → Prettier
2. 勾选 "On code reformat" 和 "On save"
3. 设置 Prettier package 路径

## 📝 使用场景

### 1. 开发过程中
```bash
# 开发时定期格式化
npm run format

# 检查格式化状态
npm run format:check
```

### 2. 提交前格式化
```bash
# 格式化所有文件后再提交
npm run format
git add .
git commit -m "feat: 添加新功能"
```

### 3. CI/CD集成
```bash
# 在CI流程中检查代码格式
npm run format:check
```

## 🎯 Node.js后端特定配置

### 1. Express路由格式化
```typescript
// 格式化前
import {Router} from 'express';
const router=Router();
router.get('/users',(req,res)=>{res.json({users:[]});});

// 格式化后
import { Router } from 'express'
const router = Router()

router.get('/users', (req, res) => {
  res.json({ users: [] })
})
```

### 2. 依赖注入格式化
```typescript
// 格式化前
import {injectable,inject} from 'inversify';
@injectable()
export class UserService{
constructor(@inject('UserRepository')private userRepo:any){}
}

// 格式化后
import { injectable, inject } from 'inversify'

@injectable()
export class UserService {
  constructor(@inject('UserRepository') private userRepo: any) {}
}
```

### 3. Prisma查询格式化
```typescript
// 格式化前
const users=await prisma.user.findMany({where:{active:true},include:{posts:true}});

// 格式化后
const users = await prisma.user.findMany({
  where: { active: true },
  include: { posts: true },
})
```

## 📊 格式化效果示例

### 格式化前：
```typescript
import {Request,Response} from 'express';
import {injectable} from 'inversify';
@injectable()
export class UserController{
async getUsers(req:Request,res:Response){
const users=await this.userService.findAll();
return res.json({data:users,status:'success'});
}
}
```

### 格式化后：
```typescript
import { Request, Response } from 'express'
import { injectable } from 'inversify'

@injectable()
export class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await this.userService.findAll()
    return res.json({ data: users, status: 'success' })
  }
}
```

## 🔍 故障排除

### 1. 格式化失败
如果遇到格式化错误，检查：
- 文件语法是否正确
- 是否在.prettierignore中被排除
- Prettier配置是否有效

### 2. 导入排序问题
使用了`prettier-plugin-organize-imports`插件：
- 自动按字母顺序排序导入
- 移除未使用的导入
- 合并重复的导入
- 分组排序（第三方库 → 本地模块）

### 3. 装饰器格式化
Prettier会正确格式化TypeScript装饰器：
```typescript
@injectable()
@controller('/api/users')
export class UserController {
  @httpGet('/')
  async getUsers() {
    // 实现
  }
}
```

## 📋 最佳实践

### 1. 团队协作
- **统一标准**: 所有成员使用相同的格式化配置
- **代码审查**: 专注于逻辑而非格式问题
- **自动化**: 集成到开发工作流中

### 2. 服务器环境适配
- **换行符**: 使用LF适配Linux服务器
- **缩进**: 2空格符合Node.js社区标准
- **文件排除**: 排除服务器特定文件（日志、上传等）

### 3. 性能考虑
- **批量格式化**: 定期批量格式化而非每次保存
- **选择性格式化**: 只格式化源代码，排除生成文件
- **CI集成**: 在CI中验证格式而非修复

## 🎉 总结

Server端Prettier配置已完成，现在可以：
- ✅ 使用 `npm run format` 格式化所有代码
- ✅ 使用 `npm run format:check` 检查格式化状态
- ✅ 享受统一的Node.js后端代码风格
- ✅ 提高团队协作效率
- ✅ 减少代码审查中的格式争议

建议在开发过程中定期运行格式化命令，或配置IDE在保存时自动格式化，以保持代码的一致性和可读性。特别适合Express + TypeScript + Prisma的技术栈！
