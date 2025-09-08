#!/usr/bin/env node

/**
 * 国际化质量检测工具
 * 
 * 功能：
 * 1. 检测遗漏的国际化文本
 * 2. 验证翻译键的完整性
 * 3. 检查未使用的翻译键
 * 4. 生成质量报告
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class I18nValidator {
    constructor(options = {}) {
        this.options = {
            srcDir: options.srcDir || '../frontEnd/src',
            i18nDir: options.i18nDir || '..\frontEnd\src\i18n/locales',
            languages: options.languages || ['zh', 'en'],
            outputDir: options.outputDir || './i18n-validation',
            ...options
        };
        
        this.issues = [];
        this.translationKeys = new Map();
        this.usedKeys = new Set();
    }

    /**
     * 执行验证
     */
    async validate() {
        console.log('🔍 开始国际化质量检测...');
        
        // 加载翻译文件
        await this.loadTranslations();
        
        // 扫描代码使用情况
        await this.scanCodeUsage();
        
        // 检测问题
        await this.detectIssues();
        
        // 生成报告
        await this.generateReport();
        
        console.log('✅ 检测完成！');
        this.printSummary();
    }

    /**
     * 加载翻译文件
     */
    async loadTranslations() {
        console.log('📚 加载翻译文件...');
        
        for (const lang of this.options.languages) {
            const langDir = path.join(this.options.i18nDir, lang);
            if (!fs.existsSync(langDir)) {
                this.addIssue('missing_language_dir', `缺少语言目录: ${langDir}`);
                continue;
            }
            
            const files = glob.sync(`${langDir}/*.json`);
            for (const file of files) {
                const namespace = path.basename(file, '.json');
                const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
                
                if (!this.translationKeys.has(namespace)) {
                    this.translationKeys.set(namespace, new Map());
                }
                
                const nsMap = this.translationKeys.get(namespace);
                this.flattenObject(content, '', nsMap, lang);
            }
        }
    }

    /**
     * 扁平化对象
     */
    flattenObject(obj, prefix, map, lang) {
        Object.entries(obj).forEach(([key, value]) => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof value === 'object' && value !== null) {
                this.flattenObject(value, fullKey, map, lang);
            } else {
                if (!map.has(fullKey)) {
                    map.set(fullKey, new Map());
                }
                map.get(fullKey).set(lang, value);
            }
        });
    }

    /**
     * 扫描代码使用情况
     */
    async scanCodeUsage() {
        console.log('🔍 扫描代码使用情况...');
        
        const pattern = `${this.options.srcDir}/**/*.{tsx,ts,jsx,js}`;
        const files = glob.sync(pattern, {
            ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
        });

        for (const file of files) {
            await this.scanFileUsage(file);
        }
    }

    /**
     * 扫描单个文件的使用情况
     */
    async scanFileUsage(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // 匹配 t('key') 或 t("key") 调用
        const tCallRegex = /t\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
        let match;
        
        while ((match = tCallRegex.exec(content)) !== null) {
            this.usedKeys.add(match[1]);
        }
        
        // 检测遗漏的中文文本
        const chineseRegex = /[\u4e00-\u9fa5]+/g;
        const lines = content.split('\n');
        
        lines.forEach((line, lineNumber) => {
            if (chineseRegex.test(line) && !line.includes('t(')) {
                // 排除注释
                if (!line.trim().startsWith('//') && !line.trim().startsWith('*')) {
                    this.addIssue('untranslated_text', 
                        `发现未国际化的中文文本`, 
                        { file: filePath, line: lineNumber + 1, content: line.trim() }
                    );
                }
            }
        });
    }

    /**
     * 检测问题
     */
    async detectIssues() {
        console.log('🔍 检测问题...');
        
        // 检查翻译键完整性
        this.translationKeys.forEach((nsMap, namespace) => {
            nsMap.forEach((langMap, key) => {
                const fullKey = `${namespace}:${key}`;
                
                // 检查是否所有语言都有翻译
                for (const lang of this.options.languages) {
                    if (!langMap.has(lang)) {
                        this.addIssue('missing_translation', 
                            `缺少翻译: ${fullKey} (${lang})`
                        );
                    }
                }
                
                // 检查翻译内容是否为TODO
                langMap.forEach((value, lang) => {
                    if (typeof value === 'string' && value.includes('[TODO:')) {
                        this.addIssue('todo_translation', 
                            `待翻译: ${fullKey} (${lang})`
                        );
                    }
                });
            });
        });
        
        // 检查未使用的翻译键
        this.translationKeys.forEach((nsMap, namespace) => {
            nsMap.forEach((langMap, key) => {
                const fullKey = `${namespace}:${key}`;
                if (!this.usedKeys.has(fullKey)) {
                    this.addIssue('unused_key', 
                        `未使用的翻译键: ${fullKey}`
                    );
                }
            });
        });
        
        // 检查使用了但不存在的键
        this.usedKeys.forEach(key => {
            const [namespace, ...keyParts] = key.split(':');
            const actualKey = keyParts.join(':');
            
            if (!this.translationKeys.has(namespace) || 
                !this.translationKeys.get(namespace).has(actualKey)) {
                this.addIssue('missing_key', 
                    `使用了不存在的翻译键: ${key}`
                );
            }
        });
    }

    /**
     * 添加问题
     */
    addIssue(type, message, details = {}) {
        this.issues.push({
            type,
            message,
            details,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * 生成报告
     */
    async generateReport() {
        if (!fs.existsSync(this.options.outputDir)) {
            fs.mkdirSync(this.options.outputDir, { recursive: true });
        }

        const report = {
            summary: {
                totalIssues: this.issues.length,
                issueTypes: this.getIssueTypeCounts(),
                totalKeys: this.getTotalKeyCount(),
                usedKeys: this.usedKeys.size,
                languages: this.options.languages,
                scanTime: new Date().toISOString()
            },
            issues: this.issues,
            recommendations: this.generateRecommendations()
        };

        // JSON报告
        const jsonPath = path.join(this.options.outputDir, 'validation-report.json');
        fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

        // Markdown报告
        const mdPath = path.join(this.options.outputDir, 'validation-report.md');
        fs.writeFileSync(mdPath, this.generateMarkdownReport(report));

        console.log(`📊 报告已生成: ${this.options.outputDir}`);
    }

    /**
     * 获取问题类型统计
     */
    getIssueTypeCounts() {
        const counts = {};
        this.issues.forEach(issue => {
            counts[issue.type] = (counts[issue.type] || 0) + 1;
        });
        return counts;
    }

    /**
     * 获取翻译键总数
     */
    getTotalKeyCount() {
        let total = 0;
        this.translationKeys.forEach(nsMap => {
            total += nsMap.size;
        });
        return total;
    }

    /**
     * 生成建议
     */
    generateRecommendations() {
        const recommendations = [];
        const issueTypes = this.getIssueTypeCounts();
        
        if (issueTypes.untranslated_text > 0) {
            recommendations.push({
                type: 'action',
                message: `发现 ${issueTypes.untranslated_text} 处未国际化的文本，建议使用自动替换工具处理`
            });
        }
        
        if (issueTypes.missing_translation > 0) {
            recommendations.push({
                type: 'action',
                message: `有 ${issueTypes.missing_translation} 个翻译缺失，需要补充翻译`
            });
        }
        
        if (issueTypes.unused_key > 0) {
            recommendations.push({
                type: 'cleanup',
                message: `发现 ${issueTypes.unused_key} 个未使用的翻译键，可以考虑清理`
            });
        }
        
        return recommendations;
    }

    /**
     * 生成Markdown报告
     */
    generateMarkdownReport(report) {
        let md = `# 国际化质量检测报告\n\n`;
        md += `- 检测时间: ${report.summary.scanTime}\n`;
        md += `- 总问题数: ${report.summary.totalIssues}\n`;
        md += `- 翻译键总数: ${report.summary.totalKeys}\n`;
        md += `- 已使用键数: ${report.summary.usedKeys}\n`;
        md += `- 支持语言: ${report.summary.languages.join(', ')}\n\n`;

        md += `## 问题统计\n\n`;
        Object.entries(report.summary.issueTypes).forEach(([type, count]) => {
            md += `- ${type}: ${count}\n`;
        });

        md += `\n## 详细问题\n\n`;
        const groupedIssues = {};
        report.issues.forEach(issue => {
            if (!groupedIssues[issue.type]) {
                groupedIssues[issue.type] = [];
            }
            groupedIssues[issue.type].push(issue);
        });

        Object.entries(groupedIssues).forEach(([type, issues]) => {
            md += `### ${type}\n\n`;
            issues.forEach(issue => {
                md += `- ${issue.message}\n`;
                if (issue.details.file) {
                    md += `  - 文件: ${issue.details.file}:${issue.details.line}\n`;
                }
            });
            md += '\n';
        });

        md += `## 建议\n\n`;
        report.recommendations.forEach(rec => {
            md += `- **${rec.type}**: ${rec.message}\n`;
        });

        return md;
    }

    /**
     * 打印摘要
     */
    printSummary() {
        const issueTypes = this.getIssueTypeCounts();
        console.log('\n📊 检测摘要:');
        console.log(`   总问题数: ${this.issues.length}`);
        Object.entries(issueTypes).forEach(([type, count]) => {
            console.log(`   ${type}: ${count}`);
        });
    }
}

// 命令行接口
if (require.main === module) {
    const validator = new I18nValidator();
    validator.validate().catch(console.error);
}

module.exports = I18nValidator;
