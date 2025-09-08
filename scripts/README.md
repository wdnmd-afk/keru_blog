# 国际化自动化工具集

## 概述

这是一套完整的React项目国际化自动化工具，旨在解决大型项目中手动国际化效率低下的问题。

## 工具特性

### 🔍 智能扫描 (i18n-scanner.js)
- 自动识别项目中的硬编码中文文本
- 支持JSX、字符串字面量、模板字符串等多种格式
- 智能生成翻译键建议
- 按命名空间组织翻译内容

### 🔄 自动替换 (i18n-replacer.js)
- 基于AST的精确代码替换
- 自动添加useTranslation hook
- 智能处理JSX和字符串文本
- 支持预览模式和回滚功能

### ✅ 质量验证 (i18n-validator.js)
- 检测遗漏的国际化文本
- 验证翻译键完整性
- 识别未使用的翻译键
- 生成详细的质量报告

### 🚀 一键工作流 (i18n-workflow.js)
- 集成所有工具的完整流程
- 交互式操作界面
- 支持增量更新
- 自动生成工作总结

## 快速开始

### 1. 安装依赖
```bash
cd scripts
npm install
```

### 2. 运行完整工作流
```bash
# 交互式模式
npm run workflow

# 自动模式
npm run workflow:auto
```

### 3. 单独使用工具
```bash
# 扫描硬编码文本
npm run scan

# 执行自动替换
npm run replace scan-report.json

# 验证国际化质量
npm run validate
```

## 详细使用说明

### 扫描工具 (i18n-scanner.js)

**功能**: 扫描项目中的硬编码文本并生成替换建议

**使用方法**:
```bash
node i18n-scanner.js [源码目录] [输出目录]
```

**输出文件**:
- `scan-report.json`: 详细的扫描结果
- `scan-report.md`: 人类可读的报告
- `replacement-script.js`: 批量替换脚本

**配置选项**:
```javascript
const scanner = new I18nScanner({
    srcDir: 'frontEnd/src',           // 源码目录
    outputDir: 'scripts/i18n-output', // 输出目录
    extensions: ['.tsx', '.ts'],       // 文件扩展名
    excludePatterns: ['**/test/**']    // 排除模式
});
```

### 替换工具 (i18n-replacer.js)

**功能**: 基于扫描结果自动替换硬编码文本

**使用方法**:
```bash
node i18n-replacer.js scan-report.json [--dry-run]
```

**主要特性**:
- 基于Babel AST的精确替换
- 自动添加import和useTranslation
- 支持JSX表达式和字符串字面量
- 预览模式避免误操作

### 验证工具 (i18n-validator.js)

**功能**: 检测国际化实现的质量问题

**使用方法**:
```bash
node i18n-validator.js
```

**检测内容**:
- 遗漏的国际化文本
- 缺失的翻译
- 未使用的翻译键
- TODO标记的翻译

### 工作流工具 (i18n-workflow.js)

**功能**: 一键执行完整的国际化流程

**使用方法**:
```bash
# 交互式模式
node i18n-workflow.js

# 自动模式
node i18n-workflow.js --no-interactive

# 指定源码目录
node i18n-workflow.js --src=src/components
```

**工作流步骤**:
1. 扫描硬编码文本
2. 预览扫描结果
3. 执行自动替换
4. 验证国际化质量
5. 生成工作总结

## 最佳实践

### 1. 项目初始化
```bash
# 首次运行完整工作流
npm run workflow

# 检查生成的报告
ls scripts/i18n-output/
```

### 2. 增量更新
```bash
# 只扫描新增文件
node i18n-scanner.js src/new-feature

# 验证现有国际化
npm run validate
```

### 3. CI/CD集成
```bash
# 在CI中检查国际化质量
npm run validate
if [ $? -ne 0 ]; then
  echo "国际化检查失败"
  exit 1
fi
```

### 4. 团队协作
- 定期运行验证工具检查质量
- 新功能开发后及时运行扫描
- 翻译文件变更需要code review
- 建立国际化开发规范

## 配置文件

### .i18nrc.json (可选)
```json
{
  "srcDir": "src",
  "i18nDir": "src/i18n/locales",
  "languages": ["zh", "en", "ja"],
  "namespaces": ["common", "layout", "feature"],
  "excludePatterns": [
    "**/test/**",
    "**/stories/**"
  ],
  "keyNaming": {
    "maxLength": 50,
    "separator": "_",
    "caseStyle": "snake_case"
  }
}
```

## 故障排除

### 路径配置问题

**Q: 运行 `pnpm scan` 显示找到 0 个文件**
A: 这是最常见的问题，通常是路径配置错误导致的

**解决步骤:**
```bash
# 1. 运行诊断工具
npm run diagnostic

# 2. 运行快速修复
npm run quick-fix

# 3. 重新测试扫描
npm run test-scan
```

**手动修复:**
1. 检查前端源码目录位置（通常是 `../frontEnd/src`）
2. 修改 `i18n-scanner.js` 中的 `srcDir` 配置
3. 确认文件扩展名配置包含项目使用的类型

### 常见问题

**Q: 扫描结果包含不需要国际化的文本**
A: 在scanner中添加更多过滤条件，或使用excludePatterns排除特定文件

**Q: 自动替换后代码无法编译**
A: 检查是否正确添加了useTranslation hook，确认翻译键格式正确

**Q: 翻译键冲突**
A: 使用更具体的命名空间，或手动调整生成的键名

**Q: 性能问题**
A: 对大型项目，考虑分批处理或使用excludePatterns减少扫描范围

### 调试模式
```bash
# 运行路径诊断
npm run diagnostic

# 快速修复路径问题
npm run quick-fix

# 测试特定目录扫描
node i18n-scanner.js ../frontEnd/src ./test-output

# 启用详细日志
DEBUG=i18n:* npm run workflow
```

## 扩展开发

### 添加新的文本模式
```javascript
// 在i18n-scanner.js中添加新的正则模式
this.patterns.push(
    /customFunction\(['"`]([^'"`]*[\u4e00-\u9fa5][^'"`]*)['"`]\)/g
);
```

### 自定义翻译键生成
```javascript
// 重写generateKey方法
generateKey(text, filePath) {
    // 自定义键名生成逻辑
    return `custom_${text.length}_${Date.now()}`;
}
```

### 集成其他工具
```javascript
// 添加新的验证规则
class CustomValidator extends I18nValidator {
    async customCheck() {
        // 自定义检查逻辑
    }
}
```

## 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 创建Pull Request

## 许可证

MIT License - 详见LICENSE文件
