#!/usr/bin/env node

/**
 * 紧急修复脚本
 * 
 * 功能：
 * 1. 检测并修复错误的翻译键
 * 2. 清理重复的代码定义
 * 3. 恢复项目到可编译状态
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class EmergencyFixer {
    constructor() {
        this.fixedFiles = [];
        this.errors = [];
        this.backupDir = './emergency-backup';
    }

    /**
     * 运行紧急修复
     */
    async run() {
        console.log('🚨 紧急修复开始');
        console.log('='.repeat(50));

        await this.createBackup();
        await this.scanDamagedFiles();
        await this.fixTranslationKeys();
        await this.removeDuplicateDefinitions();
        await this.validateFixes();
        
        this.printSummary();
    }

    /**
     * 创建备份
     */
    async createBackup() {
        console.log('\n💾 创建紧急备份...');
        
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(this.backupDir, `emergency-${timestamp}`);
        fs.mkdirSync(backupPath, { recursive: true });

        console.log(`   📁 备份目录: ${backupPath}`);
        this.currentBackupPath = backupPath;
    }

    /**
     * 扫描损坏的文件
     */
    async scanDamagedFiles() {
        console.log('\n🔍 扫描损坏的文件...');
        
        const pattern = '../frontEnd/src/**/*.{tsx,ts,jsx,js}';
        const files = glob.sync(pattern, { cwd: __dirname });

        for (const file of files) {
            await this.checkFile(file);
        }

        console.log(`   📊 发现 ${this.errors.length} 个问题文件`);
    }

    /**
     * 检查单个文件
     */
    async checkFile(filePath) {
        try {
            const fullPath = path.resolve(__dirname, filePath);
            const content = fs.readFileSync(fullPath, 'utf-8');

            // 检查错误的翻译键模式
            const badKeyPattern = /t\s*\(\s*["'`][^"'`]*\\\\[^"'`]*["'`]\s*\)/g;
            const unicodeKeyPattern = /t\s*\(\s*["'`][^"'`]*\\u[0-9a-fA-F]{4}[^"'`]*["'`]\s*\)/g;
            const longKeyPattern = /t\s*\(\s*["'`][^"'`]{50,}["'`]\s*\)/g;

            let hasIssues = false;
            let issues = [];

            if (badKeyPattern.test(content)) {
                hasIssues = true;
                issues.push('包含反斜杠路径的翻译键');
            }

            if (unicodeKeyPattern.test(content)) {
                hasIssues = true;
                issues.push('包含Unicode编码的翻译键');
            }

            if (longKeyPattern.test(content)) {
                hasIssues = true;
                issues.push('翻译键过长');
            }

            // 检查重复定义
            const duplicatePattern = /(const\s+techStack\s*=[\s\S]*?const\s+techStackData\s*=)/;
            if (duplicatePattern.test(content)) {
                hasIssues = true;
                issues.push('存在重复的数据定义');
            }

            if (hasIssues) {
                this.errors.push({
                    file: filePath,
                    fullPath: fullPath,
                    issues: issues,
                    content: content
                });
                console.log(`   ❌ ${filePath}: ${issues.join(', ')}`);
            }

        } catch (error) {
            console.log(`   ⚠️  无法检查文件 ${filePath}: ${error.message}`);
        }
    }

    /**
     * 修复翻译键
     */
    async fixTranslationKeys() {
        console.log('\n🔧 修复翻译键...');

        for (const errorFile of this.errors) {
            if (errorFile.issues.some(issue => issue.includes('翻译键'))) {
                await this.fixFileTranslationKeys(errorFile);
            }
        }
    }

    /**
     * 修复单个文件的翻译键
     */
    async fixFileTranslationKeys(errorFile) {
        try {
            console.log(`   🔄 修复文件: ${errorFile.file}`);
            
            // 备份原文件
            const backupPath = path.join(this.currentBackupPath, path.basename(errorFile.file));
            fs.writeFileSync(backupPath, errorFile.content);

            let content = errorFile.content;

            // 修复包含路径的翻译键
            content = content.replace(
                /t\s*\(\s*["'`]([^"'`]*\\\\[^"'`]*)["'`]\s*\)/g,
                (match, key) => {
                    // 提取实际的中文文本
                    const chineseMatch = key.match(/[\u4e00-\u9fa5]+/g);
                    if (chineseMatch) {
                        const chineseText = chineseMatch.join('');
                        const simpleKey = this.generateSimpleKey(chineseText);
                        return `t('${simpleKey}')`;
                    }
                    return `t('unknown_key')`;
                }
            );

            // 修复Unicode编码的翻译键
            content = content.replace(
                /t\s*\(\s*["'`]([^"'`]*\\u[0-9a-fA-F]{4}[^"'`]*)["'`]\s*\)/g,
                (match, key) => {
                    // 解码Unicode并生成简单键
                    try {
                        const decoded = key.replace(/\\u([0-9a-fA-F]{4})/g, (match, code) => {
                            return String.fromCharCode(parseInt(code, 16));
                        });
                        const simpleKey = this.generateSimpleKey(decoded);
                        return `t('${simpleKey}')`;
                    } catch (e) {
                        return `t('decode_error')`;
                    }
                }
            );

            // 修复过长的翻译键
            content = content.replace(
                /t\s*\(\s*["'`]([^"'`]{50,})["'`]\s*\)/g,
                (match, key) => {
                    const simpleKey = this.generateSimpleKey(key.substring(0, 20));
                    return `t('${simpleKey}')`;
                }
            );

            // 保存修复后的文件
            fs.writeFileSync(errorFile.fullPath, content);
            this.fixedFiles.push(errorFile.file);
            console.log(`   ✅ 已修复: ${errorFile.file}`);

        } catch (error) {
            console.log(`   ❌ 修复失败 ${errorFile.file}: ${error.message}`);
        }
    }

    /**
     * 生成简单的翻译键
     */
    generateSimpleKey(text) {
        return text
            .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '')
            .toLowerCase()
            .substring(0, 30) || 'unknown';
    }

    /**
     * 移除重复定义
     */
    async removeDuplicateDefinitions() {
        console.log('\n🧹 清理重复定义...');

        for (const errorFile of this.errors) {
            if (errorFile.issues.some(issue => issue.includes('重复'))) {
                await this.fixDuplicateDefinitions(errorFile);
            }
        }
    }

    /**
     * 修复重复定义
     */
    async fixDuplicateDefinitions(errorFile) {
        try {
            console.log(`   🔄 清理重复定义: ${errorFile.file}`);
            
            let content = fs.readFileSync(errorFile.fullPath, 'utf-8');

            // 移除第一个techStack定义（错误的版本）
            content = content.replace(
                /\/\/ 技术栈数据\s*\nconst techStack = \[[\s\S]*?\];/,
                '// 原techStack定义已移除，使用下方的techStackData'
            );

            fs.writeFileSync(errorFile.fullPath, content);
            console.log(`   ✅ 已清理: ${errorFile.file}`);

        } catch (error) {
            console.log(`   ❌ 清理失败 ${errorFile.file}: ${error.message}`);
        }
    }

    /**
     * 验证修复效果
     */
    async validateFixes() {
        console.log('\n✅ 验证修复效果...');

        for (const fixedFile of this.fixedFiles) {
            try {
                const fullPath = path.resolve(__dirname, fixedFile);
                const content = fs.readFileSync(fullPath, 'utf-8');

                // 检查是否还有问题
                const stillHasIssues = 
                    /t\s*\(\s*["'`][^"'`]*\\\\[^"'`]*["'`]\s*\)/.test(content) ||
                    /t\s*\(\s*["'`][^"'`]*\\u[0-9a-fA-F]{4}[^"'`]*["'`]\s*\)/.test(content) ||
                    /t\s*\(\s*["'`][^"'`]{50,}["'`]\s*\)/.test(content);

                if (stillHasIssues) {
                    console.log(`   ⚠️  ${fixedFile} 仍有问题`);
                } else {
                    console.log(`   ✅ ${fixedFile} 修复成功`);
                }

            } catch (error) {
                console.log(`   ❌ 验证失败 ${fixedFile}: ${error.message}`);
            }
        }
    }

    /**
     * 打印总结
     */
    printSummary() {
        console.log('\n📊 紧急修复总结');
        console.log('='.repeat(50));
        
        console.log(`发现问题文件: ${this.errors.length}`);
        console.log(`成功修复文件: ${this.fixedFiles.length}`);
        console.log(`备份位置: ${this.currentBackupPath}`);

        if (this.fixedFiles.length > 0) {
            console.log('\n✅ 已修复的文件:');
            this.fixedFiles.forEach(file => {
                console.log(`   - ${file}`);
            });
        }

        console.log('\n📝 下一步建议:');
        console.log('   1. 运行项目编译测试: cd frontEnd && npm run build');
        console.log('   2. 检查修复后的文件是否正常工作');
        console.log('   3. 如有问题，可从备份恢复: cp emergency-backup/emergency-*/filename.tsx target/');
        console.log('   4. 重新设计国际化工具后再次尝试');
    }
}

// 运行紧急修复
if (require.main === module) {
    const fixer = new EmergencyFixer();
    fixer.run().catch(console.error);
}

module.exports = EmergencyFixer;
