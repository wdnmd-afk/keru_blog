# keru_blog 公共工具模块

这是 keru_blog 项目的公共工具模块，提供统一的 TypeScript 检测和代码格式化功能。

## 目录结构

```
tools/
├── typescript/              # TypeScript 检测工具
│   ├── utils.js             # 通用工具函数
│   ├── check-single.js      # 单项目检测脚本
│   └── check-all.js         # 批量检测脚本
├── format/                  # 代码格式化工具
│   ├── prettier-config.js   # Prettier 配置管理
│   ├── format-single.js     # 单项目格式化脚本
│   └── format-all.js        # 批量格式化脚本
├── tsError/                 # TypeScript 错误输出目录
│   ├── frontend/            # frontEnd 项目错误输出
│   ├── management/          # management 项目错误输出
│   ├── server/              # server 项目错误输出
│   └── summary/             # 汇总报告
└── README.md                # 本文档
```

## 支持的项目

- **frontend**: frontEnd 项目 (React + Vite + TypeScript)
- **management**: management 项目 (React + Vite + TypeScript)
- **server**: server 项目 (Node.js + Express + TypeScript)

## TypeScript 检测工具

### 单项目检测

检测指定的单个项目：

```bash
# 检测 frontEnd 项目
npm run ts-check:frontend

# 检测 management 项目
npm run ts-check:management

# 检测 server 项目
npm run ts-check:server
```

或直接使用脚本：

```bash
node tools/typescript/check-single.js frontend
node tools/typescript/check-single.js management
node tools/typescript/check-single.js server
```

### 批量检测

检测所有项目：

```bash
# 并行检测所有项目 (默认，速度快)
npm run ts-check:all

# 顺序检测所有项目 (详细输出)
npm run ts-check:all:sequential
```

或直接使用脚本：

```bash
node tools/typescript/check-all.js
node tools/typescript/check-all.js --sequential
node tools/typescript/check-all.js --summary-only
```

### 检测结果

检测结果会保存到 `tools/tsError/` 目录下：

- **单项目结果**: `tools/tsError/<project>/`
  - `error-report.json`: 详细的 JSON 格式报告
  - `error-summary.md`: 可读的 Markdown 格式摘要
  - `raw-output.txt`: 原始错误输出 (仅在有错误时生成)

- **汇总结果**: `tools/tsError/summary/`
  - `summary-report.json`: 所有项目的汇总 JSON 报告
  - `summary-report.md`: 所有项目的汇总 Markdown 摘要

## 代码格式化工具

### 单项目格式化

格式化指定的单个项目：

```bash
# 格式化 frontEnd 项目
npm run format:frontend

# 格式化 management 项目
npm run format:management

# 格式化 server 项目
npm run format:server
```

或直接使用脚本：

```bash
node tools/format/format-single.js frontend
node tools/format/format-single.js management
node tools/format/format-single.js server
```

### 批量格式化

格式化所有项目：

```bash
# 并行格式化所有项目 (默认，速度快)
npm run format:all

# 顺序格式化所有项目 (详细输出)
npm run format:all:sequential

# 仅检查格式，不进行修改
npm run format:check:all

# 为所有项目生成 Prettier 配置文件
npm run format:config:all
```

或直接使用脚本：

```bash
node tools/format/format-all.js
node tools/format/format-all.js --sequential
node tools/format/format-all.js --check
node tools/format/format-all.js --config
```

### 格式化选项

- **默认模式**: 格式化所有匹配的代码文件
- **检查模式** (`--check`): 仅检查格式是否符合规范，不进行修改
- **配置模式** (`--config`): 生成或更新项目的 `.prettierrc` 和 `.prettierignore` 文件

## 配置说明

### TypeScript 检测配置

工具会自动读取各项目的 `tsconfig.json` 配置文件，支持：

- 跨项目路径映射 (frontEnd 和 management 项目的相互引用)
- 不同的编译目标和模块系统
- 项目特定的类型检查规则

### 代码格式化配置

工具使用统一的 Prettier 配置，主要设置：

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

不同项目类型会有细微调整：
- **React 项目**: 启用 JSX 单引号，括号换行
- **Node.js 项目**: 稍长的行宽度 (120 字符)

## 使用建议

### 开发流程集成

1. **开发前**: 运行格式化检查确保代码风格一致
   ```bash
   npm run format:check:all
   ```

2. **开发中**: 定期运行 TypeScript 检测发现类型错误
   ```bash
   npm run ts-check:all
   ```

3. **提交前**: 格式化代码并进行最终检测
   ```bash
   npm run format:all
   npm run ts-check:all
   ```

### 错误处理

- **TypeScript 错误**: 查看 `tools/tsError/<project>/error-summary.md` 获取详细错误信息
- **格式化问题**: 运行对应的格式化命令自动修复
- **配置问题**: 使用 `--config` 选项重新生成配置文件

### 性能优化

- **并行执行**: 默认使用并行模式，适合快速检测
- **顺序执行**: 使用 `--sequential` 获取详细输出，适合调试
- **汇总模式**: 使用 `--summary-only` 仅显示结果统计

## 故障排除

### 常见问题

1. **项目不存在错误**
   - 确保项目目录存在
   - 检查 `tsconfig.json` 和 `package.json` 文件

2. **依赖缺失错误**
   - 运行 `npm install` 安装项目依赖
   - 确保 TypeScript 和 Prettier 已安装

3. **权限错误**
   - 确保有写入 `tools/tsError/` 目录的权限
   - 在 Windows 系统上可能需要管理员权限

4. **跨项目引用错误**
   - 检查 `tsconfig.json` 中的路径映射配置
   - 确保被引用的项目已正确构建

### 调试模式

使用详细输出模式进行调试：

```bash
# TypeScript 检测调试
node tools/typescript/check-single.js frontend --verbose

# 格式化调试
node tools/format/format-single.js frontend --check
```

### 日志查看

- 检测日志保存在错误报告文件中
- 格式化日志直接输出到控制台
- 使用 `--sequential` 模式获取更详细的过程信息

## 扩展开发

### 添加新项目

1. 在 `tools/typescript/utils.js` 的 `PROJECT_CONFIGS` 中添加项目配置
2. 在 `tools/format/prettier-config.js` 的 `FORMAT_CONFIGS` 中添加格式化配置
3. 创建对应的错误输出目录
4. 更新根目录 `package.json` 添加相应的 npm scripts

### 自定义配置

- 修改 `tools/format/prettier-config.js` 中的 `PRETTIER_CONFIG` 调整格式化规则
- 修改 `tools/typescript/utils.js` 中的项目配置调整检测行为

### 集成 CI/CD

工具支持在持续集成环境中使用：

```yaml
# GitHub Actions 示例
- name: TypeScript Check
  run: npm run ts-check:all

- name: Format Check
  run: npm run format:check:all
```

## 版本信息

- **工具版本**: v1.0
- **支持的 Node.js 版本**: >= 14.0.0
- **支持的 TypeScript 版本**: >= 4.0.0
- **支持的 Prettier 版本**: >= 2.0.0

---

*最后更新: 2024年*
