#!/usr/bin/env node

/**
 * 快速修复脚本
 * 
 * 功能：
 * 1. 自动检测项目结构
 * 2. 修复路径配置问题
 * 3. 验证修复效果
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class QuickFix {
    constructor() {
        this.currentDir = process.cwd();
        this.fixes = [];
    }

    /**
     * 运行快速修复
     */
    async run() {
        console.log('🔧 国际化工具快速修复');
        console.log('='.repeat(40));
        
        await this.detectProjectStructure();
        await this.applyFixes();
        await this.verifyFixes();
        
        console.log('\n✅ 快速修复完成！');
        console.log('🚀 现在可以运行: pnpm scan');
    }

    /**
     * 检测项目结构
     */
    async detectProjectStructure() {
        console.log('\n🔍 检测项目结构...');
        
        const possiblePaths = [
            '../frontEnd/src',
            '../src',
            '../app/src',
            './frontEnd/src',
            '../frontend/src'
        ];

        let bestPath = null;
        let maxFiles = 0;

        for (const testPath of possiblePaths) {
            const fullPath = path.resolve(this.currentDir, testPath);
            if (fs.existsSync(fullPath)) {
                try {
                    const files = glob.sync(`${testPath}/**/*.{tsx,ts,jsx,js}`, {
                        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
                        cwd: this.currentDir
                    });
                    
                    console.log(`   📂 ${testPath}: ${files.length} 个文件`);
                    
                    if (files.length > maxFiles) {
                        maxFiles = files.length;
                        bestPath = testPath;
                    }
                } catch (error) {
                    console.log(`   ❌ ${testPath}: 扫描失败`);
                }
            }
        }

        if (bestPath) {
            console.log(`\n🎯 检测到最佳源码路径: ${bestPath}`);
            this.recommendedSrcDir = bestPath;
            
            // 检查i18n目录
            const i18nPath = path.join(bestPath, 'i18n');
            const fullI18nPath = path.resolve(this.currentDir, i18nPath);
            if (fs.existsSync(fullI18nPath)) {
                this.recommendedI18nDir = `${i18nPath}/locales`;
                console.log(`   📚 检测到i18n目录: ${this.recommendedI18nDir}`);
            } else {
                this.recommendedI18nDir = `${bestPath}/i18n/locales`;
                console.log(`   📚 建议i18n目录: ${this.recommendedI18nDir}`);
            }
        } else {
            console.log('\n❌ 未找到合适的源码目录');
            console.log('请手动检查项目结构');
            return;
        }
    }

    /**
     * 应用修复
     */
    async applyFixes() {
        if (!this.recommendedSrcDir) {
            console.log('\n⚠️  跳过修复：未找到源码目录');
            return;
        }

        console.log('\n🔧 应用路径修复...');

        const filesToFix = [
            'i18n-scanner.js',
            'i18n-replacer.js',
            'i18n-validator.js',
            'i18n-workflow.js'
        ];

        for (const fileName of filesToFix) {
            await this.fixFile(fileName);
        }
    }

    /**
     * 修复单个文件
     */
    async fixFile(fileName) {
        const filePath = path.join(this.currentDir, fileName);
        if (!fs.existsSync(filePath)) {
            console.log(`   ⚠️  文件不存在: ${fileName}`);
            return;
        }

        try {
            let content = fs.readFileSync(filePath, 'utf-8');
            let modified = false;

            // 修复srcDir配置
            const srcDirRegex = /srcDir:\s*options\.srcDir\s*\|\|\s*['"`]([^'"`]+)['"`]/g;
            if (srcDirRegex.test(content)) {
                content = content.replace(srcDirRegex, `srcDir: options.srcDir || '${this.recommendedSrcDir}'`);
                modified = true;
            }

            // 修复i18nDir配置
            if (this.recommendedI18nDir) {
                const i18nDirRegex = /i18nDir:\s*options\.i18nDir\s*\|\|\s*['"`]([^'"`]+)['"`]/g;
                if (i18nDirRegex.test(content)) {
                    content = content.replace(i18nDirRegex, `i18nDir: options.i18nDir || '${this.recommendedI18nDir}'`);
                    modified = true;
                }
            }

            // 修复命令行默认参数
            const cmdArgRegex = /process\.argv\[2\]\s*\|\|\s*['"`]([^'"`]+)['"`]/g;
            if (cmdArgRegex.test(content)) {
                content = content.replace(cmdArgRegex, `process.argv[2] || '${this.recommendedSrcDir}'`);
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content);
                console.log(`   ✅ 已修复: ${fileName}`);
                this.fixes.push(fileName);
            } else {
                console.log(`   ℹ️  无需修复: ${fileName}`);
            }

        } catch (error) {
            console.log(`   ❌ 修复失败: ${fileName} - ${error.message}`);
        }
    }

    /**
     * 验证修复效果
     */
    async verifyFixes() {
        console.log('\n🧪 验证修复效果...');

        if (this.fixes.length === 0) {
            console.log('   ℹ️  没有应用任何修复');
            return;
        }

        // 测试扫描功能
        try {
            const I18nScanner = require('./i18n-scanner');
            const scanner = new I18nScanner();
            
            // 检查配置
            console.log(`   📂 当前srcDir配置: ${scanner.options.srcDir}`);
            
            const srcPath = path.resolve(this.currentDir, scanner.options.srcDir);
            if (fs.existsSync(srcPath)) {
                console.log('   ✅ 源码目录存在');
                
                // 测试文件扫描
                const testFiles = glob.sync(`${scanner.options.srcDir}/**/*.{tsx,ts,jsx,js}`, {
                    ignore: scanner.options.excludePatterns,
                    cwd: this.currentDir
                });
                
                console.log(`   📄 可扫描文件: ${testFiles.length} 个`);
                
                if (testFiles.length > 0) {
                    console.log('   ✅ 扫描配置正常');
                } else {
                    console.log('   ⚠️  未找到可扫描文件');
                }
            } else {
                console.log('   ❌ 源码目录仍不存在');
            }

        } catch (error) {
            console.log(`   ❌ 验证失败: ${error.message}`);
        }
    }
}

// 运行快速修复
if (require.main === module) {
    const quickFix = new QuickFix();
    quickFix.run().catch(console.error);
}

module.exports = QuickFix;
