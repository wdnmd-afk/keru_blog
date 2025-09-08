#!/usr/bin/env node

/**
 * 修复验证脚本
 * 
 * 功能：
 * 1. 验证所有工具的修复状态
 * 2. 运行端到端测试
 * 3. 提供修复建议
 */

const fs = require('fs');
const path = require('path');

class FixVerifier {
    constructor() {
        this.issues = [];
        this.fixes = [];
    }

    /**
     * 运行完整验证
     */
    async run() {
        console.log('🔍 修复验证开始');
        console.log('='.repeat(50));

        await this.verifyFileStructure();
        await this.verifyClassDefinitions();
        await this.verifyPathConfigurations();
        await this.runComponentTests();
        
        this.printSummary();
    }

    /**
     * 验证文件结构
     */
    async verifyFileStructure() {
        console.log('\n📁 验证文件结构...');
        
        const requiredFiles = [
            'i18n-scanner.js',
            'i18n-replacer.js',
            'i18n-validator.js',
            'i18n-workflow.js',
            'test-replacer.js',
            'path-diagnostic.js',
            'quick-fix.js',
            'package.json'
        ];

        requiredFiles.forEach(file => {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                console.log(`   ✅ ${file}`);
                this.fixes.push(`文件存在: ${file}`);
            } else {
                console.log(`   ❌ ${file} - 缺失`);
                this.issues.push(`缺失文件: ${file}`);
            }
        });
    }

    /**
     * 验证类定义
     */
    async verifyClassDefinitions() {
        console.log('\n🔧 验证类定义...');
        
        try {
            // 测试I18nReplacer类
            const I18nReplacer = require('./i18n-replacer');
            const replacer = new I18nReplacer();
            
            if (replacer.chineseRegex) {
                console.log('   ✅ I18nReplacer.chineseRegex 已定义');
                this.fixes.push('I18nReplacer.chineseRegex 修复完成');
            } else {
                console.log('   ❌ I18nReplacer.chineseRegex 未定义');
                this.issues.push('I18nReplacer.chineseRegex 仍然未定义');
            }

            if (replacer.chineseRegex instanceof RegExp) {
                console.log('   ✅ chineseRegex 是有效的正则表达式');
                this.fixes.push('chineseRegex 类型正确');
            } else {
                console.log('   ❌ chineseRegex 不是正则表达式');
                this.issues.push('chineseRegex 类型错误');
            }

            // 测试正则表达式功能
            const testText = '测试中文';
            if (replacer.chineseRegex.test(testText)) {
                console.log('   ✅ 中文正则表达式功能正常');
                this.fixes.push('中文检测功能正常');
            } else {
                console.log('   ❌ 中文正则表达式功能异常');
                this.issues.push('中文检测功能异常');
            }

        } catch (error) {
            console.log(`   ❌ 类定义验证失败: ${error.message}`);
            this.issues.push(`类定义错误: ${error.message}`);
        }
    }

    /**
     * 验证路径配置
     */
    async verifyPathConfigurations() {
        console.log('\n📂 验证路径配置...');
        
        const tools = [
            { name: 'I18nScanner', file: './i18n-scanner' },
            { name: 'I18nReplacer', file: './i18n-replacer' },
            { name: 'I18nValidator', file: './i18n-validator' },
            { name: 'I18nWorkflow', file: './i18n-workflow' }
        ];

        tools.forEach(tool => {
            try {
                const ToolClass = require(tool.file);
                const instance = new ToolClass();
                
                console.log(`   📋 ${tool.name}:`);
                console.log(`      srcDir: ${instance.options.srcDir}`);
                
                if (instance.options.i18nDir) {
                    console.log(`      i18nDir: ${instance.options.i18nDir}`);
                }
                
                // 检查路径是否使用正确的分隔符
                if (instance.options.srcDir.includes('\\')) {
                    console.log(`      ⚠️  路径包含反斜杠，可能在Windows上有问题`);
                    this.issues.push(`${tool.name} 路径分隔符问题`);
                } else {
                    console.log(`      ✅ 路径分隔符正确`);
                    this.fixes.push(`${tool.name} 路径配置正确`);
                }

            } catch (error) {
                console.log(`   ❌ ${tool.name} 配置验证失败: ${error.message}`);
                this.issues.push(`${tool.name} 配置错误: ${error.message}`);
            }
        });
    }

    /**
     * 运行组件测试
     */
    async runComponentTests() {
        console.log('\n🧪 运行组件测试...');
        
        try {
            // 运行替换工具测试
            const ReplacerTester = require('./test-replacer');
            const tester = new ReplacerTester();
            
            console.log('   🔄 运行替换工具测试...');
            await tester.runTests();
            
            // 检查测试结果
            const passedTests = tester.testResults.filter(r => r.passed).length;
            const totalTests = tester.testResults.length;
            
            if (passedTests === totalTests) {
                console.log('   ✅ 所有替换工具测试通过');
                this.fixes.push('替换工具功能正常');
            } else {
                console.log(`   ⚠️  替换工具测试: ${passedTests}/${totalTests} 通过`);
                this.issues.push(`替换工具部分测试失败: ${totalTests - passedTests} 个`);
            }

        } catch (error) {
            console.log(`   ❌ 组件测试失败: ${error.message}`);
            this.issues.push(`组件测试错误: ${error.message}`);
        }
    }

    /**
     * 打印总结
     */
    printSummary() {
        console.log('\n📊 修复验证总结');
        console.log('='.repeat(50));
        
        console.log(`✅ 修复项目: ${this.fixes.length}`);
        console.log(`❌ 待解决问题: ${this.issues.length}`);
        
        if (this.fixes.length > 0) {
            console.log('\n🎉 已修复的问题:');
            this.fixes.forEach(fix => {
                console.log(`   ✅ ${fix}`);
            });
        }
        
        if (this.issues.length > 0) {
            console.log('\n⚠️  仍需解决的问题:');
            this.issues.forEach(issue => {
                console.log(`   ❌ ${issue}`);
            });
            
            console.log('\n💡 建议的解决步骤:');
            console.log('   1. 检查错误日志中的具体信息');
            console.log('   2. 运行 "npm run test-replacer" 进行详细测试');
            console.log('   3. 如果问题持续，请检查Node.js版本兼容性');
            console.log('   4. 确保所有依赖已正确安装');
        }
        
        if (this.issues.length === 0) {
            console.log('\n🎉 所有修复验证通过！');
            console.log('现在可以安全地运行:');
            console.log('   pnpm workflow');
            console.log('   pnpm scan');
        } else {
            console.log('\n⚠️  建议在解决所有问题后再运行工作流');
        }
    }
}

// 运行验证
if (require.main === module) {
    const verifier = new FixVerifier();
    verifier.run().catch(console.error);
}

module.exports = FixVerifier;
