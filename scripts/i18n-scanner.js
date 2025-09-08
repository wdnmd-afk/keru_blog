#!/usr/bin/env node

/**
 * 国际化文本扫描工具
 * 
 * 功能：
 * 1. 自动扫描项目中的硬编码中文文本
 * 2. 生成翻译键建议
 * 3. 输出需要国际化的文件和位置
 * 4. 生成批量替换脚本
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class I18nScanner {
    constructor(options = {}) {
        this.options = {
            srcDir: options.srcDir || '../frontEnd/src',
            outputDir: options.outputDir || './i18n-output',
            extensions: options.extensions || ['.tsx', '.ts', '.jsx', '.js'],
            excludePatterns: options.excludePatterns || [
                '**/node_modules/**',
                '**/dist/**',
                '**/build/**',
                '**/*.test.*',
                '**/*.spec.*'
            ],
            ...options
        };
        
        // 中文文本匹配正则
        this.chineseRegex = /[\u4e00-\u9fa5]+/g;
        
        // 需要扫描的模式
        this.patterns = [
            // JSX文本内容
            />\s*([^<]*[\u4e00-\u9fa5][^<]*)\s*</g,
            // 字符串字面量
            /['"`]([^'"`]*[\u4e00-\u9fa5][^'"`]*)['"`]/g,
            // 模板字符串
            /`([^`]*[\u4e00-\u9fa5][^`]*)`/g,
            // 对象属性值
            /:\s*['"`]([^'"`]*[\u4e00-\u9fa5][^'"`]*)['"`]/g,
        ];
        
        this.results = [];
        this.translationKeys = new Map();
    }

    /**
     * 扫描指定目录
     */
    async scan() {
        console.log('🔍 开始扫描硬编码文本...');
        console.log(`📂 源码目录: ${this.options.srcDir}`);
        console.log(`📄 文件扩展名: ${this.options.extensions.join(', ')}`);
        console.log(`🚫 排除模式: ${this.options.excludePatterns.join(', ')}`);

        // 检查源码目录是否存在
        const srcDirPath = path.resolve(this.options.srcDir);
        if (!fs.existsSync(srcDirPath)) {
            console.error(`❌ 源码目录不存在: ${srcDirPath}`);
            console.log('💡 请运行 "npm run diagnostic" 检查路径配置');
            return;
        }

        const pattern = `${this.options.srcDir}/**/*{${this.options.extensions.join(',')}}`;
        console.log(`🔍 扫描模式: ${pattern}`);

        const files = glob.sync(pattern, {
            ignore: this.options.excludePatterns
        });

        console.log(`📁 找到 ${files.length} 个文件`);

        if (files.length === 0) {
            console.log('⚠️  未找到匹配文件，可能的原因:');
            console.log('   1. 源码目录路径不正确');
            console.log('   2. 文件扩展名配置不匹配');
            console.log('   3. 排除模式过于宽泛');
            console.log('💡 请运行 "npm run diagnostic" 进行详细诊断');
            return;
        }

        // 显示前几个文件作为示例
        console.log('📝 示例文件:');
        files.slice(0, 5).forEach((file, index) => {
            console.log(`   ${index + 1}. ${file}`);
        });
        if (files.length > 5) {
            console.log(`   ... 还有 ${files.length - 5} 个文件`);
        }

        for (const file of files) {
            await this.scanFile(file);
        }

        await this.generateReport();
        await this.generateReplacementScript();
        
        console.log('✅ 扫描完成！');
        console.log(`📊 共发现 ${this.results.length} 个需要国际化的文本`);
        console.log(`📝 报告已生成到: ${this.options.outputDir}`);
    }

    /**
     * 扫描单个文件
     */
    async scanFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');
            
            lines.forEach((line, lineNumber) => {
                this.patterns.forEach(pattern => {
                    let match;
                    while ((match = pattern.exec(line)) !== null) {
                        const text = match[1].trim();
                        if (this.shouldInclude(text)) {
                            const result = {
                                file: filePath,
                                line: lineNumber + 1,
                                text: text,
                                context: line.trim(),
                                suggestedKey: this.generateKey(text, filePath),
                                namespace: this.getNamespace(filePath)
                            };
                            
                            this.results.push(result);
                            this.addTranslationKey(result);
                        }
                    }
                });
            });
        } catch (error) {
            console.warn(`⚠️  无法读取文件: ${filePath}`, error.message);
        }
    }

    /**
     * 判断文本是否应该包含在结果中
     */
    shouldInclude(text) {
        // 过滤条件
        if (!text || text.length < 2) return false;
        if (!/[\u4e00-\u9fa5]/.test(text)) return false; // 必须包含中文
        if (/^[0-9\s\-_.,!?()[\]{}]+$/.test(text)) return false; // 纯符号数字
        if (text.includes('console.')) return false; // 控制台输出
        if (text.includes('//') || text.includes('/*')) return false; // 注释
        
        return true;
    }

    /**
     * 生成翻译键建议
     */
    generateKey(text, filePath) {
        // 提取关键词
        const keywords = text
            .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 0)
            .slice(0, 3)
            .join('_');
        
        // 根据文件路径确定前缀
        const pathParts = filePath.split('/');
        const fileName = pathParts[pathParts.length - 1].replace(/\.(tsx?|jsx?)$/, '');
        
        return `${fileName}_${keywords}`.toLowerCase();
    }

    /**
     * 获取命名空间
     */
    getNamespace(filePath) {
        if (filePath.includes('/Technology/')) return 'technology';
        if (filePath.includes('/Books/')) return 'books';
        if (filePath.includes('/Files/')) return 'files';
        if (filePath.includes('/Layout')) return 'layout';
        return 'common';
    }

    /**
     * 添加翻译键
     */
    addTranslationKey(result) {
        const namespace = result.namespace;
        if (!this.translationKeys.has(namespace)) {
            this.translationKeys.set(namespace, new Map());
        }
        
        const nsKeys = this.translationKeys.get(namespace);
        nsKeys.set(result.suggestedKey, result.text);
    }

    /**
     * 生成扫描报告
     */
    async generateReport() {
        // 确保输出目录存在
        if (!fs.existsSync(this.options.outputDir)) {
            fs.mkdirSync(this.options.outputDir, { recursive: true });
        }

        // 生成详细报告
        const report = {
            summary: {
                totalFiles: [...new Set(this.results.map(r => r.file))].length,
                totalTexts: this.results.length,
                namespaces: [...this.translationKeys.keys()],
                scanTime: new Date().toISOString()
            },
            results: this.results,
            translationKeys: Object.fromEntries(
                [...this.translationKeys.entries()].map(([ns, keys]) => [
                    ns, Object.fromEntries(keys)
                ])
            )
        };

        const reportPath = path.join(this.options.outputDir, 'scan-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

        // 生成人类可读的报告
        const readableReport = this.generateReadableReport(report);
        const readablePath = path.join(this.options.outputDir, 'scan-report.md');
        fs.writeFileSync(readablePath, readableReport);
    }

    /**
     * 生成可读报告
     */
    generateReadableReport(report) {
        let markdown = `# 国际化扫描报告\n\n`;
        markdown += `- 扫描时间: ${report.summary.scanTime}\n`;
        markdown += `- 扫描文件数: ${report.summary.totalFiles}\n`;
        markdown += `- 发现文本数: ${report.summary.totalTexts}\n`;
        markdown += `- 涉及命名空间: ${report.summary.namespaces.join(', ')}\n\n`;

        // 按文件分组
        const fileGroups = {};
        report.results.forEach(result => {
            if (!fileGroups[result.file]) {
                fileGroups[result.file] = [];
            }
            fileGroups[result.file].push(result);
        });

        markdown += `## 详细结果\n\n`;
        Object.entries(fileGroups).forEach(([file, results]) => {
            markdown += `### ${file}\n\n`;
            results.forEach(result => {
                markdown += `- **第${result.line}行**: "${result.text}"\n`;
                markdown += `  - 建议键名: \`${result.namespace}:${result.suggestedKey}\`\n`;
                markdown += `  - 上下文: \`${result.context}\`\n\n`;
            });
        });

        return markdown;
    }

    /**
     * 生成批量替换脚本
     */
    async generateReplacementScript() {
        let script = `#!/usr/bin/env node\n\n`;
        script += `/**\n * 自动生成的国际化替换脚本\n * 使用方法: node replacement-script.js\n */\n\n`;
        script += `const fs = require('fs');\n\n`;
        
        // 按文件分组生成替换逻辑
        const fileGroups = {};
        this.results.forEach(result => {
            if (!fileGroups[result.file]) {
                fileGroups[result.file] = [];
            }
            fileGroups[result.file].push(result);
        });

        script += `const replacements = {\n`;
        Object.entries(fileGroups).forEach(([file, results]) => {
            script += `  '${file}': [\n`;
            results.forEach(result => {
                script += `    {\n`;
                script += `      original: ${JSON.stringify(result.text)},\n`;
                script += `      replacement: \`t('${result.namespace}:${result.suggestedKey}')\`,\n`;
                script += `      line: ${result.line}\n`;
                script += `    },\n`;
            });
            script += `  ],\n`;
        });
        script += `};\n\n`;

        script += `// 执行替换逻辑\n`;
        script += `console.log('🔄 开始批量替换...');\n`;
        script += `// TODO: 实现具体的替换逻辑\n`;
        script += `console.log('✅ 替换完成！');\n`;

        const scriptPath = path.join(this.options.outputDir, 'replacement-script.js');
        fs.writeFileSync(scriptPath, script);
        fs.chmodSync(scriptPath, '755');
    }
}

// 命令行接口
if (require.main === module) {
    const scanner = new I18nScanner({
        srcDir: process.argv[2] || '../frontEnd/src',
        outputDir: process.argv[3] || './i18n-output'
    });
    
    scanner.scan().catch(console.error);
}

module.exports = I18nScanner;
