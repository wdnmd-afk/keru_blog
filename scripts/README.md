# 代码高亮迁移自动化脚本

## 功能说明

这个脚本可以自动将项目中的 `pre` 标签替换为 `CodeHighlight` 组件，并智能地创建或更新对应的 JSON 数据文件。

## 主要特性

- ✅ **智能检测**: 自动检测文件中的 `pre` 标签
- ✅ **语言识别**: 根据代码内容自动识别编程语言
- ✅ **JSON 管理**: 智能创建或更新 JSON 数据文件
- ✅ **导入管理**: 自动添加必要的导入语句
- ✅ **备份保护**: 自动创建文件备份
- ✅ **批量处理**: 支持目录级别的批量处理
- ✅ **精确替换**: 保持原有的代码格式和缩进

## 使用方法

### 1. 处理整个目录

```bash
# 处理 nodejs 目录下的所有文件
node scripts/migrate-code-highlight.js --nodejs

# 处理 git 目录下的所有文件
node scripts/migrate-code-highlight.js --git

# 处理 docker 目录下的所有文件
node scripts/migrate-code-highlight.js --docker
```

### 2. 处理特定文件

```bash
# 处理 nodejs 目录下的特定文件
node scripts/migrate-code-highlight.js --nodejs/ExpressDetail.tsx

# 处理 git 目录下的特定文件
node scripts/migrate-code-highlight.js --git/GitHooksDetail.tsx
```

## 工作流程

1. **文件检测**: 扫描指定目录或文件
2. **内容分析**: 检测是否需要处理（是否有 `pre` 标签）
3. **备份创建**: 为原文件创建时间戳备份
4. **代码提取**: 提取所有 `pre` 标签中的代码
5. **语言检测**: 自动识别代码语言类型
6. **JSON 处理**: 创建或更新对应的 JSON 文件
7. **内容替换**: 将 `pre` 标签替换为 `CodeHighlight` 组件
8. **导入添加**: 确保必要的导入语句存在

## 支持的语言类型

- `javascript` - JavaScript 代码
- `typescript` - TypeScript 代码
- `bash` - Shell/Bash 脚本
- `json` - JSON 数据
- `yaml` - YAML 配置
- `html` - HTML 标记
- `css` - CSS 样式
- `sql` - SQL 查询
- `python` - Python 代码
- `java` - Java 代码
- `go` - Go 代码
- `rust` - Rust 代码
- `php` - PHP 代码
- `ruby` - Ruby 代码
- `text` - 纯文本

## 目录结构

```
scripts/
├── migrate-code-highlight.js  # 主脚本
├── README.md                  # 使用说明
├── test.js                    # 测试脚本
└── backups/                   # 备份目录
    ├── ExpressDetail.tsx.2025-08-20T10-30-00-000Z.backup
    └── DatabaseDetail.tsx.2025-08-20T10-31-00-000Z.backup
```

## 输出示例

```
🚀 开始代码高亮迁移...
📁 目标: nodejs

📂 发现 5 个文件需要处理

🔄 处理文件: ExpressDetail.tsx
📝 发现 18 个代码块
📖 读取现有 JSON 文件: express.json
📝 添加 8 个新代码块到 express.json
✅ ExpressDetail.tsx 处理完成

🔄 处理文件: DatabaseDetail.tsx
📝 发现 14 个代码块
📝 添加 14 个新代码块到 database.json
✅ DatabaseDetail.tsx 处理完成

📊 迁移总结:
✅ 处理文件: 5
📄 创建JSON: 3
❌ 错误: 0

🎉 迁移完成!
```

## 注意事项

1. **备份**: 脚本会自动创建备份，但建议在运行前手动备份重要文件
2. **测试**: 建议先在测试环境中运行脚本
3. **检查**: 运行后请检查生成的代码是否正确
4. **JSON**: 生成的 JSON 文件可能需要手动调整标题和内容

## 故障排除

### 常见问题

1. **文件不存在**: 检查文件路径是否正确
2. **权限错误**: 确保有文件读写权限
3. **JSON 格式错误**: 检查现有 JSON 文件格式是否正确
4. **导入冲突**: 检查是否有重复的导入语句

### 恢复备份

如果需要恢复文件，可以从 `scripts/backups/` 目录中找到对应的备份文件：

```bash
# 恢复文件
cp scripts/backups/ExpressDetail.tsx.2025-08-20T10-30-00-000Z.backup frontEnd/src/views/Technology/pages/nodejs/ExpressDetail.tsx
```

## 开发说明

### 扩展语言支持

在 `LANGUAGE_MAP` 中添加新的语言映射：

```javascript
const LANGUAGE_MAP = {
  'kotlin': 'kotlin',
  'swift': 'swift',
  // ... 其他语言
}
```

### 自定义标题生成

修改 `generateTitle` 方法来改进标题生成逻辑：

```javascript
generateTitle(code, index) {
  // 自定义标题生成逻辑
}
```

### 自定义键名生成

修改 `generateKey` 方法来改进键名生成逻辑：

```javascript
generateKey(title, index) {
  // 自定义键名生成逻辑
}
```
